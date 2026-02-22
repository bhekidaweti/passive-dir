type Props = {
  score: number | null
  levels: {
    label: string
    min_score: number
    max_score: number
    color: string
  }[]
}

export default function RiskBadge({ score, levels }: Props) {
  if (score === null) {
    return (
      <span className="rounded bg-gray-200 px-2 py-1 text-xs">
        Not rated
      </span>
    )
  }

  const level = levels.find(
    (l) => score >= l.min_score && score <= l.max_score
  )

  if (!level) return null

  return (
    <span
      className="rounded px-2 py-1 text-xs font-medium text-white"
      style={{ backgroundColor: level.color }}
    >
      {level.label}
    </span>
  )
}
