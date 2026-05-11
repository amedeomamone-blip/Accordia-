from __future__ import annotations

import copy
import json
from html import escape
from pathlib import Path
import re
import shutil
import unicodedata


ROOT = Path(__file__).resolve().parents[1]
VERSIONED_ASSET_PATHS = [
    ROOT / "css" / "style.css",
    ROOT / "css" / "lesson-immersive.css",
    ROOT / "js" / "main.js",
    ROOT / "components" / "LessonShared.module.js",
    ROOT / "components" / "OriginiTopicLessonTemplate.module.js",
    ROOT / "components" / "RitmoPulsazioneTempoLesson.module.js",
    ROOT / "components" / "SuonoNellaPreistoriaLesson.module.js",
    ROOT / "components" / "MusicaComunicazioneFunzioniSocialiLesson.module.js",
    ROOT / "components" / "RitoMagiaComunitaLesson.module.js",
    ROOT / "components" / "MaterialiSonoriPrimiStrumentiLesson.module.js",
    ROOT / "components" / "DalleOriginiAlMondoAnticoLesson.module.js",
    ROOT / "components" / "VivaldiSuonoStagioniLesson.module.js",
]
ASSET_VERSION = str(
    int(
        max(
            path.stat().st_mtime
            for path in VERSIONED_ASSET_PATHS
        )
    )
)
STATIC_PAGES = [
    ROOT / "index.html",
    ROOT / "compiti" / "index.html",
    ROOT / "docente" / "index.html",
    ROOT / "metodo" / "index.html",
    ROOT / "pages" / "teoria.html",
    ROOT / "pages" / "lezioni.html",
    ROOT / "pages" / "risorse.html",
    ROOT / "percorso" / "index.html",
    ROOT / "storia-musica" / "index.html",
]
CSS_ASSET_RE = re.compile(r'href="(?P<path>[^"]*css/style\.css)(?:\?v=\d+)?"')
JS_ASSET_RE = re.compile(r'src="(?P<path>[^"]*js/main\.js)(?:\?v=\d+)?"')
SITE_NAV_RE = re.compile(r'\n\s*<nav class="site-nav" aria-label="Navigazione principale">.*?</nav>', re.S)
HOME_TIMELINE_TRACK_RE = re.compile(
    r'<div class="home-timeline__track" aria-label="Timeline orizzontale di Accordia">.*?</div>',
    re.S,
)
EDITOR_DATA_DIR = ROOT / "data" / "editor"
TIMELINE_PAGE_DATA_PATH = EDITOR_DATA_DIR / "timeline_page.json"
NUCLEI_OVERRIDES_PATH = EDITOR_DATA_DIR / "nuclei_overrides.json"
EDITOR_NUCLEUS_FIELDS = (
    "title",
    "nav_title",
    "category",
    "period",
    "accent",
    "description",
)
DEFAULT_TIMELINE_PAGE_DATA = {
    "meta_description": "La timeline di Accordia apre dieci nuclei storico-musicali completi, con lavagne delle lezioni, ascolti, compiti di realta e verifiche.",
    "page_title": "Nuclei | Accordia",
    "hero": {
        "eyebrow": "Nuclei Accordia",
        "title": "La Musica nel tempo",
        "lead": "La timeline di Accordia organizza la storia della musica in dieci nuclei editoriali completi: ogni tappa tiene insieme hero, indice interno, lavagna delle lezioni, contenuti da manuale, compito di realta e verifica.",
        "primary_cta_label": "Esplora i nuclei",
        "primary_cta_href": "#timeline-track",
        "secondary_cta_label": "Apri le lezioni",
        "secondary_cta_href": "../pages/lezioni.html",
        "panel_label": "Dentro ogni nucleo",
        "panel_items": [
            "hero con posizione nella timeline",
            "mini timeline sticky per muoversi tra i nuclei",
            "lavagna delle lezioni con card collegate",
            "contenuti da manuale, compito e verifica",
        ],
    },
    "track": {
        "eyebrow": "Timeline a scorrimento",
        "title": "Dieci nuclei storico-musicali da attraversare in ordine.",
        "body": "Quando apri un nucleo entri in un capitolo costruito per la didattica: non un'anteprima, ma una pagina completa. Tornando qui, Accordia ripristina la posizione dell'ultima tappa visitata.",
        "hint": "Scorri lateralmente o usa la mini timeline interna ai nuclei per continuare il percorso da dove eri arrivato.",
    },
    "framework_cards": [
        {
            "eyebrow": "Struttura",
            "title": "Hero, indice e navigazione di capitolo.",
            "body": "Ogni nucleo chiarisce subito posizione, periodo storico, nodo tematico e passaggi successivi nel percorso complessivo.",
        },
        {
            "eyebrow": "Percorso",
            "title": "Lavagne, lezioni e approfondimenti collegati.",
            "body": "Ogni nucleo tiene insieme panorama storico, lezioni interne, percorsi guidati e accessi rapidi ai punti davvero utili in classe.",
        },
        {
            "eyebrow": "Didattica",
            "title": "Manuale, compito di realta e verifica.",
            "body": "Contesto storico, ascolti, lessico, autori, attivita, compito e materiali docente convivono nello stesso capitolo.",
        },
    ],
    "footer": {
        "summary": "La timeline apre nuclei editoriali completi, collegati fra loro da una mini timeline sticky, lavagne delle lezioni e pagine di approfondimento.",
        "continue_label": "Continua",
        "project_label": "Progetto",
    },
    "style": {
        "hero_padding_top": "5.4rem",
        "hero_padding_bottom": "3.5rem",
        "track_padding_top": "4rem",
        "track_padding_bottom": "4.6rem",
        "card_min_height": "25rem",
        "card_gap": "1rem",
        "card_auto_columns": "minmax(20rem, 20vw)",
    },
}

PHASE_LABELS = [
    ("scintilla", "Scintilla", "Domanda iniziale"),
    ("rotta", "Rotta", "Contesto storico"),
    ("orecchio", "Orecchio", "Ascolto guidato"),
    ("grafo", "Grafo", "Pensiero visivo"),
    ("cantiere", "Cantiere", "Attivita operative"),
    ("varco", "Varco", "Compito di realta"),
    ("ribalta", "Ribalta", "Restituzione finale"),
    ("specchio", "Specchio", "Valutazione"),
]

