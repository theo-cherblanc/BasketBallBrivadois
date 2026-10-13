import Link from "next/link";
import type { Sponsor } from "@/lib/types";
import { compareSponsors, groupSponsors, safeExternalUrl } from "@/lib/sponsors";

function SponsorLogo({
  sponsor,
  className,
  showName,
}: {
  sponsor: Sponsor;
  className: string;
  showName: boolean;
}) {
  if (sponsor.logo?.url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={sponsor.logo.url}
        alt={sponsor.logo.alternativeText || sponsor.nom}
        className={className}
      />
    );
  }

  if (showName) {
    return (
      <span className="px-3 text-center font-display text-2xl uppercase tracking-wide text-ink">
        {sponsor.nom}
      </span>
    );
  }

  return <span className="font-display text-4xl text-black/15">BBB</span>;
}

function SponsorLink({
  sponsor,
  className,
  children,
}: {
  sponsor: Sponsor;
  className: string;
  children: React.ReactNode;
}) {
  const href = safeExternalUrl(sponsor.siteUrl);
  if (!href) {
    return <div className={className}>{children}</div>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

export function SponsorHomeBand({ sponsors }: { sponsors: Sponsor[] }) {
  if (sponsors.length === 0) return null;

  const preview = [...sponsors].sort(compareSponsors).slice(0, 8);

  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
            Sponsors
          </h2>
          <Link
            href="/sponsors"
            className="text-sm uppercase tracking-wider text-red hover:text-red-hot"
          >
            Tout voir
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {preview.map((sponsor) => (
            <li key={sponsor.documentId} className="border border-line bg-white">
              <SponsorLink
                sponsor={sponsor}
                className="flex h-28 items-center justify-center p-5 transition-colors hover:bg-black/[0.03]"
              >
                <SponsorLogo
                  sponsor={sponsor}
                  showName
                  className="max-h-16 w-auto max-w-full object-contain"
                />
              </SponsorLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function SponsorSections({ sponsors }: { sponsors: Sponsor[] }) {
  const groups = groupSponsors(sponsors);

  return (
    <div className="flex flex-col gap-16">
      {groups.map((group) => (
        <section key={group.niveau}>
          <h2 className="mb-6 font-display text-3xl uppercase tracking-wide text-ink md:text-4xl">
            {group.label}
          </h2>
          <ul
            className={
              group.niveau === "Principal"
                ? "grid gap-6 sm:grid-cols-2"
                : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {group.sponsors.map((sponsor) => (
              <li
                key={sponsor.documentId}
                className={group.niveau === "Principal" ? "" : "border border-line bg-white"}
              >
                <SponsorLink
                  sponsor={sponsor}
                  className={
                    group.niveau === "Principal"
                      ? "flex h-full flex-col border border-line bg-white p-8 transition-colors hover:border-red"
                      : "flex h-full flex-col p-6 transition-colors hover:bg-black/[0.03]"
                  }
                >
                  <div className="flex min-h-24 items-center justify-center">
                    <SponsorLogo
                      sponsor={sponsor}
                      showName={false}
                      className="max-h-20 w-auto max-w-full object-contain"
                    />
                  </div>
                  <p className="mt-6 text-xs uppercase tracking-widest text-red">
                    {sponsor.niveau || "Partenaire"}
                  </p>
                  <h3 className="mt-1 font-display text-3xl uppercase tracking-wide text-ink">
                    {sponsor.nom}
                  </h3>
                  {sponsor.description && (
                    <p className="mt-2 text-sm text-muted">{sponsor.description}</p>
                  )}
                </SponsorLink>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
