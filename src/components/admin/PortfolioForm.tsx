
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { type PortfolioItem } from "@/lib/definitions";
import { useFirestore, useStorage } from "@/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { Upload, ImageIcon, Loader2, Link as LinkIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
  const storage = useStorage();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showUrlInput, setShowUrlInput] = useState(false);

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Error', description: 'Please select an image file', variant: 'destructive' });
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `portfolio/${Date.now()}-${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error(error);
        toast({ title: 'Error', description: 'Failed to upload image', variant: 'destructive' });
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        form.setValue('imageUrl', downloadURL);
        setUploading(false);
        setProgress(0);
        toast({ title: 'Success', description: 'Image uploaded successfully' });
      }
    );
  };

  const { isSubmitting } = form.formState;

  const processForm = async (data: PortfolioFormData) => {
    // Sanitize data to remove any undefined values
    const sanitizedData = JSON.parse(JSON.stringify(data));
    
    try {
      if (item) {
        await setDoc(doc(firestore, "portfolioItems", item.id), sanitizedData, { merge: true });
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
              <FormLabel className="flex items-center justify-between">
                <span>Project Image</span>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-xs text-primary h-7"
                >
                  {showUrlInput ? <Upload className="h-3 w-3 mr-1" /> : <LinkIcon className="h-3 w-3 mr-1" />}
                  {showUrlInput ? 'Upload Image' : 'Use URL instead'}
                </Button>
              </FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {showUrlInput ? (
                    <Input placeholder="https://..." {...field} />
                  ) : (
                    <div className={cn(
                      "relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 group overflow-hidden",
                      uploading ? "bg-muted" : "hover:bg-primary/5 hover:border-primary/50",
                      field.value ? "border-primary/50" : "border-muted-foreground/20"
                    )}>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                      
                      <div className="flex flex-col items-center justify-center space-y-3 text-center">
                        {uploading ? (
                          <>
                            <div className="relative">
                              <Loader2 className="h-10 w-10 text-primary animate-spin" />
                              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold">
                                {Math.round(progress)}%
                              </span>
                            </div>
                            <div className="space-y-1 w-full max-w-[200px]">
                              <p className="text-sm font-medium">Uploading image...</p>
                              <Progress value={progress} className="h-1" />
                            </div>
                          </>
                        ) : field.value ? (
                          <div className="relative w-full max-w-sm aspect-video rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity">
                            <img src={field.value} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-foreground text-xs font-medium">Change Image</p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                              <Upload className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Click or drag to upload project image</p>
                              <p className="text-xs text-muted-foreground">Supported format: JPG, PNG, WEBP</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
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
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/5">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onFinished} 
            className="flex-1 h-12 rounded-xl hover:bg-destructive/10 hover:text-destructive font-bold uppercase tracking-widest text-xs transition-all"
          >
            Discard Archive
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="flex-[2] h-12 bg-primary hover:bg-primary/80 text-foreground font-black uppercase tracking-widest rounded-xl shadow-[0_10px_30px_rgba(142,68,173,0.3)] transition-all active:scale-95"
          >
            {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {item ? "Update Case Study" : "Publish to Gallery"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
