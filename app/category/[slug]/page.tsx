import { supabase } from "@/lib/supabase"
import { slugify } from "@/lib/slugify"
import { notFound } from "next/navigation"

import ListingCard from "@/components/ListingCard"
import RiskFilter from "@/components/RiskFilter"
import { getRiskLevels, findRiskBadge } from "@/lib/risk"

type Props = {
  params: { slug: string }
  searchParams: { risk?: string }
}

export default async function CategoryPage({
  params,
  searchParams,
}: Props) {
  const selectedRisk = searchParams?.risk || "all"

  // fetch all listings
  const { data } = await supabase
    .from("listings")
    .select("*")

  const listings =
    data?.filter(
      (l) => slugify(l.primary_category) === params.slug
    ) || []

  if (!listings.length) return notFound()

  const riskLevels = await getRiskLevels()

  // filter by risk
  let filtered = listings

  if (selectedRisk !== "all") {
    const level = riskLevels.find(
      (r) => r.label.toLowerCase() === selectedRisk
    )

    if (level) {
      filtered = listings.filter(
        (l) =>
          l.risk_ban_probability >= level.min_score &&
          l.risk_ban_probability <= level.max_score
      )
    }
  }

  const categoryName = listings[0].primary_category

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      <h1 className="text-3xl font-bold">
        {categoryName} Apps
      </h1>

      {/* FILTERS */}
      <RiskFilter current={selectedRisk} />

      {/* CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((listing) => {
          const badge = findRiskBadge(
            listing.risk_ban_probability,
            riskLevels
          )

          return (
            <ListingCard
              key={listing.id}
              id={listing.id}
              name={listing.listing_name}
              description={listing.short_description}
              category={listing.primary_category}
              risk={listing.risk_ban_probability}
              website={listing.website}
              riskLabel={badge?.label}
              riskColor={badge?.color}
              slug={slugify(listing.listing_name)}
            />
          )
        })}
      </div>
    </main>
  )
}
