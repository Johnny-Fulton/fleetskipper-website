// app/api/downloads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { rateLimitApi } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  // Apply rate limiting: 5 downloads per minute per IP
  const rateLimitResponse = await rateLimitApi(req, {
    interval: 60000, // 1 minute
    maxRequests: 5,  // 5 requests per minute
  });
  
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const formData = await req.formData();
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const company = String(formData.get("company") || "");
    const asset = String(formData.get("asset") || "wbc3-checklist");

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // TODO: Save lead to database
    // await saveLead({ 
    //   name, 
    //   email, 
    //   company,
    //   source: `download-${asset}`,
    //   createdAt: new Date().toISOString() 
    // });

    // TODO: Send email with download link
    // if (asset === "wbc3-checklist") {
    //   const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/downloads/wbc3-checklist-placeholder.html`;
    //   await sendEmail({
    //     to: email,
    //     subject: "Your WBC3 SMS Checklist (Placeholder)",
    //     body: `Thanks ${name}! Here's your placeholder checklist: ${downloadUrl}. The full version is coming soon.`
    //   });
    // }

    // Redirect back to resources page with success message
    const redirectUrl = new URL("/resources", process.env.NEXT_PUBLIC_SITE_URL || req.url);
    redirectUrl.searchParams.set("success", "true");
    redirectUrl.searchParams.set("asset", asset);
    
    return NextResponse.redirect(redirectUrl.toString(), { status: 303 });
    
  } catch (error) {
    // Log to monitoring service in production
    // TODO: Send to error tracking service
    
    // Redirect back with error
    const redirectUrl = new URL("/resources", process.env.NEXT_PUBLIC_SITE_URL || req.url);
    redirectUrl.searchParams.set("error", "true");
    
    return NextResponse.redirect(redirectUrl.toString(), { status: 303 });
  }
}

// Handle GET requests (direct access)
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Please use the download form." },
    { status: 405 }
  );
}