"use client";
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Search, CheckCircle, XCircle, Download } from 'lucide-react';
import { analyzeUrl, AnalysisResult } from './actions';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const SeoAuditPage = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a website URL to analyze.');
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const analysisResult = await analyzeUrl(url);
      setResult(analysisResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = async () => {
    if (!reportRef.current) return;
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;
    const width = pdfWidth;
    const height = width / ratio;
    
    let position = 0;
    let heightLeft = height;

    pdf.addImage(imgData, 'PNG', 0, position, width, height);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - height;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, width, height);
      heightLeft -= pdfHeight;
    }

    pdf.save(`seo-audit-report-${new URL(url).hostname}.pdf`);
  };
  
  const ResultItem = ({ label, value, passed }: { label: string, value: string | number, passed: boolean }) => (
    <li className="flex items-center justify-between p-3 bg-card/50 rounded-md">
      <div className="flex items-center gap-3">
        {passed ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
        <span className="font-medium">{label}</span>
      </div>
      <span className="text-muted-foreground font-mono text-sm">{value}</span>
    </li>
  );

  return (
    <div className="container mx-auto py-16 px-4">
      <section className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-headline text-primary">Free SEO Audit Tool</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Enter a website URL to get a free, real-time SEO analysis and discover how to improve your rankings.
        </p>
      </section>

      <section className="max-w-3xl mx-auto mb-12">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="url"
            placeholder="https://yourwebsite.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-grow h-12 text-lg"
            required
          />
          <Button type="submit" size="lg" className="h-12" disabled={loading}>
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Search className="h-6 w-6" />}
            <span className="ml-2 hidden md:inline">Analyze</span>
          </Button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </section>

      {loading && (
        <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
            <p className="text-muted-foreground">Analyzing website... this may take a moment.</p>
        </div>
      )}

      {result && (
        <section ref={reportRef} className="max-w-4xl mx-auto bg-card/30 p-8 rounded-lg">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold font-headline text-primary">Audit Report for {result.url}</h2>
            <Button onClick={downloadPdf} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle>Overall Score</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                 <div className="relative w-48 h-24 overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 w-full h-full border-t-[12px] border-r-[12px] border-b-0 border-l-[12px] border-solid border-primary/20 rounded-t-full"
                      style={{ transform: 'rotate(180deg)' }}
                    ></div>
                    <div 
                      className="absolute top-0 left-0 w-full h-full border-t-[12px] border-r-[12px] border-b-0 border-l-[12px] border-solid border-primary rounded-t-full origin-bottom-center transition-transform duration-1000"
                      style={{ transform: `rotate(${(result.score / 100) * 180 - 180}deg)` }}
                    ></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                      <span className="text-4xl font-bold">{result.score}</span>
                      <span className="text-muted-foreground text-sm">/ 100</span>
                    </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle>Website Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                    src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(result.url)}`} 
                    alt="Website screenshot" 
                    className="w-full h-auto rounded border" 
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-card/50">
              <CardHeader><CardTitle>On-Page SEO</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <ResultItem label="Title Tag" value={result.title.length > 0 ? `Length: ${result.title.length}` : 'Missing'} passed={result.title.length > 10 && result.title.length < 70} />
                  <ResultItem label="Meta Description" value={result.metaDescription.length > 0 ? `Length: ${result.metaDescription.length}` : 'Missing'} passed={result.metaDescription.length > 70 && result.metaDescription.length < 160} />
                  <ResultItem label="H1 Tags" value={result.h1s.length} passed={result.h1s.length === 1} />
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardHeader><CardTitle>Technical SEO</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                   <ResultItem label="SSL Enabled (HTTPS)" value={result.isHttps ? 'Yes' : 'No'} passed={result.isHttps} />
                   <ResultItem label="Page Load Time (TTFB)" value={`${result.loadTime.toFixed(2)}s`} passed={result.loadTime < 2.5} />
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardHeader><CardTitle>Content & Links</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <ResultItem label="Images with Alt Text" value={`${result.images.withAlt} / ${result.images.total}`} passed={result.images.withAlt / (result.images.total || 1) > 0.8} />
                  <ResultItem label="Internal Links" value={result.links.internal} passed={result.links.internal > 5} />
                  <ResultItem label="External Links" value={result.links.external} passed={result.links.external > 0} />
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
};

export default SeoAuditPage;
