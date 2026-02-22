import { supabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await supabase
    .from("listings")
    .delete()
    .eq("id", params.id)

  return NextResponse.redirect(new URL("/admin/listings", _req.url))
}