NUCLEI = [
    {
        "number": "01",
        "slug": "origini-del-suono",
        "title": "Origini del suono",
        "nav_title": "Origini del suono",
        "category": "Origini",
        "period": "Preistoria sonora e prime comunita",
        "position": "Nucleo 01 di 10 · apertura del percorso",
        "accent": "#c06a1c",
        "landing_mode": "map-only",
        "description": "Corpo, ritmo, gesto, ambiente e primi usi condivisi del suono.",
        "hero_subtitle": "La musica nasce prima della scrittura: nel corpo, nel rito e nel gesto condiviso.",
        "hero_note": "Qui il nucleo non parte da uno stile, ma da una domanda antropologica: come fa il suono a diventare esperienza comune, memoria e azione collettiva?",
        "chapter_map": [
            "voce come primo strumento",
            "corpo e gesto sonoro",
            "ritmo e percussione",
            "suono e rito",
            "suono e comunita",
            "primi strumenti musicali",
            "musica come comunicazione, festa, caccia, magia",
        ],
        "context_text": "Prima delle civilta storiche la musica e gia presente come gesto, ritmo, relazione con l'ambiente e pratica condivisa. Non esistono ancora autori riconoscibili o opere scritte, ma esistono situazioni in cui la voce, il battito e il suono organizzano il gruppo, il rito e il lavoro.",
        "functions_text": "In questa fase la musica serve a coordinare il corpo, marcare il tempo, rendere piu efficace un gesto collettivo, dare forma al rito, sostenere la festa e costruire identita all'interno della comunita.",
        "forms_text": "Pulsazioni regolari, formule vocali iterative, chiamata e risposta, ostinati ritmici, invocazioni e suoni collegati al movimento sono le forme piu probabili di un repertorio ancora orale e inseparabile dal contesto.",
        "instruments_text": "Corpo, mani, piedi e voce sono gli strumenti iniziali. A questi si aggiungono pietre percosse, legni, sonagli, tamburi primari, flauti di osso o canna e oggetti naturali trasformati in strumenti sonori.",
        "authors": [
            {
                "name": "Tradizioni anonime",
                "work": "formule vocali, richiami, percussioni corporee",
                "note": "Il sapere musicale e collettivo: non si firma, si trasmette per imitazione e memoria.",
            },
            {
                "name": "Testimonianze archeologiche",
                "work": "flauti paleolitici, sonagli, oggetti rituali",
                "note": "Gli strumenti antichi mostrano che il suono entra presto nella vita simbolica e comunitaria.",
            },
            {
                "name": "Pratiche rituali",
                "work": "canto, danza, percussione, trance",
                "note": "Il gesto sonoro accompagna caccia, festa, passaggi di status e relazione con il sacro.",
            },
        ],
        "listenings": [
            {
                "title": "Voce, respiro e richiamo collettivo",
                "focus": "Ascoltare come timbro, intensita e ripetizione possono organizzare un gruppo anche senza una melodia complessa.",
            },
            {
                "title": "Percussione corporea e pulsazione",
                "focus": "Riconoscere il ritmo come struttura primaria che unisce gesto, cammino, lavoro e ritualita.",
            },
            {
                "title": "Ricostruzioni di flauti antichi",
                "focus": "Osservare come un materiale povero possa produrre suoni con forte valore simbolico e comunitario.",
            },
        ],
        "connections": [
            "arte rupestre e ritualita",
            "antropologia del gesto",
            "storia delle comunita preistoriche",
            "ambiente sonoro e paesaggio",
        ],
        "lexicon": ["ritmo", "pulsazione", "ostinato", "timbro", "rito", "aerofono"],
        "summary_text": "Il nucleo mostra che la musica nasce come funzione umana: prima di essere repertorio o scrittura, e corpo organizzato nel tempo, memoria orale, rito, appartenenza e comunicazione.",
        "activities": [
            "costruisci una mappa che distingua gesto, ritmo, voce e ambiente",
            "prova una breve sequenza di percussione corporea con chiamata e risposta",
            "confronta tre funzioni del suono: festa, caccia, rito",
            "descrivi come cambia il significato di un suono se cambia il contesto sociale",
        ],
        "spark_question": "Quando un gesto sonoro smette di essere rumore e diventa musica per una comunita?",
        "rotta_text": "La rotta colloca il nucleo in un tempo senza notazione e senza autori riconosciuti, ma non senza cultura: la musica e gia relazione, rito e memoria condivisa.",
        "orecchio_text": "Gli ascolti guidati fanno emergere voce, pulsazione, percussione e ambiente come elementi fondativi del fenomeno musicale.",
        "grafo_text": "Il grafo puo collegare quattro nodi stabili: corpo, suono, rito e comunita, mostrando come da li partano funzioni, strumenti e gesti.",
        "cantiere_text": "Nel cantiere gli studenti classificano usi diversi del suono e costruiscono una piccola tassonomia tra funzione rituale, comunicativa e festiva.",
        "assignment": {
            "scenario": "La classe prepara un pannello sonoro per una mostra scolastica sulle origini della musica.",
            "task": "Seleziona i concetti essenziali del nucleo e trasformali in una guida sintetica che spieghi come il suono diventa pratica umana condivisa.",
            "product": "un pannello audio-visivo o una scheda museo con esempi sonori essenziali",
            "audience": "studenti di un'altra classe o visitatori della mostra di istituto",
            "materials": "schede, immagini di strumenti antichi, registrazioni vocali e ritmiche, cartellone o software di presentazione",
            "timing": "2 lezioni di preparazione e 1 lezione di restituzione",
            "steps": [
                "seleziona i contenuti chiave del nucleo",
                "organizza i concetti in una sequenza chiara",
                "scegli un esempio sonoro o gestuale per ogni concetto",
                "prepara la restituzione finale in forma leggibile",
            ],
            "assessment": [
                "chiarezza storica e concettuale",
                "uso corretto del lessico minimo",
                "coerenza tra testo, immagini e suono",
                "capacita di spiegare il rapporto tra musica e comunita",
            ],
        },
        "verification": {
            "quick_check": [
                "definisci in due righe perche la voce puo essere considerata il primo strumento",
                "spiega la differenza tra suono ambientale e gesto sonoro intenzionale",
                "indica una funzione rituale e una funzione comunicativa del suono",
            ],
            "comprehension": [
                "perche in questo nucleo non parliamo ancora di opere musicali nel senso moderno?",
                "in che modo ritmo e comunita sono collegati?",
                "quali materiali possono trasformarsi nei primi strumenti?",
            ],
            "listening_test": "Riconosci, in un breve ascolto o in una performance dal vivo, quali elementi richiamano voce, pulsazione, richiamo collettivo e gesto rituale.",
            "rubric": [
                "comprende il senso storico del nucleo",
                "usa con precisione il lessico minimo",
                "sa distinguere funzione, strumento e contesto",
                "argomenta con esempi chiari",
            ],
            "self_eval": [
                "so spiegare perche la musica nasce come pratica collettiva",
                "so collegare ritmo, gesto e comunita",
                "so riconoscere almeno tre idee chiave del nucleo",
            ],
            "premium": "Spazio riservato a materiali premium futuri: tracce audio guidate, schede stampabili e versione docente del grafo.",
        },
    },
    {
        "number": "02",
        "slug": "civilta-del-mediterraneo",
        "title": "Civilta del Mediterraneo",
        "nav_title": "Civilta del Mediterraneo",
        "category": "Antico Mediterraneo",
        "period": "III millennio a.C. - V secolo d.C.",
        "position": "Nucleo 02 di 10 · il suono entra nella storia scritta",
        "accent": "#9b4d2f",
        "description": "Rito, mito, teatro e potere nelle prime grandi culture storiche.",
        "hero_subtitle": "La musica entra nelle civilta complesse e assume funzioni religiose, pubbliche, teatrali e politiche.",
        "hero_note": "Nel Mediterraneo antico il suono non e un semplice accompagnamento: diventa simbolo di autorita, educazione, rito, spettacolo e identita civica.",
        "chapter_map": [
            "Mesopotamia",
            "antico Egitto",
            "civilta ebraica",
            "Grecia antica",
            "Roma antica",
            "strumenti antichi",
            "musica e teatro",
            "musica e mito",
            "musica e potere",
            "musica pubblica, militare e rituale",
        ],
        "context_text": "Con le grandi civilta storiche la musica entra in istituzioni, religioni, corti, celebrazioni pubbliche e spettacoli. Il Mediterraneo antico offre un primo laboratorio in cui il suono viene pensato come sapere, pratica politica, memoria culturale e forma del rito.",
        "functions_text": "La musica accompagna il culto, il teatro, la guerra, la festa, l'educazione e la rappresentazione del potere. In alcune culture organizza il rapporto con il divino, in altre sostiene la vita pubblica o la retorica della scena.",
        "forms_text": "Inni, canti processionali, salmodie, musica per il teatro, canti militari e pratiche strumentali mostrano una pluralita di funzioni piu che una divisione moderna in generi autonomi.",
        "instruments_text": "Lira, cetra, aulos, sistri, arpe, tamburi, trombe rituali e militari mostrano famiglie strumentali gia riconoscibili e con ruoli sociali specifici.",
        "authors": [
            {
                "name": "Tradizione mesopotamica",
                "work": "inni templari e testimonianze come l'Inno a Nikkal",
                "note": "Le prime scritture legate alla musica mostrano il rapporto stretto tra culto, testo e funzione rituale.",
            },
            {
                "name": "Grecia antica",
                "work": "epitaffio di Seikilos, musica teatrale, ditirambo",
                "note": "Il mondo greco lega la musica a educazione, mito, teatro e riflessione teorica.",
            },
            {
                "name": "Roma antica",
                "work": "musica cerimoniale, militare e scenica",
                "note": "Roma riorganizza e diffonde pratiche sonore collegate a spettacolo, trionfo e vita pubblica.",
            },
        ],
        "listenings": [
            {
                "title": "Ricostruzioni greche e l'Epitaffio di Seikilos",
                "focus": "Cogliere il rapporto tra poesia, metrica e melodia nel mondo greco.",
            },
            {
                "title": "Salmodia e tradizione ebraica",
                "focus": "Riconoscere la forza della parola cantata nella costruzione del rito e della memoria.",
            },
            {
                "title": "Musica per il teatro e il potere",
                "focus": "Osservare come il suono cambi funzione quando accompagna scena, processione o rito pubblico.",
            },
        ],
        "connections": [
            "mito e tragedia",
            "storia delle religioni del Mediterraneo",
            "iconografia degli strumenti antichi",
            "musica come segno di potere e cittadinanza",
        ],
        "lexicon": ["lira", "aulos", "coro", "salmodia", "rito", "teatro"],
        "summary_text": "Il nucleo mostra che la musica, nelle prime grandi civilta storiche, e gia una pratica colta, rituale e politica: entra nel mito, nell'educazione, nella guerra e nella scena.",
        "activities": [
            "costruisci una tabella che confronti Grecia, Roma, Egitto e mondo ebraico",
            "collega strumenti antichi e contesti d'uso",
            "analizza come cambia la funzione del suono tra rito e teatro",
            "sintetizza in una mappa il rapporto tra musica, mito e potere",
        ],
        "spark_question": "Perche nelle civilta antiche la musica non e mai neutra, ma sempre legata a rito, mito o potere?",
        "rotta_text": "La rotta porta dal suono preistorico a culture storiche complesse in cui la musica diventa parte dell'ordine religioso, civile e teatrale.",
        "orecchio_text": "Gli ascolti guidati mettono a confronto parola cantata, funzione pubblica e uso simbolico degli strumenti.",
        "grafo_text": "Il grafo puo partire da quattro poli: rito, mito, teatro e potere, distribuendo sotto ciascuno culture, strumenti e usi sociali.",
        "cantiere_text": "Nel cantiere gli studenti trasformano il capitolo in una mappa comparativa delle civilta del Mediterraneo.",
        "assignment": {
            "scenario": "Il museo scolastico chiede una scheda comparativa sulle musiche del Mediterraneo antico.",
            "task": "Progetta una pagina espositiva che mostri come cambia la funzione della musica tra culto, teatro, guerra e vita pubblica.",
            "product": "una tavola comparativa o una mini-guida museale",
            "audience": "visitatori della mostra o compagni di classe di un biennio",
            "materials": "atlante storico, immagini di strumenti, citazioni da mito e teatro, schede di ascolto",
            "timing": "2 lezioni di laboratorio e 1 di presentazione",
            "steps": [
                "seleziona le culture da confrontare",
                "individua per ciascuna funzioni, strumenti e contesti",
                "ordina i contenuti con categorie comuni",
                "presenta il confronto in una forma chiara e sintetica",
            ],
            "assessment": [
                "accuratezza dei riferimenti storici",
                "capacita di confronto tra civilta",
                "chiarezza visiva del prodotto",
                "uso del lessico disciplinare",
            ],
        },
        "verification": {
            "quick_check": [
                "indica una funzione religiosa e una teatrale della musica antica",
                "nomina due strumenti del Mediterraneo antico",
                "spiega in breve il rapporto tra musica e potere",
            ],
            "comprehension": [
                "che cosa distingue l'uso della musica in Grecia da quello in Roma?",
                "perche la tradizione ebraica e importante nella storia del canto?",
                "quale legame unisce teatro e musica nel mondo antico?",
            ],
            "listening_test": "Dopo un ascolto guidato, distingui se il brano o la ricostruzione richiama un contesto rituale, teatrale o pubblico.",
            "rubric": [
                "sa collegare musica e contesto storico",
                "riconosce strumenti e funzioni principali",
                "espone confronti in modo ordinato",
                "usa esempi pertinenti",
            ],
            "self_eval": [
                "so spiegare perche la musica antica e legata al rito e alla vita pubblica",
                "so distinguere almeno tre culture del Mediterraneo",
                "so usare correttamente il lessico del nucleo",
            ],
            "premium": "Spazio per materiali premium futuri: linee del tempo comparate, mappe iconografiche, prove di ascolto guidate.",
        },
    },
    {
        "number": "03",
        "slug": "dalla-tarda-antichita-al-sacro",
        "title": "Dalla tarda antichita al sacro",
        "nav_title": "Dalla tarda antichita al sacro",
        "category": "Transizione",
        "period": "IV - IX secolo",
        "position": "Nucleo 03 di 10 · la transizione verso il mondo medievale",
        "accent": "#5b67d6",
        "description": "Un passaggio chiave verso nuove comunita di ascolto e di canto.",
        "hero_subtitle": "La musica cambia funzione mentre il mondo antico si trasforma e nasce il paesaggio sonoro del cristianesimo.",
        "hero_note": "Questo nucleo evita il salto brusco tra antico e Medioevo: mostra come nascano liturgia, oralita monastica e prime forme di scrittura del canto.",
        "chapter_map": [
            "tarda antichita",
            "nascita del cristianesimo",
            "canto liturgico",
            "oralita e memoria",
            "monasteri",
            "primi segni musicali",
            "passaggio dalla tradizione orale alla scrittura",
            "preparazione al canto gregoriano",
        ],
        "context_text": "Tra tarda antichita e alto Medioevo la musica passa da un mondo urbano e classico a comunita religiose, monasteri e liturgie in cui il testo sacro diventa centro organizzatore dell'ascolto. E una fase di trasformazione lenta ma decisiva.",
        "functions_text": "La musica serve a pregare, memorizzare, ordinare il rito e creare unita nella comunita religiosa. La voce prevale e il rapporto tra parola e melodia si fa piu stretto.",
        "forms_text": "Salmodia, canto sillabico, formule liturgiche, antifone e risposte corali mostrano un repertorio ancora fluido, fortemente orale ma gia orientato a una maggiore stabilita.",
        "instruments_text": "In questo passaggio la voce domina la scena. Gli strumenti non scompaiono dalla societa, ma il canto sacro tende a privilegiare la parola intonata e la sua memorizzazione.",
        "authors": [
            {
                "name": "Tradizione cristiana antica",
                "work": "salmi, inni, formule liturgiche",
                "note": "Le pratiche musicali si fissano dentro il rito e si diffondono attraverso comunita e luoghi di culto.",
            },
            {
                "name": "Ambrogio e la tradizione innodica",
                "work": "inni per la liturgia",
                "note": "Il canto si lega sempre di piu al testo sacro e a modelli rituali ripetibili.",
            },
            {
                "name": "Monasteri e scuole di canto",
                "work": "memoria orale e primi segni",
                "note": "Il passaggio alla scrittura nasce dall'esigenza di conservare e trasmettere un repertorio comune.",
            },
        ],
        "listenings": [
            {
                "title": "Salmodia e recitazione intonata",
                "focus": "Riconoscere come la parola governi il profilo sonoro e la scansione del canto.",
            },
            {
                "title": "Inno liturgico",
                "focus": "Cogliere la funzione collettiva e memoriale di un repertorio pensato per la comunita.",
            },
            {
                "title": "Canto monodico verso il gregoriano",
                "focus": "Osservare il passaggio da pratiche orali fluide a formule piu stabili e riconoscibili.",
            },
        ],
        "connections": [
            "fine dell'impero romano",
            "nascita delle comunita cristiane",
            "monachesimo e cultura del libro",
            "memoria, oralita e scrittura",
        ],
        "lexicon": ["liturgia", "salmodia", "monodia", "antifona", "oralita", "neuma"],
        "summary_text": "Il nucleo mette a fuoco il momento in cui il canto sacro diventa centro della vita musicale occidentale e prepara la nascita della notazione e del repertorio medievale.",
        "activities": [
            "ricostruisci la linea del tempo tra tarda antichita, monasteri e primi segni musicali",
            "metti a confronto oralita e scrittura del canto",
            "spiega perche la liturgia richiede memoria e ordine",
            "collega nascita del cristianesimo e nuove forme di ascolto comunitario",
        ],
        "spark_question": "Che cosa cambia quando il suono deve custodire un testo sacro e non solo accompagnare un gesto?",
        "rotta_text": "La rotta mostra il passaggio da pratiche antiche plurali a un universo in cui il canto liturgico diventa riferimento ordinatore.",
        "orecchio_text": "Gli ascolti guidati insistono sul rapporto tra parola, linea melodica semplice e funzione rituale del canto.",
        "grafo_text": "Il grafo puo mettere in sequenza tarda antichita, nascita del cristianesimo, monasteri, oralita, neumi e preparazione al gregoriano.",
        "cantiere_text": "Nel cantiere gli studenti distinguono cosa resta orale, cosa tende alla codifica e perche il rito spinge verso una maggiore stabilita musicale.",
        "assignment": {
            "scenario": "La scuola prepara una timeline commentata sul passaggio dal mondo antico al Medioevo musicale.",
            "task": "Realizza una tavola esplicativa che faccia capire perche il canto sacro cambia il modo di ascoltare, memorizzare e trasmettere la musica.",
            "product": "una timeline commentata o un pannello esplicativo con esempi di lessico e ascolto",
            "audience": "visitatori di una mostra di dipartimento o studenti del primo anno",
            "materials": "fonti iconografiche, schede di ascolto, citazioni sul monachesimo, supporti digitali o cartacei",
            "timing": "2 lezioni di lavoro guidato e 1 di restituzione",
            "steps": [
                "definisci i passaggi storici principali",
                "collega ogni passaggio a una funzione musicale",
                "inserisci un esempio di ascolto o di lessico",
                "presenta il materiale in ordine cronologico e chiaro",
            ],
            "assessment": [
                "correttezza della cronologia",
                "chiarezza del nesso tra storia e musica",
                "uso del lessico del nucleo",
                "capacita di sintesi",
            ],
        },
        "verification": {
            "quick_check": [
                "spiega che cosa si intende per oralita del canto",
                "collega monasteri e trasmissione musicale",
                "definisci in breve il passaggio verso i primi segni musicali",
            ],
            "comprehension": [
                "perche la nascita del cristianesimo cambia il paesaggio sonoro?",
                "quale funzione ha il testo nel canto liturgico?",
                "in che senso questo nucleo prepara il gregoriano?",
            ],
            "listening_test": "Ascolta una breve formula liturgica e individua il rapporto tra parola, recitazione e andamento melodico.",
            "rubric": [
                "riconosce il senso storico della transizione",
                "sa usare il lessico di base del canto sacro",
                "collega oralita, memoria e scrittura",
                "espone con ordine cronologico",
            ],
            "self_eval": [
                "so spiegare perche questo nucleo e un passaggio e non un blocco isolato",
                "so distinguere oralita, memoria e notazione",
                "so collegare monasteri, liturgia e canto",
            ],
            "premium": "Spazio per materiali premium futuri: facsimili di neumi, ascolti comparati, schede sul passaggio al gregoriano.",
        },
    },
    {
        "number": "04",
        "slug": "medioevo",
        "title": "Medioevo",
        "nav_title": "Medioevo",
        "category": "Medioevo",
        "period": "IX - XIV secolo",
        "position": "Nucleo 04 di 10 · la musica entra nella scrittura",
        "accent": "#1f7f90",
        "description": "Gregoriano, notazione, prime polifonie e istituzioni del suono scritto.",
        "hero_subtitle": "Nel Medioevo il suono si organizza tra monasteri, cattedrali, corti e piazze.",
        "hero_note": "Questo nucleo rende leggibile la nascita della notazione occidentale e il rapporto tra canto sacro, polifonia iniziale e repertori profani.",
        "chapter_map": [
            "quadro storico del Medioevo",
            "canto gregoriano",
            "neumi",
            "nascita della notazione",
            "musica sacra",
            "prime polifonie",
            "strumenti medievali",
            "trovatori, giullari e menestrelli",
            "musica nei castelli e nelle piazze",
            "canti profani",
        ],
        "context_text": "Il Medioevo musicale costruisce le basi della tradizione occidentale: il canto liturgico si consolida, la notazione prende forma, le cattedrali diventano centri di invenzione polifonica e la musica profana si diffonde tra corti e spazi pubblici.",
        "functions_text": "La musica serve alla liturgia, alla memoria del rito, alla rappresentazione del prestigio cortese, all'intrattenimento e alla circolazione di storie, valori e modelli sociali.",
        "forms_text": "Canto gregoriano, organum, clausula, prime polifonie, canzoni trobadoriche, danze e repertori profani mostrano un panorama in forte trasformazione.",
        "instruments_text": "Viella, arpa, liuto, flauti, salterio, cornamusa, organistrum e percussioni accompagnano repertori sacri e profani con funzioni molto diverse.",
        "authors": [
            {
                "name": "Guido d'Arezzo",
                "work": "sistema di notazione e solmisazione",
                "note": "La riflessione medievale rende piu stabile l'insegnamento e la trasmissione del canto.",
            },
            {
                "name": "Scuola di Notre-Dame",
                "work": "Leoninus, Perotinus e prime grandi polifonie",
                "note": "La cattedrale diventa laboratorio di costruzione sonora e spaziale.",
            },
            {
                "name": "Trovatori e trovieri",
                "work": "canti cortesi e profani",
                "note": "La musica esce dal solo spazio sacro e accompagna poesia, corte e narrazione.",
            },
        ],
        "listenings": [
            {
                "title": "Canto gregoriano",
                "focus": "Cogliere monodia, flusso del testo e funzione rituale della linea melodica.",
            },
            {
                "title": "Organum e prime polifonie",
                "focus": "Riconoscere come la voce multipla cambi la percezione dello spazio sonoro.",
            },
            {
                "title": "Canto profano medievale",
                "focus": "Distinguere il mondo della corte e della piazza dal repertorio liturgico.",
            },
        ],
        "connections": [
            "societa feudale e potere ecclesiastico",
            "cattedrali e cultura del libro",
            "poesia cortese",
            "circolazione orale dei repertori profani",
        ],
        "lexicon": ["gregoriano", "neuma", "organum", "polifonia", "trovatore", "solmisazione"],
        "summary_text": "Il Medioevo musicale fonda la tradizione occidentale su tre pilastri: canto sacro, scrittura musicale e nascita della polifonia, senza perdere la ricchezza del repertorio profano.",
        "activities": [
            "leggi una piccola linea del tempo che unisca gregoriano, notazione e polifonia",
            "metti a confronto musica sacra e musica profana medievale",
            "descrivi le funzioni di monastero, cattedrale e corte",
            "costruisci un lessico minimo del Medioevo musicale",
        ],
        "spark_question": "Perche la storia della musica occidentale cambia davvero quando il suono puo essere scritto?",
        "rotta_text": "La rotta colloca il Medioevo come il momento in cui memoria, liturgia e insegnamento producono sistemi di notazione e nuove forme di costruzione sonora.",
        "orecchio_text": "Gli ascolti guidati mettono in opposizione la linearita del gregoriano, la verticalita della polifonia e la vitalita del repertorio profano.",
        "grafo_text": "Il grafo puo partire da tre poli: monastero, cattedrale, corte; da ciascuno si diramano repertori, strumenti, funzioni e forme.",
        "cantiere_text": "Nel cantiere la classe ordina il capitolo distinguendo contesto, repertorio, innovazione tecnica e circolazione sociale.",
        "assignment": {
            "scenario": "Una mostra scolastica sul Medioevo chiede una sezione dedicata al paesaggio sonoro del periodo.",
            "task": "Progetta una pagina o un pannello che mostri come cambiano luoghi, repertori e funzioni della musica tra monastero, cattedrale, corte e piazza.",
            "product": "un pannello comparativo o una guida commentata ai suoni del Medioevo",
            "audience": "visitatori di una mostra interdisciplinare di storia e arte",
            "materials": "mappe, immagini di codici, ascolti, schede su strumenti medievali, supporti per presentazione",
            "timing": "3 lezioni tra ricerca, progettazione e restituzione",
            "steps": [
                "seleziona quattro luoghi chiave del suono medievale",
                "associa a ciascuno repertori e strumenti",
                "inserisci almeno un ascolto e un termine tecnico per sezione",
                "presenta il prodotto in modo sintetico e leggibile",
            ],
            "assessment": [
                "coerenza storico-musicale",
                "chiarezza dell'organizzazione",
                "uso dei termini tecnici",
                "capacita di spiegare differenze tra sacro e profano",
            ],
        },
        "verification": {
            "quick_check": [
                "definisci in breve che cos'e il gregoriano",
                "spiega a che cosa servono i neumi",
                "indica una differenza tra repertorio sacro e profano",
            ],
            "comprehension": [
                "perche la notazione e decisiva nel Medioevo?",
                "che cosa cambia con la nascita della polifonia?",
                "qual e il ruolo dei trovatori?",
            ],
            "listening_test": "Dopo due ascolti brevi, distingui un brano monodico liturgico da un esempio polifonico o profano.",
            "rubric": [
                "riconosce i nuclei storici del periodo",
                "usa in modo corretto il lessico minimo",
                "sa collegare luoghi, funzioni e repertori",
                "argomenta con esempi chiari",
            ],
            "self_eval": [
                "so spiegare perche il Medioevo e decisivo per la musica scritta",
                "so distinguere gregoriano, polifonia e canto profano",
                "so usare almeno quattro parole chiave del nucleo",
            ],
            "premium": "Spazio per materiali premium futuri: facsimili di codici, prove di ascolto, rubriche docente e schede sugli strumenti.",
        },
    },
    {
        "number": "05",
        "slug": "rinascimento",
        "title": "Rinascimento",
        "nav_title": "Rinascimento",
        "category": "Rinascimento",
        "period": "XV - XVI secolo",
        "position": "Nucleo 05 di 10 · l'umanesimo del suono",
        "accent": "#768a2a",
        "description": "Polifonia, umanesimo, corti e nuova centralita dell'uomo.",
        "hero_subtitle": "Nel Rinascimento la musica si intreccia con l'umanesimo, la stampa e la cultura delle corti.",
        "hero_note": "Il nucleo rende leggibile il nuovo equilibrio tra parola e suono, tra spazio sacro e spazio cortese, tra diffusione a stampa e raffinatezza polifonica.",
        "chapter_map": [
            "quadro storico del Rinascimento",
            "umanesimo",
            "polifonia sacra",
            "scuola franco-fiamminga",
            "Palestrina",
            "Gabrieli",
            "madrigale",
            "musica di corte",
            "musica strumentale e da ballo",
            "stampa musicale",
            "rapporto tra musica e arte",
        ],
        "context_text": "Il Rinascimento ripensa l'uomo, lo spazio e il sapere. Anche la musica riflette questo cambiamento: cresce l'attenzione alla parola, si perfeziona la scrittura polifonica, le corti diventano centri di produzione culturale e la stampa diffonde i repertori.",
        "functions_text": "La musica continua a servire il rito, ma entra con nuova forza anche nella vita di corte, nelle feste, nella danza, nella rappresentazione del prestigio e nell'educazione dell'individuo colto.",
        "forms_text": "Messa, mottetto, madrigale, chanson, musica strumentale da danza e scrittura policorale mostrano un sistema musicale raffinato e fortemente organizzato.",
        "instruments_text": "Liuto, viole, flauti dolci, cornetto, trombone rinascimentale e tastiere entrano nei repertori di corte, nelle cappelle e negli ensemble strumentali.",
        "authors": [
            {
                "name": "Josquin e la scuola franco-fiamminga",
                "work": "mottetti e polifonia imitativa",
                "note": "La scrittura vocale si fa piu architettonica, equilibrata e imitativa.",
            },
            {
                "name": "Giovanni Pierluigi da Palestrina",
                "work": "messa e polifonia sacra",
                "note": "La chiarezza della linea vocale diventa modello per la musica sacra tardo-rinascimentale.",
            },
            {
                "name": "Andrea e Giovanni Gabrieli",
                "work": "scrittura policorale e spazialita sonora",
                "note": "A Venezia la musica dialoga con architettura, cerimonia e splendore urbano.",
            },
        ],
        "listenings": [
            {
                "title": "Polifonia sacra rinascimentale",
                "focus": "Ascoltare equilibrio tra le voci, chiarezza del testo e movimento imitativo.",
            },
            {
                "title": "Madrigale",
                "focus": "Cogliere il rapporto tra parola, espressione e scrittura vocale.",
            },
            {
                "title": "Musica strumentale e da ballo",
                "focus": "Riconoscere la nuova autonomia dello strumentale dentro la cultura di corte.",
            },
        ],
        "connections": [
            "umanesimo e centralita dell'uomo",
            "arte prospettica e ordine dello spazio",
            "corti italiane ed europee",
            "nascita della stampa musicale",
        ],
        "lexicon": ["umanesimo", "imitazione", "madrigale", "mottetto", "policorale", "cappella"],
        "summary_text": "Il Rinascimento musicale organizza il suono come equilibrio di voci, cura della parola e dialogo con arti, corti e nuove tecnologie della diffusione.",
        "activities": [
            "metti in relazione umanesimo, stampa e polifonia",
            "analizza la differenza tra messa, mottetto e madrigale",
            "collega una pagina musicale a una corte o a una citta del periodo",
            "costruisci una mappa dei rapporti tra musica, arte e spazio",
        ],
        "spark_question": "Come cambia la musica quando il centro non e piu solo il rito, ma anche l'uomo, la parola e la vita di corte?",
        "rotta_text": "La rotta mostra un'epoca in cui la musica si fa piu consapevole della forma, del testo e della circolazione culturale.",
        "orecchio_text": "Gli ascolti guidati fanno emergere l'intreccio tra voci, la chiarezza della pronuncia e l'equilibrio della scrittura imitativa.",
        "grafo_text": "Il grafo puo unire umanesimo, corti, stampa, polifonia sacra, madrigale e rapporto tra musica e arti visive.",
        "cantiere_text": "Nel cantiere gli studenti confrontano repertori sacri e profani e individuano gli elementi che rendono il Rinascimento una cultura dell'equilibrio.",
        "assignment": {
            "scenario": "La classe cura una pagina di catalogo per una mostra sul Rinascimento artistico e musicale.",
            "task": "Progetta una scheda che spieghi come la musica rinascimentale si collega a umanesimo, corti, arte e stampa.",
            "product": "una pagina di catalogo o una tavola illustrata con riferimenti sonori",
            "audience": "visitatori di una mostra interdisciplinare scuola-territorio",
            "materials": "riproduzioni di opere d'arte, ascolti, testi brevi, mappe delle corti, strumenti digitali o cartacei",
            "timing": "2 lezioni di ricerca, 1 di impaginazione, 1 di restituzione",
            "steps": [
                "scegli tre nodi del nucleo da collegare",
                "seleziona immagini e ascolti coerenti",
                "scrivi testi sintetici ma precisi",
                "presenta il catalogo spiegando la logica del collegamento",
            ],
            "assessment": [
                "qualita del collegamento interdisciplinare",
                "precisione storico-musicale",
                "chiarezza editoriale",
                "uso appropriato del lessico",
            ],
        },
        "verification": {
            "quick_check": [
                "spiega che cosa significa polifonia imitativa",
                "definisci il madrigale in una frase",
                "indica una novita portata dalla stampa musicale",
            ],
            "comprehension": [
                "perche il Rinascimento e legato all'umanesimo?",
                "quale differenza c'e tra musica di cappella e musica di corte?",
                "come si collega la musica alle arti del periodo?",
            ],
            "listening_test": "Dopo un ascolto breve, individua se prevalgono intreccio vocale, attenzione al testo o carattere di danza.",
            "rubric": [
                "riconosce le idee chiave del periodo",
                "sa collegare musica e contesto culturale",
                "usa il lessico tecnico in modo corretto",
                "espone con sintesi e precisione",
            ],
            "self_eval": [
                "so spiegare il rapporto tra Rinascimento e musica",
                "so distinguere repertori sacri, profani e strumentali",
                "so usare i termini principali del nucleo",
            ],
            "premium": "Spazio per materiali premium futuri: schede su Palestrina e Gabrieli, prove di ascolto, mappe delle corti.",
        },
    },
    {
        "number": "06",
        "slug": "barocco",
        "title": "Barocco",
        "nav_title": "Barocco",
        "category": "Barocco",
        "period": "XVII - prima meta XVIII secolo",
        "position": "Nucleo 06 di 10 · il teatro degli affetti",
        "accent": "#c14f40",
        "description": "Teatro, contrasto, meraviglia e nascita dell'opera moderna.",
        "hero_subtitle": "Il Barocco amplifica il gesto musicale: contrasto, spettacolo e retorica diventano motore dell'ascolto.",
        "hero_note": "Il nucleo fa entrare l'opera, il basso continuo, il concerto e la grande scena degli affetti dentro una stessa cornice culturale.",
        "chapter_map": [
            "quadro storico del Barocco",
            "meraviglia e contrasto",
            "basso continuo",
            "nascita dell'opera",
            "Monteverdi",
            "Vivaldi",
            "Bach",
            "Handel",
            "concerto",
            "musica sacra",
            "strumenti nobili del Barocco",
            "musica e potere",
            "musica e spettacolo",
        ],
        "context_text": "Il Barocco e il tempo della spettacolarita, della retorica, delle corti assolute e dei grandi spazi religiosi. La musica organizza il contrasto, il pathos e la meraviglia attraverso nuove forme che chiedono un ascolto piu drammatico.",
        "functions_text": "La musica rappresenta il potere, commuove, persuade, accompagna il rito, abita il teatro pubblico e celebra la magnificenza delle corti e delle citta.",
        "forms_text": "Opera, oratorio, concerto grosso, concerto solistico, suite, fuga e nuove forme vocali e strumentali definiscono il vocabolario del periodo.",
        "instruments_text": "Violino, clavicembalo, organo, oboe, fagotto, tromba naturale e gruppi di continuo mostrano un'orchestra in espansione e sempre piu differenziata.",
        "authors": [
            {
                "name": "Claudio Monteverdi",
                "work": "opera e drammaturgia musicale",
                "note": "Con Monteverdi la scena diventa luogo privilegiato della nuova espressivita barocca.",
            },
            {
                "name": "Antonio Vivaldi",
                "work": "concerto e scrittura strumentale",
                "note": "Il concerto barocco rende l'ascolto piu dinamico, contrastato e virtuosistico.",
            },
            {
                "name": "Johann Sebastian Bach e George Frideric Handel",
                "work": "fuga, oratorio, musica sacra e teatrale",
                "note": "Due modelli diversi ma complementari della grande sintesi barocca europea.",
            },
        ],
        "listenings": [
            {
                "title": "Aria o scena d'opera",
                "focus": "Riconoscere come il testo venga reso piu teatrale e affettivo dalla musica.",
            },
            {
                "title": "Concerto barocco",
                "focus": "Ascoltare il gioco di contrasti tra solo e tutti, energia ritmica e chiarezza formale.",
            },
            {
                "title": "Fuga o pagina sacra",
                "focus": "Osservare il rapporto tra costruzione rigorosa e tensione espressiva.",
            },
        ],
        "connections": [
            "corti assolute e cerimoniale",
            "chiese barocche e teatralita dello spazio",
            "nascita dei teatri pubblici",
            "retorica, affetti e cultura della meraviglia",
        ],
        "lexicon": ["basso continuo", "concerto", "opera", "affetti", "fuga", "virtuosismo"],
        "summary_text": "Il Barocco porta la musica verso il teatro, il contrasto e la costruzione di forme nuove che fanno della meraviglia e della retorica il cuore dell'esperienza sonora.",
        "activities": [
            "collega meraviglia, potere e spettacolo in una mappa del periodo",
            "metti a confronto opera, concerto e musica sacra barocca",
            "spiega il ruolo del basso continuo",
            "riconosci negli ascolti il principio del contrasto",
        ],
        "spark_question": "Che cosa cambia quando la musica vuole stupire, persuadere e commuovere in modo diretto?",
        "rotta_text": "La rotta colloca il Barocco tra corti, chiese e teatri: spazi diversi che chiedono una musica capace di rappresentare il potere e muovere gli affetti.",
        "orecchio_text": "Gli ascolti guidati insistono su contrasto, tensione ritmica, teatralita del gesto e nascita dell'opera come forma moderna.",
        "grafo_text": "Il grafo puo far convergere affetti, basso continuo, opera, concerto, spettacolo e potere attorno all'idea di meraviglia barocca.",
        "cantiere_text": "Nel cantiere gli studenti confrontano forme e funzioni per capire come uno stesso stile possa abitare teatro, chiesa e sala strumentale.",
        "assignment": {
            "scenario": "Il dipartimento vuole un percorso espositivo sulla nascita dello spettacolo musicale moderno.",
            "task": "Crea una guida introduttiva che spieghi come il Barocco trasforma il suono in teatro, contrasto e rappresentazione del potere.",
            "product": "una guida espositiva o una presentazione audio-commentata",
            "audience": "visitatori di una rassegna scolastica o di un open day",
            "materials": "schede su autori, immagini di teatri e chiese, ascolti di opera e concerto, strumenti di presentazione",
            "timing": "3 lezioni complessive",
            "steps": [
                "seleziona le parole chiave del Barocco",
                "collega ogni parola chiave a un esempio sonoro",
                "organizza un racconto breve ma coerente",
                "presenta il prodotto mettendo in evidenza forma e funzione",
            ],
            "assessment": [
                "coerenza tra concetti e ascolti",
                "precisione del lessico",
                "qualita della sintesi editoriale",
                "capacita di distinguere opera, concerto e musica sacra",
            ],
        },
        "verification": {
            "quick_check": [
                "definisci il basso continuo",
                "spiega in breve perche il Barocco e legato al contrasto",
                "nomina due autori centrali del periodo",
            ],
            "comprehension": [
                "perche l'opera nasce proprio in questo contesto?",
                "quale funzione ha il concerto nell'ascolto barocco?",
                "in che modo la musica rappresenta il potere?",
            ],
            "listening_test": "Distingui, in due ascolti brevi, una scena operistica da un concerto barocco individuando elementi caratteristici.",
            "rubric": [
                "riconosce le forme principali del periodo",
                "sa descrivere contrasto e teatralita",
                "collega autori e generi in modo corretto",
                "espone con chiarezza",
            ],
            "self_eval": [
                "so spiegare il rapporto tra Barocco e spettacolo",
                "so distinguere opera, concerto e fuga",
                "so usare il lessico fondamentale del periodo",
            ],
            "premium": "Spazio per materiali premium futuri: ascolti guidati, mappe sulle forme barocche, schede autore e rubrica docente.",
        },
    },
    {
        "number": "07",
        "slug": "classicismo",
        "title": "Classicismo",
        "nav_title": "Classicismo",
        "category": "Classicismo",
        "period": "Seconda meta XVIII - inizio XIX secolo",
        "position": "Nucleo 07 di 10 · forma e chiarezza nella Vienna musicale",
        "accent": "#2f6fd6",
        "description": "Equilibrio, forma, chiarezza e grande stagione viennese.",
        "hero_subtitle": "Il Classicismo costruisce una musica di architetture leggibili, dialogo formale e chiarezza espressiva.",
        "hero_note": "Il nucleo porta al centro Vienna, forma-sonata, sinfonia, quartetto e il rapporto tra musica, Illuminismo e nuova sfera pubblica.",
        "chapter_map": [
            "quadro storico del Classicismo",
            "Vienna musicale",
            "equilibrio e chiarezza",
            "forma-sonata",
            "sinfonia",
            "quartetto",
            "orchestra classica",
            "Haydn",
            "Mozart",
            "Beethoven",
            "musica e Illuminismo",
            "musica e Rivoluzione francese",
        ],
        "context_text": "Il Classicismo organizza la musica come discorso ordinato e intelligibile. Vienna diventa centro simbolico di una cultura musicale che unisce forma, equilibrio e nascita di una nuova idea di pubblico.",
        "functions_text": "La musica accompagna la vita di corte e di citta, ma si apre anche a un pubblico sempre piu ampio. Diventa spazio di intrattenimento colto, di riflessione formale e di rappresentazione dei valori illuministici.",
        "forms_text": "Forma-sonata, sinfonia, quartetto, concerto classico e sviluppo del teatro musicale definiscono il vocabolario centrale del periodo.",
        "instruments_text": "L'orchestra classica si stabilizza, il fortepiano acquista centralita, archi e fiati dialogano con una chiarezza nuova e piu equilibrata.",
        "authors": [
            {
                "name": "Joseph Haydn",
                "work": "sinfonia e quartetto",
                "note": "Haydn consolida forme e procedure che diventano modello per l'intero periodo.",
            },
            {
                "name": "Wolfgang Amadeus Mozart",
                "work": "opera, concerto, sinfonia, musica da camera",
                "note": "In Mozart chiarezza formale ed espressivita raggiungono una sintesi altissima.",
            },
            {
                "name": "Ludwig van Beethoven",
                "work": "sinfonia, sonata, quartetto",
                "note": "Beethoven eredita il Classicismo e lo spinge verso una nuova intensita espressiva e storica.",
            },
        ],
        "listenings": [
            {
                "title": "Forma-sonata",
                "focus": "Riconoscere esposizione, contrasto tematico, sviluppo e ripresa come logica del discorso musicale.",
            },
            {
                "title": "Sinfonia classica",
                "focus": "Cogliere chiarezza formale, equilibrio tra sezioni e ruolo dell'orchestra.",
            },
            {
                "title": "Quartetto o concerto",
                "focus": "Ascoltare il dialogo tra strumenti come conversazione ordinata e coerente.",
            },
        ],
        "connections": [
            "Illuminismo e fiducia nella ragione",
            "nascita di un pubblico borghese",
            "Vienna come capitale musicale",
            "rivoluzioni politiche e nuova idea di cittadino",
        ],
        "lexicon": ["forma-sonata", "sviluppo", "sinfonia", "quartetto", "fortepiano", "tema"],
        "summary_text": "Il Classicismo costruisce una musica leggibile, proporzionata e argomentativa, in cui forma e ascolto dialogano in modo sempre piu consapevole.",
        "activities": [
            "scompone la forma-sonata in una sequenza visiva essenziale",
            "confronta Haydn, Mozart e Beethoven a partire da un genere comune",
            "collega Vienna, Illuminismo e nuovo pubblico",
            "descrivi come cambia il ruolo dell'orchestra nel periodo",
        ],
        "spark_question": "Come fa la musica a sembrare libera e naturale quando in realta e costruita con una logica cosi rigorosa?",
        "rotta_text": "La rotta mostra un'epoca in cui la musica cerca chiarezza, ordine e intelligibilita, ma si apre anche alla storia e ai cambiamenti del pubblico.",
        "orecchio_text": "Gli ascolti guidati aiutano a sentire il contrasto dei temi, la funzione dello sviluppo e l'equilibrio complessivo della forma.",
        "grafo_text": "Il grafo puo collegare Vienna, forma-sonata, orchestra, quartetto, Illuminismo e Rivoluzione come nodi di una stessa trasformazione culturale.",
        "cantiere_text": "Nel cantiere gli studenti traducono la logica formale del brano in schemi semplici, utili a leggere sinfonia, quartetto e sonata.",
        "assignment": {
            "scenario": "Per una guida all'ascolto scolastica serve una pagina chiara sulla musica classica viennese.",
            "task": "Costruisci una scheda che spieghi in modo accessibile come funzionano forma-sonata, sinfonia e quartetto dentro il contesto del Classicismo.",
            "product": "una guida all'ascolto o una infografica ragionata",
            "audience": "studenti del biennio o pubblico dell'open day",
            "materials": "partiture semplificate, ascolti, linea del tempo, software di presentazione o cartellone",
            "timing": "2 lezioni di elaborazione e 1 di restituzione",
            "steps": [
                "scegli un brano modello",
                "estrai la logica formale principale",
                "collega il brano al contesto storico e culturale",
                "presenta il percorso con un linguaggio chiaro e preciso",
            ],
            "assessment": [
                "comprensione della forma",
                "chiarezza espositiva",
                "correttezza del linguaggio tecnico",
                "capacita di collegare musica e contesto",
            ],
        },
        "verification": {
            "quick_check": [
                "definisci la forma-sonata",
                "indica due generi centrali del Classicismo",
                "spiega in breve perche Vienna e importante",
            ],
            "comprehension": [
                "che rapporto c'e tra musica classica e Illuminismo?",
                "perche il quartetto e un genere emblematico del periodo?",
                "come cambia Beethoven il linguaggio classico?",
            ],
            "listening_test": "Dopo un ascolto, individua tema, contrasto e ritorno, spiegando se il brano rimanda alla logica classica.",
            "rubric": [
                "riconosce le forme principali",
                "sa collegare brano e contesto",
                "usa il lessico specifico in modo corretto",
                "argomenta con ordine",
            ],
            "self_eval": [
                "so spiegare la logica della forma-sonata",
                "so distinguere sinfonia, quartetto e concerto classico",
                "so collegare Vienna e Illuminismo al nucleo",
            ],
            "premium": "Spazio per materiali premium futuri: schemi della forma-sonata, ascolti guidati, mappe su Vienna e autori.",
        },
    },
    {
        "number": "08",
        "slug": "romanticismo",
        "title": "Romanticismo e secondo Ottocento",
        "nav_title": "Romanticismo e secondo Ottocento",
        "category": "Romanticismo",
        "period": "XIX secolo e secondo Ottocento europeo",
        "position": "Nucleo 08 di 10 · io, nazione e grande orchestra",
        "accent": "#a94d87",
        "description": "Io, emozione, pianoforte, orchestra, opera e nazioni.",
        "hero_subtitle": "La musica romantica mette al centro soggettivita, racconto, virtuosismo e identita collettive.",
        "hero_note": "Il nucleo tiene insieme primo Romanticismo, secondo Ottocento, opera italiana, nazionalismi e scuole europee, evitando una frammentazione artificiale.",
        "chapter_map": [
            "quadro storico del Romanticismo",
            "espressione dell'io",
            "Lied",
            "pianoforte romantico",
            "virtuosismo",
            "poema sinfonico",
            "orchestra romantica",
            "opera italiana",
            "Verdi",
            "Wagner",
            "nazionalismi musicali",
            "folklore",
            "scuole nazionali",
            "Russia ed Europa del Nord",
            "secondo Ottocento",
        ],
        "context_text": "Il Romanticismo lega la musica all'interiorita, alla letteratura, al paesaggio, alla memoria e alle identita nazionali. Nel secondo Ottocento l'orchestra cresce, l'opera si trasforma e le scuole nazionali ridefiniscono il panorama europeo.",
        "functions_text": "La musica esprime l'io, costruisce immaginari, rappresenta la nazione, abita il teatro, alimenta il virtuosismo pubblico e diventa strumento di identita culturale.",
        "forms_text": "Lied, pezzo pianistico, poema sinfonico, grande sinfonismo, opera italiana e teatro musicale wagneriano convivono in un panorama ampio e molto differenziato.",
        "instruments_text": "Il pianoforte diventa protagonista, l'orchestra si espande per timbri e dimensioni, gli strumenti a fiato acquistano nuovo peso e il teatro musicale rinnova le proprie risorse sonore.",
        "authors": [
            {
                "name": "Franz Schubert e il Lied",
                "work": "canto e pianoforte come racconto interiore",
                "note": "Il Lied rende centrale il rapporto tra poesia, voce e accompagnamento.",
            },
            {
                "name": "Giuseppe Verdi e Richard Wagner",
                "work": "opera italiana e teatro musicale tedesco",
                "note": "Due modelli opposti e complementari della scena romantica europea.",
            },
            {
                "name": "Chopin, Liszt e le scuole nazionali",
                "work": "pianoforte, virtuosismo, identita nazionali",
                "note": "Il pianoforte e la nazione diventano luoghi privilegiati dell'immaginario romantico.",
            },
        ],
        "listenings": [
            {
                "title": "Lied o pagina pianistica",
                "focus": "Cogliere il rapporto tra espressione dell'io, poesia e timbro del pianoforte.",
            },
            {
                "title": "Opera romantica",
                "focus": "Ascoltare come voce, orchestra e dramma costruiscono caratteri e conflitti.",
            },
            {
                "title": "Orchestra romantica e poema sinfonico",
                "focus": "Riconoscere espansione timbrica, racconto e tensione narrativa.",
            },
        ],
        "connections": [
            "letteratura romantica e paesaggio interiore",
            "nazionalismi e costruzione delle identita",
            "teatri d'opera e pubblico borghese",
            "secondo Ottocento tra industria e mito della nazione",
        ],
        "lexicon": ["Lied", "virtuosismo", "poema sinfonico", "leitmotiv", "nazionalismo", "folklore"],
        "summary_text": "Il Romanticismo musicale allarga il raggio della musica: la rende linguaggio dell'io, delle nazioni, del teatro e della grande orchestra moderna.",
        "activities": [
            "confronta Lied, opera e poema sinfonico come modi diversi di raccontare",
            "collega il pianoforte romantico all'idea di soggettivita",
            "mappa scuole nazionali e aree europee",
            "spiega come cambia l'orchestra tra primo e secondo Ottocento",
        ],
        "spark_question": "Perche nell'Ottocento la musica sembra poter dire insieme l'io piu intimo e l'identita di un intero popolo?",
        "rotta_text": "La rotta attraversa l'intero Ottocento musicale, mettendo in relazione soggettivita, teatro, virtuosisimo e costruzione delle nazioni.",
        "orecchio_text": "Gli ascolti guidati fanno emergere voce individuale, ruolo del pianoforte, espansione dell'orchestra e forza narrativa dell'opera.",
        "grafo_text": "Il grafo puo unire io, pianoforte, opera, orchestra, folklore e nazione come assi di lettura del secolo.",
        "cantiere_text": "Nel cantiere gli studenti confrontano forme e autori per capire come il Romanticismo cambi sia l'ascolto privato sia la dimensione pubblica della musica.",
        "assignment": {
            "scenario": "Per una rassegna sull'Ottocento europeo serve una guida che spieghi l'immaginario musicale del secolo.",
            "task": "Progetta un percorso sintetico che metta in relazione pianoforte, opera, orchestra e nazionalismi musicali.",
            "product": "una guida di sala o una timeline commentata del Romanticismo musicale",
            "audience": "pubblico di una giornata culturale o compagni di classe",
            "materials": "ascolti, testi poetici, immagini di teatri, mappe europee, strumenti digitali o cartacei",
            "timing": "3 lezioni tra ricerca, organizzazione e restituzione",
            "steps": [
                "scegli quattro nodi del secolo da raccontare",
                "associa a ciascuno un autore o un brano",
                "organizza il percorso in modo cronologico e tematico",
                "presenta il materiale usando lessico e ascolti appropriati",
            ],
            "assessment": [
                "coerenza storica del percorso",
                "capacita di collegare forme e contesti",
                "chiarezza della presentazione",
                "pertinenza degli esempi scelti",
            ],
        },
        "verification": {
            "quick_check": [
                "definisci il Lied",
                "spiega in una frase che cosa si intende per nazionalismo musicale",
                "indica due caratteri dell'orchestra romantica",
            ],
            "comprehension": [
                "perche il pianoforte e centrale nel Romanticismo?",
                "quale differenza principale c'e tra Verdi e Wagner?",
                "come entra il folklore nella musica colta ottocentesca?",
            ],
            "listening_test": "Dopo due ascolti, distingui un brano vocale da uno orchestrale spiegando quali elementi rimandano al linguaggio romantico.",
            "rubric": [
                "riconosce le forme principali del periodo",
                "sa collegare autori e idee del secolo",
                "usa in modo corretto il lessico specifico",
                "argomenta con esempi chiari e pertinenti",
            ],
            "self_eval": [
                "so spiegare il rapporto tra io, nazione e musica",
                "so distinguere almeno tre generi dell'Ottocento musicale",
                "so collocare alcuni autori chiave nel percorso",
            ],
            "premium": "Spazio per materiali premium futuri: mappe dei nazionalismi, prove di ascolto, dossier su opera e pianoforte romantico.",
        },
    },
    {
        "number": "09",
        "slug": "novecento-delle-rivoluzioni",
        "title": "Novecento delle rivoluzioni",
        "nav_title": "Novecento delle rivoluzioni",
        "category": "Novecento",
        "period": "Primo Novecento - secondo dopoguerra",
        "position": "Nucleo 09 di 10 · fratture, media e nuovi linguaggi",
        "accent": "#7057c9",
        "description": "Avanguardie, nuove sonorita, cinema, jazz e fratture del linguaggio.",
        "hero_subtitle": "Il Novecento rompe gli equilibri precedenti e moltiplica i modi di pensare il suono.",
        "hero_note": "Il nucleo mette insieme impressionismo, avanguardie, jazz, guerra, cinema e nuovi media per far capire che il Novecento non e un solo stile ma un campo di svolte.",
        "chapter_map": [
            "quadro storico del Novecento",
            "impressionismo",
            "Debussy",
            "Ravel",
            "Puccini",
            "futurismo",
            "avanguardie",
            "Schonberg",
            "Stravinskij",
            "Bartok",
            "jazz",
            "Gershwin",
            "musica e guerra",
            "orchestra moderna",
            "cinema e colonne sonore",
            "nuove frontiere del linguaggio musicale",
        ],
        "context_text": "Il Novecento e segnato da guerre, rivoluzioni tecnologiche, nuovi media e profondi cambiamenti del gusto. La musica non segue una sola strada: sperimenta timbri, sistemi, ritmi, rapporti con il corpo, con il cinema e con l'industria culturale.",
        "functions_text": "La musica del secolo puo essere ricerca radicale, intrattenimento, critica del passato, linguaggio di massa, colonna sonora della modernita o risposta alle fratture storiche del tempo.",
        "forms_text": "Balletto modernista, impressionismo orchestrale, atonalita, serialismo, jazz, canzone colta, colonna sonora e scritture ibride ridefiniscono le categorie precedenti.",
        "instruments_text": "L'orchestra moderna si espande per timbri e percussioni, il pianoforte assume ruoli nuovi, compaiono tecnologie di registrazione e l'universo sonoro si apre a strumenti e dispositivi non tradizionali.",
        "authors": [
            {
                "name": "Debussy e Ravel",
                "work": "nuovi colori, impressionismo e raffinatezza timbrica",
                "note": "Il timbro diventa un modo diverso di pensare lo spazio e la forma musicale.",
            },
            {
                "name": "Schonberg, Stravinskij, Bartok",
                "work": "avanguardie, ritmo, serialita, folklore reinventato",
                "note": "Tre percorsi diversi dentro la rivoluzione del linguaggio novecentesco.",
            },
            {
                "name": "Gershwin, Puccini e il cinema",
                "work": "contaminazioni, teatro, jazz, colonne sonore",
                "note": "Il Novecento mette in dialogo musica colta, popular music e nuovi media.",
            },
        ],
        "listenings": [
            {
                "title": "Colore e impressionismo",
                "focus": "Riconoscere il peso del timbro, delle sfumature armoniche e dell'atmosfera sonora.",
            },
            {
                "title": "Ritmo e frattura modernista",
                "focus": "Cogliere violenza ritmica, discontinuita e nuove strategie costruttive.",
            },
            {
                "title": "Jazz, teatro e cinema",
                "focus": "Osservare come il Novecento allunghi la musica verso scena, immagini e industria culturale.",
            },
        ],
        "connections": [
            "guerre mondiali e crisi della modernita",
            "avanguardie artistiche",
            "nascita del cinema sonoro",
            "urbanizzazione, radio e industria culturale",
        ],
        "lexicon": ["impressionismo", "atonalita", "avanguardia", "jazz", "colonna sonora", "timbro"],
        "summary_text": "Il Novecento rompe l'idea di un linguaggio unitario e apre una costellazione di strade: timbro, ritmo, media, jazz, avanguardia e cinema ridefiniscono la musica.",
        "activities": [
            "metti in sequenza le principali fratture del secolo",
            "collega guerra, tecnologia e nuovi linguaggi",
            "confronta avanguardia, jazz e musica per il cinema",
            "mappa i diversi modi in cui il Novecento ripensa orchestra e ascolto",
        ],
        "spark_question": "Che cosa succede alla musica quando il Novecento mette in crisi le regole con cui l'Occidente aveva ascoltato fino a quel momento?",
        "rotta_text": "La rotta mostra il secolo come campo di rivoluzioni simultanee: estetiche, politiche, tecnologiche e mediatiche.",
        "orecchio_text": "Gli ascolti guidati permettono di cogliere colore, frattura ritmica, nuova idea di timbro e contaminazione tra mondi sonori.",
        "grafo_text": "Il grafo puo organizzare il secolo attorno a sei nodi: colore, ritmo, avanguardia, jazz, guerra, media.",
        "cantiere_text": "Nel cantiere la classe confronta linee diverse del Novecento per evitare l'idea semplificata di un unico stile novecentesco.",
        "assignment": {
            "scenario": "La redazione del sito di istituto vuole una guida introduttiva al Novecento musicale.",
            "task": "Prepara una pagina sintetica che spieghi perche il Novecento e un secolo di rivoluzioni sonore e mediatiche.",
            "product": "una pagina web, una scheda redazionale o una timeline ragionata",
            "audience": "lettori del sito scolastico o pubblico di una giornata di orientamento",
            "materials": "ascolti, immagini di avanguardie, spezzoni di cinema, mappe storiche e supporti digitali",
            "timing": "3 lezioni tra analisi, scrittura e pubblicazione",
            "steps": [
                "scegli le rivoluzioni principali del nucleo",
                "collega ogni rivoluzione a un autore o a un ascolto",
                "ordina i materiali con una logica leggibile",
                "pubblica o presenta il percorso in modo chiaro",
            ],
            "assessment": [
                "capacita di sintesi di un secolo complesso",
                "pertinenza degli esempi scelti",
                "chiarezza del racconto editoriale",
                "uso corretto del lessico tecnico",
            ],
        },
        "verification": {
            "quick_check": [
                "definisci in breve che cosa si intende per avanguardia musicale",
                "indica due novita del Novecento rispetto all'Ottocento",
                "spiega il rapporto tra cinema e musica",
            ],
            "comprehension": [
                "perche il Novecento non puo essere ridotto a un solo stile?",
                "che cosa cambia nell'uso del timbro?",
                "in che modo il jazz entra nella storia della musica del secolo?",
            ],
            "listening_test": "Ascolta due frammenti e spiega quali indizi rimandano a impressionismo, modernismo o musica per immagini.",
            "rubric": [
                "riconosce le grandi linee del secolo",
                "sa collegare musica e media",
                "usa il lessico tecnico con proprieta",
                "espone con ordine e selezione dei contenuti",
            ],
            "self_eval": [
                "so spiegare perche il Novecento e plurale",
                "so collegare almeno tre rivoluzioni del secolo",
                "so riconoscere timbro, ritmo e media come parole chiave",
            ],
            "premium": "Spazio per materiali premium futuri: dossier sulle avanguardie, schede jazz, ascolti guidati per il docente.",
        },
    },
    {
        "number": "10",
        "slug": "musica-contemporanea",
        "title": "Musica contemporanea e culture globali",
        "nav_title": "Musica contemporanea e culture globali",
        "category": "Oggi",
        "period": "Fine Novecento - oggi",
        "position": "Nucleo 10 di 10 · la storia entra nel presente",
        "accent": "#2f8c63",
        "description": "Media, popular music, culture del mondo e produzione digitale.",
        "hero_subtitle": "Il nucleo finale collega la storia della musica ai linguaggi che oggi circolano tra media, streaming e produzione digitale.",
        "hero_note": "Qui la timeline non si chiude: si apre al presente, alla popular music, alle musiche del mondo, alla tecnologia e alle contaminazioni globali.",
        "chapter_map": [
            "popular music",
            "canzone italiana",
            "musica leggera",
            "musica elettronica",
            "musica e pubblicita",
            "musica e fumetto",
            "videoclip",
            "streaming",
            "produzione digitale",
            "AI musicale",
            "musiche dal mondo",
            "Africa",
            "Asia",
            "America",
            "Europa orientale e Balcani",
            "contaminazioni globali",
        ],
        "context_text": "Nel presente la musica si produce, circola e si ascolta attraverso media globali, piattaforme digitali, strumenti software e reti di contaminazione continua. La distinzione tra colto, popular e audiovisivo si fa piu mobile e porosa.",
        "functions_text": "La musica accompagna identita, mercato, socialita, racconto audiovisivo, pubblicita, gioco, attivismo e auto-produzione. E insieme prodotto culturale, pratica quotidiana e spazio di sperimentazione tecnologica.",
        "forms_text": "Canzone, album, playlist, beat, remix, colonna sonora seriale, videoclip, set elettronico e produzioni ibride convivono con musiche dal mondo e pratiche di contaminazione globale.",
        "instruments_text": "Accanto agli strumenti tradizionali entrano computer, software, campionatori, sintetizzatori, controller, smartphone e ambienti di produzione digitale accessibili anche in forma domestica.",
        "authors": [
            {
                "name": "Popular music e canzone italiana",
                "work": "autori, band, cantautori, pop e musica leggera",
                "note": "La canzone resta uno dei luoghi centrali in cui testo, identita e mercato si incontrano.",
            },
            {
                "name": "Pionieri dell'elettronica e producer culture",
                "work": "sintesi, beat, remix, studio come strumento",
                "note": "La tecnologia non accompagna soltanto la musica: ne ridefinisce scrittura, timbro e circolazione.",
            },
            {
                "name": "Culture globali e musiche dal mondo",
                "work": "Africa, Asia, America, Balcani e contaminazioni",
                "note": "Il presente e fatto di incontri, ibridazioni e traiettorie transnazionali.",
            },
        ],
        "listenings": [
            {
                "title": "Popular music e canzone",
                "focus": "Riconoscere forma-canzone, produzione, relazione tra testo e identita collettiva.",
            },
            {
                "title": "Elettronica e produzione digitale",
                "focus": "Cogliere il ruolo del beat, del campionamento, della sintesi e dello studio come strumento creativo.",
            },
            {
                "title": "Musiche globali e contaminazioni",
                "focus": "Osservare come strumenti, scale, ritmi e pratiche culturali si incontrino nel presente.",
            },
        ],
        "connections": [
            "media digitali e piattaforme di streaming",
            "pubblicita, videogiochi, fumetto e serialita",
            "globalizzazione culturale",
            "AI musicale e nuove pratiche di produzione",
        ],
        "lexicon": ["playlist", "sampling", "sintesi", "streaming", "remix", "global music"],
        "summary_text": "Il nucleo finale collega la storia della musica al presente: tecnologie, globalizzazione e media cambiano il modo di produrre, distribuire e ascoltare il suono.",
        "activities": [
            "analizza come cambia la musica tra supporto fisico, videoclip e streaming",
            "metti a confronto canzone, musica elettronica e musiche dal mondo",
            "costruisci una mappa delle contaminazioni globali",
            "discuti in modo argomentato opportunita e limiti dell'AI musicale",
        ],
        "spark_question": "Se oggi la musica circola ovunque e si produce anche con un laptop, che cosa resta costante della sua storia e che cosa cambia radicalmente?",
        "rotta_text": "La rotta porta il percorso storico dentro il presente, mostrando continuita e rotture tra tradizione, media, globalizzazione e produzione digitale.",
        "orecchio_text": "Gli ascolti guidati aiutano a distinguere forma-canzone, produzione elettronica e ibridazioni globali senza perdere il senso storico del percorso.",
        "grafo_text": "Il grafo puo mettere in relazione media, produzione, piattaforme, popular music, musiche dal mondo e AI come nodi di un ecosistema contemporaneo.",
        "cantiere_text": "Nel cantiere gli studenti confrontano pratiche di ascolto e produzione di oggi con le logiche studiate nei nuclei precedenti.",
        "assignment": {
            "scenario": "Il sito di istituto apre una sezione dedicata agli ascolti del presente e chiede una guida consapevole per orientarsi.",
            "task": "Progetta un percorso che colleghi media, streaming, popular music, musiche globali e produzione digitale in modo critico e leggibile.",
            "product": "una playlist commentata, una pagina web o una mini guida per l'ascolto contemporaneo",
            "audience": "studenti dell'istituto e famiglie durante un evento pubblico",
            "materials": "piattaforme di ascolto, immagini, testi brevi, esempi da pubblicita, videoclip e produzione digitale",
            "timing": "3 lezioni tra selezione, scrittura e pubblicazione",
            "steps": [
                "scegli un asse di lettura del presente",
                "seleziona esempi sonori e mediali coerenti",
                "scrivi commenti critici brevi ma chiari",
                "presenta il percorso mettendo in evidenza continuita e novita storiche",
            ],
            "assessment": [
                "qualita della selezione degli esempi",
                "consapevolezza critica sui media contemporanei",
                "chiarezza editoriale del prodotto",
                "capacita di collegare presente e storia",
            ],
        },
        "verification": {
            "quick_check": [
                "spiega che cosa si intende per produzione digitale",
                "indica una differenza tra streaming e supporto fisico",
                "definisci in breve che cosa significa contaminazione globale",
            ],
            "comprehension": [
                "perche la popular music e centrale nel presente?",
                "quale ruolo ha la tecnologia nella scrittura musicale contemporanea?",
                "come si inserisce l'AI musicale nel dibattito odierno?",
            ],
            "listening_test": "Dopo tre esempi brevi, individua quale brano richiama forma-canzone, produzione elettronica o contaminazione globale e motivane la scelta.",
            "rubric": [
                "sa leggere criticamente il presente musicale",
                "usa il lessico contemporaneo con precisione",
                "collega media, produzione e ascolto",
                "argomenta con esempi pertinenti",
            ],
            "self_eval": [
                "so collegare la storia della musica agli ascolti di oggi",
                "so distinguere alcune pratiche della produzione digitale",
                "so discutere in modo critico piattaforme e media musicali",
            ],
            "premium": "Spazio per materiali premium futuri: playlist guidate, schede docente su media e AI, rubriche per compiti di realta.",
        },
    },
]

