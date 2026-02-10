import { supabase } from "./supabase"

export type RiskLevel = {
  label: string
  min_score: number
  max_score: number
  color: string
}

export async function getRiskLevels(): Promise<RiskLevel[]> {
  const { data } = await supabase
    .from("risk_levels")
    .select("*")

  return data || []
}

export function findRiskBadge(
  score: number | null,
  levels: RiskLevel[]
) {
  if (score == null) return null

  return levels.find(
    (r) => score >= r.min_score && score <= r.max_score
  )
}
