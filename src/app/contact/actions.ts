"use server";

// This file is no longer used for form submission.
// The form submission logic has been moved to the client-side component
// in `src/components/pages/contact-form.tsx` to resolve a build error
// related to server-side Firebase initialization.
// This server action is kept to prevent breaking imports but should not be used.

export async function submitContactForm(data: any): Promise<{success: boolean, error?: string}> {
    console.warn("DEPRECATED: submitContactForm server action was called. The logic has been moved to the client.");
    return { success: false, error: "This server action is deprecated. Use the client-side form handler." };
}
