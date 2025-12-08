
"use client";
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Search, CheckCircle, XCircle, Download, Info, FileText, Bot, Link2, Image as ImageIcon, Heading1, Heading2, Heading3, Heading4, Clock, ShieldCheck, FileJson } from 'lucide-react';
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
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / imgHeight;
    let canvasPdfWidth, canvasPdfHeight;

    if (pdfWidth / ratio < pdfHeight) {
        canvasPdfWidth = pdfWidth;
        canvasPdfHeight = pdfWidth / ratio;
    } else {
        canvasPdfHeight = pdfHeight;
        canvasPdfWidth = pdfHeight * ratio;
    }
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvasPdfWidth, canvasPdfHeight);
    pdf.save(`seo-audit-report-${new URL(result?.url || url).hostname}.pdf`);
  };
  
  const ResultItem = ({ icon, label, value, passed, recommendation, details }: { icon: React.ReactNode, label: string, value: string | number, passed: boolean, recommendation: string, details: string }) => (
    <Card className="bg-card/50">
        <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div className="flex items-center gap-3">
              {icon}
              <CardTitle className="text-base font-medium">{label}</CardTitle>
            </div>
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
                 <div className="relative w-48 h-48">
                    <svg className="w-full h-full" viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)' }}>
                        <path
                            className="text-border"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                        />
                        <path
                            className={
                                result.score > 80 ? "text-green-500" :
                                result.score > 50 ? "text-yellow-500" :
                                "text-red-500"
                            }
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeDasharray={`${result.score}, 100`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold">{result.score}</span>
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
                  <ResultItem icon={<FileText />} label="Title Tag" value={result.title.length > 0 ? `${result.title.length} chars` : 'Missing'} passed={result.title.length > 10 && result.title.length < 70} recommendation="Your title should be between 10 and 70 characters long to display properly in search results." details="The title tag is a key factor for search engines to understand your page's topic."/>
                  <ResultItem icon={<FileText />} label="Meta Description" value={result.metaDescription.length > 0 ? `${result.metaDescription.length} chars` : 'Missing'} passed={result.metaDescription.length > 70 && result.metaDescription.length < 160} recommendation="Write a compelling meta description between 70 and 160 characters to encourage clicks." details="This description appears under your title in search results."/>
                   <ResultItem icon={<FileText />} label="Word Count" value={result.wordCount} passed={result.wordCount > 300} recommendation="Aim for at least 300 words of valuable content on important pages." details="Content depth can signal authority and relevance to search engines."/>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-headline mb-4">Headings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <ResultItem icon={<Heading1 />} label="H1 Tags" value={result.headings.h1} passed={result.headings.h1 === 1} recommendation="Your page should have exactly one H1 tag to clearly define the main topic." details="The most important heading."/>
                  <ResultItem icon={<Heading2 />} label="H2 Tags" value={result.headings.h2} passed={result.headings.h2 > 0} recommendation="Use H2 tags to structure your content into logical sections." details="Important for content structure."/>
                  <ResultItem icon={<Heading3 />} label="H3 Tags" value={result.headings.h3} passed={true} recommendation="" details="Use for sub-sections within H2s."/>
                  <ResultItem icon={<Heading4 />} label="H4 Tags" value={result.headings.h4} passed={true} recommendation="" details="Use for further nested content."/>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-headline mb-4">Technical SEO</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   <ResultItem icon={<ShieldCheck />} label="SSL Enabled (HTTPS)" value={result.isHttps ? 'Yes' : 'No'} passed={result.isHttps} recommendation="Install an SSL certificate on your server to secure your website." details="HTTPS is a ranking signal and builds user trust."/>
                   <ResultItem icon={<Clock />} label="Page Load Time" value={`${result.loadTime.toFixed(2)}s`} passed={result.loadTime < 2.5} recommendation="Optimize images, leverage browser caching, and minify code to improve speed. Aim for under 2.5 seconds." details="Faster pages provide a better user experience and rank higher."/>
                   <ResultItem icon={<Bot />} label="Robots.txt" value={result.hasRobotsTxt ? 'Found' : 'Missing'} passed={result.hasRobotsTxt} recommendation="Create a robots.txt file to guide search engines on how to crawl your site." details="Instructs search engine crawlers."/>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-headline mb-4">Content Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ResultItem icon={<ImageIcon />} label="Images with Alt Text" value={`${result.images.withAlt} / ${result.images.total}`} passed={result.images.total === 0 || result.images.withAlt / result.images.total > 0.8} recommendation="Add descriptive alt text to all important images to improve accessibility and image SEO." details="Alt text helps search engines understand what your images are about."/>
                  <ResultItem icon={<Link2 />} label="Internal Links" value={result.links.internal} passed={result.links.internal > 5} recommendation="Add more links to other relevant pages on your own website to improve navigation and distribute link equity." details="Helps users and search engines discover more of your content."/>
                  <ResultItem icon={<Link2 />} label="External Links" value={result.links.external} passed={result.links.external > 0} recommendation="Link out to reputable, relevant external sources to provide more value and context to your users." details="Linking to quality sites can be a signal of a well-researched page."/>
              </div>
            </div>
             <div>
                <h3 className="text-2xl font-bold font-headline mb-4">Structured Data</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     <ResultItem icon={<FileJson />} label="Schema Markup" value={result.hasSchema ? 'Found' : 'Not Found'} passed={result.hasSchema} recommendation="Implement Schema.org markup to help search engines understand your content and enable rich snippets." details="Structured data helps create rich search results."/>
                </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SeoAuditPage;
