import { supabase } from "./supabase";

export async function calculateRisk(listingId: number) {
  // Fetch listing details
  const { data } = await supabase
    .from("listing_risks")
    .select(`risk_factors(weight)`)
    .eq("listing_id", listingId)


    const score = data?.reduce((sum: number, r: any) => sum + ( r.risk_factors?.weight || 0), 0) || 0

    const finalScore =  Math.min(100, Math.max(0, score))

    await supabase
      .from("listings")
      .update({ risk_ban_probability: finalScore })
      .eq("id", listingId)

      return finalScore
}