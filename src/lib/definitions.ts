
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
