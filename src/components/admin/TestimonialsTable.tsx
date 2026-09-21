"use client";

import { useMemo, useState } from "react";
import { addDoc, collection, deleteDoc, doc, query, setDoc } from "firebase/firestore";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Upload, Pencil, Trash2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DEFAULT_TESTIMONIALS, type TestimonialItem } from "@/lib/content-defaults";

type FormState = Omit<TestimonialItem, "id">;

const emptyForm: FormState = {
  name: "",
  role: "",
  text: "",
  initials: "",
  rating: 5,
  isPublished: true,
  displayOrder: 0,
};

export function TestimonialsTable() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TestimonialItem | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const q = useMemoFirebase(
    () => query(collection(firestore, "testimonials")),
    [firestore]
  );
  const { data: items, isLoading, error } = useCollection<TestimonialItem>(q);

  const orderedItems = useMemo(() => {
    return [...(items || [])].sort((a, b) => {
      const aOrder = Number.isFinite(Number(a.displayOrder)) ? Number(a.displayOrder) : Number.MAX_SAFE_INTEGER;
      const bOrder = Number.isFinite(Number(b.displayOrder)) ? Number(b.displayOrder) : Number.MAX_SAFE_INTEGER;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return String(a.name || "").localeCompare(String(b.name || ""));
    });
  }, [items]);

  const startNew = () => {
    setEditing(null);
    setForm({ ...emptyForm, displayOrder: items?.length || 0 });
    setOpen(true);
  };

  const startEdit = (item: TestimonialItem) => {
    setEditing(item);
    setForm({
      name: item.name || "",
      role: item.role || "",
      text: item.text || "",
      initials: item.initials || "",
      rating: Number.isFinite(Number(item.rating)) ? Math.min(5, Math.max(1, Number(item.rating))) : 5,
      isPublished: item.isPublished !== false,
      displayOrder: Number.isFinite(Number(item.displayOrder)) ? Number(item.displayOrder) : 0,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.name.trim() || !form.text.trim()) {
      toast({ variant: "destructive", title: "Name and testimonial are required." });
      return;
    }

    setSaving(true);
    try {
      const rawRating = Number(form.rating);
      const safeRating = Number.isFinite(rawRating) ? Math.min(5, Math.max(1, Math.round(rawRating))) : 5;
      const rawOrder = Number(form.displayOrder);
      const safeOrder = Number.isFinite(rawOrder) && rawOrder >= 0 ? Math.floor(rawOrder) : 0;

      const payload = {
        name: form.name.trim(),
        role: form.role.trim(),
        text: form.text.trim(),
        initials: (form.initials.trim() || form.name.trim().slice(0, 2)).toUpperCase(),
        rating: safeRating,
        isPublished: form.isPublished !== false,
        displayOrder: safeOrder,
      };

      if (editing) {
        await setDoc(doc(firestore, "testimonials", editing.id), payload, { merge: true });
      } else {
        await addDoc(collection(firestore, "testimonials"), payload);
      }

      toast({ title: "Testimonial saved" });
      setOpen(false);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Save failed", description: error?.message });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await deleteDoc(doc(firestore, "testimonials", id));
      toast({ title: "Testimonial deleted" });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: error?.message || "Unable to delete this testimonial.",
      });
    }
  };

  const importDefaults = async () => {
    if (items?.length) {
      toast({
        variant: "destructive",
        title: "Import skipped",
        description: "Testimonials already exist in the CMS. Import is only available for an empty collection.",
      });
      return;
    }
    setSaving(true);
    try {
      await Promise.all(
        DEFAULT_TESTIMONIALS.map((item, index) =>
          setDoc(doc(firestore, "testimonials", `testimonial-default-${index + 1}`), {
            ...item,
            rating: 5,
            isPublished: true,
            displayOrder: index,
          })
        )
      );
      toast({ title: "Defaults imported", description: "You can now edit these testimonials from Admin." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Import failed", description: error?.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Social Proof</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Testimonials</h2>
          <p className="mt-2 text-sm text-muted-foreground">Manage homepage testimonials and client proof from one CMS collection.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!items?.length && !error && (
            <Button variant="outline" onClick={importDefaults} disabled={saving}>
              <Upload className="mr-2 h-4 w-4" /> Import Current Defaults
            </Button>
          )}
          <Button onClick={startNew} disabled={saving}>
            <Plus className="mr-2 h-4 w-4" /> Add Testimonial
          </Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-600">
          <strong className="text-red-700">Could not load testimonials.</strong>
          <p className="mt-1">{(error as Error)?.message || "Firestore returned an error while loading testimonials."}</p>
        </div>
      ) : !items?.length && !isLoading && (
        <div className="rounded-3xl border border-dashed border-primary/30 bg-primary/5 p-6 text-sm text-muted-foreground">
          <strong className="text-foreground">Migration-safe mode:</strong> the public homepage is still using its existing fallback testimonials. Import them once to move control fully into Admin.
        </div>
      )}

      <div className="grid gap-4">
        {isLoading ? (
          <div className="flex min-h-48 items-center justify-center"><Loader2 className="h-7 w-7 animate-spin text-primary" /></div>
        ) : (
          orderedItems.map((item) => (
            <div key={item.id} className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm">
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 font-black text-primary">{item.initials}</div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold">{item.name}</h3>
                      <Badge variant={item.isPublished === false ? "outline" : "secondary"}>
                        {item.isPublished === false ? "Draft" : "Published"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                    <div className="mt-2 flex gap-0.5" aria-label={`${item.rating || 5} star rating`}>
                      {Array.from({ length: item.rating || 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current text-amber-500" />)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => startEdit(item)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="destructive" size="icon" onClick={() => remove(item.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
              <p className="mt-5 whitespace-pre-line text-sm leading-7 text-muted-foreground">“{item.text}”</p>
            </div>
          ))
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{editing ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle></DialogHeader>
          <div className="grid gap-5 py-2">
            <div className="grid gap-4 md:grid-cols-2">
              <div><Label>Name</Label><Input className="mt-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>Role / Company</Label><Input className="mt-2" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} /></div>
            </div>
            <div><Label>Testimonial</Label><Textarea className="mt-2 min-h-36" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} /></div>
            <div className="grid gap-4 md:grid-cols-3">
              <div><Label>Initials</Label><Input className="mt-2" value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value })} placeholder="RA" /></div>
              <div><Label>Rating</Label><Input className="mt-2" type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} /></div>
              <div><Label>Display Order</Label><Input className="mt-2" type="number" min={0} value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })} /></div>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border/60 p-4">
              <div><p className="font-semibold">Published</p><p className="text-xs text-muted-foreground">Visible on the public homepage.</p></div>
              <Switch checked={form.isPublished !== false} onCheckedChange={(value) => setForm({ ...form, isPublished: value })} />
            </div>
            <Button onClick={save} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save Testimonial</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
