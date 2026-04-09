
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { type Service } from "@/lib/definitions";
import { useFirestore } from "@/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

const serviceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  iconName: z.string().min(2, "Icon name is required."),
  displayOrder: z.coerce.number().min(0, "Display order must be a positive number."),
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
    defaultValues: service || {
      name: "",
      description: "",
      iconName: "",
      displayOrder: 0,
    },
  });

  const { isSubmitting } = form.formState;

  const processForm = async (data: ServiceFormData) => {
    try {
      if (service) {
        // Update existing service
        await setDoc(doc(firestore, "services", service.id), data, { merge: true });
        toast({ title: "Success", description: "Service updated successfully." });
      } else {
        // Add new service
        await addDoc(collection(firestore, "services"), data);
        toast({ title: "Success", description: "Service added successfully." });
      }
      onFinished();
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-6">
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea placeholder="Describe the service..." {...field} /></FormControl>
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
                <FormLabel>Icon Name</FormLabel>
                <FormControl><Input placeholder="e.g., TrendingUp" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
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
