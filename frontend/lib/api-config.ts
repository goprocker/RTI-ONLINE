/**
 * Central Environment & Deployment API Configuration
 */

export const APP_CONFIG = {
  MAIN_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "https://rti.reeganlabs.com",
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://rti-api.reeganlabs.com",
  ADMIN_PORTAL_URL: process.env.NEXT_PUBLIC_ADMIN_URL || "https://admin-rti.reeganlabs.com",
} as const;

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  const url = `${APP_CONFIG.API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    if (!res.ok) {
      console.warn(`API request to ${url} returned status ${res.status}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`API request to ${url} failed; using client fallback`, err);
    return null;
  }
}
