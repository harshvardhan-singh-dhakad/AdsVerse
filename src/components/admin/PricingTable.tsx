
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
import { Badge } from "../ui/badge";

export function PricingTable() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const plansQuery = useMemoFirebase(() =>
    query(collection(firestore, "pricingPlans"), orderBy("displayOrder", "asc")),
    [firestore]
  );
  const { data: plans, isLoading } = useCollection<PricingPlan>(plansQuery);
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
    <Card>
      <CardHeader>
        <CardTitle>Manage Pricing Plans</CardTitle>
        <CardDescription>Add, edit, or delete pricing plans for your services.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="flex justify-center items-center py-8"><Loader2 className="h-8 w-8 animate-spin"/></div>}
        {!isLoading && (
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Popular</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {plans?.map((plan) => (
                <TableRow key={plan.id}>
                    <TableCell>{plan.displayOrder}</TableCell>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>{plan.price} {plan.frequency}</TableCell>
                    <TableCell>
                      {plan.isPopular ? 
                        <Badge><CheckCircle className="w-4 h-4 mr-1"/> Popular</Badge> : 
                        <Badge variant="outline"><XCircle className="w-4 h-4 mr-1"/> Not Popular</Badge>}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(plan)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(plan.id)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        )}
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button onClick={handleAddNew}><PlusCircle className="mr-2 h-4 w-4"/>Add New Plan</Button>
      </CardFooter>
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedPlan ? "Edit Pricing Plan" : "Add New Pricing Plan"}</DialogTitle>
          </DialogHeader>
          <PricingForm plan={selectedPlan} onFinished={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
