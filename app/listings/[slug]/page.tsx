import { supabase } from "@/lib/supabase"
import { slugify } from "@/lib/slugify"
import { notFound } from "next/navigation"


export default async function ListingPage({
  params,
}: {
  params: { slug: string }
}) {
  const { data } = await supabase
    .from("listings")
    .select("*")

  const listing = data?.find(
    (item) => slugify(item.listing_name) === params.slug
  )

  if (!listing) return notFound()

  const slug = slugify(listing.listing_name)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold">
        {listing.listing_name}
      </h1>

      <p className="mt-4 text-gray-700">
        {listing.short_description}
      </p>

      <div className="mt-6 rounded-lg border bg-gray-50 p-5">
        <h2 className="font-semibold text-lg">
          How you earn passive income
        </h2>
        <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
          {listing.how_you_earn_passive_income ||
            "Details coming soon."}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <strong>Category:</strong> {listing.primary_category}
        </div>
        <div>
          <strong>Region:</strong> {listing.region || "Global"}
        </div>
        <div>
          <strong>Risk level:</strong>{" "}
          {listing.risk_ban_probability ?? "Not rated"}
        </div>
        <div>
          <strong>Status:</strong> {listing.status}
        </div>
      </div>

      <a
        href={`/out/${slug}`}
        target="_blank"
        rel="nofollow sponsored"
        className="mt-8 inline-block rounded-md bg-black px-6 py-3 text-sm text-white"
      >
        Visit official website →
      </a>
    </div>
  )
}
      