LESSON_IMAGE_ROOT = "../../../../assets/lesson/corpo-voce-gesto"
LESSON_IMAGE_HANDS = f"{LESSON_IMAGE_ROOT}/hands-clapping.jpg"
LESSON_IMAGE_LASCAUX = f"{LESSON_IMAGE_ROOT}/lascaux-painting.jpg"
LESSON_IMAGE_FLUTE = f"{LESSON_IMAGE_ROOT}/divje-babe-flute.jpg"
LESSON_CREDIT_HANDS = "Foto: Evan-Amos / Wikimedia Commons · CC BY-SA 3.0"
LESSON_CREDIT_LASCAUX = "Foto: Prof saxx / Wikimedia Commons · CC BY-SA 3.0"
LESSON_CREDIT_FLUTE = "Foto: Thilo Parg / Wikimedia Commons · CC BY-SA 3.0"


ORIGINI_TOPIC_MAP = {
    "eyebrow": "Mappa degli argomenti",
    "intro": "Qui puoi muoverti tra pochi temi chiave e collegarli tra loro. Ogni tappa ti aiuta a capire come corpo, suono, rito e strumenti costruiscono le origini della musica.",
    "nodes": [
        {
            "number": "01",
            "slug": "ritmo-pulsazione-tempo",
            "title": "Ritmo, pulsazione e tempo",
            "subtitle": "Misurare il gesto collettivo",
            "label": "Fondamenti",
            "x": 12,
            "y": 22,
            "summary": "Il ritmo nasce dall'organizzazione del movimento e rende condivisibile il tempo del gruppo.",
            "phases": {
                "scintilla": {
                    "title": "Ascoltare quello che c'e gia",
                    "body": "La partenza e diretta: respiro, mani, piedi, voce e aula sono gia materiali sonori, ma diventano musicali solo quando li scegli e li controlli.",
                },
                "rotta": {
                    "title": "Lo stesso suono cambia significato",
                    "body": "La stessa sorgente puo sembrare attesa, fuga, distanza o tensione se cambia gesto, intensita, durata e rapporto con il silenzio.",
                },
                "orecchio": {
                    "title": "Dalla sorgente alla scena",
                    "body": "Corpo, voce, gesto e silenzio vengono organizzati per capire come un suono possa aprire, accompagnare, interrompere o chiudere una scena sonora.",
                },
                "grafo": {
                    "title": "Corpo, voce, gesto, silenzio, forma",
                    "body": "La mappa visiva mette in relazione materiali, intenzione e struttura della scena.",
                },
                "cantiere": {
                    "title": "Progettare una scena sonora",
                    "body": "Il gruppo sceglie una situazione e decide sorgenti, tensione, silenzio, inizio e chiusura senza usare strumenti o parole riconoscibili.",
                },
                "varco": {
                    "title": "Comporre senza strumenti",
                    "body": "La produzione rende stabile la scena e la fissa in una partitura grafica essenziale.",
                },
                "ribalta": {
                    "title": "Ascolto cieco",
                    "body": "Prima si ascolta la scena senza titolo, poi si verifica che cosa arriva davvero agli altri.",
                },
                "specchio": {
                    "title": "Rendere riconoscibile una scelta",
                    "body": "La fase finale controlla forma, ascolto reciproco, uso del silenzio e chiarezza espressiva.",
                },
            },
            "lesson": {
                "panel_only": True,
                "immersive_preview": True,
                "immersive_stylesheet": "../../../../css/lesson-immersive.css",
                "immersive_module": "../../../../components/RitmoPulsazioneTempoLesson.module.js",
                "author": "Lezione di Amedeo Mamone",
                "description": "Trovi un battito comune con il corpo, ascolti come tornano gli accenti e capisci che cosa cambia tra pulsazione, ritmo, tempo e metro.",
                "classroom": "Prima secondaria di primo grado",
                "duration": "2 ore",
                "spaces": "Aula musica, palestra, auditorium o aula con banchi spostabili",
                "historical_range": "Preistoria sonora · circa 40.000-10.000 a.C.",
                "materials_text": "LIM o proiettore, casse audio, fogli A4, pennarelli, post-it, smartphone o tablet per registrare brevi sequenze, eventuale lavagna digitale.",
                "overview_cards": [
                    {
                        "label": "Focus",
                        "title": "Scena sonora",
                        "body": "Corpo, voce, gesto e silenzio non servono a tenere un tempo comune, ma a far percepire una situazione.",
                    },
                    {
                        "label": "Che cosa fai",
                        "title": "Ascolta, trasforma, progetta",
                        "body": "Parti da un suono semplice, lo cambi di significato e lo organizzi con il gruppo dentro una forma breve.",
                    },
                    {
                        "label": "Alla fine",
                        "title": "Forma, segni, ascolto cieco",
                        "body": "Ogni gruppo presenta una scena sonora riconoscibile e la fissa in una partitura grafica essenziale.",
                    },
                ],
                "default_phase": "scintilla",
                "phases": {
                    "scintilla": {
                        "nav_subtitle": "Domanda iniziale",
                        "panel_title": "SCINTILLA",
                        "panel_subtitle": "Possiamo fare musica senza strumenti?",
                        "objective": "Attivare la curiosita degli studenti e far emergere l'idea che il suono musicale non nasce necessariamente da uno strumento, ma da un gesto intenzionale.",
                        "teacher_activity": "Chiedo alla classe di restare in silenzio per 30 secondi. Poi domando: \"Che cosa avete sentito?\". Raccolgo le risposte alla lavagna in tre colonne: corpo, ambiente, intenzione.",
                        "student_activity": "Gli studenti ascoltano il silenzio dell'aula, individuano suoni interni ed esterni, distinguono suoni casuali e suoni prodotti volontariamente.",
                        "materials": ["Lavagna", "LIM o foglio condiviso"],
                        "output": "Una prima mappa di parole: respiro, passi, sedie, mani, voce, rumore, ritmo, gesto, intenzione.",
                        "student_view": {
                            "mission": "Apriamo l'orecchio al silenzio e capiamo che anche il corpo e l'ambiente possono diventare materiali di ascolto.",
                            "task": "Restiamo in silenzio per 30 secondi. Poi ascoltiamo tutto cio che ci circonda e raccogliamo insieme i suoni che appartengono al corpo, all'ambiente e ai gesti intenzionali.",
                            "in_class": "Ascoltiamo il silenzio dell'aula, individuiamo suoni interni ed esterni e proviamo a distinguere cio che accade per caso da cio che nasce da una scelta.",
                            "observe": [
                                "quali suoni arrivano dal nostro corpo",
                                "quali suoni arrivano dall'ambiente",
                                "quando un suono sembra intenzionale",
                                "quali parole ci aiutano a descrivere quello che sentiamo",
                            ],
                            "questions": [
                                "Che cosa abbiamo sentito per primo?",
                                "Quali suoni sembravano casuali?",
                                "Quali suoni sembravano scelti o controllati?",
                            ],
                            "keywords": ["silenzio", "ascolto", "corpo", "ambiente"],
                            "remember": "Un suono diventa musicale quando qualcuno lo ascolta, lo sceglie, lo organizza e lo condivide.",
                        },
                        "details": [
                            {
                                "label": "Testo da mostrare",
                                "kind": "quote",
                                "text": "Un suono diventa musicale quando qualcuno lo ascolta, lo sceglie, lo organizza e lo condivide.",
                            }
                        ],
                    },
                    "rotta": {
                        "nav_subtitle": "Contesto storico",
                        "panel_title": "ROTTA",
                        "panel_subtitle": "Prima degli strumenti, il corpo",
                        "meta": ["circa 40.000-10.000 a.C.", "Divje Babe: circa 50.000 a.C. · ipotesi discussa"],
                        "objective": "Collocare la lezione all'inizio del percorso storico, mostrando che corpo, voce e gesto precedono gli strumenti musicali organizzati.",
                        "teacher_activity": "Introduco il tema: prima degli strumenti, l'essere umano possiede gia mezzi sonori naturali. Il corpo batte, cammina, respira; la voce chiama, imita, comunica; il gesto coordina il gruppo.",
                        "student_activity": "Gli studenti osservano immagini e rispondono a domande guidate: che cosa fa il corpo? Che cosa comunica il gesto? In quali situazioni il suono puo servire a un gruppo?",
                        "materials": [
                            "Pittura rupestre o scena rituale",
                            "Immagine di flauto osseo o strumento naturale antico",
                            "Grafica originale: Il corpo come primo strumento",
                        ],
                        "output": "Gli studenti comprendono che la musica nasce anche da funzioni sociali: comunicare, coordinarsi, accompagnare, danzare, celebrare, ricordare.",
                        "student_view": {
                            "mission": "Colleghiamo corpo, voce e gesto alle origini della musica e capiamo che il suono nasce dentro una vita di gruppo, nella lunga preistoria sonora tra circa 40.000 e 10.000 a.C.",
                            "task": "Prima della scrittura musicale e degli strumenti complessi, gli esseri umani usavano corpo, voce e gesto per comunicare, accompagnare il lavoro, imitare la natura, celebrare riti, danzare e stare insieme.",
                            "in_class": "Guardiamo i materiali visivi, descriviamo cio che vediamo e proviamo a dire in quali situazioni il suono puo aiutare un gruppo a muoversi, ricordare o celebrare. Usiamo anche due riferimenti temporali orientativi: la preistoria sonora tra circa 40.000 e 10.000 a.C. e il reperto di Divje Babe spesso collocato attorno al 50.000 a.C., con interpretazioni ancora discusse.",
                            "observe": [
                                "come il corpo produce suono senza strumenti complessi",
                                "quali gesti sembrano collettivi",
                                "quali suoni ricordano lavoro, rito o danza",
                                "come il gruppo trasforma il gesto in musica",
                            ],
                            "questions": [
                                "Perche il corpo puo essere il primo strumento?",
                                "Che cosa comunica un gesto sonoro?",
                                "In quali momenti il suono serve a una comunita?",
                            ],
                            "keywords": ["origine", "rito", "voce", "gesto", "comunita"],
                            "remember": "Non possiamo sapere con certezza quale sia stato il primo gesto musicale, ma possiamo osservare che corpo, voce e gesto sono i primi mezzi con cui l'essere umano ha dato forma al suono.",
                            "gallery": [
                                {
                                    "label": "Immagine guida",
                                    "title": "Pittura rupestre e movimento",
                                    "caption": "Figure in azione, cerchi, caccia o danza aiutano a discutere il rapporto tra gesto, gruppo e funzione del suono.",
                                    "src": LESSON_IMAGE_LASCAUX,
                                    "alt": "Pittura rupestre di Lascaux",
                                    "credit": LESSON_CREDIT_LASCAUX,
                                },
                                {
                                    "label": "Reperto",
                                    "title": "Flauto osseo e prudenza storica",
                                    "caption": "L'immagine del reperto introduce il tema degli strumenti antichi senza trasformare l'ipotesi archeologica in certezza assoluta.",
                                    "src": LESSON_IMAGE_FLUTE,
                                    "alt": "Flauto di Divje Babe esposto in museo",
                                    "credit": LESSON_CREDIT_FLUTE,
                                },
                                {
                                    "label": "Grafica originale",
                                    "title": "Il corpo come primo strumento",
                                    "caption": "Mani, piedi, torace, voce e respiro diventano una tavola visiva per leggere il corpo come sorgente sonora organizzata.",
                                    "src": LESSON_IMAGE_HANDS,
                                    "alt": "Mani che producono una percussione corporea",
                                    "credit": LESSON_CREDIT_HANDS,
                                },
                            ],
                        },
                        "details": [
                            {
                                "label": "Materiali visivi",
                                "kind": "list",
                                "items": [
                                    "Immagine di pittura rupestre con figure in movimento o scena rituale.",
                                    "Immagine di flauto osseo o antico strumento naturale, con nota prudente: alcuni reperti sono interpretati come antichissimi strumenti musicali; la datazione e l'interpretazione possono variare secondo gli studi.",
                                    "Grafica originale: Il corpo come primo strumento, con mani, piedi, torace, voce e respiro.",
                                ],
                            },
                            {
                                "label": "Testo da mostrare",
                                "kind": "quote",
                                "text": "Non possiamo stabilire con certezza il primo momento in cui nasce la musica. Possiamo pero osservare che corpo, voce e gesto sono stati i primi mezzi con cui l'essere umano ha dato forma al suono.",
                            },
                        ],
                    },
                    "orecchio": {
                        "nav_subtitle": "Ascolto / visione guidata",
                        "panel_title": "ORECCHIO",
                        "panel_subtitle": "Come nasce un ritmo dal corpo?",
                        "objective": "Far riconoscere timbro, intensita, durata, pulsazione e pausa attraverso suoni corporei.",
                        "teacher_activity": "Eseguo una breve sequenza di body percussion: mani, mani, cosce, piede; mani, mani, cosce, piede. Poi la ripeto con variazioni: piu piano e piu forte, piu lento e piu veloce, con una pausa finale, con un suono vocale breve come ta.",
                        "student_activity": "Gli studenti ascoltano senza imitare nella prima esecuzione. Poi rispondono a domande guidate sui suoni riconosciuti, sul timbro piu grave, sulla pulsazione, sugli effetti dell'intensita e della pausa.",
                        "materials": ["Corpo", "Voce", "Eventuale registrazione audio della sequenza", "LIM con parole chiave"],
                        "output": "Gli studenti riconoscono che anche i suoni corporei hanno caratteristiche musicali osservabili.",
                        "teacher_view": {
                            "mission": "Far riconoscere timbro, intensita, durata, pulsazione e pausa attraverso suoni corporei.",
                            "regia_intro": "Eseguo una breve sequenza di body percussion: mani, mani, cosce, piede; mani, mani, cosce, piede. Poi la ripeto con variazioni:",
                            "regia_points": [
                                "piu piano e piu forte",
                                "piu lento e piu veloce",
                                "con una pausa finale",
                                "con un suono vocale breve come ta",
                            ],
                            "vista_classe": "Gli studenti ascoltano senza imitare nella prima esecuzione. Poi rispondono a domande guidate sui suoni riconosciuti, sul timbro piu grave, sulla pulsazione, sugli effetti dell'intensita e della pausa.",
                            "toolkit": [
                                "Corpo",
                                "Voce",
                                "Eventuale registrazione audio della sequenza",
                                "LIM con parole chiave",
                            ],
                            "questions": [
                                "Quale suono hai sentito piu chiaramente?",
                                "Quale suono era piu grave?",
                                "Dove hai percepito la pulsazione?",
                                "Che effetto ha avuto la pausa?",
                                "Che cosa cambia quando il suono diventa piu forte?",
                            ],
                            "esito": "Gli studenti riconoscono che anche i suoni corporei hanno caratteristiche musicali osservabili.",
                        },
                        "student_view": {
                            "mission": "Ascoltiamo con attenzione il corpo e riconosciamo che anche questi suoni hanno caratteristiche musicali precise: timbro, intensita, durata, pulsazione e pausa.",
                            "in_class": "Guardiamo e ascoltiamo una breve sequenza guidata. Non pensiamo subito alla difficolta: osserviamo, ascoltiamo e proviamo a imitare un gesto alla volta.",
                            "task": "Guardiamo una breve sequenza di percussione corporea e proviamo a riconoscere quali parti del corpo producono il ritmo.",
                            "observe": [
                                "quale gesto produce il suono piu forte",
                                "quale gesto produce il suono piu secco",
                                "quale gesto produce il suono piu grave",
                                "se senti una pulsazione regolare",
                            ],
                            "questions": [
                                "Quale gesto hai riconosciuto per primo?",
                                "Il ritmo si basa sulla ripetizione?",
                                "Riesci a individuare una pulsazione regolare?",
                                "Perche questi suoni possono essere musicali?",
                            ],
                            "keywords": ["ritmo", "imitazione", "pulsazione", "timbro"],
                            "remember": "Anche il corpo puo produrre suoni musicali, se i suoni vengono ascoltati, riconosciuti e organizzati.",
                        },
                        "details": [
                            {
                                "label": "Domande guida",
                                "kind": "list",
                                "items": [
                                    "Quali suoni avete riconosciuto?",
                                    "Quale suono era piu grave?",
                                    "Dove sentivate la pulsazione?",
                                    "Che cosa cambia quando aumenta l'intensita?",
                                    "Che effetto produce la pausa?",
                                ],
                            },
                            {
                                "label": "Parole chiave da visualizzare",
                                "kind": "list",
                                "items": ["Timbro", "Intensita", "Durata", "Pulsazione", "Pausa", "Ripetizione", "Contrasto"],
                            },
                        ],
                    },
                    "grafo": {
                        "nav_subtitle": "Mappa concettuale",
                        "panel_title": "GRAFO",
                        "panel_subtitle": "Dal corpo alla musica",
                        "objective": "Trasformare una sequenza corporea in una notazione grafica semplice, leggibile e ripetibile.",
                        "teacher_activity": "Mostro una legenda grafica e scrivo alla lavagna una sequenza di simboli, chiedendo alla classe di leggerla ed eseguirla insieme.",
                        "student_activity": "Gli studenti comprendono che una sequenza sonora puo essere fissata attraverso simboli, anche senza notazione musicale tradizionale.",
                        "materials": ["LIM", "Lavagna", "Foglio con legenda", "Esempio di partitura grafica"],
                        "output": "Gli studenti sanno leggere ed eseguire una breve partitura grafica.",
                        "student_view": {
                            "mission": "Osserviamo come corpo, voce, gesto, ambiente e ascolto diventino musica quando si organizzano nel tempo e nella relazione con gli altri.",
                            "task": "Osserviamo la mappa e seguiamo i collegamenti tra corpo, voce, gesto, ambiente, ascolto, ritmo e comunita.",
                            "in_class": "Partiamo dai nodi principali e proviamo a spiegare perche alcuni legami sono piu forti di altri dentro la nascita del suono musicale.",
                            "observe": [
                                "quali parole parlano del corpo che produce suono",
                                "come ascolto e silenzio aiutano a iniziare",
                                "come ritmo e gesto tengono insieme il gruppo",
                                "quali legami raccontano meglio la musica come relazione",
                            ],
                            "questions": [
                                "Quale nodo collega meglio gesto e suono?",
                                "Perche pulsazione e pausa devono restare in relazione?",
                                "Come la partitura grafica ci aiuta a ripetere la sequenza?",
                            ],
                            "keywords": [
                                {"term": "corpo"},
                                {"term": "voce"},
                                {"term": "gesto"},
                                {"term": "ritmo"},
                                {"term": "comunita"},
                            ],
                            "remember": "La musica diventa piu chiara quando colleghiamo il gesto al ritmo, all'ascolto e alla relazione con gli altri.",
                            "grafo_title": "Grafo fluttuante del gesto sonoro",
                            "grafo_map": {
                                "intro": "Spostiamo le card, leggiamo i collegamenti e proviamo a dire come ogni parola chiave aiuta il gruppo a costruire e ricordare la sequenza.",
                                "nodes": [
                                    {
                                        "number": "01",
                                        "label": "sorgente",
                                        "title": "Corpo",
                                        "subtitle": "mani, piedi, torace",
                                        "summary": "E il primo spazio in cui il suono nasce e prende forma.",
                                        "x": 12,
                                        "y": 18,
                                    },
                                    {
                                        "number": "02",
                                        "label": "sorgente",
                                        "title": "Voce",
                                        "subtitle": "richiama e colora",
                                        "summary": "Aggiunge parola, timbro e segnale alla sequenza.",
                                        "x": 50,
                                        "y": 10,
                                    },
                                    {
                                        "number": "03",
                                        "label": "azione",
                                        "title": "Gesto",
                                        "subtitle": "avvia e coordina",
                                        "summary": "Dirige l'entrata del gruppo e rende visibile il ritmo.",
                                        "x": 86,
                                        "y": 18,
                                    },
                                    {
                                        "number": "04",
                                        "label": "qualita",
                                        "title": "Timbro",
                                        "subtitle": "come suona",
                                        "summary": "Ci fa distinguere mani, voce, cosce, piede e respiro.",
                                        "x": 14,
                                        "y": 72,
                                    },
                                    {
                                        "number": "05",
                                        "label": "tempo",
                                        "title": "Pulsazione",
                                        "subtitle": "tiene insieme",
                                        "summary": "Da ordine al gruppo e regge la sequenza nel tempo.",
                                        "x": 50,
                                        "y": 46,
                                    },
                                    {
                                        "number": "06",
                                        "label": "respiro",
                                        "title": "Pausa",
                                        "subtitle": "ferma e rilancia",
                                        "summary": "Crea attesa, contrasto e finale dentro la frase sonora.",
                                        "x": 86,
                                        "y": 72,
                                    },
                                    {
                                        "number": "07",
                                        "label": "segni",
                                        "title": "Partitura grafica",
                                        "subtitle": "fissa la sequenza",
                                        "summary": "Trasforma il gesto in segni che il gruppo puo rileggere ed eseguire.",
                                        "x": 50,
                                        "y": 86,
                                    },
                                ],
                                "connections": [
                                    {"from": "01", "to": "04", "kind": "main"},
                                    {"from": "01", "to": "05", "kind": "main"},
                                    {"from": "02", "to": "04", "kind": "secondary"},
                                    {"from": "02", "to": "05", "kind": "main"},
                                    {"from": "03", "to": "05", "kind": "main"},
                                    {"from": "03", "to": "07", "kind": "secondary"},
                                    {"from": "04", "to": "07", "kind": "secondary"},
                                    {"from": "05", "to": "06", "kind": "main"},
                                    {"from": "05", "to": "07", "kind": "main"},
                                    {"from": "06", "to": "07", "kind": "secondary"},
                                ],
                            },
                        },
                        "details": [
                            {
                                "label": "Legenda grafica",
                                "kind": "list",
                                "items": [
                                    "● = battito di mani",
                                    "▲ = piede",
                                    "■ = cosce",
                                    "○ = voce",
                                    "— = pausa",
                                    "↑ = crescendo",
                                    "X = stop finale",
                                ],
                            },
                            {
                                "label": "Sequenza da leggere",
                                "kind": "code",
                                "text": "▲ ▲ ● — | ▲ ▲ ● ○ | ■ ■ ● — | ● X",
                            },
                            {
                                "label": "Elemento grafico da creare",
                                "kind": "text",
                                "text": "Una card visuale con titolo La partitura del corpo e legenda dei simboli.",
                            },
                        ],
                    },
                    "cantiere": {
                        "nav_subtitle": "Laboratorio attivo",
                        "panel_title": "CANTIERE",
                        "panel_subtitle": "Costruiamo una sequenza di percussione corporea",
                        "objective": "Far progettare agli studenti una breve sequenza collettiva usando corpo, voce e gesto.",
                        "teacher_activity": "Divido la classe in gruppi da 4 o 5 studenti e assegno la consegna operativa, chiarendo vincoli, tempi e criteri di riuscita.",
                        "student_activity": "Ogni gruppo sperimenta suoni corporei e vocali, sceglie una sequenza, assegna i ruoli, prova l'esecuzione e la scrive con una notazione grafica.",
                        "materials": ["Fogli A4", "Pennarelli", "Legenda simbolica", "Spazio libero"],
                        "output": "Ogni gruppo produce una sequenza corporea, una partitura grafica e un titolo per la propria sequenza.",
                        "student_view": {
                            "mission": "Costruiamo una sequenza ritmica di gruppo in cui ogni gesto sia scelto, provato e tenuto insieme con precisione.",
                            "task": "In gruppo, costruiamo una sequenza ritmica di 8 pulsazioni usando solo corpo, voce e gesto. La sequenza deve essere semplice, ripetibile e chiara.",
                            "in_class": "Lavoriamo per tentativi, fermiamo quello che non funziona, manteniamo una pulsazione regolare e decidiamo insieme dove inserire la variazione finale.",
                            "observe": [
                                "scegliamo tre suoni corporei",
                                "manteniamo una pulsazione regolare",
                                "costruiamo una sequenza di otto tempi",
                                "ripetiamola almeno quattro volte e aggiungiamo una variazione finale",
                            ],
                            "questions": [
                                "Quale suono tiene meglio la pulsazione?",
                                "Dove inseriamo la variazione finale?",
                                "La pausa si sente chiaramente?",
                            ],
                            "keywords": ["sequenza", "pulsazione", "ripetizione", "variazione"],
                            "remember": "Una sequenza funziona quando il gruppo controlla pulsazione, ripetizione, variazione e pause.",
                        },
                        "details": [
                            {
                                "label": "Consegna operativa",
                                "kind": "list",
                                "items": [
                                    "Create una sequenza sonora di 20-30 secondi usando solo corpo, voce e gesto.",
                                    "La sequenza deve avere una pulsazione riconoscibile.",
                                    "La sequenza deve usare almeno tre timbri corporei diversi.",
                                    "La sequenza deve includere un momento di contrasto.",
                                    "La sequenza deve prevedere una pausa.",
                                    "La sequenza deve chiudersi con un finale chiaro.",
                                ],
                            },
                            {
                                "label": "Scheda gruppo",
                                "kind": "list",
                                "items": [
                                    "Titolo della sequenza",
                                    "Suoni usati",
                                    "Chi tiene la pulsazione",
                                    "Chi entra dopo",
                                    "Momento di contrasto",
                                    "Pausa",
                                    "Finale",
                                    "Legenda usata",
                                ],
                            },
                        ],
                    },
                    "varco": {
                        "nav_subtitle": "Rielaborazione creativa",
                        "panel_title": "VARCO",
                        "panel_subtitle": "Trasformiamo i suoni in una piccola partitura",
                        "objective": "Applicare quanto appreso in una situazione espressiva concreta: costruire una breve scena sonora collettiva.",
                        "teacher_activity": "Presento il compito: immaginate una piccola comunita che deve comunicare un evento importante senza usare parole. Una partenza, una festa, un pericolo, una scoperta. Create un rito sonoro di gruppo usando corpo, voce e gesto.",
                        "student_activity": "I gruppi scelgono la situazione, costruiscono la sequenza, decidono forma e ruoli, provano l'esecuzione e preparano la restituzione.",
                        "materials": ["Scheda compito", "Fogli", "Pennarelli", "Spazio libero"],
                        "output": "Una breve performance di gruppo intitolata, eseguibile e documentata con partitura grafica.",
                        "student_view": {
                            "mission": "Trasformiamo la nostra sequenza in una partitura grafica semplice, leggibile e facile da condividere.",
                            "task": "Ora trasformiamo la sequenza in una partitura grafica. Non servono ancora le note tradizionali: usiamo simboli semplici per ricordare i gesti e organizzare il suono.",
                            "in_class": "Scegliamo una legenda coerente, sistemiamo gli otto tempi e controlliamo che la sequenza si capisca anche senza spiegazione orale.",
                            "observe": [
                                "se i simboli sono coerenti",
                                "se la partitura si capisce anche senza spiegazione",
                                "se il silenzio ha un posto nella sequenza",
                                "se la sequenza e facile da ripetere",
                            ],
                            "questions": [
                                "Quale simbolo rappresenta meglio ogni gesto?",
                                "La pausa si vede chiaramente?",
                                "Un altro gruppo riuscirebbe a eseguire la nostra partitura?",
                            ],
                            "keywords": ["simbolo", "partitura", "codice", "memoria"],
                            "remember": "Una partitura grafica funziona quando aiuta il gruppo a ricordare, ripetere e migliorare la sequenza.",
                        },
                        "details": [
                            {
                                "label": "Vincoli",
                                "kind": "list",
                                "items": [
                                    "Nessuno strumento.",
                                    "Massimo 40 secondi.",
                                    "Almeno tre livelli sonori.",
                                    "Inizio riconoscibile.",
                                    "Sviluppo.",
                                    "Finale chiaro.",
                                    "Partitura grafica allegata.",
                                ],
                            },
                            {
                                "label": "Nota didattica",
                                "kind": "text",
                                "text": "Il compito di realta non deve sembrare artificiale. Deve essere semplice, fisico, immediato e legato all'idea originaria di musica come comunicazione condivisa.",
                            },
                        ],
                    },
                    "ribalta": {
                        "nav_subtitle": "Condivisione e confronto",
                        "panel_title": "RIBALTA",
                        "panel_subtitle": "Eseguiamo, ascoltiamo, miglioriamo",
                        "objective": "Condividere il lavoro, sviluppare ascolto critico e far verbalizzare le scelte musicali.",
                        "teacher_activity": "Invito ogni gruppo a presentare la propria sequenza. Prima dell'esecuzione, chiedo di comunicare titolo, situazione scelta, suoni usati e significato del finale. Posso registrare brevi estratti audio o video per documentazione interna.",
                        "student_activity": "Gli studenti eseguono la propria sequenza e ascoltano quelle degli altri gruppi. Ogni gruppo spettatore compila una scheda di ascolto breve.",
                        "materials": ["Scheda ascolto", "Eventuale registrazione", "LIM"],
                        "output": "Performance di gruppo, ascolto tra pari, prima valutazione condivisa.",
                        "student_view": {
                            "mission": "Condividiamo il lavoro con gli altri e impariamo ad ascoltare in modo piu preciso quello che ogni gruppo ha costruito.",
                            "task": "Ogni gruppo presenta la propria sequenza. Gli altri ascoltano e osservano con attenzione. Non giudichiamo bella o brutta: proviamo a capire se funziona musicalmente.",
                            "in_class": "Ascoltiamo con attenzione, descriviamo almeno una scelta efficace e proviamo a dire che cosa rende piu chiara la sequenza di un gruppo.",
                            "observe": [
                                "se la pulsazione era chiara",
                                "se i gesti erano coordinati",
                                "se la sequenza era riconoscibile",
                                "se c'era una variazione o un uso efficace del silenzio",
                            ],
                            "questions": [
                                "Quale scelta sonora riconosciamo subito?",
                                "Che cosa rende piu efficace la sequenza ascoltata?",
                                "Che cosa potremmo migliorare nel nostro gruppo?",
                            ],
                            "keywords": ["ascolto", "gruppo", "coordinazione", "confronto"],
                            "remember": "Confrontare le sequenze ci aiuta a capire meglio ritmo, coordinazione, variazione e silenzio.",
                        },
                        "details": [
                            {
                                "label": "Scheda ascolto",
                                "kind": "list",
                                "items": [
                                    "Titolo del gruppo ascoltato",
                                    "La pulsazione era riconoscibile? Si / No / In parte",
                                    "Si distinguevano timbri diversi? Si / No / In parte",
                                    "Il contrasto era chiaro? Si / No / In parte",
                                    "Il finale era efficace? Si / No / In parte",
                                    "Una scelta interessante che ho notato",
                                ],
                            }
                        ],
                    },
                    "specchio": {
                        "nav_subtitle": "Sintesi / verifica rapida",
                        "panel_title": "SPECCHIO",
                        "panel_subtitle": "Che cosa abbiamo scoperto?",
                        "objective": "Chiudere la lezione con verifica, rubrica e autovalutazione.",
                        "teacher_activity": "Guido una breve riflessione finale e propongo tre domande scritte, una consegna di riflessione e una rubrica osservativa compilabile.",
                        "student_activity": "Gli studenti rispondono alle domande di verifica, scrivono una riflessione breve e completano l'autovalutazione finale.",
                        "materials": ["Scheda verifica", "Rubrica", "Autovalutazione"],
                        "output": "Verifica breve, autovalutazione, rubrica compilabile dal docente.",
                        "student_view": {
                            "mission": "Rileggiamo il percorso e capiamo che cosa abbiamo imparato davvero su corpo, voce, gesto, ritmo e silenzio.",
                            "task": "Completiamo la sintesi finale e rispondiamo alle domande conclusive: la musica puo nascere dal corpo, dalla voce, dal gesto e anche dal silenzio organizzato.",
                            "in_class": "Riprendiamo la sequenza costruita, controlliamo se sappiamo spiegarla e proviamo a dire che cosa abbiamo scoperto sull'origine del suono.",
                            "observe": [
                                "se sappiamo spiegare perche il corpo puo essere musicale",
                                "se riconosciamo ritmo, gesto, imitazione e ripetizione",
                                "se capiamo che anche la pausa fa parte della musica",
                                "se sappiamo che cos'e una partitura grafica",
                            ],
                            "questions": [
                                "La musica puo esistere senza strumenti?",
                                "Che cosa rende musicale un gesto?",
                                "Perche il silenzio e importante?",
                            ],
                            "keywords": ["corpo", "voce", "gesto", "silenzio", "musica"],
                            "remember": "Ora sappiamo che il primo strumento musicale puo essere il corpo, quando il suono viene ascoltato e organizzato.",
                        },
                        "details": [
                            {
                                "label": "Domande di verifica",
                                "kind": "list",
                                "items": [
                                    "Perche il corpo puo essere considerato uno strumento musicale?",
                                    "Qual e la differenza tra un rumore casuale e un suono organizzato?",
                                    "Perche una partitura grafica puo aiutare un gruppo a ripetere una sequenza sonora?",
                                ],
                            },
                            {
                                "label": "Consegna di riflessione",
                                "kind": "text",
                                "text": "Scrivi 5 righe usando almeno tre parole tra: pulsazione, timbro, intensita, pausa, gesto, voce, gruppo, notazione.",
                            },
                            {
                                "label": "Rubrica di valutazione",
                                "kind": "list",
                                "items": [
                                    "Livello iniziale: partecipa solo se guidato; fatica a mantenere la pulsazione; riconosce pochi elementi sonori; la sequenza prodotta e frammentaria o poco controllata.",
                                    "Livello base: partecipa all'attivita; mantiene una pulsazione semplice se sostenuto dal gruppo; riconosce alcuni timbri corporei; contribuisce alla costruzione di una breve sequenza.",
                                    "Livello intermedio: partecipa con attenzione; mantiene la pulsazione; distingue timbro, intensita e pausa; collabora alla costruzione di una sequenza ordinata e sa rappresentarla con simboli semplici.",
                                    "Livello avanzato: partecipa in modo consapevole; controlla gesto, suono e intensita; contribuisce alla composizione del gruppo con idee efficaci; usa la notazione grafica in modo chiaro e sa spiegare le scelte musicali.",
                                ],
                            },
                            {
                                "label": "Autovalutazione studente",
                                "kind": "list",
                                "items": [
                                    "Oggi ho capito che",
                                    "La cosa piu difficile e stata",
                                    "Nel mio gruppo ho contribuito",
                                    "Vorrei migliorare",
                                    "Una parola che riassume la lezione",
                                ],
                            },
                        ],
                    },
                },
                "materials_section": {
                    "teacher_sheet": {
                        "title": "Scheda docente",
                        "summary": "Traccia rapida per condurre la lezione in due ore, con obiettivi, scansione delle fasi e criteri osservativi.",
                        "items": [
                            "obiettivi della lezione e lessico chiave",
                            "tempi suggeriti per ciascuna fase",
                            "materiali essenziali e spazi consigliati",
                            "accorgimenti BES e ruoli possibili nel gruppo",
                            "rubrica osservativa per la restituzione finale",
                        ],
                    },
                    "student_sheet": {
                        "title": "Scheda studente",
                        "summary": "Foglio operativo unico per raccogliere parole chiave, legenda grafica, progetto di gruppo e verifica finale.",
                        "items": [
                            "domanda iniziale e spazio per parole chiave",
                            "legenda grafica della partitura",
                            "scheda gruppo con ruoli, pausa, contrasto e finale",
                            "domande di verifica e spazio di autovalutazione",
                        ],
                    },
                    "media": [
                        {
                            "title": "Immagine: pittura rupestre o scena rituale",
                            "note": "Per aprire la fase ROTTA e discutere corpo, gruppo, movimento e funzione sociale del suono.",
                        },
                        {
                            "title": "Immagine: antico strumento naturale o flauto osseo",
                            "note": "Da accompagnare con una nota prudente sulla variabilita delle interpretazioni archeologiche.",
                        },
                        {
                            "title": "Grafica originale: Il corpo come primo strumento",
                            "note": "Schema con mani, piedi, torace, voce e respiro come sorgenti sonore.",
                        },
                        {
                            "title": "Grafica originale: La partitura del corpo",
                            "note": "Legenda dei simboli e sequenza modello da leggere con la classe.",
                        },
                        {
                            "title": "Video esterno facoltativo di body percussion o clapping games",
                            "note": "Risorsa opzionale da usare come estensione o confronto finale, non come punto di partenza della lezione.",
                            "url": "https://musicascuola.indire.it/index.php?action=vedi_singola_esperienza&id_scheda=1400",
                        },
                    ],
                },
                "inclusive_notes": [
                    "Per studenti con difficolta motorie: possibilita di usare voce, respiro, gesto minimo, direzione del gruppo o gestione della partitura.",
                    "Per studenti con difficolta attentive: sequenze brevi, ruoli chiari, consegne visive e tempi scanditi.",
                    "Per studenti con difficolta linguistiche: uso di simboli, imitazione, esempi pratici e parole chiave essenziali.",
                    "Per studenti con ansia performativa: esecuzione in gruppo, nessuna esposizione individuale obbligatoria, possibilita di ruolo tecnico o grafico.",
                ],
                "references": [
                    {
                        "title": "INDIRE, Musica a scuola",
                        "url": "https://www.indire.it/progetto/musica-a-scuola/",
                        "note": "Portale della didattica musicale laboratoriale.",
                    },
                    {
                        "title": "INDIRE, Movement, gesture, sound and voice, Rita Nuti",
                        "url": "https://musicascuola.indire.it/index.php?action=vedi_singola_esperienza&id_scheda=1423",
                        "note": "Percorso su voce, movimento e consapevolezza corporea.",
                    },
                    {
                        "title": "INDIRE, Clapping hands / Battimani, Enrico Strobino",
                        "url": "https://musicascuola.indire.it/index.php?action=vedi_singola_esperienza&id_scheda=1400",
                        "note": "Repertorio operativo su body percussion, voce e gioco ritmico.",
                    },
                    {
                        "title": "INDIRE, Il quadro didattico. Linee guida",
                        "url": "https://musicascuola.indire.it/quadro_didattico.pdf",
                        "note": "Quadro di riferimento per progettazione, competenze e valutazione.",
                    },
                ],
            },
        },
        {
            "number": "02",
            "slug": "ritmo-pulsazione-tempo",
            "title": "Ritmo, pulsazione e tempo",
            "subtitle": "Misurare il gesto collettivo",
            "label": "Fondamenti",
            "x": 34,
            "y": 14,
            "summary": "Il ritmo nasce dall'organizzazione del movimento e rende condivisibile il tempo del gruppo.",
            "phases": {
                "scintilla": {
                    "title": "Perche alcune ripetizioni ci fanno sentire subito un ordine?",
                    "body": "La domanda iniziale invita a riconoscere la differenza tra suoni sparsi, pulsazione regolare e ritmo organizzato.",
                },
                "rotta": {
                    "title": "Dal passo alla pulsazione comune",
                    "body": "Nelle societa delle origini il tempo musicale si lega al lavoro, al cammino, alla danza e alle azioni rituali ripetute.",
                },
                "orecchio": {
                    "title": "Ascoltare battito, ostinato e variazione",
                    "body": "L'ascolto guidato fa distinguere pulsazione di base, accenti, ripetizione e piccole variazioni ritmiche.",
                },
                "grafo": {
                    "title": "Tempo, accento, ripetizione",
                    "body": "Organizza visivamente cio che hai compreso collegando pulsazione, ritmo, ostinato e coordinazione del gruppo.",
                },
                "cantiere": {
                    "title": "Trasformare il battito in struttura",
                    "body": "Gli studenti costruiscono una sequenza ritmica semplice partendo da un battito comune e introducendo variazioni controllate.",
                },
                "varco": {
                    "title": "Creare una guida per leggere il ritmo originario",
                    "body": "Il compito chiede una scheda pratica che spieghi come il ritmo nasca da movimento, lavoro e gesto condiviso.",
                },
                "ribalta": {
                    "title": "Restituire il ritmo in forma performativa",
                    "body": "La restituzione puo essere una dimostrazione collettiva con pattern corporei e commento essenziale.",
                },
                "specchio": {
                    "title": "Verificare se sai leggere il tempo comune",
                    "body": "La valutazione controlla se distingui pulsazione, ritmo e accento e se sai applicarli in modo coerente.",
                },
            },
            "lesson": {
                "panel_only": True,
                "immersive_preview": True,
                "immersive_mount_id": "immersive-rhythm-lesson-root",
                "immersive_data_key": "ritmo-pulsazione-tempo",
                "immersive_stylesheet": "../../../../css/lesson-immersive.css",
                "immersive_module": "../../../../components/RitmoPulsazioneTempoLesson.module.js",
                "author": "Lezione di Amedeo Mamone",
                "description": "Trovi un battito comune con il corpo, ascolti come tornano gli accenti e capisci che cosa cambia tra pulsazione, ritmo, tempo e metro.",
            },
        },
        {
            "number": "03",
            "slug": "suono-nella-preistoria",
            "title": "Suono nella preistoria",
            "subtitle": "Ambiente, tracce, immaginazione controllata",
            "label": "Contesto",
            "x": 12,
            "y": 70,
            "summary": "Ricostruire il suono preistorico significa leggere ambiente, reperti e pratiche con prudenza storica.",
            "phases": {
                "scintilla": {
                    "title": "Come possiamo immaginare un suono di cui non esiste registrazione?",
                    "body": "La domanda iniziale spinge a distinguere fantasia libera, indizio archeologico e ricostruzione storica plausibile.",
                },
                "rotta": {
                    "title": "Paesaggi sonori prima della scrittura",
                    "body": "Il contesto storico mostra ambienti aperti, materiali naturali, comunita ristrette e un ascolto strettamente legato al territorio.",
                },
                "orecchio": {
                    "title": "Ascoltare ambiente, eco e materiali naturali",
                    "body": "L'ascolto guidato confronta suoni di pietra, legno, osso, vento e voce per capire come nasca il paesaggio sonoro originario.",
                },
                "grafo": {
                    "title": "Ambiente, tracce, reperti",
                    "body": "Organizza visivamente cio che hai compreso collegando luoghi, materiali, reperti e ipotesi di uso sonoro.",
                },
                "cantiere": {
                    "title": "Costruire una scheda di ricostruzione sonora",
                    "body": "Gli studenti raccolgono indizi e li trasformano in una scheda che distingua dati, ipotesi e funzioni possibili.",
                },
                "varco": {
                    "title": "Allestire una tavola sul paesaggio sonoro preistorico",
                    "body": "Il compito chiede di creare un pannello che spieghi con rigore che cosa possiamo sapere e che cosa possiamo solo dedurre.",
                },
                "ribalta": {
                    "title": "Presentare una ricostruzione ragionata",
                    "body": "La restituzione finale puo essere una tavola commentata con suoni, materiali e tracce archeologiche.",
                },
                "specchio": {
                    "title": "Valutare uso delle fonti e chiarezza storica",
                    "body": "La fase finale controlla se sai distinguere prova, indizio e interpretazione dentro il racconto delle origini.",
                },
            },
        },
        {
            "number": "04",
            "slug": "musica-comunicazione-funzioni-sociali",
            "title": "Musica, comunicazione e funzioni sociali",
            "subtitle": "Caccia, guerra, festa, coordinazione",
            "label": "Funzioni",
            "x": 56,
            "y": 42,
            "summary": "Il suono non serve solo al rito: orienta il gruppo, segnala, coordina e accompagna azioni pratiche e collettive.",
            "phases": {
                "scintilla": {
                    "title": "Che cosa puo fare il suono per una comunita oltre a essere bello da ascoltare?",
                    "body": "La domanda iniziale allarga il campo verso comunicazione, coordinazione, guerra, festa e lavoro condiviso.",
                },
                "rotta": {
                    "title": "Funzioni pratiche del suono originario",
                    "body": "Il contesto storico mostra che musica e suono aiutano a chiamare, organizzare, celebrare, intimidire, accompagnare e ricordare.",
                },
                "orecchio": {
                    "title": "Ascoltare segnale, richiamo e suono collettivo",
                    "body": "L'ascolto guidato mette in evidenza pattern semplici ma funzionali, pensati per essere riconosciuti subito dal gruppo.",
                },
                "grafo": {
                    "title": "Comunicare, coordinare, celebrare",
                    "body": "Organizza visivamente cio che hai compreso collegando ciascuna funzione sociale a gesti, strumenti e contesti d'uso.",
                },
                "cantiere": {
                    "title": "Confrontare funzioni rituali e pratiche",
                    "body": "Gli studenti ordinano esempi e situazioni per capire quando il suono comunica, coordina o rappresenta.",
                },
                "varco": {
                    "title": "Preparare una guida alle funzioni del suono",
                    "body": "Il compito chiede di spiegare a un pubblico esterno perche il suono originario abbia anche un forte valore pratico e sociale.",
                },
                "ribalta": {
                    "title": "Restituire il tema in una guida espositiva",
                    "body": "La restituzione finale puo essere una guida illustrata o un podcast breve con esempi di funzioni diverse.",
                },
                "specchio": {
                    "title": "Valutare se sai distinguere gli usi del suono",
                    "body": "La valutazione finale controlla se sai collegare ogni uso sociale a un contesto e a una intenzione precisa.",
                },
            },
        },
        {
            "number": "05",
            "slug": "rito-magia-comunita",
            "title": "Rito, magia e comunita",
            "subtitle": "Il suono che unisce il gruppo",
            "label": "Funzioni",
            "x": 72,
            "y": 62,
            "summary": "Il suono diventa pratica collettiva quando aiuta la comunita a condividere credenze, passaggi e appartenenze.",
            "phases": {
                "scintilla": {
                    "title": "Perche il suono e quasi sempre presente nei momenti collettivi piu intensi?",
                    "body": "La domanda iniziale apre il nesso tra musica, rito, appartenenza e costruzione del gruppo.",
                },
                "rotta": {
                    "title": "Il suono come collante simbolico",
                    "body": "Nelle societa arcaiche il gesto sonoro accompagna passaggi, invocazioni, celebrazioni e momenti in cui la comunita si riconosce.",
                },
                "orecchio": {
                    "title": "Ascoltare ripetizione, trance, coralita",
                    "body": "L'ascolto guidato mette in evidenza ripetizione, intensita e partecipazione collettiva come indizi della funzione rituale.",
                },
                "grafo": {
                    "title": "Rito, gesto, credenza, gruppo",
                    "body": "Organizza visivamente cio che hai compreso collegando funzione simbolica, contesto sociale e ripetizione del suono.",
                },
                "cantiere": {
                    "title": "Distinguere rito, festa e comunicazione",
                    "body": "Gli studenti confrontano situazioni diverse per capire che cosa rende specificamente rituale una pratica sonora.",
                },
                "varco": {
                    "title": "Progettare una scheda sulle funzioni rituali del suono",
                    "body": "Il compito chiede di rendere leggibile come il suono costruisca comunita, memoria e identita.",
                },
                "ribalta": {
                    "title": "Restituire il tema in forma pubblica",
                    "body": "La restituzione puo essere un pannello o una presentazione breve che mostri esempi di funzione rituale e sociale.",
                },
                "specchio": {
                    "title": "Valutare collegamenti tra musica e societa",
                    "body": "La valutazione finale controlla se sai spiegare perche il suono abbia una funzione collettiva e non solo espressiva.",
                },
            },
        },
        {
            "number": "06",
            "slug": "materiali-sonori-primi-strumenti",
            "title": "Materiali sonori e primi strumenti",
            "subtitle": "Oggetti che diventano musica",
            "label": "Tecniche",
            "x": 45,
            "y": 82,
            "summary": "I primi strumenti nascono quando oggetti e materiali vengono riconosciuti come risorse sonore stabili e ripetibili.",
            "phases": {
                "scintilla": {
                    "title": "Quando un oggetto smette di essere solo materia e diventa strumento?",
                    "body": "La domanda iniziale porta a osservare il passaggio da oggetto naturale a oggetto usato intenzionalmente per produrre suono.",
                },
                "rotta": {
                    "title": "Dal materiale al gesto tecnico",
                    "body": "Osso, pietra, legno, conchiglie e pelli permettono di costruire strumenti semplici ma gia specializzati per timbro e funzione.",
                },
                "orecchio": {
                    "title": "Ascoltare timbri poveri ma distinti",
                    "body": "L'ascolto guidato confronta percussione, scuotimento e soffio per capire come i materiali condizionino il risultato sonoro.",
                },
                "grafo": {
                    "title": "Materiale, gesto, timbro, funzione",
                    "body": "Organizza visivamente cio che hai compreso collegando famiglie di materiali, azione richiesta e suono prodotto.",
                },
                "cantiere": {
                    "title": "Classificare strumenti e materiali",
                    "body": "Gli studenti costruiscono una tassonomia essenziale di strumenti primitivi per capire affinita e differenze.",
                },
                "varco": {
                    "title": "Realizzare una tavola sui primi strumenti",
                    "body": "Il compito chiede una scheda illustrata che spieghi come nascano gli strumenti e quali funzioni possano assumere.",
                },
                "ribalta": {
                    "title": "Mostrare materiali e suoni",
                    "body": "La restituzione finale puo essere una piccola esposizione con immagini, classificazioni e dimostrazioni sonore.",
                },
                "specchio": {
                    "title": "Valutare lessico, classificazione e confronto",
                    "body": "La fase finale controlla se sai descrivere materiali, tecniche di produzione e funzione degli strumenti originari.",
                },
            },
        },
        {
            "number": "07",
            "slug": "dalle-origini-al-mondo-antico",
            "title": "Dalle origini al mondo antico",
            "subtitle": "La soglia verso le prime civilta",
            "label": "Passaggio",
            "x": 82,
            "y": 18,
            "summary": "Le origini non sono un blocco chiuso: preparano l'ingresso nel mondo antico e nelle prime civilta storiche del suono.",
            "phases": {
                "scintilla": {
                    "title": "Quando le pratiche originarie diventano storia musicale riconoscibile?",
                    "body": "La domanda iniziale apre la soglia tra preistoria sonora e prime civilta in cui il suono lascia tracce piu stabili.",
                },
                "rotta": {
                    "title": "Dalla comunita arcaica alle prime civilta",
                    "body": "Il contesto storico mostra come rito, strumenti, funzioni sociali e memoria del suono preparino il passaggio al Mediterraneo antico.",
                },
                "orecchio": {
                    "title": "Ascoltare continuita e trasformazioni",
                    "body": "L'ascolto guidato mette a confronto pratiche elementari e forme piu organizzate, per cogliere cosa resta e cosa cambia.",
                },
                "grafo": {
                    "title": "Origini, transizioni, civilta",
                    "body": "Organizza visivamente cio che hai compreso collegando origini del suono, funzioni sociali, strumenti e approdo al mondo antico.",
                },
                "cantiere": {
                    "title": "Costruire la soglia del percorso",
                    "body": "Gli studenti elaborano una sintesi che faccia da ponte verso il nucleo successivo sulle civilta del Mediterraneo.",
                },
                "varco": {
                    "title": "Preparare una pagina-ponte per la timeline",
                    "body": "Il compito chiede di progettare una breve pagina introduttiva che spieghi il passaggio dalle origini al mondo storico.",
                },
                "ribalta": {
                    "title": "Restituire il passaggio alla classe",
                    "body": "La restituzione finale puo essere una pagina di timeline o una presentazione breve che introduca il nucleo seguente.",
                },
                "specchio": {
                    "title": "Valutare visione d'insieme e capacita di collegamento",
                    "body": "La fase finale controlla se sai leggere il nucleo non come blocco isolato, ma come apertura verso la storia successiva.",
                },
            },
        },
    ],
    "connections": [
        {"from": "01", "to": "02", "kind": "main"},
        {"from": "02", "to": "03", "kind": "main"},
        {"from": "01", "to": "03", "kind": "secondary"},
        {"from": "03", "to": "04", "kind": "main"},
        {"from": "04", "to": "05", "kind": "main"},
        {"from": "04", "to": "06", "kind": "secondary"},
        {"from": "05", "to": "06", "kind": "main"},
        {"from": "05", "to": "07", "kind": "secondary"},
        {"from": "06", "to": "07", "kind": "main"},
    ],
}

