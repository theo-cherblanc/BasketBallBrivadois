import type { Metadata } from "next";
import { EmptyState, PageHero } from "@/components/ui";
import { getMembresBureau } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Bureau",
};

export default async function BureauPage() {
  const membres = await getMembresBureau();

  return (
    <>
      <PageHero
        title="Bureau"
        subtitle="L'équipe qui fait vivre l'association"
      />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {membres.length === 0 ? (
          <EmptyState message="Ajoutez les membres du bureau dans Strapi." />
        ) : (
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {membres.map((membre) => (
              <li key={membre.documentId}>
                {membre.photo?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={membre.photo.url}
                    alt={membre.photo.alternativeText || membre.nom}
                    className="aspect-[4/5] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/5] w-full items-end bg-black p-4">
                    <span className="font-display text-4xl text-white/20">BBB</span>
                  </div>
                )}
                <p className="mt-4 text-xs uppercase tracking-widest text-red">
                  {membre.role}
                </p>
                <h2 className="mt-1 font-display text-3xl uppercase tracking-wide text-ink">
                  {membre.nom}
                </h2>
                {membre.bio && (
                  <p className="mt-2 text-sm text-muted">{membre.bio}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
