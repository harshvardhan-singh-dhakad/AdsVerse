
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { type PortfolioItem } from "@/lib/definitions";
import { useFirestore } from "@/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

const portfolioSchema = z.object({
  title: z.string().min(3, "Title is required."),
  description: z.string().min(10, "Description is required."),
  category: z.string().min(2, "Category is required."),
  imageUrl: z.string().url("A valid image URL is required."),
  projectDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "A valid date is required.",
  }),
});

type PortfolioFormData = z.infer<typeof portfolioSchema>;

interface PortfolioFormProps {
  item: PortfolioItem | null;
  onFinished: () => void;
}

export function PortfolioForm({ item, onFinished }: PortfolioFormProps) {
  const { toast } = useToast();
  const firestore = useFirestore();
  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: item ? {
        ...item,
        projectDate: item.projectDate ? new Date(item.projectDate).toISOString().split('T')[0] : '',
    } : {
      title: "",
      description: "",
      category: "",
      imageUrl: "",
      projectDate: new Date().toISOString().split('T')[0],
    },
  });

  const { isSubmitting } = form.formState;

  const processForm = async (data: PortfolioFormData) => {
    try {
      if (item) {
        await setDoc(doc(firestore, "portfolioItems", item.id), data, { merge: true });
        toast({ title: "Success", description: "Portfolio item updated." });
      } else {
        await addDoc(collection(firestore, "portfolioItems"), data);
        toast({ title: "Success", description: "Portfolio item added." });
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl><Input placeholder="Project Title" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl>
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
              <FormControl><Textarea placeholder="Describe the project. You can use HTML for formatting." {...field} rows={6} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl><Input placeholder="e.g., web" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="projectDate"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Project Date</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {item ? "Update Item" : "Add Item"}
        </Button>
      </form>
    </Form>
  );
}
