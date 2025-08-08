import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

async function parseBody(req: Request): Promise<{name?: string; email?: string; phone?: string; message?: string}> {
  const ct = req.headers.get("content-type") || ""
  try {
    if (ct.includes("application/json")) {
      return await req.json()
    }
    if (ct.includes("application/x-www-form-urlencoded")) {
      const text = await req.text()
      const params = new URLSearchParams(text)
      return Object.fromEntries(params) as any
    }
    if (ct.includes("multipart/form-data")) {
      const form = await req.formData()
      const obj: Record<string, any> = {}
      form.forEach((v, k) => { obj[k] = typeof v === "string" ? v : undefined })
      return obj as any
    }
  } catch {
    const text = await req.text().catch(() => "")
    if (text) {
      try {
        const params = new URLSearchParams(text)
        return Object.fromEntries(params) as any
      } catch {}
    }
  }
  return {}
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await parseBody(req)
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ success: true, id: 'dev-no-db' })
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'nep')
    const result = await db.collection('contacts').insertOne({
      name, email, phone, message, createdAt: new Date()
    })

    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) return NextResponse.json({ success: true, data: [] })
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'nep')
    const items = await db.collection('contacts').find().sort({ createdAt: -1 }).limit(50).toArray()
    return NextResponse.json({ success: true, data: items })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Server error' }, { status: 500 })
  }
}
