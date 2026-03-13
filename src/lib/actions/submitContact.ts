// lib/actions/submitContact.ts
"use server";

import { z } from "zod";
import { saveLead, trackConversion } from "@/lib/services/db";
import { sendContactNotification } from "@/lib/services/email";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  fleetSize: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string[] | undefined>>;
};

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    // Validate input
    const validatedFields = schema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company") || undefined,
      fleetSize: formData.get("fleetSize") || undefined,
      message: formData.get("message") || undefined,
    });

    if (!validatedFields.success) {
      return {
        error: "Please check the form for errors",
        fieldErrors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const dto = validatedFields.data;

    // ONE WRITE per submit - save to database
    const result = await saveLead({
      ...dto,
      source: "contact",
      createdAt: new Date().toISOString(),
    });

    if (!result.success) {
      return { error: "Failed to save your information. Please try again." };
    }

    // Send notification email (async, non-blocking)
    sendContactNotification(dto).catch(err => {
      console.error("Failed to send notification email:", err);
      // Don't fail the request if email fails
    });

    // Track conversion (async, non-blocking)
    trackConversion("contact", dto.email).catch(err => {
      console.error("Failed to track conversion:", err);
    });

    return { 
      success: true,
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return { 
      error: "An unexpected error occurred. Please try again later." 
    };
  }
}