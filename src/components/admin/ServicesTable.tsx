
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
import { useState } from "react";
import { Loader2, PlusCircle, Trash2, Edit } from "lucide-react";
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
    <Card className="bg-card/40 backdrop-blur-xl border-border/40 shadow-xl shadow-primary/5">
      <CardHeader>
        <CardTitle>Manage Homepage Services</CardTitle>
        <CardDescription>Add, edit, or delete the services displayed on the homepage.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="flex justify-center items-center py-8"><Loader2 className="h-8 w-8 animate-spin"/></div>}
        {error && (
          <div className="text-center py-10 px-4">
            <h3 className="text-xl font-semibold text-destructive">Permission Denied</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
              You do not have permission to view this data. Please ensure you are logged in with an admin account.
            </p>
          </div>
        )}
        {!isLoading && !error && (
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Icon Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {services?.map((service) => (
                <TableRow key={service.id}>
                    <TableCell>{service.displayOrder}</TableCell>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell><code>{service.iconName}</code></TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(service)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(service.id)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        )}
      </CardContent>
      <CardFooter className="border-t pt-6">
        <Button onClick={handleAddNew}><PlusCircle className="mr-2 h-4 w-4"/>Add New Service</Button>
      </CardFooter>
       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedService ? "Edit Service" : "Add New Service"}</DialogTitle>
          </DialogHeader>
          <ServiceForm service={selectedService} onFinished={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </Card>
  );
}