ORIGINI_TOPIC_MAP["intro"] = (
    "Per il momento il percorso guidato del nucleo si concentra su una sola lezione. "
    "Qui lavori su ritmo, pulsazione e tempo per fissare bene il primo snodo operativo delle origini del suono."
)

ORIGINI_TOPIC_MAP["nodes"] = [
    {
        "number": "01",
        "slug": "ritmo-pulsazione-tempo",
        "title": "Ritmo, pulsazione e tempo",
        "subtitle": "Misurare il gesto collettivo",
        "label": "Fondamenti",
        "x": 38,
        "y": 18,
        "summary": "Il ritmo nasce dall'organizzazione del movimento e rende condivisibile il tempo del gruppo.",
        "phases": {
            "scintilla": {
                "title": "Perche alcune ripetizioni ci fanno sentire subito un ordine?",
                "body": "La domanda iniziale invita a riconoscere la differenza tra suoni sparsi, pulsazione regolare e ritmo organizzato.",
            },
            "rotta": {
                "title": "Dal passo alla pulsazione comune",
                "body": "Nelle societa delle origini il tempo musicale si lega al lavoro, al cammino, alla danza e alle azioni rituali ripetute.",
            },
            "orecchio": {
                "title": "Ascoltare battito, ostinato e variazione",
                "body": "L'ascolto guidato fa distinguere pulsazione di base, accenti, ripetizione e piccole variazioni ritmiche.",
            },
            "grafo": {
                "title": "Tempo, accento, ripetizione",
                "body": "Organizza visivamente cio che hai compreso collegando pulsazione, ritmo, ostinato e coordinazione del gruppo.",
            },
            "cantiere": {
                "title": "Trasformare il battito in struttura",
                "body": "Gli studenti costruiscono una sequenza ritmica semplice partendo da un battito comune e introducendo variazioni controllate.",
            },
            "varco": {
                "title": "Creare una guida per leggere il ritmo originario",
                "body": "Il compito chiede una scheda pratica che spieghi come il ritmo nasca da movimento, lavoro e gesto condiviso.",
            },
            "ribalta": {
                "title": "Restituire il ritmo in forma performativa",
                "body": "La restituzione puo essere una dimostrazione collettiva con pattern corporei e commento essenziale.",
            },
            "specchio": {
                "title": "Verificare se sai leggere il tempo comune",
                "body": "La valutazione controlla se distingui pulsazione, ritmo e accento e se sai applicarli in modo coerente.",
            },
        },
        "lesson": {
            "panel_only": True,
            "immersive_preview": True,
            "immersive_mount_id": "immersive-rhythm-lesson-root",
            "immersive_data_key": "ritmo-pulsazione-tempo",
            "immersive_stylesheet": "../../../../css/lesson-immersive.css",
            "immersive_module": "../../../../components/RitmoPulsazioneTempoLesson.module.js",
            "author": "Lezione di Amedeo Mamone",
            "description": "Trovi un battito comune con il corpo, ascolti come tornano gli accenti e capisci che cosa cambia tra pulsazione, ritmo, tempo e metro.",
        },
    },
]

