"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Navbar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-bold">
          PassiveIncome
        </a>

        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-md"
        >
          <input
            type="search"
            placeholder="Search websites, apps, tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-l-md border px-4 py-2 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-r-md bg-black px-4 py-2 text-sm text-white"
          >
            Search
          </button>
        </form>

        <nav className="hidden gap-6 md:flex">
          <a href="/categories" className="text-sm hover:underline">
            Categories
          </a>
          <a href="/listings" className="text-sm hover:underline">
            All Listings
          </a>
        </nav>
      </div>
    </header>
  )
}
