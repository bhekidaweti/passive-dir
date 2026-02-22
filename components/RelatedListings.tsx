import Link from "next/link"
import { slugify } from "@/lib/slugify"

type Listing = {
  id: string
  listing_name: string
  short_description: string
}

export default function RelatedListings({
  listings,
}: {
  listings: Listing[]
}) {
  if (!listings.length) return null

  return (
    <div className="mt-14">
      <h3 className="text-xl font-semibold mb-4">
        Related platforms
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        {listings.map((l) => (
          <Link
            key={l.id}
            href={`/listings/${slugify(l.listing_name)}`}
            className="rounded-lg border p-4 hover:bg-gray-50"
          >
            <p className="font-medium">{l.listing_name}</p>
            <p className="text-sm text-gray-600 line-clamp-2">
              {l.short_description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
