"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="glass-card px-5 md:px-6 py-3 md:py-4 rounded-2xl border border-border-glass hover:border-primary/50 transition-colors"
        >
          <AccordionTrigger className="flex justify-between items-center text-slate-900 dark:text-white font-sans text-base md:text-lg hover:no-underline py-2">
            <span className="text-left font-bold">{faq.question}</span>
          </AccordionTrigger>
          <AccordionContent className="text-slate-800 dark:text-slate-200 text-sm md:text-base mt-4 leading-relaxed whitespace-pre-line border-t border-border-glass pt-4">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
