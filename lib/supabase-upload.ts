import { supabase } from "./supabase"

export async function uploadImage(file: File): Promise<string | null> {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `news/${fileName}`

    const { data, error } = await supabase.storage.from("images").upload(filePath, file)

    if (error) {
      console.error("Upload error:", error)
      return null
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(filePath)
    return publicUrl
  } catch (error) {
    console.error("Upload error:", error)
    return null
  }
}
