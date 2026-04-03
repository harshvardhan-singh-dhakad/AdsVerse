
"use client";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { type PricingPlan } from "@/lib/definitions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Loader2, PlusCircle, Trash2, Edit, CheckCircle, XCircle } from "lucide-react";
import { PricingForm } from "./PricingForm";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export function PricingTable() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const plansQuery = useMemoFirebase(() =>
    query(collection(firestore, "pricingPlans"), orderBy("displayOrder", "asc")),
    [firestore]
  );
  const { data: plans, isLoading, error } = useCollection<PricingPlan>(plansQuery);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const handleAddNew = () => {
    setSelectedPlan(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  const handleDelete = async (planId: string) => {
    if (!window.confirm("Are you sure you want to delete this pricing plan?")) return;
    try {
      await deleteDoc(doc(firestore, "pricingPlans", planId));
      toast({ title: "Success", description: "Pricing plan deleted successfully." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
                <h2 className="text-4xl font-black text-white font-headline tracking-tighter">Value Architect</h2>
                <p className="text-sm text-muted-foreground/60 font-medium uppercase tracking-[0.15em]">Define and refine the commercial value propositions of AdsVerse.</p>
            </div>
            <Button 
                onClick={handleAddNew}
                className="h-12 px-8 bg-primary hover:bg-primary/80 text-white font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(142,68,173,0.3)] transition-all active:scale-95 group"
            >
                <PlusCircle className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform duration-300" /> 
                Draft New Plan
            </Button>
        </div>

        <div className="rounded-[2.5rem] border border-white/5 bg-[#12141c]/40 backdrop-blur-3xl shadow-2xl overflow-hidden group">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader className="bg-white/2 border-b border-white/5">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead className="py-6 pl-8 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">Sequence</TableHead>
                            <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Vertical</TableHead>
                            <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Plan Identity</TableHead>
                            <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Commercial Value</TableHead>
                            <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Market Status</TableHead>
                            <TableHead className="text-right py-6 pr-8 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">Operations</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {!isLoading && plans?.map((plan) => (
                            <TableRow key={plan.id} className="group/row hover:bg-white/2 transition-all border-b border-white/5 last:border-0 h-20">
                                <TableCell className="pl-8">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-black text-xs text-primary">
                                        {plan.displayOrder}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge variant="secondary" className="bg-white/5 text-muted-foreground/80 border-white/10 font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg">
                                        {plan.category}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-center font-bold text-white/90 group-hover/row:text-primary transition-colors">
                                    {plan.name}
                                </TableCell>
                                <TableCell className="text-center font-black text-white/80">
                                    {plan.price} <span className="text-[10px] text-muted-foreground/40 uppercase tracking-widest">{plan.frequency}</span>
                                </TableCell>
                                <TableCell className="text-center">
                                    {plan.isPopular ? 
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                            <span className="text-primary font-black text-[9px] uppercase tracking-widest">Market Leader</span>
                                        </div> : 
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                                            <span className="text-muted-foreground/40 font-black text-[9px] uppercase tracking-widest">Standard Tier</span>
                                        </div>
                                    }
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-all translate-x-4 group-hover/row:translate-x-0">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(plan)} className="w-10 h-10 rounded-xl hover:bg-blue-500/10 hover:text-blue-500 transition-all">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(plan.id)} className="w-10 h-10 rounded-xl text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-all">
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

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-4xl bg-[#0d1017]/95 backdrop-blur-3xl border-white/10 shadow-2xl rounded-[2rem] p-0 overflow-hidden">
                <DialogHeader className="p-8 border-b border-white/5 bg-white/2">
                    <DialogTitle className="text-3xl font-black font-headline tracking-tighter text-white">
                        {selectedPlan ? "Refine Pricing Strategy" : "Initialize New Commercial Plan"}
                    </DialogTitle>
                </DialogHeader>
                <div className="p-8">
                    <PricingForm plan={selectedPlan} onFinished={() => setIsDialogOpen(false)} />
                </div>
            </DialogContent>
        </Dialog>
      </div>
    );
}
