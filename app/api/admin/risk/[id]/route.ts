import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const form = await req.formData()

  await supabase
    .from("listing_risk_factors")
    .update({
      factor: form.get("factor"),
      weight: Number(form.get("weight")),
    })
    .eq("id", params.id)

  const referer = req.headers.get("referer") || "/admin"

  return NextResponse.redirect(new URL(referer, req.url))
}
