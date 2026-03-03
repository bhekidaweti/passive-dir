import { supabase } from "@/lib/supabase"
import TopPicks from "@/components/TopPicks"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function Home() {
  // 1️⃣ categories
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name")

  // 2️⃣ counts (lightweight)
  const { data: listings } = await supabase
    .from("listings")
    .select("category_id")

  // 3️⃣ build counts map
  const countMap: Record<string, number> = {}

  listings?.forEach((l) => {
    if (!l.category_id) return
    countMap[l.category_id] = (countMap[l.category_id] || 0) + 1
  })

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold">
        Passive Income Ideas
      </h1>

      <TopPicks />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories?.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}   // ✅ DB slug only
            className="rounded-xl border p-6 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">
              {cat.name}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {countMap[cat.id] || 0} programs
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}