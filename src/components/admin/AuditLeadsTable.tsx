"use client";

import React, { useState } from "react";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ShieldAlert, Globe, Phone, Mail, Download, Sparkles, CheckCircle, IndianRupee } from "lucide-react";
import { format } from 'date-fns';
import { Timestamp } from "firebase/firestore";

interface AuditLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  website: string;
  domain?: string;
  submittedAt: Timestamp;
  source: string;
  type?: 'free' | 'paid';
  tier?: string;
  price?: number;
  score?: number;
  seoScore?: number;
  geoScore?: number;
  aeoScore?: number;
}

export function AuditLeadsTable() {
  const firestore = useFirestore();
  const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all');

  const leadsQuery = useMemoFirebase(() =>
    query(collection(firestore, "audit_leads"), orderBy("submittedAt", "desc")),
    [firestore]
  );
  const { data: leads, isLoading, error } = useCollection<AuditLead>(leadsQuery);

  const filteredLeads = React.useMemo(() => {
    if (!leads) return [];
    if (filter === 'free') return leads.filter(l => l.type !== 'paid' && l.source !== 'paid-10rs-audit');
    if (filter === 'paid') return leads.filter(l => l.type === 'paid' || l.source === 'paid-10rs-audit' || (l.price && l.price > 0));
    return leads;
  }, [leads, filter]);

  const totalAudits = leads?.length || 0;
  const paidAudits = leads?.filter(l => l.type === 'paid' || l.source === 'paid-10rs-audit' || (l.price && l.price > 0)).length || 0;
  const freeAudits = totalAudits - paidAudits;
  const totalRevenue = paidAudits * 10;

  const exportCsv = () => {
    if (!filteredLeads || filteredLeads.length === 0) return;
    const header = ["Date", "Type", "Price", "Website", "Domain", "Score", "Email", "Phone", "Source"];
    const rows = filteredLeads.map(l => [
      l.submittedAt ? format(l.submittedAt.toDate(), 'yyyy-MM-dd HH:mm') : 'N/A',
      l.type === 'paid' || l.source === 'paid-10rs-audit' ? 'Paid' : 'Free',
      l.type === 'paid' || l.source === 'paid-10rs-audit' ? '10' : '0',
      l.website,
      l.domain || 'N/A',
      l.score !== undefined ? `${l.score}/100` : 'N/A',
      l.email,
      l.phone || 'N/A',
      l.source || 'seo-audit-tool',
    ]);
    const csvContent = [header, ...rows].map(r => r.map(v => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_leads_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-10 px-4">
          <div className="flex justify-center mb-4">
            <ShieldAlert className="w-12 h-12 text-destructive" />
          </div>
          <h3 className="text-xl font-semibold text-destructive">Permission Denied</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            You do not have permission to view this data. Please ensure you are logged in with an admin account.
          </p>
        </div>
      );
    }

    if (!filteredLeads || filteredLeads.length === 0) {
      return (
        <div className="text-center py-16">
          <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
          <p className="text-muted-foreground font-medium">No audit records found.</p>
          <p className="text-xs text-muted-foreground mt-1">Audit submissions will appear here automatically.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Audit Tier</TableHead>
              <TableHead className="font-bold">Website / Domain</TableHead>
              <TableHead className="font-bold">Score</TableHead>
              <TableHead className="font-bold">User / Email</TableHead>
              <TableHead className="font-bold">Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => {
              const isPaid = lead.type === 'paid' || lead.source === 'paid-10rs-audit' || (lead.price && lead.price > 0);
              return (
                <TableRow key={lead.id} className={isPaid ? "bg-emerald-500/5" : ""}>
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {lead.submittedAt ? format(lead.submittedAt.toDate(), 'dd MMM yyyy, hh:mm a') : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {isPaid ? (
                      <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1 w-fit">
                        <Sparkles className="w-3 h-3" /> Paid (₹10 Pass)
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs font-medium text-slate-400">
                        Free (1st Audit)
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <a
                      href={lead.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-blue-400 hover:underline text-sm font-medium max-w-[220px] truncate"
                      title={lead.website}
                    >
                      <Globe className="w-3.5 h-3.5 shrink-0" />
                      {lead.domain || lead.website.replace(/^https?:\/\//, '')}
                    </a>
                  </TableCell>
                  <TableCell>
                    {lead.score !== undefined ? (
                      <Badge variant="outline" className="font-mono text-xs font-bold">
                        {lead.score}/100
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${lead.email}`}
                      className="flex items-center gap-1.5 text-primary hover:underline text-sm"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {lead.email}
                    </a>
                  </TableCell>
                  <TableCell>
                    {lead.phone ? (
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center gap-1.5 text-emerald-500 hover:underline text-sm font-medium"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        {lead.phone}
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Website Audits & Lead Tracker
          </CardTitle>
          <CardDescription className="mt-1">
            Real-time feed of all website audits (Free 1st audits & ₹10 Paid unlock passes).
          </CardDescription>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            <div className="px-3 py-1.5 rounded-lg bg-card/60 border border-border/60 text-xs flex items-center gap-1.5">
              <span className="text-muted-foreground">Total Audits:</span>
              <span className="font-bold text-foreground">{totalAudits}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs flex items-center gap-1.5">
              <span className="text-blue-400">Free Audits:</span>
              <span className="font-bold text-blue-400">{freeAudits}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center gap-1.5">
              <span className="text-emerald-400">Paid ₹10 Audits:</span>
              <span className="font-bold text-emerald-400">{paidAudits}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs flex items-center gap-1.5">
              <span className="text-amber-400">Audit Revenue:</span>
              <span className="font-bold text-amber-400 flex items-center">
                <IndianRupee className="w-3 h-3" />{totalRevenue}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-center">
          <Tabs value={filter} onValueChange={(v: any) => setFilter(v)} className="w-auto">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="free">Free</TabsTrigger>
              <TabsTrigger value="paid">Paid (₹10)</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            variant="outline"
            size="sm"
            onClick={exportCsv}
            disabled={!filteredLeads || filteredLeads.length === 0}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
