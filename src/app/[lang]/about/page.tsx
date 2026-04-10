
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const isHi = lang === 'hi';
  return {
    title: isHi ? "AdsVerse के बारे में — इंदौर की शीर्ष मार्केटिंग एजेंसी" : "About AdsVerse — Top Marketing Agency in Indore",
    description: isHi
      ? "AdsVerse के बारे में जानें, इंदौर की शीर्ष AI मार्केटिंग एजेंसी। 2018 से, हमने SEO और विज्ञापनों के माध्यम से 47+ ब्रांडों को बढ़ने में मदद की है।"
      : "Learn about AdsVerse, Indore's top AI marketing agency. Since 2018, we've helped 47+ brands grow through SEO, Paid Ads, and Automation.",
    keywords: [
      "digital marketing agency Indore", "best marketing agency Indore",
      "AdsVerse team", "Deepak Dhakad digital marketing",
      "digital marketing expert Indore", "marketing agency founded 2018 India"
    ],
    alternates: {
      canonical: `https://adsverse.in/${lang}/about`,
      languages: {
        'en': 'https://adsverse.in/en/about',
        'hi': 'https://adsverse.in/hi/about',
      },
    },
  };
}

const teamMembers = [
  { name: "Deepak Dhakad", role: "Ads, AI Automation, GEO & SEO Specialist", avatar: "https://firebasestorage.googleapis.com/v0/b/synergyflow-digital-p7c0g.firebasestorage.app/o/Image%2FBlog%2FHSD01.jpeg?alt=media", hint: "man portrait" },
  { name: "Manisha kumawat", role: "SMM & Ads Expert", avatar: "https://firebasestorage.googleapis.com/v0/b/synergyflow-digital-p7c0g.firebasestorage.app/o/Image%2FBlog%2FMANU.jpg?alt=media", hint: "woman portrait" },
  { name: "Aarsh Shrivas", role: "Business Analyst", avatar: "https://firebasestorage.googleapis.com/v0/b/synergyflow-digital-p7c0g.firebasestorage.app/o/Image%2FBlog%2FAarsh.JPG?alt=media", hint: "man portrait" },
];

const timelineEvents = [
  { year: "2018", title: "The Spark", description: "AdsVerse was founded with a mission to demystify digital marketing for growing businesses.", color: "bg-yellow-400 text-black" },
  { year: "2020", title: "First Major Client", description: "Landed our first major partnership, propelling our growth and expanding our service offerings.", color: "bg-blue-500" },
  { year: "2022", title: "Team Expansion", description: "Grew our team of experts to cover all facets of the digital marketing landscape, from SEO to social media.", color: "bg-green-500" },
  { year: "2024", title: "Future Forward", description: "Embracing AI and next-gen tech to deliver unparalleled results and innovative strategies for our clients.", color: "bg-purple-500" },
  { year: "2025", title: "Global Reach", description: "Expanding our services to international markets and helping businesses worldwide achieve their digital goals.", color: "bg-orange-500" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About The AdsVerse Team & Our Mission",
  "description": "Learn about the mission, vision, and the passionate team of marketers, strategists, and creators at AdsVerse dedicated to helping your brand thrive in the digital world.",
  "url": "https://adsverse.in/about",
  "mainEntity": {
    "@type": "Organization",
    "name": "AdsVerse",
    "url": "https://adsverse.in",
    "logo": "https://adsverse.in/images/logo-white.webp",
    "member": teamMembers.map(member => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.role,
      "image": member.avatar
    }))
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://adsverse.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://adsverse.in/about"
      }
    ]
  }
};

export default function AboutPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
    <div className="container mx-auto py-16 px-4">
      <section className="text-center mb-24">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight font-headline text-primary">About AdsVerse</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          We are a team of passionate marketers, strategists, and creators dedicated to helping your brand thrive in the digital world.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-primary font-headline">Our Mission</h2>
          <p className="text-muted-foreground text-lg">
            To empower businesses with data-driven, creative digital marketing strategies that foster growth, build lasting connections with audiences, and deliver exceptional return on investment.
          </p>
        </div>
        <div className="md:text-right">
          <h2 className="text-3xl font-bold mb-4 text-accent font-headline">Our Vision</h2>
          <p className="text-muted-foreground text-lg">
            To be the leading digital marketing agency known for innovation, transparency, and a relentless commitment to our clients' success in an ever-evolving digital landscape.
          </p>
        </div>
      </section>

      <section className="mb-24">
        <Card className="bg-card/50 backdrop-blur-sm overflow-hidden border-primary/20">
          <div className="grid md:grid-cols-3 items-center">
            <div className="md:col-span-1 h-full">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/synergyflow-digital-p7c0g.firebasestorage.app/o/Image%2FTeam%2FDEEPAK.ABOUT.png?alt=media"
                alt="Deepak Dhakad - Digital Marketing Expert and Founder, AdsVerse Indore"
                width={400}
                height={600}
                data-ai-hint="man professional"
                className="w-full h-full object-cover object-top rounded-b-[5rem]"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <div className="md:col-span-2 p-8 md:p-12">
              <h2 className="text-3xl font-bold font-headline text-primary mb-2">About Me</h2>
              <p className="text-xl font-semibold text-accent mb-4">I'm Deepak Dhakad – a Digital Marketing Expert who turns ideas into impactful online experiences.</p>
              <div className="space-y-4 text-muted-foreground">
                <p>I specialize in helping businesses grow through strategic digital marketing solutions. From SEO and Social Media Marketing to Paid Advertising, Website & App Development, and cutting-edge AI-powered solutions – I bring a complete package of skills to elevate your brand in the digital world.</p>
                <p>With deep expertise across every aspect of digital marketing, I don't just create campaigns; I build strategies that drive real results. Whether you're looking to increase your online visibility, engage your audience, or boost conversions, I craft customized solutions tailored to your unique business goals.</p>
                <p>My approach is simple: understand your vision, leverage the right technologies, and deliver measurable growth. I stay ahead of industry trends, embrace innovation, and focus on what matters most – your success</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* <section className="mb-24">
        <h2 className="text-4xl font-bold text-center mb-12 font-headline">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {teamMembers.map((member) => (
            <Card key={member.name} className="text-center bg-card/50 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2">
              <CardContent className="p-6">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary">
                  <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint} width={96} height={96} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-accent">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      <section>
        <h2 className="text-4xl font-bold text-center mb-16 font-headline text-primary">Our Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div key={event.year} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                 <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className={`relative ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <Card className="bg-card/50 backdrop-blur-sm inline-block text-left">
                        <CardHeader>
                            <CardTitle className="text-primary font-headline">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{event.description}</p>
                        </CardContent>
                    </Card>
                   </div>
                </div>
                <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center font-bold text-primary-foreground ${event.color}`}>
                  {event.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
