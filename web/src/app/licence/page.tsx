import type { Metadata } from "next";
import { EmptyState, PageHero, RichText } from "@/components/ui";
import { getLicence } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Licences",
};

export default async function LicencePage() {
  const licence = await getLicence();

  return (
    <>
      <PageHero
        title={licence?.titre || "Licences"}
        subtitle={
          licence?.accroche || "Informations sur le paiement des licences"
        }
      />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {!licence?.contenu ? (
          <EmptyState message="Renseignez les informations de licence dans Strapi (Licence)." />
        ) : (
          <RichText content={licence.contenu} />
        )}
      </div>
    </>
  );
}
