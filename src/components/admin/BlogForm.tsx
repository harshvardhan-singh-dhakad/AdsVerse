'use client';

import { useState, useEffect, useMemo, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BlogPost } from '@/lib/definitions';
import { collection, addDoc, updateDoc, doc, serverTimestamp, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useFirestore, useStorage } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { RichTextEditor } from './RichTextEditor';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, X, PenTool, Image as ImageIcon, Tags, Target, UserCheck, Settings, Save, Eye, Send, Link as LinkIcon, Type } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { SelectGroup, SelectLabel } from '@radix-ui/react-select';

const blogSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug is required'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  imageUrl: z.string().url('Invalid image URL').or(z.literal('')),
  imageAlt: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  language: z.string().default('en'),
  tags: z.array(z.string()).default([]),
  focusKeyword: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  author: z.string().min(2, 'Author is required'),
  publishedDate: z.string(),
  status: z.enum(['publish', 'draft', 'schedule']).default('draft'),
  allowComments: z.boolean().default(true),
  includeInSitemap: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  schemaMarkup: z.boolean().default(true),
  whatsappShare: z.boolean().default(true),
});

type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormProps {
  initialData?: BlogPost | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BlogForm({ initialData, onSuccess, onCancel }: BlogFormProps) {
  const db = useFirestore();
  const storage = useStorage();
  const { toast } = useToast();
  
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData ? {
      ...initialData,
      status: initialData.isPublished ? 'publish' : 'draft',
      language: initialData.language || 'en',
      tags: initialData.tags || [],
      allowComments: initialData.allowComments ?? true,
      includeInSitemap: initialData.includeInSitemap ?? true,
      isFeatured: initialData.isFeatured ?? false,
      schemaMarkup: initialData.schemaMarkup ?? true,
      whatsappShare: initialData.whatsappShare ?? true,
    } : {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      imageAlt: '',
      category: '',
      language: 'en',
      tags: [],
      focusKeyword: '',
      metaTitle: '',
      metaDescription: '',
      author: 'harshvardhan',
      publishedDate: new Date().toISOString().slice(0, 16),
      status: 'draft',
      allowComments: true,
      includeInSitemap: true,
      isFeatured: false,
      schemaMarkup: true,
      whatsappShare: true,
    },
  });

  const watchAllDetails = form.watch();
  
  // SEO Calculations
  const seoStats = useMemo(() => {
    const title = watchAllDetails.title || '';
    const kw = (watchAllDetails.focusKeyword || '').toLowerCase().trim();
    const meta = watchAllDetails.metaDescription || '';
    const body = watchAllDetails.content || '';
    const words = body.trim() === '' ? 0 : body.trim().split(/\s+/).length;
    const hasImg = !!watchAllDetails.imageUrl;
    const tags = watchAllDetails.tags || [];

    const checks = {
      title: { label: 'Title added', done: title.length > 10 },
      kw: { label: 'Focus keyword', done: kw.length > 3 },
      meta: { label: 'Meta desc added', done: meta.length > 50 && meta.length <= 160 },
      body: { label: '500+ words', done: words >= 500 },
      img: { label: 'Featured image', done: hasImg },
      kwInBody: { label: 'Keyword in body', done: kw.length > 3 && body.toLowerCase().includes(kw) },
      tags: { label: 'Tags added', done: tags.length > 0 },
    };

    const total = Object.keys(checks).length;
    const doneCount = Object.values(checks).filter(c => c.done).length;
    const pct = Math.round((doneCount / total) * 100);

    return { checks, pct, words, readTime: Math.max(1, Math.ceil(words / 200)) };
  }, [watchAllDetails]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Error', description: 'Please select an image file', variant: 'destructive' });
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `blog/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
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

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.replace(',', '').trim();
      const currentTags = form.getValues('tags');
      if (val && !currentTags.includes(val) && currentTags.length < 8) {
        form.setValue('tags', [...currentTags, val], { shouldValidate: true });
      }
      setTagInput('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = form.getValues('tags').filter((_, index) => index !== indexToRemove);
    form.setValue('tags', newTags, { shouldValidate: true });
  };

  const onSubmit = async (values: BlogFormValues) => {
    if (values.status === 'publish' && !values.title) {
        toast({ title: 'Error', description: 'Please add a post title first!', variant: 'destructive' });
        return; 
    }
    try {
      const isPublished = values.status === 'publish';
      
      // Clean undefined values for Firestore
      const postData = {
        ...values,
        isPublished,
        imageAlt: values.imageAlt || '',
        focusKeyword: values.focusKeyword || '',
        metaTitle: values.metaTitle || '',
        metaDescription: values.metaDescription || '',
      };
      delete (postData as any).status;

      let docRef;
      if (initialData?.id) {
        docRef = doc(db, 'blogPosts', initialData.id);
        await updateDoc(docRef, { ...postData, updatedAt: serverTimestamp() });
        toast({ title: 'Success', description: 'Blog post updated successfully' });
      } else {
        docRef = await addDoc(collection(db, 'blogPosts'), {
          ...postData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast({ title: 'Success', description: 'Blog post created successfully' });
      }

      if (isPublished) {
        await setDoc(doc(db, 'public_blogPosts', initialData?.id || docRef.id), {
          ...postData,
          updatedAt: serverTimestamp(),
        });
      } else {
        await deleteDoc(doc(db, 'public_blogPosts', initialData?.id || docRef.id)).catch(() => { });
      }

      onSuccess?.();
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: (error as Error).message || 'Something went wrong', variant: 'destructive' });
    }
  };

  const slug = watchAllDetails.slug;
  const circumference = 131.9;
  const strokeDashoffset = circumference - (circumference * seoStats.pct / 100);

  return (
    <div className="w-full max-w-7xl mx-auto pb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">
      
      {/* HEADER ACTIONS */}
      {onCancel && (
        <div className="flex justify-start mb-6">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onCancel}
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Exit Studio</span>
          </Button>
        </div>
      )}
      
      {/* HEADER */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-4">
          Blog Studio
        </div>
        <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter mb-4 text-foreground">
          Create a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">New Post</span>
        </h1>
        <p className="text-muted-foreground font-medium">Automate. Elevate. Dominate — one blog post at a time.</p>
      </div>

      {/* SEO LIVE METER */}
      <div className="bg-card/40 backdrop-blur-xl border border-border/10 rounded-2xl p-6 mb-8 flex items-center gap-6 shadow-2xl">
        <div className="relative w-[52px] h-[52px] shrink-0">
          <svg width="52" height="52" viewBox="0 0 52 52" className="-rotate-90">
            <circle cx="26" cy="26" r="21" fill="none" stroke="currentColor" className="text-border/40" strokeWidth="5"/>
            <circle cx="26" cy="26" r="21" fill="none" stroke="url(#seoGrad)" strokeWidth="5"
              strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" 
              className="transition-all duration-500 ease-out"/>
            <defs>
              <linearGradient id="seoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6"/>
                <stop offset="100%" stopColor="#2dd4bf"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-black text-sm text-primary">
            {seoStats.pct}%
          </div>
        </div>
        <div>
          <h4 className="font-bold text-sm mb-2 text-foreground">Live SEO Score</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(seoStats.checks).map(([key, check]) => (
              <span key={key} className={cn(
                "text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border transition-colors",
                check.done 
                  ? "bg-teal-500/10 text-teal-400 border-teal-500/20" 
                  : "bg-red-500/10 text-red-500 border-red-500/20"
              )}>
                {check.done ? '✓' : '✗'} {check.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Card 1: Core Content */}
          <div className="bg-card border border-border/10 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 border-b border-border/10 pb-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <PenTool className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm tracking-wide">Core Content</h3>
              <span className="ml-auto text-[10px] font-bold text-muted-foreground tracking-widest">01 / 06</span>
            </div>

            <div className="space-y-6">
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex gap-1">
                    Post Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Write a headline that ranks & gets clicks..." 
                      className="font-headline text-lg sm:text-xl font-bold h-14 bg-muted/30 border-border/20 rounded-xl"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        if (!isSlugManuallyEdited) {
                          const s = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                          form.setValue('slug', s, { shouldValidate: true });
                        }
                      }}
                    />
                  </FormControl>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <LinkIcon className="w-3 h-3" />
                    <code className="bg-primary/10 text-primary px-2 py-0.5 rounded font-mono text-[10px]">
                      adsverse.in/en/blog/{slug || 'your-post-slug'}
                    </code>
                  </div>
                </FormItem>
              )} />

              <FormField control={form.control} name="excerpt" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex gap-1">
                    Excerpt / Short Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea 
                        placeholder="2-3 lines that appear on blog listing page and Google snippets..." 
                        className="bg-muted/30 border-border/20 rounded-xl min-h-[80px] resize-none pb-8"
                        {...field}
                      />
                      <span className={cn(
                        "absolute bottom-3 right-3 text-[10px] font-bold",
                        field.value.length > 160 ? "text-red-500" : (field.value.length > 130 ? "text-amber-500" : "text-teal-500")
                      )}>
                        {field.value.length}/160
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="content" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex gap-1">
                    Blog Body <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RichTextEditor 
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-bold px-3 py-1 rounded-full mt-2">
                    <PenTool className="w-3 h-3" />
                    <span>{seoStats.words} words</span>
                    <span className="opacity-50">·</span>
                    <span>Target: 800–1500 words for SEO</span>
                  </div>
                </FormItem>
              )} />
            </div>
          </div>

          {/* Card 2: Media */}
          <div className="bg-card border border-border/10 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 border-b border-border/10 pb-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <ImageIcon className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm tracking-wide">Media</h3>
              <span className="ml-auto text-[10px] font-bold text-muted-foreground tracking-widest">02 / 06</span>
            </div>

            <div className="space-y-6">
              <FormField control={form.control} name="imageUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex gap-1">
                    Featured Image <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative border-2 border-dashed border-border/40 hover:border-primary/50 bg-muted/20 rounded-xl p-8 text-center transition-all duration-300">
                       <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                      {uploading ? (
                         <div className="flex flex-col items-center justify-center space-y-3">
                           <Loader2 className="h-8 w-8 text-primary animate-spin" />
                           <p className="text-xs font-bold text-primary">{Math.round(progress)}% Uploaded...</p>
                         </div>
                      ) : field.value ? (
                        <div className="flex flex-col items-center gap-4 relative z-20 pointer-events-none">
                           <img src={field.value} alt="Blog Post Image Preview" className="max-h-[200px] rounded-lg border border-border/20 shadow-lg" />
                           <p className="text-xs font-bold text-primary">Click or drop to replace image</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-2 pointer-events-none">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm font-bold text-foreground">Click to upload or drag & drop</p>
                          <p className="text-[10px] text-muted-foreground">Recommended: 1200×630px · PNG/JPG/WEBP · Max 2MB</p>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px] font-bold text-red-400" />
                </FormItem>
              )} />

              <FormField control={form.control} name="imageAlt" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Image Alt Text
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. AI automation marketing agency Indore — for accessibility & SEO" className="bg-muted/30 border-border/20 rounded-xl h-12" {...field} />
                  </FormControl>
                </FormItem>
              )} />
            </div>
          </div>

          {/* Card 3: Categorization */}
          <div className="bg-card border border-border/10 rounded-2xl p-6 md:p-8 shadow-xl">
             <div className="flex items-center gap-3 border-b border-border/10 pb-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Tags className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm tracking-wide">Category & Tags</h3>
              <span className="bg-teal-500/10 text-teal-400 border border-teal-500/20 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ml-2">
                Auto from AdsVerse
              </span>
              <span className="ml-auto text-[10px] font-bold text-muted-foreground tracking-widest">03 / 06</span>
            </div>

            <div className="bg-teal-500/5 border border-teal-500/10 rounded-xl p-3 mb-6">
              <p className="text-[11px] text-teal-500 font-medium tracking-wide">
                Categories are auto-populated from AdsVerse.in core services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormField control={form.control} name="category" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex gap-1">
                    Primary Category <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-muted/30 border-border/20 rounded-xl h-12">
                        <SelectValue placeholder="Select category..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                       <SelectGroup>
                          <SelectLabel className="text-[10px] font-black tracking-widest uppercase text-primary">AdsVerse Services</SelectLabel>
                          <SelectItem value="seo">SEO Optimization</SelectItem>
                          <SelectItem value="paid-ads">Paid Ads (Google & Meta)</SelectItem>
                          <SelectItem value="web-development">Web Development</SelectItem>
                          <SelectItem value="automation-ai">Automation & AI</SelectItem>
                          <SelectItem value="content-marketing">Content Marketing</SelectItem>
                          <SelectItem value="social-media">Social Media</SelectItem>
                       </SelectGroup>
                       <SelectGroup>
                          <SelectLabel className="text-[10px] font-black tracking-widest uppercase text-primary mt-2">Content Types</SelectLabel>
                          <SelectItem value="case-studies">Case Studies</SelectItem>
                          <SelectItem value="tutorials">Tutorials & How-To</SelectItem>
                          <SelectItem value="industry-news">Industry News</SelectItem>
                       </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[10px] text-red-500" />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="language" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Language
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-muted/30 border-border/20 rounded-xl h-12">
                        <SelectValue placeholder="Language" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="hinglish">Hinglish</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="tags" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  Tags
                </FormLabel>
                <FormControl>
                  <div className="min-h-[50px] p-2 bg-muted/30 border border-border/20 rounded-xl flex flex-wrap gap-2 focus-within:border-primary/50 transition-colors cursor-text" onClick={() => document.getElementById('tag-input-field')?.focus()}>
                    {field.value.map((tag: string, idx: number) => (
                      <span key={idx} className="bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-in zoom-in-95">
                        {tag}
                        <button type="button" onClick={(e) => { e.stopPropagation(); removeTag(idx); }} className="hover:text-red-400 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      id="tag-input-field"
                      type="text"
                      className="flex-1 bg-transparent border-none outline-none text-sm min-w-[120px] px-2"
                      placeholder="Type & press Enter..."
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-[10px] text-muted-foreground">
                  Press <strong className="text-primary">Enter</strong> or <strong className="text-primary">,</strong> to add · Max 8 tags
                </FormDescription>
              </FormItem>
            )} />
          </div>

          {/* Card 4: SEO Settings */}
          <div className="bg-card border border-border/10 rounded-2xl p-6 md:p-8 shadow-xl">
             <div className="flex items-center gap-3 border-b border-border/10 pb-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm tracking-wide">SEO Settings</h3>
              <span className="ml-auto text-[10px] font-bold text-muted-foreground tracking-widest">04 / 06</span>
            </div>

            <div className="space-y-6">
              <FormField control={form.control} name="focusKeyword" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex gap-1">
                    Focus Keyword <span className="text-red-500">*</span>
                  </FormLabel>
                   <FormControl>
                    <Input placeholder="e.g. AI automation agency Indore" className="bg-muted/30 border-border/20 rounded-xl h-12" {...field} />
                  </FormControl>
                  <FormDescription className="text-[10px] text-muted-foreground">
                    Keyword should be present in title, meta desc, and body content.
                  </FormDescription>
                </FormItem>
              )} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="metaTitle" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                      Meta Title
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input placeholder="Leave blank to use post title" className="bg-muted/30 border-border/20 rounded-xl h-12" {...field} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground/50">
                          {(field.value || '').length}/60
                        </span>
                      </div>
                    </FormControl>
                  </FormItem>
                )} />

                <div className="space-y-2">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Canonical URL</FormLabel>
                  <Input 
                    readOnly 
                    value={slug ? `https://adsverse.in/en/blog/${slug}` : ''}
                    className="bg-teal-500/5 border-teal-500/20 text-teal-400 rounded-xl h-12" 
                  />
                </div>
              </div>

               <FormField control={form.control} name="metaDescription" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex gap-1">
                    Meta Description
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea 
                        placeholder="Google search description (ideal 150-160 chars)..." 
                        className="bg-muted/30 border-border/20 rounded-xl min-h-[80px] resize-none pb-8"
                        {...field}
                      />
                      <span className={cn(
                        "absolute bottom-3 right-3 text-[10px] font-bold",
                        (field.value || '').length > 160 ? "text-red-500" : ((field.value || '').length > 50 ? "text-teal-500" : "text-muted-foreground/50")
                      )}>
                        {(field.value || '').length}/160
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              )} />
              
               <div className="space-y-2">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Open Graph Image URL</FormLabel>
                  <Input 
                    readOnly 
                    value={slug ? `https://adsverse.in/images/blog/${slug}-og.jpg` : ''}
                    className="bg-teal-500/5 border-teal-500/20 text-teal-400 rounded-xl h-12 text-xs" 
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">Auto-set when featured image is uploaded · Used for social share previews</p>
                </div>
            </div>
          </div>

          {/* Card 5: Author & Publishing */}
          <div className="bg-card border border-border/10 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 border-b border-border/10 pb-4 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <UserCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm tracking-wide">Author & Publishing</h3>
              <span className="bg-teal-500/10 text-teal-400 border border-teal-500/20 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ml-2">
                Auto from AdsVerse
              </span>
              <span className="ml-auto text-[10px] font-bold text-muted-foreground tracking-widest">05 / 06</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormField control={form.control} name="author" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex gap-1">
                    Author <span className="text-red-500">*</span>
                  </FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-muted/30 border-border/20 rounded-xl h-12">
                        <SelectValue placeholder="Select author" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="harshvardhan">Harshvardhan — AdsVerse</SelectItem>
                      <SelectItem value="team">AdsVerse Team</SelectItem>
                      <SelectItem value="guest">Guest Author</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription className="text-[10px] text-muted-foreground">Website owner set as default</FormDescription>
                </FormItem>
              )} />
              
               <div className="space-y-2">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Website</FormLabel>
                   <Input readOnly value="https://adsverse.in" className="bg-teal-500/5 border-teal-500/20 text-teal-400 rounded-xl h-12" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FormField control={form.control} name="publishedDate" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    Publish Date & Time
                  </FormLabel>
                  <FormControl>
                    <Input type="datetime-local" className="bg-muted/30 border-border/20 rounded-xl h-12" {...field} />
                  </FormControl>
                </FormItem>
              )} />
              
               <div className="space-y-2">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Estimated Read Time</FormLabel>
                   <Input readOnly value={`~${seoStats.readTime} min read`} className="bg-teal-500/5 border-teal-500/20 text-teal-400 rounded-xl h-12" />
               </div>
            </div>

            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex gap-1 mb-2">
                  Status <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { val: 'publish', label: 'Publish Now' },
                      { val: 'draft', label: 'Save Draft' },
                      { val: 'schedule', label: 'Schedule' }
                    ].map(st => (
                      <label key={st.val} className={cn(
                        "flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all",
                         field.value === st.val ? "bg-primary/10 border-primary text-primary" : "border-border/30 text-muted-foreground hover:border-border/60"
                      )}>
                        <input type="radio" className="hidden" checked={field.value === st.val} onChange={() => field.onChange(st.val)} />
                        <div className={cn("w-2.5 h-2.5 rounded-full border-2", field.value === st.val ? "bg-primary border-primary" : "border-muted-foreground/50")} />
                        <span className="text-xs font-bold uppercase tracking-widest">{st.label}</span>
                      </label>
                    ))}
                  </div>
                </FormControl>
              </FormItem>
            )} />
          </div>

          {/* Card 6: Advanced Settings */}
          <div className="bg-card border border-border/10 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-3 border-b border-border/10 pb-4 mb-6">
               <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <Settings className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm tracking-wide">Advanced Settings</h3>
              <span className="ml-auto text-[10px] font-bold text-muted-foreground tracking-widest">06 / 06</span>
            </div>

            <div className="space-y-3">
              {[
                { name: 'allowComments', label: 'Allow Comments', sub: 'Readers can comment on the post' },
                { name: 'includeInSitemap', label: 'Include in Sitemap', sub: 'Submit to Google Search Console mapping' },
                { name: 'isFeatured', label: 'Featured Post', sub: 'Highlight on homepage and blog listing' },
                { name: 'schemaMarkup', label: 'Article Schema Markup (JSON-LD)', sub: 'Auto-generated structured data for rich results' },
                { name: 'whatsappShare', label: 'Social Share Buttons', sub: 'Show sharing options including WhatsApp' },
              ].map(opt => (
                <FormField key={opt.name} control={form.control} name={opt.name as any} render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-4 bg-muted/20 border border-border/20 rounded-xl hover:border-border/40 transition-colors">
                    <div>
                      <FormLabel className="text-xs font-bold text-foreground">{opt.label}</FormLabel>
                      <FormDescription className="text-[10px] mt-0.5">{opt.sub}</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-primary" />
                    </FormControl>
                  </FormItem>
                )} />
              ))}
            </div>
          </div>

          {/* Actions Menu - Fixed at bottom for "Stable" UX */}
          <div className="fixed bottom-0 left-0 right-0 z-[100] p-6 bg-background/80 backdrop-blur-2xl border-t border-border/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
              <div className="hidden lg:flex flex-col mr-auto">
                <span className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">Studio Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold text-primary uppercase">{initialData ? 'Editing Masterpiece' : 'Drafting Intelligence'}</span>
                </div>
              </div>

              <Button type="button" variant="outline" className="h-12 px-6 rounded-xl border-border/40 hover:border-primary hover:text-primary transition-all text-xs font-bold uppercase tracking-widest" onClick={() => {
                form.setValue('status', 'draft');
                form.handleSubmit(onSubmit)();
              }}>
                <Save className="w-4 h-4 mr-2" /> Save Draft
              </Button>
              <Button type="button" className="h-12 px-6 rounded-xl bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 transition-all text-xs font-bold uppercase tracking-widest">
                <Eye className="w-4 h-4 mr-2" /> Preview
              </Button>
              <Button type="submit" className="h-12 min-w-[200px] rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all text-sm font-black uppercase tracking-[0.15em]">
                {initialData ? 'Update Document' : 'Publish on AdsVerse'} <Send className="w-4 h-4 ml-2" />
              </Button>
              
              {onCancel && (
                <Button type="button" variant="ghost" className="h-12 w-12 rounded-xl border border-border/10 hover:bg-red-500/10 hover:text-red-500 transition-all lg:hidden" onClick={onCancel}>
                  <X className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>

        </form>
      </Form>
    </div>
  );
}
