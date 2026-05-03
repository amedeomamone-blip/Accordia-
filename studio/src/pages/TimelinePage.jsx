import NucleusCard from "../components/NucleusCard";
import { nuclei } from "../data/nuclei";

const timelinePoints = [
  "hero con posizione editoriale del percorso",
  "timeline orizzontale con card a pieno contenuto",
  "cornice didattica con struttura, percorso e verifica",
  "blocchi separati e facili da ritoccare in preview",
];

const frameworkCards = [
  {
    eyebrow: "Struttura",
    title: "Hero, indice e navigazione di capitolo.",
    text: "Ogni nucleo chiarisce subito posizione, periodo storico, nodo tematico e passaggi successivi nel percorso complessivo.",
  },
  {
    eyebrow: "Percorso",
    title: "Mappe, lezioni e approfondimenti collegati.",
    text: "Ogni nucleo tiene insieme panorama storico, argomenti interni, percorsi guidati e accessi rapidi ai punti davvero utili in classe.",
  },
  {
    eyebrow: "Didattica",
    title: "Manuale, compito di realta e verifica.",
    text: "Contesto storico, ascolti, lessico, autori, attivita, compito e materiali docente convivono nello stesso capitolo.",
  },
];

export default function TimelinePage() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate border-b border-accordia-line/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(112,87,201,0.16),transparent_24%),radial-gradient(circle_at_88%_16%,rgba(193,79,64,0.18),transparent_22%),linear-gradient(180deg,#fff8ef_0%,#fffdfa_56%,#f3ebdf_100%)]" />

        <div className="relative mx-auto grid w-[min(100%-2rem,84rem)] gap-10 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-start lg:py-24">
          <div>
            <p className="mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-accordia-ocean">
              Timeline editoriale
            </p>
            <h1 className="max-w-4xl text-[clamp(2.9rem,6vw,5.2rem)] font-black leading-[0.92] tracking-[-0.06em] text-accordia-ink">
              Ogni card apre un nucleo vero, non una copertina muta.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-accordia-muted">
              Questa vista porta dentro Piny la logica della pagina timeline di Accordia:
              i nuclei scorrono in orizzontale, hanno piu materia editoriale e ti lasciano
              intervenire su ritmo, densita, etichette, colori e gerarchie con precisione.
            </p>
          </div>

          <aside className="rounded-[2.2rem] border border-white/70 bg-white/82 p-7 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-accordia-red">
              Dentro ogni nucleo
            </p>
            <div className="mt-5 space-y-3">
              {timelinePoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-[1.25rem] border border-accordia-line bg-accordia-shell/70 px-4 py-4"
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accordia-red" />
                  <p className="text-sm leading-7 text-accordia-ink">{point}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-accordia-line/80 bg-accordia-shell/75 py-16" id="timeline-track">
        <div className="mx-auto w-[min(100%-2rem,84rem)]">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-accordia-red">
                Rail completo
              </p>
              <h2 className="mt-3 text-[clamp(2.1rem,4.6vw,3.8rem)] font-black leading-[0.95] tracking-[-0.05em] text-accordia-ink">
                Dieci card con piu contenuto, piu massa e piu punti di intervento.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-accordia-muted">
              Qui il lavoro visuale puo diventare piu chirurgico: puoi riequilibrare CTA,
              pannelli periodo, spessori, colori accento e spazio verticale delle schede.
            </p>
          </div>

          <div className="overflow-x-auto pb-6">
            <div className="flex min-w-max gap-5 pr-6">
              {nuclei.map((nucleus) => (
                <NucleusCard key={nucleus.id} mode="timeline" nucleus={nucleus} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto grid w-[min(100%-2rem,84rem)] gap-6 lg:grid-cols-3">
          {frameworkCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[2rem] border border-accordia-line bg-white/88 p-7 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-accordia-ocean">
                {card.eyebrow}
              </p>
              <h2 className="mt-4 text-[1.6rem] font-black leading-tight tracking-[-0.04em] text-accordia-ink">
                {card.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-accordia-muted">{card.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
