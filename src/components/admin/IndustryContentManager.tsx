"use client";

import Link from "next/link";
import { type ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useStorage } from "@/firebase";
import { Loader2, Save, RotateCcw, ExternalLink, Search, FileText, ImagePlus, Trash2, ChevronUp, ChevronDown, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { INDUSTRY_FIELD_LABELS, INDUSTRY_EDITABLE_FIELDS, type IndustryEditableField } from "@/lib/industry-content-fields";
import { MAX_INDUSTRY_GALLERY_IMAGES, MAX_INDUSTRY_IMAGE_BYTES, type IndustryGalleryImage } from "@/lib/industry-image-types";

type IndustryRow = {
  slug: string;
  name: string;
  category: string;
  icon: string;
  summary: string;
  fields: Record<IndustryEditableField, string>;
  images: IndustryGalleryImage[];
  wordCount: number;
  hasCustomContent: boolean;
};

type GalleryDraft = IndustryGalleryImage & {
  key: string;
  file?: File;
  previewUrl?: string;
};

type ApiResponse = {
  success?: boolean;
  error?: string;
  industries?: IndustryRow[];
  wordCount?: number;
  imageCount?: number;
};

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

function toGalleryDraft(images: IndustryGalleryImage[]): GalleryDraft[] {
  return images.map((image, index) => ({
    ...image,
    key: "saved-" + index + "-" + image.storagePath,
  }));
}

function comparableImages(images: GalleryDraft[] | IndustryGalleryImage[]) {
  return images.map(({ url, storagePath, altText, caption }) => ({ url, storagePath, altText, caption }));
}

async function parseResponse(response: Response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof data?.error === "string" ? data.error : "Request failed. Please try again.");
  }
  return data;
}

