import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Link from "next/link"
import { slugify } from "@/lib/slugify"

export const dynamic = "force-dynamic"

export default async function CategoryListingsPage({
  params,
}: {
  params: { slug: string }
}) {

  const cleanSlug = slugify(params.slug)

  const { data: category } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("slug", cleanSlug)
    .single()

  if (!category) return notFound()


  const { data: listings } = await supabase
    .from("listings")
    .select(`
      id,
      listing_name,
      short_description,
      slug
    `)
    .eq("category_id", category.id)


  return (
    <div className="mx-auto max-w-6xl px-6 py-12">

      <h1 className="text-3xl font-bold mb-8">
        {category.name}
      </h1>

      {!listings?.length && (
        <p className="text-gray-500">No listings yet.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings?.map((listing) => (
          <Link
            key={listing.id}
            href={`/listings/${listing.slug}`}
            className="rounded-xl border p-6 hover:bg-gray-50 transition"
          >
            <h2 className="font-semibold">
              {listing.listing_name}
            </h2>

            <p className="text-sm text-gray-600 mt-2 line-clamp-3">
              {listing.short_description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}