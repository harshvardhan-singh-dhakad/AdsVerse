"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("A valid email is required."),
  phone: z.string().min(10, "Please enter a valid phone number.").optional().or(z.literal('')),
  subject: z.string().min(1, "Please select a service."),
  message: z.string().min(10, "Message must be at least 10 characters."),
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
    const docRef = await addDoc(collection(db, "contacts"), {
      ...validatedFields.data,
      submittedAt: Timestamp.now(),
      analysisStatus: 'disabled',
    });
    
    console.log("Contact form submitted with ID:", docRef.id);

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
