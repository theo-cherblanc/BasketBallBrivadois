import type { Metadata } from "next";
import { EmptyState, PageHero } from "@/components/ui";
import { formatTime } from "@/lib/format";
import { getPlannings } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Entraînements",
};

const JOUR_ORDER = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

export default async function EntrainementsPage() {
  const plannings = await getPlannings();
  const sorted = [...plannings].sort(
    (a, b) => JOUR_ORDER.indexOf(a.jour) - JOUR_ORDER.indexOf(b.jour)
  );

  return (
    <>
      <PageHero
        title="Entraînements"
        subtitle="Planning des créneaux par équipe"
      />
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        {sorted.length === 0 ? (
          <EmptyState message="Ajoutez des créneaux dans Strapi (Planning entraînement)." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-black text-xs uppercase tracking-widest text-muted">
                  <th className="py-3 pr-4 font-medium">Jour</th>
                  <th className="py-3 pr-4 font-medium">Horaire</th>
                  <th className="py-3 pr-4 font-medium">Équipe</th>
                  <th className="py-3 pr-4 font-medium">Lieu</th>
                  <th className="py-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((slot) => (
                  <tr key={slot.documentId} className="border-b border-line">
                    <td className="py-4 pr-4 font-display text-xl uppercase tracking-wide text-ink">
                      {slot.jour}
                    </td>
                    <td className="py-4 pr-4 text-sm">
                      {formatTime(slot.heureDebut)} – {formatTime(slot.heureFin)}
                    </td>
                    <td className="py-4 pr-4 text-sm">
                      {slot.equipe?.nom || "—"}
                    </td>
                    <td className="py-4 pr-4 text-sm">{slot.lieu}</td>
                    <td className="py-4 text-sm text-muted">{slot.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
