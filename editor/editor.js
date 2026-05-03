const PREVIEW_URL = "/timeline/index.html";
const API_CONFIG_URL = "/__editor_api/config";
const API_SAVE_URL = "/__editor_api/save";

const state = {
  data: null,
  selection: "hero",
  dirty: false,
  previewDocument: null,
};

const fixedSectionsEl = document.getElementById("fixed-sections");
const cardSectionsEl = document.getElementById("card-sections");
const inspectorFormEl = document.getElementById("inspector-form");
const inspectorTitleEl = document.getElementById("inspector-title");
const inspectorSubtitleEl = document.getElementById("inspector-subtitle");
const statusPillEl = document.getElementById("status-pill");
const previewFrameEl = document.getElementById("preview-frame");
const saveButtonEl = document.getElementById("save-button");
const reloadButtonEl = document.getElementById("reload-button");

const fixedSections = [
  { key: "hero", label: "Hero timeline", description: "Eyebrow, titolo, lead, CTA, pannello" },
  { key: "track", label: "Blocco timeline", description: "Eyebrow, titolo, testo, hint" },
  { key: "framework:0", label: "Card struttura", description: "Prima card finale" },
  { key: "framework:1", label: "Card percorso", description: "Seconda card finale" },
  { key: "framework:2", label: "Card didattica", description: "Terza card finale" },
  { key: "footer", label: "Footer", description: "Riepilogo timeline e label" },
  { key: "style", label: "Stile", description: "Padding, altezza card, gap, larghezza" },
];

function setStatus(label, kind = "") {
  statusPillEl.textContent = label;
  statusPillEl.className = "status-pill";
  if (kind) {
    statusPillEl.classList.add(`is-${kind}`);
  }
}

function markDirty() {
  state.dirty = true;
  setStatus("Modifiche non salvate", "dirty");
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function fieldWrapper(labelText, inputEl, hintText = "") {
  const wrapper = document.createElement("div");
  wrapper.className = "form-field";

  const label = document.createElement("label");
  label.textContent = labelText;
  wrapper.appendChild(label);
  wrapper.appendChild(inputEl);

  if (hintText) {
    const hint = document.createElement("p");
    hint.className = "form-hint";
    hint.textContent = hintText;
    wrapper.appendChild(hint);
  }

  return wrapper;
}

function createInput(value, onInput, type = "text") {
  const input = document.createElement("input");
  input.type = type;
  input.value = value ?? "";
  input.addEventListener("input", (event) => onInput(event.target.value));
  return input;
}

function createTextarea(value, onInput, rows = 4) {
  const textarea = document.createElement("textarea");
  textarea.rows = rows;
  textarea.value = value ?? "";
  textarea.addEventListener("input", (event) => onInput(event.target.value));
  return textarea;
}

function renderFixedSections() {
  fixedSectionsEl.innerHTML = "";
  fixedSections.forEach((section) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.select = section.key;
    if (state.selection === section.key) {
      button.classList.add("is-active");
    }
    button.innerHTML = `<div><strong>${section.label}</strong><span>${section.description}</span></div>`;
    button.addEventListener("click", () => select(section.key));
    fixedSectionsEl.appendChild(button);
  });
}

function renderCardSections() {
  cardSectionsEl.innerHTML = "";
  state.data.nuclei.forEach((card) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.select = `card:${card.slug}`;
    if (state.selection === `card:${card.slug}`) {
      button.classList.add("is-active");
    }
    button.innerHTML = `
      <span class="editor-card-swatch" style="background:${card.accent};"></span>
      <div>
        <strong>${card.title}</strong>
        <span>${card.category}</span>
      </div>
    `;
    button.addEventListener("click", () => select(`card:${card.slug}`));
    cardSectionsEl.appendChild(button);
  });
}

function parseSelection(selection) {
  const [type, value] = selection.split(":");
  return { type, value };
}

function select(selection) {
  state.selection = selection;
  renderFixedSections();
  renderCardSections();
  renderInspector();
  highlightSelection();
}

