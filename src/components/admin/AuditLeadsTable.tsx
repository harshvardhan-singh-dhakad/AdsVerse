
"use client";

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
import { Loader2, ShieldAlert, Globe, Phone, Mail, Download } from "lucide-react";
import { format } from 'date-fns';
import { Timestamp } from "firebase/firestore";

interface AuditLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  website: string;
  submittedAt: Timestamp;
  source: string;
}

export function AuditLeadsTable() {
  const firestore = useFirestore();
  const leadsQuery = useMemoFirebase(() =>
    query(collection(firestore, "audit_leads"), orderBy("submittedAt", "desc")),
    [firestore]
  );
  const { data: leads, isLoading, error } = useCollection<AuditLead>(leadsQuery);

  const exportCsv = () => {
    if (!leads || leads.length === 0) return;
    const header = ["Date", "Name", "Email", "Phone", "Website", "Source"];
    const rows = leads.map(l => [
      l.submittedAt ? format(l.submittedAt.toDate(), 'yyyy-MM-dd HH:mm') : 'N/A',
      l.name,
      l.email,
      l.phone || 'N/A',
      l.website,
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

    if (!leads || leads.length === 0) {
      return (
        <div className="text-center py-16">
          <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
          <p className="text-muted-foreground font-medium">No audit leads yet.</p>
          <p className="text-xs text-muted-foreground mt-1">Leads will appear here when users run website audits.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-bold">Date</TableHead>
              <TableHead className="font-bold">Name</TableHead>
              <TableHead className="font-bold">Email</TableHead>
              <TableHead className="font-bold">Phone</TableHead>
              <TableHead className="font-bold">Website Audited</TableHead>
              <TableHead className="font-bold">Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                  {lead.submittedAt ? format(lead.submittedAt.toDate(), 'dd MMM yyyy, hh:mm a') : 'N/A'}
                </TableCell>
                <TableCell className="font-medium">{lead.name}</TableCell>
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
                    <span className="text-muted-foreground text-xs">Not provided</span>
                  )}
                </TableCell>
                <TableCell>
                  <a
                    href={lead.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-blue-400 hover:underline text-sm max-w-[200px] truncate"
                    title={lead.website}
                  >
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    {lead.website.replace(/^https?:\/\//, '')}
                  </a>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">
                    {lead.source || 'seo-audit-tool'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Audit Tool Leads
            {leads && leads.length > 0 && (
              <Badge className="ml-2 bg-primary/15 text-primary border-0 font-bold">
                {leads.length} total
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="mt-1">
            People who ran the free SEO/GEO/AEO website audit tool
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={exportCsv}
          disabled={!leads || leads.length === 0}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
