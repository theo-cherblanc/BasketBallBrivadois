function getStrapiUrl(): string {
  const raw = process.env.NEXT_PUBLIC_STRAPI_URL?.trim();
  if (!raw) return "http://localhost:1337";

  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return withProtocol.replace(/\/$/, "");
}

const STRAPI_URL = getStrapiUrl();

type StrapiListResponse<T> = {
  data: T[];
  meta?: unknown;
};

type StrapiSingleResponse<T> = {
  data: T | null;
  meta?: unknown;
};

function mediaUrl(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${STRAPI_URL}${url}`;
}

function buildStrapiApiUrl(path: string): string | null {
  try {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return new URL(`/api${normalizedPath}`, `${STRAPI_URL}/`).toString();
  } catch (error) {
    console.error("Invalid Strapi URL configuration:", STRAPI_URL, error);
    return null;
  }
}

async function strapiFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  const url = buildStrapiApiUrl(path);
  if (!url) return null;

  try {
    const res = await fetch(url, {
      ...init,
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
    });

    if (!res.ok) {
      console.error(`Strapi error ${res.status} for ${path}`);
      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(`Strapi fetch failed for ${path}`, error);
    return null;
  }
}

function normalizeMedia<T extends { logo?: unknown; heroImage?: unknown; image?: unknown; photo?: unknown }>(
  item: T | null
): T | null {
  if (!item) return null;
  const result = { ...item } as T & {
    logo?: { url: string } | null;
    heroImage?: { url: string } | null;
    image?: { url: string } | null;
    photo?: { url: string } | null;
  };

  for (const key of ["logo", "heroImage", "image", "photo"] as const) {
    const media = result[key];
    if (media && typeof media === "object" && "url" in media) {
      result[key] = { ...media, url: mediaUrl(media.url)! };
    }
  }

  return result as T;
}

export async function getGlobal() {
  const res = await strapiFetch<StrapiSingleResponse<import("./types").Global>>(
    "/global?populate=*"
  );
  return normalizeMedia(res?.data ?? null);
}

export async function getClub() {
  const res = await strapiFetch<StrapiSingleResponse<import("./types").Club>>(
    "/club?populate=*"
  );
  return normalizeMedia(res?.data ?? null);
}

export async function getEquipes() {
  const res = await strapiFetch<StrapiListResponse<import("./types").Equipe>>(
    "/equipes?populate=*&sort=ordre:asc"
  );
  return (res?.data ?? []).map((e) => normalizeMedia(e)!);
}

export async function getEquipeBySlug(slug: string) {
  const res = await strapiFetch<StrapiListResponse<import("./types").Equipe>>(
    `/equipes?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  return normalizeMedia(res?.data?.[0] ?? null);
}

export async function getActualites() {
  const res = await strapiFetch<StrapiListResponse<import("./types").Actualite>>(
    "/actualites?populate=*&sort=datePublication:desc"
  );
  return (res?.data ?? []).map((a) => normalizeMedia(a)!);
}

export async function getActualiteBySlug(slug: string) {
  const res = await strapiFetch<StrapiListResponse<import("./types").Actualite>>(
    `/actualites?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  return normalizeMedia(res?.data?.[0] ?? null);
}

export async function getMembresBureau() {
  const res = await strapiFetch<StrapiListResponse<import("./types").MembreBureau>>(
    "/membres-bureau?populate=*&sort=ordre:asc"
  );
  return (res?.data ?? []).map((m) => normalizeMedia(m)!);
}

export async function getPlannings() {
  const res = await strapiFetch<
    StrapiListResponse<import("./types").PlanningEntrainement>
  >("/plannings-entrainement?populate=equipe&sort=jour:asc");
  return res?.data ?? [];
}

export async function getContact() {
  const res = await strapiFetch<StrapiSingleResponse<import("./types").Contact>>(
    "/contact"
  );
  return res?.data ?? null;
}

export { STRAPI_URL, mediaUrl };
