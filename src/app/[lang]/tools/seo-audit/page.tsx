
"use client";
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Search, Download, ShieldAlert } from 'lucide-react';
import { analyzeUrl, AnalysisResult, Recommendation } from './actions';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

const ScoreDonut = ({ score, grade, size = 180, strokeWidth = 12 }: { score: number, grade: string, size?: number, strokeWidth?: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    const getColor = (s: number) => {
        if (s >= 90) return 'text-green-500';
        if (s >= 70) return 'text-yellow-500';
        if (s >= 50) return 'text-orange-500'
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
                    style={{ strokeDasharray: circumference, strokeDashoffset: offset, transition: 'stroke-dashoffset 0.8s ease-out' }}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className={`text-5xl font-bold ${getColor(score)}`}>{score}</span>
                <span className="text-sm font-semibold text-muted-foreground">/ 100</span>
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
        <div className="flex flex-col items-center gap-2 text-center">
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
       const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
       if (errorMessage.includes('Failed to fetch')) {
           setError("Analysis failed. This might happen if the website is blocking automated tools (e.g., using Cloudflare), or if it's a JavaScript-heavy Single-Page Application (SPA) that our current tool cannot fully parse. Please try another website.");
       } else {
           setError(errorMessage);
       }
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
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = imgWidth / pdfWidth;
    const canvasHeightInPdf = imgHeight / ratio;
    
    let heightLeft = canvasHeightInPdf;
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasHeightInPdf);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = -heightLeft;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasHeightInPdf);
      heightLeft -= pdfHeight;
    }
    pdf.save(`seo-audit-report-${new URL(result?.url || url).hostname}.pdf`);
  };

  const radarData = result ? [
    { subject: 'On-Page', A: result.categoryScores.onPage.score, fullMark: 100 },
    { subject: 'Usability', A: result.categoryScores.usability.score, fullMark: 100 },
    { subject: 'Performance', A: result.categoryScores.performance.score, fullMark: 100 },
    { subject: 'Social', A: result.categoryScores.social.score, fullMark: 100 },
  ] : [];

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
        {error && 
          <Alert variant="destructive" className="mt-4">
              <ShieldAlert className="h-4 w-4" />
              <AlertTitle>Analysis Error</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
          </Alert>
        }
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
                    Download PDF Report
                </Button>
            </div>
          
            <Card className="bg-card/50 mb-8 p-6">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="flex flex-col justify-center items-center p-6">
                        <h3 className="text-xl font-bold mb-4">Overall Score</h3>
                        <ScoreDonut score={result.overallScore.score} grade={result.overallScore.grade} />
                    </div>
                    <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-6">
                        <MiniScoreGauge label="On-Page SEO" grade={result.categoryScores.onPage.grade} />
                        <MiniScoreGauge label="Usability" grade={result.categoryScores.usability.grade} />
                        <MiniScoreGauge label="Performance" grade={result.categoryScores.performance.grade} />
                        <MiniScoreGauge label="Social" grade={result.categoryScores.social.grade} />
                    </div>
                </div>
                 <div className="mt-8 h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <Radar name="Score" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                            <Tooltip contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                borderColor: 'hsl(var(--border))'
                            }}/>
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="bg-card/50">
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
                <Card className="bg-card/50">
                     <CardHeader>
                        <CardTitle>Content Analysis</CardTitle>
                        <CardDescription>Key content metrics from your page.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3 text-sm">
                            <li className="flex justify-between items-center"><span>Title Tag:</span> <Badge variant="outline" className="truncate max-w-xs">{result.title || 'Not Found'}</Badge></li>
                             <li className="flex justify-between items-center"><span>Meta Description:</span> <Badge variant={result.metaDescription ? 'outline' : 'destructive'} className="whitespace-normal text-left">{result.metaDescription || 'Not Found'}</Badge></li>
                             <li className="flex justify-between items-center"><span>Word Count:</span> <Badge variant="outline">{result.wordCount}</Badge></li>
                             <li className="flex justify-between items-center"><span>H1 Tags:</span> <Badge variant={result.h1s.length === 1 ? 'outline' : 'destructive'}>{result.h1s.length}</Badge></li>
                             <li className="flex justify-between items-center"><span>H2 Tags:</span> <Badge variant="outline">{result.h2s.length}</Badge></li>
                             <li className="flex justify-between items-center"><span>H3 Tags:</span> <Badge variant="outline">{result.h3s.length}</Badge></li>
                             <li className="flex justify-between items-center"><span>H4 Tags:</span> <Badge variant="outline">{result.h4s.length}</Badge></li>
                             <li className="flex justify-between items-center"><span>Robots.txt:</span> <Badge variant={result.hasRobotsTxt ? 'default' : 'destructive'}>{result.hasRobotsTxt ? 'Found' : 'Missing'}</Badge></li>
                             <li className="flex justify-between items-center"><span>Schema Markup:</span> <Badge variant={result.hasSchema ? 'default' : 'destructive'}>{result.hasSchema ? 'Found' : 'Missing'}</Badge></li>
                        </ul>
                    </CardContent>
                </Card>
            </div>


            <Card className="bg-card/50 p-6">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className="font-headline text-2xl">Recommendations ({result.recommendations.filter(r => !r.passed).length} issues found)</CardTitle>
                    <CardDescription>Follow these suggestions to improve your SEO score.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Check</TableHead>
                                <TableHead className="hidden md:table-cell">Suggestion</TableHead>
                                <TableHead className="text-right">Priority</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {result.recommendations.filter(r => !r.passed).map(rec => (
                                <TableRow key={rec.id}>
                                    <TableCell>
                                        <p className="font-semibold">{rec.check}</p>
                                        <p className="text-xs text-muted-foreground md:hidden">{rec.fix}</p>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground">{rec.fix}</TableCell>
                                    <TableCell className="text-right"><PriorityBadge priority={rec.priority} /></TableCell>
                                </TableRow>
                            ))}
                            {result.recommendations.filter(r => r.passed).map(rec => (
                                <TableRow key={rec.id} className="opacity-50">
                                    <TableCell>
                                        <p className="font-semibold">{rec.check}</p>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-xs text-muted-foreground">Passed</TableCell>
                                    <TableCell className="text-right"><Badge variant="default" className="bg-green-500/20 text-green-400 border-green-500/30">Passed</Badge></TableCell>
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
