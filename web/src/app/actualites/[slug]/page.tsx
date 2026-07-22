import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, RichText } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { getActualiteBySlug, getActualites } from "@/lib/strapi";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const actualites = await getActualites();
  return actualites.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const actu = await getActualiteBySlug(slug);
  return { title: actu?.titre || "Actualité" };
}

export default async function ActualiteDetailPage({ params }: Props) {
  const { slug } = await params;
  const actu = await getActualiteBySlug(slug);
  if (!actu) notFound();

  return (
    <>
      <PageHero title={actu.titre} subtitle={formatDate(actu.datePublication)} />
      <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <Link
          href="/actualites"
          className="text-sm uppercase tracking-wider text-red hover:text-red-hot"
        >
          ← Toutes les actualités
        </Link>
        {actu.image?.url && (
          <div className="mt-8 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={actu.image.url}
              alt={actu.image.alternativeText || actu.titre}
              className="w-full object-cover"
            />
          </div>
        )}
        <div className="mt-10">
          <RichText content={actu.contenu} />
        </div>
      </article>
    </>
  );
}
