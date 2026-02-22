import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { slugify } from "@/lib/slugify"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name } = body

    if (!name) {
      return NextResponse.json(
        { error: "Category name required" },
        { status: 400 }
      )
    }

    const slug = slugify(name)

    const { data, error } = await supabase
      .from("categories")
      .insert({
        name,
        slug,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}
