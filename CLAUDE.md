# Accordia — Design System

Sito didattico di educazione musicale. L'estetica è: sobria, tipografica, senza decorazioni superflue. Ispirazione: Vercel (ink + canvas, tracking negativo, ombre sottili a strati). Identità propria: font Apple, accento terracotta (#C37A6B), tile squadrati con lampeggio animato.

---

## Identità visiva

- **Pagina di riferimento principale**: `nuclei/barocco/index.html` (tile bento + titolo glow)
- **Font**: SF Pro Display / SF Pro Text (equivalente open-source: Inter 400/500/600/700/800)
- **Colore text primario**: `#111111`
- **Accento brand**: `#C37A6B` (terracotta) — usato come `var(--accent)` nei moduli lezione
- **Sfondo**: `#ffffff` / `#fafafa` — mai colori di sfondo forti

---

## Token CSS (in `css/style.css`)

```css
:root {
    /* ── Canvas ── */
    --canvas:          #ffffff;
    --canvas-soft:     #fafafa;   /* sfondo pagina */
    --canvas-soft-2:   #f5f5f5;   /* inset / alternanza */

    /* ── Ink ── */
    --ink:             #111111;   /* testo primario e CTA */
    --body:            #4d4d4d;   /* testo secondario */
    --mute:            #888888;   /* placeholder, note */
    --on-ink:          #ffffff;   /* testo su superfici scure */

    /* ── Hairlines ── */
    --hairline:        #e8e8e8;   /* divisori 1px */
    --hairline-strong: #a1a1a1;   /* divisori più marcati */

    /* ── Accento brand ── */
    --accent:          #C37A6B;   /* terracotta */
    --accent-soft:     #f0ede8;   /* background soft */

    /* ── Tipografia ── */
    --font-display: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;
    --font-sans:    "SF Pro Text",    -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif;

    /* ── Spaziatura (base 4px) ── */
    --sp-1:   4px;
    --sp-2:   8px;
    --sp-3:  12px;
    --sp-4:  16px;
    --sp-6:  24px;
    --sp-8:  32px;
    --sp-10: 40px;
    --sp-12: 48px;
    --sp-16: 64px;
    --sp-24: 96px;

    /* ── Border radius — sistema angolare ── */
    --r-none: 0px;
    --r-xs:   2px;   /* badge minimo */
    --r-sm:   4px;   /* UI tight */
    --r-md:   6px;   /* input, bottoni UI */
    --r-lg:   8px;   /* card standard */

    /* ── Elevazione (ombre a strati, mai singola drop pesante) ── */
    --el-1: 0 1px 1px rgba(0,0,0,.03), inset 0 0 0 1px rgba(0,0,0,.06);
    --el-2: 0 1px 1px rgba(0,0,0,.03), 0 2px 2px rgba(0,0,0,.04), inset 0 0 0 1px rgba(0,0,0,.06);
    --el-3: 0 2px 2px rgba(0,0,0,.04), 0 8px 8px -8px rgba(0,0,0,.06), inset 0 0 0 1px rgba(0,0,0,.06);
    --el-4: 0 2px 2px rgba(0,0,0,.04), 0 8px 16px -4px rgba(0,0,0,.08), inset 0 0 0 1px rgba(0,0,0,.06);

    /* ── Layout ── */
    --shell-max:    1320px;
    --shell-gutter: clamp(1rem, 4vw, 3rem);
    --touch-target: 44px;
}
```

---

## Tipografia

| Ruolo | Font | Size | Weight | Tracking | Line-height |
|---|---|---|---|---|---|
| Display XL (hero) | SF Pro Display | `clamp(2.5rem, 6vw, 4.5rem)` | 800 | `-0.045em` | 1.05 |
| Display LG (sezione) | SF Pro Display | `clamp(1.8rem, 3.5vw, 3.2rem)` | 800 | `-0.04em` | 1.1 |
| Display MD (card) | SF Pro Display | `clamp(1.3rem, 2vw, 2rem)` | 700 | `-0.03em` | 1.15 |
| Body LG | SF Pro Text | `1.05rem` | 400 | `0` | 1.7 |
| Body MD | SF Pro Text | `0.95rem` | 400 | `-0.01em` | 1.6 |
| Body SM | SF Pro Text | `0.82rem` | 400 | `-0.01em` | 1.5 |
| Caption / Eyebrow | SF Pro Text | `0.65–0.75rem` | 600 | `+0.1em` | 1 |

**Regole:**
- Tracking negativo è parte della voce. Non usare mai tracking positivo sui display.
- Headline in sentence-case, mai tutto maiuscolo.
- Peso massimo 800; non usare 900 o black.
- Eyebrow (categoria, sezione): maiuscolo, tracking `+0.1em`, opacità 0.35–0.5.

---

## Pulsanti e controlli

| Componente | Radius | Padding | Note |
|---|---|---|---|
| CTA marketing | `--r-none` | `0.6rem 1.25rem` | Angoli vivi — no arrotondamenti |
| Pulsante UI | `--r-none` | `0.5rem 1rem` | Angoli vivi |
| Tab / chip | `--r-none` | `0.4rem 0.7rem` | Angoli vivi |
| Badge informativo | `--r-xs` (2px) | `0.2rem 0.5rem` | Solo per elementi non interattivi |

