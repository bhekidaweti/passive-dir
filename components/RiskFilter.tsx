export default function RiskFilter({
  current = "all",
}: {
  current?: string
}) {
  const link = (value: string) =>
    `?risk=${value}`

  return (
    <div className="mb-6 flex gap-4 text-sm">

      <a
        href={link("all")}
        className={current === "all" ? "font-bold underline" : ""}
      >
        All
      </a>

      <a
        href={link("low")}
        className="text-green-600"
      >
        Low
      </a>

      <a
        href={link("medium")}
        className="text-yellow-600"
      >
        Medium
      </a>

      <a
        href={link("high")}
        className="text-red-600"
      >
        High
      </a>
    </div>
  )
}