ORIGINI_TOPIC_MAP["connections"] = []

NUCLEI[0]["topic_map"] = ORIGINI_TOPIC_MAP


CATEGORY_SUBTITLE_MAP = {
    "Contesto": "Quadro storico e sociale",
    "Caratteri": "Tratti da riconoscere",
    "Forme": "Forme, generi e scrittura",
    "Strumenti": "Strumenti e famiglie sonore",
    "Autori": "Figure e riferimenti",
    "Ascolto": "Ascolto guidato",
    "Laboratorio": "Uso operativo in classe",
    "Verifica": "Controllo finale",
}

TOPIC_LAYOUTS = {
    8: [
        (12, 18),
        (33, 10),
        (57, 18),
        (82, 12),
        (18, 48),
        (45, 42),
        (71, 54),
        (85, 76),
    ],
    9: [
        (12, 18),
        (34, 10),
        (58, 18),
        (83, 12),
        (20, 44),
        (47, 38),
        (74, 46),
        (30, 74),
        (62, 78),
    ],
    10: [
        (11, 16),
        (30, 10),
        (52, 18),
        (76, 10),
        (88, 30),
        (68, 50),
        (44, 44),
        (18, 54),
        (28, 78),
        (60, 80),
    ],
    12: [
        (10, 16),
        (28, 10),
        (50, 18),
        (74, 10),
        (88, 28),
        (18, 38),
        (42, 44),
        (66, 38),
        (84, 54),
        (16, 72),
        (42, 80),
        (70, 72),
    ],
}

EDITORIAL_NUCLEI_BLUEPRINT = [
    {
        "number": "01",
        "slug": "origini-e-civilta-antiche",
        "title": "Origini e civilta antiche",
        "nav_title": "Origini e civilta antiche",
        "category": "Il suono diventa rito",
        "period": "Dalle prime comunita alle civilta del mondo antico",
        "accent": "#c06a1c",
        "description": "Corpo, voce, gesto, strumenti primitivi e prime civilta: la musica nasce come esperienza condivisa.",
        "hero_subtitle": "Dal corpo alla civilta, il suono prende forma come rito, memoria, festa e organizzazione sociale.",
        "context_text": "Il nucleo riunisce le origini del suono e le prime civilta storiche in un unico quadro: prima la pratica corporea e rituale, poi l'ingresso della musica nelle societa organizzate dell'antichita.",
        "functions_text": "La musica coordina il gruppo, accompagna il rito, sostiene la memoria, rappresenta il potere e costruisce partecipazione nelle comunita antiche.",
        "forms_text": "Prevalgono formule vocali iterative, ritmi collettivi, canti rituali, salmi, pratiche teatrali e repertori legati a festa, guerra e celebrazione.",
        "instruments_text": "Corpo, percussioni, flauti, sonagli, lira, cetra, arpa, tamburi e trombe mostrano il passaggio da oggetti sonori a strumenti riconoscibili.",
        "connections": [
            "archeologia del suono",
            "rito e religione",
            "teatro e festa",
            "potere e cerimonia",
            "oralita e memoria",
        ],
        "lexicon": ["rito", "oralita", "lira", "cetra", "aulos", "timbro"],
        "authors": [
            {
                "name": "Tradizioni anonime",
                "work": "canto, gesto, danza, percussione corporea",
                "note": "Nelle origini il sapere musicale e collettivo e si trasmette per imitazione e memoria.",
            },
            {
                "name": "Egitto e Mesopotamia",
                "work": "musica cerimoniale, strumenti di corte, pratiche rituali",
                "note": "Le prime civilta mostrano come il suono entri nella vita religiosa, politica e pubblica.",
            },
            {
                "name": "Ebrei, Greci e Romani",
                "work": "salmi, teatro, mito, musica pubblica",
                "note": "Nel mondo antico la musica si lega a educazione, teatro, culto e identita civica.",
            },
        ],
        "lessons": [
            ("La musica prima della storia", "Contesto", "Suono, corpo, voce e gesto nelle prime comunita umane."),
            ("Musica, rito e magia", "Caratteri", "Il suono come rito, comunicazione, danza, festa e memoria collettiva."),
            ("I primi strumenti musicali", "Strumenti", "Oggetti sonori, percussioni, flauti, sonagli e materiali naturali."),
            ("La musica nelle civilta antiche", "Contesto", "Musica e societa nelle prime civilta organizzate."),
            ("Egitto e Mesopotamia", "Contesto", "Cerimonie, corte, guerra, strumenti e funzioni rituali della musica."),
            ("Ebrei, Greci e Romani", "Contesto", "Salmi, teatro, mito, strumenti e musica pubblica nel mondo antico."),
            ("Strumenti dell'antichita", "Strumenti", "Lira, cetra, arpa, flauti, trombe, tamburi e strumenti rituali."),
            ("Ascoltare l'antico", "Ascolto", "Ricostruzioni sonore e confronto tra rito, teatro e celebrazione."),
        ],
    },
    {
        "number": "02",
        "slug": "medioevo",
        "title": "Il Medioevo",
        "nav_title": "Il Medioevo",
        "category": "Dal canto alla scrittura",
        "period": "V - XIV secolo",
        "accent": "#1f7f90",
        "description": "Canto gregoriano, monasteri, trovatori, giullari, notazione e nascita della polifonia.",
        "hero_subtitle": "Dalla liturgia alla corte, il Medioevo trasforma il suono in memoria scritta e in nuove forme di organizzazione musicale.",
        "context_text": "Il Medioevo e il passaggio in cui il canto liturgico, la vita monastica, la cultura delle corti e la nascita delle citta costruiscono un nuovo ordine musicale europeo.",
        "functions_text": "La musica sostiene liturgia e preghiera, educa la memoria, intrattiene la corte, accompagna la festa pubblica e apre la via alla scrittura musicale.",
        "forms_text": "Canto gregoriano, organum, polifonia iniziale, repertorio profano cortese e forme dell'Ars antiqua e dell'Ars nova descrivono il cuore del nucleo.",
        "instruments_text": "Viella, ghironda, ribeca, arpa, salterio, flauti, tamburi e organo accompagnano pratiche sacre e profane con timbri ancora fortemente legati al contesto.",
        "connections": [
            "chiesa e liturgia",
            "monasteri e cattedrali",
            "corti e piazze",
            "oralita e notazione",
            "nascita della polifonia",
        ],
        "lexicon": ["gregoriano", "neuma", "rigo", "monodia", "polifonia", "trovatore"],
        "lessons": [
            ("Il contesto medievale", "Contesto", "Chiesa, monasteri, castelli, citta e vita musicale nel Medioevo."),
            ("Musica sacra e canto liturgico", "Caratteri", "La voce nella preghiera, nella liturgia e nella comunita religiosa."),
            ("Il canto gregoriano", "Forme", "Monodia, latino, ritmo libero, stile sillabico e melismatico."),
            ("La scrittura musicale", "Forme", "Neumi, rigo musicale, Guido d'Arezzo e nascita della notazione."),
            ("Musica profana medievale", "Caratteri", "Castelli, piazze, feste, danze e canti non religiosi."),
            ("Trovatori, trovieri e giullari", "Autori", "Poeti-musicisti, amor cortese, lingua volgare e repertori di corte."),
            ("Gli strumenti medievali", "Strumenti", "Viella, ghironda, ribeca, arpa, salterio, flauti, tamburi e organo."),
            ("La nascita della polifonia", "Forme", "Organum, Notre-Dame, contrappunto e prime melodie sovrapposte."),
            ("Ars antiqua e Ars nova", "Forme", "Dal canto medievale alle nuove forme polifoniche del Trecento."),
            ("Verifica: riconoscere il Medioevo", "Verifica", "Lessico, ascolti, strumenti, funzioni e forme della musica medievale."),
        ],
    },
    {
        "number": "03",
        "slug": "rinascimento",
        "title": "Il Rinascimento",
        "nav_title": "Il Rinascimento",
        "category": "L'uomo e la voce",
        "period": "XV - XVI secolo",
        "accent": "#768a2a",
        "description": "Polifonia, madrigale, corti, stampa musicale e ideale umanistico di equilibrio.",
        "hero_subtitle": "Equilibrio delle voci, centralita del testo e circolazione dei repertori definiscono la nuova idea musicale dell'eta umanistica.",
        "context_text": "Nel Rinascimento la musica dialoga con umanesimo, corti, citta e stampa, e assume una nuova attenzione per l'equilibrio, la chiarezza del testo e la diffusione europea dei repertori.",
        "functions_text": "La musica accompagna rito, corte, danza, celebrazione politica e sociabilita colta, mentre si rafforza il legame tra parola, forma e consapevolezza compositiva.",
        "forms_text": "Polifonia sacra, messa, mottetto, madrigale e repertori di danza costruiscono un paesaggio in cui la voce resta il centro del discorso musicale.",
        "instruments_text": "Liuto, viola da gamba, cromorno, cornetto, spinetta e organo sostengono una prassi sonora raffinata, spesso intrecciata alla musica vocale.",
        "connections": [
            "umanesimo e arti",
            "corti e citta",
            "polifonia europea",
            "stampa musicale",
            "parola e suono",
        ],
        "lexicon": ["imitazione", "madrigale", "mottetto", "polifonia", "liuto", "stampa"],
        "lessons": [
            ("Umanesimo e Rinascimento", "Contesto", "Nuova centralita dell'uomo, corti, citta e cultura musicale."),
            ("La musica sacra rinascimentale", "Forme", "Messa, mottetto, polifonia vocale e chiarezza del testo."),
            ("La polifonia", "Caratteri", "Intreccio delle voci, imitazione, equilibrio e proporzione sonora."),
            ("Scuola fiamminga, romana e veneziana", "Autori", "I principali centri della polifonia europea rinascimentale."),
            ("Il madrigale", "Forme", "Musica profana, poesia, espressivita e rapporto tra parola e suono."),
            ("Musica, corte e danza", "Contesto", "Feste, intrattenimento, danze e funzione sociale della musica."),
            ("Gli strumenti del Rinascimento", "Strumenti", "Liuto, viola da gamba, cromorno, cornetto, spinetta e organo."),
            ("La stampa musicale", "Contesto", "Diffusione dei repertori e trasformazione della circolazione musicale."),
            ("Verifica: riconoscere il Rinascimento", "Verifica", "Polifonia, madrigale, scuole, strumenti e funzioni della musica."),
        ],
    },
    {
        "number": "04",
        "slug": "barocco",
        "title": "Il Barocco",
        "nav_title": "Il Barocco",
        "category": "Teatro e meraviglia",
        "period": "XVII - prima meta XVIII secolo",
        "accent": "#c14f40",
        "description": "Melodramma, basso continuo, concerto, oratorio e nuove forme di spettacolo sonoro.",
        "hero_subtitle": "Contrasto, teatralita e potenza degli affetti guidano un'epoca in cui la musica entra nello spettacolo moderno.",
        "context_text": "Il Barocco vive tra corte, chiesa e teatro: spazi diversi che chiedono una musica capace di rappresentare il potere, muovere gli affetti e sorprendere l'ascoltatore.",
        "functions_text": "La musica barocca persuade, commuove, celebra, racconta e rende visibile lo spettacolo del potere e della fede.",
        "forms_text": "Opera, recitar cantando, basso continuo, concerto grosso, concerto solista e oratorio sono le forme principali con cui si organizza il linguaggio barocco.",
        "instruments_text": "Clavicembalo, archi, organo, fiati storici e orchestra barocca definiscono un suono fondato su contrasto, articolazione e continuo.",
        "connections": [
            "teatro musicale",
            "corte e chiesa",
            "basso continuo",
            "concerto e virtuosisimo",
            "circolazione europea degli autori",
        ],
        "lexicon": ["basso continuo", "melodramma", "oratorio", "concerto grosso", "affetti", "clavicembalo"],
        "lessons": [
            ("Il contesto barocco", "Contesto", "Grandiosita, contrasto, teatralita, corte, chiesa e spettacolo."),
            ("Musica e meraviglia", "Caratteri", "Contrasti sonori, intensita, ornamenti, solennita e movimento."),
            ("La nascita del melodramma", "Forme", "Camerata de' Bardi, recitar cantando, teatro musicale e opera."),
            ("Il basso continuo", "Forme", "Fondamento armonico della musica barocca e ruolo del clavicembalo."),
            ("Concerto grosso e concerto solista", "Forme", "Dialogo tra solisti e orchestra, concertino, tutti e strumento solista."),
            ("L'oratorio e la musica sacra", "Forme", "Narrazione religiosa, coro, solisti e grandi forme vocali."),
            ("Vivaldi. Il suono delle stagioni", "Autori", "Il violino solista dialoga con l'orchestra e trasforma le stagioni in paesaggio sonoro."),
            ("Bach e il contrappunto", "Autori", "Scrittura rigorosa, musica sacra, concerti e profondita costruttiva."),
            ("Handel e l'Europa musicale", "Autori", "Opera, oratorio, musica cerimoniale e grandi pubblici europei."),
            ("Verifica: riconoscere il Barocco", "Verifica", "Melodramma, concerto, oratorio, strumenti e autori principali."),
        ],
    },
    {
        "number": "05",
        "slug": "settecento-classicismo",
        "title": "Settecento e Classicismo",
        "nav_title": "Settecento e Classicismo",
        "category": "Forma e chiarezza",
        "period": "Seconda meta XVIII - primi anni XIX secolo",
        "accent": "#2f6fd6",
        "description": "Sinfonia, sonata, quartetto e concerto: il linguaggio musicale cerca equilibrio e proporzione.",
        "hero_subtitle": "Ordine, misura e chiarezza formale costruiscono un linguaggio che sembra naturale proprio perche e rigoroso.",
        "context_text": "Tra Illuminismo e cultura borghese il Settecento musicale costruisce un linguaggio chiaro, comunicativo e proporzionato, capace di aprirsi a nuovi pubblici e nuove sale.",
        "functions_text": "La musica organizza l'ascolto pubblico, rende leggibile la forma, valorizza il dialogo strumentale e definisce un nuovo equilibrio tra espressione e architettura.",
        "forms_text": "Forma-sonata, sinfonia, quartetto d'archi e concerto classico sono i modelli centrali attraverso cui leggere il nucleo.",
        "instruments_text": "L'orchestra classica, il quartetto d'archi, il pianoforte nascente e gli strumenti a fiato in organici piu stabili ridefiniscono il paesaggio sonoro.",
        "connections": [
            "Illuminismo e pubblico borghese",
            "Vienna e cultura europea",
            "forma-sonata e sviluppo",
            "musica da camera",
            "transizione verso Beethoven",
        ],
        "lexicon": ["sonata", "sviluppo", "ripresa", "sinfonia", "quartetto", "equilibrio"],
        "lessons": [
            ("Illuminismo e cultura musicale", "Contesto", "Ragione, equilibrio, pubblico borghese e nuova chiarezza musicale."),
            ("Lo stile classico", "Caratteri", "Ordine, simmetria, proporzione, semplicita e forma riconoscibile."),
            ("La forma-sonata", "Forme", "Esposizione, sviluppo, ripresa e architettura del discorso musicale."),
            ("La sinfonia", "Forme", "Orchestra classica, movimenti, equilibrio e ascolto pubblico."),
            ("Il quartetto d'archi", "Forme", "Dialogo tra strumenti, musica da camera e scrittura raffinata."),
            ("Il concerto classico", "Forme", "Solista e orchestra nel linguaggio equilibrato del Classicismo."),
            ("Haydn", "Autori", "Sinfonia, quartetto e costruzione del linguaggio classico."),
            ("Mozart", "Autori", "Opera, concerto, sinfonia e perfetto equilibrio espressivo."),
            ("Beethoven", "Autori", "Tra Classicismo e Romanticismo, forma, energia e nuova espressivita."),
            ("Verifica: riconoscere il Classicismo", "Verifica", "Illuminismo, forme classiche, autori e ascolti guidati."),
        ],
    },
    {
        "number": "06",
        "slug": "ottocento",
        "title": "L'Ottocento",
        "nav_title": "L'Ottocento",
        "category": "Emozione e identita",
        "period": "XIX secolo",
        "accent": "#a94d87",
        "description": "Romanticismo, pianoforte, lied, virtuosismo, opera, grande orchestra e scuole nazionali.",
        "hero_subtitle": "L'Ottocento mette insieme interiorita, teatro, virtuosisimo e identita dei popoli in un unico paesaggio musicale.",
        "context_text": "Il secolo romantico allarga il campo dell'ascolto: salotto, teatro, concerto, pianoforte, grande orchestra e culture nazionali convivono in una stagione di forte espansione espressiva.",
        "functions_text": "La musica racconta l'io, mette in scena passioni e conflitti, rappresenta nazioni, esalta l'interprete e amplia il potere narrativo dell'orchestra.",
        "forms_text": "Lied, notturno, opera italiana, dramma musicale, poema sinfonico, balletto e forma breve per pianoforte guidano la lettura del secolo.",
        "instruments_text": "Pianoforte, orchestra romantica, voce operistica e nuove possibilita tecniche definiscono il profilo timbrico dell'Ottocento.",
        "connections": [
            "romanticismo e interiorita",
            "teatro musicale italiano",
            "virtuosisimo e interprete",
            "folklore e scuole nazionali",
            "grande orchestra e racconto",
        ],
        "lexicon": ["lied", "virtuosisimo", "leitmotiv", "poema sinfonico", "verismo", "nazionalismo"],
        "lessons": [
            ("Il Romanticismo musicale", "Contesto", "Sentimento, immaginazione, natura, sogno e interiorita."),
            ("La musica dell'io", "Caratteri", "Emozione personale, liberta espressiva e nuova idea di artista."),
            ("Il pianoforte romantico", "Strumenti", "Notturno, preludio, studio, virtuosisimo e salotto borghese."),
            ("Il lied e la forma breve", "Forme", "Voce, pianoforte, poesia e racconto intimo."),
            ("Il virtuosismo", "Caratteri", "Paganini, Liszt e la figura dell'interprete straordinario."),
            ("Chopin, Schubert, Schumann e Liszt", "Autori", "Pianoforte, lied, carattere poetico e scrittura romantica."),
            ("L'opera italiana", "Forme", "Melodramma, aria, recitativo, coro, teatro e pubblico."),
            ("Rossini, Verdi e Puccini", "Autori", "Dall'opera buffa al melodramma romantico e verista."),
            ("Wagner e il dramma musicale", "Autori", "Leitmotiv, orchestra, mito e opera come arte totale."),
            ("Le scuole nazionali", "Contesto", "Identita dei popoli, folklore, danze e tradizioni musicali nazionali."),
            ("Poema sinfonico, balletto e grande orchestra", "Forme", "Orchestra romantica, musica descrittiva, danza e racconto sonoro."),
            ("Verifica: riconoscere l'Ottocento", "Verifica", "Romanticismo, opera, scuole nazionali, strumenti e autori."),
        ],
    },
    {
        "number": "07",
        "slug": "novecento",
        "title": "Il Novecento",
        "nav_title": "Il Novecento",
        "category": "Rotture e nuovi linguaggi",
        "period": "1900 - secondo dopoguerra",
        "accent": "#7057c9",
        "description": "Crisi della tonalita, avanguardie, rumore, tecnologia e nuovi modi di pensare la musica.",
        "hero_subtitle": "Il secolo breve cambia le regole dell'ascolto e apre linguaggi che mettono in crisi la tradizione tonale e la forma eredita.",
        "context_text": "Il Novecento musicale si muove tra guerre, citta, media, avanguardie e tecnologia, ridefinendo il rapporto fra suono, scrittura e ascolto.",
        "functions_text": "La musica sperimenta, provoca, frammenta, astrarre il timbro, accoglie il rumore e usa la tecnologia come materiale compositivo.",
        "forms_text": "Impressionismo, espressionismo, atonalita, dodecafonia, scritture grafiche e musica elettronica segnano le principali direttrici del nucleo.",
        "instruments_text": "Orchestra rinnovata, percussioni, strumenti trattati come timbro puro, studio di registrazione e dispositivi elettronici allargano il campo del suono.",
        "connections": [
            "guerre e modernita",
            "crisi della tonalita",
            "timbro e ritmo",
            "scritture nuove",
            "tecnologia del suono",
        ],
        "lexicon": ["atonalita", "dodecafonia", "impressionismo", "rumore", "partitura grafica", "elettronica"],
        "lessons": [
            ("Il contesto del Novecento", "Contesto", "Crisi, guerre, modernita, citta, tecnologia e trasformazione dell'ascolto."),
            ("La crisi della tonalita", "Caratteri", "Nuove armonie, dissonanza, instabilita e superamento delle regole."),
            ("Impressionismo musicale", "Forme", "Timbro, colore, atmosfera, scale nuove e suggestione sonora."),
            ("Espressionismo e atonalita", "Forme", "Tensione, frammentazione, inquietudine e linguaggio non tonale."),
            ("Schonberg e la dodecafonia", "Autori", "Serie di dodici suoni e nuova organizzazione del materiale musicale."),
            ("Stravinskij e il ritmo", "Autori", "Energia ritmica, danza, modernita e rottura della tradizione."),
            ("Futurismo, rumore e macchina", "Caratteri", "Rumori, citta moderna, velocita e nuovi materiali sonori."),
            ("Nuove scritture musicali", "Laboratorio", "Simboli non convenzionali, partiture grafiche e invenzione sonora."),
            ("Musica elettronica e sperimentazione", "Forme", "Tecnologia, studio di registrazione, suono manipolato e ricerca."),
            ("Verifica: riconoscere il Novecento", "Verifica", "Avanguardie, autori, linguaggi, ascolti e scritture nuove."),
        ],
    },
    {
        "number": "08",
        "slug": "jazz",
        "title": "Il jazz",
        "nav_title": "Il jazz",
        "category": "Ritmo e improvvisazione",
        "period": "Dalle radici afroamericane al presente",
        "accent": "#2f8c63",
        "description": "Blues, swing, bebop e improvvisazione: una musica fondata su dialogo, ritmo e liberta.",
        "hero_subtitle": "Il jazz nasce da memoria, ritmo e invenzione condivisa e costruisce un linguaggio fondato sull'ascolto reciproco.",
        "context_text": "Il nucleo segue la storia del jazz dalle radici afroamericane fino alle principali trasformazioni del Novecento, mettendo al centro ritmo, improvvisazione e dialogo tra musicisti.",
        "functions_text": "Il jazz e musica di comunita, resistenza, intrattenimento, danza, invenzione estemporanea e forte identita culturale.",
        "forms_text": "Spiritual, gospel, blues, primo jazz di New Orleans, swing, bebop, standard e fusion disegnano le tappe principali del percorso.",
        "instruments_text": "Voce, tromba, sax, clarinetto, contrabbasso, pianoforte, batteria e strumenti elettrici della fusion ridefiniscono il timbro jazzistico.",
        "connections": [
            "storia afroamericana",
            "blues e call and response",
            "danza e big band",
            "improvvisazione",
            "contaminazioni con il rock",
        ],
        "lexicon": ["swing", "blue notes", "standard", "improvvisazione", "bebop", "big band"],
        "lessons": [
            ("Le radici afroamericane", "Contesto", "Schiavitu, comunita, memoria, lavoro e nascita di un nuovo linguaggio."),
            ("Spiritual, gospel e blues", "Forme", "Canto, call and response, blue notes e radici espressive del jazz."),
            ("New Orleans e il primo jazz", "Contesto", "Bande, strumenti, collettivita e prime formazioni jazzistiche."),
            ("Swing e big band", "Forme", "Ritmo, danza, arrangiamento e grandi orchestre jazz."),
            ("Bebop e jazz moderno", "Forme", "Velocita, complessita armonica, improvvisazione e ascolto concentrato."),
            ("Improvvisazione e standard", "Caratteri", "Tema, variazione istantanea, dialogo e liberta controllata."),
            ("Jazz-rock e fusion", "Forme", "Incontro tra jazz, rock, strumenti elettrici e nuove sonorita."),
            ("Protagonisti del jazz", "Autori", "Armstrong, Ellington, Parker, Davis, Coltrane e altri riferimenti essenziali."),
            ("Verifica: riconoscere il jazz", "Verifica", "Ritmo sincopato, improvvisazione, strumenti, stili e ascolti."),
        ],
    },
    {
        "number": "09",
        "slug": "musica-leggera",
        "title": "La musica leggera",
        "nav_title": "La musica leggera",
        "category": "La canzone nei media",
        "period": "Novecento - eta digitale",
        "accent": "#d05f2d",
        "description": "Radio, dischi, televisione e streaming trasformano la canzone in linguaggio globale.",
        "hero_subtitle": "La canzone entra nei media e cambia scala: produzione, immagine e diffusione trasformano il modo di ascoltare e riconoscersi.",
        "context_text": "Il nucleo segue la musica leggera come storia della canzone nei media: industria discografica, pubblico di massa, culture giovanili e piattaforme digitali.",
        "functions_text": "La musica leggera intrattiene, racconta identita e generazioni, attraversa radio, cinema, televisione, festival, videoclip e streaming.",
        "forms_text": "Forma-canzone, rock and roll, pop, cantautorato, musical e colonne sonore sono gli assi principali del nucleo.",
        "instruments_text": "Voce amplificata, chitarra elettrica, sezione ritmica, sintetizzatori, studio di registrazione e produzione digitale determinano il paesaggio sonoro.",
        "connections": [
            "industria culturale",
            "pubblico di massa",
            "televisione e videoclip",
            "cultura giovanile",
            "streaming e playlist",
        ],
        "lexicon": ["strofa", "ritornello", "cantautore", "playlist", "hit", "produzione"],
        "lessons": [
            ("Che cos'e la musica leggera", "Contesto", "Canzone, pubblico di massa, intrattenimento e industria culturale."),
            ("La canzone moderna", "Forme", "Strofa, ritornello, testo, melodia e comunicazione diretta."),
            ("Industria discografica e media", "Contesto", "Disco, radio, televisione, festival, videoclip e streaming."),
            ("Rock and roll e cultura giovanile", "Forme", "Ritmo, chitarra elettrica, energia e nascita di nuovi pubblici."),
            ("Pop e musica commerciale", "Forme", "Linguaggi immediati, produzione, immagine e diffusione globale."),
            ("Cantautorato e racconto sociale", "Forme", "Testo, identita, impegno, emozioni e narrazione della realta."),
            ("Musical e colonne sonore", "Forme", "Teatro, cinema, immagine, scena e racconto musicale."),
            ("La canzone nell'eta digitale", "Contesto", "Streaming, social, playlist e trasformazione del consumo musicale."),
            ("Verifica: riconoscere la musica leggera", "Verifica", "Generi, media, forme della canzone e ascolti guidati."),
        ],
    },
    {
        "number": "10",
        "slug": "musica-etnica",
        "title": "La musica etnica",
        "nav_title": "La musica etnica",
        "category": "Culture e identita sonore",
        "period": "Tradizioni di lunga durata e contemporaneita",
        "accent": "#8b6b2e",
        "description": "Strumenti, ritmi, canti, riti e tradizioni mostrano come la musica custodisca identita.",
        "hero_subtitle": "Le musiche dei popoli raccontano rituali, oralita, strumenti e forme di appartenenza che attraversano tempi e luoghi diversi.",
        "context_text": "Il nucleo propone una geografia musicale di Africa, Asia, America Latina, Europa e Mediterraneo, mettendo a fuoco oralita, funzioni sociali e identita culturali.",
        "functions_text": "La musica etnica custodisce memoria, rito, festa, lavoro, danza, trasmissione orale e appartenenza di comunita spesso lontane dalla logica del repertorio scritto.",
        "forms_text": "Tradizioni orali, repertori di danza, canti rituali, musiche popolari regionali e pratiche di contaminazione contemporanea guidano il percorso.",
        "instruments_text": "Tamburi, corde, flauti, aerofoni rituali e strumenti costruiti con materiali locali rivelano il legame tra timbro, ambiente e funzione culturale.",
        "connections": [
            "oralita e memoria",
            "rito e danza",
            "strumenti del mondo",
            "aree culturali",
            "world music e contaminazioni",
        ],
        "lexicon": ["oralita", "poliritmia", "tradizione", "rito", "world music", "timbro"],
        "lessons": [
            ("Che cosa significa musica etnica", "Contesto", "Musiche dei popoli, tradizioni locali, comunita e identita culturale."),
            ("Musica popolare e oralita", "Caratteri", "Trasmissione orale, memoria collettiva, funzioni sociali e rituali."),
            ("Strumenti del mondo", "Strumenti", "Timbri, materiali e famiglie strumentali nelle diverse culture."),
            ("Ritmo, danza e rito", "Caratteri", "Corpo, movimento, celebrazione e funzione comunitaria della musica."),
            ("Musiche dell'Africa", "Contesto", "Poliritmia, percussioni, voce, danza e partecipazione collettiva."),
            ("Musiche dell'Asia", "Contesto", "Scale, timbri, tradizioni rituali e strumenti caratteristici."),
            ("Musiche dell'America Latina", "Contesto", "Ritmi, danze, contaminazioni e identita popolari."),
            ("Musiche d'Europa e del Mediterraneo", "Contesto", "Tradizioni locali, strumenti popolari, danze e repertori orali."),
            ("World music e contaminazioni", "Forme", "Incontro tra tradizioni, popular music e produzione contemporanea."),
            ("Verifica: riconoscere la musica etnica", "Verifica", "Strumenti, funzioni, aree culturali, ascolti e confronti."),
        ],
    },
]


