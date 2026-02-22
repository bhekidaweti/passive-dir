
export default function ListingCard({
  id,
  name,
  description,
  longDescription,
  category,
  risk,
  website,
  riskLabel,
  riskColor,
  slug,
}: {
  longDescription?: string
  id: string
  name: string
  description: string
  category: string
  risk: number | null
  website: string
  riskLabel?: string
  riskColor?: string
  slug: string
}) 

{
  return (
    <div className="rounded-lg border p-5 shadow-sm hover:shadow transition">
      <h3 className="font-semibold text-lg">{name}</h3>

      <p className="mt-2 text-sm text-gray-600 line-clamp-3">
        {description}
      </p>

      <div className="mt-3 flex gap-2 text-xs flex-wrap">

        <span className="rounded bg-gray-100 px-2 py-1">
          {category}
        </span>

        {riskLabel && (
          <span
            className="rounded px-2 py-1 text-white"
            style={{ backgroundColor: riskColor }}
          >
            {riskLabel} Risk
          </span>
        )}
      </div>
        <a
          href={`/listings/${slug}`}
          className="font-medium text-blue-600 hover:underline"
        >
          Learn more →
        </a>
    </div>
  )
}
