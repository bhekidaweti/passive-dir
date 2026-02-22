import Link from "next/link"
import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export default async function CategoriesPage() {
  const { data: categories } = await supabase
    .from("categories")
    .select("id,name,slug")
    .order("name")

  if (!categories) return null

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Browse Categories
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat: any) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="rounded-xl border p-6 hover:bg-gray-50 transition"
          >
            <h2 className="font-semibold text-lg">
              {cat.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  )
}