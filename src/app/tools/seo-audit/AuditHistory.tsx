'use client';

import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';
import { ChevronDown, ChevronUp, RotateCcw, Clock, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AuditRecord {
  id: string;
  url: string;
  createdAt: Date;
  scores: { seo: number; geo: number; aeo: number; overall: number };
  trendDelta?: { seo?: number; geo?: number; aeo?: number };
  tier: 'free' | 'paid';
  status: string;
}

interface AuditHistoryProps {
  uid: string;
  plan: 'free' | 'paid' | 'subscriber';
  onRescan: (url: string) => void;
}

function ScorePill({ score }: { score: number }) {
  const color =
    score >= 80 ? 'bg-green-500/15 text-green-400 border-green-500/30' :
    score >= 60 ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' :
    'bg-red-500/15 text-red-400 border-red-500/30';
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${color}`}>
      {score}/100
    </span>
  );
}

function TrendBadge({ delta }: { delta?: number }) {
  if (delta === undefined || delta === null || delta === 0) return null;
  const isUp = delta > 0;
  return (
    <span className={`text-[10px] font-bold ${isUp ? 'text-green-400' : 'text-red-400'}`}>
      {isUp ? '▲' : '▼'} {isUp ? '+' : ''}{delta}
    </span>
  );
}

export default function AuditHistory({ uid, plan, onRescan }: AuditHistoryProps) {
  const [open, setOpen] = useState(false);
  const [records, setRecords] = useState<AuditRecord[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const { firestore } = initializeFirebase();
      const q = query(
        collection(firestore, 'audit_reports'),
        where('userId', '==', uid),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      const snap = await getDocs(q);
      const data: AuditRecord[] = snap.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          url: d.url,
          createdAt: d.createdAt instanceof Timestamp ? d.createdAt.toDate() : new Date(),
          scores: d.scores,
          trendDelta: d.trendDelta,
          tier: d.tier,
          status: d.status,
        };
      });
      setRecords(data);
      setFetched(true);
    } catch (err) {
      console.error('[AuditHistory]', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleToggle = () => {
    if (!open && !fetched) fetchHistory();
    setOpen(v => !v);
  };

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const hostname = (url: string) => {
    try { return new URL(url).hostname; } catch { return url; }
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-bold text-foreground">My Audit History</span>
          {records.length > 0 && (
            <Badge variant="secondary" className="text-xs">{records.length}</Badge>
          )}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      {open && (
        <div className="border-t border-border">
          {loadingHistory && (
            <div className="p-6 text-center">
              <div className="inline-block w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-muted-foreground mt-2">Loading history...</p>
            </div>
          )}

          {!loadingHistory && records.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No audits yet. Run your first audit above!
            </div>
          )}

          {!loadingHistory && records.length > 0 && (
            <div className="divide-y divide-border">
              {records.map((rec) => (
                <div key={rec.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground truncate">{hostname(rec.url)}</p>
                      <a
                        href={rec.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground shrink-0"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground">{formatDate(rec.createdAt)}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">SEO:</span>
                      <ScorePill score={rec.scores?.seo ?? 0} />
                      <TrendBadge delta={rec.trendDelta?.seo} />
                      <span className="text-xs text-muted-foreground">GEO:</span>
                      <ScorePill score={rec.scores?.geo ?? 0} />
                      <TrendBadge delta={rec.trendDelta?.geo} />
                      <span className="text-xs text-muted-foreground">AEO:</span>
                      <ScorePill score={rec.scores?.aeo ?? 0} />
                      <TrendBadge delta={rec.trendDelta?.aeo} />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRescan(rec.url)}
                    className="shrink-0 flex items-center gap-1.5 text-xs"
                    title={plan === 'free' ? 'Rate limit may apply for free plan' : 'Re-scan this URL'}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Re-Scan
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="p-3 bg-muted/20 text-center">
            <button
              onClick={fetchHistory}
              className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              ↺ Refresh history
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
