import { createServerFn } from "@tanstack/react-start";

export type InstagramPost = { url: string };

function isActive(value: string): boolean {
  return /^(sim|true|1)$/i.test(value.trim());
}

function parseCsv(csv: string): InstagramPost[] {
  const lines = csv.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const [, ...rows] = lines; // skip header (url,ativo)

  return rows
    .map((line) => {
      const [rawUrl, rawActive = ""] = line.split(",");
      return { url: (rawUrl ?? "").trim().replace(/^"|"$/g, ""), active: isActive(rawActive) };
    })
    .filter((row) => row.url && row.active)
    .map((row) => ({ url: row.url }));
}

let cachedPosts: { data: InstagramPost[]; expiresAt: number } | null = null;
const CACHE_TTL_MS = 5 * 60_000; // publishing a sheet change can take a moment to propagate; 5min keeps requests low without feeling stale

export async function listInstagramPostsHandler(): Promise<InstagramPost[]> {
  if (cachedPosts && cachedPosts.expiresAt > Date.now()) {
    return cachedPosts.data;
  }

  const csvUrl = process.env["INSTAGRAM_SHEET_CSV_URL"];
  if (!csvUrl) {
    console.error("INSTAGRAM_SHEET_CSV_URL não configurada — galeria do Instagram desabilitada.");
    return cachedPosts?.data ?? [];
  }

  try {
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error(`CSV request failed with status ${response.status}`);
    }
    const csv = await response.text();
    const data = parseCsv(csv);
    cachedPosts = { data, expiresAt: Date.now() + CACHE_TTL_MS };
    return data;
  } catch (error) {
    console.error("Falha ao buscar posts do Instagram da planilha:", error);
    return cachedPosts?.data ?? [];
  }
}

export const listInstagramPosts = createServerFn({ method: "GET" }).handler(
  listInstagramPostsHandler,
);
