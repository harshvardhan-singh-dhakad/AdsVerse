import 'server-only';
import type { Locale } from '@/i18n-config';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  hi: () => import('@/dictionaries/hi.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    switch (locale) {
        case 'en':
            return dictionaries.en();
        case 'hi':
            return dictionaries.hi();
        default:
            return dictionaries.en();
    }
};
