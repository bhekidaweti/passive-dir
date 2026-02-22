import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"

type Props = {
  params: { id: string }
}

export default async function EditListing({ params }: Props) {
  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!listing) return notFound()

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-xl font-bold mb-4">
        {listing.listing_name}
      </h1>

      <form
        action={`/api/admin/listings/delete/${listing.id}`}
        method="post"
      >
        <button className="text-red-600">
          Delete
        </button>
      </form>
    </div>
  )
}
