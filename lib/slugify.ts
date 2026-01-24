export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/^\d+\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}
