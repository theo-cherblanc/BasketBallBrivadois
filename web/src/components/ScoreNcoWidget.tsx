type ScoreNcoWidgetProps = {
  url?: string | null;
  title?: string;
  minHeight?: number;
};

/**
 * Embeds a Score'n'co widget via iframe.
 * Paste the widget URL from scorenco.com/admin (Widgets → code d'intégration).
 * Typical URL shape: https://www.scorenco.com/widget/<ID>/
 */
export function ScoreNcoWidget({
  url,
  title = "Calendrier et résultats Score'n'co",
  minHeight = 520,
}: ScoreNcoWidgetProps) {
  if (!url) {
    return (
      <div
        className="flex items-center justify-center border border-dashed border-line bg-white/40 px-6 py-16 text-center"
        style={{ minHeight }}
      >
        <div className="max-w-md">
          <p className="font-display text-2xl uppercase tracking-wide text-ink">
            Widget Score&apos;n&apos;co
          </p>
          <p className="mt-3 text-sm text-muted">
            Ajoutez l&apos;URL du widget dans Strapi (Global ou Équipe) pour afficher
            automatiquement le calendrier, les résultats et les classements.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-line bg-white">
      <iframe
        src={url}
        title={title}
        className="w-full border-0"
        style={{ minHeight }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
