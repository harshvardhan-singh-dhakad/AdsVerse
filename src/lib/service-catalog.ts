import { adminDb } from "@/firebase/admin";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";
import {
  AI_CATEGORIES,
  DM_CATEGORIES,
  getServicePrice,
  getServiceSlug,
} from "@/lib/services-data";

export type PublicService = {
  id: string;
  name: string;
  description: string;
  desc: string;
  fullDesc: string;
  iconName: string;
  displayOrder: number;
  category: string;
  categoryLabel: string;
  categoryIcon: string;
  categoryColor: string;
  categoryDesc: string;
  planType: "dm" | "ai";
  tags: string[];
  slug: string;
  href?: string;
  price: number;
  isPublished: boolean;
};

export type PublicServiceResult = {
  service: PublicService;
  category: {
    id: string;
    label: string;
    icon: string;
    color: string;
    desc: string;
  };
};

const toNumber = (value: unknown, fallback: number) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizeStaticServices = (): PublicService[] => {
  const services: PublicService[] = [];
  let displayOrder = 0;

  for (const [planType, categories] of [
    ["dm", DM_CATEGORIES],
    ["ai", AI_CATEGORIES],
  ] as const) {
    for (const category of categories) {
      for (const service of category.services) {
        const slug = getServiceSlug(service.name);
        services.push({
          id: `static-${slug}`,
          name: service.name,
          description: service.desc,
          desc: service.desc,
          fullDesc: service.fullDesc || service.desc,
          iconName: category.icon,
          displayOrder: displayOrder++,
          category: category.id,
          categoryLabel: category.label,
          categoryIcon: category.icon,
          categoryColor: category.color,
          categoryDesc: category.desc,
          planType,
          tags: service.tags || [],
          slug,
          href: service.href,
          price: getServicePrice(service.name),
          isPublished: true,
        });
      }
    }
  }

  return services;
};

const normalizeFirestoreServices = (docs: QueryDocumentSnapshot[]): PublicService[] =>
  docs
    .map((doc, index) => {
      const data = doc.data() as Record<string, any>;
      const name = String(data.name || "").trim();
      if (!name) return null;

      const planType: "dm" | "ai" = data.planType === "ai" ? "ai" : "dm";
      const slug = String(data.slug || getServiceSlug(name));
      const description = String(data.description || data.desc || "").trim();
      const fullDesc = String(data.fullDesc || data.fullDescription || description).trim();
      const fallbackPrice = getServicePrice(name);

      return {
        id: doc.id,
        name,
        description,
        desc: description,
        fullDesc,
        iconName: String(data.iconName || data.categoryIcon || "✨"),
        displayOrder: toNumber(data.displayOrder, index),
        category: String(data.category || (planType === "ai" ? "ai-automation" : "digital-marketing")),
        categoryLabel: String(data.categoryLabel || data.category || "Services"),
        categoryIcon: String(data.categoryIcon || data.iconName || (planType === "ai" ? "🤖" : "📈")),
        categoryColor: String(data.categoryColor || "#f97316"),
        categoryDesc: String(data.categoryDesc || ""),
        planType,
        tags: Array.isArray(data.tags)
          ? data.tags.filter((tag: unknown): tag is string => typeof tag === "string" && tag.trim().length > 0)
          : Array.isArray(data.features)
            ? data.features.filter((tag: unknown): tag is string => typeof tag === "string" && tag.trim().length > 0)
            : [],
        slug,
        href: data.href ? String(data.href) : undefined,
        price: toNumber(data.price, fallbackPrice),
        isPublished: data.isPublished !== false,
      } satisfies PublicService;
    })
    .filter((service): service is PublicService => Boolean(service))
    .filter((service) => service.isPublished)
    .sort((a, b) => a.displayOrder - b.displayOrder);

export async function getPublicServices(): Promise<PublicService[]> {
  const staticServices = normalizeStaticServices();

  try {
    const snapshot = await adminDb.collection("services").get();
    if (snapshot.docs.length === 0) {
      return staticServices;
    }

    const firestoreServices = normalizeFirestoreServices(snapshot.docs);
    const firestoreBySlug = new Map<string, PublicService>();
    const hiddenSlugs = new Set<string>();

    for (const doc of snapshot.docs) {
      const data = doc.data() as Record<string, any>;
      const name = String(data.name || "").trim();
      if (!name) continue;

      const slug = String(data.slug || getServiceSlug(name));
      if (data.isPublished === false) {
        hiddenSlugs.add(slug);
        continue;
      }

      const normalized = firestoreServices.find((service) => service.id === doc.id);
      if (normalized) firestoreBySlug.set(slug, normalized);
    }

    const merged = staticServices
      .filter((service) => !hiddenSlugs.has(service.slug))
      .map((service) => firestoreBySlug.get(service.slug) || service);

    const staticSlugs = new Set(staticServices.map((service) => service.slug));
    const customServices = firestoreServices.filter(
      (service) => !staticSlugs.has(service.slug) && !hiddenSlugs.has(service.slug)
    );

    return [...merged, ...customServices].sort((a, b) => a.displayOrder - b.displayOrder);
  } catch (error) {
    console.warn("[service-catalog] Firestore unavailable; using static fallback.", error);
    return staticServices;
  }
}

export async function getPublicServiceBySlug(slug: string): Promise<PublicServiceResult | null> {
  const services = await getPublicServices();
  const service = services.find((item) => item.slug === slug);

  if (!service) return null;

  return {
    service,
    category: {
      id: service.category,
      label: service.categoryLabel,
      icon: service.categoryIcon,
      color: service.categoryColor,
      desc: service.categoryDesc,
    },
  };
}

export async function getPublicServiceGroups() {
  const services = await getPublicServices();

  const buildGroups = (planType: "dm" | "ai") => {
    const groups = new Map<string, {
      id: string;
      label: string;
      icon: string;
      color: string;
      desc: string;
      services: Array<{
        name: string;
        desc: string;
        fullDesc: string;
        tags: string[];
        href?: string;
        slug: string;
        price: number;
        id: string;
      }>;
    }>();

    for (const service of services.filter((item) => item.planType === planType)) {
      const existing = groups.get(service.category);
      const item = {
        name: service.name,
        desc: service.desc,
        fullDesc: service.fullDesc,
        tags: service.tags,
        href: service.href,
        slug: service.slug,
        price: service.price,
        id: service.id,
      };

      if (existing) {
        existing.services.push(item);
      } else {
        groups.set(service.category, {
          id: service.category,
          label: service.categoryLabel,
          icon: service.categoryIcon,
          color: service.categoryColor,
          desc: service.categoryDesc,
          services: [item],
        });
      }
    }

    return Array.from(groups.values());
  };

  return {
    digital_marketing: buildGroups("dm"),
    ai_automation: buildGroups("ai"),
  };
}
