import { Link } from "react-router-dom";

export default function NucleusCard({ nucleus, mode = "home" }) {
  const style = { "--accent": nucleus.accent };

  if (mode === "timeline") {
    return (
      <article
        className="group flex min-h-[23rem] min-w-[20rem] max-w-[20rem] flex-col rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.11)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_65px_rgba(15,23,42,0.16)]"
        style={style}
      >
        <div className="mb-5 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-[0.34em] text-accordia-muted/70">
            {nucleus.category}
          </span>
          <span className="rounded-full border border-black/5 bg-[var(--accent)]/12 px-3 py-1 text-sm font-semibold text-[var(--accent)]">
            {nucleus.number}
          </span>
        </div>

        <div className="mb-6 h-1.5 w-16 rounded-full bg-[var(--accent)]" />

        <h3 className="mb-3 text-[1.45rem] font-black leading-tight text-accordia-ink">
          {nucleus.title}
        </h3>
        <p className="mb-5 text-sm leading-6 text-accordia-muted">{nucleus.description}</p>

        <div className="mt-auto space-y-3">
          <div className="rounded-[1.35rem] border border-accordia-line bg-accordia-shell/80 p-4">
            <span className="mb-2 block text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-accordia-muted/70">
              Periodo
            </span>
            <p className="text-sm leading-6 text-accordia-ink">{nucleus.period}</p>
          </div>
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-accordia-muted">Nucleo editoriale completo</span>
            <span className="text-[var(--accent)]">Apri il nucleo</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="group flex min-h-[21rem] min-w-[18.5rem] max-w-[18.5rem] flex-col rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_18px_48px_rgba(15,23,42,0.11)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_65px_rgba(15,23,42,0.16)]"
      style={style}
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="rounded-full border border-black/5 bg-[var(--accent)]/12 px-3 py-1 text-sm font-semibold text-[var(--accent)]">
          {nucleus.number}
        </span>
        <div className="h-1.5 w-14 rounded-full bg-[var(--accent)]" />
      </div>

      <span className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-accordia-muted/70">
        {nucleus.era}
      </span>
      <h3 className="mb-3 text-[1.45rem] font-black leading-tight text-accordia-ink">
        {nucleus.title}
      </h3>
      <p className="mb-6 text-sm leading-6 text-accordia-muted">{nucleus.description}</p>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-sm font-semibold text-accordia-muted">{nucleus.category}</span>
        <Link
          className="inline-flex items-center rounded-full bg-accordia-night px-4 py-2 text-sm font-semibold text-white transition duration-300 group-hover:bg-[var(--accent)]"
          to="/timeline"
        >
          Apri il layout
        </Link>
      </div>
    </article>
  );
}
