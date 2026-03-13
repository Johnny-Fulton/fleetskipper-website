// lib/actions/requestChecklist.ts
"use server";

import { z } from "zod";
import { saveLead, trackConversion } from "@/lib/services/db";
import { sendChecklist } from "@/lib/services/email";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
});

export type ChecklistFormState = {
  success?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string[] | undefined>>;
  downloadUrl?: string;
};

export async function requestChecklist(
  prevState: ChecklistFormState,
  formData: FormData
): Promise<ChecklistFormState> {
  try {
    // Validate input
    const validatedFields = schema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company") || undefined,
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
      source: "download",
      createdAt: new Date().toISOString(),
    });

    if (!result.success) {
      return { error: "Failed to process your request. Please try again." };
    }

    // Generate download URL (in production, might be S3 presigned URL)
    const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/downloads/wbc3-checklist.pdf`;

    // Send email with download link (async, non-blocking)
    sendChecklist(dto.email, downloadUrl).catch(err => {
      console.error("Failed to send checklist email:", err);
      // Don't fail the request if email fails - user can still download
    });

    // Track conversion (async, non-blocking)
    trackConversion("download", dto.email).catch(err => {
      console.error("Failed to track conversion:", err);
    });

    return { 
      success: true,
      downloadUrl, // Return URL so user can download immediately
    };
  } catch (error) {
    console.error("Checklist form error:", error);
    return { 
      error: "An unexpected error occurred. Please try again later." 
    };
  }
}