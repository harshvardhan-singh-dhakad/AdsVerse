
"use client";
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Search, CheckCircle, XCircle, Download, Info } from 'lucide-react';
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
    const canvas = await html2canvas(reportRef.current, { 
      scale: 2,
      backgroundColor: document.body.classList.contains('dark') ? '#09090b' : '#ffffff',
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;
    const pdfHeight = imgWidth / ratio;
    
    let position = 0;
    let heightLeft = pdfHeight;
    
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save(`seo-audit-report-${new URL(result?.url || url).hostname}.pdf`);
  };
  
  const ResultItem = ({ label, value, passed, recommendation, details }: { label: string, value: string | number, passed: boolean, recommendation: string, details: string }) => (
    <Card className="bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">{label}</CardTitle>
            {passed ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground pt-2">{details}</p>
             {!passed && (
                <div className="mt-4 flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                    <Info className="h-4 w-4 text-destructive mt-1 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-destructive">Recommendation</p>
                        <p className="text-xs text-destructive/80">{recommendation}</p>
                    </div>
                </div>
            )}
        </CardContent>
    </Card>
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
        <section ref={reportRef} className="max-w-5xl mx-auto bg-card/30 p-4 sm:p-8 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-headline text-primary">Audit Report</h2>
                <p className="text-muted-foreground text-sm sm:text-base break-all">{result.url}</p>
            </div>
            <Button onClick={downloadPdf} variant="outline" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="bg-card/50 flex flex-col justify-center items-center p-6">
                <CardTitle className="text-center mb-4">Overall Score</CardTitle>
                <div className="relative w-48 h-24 overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 w-full h-full border-t-[12px] border-r-[12px] border-b-0 border-l-[12px] border-solid rounded-t-full"
                      style={{borderColor: result.score > 80 ? 'hsl(var(--primary))' : result.score > 50 ? 'hsl(var(--accent))' : 'hsl(var(--destructive))', opacity: 0.2}}
                    ></div>
                    <div 
                      className="absolute top-0 left-0 w-full h-full border-t-[12px] border-r-[12px] border-b-0 border-l-[12px] border-solid rounded-t-full origin-bottom-center transition-transform duration-1000"
                      style={{ 
                          borderColor: result.score > 80 ? 'hsl(var(--primary))' : result.score > 50 ? 'hsl(var(--accent))' : 'hsl(var(--destructive))',
                          transform: `rotate(${(result.score / 100) * 180 - 180}deg)` 
                      }}
                    ></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                      <span className="text-4xl font-bold" style={{color: result.score > 80 ? 'hsl(var(--primary))' : result.score > 50 ? 'hsl(var(--accent))' : 'hsl(var(--destructive))'}}>{result.score}</span>
                      <span className="text-muted-foreground text-sm">/ 100</span>
                    </div>
                </div>
            </Card>
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle>Website Preview</CardTitle>
                <CardDescription>A snapshot of your website's homepage.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-md border">
                    <img 
                        src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(result.url)}`} 
                        alt="Website screenshot" 
                        className="w-full h-full object-cover object-top" 
                    />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold font-headline mb-4">On-Page SEO</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ResultItem label="Title Tag" value={result.title.length > 0 ? `${result.title.length} chars` : 'Missing'} passed={result.title.length > 10 && result.title.length < 70} recommendation="Your title should be between 10 and 70 characters long to display properly in search results." details="The title tag is a key factor for search engines to understand your page's topic."/>
                  <ResultItem label="Meta Description" value={result.metaDescription.length > 0 ? `${result.metaDescription.length} chars` : 'Missing'} passed={result.metaDescription.length > 70 && result.metaDescription.length < 160} recommendation="Write a compelling meta description between 70 and 160 characters to encourage clicks." details="This description appears under your title in search results."/>
                  <ResultItem label="H1 Tags" value={result.h1s.length} passed={result.h1s.length === 1} recommendation="Your page should have exactly one H1 tag to clearly define the main topic." details="The H1 is the most important heading on your page."/>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-headline mb-4">Technical SEO</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   <ResultItem label="SSL Enabled (HTTPS)" value={result.isHttps ? 'Yes' : 'No'} passed={result.isHttps} recommendation="Install an SSL certificate on your server to secure your website." details="HTTPS is a ranking signal and builds user trust."/>
                   <ResultItem label="Page Load Time" value={`${result.loadTime.toFixed(2)}s`} passed={result.loadTime < 2.5} recommendation="Optimize images, leverage browser caching, and minify code to improve speed. Aim for under 2.5 seconds." details="Faster pages provide a better user experience and rank higher."/>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-headline mb-4">Content & Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ResultItem label="Images with Alt Text" value={`${result.images.withAlt} / ${result.images.total}`} passed={result.images.total === 0 || result.images.withAlt / result.images.total > 0.8} recommendation="Add descriptive alt text to all important images to improve accessibility and image SEO." details="Alt text helps search engines understand what your images are about."/>
                  <ResultItem label="Internal Links" value={result.links.internal} passed={result.links.internal > 5} recommendation="Add more links to other relevant pages on your own website to improve navigation and distribute link equity." details="Internal links help users and search engines discover more of your content."/>
                  <ResultItem label="External Links" value={result.links.external} passed={result.links.external > 0} recommendation="Link out to reputable, relevant external sources to provide more value and context to your users." details="Linking to other quality sites can be a signal of a well-researched page."/>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SeoAuditPage;

    