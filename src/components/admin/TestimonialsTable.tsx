"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useStorage } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Upload, Pencil, Trash2, Star, X, ExternalLink, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_TESTIMONIALS, type TestimonialItem } from "@/lib/content-defaults";

type FormState = Omit<TestimonialItem, "id">;
const emptyForm: FormState = {
  name: "", role: "", text: "", initials: "", rating: 5, isPublished: true, displayOrder: 0,
  photoUrl: "", photoStoragePath: "", photoAlt: "",
  screenshotUrl: "", screenshotStoragePath: "", screenshotAlt: "",
};
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function fileExtension(file: File) {
  return file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
}
function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().replace(/-/g, "")
    : "review-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}
async function responseJson(response: Response): Promise<Record<string, unknown>> {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(typeof data.error === "string" ? data.error : "Request failed.");
  return data as Record<string, unknown>;
}

export function TestimonialsTable() {
  const storage = useStorage();
  const { toast } = useToast();
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TestimonialItem | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [screenshotPreview, setScreenshotPreview] = useState("");
  const [saving, setSaving] = useState(false);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      const response = await fetch("/api/admin/testimonials", { cache: "no-store", credentials: "same-origin" });
      const data = await responseJson(response);
      const rows = Array.isArray(data.testimonials) ? data.testimonials as TestimonialItem[] : [];
      rows.sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0) || String(a.name || "").localeCompare(String(b.name || "")));
      setItems(rows);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Reviews could not be loaded.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { void loadItems(); }, [loadItems]);
  useEffect(() => {
    if (!photoFile) return;
    const url = URL.createObjectURL(photoFile);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile]);
  useEffect(() => {
    if (!screenshotFile) return;
    const url = URL.createObjectURL(screenshotFile);
    setScreenshotPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [screenshotFile]);

  const publishedCount = useMemo(() => items.filter((item) => item.isPublished !== false).length, [items]);

  const resetEditor = () => {
    setEditing(null);
    setForm(emptyForm);
    setPhotoFile(null);
    setScreenshotFile(null);
    setPhotoPreview("");
    setScreenshotPreview("");
  };
  const startNew = () => {
    resetEditor();
    setForm({ ...emptyForm, displayOrder: items.length });
    setOpen(true);
  };
  const startEdit = (item: TestimonialItem) => {
    setEditing(item);
    setForm({
      name: item.name || "", role: item.role || "", text: item.text || "", initials: item.initials || "",
      rating: Number.isFinite(Number(item.rating)) ? Math.min(5, Math.max(1, Number(item.rating))) : 5,
      isPublished: item.isPublished !== false, displayOrder: Number(item.displayOrder || 0),
      photoUrl: item.photoUrl || "", photoStoragePath: item.photoStoragePath || "", photoAlt: item.photoAlt || "",
      screenshotUrl: item.screenshotUrl || "", screenshotStoragePath: item.screenshotStoragePath || "", screenshotAlt: item.screenshotAlt || "",
    });
    setPhotoFile(null);
    setScreenshotFile(null);
    setPhotoPreview(item.photoUrl || "");
    setScreenshotPreview(item.screenshotUrl || "");
    setOpen(true);
  };
  const chooseImage = (file: File | undefined, kind: "photo" | "screenshot") => {
    if (!file) return;
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast({ variant: "destructive", title: "Unsupported format", description: "Use JPG, PNG, or WebP." });
      return;
    }
    if (file.size >= MAX_IMAGE_BYTES) {
      toast({ variant: "destructive", title: "Image is too large", description: "Each image must be under 10 MB." });
      return;
    }
    if (kind === "photo") {
      setPhotoFile(file);
      setForm((current) => ({ ...current, photoAlt: current.photoAlt || (current.name ? current.name + " — client profile photo" : "Client profile photo") }));
    } else {
      setScreenshotFile(file);
      setForm((current) => ({ ...current, screenshotAlt: current.screenshotAlt || (current.name ? current.name + " — review screenshot" : "Client review screenshot") }));
    }
  };
  const uploadImage = async (file: File, id: string, kind: "photo" | "screenshot") => {
    const path = "testimonials/" + id + "/" + kind + "-" + Date.now() + "." + fileExtension(file);
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file, { contentType: file.type, cacheControl: "public,max-age=31536000" });
    return { url: await getDownloadURL(storageRef), path };
  };

  const save = async () => {
    if (!form.name.trim() || !form.text.trim()) {
      toast({ variant: "destructive", title: "Name and review text are required." });
      return;
    }
    if (form.photoUrl && !(form.photoAlt || "").trim()) {
      toast({ variant: "destructive", title: "Add alt text for the customer photo." });
      return;
    }
    if (form.screenshotUrl && !(form.screenshotAlt || "").trim()) {
      toast({ variant: "destructive", title: "Add alt text for the review screenshot." });
      return;
    }

    setSaving(true);
    const id = editing?.id || makeId();
    const uploadedPaths: string[] = [];
    try {
      let photoUrl = form.photoUrl || "";
      let photoStoragePath = form.photoStoragePath || "";
      let screenshotUrl = form.screenshotUrl || "";
      let screenshotStoragePath = form.screenshotStoragePath || "";
      if (photoFile) {
        const result = await uploadImage(photoFile, id, "photo");
        uploadedPaths.push(result.path);
        photoUrl = result.url;
        photoStoragePath = result.path;
      }
      if (screenshotFile) {
        const result = await uploadImage(screenshotFile, id, "screenshot");
        uploadedPaths.push(result.path);
        screenshotUrl = result.url;
        screenshotStoragePath = result.path;
      }

      const rawRating = Number(form.rating);
      const rawOrder = Number(form.displayOrder);
      const payload = {
        id, name: form.name.trim(), role: form.role.trim(), text: form.text.trim(),
        initials: (form.initials.trim() || form.name.trim().slice(0, 2)).toUpperCase(),
        rating: Number.isFinite(rawRating) ? Math.min(5, Math.max(1, Math.round(rawRating))) : 5,
        isPublished: form.isPublished !== false,
        displayOrder: Number.isFinite(rawOrder) && rawOrder >= 0 ? Math.floor(rawOrder) : 0,
        photoUrl, photoStoragePath, photoAlt: (form.photoAlt || "").trim(),
        screenshotUrl, screenshotStoragePath, screenshotAlt: (form.screenshotAlt || "").trim(),
      };
      const response = await fetch("/api/admin/testimonials", {
        method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
      });
      await responseJson(response);

      const oldPaths = [editing?.photoStoragePath, editing?.screenshotStoragePath].filter((value): value is string => Boolean(value));
      const keep = new Set([photoStoragePath, screenshotStoragePath]);
      await Promise.all(oldPaths.filter((path) => !keep.has(path)).map((path) => deleteObject(ref(storage, path)).catch(() => undefined)));
      toast({ title: "Review saved", description: "The review and its images have been saved." });
      setOpen(false);
      resetEditor();
      await loadItems();
    } catch (error) {
      await Promise.all(uploadedPaths.map((path) => deleteObject(ref(storage, path)).catch(() => undefined)));
      toast({ variant: "destructive", title: "Could not save review", description: error instanceof Error ? error.message : "Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this review and its attached images?")) return;
    try {
      const response = await fetch("/api/admin/testimonials?id=" + encodeURIComponent(id), { method: "DELETE", credentials: "same-origin" });
      const data = await responseJson(response);
      const paths = Array.isArray(data.storagePaths) ? data.storagePaths.filter((value): value is string => typeof value === "string") : [];
      await Promise.all(paths.map((path) => deleteObject(ref(storage, path)).catch(() => undefined)));
      toast({ title: "Review deleted" });
      await loadItems();
    } catch (error) {
      toast({ variant: "destructive", title: "Delete failed", description: error instanceof Error ? error.message : "Unable to delete this review." });
    }
  };

  const importDefaults = async () => {
    if (items.length) {
      toast({ variant: "destructive", title: "Import skipped", description: "Reviews already exist. Existing data was left unchanged." });
      return;
    }
    setSaving(true);
    try {
      for (const [index, item] of DEFAULT_TESTIMONIALS.entries()) {
        const response = await fetch("/api/admin/testimonials", {
          method: "POST", credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: "testimonial-default-" + (index + 1), ...item, rating: 5, isPublished: true, displayOrder: index }),
        });
        await responseJson(response);
      }
      toast({ title: "Current testimonials imported", description: "You can now attach customer photos and screenshots." });
      await loadItems();
    } catch (error) {
      toast({ variant: "destructive", title: "Import failed", description: error instanceof Error ? error.message : "Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const removeImage = (kind: "photo" | "screenshot") => {
    if (kind === "photo") {
      setPhotoFile(null);
      setPhotoPreview("");
      setForm((current) => ({ ...current, photoUrl: "", photoStoragePath: "", photoAlt: "" }));
    } else {
      setScreenshotFile(null);
      setScreenshotPreview("");
      setForm((current) => ({ ...current, screenshotUrl: "", screenshotStoragePath: "", screenshotAlt: "" }));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Social Proof</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Reviews & Testimonials</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Add a customer name, written review, profile photo, and screenshot of the original feedback. Published items appear on the homepage.</p>
          <p className="mt-2 text-xs text-muted-foreground">{publishedCount} published · {items.length} total</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.length === 0 && !isLoading && !loadError && (
            <Button variant="outline" onClick={importDefaults} disabled={saving}><Upload className="mr-2 h-4 w-4" />Import Current Defaults</Button>
          )}
          <Button onClick={startNew} disabled={saving}><Plus className="mr-2 h-4 w-4" />Add Review</Button>
          <Button variant="outline" size="icon" onClick={() => void loadItems()} disabled={isLoading} aria-label="Refresh reviews"><RefreshCw className={"h-4 w-4 " + (isLoading ? "animate-spin" : "")} /></Button>
        </div>
      </div>

      {loadError && (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-600">
          <strong className="text-red-700">Could not load reviews.</strong>
          <p className="mt-1">{loadError}</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => void loadItems()}>Try again</Button>
        </div>
      )}
      {!loadError && items.length === 0 && !isLoading && (
        <div className="rounded-3xl border border-dashed border-primary/30 bg-primary/5 p-6 text-sm text-muted-foreground">
          <strong className="text-foreground">No reviews in Admin yet.</strong>
          <p className="mt-1">Add a review or import the current homepage testimonials, then attach photos and screenshots before publishing.</p>
        </div>
      )}

      <div className="grid gap-4">
        {isLoading ? <div className="flex min-h-48 items-center justify-center"><Loader2 className="h-7 w-7 animate-spin text-primary" /></div> : items.map((item) => (
          <div key={item.id} className="rounded-3xl border border-border/60 bg-card/60 p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 gap-4">
                {item.photoUrl ? <img src={item.photoUrl} alt={item.photoAlt || item.name} className="h-14 w-14 shrink-0 rounded-full border border-border object-cover" /> : <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 font-black text-primary">{item.initials}</div>}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{item.name}</h3><Badge variant={item.isPublished === false ? "outline" : "secondary"}>{item.isPublished === false ? "Draft" : "Published"}</Badge></div>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                  <div className="mt-2 flex gap-0.5" aria-label={String(item.rating || 5) + " star rating"}>
                    {Array.from({ length: Math.min(5, Math.max(1, Number(item.rating || 5))) }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current text-amber-500" />)}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => startEdit(item)} aria-label={"Edit " + item.name}><Pencil className="h-4 w-4" /></Button>
                <Button variant="destructive" size="icon" onClick={() => void remove(item.id)} aria-label={"Delete " + item.name}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground">“{item.text}”</p>
            {item.screenshotUrl ? <a href={item.screenshotUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex max-w-full items-center gap-2 rounded-xl border border-border/60 p-2 text-xs text-muted-foreground hover:border-primary/40"><img src={item.screenshotUrl} alt={item.screenshotAlt || (item.name + " review screenshot")} className="h-20 w-28 rounded-lg object-cover" /><span>View original review screenshot <ExternalLink className="ml-1 inline h-3 w-3" /></span></a> : null}
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={(value) => { setOpen(value); if (!value) resetEditor(); }}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Review" : "Add Review"}</DialogTitle></DialogHeader>
          <div className="grid gap-5 py-2">
            <div className="grid gap-4 md:grid-cols-2">
              <div><Label htmlFor="review-name">Customer name *</Label><Input id="review-name" className="mt-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label htmlFor="review-role">Role / Company</Label><Input id="review-role" className="mt-2" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
            </div>
            <div><Label htmlFor="review-text">Review text *</Label><Textarea id="review-text" className="mt-2 min-h-32" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} /></div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div><Label htmlFor="review-initials">Initials (fallback)</Label><Input id="review-initials" className="mt-2" value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value })} placeholder="RA" /></div>
              <div><Label htmlFor="review-rating">Rating</Label><Input id="review-rating" className="mt-2" type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} /></div>
              <div><Label htmlFor="review-order">Display order</Label><Input id="review-order" className="mt-2" type="number" min={0} value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })} /></div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-3 rounded-2xl border border-border/60 p-4">
                <div><Label>Customer profile photo</Label><p className="mt-1 text-xs text-muted-foreground">Optional square JPG, PNG or WebP image.</p></div>
                {photoPreview ? <div className="flex items-center gap-3"><img src={photoPreview} alt="Customer photo preview" className="h-20 w-20 rounded-full border border-border object-cover" /><Button type="button" size="sm" variant="outline" onClick={() => removeImage("photo")}><X className="mr-1 h-3.5 w-3.5" />Remove photo</Button></div> : null}
                <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => chooseImage(event.target.files?.[0], "photo")} />
                <div><Label htmlFor="review-photo-alt">Photo alt text</Label><Input id="review-photo-alt" className="mt-2" value={form.photoAlt || ""} onChange={(e) => setForm({ ...form, photoAlt: e.target.value })} placeholder="Customer profile photo" /></div>
              </div>
              <div className="space-y-3 rounded-2xl border border-border/60 p-4">
                <div><Label>Review screenshot</Label><p className="mt-1 text-xs text-muted-foreground">Upload a screenshot of the customer's actual review or feedback.</p></div>
                {screenshotPreview ? <div className="space-y-2"><img src={screenshotPreview} alt="Review screenshot preview" className="max-h-44 w-full rounded-xl border border-border object-contain bg-muted" /><Button type="button" size="sm" variant="outline" onClick={() => removeImage("screenshot")}><X className="mr-1 h-3.5 w-3.5" />Remove screenshot</Button></div> : null}
                <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => chooseImage(event.target.files?.[0], "screenshot")} />
                <div><Label htmlFor="review-screenshot-alt">Screenshot alt text</Label><Input id="review-screenshot-alt" className="mt-2" value={form.screenshotAlt || ""} onChange={(e) => setForm({ ...form, screenshotAlt: e.target.value })} placeholder="Screenshot of customer review" /></div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border/60 p-4">
              <div><p className="font-semibold">Publish on homepage</p><p className="text-xs text-muted-foreground">Only published reviews appear on the homepage.</p></div>
              <Switch checked={form.isPublished !== false} onCheckedChange={(value) => setForm({ ...form, isPublished: value })} />
            </div>
            <Button onClick={() => void save()} disabled={saving || !form.name.trim() || !form.text.trim()} className="w-full">
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              {saving ? "Uploading and saving..." : "Save review"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">Maximum 10 MB per image. Supported formats: JPG, PNG, WebP.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
