"use client";

import { type ChangeEvent, type FormEvent, useCallback, useEffect, useState } from "react";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useStorage } from "@/firebase";
import type { MobilePoster } from "@/lib/mobile-posters-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ArrowUpDown, Edit2, Eye, EyeOff, ImagePlus, Loader2, Plus, Save, Trash2, UploadCloud, X } from "lucide-react";

type PosterDraft = Omit<MobilePoster, "id">;

const EMPTY_DRAFT: PosterDraft = {
  title: "",
  imageUrl: "",
  imageStoragePath: "",
  imageAlt: "",
  buttonText: "Learn More",
  targetUrl: "/services",
  displayOrder: 0,
  isPublished: true,
};

async function parseResponse(response: Response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(typeof data?.error === "string" ? data.error : "Request failed. Please try again.");
  }
  return data;
}

export function MobilePostersManager() {
  const storage = useStorage();
  const { toast } = useToast();
  const [posters, setPosters] = useState<MobilePoster[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<PosterDraft>(EMPTY_DRAFT);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);

  const refreshPosters = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const response = await fetch("/api/admin/mobile-posters", { cache: "no-store" });
      const data = await parseResponse(response);
      const rows = Array.isArray(data.posters) ? data.posters as MobilePoster[] : [];
      rows.sort((a, b) => a.displayOrder - b.displayOrder);
      setPosters(rows);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Posters could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshPosters();
  }, [refreshPosters]);

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const clearEditor = () => {
    setEditorOpen(false);
    setEditingId(null);
    setDraft(EMPTY_DRAFT);
    setSelectedFile(null);
    setPreviewUrl("");
    setFormError("");
    setUploadProgress(0);
  };

  const startCreate = () => {
    const nextOrder = posters.reduce((largest, poster) => Math.max(largest, poster.displayOrder), -1) + 1;
    setEditingId(null);
    setDraft({ ...EMPTY_DRAFT, displayOrder: nextOrder });
    setSelectedFile(null);
    setPreviewUrl("");
    setFormError("");
    setUploadProgress(0);
    setEditorOpen(true);
  };

  const startEdit = (poster: MobilePoster) => {
    setEditingId(poster.id);
    setDraft({
      title: poster.title,
      imageUrl: poster.imageUrl,
      imageStoragePath: poster.imageStoragePath,
      imageAlt: poster.imageAlt,
      buttonText: poster.buttonText,
      targetUrl: poster.targetUrl,
      displayOrder: poster.displayOrder,
      isPublished: poster.isPublished,
    });
    setSelectedFile(null);
    setPreviewUrl("");
    setFormError("");
    setUploadProgress(0);
    setEditorOpen(true);
  };

  const chooseImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormError("");
    if (!file) {
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setSelectedFile(null);
      setPreviewUrl("");
      setFormError("Choose a JPG, PNG, WebP, AVIF or GIF image.");
      event.target.value = "";
      return;
    }
    if (file.size >= 10 * 1024 * 1024) {
      setSelectedFile(null);
      setPreviewUrl("");
      setFormError("Image must be smaller than 10 MB.");
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadImage = (file: File, path: string) => new Promise<string>((resolve, reject) => {
    const task = uploadBytesResumable(ref(storage, path), file, { contentType: file.type });
    task.on(
      "state_changed",
      (snapshot) => setUploadProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)),
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

  const saveDraft = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving) return;

    if (!draft.title.trim() || !draft.imageAlt.trim() || !draft.buttonText.trim() || !draft.targetUrl.trim()) {
      setFormError("Complete the poster name, image description, button text and destination.");
      return;
    }
    if (!draft.imageUrl && !selectedFile) {
      setFormError("Upload an image before saving this poster.");
      return;
    }
    if (!Number.isInteger(Number(draft.displayOrder)) || Number(draft.displayOrder) < 0) {
      setFormError("Display order must be zero or a positive whole number.");
      return;
    }

    setSaving(true);
    setFormError("");
    setUploadProgress(0);
    let newlyUploadedPath = "";
    try {
      let imageUrl = draft.imageUrl;
      let imageStoragePath = draft.imageStoragePath;

      if (selectedFile) {
        const safeName = selectedFile.name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-100) || "poster-image";
        newlyUploadedPath = "mobile-posters/" + Date.now() + "-" + Math.random().toString(36).slice(2, 10) + "-" + safeName;
        imageUrl = await uploadImage(selectedFile, newlyUploadedPath);
        imageStoragePath = newlyUploadedPath;
      }

      const payload = {
        ...(editingId ? { id: editingId } : {}),
        ...draft,
        title: draft.title.trim(),
        imageUrl,
        imageStoragePath,
        imageAlt: draft.imageAlt.trim(),
        buttonText: draft.buttonText.trim(),
        targetUrl: draft.targetUrl.trim(),
        displayOrder: Number(draft.displayOrder),
      };
      await parseResponse(await fetch("/api/admin/mobile-posters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }));

      if (draft.imageStoragePath && draft.imageStoragePath !== imageStoragePath && draft.imageStoragePath.startsWith("mobile-posters/")) {
        await deleteObject(ref(storage, draft.imageStoragePath)).catch(() => undefined);
      }

      toast({
        title: editingId ? "Poster updated" : "Poster created",
        description: draft.isPublished ? "The mobile carousel will show this poster." : "The poster is saved as hidden.",
      });
      clearEditor();
      await refreshPosters();
    } catch (error) {
      if (newlyUploadedPath) {
        await deleteObject(ref(storage, newlyUploadedPath)).catch(() => undefined);
      }
      const message = error instanceof Error ? error.message : "Poster could not be saved.";
      setFormError(message);
      toast({ title: "Could not save poster", description: message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (poster: MobilePoster) => {
    if (publishingId) return;
    setPublishingId(poster.id);
    try {
      await parseResponse(await fetch("/api/admin/mobile-posters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...poster, isPublished: !poster.isPublished }),
      }));
      toast({
        title: poster.isPublished ? "Poster hidden" : "Poster published",
        description: poster.isPublished ? "It will no longer appear on the homepage." : "It is now eligible to appear in the mobile carousel.",
      });
      await refreshPosters();
    } catch (error) {
      toast({
        title: "Could not update poster",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setPublishingId(null);
    }
  };

  const deletePoster = async (poster: MobilePoster) => {
    if (deletingId) return;
    const confirmed = window.confirm("Permanently delete “" + poster.title + "”? This cannot be undone.");
    if (!confirmed) return;

    setDeletingId(poster.id);
    try {
      await parseResponse(await fetch("/api/admin/mobile-posters?id=" + encodeURIComponent(poster.id), {
        method: "DELETE",
      }));
      if (poster.imageStoragePath.startsWith("mobile-posters/")) {
        await deleteObject(ref(storage, poster.imageStoragePath)).catch(() => undefined);
      }
      toast({ title: "Poster deleted", description: "The homepage carousel has been refreshed." });
      await refreshPosters();
    } catch (error) {
      toast({
        title: "Could not delete poster",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">Mobile Posters</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Manage every poster in the mobile homepage carousel. There is no fixed poster count limit.
            Each poster can use its own image, button label and destination link.
          </p>
        </div>
        <Button onClick={startCreate} className="h-11 shrink-0 rounded-xl bg-orange-600 px-5 font-bold text-white hover:bg-orange-500">
          <Plus className="mr-2 h-4 w-4" /> Create poster
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/70 bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total posters</p>
          <p className="mt-2 text-3xl font-black text-foreground">{posters.length}</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Published</p>
          <p className="mt-2 text-3xl font-black text-emerald-500">{posters.filter((poster) => poster.isPublished).length}</p>
        </div>
        <div className="rounded-2xl border border-border/70 bg-card p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Hidden</p>
          <p className="mt-2 text-3xl font-black text-muted-foreground">{posters.filter((poster) => !poster.isPublished).length}</p>
        </div>
      </div>

      {loadError ? (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
          <p className="font-bold text-destructive">Could not load posters</p>
          <p className="mt-1 text-sm text-muted-foreground">{loadError}</p>
          <Button variant="outline" className="mt-3" onClick={() => void refreshPosters()}>Try again</Button>
        </div>
      ) : loading ? (
        <div className="flex min-h-48 items-center justify-center rounded-2xl border border-border/60 bg-card/40">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-3 text-sm text-muted-foreground">Loading posters…</span>
        </div>
      ) : posters.length === 0 ? (
        <div className="flex min-h-56 flex-col items-center justify-center rounded-3xl border border-dashed border-border/80 bg-card/30 p-8 text-center">
          <ImagePlus className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-bold text-foreground">No posters yet</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">Create your first poster. Published posters appear in the mobile homepage carousel automatically.</p>
          <Button onClick={startCreate} className="mt-4 rounded-xl bg-orange-600 font-bold text-white hover:bg-orange-500">
            <Plus className="mr-2 h-4 w-4" /> Add first poster
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {posters.map((poster) => (
            <article key={poster.id} className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img src={poster.imageUrl} alt={poster.imageAlt} loading="lazy" className="h-full w-full object-cover" />
                <span className={"absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold " + (poster.isPublished ? "bg-emerald-500 text-white" : "bg-slate-900/80 text-white")}>
                  {poster.isPublished ? "Published" : "Hidden"}
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-slate-950/75 px-3 py-1 text-[11px] font-bold text-white">
                  <ArrowUpDown className="mr-1 inline h-3 w-3" /> Order {poster.displayOrder}
                </span>
              </div>
              <div className="space-y-3 p-4">
                <div>
                  <h3 className="line-clamp-1 font-bold text-foreground">{poster.title}</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{poster.targetUrl}</p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-orange-600">
                    {poster.buttonText}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 border-t border-border/60 pt-3">
                  <Button size="sm" variant="outline" onClick={() => startEdit(poster)} className="rounded-lg">
                    <Edit2 className="mr-1.5 h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => void togglePublished(poster)}
                    disabled={publishingId === poster.id || Boolean(publishingId)}
                    className="rounded-lg"
                  >
                    {publishingId === poster.id ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : poster.isPublished ? <EyeOff className="mr-1.5 h-3.5 w-3.5" /> : <Eye className="mr-1.5 h-3.5 w-3.5" />}
                    {poster.isPublished ? "Hide" : "Publish"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => void deletePoster(poster)}
                    disabled={deletingId === poster.id || Boolean(deletingId)}
                    className="rounded-lg border-destructive/30 text-destructive hover:bg-destructive/10"
                  >
                    {deletingId === poster.id ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Trash2 className="mr-1.5 h-3.5 w-3.5" />}
                    Delete
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <Dialog open={editorOpen} onOpenChange={(open) => { if (!saving) { if (!open) clearEditor(); else setEditorOpen(true); } }}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">{editingId ? "Edit poster" : "Create poster"}</DialogTitle>
            <DialogDescription>Upload a poster, set its button and choose exactly where visitors should go.</DialogDescription>
          </DialogHeader>
          <form onSubmit={saveDraft} className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="mobile-poster-title" className="text-sm font-semibold text-foreground">Poster name</label>
                <Input id="mobile-poster-title" value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} maxLength={120} placeholder="e.g. Free SEO Audit" required />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="mobile-poster-image" className="text-sm font-semibold text-foreground">Poster image</label>
                <Input id="mobile-poster-image" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" onChange={chooseImage} />
                <p className="text-xs text-muted-foreground">JPG, PNG, WebP, AVIF or GIF. Less than 10 MB. A 4:5 portrait image is recommended.</p>
                {(previewUrl || draft.imageUrl) ? (
                  <div className="relative mt-2 max-w-xs overflow-hidden rounded-xl border border-border/70 bg-muted">
                    <img src={previewUrl || draft.imageUrl} alt="Poster preview" className="aspect-[4/5] w-full object-cover" />
                    {selectedFile ? <span className="absolute bottom-2 left-2 rounded-full bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold text-white">New image</span> : null}
                  </div>
                ) : (
                  <div className="flex aspect-[4/5] max-h-40 max-w-xs flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 text-muted-foreground">
                    <UploadCloud className="h-6 w-6" />
                    <span className="text-xs">Image preview</span>
                  </div>
                )}
                {saving && selectedFile ? (
                  <div className="space-y-1">
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-orange-600 transition-all" style={{ width: uploadProgress + "%" }} />
                    </div>
                    <p className="text-xs text-muted-foreground">Uploading image: {uploadProgress}%</p>
                  </div>
                ) : null}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="mobile-poster-alt" className="text-sm font-semibold text-foreground">Image alt text</label>
                <Input id="mobile-poster-alt" value={draft.imageAlt} onChange={(event) => setDraft((current) => ({ ...current, imageAlt: event.target.value }))} maxLength={180} placeholder="Describe what this poster shows" required />
                <p className="text-xs text-muted-foreground">Use a short, accurate description for accessibility.</p>
              </div>
              <div className="space-y-2">
                <label htmlFor="mobile-poster-button" className="text-sm font-semibold text-foreground">Button text</label>
                <Input id="mobile-poster-button" value={draft.buttonText} onChange={(event) => setDraft((current) => ({ ...current, buttonText: event.target.value }))} maxLength={40} placeholder="Explore Service" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="mobile-poster-order" className="text-sm font-semibold text-foreground">Display order</label>
                <Input id="mobile-poster-order" type="number" min={0} step={1} value={draft.displayOrder} onChange={(event) => setDraft((current) => ({ ...current, displayOrder: Number(event.target.value) }))} required />
                <p className="text-xs text-muted-foreground">Lower numbers appear first.</p>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="mobile-poster-link" className="text-sm font-semibold text-foreground">Button destination URL</label>
                <Input id="mobile-poster-link" value={draft.targetUrl} onChange={(event) => setDraft((current) => ({ ...current, targetUrl: event.target.value }))} placeholder="/services/seo-optimization" required />
                <p className="text-xs text-muted-foreground">Use any internal path such as /services/seo-optimization or a full HTTPS URL. This button will open that destination.</p>
              </div>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/70 p-3 sm:col-span-2">
                <input type="checkbox" checked={draft.isPublished} onChange={(event) => setDraft((current) => ({ ...current, isPublished: event.target.checked }))} className="mt-1 h-4 w-4 accent-orange-600" />
                <span>
                  <span className="block text-sm font-semibold text-foreground">Publish on homepage</span>
                  <span className="mt-1 block text-xs text-muted-foreground">Turn this off to save the poster without displaying it in the carousel.</span>
                </span>
              </label>
            </div>

            {formError ? <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{formError}</p> : null}

            <div className="flex flex-col-reverse gap-2 border-t border-border/60 pt-4 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={clearEditor} disabled={saving} className="rounded-xl">
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
              <Button type="submit" disabled={saving} className="rounded-xl bg-orange-600 font-bold text-white hover:bg-orange-500">
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {saving ? "Saving…" : editingId ? "Save changes" : "Create poster"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
