export function getRiskLevel(score: number | null) {
  if (score === null) {
    return {
      label: "Not rated",
      color: "gray",
      description: "Risk level not yet assessed"
    }
  }

  if (score <= 30) {
    return { label: "Low", color: "green" }
  }

  if (score <= 70) {
    return { label: "Medium", color: "yellow" }
  }

  return { label: "High", color: "red" }
}
