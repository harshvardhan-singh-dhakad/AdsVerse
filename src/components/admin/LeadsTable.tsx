
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
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
                <h2 className="text-4xl font-black text-foreground font-headline tracking-tighter">Inbound Intelligence</h2>
                <p className="text-sm text-muted-foreground/60 font-medium uppercase tracking-[0.15em]">Track and manage your potential client conversion funnel.</p>
            </div>
            <Button 
              className="h-12 px-8 bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95 disabled:opacity-30"
              onClick={() => {
                if (!leads) return;
                const headers = ["Date", "Name", "Email", "Phone", "Subject", "Message"];
                const csvContent = [
                  headers.join(","),
                  ...leads.map(lead => {
                    const date = lead.submissionDate || lead.submittedAt;
                    return [
                      date && typeof date.toDate === 'function' ? format(date.toDate(), 'yyyy-MM-dd') : 'N/A',
                    `"${lead.name.replace(/"/g, '""')}"`,
                    lead.email,
                    lead.phone || 'N/A',
                    `"${lead.subject.replace(/"/g, '""')}"`,
                    ].join(",");
                  })
                ].join("\n");
                
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement("a");
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", `adsverse_leads_${format(new Date(), 'yyyy-MM-dd')}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              disabled={!leads || leads.length === 0}
            >
              Export Intelligence (CSV)
            </Button>
        </div>

        <div className="rounded-[2.5rem] border border-border/5 bg-card/40 backdrop-blur-3xl shadow-2xl overflow-hidden group">
            <div className="overflow-x-auto">
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center py-20 px-8">
                        <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-6 opacity-50" />
                        <h3 className="text-2xl font-black text-foreground font-headline tracking-tight">Access Restricted</h3>
                        <p className="text-sm text-muted-foreground/60 mt-2 max-w-sm mx-auto font-bold uppercase tracking-widest leading-relaxed">
                            You lack permission to view this data. Admin privileges required.
                        </p>
                    </div>
                ) : !leads || leads.length === 0 ? (
                    <div className="text-center py-20 px-8">
                        <p className="text-sm text-muted-foreground/40 font-black uppercase tracking-[0.2em]">No inbound intelligence found.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader className="bg-muted/2 border-b border-border/5">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="py-6 pl-8 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">Timestamp</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">Identity</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">Contact Channel</TableHead>
                                <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 text-center">Subject</TableHead>
                                <TableHead className="text-right py-6 pr-8 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {leads.map((lead) => (
                                <TableRow key={lead.id} className="group/row hover:bg-muted/2 transition-all border-b border-border/5 last:border-0 h-20">
                                    <TableCell className="pl-8">
                                        <span className="text-sm font-bold text-muted-foreground/60 tracking-tight">
                                            {(() => {
                                                const date = lead.submissionDate || lead.submittedAt;
                                                return date && typeof date.toDate === 'function' 
                                                    ? format(date.toDate(), 'PPP') 
                                                    : 'N/A';
                                            })()}
                                        </span>
                                    </TableCell>
                                <TableCell>
                                    <span className="font-bold text-foreground/90 group-hover/row:text-primary transition-colors">
                                        {lead.name}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-foreground/70">{lead.email}</span>
                                        {lead.phone && <span className="text-[10px] font-bold text-muted-foreground/40">{lead.phone}</span>}
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Badge variant="secondary" className="bg-muted/5 text-muted-foreground/80 border-border/10 font-bold text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg">
                                        {lead.subject}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        onClick={() => setSelectedLead(lead)}
                                        className="h-9 px-4 rounded-xl bg-primary/5 text-primary hover:bg-primary/10 font-black text-[10px] uppercase tracking-widest transition-all"
                                    >
                                        Inspect
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>

        <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
            <DialogContent className="bg-background/95 backdrop-blur-3xl border-border/10 shadow-2xl rounded-[2rem] p-0 overflow-hidden max-w-2xl">
                <DialogHeader className="p-8 border-b border-border/5 bg-muted/2">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
                            {selectedLead?.name.substring(0, 1).toUpperCase()}
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-black font-headline tracking-tighter text-foreground">Lead Detail: {selectedLead?.name}</DialogTitle>
                            <DialogDescription className="text-muted-foreground/60 font-bold uppercase tracking-widest text-[9px]">
                                Received {selectedLead?.submissionDate && typeof selectedLead.submissionDate.toDate === 'function' ? format(selectedLead.submissionDate.toDate(), 'PPP p') : ''}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em]">Email Address</p>
                            <p className="text-sm font-bold text-foreground/80">{selectedLead?.email}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em]">Phone Identity</p>
                            <p className="text-sm font-bold text-foreground/80">{selectedLead?.phone || 'Not provided'}</p>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em]">Subject Matter</p>
                        <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary h-6 px-3">{selectedLead?.subject}</Badge>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-[0.2em]">Message Body</p>
                        <div className="p-6 bg-muted/5 border border-border/10 rounded-2xl">
                            <p className="text-sm text-foreground/70 leading-relaxed italic">"{selectedLead?.message}"</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      </div>
    );
}
