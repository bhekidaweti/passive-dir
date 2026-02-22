import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default async function AdminListings() {
  const { data } = await supabase
    .from("listings")
    .select("id, listing_name")

  return (
    <div className="max-w-3xl mx-auto p-8">

      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Listings</h1>

        <Link
          href="/admin/listings/new"
          className="bg-black text-white px-3 py-2"
        >
          + New
        </Link>
      </div>

      <ul className="space-y-2">
        {data?.map((l) => (
          <li key={l.id}>
            <Link
              href={`/admin/listings/${l.id}`}
              className="underline"
            >
              {l.listing_name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
