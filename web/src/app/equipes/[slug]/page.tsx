import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScoreNcoWidget } from "@/components/ScoreNcoWidget";
import { PageHero, RichText } from "@/components/ui";
import { getEquipeBySlug, getEquipes } from "@/lib/strapi";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const equipes = await getEquipes();
  return equipes.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const equipe = await getEquipeBySlug(slug);
  return { title: equipe?.nom || "Équipe" };
}

export default async function EquipeDetailPage({ params }: Props) {
  const { slug } = await params;
  const equipe = await getEquipeBySlug(slug);
  if (!equipe) notFound();

  return (
    <>
      <PageHero title={equipe.nom} subtitle={equipe.categorie?.nom || undefined} />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Link
          href="/equipes"
          className="text-sm uppercase tracking-wider text-red hover:text-red-hot"
        >
          ← Toutes les équipes
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            {equipe.description && <RichText content={equipe.description} />}
            {equipe.photo?.url && (
              <div className="mt-8 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={equipe.photo.url}
                  alt={equipe.photo.alternativeText || equipe.nom}
                  className="w-full object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <h2 className="mb-4 font-display text-3xl uppercase tracking-wide text-ink">
              Calendrier & résultats
            </h2>
            <ScoreNcoWidget
              url={equipe.scorencoWidgetUrl}
              title={`Score'n'co — ${equipe.nom}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
