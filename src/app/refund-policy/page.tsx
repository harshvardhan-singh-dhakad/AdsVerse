import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | AdsVerse",
  description: "AdsVerse refund and cancellation policy. Understand our transparent billing, cancellation process, and refund eligibility for digital marketing services.",
  alternates: {
    canonical: "https://adsverse.in/refund-policy",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Refund & Cancellation Policy — AdsVerse",
  "description": "AdsVerse refund and cancellation policy for digital marketing services.",
  "url": "https://adsverse.in/refund-policy",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://adsverse.in" },
      { "@type": "ListItem", "position": 2, "name": "Refund Policy", "item": "https://adsverse.in/refund-policy" }
    ]
  }
};

export default function RefundPolicyPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto py-16 px-4 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline text-white mb-4">Refund & Cancellation Policy</h1>
      <p className="text-slate-400 mb-12">Last updated: June 2026 | Effective immediately</p>

      <div className="space-y-10 text-slate-300">

        <section>
          <h2 className="text-2xl font-bold text-primary font-headline mb-4">1. Overview</h2>
          <p className="leading-relaxed">AdsVerse (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a digital marketing agency based in Vijay Nagar, Indore, Madhya Pradesh, India. We are committed to transparent, honest business practices. This Refund and Cancellation Policy outlines the terms under which cancellations are accepted and refunds, if any, are processed for our services.</p>
          <p className="leading-relaxed mt-3">By engaging AdsVerse for any service, you agree to the terms described in this policy.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary font-headline mb-4">2. Service Categories</h2>
          <p className="leading-relaxed mb-3">Our services fall into two categories, each with distinct billing and refund terms:</p>
          <div className="space-y-3">
            <div className="p-5 rounded-xl border border-border/30 bg-card/20">
              <h3 className="font-semibold text-white mb-1">Monthly Retainer Services</h3>
              <p className="text-sm leading-relaxed">SEO, GEO, AEO, Google Ads Management, Meta Ads Management, Social Media Management, Content Marketing, and Marketing Automation — billed monthly in advance.</p>
            </div>
            <div className="p-5 rounded-xl border border-border/30 bg-card/20">
              <h3 className="font-semibold text-white mb-1">One-Time Project Services</h3>
              <p className="text-sm leading-relaxed">Website Development, WhatsApp Bot Setup, n8n Automation Setup, and Brand Strategy — billed as milestones or a single project fee.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary font-headline mb-4">3. Cancellation Policy</h2>
          <h3 className="text-lg font-semibold text-white mb-2">Monthly Retainer Services</h3>
          <ul className="list-disc list-inside space-y-2 leading-relaxed mb-4">
            <li>You may cancel your retainer service at any time by providing written notice to <a href="mailto:contact@adsverse.in" className="text-primary hover:underline">contact@adsverse.in</a> at least <strong>15 days before your next billing date</strong>.</li>
            <li>Cancellations received less than 15 days before the next billing date will take effect from the following month.</li>
            <li>There are no long-term contracts. All retainers are month-to-month.</li>
            <li>Upon cancellation, all work in progress for the current billing month will be completed and delivered.</li>
          </ul>
          <h3 className="text-lg font-semibold text-white mb-2">One-Time Project Services</h3>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li>Cancellation of a project after work has commenced is subject to payment for the percentage of work completed at the time of cancellation.</li>
            <li>Projects cancelled before any work has commenced are eligible for a full refund of any advance payment.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary font-headline mb-4">4. Refund Policy</h2>
          <h3 className="text-lg font-semibold text-white mb-2">Monthly Retainer Services — Refund Eligibility</h3>
          <ul className="list-disc list-inside space-y-2 leading-relaxed mb-4">
            <li><strong>No refunds</strong> are issued for the current month&apos;s retainer fee once work has commenced for that billing period.</li>
            <li>If AdsVerse fails to commence any agreed-upon work within the first 7 days of a billing period, you are eligible for a full refund of that month&apos;s fee upon written request.</li>
            <li>Dissatisfaction with results alone does not constitute grounds for a refund, as digital marketing outcomes depend on many external factors including market competition, ad spend, and website performance.</li>
          </ul>
          <h3 className="text-lg font-semibold text-white mb-2">One-Time Project Services — Refund Eligibility</h3>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li>Advance payments for projects cancelled before commencement: <strong>100% refund</strong> within 7 business days.</li>
            <li>Projects cancelled after commencement: Refund of advance payment minus the value of work completed at the agreed project rate.</li>
            <li>Completed and delivered projects are not eligible for refunds.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary font-headline mb-4">5. Ad Spend — Important Notice</h2>
          <p className="leading-relaxed">AdsVerse does not hold or manage your advertising budget. All ad spend on Google Ads, Meta Ads, and other platforms is paid directly by you to the respective platforms. AdsVerse is not responsible for ad spend already consumed and cannot process refunds for platform ad spend under any circumstances. Our management fees are separate from and independent of your ad spend.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary font-headline mb-4">6. How to Request a Refund or Cancellation</h2>
          <p className="leading-relaxed mb-3">To cancel a service or request a refund, please contact us through any of the following channels:</p>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li>Email: <a href="mailto:contact@adsverse.in" className="text-primary hover:underline">contact@adsverse.in</a></li>
            <li>Phone: <a href="tel:+919685123339" className="text-primary hover:underline">+91 96851 23339</a></li>
            <li>Contact Form: <a href="/contact" className="text-primary hover:underline">adsverse.in/contact</a></li>
          </ul>
          <p className="leading-relaxed mt-3">Please include your name, service name, invoice number (if applicable), and reason for cancellation or refund request. We will respond within 2 business days.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary font-headline mb-4">7. Refund Processing Timeline</h2>
          <p className="leading-relaxed">Approved refunds are processed within <strong>7–14 business days</strong> via the original payment method. Bank transfer timelines may vary depending on your financial institution.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary font-headline mb-4">8. Changes to This Policy</h2>
          <p className="leading-relaxed">AdsVerse reserves the right to update this Refund and Cancellation Policy at any time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes constitutes your acceptance of the revised policy.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary font-headline mb-4">9. Contact Us</h2>
          <p className="leading-relaxed">For any questions regarding this policy, please contact:</p>
          <div className="mt-3 p-5 rounded-xl border border-border/30 bg-card/20 space-y-1 text-sm">
            <p><strong className="text-white">AdsVerse</strong></p>
            <p>Vijay Nagar, Indore, Madhya Pradesh — 452010, India</p>
            <p>Email: <a href="mailto:contact@adsverse.in" className="text-primary hover:underline">contact@adsverse.in</a></p>
            <p>Phone: <a href="tel:+919685123339" className="text-primary hover:underline">+91 96851 23339</a></p>
            <p>Website: <a href="https://adsverse.in" className="text-primary hover:underline">adsverse.in</a></p>
          </div>
        </section>

      </div>
    </div>
    </>
  );
}
