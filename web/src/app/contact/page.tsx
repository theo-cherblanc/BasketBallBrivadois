import type { Metadata } from "next";
import { EmptyState, PageHero } from "@/components/ui";
import { getContact } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <>
      <PageHero title="Contact" subtitle="Écrivez-nous ou passez au gymnase" />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {!contact ? (
          <EmptyState message="Renseignez les coordonnées dans Strapi (Contact)." />
        ) : (
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              {contact.gymnase && (
                <div>
                  <h2 className="text-xs uppercase tracking-widest text-muted">
                    Gymnase
                  </h2>
                  <p className="mt-2 font-display text-3xl uppercase tracking-wide text-ink">
                    {contact.gymnase}
                  </p>
                </div>
              )}
              <div>
                <h2 className="text-xs uppercase tracking-widest text-muted">
                  Adresse
                </h2>
                <p className="mt-2 whitespace-pre-line text-base leading-relaxed">
                  {contact.adresse}
                </p>
              </div>
              <div>
                <h2 className="text-xs uppercase tracking-widest text-muted">
                  Email
                </h2>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-2 inline-block text-lg text-red hover:text-red-hot"
                >
                  {contact.email}
                </a>
              </div>
              {contact.telephone && (
                <div>
                  <h2 className="text-xs uppercase tracking-widest text-muted">
                    Téléphone
                  </h2>
                  <a
                    href={`tel:${contact.telephone.replace(/\s/g, "")}`}
                    className="mt-2 inline-block text-lg"
                  >
                    {contact.telephone}
                  </a>
                </div>
              )}
              {contact.horairesSecretariat && (
                <div>
                  <h2 className="text-xs uppercase tracking-widest text-muted">
                    Horaires secrétariat
                  </h2>
                  <p className="mt-2 whitespace-pre-line text-base">
                    {contact.horairesSecretariat}
                  </p>
                </div>
              )}
              {contact.carteUrl && (
                <a
                  href={contact.carteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-sm uppercase tracking-wider text-red hover:text-red-hot"
                >
                  Voir sur la carte →
                </a>
              )}
            </div>

            <div className="border border-line bg-white/50 p-6 md:p-8">
              <h2 className="font-display text-3xl uppercase tracking-wide text-ink">
                Écrire au club
              </h2>
              <p className="mt-2 text-sm text-muted">
                Le formulaire ouvre votre messagerie avec l&apos;adresse du club.
              </p>
              <form
                className="mt-8 space-y-4"
                action={`mailto:${contact.email}`}
                method="get"
                encType="text/plain"
              >
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-muted">
                    Objet
                  </span>
                  <input
                    type="text"
                    name="subject"
                    required
                    className="mt-1 w-full border border-line bg-white px-3 py-2 outline-none focus:border-black"
                    placeholder="Inscription, info, partenariat…"
                  />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-widest text-muted">
                    Message
                  </span>
                  <textarea
                    name="body"
                    required
                    rows={6}
                    className="mt-1 w-full border border-line bg-white px-3 py-2 outline-none focus:border-black"
                    placeholder="Votre message"
                  />
                </label>
                <button
                  type="submit"
                  className="inline-flex bg-red px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-red-hot"
                >
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
