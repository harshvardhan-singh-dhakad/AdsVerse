
"use client";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc, deleteDoc, where } from "firebase/firestore";
import { type Service } from "@/lib/definitions";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Loader2, PlusCircle, Trash2, Edit, XCircle } from "lucide-react";
import { ServiceForm } from "./ServiceForm";
import { useToast } from "@/hooks/use-toast";

export function ServicesTable() {
    const { toast } = useToast();
    const firestore = useFirestore();
    const servicesQuery = useMemoFirebase(() =>
        query(collection(firestore, "services"), orderBy("displayOrder", "asc")),
        [firestore]
    );
    const { data: services, isLoading, error } = useCollection<Service>(servicesQuery);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

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
        setSelectedService(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (service: Service) => {
        setSelectedService(service);
        setIsDialogOpen(true);
    };

    const handleDelete = async (serviceId: string) => {
        if (!window.confirm("Are you sure you want to delete this service?")) return;
        try {
            await deleteDoc(doc(firestore, "services", serviceId));
            toast({ title: "Success", description: "Service deleted successfully." });
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-1">
                    <h2 className="text-4xl font-black text-foreground font-headline tracking-tighter">Service Matrix</h2>
                    <p className="text-sm text-muted-foreground/60 font-medium uppercase tracking-[0.15em]">Control the foundational digital offerings of your platform.</p>
                </div>
                <Button
                    onClick={handleAddNew}
                    className="h-12 px-8 bg-primary hover:bg-primary/80 text-foreground font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(142,68,173,0.3)] transition-all active:scale-95 group"
                >
                    <PlusCircle className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                    Add New Core Service
                </Button>
            </div>

            <div className="rounded-[2.5rem] border border-border/5 bg-card/40 backdrop-blur-3xl shadow-2xl overflow-hidden group">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-muted/2 border-b border-border/5">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="py-6 pl-8 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">Sequence</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Service Identity</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Visual Semantic (Icon)</TableHead>
                                <TableHead className="text-right py-6 pr-8 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">Operations</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!isLoading && services?.map((service) => (
                                <TableRow key={service.id} className="group/row hover:bg-muted/2 transition-all border-b border-border/5 last:border-0 h-20">
                                    <TableCell className="pl-8">
                                        <div className="w-8 h-8 rounded-lg bg-muted/5 flex items-center justify-center font-black text-xs text-primary">
                                            {service.displayOrder}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center font-bold text-foreground/90 group-hover/row:text-primary transition-colors">
                                        {service.name}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <code className="text-[10px] font-black text-muted-foreground/40 bg-muted/5 px-2 py-1 rounded border border-border/5 uppercase tracking-widest">
                                            {service.iconName}
                                        </code>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-all translate-x-4 group-hover/row:translate-x-0">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(service)} className="w-10 h-10 rounded-xl hover:bg-blue-500/10 hover:text-blue-500 transition-all">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)} className="w-10 h-10 rounded-xl text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-all">
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

            {/* FULL PAGE SERVICE STUDIO OVERLAY */}
            {isDialogOpen && (
                <div className="fixed inset-0 z-[10000] bg-background overscroll-none animate-in fade-in zoom-in-95 duration-300 overflow-y-auto custom-scrollbar">
                    <div className="min-h-screen py-12 px-4 md:px-12 relative bg-background">
                        <div className="max-w-3xl mx-auto space-y-8">
                            <div className="flex justify-between items-center border-b border-border/5 pb-8">
                                <div>
                                    <h2 className="text-4xl font-black font-headline tracking-tighter text-primary">
                                        {selectedService ? "Refine Service Identity" : "Initialize New Core Service"}
                                    </h2>
                                    <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs mt-2">Service Matrix Engineering Studio</p>
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
                                <ServiceForm service={selectedService} onFinished={() => setIsDialogOpen(false)} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
