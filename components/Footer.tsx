export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-6 md:grid-cols-3">
        <div>
          <h4 className="font-semibold">PassiveIncome</h4>
          <p className="mt-2 text-sm text-gray-600">
            Curated passive income websites, apps, and tools with
            risk transparency.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Explore</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href="/listings">All Listings</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/listings?risk=low">Low Risk</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Legal</h4>
          <p className="mt-2 text-xs text-gray-500">
            Some links may be affiliate links. We may earn a
            commission at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  )
}
