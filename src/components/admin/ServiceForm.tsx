
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
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {service ? "Update Service" : "Add Service"}
        </Button>
      </form>
    </Form>
  );
}
