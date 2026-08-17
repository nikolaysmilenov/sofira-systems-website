const DEFAULT_SITE_URL = "https://sofirasystems.com";

function normalizeUrl(value: string): string {
  return value.trim().replace(/\/+$/, "");
}

function isUsableSiteUrl(value: string): boolean {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }

    const hostname = url.hostname.toLowerCase();
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return process.env.NODE_ENV !== "production";
    }

    return true;
  } catch {
    return false;
  }
}

export function getSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  const candidate = value ? normalizeUrl(value) : "";

  if (candidate && isUsableSiteUrl(candidate)) {
    return candidate;
  }

  return DEFAULT_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized === "/" ? "/" : normalized}`;
}
