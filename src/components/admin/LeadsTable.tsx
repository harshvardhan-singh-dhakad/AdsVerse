
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
import { Loader2, ShieldAlert } from "lucide-react";
import { format } from 'date-fns';

export function LeadsTable() {
  const firestore = useFirestore();
  const leadsQuery = useMemoFirebase(() =>
    query(collection(firestore, "leads"), orderBy("submissionDate", "desc")),
    [firestore]
  );
  const { data: leads, isLoading, error } = useCollection<Lead>(leadsQuery);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const renderContent = () => {
    if (isLoading) {
      return <div className="flex justify-center items-center py-8"><Loader2 className="h-8 w-8 animate-spin"/></div>;
    }

    if (error) {
      return (
        <div className="text-center py-10 px-4">
          <div className="flex justify-center mb-4">
            <ShieldAlert className="w-12 h-12 text-destructive" />
          </div>
          <h3 className="text-xl font-semibold text-destructive">Permission Denied</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            You do not have permission to view this data. This section is restricted to administrators. Please ensure you are logged in with an admin account.
          </p>
        </div>
      );
    }

    if (!leads || leads.length === 0) {
      return <p className="text-center text-muted-foreground py-8">No leads found.</p>;
    }

    return (
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
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Form Leads</CardTitle>
      </CardHeader>
      <CardContent>
        {renderContent()}
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
