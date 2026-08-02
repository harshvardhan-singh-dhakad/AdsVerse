const fs = require('fs');

let code = fs.readFileSync('src/app/tools/seo-audit/page.tsx', 'utf8');

// 1. Update Loading Steps
code = code.replace(
  /label: 'Searching your website...', sub: 'Crawling pages, sitemap & robots.txt'/g, 
  "label: 'Crawling page...', sub: 'Reading HTML, CSS, and metadata'"
);
code = code.replace(
  /label: 'Collecting on-page data...', sub: 'Reading titles, headings, meta tags & content'/g, 
  "label: 'Checking schema...', sub: 'Analyzing structured data and headers'"
);
code = code.replace(
  /label: 'Running GEO & AEO AI analysis...', sub: 'Checking AI readiness, schema & answer engine signals'/g, 
  "label: 'Querying AI engines...', sub: 'Testing brand citations in Gemini'"
);
code = code.replace(
  /label: 'Generating your report...', sub: 'Calculating scores & preparing recommendations'/g, 
  "label: 'Compiling report...', sub: 'Generating actionable recommendations'"
);

// 2. Update Hero Trust Signals
code = code.replace(
  /<h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">\s*Free Website Audit Tool\s*<\/h1>/,
  `<h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Free Website Audit Tool
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-muted"><img src="https://i.pravatar.cc/100?img=1" alt="User" /></div>
              <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-muted"><img src="https://i.pravatar.cc/100?img=2" alt="User" /></div>
              <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-muted"><img src="https://i.pravatar.cc/100?img=3" alt="User" /></div>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Trusted by 10,000+ businesses
            </div>
          </div>`
);

// 3. Add Sample Report Link
code = code.replace(
  /<\/form>/,
  `</form>
          <div className="mt-4">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground underline inline-flex items-center gap-1">
              <Search className="w-3 h-3" /> View sample report preview
            </Link>
          </div>`
);

// 4. Modify GeoAeoSection Component
const oldGeoAeoSection = `const GeoAeoSection = ({ id, icon: Icon, title, score, grade, accentColor, checks, explanation, whatIs }: {`;
const newGeoAeoSection = `const GeoAeoSection = ({ id, icon: Icon, title, score, grade, accentColor, checks, explanation, whatIs, llmDetails }: {
  id: string;
  icon: React.ElementType;
  title: string;
  score: number;
  grade: string;
  accentColor: string;
  checks: GeoAeoCheck[];
  explanation: string;
  whatIs: string;
  llmDetails?: any[];
}) => {
  const passed = checks.filter(c => c.status === 'pass').length;
  const total = checks.length;
  return (
    <section id={id} aria-labelledby={\`\${id}-title\`} className={\`bg-card rounded-lg shadow-sm border mb-6 scroll-mt-24 \${accentColor.replace('text-', 'border-').replace('-500', '-500/30')}\`}>
      <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between bg-card-foreground/5 rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className={\`p-2 rounded-full bg-muted \${accentColor}\`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <CardTitle id={\`\${id}-title\`} className="text-lg font-bold text-foreground">{title}</CardTitle>
            <p className="text-xs text-muted-foreground">{passed}/{total} checks passed</p>
          </div>
        </div>
        <GradeCircle grade={grade} score={score} size="small" />
      </CardHeader>
      <CardContent className="p-6">
        <div className={\`mb-6 p-4 rounded-lg border bg-muted/30 border-border\`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">What is {id.toUpperCase()}?</p>
          <p className="text-sm text-foreground font-medium">{whatIs}</p>
          <p className="text-xs text-muted-foreground mt-2">{explanation}</p>
        </div>
        
        {llmDetails && llmDetails.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">Live LLM Citation Evidence</h4>
            <div className="space-y-3">
              {llmDetails.map((detail, idx) => (
                <div key={idx} className="p-3 bg-card border border-border shadow-sm rounded-lg text-sm">
                  <p className="font-medium text-foreground mb-2">Prompt: "{detail.prompt}"</p>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                     <Badge variant={detail.cited ? "default" : "destructive"} className={detail.cited ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20 shadow-none border-0' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20 shadow-none border-0'}>
                       {detail.cited ? '✓ Brand Cited' : '✗ Not Cited'}
                     </Badge>
                     {detail.cited && detail.prominence && <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">Pos: {detail.prominence}</span>}
                  </div>
                  {detail.context && <p className="text-muted-foreground text-xs italic border-l-2 border-primary/50 pl-3 py-1 bg-muted/30 rounded-r">"...{detail.context}..."</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">Technical Checks</h4>
          {checks.map((check, idx) => <GeoAeoCheckItem key={idx} check={check} />)}
        </div>
      </CardContent>
    </section>
  );
};
`;
// Replace the entire GeoAeoSection component
const geoStart = code.indexOf(oldGeoAeoSection);
const geoEnd = code.indexOf('};', geoStart) + 2;
code = code.substring(0, geoStart) + newGeoAeoSection + code.substring(geoEnd);


