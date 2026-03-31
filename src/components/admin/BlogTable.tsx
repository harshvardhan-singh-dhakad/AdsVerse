'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/index';
import { BlogPost } from '@/lib/definitions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Plus, Eye, EyeOff, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BlogForm } from './BlogForm';
import { useToast } from '@/hooks/use-toast';

export function BlogTable() {
    const { toast } = useToast();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const q = query(collection(db, 'blogPosts'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const postsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
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

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            await deleteDoc(doc(db, 'blogPosts', id));
            toast({ title: 'Success', description: 'Post deleted successfully' });
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to delete post', variant: 'destructive' });
        }
    };

    const togglePublish = async (post: BlogPost) => {
        try {
            await updateDoc(doc(db, 'blogPosts', post.id), {
                isPublished: !post.isPublished,
                updatedAt: new Date()
            });
            toast({ title: 'Success', description: post.isPublished ? 'Post unpublished' : 'Post published' });
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
        }
    };

    if (loading) return <div className="p-8 text-center">Loading blogs...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-foreground font-headline tracking-tight">Blog Management</h2>
                    <p className="text-sm text-muted-foreground mt-1">Manage your stories, drafts, and published content.</p>
                </div>
                {!error && (
                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) setEditingPost(null);
                    }}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all active:scale-95">
                                <Plus className="mr-2 h-4 w-4" /> New Article
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-2xl border-primary/20 shadow-2xl">
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">{editingPost ? 'Edit Article' : 'Compose New Article'}</DialogTitle>
                            </DialogHeader>
                            <BlogForm 
                                initialData={editingPost} 
                                onSuccess={() => setIsDialogOpen(false)} 
                            />
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            {error ? (
                <div className="text-center py-20 px-6 rounded-2xl border border-destructive/20 bg-destructive/5 backdrop-blur-xl transition-all hover:bg-destructive/10">
                    <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-destructive/10">
                            <EyeOff className="w-10 h-10 text-destructive" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-destructive">Restricted Access</h3>
                    <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                        Your account doesn't have the required administrative permissions to manage blog content. 
                        Please contact the system administrator.
                    </p>
                </div>
            ) : (
                <div className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-muted/50 border-b border-border/40">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="w-[40%] py-4 font-semibold text-foreground">Content Title</TableHead>
                                    <TableHead className="font-semibold text-foreground">Category</TableHead>
                                    <TableHead className="font-semibold text-foreground">Published Date</TableHead>
                                    <TableHead className="font-semibold text-foreground">Status</TableHead>
                                    <TableHead className="text-right py-4 font-semibold text-foreground">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-20">
                                            <div className="flex flex-col items-center gap-2">
                                                <FileText className="h-12 w-12 text-muted-foreground/20" />
                                                <p className="text-lg font-medium text-muted-foreground">Your blog library is empty</p>
                                                <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(true)}>Start Writing</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    posts.map((post) => (
                                        <TableRow key={post.id} className="group hover:bg-primary/[0.03] transition-all border-b border-border/20 last:border-0">
                                            <TableCell className="py-5">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                                                        {post.title}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mt-1">ID: {post.id}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className="bg-secondary/40 text-secondary-foreground border-border/40 font-medium">
                                                    {post.category}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground font-medium">
                                                {new Date(post.publishedDate).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {post.isPublished ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                        <span className="text-emerald-500 font-bold text-xs uppercase tracking-widest">Live</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                                                        <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">Draft</span>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right py-5">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        onClick={() => togglePublish(post)}
                                                        className="hover:bg-primary/10 hover:text-primary"
                                                        title={post.isPublished ? 'Move to Drafts' : 'Publish Live'}
                                                    >
                                                        {post.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        onClick={() => {
                                                            setEditingPost(post);
                                                            setIsDialogOpen(true);
                                                        }}
                                                        className="hover:bg-primary/10 hover:text-primary"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="text-muted-foreground/40 hover:text-destructive hover:bg-destructive/10"
                                                        onClick={() => handleDelete(post.id)}
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
