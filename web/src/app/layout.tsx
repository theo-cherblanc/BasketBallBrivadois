import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getGlobal } from "@/lib/strapi";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
      "https://www.basketballbrivadois.fr"
  ),
  title: {
    default: "Basket Ball Brivadois",
    template: "%s · Basket Ball Brivadois",
  },
  description:
    "Site officiel du Basket Ball Brivadois — club de basket amateur à Brioude.",
  verification: {
    google: "XzhDIGIy13Pce5nkb9JsivldRqHMjXxRRupmVb6RlT8",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const global = await getGlobal();
  const clubName = global?.nomClub || "Basket Ball Brivadois";

  return (
    <html lang="fr" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <Header clubName={clubName} />
        <main className="flex-1">{children}</main>
        <Footer
          clubName={clubName}
          facebookUrl={global?.facebookUrl}
          instagramUrl={global?.instagramUrl}
        />
      </body>
    </html>
  );
}
