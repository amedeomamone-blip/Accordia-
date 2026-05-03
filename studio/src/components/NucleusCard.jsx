import { Link } from "react-router-dom";

export default function NucleusCard({ nucleus, mode = "home" }) {
  const style = { "--accent": nucleus.accent };

  if (mode === "timeline") {
    return (
      <article
        className="group relative flex min-h-[25rem] min-w-[20rem] max-w-[20rem] flex-col justify-end gap-[0.7rem] rounded-[1.6rem] border border-[#e6e9ee] bg-white p-[1.35rem] shadow-[0_12px_26px_rgba(15,23,42,0.04)] transition duration-200 hover:-translate-y-[6px] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:shadow-[0_18px_32px_rgba(15,23,42,0.08)]"
        style={style}
      >
        <div className="absolute left-[1.2rem] top-[1.2rem] h-[0.34rem] w-12 rounded-full bg-[var(--accent)] transition duration-200 group-hover:bg-white/70" />
        <span className="absolute right-[1.1rem] top-[1rem] font-display text-[2rem] font-bold text-[#d5d9df] transition duration-200 group-hover:text-white/80">
          {nucleus.number}
        </span>
        <span className="text-[0.76rem] font-extrabold uppercase tracking-[0.12em] text-[#6d737c] transition duration-200 group-hover:text-white/80">
          {nucleus.category}
        </span>
        <h3 className="max-w-[14ch] font-display text-[1.55rem] font-black leading-[1] text-[#18191b] transition duration-200 group-hover:text-white">
          {nucleus.title}
        </h3>
        <p className="max-w-[28ch] text-sm leading-7 text-[#545a63] transition duration-200 group-hover:text-white">
          {nucleus.description}
        </p>
        <span className="mt-1 text-[0.76rem] font-extrabold uppercase tracking-[0.12em] text-[#8c939d] transition duration-200 group-hover:text-white/80">
          {nucleus.period}
        </span>
        <span className="mt-auto text-[0.76rem] font-extrabold uppercase tracking-[0.12em] text-[#8c939d] transition duration-200 group-hover:text-white/80">
          Nucleo editoriale completo
        </span>
        <span className="text-[0.76rem] font-extrabold uppercase tracking-[0.12em] text-[#18191b] transition duration-200 group-hover:text-white">
          Apri il nucleo
        </span>
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