// 5. Update the GEO invocation
code = code.replace(
  /checks={getGeoChecks\(\)}\s*whatIs="GEO is the practice/,
  `checks={getGeoChecks()} llmDetails={report.llmGeoAeo?.geoDetails} whatIs="GEO is the practice`
);
code = code.replace(
  /checks={getAeoChecks\(\)}\s*whatIs="AEO is the process/,
  `checks={getAeoChecks()} llmDetails={report.llmGeoAeo?.aeoDetails} whatIs="AEO is the process`
);

// 6. 3 Score Rings Summary (Replace entire Summary Card top section)
const summaryStartStr = `<div className="flex flex-col lg:flex-row gap-8 items-center relative">`;
const summaryEndStr = `<div className="space-y-3">`;
const summaryStart = code.indexOf(summaryStartStr);
const summaryEnd = code.indexOf(summaryEndStr, summaryStart);

const newSummary = `<div className="flex flex-col w-full relative">
              <div className="absolute top-0 right-0 mt-2 mr-2 z-10">
                 <Button onClick={() => { setReport(null); setUrl(''); setRateLimitInfo(null); setEmailSent(false); }} variant="outline" size="sm">New Audit</Button>
              </div>
              
              <div className="text-center mb-10 w-full">
                 <h2 className="text-2xl font-bold text-foreground mb-2 break-all">Report for: {report.finalUrl}</h2>
                 {report.redirected && <Badge variant="secondary" className='mb-4'>Redirected from {report.url}</Badge>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto mb-10">
                <div className="flex flex-col items-center bg-card shadow-sm border border-border p-6 rounded-xl text-center relative overflow-hidden">
                   <div className="absolute top-0 w-full h-1 bg-primary"></div>
                   <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wide font-bold">Overall SEO Score</p>
                   <GradeCircle grade={report.overallScore.grade} score={report.overallScore.score} />
                </div>
                <div className="flex flex-col items-center bg-violet-500/5 border border-violet-500/20 p-6 rounded-xl text-center relative overflow-hidden">
                   <div className="absolute top-0 w-full h-1 bg-violet-500"></div>
                   <p className="text-xs text-violet-500 mb-4 uppercase tracking-wide font-bold">GEO Score</p>
                   <GradeCircle grade={report.geoAeoScores.geo.grade} score={report.geoAeoScores.geo.score} />
                </div>
                <div className="flex flex-col items-center bg-cyan-500/5 border border-cyan-500/20 p-6 rounded-xl text-center relative overflow-hidden">
                   <div className="absolute top-0 w-full h-1 bg-cyan-500"></div>
                   <p className="text-xs text-cyan-500 mb-4 uppercase tracking-wide font-bold">AEO Score</p>
                   <GradeCircle grade={report.geoAeoScores.aeo.grade} score={report.geoAeoScores.aeo.score} />
                </div>
              </div>

              <div className="space-y-3">`;

if(summaryStart !== -1 && summaryEnd !== -1) {
  code = code.substring(0, summaryStart) + newSummary + code.substring(summaryEnd + summaryEndStr.length);
}

// 7. Implement Paywall
const mainStartStr = `<ReportSection id="on-page-seo"`;
const mainEndStr = `</main>`;
const mainStart = code.indexOf(mainStartStr);
const mainEnd = code.indexOf(mainEndStr, mainStart);

if (mainStart !== -1 && mainEnd !== -1) {
  const mainContent = code.substring(mainStart, mainEnd);
  
  const paywallWrapper = `
              {userPlan === 'free' ? (
                <div className="relative" style={{ maxHeight: '600px', overflow: 'hidden' }}>
                  {/* Blurred Content */}
                  ${mainContent.replace(/\$/g, '$$$')}
                  
                  {/* Paywall Overlay */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-12 pt-32 bg-gradient-to-t from-background via-background/90 to-transparent backdrop-blur-[3px]">
                    <div className="bg-card border border-border p-8 rounded-xl shadow-2xl text-center max-w-md mx-auto">
                      <Crown className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-foreground mb-2">Unlock Full Report</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        Your free audit reveals your overall scores and top issues. Upgrade to unlock the full step-by-step checklist, live AI citation evidence, and PDF reports.
                      </p>
                      <Link href="/pricing">
                        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold h-12 shadow-md">
                          View Paid Plans <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  ${mainContent.replace(/\$/g, '$$$')}
                </>
              )}
  `;
  code = code.substring(0, mainStart) + paywallWrapper + code.substring(mainEnd);
}

// 8. Lock PDF buttons for free users
code = code.replace(/<div className="mt-8 pt-6 border-t border-border">/, `<div className={\`mt-8 pt-6 border-t border-border \${userPlan === 'free' ? 'opacity-50 pointer-events-none grayscale' : ''}\`}>`);

fs.writeFileSync('src/app/tools/seo-audit/page.tsx', code);
