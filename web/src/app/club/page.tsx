import type { Metadata } from "next";
import { EmptyState, PageHero, RichText } from "@/components/ui";
import { getClub } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Le club",
};

export default async function ClubPage() {
  const club = await getClub();

  return (
    <>
      <PageHero
        title={club?.titre || "Le club"}
        subtitle={club?.accroche || "Présentation du Basket Ball Brivadois"}
      />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {!club ? (
          <EmptyState message="Le contenu du club sera bientôt disponible dans Strapi." />
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div>
              <RichText content={club.presentation} />
              {club.historique && (
                <div className="mt-12">
                  <h2 className="mb-4 font-display text-3xl uppercase tracking-wide text-ink">
                    Historique
                  </h2>
                  <RichText content={club.historique} />
                </div>
              )}
            </div>
            {club.image?.url && (
              <div className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={club.image.url}
                  alt={club.image.alternativeText || club.titre}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
