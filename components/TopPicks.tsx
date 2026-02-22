import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { slugify } from "@/lib/slugify"
import RiskBadge from "@/components/RiskBadge"

export default async function TopPicks() {
  // get outbound links sorted by clicks
  const { data: links } = await supabase
    .from("outbound_links")
    .select("*")
    .eq("is_active", true)
    .order("clicks", { ascending: false })
    .limit(6)

  if (!links?.length) return null

  // fetch matching listings
  const slugs = links.map((l) => l.slug)

  const { data: listings } = await supabase
    .from("listings")
    .select("*")
    .in("slug", slugs)

  if (!listings) return null

  // attach click counts to each listing
  const merged = listings.map((listing) => {
    const link = links.find((l) => l.slug === listing.slug)
    return {
      ...listing,
      clicks: link?.clicks || 0,
    }
  })

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">
        🔥 Top Picks
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {merged.map((item) => (
          <Link
            key={item.id}
            href={`/listings/${slugify(item.listing_name)}`}
            className="rounded-xl border p-5 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">
                {item.listing_name}
              </h3>

              <RiskBadge score={item.risk_ban_probability} levels={[]} />
            </div>

            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
              {item.short_description}
            </p>

            <p className="text-xs text-gray-500 mt-4">
              {item.clicks} visits
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
