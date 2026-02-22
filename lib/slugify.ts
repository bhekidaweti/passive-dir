export function slugify(text: string): string {
  if (!text) return ""

  return text
    .toLowerCase()
    .normalize("NFKD") // safe unicode
    .replace(/&/g, " and ")
    .replace(/\./g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

