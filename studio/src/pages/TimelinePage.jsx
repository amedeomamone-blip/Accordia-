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
    <div className="overflow-hidden bg-white">
      <section className="border-b border-[#eceef2] bg-[#fffdfb] py-5">
        <div className="mx-auto flex w-[min(100%-2rem,84rem)] flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm leading-7 text-[#545a63]">
            Questa e' la copia Piny della timeline reale di Accordia. La struttura qui sotto
            adesso segue molto piu' da vicino la pagina statica che hai gia' costruito.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex items-center justify-center rounded-full bg-[#18191b] px-5 py-3 text-[0.82rem] font-bold uppercase tracking-[0.05em] text-white transition duration-200 hover:-translate-y-0.5"
              href="http://127.0.0.1:8000/timeline/index.html"
              rel="noreferrer"
              target="_blank"
            >
              Apri riferimento reale
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full border-2 border-[#18191b] px-5 py-3 text-[0.82rem] font-bold uppercase tracking-[0.05em] text-[#18191b] transition duration-200 hover:-translate-y-0.5 hover:bg-white"
              href="http://127.0.0.1:8000/index.html"
              rel="noreferrer"
              target="_blank"
            >
              Apri home reale
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-[#eceef2] py-[5.4rem] pb-[3.5rem]">
        <div className="mx-auto grid w-[min(100%-2rem,84rem)] gap-[1.4rem] lg:grid-cols-[minmax(0,1.16fr)_minmax(19rem,0.84fr)]">
          <div>
            <p className="inline-flex items-center gap-[0.6rem] text-[0.76rem] font-extrabold uppercase tracking-[0.14em] text-[#6d737c] before:h-px before:w-8 before:bg-[#d5d9df] before:content-['']">
              Nuclei Accordia
            </p>
            <h1 className="mt-4 max-w-[15ch] font-display text-[clamp(2.6rem,6vw,5rem)] font-black leading-[0.94] tracking-[-0.05em] text-[#18191b]">
              Ogni card apre un nucleo vero, non una scheda riassuntiva.
            </h1>
            <p className="mt-4 max-w-[68ch] text-[1.08rem] leading-[1.85] text-[#40454c]">
              La timeline di Accordia organizza la storia della musica in dieci nuclei
              editoriali completi: ogni tappa ha hero, indice interno, mappe degli argomenti,
              contenuti da libro di testo, compito di realta e verifica.
            </p>
            <div className="mt-8 flex flex-wrap gap-[0.85rem]">
              <a
                className="inline-flex items-center justify-center rounded-full bg-[#18191b] px-6 py-4 text-[0.95rem] font-bold uppercase tracking-[0.05em] text-white transition duration-200 hover:-translate-y-0.5"
                href="#timeline-track"
              >
                Esplora i nuclei
              </a>
              <a
                className="inline-flex items-center justify-center rounded-full border-2 border-[#18191b] px-6 py-4 text-[0.95rem] font-bold uppercase tracking-[0.05em] text-[#18191b] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f7f7f7]"
                href="http://127.0.0.1:8000/pages/lezioni.html"
                rel="noreferrer"
                target="_blank"
              >
                Apri le lezioni
              </a>
            </div>
          </div>

          <aside className="rounded-[1.5rem] border border-[#e8ebf0] bg-white p-[1.6rem] shadow-[0_14px_30px_rgba(15,23,42,0.05)]">
            <p className="inline-flex items-center gap-[0.6rem] text-[0.76rem] font-extrabold uppercase tracking-[0.14em] text-[#6d737c] before:h-px before:w-8 before:bg-[#d5d9df] before:content-['']">
              Dentro ogni nucleo
            </p>
            <ul className="mt-4 grid gap-[0.7rem] pl-[1.1rem] text-[#545a63]">
              {timelinePoints.map((point) => (
                <li key={point} className="text-[0.98rem] leading-7">
                  {point}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="py-16 pb-[4.6rem]" id="timeline-track">
        <div className="mx-auto w-[min(100%-2rem,84rem)]">
          <div className="mb-6 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,24rem)] lg:items-end">
            <div>
              <p className="inline-flex items-center gap-[0.6rem] text-[0.76rem] font-extrabold uppercase tracking-[0.14em] text-[#6d737c] before:h-px before:w-8 before:bg-[#d5d9df] before:content-['']">
                Timeline a scorrimento
              </p>
              <h2 className="mt-4 max-w-[18ch] font-display text-[clamp(2rem,5vw,3.6rem)] font-black leading-[0.96] tracking-[-0.04em] text-[#18191b]">
                Dieci nuclei storico-musicali da attraversare in ordine.
              </h2>
            </div>
            <p className="text-[1rem] leading-7 text-[#545a63]">
              Quando apri un nucleo entri in un capitolo costruito per la didattica: non
              un&apos;anteprima, ma una pagina completa. Tornando qui, Accordia ripristina la
              posizione dell&apos;ultima tappa visitata.
            </p>
          </div>

          <div className="overflow-x-auto px-[0.15rem] pb-5 pt-[0.35rem]">
            <div className="grid min-w-max auto-cols-[minmax(20rem,20vw)] grid-flow-col gap-4">
              {nuclei.map((nucleus) => (
                <NucleusCard key={nucleus.id} mode="timeline" nucleus={nucleus} />
              ))}
            </div>
          </div>
          <p className="mt-4 text-[0.94rem] text-[#6d737c]">
            Scorri lateralmente o usa la mini timeline interna ai nuclei per continuare il
            percorso da dove eri arrivato.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto grid w-[min(100%-2rem,84rem)] gap-4 lg:grid-cols-12">
          {frameworkCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.5rem] border border-[#e8ebf0] bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.05)] lg:col-span-4"
            >
              <p className="inline-flex items-center gap-[0.6rem] text-[0.76rem] font-extrabold uppercase tracking-[0.14em] text-[#6d737c] before:h-px before:w-8 before:bg-[#d5d9df] before:content-['']">
                {card.eyebrow}
              </p>
              <h2 className="mt-[0.85rem] font-display text-[1.35rem] font-black leading-[1.05] tracking-[-0.04em] text-[#18191b]">
                {card.title}
              </h2>
              <p className="mt-[0.8rem] text-[1rem] leading-7 text-[#545a63]">{card.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
