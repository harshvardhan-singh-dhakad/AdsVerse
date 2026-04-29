
import { Timestamp } from "firebase/firestore";

// Base type for documents with an ID
export type BaseDoc = {
    id: string;
}

export type Service = BaseDoc & {
    name: string;
    description: string;
    iconName: string;
    displayOrder: number;
    // New fields for categorization and tagging
    category?: string;
    categoryLabel?: string;
    categoryIcon?: string;
    categoryColor?: string;
    categoryDesc?: string;
    planType?: 'dm' | 'ai';
    tags?: string[];
}

export type PortfolioItem = BaseDoc & {
    title: string;
    description: string; // Can contain HTML
    category: string;
    imageUrl: string;
    projectDate: string; // ISO date string
}

export type PricingPlan = BaseDoc & {
    name: string;
    description?: string;
    price: string;
    frequency?: string;
    category: string;
    subCategory?: string;
    features: string[];
    isPopular: boolean;
    callToAction: string;
    displayOrder: number;
    // New fields
    planType: 'service' | 'automation' | 'video';
    icon?: string; // For emojis
    categoryIcon?: string;
    categoryLabel?: string;
    categoryColor?: string;
    categoryDesc?: string;
}

export type Lead = BaseDoc & {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    submittedAt?: Timestamp;
    submissionDate?: Timestamp;
    isRead: boolean;
}

export type BlogPost = BaseDoc & {
    title: string;
    slug: string;
    excerpt: string;
    content: string; // HTML content
    imageUrl: string;
    category: string;
    author: string;
    publishedDate: string; // ISO string
    isPublished: boolean;
    // Enhanced Metadata
    tags: string[];
    imageAlt?: string;
    focusKeyword?: string;
    metaTitle?: string;
    metaDescription?: string;
    language: 'en' | 'hi' | 'hinglish';
    status: 'publish' | 'draft' | 'schedule';
    allowComments: boolean;
    includeInSitemap: boolean;
    isFeatured: boolean;
    schemaMarkup: boolean;
    whatsappShare: boolean;
    // Timestamps
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
