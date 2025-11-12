
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | AdsVerse",
    description: "Please read our Terms of Service carefully before using the AdsVerse website. This document outlines the rules and regulations for the use of our services.",
    alternates: {
        canonical: '/terms-of-service',
        languages: {
            'en': '/en/terms-of-service',
            'hi': '/hi/terms-of-service',
        },
    },
};

export default function TermsOfServicePage() {
  const lastUpdatedDate = "August 19, 2024";

  return (
    <div className="container mx-auto py-16 px-4 max-w-4xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">Terms of Service</h1>
        <p className="mt-4 text-muted-foreground">Last updated: {lastUpdatedDate}</p>
      </header>
      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90 space-y-6">
        <h2 className="text-3xl font-bold text-primary font-headline">1. Agreement to Terms</h2>
        <p>
          By using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
        </p>

        <h2 className="text-3xl font-bold text-primary font-headline">2. Use of Our Services</h2>
        <p>
          You must follow any policies made available to you within the Services. Don’t misuse our Services. For example, don’t interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.
        </p>

        <h2 className="text-3xl font-bold text-primary font-headline">3. Intellectual Property Rights</h2>
        <p>
          The Service and its original content, features, and functionality are and will remain the exclusive property of AdsVerse and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.
        </p>

        <h2 className="text-3xl font-bold text-primary font-headline">4. Prohibited Activities</h2>
        <p>
          You agree not to engage in any of ahe following prohibited activities: (i) copying, distributing, or disclosing any part of the Service in any medium; (ii) using any automated system, including without limitation "robots," "spiders," "offline readers," etc., to access the Service; (iii) transmitting spam, chain letters, or other unsolicited email.
        </p>

        <h2 className="text-3xl font-bold text-primary font-headline">5. Termination</h2>
        <p>
          We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
        </p>

        <h2 className="text-3xl font-bold text-primary font-headline">6. Disclaimer of Warranties</h2>
        <p>
          Our Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
        </p>

        <h2 className="text-3xl font-bold text-primary font-headline">7. Limitation of Liability</h2>
        <p>
          In no event shall AdsVerse, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
        </p>

        <h2 className="text-3xl font-bold text-primary font-headline">8. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
        </p>

        <h2 className="text-3xl font-bold text-primary font-headline">9. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at contact@adsverse.in.
        </p>
      </div>
    </div>
  );
}