export function IndustryContentManager() {
  const storage = useStorage();
  const { toast } = useToast();
  const [industries, setIndustries] = useState<IndustryRow[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("coaching-classes");
  const [draft, setDraft] = useState<Record<IndustryEditableField, string> | null>(null);
  const [galleryDraft, setGalleryDraft] = useState<GalleryDraft[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [galleryError, setGalleryError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const selected = useMemo(
    () => industries.find((industry) => industry.slug === selectedSlug) || industries[0],
    [industries, selectedSlug]
  );

  const filteredIndustries = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return industries;
    return industries.filter((item) =>
      [item.name, item.category, item.slug].join(" ").toLowerCase().includes(query)
    );
  }, [industries, search]);

  const imagesAreDirty = useMemo(() => {
    if (galleryDraft.some((image) => image.file)) return true;
    return JSON.stringify(comparableImages(galleryDraft)) !== JSON.stringify(comparableImages(selected?.images || []));
  }, [galleryDraft, selected?.images]);

  const isDirty = useMemo(() => {
    if (!selected || !draft) return imagesAreDirty;
    return imagesAreDirty || INDUSTRY_EDITABLE_FIELDS.some((field) => draft[field] !== selected.fields[field]);
  }, [draft, selected, imagesAreDirty]);

  const releasePreviews = (images: GalleryDraft[]) => {
    images.forEach((image) => {
      if (image.previewUrl) URL.revokeObjectURL(image.previewUrl);
    });
  };

  const loadIndustries = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const response = await fetch("/api/admin/industry-pages", {
        method: "GET",
        cache: "no-store",
        credentials: "same-origin",
      });
      const payload = (await response.json()) as ApiResponse;
      if (!response.ok || !payload.industries) {
        throw new Error(payload.error || "Could not load industry pages.");
      }
      setIndustries(payload.industries.map((item) => ({ ...item, images: item.images || [] })));
      setSelectedSlug((current) =>
        payload.industries!.some((item) => item.slug === current)
          ? current
          : payload.industries!.find((item) => item.slug === "coaching-classes")?.slug || payload.industries![0]?.slug || ""
      );
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Could not load industry pages.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadIndustries();
  }, [loadIndustries]);

  useEffect(() => {
    if (!selected) return;
    setDraft({ ...selected.fields });
    setGalleryDraft(toGalleryDraft(selected.images || []));
    setGalleryError("");
    setUploadProgress(0);
  }, [selected]);

  const galleryDraftRef = useRef<GalleryDraft[]>([]);

  useEffect(() => {
    galleryDraftRef.current = galleryDraft;
  }, [galleryDraft]);

  useEffect(() => () => {
    galleryDraftRef.current.forEach((image) => {
      if (image.previewUrl) URL.revokeObjectURL(image.previewUrl);
    });
  }, []);

  const chooseIndustry = (slug: string) => {
    if (slug === selectedSlug) return;
    if (isDirty && !window.confirm("Discard unsaved text or image changes and switch industry?")) return;
    releasePreviews(galleryDraft);
    setDraft(null);
    setGalleryDraft([]);
    setGalleryError("");
    setSelectedSlug(slug);
  };

  const updateField = (field: IndustryEditableField, value: string) => {
    setDraft((current) => current ? { ...current, [field]: value } : current);
  };

  const chooseImages = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files || []);
    event.currentTarget.value = "";
    if (!selected || files.length === 0) return;

    if (galleryDraft.length + files.length > MAX_INDUSTRY_GALLERY_IMAGES) {
      setGalleryError("A page can contain up to " + MAX_INDUSTRY_GALLERY_IMAGES + " images. Remove an image before adding more.");
      return;
    }

    const validFiles: File[] = [];
    const errors: string[] = [];
    for (const file of files) {
      if (!IMAGE_TYPES.has(file.type)) {
        errors.push(file.name + " is not a supported image. Use JPG, PNG, WebP, AVIF or GIF.");
      } else if (file.size >= MAX_INDUSTRY_IMAGE_BYTES) {
        errors.push(file.name + " is too large. Each image must be smaller than 10 MB.");
      } else {
        validFiles.push(file);
      }
    }

    setGalleryError(errors.join(" "));
    const pending: GalleryDraft[] = validFiles.map((file) => {
      const name = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").trim();
      return {
        key: "pending-" + file.name + "-" + file.lastModified + "-" + Math.random().toString(36).slice(2, 9),
        file,
        previewUrl: URL.createObjectURL(file),
        url: "",
        storagePath: "",
        altText: (selected.name + ": " + (name || "industry image")).slice(0, 180),
        caption: "",
      };
    });
    if (pending.length) setGalleryDraft((current) => [...current, ...pending]);
  };

  const updateGalleryImage = (key: string, field: "altText" | "caption", value: string) => {
    setGalleryDraft((current) => current.map((image) =>
      image.key === key ? { ...image, [field]: value } : image
    ));
  };

  const removeGalleryImage = (key: string) => {
    const image = galleryDraft.find((item) => item.key === key);
    if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl);
    setGalleryDraft((current) => current.filter((item) => item.key !== key));
    setGalleryError("");
  };

  const moveGalleryImage = (key: string, direction: -1 | 1) => {
    setGalleryDraft((current) => {
      const index = current.findIndex((image) => image.key === key);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current;
      const next = [...current];
      [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
      return next;
    });
  };

  const uploadImage = (file: File, path: string, onProgress: (progress: number) => void) =>
    new Promise<string>((resolve, reject) => {
      const task = uploadBytesResumable(ref(storage, path), file, { contentType: file.type });
      task.on(
        "state_changed",
        (snapshot) => onProgress(snapshot.totalBytes ? snapshot.bytesTransferred / snapshot.totalBytes : 0),
        reject,
        async () => {
          try {
            resolve(await getDownloadURL(task.snapshot.ref));
          } catch (error) {
            reject(error);
          }
        }
      );
    });

  const save = async () => {
    if (!selected || !draft || saving || resetting) return;

    if (galleryDraft.length > MAX_INDUSTRY_GALLERY_IMAGES) {
      setGalleryError("A page can contain up to " + MAX_INDUSTRY_GALLERY_IMAGES + " images.");
      return;
    }
    const invalidImage = galleryDraft.find((image) => !image.altText.trim() || image.altText.trim().length > 180 || image.caption.trim().length > 250);
    if (invalidImage) {
      setGalleryError("Every image needs alt text (up to 180 characters). Captions can be up to 250 characters.");
      return;
    }

    setSaving(true);
    setGalleryError("");
    setUploadProgress(0);
    const newlyUploadedPaths: string[] = [];
    try {
      const totalToUpload = galleryDraft.filter((image) => Boolean(image.file)).length;
      const savedImages: IndustryGalleryImage[] = [];

      for (let index = 0; index < galleryDraft.length; index += 1) {
        const image = galleryDraft[index];
        if (!image.file) {
          savedImages.push({
            url: image.url,
            storagePath: image.storagePath,
            altText: image.altText.trim(),
            caption: image.caption.trim(),
          });
          continue;
        }

        const safeName = image.file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-90) || "industry-image";
        const path = "industry-pages/" + selected.slug + "/" + Date.now() + "-" + Math.random().toString(36).slice(2, 10) + "-" + safeName;
        newlyUploadedPaths.push(path);
        const fileIndex = galleryDraft.slice(0, index + 1).filter((item) => Boolean(item.file)).length - 1;
        const url = await uploadImage(image.file, path, (progress) => {
          setUploadProgress(totalToUpload ? Math.min(99, Math.round(((fileIndex + progress) / totalToUpload) * 100)) : 0);
        });
        savedImages.push({
          url,
          storagePath: path,
          altText: image.altText.trim(),
          caption: image.caption.trim(),
        });
        setUploadProgress(totalToUpload ? Math.round(((fileIndex + 1) / totalToUpload) * 100) : 100);
      }

      const response = await fetch("/api/admin/industry-pages", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: selected.slug, fields: draft, images: savedImages }),
      });
      const payload = (await response.json()) as ApiResponse;
      if (!response.ok) throw new Error(payload.error || "Could not save industry content.");

      const retainedPaths = new Set(savedImages.map((image) => image.storagePath));
      await Promise.all((selected.images || [])
        .filter((image) => image.storagePath && !retainedPaths.has(image.storagePath))
        .map((image) => deleteObject(ref(storage, image.storagePath)).catch(() => undefined)));

      const count = savedImages.length;
      toast({
        title: "Industry page saved",
        description: "Saved " + count + " gallery image(s). The page is refreshing from the site's cache.",
      });
      releasePreviews(galleryDraft);
      setUploadProgress(0);
      await loadIndustries();
    } catch (error) {
      await Promise.all(newlyUploadedPaths.map((path) => deleteObject(ref(storage, path)).catch(() => undefined)));
      const message = error instanceof Error ? error.message : "Could not save industry content.";
      setGalleryError(message);
      toast({
        variant: "destructive",
        title: "Save failed",
        description: message,
      });
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!selected) return;
    if (isDirty && !window.confirm("Reset " + selected.name + " and discard all unsaved edits?")) return;
    if (!window.confirm("Reset " + selected.name + " to the original code-managed content? This also removes its custom gallery.")) return;
    setResetting(true);
    try {
      const response = await fetch("/api/admin/industry-pages?slug=" + encodeURIComponent(selected.slug), {
        method: "DELETE",
        credentials: "same-origin",
      });
      const payload = (await response.json()) as ApiResponse;
      if (!response.ok) throw new Error(payload.error || "Could not reset industry content.");

      releasePreviews(galleryDraft);
      await Promise.all((selected.images || [])
        .filter((image) => image.storagePath)
        .map((image) => deleteObject(ref(storage, image.storagePath)).catch(() => undefined)));

      toast({ title: "Industry content reset", description: "The original text is restored and custom gallery removed." });
      setGalleryDraft([]);
      setDraft(null);
      await loadIndustries();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Reset failed",
        description: error instanceof Error ? error.message : "Could not reset industry content.",
      });
    } finally {
      setResetting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span>Loading industry content…</span>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="space-y-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
        <h2 className="text-xl font-black">Industry content could not load</h2>
        <p className="text-sm text-muted-foreground">{loadError}</p>
        <Button onClick={() => void loadIndustries()} variant="outline">Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Industry SEO & content</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Industry Pages CMS</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Edit each industry's copy and add a multi-image gallery. Each page supports up to {MAX_INDUSTRY_GALLERY_IMAGES} images, with individual alt text and captions.
            Saving is rejected if the completed guide falls below 1,500 words.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {selected && (
            <Button asChild variant="outline">
              <Link href={"/industries/" + selected.slug} target="_blank" rel="noreferrer">
                View page <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          <Button onClick={reset} variant="outline" disabled={!selected?.hasCustomContent || saving || resetting}>
            {resetting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RotateCcw className="mr-2 h-4 w-4" />}
            Reset
          </Button>
          <Button onClick={save} disabled={!selected || !draft || !isDirty || saving || resetting}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(240px,0.75fr)_minmax(0,1.8fr)]">
        <aside className="h-fit rounded-2xl border border-border/60 bg-card/50 p-4">
          <div className="mb-4 flex items-center gap-2 rounded-xl border border-border/60 bg-background/70 px-3">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search industries…" className="h-11 min-w-0 flex-1 bg-transparent text-sm outline-none" aria-label="Search industries" />
          </div>
          <p className="mb-3 px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">{filteredIndustries.length} of {industries.length} industries</p>
          <div className="max-h-[68vh] space-y-1 overflow-y-auto pr-1">
            {filteredIndustries.map((industry) => (
              <button key={industry.slug} type="button" onClick={() => chooseIndustry(industry.slug)} className={"w-full rounded-xl p-3 text-left transition " + (selected?.slug === industry.slug ? "border border-orange-500/30 bg-orange-500/10" : "border border-transparent hover:bg-muted/60")}>
                <span className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-lg">{industry.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className={"block text-sm font-bold " + (selected?.slug === industry.slug ? "text-orange-500" : "text-foreground")}>{industry.name}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{industry.category}</span>
                    {industry.images.length > 0 && <span className="mt-2 inline-flex rounded-full bg-blue-500/10 px-2 py-1 text-[10px] font-bold text-blue-600">{industry.images.length} image(s)</span>}
                    {industry.hasCustomContent && <span className="mt-2 inline-flex rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600">Custom content</span>}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        {selected && draft ? (
          <section className="min-w-0 space-y-5">
            <div className="rounded-2xl border border-border/60 bg-card/50 p-5 md:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-500">{selected.category}</p>
                  <h3 className="mt-2 text-2xl font-black text-foreground">{selected.icon} {selected.name}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{selected.summary}</p>
                  <p className="mt-3 font-mono text-xs text-muted-foreground">/industries/{selected.slug}</p>
                </div>
                <div className="shrink-0 rounded-xl border border-border/70 bg-background/70 px-4 py-3">
                  <p className="text-xs text-muted-foreground">Last saved estimate</p>
                  <p className={"mt-1 text-2xl font-black " + (selected.wordCount >= 1500 ? "text-emerald-600" : "text-destructive")}>{selected.wordCount.toLocaleString("en-IN")}</p>
                  <p className="text-xs text-muted-foreground">words on full guide</p>
                </div>
              </div>
              {isDirty && <p className="mt-4 rounded-lg bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-700 dark:text-amber-300">Unsaved text or gallery changes — save before switching pages.</p>}
            </div>

            <section className="space-y-4 rounded-2xl border border-border/60 bg-card/45 p-4 md:p-5" aria-labelledby="industry-gallery-title">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 id="industry-gallery-title" className="flex items-center gap-2 text-lg font-black"><ImagePlus className="h-5 w-5 text-orange-500" /> Industry image gallery</h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">Upload multiple relevant images for this industry page. Images appear below the page hero; use authentic, licensed images and descriptive alt text.</p>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full border border-border/70 bg-background px-3 py-1.5 text-xs font-bold">{galleryDraft.length}/{MAX_INDUSTRY_GALLERY_IMAGES} images</span>
              </div>

              <label htmlFor="industry-gallery-upload" className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-orange-500/40 bg-orange-500/[0.04] px-5 py-6 text-center transition hover:border-orange-500 hover:bg-orange-500/[0.08]">
                <UploadCloud className="h-8 w-8 text-orange-500" />
                <span className="font-bold text-foreground">Choose multiple images</span>
                <span className="text-xs text-muted-foreground">JPG, PNG, WebP, AVIF or GIF · under 10 MB each · up to {MAX_INDUSTRY_GALLERY_IMAGES} images per page</span>
                <input id="industry-gallery-upload" className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" multiple onChange={chooseImages} disabled={saving || resetting || galleryDraft.length >= MAX_INDUSTRY_GALLERY_IMAGES} />
              </label>

              {galleryDraft.length > 0 ? (
                <div className="space-y-3">
                  {galleryDraft.map((image, index) => (
                    <article key={image.key} className="grid gap-4 rounded-2xl border border-border/70 bg-background/55 p-3 sm:grid-cols-[140px_minmax(0,1fr)]">
                      <div className="space-y-2">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                          <img src={image.previewUrl || image.url} alt={image.altText || "Industry gallery preview"} className="h-full w-full object-cover" />
                          {image.file && <span className="absolute bottom-2 left-2 rounded-full bg-slate-950/80 px-2 py-1 text-[10px] font-bold text-white">New upload</span>}
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <Button type="button" size="icon" variant="outline" className="h-8 w-8" aria-label={"Move image " + (index + 1) + " up"} disabled={index === 0 || saving || resetting} onClick={() => moveGalleryImage(image.key, -1)}><ChevronUp className="h-4 w-4" /></Button>
                          <Button type="button" size="icon" variant="outline" className="h-8 w-8" aria-label={"Move image " + (index + 1) + " down"} disabled={index === galleryDraft.length - 1 || saving || resetting} onClick={() => moveGalleryImage(image.key, 1)}><ChevronDown className="h-4 w-4" /></Button>
                          <Button type="button" size="icon" variant="outline" className="h-8 w-8 border-destructive/30 text-destructive hover:bg-destructive/10" aria-label={"Remove image " + (index + 1)} disabled={saving || resetting} onClick={() => removeGalleryImage(image.key)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                      <div className="min-w-0 space-y-3">
                        <div className="space-y-1.5">
                          <label htmlFor={"industry-image-alt-" + index} className="text-sm font-semibold">Image alt text</label>
                          <Input id={"industry-image-alt-" + index} value={image.altText} maxLength={180} onChange={(event) => updateGalleryImage(image.key, "altText", event.target.value)} placeholder="Describe the image accurately" disabled={saving || resetting} />
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor={"industry-image-caption-" + index} className="text-sm font-semibold">Caption (optional)</label>
                          <Textarea id={"industry-image-caption-" + index} value={image.caption} maxLength={250} rows={2} onChange={(event) => updateGalleryImage(image.key, "caption", event.target.value)} placeholder="Add helpful context below the image" className="resize-y bg-background/70" disabled={saving || resetting} />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border/70 p-6 text-center">
                  <ImagePlus className="mx-auto h-7 w-7 text-muted-foreground" />
                  <p className="mt-2 text-sm font-semibold">No gallery images yet</p>
                  <p className="mt-1 text-xs text-muted-foreground">Select multiple images at once; the public page will show them after you save.</p>
                </div>
              )}

              {saving && galleryDraft.some((image) => image.file) ? (
                <div className="space-y-2">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-orange-600 transition-all" style={{ width: uploadProgress + "%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground">Uploading images: {uploadProgress}%</p>
                </div>
              ) : null}
              {galleryError && <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{galleryError}</p>}
            </section>

            <div className="grid gap-5">
              {INDUSTRY_EDITABLE_FIELDS.map((field) => (
                <div key={field} className="rounded-2xl border border-border/60 bg-card/35 p-4 md:p-5">
                  <label htmlFor={"industry-field-" + field} className="mb-2 block text-sm font-extrabold text-foreground">{INDUSTRY_FIELD_LABELS[field]}</label>
                  <Textarea id={"industry-field-" + field} rows={5} value={draft[field]} onChange={(event) => updateField(field, event.target.value)} className="resize-y bg-background/70 leading-7" disabled={saving || resetting} />
                  <p className="mt-2 text-xs text-muted-foreground">Industry-specific detail only. Keep claims factual and avoid keyword repetition or guaranteed outcomes.</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card/50 p-4">
              <p className="flex items-center gap-2 text-sm text-muted-foreground"><FileText className="h-4 w-4" /> Content and gallery changes save together; the public page cache is revalidated after success.</p>
              <Button onClick={save} disabled={!isDirty || saving || resetting}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {saving ? "Saving…" : "Save Changes"}
              </Button>
            </div>
          </section>
        ) : (
          <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-border/70 text-sm text-muted-foreground">Choose an industry to edit its page.</div>
        )}
      </div>
    </div>
  );
}
