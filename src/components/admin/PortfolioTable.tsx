
"use client";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { type PortfolioItem } from "@/lib/definitions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Loader2, PlusCircle, Trash2, Edit, XCircle } from "lucide-react";
import { PortfolioForm } from "./PortfolioForm";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { format } from "date-fns";

export function PortfolioTable() {
    const { toast } = useToast();
    const firestore = useFirestore();
    const itemsQuery = useMemoFirebase(() =>
        query(collection(firestore, "portfolioItems"), orderBy("projectDate", "desc")),
        [firestore]
    );
    const { data: items, isLoading, error } = useCollection<PortfolioItem>(itemsQuery);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

    // NEW: Lock body scroll when editor is open
    useEffect(() => {
        if (isDialogOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isDialogOpen]);

    const handleAddNew = () => {
        setSelectedItem(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (item: PortfolioItem) => {
        setSelectedItem(item);
        setIsDialogOpen(true);
    };

    const handleDelete = async (itemId: string) => {
        if (!window.confirm("Are you sure you want to delete this portfolio item?")) return;
        try {
            await deleteDoc(doc(firestore, "portfolioItems", itemId));
            toast({ title: "Success", description: "Portfolio item deleted successfully." });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black text-foreground font-headline tracking-tighter">Portfolio Gallery</h2>
                    <p className="text-sm text-muted-foreground/60 font-medium uppercase tracking-[0.15em]">Showcase your architectural and digital masterpieces.</p>
                </div>
                <Button
                    onClick={handleAddNew}
                    className="h-12 px-8 bg-primary hover:bg-primary/80 text-foreground font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(142,68,173,0.3)] transition-all active:scale-95 group"
                >
                    <PlusCircle className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                    Add New Case Study
                </Button>
            </div>

            <div className="rounded-[2.5rem] border border-border/5 bg-card/40 backdrop-blur-3xl shadow-2xl overflow-hidden group">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/2 border-b border-border/5">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="py-6 pl-8 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">Visual Representation</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Project Identity</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Vertical</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Execution Date</TableHead>
                                <TableHead className="text-right py-6 pr-8 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">Operations</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!isLoading && items?.map((item) => (
                                <TableRow key={item.id} className="group/row hover:bg-muted/2 transition-all border-b border-border/5 last:border-0 h-24">
                                    <TableCell className="py-2 pl-8">
                                        <div className="relative w-24 h-16 rounded-xl overflow-hidden border border-border/10 shrink-0 shadow-lg">
                                            <Image src={item.imageUrl} alt={item.title} fill className="object-cover grayscale group-hover/row:grayscale-0 transition-all duration-700" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-foreground/90 group-hover/row:text-primary transition-colors text-lg">
                                        {item.title}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge className="bg-muted/5 text-muted-foreground/80 hover:text-foreground border-border/10 font-bold text-[9px] uppercase tracking-[0.15em] px-3 py-1 rounded-lg">
                                            {item.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className="text-sm font-bold text-muted-foreground/60 tracking-tight">
                                            {format(new Date(item.projectDate), "PPP")}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right py-2 pr-8">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-all translate-x-4 group-hover/row:translate-x-0">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)} className="w-10 h-10 rounded-xl hover:bg-blue-500/10 hover:text-blue-500 transition-all">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="w-10 h-10 rounded-xl text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-all">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* FULL PAGE PORTFOLIO STUDIO OVERLAY */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-[10000] bg-background/98 overscroll-none animate-in fade-in zoom-in-95 duration-300 overflow-y-auto custom-scrollbar">
                    <div className="min-h-screen py-12 px-4 md:px-12 relative bg-background">
                        <div className="max-w-4xl mx-auto space-y-8">
                            <div className="flex justify-between items-center border-b border-border/5 pb-8">
                                <div>
                                    <h2 className="text-4xl font-black font-headline tracking-tighter text-primary">
                                        {selectedItem ? "Refine Project Detail" : "Initialize New Case Study"}
                                    </h2>
                                    <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs mt-2">Portfolio Visual Engineering Studio</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    onClick={() => setIsDialogOpen(false)}
                                    className="h-12 w-12 rounded-2xl hover:bg-destructive/10 hover:text-destructive transition-all"
                                >
                                    <XCircle className="h-6 w-6" />
                                </Button>
                            </div>
                            <div className="bg-card/40 backdrop-blur-3xl border border-border/5 rounded-[2.5rem] p-8 shadow-2xl">
                                <PortfolioForm item={selectedItem} onFinished={() => setIsDialogOpen(false)} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
