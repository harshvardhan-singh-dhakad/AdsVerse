"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader2, Save, RotateCcw, ExternalLink, Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { INDUSTRY_FIELD_LABELS, INDUSTRY_EDITABLE_FIELDS, type IndustryEditableField } from "@/lib/industry-content-fields";

type IndustryRow = {
  slug: string;
  name: string;
  category: string;
  icon: string;
  summary: string;
  fields: Record<IndustryEditableField, string>;
  wordCount: number;
  hasCustomContent: boolean;
};

type ApiResponse = {
  success?: boolean;
  error?: string;
  industries?: IndustryRow[];
  wordCount?: number;
};

export function IndustryContentManager() {
  const { toast } = useToast();
  const [industries, setIndustries] = useState<IndustryRow[]>([]);
  const [selectedSlug, setSelectedSlug] = useState("coaching-classes");
  const [draft, setDraft] = useState<Record<IndustryEditableField, string> | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [loadError, setLoadError] = useState("");

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

  const isDirty = useMemo(() => {
    if (!selected || !draft) return false;
    return INDUSTRY_EDITABLE_FIELDS.some((field) => draft[field] !== selected.fields[field]);
  }, [draft, selected]);

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
      setIndustries(payload.industries);
      setSelectedSlug((current) =>
        payload.industries!.some((item) => item.slug === current)
          ? current
          : payload.industries!.find((item) => item.slug === "coaching-classes")?.slug || payload.industries![0]?.slug || ""
      );
    } catch (error: any) {
      setLoadError(error?.message || "Could not load industry pages.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadIndustries();
  }, [loadIndustries]);

  useEffect(() => {
    if (selected) setDraft({ ...selected.fields });
  }, [selected]);

  const chooseIndustry = (slug: string) => {
    if (slug === selectedSlug) return;
    if (isDirty && !window.confirm("Discard unsaved edits and switch industry?")) return;
    setSelectedSlug(slug);
  };

  const updateField = (field: IndustryEditableField, value: string) => {
    setDraft((current) => current ? { ...current, [field]: value } : current);
  };

  const save = async () => {
    if (!selected || !draft) return;
    setSaving(true);
    try {
      const response = await fetch("/api/admin/industry-pages", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: selected.slug, fields: draft }),
      });
      const payload = (await response.json()) as ApiResponse;
      if (!response.ok) throw new Error(payload.error || "Could not save industry content.");
      toast({
        title: "Industry page saved",
        description: "Estimated page length: " + (payload.wordCount || selected.wordCount).toLocaleString("en-IN") + " words. The public page refreshes through the site's cache revalidation.",
      });
      await loadIndustries();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Save failed",
        description: error?.message || "Could not save industry content.",
      });
    } finally {
      setSaving(false);
    }
  };

  const reset = async () => {
    if (!selected) return;
    if (!window.confirm("Reset " + selected.name + " to the original code-managed content? This removes its saved override.")) return;
    setResetting(true);
    try {
      const response = await fetch("/api/admin/industry-pages?slug=" + encodeURIComponent(selected.slug), {
        method: "DELETE",
        credentials: "same-origin",
      });
      const payload = (await response.json()) as ApiResponse;
      if (!response.ok) throw new Error(payload.error || "Could not reset industry content.");
      toast({ title: "Industry content reset", description: "The original AdsVerse content is restored." });
      await loadIndustries();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Reset failed", description: error?.message || "Could not reset industry content." });
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
            Edit the tailored content fields for each industry. Pages retain their structured SEO sections and AI-readability block.
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
            Save Content
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
              {isDirty && <p className="mt-4 rounded-lg bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-700 dark:text-amber-300">Unsaved edits — save before switching pages.</p>}
            </div>

            <div className="grid gap-5">
              {INDUSTRY_EDITABLE_FIELDS.map((field) => (
                <div key={field} className="rounded-2xl border border-border/60 bg-card/35 p-4 md:p-5">
                  <label htmlFor={"industry-field-" + field} className="mb-2 block text-sm font-extrabold text-foreground">{INDUSTRY_FIELD_LABELS[field]}</label>
                  <Textarea id={"industry-field-" + field} rows={5} value={draft[field]} onChange={(event) => updateField(field, event.target.value)} className="resize-y bg-background/70 leading-7" />
                  <p className="mt-2 text-xs text-muted-foreground">Industry-specific detail only. Keep claims factual and avoid keyword repetition or guaranteed outcomes.</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card/50 p-4">
              <p className="flex items-center gap-2 text-sm text-muted-foreground"><FileText className="h-4 w-4" /> A successful save refreshes the public industry page and directory cache.</p>
              <Button onClick={save} disabled={!isDirty || saving || resetting}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save Content
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
