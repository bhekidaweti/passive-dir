import { supabase } from "@/lib/supabase"
import ListingCard from "@/components/ListingCard"
import { notFound } from "next/navigation"
import { slugify } from "@/lib/slugify"

type Props = {
  params: { slug: string }
}

//
// STATIC PARAMS (build time)
//
export async function generateStaticParams() {
  const { data } = await supabase
    .from("listings")
    .select("primary_category")

  const unique = Array.from(
  new Set(data?.map((i) => i.primary_category))
)


  return unique.map((category) => ({
    slug: slugify(category),
  }))
}

//
// SEO METADATA
//
export async function generateMetadata({ params }: Props) {
  const { data } = await supabase
    .from("listings")
    .select("primary_category")

  const match = data?.find(
    (c) => slugify(c.primary_category) === params.slug
  )

  const categoryName = match?.primary_category || "Passive Income"

  return {
    title: `${categoryName} Apps & Websites`,
    description: `Best ${categoryName.toLowerCase()} platforms ranked by risk and earning potential.`,
  }
}

//
// PAGE
//
export default async function CategoryPage({ params }: Props) {
  const { data } = await supabase
    .from("listings")
    .select(`
      id,
      listing_name,
      short_description,
      primary_category,
      risk_ban_probability,
      website,
      acceptance_score
    `)
    .order("acceptance_score", { ascending: false })

  const listings =
    data?.filter(
      (l) => slugify(l.primary_category) === params.slug
    ) || []

  if (!listings.length) return notFound()

  const categoryName = listings[0].primary_category

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold">
        {categoryName} Passive Income Apps
      </h1>

      <p className="mt-4 max-w-3xl text-gray-600">
        Curated {categoryName.toLowerCase()} platforms ranked by trust,
        risk, and earning potential.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            id={listing.id}
            name={listing.listing_name}
            description={listing.short_description}
            category={listing.primary_category}
            risk={listing.risk_ban_probability}
            website={listing.website}
          />
        ))}
      </div>
    </main>
  )
}
