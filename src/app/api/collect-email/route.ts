import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client with service role for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const { email, source = 'wbc3-checker' } = await req.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('user_profiles')
      .select('email, signup_source')
      .eq('email', email)
      .maybeSingle()

    if (existing) {
      // Email already exists, just update the last activity
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          updated_at: new Date().toISOString(),
          last_login_at: new Date().toISOString()
        })
        .eq('email', email)

      if (updateError) {
        console.error('Error updating existing lead:', updateError)
      }

      return NextResponse.json({
        success: true,
        message: 'Email already registered',
        existing: true
      })
    }

    // Create new lead entry
    // Note: Since we're not using auth.users for anonymous tool access,
    // we'll create a profile entry without a user_id
    const { data, error } = await supabase
      .from('leads')
      .insert({
        email,
        signup_source: source,
        created_at: new Date().toISOString(),
        lead_score: 'warm' // Using tool = warm lead
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to save email' },
        { status: 500 }
      )
    }

    console.log(`✅ New lead captured: ${email} from ${source}`)

    return NextResponse.json({
      success: true,
      message: 'Email saved successfully',
      data
    })

  } catch (error) {
    console.error('Collect email API error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle GET requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit email.' },
    { status: 405 }
  )
}
