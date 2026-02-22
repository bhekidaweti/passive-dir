import { supabase } from "@/lib/supabase"
import TopPicks from "@/components/TopPicks"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function Home() {
  
  const { data: categories } = await supabase
    .from("categories")
    .select(`
      id,
      name,
      slug
    `)
    .order("name")

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold">
        Passive Income Ideas
      </h1>

      <TopPicks />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories?.map((cat: any) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}   // ✅ DB slug ONLY
            className="rounded-xl border p-6 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">
              {cat.name}
            </h2>
          </Link>
        ))}
      </div>
    </main>
  )
}