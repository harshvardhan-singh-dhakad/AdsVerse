'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BlogPost } from '@/lib/definitions';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/index';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

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
              <FormLabel>Main Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
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
