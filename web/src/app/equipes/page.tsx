import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState, PageHero } from "@/components/ui";
import { getEquipes } from "@/lib/strapi";
import type { Equipe } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Équipes",
};

function groupByCategorie(equipes: Equipe[]) {
  const groups = new Map<
    string,
    { label: string; ordre: number; equipes: Equipe[] }
  >();

  for (const equipe of equipes) {
    const key = equipe.categorie?.documentId || "__sans-categorie";
    const label = equipe.categorie?.nom || "Autres";
    const ordre = equipe.categorie?.ordre ?? 999;

    if (!groups.has(key)) {
      groups.set(key, { label, ordre, equipes: [] });
    }
    groups.get(key)!.equipes.push(equipe);
  }

  return [...groups.values()]
    .sort((a, b) => a.ordre - b.ordre || a.label.localeCompare(b.label, "fr"))
    .map((group) => ({
      ...group,
      equipes: [...group.equipes].sort(
        (a, b) =>
          (a.ordre ?? 0) - (b.ordre ?? 0) || a.nom.localeCompare(b.nom, "fr")
      ),
    }));
}

export default async function EquipesPage() {
  const equipes = await getEquipes();
  const groups = groupByCategorie(equipes);

  return (
    <>
      <PageHero
        title="Équipes"
        subtitle={
          equipes.length > 0
            ? `${equipes.length} équipe${equipes.length > 1 ? "s" : ""} du Basket Ball Brivadois`
            : "Toutes les catégories du Basket Ball Brivadois"
        }
      />
      <div className="mx-auto max-w-6xl space-y-14 px-5 py-16 md:px-8 md:py-24">
        {equipes.length === 0 ? (
          <EmptyState message="Ajoutez des équipes dans Strapi pour les afficher ici." />
        ) : (
          groups.map((group) => (
            <section key={group.label}>
              <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-line pb-3">
                <h2 className="font-display text-3xl uppercase tracking-wide text-ink md:text-4xl">
                  {group.label}
                </h2>
                <span className="text-xs uppercase tracking-widest text-muted">
                  {group.equipes.length} équipe
                  {group.equipes.length > 1 ? "s" : ""}
                </span>
              </div>
              <ul className="equipes-grid grid sm:grid-cols-2 lg:grid-cols-3">
                {group.equipes.map((equipe) => (
                  <li key={equipe.documentId}>
                    <Link
                      href={`/equipes/${equipe.slug}`}
                      className="group block h-full p-6 transition-colors hover:bg-black/[0.02] md:p-8"
                    >
                      <h3 className="font-display text-3xl uppercase tracking-wide text-ink group-hover:text-red">
                        {equipe.nom}
                      </h3>
                      {equipe.description && (
                        <p className="mt-3 line-clamp-3 text-sm text-muted">
                          {equipe.description}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </>
  );
}