function getCardBySlug(slug) {
  return state.data.nuclei.find((item) => item.slug === slug);
}

function renderInspector() {
  inspectorFormEl.innerHTML = "";

  const selection = parseSelection(state.selection);

  if (selection.type === "hero") {
    inspectorTitleEl.textContent = "Hero timeline";
    inspectorSubtitleEl.textContent = "Modifica i testi introduttivi, le CTA e il pannello laterale della timeline.";

    const hero = state.data.timeline_page.hero;
    inspectorFormEl.appendChild(
      fieldWrapper("Eyebrow", createInput(hero.eyebrow, (value) => updateHero("eyebrow", value)))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("Titolo", createTextarea(hero.title, (value) => updateHero("title", value), 3))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("Lead", createTextarea(hero.lead, (value) => updateHero("lead", value), 6))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("CTA primaria", createInput(hero.primary_cta_label, (value) => updateHero("primary_cta_label", value)))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("CTA secondaria", createInput(hero.secondary_cta_label, (value) => updateHero("secondary_cta_label", value)))
    );
    inspectorFormEl.appendChild(
      fieldWrapper(
        "Label pannello",
        createInput(hero.panel_label, (value) => updateHero("panel_label", value))
      )
    );
    inspectorFormEl.appendChild(
      fieldWrapper(
        "Elenco pannello",
        createTextarea(hero.panel_items.join("\n"), (value) => {
          hero.panel_items = value
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean);
          afterStateChange();
        }, 6),
        "Una riga per ogni voce."
      )
    );
    return;
  }

  if (selection.type === "track") {
    inspectorTitleEl.textContent = "Blocco timeline";
    inspectorSubtitleEl.textContent = "Gestisci il blocco introduttivo sopra il rail orizzontale.";

    const track = state.data.timeline_page.track;
    inspectorFormEl.appendChild(
      fieldWrapper("Eyebrow", createInput(track.eyebrow, (value) => updateTrack("eyebrow", value)))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("Titolo", createTextarea(track.title, (value) => updateTrack("title", value), 3))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("Testo laterale", createTextarea(track.body, (value) => updateTrack("body", value), 5))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("Hint finale", createTextarea(track.hint, (value) => updateTrack("hint", value), 3))
    );
    return;
  }

  if (selection.type === "framework") {
    const index = Number(selection.value);
    const card = state.data.timeline_page.framework_cards[index];

    inspectorTitleEl.textContent = `Card finale ${index + 1}`;
    inspectorSubtitleEl.textContent = "Questa card corrisponde alla griglia finale della pagina timeline.";

    inspectorFormEl.appendChild(
      fieldWrapper("Eyebrow", createInput(card.eyebrow, (value) => updateFramework(index, "eyebrow", value)))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("Titolo", createTextarea(card.title, (value) => updateFramework(index, "title", value), 3))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("Testo", createTextarea(card.body, (value) => updateFramework(index, "body", value), 5))
    );
    return;
  }

  if (selection.type === "footer") {
    inspectorTitleEl.textContent = "Footer";
    inspectorSubtitleEl.textContent = "Riepilogo e label del footer della timeline.";

    const footer = state.data.timeline_page.footer;
    inspectorFormEl.appendChild(
      fieldWrapper("Riepilogo", createTextarea(footer.summary, (value) => updateFooter("summary", value), 5))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("Label colonna 2", createInput(footer.continue_label, (value) => updateFooter("continue_label", value)))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("Label colonna 3", createInput(footer.project_label, (value) => updateFooter("project_label", value)))
    );
    return;
  }

  if (selection.type === "style") {
    inspectorTitleEl.textContent = "Stile timeline";
    inspectorSubtitleEl.textContent = "Questi valori vengono salvati nella sorgente e applicati alla timeline generata.";

    const style = state.data.timeline_page.style;
    const grid = document.createElement("div");
    grid.className = "form-grid";
    grid.appendChild(
      fieldWrapper("Hero top", createInput(style.hero_padding_top, (value) => updateStyle("hero_padding_top", value)))
    );
    grid.appendChild(
      fieldWrapper("Hero bottom", createInput(style.hero_padding_bottom, (value) => updateStyle("hero_padding_bottom", value)))
    );
    grid.appendChild(
      fieldWrapper("Track top", createInput(style.track_padding_top, (value) => updateStyle("track_padding_top", value)))
    );
    grid.appendChild(
      fieldWrapper("Track bottom", createInput(style.track_padding_bottom, (value) => updateStyle("track_padding_bottom", value)))
    );
    grid.appendChild(
      fieldWrapper("Altezza card", createInput(style.card_min_height, (value) => updateStyle("card_min_height", value)))
    );
    grid.appendChild(
      fieldWrapper("Gap card", createInput(style.card_gap, (value) => updateStyle("card_gap", value)))
    );
    inspectorFormEl.appendChild(grid);
    inspectorFormEl.appendChild(
      fieldWrapper(
        "Larghezza card",
        createInput(style.card_auto_columns, (value) => updateStyle("card_auto_columns", value)),
        "Esempio: minmax(20rem, 20vw)"
      )
    );
    return;
  }

  if (selection.type === "card") {
    const card = getCardBySlug(selection.value);
    inspectorTitleEl.textContent = card.title;
    inspectorSubtitleEl.textContent = `Card ${card.number} · ${card.slug}`;

    inspectorFormEl.appendChild(
      fieldWrapper("Titolo", createTextarea(card.title, (value) => updateCard(card.slug, "title", value), 3))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("Titolo nav", createInput(card.nav_title, (value) => updateCard(card.slug, "nav_title", value)))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("Categoria", createInput(card.category, (value) => updateCard(card.slug, "category", value)))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("Periodo", createTextarea(card.period, (value) => updateCard(card.slug, "period", value), 3))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("Descrizione", createTextarea(card.description, (value) => updateCard(card.slug, "description", value), 5))
    );
    inspectorFormEl.appendChild(
      fieldWrapper("Accento", createInput(card.accent, (value) => updateCard(card.slug, "accent", value), "color"))
    );
    return;
  }

  inspectorTitleEl.textContent = "Inspector";
  inspectorSubtitleEl.textContent = "Seleziona un blocco.";
  inspectorFormEl.innerHTML = '<p class="editor-empty">Seleziona un blocco dalla sidebar o clicca nella preview.</p>';
}

