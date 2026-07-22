import Image from "next/image";
import Link from "next/link";

type FooterProps = {
  clubName: string;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
};

export function Footer({ clubName, facebookUrl, instagramUrl }: FooterProps) {
  return (
    <footer className="mt-auto border-t border-line bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="flex items-center gap-4">
          <Image
            src="/logo-bbb.png"
            alt={`Logo ${clubName}`}
            width={64}
            height={64}
            className="h-14 w-14 object-contain"
          />
          <div>
            <p className="font-display text-3xl tracking-wide uppercase">
              {clubName}
            </p>
            <p className="mt-1 max-w-sm text-sm text-white/70">
              Association sportive — basket amateur à Brioude. Depuis 1971.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <Link href="/contact" className="transition-colors hover:text-red-hot">
            Nous contacter
          </Link>
          {(facebookUrl || instagramUrl) && (
            <div className="flex gap-4">
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-red-hot"
                >
                  Facebook
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-red-hot"
                >
                  Instagram
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
