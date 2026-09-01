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

/** Insère une ligne vide avant listes/titres si l'éditeur Strapi n'en met qu'une seule. */
export function normalizeMarkdownBlocks(content: string): string {
  const normalized = content.replace(/\r\n/g, "\n");

  return normalized
    .replace(/([^\n])\n(?=[-*+] )/gm, "$1\n\n")
    .replace(/([^\n])\n(?=\d+\. )/gm, "$1\n\n")
    .replace(/([^\n])\n(#{1,6} )/gm, "$1\n\n");
}
