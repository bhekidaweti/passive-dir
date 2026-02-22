import { supabase } from "@/lib/supabase"
import { slugify } from "@/lib/slugify"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const form = await req.formData()

  const name = String(form.get("listing_name"))

  const slug = slugify(name)

  await supabase.from("listings").insert({
    listing_name: name,
    slug, // ALWAYS SAVE
    short_description: form.get("short_description"),
    long_description: form.get("long_description"),
    primary_category: form.get("primary_category"),
    website: form.get("website"), // required
    status: "active",
  })

  return NextResponse.redirect(new URL("/admin/listings", req.url))
}
