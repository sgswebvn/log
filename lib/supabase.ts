import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Contact = {
  id?: number
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
  created_at?: string
}
