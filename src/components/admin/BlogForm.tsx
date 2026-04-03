'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BlogPost } from '@/lib/definitions';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase/index';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Upload, Image as ImageIcon, Loader2, Link as LinkIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const blogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug is required'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  imageUrl: z.string().url('Invalid image URL'),
  category: z.string().min(1, 'Category is required'),
  author: z.string().min(2, 'Author is required'),
  publishedDate: z.string(),
  isPublished: z.boolean().default(false),
});

type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormProps {
  initialData?: BlogPost | null;
  onSuccess?: () => void;
}

export function BlogForm({ initialData, onSuccess }: BlogFormProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData ? {
      ...initialData,
      isPublished: initialData.isPublished || false,
    } : {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      category: 'Marketing',
      author: 'AdsVerse Team',
      publishedDate: new Date().toISOString().split('T')[0],
      isPublished: false,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Error', description: 'Please select an image file', variant: 'destructive' });
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `blog/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error(error);
        toast({ title: 'Error', description: 'Failed to upload image', variant: 'destructive' });
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        form.setValue('imageUrl', downloadURL);
        setUploading(false);
        setProgress(0);
        toast({ title: 'Success', description: 'Image uploaded successfully' });
      }
    );
  };

  const onSubmit = async (values: BlogFormValues) => {
    try {
      if (initialData?.id) {
        await updateDoc(doc(db, 'public_blogPosts', initialData.id), {
          ...values,
          updatedAt: serverTimestamp(),
        });
        toast({ title: 'Success', description: 'Blog post updated successfully' });
      } else {
        await addDoc(collection(db, 'public_blogPosts'), {
          ...values,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast({ title: 'Success', description: 'Blog post created successfully' });
      }
      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Something went wrong', variant: 'destructive' });
    }
  };

  const generateSlug = () => {
    const title = form.getValues('title');
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    form.setValue('slug', slug);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Article Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter post title" 
                    {...field} 
                    onBlur={generateSlug} 
                    className="h-14 bg-white/5 border-white/10 rounded-2xl focus:bg-white/10 transition-all text-white placeholder:text-muted-foreground/30 font-bold px-6"
                  />
                </FormControl>
                <FormMessage className="text-[10px] font-bold text-red-400 ml-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Identifier (Slug)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="post-slug-url" 
                    {...field} 
                    className="h-14 bg-white/5 border-white/10 rounded-2xl focus:bg-white/10 transition-all text-white/50 placeholder:text-muted-foreground/30 font-mono text-sm px-6"
                  />
                </FormControl>
                <FormDescription className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">URL friendly version of the title</FormDescription>
                <FormMessage className="text-[10px] font-bold text-red-400 ml-1" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Content Vertical</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-14 bg-white/5 border-white/10 rounded-2xl focus:bg-white/10 transition-all text-white font-bold px-6">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#0d1017] border-white/10 rounded-2xl text-white">
                    <SelectItem value="Marketing" className="focus:bg-primary/20 hover:bg-primary/10">Marketing</SelectItem>
                    <SelectItem value="SEO" className="focus:bg-primary/20 hover:bg-primary/10">SEO</SelectItem>
                    <SelectItem value="Ads" className="focus:bg-primary/20 hover:bg-primary/10">Ads</SelectItem>
                    <SelectItem value="Automation" className="focus:bg-primary/20 hover:bg-primary/10">Automation</SelectItem>
                    <SelectItem value="Case Study" className="focus:bg-primary/20 hover:bg-primary/10">Case Study</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-[10px] font-bold text-red-400 ml-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Strategic Author</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className="h-14 bg-white/5 border-white/10 rounded-2xl focus:bg-white/10 transition-all text-white font-bold px-6"
                  />
                </FormControl>
                <FormMessage className="text-[10px] font-bold text-red-400 ml-1" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">
                <span>Visual Asset (Broadcasting Thumbnail)</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-[10px] text-primary h-7 uppercase tracking-[0.1em] font-black bg-primary/5 hover:bg-primary/10 rounded-lg"
                >
                  {showUrlInput ? <Upload className="h-3 w-3 mr-2" /> : <LinkIcon className="h-3 w-3 mr-2" />}
                  {showUrlInput ? 'Back to Upload' : 'Source from URL'}
                </Button>
              </FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {showUrlInput ? (
                    <Input 
                      placeholder="https://..." 
                      {...field} 
                      className="h-14 bg-white/5 border-white/10 rounded-2xl focus:bg-white/10 transition-all text-white px-6 font-mono text-xs" 
                    />
                  ) : (
                    <div className={cn(
                      "relative border-2 border-dashed rounded-3xl p-12 transition-all duration-500 group overflow-hidden",
                      uploading ? "bg-white/5" : "hover:bg-primary/5 hover:border-primary/50",
                      field.value ? "border-primary/30" : "border-white/10"
                    )}>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                      
                      <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        {uploading ? (
                          <>
                            <div className="relative">
                              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                              <Loader2 className="h-12 w-12 text-primary animate-spin relative" />
                              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[9px] font-black text-white">
                                {Math.round(progress)}%
                              </span>
                            </div>
                            <div className="space-y-2 w-full max-w-[240px]">
                              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Infiltrating Storage...</p>
                              <Progress value={progress} className="h-1 bg-white/5" />
                            </div>
                          </>
                        ) : field.value ? (
                          <div className="relative w-full max-w-lg aspect-[21/9] rounded-2xl overflow-hidden group-hover/image:scale-[1.02] transition-transform duration-700 shadow-2xl border border-white/10">
                            <img src={field.value} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
                                <div className="p-4 rounded-full bg-white/10 border border-white/20">
                                    <Upload className="h-6 w-10 text-white" />
                                </div>
                                <p className="text-white text-[10px] font-black uppercase tracking-[0.2em] mt-4">Replace Visual Asset</p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                              <Upload className="h-8 w-8" />
                            </div>
                            <div className="space-y-1 text-center">
                              <p className="text-sm font-black text-white tracking-widest uppercase">Drop Visual Asset here</p>
                              <p className="text-[10px] text-muted-foreground/40 font-bold uppercase tracking-[0.1em]">Intelligence compatible: JPG, PNG, WEBP</p>
                            </div>
                            <Button type="button" variant="outline" className="mt-2 border-white/10 rounded-xl px-8 h-9 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5">
                                Browse Intelligence
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-[10px] font-bold text-red-400 ml-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Strategic Intelligence Brief (Excerpt)</FormLabel>
              <FormControl>
                <Textarea 
                    placeholder="Brief summary of the post..." 
                    {...field} 
                    className="min-h-[100px] bg-white/5 border-white/10 rounded-2xl focus:bg-white/10 transition-all text-white placeholder:text-muted-foreground/30 font-medium px-6 py-4 resize-none" 
                />
              </FormControl>
              <FormMessage className="text-[10px] font-bold text-red-400 ml-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 ml-1">Full intelligence Transmission (Content)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="<p>Full article content here...</p>" 
                  {...field} 
                  className="min-h-[400px] bg-white/5 border-white/10 rounded-2xl focus:bg-white/10 transition-all text-white placeholder:text-muted-foreground/30 font-mono text-sm px-6 py-6 custom-scrollbar" 
                />
              </FormControl>
              <FormDescription className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest ml-1">Full HTML Injection is supported for complex narrative rendering.</FormDescription>
              <FormMessage className="text-[10px] font-bold text-red-400 ml-1" />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row items-center justify-between p-8 rounded-[2rem] bg-white/2 border border-white/5 gap-8">
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between space-y-0 gap-6">
                <div className="space-y-1">
                  <FormLabel className="text-lg font-black text-white tracking-tighter">Broadcast Priority</FormLabel>
                  <FormDescription className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">
                    Immediately mobilize intelligence to the public domain.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="data-[state=checked]:bg-primary"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4 w-full md:w-auto">
            <Button 
                type="submit" 
                size="lg" 
                className="w-full md:w-[240px] h-14 bg-primary hover:bg-primary/80 text-white font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(142,68,173,0.4)] transition-all active:scale-95"
            >
                {initialData ? 'Commit Update' : 'Initialize Broadcast'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
