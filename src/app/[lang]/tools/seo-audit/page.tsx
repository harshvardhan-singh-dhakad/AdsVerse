
"use client";
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Search, Download } from 'lucide-react';
import { analyzeUrl, AnalysisResult, Recommendation } from './actions';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ScoreGauge = ({ score, grade, size = 180, strokeWidth = 12 }: { score: number, grade: string, size?: number, strokeWidth?: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const getColor = (s: number) => {
        if (s >= 80) return 'text-green-500';
        if (s >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    className="text-border"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className={getColor(score)}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{ strokeDasharray: circumference, strokeDashoffset: offset, transition: 'stroke-dashoffset 0.5s ease-out' }}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-5xl font-bold">{grade}</span>
            </div>
        </div>
    );
};

const MiniScoreGauge = ({ grade, label }: { grade: string, label: string }) => {
    const getGradeColor = (g: string) => {
        if (g.startsWith('A')) return 'border-green-500 text-green-500';
        if (g.startsWith('B')) return 'border-yellow-500 text-yellow-500';
        if (g.startsWith('C')) return 'border-orange-500 text-orange-500';
        return 'border-red-500 text-red-500';
    }
    return (
        <div className="flex flex-col items-center gap-2">
            <div className={`flex items-center justify-center w-20 h-20 rounded-full border-4 ${getGradeColor(grade)} bg-card/50`}>
                <span className="text-3xl font-bold">{grade}</span>
            </div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
        </div>
    )
}

const PriorityBadge = ({ priority }: { priority: Recommendation['priority'] }) => {
    const priorityClasses = {
        High: 'bg-red-500/20 text-red-400 border-red-500/30',
        Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        Low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    };
    return <Badge variant="outline" className={`font-semibold ${priorityClasses[priority]}`}>{priority} Priority</Badge>;
};


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
      backgroundColor: document.body.classList.contains('dark') ? '#0f172a' : '#ffffff',
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }
    pdf.save(`seo-audit-report-${new URL(result?.url || url).hostname}.pdf`);
  };

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
        <section ref={reportRef} className="max-w-6xl mx-auto bg-card/30 p-4 sm:p-8 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-headline text-primary">Audit Results for {new URL(result.url).hostname}</h2>
                    <p className="text-muted-foreground text-sm sm:text-base break-all">{result.url}</p>
                </div>
                <Button onClick={downloadPdf} variant="outline" className="w-full sm:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                </Button>
            </div>
          
            <Card className="bg-card/50 mb-8 p-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-col items-center">
                        <ScoreGauge score={result.overallScore.score} grade={result.overallScore.grade} />
                        <p className="mt-4 text-lg text-center font-semibold">Your page could be better</p>
                        <p className="text-sm text-muted-foreground">Recommendations: {result.recommendations.filter(r => !r.passed).length}</p>
                    </div>
                    <div>
                      <Card className="bg-background/50">
                        <CardHeader>
                          <CardTitle>Website Preview</CardTitle>
                          <CardDescription>A snapshot of your website's homepage.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="aspect-video w-full overflow-hidden rounded-md border">
                              <img 
                                  src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(result.url)}?w=800`} 
                                  alt="Website screenshot" 
                                  className="w-full h-full object-cover object-top" 
                              />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                </div>
                <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap justify-around gap-6">
                    <MiniScoreGauge label="On-Page SEO" grade={result.categoryScores.onPage.grade} />
                    <MiniScoreGauge label="Usability" grade={result.categoryScores.usability.grade} />
                    <MiniScoreGauge label="Performance" grade={result.categoryScores.performance.grade} />
                    <MiniScoreGauge label="Social" grade={result.categoryScores.social.grade} />
                </div>
            </Card>


            <Card className="bg-card/50 p-6">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className="font-headline text-2xl">Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Check</TableHead>
                                <TableHead className="hidden md:table-cell">Category</TableHead>
                                <TableHead className="text-right">Priority</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {result.recommendations.filter(r => !r.passed).map(rec => (
                                <TableRow key={rec.id}>
                                    <TableCell>
                                        <p className="font-semibold">{rec.check}</p>
                                        <p className="text-xs text-muted-foreground">{rec.description}</p>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{rec.category}</TableCell>
                                    <TableCell className="text-right"><PriorityBadge priority={rec.priority} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </section>
      )}
    </div>
  );
};

export default SeoAuditPage;
