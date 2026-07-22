"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/club", label: "Le club" },
  { href: "/equipes", label: "Équipes" },
  { href: "/calendrier", label: "Calendrier" },
  { href: "/actualites", label: "Actualités" },
  { href: "/entrainements", label: "Entraînements" },
  { href: "/bureau", label: "Bureau" },
  { href: "/contact", label: "Contact" },
];

type HeaderProps = {
  clubName: string;
};

export function Header({ clubName }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo-bbb.png"
            alt={`Logo ${clubName}`}
            width={56}
            height={56}
            className="h-12 w-12 object-contain md:h-14 md:w-14"
            priority
          />
          <span className="font-display text-xl tracking-wide uppercase md:text-2xl">
            {clubName}
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-sm border border-current/30 px-3 py-2 text-sm uppercase tracking-wider md:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>

        <nav
          id="site-nav"
          className={`${
            open
              ? "absolute inset-x-0 top-full block border-b border-black/10 bg-white px-5 py-4 text-ink shadow-lg"
              : "hidden"
          } md:static md:block md:border-0 md:bg-transparent md:p-0 md:shadow-none md:text-inherit`}
        >
          <ul className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
            {LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-sm tracking-wide transition-opacity hover:opacity-100 ${
                      active
                        ? "opacity-100 underline underline-offset-4"
                        : "opacity-80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
