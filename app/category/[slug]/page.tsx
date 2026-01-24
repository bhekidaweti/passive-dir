import { supabase } from "@/lib/supabase"
import ListingCard from "@/components/ListingCard"
import { notFound } from "next/navigation"


export async function generateStaticParams() {
  const { data } = await supabase
    .from("listings")
    .select("primary_category")

  const uniqueCategories = Array.from(
    new Set(data?.map(item => item.primary_category))
  )

  return uniqueCategories.map((category) => ({
    slug: category
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }))
}


type Props = {
  params: { slug: string }
}

function slugToCategory(slug: string) {
  return slug
    .split("-")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ")
}

export async function generateMetadata({ params }: Props) {
  const categoryName = slugToCategory(params.slug)

  return {
    title: `${categoryName} Passive Income Apps`,
    description: `Best ${categoryName.toLowerCase()} platforms to earn passive income online.`
  }
}

export default async function CategoryPage({ params }: Props) {
  const categoryName = slugToCategory(params.slug)

  const { data: listings } = await supabase
    .from("listings")
    .select(`
      id,
      listing_name,
      short_description,
      primary_category,
      risk_ban_probability,
      website
    `)
    .eq("primary_category", categoryName)
    .order("acceptance_score", { ascending: false })

  if (!listings || listings.length === 0) {
    return notFound()
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold">
        {categoryName} Passive Income Apps
      </h1>

      <p className="mt-4 text-gray-600 max-w-3xl">
        Curated {categoryName.toLowerCase()} platforms ranked by trust, risk, and earning potential.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
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
