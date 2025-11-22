import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingActionButton } from "@/components/layout/floating-action-button";
import { getDictionary } from "@/lib/get-dictionary";

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dictionary = await getDictionary(params.lang);
  
  const navLinks = [
    { href: "/", label: dictionary.navigation.home },
    { href: "/about", label: dictionary.navigation.about },
    { href: "/our-services", label: dictionary.navigation.services },
    { href: "/portfolio", label: dictionary.navigation.portfolio },
    { href: "/pricing", label: dictionary.navigation.pricing },
    { href: "/blog", label: dictionary.navigation.blog },
    { href: "/contact", label: dictionary.navigation.contact },
  ];

  return (
    <>
      <Header navLinks={navLinks} lang={params.lang} />
      <main>{children}</main>
      <Footer />
      <FloatingActionButton />
    </>
  );
}
