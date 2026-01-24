import { supabase } from "@/lib/supabase"

export default async function Home() {
  const { data } = await supabase
    .from("listings")
    .select("primary_category")

  const categories = Array.from(
    new Set(data?.map(item => item.primary_category))
  )

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold">
        Passive Income Directory
      </h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const slug = cat
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")

          return (
            <a
              key={slug}
              href={`/category/${slug}`}
              className="rounded-xl border p-6 hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{cat}</h2>
              <p className="mt-2 text-sm text-gray-600">
                Best {cat.toLowerCase()} platforms.
              </p>
            </a>
          )
        })}
      </div>
    </main>
  )
}
