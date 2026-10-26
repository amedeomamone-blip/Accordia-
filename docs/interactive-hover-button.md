# Interactive Hover Button

Accordia viene pubblicato come HTML statico e non ha un'applicazione React, TypeScript o una build Tailwind. Le pagine usano l'adattatore DOM `js/interactive-hover-button.js` e il foglio condiviso `css/accordia-design-system.css`, senza dipendenze runtime. Conserva i nodi button, gli handler e gli stati disabilitati, aggiornando anche le etichette dinamiche.

La versione React è in `components/ui/interactive-hover-button.tsx`, con esempio in `components/ui/demo.tsx`. La cartella `components/ui` rende i componenti riutilizzabili indipendenti dalle lezioni. Non è inclusa nella build statica.

Per usare la versione React in una futura app, inizializzare un progetto React TypeScript con Vite (`npm create vite@latest accordia-app -- --template react-ts`), installare Tailwind e la relativa integrazione Vite seguendo la versione scelta, configurare l'alias `@` alla radice dei sorgenti e avviare `npx shadcn@latest init`. Impostare l'alias dei componenti UI su `@/components/ui`, copiare i due file e installare `npm install lucide-react clsx tailwind-merge`. La funzione `cn` viene creata da shadcn in `lib/utils`. Nessun provider, stato globale o immagine è necessario. `text`, `onClick`, `disabled` e gli attributi ARIA provengono dalla lezione. I token `primary`, `primary-foreground` e `background` devono corrispondere al suo tema.
