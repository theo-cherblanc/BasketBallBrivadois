import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState, PageHero } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { getActualites } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Actualités",
};

export default async function ActualitesPage() {
  const actualites = await getActualites();

  return (
    <>
      <PageHero title="Actualités" subtitle="La vie du club, matchs et événements" />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {actualites.length === 0 ? (
          <EmptyState message="Publiez une actualité dans Strapi pour la voir apparaître ici." />
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {actualites.map((actu) => (
              <li key={actu.documentId}>
                <Link
                  href={`/actualites/${actu.slug}`}
                  className="group grid gap-3 py-8 md:grid-cols-[140px_1fr] md:gap-8"
                >
                  <time className="text-sm text-muted">
                    {formatDate(actu.datePublication)}
                  </time>
                  <div>
                    <h2 className="font-display text-3xl uppercase tracking-wide text-ink group-hover:text-red md:text-4xl">
                      {actu.titre}
                    </h2>
                    {actu.resume && (
                      <p className="mt-2 max-w-2xl text-muted">{actu.resume}</p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
