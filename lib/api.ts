const fallbackApiUrl = "http://localhost:4100/api";

function normalizeApiUrl(url: string) {
  const normalizedUrl = url.trim().replace(/\/+$/, "");
  return normalizedUrl.endsWith("/api") ? normalizedUrl : `${normalizedUrl}/api`;
}

export const apiUrl = normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL || fallbackApiUrl);
