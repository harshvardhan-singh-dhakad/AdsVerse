"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

type State = {
  success: boolean;
  error?: string;
};

export async function submitContactForm(data: z.infer<typeof formSchema>): Promise<State> {
  const validatedFields = formSchema.safeParse(data);

  if (!validatedFields.success) {
    return { 
      success: false,
      error: "Invalid data provided. Please check the form and try again.",
    };
  }

  try {
    await addDoc(collection(db, "contacts"), {
      ...validatedFields.data,
      submittedAt: Timestamp.now(),
    });
    
    return { success: true };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    console.error("Failed to submit contact form:", errorMessage);
    return {
      success: false,
      error: "There was a problem submitting your form. Please try again later.",
    };
  }
}