function updateHero(key, value) {
  state.data.timeline_page.hero[key] = value;
  afterStateChange();
}

function updateTrack(key, value) {
  state.data.timeline_page.track[key] = value;
  afterStateChange();
}

function updateFramework(index, key, value) {
  state.data.timeline_page.framework_cards[index][key] = value;
  afterStateChange();
}

function updateFooter(key, value) {
  state.data.timeline_page.footer[key] = value;
  afterStateChange();
}

function updateStyle(key, value) {
  state.data.timeline_page.style[key] = value;
  afterStateChange();
}

function updateCard(slug, key, value) {
  const card = getCardBySlug(slug);
  card[key] = value;
  afterStateChange();
  if (key === "title" || key === "category" || key === "accent") {
    renderCardSections();
  }
}

function afterStateChange() {
  markDirty();
  applyStateToPreview();
}

function injectPreviewHelpers(doc) {
  let style = doc.getElementById("accordia-editor-overlay-style");
  if (!style) {
    style = doc.createElement("style");
    style.id = "accordia-editor-overlay-style";
    style.textContent = `
      [data-editor-target] { cursor: pointer; }
      [data-editor-target].is-editor-selected {
        outline: 3px solid #d35d2c;
        outline-offset: 6px;
        box-shadow: 0 0 0 10px rgba(211, 93, 44, 0.12);
      }
    `;
    doc.head.appendChild(style);
  }

  const hero = doc.querySelector(".timeline-editorial-hero");
  const track = doc.querySelector(".timeline-editorial-track");
  const footer = doc.querySelector(".site-footer");

  if (hero) hero.dataset.editorTarget = "hero";
  if (track) track.dataset.editorTarget = "track";
  if (footer) footer.dataset.editorTarget = "footer";

  doc.querySelectorAll(".timeline-editorial-framework__card").forEach((card, index) => {
    card.dataset.editorTarget = `framework:${index}`;
  });

  doc.querySelectorAll(".timeline-editorial-card").forEach((card) => {
    if (card.dataset.nucleusLink) {
      card.dataset.editorTarget = `card:${card.dataset.nucleusLink}`;
    }
  });

  doc.addEventListener(
    "click",
    (event) => {
      const target = event.target.closest("[data-editor-target]");
      if (!target) return;
      event.preventDefault();
      select(target.dataset.editorTarget);
    },
    true
  );
}

