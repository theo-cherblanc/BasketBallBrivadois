import { SPONSOR_NIVEAUX, type Sponsor, type SponsorNiveau } from "./types";

const LEVEL_LABELS: Record<SponsorNiveau, string> = {
  Principal: "Partenaires principaux",
  Officiel: "Partenaires officiels",
  Partenaire: "Partenaires",
};

export function sponsorLevel(sponsor: Sponsor): SponsorNiveau {
  if (sponsor.niveau && SPONSOR_NIVEAUX.includes(sponsor.niveau as SponsorNiveau)) {
    return sponsor.niveau as SponsorNiveau;
  }
  return "Partenaire";
}

export function compareSponsors(a: Sponsor, b: Sponsor): number {
  const levelDelta =
    SPONSOR_NIVEAUX.indexOf(sponsorLevel(a)) - SPONSOR_NIVEAUX.indexOf(sponsorLevel(b));
  if (levelDelta !== 0) return levelDelta;
  const orderDelta = (a.ordre ?? 0) - (b.ordre ?? 0);
  if (orderDelta !== 0) return orderDelta;
  return a.nom.localeCompare(b.nom, "fr");
}

export function groupSponsors(sponsors: Sponsor[]) {
  const sorted = [...sponsors].sort(compareSponsors);
  return SPONSOR_NIVEAUX.map((niveau) => ({
    niveau,
    label: LEVEL_LABELS[niveau],
    sponsors: sorted.filter((sponsor) => sponsorLevel(sponsor) === niveau),
  })).filter((group) => group.sponsors.length > 0);
}

/** Only http(s) links are rendered, so a CMS value cannot become a script URL. */
export function safeExternalUrl(raw?: string | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}
