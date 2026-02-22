import { MetadataRoute } from "next"
import { supabase } from "@/lib/supabase"
import { slugify } from "@/lib/slugify"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mydomain.com" // change later

  // fetch listings + categories
  const { data: listings } = await supabase
    .from("listings")
    .select("listing_name, updated_at, primary_category")

  if (!listings) return []

  const listingPages = listings.map((item) => ({
    url: `${baseUrl}/listing/${slugify(item.listing_name)}`,
    lastModified: item.updated_at || new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const categories = Array.from(
    new Set(listings.map((i) => i.primary_category))
  )

  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/category/${slugify(cat)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoryPages,
    ...listingPages,
  ]
}
