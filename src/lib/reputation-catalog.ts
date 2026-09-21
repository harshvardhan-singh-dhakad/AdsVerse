import { adminDb } from "@/firebase/admin";
import {
  DEFAULT_HOME_FAQS,
  DEFAULT_SECTION_A_FAQS,
  DEFAULT_SECTION_B_FAQS,
  DEFAULT_SECTION_C_FAQS,
  DEFAULT_TESTIMONIALS,
  type FAQItem,
  type TestimonialItem,
} from "@/lib/content-defaults";

const normalizeTestimonials = (docs: FirebaseFirestore.QueryDocumentSnapshot[]): TestimonialItem[] =>
  docs
    .map((doc, index) => {
      const data = doc.data() as Record<string, any>;
      const name = String(data.name || "").trim();
      const text = String(data.text || "").trim();
      if (!name || !text) return null;

      const rawRating = Number(data.rating);
      const rawOrder = Number(data.displayOrder);

      return {
        id: doc.id,
        name,
        role: String(data.role || "").trim(),
        text,
        initials: String(data.initials || name.slice(0, 2)).trim().slice(0, 3).toUpperCase(),
        rating: Number.isFinite(rawRating) ? Math.min(5, Math.max(1, Math.round(rawRating))) : 5,
        isPublished: data.isPublished !== false,
        displayOrder: Number.isFinite(rawOrder) && rawOrder >= 0 ? rawOrder : index,
      } satisfies TestimonialItem;
    })
    .filter((item): item is TestimonialItem => item !== null && item.isPublished !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

const normalizeFaqs = (docs: FirebaseFirestore.QueryDocumentSnapshot[]): FAQItem[] =>
  docs
    .map((doc, index) => {
      const data = doc.data() as Record<string, any>;
      const question = String(data.question || "").trim();
      const answer = String(data.answer || "").trim();
      if (!question || !answer) return null;

      const section = data.section === "b" || data.section === "c" ? data.section : "a";

      return {
        id: doc.id,
        question,
        answer,
        section,
        showOnHome: data.showOnHome === true,
        isPublished: data.isPublished !== false,
        displayOrder: Number(data.displayOrder ?? index) || index,
      } satisfies FAQItem;
    })
    .filter((item): item is FAQItem => item !== null && item.isPublished !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

export async function getPublicTestimonials(): Promise<TestimonialItem[]> {
  try {
    const snapshot = await adminDb.collection("testimonials").get();
    if (snapshot.docs.length > 0) {
      return normalizeTestimonials(snapshot.docs);
    }
  } catch (error) {
    console.warn("[testimonial-catalog] Firestore unavailable; using defaults.", error);
  }

  return DEFAULT_TESTIMONIALS.map((item, index) => ({
    ...item,
    id: "default-testimonial-" + (index + 1),
    rating: 5,
    isPublished: true,
    displayOrder: index,
  }));
}

const fallbackFaqs = [
  ...DEFAULT_SECTION_A_FAQS.map((item, index) => ({ ...item, section: "a" as const, displayOrder: index })),
  ...DEFAULT_SECTION_B_FAQS.map((item, index) => ({ ...item, section: "b" as const, displayOrder: index })),
  ...DEFAULT_SECTION_C_FAQS.map((item, index) => ({ ...item, section: "c" as const, displayOrder: index })),
];

export async function getPublicFaqs(): Promise<FAQItem[]> {
  try {
    const snapshot = await adminDb.collection("faqs").get();
    if (snapshot.docs.length > 0) {
      return normalizeFaqs(snapshot.docs);
    }
  } catch (error) {
    console.warn("[faq-catalog] Firestore unavailable; using defaults.", error);
  }

  const homeQuestions = new Set(DEFAULT_HOME_FAQS.map((item) => item.question));
  return fallbackFaqs.map((item) => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
    section: item.section,
    showOnHome: homeQuestions.has(item.question),
    isPublished: true,
    displayOrder: item.displayOrder,
  }));
}

export async function getHomeFaqs(): Promise<FAQItem[]> {
  const faqs = await getPublicFaqs();
  const selected = faqs.filter((faq) => faq.showOnHome);
  if (selected.length > 0) return selected.slice(0, 8);

  return DEFAULT_HOME_FAQS.map((item, index) => ({
    id: "default-home-faq-" + (index + 1),
    question: item.question,
    answer: item.answer,
    section: "a" as const,
    showOnHome: true,
    isPublished: true,
    displayOrder: index,
  }));
}

export async function getFaqSections() {
  const faqs = await getPublicFaqs();
  return {
    a: faqs.filter((faq) => faq.section === "a"),
    b: faqs.filter((faq) => faq.section === "b"),
    c: faqs.filter((faq) => faq.section === "c"),
  };
}
