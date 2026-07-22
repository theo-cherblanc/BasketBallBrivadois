import { CtaLink } from "@/components/ui";
import { getActualites, getGlobal } from "@/lib/strapi";
import { formatDate } from "@/lib/format";
import Link from "next/link";

export default async function HomePage() {
  const [global, actualites] = await Promise.all([getGlobal(), getActualites()]);
  const clubName = global?.nomClub || "Basket Ball Brivadois";
  const accroche =
    global?.accrocheAccueil ||
    "Le basket amateur de Brioude — équipes, matchs et esprit de club.";
  const heroUrl = global?.heroImage?.url;
  const latest = actualites.slice(0, 3);

  return (
    <>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-black text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: heroUrl
              ? `url(${heroUrl})`
              : `linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 50%, #3a0508 100%),
                 radial-gradient(circle at 72% 38%, rgba(227,6,19,0.45), transparent 48%)`,
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 md:px-8 md:pb-24">
          <p className="animate-fade font-display text-5xl uppercase tracking-wide md:text-8xl lg:text-9xl">
            {clubName}
          </p>
          <p className="animate-rise animate-rise-delay-1 mt-5 max-w-xl text-base text-white/85 md:text-xl">
            {accroche}
          </p>
          <div className="animate-rise animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <CtaLink href="/equipes">Voir les équipes</CtaLink>
            <CtaLink href="/contact" variant="ghost">
              Nous rejoindre
            </CtaLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
            Actualités
          </h2>
          <Link
            href="/actualites"
            className="text-sm uppercase tracking-wider text-red hover:text-red-hot"
          >
            Tout voir
          </Link>
        </div>
        {latest.length === 0 ? (
          <p className="text-muted">Les prochaines actualités apparaîtront ici.</p>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {latest.map((actu) => (
              <li key={actu.documentId}>
                <Link
                  href={`/actualites/${actu.slug}`}
                  className="group flex flex-col gap-1 py-6 transition-colors hover:bg-white/40 md:flex-row md:items-baseline md:justify-between md:gap-8"
                >
                  <span className="font-display text-2xl uppercase tracking-wide text-ink group-hover:text-red md:text-3xl">
                    {actu.titre}
                  </span>
                  <time className="shrink-0 text-sm text-muted">
                    {formatDate(actu.datePublication)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
