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
        await updateDoc(doc(db, 'blogPosts', initialData.id), {
          ...values,
          updatedAt: serverTimestamp(),
        });
        toast({ title: 'Success', description: 'Blog post updated successfully' });
      } else {
        await addDoc(collection(db, 'blogPosts'), {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter post title" {...field} onBlur={generateSlug} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="post-slug-url" {...field} />
                </FormControl>
                <FormDescription>URL friendly version of the title</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="SEO">SEO</SelectItem>
                    <SelectItem value="Ads">Ads</SelectItem>
                    <SelectItem value="Automation">Automation</SelectItem>
                    <SelectItem value="Case Study">Case Study</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                <span>Thumbnail Image</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-xs text-primary h-7"
                >
                  {showUrlInput ? <Upload className="h-3 w-3 mr-1" /> : <LinkIcon className="h-3 w-3 mr-1" />}
                  {showUrlInput ? 'Upload Image' : 'Use URL instead'}
                </Button>
              </FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {showUrlInput ? (
                    <Input placeholder="https://..." {...field} />
                  ) : (
                    <div className={cn(
                      "relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 group overflow-hidden",
                      uploading ? "bg-muted" : "hover:bg-primary/5 hover:border-primary/50",
                      field.value ? "border-primary/50" : "border-muted-foreground/20"
                    )}>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                      
                      <div className="flex flex-col items-center justify-center space-y-3 text-center">
                        {uploading ? (
                          <>
                            <div className="relative">
                              <Loader2 className="h-10 w-10 text-primary animate-spin" />
                              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold">
                                {Math.round(progress)}%
                              </span>
                            </div>
                            <div className="space-y-1 w-full max-w-[200px]">
                              <p className="text-sm font-medium">Uploading image...</p>
                              <Progress value={progress} className="h-1" />
                            </div>
                          </>
                        ) : field.value ? (
                          <div className="relative w-full max-w-sm aspect-video rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity">
                            <img src={field.value} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-white text-xs font-medium">Change Image</p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                              <Upload className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Click or drag to upload thumbnail</p>
                              <p className="text-xs text-muted-foreground">Supported format: JPG, PNG, WEBP</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt (Short Description)</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief summary of the post..." {...field} className="h-20" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (HTML Supported)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="<p>Full article content here...</p>" 
                  {...field} 
                  className="h-64 font-mono text-sm" 
                />
              </FormControl>
              <FormDescription>Use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt; for styling.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Publish Status</FormLabel>
                  <FormDescription>
                    Make this post visible on the website immediately.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="bg-primary hover:bg-primary/80">
            {initialData ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
