
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
}

export type Lead = BaseDoc & {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    submissionDate: Timestamp;
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
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
