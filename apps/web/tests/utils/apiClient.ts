import type { APIRequestContext } from "@playwright/test";

export type CreatePayload = {
  destination: string;
  slug?: string;
  expiresAt?: string;
  maxClicks?: number;
};

export async function createLink(
  request: APIRequestContext,
  payload: CreatePayload,
  base = process.env.API_BASE_URL || "http://localhost:8787",
) {
  const res = await request.post(`${base}/api/links`, { data: payload });
  if (!res.ok()) throw new Error(`Failed to create link: ${res.status()}`);
  return res.json();
}

