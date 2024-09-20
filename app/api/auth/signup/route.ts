import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Access the environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!

// Ensure the environment variables are set
if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase URL and Service Key are required.')
}

// Create the Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey)
export async function POST(req: Request) {
  const { email, password } = await req.json()

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error

    return NextResponse.json({ message: 'User created successfully' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }
}