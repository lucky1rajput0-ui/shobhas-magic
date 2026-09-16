/** Prefix public paths with Vite `base` (needed for GitHub Pages). */
export function asset(path: string): string {
  if (!path || /^https?:\/\//i.test(path) || path.startsWith("data:")) return path;
  const base = import.meta.env.BASE_URL || "/";
  const trimmed = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${trimmed}`;
}
