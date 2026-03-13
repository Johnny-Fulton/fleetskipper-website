import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Only create client if environment variables are present
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types
export interface ClientSubmission {
  id: string
  created_at: string
  updated_at: string
  status: 'pending' | 'processing' | 'completed'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form_data: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploaded_files?: any[]
  processed_at?: string
  google_drive_link?: string
}