def slugify_text(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    collapsed = re.sub(r"[^a-zA-Z0-9]+", "-", normalized.lower()).strip("-")
    return collapsed


def get_topic_positions(count: int) -> list[tuple[int, int]]:
    if count in TOPIC_LAYOUTS:
        return TOPIC_LAYOUTS[count]
    fallback = []
    x_slots = [14, 34, 56, 78]
    y_slots = [16, 38, 60, 82]
    for index in range(count):
        fallback.append((x_slots[index % len(x_slots)], y_slots[min(index // len(x_slots), len(y_slots) - 1)]))
    return fallback


def build_topic_phases(nucleo_title: str, lesson_title: str, category: str, summary: str) -> dict[str, dict]:
    lesson_title_lower = lesson_title[:1].lower() + lesson_title[1:]
    category_lower = category.lower()
    return {
        "scintilla": {
            "title": f"Perche partire da {lesson_title_lower}?",
            "body": f"La card apre una domanda semplice che attiva il lessico di {lesson_title_lower} e lo collega subito al quadro del nucleo.",
        },
        "rotta": {
            "title": f"Collocare {lesson_title_lower} dentro {nucleo_title}",
            "body": f"Qui la lezione viene situata nella timeline del nucleo, mettendo in evidenza periodo, funzioni e relazioni con gli altri snodi della lavagna.",
        },
        "orecchio": {
            "title": "Riconoscere gli indizi essenziali",
            "body": f"Gli indizi di ascolto e osservazione servono a trasformare la definizione in esperienza: {summary}",
        },
        "grafo": {
            "title": "Leggere i collegamenti della lavagna",
            "body": f"Il nodo mostra come la categoria {category_lower} dialoghi con contesto, forme, strumenti, autori, laboratorio e verifica.",
        },
        "cantiere": {
            "title": "Usare la lezione come snodo operativo",
            "body": "La classe puo ordinare parole chiave, esempi, confronti e collegamenti rapidi senza perdere il filo del capitolo.",
        },
        "varco": {
            "title": "Trasformare il contenuto in una restituzione",
            "body": f"Il passaggio operativo chiede una breve sintesi orale, scritta o visuale che fissi l'essenziale di {lesson_title_lower}.",
        },
        "ribalta": {
            "title": "Restituire con chiarezza",
            "body": "Titolo, lessico minimo, esempio e rapporto con il nucleo restano visibili e aiutano una restituzione breve ma precisa.",
        },
        "specchio": {
            "title": "Controllare comprensione e lessico",
            "body": f"La verifica controlla se sai collocare {lesson_title_lower} nella lavagna delle lezioni e descriverne funzione, caratteri o ascolti principali.",
        },
    }


def build_topic_map(nucleo: dict, lessons: list[tuple[str, str, str]]) -> dict:
    positions = get_topic_positions(len(lessons))
    nodes = []
    for index, (title, category, description) in enumerate(lessons, start=1):
        x, y = positions[index - 1]
        nodes.append(
            {
                "number": f"{index:02d}",
                "slug": slugify_text(title),
                "title": title,
                "subtitle": CATEGORY_SUBTITLE_MAP.get(category, "Lezione del nucleo"),
                "label": category,
                "x": x,
                "y": y,
                "summary": description,
                "phases": build_topic_phases(nucleo["title"], title, category, description),
            }
        )

    connections = []
    for index in range(len(nodes) - 1):
        connections.append(
            {
                "from": nodes[index]["number"],
                "to": nodes[index + 1]["number"],
                "kind": "main",
            }
        )

    return {
        "eyebrow": "Lavagna delle lezioni",
        "intro": f"La lavagna ordina le lezioni di {nucleo['title']} in una mappa didattica leggibile: contesto, caratteri, forme, strumenti, autori, ascolto, laboratorio e verifica restano tutti visibili.",
        "index_label": "Lavagna delle lezioni",
        "section_id": "lavagna",
        "cta_label": "Apri la lezione",
        "rail_label": "Lezioni del nucleo",
        "item_label": "Lezione",
        "nodes": nodes,
        "connections": connections,
    }


def build_author_cards(entry: dict, topic_map: dict) -> list[dict]:
    if entry.get("authors"):
        return copy.deepcopy(entry["authors"])

    lessons = topic_map["nodes"]
    selected = [item for item in lessons if item["label"] == "Autori"][:3]
    if not selected:
        selected = [item for item in lessons if item["label"] in {"Contesto", "Forme", "Strumenti"}][:3]
    return [
        {
            "name": item["title"],
            "work": item["summary"],
            "note": f"Snodo utile per orientarsi dentro {entry['title']}.",
        }
        for item in selected
    ]


def build_listening_cards(topic_map: dict) -> list[dict]:
    lessons = topic_map["nodes"]
    selected = [item for item in lessons if item["label"] == "Ascolto"][:1]
    selected.extend(item for item in lessons if item["label"] in {"Forme", "Caratteri", "Strumenti"} and item not in selected)
    selected = selected[:3]
    return [
        {
            "title": f"Ascolto guidato: {item['title']}",
            "focus": item["summary"],
        }
        for item in selected
    ]


def build_assignment(entry: dict) -> dict:
    first_titles = [title for title, _, _ in entry["lessons"][:3]]
    return {
        "scenario": f"La classe prepara una lavagna didattica sul nucleo {entry['title']} per un pubblico di studenti che deve orientarsi rapidamente nel capitolo.",
        "task": f"Seleziona i contenuti essenziali del nucleo, ordina le lezioni della lavagna e costruisci una spiegazione breve che colleghi contesto, caratteri, ascolti e lessico.",
        "product": "una lavagna sintetica, una presentazione o una scheda espositiva leggibile",
        "audience": "un'altra classe, un open day o un momento di restituzione interna",
        "materials": "card della lavagna, quaderno, LIM, immagini, ascolti, mappe e lessico del nucleo",
        "timing": "2 lezioni di preparazione e 1 lezione di restituzione",
        "steps": [
            f"seleziona tre snodi chiave tra {', '.join(first_titles)}",
            "ordina i materiali in una sequenza chiara",
            "aggiungi lessico minimo, esempio e collegamento storico",
            "prepara una restituzione breve e leggibile",
        ],
        "assessment": [
            "chiarezza dell'organizzazione",
            "uso corretto del lessico",
            "coerenza tra contesto, ascolto e forme",
            "capacita di collegare le lezioni della lavagna",
        ],
    }


def build_verification(entry: dict, topic_map: dict) -> dict:
    first = topic_map["nodes"][0]["title"]
    second = topic_map["nodes"][1]["title"] if len(topic_map["nodes"]) > 1 else topic_map["nodes"][0]["title"]
    return {
        "quick_check": [
            f"colloca {entry['title']} nella timeline generale di Accordia",
            f"riconosci il ruolo di {first} e {second} dentro la lavagna",
            "usa due parole del lessico minimo in modo corretto",
        ],
        "comprehension": [
            f"quali caratteri rendono riconoscibile {entry['title']}?",
            "come si collegano contesto, forme e strumenti nel nucleo?",
            "quali lezioni della lavagna useresti per spiegare il capitolo a un compagno?",
        ],
        "listening_test": f"Riconosci in un ascolto guidato indizi coerenti con {entry['title']}: timbri, funzioni, forme, pratiche o riferimenti storici.",
        "rubric": [
            "comprende la posizione storica del nucleo",
            "usa con precisione il lessico essenziale",
            "sa collegare le lezioni della lavagna",
            "argomenta con esempi chiari e pertinenti",
        ],
        "self_eval": [
            f"so collocare {entry['title']} nella timeline",
            "so usare la lavagna delle lezioni per orientarmi nel capitolo",
            "so collegare almeno tre snodi del nucleo con lessico corretto",
        ],
        "premium": "Spazio riservato a materiali premium futuri: ascolti guidati, schede stampabili e tracciati docente.",
    }


def build_editorial_nuclei() -> list[dict]:
    nuclei = []
    for entry in EDITORIAL_NUCLEI_BLUEPRINT:
        topic_map = build_topic_map(entry, entry["lessons"])
        lesson_titles = [title for title, _, _ in entry["lessons"]]
        graph_seed = ", ".join(lesson_titles[:4])
        nuclei.append(
            {
                "number": entry["number"],
                "slug": entry["slug"],
                "title": entry["title"],
                "nav_title": entry["nav_title"],
                "category": entry["category"],
                "period": entry["period"],
                "position": f"Nucleo {entry['number']} di 10 · linea principale del percorso",
                "accent": entry["accent"],
                "description": entry["description"],
                "hero_subtitle": entry["hero_subtitle"],
                "hero_note": f"Il nucleo ricompone {entry['title']} in un capitolo coerente con i manuali: panorama storico, lavagna delle lezioni, ascolti, lessico, attivita e verifica restano allineati nella stessa pagina.",
                "chapter_map": lesson_titles,
                "context_text": entry["context_text"],
                "functions_text": entry["functions_text"],
                "forms_text": entry["forms_text"],
                "instruments_text": entry["instruments_text"],
                "authors": build_author_cards(entry, topic_map),
                "listenings": build_listening_cards(topic_map),
                "connections": entry["connections"],
                "lexicon": entry["lexicon"],
                "summary_text": f"{entry['title']} tiene insieme quadro storico, lessico essenziale e una lavagna di lezioni che rende visibile il percorso didattico del nucleo.",
                "activities": [
                    "ordina le card della lavagna distinguendo contesto, forme, strumenti, autori e verifica",
                    f"metti a confronto {lesson_titles[0]} e {lesson_titles[min(1, len(lesson_titles) - 1)]}",
                    "prepara una sintesi con cinque parole chiave e due collegamenti storici",
                    "usa mini timeline e lavagna per spiegare il percorso del nucleo a un compagno",
                ],
                "spark_question": f"In che modo {entry['title'].lower()} cambia il modo di fare, ascoltare e capire la musica?",
                "rotta_text": f"La rotta colloca {entry['title']} nella timeline generale e mostra come la lavagna distribuisca il nucleo tra contesto, caratteri, forme, strumenti, autori e verifica.",
                "orecchio_text": f"Gli ascolti guidati aiutano a riconoscere i tratti principali del nucleo e a trasformare definizioni e date in indizi sonori concreti.",
                "grafo_text": f"La lavagna collega {graph_seed} e gli altri snodi del capitolo per rendere visibile l'ordine interno del percorso.",
                "cantiere_text": "Nel cantiere la classe usa le card del nucleo per ordinare contenuti, lessico, ascolti e confronti in una sequenza chiara e riusabile.",
                "assignment": build_assignment(entry),
                "verification": build_verification(entry, topic_map),
                "topic_map": topic_map,
            }
        )
    return nuclei


NUCLEI = build_editorial_nuclei()


def customize_barocco_context_lesson() -> None:
    barocco = next((nucleo for nucleo in NUCLEI if nucleo["slug"] == "barocco"), None)
    if not barocco:
        return

    topic_map = barocco.get("topic_map")
    if not topic_map:
        return

    context_topic = next((node for node in topic_map["nodes"] if node["number"] == "01"), None)
    vivaldi_topic = next((node for node in topic_map["nodes"] if node["number"] == "07"), None)

    if context_topic:
        context_topic["cta"] = "Apri la lezione"
        context_topic["lesson"] = {
            "panel_only": True,
            "immersive_preview": True,
            "immersive_mount_id": "immersive-barocco-context-root",
            "immersive_data_key": "barocco-in-coordinate",
            "immersive_stylesheet": "../../../../css/lesson-immersive.css",
            "immersive_module": "../../../../components/VivaldiSuonoStagioniLesson.module.js",
            "author": "Lezione Accordia · Il Barocco",
            "description": "Una sfera interattiva raccoglie le coordinate storiche e culturali del Barocco: movimento, contrasto, meraviglia, teatralita, energia, luce e ombra, gesto.",
        }

    if vivaldi_topic:
        vivaldi_topic["slug"] = "vivaldi-e-il-concerto"
        vivaldi_topic["subtitle"] = "Il concerto solista tra ascolto guidato e mosaico sonoro-cromatico"
        vivaldi_topic.pop("lesson", None)

    barocco["chapter_map"] = [node["title"] for node in topic_map["nodes"]]


customize_barocco_context_lesson()


def clone_data(value):
    return copy.deepcopy(value)


def merge_dicts(base: dict, override: dict) -> dict:
    merged = clone_data(base)
    for key, value in override.items():
        if key in merged and isinstance(merged[key], dict) and isinstance(value, dict):
            merged[key] = merge_dicts(merged[key], value)
        else:
            merged[key] = clone_data(value)
    return merged


def default_nuclei_overrides() -> dict[str, dict]:
    payload = {}
    for nucleo in NUCLEI:
        payload[nucleo["slug"]] = {field: nucleo[field] for field in EDITOR_NUCLEUS_FIELDS}
    return payload


def load_json_data(path: Path, default):
    if not path.exists():
        return clone_data(default)
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return clone_data(default)


def write_json_data(path: Path, payload) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def load_timeline_page_data() -> dict:
    raw = load_json_data(TIMELINE_PAGE_DATA_PATH, DEFAULT_TIMELINE_PAGE_DATA)
    return merge_dicts(DEFAULT_TIMELINE_PAGE_DATA, raw)


def save_timeline_page_data(payload: dict) -> None:
    normalized = merge_dicts(DEFAULT_TIMELINE_PAGE_DATA, payload)
    write_json_data(TIMELINE_PAGE_DATA_PATH, normalized)


def load_nuclei_overrides() -> dict[str, dict]:
    raw = load_json_data(NUCLEI_OVERRIDES_PATH, default_nuclei_overrides())
    merged = default_nuclei_overrides()
    for slug, values in raw.items():
        if slug in merged and isinstance(values, dict):
            for field in EDITOR_NUCLEUS_FIELDS:
                if field in values:
                    merged[slug][field] = values[field]
    return merged


def save_nuclei_overrides(payload) -> None:
    overrides = {}
    items = payload.values() if isinstance(payload, dict) else payload
    for item in items:
        slug = item["slug"]
        overrides[slug] = {field: item[field] for field in EDITOR_NUCLEUS_FIELDS if field in item}
    write_json_data(NUCLEI_OVERRIDES_PATH, overrides)

def get_nuclei() -> list[dict]:
    nuclei = clone_data(NUCLEI)
    overrides = load_nuclei_overrides()
    for nucleo in nuclei:
        for field, value in overrides.get(nucleo["slug"], {}).items():
            nucleo[field] = value
    return nuclei


def e(value: str) -> str:
    return escape(value, quote=True)


def page_href(path: str) -> str:
    if path.startswith(("#", "mailto:", "tel:", "http://", "https://", "javascript:", "data:")):
        return path
    if path.endswith("/"):
        return f"{path}index.html"
    return path


def link_button(label: str, href: str | None, variant: str, extra: str = "") -> str:
    if href:
        attrs = f' href="{e(page_href(href))}"'
        return f'<a class="button {variant}"{attrs}{extra}>{e(label)}</a>'
    return f'<span class="button {variant} button--muted"{extra} aria-disabled="true">{e(label)}</span>'


def nav_dropdown(prefix: str, active_slug: str | None = None) -> str:
    items = []
    for nucleo in get_nuclei():
        current = nucleo["slug"] == active_slug
        cls = ' class="is-current"' if current else ""
        aria = ' aria-current="page"' if current else ""
        items.append(
            f'<a href="{e(page_href(prefix + "nuclei/" + nucleo["slug"] + "/"))}"{cls}{aria}>{e(nucleo["number"])} {e(nucleo["nav_title"])}</a>'
        )
    return (
        '            <nav class="site-nav" aria-label="Navigazione principale">\n'
        '                <div class="site-nav__dropdown">\n'
        '                    <button class="site-nav__trigger" type="button" data-nav-link="timeline" aria-haspopup="true" aria-expanded="false">\n'
        '                        <span>Nuclei</span>\n'
        '                        <span class="site-nav__caret" aria-hidden="true"></span>\n'
        '                    </button>\n'
        '                    <div class="site-nav__menu" aria-label="Elenco dei nuclei">\n'
        f'                        {"".join(items)}\n'
        '                    </div>\n'
        '                </div>\n'
        f'                <a href="{e(page_href(f"{prefix}compiti/"))}" data-nav-link="compiti">Compiti di realta</a>\n'
        f'                <a href="{e(page_href(f"{prefix}docente/"))}" data-nav-link="docenti">Docenti</a>\n'
        f'                <a href="{e(page_href(f"{prefix}pages/risorse.html"))}" data-nav-link="strumenti">Strumenti</a>\n'
        '            </nav>'
    )


def build_static_prefix(path: Path) -> str:
    relative = path.relative_to(ROOT)
    depth = max(len(relative.parts) - 1, 0)
    return "../" * depth


def render_home_timeline_card(nucleo: dict) -> str:
    return f"""
                    <a class="home-era-card" href="{e(page_href('nuclei/' + nucleo['slug'] + '/'))}" style="--card-line: {e(nucleo['accent'])};" data-nucleus-link="{e(nucleo['slug'])}">
                        <span class="home-era-card__number">{e(nucleo['number'])}</span>
                        <span class="home-era-card__era">{e(nucleo['category'])}</span>
                        <strong>{e(nucleo['title'])}</strong>
                        <p>{e(nucleo['description'])}</p>
                        <span class="home-era-card__cta">Apri il nucleo</span>
                    </a>"""


def sync_static_navigation() -> None:
    for path in STATIC_PAGES:
        prefix = build_static_prefix(path)
        content = path.read_text(encoding="utf-8")
        updated = SITE_NAV_RE.sub("\n" + nav_dropdown(prefix), content, count=1)
        if updated != content:
            path.write_text(updated, encoding="utf-8")


def sync_home_timeline() -> None:
    path = ROOT / "index.html"
    content = path.read_text(encoding="utf-8")
    cards = "".join(render_home_timeline_card(nucleo) for nucleo in get_nuclei())
    replacement = f"""<div class="home-timeline__track" aria-label="Timeline orizzontale di Accordia">
{cards}
                </div>"""
    updated = HOME_TIMELINE_TRACK_RE.sub(replacement, content, count=1)
    if updated != content:
        path.write_text(updated, encoding="utf-8")


def find_nucleo(slug: str) -> dict:
    return next(nucleo for nucleo in get_nuclei() if nucleo["slug"] == slug)


def build_topic_relations(topic_map: dict) -> tuple[dict[str, list[str]], dict[str, dict]]:
    lookup = {node["number"]: node for node in topic_map["nodes"]}
    relations = {node["number"]: [] for node in topic_map["nodes"]}
    for connection in topic_map["connections"]:
        source = connection["from"]
        target = connection["to"]
        relations[source].append(target)
        relations[target].append(source)
    return relations, lookup


def render_nucleus_mini_links(current_slug: str, prefix: str) -> str:
    items = []
    for item in get_nuclei():
        attrs = [
            f'href="{e(page_href(prefix + "nuclei/" + item["slug"] + "/"))}"',
            f'style="--mini-accent: {e(item["accent"])};"',
            f'data-nucleus-link="{e(item["slug"])}"',
        ]
        if item["slug"] == current_slug:
            attrs.append('class="is-active"')
            attrs.append('aria-current="page"')
        items.append(
            f'<a {" ".join(attrs)}><span>{e(item["number"])}</span><strong>{e(item["nav_title"])}</strong></a>'
        )
    return "".join(items)


def render_phase_section(
    phase_entries: list[tuple[tuple[str, str, str], str, str]],
    heading: str,
    intro: str,
    section_id: str,
    aria_label: str,
) -> str:
    phase_links = []
    phase_cards = []
    for index, (phase, title, body) in enumerate(phase_entries, start=1):
        phase_id, phase_name, phase_subtitle = phase
        phase_links.append(f'<a href="#phase-{e(phase_id)}">{index:02d} {e(phase_name)}</a>')
        phase_cards.append(
            f"""<article class="nucleus-phase" id="phase-{e(phase_id)}">
                    <span class="nucleus-phase__order">{index:02d}</span>
                    <div class="nucleus-phase__content">
                        <p class="panel-label">{e(phase_name)} · {e(phase_subtitle)}</p>
                        <h3>{e(title)}</h3>
                        <p>{e(body)}</p>
                    </div>
                </article>"""
        )
    return f"""
        <section class="nucleus-section nucleus-section--method" id="{e(section_id)}">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">{e(heading)}</p>
                    <p>{e(intro)}</p>
                </div>
                <nav class="nucleus-phase-nav" aria-label="{e(aria_label)}">
                    {"".join(phase_links)}
                </nav>
                <div class="nucleus-phase-stack">
                    {"".join(phase_cards)}
                </div>
            </div>
        </section>"""


def render_nucleus_structure_section(nucleo: dict) -> str:
    phase_entries = [
        (
            PHASE_LABELS[0],
            nucleo["spark_question"],
            "La fase iniziale apre il capitolo con una domanda forte che sposta subito l'attenzione sul nodo storico-musicale del nucleo.",
        ),
        (
            PHASE_LABELS[1],
            f"Collocare {nucleo['title']} dentro la linea del tempo",
            nucleo["rotta_text"],
        ),
        (
            PHASE_LABELS[2],
            "Ascoltare gli indizi sonori del periodo",
            nucleo["orecchio_text"],
        ),
        (
            PHASE_LABELS[3],
            "Organizzare i concetti in una forma visiva leggibile",
            nucleo["grafo_text"],
        ),
        (
            PHASE_LABELS[4],
            "Rielaborare contenuti, lessico e confronti",
            nucleo["cantiere_text"],
        ),
        (
            PHASE_LABELS[5],
            "Trasformare il capitolo in un compito di realta",
            nucleo["assignment"]["scenario"],
        ),
        (
            PHASE_LABELS[6],
            "Restituire il lavoro in una forma pubblica",
            f"Il prodotto finale previsto e {nucleo['assignment']['product']}, pensato per {nucleo['assignment']['audience']}.",
        ),
        (
            PHASE_LABELS[7],
            "Verificare comprensione, ascolto e processo",
            nucleo["verification"]["listening_test"],
        ),
    ]
    return render_phase_section(
        phase_entries,
        "Struttura in 8 fasi",
        "Ogni nucleo segue una struttura stabile: la stessa progressione in otto fasi permette di passare dalla domanda iniziale alla valutazione finale senza perdere orientamento.",
        "struttura",
        "Otto fasi del nucleo",
    )


def render_topic_structure_section(topic: dict) -> str:
    phase_entries = []
    for phase in PHASE_LABELS:
        phase_id, _, _ = phase
        phase_data = topic["phases"][phase_id]
        phase_entries.append((phase, phase_data["title"], phase_data["body"]))
    return render_phase_section(
        phase_entries,
        "Percorso dell'argomento in 8 fasi",
        "Questo argomento si sviluppa in otto fasi: la struttura resta sempre riconoscibile, ma i contenuti cambiano in base al nodo tematico che hai aperto.",
        "struttura-argomento",
        "Percorso dell'argomento in 8 fasi",
    )


def render_topic_content_section(topic: dict) -> str:
    cards = []
    for phase in PHASE_LABELS:
        phase_id, _, default_subtitle = phase
        phase_data = topic["phases"][phase_id]
        label = phase_data.get("nav_subtitle", default_subtitle)
        cards.append(
            f"""<article class="nucleus-card">
                    <p class="panel-label">{e(label)}</p>
                    <h3>{e(phase_data["title"])}</h3>
                    <p>{e(phase_data["body"])}</p>
                </article>"""
        )

    return f"""
        <section class="nucleus-section" id="percorso-argomento">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">Dentro l'argomento</p>
                    <p>I contenuti sono raccolti in blocchi brevi e leggibili: domanda iniziale, contesto, ascolto, mappa, attivita, compito e verifica restano visibili senza trasformarsi in uno schema rigido.</p>
                </div>
                <div class="nucleus-card-grid">
                    {"".join(cards)}
                </div>
            </div>
        </section>"""


def render_paragraphs(text: str) -> str:
    paragraphs = [chunk.strip() for chunk in text.split("\n\n") if chunk.strip()]
    return "".join(f"<p>{e(paragraph)}</p>" for paragraph in paragraphs)


def asset_url(path: str) -> str:
    return f"{path}?v={ASSET_VERSION}"


def render_list(items: list[str], class_name: str = "nucleus-bullet-list") -> str:
    return f'<ul class="{e(class_name)}">{"".join(f"<li>{e(item)}</li>" for item in items)}</ul>'


def render_lesson_detail_blocks(blocks: list[dict]) -> str:
    rendered = []
    for block in blocks:
        kind = block.get("kind", "text")
        if kind == "list":
            content = render_list(block.get("items", []), "lesson-disclosure__list")
        elif kind == "quote":
            content = f'<blockquote class="lesson-quote">{e(block.get("text", ""))}</blockquote>'
        elif kind == "code":
            content = f'<pre class="lesson-code"><code>{e(block.get("text", ""))}</code></pre>'
        else:
            content = render_paragraphs(block.get("text", ""))
        rendered.append(
            f"""<details class="lesson-disclosure">
                    <summary>{e(block.get("label", "Approfondisci"))}</summary>
                    <div class="lesson-disclosure__body">
                        {content}
                    </div>
                </details>"""
        )
    return "".join(rendered)


def normalize_lesson_questions(items: list) -> list[dict]:
    normalized = []
    for item in items:
        if isinstance(item, dict):
            prompt = str(item.get("prompt", "")).strip()
            clue = str(item.get("clue", "")).strip()
        else:
            prompt = str(item).strip()
            clue = ""
        if prompt:
            normalized.append({"prompt": prompt, "clue": clue})
    return normalized


def normalize_lesson_keywords(items: list) -> list[dict]:
    normalized = []
    for item in items:
        if isinstance(item, dict):
            term = str(item.get("term", "")).strip()
            detail = str(item.get("detail", "")).strip()
        else:
            term = str(item).strip()
            detail = ""
        if term:
            normalized.append({"term": term, "detail": detail})
    return normalized


def normalize_lesson_gallery(items: list) -> list[dict]:
    normalized = []
    for index, item in enumerate(items, start=1):
        if isinstance(item, dict):
            label = str(item.get("label", "Immagine guida")).strip() or "Immagine guida"
            title = str(item.get("title", "")).strip()
            caption = str(item.get("caption", "")).strip()
            theme = str(item.get("theme", "earth")).strip() or "earth"
            src = str(item.get("src", "")).strip()
            alt = str(item.get("alt", title or caption or f"Visual {index}")).strip()
            credit = str(item.get("credit", "")).strip()
            stickers = [str(entry).strip() for entry in item.get("stickers", []) if str(entry).strip()]
        else:
            label = "Immagine guida"
            title = str(item).strip()
            caption = ""
            theme = "earth"
            src = ""
            alt = title or f"Visual {index}"
            credit = ""
            stickers = []

        if title or caption or src:
            normalized.append(
                {
                    "label": label,
                    "title": title or alt,
                    "caption": caption,
                    "theme": theme,
                    "src": src,
                    "alt": alt,
                    "credit": credit,
                    "stickers": stickers,
                }
            )
    return normalized


def find_lesson_detail_list(phase_data: dict, needles: tuple[str, ...]) -> list:
    for block in phase_data.get("details", []):
        if block.get("kind") != "list":
            continue
        label = block.get("label", "").lower()
        if any(needle in label for needle in needles):
            return block.get("items", [])
    return []


def find_lesson_detail_quote(phase_data: dict) -> str:
    for block in phase_data.get("details", []):
        if block.get("kind") == "quote" and block.get("text"):
            return block.get("text", "")
    return ""


def build_lesson_teacher_view(phase_data: dict) -> dict:
    custom = phase_data.get("teacher_view")
    if custom:
        return {
            "mission": custom.get("mission", phase_data.get("objective", "")),
            "regia_intro": custom.get("regia_intro", phase_data.get("teacher_activity", "")),
            "regia_points": custom.get("regia_points", []),
            "vista_classe": custom.get("vista_classe", phase_data.get("student_activity", "")),
            "toolkit": custom.get("toolkit", phase_data.get("materials", [])),
            "questions": normalize_lesson_questions(custom.get("questions", [])),
            "esito": custom.get("esito", phase_data.get("output", "")),
            "gallery": normalize_lesson_gallery(custom.get("gallery", phase_data.get("gallery", []))),
            "gallery_title": custom.get("gallery_title", phase_data.get("gallery_title", "Visual di fase")),
        }

    question_items = normalize_lesson_questions(find_lesson_detail_list(phase_data, ("domande",)))

    return {
        "mission": phase_data.get("objective", ""),
        "regia_intro": phase_data.get("teacher_activity", ""),
        "regia_points": [],
        "vista_classe": phase_data.get("student_activity", ""),
        "toolkit": phase_data.get("materials", []),
        "questions": question_items,
        "esito": phase_data.get("output", ""),
        "gallery": normalize_lesson_gallery(phase_data.get("gallery", [])),
        "gallery_title": phase_data.get("gallery_title", "Visual di fase"),
    }


def build_lesson_student_view(phase_data: dict) -> dict:
    custom = phase_data.get("student_view")
    if custom:
        return {
            "mission": custom.get("mission", phase_data.get("objective", "")),
            "in_class": custom.get("in_class", phase_data.get("student_activity", "")),
            "task": custom.get("task", phase_data.get("student_activity", "")),
            "observe": custom.get("observe", []),
            "questions": normalize_lesson_questions(custom.get("questions", [])),
            "keywords": normalize_lesson_keywords(custom.get("keywords", [])),
            "toolkit": custom.get("toolkit", phase_data.get("materials", [])),
            "remember": custom.get("remember", phase_data.get("output", "")),
            "gallery": normalize_lesson_gallery(custom.get("gallery", phase_data.get("gallery", []))),
            "gallery_title": custom.get("gallery_title", phase_data.get("gallery_title", "Spazio immagini")),
            "grafo_map": custom.get("grafo_map", phase_data.get("grafo_map")),
            "grafo_title": custom.get("grafo_title", phase_data.get("grafo_title", "Grafo fluttuante")),
        }

    question_items = normalize_lesson_questions(find_lesson_detail_list(phase_data, ("domande",)))
    keyword_items = normalize_lesson_keywords(find_lesson_detail_list(phase_data, ("parole", "lessico", "legenda")))
    observe_items = [item["prompt"] for item in question_items[:3]]
    remember_text = find_lesson_detail_quote(phase_data) or phase_data.get("output", "")

    return {
        "mission": phase_data.get("objective", ""),
        "in_class": phase_data.get("student_activity", ""),
        "task": phase_data.get("student_activity", ""),
        "observe": observe_items,
        "questions": question_items,
        "keywords": keyword_items,
        "toolkit": phase_data.get("materials", []),
        "remember": remember_text,
        "gallery": normalize_lesson_gallery(phase_data.get("gallery", [])),
        "gallery_title": phase_data.get("gallery_title", "Spazio immagini"),
        "grafo_map": phase_data.get("grafo_map"),
        "grafo_title": phase_data.get("grafo_title", "Grafo fluttuante"),
    }


def render_student_dashboard_card(body: str, title: str = "", kicker: str = "", class_name: str = "") -> str:
    if not body:
        return ""

    extra_class = f" {class_name}" if class_name else ""
    kicker_block = f'<span class="card-kicker">{e(kicker)}</span>' if kicker else ""
    title_block = f"<h3>{e(title)}</h3>" if title else ""
    return f"""<article class="card{extra_class}">
                {kicker_block}
                {title_block}
                <div class="card-body">
                    {body}
                </div>
            </article>"""


def render_student_grid(class_name: str, items: list[str]) -> str:
    rendered = [item for item in items if item]
    if not rendered:
        return ""

    extra_class = f" {class_name}--single" if len(rendered) == 1 else ""
    return f'<div class="{e(class_name)}{extra_class}">{"".join(rendered)}</div>'


def render_student_chip_list(items: list[str]) -> str:
    if not items:
        return ""
    return f'<div class="chips">{"".join(f"<span>{e(item)}</span>" for item in items)}</div>'


def render_student_materials_dock(items: list[str]) -> str:
    normalized = [str(item).strip() for item in items if str(item).strip()]
    if not normalized:
        return ""

    material_cards = "".join(f'<div class="material-card">{e(item)}</div>' for item in normalized)
    return f"""<footer class="materials-dock">
                <h3>Materiali didattici</h3>
                <div class="materials-grid">
                    {material_cards}
                </div>
            </footer>"""


def dedupe_lesson_texts(items: list[str]) -> list[str]:
    normalized = []
    seen = set()
    for item in items:
        text = re.sub(r"\s+", " ", str(item).strip())
        if not text:
            continue
        key = text.lower()
        if key in seen:
            continue
        seen.add(key)
        normalized.append(text)
    return normalized


def render_phase_tags(items: list[str]) -> str:
    normalized = dedupe_lesson_texts(items)[:4]
    if not normalized:
        return ""
    return f'<p class="phase-meta">{e(" · ".join(normalized))}</p>'


def build_phase_card_body(phase_id: str, phase_data: dict) -> tuple[str, str]:
    student_view = build_lesson_student_view(phase_data)
    primary_text = next(
        (
            text
            for text in [
                student_view.get("task", ""),
                student_view.get("in_class", ""),
                student_view.get("mission", ""),
                student_view.get("remember", ""),
            ]
            if str(text).strip()
        ),
        "",
    )
    prompts = [item["prompt"] for item in student_view["questions"] if item.get("prompt")]
    bullets = dedupe_lesson_texts(student_view["observe"] or prompts or student_view["toolkit"])[:4]
    body_parts = []
    if primary_text:
        body_parts.append(f"<p>{e(primary_text)}</p>")
    if bullets and phase_id != "grafo":
        body_parts.append(render_list(bullets, "phase-list"))
    elif bullets:
        body_parts.append(render_list(bullets[:3], "phase-list phase-list--compact"))

    keyword_terms = [item["term"] for item in student_view["keywords"] if item.get("term")]
    tag_candidates = list(phase_data.get("meta", [])[:1]) + keyword_terms
    if not tag_candidates:
        tag_candidates = list(student_view["toolkit"][:2])

    return "".join(body_parts), render_phase_tags(tag_candidates)


def render_lesson_panel_card(title: str, body: str, class_name: str = "") -> str:
    extra_class = f" {class_name}" if class_name else ""
    return f"""<section class="lesson-panel-card{extra_class}">
                <div class="lesson-panel-card__head">
                    <h4>{e(title)}</h4>
                </div>
                <div class="lesson-panel-card__body">
                    {body}
                </div>
            </section>"""


def render_lesson_tag_list(items: list[str], class_name: str = "lesson-panel-tags") -> str:
    if not items:
        return ""
    return f'<div class="{e(class_name)}">{"".join(f"<span>{e(item)}</span>" for item in items)}</div>'


def render_lesson_question_panel(title: str, items: list[dict]) -> str:
    if not items:
        return ""

    prompts = [item["prompt"] for item in items if item.get("prompt")]
    return render_lesson_panel_card(title, render_list(prompts, "lesson-panel-list"))


def render_lesson_observe_panel(title: str, items: list[str]) -> str:
    if not items:
        return ""
    return render_lesson_panel_card(title, render_list(items, "lesson-panel-list"))


def render_lesson_keyword_panel(title: str, items: list[dict]) -> str:
    if not items:
        return ""
    terms = [item["term"] for item in items if item.get("term")]
    return render_lesson_panel_card(title, render_lesson_tag_list(terms))


def render_lesson_materials_panel(items: list[str], title: str = "Materiali didattici") -> str:
    if not items:
        return ""
    return render_lesson_panel_card(
        title,
        render_lesson_tag_list(items),
        class_name="lesson-panel-card--materials",
    )


def render_lesson_meta_tags(items: list[str], class_name: str = "lesson-meta-tags") -> str:
    normalized = [str(item).strip() for item in items if str(item).strip()]
    if not normalized:
        return ""
    return f'<div class="{e(class_name)}">{"".join(f"<span>{e(item)}</span>" for item in normalized)}</div>'


def render_lesson_media_gallery_panel(title: str, items: list[dict]) -> str:
    if not items:
        return ""

    slides = []
    dots = []
    for index, item in enumerate(items):
        stickers = render_lesson_tag_list(item["stickers"], "lesson-media-slide__stickers") if item["stickers"] else ""
        image_src = item["src"]
        if image_src and not image_src.startswith(("http://", "https://", "data:")):
            image_src = asset_url(image_src)
        if image_src:
            frame = f'<img src="{e(image_src)}" alt="{e(item["alt"])}" loading="lazy">'
        else:
            frame = f"""<div class="lesson-media-slide__placeholder lesson-media-slide__placeholder--{e(item['theme'])}">
                            <strong>{e(item["title"])}</strong>
                            {stickers}
                        </div>"""

        credit = f'<small>{e(item["credit"])}</small>' if item["credit"] else ""
        slides.append(
            f"""<figure class="lesson-media-slide" data-media-slide>
                    <div class="lesson-media-slide__frame">
                        {frame}
                        <figcaption class="lesson-media-slide__caption">
                            <span>{e(item["label"])}</span>
                            <strong>{e(item["title"])}</strong>
                            <p>{e(item["caption"])}</p>
                            {credit}
                        </figcaption>
                    </div>
                </figure>"""
        )
        dots.append(
            f'<button type="button" data-media-dot aria-label="Vai all\'immagine {index + 1}" aria-pressed="{str(index == 0).lower()}" class="{"is-active" if index == 0 else ""}"></button>'
        )

    return render_lesson_panel_card(
        title,
        f"""<div class="lesson-media-carousel" data-media-carousel>
                <div class="lesson-media-carousel__viewport" data-media-carousel-viewport tabindex="0">
                    <div class="lesson-media-carousel__track">
                        {"".join(slides)}
                    </div>
                </div>
                <div class="lesson-media-carousel__controls">
                    <button type="button" class="lesson-media-carousel__arrow" data-media-prev aria-label="Immagine precedente">Prec</button>
                    <div class="lesson-media-carousel__dots">
                        {"".join(dots)}
                    </div>
                    <button type="button" class="lesson-media-carousel__arrow" data-media-next aria-label="Immagine successiva">Succ</button>
                </div>
            </div>""",
        class_name="lesson-panel-card--wide lesson-panel-card--visual",
    )


def render_floating_topic_map(topic_map: dict | None, class_name: str = "lesson-floating-map") -> str:
    if not topic_map or len(topic_map.get("nodes", [])) < 2:
        return ""

    relations, lookup = build_topic_relations(topic_map)
    lines = []
    for connection in topic_map["connections"]:
        source = lookup[connection["from"]]
        target = lookup[connection["to"]]
        extra_class = " nucleus-topic-map__line--main" if connection["kind"] == "main" else ""
        lines.append(
            f'<line class="nucleus-topic-map__line{extra_class}" data-topic-line data-topic-from="{e(connection["from"])}" data-topic-to="{e(connection["to"])}" x1="{source["x"]}" y1="{source["y"]}" x2="{target["x"]}" y2="{target["y"]}" />'
        )

    nodes = []
    for node in topic_map["nodes"]:
        related_titles = ", ".join(lookup[item]["title"] for item in relations[node["number"]])
        related_markup = (
            f'<span class="nucleus-topic-node__related">Si collega a: {e(related_titles)}</span>'
            if related_titles
            else ""
        )
        nodes.append(
            f"""<div class="nucleus-topic-node" data-topic-node data-topic-number="{e(node['number'])}" tabindex="0" style="--node-x: {node['x']}; --node-y: {node['y']};">
                    <span class="nucleus-topic-node__number">{e(node['number'])}</span>
                    <span class="nucleus-topic-node__label">{e(node['label'])}</span>
                    <strong>{e(node['title'])}</strong>
                    <p>{e(node['subtitle'])}</p>
                    <small>{e(node['summary'])}</small>
                    <span class="nucleus-topic-node__cta">Parola chiave in rete</span>
                    {related_markup}
                </div>"""
        )

    intro = render_paragraphs(topic_map.get("intro", "")) if topic_map.get("intro") else ""
    intro_block = f'<div class="lesson-floating-map__intro">{intro}</div>' if intro else ""

    return f"""{intro_block}
            <div class="nucleus-topic-map {e(class_name)}" data-topic-map>
                <svg class="nucleus-topic-map__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    {"".join(lines)}
                </svg>
                <div class="nucleus-topic-map__canvas">
                    {"".join(nodes)}
                </div>
            </div>"""


def render_lesson_floating_map_panel(title: str, topic_map: dict | None) -> str:
    map_markup = render_floating_topic_map(topic_map, "lesson-floating-map")
    if not map_markup:
        return ""

    return render_lesson_panel_card(
        title,
        map_markup,
        class_name="lesson-panel-card--wide lesson-panel-card--map",
    )


def render_lesson_teacher_mode(phase_data: dict) -> str:
    teacher_view = build_lesson_teacher_view(phase_data)
    regia_body = render_paragraphs(teacher_view["regia_intro"])
    if teacher_view["regia_points"]:
        regia_body += render_list(teacher_view["regia_points"], "lesson-panel-list")

    teacher_grid_cards = "".join(
        card
        for card in [
            render_lesson_panel_card("Vista classe", render_paragraphs(teacher_view["vista_classe"])),
            render_lesson_panel_card("Esito atteso", render_paragraphs(teacher_view["esito"])),
            render_lesson_materials_panel(teacher_view["toolkit"]),
        ]
        if card
    )

    return f"""<div class="lesson-mode-view lesson-mode-view--teacher" data-lesson-mode-panel="teacher" hidden>
                {render_lesson_panel_card("Missione didattica", render_paragraphs(teacher_view["mission"]), class_name="lesson-panel-card--wide lesson-panel-card--accent") if teacher_view["mission"] else ""}
                {render_lesson_panel_card("Regia", regia_body, class_name="lesson-panel-card--wide")}
                <div class="lesson-panel-grid">
                    {teacher_grid_cards}
                </div>
                {render_lesson_question_panel("Domande in ascolto", teacher_view["questions"])}
            </div>"""


def render_lesson_student_mode(phase_data: dict) -> str:
    student_view = build_lesson_student_view(phase_data)
    mission_body = render_paragraphs(student_view["mission"])
    if student_view["remember"]:
        mission_body += f"""<div class="student-panel__note">
                    <span class="card-kicker">Frase da ricordare</span>
                    {render_paragraphs(student_view["remember"])}
                </div>"""

    hero_grid = render_student_grid(
        "hero-grid",
        [
            render_student_dashboard_card(mission_body, kicker="Missione", class_name="card-primary") if student_view["mission"] or student_view["remember"] else "",
            render_student_dashboard_card(
                render_paragraphs(student_view["task"]),
                kicker="Cosa facciamo insieme",
                class_name="card-secondary",
            ) if student_view["task"] else "",
        ],
    )

    main_grid = render_student_grid(
        "main-grid",
        [
            render_student_dashboard_card(render_paragraphs(student_view["in_class"]), title="Come lavoriamo insieme") if student_view["in_class"] else "",
            render_student_dashboard_card(render_list(student_view["observe"], "student-list"), title="A cosa facciamo attenzione") if student_view["observe"] else "",
        ],
    )

    questions = [item["prompt"] for item in student_view["questions"] if item.get("prompt")]
    keywords = [item["term"] for item in student_view["keywords"] if item.get("term")]
    reflection_body = render_list(questions, "student-list") if questions else ""
    if keywords:
        reflection_body += f'<p class="student-inline-keywords"><strong>Parole che ritornano:</strong> {e(" · ".join(keywords))}</p>'
    reflection_grid = render_student_grid(
        "reflection-grid",
        [
            render_student_dashboard_card(reflection_body, title="Domande guida") if reflection_body else "",
        ],
    )

    map_panel = render_lesson_floating_map_panel(student_view["grafo_title"], student_view["grafo_map"])
    gallery_panel = render_lesson_media_gallery_panel(student_view["gallery_title"], student_view["gallery"])
    workspace_panels = "".join(panel for panel in [map_panel, gallery_panel] if panel)
    workspace_class = "student-workspace"
    if gallery_panel and not map_panel:
        workspace_class += " student-workspace--visual-only"
    elif map_panel and not gallery_panel:
        workspace_class += " student-workspace--map-only"
    elif map_panel and gallery_panel:
        workspace_class += " student-workspace--mixed"
    workspace_block = f'<div class="{workspace_class}">{workspace_panels}</div>' if workspace_panels else ""

    return f"""<div class="lesson-mode-view lesson-mode-view--student is-active" data-lesson-mode-panel="student">
                <section class="student-panel">
                    <header class="panel-header">
                        <div>
                            <span class="eyebrow">Spazio attivo</span>
                            <h2>Vista studenti</h2>
                        </div>
                    </header>
                    {hero_grid}
                    {main_grid}
                    {workspace_block}
                    {reflection_grid}
                    {render_student_materials_dock(student_view["toolkit"])}
                </section>
            </div>"""


def render_lesson_phase_explorer(topic: dict) -> str:
    lesson = topic["lesson"]
    default_phase = lesson.get("default_phase", PHASE_LABELS[0][0])
    topic_subtitle = str(topic.get("subtitle", "")).strip()
    phase_cards = []
    for index, phase in enumerate(PHASE_LABELS, start=1):
        phase_id, phase_name, default_subtitle = phase
        phase_data = lesson["phases"][phase_id]
        nav_subtitle = phase_data.get("nav_subtitle", default_subtitle)
        is_active = phase_id == default_phase
        active_class = " active" if is_active else ""
        body, tags = build_phase_card_body(phase_id, phase_data)
        phase_cards.append(
            f"""<article class="phase-card{active_class}" data-phase-card tabindex="0" aria-current="{'step' if is_active else 'false'}">
                    <div class="phase-rail" aria-hidden="true">
                        <span class="phase-marker">{index:02d}</span>
                    </div>
                    <div class="phase-card-shell">
                        <div class="phase-card-head">
                            <span class="phase-index">Tappa {index:02d}</span>
                            <span class="phase-badge">{e(nav_subtitle)}</span>
                        </div>
                        <h3 class="phase-title">{e(phase_data.get('panel_subtitle', phase_name))}</h3>
                        <div class="phase-body">
                            {body}
                        </div>
                        {tags}
                    </div>
                </article>"""
        )

    return f"""
        <section class="nucleus-section lesson-section lesson-section--explorer" id="lezione">
            <div class="shell">
                <section class="student-lesson-board" aria-label="Percorso della lezione">
                    <header class="lesson-board-header">
                        <div>
                            <span class="lesson-board-kicker">Percorso della lezione</span>
                            <h2>{e(topic['title'])}</h2>
                            <p>{e((topic_subtitle + ". " if topic_subtitle else "") + "Segui il percorso della lezione con una lettura ampia e continua, senza perdere il filo.")}</p>
                        </div>
                    </header>
                    <div class="lesson-flow" data-lesson-flow>
                        {"".join(phase_cards)}
                    </div>
                </section>
            </div>
        </section>"""


def render_immersive_lesson_mount(topic: dict) -> str:
    lesson = topic["lesson"]
    mount_id = lesson.get("immersive_mount_id", "immersive-lesson-root")
    data_key = lesson.get("immersive_data_key", topic["slug"])
    return f"""
        <section class="lesson-mount" id="lezione">
            <div id="{e(mount_id)}" data-immersive-lesson="{e(data_key)}"></div>
            <noscript>
                <section class="lesson-noscript">
                    <h2>JavaScript richiesto</h2>
                    <p>Questa versione della lezione usa componenti interattivi. Attiva JavaScript per visualizzarla.</p>
                </section>
            </noscript>
        </section>"""


def render_immersive_lesson_stylesheet(lesson: dict) -> str:
    stylesheet = lesson.get("immersive_stylesheet")
    if not stylesheet:
        return ""
    return f'\n    <link rel="stylesheet" href="{asset_url(stylesheet)}">'


def render_immersive_lesson_script(topic: dict) -> str:
    lesson = topic["lesson"]
    module_path = lesson.get("immersive_module")
    if not module_path:
        return ""
    mount_id = lesson.get("immersive_mount_id", "immersive-lesson-root")

    return f"""
    <script type="module">
        import React from "https://esm.sh/react@18";
        import {{ createRoot }} from "https://esm.sh/react-dom@18/client";
        import ImmersiveLesson from "{asset_url(module_path)}";

        const mountNode = document.getElementById("{e(mount_id)}");
        if (mountNode) {{
            createRoot(mountNode).render(React.createElement(ImmersiveLesson));
        }}
    </script>"""


def render_lesson_materials_section(topic: dict) -> str:
    lesson = topic["lesson"]
    teacher_sheet = lesson["materials_section"]["teacher_sheet"]
    student_sheet = lesson["materials_section"]["student_sheet"]
    media_items = []
    for item in lesson["materials_section"]["media"]:
        if item.get("url"):
            media_items.append(
                f'<li><a href="{e(item["url"])}" target="_blank" rel="noreferrer">{e(item["title"])}</a><span>{e(item["note"])}</span></li>'
            )
        else:
            media_items.append(f"<li><strong>{e(item['title'])}</strong><span>{e(item['note'])}</span></li>")

    references_preview = []
    for ref in lesson["references"]:
        references_preview.append(
            f'<li><a href="{e(ref["url"])}" target="_blank" rel="noreferrer">{e(ref["title"])}</a><span>{e(ref["note"])}</span></li>'
        )

    return f"""
        <section class="nucleus-section lesson-section lesson-section--materials" id="materiali">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">Materiali</p>
                    <p>La pagina raccoglie strumenti subito consultabili: scheda docente, scheda studente, tracce media e riferimenti didattici per consolidare o adattare la lezione.</p>
                </div>
                <div class="lesson-resource-grid">
                    <article class="lesson-resource-card">
                        <p class="panel-label">{e(teacher_sheet['title'])}</p>
                        <h3>Obiettivi, tempi, fasi e rubrica</h3>
                        <p>{e(teacher_sheet['summary'])}</p>
                        <details class="lesson-disclosure" open>
                            <summary>Apri la scheda docente</summary>
                            <div class="lesson-disclosure__body">
                                {render_list(teacher_sheet['items'], 'lesson-disclosure__list')}
                            </div>
                        </details>
                    </article>
                    <article class="lesson-resource-card">
                        <p class="panel-label">{e(student_sheet['title'])}</p>
                        <h3>Domanda iniziale, legenda e verifica</h3>
                        <p>{e(student_sheet['summary'])}</p>
                        <details class="lesson-disclosure" open>
                            <summary>Apri la scheda studente</summary>
                            <div class="lesson-disclosure__body">
                                {render_list(student_sheet['items'], 'lesson-disclosure__list')}
                            </div>
                        </details>
                    </article>
                    <article class="lesson-resource-card lesson-resource-card--media">
                        <p class="panel-label">Media</p>
                        <h3>Immagini, grafici e risorse facoltative</h3>
                        <ul class="lesson-link-list">
                            {"".join(media_items)}
                        </ul>
                        <div class="lesson-visual-stack">
                            <div class="lesson-visual lesson-visual--body">
                                <span>Voce</span>
                                <span>Respiro</span>
                                <span>Mani</span>
                                <span>Piedi</span>
                                <span>Torace</span>
                            </div>
                            <div class="lesson-visual lesson-visual--notation">
                                <strong>La partitura del corpo</strong>
                                <p>● mani · ▲ piede · ■ cosce · ○ voce · — pausa · X finale</p>
                                <code>▲ ▲ ● — | ▲ ▲ ● ○ | ■ ■ ● — | ● X</code>
                            </div>
                        </div>
                    </article>
                    <article class="lesson-resource-card">
                        <p class="panel-label">Riferimenti</p>
                        <h3>Fonti e ispirazioni didattiche</h3>
                        <ul class="lesson-link-list">
                            {"".join(references_preview)}
                        </ul>
                    </article>
                </div>
            </div>
        </section>"""


def render_lesson_inclusion_section(topic: dict) -> str:
    lesson = topic["lesson"]
    cards = []
    for note in lesson["inclusive_notes"]:
        title, body = note.split(":", 1)
        cards.append(
            f"""<article class="lesson-inclusion-card">
                    <h3>{e(title.strip())}</h3>
                    <p>{e(body.strip())}</p>
                </article>"""
        )

    return f"""
        <section class="nucleus-section lesson-section lesson-section--inclusive" id="accorgimenti-inclusivi">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">Accorgimenti inclusivi</p>
                    <p>La stessa attivita puo essere sostenuta da ruoli, mediatori e tempi differenti, senza perdere il carattere laboratoriale del percorso.</p>
                </div>
                <div class="lesson-inclusion-grid">
                    {"".join(cards)}
                </div>
            </div>
        </section>"""


def render_lesson_references_section(topic: dict) -> str:
    lesson = topic["lesson"]
    items = []
    for ref in lesson["references"]:
        items.append(
            f"""<li>
                    <a href="{e(ref['url'])}" target="_blank" rel="noreferrer">{e(ref['title'])}</a>
                    <p>{e(ref['note'])}</p>
                </li>"""
        )

    return f"""
        <section class="nucleus-section lesson-section lesson-section--references" id="riferimenti">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">Riferimenti</p>
                    <p>Le fonti di appoggio privilegiano la didattica musicale laboratoriale e offrono spunti coerenti con il lavoro su corpo, voce, gesto e notazione non convenzionale.</p>
                </div>
                <ul class="lesson-reference-list">
                    {"".join(items)}
                </ul>
            </div>
        </section>"""


def render_lesson_topic_page(nucleo: dict, topic_index: int, topic: dict) -> str:
    lesson = topic["lesson"]
    panel_only = bool(lesson.get("panel_only"))
    immersive_preview = bool(lesson.get("immersive_preview"))
    topic_map = nucleo["topic_map"]
    topics = topic_map["nodes"]
    prev_topic = topics[topic_index - 1] if topic_index > 0 else None
    next_topic = topics[topic_index + 1] if topic_index < len(topics) - 1 else None
    footer_prev = (
        f'<a href="{e(page_href("../" + prev_topic["slug"] + "/"))}">Argomento precedente</a>'
        if prev_topic
        else '<span class="site-footer__muted">Sei all\'inizio degli argomenti</span>'
    )
    footer_next = (
        f'<a href="{e(page_href("../" + next_topic["slug"] + "/"))}">Argomento successivo</a>'
        if next_topic
        else '<span class="site-footer__muted">Ultimo argomento della mappa</span>'
    )
    main_content = render_lesson_phase_explorer(topic) if lesson.get("phases") else ""
    footer_html = ""

    if panel_only and immersive_preview:
        main_content = f"""
        <nav class="nucleus-mini-timeline" aria-label="Mini timeline dei nuclei">
            <div class="shell nucleus-mini-timeline__track">
                {render_nucleus_mini_links(nucleo["slug"], "../../../../")}
            </div>
        </nav>

{render_topic_rail(nucleo, topic["slug"])}
{render_immersive_lesson_mount(topic)}"""
        footer_html = f"""
    <footer class="site-footer">
        <div class="shell site-footer__grid">
            <div>
                <strong>Accordia</strong>
                <p>{e(lesson['description'])}</p>
            </div>
            <div>
                <span class="site-footer__label">Navigazione dell'argomento</span>
                <a href="{e(page_href('../../'))}">Torna alla mappa del nucleo</a>
                {footer_prev}
                {footer_next}
            </div>
            <div>
                <span class="site-footer__label">Lezione</span>
                <a href="#lezione">Torna all'inizio della lezione</a>
                <a href="../../../../pages/lezioni.html">Lezioni guidate</a>
                <a href="../../../../index.html">Home</a>
            </div>
        </div>
    </footer>"""
    elif panel_only:
        main_content = f"""
        <nav class="nucleus-mini-timeline" aria-label="Mini timeline dei nuclei">
            <div class="shell nucleus-mini-timeline__track">
                {render_nucleus_mini_links(nucleo["slug"], "../../../../")}
            </div>
        </nav>

{render_topic_rail(nucleo, topic["slug"])}
{render_lesson_phase_explorer(topic)}"""

    if not panel_only:
        main_content = f"""
        <section class="nucleus-hero nucleus-hero--topic">
            <div class="shell nucleus-hero__grid">
                <div class="nucleus-hero__copy">
                    <p class="eyebrow">{e(lesson['author'])}</p>
                    <h1>{e(topic['title'])}</h1>
                    <p class="nucleus-hero__subtitle">{e(topic['subtitle'])}</p>
                    <p class="nucleus-hero__description">{e(lesson['description'])}</p>
                    <div class="nucleus-hero__meta">
                        {f'<span class="nucleus-chip">Orizzonte storico · {e(lesson["historical_range"])}</span>' if lesson.get("historical_range") else ""}
                        <span class="nucleus-chip">Classe · {e(lesson['classroom'])}</span>
                        <span class="nucleus-chip">Durata · {e(lesson['duration'])}</span>
                        <span class="nucleus-chip">Spazi · {e(lesson['spaces'])}</span>
                    </div>
                    <div class="nucleus-hero__actions">
                        <a class="button button--secondary" href="{e(page_href('../../'))}">Torna alla mappa del nucleo</a>
                        <a class="button button--secondary" href="#lezione">Vai alla lezione</a>
                        <a class="button button--primary" href="#materiali">Materiali della lezione</a>
                    </div>
                </div>
                <aside class="nucleus-hero__panel lesson-hero-panel">
                    <p class="panel-label">Dati rapidi</p>
                    <ul class="lesson-fact-list">
                        <li><strong>Argomento</strong><span>{e(topic['title'])} · {e(topic['subtitle'])}</span></li>
                        {f'<li><strong>Orizzonte storico</strong><span>{e(lesson["historical_range"])}</span></li>' if lesson.get("historical_range") else ""}
                        <li><strong>Classe consigliata</strong><span>{e(lesson['classroom'])}</span></li>
                        <li><strong>Durata</strong><span>{e(lesson['duration'])}</span></li>
                        <li><strong>Spazi</strong><span>{e(lesson['spaces'])}</span></li>
                        <li><strong>Materiali</strong><span>{e(lesson['materials_text'])}</span></li>
                    </ul>
                </aside>
            </div>
        </section>

        <nav class="nucleus-mini-timeline" aria-label="Mini timeline dei nuclei">
            <div class="shell nucleus-mini-timeline__track">
                {render_nucleus_mini_links(nucleo["slug"], "../../../../")}
            </div>
        </nav>

{render_topic_rail(nucleo, topic["slug"])}
{render_lesson_phase_explorer(topic)}
{render_lesson_materials_section(topic)}
{render_lesson_inclusion_section(topic)}
{render_lesson_references_section(topic)}"""
        footer_html = f"""
    <footer class="site-footer">
        <div class="shell site-footer__grid">
            <div>
                <strong>Accordia</strong>
                <p>{e(lesson['description'])}</p>
            </div>
            <div>
                <span class="site-footer__label">Navigazione dell'argomento</span>
                <a href="{e(page_href('../../'))}">Torna alla mappa del nucleo</a>
                {footer_prev}
                {footer_next}
            </div>
            <div>
                <span class="site-footer__label">Lezione</span>
                <a href="#lezione">Vai alla lezione</a>
                <a href="#materiali">Materiali e schede</a>
                <a href="#riferimenti">Riferimenti</a>
            </div>
        </div>
    </footer>"""

    return f"""<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{e(topic['title'])}: lezione completa del nucleo {e(nucleo['title'])}, con ascolto, attivita, materiali e riferimenti collegati.">
    <title>{e(topic['title'])} | {e(nucleo['title'])} | Accordia</title>
    <link rel="stylesheet" href="{asset_url('../../../../css/style.css')}">
{render_immersive_lesson_stylesheet(lesson) if immersive_preview else ""}
</head>
<body data-nav="timeline" data-current-nucleus="{e(nucleo['slug'])}">
    <header class="site-header">
        <div class="shell site-header__inner">
            <a class="brand" href="../../../../index.html">
                <span class="brand__mark">A</span>
                <span class="brand__text">
                    <strong>Accordia</strong>
                </span>
            </a>
        </div>
    </header>

    <main class="nucleus-page topic-page topic-page--lesson" style="--nucleus-accent: {e(nucleo['accent'])};">
{main_content}
    </main>

{footer_html}

    <script src="{asset_url('../../../../js/main.js')}"></script>
{render_immersive_lesson_script(topic) if immersive_preview else ""}
</body>
</html>
"""


def render_topic_map_section(
    nucleo: dict,
    show_intro: bool = True,
    intro_eyebrow: str | None = None,
    intro_text: str | None = None,
) -> str:
    topic_map = nucleo.get("topic_map")
    if not topic_map:
        return ""
    section_id = topic_map.get("section_id", "mappa")
    cta_label = topic_map.get("cta_label", "Apri l'argomento")

    relations, lookup = build_topic_relations(topic_map)
    lines = []
    for connection in topic_map["connections"]:
        source = lookup[connection["from"]]
        target = lookup[connection["to"]]
        extra_class = " nucleus-topic-map__line--main" if connection["kind"] == "main" else ""
        lines.append(
            f'<line class="nucleus-topic-map__line{extra_class}" data-topic-line data-topic-from="{e(connection["from"])}" data-topic-to="{e(connection["to"])}" x1="{source["x"]}" y1="{source["y"]}" x2="{target["x"]}" y2="{target["y"]}" />'
        )

    nodes = []
    for node in topic_map["nodes"]:
        related_titles = ", ".join(lookup[item]["title"] for item in relations[node["number"]])
        related_markup = (
            f'<span class="nucleus-topic-node__related">Si collega a: {e(related_titles)}</span>'
            if related_titles
            else ""
        )
        nodes.append(
            f"""<a class="nucleus-topic-node" data-topic-node data-topic-number="{e(node['number'])}" href="{e(page_href(f"argomenti/{node['slug']}/"))}" style="--node-x: {node['x']}; --node-y: {node['y']};">
                    <span class="nucleus-topic-node__number">{e(node['number'])}</span>
                    <span class="nucleus-topic-node__label">{e(node['label'])}</span>
                    <strong>{e(node['title'])}</strong>
                    <p>{e(node['subtitle'])}</p>
                    <small>{e(node['summary'])}</small>
                    <span class="nucleus-topic-node__cta">{e(node.get('cta', cta_label))}</span>
                    {related_markup}
                </a>"""
        )

    eyebrow = intro_eyebrow or topic_map["eyebrow"]
    text = intro_text or topic_map["intro"]

    intro_block = (
        f"""
                <div class="nucleus-section__intro">
                    <p class="eyebrow">{e(eyebrow)}</p>
                    <p>{e(text)}</p>
                </div>"""
        if show_intro
        else ""
    )

    return f"""
        <section class="nucleus-section nucleus-section--map" id="{e(section_id)}">
            <div class="shell">
                {intro_block}
                <div class="nucleus-topic-map" data-topic-map>
                    <svg class="nucleus-topic-map__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                        {"".join(lines)}
                    </svg>
                    <div class="nucleus-topic-map__canvas">
                        {"".join(nodes)}
                    </div>
                </div>
            </div>
        </section>"""


def render_topic_rail(nucleo: dict, current_slug: str) -> str:
    topic_map = nucleo.get("topic_map")
    if not topic_map:
        return ""
    rail_label = topic_map.get("rail_label", "Argomenti del nucleo")

    items = []
    for node in topic_map["nodes"]:
        current = node["slug"] == current_slug
        cls = ' class="is-active"' if current else ""
        aria = ' aria-current="page"' if current else ""
        items.append(
            f'<a href="{e(page_href("../" + node["slug"] + "/"))}"{cls}{aria} data-topic-rail-link><span>{e(node["number"])}</span><strong>{e(node["title"])}</strong></a>'
        )

    return f"""
        <nav class="topic-rail" aria-label="{e(rail_label)}">
            <div class="shell">
                <p class="topic-rail__eyebrow">{e(rail_label)}</p>
                <div class="topic-rail__track" data-topic-rail-track>
                    {"".join(items)}
                </div>
            </div>
        </nav>"""


def render_topic_page(nucleo: dict, topic_index: int, topic: dict) -> str:
    if topic.get("lesson"):
        return render_lesson_topic_page(nucleo, topic_index, topic)

    topic_map = nucleo["topic_map"]
    topics = topic_map["nodes"]
    relations, lookup = build_topic_relations(topic_map)
    prev_topic = topics[topic_index - 1] if topic_index > 0 else None
    next_topic = topics[topic_index + 1] if topic_index < len(topics) - 1 else None
    related_titles = [lookup[number]["title"] for number in relations[topic["number"]]]
    related_items = "".join(f"<li>{e(item)}</li>" for item in related_titles)
    footer_prev = (
        f'<a href="{e(page_href("../" + prev_topic["slug"] + "/"))}">Argomento precedente</a>'
        if prev_topic
        else '<span class="site-footer__muted">Sei all\'inizio degli argomenti</span>'
    )
    footer_next = (
        f'<a href="{e(page_href("../" + next_topic["slug"] + "/"))}">Argomento successivo</a>'
        if next_topic
        else '<span class="site-footer__muted">Ultimo argomento della mappa</span>'
    )

    return f"""<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{e(topic['title'])}: approfondimento del nucleo {e(nucleo['title'])}, con contenuti, ascolti, attivita e collegamenti utili.">
    <title>{e(topic['title'])} | {e(nucleo['title'])} | Accordia</title>
    <link rel="stylesheet" href="{asset_url('../../../../css/style.css')}">
</head>
<body data-nav="timeline" data-current-nucleus="{e(nucleo['slug'])}">
    <header class="site-header">
        <div class="shell site-header__inner">
            <a class="brand" href="../../../../index.html">
                <span class="brand__mark">A</span>
                <span class="brand__text">
                    <strong>Accordia</strong>
                </span>
            </a>
{nav_dropdown("../../../../", nucleo["slug"])}
        </div>
    </header>

    <main class="nucleus-page topic-page" style="--nucleus-accent: {e(nucleo['accent'])};">
        <section class="nucleus-hero nucleus-hero--topic">
            <div class="shell nucleus-hero__grid">
                <div class="nucleus-hero__copy">
                    <p class="eyebrow">Argomento {e(topic['number'])} · {e(nucleo['title'])}</p>
                    <h1>{e(topic['title'])}</h1>
                    <p class="nucleus-hero__subtitle">{e(topic['subtitle'])}</p>
                    <p class="nucleus-hero__description">{e(topic['summary'])}</p>
                    <div class="nucleus-hero__meta">
                        <span class="nucleus-chip">Categoria · {e(topic['label'])}</span>
                        <span class="nucleus-chip">Nucleo di riferimento · {e(nucleo['title'])}</span>
                    </div>
                    <div class="nucleus-hero__actions">
                        <a class="button button--secondary" href="{e(page_href('../../'))}">Torna alla mappa del nucleo</a>
                        {link_button("Argomento precedente" if prev_topic else "Inizio degli argomenti", f"../{prev_topic['slug']}/" if prev_topic else None, "button--secondary")}
                        {link_button("Argomento successivo" if next_topic else "Ultimo argomento", f"../{next_topic['slug']}/" if next_topic else None, "button--primary")}
                    </div>
                </div>
                <aside class="nucleus-hero__panel">
                    <p class="panel-label">Relazioni nella mappa</p>
                    <p>Questo nodo va letto dentro la rete del nucleo, non come un paragrafo isolato.</p>
                    <ul class="nucleus-bullet-list">
                        {related_items}
                    </ul>
                </aside>
            </div>
        </section>

        <nav class="nucleus-mini-timeline" aria-label="Mini timeline dei nuclei">
            <div class="shell nucleus-mini-timeline__track">
                {render_nucleus_mini_links(nucleo["slug"], "../../../../")}
            </div>
        </nav>

{render_topic_rail(nucleo, topic["slug"])}

        <section class="nucleus-section nucleus-section--index">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">Argomento in evidenza</p>
                    <p>Aprendo un nodo della mappa entri in una vista dedicata: qui trovi i contenuti essenziali dell'argomento, raccolti in blocchi chiari e vicini tra loro.</p>
                </div>
                <div class="nucleus-card-grid">
                    <article class="nucleus-card">
                        <p class="panel-label">Tema</p>
                        <p>{e(topic['summary'])}</p>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Si collega a</p>
                        <ul class="nucleus-bullet-list">
                            {related_items}
                        </ul>
                    </article>
                </div>
            </div>
        </section>

{render_topic_content_section(topic)}
    </main>

    <footer class="site-footer">
        <div class="shell site-footer__grid">
            <div>
                <strong>Accordia</strong>
                <p>{e(topic['summary'])}</p>
            </div>
            <div>
                <span class="site-footer__label">Navigazione dell'argomento</span>
                <a href="{e(page_href('../../'))}">Torna alla mappa del nucleo</a>
                {footer_prev}
                {footer_next}
            </div>
            <div>
                <span class="site-footer__label">Strumenti</span>
                <a href="{e(page_href('../../../../compiti/'))}">Compiti di realta</a>
                <a href="{e(page_href('../../../../pages/teoria.html'))}">Teoria in ascolto</a>
            </div>
        </div>
    </footer>

    <script src="{asset_url('../../../../js/main.js')}"></script>
</body>
</html>
"""


def render_timeline_card(nucleo: dict, prefix: str) -> str:
    return f"""
                    <a class="timeline-editorial-card" href="{e(page_href(prefix + "nuclei/" + nucleo["slug"] + "/"))}" style="--timeline-accent: {e(nucleo["accent"])};" data-timeline-link data-nucleus-link="{e(nucleo["slug"])}">
                        <span class="timeline-editorial-card__number">{e(nucleo["number"])}</span>
                        <span class="timeline-editorial-card__category">{e(nucleo["category"])}</span>
                        <strong>{e(nucleo["title"])}</strong>
                        <p>{e(nucleo["description"])}</p>
                        <span class="timeline-editorial-card__period">{e(nucleo["period"])}</span>
                        <span class="timeline-editorial-card__kind">Nucleo editoriale completo</span>
                        <span class="timeline-editorial-card__cta">Apri il nucleo</span>
                    </a>"""


def render_timeline_page_style(style: dict) -> str:
    return f"""
    <style>
        .timeline-editorial-hero {{
            padding: {style["hero_padding_top"]} 0 {style["hero_padding_bottom"]};
        }}

        .timeline-editorial-track {{
            padding: {style["track_padding_top"]} 0 {style["track_padding_bottom"]};
        }}

        .timeline-editorial-track__scroll {{
            gap: {style["card_gap"]};
            grid-auto-columns: {style["card_auto_columns"]};
        }}

        .timeline-editorial-card {{
            min-height: {style["card_min_height"]};
        }}
    </style>"""


def render_timeline_page() -> str:
    config = load_timeline_page_data()
    nuclei = get_nuclei()
    cards = "".join(render_timeline_card(nucleo, "../") for nucleo in nuclei)
    panel_items = "".join(f"<li>{e(item)}</li>" for item in config["hero"]["panel_items"])
    framework_cards = "".join(
        f"""
                <article class="timeline-editorial-framework__card">
                    <p class="panel-label">{e(card["eyebrow"])}</p>
                    <h3>{e(card["title"])}</h3>
                    <p>{e(card["body"])}</p>
                </article>"""
        for card in config["framework_cards"]
    )
    return f"""<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{e(config["meta_description"])}">
    <title>{e(config["page_title"])}</title>
    <link rel="stylesheet" href="{asset_url('../css/style.css')}">
{render_timeline_page_style(config["style"])}
</head>
<body data-nav="timeline">
    <header class="site-header">
        <div class="shell site-header__inner">
            <a class="brand" href="../index.html">
                <span class="brand__mark">A</span>
                <span class="brand__text">
                    <strong>Accordia</strong>
                </span>
            </a>
{nav_dropdown("../")}
        </div>
    </header>

    <main class="timeline-editorial-page">
        <section class="timeline-editorial-hero">
            <div class="shell timeline-editorial-hero__grid">
                <div class="timeline-editorial-hero__copy">
                    <p class="eyebrow">{e(config["hero"]["eyebrow"])}</p>
                    <h1>{e(config["hero"]["title"])}</h1>
                    <p class="lead">{e(config["hero"]["lead"])}</p>
                    <div class="timeline-editorial-hero__actions">
                        <a class="button button--primary" href="{e(page_href(config["hero"]["primary_cta_href"]))}">{e(config["hero"]["primary_cta_label"])}</a>
                        <a class="button button--secondary" href="{e(page_href(config["hero"]["secondary_cta_href"]))}">{e(config["hero"]["secondary_cta_label"])}</a>
                    </div>
                </div>
                <aside class="timeline-editorial-hero__panel">
                    <p class="panel-label">{e(config["hero"]["panel_label"])}</p>
                    <ul class="timeline-editorial-hero__list">
                        {panel_items}
                    </ul>
                </aside>
            </div>
        </section>

        <section class="timeline-editorial-track" id="timeline-track">
            <div class="shell">
                <div class="timeline-editorial-track__heading">
                    <div>
                        <p class="eyebrow">{e(config["track"]["eyebrow"])}</p>
                        <h2>{e(config["track"]["title"])}</h2>
                    </div>
                    <p>{e(config["track"]["body"])}</p>
                </div>
                <div class="timeline-editorial-track__scroll" data-scroll-track data-scroll-key="main-timeline">
{cards}
                </div>
                <p class="timeline-editorial-track__hint">{e(config["track"]["hint"])}</p>
            </div>
        </section>

        <section class="timeline-editorial-framework section">
            <div class="shell timeline-editorial-framework__grid">
{framework_cards}
            </div>
        </section>
    </main>

    <footer class="site-footer">
        <div class="shell site-footer__grid">
            <div>
                <strong>Accordia</strong>
                <p>{e(config["footer"]["summary"])}</p>
            </div>
            <div>
                <span class="site-footer__label">{e(config["footer"]["continue_label"])}</span>
                <a href="{e(page_href('../pages/lezioni.html'))}">Lezioni guidate</a>
                <a href="{e(page_href('../compiti/'))}">Compiti di realta</a>
            </div>
            <div>
                <span class="site-footer__label">{e(config["footer"]["project_label"])}</span>
                <a href="{e(page_href('../docente/'))}">Docenti</a>
                <a href="../index.html">Home</a>
            </div>
        </div>
    </footer>

    <script src="{asset_url('../js/main.js')}"></script>
</body>
</html>
"""


def render_section_cards(title: str, intro: str, cards: list[tuple[str, str]], wide: tuple[str, list[str]] | None = None) -> str:
    items = []
    for label, content in cards:
        items.append(
            f"""<article class="nucleus-card">
                    <p class="panel-label">{e(label)}</p>
                    <p>{e(content)}</p>
                </article>"""
        )
    if wide:
        wide_items = "".join(f"<li>{e(item)}</li>" for item in wide[1])
        items.append(
            f"""<article class="nucleus-card nucleus-card--wide">
                    <p class="panel-label">{e(wide[0])}</p>
                    <ul class="nucleus-bullet-list">
                        {wide_items}
                    </ul>
                </article>"""
        )
    return f"""
        <section class="nucleus-section" id="{e(title.lower())}">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">{e(title)}</p>
                    <p>{e(intro)}</p>
                </div>
                <div class="nucleus-card-grid">
                    {"".join(items)}
                </div>
            </div>
        </section>"""


def render_method_section(nucleo: dict) -> str:
    return render_nucleus_structure_section(nucleo)


def render_list_block(title: str, items: list[str], css_class: str = "nucleus-bullet-list") -> str:
    rendered = "".join(f"<li>{e(item)}</li>" for item in items)
    return f"""<article class="nucleus-card">
                    <p class="panel-label">{e(title)}</p>
                    <ul class="{e(css_class)}">
                        {rendered}
                    </ul>
                </article>"""


def render_nucleus_page(index: int, nucleo: dict, nuclei: list[dict]) -> str:
    prev_nucleo = nuclei[index - 1] if index > 0 else None
    next_nucleo = nuclei[index + 1] if index < len(nuclei) - 1 else None
    topic_map = nucleo.get("topic_map")
    map_only_landing = nucleo.get("landing_mode", "map-only") == "map-only"
    hero_subtitle = nucleo.get("hero_subtitle") or nucleo.get("description", "")
    page_description = (
        f"{nucleo['title']} in Accordia: titolo del nucleo e lavagna interattiva degli argomenti."
        if map_only_landing
        else f"{nucleo['title']} in Accordia: nucleo storico-musicale completo con contenuti da manuale, ascolti, compito di realta e verifica."
    )
    topic_map_feature = topic_map.get("index_label", "mappa visiva interconnessa degli argomenti").lower() if topic_map else ""
    footer_prev = (
        f'<a href="{e(page_href("../" + prev_nucleo["slug"] + "/"))}">Nucleo precedente</a>'
        if prev_nucleo
        else '<span class="site-footer__muted">Sei all\'inizio del percorso</span>'
    )
    footer_next = (
        f'<a href="{e(page_href("../" + next_nucleo["slug"] + "/"))}">Nucleo successivo</a>'
        if next_nucleo
        else '<span class="site-footer__muted">Ultima tappa della timeline</span>'
    )

    index_links = []
    if topic_map:
        index_links.append((f"#{topic_map.get('section_id', 'mappa')}", topic_map.get("index_label", "Mappa argomenti")))
    index_links.extend([
        ("#sintesi", "Sintesi"),
        ("#ascolti", "Ascolti"),
        ("#concetti", "Concetti chiave"),
        ("#autori", "Autori e opere"),
        ("#attivita", "Attivita"),
        ("#compito", "Compito di realta"),
        ("#verifica", "Verifica"),
    ])

    summary_cards = [
        ("Contesto storico", nucleo["context_text"]),
        ("Funzioni della musica", nucleo["functions_text"]),
        ("Forme e generi", nucleo["forms_text"]),
        ("Strumenti", nucleo["instruments_text"]),
    ]

    listening_cards = "".join(
        f"""<article class="nucleus-card">
                <p class="panel-label">Ascolto guidato</p>
                <h3>{e(item["title"])}</h3>
                <p>{e(item["focus"])}</p>
            </article>"""
        for item in nucleo["listenings"]
    )

    author_cards = "".join(
        f"""<article class="nucleus-card">
                <p class="panel-label">Autore o riferimento</p>
                <h3>{e(item["name"])}</h3>
                <p><strong>Opere o focus:</strong> {e(item["work"])}</p>
                <p>{e(item["note"])}</p>
            </article>"""
        for item in nucleo["authors"]
    )

    activity_cards = "".join(
        f'<li>{e(item)}</li>' for item in nucleo["activities"]
    )
    connection_cards = "".join(
        f'<li>{e(item)}</li>' for item in nucleo["connections"]
    )
    lexicon_cards = "".join(
        f'<li>{e(item)}</li>' for item in nucleo["lexicon"]
    )

    assignment_steps = "".join(f"<li>{e(step)}</li>" for step in nucleo["assignment"]["steps"])
    assignment_criteria = "".join(f"<li>{e(step)}</li>" for step in nucleo["assignment"]["assessment"])
    quick_check = "".join(f"<li>{e(item)}</li>" for item in nucleo["verification"]["quick_check"])
    comprehension = "".join(f"<li>{e(item)}</li>" for item in nucleo["verification"]["comprehension"])
    rubric = "".join(f"<li>{e(item)}</li>" for item in nucleo["verification"]["rubric"])
    self_eval = "".join(f"<li>{e(item)}</li>" for item in nucleo["verification"]["self_eval"])

    hero_panel = (
        f"""<aside class="nucleus-hero__panel">
                    <p class="panel-label">Dentro questo nucleo</p>
                    <p>{e(nucleo['hero_note'])}</p>
                    <ul class="nucleus-bullet-list">
                        <li>indice interno per orientarsi rapidamente</li>
                        {f"<li>{e(topic_map_feature)}</li>" if topic_map else ""}
                        <li>snodi del nucleo ordinati in modo chiaro e leggibile</li>
                        <li>contenuti storici, ascolti, autori e lessico</li>
                        <li>compito di realta, verifica e materiali docente</li>
                    </ul>
                </aside>"""
        if not map_only_landing
        else ""
    )

    hero_markup = (
        f"""
        <section class="nucleus-hero nucleus-hero--landing-clean">
            <div class="shell">
                <div class="nucleus-hero__copy nucleus-hero__copy--landing-clean">
                    <h1>{e(nucleo['title'])}</h1>
                    <p class="nucleus-hero__subtitle">{e(hero_subtitle)}</p>
                </div>
            </div>
        </section>"""
        if map_only_landing
        else f"""
        <section class="nucleus-hero">
            <div class="shell nucleus-hero__grid">
                <div class="nucleus-hero__copy">
                    <p class="eyebrow">Nucleo {e(nucleo['number'])} · {e(nucleo['category'])}</p>
                    <h1>{e(nucleo['title'])}</h1>
                    <p class="nucleus-hero__subtitle">{e(hero_subtitle)}</p>
                    <p class="nucleus-hero__description">{e(nucleo['description'])}</p>
                    <div class="nucleus-hero__meta">
                        <span class="nucleus-chip">Periodo storico · {e(nucleo['period'])}</span>
                        <span class="nucleus-chip">Posizione nella timeline · {e(nucleo['position'])}</span>
                    </div>
                    <div class="nucleus-hero__actions">
                        <a class="button button--secondary" href="{e(page_href('../../timeline/'))}">Torna alla timeline</a>
                        {link_button("Nucleo precedente" if prev_nucleo else "Inizio del percorso", f"../{prev_nucleo['slug']}/" if prev_nucleo else None, "button--secondary")}
                        {link_button("Nucleo successivo" if next_nucleo else "Fine della timeline", f"../{next_nucleo['slug']}/" if next_nucleo else None, "button--primary")}
                    </div>
                </div>
                {hero_panel}
            </div>
        </section>"""
    )

    mini_timeline_markup = (
        f"""
        <nav class="nucleus-mini-timeline" aria-label="Mini timeline dei nuclei">
            <div class="shell nucleus-mini-timeline__track">
                {render_nucleus_mini_links(nucleo["slug"], "../../")}
            </div>
        </nav>
"""
    )

    map_section_markup = (
        render_topic_map_section(
            nucleo,
            show_intro=True,
            intro_eyebrow="Lavagna fluttuante",
            intro_text="La lavagna fluttuante mostra in un colpo d'occhio i nodi del nucleo e i loro collegamenti. Ogni card apre una lezione.",
        )
        if map_only_landing
        else render_topic_map_section(nucleo)
    )

    footer_html = (
        ""
        if map_only_landing
        else f"""
    <footer class="site-footer">
        <div class="shell site-footer__grid">
            <div>
                <strong>Accordia</strong>
                <p>{e(nucleo['summary_text'])}</p>
            </div>
            <div>
                <span class="site-footer__label">Navigazione del nucleo</span>
                <a href="{e(page_href('../../timeline/'))}">Torna alla timeline</a>
                {footer_prev}
                {footer_next}
            </div>
            <div>
                <span class="site-footer__label">Strumenti</span>
                <a href="{e(page_href('../../compiti/'))}">Compiti di realta</a>
                <a href="{e(page_href('../../pages/lezioni.html'))}">Lezioni guidate</a>
            </div>
        </div>
    </footer>
"""
    )

    content_sections = (
        f"""
        <section class="nucleus-section nucleus-section--index">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">Indice del nucleo</p>
                    <p>La pagina si legge come un capitolo editoriale completo: prima la sintesi storica, poi la lavagna delle lezioni, quindi ascolti, concetti, autori, attivita, compito di realta e verifica.</p>
                </div>
                <nav class="nucleus-index" aria-label="Indice interno del nucleo">
                    {"".join(f'<a href="{e(href)}">{e(label)}</a>' for href, label in index_links)}
                </nav>
            </div>
        </section>

{map_section_markup}

        <section class="nucleus-section" id="sintesi">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">Sintesi</p>
                    <p>Qui i contenuti del manuale vengono rimontati in modo ordinato: contesto, funzioni, forme, strumenti e mappa del capitolo.</p>
                </div>
                <div class="nucleus-card-grid">
                    {"".join(
                        f'''<article class="nucleus-card">
                                <p class="panel-label">{e(label)}</p>
                                <p>{e(text)}</p>
                            </article>''' for label, text in summary_cards
                    )}
                    <article class="nucleus-card nucleus-card--wide">
                        <p class="panel-label">Selezione dei temi del nucleo</p>
                        <ul class="nucleus-bullet-list">
                            {"".join(f"<li>{e(item)}</li>" for item in nucleo["chapter_map"])}
                        </ul>
                    </article>
                    <article class="nucleus-card nucleus-card--wide">
                        <p class="panel-label">Sintesi finale</p>
                        <p>{e(nucleo["summary_text"])}</p>
                    </article>
                </div>
            </div>
        </section>

        <section class="nucleus-section" id="ascolti">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">Ascolti</p>
                    <p>Gli ascolti guidati servono a trasformare il capitolo in esperienza sonora, non in semplice nozione storica.</p>
                </div>
                <div class="nucleus-card-grid">
                    {listening_cards}
                </div>
            </div>
        </section>

        <section class="nucleus-section" id="concetti">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">Concetti chiave</p>
                    <p>Il nucleo tiene insieme lessico, collegamenti interdisciplinari e idee-forza da fissare con chiarezza.</p>
                </div>
                <div class="nucleus-card-grid">
                    <article class="nucleus-card">
                        <p class="panel-label">Collegamenti con arte, storia, societa e media</p>
                        <ul class="nucleus-bullet-list">
                            {connection_cards}
                        </ul>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Lessico minimo</p>
                        <ul class="nucleus-chip-list">
                            {''.join(f'<li>{e(item)}</li>' for item in nucleo["lexicon"])}
                        </ul>
                    </article>
                    <article class="nucleus-card nucleus-card--wide">
                        <p class="panel-label">Nodo del nucleo</p>
                        <p>{e(nucleo['description'])}</p>
                    </article>
                </div>
            </div>
        </section>

        <section class="nucleus-section" id="autori">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">Autori e opere</p>
                    <p>Non tutti i nuclei hanno autori nel senso moderno del termine, ma ogni capitolo identifica figure, tradizioni o repertori che orientano il riconoscimento storico-musicale.</p>
                </div>
                <div class="nucleus-card-grid">
                    {author_cards}
                </div>
            </div>
        </section>

        <section class="nucleus-section" id="attivita">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">Attivita</p>
                    <p>Le attivita servono a rielaborare il capitolo, non solo a ripeterlo: ordinano contenuti, ascolti e lessico in compiti gestibili e mirati.</p>
                </div>
                <div class="nucleus-card-grid">
                    <article class="nucleus-card">
                        <p class="panel-label">Attivita operative</p>
                        <ul class="nucleus-bullet-list">
                            {activity_cards}
                        </ul>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Piste di lavoro</p>
                        <ul class="nucleus-bullet-list">
                            {connection_cards}
                        </ul>
                    </article>
                </div>
            </div>
        </section>

        <section class="nucleus-section" id="compito">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">Compito di realta</p>
                    <p>Il compito trasforma il capitolo in azione significativa: richiede scenario, destinatario, tempi, materiali e criteri di riuscita dichiarati.</p>
                </div>
                <div class="nucleus-card-grid">
                    <article class="nucleus-card">
                        <p class="panel-label">Scenario</p>
                        <p>{e(nucleo['assignment']['scenario'])}</p>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Consegna</p>
                        <p>{e(nucleo['assignment']['task'])}</p>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Prodotto finale</p>
                        <p>{e(nucleo['assignment']['product'])}</p>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Destinatario</p>
                        <p>{e(nucleo['assignment']['audience'])}</p>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Materiali</p>
                        <p>{e(nucleo['assignment']['materials'])}</p>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Tempi</p>
                        <p>{e(nucleo['assignment']['timing'])}</p>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Fasi di lavoro</p>
                        <ul class="nucleus-bullet-list">
                            {assignment_steps}
                        </ul>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Criteri di valutazione</p>
                        <ul class="nucleus-bullet-list">
                            {assignment_criteria}
                        </ul>
                    </article>
                </div>
            </div>
        </section>

        <section class="nucleus-section" id="verifica">
            <div class="shell">
                <div class="nucleus-section__intro">
                    <p class="eyebrow">Verifica e materiali docente</p>
                    <p>La chiusura del nucleo mette insieme controllo delle conoscenze, prova di ascolto, rubrica valutativa, autovalutazione e materiali futuri per il docente.</p>
                </div>
                <div class="nucleus-card-grid">
                    <article class="nucleus-card">
                        <p class="panel-label">Verifica breve</p>
                        <ul class="nucleus-bullet-list">
                            {quick_check}
                        </ul>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Domande di comprensione</p>
                        <ul class="nucleus-bullet-list">
                            {comprehension}
                        </ul>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Prova di ascolto</p>
                        <p>{e(nucleo['verification']['listening_test'])}</p>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Rubrica valutativa</p>
                        <ul class="nucleus-bullet-list">
                            {rubric}
                        </ul>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Autovalutazione</p>
                        <ul class="nucleus-bullet-list">
                            {self_eval}
                        </ul>
                    </article>
                    <article class="nucleus-card">
                        <p class="panel-label">Materiali premium futuri</p>
                        <p>{e(nucleo['verification']['premium'])}</p>
                    </article>
                </div>
            </div>
        </section>"""
        if not map_only_landing
        else map_section_markup
    )

    return f"""<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{e(page_description)}">
    <title>{e(nucleo['title'])} | Accordia</title>
    <link rel="stylesheet" href="{asset_url('../../css/style.css')}">
</head>
<body data-nav="timeline" data-current-nucleus="{e(nucleo['slug'])}">
    <header class="site-header">
        <div class="shell site-header__inner">
            <a class="brand" href="../../index.html">
                <span class="brand__mark">A</span>
                <span class="brand__text">
                    <strong>Accordia</strong>
                </span>
            </a>
{nav_dropdown("../../", nucleo["slug"])}
        </div>
    </header>

    <main class="nucleus-page{' nucleus-page--map-only' if map_only_landing else ''}" style="--nucleus-accent: {e(nucleo['accent'])};">
{hero_markup}

{mini_timeline_markup}
{content_sections}
    </main>

{footer_html}

    <script src="{asset_url('../../js/main.js')}"></script>
</body>
</html>
"""


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def refresh_static_page_assets() -> None:
    sync_static_navigation()
    sync_home_timeline()
    for path in STATIC_PAGES:
        content = path.read_text(encoding="utf-8")
        updated = CSS_ASSET_RE.sub(
            lambda match: f'href="{match.group("path")}?v={ASSET_VERSION}"',
            content,
        )
        updated = JS_ASSET_RE.sub(
            lambda match: f'src="{match.group("path")}?v={ASSET_VERSION}"',
            updated,
        )
        if updated != content:
            path.write_text(updated, encoding="utf-8")


def main() -> None:
    nuclei = get_nuclei()
    nuclei_root = ROOT / "nuclei"
    if nuclei_root.exists():
        shutil.rmtree(nuclei_root)
    write(ROOT / "timeline" / "index.html", render_timeline_page())
    for index, nucleo in enumerate(nuclei):
        write(ROOT / "nuclei" / nucleo["slug"] / "index.html", render_nucleus_page(index, nucleo, nuclei))
        topic_map = nucleo.get("topic_map")
        if topic_map:
            for topic_index, topic in enumerate(topic_map["nodes"]):
                write(
                    ROOT / "nuclei" / nucleo["slug"] / "argomenti" / topic["slug"] / "index.html",
                    render_topic_page(nucleo, topic_index, topic),
                )
    refresh_static_page_assets()


if __name__ == "__main__":
    main()
