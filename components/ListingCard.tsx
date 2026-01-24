export default function ListingCard({
  name,
  description,
  category,
  risk,
  website,
}: {
  name: string
  description: string
  category: string
  risk: number | null
  website: string
}) {
  return (
    <div className="rounded-lg border p-5 shadow-sm hover:shadow transition">
      <h3 className="font-semibold text-lg">{name}</h3>

      <p className="mt-2 text-sm text-gray-600">
        {description}
      </p>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="rounded bg-gray-100 px-2 py-1">
          {category}
        </span>
        <span className="rounded bg-gray-100 px-2 py-1">
          Risk: {risk ?? "Not rated"}
        </span>
      </div>

      <a
        href={website}
        rel="nofollow sponsored"
        target="_blank"
        className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        Visit site →
      </a>
    </div>
  )
}
