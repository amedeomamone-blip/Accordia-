# Accordia — guida per gli interventi

## Riferimenti da leggere

1. [AGENTS.md](AGENTS.md): flusso di lavoro e vincoli operativi.
2. [docs/design-system.md](docs/design-system.md): regole permanenti dell’interfaccia, prevalenti sui precedenti criteri decorativi.
3. [README.md](README.md) e [docs/stato-attuale.md](docs/stato-attuale.md): mappa del sito, responsabilità dei file e verifiche.

Questa guida è stata allineata l’8 novembre 2026. Le precedenti prescrizioni di pulsanti sempre squadrati, bagliori e lampeggiamenti decorativi sono superate dalle regole condivise del 25–26 ottobre.

## Interfaccia condivisa

- Header con il solo collegamento testuale `amedeo`; titoli e comandi della lezione sotto l’header.
- Caricare `css/accordia-design-system.css` dopo gli stili locali. Non duplicare qui i token: il CSS e il documento di riferimento ne sono le fonti.
- Contenuto bianco, comandi grigi, Lettura azzurro ardesia e Ritmo salvia. Non imporre l’accento terracotta del Barocco a tutte le lezioni.
- Pulsanti di azione arrotondati, bersaglio minimo 44px e stati distinguibili per hover, pressione, focus, selezione e disabilitazione.
- L’effetto Interactive Hover riguarda i comandi testuali, non i segni musicali o le risposte grafiche.
- Sans serif condivisa; Bravura per la notazione. Conservare indicatori, pentagrammi, stanghette e colori con funzione didattica.
- Nessun bagliore, gradiente decorativo o lampeggiamento continuo. Rispettare `prefers-reduced-motion` e conservare lo scorrimento funzionale delle partiture.
- Verificare tastiera, touch, desktop, LIM 1280×720 e schermi piccoli; distinguere i controlli statici dalla verifica effettiva nel browser.

## File e contenuti

- Aprire la pagina e verificare gli script caricati prima di modificarli: Eco e Orchestra hanno logica incorporata, mentre alcuni file esterni sono storici.
- Il titolo corrente è **Tre strumenti, un’orchestra**, con tre parti; mantenere l’URL `quattro-strumenti/` e il reindirizzamento `marcia-di-topolino/`.
- Lettura include cinque argomenti, compresi punto e legatura di valore e scala diatonica. Le fonti documentate sono in `docs/lettura-fonti.md`; non attribuire a una fonte contenuti aggiuntivi non verificati.
- Home e timeline editoriale presentano sei nuclei storici; il vecchio elenco di dieci nuclei è superato. Non presentare una tessera senza destinazione come funzione disponibile.
- Il renderer storico può sovrascrivere pagine personalizzate. Per una rigenerazione, usare una copia isolata ed esaminare il diff prima di pubblicare.

Per interventi sull’architettura Barocco leggere anche `docs/barocco-lesson-system.md`, applicando la precedenza delle regole condivise. Non estendere automaticamente le proporzioni delle card a spartiti o superfici interattive con esigenze diverse.
