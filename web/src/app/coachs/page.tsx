import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState, PageHero } from "@/components/ui";
import { getCoachs } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Coachs",
};

export default async function CoachsPage() {
  const coachs = await getCoachs();

  return (
    <>
      <PageHero
        title="Coachs"
        subtitle="Les entraîneurs du Basket Ball Brivadois"
      />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {coachs.length === 0 ? (
          <EmptyState message="Ajoutez les coachs dans Strapi." />
        ) : (
          <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {coachs.map((coach) => {
              const equipes = [...(coach.equipes ?? [])].sort(
                (a, b) =>
                  (a.ordre ?? 0) - (b.ordre ?? 0) ||
                  a.nom.localeCompare(b.nom, "fr")
              );

              return (
                <li key={coach.documentId}>
                  {coach.photo?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={coach.photo.url}
                      alt={coach.photo.alternativeText || coach.nom}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  ) : (
                    <div className="flex aspect-[4/5] w-full items-end bg-black p-4">
                      <span className="font-display text-4xl text-white/20">
                        BBB
                      </span>
                    </div>
                  )}
                  {equipes.length > 0 && (
                    <p className="mt-4 text-xs uppercase tracking-widest text-red">
                      {equipes.map((equipe, index) => (
                        <span key={equipe.documentId}>
                          {index > 0 && " · "}
                          <Link
                            href={`/equipes/${equipe.slug}`}
                            className="hover:text-red-hot"
                          >
                            {equipe.nom}
                          </Link>
                        </span>
                      ))}
                    </p>
                  )}
                  <h2
                    className={`${
                      equipes.length > 0 ? "mt-1" : "mt-4"
                    } font-display text-3xl uppercase tracking-wide text-ink`}
                  >
                    {coach.nom}
                  </h2>
                  {coach.bio && (
                    <p className="mt-2 text-sm text-muted">{coach.bio}</p>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