function buildLiveStyleText(style) {
  return `
    .timeline-editorial-hero { padding: ${style.hero_padding_top} 0 ${style.hero_padding_bottom}; }
    .timeline-editorial-track { padding: ${style.track_padding_top} 0 ${style.track_padding_bottom}; }
    .timeline-editorial-track__scroll { gap: ${style.card_gap}; grid-auto-columns: ${style.card_auto_columns}; }
    .timeline-editorial-card { min-height: ${style.card_min_height}; }
  `;
}

function applyStateToPreview() {
  const doc = state.previewDocument;
  if (!doc || !state.data) return;

  const config = state.data.timeline_page;
  const hero = config.hero;
  const track = config.track;

  const heroEyebrow = doc.querySelector(".timeline-editorial-hero__copy .eyebrow");
  const heroTitle = doc.querySelector(".timeline-editorial-hero__copy h1");
  const heroLead = doc.querySelector(".timeline-editorial-hero__copy .lead");
  const primaryButton = doc.querySelector(".timeline-editorial-hero__actions .button--primary");
  const secondaryButton = doc.querySelector(".timeline-editorial-hero__actions .button--secondary");
  const heroPanelLabel = doc.querySelector(".timeline-editorial-hero__panel .panel-label");
  const heroPanelList = doc.querySelector(".timeline-editorial-hero__list");

  if (heroEyebrow) heroEyebrow.textContent = hero.eyebrow;
  if (heroTitle) heroTitle.textContent = hero.title;
  if (heroLead) heroLead.textContent = hero.lead;
  if (primaryButton) {
    primaryButton.textContent = hero.primary_cta_label;
    primaryButton.setAttribute("href", hero.primary_cta_href);
  }
  if (secondaryButton) {
    secondaryButton.textContent = hero.secondary_cta_label;
    secondaryButton.setAttribute("href", hero.secondary_cta_href);
  }
  if (heroPanelLabel) heroPanelLabel.textContent = hero.panel_label;
  if (heroPanelList) {
    heroPanelList.innerHTML = hero.panel_items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  const trackEyebrow = doc.querySelector(".timeline-editorial-track__heading .eyebrow");
  const trackTitle = doc.querySelector(".timeline-editorial-track__heading h2");
  const trackBody = doc.querySelector(".timeline-editorial-track__heading > p");
  const trackHint = doc.querySelector(".timeline-editorial-track__hint");

  if (trackEyebrow) trackEyebrow.textContent = track.eyebrow;
  if (trackTitle) trackTitle.textContent = track.title;
  if (trackBody) trackBody.textContent = track.body;
  if (trackHint) trackHint.textContent = track.hint;

  doc.querySelectorAll(".timeline-editorial-framework__card").forEach((cardEl, index) => {
    const card = config.framework_cards[index];
    if (!card) return;
    const eyebrow = cardEl.querySelector(".panel-label");
    const title = cardEl.querySelector("h3");
    const body = cardEl.querySelector("p:last-child");
    if (eyebrow) eyebrow.textContent = card.eyebrow;
    if (title) title.textContent = card.title;
    if (body) body.textContent = card.body;
  });

  const footerSummary = doc.querySelector(".site-footer__grid > div:first-child p");
  const footerContinue = doc.querySelector(".site-footer__grid > div:nth-child(2) .site-footer__label");
  const footerProject = doc.querySelector(".site-footer__grid > div:nth-child(3) .site-footer__label");
  if (footerSummary) footerSummary.textContent = config.footer.summary;
  if (footerContinue) footerContinue.textContent = config.footer.continue_label;
  if (footerProject) footerProject.textContent = config.footer.project_label;

  state.data.nuclei.forEach((card) => {
    const cardEl = doc.querySelector(`.timeline-editorial-card[data-nucleus-link="${card.slug}"]`);
    if (!cardEl) return;
    const number = cardEl.querySelector(".timeline-editorial-card__number");
    const category = cardEl.querySelector(".timeline-editorial-card__category");
    const title = cardEl.querySelector("strong");
    const description = cardEl.querySelector("p");
    const period = cardEl.querySelector(".timeline-editorial-card__period");

    if (number) number.textContent = card.number;
    if (category) category.textContent = card.category;
    if (title) title.textContent = card.title;
    if (description) description.textContent = card.description;
    if (period) period.textContent = card.period;
    cardEl.style.setProperty("--timeline-accent", card.accent);
  });

  let liveStyle = doc.getElementById("accordia-editor-live-style");
  if (!liveStyle) {
    liveStyle = doc.createElement("style");
    liveStyle.id = "accordia-editor-live-style";
    doc.head.appendChild(liveStyle);
  }
  liveStyle.textContent = buildLiveStyleText(config.style);

  highlightSelection();
}

function highlightSelection() {
  const doc = state.previewDocument;
  if (!doc) return;
  doc.querySelectorAll(".is-editor-selected").forEach((el) => el.classList.remove("is-editor-selected"));
  const target = doc.querySelector(`[data-editor-target="${CSS.escape(state.selection)}"]`);
  if (target) {
    target.classList.add("is-editor-selected");
    target.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function loadConfig() {
  setStatus("Caricamento...");
  const response = await fetch(API_CONFIG_URL);
  if (!response.ok) {
    throw new Error("Impossibile caricare la configurazione dell'editor.");
  }
  const payload = await response.json();
  state.data = deepClone(payload);
  state.dirty = false;
  renderFixedSections();
  renderCardSections();
  renderInspector();
  loadPreview();
  setStatus("Pronto");
}

function loadPreview() {
  previewFrameEl.src = `${PREVIEW_URL}?editorPreview=${Date.now()}`;
}

previewFrameEl.addEventListener("load", () => {
  state.previewDocument = previewFrameEl.contentDocument;
  injectPreviewHelpers(state.previewDocument);
  applyStateToPreview();
});

async function saveChanges() {
  if (!state.data) return;
  setStatus("Salvataggio...", "saving");
  saveButtonEl.disabled = true;

  try {
    const response = await fetch(API_SAVE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state.data),
    });

    const payload = await response.json();
    if (!response.ok || !payload.ok) {
      throw new Error(payload.error || "Salvataggio non riuscito.");
    }

    state.dirty = false;
    setStatus("Salvato e rigenerato", "success");
    loadPreview();
  } catch (error) {
    setStatus("Errore di salvataggio", "error");
    window.alert(error.message);
  } finally {
    saveButtonEl.disabled = false;
  }
}

saveButtonEl.addEventListener("click", () => {
  saveChanges();
});

reloadButtonEl.addEventListener("click", () => {
  loadConfig().catch((error) => {
    setStatus("Errore di caricamento", "error");
    window.alert(error.message);
  });
});

window.addEventListener("beforeunload", (event) => {
  if (!state.dirty) return;
  event.preventDefault();
  event.returnValue = "";
});

loadConfig().catch((error) => {
  setStatus("Errore di caricamento", "error");
  window.alert(error.message);
});
