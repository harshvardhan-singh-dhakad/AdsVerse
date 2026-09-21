"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import AdsVerseLogo from "@/components/AdsVerseLogo";
import { Loader2, Save, RotateCcw, ExternalLink } from "lucide-react";
import { DEFAULT_BRAND, type BrandSettings } from "@/lib/brand-defaults";
import { useToast } from "@/hooks/use-toast";

const fields: Array<{ key: keyof BrandSettings; label: string; description?: string; type?: "text" | "url" | "textarea" }> = [
  { key: "siteName", label: "Company Name" },
  { key: "tagline", label: "Tagline" },
  { key: "description", label: "Brand Description", type: "textarea" },
  { key: "logoUrl", label: "Custom Logo URL", type: "url", description: "Leave blank to use the built-in AdsVerse SVG logo." },
  { key: "ogImageUrl", label: "Default OG Image URL", type: "url" },
  { key: "faviconUrl", label: "Favicon URL", type: "url" },
  { key: "email", label: "Contact Email" },
  { key: "phone", label: "Contact Phone" },
  { key: "address", label: "Business Address", type: "textarea" },
  { key: "instagramUrl", label: "Instagram URL", type: "url" },
  { key: "facebookUrl", label: "Facebook URL", type: "url" },
  { key: "xUrl", label: "X / Twitter URL", type: "url" },
  { key: "linkedinUrl", label: "LinkedIn URL", type: "url" },
  { key: "googleBusinessUrl", label: "Google Business Profile URL", type: "url" },
];

export function BrandSettings() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [form, setForm] = useState<BrandSettings>(DEFAULT_BRAND);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const snapshot = await getDoc(doc(firestore, "brandSettings", "global"));
        if (!cancelled && snapshot.exists()) {
          setForm({ ...DEFAULT_BRAND, ...(snapshot.data() as Partial<BrandSettings>) });
        }
      } catch (error: any) {
        if (!cancelled) {
          toast({
            variant: "destructive",
            title: "Brand settings could not load",
            description: error?.message || "Please refresh and try again.",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [firestore, toast]);

  const update = (key: keyof BrandSettings, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const save = async () => {
    setSaving(true);
    try {
      await setDoc(
        doc(firestore, "brandSettings", "global"),
        { ...form, updatedAt: serverTimestamp() },
        { merge: true }
      );
      toast({
        title: "Brand settings saved",
        description: "Website and admin branding will use these values after refresh.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Save failed",
        description: error?.message || "You may not have administrator permission.",
      });
    } finally {
      setSaving(false);
    }
  };

  const resetDefaults = () => {
    setForm(DEFAULT_BRAND);
    toast({ title: "Defaults restored", description: "Click Save to apply the default branding." });
  };

  if (loading) {
    return (
      <div className="flex min-h-[360px] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Brand System</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Brand Settings</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Manage the shared identity used by the public website and admin workspace.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetDefaults} disabled={saving}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.75fr]">
        <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            {fields.map((field) => (
              <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                <Label htmlFor={String(field.key)}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={String(field.key)}
                    value={form[field.key]}
                    onChange={(event) => update(field.key, event.target.value)}
                    className="mt-2 min-h-28"
                  />
                ) : (
                  <Input
                    id={String(field.key)}
                    type={field.type || "text"}
                    value={form[field.key]}
                    onChange={(event) => update(field.key, event.target.value)}
                    className="mt-2"
                  />
                )}
                {field.description && (
                  <p className="mt-1.5 text-xs text-muted-foreground">{field.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-card/60 p-6 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">Live Preview</p>
          <div className="mt-4 rounded-2xl border border-border/60 bg-background/80 p-6">
            <AdsVerseLogo logoUrl={form.logoUrl || undefined} size="text-3xl" />
            <Separator className="my-6" />
            <p className="text-lg font-bold">{form.siteName}</p>
            <p className="mt-1 text-sm text-primary">{form.tagline}</p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{form.description}</p>
          </div>

          {form.logoUrl && (
            <a
              href={form.logoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
            >
              Open custom logo <ExternalLink className="h-3 w-3" />
            </a>
          )}

          <div className="mt-6 rounded-2xl border border-border/60 bg-muted/20 p-4 text-xs text-muted-foreground">
            <p className="font-bold text-foreground">Logo behavior</p>
            <p className="mt-1">
              Blank logo URL keeps the current inline AdsVerse logo. A valid transparent image URL replaces it across synced surfaces.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
