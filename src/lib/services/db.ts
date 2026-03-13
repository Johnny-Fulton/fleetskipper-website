// lib/services/db.ts
// Minimal interface so you can swap Airtable/Notion/Supabase later.

export type Lead = {
  name: string;
  email: string;
  company?: string;
  fleetSize?: string;
  message?: string;
  source: "contact" | "download" | "demo";
  createdAt: string; // ISO
};

export type LeadResult = {
  id: string;
  success: boolean;
};

// In-memory store for development
const devLeads: Lead[] = [];

export async function saveLead(lead: Lead): Promise<LeadResult> {
  if (process.env.NODE_ENV !== "production") {
    console.warn("[dev] saveLead mock:", lead.email, lead.source);
    devLeads.push(lead);
    console.warn("[dev] Total leads stored:", devLeads.length);
  }
  
  // TODO: Production implementation
  // Example with Airtable:
  // const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
  // const record = await base('Leads').create({
  //   Name: lead.name,
  //   Email: lead.email,
  //   Company: lead.company || '',
  //   'Fleet Size': lead.fleetSize || '',
  //   Message: lead.message || '',
  //   Source: lead.source,
  //   'Created At': lead.createdAt,
  // });
  // return { id: record.id, success: true };
  
  // Example with Supabase:
  // const { data, error } = await supabase.from('leads').insert(lead).select().single();
  // if (error) throw error;
  // return { id: data.id, success: true };
  
  return { 
    id: `lead_${Date.now()}`, 
    success: true 
  };
}

export async function getLeads(): Promise<Lead[]> {
  if (process.env.NODE_ENV !== "production") {
    return devLeads;
  }
  
  // TODO: Production implementation
  return [];
}

// Analytics helper for tracking conversions
export async function trackConversion(source: Lead['source'], email: string) {
  if (process.env.NODE_ENV !== "production") {
    console.warn("[dev] trackConversion:", source, email);
  }
  
  // TODO: Send to analytics service (Plausible, PostHog, etc.)
  // Example:
  // await analytics.track('Lead Created', {
  //   source,
  //   email_domain: email.split('@')[1],
  // });
}