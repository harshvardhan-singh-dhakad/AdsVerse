'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  listAll,
  ref,
  updateMetadata,
  uploadBytesResumable,
} from 'firebase/storage';
import { useStorage } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import {
  Check,
  Copy,
  FileImage,
  ImagePlus,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  UploadCloud,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type BlogMediaItem = {
  fullPath: string;
  name: string;
  url: string;
  alt: string;
  size: number;
  contentType: string;
  updatedAt?: string;
};

type MediaLibraryProps = {
  onInsert?: (item: BlogMediaItem) => void;
  onSetFeatured?: (item: BlogMediaItem) => void;
  compact?: boolean;
};

const MEDIA_ROOT = 'blog-media';

function cleanAlt(name: string) {
  return name
    .replace(/\.[^/.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function MediaLibrary({ onInsert, onSetFeatured, compact = false }: MediaLibraryProps) {
  const storage = useStorage();
  const { toast } = useToast();
  const [items, setItems] = useState<BlogMediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploading, setUploading] = useState(false);
  const [busyPath, setBusyPath] = useState<string | null>(null);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const root = ref(storage, MEDIA_ROOT);
      const result = await listAll(root);
      const next: BlogMediaItem[] = [];

      await Promise.all(
        result.items.map(async (itemRef) => {
          try {
            const [url, meta] = await Promise.all([getDownloadURL(itemRef), getMetadata(itemRef)]);
            next.push({
              fullPath: itemRef.fullPath,
              name: meta.name || itemRef.name,
              url,
              alt: meta.customMetadata?.alt || cleanAlt(meta.name || itemRef.name),
              size: meta.size || 0,
              contentType: meta.contentType || 'image/*',
              updatedAt: meta.updated || undefined,
            });
          } catch {
            // Ignore individual broken files and keep the library usable.
          }
        })
      );

      next.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
      setItems(next);
    } catch (error) {
      console.error('Media library load failed:', error);
      toast({
        title: 'Media library unavailable',
        description: 'Unable to read blog media from Firebase Storage.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [storage, toast]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const filteredItems = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((item) => (item.name + ' ' + item.alt).toLowerCase().includes(needle));
  }, [items, query]);

  const uploadFiles = async (files: FileList | File[]) => {
    const list = Array.from(files);
    if (!list.length) return;

    const invalid = list.find(
      (file) => !file.type.startsWith('image/') || file.size > 10 * 1024 * 1024
    );
    if (invalid) {
      toast({
        title: 'Invalid image',
        description: 'Only image files up to 10 MB are allowed.',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      await Promise.all(
        list.map(
          (file) =>
            new Promise<void>((resolve, reject) => {
              const safeName = file.name
                .toLowerCase()
                .replace(/[^a-z0-9.]+/g, '-')
                .replace(/-+/g, '-');
              const path =
                MEDIA_ROOT +
                '/' +
                Date.now() +
                '-' +
                Math.random().toString(36).slice(2, 8) +
                '-' +
                safeName;
              const storageRef = ref(storage, path);
              const task = uploadBytesResumable(storageRef, file, {
                contentType: file.type,
                cacheControl: 'public,max-age=31536000,immutable',
                customMetadata: { alt: cleanAlt(file.name) },
              });

              task.on(
                'state_changed',
                (snapshot) => {
                  setUploadProgress((current) => ({
                    ...current,
                    [path]: Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
                  }));
                },
                reject,
                async () => {
                  try {
                    await getDownloadURL(task.snapshot.ref);
                    resolve();
                  } catch (error) {
                    reject(error);
                  }
                }
              );
            })
        )
      );

      toast({
        title: String(list.length) + ' image' + (list.length > 1 ? 's' : '') + ' uploaded',
        description: 'Your media library is ready for insertion.',
      });
      await loadMedia();
    } catch (error) {
      console.error('Media upload failed:', error);
      toast({
        title: 'Upload failed',
        description: 'One or more images could not be uploaded.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  const removeItem = async (item: BlogMediaItem) => {
    if (!window.confirm('Delete "' + item.name + '" from the media library?')) return;

    setBusyPath(item.fullPath);
    try {
      await deleteObject(ref(storage, item.fullPath));
      setItems((current) => current.filter((entry) => entry.fullPath !== item.fullPath));
      toast({ title: 'Image deleted', description: 'The file was removed from Firebase Storage.' });
    } catch (error) {
      console.error('Media delete failed:', error);
      toast({
        title: 'Delete failed',
        description: 'The image could not be deleted.',
        variant: 'destructive',
      });
    } finally {
      setBusyPath(null);
    }
  };

  const editAlt = async (item: BlogMediaItem) => {
    const alt = window.prompt('Image alt text', item.alt);
    if (alt === null || !alt.trim()) return;

    setBusyPath(item.fullPath);
    try {
      await updateMetadata(ref(storage, item.fullPath), {
        customMetadata: { alt: alt.trim() },
      });
      setItems((current) =>
        current.map((entry) => (entry.fullPath === item.fullPath ? { ...entry, alt: alt.trim() } : entry))
      );
      toast({ title: 'Alt text updated' });
    } catch (error) {
      console.error('Alt metadata update failed:', error);
      toast({
        title: 'Could not update alt text',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setBusyPath(null);
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: 'URL copied' });
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Clipboard access is blocked by the browser.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className={cn('space-y-5', compact && 'space-y-4')}>
      <div
        className={cn(
          'rounded-2xl border border-dashed border-primary/25 bg-primary/[0.04] p-5',
          'transition-colors hover:border-primary/40'
        )}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          void uploadFiles(event.dataTransfer.files);
        }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ImagePlus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Blog media library</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Upload multiple images, then insert them directly into the article. PNG, JPG, WEBP up to 10 MB.
              </p>
            </div>
          </div>

          <label className="inline-flex cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(event) => {
                const files = event.target.files;
                if (files) void uploadFiles(files);
                event.currentTarget.value = '';
              }}
            />
            <span className="inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90">
              <UploadCloud className="h-4 w-4" />
              {uploading ? 'Uploading…' : 'Upload images'}
            </span>
          </label>
        </div>

        {uploading && Object.values(uploadProgress).length > 0 && (
          <div className="mt-4 space-y-2">
            {Object.entries(uploadProgress).map(([path, progress]) => (
              <div key={path}>
                <div className="mb-1 flex items-center justify-between text-[10px] font-medium text-muted-foreground">
                  <span className="max-w-[70%] truncate">{path.split('/').pop()}</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search media by filename or alt text…"
            className="h-10 rounded-xl border-border/60 bg-background/70 pl-9"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-xl"
          onClick={() => void loadMedia()}
          disabled={loading}
        >
          <RefreshCw className={cn('mr-2 h-4 w-4', loading && 'animate-spin')} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-border/50 bg-muted/10">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="flex min-h-40 flex-col items-center justify-center rounded-2xl border border-border/50 bg-muted/10 px-6 text-center">
          <FileImage className="h-8 w-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm font-medium text-foreground">No images found</p>
          <p className="mt-1 text-xs text-muted-foreground">Upload your first blog image above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item) => (
            <div
              key={item.fullPath}
              className="group overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted/30">
                <img
                  src={item.url}
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="space-y-2 p-3">
                <p className="line-clamp-1 text-xs font-semibold text-foreground" title={item.name}>
                  {item.name}
                </p>
                <p className="line-clamp-2 min-h-8 text-[10px] leading-4 text-muted-foreground" title={item.alt}>
                  {item.alt}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button type="button" className="h-8 rounded-lg text-[10px] font-bold" onClick={() => onInsert?.(item)}>
                    <Check className="mr-1 h-3.5 w-3.5" />
                    Insert
                  </Button>
                  <Button type="button" variant="outline" className="h-8 rounded-lg text-[10px] font-bold" onClick={() => onSetFeatured?.(item)}>
                    Featured
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <Button type="button" variant="ghost" className="h-8 rounded-lg px-0 text-muted-foreground" onClick={() => void copyUrl(item.url)} title="Copy image URL">
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button type="button" variant="ghost" className="h-8 rounded-lg px-0 text-muted-foreground" onClick={() => void editAlt(item)} title="Edit alt text" disabled={busyPath === item.fullPath}>
                    <span className="text-[10px] font-black">ALT</span>
                  </Button>
                  <Button type="button" variant="ghost" className="h-8 rounded-lg px-0 text-destructive hover:text-destructive" onClick={() => void removeItem(item)} title="Delete image" disabled={busyPath === item.fullPath}>
                    {busyPath === item.fullPath ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
