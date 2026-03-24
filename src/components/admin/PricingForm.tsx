
"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { type PricingPlan } from "@/lib/definitions";
import { useFirestore } from "@/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { Switch } from "@/components/ui/switch";

const pricingPlanSchema = z.object({
  name: z.string().min(3, "Name is required."),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required."),
  frequency: z.string().optional(),
  features: z.array(z.string().min(1, "Feature cannot be empty.")).min(1, "At least one feature is required."),
  isPopular: z.boolean().default(false),
  callToAction: z.string().min(1, "CTA is required."),
  displayOrder: z.coerce.number().min(0, "Order must be a positive number."),
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
    defaultValues: plan || {
      name: "",
      description: "",
      price: "",
      frequency: "/mo",
      features: [""],
      isPopular: false,
      callToAction: "Get Started",
      displayOrder: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const { isSubmitting } = form.formState;

  const processForm = async (data: PricingFormData) => {
    try {
      if (plan) {
        await setDoc(doc(firestore, "pricingPlans", plan.id), data, { merge: true });
        toast({ title: "Success", description: "Pricing plan updated." });
      } else {
        await addDoc(collection(firestore, "pricingPlans"), data);
        toast({ title: "Success", description: "Pricing plan added." });
      }
      onFinished();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-4 max-h-[70vh] overflow-y-auto p-1 pr-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan Name</FormLabel>
              <FormControl><Input placeholder="e.g., Business Pro" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
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
                <FormLabel>Frequency (Optional)</FormLabel>
                <FormControl><Input placeholder="e.g., /mo" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
            <FormLabel>Features</FormLabel>
            <div className="space-y-2 mt-2">
            {fields.map((field, index) => (
                <FormField
                key={field.id}
                control={form.control}
                name={`features.${index}`}
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
            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append("")}>
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
                    <FormLabel>Mark as Popular</FormLabel>
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
        
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {plan ? "Update Plan" : "Add Plan"}
        </Button>
      </form>
    </Form>
  );
}
