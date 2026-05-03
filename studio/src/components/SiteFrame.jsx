import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home studio" },
  { to: "/timeline", label: "Timeline studio" },
];

export default function SiteFrame({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-accordia-line/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex w-[min(100%-2rem,84rem)] items-center justify-between gap-6 py-4">
          <a className="inline-flex items-center gap-[0.9rem]" href="/">
            <span className="relative inline-block h-[2.15rem] w-[2.15rem] rounded-full bg-[#f7e7e4] text-transparent">
              <span className="absolute left-1/2 top-1/2 h-[0.95rem] w-[0.95rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dc5d50]" />
            </span>
            <span className="inline-flex items-center">
              <strong className="font-display text-[0.94rem] uppercase leading-none tracking-[0.16em] text-[#18191b]">
                Accordia
              </strong>
            </span>
          </a>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Navigazione di studio">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) =>
                  [
                    "rounded-full px-4 py-2 text-[0.95rem] font-semibold transition duration-200",
                    isActive
                      ? "bg-[#f5f5f7] text-[#18191b]"
                      : "text-accordia-muted hover:bg-[#f5f5f7] hover:text-[#18191b]",
                  ].join(" ")
                }
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
            <a
              className="rounded-full px-4 py-2 text-[0.95rem] font-semibold text-accordia-muted transition duration-200 hover:bg-[#f5f5f7] hover:text-[#18191b]"
              href="http://127.0.0.1:8000/timeline/index.html"
              rel="noreferrer"
              target="_blank"
            >
              Timeline reale
            </a>
            <span className="rounded-full border border-accordia-line bg-white px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-accordia-muted/80">
              Piny
            </span>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-accordia-line/80 bg-white py-12">
        <div className="mx-auto grid w-[min(100%-2rem,84rem)] gap-8 md:grid-cols-3">
          <div>
            <strong className="text-[#18191b]">Accordia Studio</strong>
            <p className="mt-3 text-[0.95rem] leading-7 text-accordia-muted">
              Questa e' la copia Piny della timeline reale di Accordia. Qui ritocchi gli
              elementi in modo visuale, poi riportiamo le scelte sul sito statico principale.
            </p>
          </div>
          <div>
            <span className="mb-4 block text-[0.8rem] font-bold uppercase tracking-[0.1em] text-[#18191b]">
              Continua
            </span>
            <a
              className="mb-2 block text-[0.95rem] text-accordia-muted transition duration-200 hover:text-[#18191b]"
              href="http://127.0.0.1:5173/"
            >
              Home studio
            </a>
            <a
              className="block text-[0.95rem] text-accordia-muted transition duration-200 hover:text-[#18191b]"
              href="http://127.0.0.1:5173/timeline"
            >
              Timeline studio
            </a>
          </div>
          <div>
            <span className="mb-4 block text-[0.8rem] font-bold uppercase tracking-[0.1em] text-[#18191b]">
              Riferimento
            </span>
            <a
              className="mb-2 block text-[0.95rem] text-accordia-muted transition duration-200 hover:text-[#18191b]"
              href="http://127.0.0.1:8000/timeline/index.html"
              rel="noreferrer"
              target="_blank"
            >
              Timeline reale
            </a>
            <a
              className="block text-[0.95rem] text-accordia-muted transition duration-200 hover:text-[#18191b]"
              href="http://127.0.0.1:8000/index.html"
              rel="noreferrer"
              target="_blank"
            >
              Home reale
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