**Regola fondamentale**: nessun `border-radius` sui bottoni interattivi. Accordia usa angoli vivi (vivi, non arrotondati) per tutti i controlli cliccabili.

---

## Card e superfici

| Livello | Trattamento | Uso |
|---|---|---|
| Flat | nessun shadow, no border | sezioni full-bleed, sfondo scuro |
| `--el-1` | hairline inset 1px | card base, tile a riposo |
| `--el-2` | hairline + micro-drop | card secondarie, template |
| `--el-3` | soft stack | card feature, modal leggere |
| `--el-4` | float stack | pricing, callout principali |

**Mai** usare `box-shadow: 0 8px 24px rgba(0,0,0,0.08)` (singola drop pesante) — solo ombre a strati.

---

## Tile (pattern specifico Accordia)

Ogni nucleo usa **tile quadrate** a larghezza `calc(N * 1vw)`, senza arrotondamenti, con:
- Animazione lampeggio terracotta (`--accent`) ciclica a intervalli sfasati
- Testo (titolo, numero) sotto la faccia quadrata
- Breakpoint mobile: tile si scalano, no overflow orizzontale

---

## Colori funzionali

| Token | Hex | Uso |
|---|---|---|
| `--ink` | `#111111` | Testo primario, CTA principale |
| `--body` | `#4d4d4d` | Testo secondario, nav link |
| `--mute` | `#888888` | Placeholder, note, fine print |
| `--hairline` | `#e8e8e8` | Divisori, bordi card |
| `--accent` | `#C37A6B` | Accento brand (terracotta) |
| `--canvas` | `#ffffff` | Card, dialog, modale |
| `--canvas-soft` | `#fafafa` | Sfondo pagina |

---

## Spaziatura

Base unit: **4px**. Ogni padding, gap, margin è multiplo di 4.

```
4   8   12   16   24   32   40   48   64   96
sp-1 sp-2 sp-3 sp-4 sp-6 sp-8 sp-10 sp-12 sp-16 sp-24
```

Padding interno card: `var(--sp-6)` (24px) standard, `var(--sp-8)` (32px) card grandi.  
Gap tra elementi inline (bottoni, chip): `var(--sp-2)` (8px).

---

## Layout e griglia

- **Max width**: `1320px` (`--shell-max`)
- **Gutter**: `clamp(1rem, 4vw, 3rem)` — si adatta dal mobile al desktop
- **Touch target**: `44px` minimo per ogni elemento interattivo

### Breakpoints — mobile-first (min-width)

| Nome | Min-width | Query | Comportamento |
|---|---|---|---|
| Mobile | — | base | Colonna singola, nav → menu trigger, CTA full-width |
| Tablet sm | `640px` | `@media (min-width: 640px)` | 2 colonne, nav condensata |
| Tablet | `768px` | `@media (min-width: 768px)` | 2–3 colonne, layout intermedio |
| Laptop | `1024px` | `@media (min-width: 1024px)` | 3–4 colonne, nav completa |
| Desktop | `1200px` | `@media (min-width: 1200px)` | Container max-width centrato, griglie complete |

**Regola fondamentale**: scrivere sempre gli stili base per mobile, poi aggiungere `min-width` per schermi più grandi. Mai partire dal desktop e "rompere" con `max-width`.

---

## Responsive — regole

1. **Mobile-first**: stili base = mobile. Usare `@media (min-width: ...)` per espandere verso il desktop, mai `max-width` come punto di partenza.
2. **Collapsing strategy**: nav collassa dietro menu trigger su mobile; griglie multi-colonna diventano singola colonna; illustrazioni scalano fluide, non si restringono fino all'illeggibilità.
3. **Non usare mai** `overflow: auto` su contenitori annidati dentro Lenis. Fare stare il contenuto nella schermata ridimensionando.
4. **Immagini**: `max-width: 100%; height: auto` sempre.
5. **Tile**: su mobile le tile scalano con `vw` o `%`, mai `px` fissi che creano overflow.
6. **Font size**: usare sempre `clamp()` per i display: `clamp(min, vw-based, max)`.
7. **Touch targets**: nessun elemento interattivo sotto `44px` di altezza/larghezza su mobile.

---

## Reference pages

| Pagina | Uso come riferimento |
|---|---|
| `nuclei/barocco/index.html` | Tile, titolo, glow, tipografia display |
| `nuclei/barocco/argomenti/il-barocco-in-coordinate/index.html` | Slide 3-screen, quiz, timeline |
| `index.html` | Home / landing pattern |

---

## Anti-pattern (mai fare)

- `border-radius > 4px` sui bottoni interattivi
- Shadow singola pesante (`box-shadow: 0 8px 24px ...`)
- Font-weight > 800
- Tracking positivo sui titoli display
- `overflow-y: auto` su contenitori figli di Lenis
- Colori di sfondo forti (solo `#fff`, `#fafafa`, `#f5f5f5`, `#111111`)
- Testo body in font monospace
- Headline in maiuscolo
