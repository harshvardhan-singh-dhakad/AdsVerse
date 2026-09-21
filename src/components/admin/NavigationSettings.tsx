"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { GripVertical, Loader2, Plus, Save, Trash2, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DEFAULT_NAVIGATION_LINKS,
  type NavigationLink,
} from "@/lib/navigation-defaults";

export function NavigationSettings() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [links, setLinks] = useState<NavigationLink[]>(DEFAULT_NAVIGATION_LINKS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const snapshot = await getDoc(doc(firestore, "navigationSettings", "global"));
        const data = snapshot.exists() ? snapshot.data() : null;
        const loaded = Array.isArray(data?.links)
          ? (data.links as NavigationLink[])
              .map((item) => ({
                href: String(item?.href || "").trim(),
                label: String(item?.label || "").trim(),
                enabled: item?.enabled !== false,
              }))
              .filter((item) => item.href && item.label)
          : [];

        if (!cancelled && loaded.length > 0) {
          setLinks(loaded);
        }
      } catch (error: any) {
        if (!cancelled) {
          toast({
            variant: "destructive",
            title: "Navigation settings could not load",
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

  const update = (index: number, field: keyof NavigationLink, value: string | boolean) => {
    setLinks((current) =>
      current.map((link, linkIndex) =>
        linkIndex === index ? { ...link, [field]: value } : link
      )
    );
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= links.length) return;

    setLinks((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const add = () => {
    setLinks((current) => [...current, { href: "/new-page", label: "New Link", enabled: true }]);
  };

  const remove = (index: number) => {
    if (!window.confirm("Remove this navigation link?")) return;
    setLinks((current) => current.filter((_, linkIndex) => linkIndex !== index));
  };

  const save = async () => {
    const invalid = links.find((link) => !link.label.trim() || !link.href.trim().startsWith("/"));
    if (invalid) {
      toast({
        variant: "destructive",
        title: "Invalid navigation link",
        description: "Each link needs a label and an internal path starting with /.",
      });
      return;
    }

    setSaving(true);
    try {
      await setDoc(
        doc(firestore, "navigationSettings", "global"),
        { links, updatedAt: serverTimestamp() },
        { merge: true }
      );
      toast({
        title: "Navigation saved",
        description: "The public header will use these links after refresh.",
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

  const reset = () => {
    setLinks(DEFAULT_NAVIGATION_LINKS);
    toast({ title: "Defaults restored", description: "Click Save to apply the default navigation." });
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
          <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">Site Structure</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Header Navigation</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Control the top-level public navigation without editing code. Existing mega-menu behavior remains attached to Services, Blog, and Locations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={reset} disabled={saving}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button variant="outline" onClick={add} disabled={saving}>
            <Plus className="mr-2 h-4 w-4" />
            Add Link
          </Button>
          <Button onClick={save} disabled={saving}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="rounded-3xl border border-border/60 bg-card/60 p-4 shadow-sm md:p-6">
        <div className="grid gap-3">
          {links.map((link, index) => (
            <div
              key={`${index}-${link.href}-${link.label}`}
              className="grid gap-4 rounded-2xl border border-border/60 bg-background/70 p-4 lg:grid-cols-[auto_1fr_1.4fr_auto_auto]"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <GripVertical className="h-4 w-4" />
                <span className="text-xs font-black">{index + 1}</span>
              </div>

              <div>
                <Label className="text-xs">Label</Label>
                <Input
                  value={link.label}
                  onChange={(event) => update(index, "label", event.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-xs">Internal Path</Label>
                <Input
                  value={link.href}
                  onChange={(event) => update(index, "href", event.target.value)}
                  className="mt-2 font-mono text-xs"
                  placeholder="/services"
                />
              </div>

              <div className="flex items-end gap-1">
                <Button type="button" variant="outline" size="icon" onClick={() => move(index, -1)} disabled={index === 0}>
                  ↑
                </Button>
                <Button type="button" variant="outline" size="icon" onClick={() => move(index, 1)} disabled={index === links.length - 1}>
                  ↓
                </Button>
              </div>

              <div className="flex items-end gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-border/60 px-3 py-2">
                  <Switch checked={link.enabled} onCheckedChange={(value) => update(index, "enabled", value)} />
                  <span className="text-xs font-semibold">{link.enabled ? "Visible" : "Hidden"}</span>
                </div>
                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-6" />

        <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4 text-sm text-muted-foreground">
          <p className="font-bold text-foreground">Safe navigation rules</p>
          <p className="mt-1">
            Only internal paths are accepted. Hidden links are removed from the public header but remain available in Admin for later re-enabling.
          </p>
        </div>
      </div>
    </div>
  );
}
