import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home studio" },
  { to: "/timeline", label: "Timeline studio" },
];

export default function SiteFrame({ children }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf4_0%,#fffdfa_45%,#f5ede3_100%)]">
      <header className="sticky top-0 z-40 border-b border-accordia-line/80 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex w-[min(100%-2rem,84rem)] items-center justify-between gap-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accordia-red/15 text-sm font-black uppercase tracking-[0.35em] text-accordia-red">
              A
            </div>
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-accordia-muted/70">
                Accordia
              </p>
              <strong className="block text-sm uppercase tracking-[0.28em] text-accordia-ink">
                Visual Studio
              </strong>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-end gap-2" aria-label="Navigazione di studio">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) =>
                  [
                    "rounded-full px-4 py-2 text-sm font-semibold transition duration-300",
                    isActive
                      ? "bg-accordia-night text-white shadow-[0_10px_24px_rgba(15,23,42,0.16)]"
                      : "bg-white text-accordia-muted ring-1 ring-accordia-line hover:bg-accordia-shell hover:text-accordia-ink",
                  ].join(" ")
                }
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
            <span className="hidden rounded-full border border-accordia-line bg-accordia-shell px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-accordia-muted/80 md:inline-flex">
              Piny-ready
            </span>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-accordia-line/80 bg-white/70">
        <div className="mx-auto flex w-[min(100%-2rem,84rem)] flex-col gap-4 py-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <strong className="block text-sm uppercase tracking-[0.28em] text-accordia-ink">
              Accordia Studio
            </strong>
            <p className="mt-2 text-sm leading-7 text-accordia-muted">
              Laboratorio visuale per Piny dentro il repo di Accordia. Qui puoi muovere
              spaziature, gerarchie, card e cornici editoriali prima di riportare i ritocchi
              nel sito statico.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-accordia-muted/80">
            <span className="rounded-full border border-accordia-line bg-white px-3 py-2">Route /</span>
            <span className="rounded-full border border-accordia-line bg-white px-3 py-2">
              Route /timeline
            </span>
            <span className="rounded-full border border-accordia-line bg-white px-3 py-2">
              Vite + Tailwind + Piny
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
