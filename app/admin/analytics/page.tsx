import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export default async function AnalyticsPage() {
  const { data } = await supabase
    .from("outbound_links")
    .select("*")
    .order("clicks", { ascending: false })

  const totalClicks =
    data?.reduce((sum, item) => sum + (item.clicks || 0), 0) || 0

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">

      <h1 className="text-3xl font-bold mb-8">
        📊 Click Analytics Dashboard
      </h1>

      {/* stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="rounded-xl border p-6">
          <p className="text-sm text-gray-500">Total Links</p>
          <p className="text-2xl font-bold">{data?.length || 0}</p>
        </div>

        <div className="rounded-xl border p-6">
          <p className="text-sm text-gray-500">Total Clicks</p>
          <p className="text-2xl font-bold">{totalClicks}</p>
        </div>

        <div className="rounded-xl border p-6">
          <p className="text-sm text-gray-500">Top Performer</p>
          <p className="text-2xl font-bold">
            {data?.[0]?.slug || "-"}
          </p>
        </div>

      </div>

      {/* table */}
      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Slug</th>
              <th className="p-3">Destination</th>
              <th className="p-3">Affiliate</th>
              <th className="p-3">Clicks</th>
              <th className="p-3">Active</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((link) => (
              <tr key={link.id} className="border-t">
                <td className="p-3 font-medium">{link.slug}</td>
                <td className="p-3 truncate max-w-xs">
                  {link.destination_url}
                </td>
                <td className="p-3 truncate max-w-xs">
                  {link.affiliate_url || "-"}
                </td>
                <td className="p-3 font-bold">
                  {link.clicks}
                </td>
                <td className="p-3">
                  {link.is_active ? "✅" : "❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
