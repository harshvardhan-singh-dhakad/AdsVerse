"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { type PricingPlan } from "@/lib/definitions";
import { useFirestore } from "@/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORIES = [
  // Digital Marketing
  { id: "smm", label: "Social Media", icon: "📱", color: "#e91e8c" },
  { id: "seo", label: "Search Engine", icon: "🔍", color: "#22c55e" },
  { id: "content", label: "Content Marketing", icon: "✍️", color: "#8b5cf6" },
  { id: "ppc", label: "Paid Ads (PPC)", icon: "🚀", color: "#f59e0b" },
  { id: "ecommerce", label: "E-Commerce", icon: "🛍️", color: "#10b981" },
  { id: "email", label: "Email Marketing", icon: "📧", color: "#0ea5e9" },
  { id: "design", label: "Creative Design", icon: "🎨", color: "#ec4899" },
  { id: "web", label: "Web Development", icon: "💻", color: "#3b82f6" },
  { id: "orm", label: "Reputation (ORM)", icon: "🛡️", color: "#6366f1" },
  { id: "analytics", label: "Data Analytics", icon: "📊", color: "#f97316" },
  { id: "video", label: "Video Production", icon: "🎬", color: "#f43f5e" },
  { id: "branding", label: "Brand Strategy", icon: "✨", color: "#8b5cf6" },
  // AI & Automation
  { id: "whatsapp", label: "WhatsApp Automation", icon: "💬", color: "#25d366" },
  { id: "n8n", label: "Workflow Logic (n8n)", icon: "⚙️", color: "#ff6d5a" },
  { id: "aiagents", label: "AI Agents/Bots", icon: "🤖", color: "#06b6d4" },
  { id: "crm", label: "CRM Automation", icon: "🗄️", color: "#3b82f6" },
  { id: "chatautomation", label: "Chat Solutions", icon: "💬", color: "#8b5cf6" },
  { id: "analytics-ai", label: "AI Analytics", icon: "📈", color: "#f59e0b" },
  { id: "custom-dev", label: "Custom AI Dev", icon: "🛠️", color: "#6366f1" },
];

const pricingPlanSchema = z.object({
  name: z.string().min(3, "Name is required."),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required."),
  frequency: z.string().optional(),
  category: z.string().min(1, "Category is required."),
  categoryLabel: z.string().min(1, "Category label is required."),
  subCategory: z.string().optional(),
  features: z.array(z.object({ value: z.string().min(1, "Feature cannot be empty.") })),
  isPopular: z.boolean().default(false),
  callToAction: z.string().min(1, "CTA is required."),
  displayOrder: z.coerce.number().min(0, "Order must be a positive number."),
  planType: z.enum(['service', 'automation', 'video']),
  icon: z.string().optional(),
  categoryIcon: z.string().optional(),
  categoryColor: z.string().optional(),
  categoryDesc: z.string().optional(),
});

type PricingFormData = z.infer<typeof pricingPlanSchema>;

interface PricingFormProps {
  plan: PricingPlan | null;
  onFinished: () => void;
}

export function PricingForm({ plan, onFinished }: PricingFormProps) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const form = useForm<PricingFormData>({
    resolver: zodResolver(pricingPlanSchema),
    defaultValues: plan ? {
      ...plan,
      features: plan.features.map(f => ({ value: f })),
    } : {
      name: "",
      description: "",
      price: "",
      frequency: "/mo",
      category: "seo",
      categoryLabel: "Search Engine",
      subCategory: "",
      features: [{ value: "" }],
      isPopular: false,
      callToAction: "Get Started",
      displayOrder: 0,
      planType: 'service',
      icon: "📍",
      categoryIcon: "🔍",
      categoryColor: "#22c55e",
      categoryDesc: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const { isSubmitting } = form.formState;

  const processForm = async (data: PricingFormData) => {
    const dataForFirestore = {
      ...data,
      description: data.description || '',
      frequency: data.frequency || '',
      subCategory: data.subCategory || '',
      features: data.features.map(f => f.value),
    };

    try {
      if (plan) {
        await setDoc(doc(firestore, "pricingPlans", plan.id), dataForFirestore, { merge: true });
        toast({ title: "Success", description: "Pricing plan updated." });
      } else {
        await addDoc(collection(firestore, "pricingPlans"), dataForFirestore);
        toast({ title: "Success", description: "Pricing plan added." });
      }
      onFinished();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const handleCategoryChange = (val: string) => {
    const cat = CATEGORIES.find(c => c.id === val);
    if (cat) {
      form.setValue("category", val);
      form.setValue("categoryLabel", cat.label);
      form.setValue("categoryIcon", cat.icon);
      form.setValue("categoryColor", cat.color);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1 pr-4">
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Plan Name</FormLabel>
                <FormControl><Input placeholder="e.g., Local SEO" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="planType"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Tab / Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="service">Digital Service</SelectItem>
                        <SelectItem value="automation">AI Automation</SelectItem>
                        <SelectItem value="video">Video & Creative</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={handleCategoryChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plan Icon (Emoji)</FormLabel>
                <FormControl><Input placeholder="e.g., 📍" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="categoryLabel"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Display Category Label</FormLabel>
                <FormControl><Input placeholder="e.g. Meta Ads, SEO, etc." {...field} /></FormControl>
                <FormDescription className="text-[10px]">How this category name appears on the page.</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="categoryDesc"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Category Description (Optional)</FormLabel>
                <FormControl><Input placeholder="General description for this group..." {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan Description (Optional)</FormLabel>
              <FormControl><Input placeholder="Best for growing businesses" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl><Input placeholder="e.g., ₹24,999" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Period (e.g., /mo or Once)</FormLabel>
                <FormControl><Input placeholder="e.g., /mo" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
            <FormLabel>Features / Deliverables</FormLabel>
            <div className="space-y-2 mt-2">
            {fields.map((field, index) => (
                <FormField
                key={field.id}
                control={form.control}
                name={`features.${index}.value`}
                render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                        <FormControl><Input {...field} /></FormControl>
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <FormMessage />
                    </FormItem>
                )}
                />
            ))}
            </div>
            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ value: "" })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Feature
            </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <FormField
            control={form.control}
            name="displayOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="callToAction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Call to Action Text</FormLabel>
                <FormControl><Input placeholder="e.g., Get Started" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

         <FormField
            control={form.control}
            name="isPopular"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                    <FormLabel>Mark as Popular / Featured</FormLabel>
                </div>
                <FormControl>
                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                </FormControl>
              </FormItem>
            )}
          />
        
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/5">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onFinished} 
            className="flex-1 h-12 rounded-xl hover:bg-destructive/10 hover:text-destructive font-bold uppercase tracking-widest text-xs transition-all"
          >
            Discard Changes
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="flex-[2] h-12 bg-primary hover:bg-primary/80 text-foreground font-black uppercase tracking-widest rounded-xl shadow-[0_10px_30px_rgba(142,68,173,0.3)] transition-all active:scale-95"
          >
            {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {plan ? "Update Protocol" : "Authorize New Plan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
