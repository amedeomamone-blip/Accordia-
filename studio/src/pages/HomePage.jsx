import { NavLink } from "react-router-dom";
import NucleusCard from "../components/NucleusCard";
import { nuclei } from "../data/nuclei";

const studioPanels = [
  {
    title: "Hero narrativo",
    text: "Titolo, proporzioni, lead e bottoni sono gia separati in blocchi facili da ritoccare.",
  },
  {
    title: "Card dei nuclei",
    text: "Ogni card ha accento, etichetta, titolo e call to action gestibili in modo visuale.",
  },
  {
    title: "Cornice editoriale",
    text: "Sfondo, pannelli laterali e ritmo verticale sono pronti per prove di atmosfera e gerarchia.",
  },
];

const studioChecklist = [
  "spaziature del frame hero",
  "gerarchia tipografica",
  "colore degli accenti",
  "angoli e shadow delle card",
];

const moduleCards = [
  {
    eyebrow: "Palette",
    title: "Tieni il lessico visivo di Accordia, ma rendilo piu malleabile.",
    text: "I token principali restano caldi, materici e editoriali: sabbia, carta, inchiostro e accenti cromatici per i nuclei.",
  },
  {
    eyebrow: "Gerarchie",
    title: "Ogni blocco del layout e separato in elementi reali e cliccabili.",
    text: "In Piny puoi lavorare su heading, testi, pill, pulsanti, contenitori e rail senza inseguire pseudo-elementi.",
  },
  {
    eyebrow: "Workflow",
    title: "Sperimenta qui, poi riportiamo con precisione le scelte sul sito statico.",
    text: "Questo evita di spezzare il progetto principale mentre troviamo il taglio grafico giusto.",
  },
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate border-b border-accordia-line/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(212,132,127,0.26),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(43,114,136,0.18),transparent_24%),linear-gradient(180deg,#fcf7f0_0%,#fffdfa_52%,#f7efe6_100%)]" />

        <div className="relative mx-auto grid w-[min(100%-2rem,84rem)] gap-10 py-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(19rem,0.7fr)] lg:py-24">
          <div className="rounded-[2.5rem] border border-white/70 bg-white/75 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur lg:p-12">
            <p className="mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-accordia-red">
              Accordia Studio per Piny
            </p>
            <h1 className="max-w-4xl text-[clamp(3.1rem,7vw,6rem)] font-black uppercase leading-[0.9] tracking-[-0.06em] text-accordia-ink">
              La musica nel tempo, ma finalmente ritoccabile.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-accordia-muted">
              Qui dentro Accordia ha un doppio visuale in React e Tailwind: puoi aprire la
              preview in VS Code, selezionare i blocchi in Piny e lavorare su layout,
              gerarchie, card e atmosfera senza toccare al buio gli HTML statici.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <NavLink
                className="inline-flex items-center rounded-full bg-accordia-night px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(15,23,42,0.18)] transition duration-300 hover:bg-accordia-red"
                to="/timeline"
              >
                Apri la timeline di studio
              </NavLink>
              <a
                className="inline-flex items-center rounded-full border border-accordia-line bg-white px-6 py-3 text-sm font-semibold text-accordia-ink transition duration-300 hover:bg-accordia-shell"
                href="#studio-rail"
              >
                Guarda i nuclei
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {studioChecklist.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-accordia-line bg-accordia-shell px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-accordia-muted/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <aside className="grid gap-4">
            {studioPanels.map((panel) => (
              <article
                key={panel.title}
                className="rounded-[2rem] border border-white/70 bg-accordia-night p-6 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]"
              >
                <span className="mb-3 block text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/55">
                  Blocco editabile
                </span>
                <h2 className="text-[1.5rem] font-black tracking-[-0.04em] text-white">
                  {panel.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-white/72">{panel.text}</p>
              </article>
            ))}
          </aside>
        </div>
      </section>

      <section className="border-b border-accordia-line/80 bg-accordia-shell/75 py-16" id="studio-rail">
        <div className="mx-auto w-[min(100%-2rem,84rem)]">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-accordia-ocean">
                Dieci nuclei
              </p>
              <h2 className="mt-3 text-[clamp(2.1rem,4.6vw,3.8rem)] font-black leading-[0.95] tracking-[-0.05em] text-accordia-ink">
                Un rail orizzontale pronto per prove visive, ritmi diversi e micro-scelte editoriali.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-accordia-muted">
              Ogni card resta abbastanza fedele ad Accordia da non perdere il progetto, ma e
              abbastanza libera da poter essere spostata, alleggerita o resa piu espressiva.
            </p>
          </div>

          <div className="overflow-x-auto pb-6">
            <div className="flex min-w-max gap-5 pr-6">
              {nuclei.map((nucleus) => (
                <NucleusCard key={nucleus.id} nucleus={nucleus} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto grid w-[min(100%-2rem,84rem)] gap-6 lg:grid-cols-3">
          {moduleCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[2rem] border border-accordia-line bg-white/85 p-7 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-accordia-red">
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
