import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import RiskBadge from "@/components/RiskBadge"
import RelatedListings from "@/components/RelatedListings"

export default async function ListingPage({
  params,
}: {
  params: { slug: string }
}) {
  // DIRECT QUERY (fast + correct)
  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", params.slug)
    .single()

  if (!listing) return notFound()

  const { data: riskLevels } = await supabase
    .from("risk_levels")
    .select("*")

  const { data: related } = await supabase
    .from("listings")
    .select("*")
    .eq("primary_category", listing.primary_category)
    .neq("id", listing.id)
    .limit(4)

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">{listing.listing_name}</h1>

      <RiskBadge
        score={listing.risk_ban_probability}
        levels={riskLevels || []}
      />

      <h2 className="text-xl font-semibold mt-4">{listing.short_description}</h2>

      <a 
        href={`/out/${listing.slug}`}
        target="_blank"
        rel="nofollow sponsored"
        className="mt-8 inline-block rounded-lg bg-black px-6 py-3 text-white"
        >
          Visit offical website →
        </a>

      

      <RelatedListings listings={related || []} />
    </div>
  )
}
