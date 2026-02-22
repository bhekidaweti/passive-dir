import { supabase } from "@/lib/supabase"
import ListingCard from "@/components/ListingCard"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const q = searchParams.q || ""

  const { data } = await supabase
    .from("listings")
    .select("*")
    .or(
      `listing_name.ilike.%${q}%,short_description.ilike.%${q}%`
    )
    .limit(50)

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-2xl font-bold">
        Search results for “{q}”
      </h1>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((listing) => (
          <ListingCard
            longDescription={listing.long_description}
            key={listing.id}
            name={listing.listing_name}
            description={listing.short_description}
            category={listing.primary_category}
            risk={listing.risk_ban_probability}
            website={listing.website} id={""} slug={""}          />
        ))}
      </div>
    </div>
  )
}
