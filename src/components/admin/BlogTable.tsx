'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc, setDoc, Timestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { BlogPost } from '@/lib/definitions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Plus, Eye, EyeOff, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BlogForm } from './BlogForm';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export function BlogTable() {
    const db = useFirestore();
    const { toast } = useToast();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const q = query(collection(db, 'blogPosts'), orderBy('publishedDate', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const postsData = snapshot.docs.map(d => ({
                id: d.id,
                ...d.data()
            } as BlogPost));
            setPosts(postsData);
            setLoading(false);
            setError(null);
        }, (err) => {
            console.error("Error fetching blog posts:", err);
            setError(err);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Firestore Timestamp + string + number — sab handle karta hai
    const formatDate = (publishedDate: any): string => {
        try {
            if (!publishedDate) return "N/A";
            let date: Date;
            if (publishedDate instanceof Timestamp) {
                date = publishedDate.toDate();
            } else if (typeof publishedDate?.toDate === 'function') {
                date = publishedDate.toDate();
            } else {
                date = new Date(publishedDate);
            }
            return isNaN(date.getTime()) ? "N/A" : format(date, 'MMM d, yyyy');
        } catch {
            return "N/A";
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            await deleteDoc(doc(db, 'blogPosts', id));
            await deleteDoc(doc(db, 'public_blogPosts', id)).catch(() => { });
            toast({ title: 'Success', description: 'Post deleted successfully' });
        } catch {
            toast({ title: 'Error', description: 'Failed to delete post', variant: 'destructive' });
        }
    };

    const togglePublish = async (post: BlogPost) => {
        try {
            const newPublishedStatus = !post.isPublished;

            await updateDoc(doc(db, 'blogPosts', post.id), {
                isPublished: newPublishedStatus,
                updatedAt: new Date()
            });

            if (newPublishedStatus) {
                // id ko alag rakh ke baaki data public collection mein save karo
                const { id, ...rest } = post as any;
                const publicData = { ...rest, isPublished: true, updatedAt: new Date() };
                try {
                    await updateDoc(doc(db, 'public_blogPosts', post.id), publicData);
                } catch {
                    await setDoc(doc(db, 'public_blogPosts', post.id), publicData);
                }
            } else {
                await deleteDoc(doc(db, 'public_blogPosts', post.id)).catch(() => { });
            }

            toast({
                title: 'Success',
                description: newPublishedStatus ? 'Post published' : 'Post unpublished'
            });
        } catch (err) {
            console.error("Toggle publish error:", err);
            toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <p className="text-foreground/60 text-sm font-medium animate-pulse">Loading blogs...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black text-foreground font-headline tracking-tighter">Content Intelligence</h2>
                    <p className="text-sm text-muted-foreground/60 font-medium uppercase tracking-[0.15em]">
                        Manage your brand's narrative and industry authority.
                    </p>
                </div>

                {!error && (
                    <Dialog
                        open={isDialogOpen}
                        onOpenChange={(open) => {
                            setIsDialogOpen(open);
                            if (!open) setEditingPost(null);
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button className="h-12 px-8 bg-primary hover:bg-primary/80 text-foreground font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(142,68,173,0.3)] transition-all active:scale-95 group">
                                <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                                Create Article
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl h-[92vh] flex flex-col bg-background/95 backdrop-blur-3xl border-border/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] p-0 rounded-[2rem] overflow-hidden">
                            <DialogHeader className="p-8 border-b border-border/5 bg-muted/2 shrink-0">
                                <DialogTitle className="text-3xl font-black font-headline tracking-tighter text-foreground">
                                    {editingPost ? 'Edit Masterpiece' : 'Draft New Intelligence'}
                                </DialogTitle>
                            </DialogHeader>
                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                <BlogForm
                                    initialData={editingPost}
                                    onSuccess={() => {
                                        setIsDialogOpen(false);
                                        setEditingPost(null);
                                    }}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            {/* Error State */}
            {error ? (
                <div className="text-center py-24 px-8 rounded-[3rem] border border-destructive/20 bg-destructive/5 backdrop-blur-2xl">
                    <div className="flex justify-center mb-6">
                        <div className="p-5 rounded-[2rem] bg-destructive/10">
                            <EyeOff className="w-12 h-12 text-destructive" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black text-destructive tracking-tighter">Access Restricted</h3>
                    <p className="text-muted-foreground mt-3 max-w-md mx-auto font-medium">
                        Your current authentication tier does not permit content management.
                        Elevate your credentials with the primary administrator.
                    </p>
                </div>
            ) : (
                <div className="rounded-[2.5rem] border border-border/5 bg-card/40 backdrop-blur-3xl shadow-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-muted/2 border-b border-border/5">
                                <TableRow className="hover:bg-transparent border-none">
                                    <TableHead className="w-[45%] py-6 pl-8 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
                                        Article Detail
                                    </TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 text-center">
                                        Vertical
                                    </TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 text-center">
                                        Broadcast Date
                                    </TableHead>
                                    <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 text-center">
                                        State
                                    </TableHead>
                                    <TableHead className="text-right py-6 pr-8 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
                                        Operations
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {posts.length === 0 ? (
                                    <TableRow className="border-none">
                                        <TableCell colSpan={5} className="text-center py-32">
                                            <div className="flex flex-col items-center gap-6">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                                                    <FileText className="relative h-20 w-20 text-muted-foreground/10" />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-2xl font-black text-foreground/20 tracking-tighter">
                                                        No intelligence broadcasts found
                                                    </p>
                                                    <p className="text-sm text-muted-foreground/40 font-medium">
                                                        Start your first strategic insight to populate the archive.
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    className="mt-4 border-border/10 text-foreground/40 hover:text-foreground hover:bg-muted/5 rounded-xl px-8"
                                                    onClick={() => setIsDialogOpen(true)}
                                                >
                                                    Initialize Content
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    posts.map((post) => (
                                        <TableRow
                                            key={post.id}
                                            className="group/row hover:bg-muted/2 transition-all border-b border-border/5 last:border-0 h-24"
                                        >
                                            {/* Title + Thumbnail */}
                                            <TableCell className="py-2 pl-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-border/10 shrink-0 bg-muted/5">
                                                        {post.imageUrl ? (
                                                            <img
                                                                src={post.imageUrl}
                                                                alt={post.title ?? 'Blog thumbnail'}
                                                                className="w-full h-full object-cover grayscale group-hover/row:grayscale-0 transition-all duration-500"
                                                                onError={(e) => {
                                                                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                                                                }}
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <FileText className="w-6 h-6 text-foreground/20" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-bold text-foreground/90 group-hover/row:text-primary transition-colors leading-tight truncate text-lg">
                                                            {post.title ?? 'Untitled'}
                                                        </span>
                                                        <span className="text-[10px] font-black text-muted-foreground/30 uppercase tracking-[0.2em] mt-1.5">
                                                            CID: {post.id?.substring(0, 8) ?? '—'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            {/* Category */}
                                            <TableCell className="text-center">
                                                <Badge className="bg-muted/5 text-muted-foreground/80 hover:text-foreground border-border/10 font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg">
                                                    {post.category ?? '—'}
                                                </Badge>
                                            </TableCell>

                                            {/* Date */}
                                            <TableCell className="text-center">
                                                <span className="text-sm font-bold text-muted-foreground/60">
                                                    {formatDate(post.publishedDate)}
                                                </span>
                                            </TableCell>

                                            {/* Publish Status */}
                                            <TableCell className="text-center">
                                                {post.isPublished ? (
                                                    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                        <span className="text-emerald-500 font-black text-[9px] uppercase tracking-widest">
                                                            Broadcast Live
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                        <span className="text-amber-500 font-black text-[9px] uppercase tracking-widest">
                                                            Strategic Draft
                                                        </span>
                                                    </div>
                                                )}
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell className="text-right py-2 pr-8">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-all translate-x-4 group-hover/row:translate-x-0">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => togglePublish(post)}
                                                        className="w-10 h-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-all"
                                                        title={post.isPublished ? 'Return to Draft' : 'Launch Live'}
                                                    >
                                                        {post.isPublished
                                                            ? <EyeOff className="h-4 w-4" />
                                                            : <Eye className="h-4 w-4" />
                                                        }
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            setEditingPost(post);
                                                            setIsDialogOpen(true);
                                                        }}
                                                        className="w-10 h-10 rounded-xl hover:bg-blue-500/10 hover:text-blue-500 transition-all"
                                                        title="Edit post"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(post.id)}
                                                        className="w-10 h-10 rounded-xl text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-all"
                                                        title="Delete post"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    );
}
