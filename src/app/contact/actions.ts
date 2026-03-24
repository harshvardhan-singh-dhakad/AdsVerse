
"use server";

import { z } from "zod";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { initializeFirebase } from "@/firebase/server"; // Use server-side initialization

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
    const { firestore } = initializeFirebase();
    const docRef = await addDoc(collection(firestore, "leads"), {
      ...validatedFields.data,
      submissionDate: Timestamp.now(),
      isRead: false
    });
    
    console.log("Contact form submitted with ID:", docRef.id);

    return { success: true };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    console.error("Failed to submit contact form:", errorMessage);
    // In a real app, you might want to log this to a proper error monitoring service
    return {
      success: false,
      error: "There was a problem submitting your form. Please try again later.",
    };
  }
}
