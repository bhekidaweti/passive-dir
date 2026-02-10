import { supabase } from "./supabase";

export async function getRiskBadge(score: number) {
    const { data } = await supabase
    .from("risk_levels")
    .select("*")
   
    return data?.find((r) => score >= r.min_score && score <= r.max_score) || null  
    
}
