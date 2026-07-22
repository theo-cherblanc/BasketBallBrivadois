export function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function formatTime(time: string): string {
  // Strapi time can be "HH:mm:ss.SSS" or "HH:mm:ss"
  const match = time.match(/^(\d{2}):(\d{2})/);
  if (!match) return time;
  return `${match[1]}h${match[2]}`;
}

/** Minimal richtext display: preserve paragraphs from plain/markdown-ish text */
export function richtextToParagraphs(content: string): string[] {
  return content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}
