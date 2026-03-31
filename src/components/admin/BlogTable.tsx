'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/index';
import { BlogPost } from '@/lib/definitions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
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
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary font-headline">Manage Blogs</h2>
                {!error && (
                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) setEditingPost(null);
                    }}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/80">
                                <Plus className="mr-2 h-4 w-4" /> New Post
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-primary/20">
                            <DialogHeader>
                                <DialogTitle>{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
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
                <div className="text-center py-10 px-4 rounded-xl border border-primary/20 bg-card/40 backdrop-blur-xl">
                    <h3 className="text-xl font-semibold text-destructive">Permission Denied</h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                        You do not have permission to view this data. Please ensure you are logged in with an admin account.
                    </p>
                </div>
            ) : (
                <div className="rounded-xl border border-primary/20 bg-card/40 backdrop-blur-xl overflow-hidden">
                    <Table>
                        <TableHeader className="bg-primary/5">
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        No blog posts found. Capture your first story!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                posts.map((post) => (
                                    <TableRow key={post.id} className="hover:bg-primary/5 transition-colors">
                                        <TableCell className="font-medium">{post.title}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="border-accent/40 text-accent">
                                                {post.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(post.publishedDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {post.isPublished ? (
                                                <Badge className="bg-green-500/20 text-green-500 border-green-500/20">Published</Badge>
                                            ) : (
                                                <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/20">Draft</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                onClick={() => togglePublish(post)}
                                                title={post.isPublished ? 'Unpublish' : 'Publish'}
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
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button 
                                                variant="ghost" 
                                                size="icon" 
                                                className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                                onClick={() => handleDelete(post.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
