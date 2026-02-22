import { supabase } from "@/lib/supabase"
import { slugify } from "@/lib/slugify"
import { notFound } from "next/navigation"
import RiskBadge from "@/components/RiskBadge"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const [a, b] = params.slug.split("-vs-")

  return {
    title: `${a} vs ${b} – Which is better?`,
    description: `Compare ${a} and ${b} side-by-side to choose the best platform for your needs.`,
  }
}

export default async function ComparePage({ params }: Props) {
  const [slugA, slugB] = params.slug.split("-vs-")

  const { data: listings } = await supabase
    .from("listings")
    .select(`
            id,
            listing_name,
            short_description,
            long_description,
            monetization,
            region,
            risk_ban_probability,
            pricing_model
          `)

  const a = listings?.find(l => slugify(l.listing_name) === slugA)
  const b = listings?.find(l => slugify(l.listing_name) === slugB)

  if (!a || !b) return notFound()

  const { data: riskLevels } = await supabase
    .from("risk_levels")
    .select("*")

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">

      <h1 className="text-3xl font-bold mb-8">
        {a.listing_name} vs {b.listing_name}
      </h1>

      {/* side-by-side cards */}
      <div className="grid md:grid-cols-2 gap-8">

        {[a, b].map((item) => (
          <div
            key={item.id}
            className="rounded-xl border p-6 bg-white shadow-sm"
          >
            <h2 className="text-xl font-semibold">
              {item.listing_name}
            </h2>

            <RiskBadge
              score={item.risk_ban_probability}
              levels={riskLevels || []}
            />

            <p className="mt-4 text-sm text-gray-700">
              {item.short_description}
            </p>

            <ul className="mt-4 text-sm space-y-1">
              <li><b>Pricing:</b> {item.pricing_model}</li>
              <li><b>Monetization:</b> {item.monetization}</li>
              <li><b>Region:</b> {item.region || "Global"}</li>
            </ul>

            <a
              href={`/out/${slugify(item.listing_name)}`}
              target="_blank"
              rel="nofollow sponsored"
              className="mt-6 inline-block w-full text-center rounded-lg bg-black px-4 py-3 text-white"
            >
              Try {item.listing_name} →
            </a>
          </div>
        ))}
      </div>

      {/* long descriptions */}
      <div className="mt-12 space-y-10">
        <section>
          <h3 className="font-semibold text-lg mb-2">
            About {a.listing_name}
          </h3>
          <p className="text-gray-700 whitespace-pre-line">
            {a.long_description}
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-lg mb-2">
            About {b.listing_name}
          </h3>
          <p className="text-gray-700 whitespace-pre-line">
            {b.long_description}
          </p>
        </section>
      </div>

    </main>
  )
}
