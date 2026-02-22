"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { slugify } from "@/lib/slugify"

type Listing = {
  id: string
  listing_name: string
}

export default function CompareSelector() {
  const router = useRouter()

  const [listings, setListings] = useState<Listing[]>([])
  const [a, setA] = useState("")
  const [b, setB] = useState("")

  useEffect(() => {
    const fetchListings = async () => {
      const { data } = await supabase
        .from("listings")
        .select("id, listing_name")
        .order("listing_name")

      setListings(data || [])
    }

    fetchListings()
  }, [])

  const handleCompare = () => {
    if (!a || !b || a === b) return

    router.push(`/compare/${slugify(a)}-vs-${slugify(b)}`)
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-20 text-center">

      <h1 className="text-3xl font-bold mb-10">
        Compare Platforms
      </h1>

      <div className="space-y-6">

        {/* Select A */}
        <select
          value={a}
          onChange={(e) => setA(e.target.value)}
          className="w-full rounded-lg border p-3"
        >
          <option value="">Select Program A</option>
          {listings.map((l) => (
            <option key={l.id} value={l.listing_name}>
              {l.listing_name}
            </option>
          ))}
        </select>

        {/* Select B */}
        <select
          value={b}
          onChange={(e) => setB(e.target.value)}
          className="w-full rounded-lg border p-3"
        >
          <option value="">Select Program B</option>
          {listings.map((l) => (
            <option key={l.id} value={l.listing_name}>
              {l.listing_name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCompare}
          disabled={!a || !b || a === b}
          className="w-full rounded-lg bg-black text-white py-3 disabled:opacity-40"
        >
          Compare →
        </button>

      </div>
    </main>
  )
}
