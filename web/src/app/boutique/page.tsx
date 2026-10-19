import type { Metadata } from "next";
import { EmptyState, PageHero } from "@/components/ui";
import { safeExternalUrl } from "@/lib/sponsors";
import { getBoutique } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Boutique",
  description: "La boutique du Basket Ball Brivadois.",
};

function BoutiqueImage({
  src,
  alt,
  href,
}: {
  src: string;
  alt: string;
  href: string | null;
}) {
  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="h-auto w-full" />
  );

  if (!href) return image;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block w-full">
      {image}
    </a>
  );
}

export default async function BoutiquePage() {
  const boutique = await getBoutique();
  const href = safeExternalUrl(boutique?.lien);
  const image = boutique?.image;

  return (
    <>
      <PageHero
        title="Boutique"
        subtitle="Les produits du Basket Ball Brivadois"
      />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {!image?.url && !href ? (
          <EmptyState message="Ajoutez l'image et le lien de la boutique dans Strapi, puis publiez." />
        ) : (
          <div className="flex flex-col items-start gap-10">
            {image?.url && (
              <BoutiqueImage
                src={image.url}
                alt={image.alternativeText || "Produits de la boutique"}
                href={href}
              />
            )}
            {href && (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-red px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-red-hot"
              >
                Voir la boutique
              </a>
            )}
          </div>
        )}
      </div>
    </>
  );
}
