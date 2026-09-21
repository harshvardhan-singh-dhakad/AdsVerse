"use client";

import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, orderBy, query, setDoc } from "firebase/firestore";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, Upload, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DEFAULT_HOME_FAQS,
  DEFAULT_SECTION_A_FAQS,
  DEFAULT_SECTION_B_FAQS,
  DEFAULT_SECTION_C_FAQS,
  type FAQItem,
} from "@/lib/content-defaults";

type FormState = Omit<FAQItem, "id">;
const emptyForm: FormState = {
  question: "",
  answer: "",
  section: "a",
  showOnHome: false,
  isPublished: true,
  displayOrder: 0,
};

export function FaqTable() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FAQItem | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const q = useMemoFirebase(
    () => query(collection(firestore, "faqs"), orderBy("displayOrder", "asc")),
    [firestore]
  );
  const { data: items, isLoading } = useCollection<FAQItem>(q);

  const startNew = () => {
    setEditing(null);
    setForm({ ...emptyForm, displayOrder: items?.length || 0 });
    setOpen(true);
  };

  const startEdit = (item: FAQItem) => {
    setEditing(item);
    setForm({ ...item, isPublished: item.isPublished !== false });
    setOpen(true);
  };

  const save = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      toast({ variant: "destructive", title: "Question and answer are required." });
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        question: form.question.trim(),
        answer: form.answer.trim(),
        displayOrder: Number(form.displayOrder || 0),
      };
      if (editing) {
        await setDoc(doc(firestore, "faqs", editing.id), payload, { merge: true });
      } else {
        await addDoc(collection(firestore, "faqs"), payload);
      }
      toast({ title: "FAQ saved" });
      setOpen(false);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Save failed", description: error?.message });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this FAQ?")) return;
    await deleteDoc(doc(firestore, "faqs", id));
    toast({ title: "FAQ deleted" });
  };

  const importDefaults = async () => {
    if (items?.length) return;
    setSaving(true);
    try {
      const homeQuestions = new Set(DEFAULT_HOME_FAQS.map((item) => item.question));
      const sections = [
        { section: "a" as const, items: DEFAULT_SECTION_A_FAQS },
        { section: "b" as const, items: DEFAULT_SECTION_B_FAQS },
        { section: "c" as const, items: DEFAULT_SECTION_C_FAQS },
      ];
      const writes = sections.flatMap(({ section, items: sectionItems }) =>
        sectionItems.map((item, index) =>
          setDoc(doc(firestore, "faqs", item.id), {
            ...item,
            section,
            showOnHome: homeQuestions.has(item.question),
            isPublished: true,
            displayOrder: index,
          })
        )
      );
      await Promise.all(writes);
      toast({ title: "FAQ defaults imported", description: "The full current FAQ set is now editable from Admin." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Import failed", description: error?.message });
    } finally {
      setSaving(false);
    }
  };

  const sectionLabel = (section: FAQItem["section"]) =>
    section === "a" ? "AI & Search" : section === "b" ? "Automation & WhatsApp" : "Business & Growth";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Answer Engine Content</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">FAQ Management</h2>
          <p className="mt-2 text-sm text-muted-foreground">Control the public FAQ page, homepage FAQ block, and FAQPage schema from one collection.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {!items?.length && <Button variant="outline" onClick={importDefaults} disabled={saving}><Upload className="mr-2 h-4 w-4" /> Import Current FAQs</Button>}
          <Button onClick={startNew} disabled={saving}><Plus className="mr-2 h-4 w-4" /> Add FAQ</Button>
        </div>
      </div>

      {!items?.length && !isLoading && (
        <div className="rounded-3xl border border-dashed border-primary/30 bg-primary/5 p-6 text-sm text-muted-foreground">
          <strong className="text-foreground">Migration-safe mode:</strong> the public FAQ page continues using its existing fallback set until you import it into the CMS.
        </div>
      )}

      <div className="grid gap-4">
        {isLoading ? (
          <div className="flex min-h-48 items-center justify-center"><Loader2 className="h-7 w-7 animate-spin text-primary" /></div>
        ) : (
          items?.map((item) => (
            <div key={item.id} className="rounded-3xl border border-border/60 bg-card/60 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{sectionLabel(item.section)}</Badge>
                    {item.showOnHome && <Badge className="bg-primary/10 text-primary border border-primary/20">Homepage</Badge>}
                    {item.isPublished === false && <Badge variant="outline">Draft</Badge>}
                  </div>
                  <h3 className="font-bold leading-6">{item.question}</h3>
                  <p className="text-sm leading-6 text-muted-foreground line-clamp-3">{item.answer}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button variant="outline" size="icon" onClick={() => startEdit(item)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="destructive" size="icon" onClick={() => remove(item.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader><DialogTitle>{editing ? "Edit FAQ" : "Add FAQ"}</DialogTitle></DialogHeader>
          <div className="grid gap-5 py-2">
            <div><Label>Question</Label><Input className="mt-2" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} /></div>
            <div><Label>Answer</Label><Textarea className="mt-2 min-h-40" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} /></div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label>Section</Label>
                <Select value={form.section} onValueChange={(value: FAQItem["section"]) => setForm({ ...form, section: value })}>
                  <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">AI & Search</SelectItem>
                    <SelectItem value="b">Automation & WhatsApp</SelectItem>
                    <SelectItem value="c">Business & Growth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Display Order</Label><Input className="mt-2" type="number" min={0} value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })} /></div>
              <div className="flex items-end justify-between rounded-xl border border-border/60 p-3">
                <div><p className="text-sm font-semibold">Homepage</p><p className="text-[10px] text-muted-foreground">Show in home FAQ block</p></div>
                <Switch checked={!!form.showOnHome} onCheckedChange={(value) => setForm({ ...form, showOnHome: value })} />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-border/60 p-4">
              <div><p className="font-semibold">Published</p><p className="text-xs text-muted-foreground">Visible to public pages and schema.</p></div>
              <Switch checked={form.isPublished !== false} onCheckedChange={(value) => setForm({ ...form, isPublished: value })} />
            </div>
            <Button onClick={save} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save FAQ</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
