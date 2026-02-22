export default function Page() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Create Listing</h1>

      <form
        action="/api/admin/listings/create"
        method="post"
        className="space-y-4"
      >

        {/* Name */}
        <input
          name="listing_name"
          placeholder="Listing name"
          required
          className="border p-2 w-full"
        />

        {/* Website */}
        <input
          name="website"
          placeholder="Official website URL"
          required
          className="border p-2 w-full"
        />

        {/* Affiliate */}
        <input
          name="affiliate_url"
          placeholder="Affiliate URL (optional)"
          className="border p-2 w-full"
        />

        {/* Category */}
        <input
          name="primary_category"
          placeholder="Category (Surveys, SaaS, Freelance...)"
          className="border p-2 w-full"
        />

        {/* Region */}
        <input
          name="region"
          placeholder="Region (Global, US, Africa...)"
          className="border p-2 w-full"
        />

        {/* Risk */}
        <input
          type="number"
          name="risk_ban_probability"
          placeholder="Risk score (0-100)"
          className="border p-2 w-full"
        />

        {/* Status */}
        <select
          name="status"
          className="border p-2 w-full"
        >
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="paused">Paused</option>
        </select>

        {/* Short */}
        <textarea
          name="short_description"
          placeholder="Short description"
          className="border p-2 w-full"
          rows={3}
        />

        {/* Long */}
        <textarea
          name="long_description"
          placeholder="Long description"
          className="border p-2 w-full"
          rows={6}
        />

        {/* Earnings */}
        <textarea
          name="how_you_earn_passive_income"
          placeholder="How you earn passive income"
          className="border p-2 w-full"
          rows={4}
        />

        <button className="bg-black text-white px-4 py-2">
          Create Listing
        </button>

      </form>
    </div>
  )
}
