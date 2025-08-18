"use client";

import { useEffect, useState } from "react";

export default function PrivacyPolicyPage() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="container mx-auto py-16 px-4 max-w-4xl">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">Last updated: {currentDate}</p>
      </header>
      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto text-foreground/90 space-y-6">
        <p>
          AdsVerse ("us", "we", or "our") operates the https://adsverse.in website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </p>

        <h2 className="text-3xl font-bold text-primary font-headline">Information Collection and Use</h2>
        <p>
          We collect several different types of information for various purposes to provide and improve our Service to you.
        </p>
        <h3 className="text-2xl font-semibold text-accent font-headline">Types of Data Collected</h3>
        <p>
          <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Address, State, Province, ZIP/Postal code, City</li>
          <li>Cookies and Usage Data</li>
        </ul>

        <h2 className="text-3xl font-bold text-primary font-headline">How We Use Your Information</h2>
        <p>
          We use the collected data for various purposes:
        </p>
        <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide customer care and support</li>
            <li>To provide analysis or valuable information so that we can improve the Service</li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
        </ul>

        <h2 className="text-3xl font-bold text-primary font-headline">Data Sharing and Disclosure</h2>
        <p>
          We may disclose your Personal Data in the good faith belief that such action is necessary to:
        </p>
         <ul className="list-disc pl-6 space-y-2">
            <li>To comply with a legal obligation</li>
            <li>To protect and defend the rights or property of AdsVerse</li>
            <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>To protect the personal safety of users of the Service or the public</li>
            <li>To protect against legal liability</li>
        </ul>

        <h2 className="text-3xl font-bold text-primary font-headline">Data Security</h2>
        <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
        </p>

        <h2 className="text-3xl font-bold text-primary font-headline">Changes to This Policy</h2>
        <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "last updated" date at the top of this Privacy Policy.
        </p>

        <h2 className="text-3xl font-bold text-primary font-headline">Contact Us</h2>
        <p>
            If you have any questions about this Privacy Policy, please contact us by email: contact@adsverse.in
        </p>
      </div>
    </div>
  );
}
