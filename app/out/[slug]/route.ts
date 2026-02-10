import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // IMPORTANT for server
)

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { data } = await supabase
    .from("outbound_links")
    .select("*")
    .eq("slug", params.slug)
    .single()

  if (!data) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // increment clicks
  await supabase
    .from("outbound_links")
    .update({ clicks: (data.clicks || 0) + 1 })
    .eq("slug", params.slug)

  const url =
    data.affiliate_url || data.destination_url

  return NextResponse.redirect(url)
}
