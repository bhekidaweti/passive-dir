import { supabase } from "@/lib/supabase"
import ListingCard from "@/components/ListingCard"
import { slugify } from "@/lib/slugify"

type SearchParams = {
  risk?: string
  category?: string
}

export default async function ListingsPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  let query = supabase
    .from("listings")
    .select(`
      id,
      listing_name,
      short_description,
      long_description,
      primary_category,
      risk_ban_probability,
      website
    `)
    .order("acceptance_score", { ascending: false })

  // Risk filter
  if (searchParams.risk) {
    switch (searchParams.risk) {
      case "not-rated":
        query = query.is("risk_ban_probability", null)
        break
      case "low":
        query = query.lte("risk_ban_probability", 30)
        break
      case "medium":
        query = query
          .gte("risk_ban_probability", 31)
          .lte("risk_ban_probability", 70)
        break
      case "high":
        query = query.gte("risk_ban_probability", 71)
        break
    }
  }

  // Category filter
  if (searchParams.category) {
    query = query.eq("primary_category", searchParams.category)
  }

  const { data: listings, error } = await query

  if (error) {
    console.error(error)
    return <p>Error loading listings.</p>
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold">
        Passive Income Listings
      </h1>

      {/* FILTER BAR */}
      <div className="mt-6 flex flex-wrap gap-3">
        <FilterLink label="All" />
        <FilterLink label="Not rated" risk="not-rated" />
        <FilterLink label="Low risk" risk="low" />
        <FilterLink label="Medium risk" risk="medium" />
        <FilterLink label="High risk" risk="high" />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings?.map((listing) => (
          <ListingCard
            slug={slugify(listing.listing_name)}
            key={listing.id}
            id={listing.id}
            name={listing.listing_name}
            description={listing.short_description}
            longDescription={listing.long_description}
            category={listing.primary_category}
            risk={listing.risk_ban_probability}
            website={listing.website}
          />
        ))}
      </div>
    </main>
  )
}

function FilterLink({
  label,
  risk
}: {
  label: string
  risk?: string
}) {
  const href = risk ? `/listings?risk=${risk}` : "/listings"

  return (
    <a
      href={href}
      className="rounded-full border px-4 py-2 text-sm hover:bg-gray-100 transition"
    >
      {label}
    </a>
  )
}
