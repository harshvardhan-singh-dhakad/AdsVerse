
"use client";

import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { type Lead } from "@/lib/definitions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { format } from 'date-fns';

export function LeadsTable() {
  const firestore = useFirestore();
  const leadsQuery = useMemoFirebase(() =>
    query(collection(firestore, "leads"), orderBy("submissionDate", "desc")),
    [firestore]
  );
  const { data: leads, isLoading } = useCollection<Lead>(leadsQuery);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form Leads</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <div className="flex justify-center items-center py-8"><Loader2 className="h-8 w-8 animate-spin"/></div>}
        {!isLoading && (!leads || leads.length === 0) && <p className="text-center text-muted-foreground py-8">No leads found.</p>}
        {!isLoading && leads && leads.length > 0 && (
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {leads.map((lead) => (
                <TableRow key={lead.id}>
                    <TableCell>{lead.submissionDate ? format(lead.submissionDate.toDate(), 'PPP') : 'N/A'}</TableCell>
                    <TableCell>{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell><Badge variant="secondary">{lead.subject}</Badge></TableCell>
                    <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => setSelectedLead(lead)}>
                            View Message
                        </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        )}
      </CardContent>
       <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lead from {selectedLead?.name}</DialogTitle>
            <DialogDescription>
              {selectedLead?.submissionDate ? format(selectedLead.submissionDate.toDate(), 'PPP p') : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div><strong>Email:</strong> {selectedLead?.email}</div>
            {selectedLead?.phone && <div><strong>Phone:</strong> {selectedLead.phone}</div>}
            <div><strong>Subject:</strong> <Badge variant="outline">{selectedLead?.subject}</Badge></div>
            <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">{selectedLead?.message}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
