import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface News {
  id: string
  title_vi: string
  title_en: string
  content_vi: string
  content_en: string
  excerpt_vi: string
  excerpt_en: string
  category: string
  image_url?: string
  created_at: string
  published_at?: string
  author?: string
  views?: number
  published: boolean
  status?: string
  news_categories?: {
    id: string
  } | null
  category_id?: string
}
export interface NewsCategory {
  id: number
  name_vi: string
  name_en: string
  slug: string
  description_vi?: string
  description_en?: string
  active: boolean
  created_at: string
  updated_at: string
}
export interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  message: string
  status: "new" | "contacted" | "resolved"
  created_at: string
}

// Helper function to test Supabase connection
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("news").select("count(*)").limit(1)

    if (error) {
      console.error("Supabase connection error:", error)
      return false
    }

    console.log("Supabase connection successful:", data)
    return true
  } catch (error) {
    console.error("Supabase connection failed:", error)
    return false
  }
}
