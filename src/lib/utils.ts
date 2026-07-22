/**
 * Tiny class-name joiner. Deliberately not clsx — this is the only
 * thing we'd have used it for, and it keeps the bundle honest.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function absoluteUrl(path: string, base: string): string {
  return new URL(path, base).toString();
}
