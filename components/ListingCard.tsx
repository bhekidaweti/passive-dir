import { slugify } from "@/lib/slugify"

export default function ListingCard({
  id,
  name,
  description,
  category,
  risk,
  website,
}: {
  id: string
  name: string
  description: string
  category: string
  risk: number | null
  website: string
}) {
  const slug = slugify(name)

  return (
    <div className="rounded-lg border p-5 shadow-sm hover:shadow transition">
      <h3 className="text-lg font-semibold">{name}</h3>

      <p className="mt-2 text-sm text-gray-600 line-clamp-3">
        {description}
      </p>

      <div className="mt-3 flex gap-2 text-xs">
        <span className="rounded bg-gray-100 px-2 py-1">
          {category}
        </span>
        <span className="rounded bg-gray-100 px-2 py-1">
          Risk: {risk ?? "Unrated"}
        </span>
      </div>

      <div className="mt-4 flex justify-between text-sm">
        <a
          href={`/listings/${slug}`}
          className="font-medium text-blue-600 hover:underline"
        >
          Learn more →
        </a>

        <a
          href={website}
          target="_blank"
          rel="nofollow sponsored"
          className="text-gray-700 hover:underline"
        >
          Visit site
        </a>
      </div>
    </div>
  )
}
