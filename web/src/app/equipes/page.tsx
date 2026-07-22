import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState, PageHero } from "@/components/ui";
import { getEquipes } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Équipes",
};

export default async function EquipesPage() {
  const equipes = await getEquipes();

  return (
    <>
      <PageHero
        title="Équipes"
        subtitle="Toutes les catégories du Basket Ball Brivadois"
      />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {equipes.length === 0 ? (
          <EmptyState message="Ajoutez des équipes dans Strapi pour les afficher ici." />
        ) : (
          <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {equipes.map((equipe) => (
              <li key={equipe.documentId} className="bg-white">
                <Link
                  href={`/equipes/${equipe.slug}`}
                  className="group block h-full bg-white/40 p-6 transition-colors hover:bg-white md:p-8"
                >
                  <p className="text-xs uppercase tracking-widest text-red">
                    {equipe.categorie?.nom || "Équipe"}
                  </p>
                  <h2 className="mt-3 font-display text-3xl uppercase tracking-wide text-ink group-hover:text-red">
                    {equipe.nom}
                  </h2>
                  {equipe.description && (
                    <p className="mt-3 line-clamp-3 text-sm text-muted">
                      {equipe.description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
