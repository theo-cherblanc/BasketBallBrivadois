import type { Metadata } from "next";
import { EmptyState, PageHero } from "@/components/ui";
import { SponsorSections } from "@/components/Sponsors";
import { getSponsors } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "Les sponsors et partenaires du Basket Ball Brivadois.",
};

export default async function SponsorsPage() {
  const sponsors = await getSponsors();

  return (
    <>
      <PageHero
        title="Sponsors"
        subtitle="Les partenaires qui soutiennent le Basket Ball Brivadois"
      />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {sponsors.length === 0 ? (
          <EmptyState message="Ajoutez les sponsors du club dans Strapi." />
        ) : (
          <SponsorSections sponsors={sponsors} />
        )}
      </div>
    </>
  );
}
