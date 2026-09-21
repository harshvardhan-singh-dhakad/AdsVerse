'use client';

import { useRef, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useStorage } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Copy, ImagePlus, Loader2, UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

export type InlineUploadedImage = {
  url: string;
  alt: string;
  name: string;
};

type InlineImageUploaderProps = {
  onInsert: (image: InlineUploadedImage) => void;
  autoInsert?: boolean;
  compact?: boolean;
};

const ROOT = 'blog-inline';

function cleanAlt(name: string) {
  return name
    .replace(/\.[^/.]+$/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function safeFileName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function InlineImageUploader({
  onInsert,
  autoInsert = false,
  compact = false,
}: InlineImageUploaderProps) {
  const storage = useStorage();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [uploaded, setUploaded] = useState<InlineUploadedImage[]>([]);

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
    setProgress({});

    try {
      const results = await Promise.all(
        list.map(
          (file) =>
            new Promise<InlineUploadedImage>((resolve, reject) => {
              const path = `${ROOT}/${Date.now()}-${Math.random()
                .toString(36)
                .slice(2, 8)}-${safeFileName(file.name)}`;
              const storageRef = ref(storage, path);
              const task = uploadBytesResumable(storageRef, file, {
                contentType: file.type,
                cacheControl: 'public,max-age=31536000,immutable',
                customMetadata: { alt: cleanAlt(file.name) },
              });

              task.on(
                'state_changed',
                (snapshot) => {
                  setProgress((current) => ({
                    ...current,
                    [path]: Math.round(
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    ),
                  }));
                },
                reject,
                async () => {
                  try {
                    const url = await getDownloadURL(task.snapshot.ref);
                    resolve({
                      url,
                      alt: cleanAlt(file.name),
                      name: file.name,
                    });
                  } catch (error) {
                    reject(error);
                  }
                }
              );
            })
        )
      );

      setUploaded((current) => [...results, ...current]);
      results.forEach((image) => {
        if (autoInsert) onInsert(image);
      });

      toast({
        title: `${results.length} image${results.length > 1 ? 's' : ''} uploaded`,
        description: autoInsert
          ? 'Images were inserted at the current editor position.'
          : 'Images are ready. Click Insert at cursor.',
      });
    } catch (error) {
      console.error('Inline image upload failed:', error);
      toast({
        title: 'Upload failed',
        description: 'One or more images could not be uploaded.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      setProgress({});
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: 'Image URL copied' });
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Clipboard access is blocked by the browser.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div
      className={cn(
        'space-y-3 border-b border-border/10 bg-muted/10 p-3',
        compact && 'p-2'
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => {
          if (event.target.files) void uploadFiles(event.target.files);
        }}
      />

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size={compact ? 'sm' : 'default'}
          className="rounded-lg text-xs font-bold"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <ImagePlus className="mr-2 h-4 w-4" />
          )}
          <UploadCloud className="mr-1 h-3.5 w-3.5" />
          {uploading ? 'Uploading…' : 'Upload images'}
        </Button>
        <span className="text-[10px] text-muted-foreground">
          Select multiple · PNG/JPG/WEBP · max 10 MB
        </span>
      </div>

      {uploading && Object.keys(progress).length > 0 && (
        <div className="space-y-1.5">
          {Object.entries(progress).map(([path, value]) => (
            <div key={path} className="flex items-center gap-2">
              <Progress value={value} className="h-1.5 flex-1" />
              <span className="w-10 text-right text-[9px] font-bold text-muted-foreground">
                {value}%
              </span>
            </div>
          ))}
        </div>
      )}

      {!autoInsert && uploaded.length > 0 && (
        <div className="space-y-2">
          {uploaded.map((image) => (
            <div
              key={image.url}
              className="flex items-center gap-2 rounded-lg border border-border/30 bg-background/70 p-2"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="h-10 w-14 rounded object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-semibold text-foreground">
                  {image.name}
                </p>
                <p className="truncate font-mono text-[9px] text-muted-foreground">
                  {image.url}
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                className="h-8 rounded-md px-2 text-[10px] font-bold"
                onClick={() => onInsert(image)}
              >
                Insert
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => void copyUrl(image.url)}
                title="Copy image URL"
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
