
"use client";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { type PortfolioItem } from "@/lib/definitions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Loader2, PlusCircle, Trash2, Edit } from "lucide-react";
import { PortfolioForm } from "./PortfolioForm";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { format } from "date-fns";

export function PortfolioTable() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const itemsQuery = useMemoFirebase(() =>
    query(collection(firestore, "portfolioItems"), orderBy("projectDate", "desc")),
    [firestore]
  );
  const { data: items, isLoading } = useCollection<PortfolioItem>(itemsQuery);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

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
    <Card>
      <CardHeader>
        <CardTitle>Manage Portfolio Items</CardTitle>
        <CardDescription>Add, edit, or delete portfolio projects.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="flex justify-center items-center py-8"><Loader2 className="h-8 w-8 animate-spin"/></div>}
        {!isLoading && (
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items?.map((item) => (
                <TableRow key={item.id}>
                    <TableCell>
                      <Image src={item.imageUrl} alt={item.title} width={64} height={48} className="rounded-md object-cover h-12 w-16" />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{format(new Date(item.projectDate), "PPP")}</TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(item)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        )}
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button onClick={handleAddNew}><PlusCircle className="mr-2 h-4 w-4"/>Add New Item</Button>
      </CardFooter>
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedItem ? "Edit Portfolio Item" : "Add New Portfolio Item"}</DialogTitle>
          </DialogHeader>
          <PortfolioForm item={selectedItem} onFinished={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
