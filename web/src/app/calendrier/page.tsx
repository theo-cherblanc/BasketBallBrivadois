import type { Metadata } from "next";
import { ScoreNcoWidget } from "@/components/ScoreNcoWidget";
import { PageHero } from "@/components/ui";
import { getEquipes, getGlobal } from "@/lib/strapi";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Calendrier & résultats",
};

export default async function CalendrierPage() {
  const [global, equipes] = await Promise.all([getGlobal(), getEquipes()]);
  const equipesWithWidget = equipes.filter((e) => e.scorencoWidgetUrl);

  return (
    <>
      <PageHero
        title="Calendrier & résultats"
        subtitle="Données mises à jour automatiquement via Score'n'co"
      />
      <div className="mx-auto max-w-6xl space-y-16 px-5 py-16 md:px-8 md:py-24">
        <section>
          <h2 className="mb-4 font-display text-3xl uppercase tracking-wide text-ink">
            Club
          </h2>
          <ScoreNcoWidget
            url={global?.scorencoClubWidgetUrl}
            title="Score'n'co — matchs du club"
            minHeight={560}
          />
        </section>

        {equipesWithWidget.length > 0 && (
          <section>
            <h2 className="mb-6 font-display text-3xl uppercase tracking-wide text-ink">
              Par équipe
            </h2>
            <ul className="space-y-12">
              {equipesWithWidget.map((equipe) => (
                <li key={equipe.documentId}>
                  <div className="mb-3 flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl uppercase tracking-wide text-ink">
                      {equipe.nom}
                    </h3>
                    <Link
                      href={`/equipes/${equipe.slug}`}
                      className="text-sm text-red hover:text-red-hot"
                    >
                      Fiche équipe
                    </Link>
                  </div>
                  <ScoreNcoWidget
                    url={equipe.scorencoWidgetUrl}
                    title={`Score'n'co — ${equipe.nom}`}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
