import Link from "next/link";

type PageHeroProps = {
  title: string;
  subtitle?: string;
};

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-black pt-28 pb-12 text-white md:pt-32 md:pb-16">
      <div className="site-grain absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <h1 className="animate-rise font-display text-5xl uppercase tracking-wide md:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="animate-rise animate-rise-delay-1 mt-4 max-w-2xl text-base text-white/75 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
};

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 className="font-display text-4xl uppercase tracking-wide text-ink md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
    </div>
  );
}

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
};

export function CtaLink({ href, children, variant = "primary" }: CtaLinkProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 text-sm font-medium uppercase tracking-wider transition-colors";
  const styles =
    variant === "primary"
      ? "bg-red text-white hover:bg-red-hot"
      : "border border-current/40 hover:border-current hover:bg-white/10";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <p className="border border-dashed border-line bg-white/50 px-6 py-10 text-center text-muted">
      {message}
    </p>
  );
}

export function RichText({ content }: { content: string }) {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="prose-club max-w-3xl text-base leading-relaxed text-ink/90 md:text-lg">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
