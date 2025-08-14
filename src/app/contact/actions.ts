
"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp, doc, updateDoc } from "firebase/firestore";
import { analyzeContactRequest } from "@/ai/flows/contact-follow-up-flow";

const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("A valid email is required."),
  subject: z.string().min(1, "Subject is required."),
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
    // Step 1: Add the initial contact document to get an ID
    const docRef = await addDoc(collection(db, "contacts"), {
      ...validatedFields.data,
      submittedAt: Timestamp.now(),
      analysisStatus: 'pending',
    });
    
    console.log("Contact form submitted with ID:", docRef.id);

    // Step 2: Asynchronously call the AI flow for analysis (don't wait for it)
    analyzeAndAndUpdate(docRef.id, validatedFields.data);

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

// Helper function to run AI analysis in the background
async function analyzeAndAndUpdate(docId: string, data: z.infer<typeof formSchema>) {
  try {
    // Step 3: Run the AI analysis
    const analysisResult = await analyzeContactRequest({
      name: data.name,
      email: data.email,
      message: data.message,
    });

    // Step 4: Update the document in Firestore with the analysis results
    const docToUpdate = doc(db, "contacts", docId);
    await updateDoc(docToUpdate, {
      aiAnalysis: analysisResult,
      analysisStatus: 'complete',
    });
    console.log(`Successfully analyzed and updated contact ${docId}`);
  } catch(e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown AI analysis error.";
    console.error(`AI analysis failed for contact ${docId}:`, errorMessage);
    // Optionally update the document with an error status
    const docToUpdate = doc(db, "contacts", docId);
    await updateDoc(docToUpdate, {
      analysisStatus: 'failed',
      analysisError: errorMessage,
    });
  }
}
