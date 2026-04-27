
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { type Service } from "@/lib/definitions";
import { useFirestore } from "@/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SERVICE_CATEGORIES = [
  { id: "smm", label: "Social Media", icon: "📱", color: "#e91e8c" },
  { id: "seo", label: "Search Engine", icon: "🔍", color: "#22c55e" },
  { id: "ads", label: "Paid Advertising", icon: "🚀", color: "#f59e0b" },
  { id: "web", label: "Web Development", icon: "💻", color: "#3b82f6" },
  { id: "content", label: "Content Marketing", icon: "✍️", color: "#8b5cf6" },
  { id: "creative", label: "Creative Design", icon: "🎨", color: "#ec4899" },
  { id: "email", label: "Email Marketing", icon: "📧", color: "#0ea5e9" },
  { id: "influencer", label: "Influencer Marketing", icon: "🌟", color: "#f97316" },
  { id: "reputation", label: "Reputation Management", icon: "🛡️", color: "#6366f1" },
  { id: "analytics", label: "Analytics & Reporting", icon: "📊", color: "#10b981" },
  { id: "automation", label: "AI & Automation", icon: "🤖", color: "#06b6d4" },
  { id: "strategy", label: "Strategy & Consulting", icon: "🎓", color: "#64748b" },
];

const serviceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  iconName: z.string().min(2, "Icon name is required."),
  displayOrder: z.coerce.number().min(0, "Display order must be a positive number."),
  category: z.string().min(1, "Category is required."),
  categoryIcon: z.string().optional(),
  categoryColor: z.string().optional(),
  categoryDesc: z.string().optional(),
  tags: z.array(z.object({ value: z.string().min(1, "Tag cannot be empty.") })).default([]),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  service: Service | null;
  onFinished: () => void;
}

export function ServiceForm({ service, onFinished }: ServiceFormProps) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: service ? {
      ...service,
      tags: service.tags?.map(t => ({ value: t })) || [],
    } : {
      name: "",
      description: "",
      iconName: "",
      displayOrder: 0,
      category: "smm",
      categoryIcon: "📱",
      categoryColor: "#e91e8c",
      categoryDesc: "",
      tags: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tags",
  });

  const { isSubmitting } = form.formState;

  const processForm = async (data: ServiceFormData) => {
    const dataForFirestore = {
      ...data,
      tags: data.tags.map(t => t.value),
    };
    
    try {
      if (service) {
        await setDoc(doc(firestore, "services", service.id), dataForFirestore, { merge: true });
        toast({ title: "Success", description: "Service updated successfully." });
      } else {
        await addDoc(collection(firestore, "services"), dataForFirestore);
        toast({ title: "Success", description: "Service added successfully." });
      }
      onFinished();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  const handleCategoryChange = (val: string) => {
    const cat = SERVICE_CATEGORIES.find(c => c.id === val);
    if (cat) {
      form.setValue("category", val);
      form.setValue("categoryIcon", cat.icon);
      form.setValue("categoryColor", cat.color);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Service Name</FormLabel>
                <FormControl><Input placeholder="e.g., SEO Optimization" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Parent Category</FormLabel>
                    <Select onValueChange={handleCategoryChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {SERVICE_CATEGORIES.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                            {cat.icon} {cat.label}
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
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
              <FormLabel>Service Description</FormLabel>
              <FormControl><Textarea placeholder="Describe the specific service..." {...field} /></FormControl>
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
              <FormDescription>Shown when this is the first service in the category.</FormDescription>
              <FormControl><Textarea placeholder="General description for this category..." {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="iconName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Visual Symbol (Icon/Emoji)</FormLabel>
                <FormControl><Input placeholder="e.g., 🔍 or TrendingUp" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="displayOrder"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Display Sequence</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <div>
            <FormLabel>Tags / Features</FormLabel>
            <div className="flex flex-wrap gap-2 mt-2">
            {fields.map((field, index) => (
                <FormField
                key={field.id}
                control={form.control}
                name={`tags.${index}.value`}
                render={({ field }) => (
                    <FormItem className="flex items-center gap-1 bg-muted/20 p-1 rounded-lg border border-border/5">
                        <FormControl><Input className="h-8 border-none bg-transparent w-24 text-xs" {...field} /></FormControl>
                        <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => remove(index)}>
                            <Trash2 className="h-3 w-3" />
                        </Button>
                    </FormItem>
                )}
                />
            ))}
            <Button type="button" variant="outline" size="sm" className="h-8 border-dashed border-primary/30 text-primary" onClick={() => append({ value: "" })}>
                <PlusCircle className="mr-1 h-3 w-3" /> Add Tag
            </Button>
            </div>
        </div>

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
            {service ? "Update Service Matrix" : "Deploy Core Service"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
