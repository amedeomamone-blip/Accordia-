const PREVIEW_URL = "/timeline/index.html";
const API_CONFIG_URL = "/__editor_api/config";
const API_SAVE_URL = "/__editor_api/save";

const state = {
  data: null,
  selection: "hero",
  dirty: false,
  previewDocument: null,
  previewOverlay: null,
  selectedElement: null,
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
const elementToolbarEl = document.getElementById("element-toolbar");
const elementToolbarTitleEl = document.getElementById("element-toolbar-title");
const elementToolbarSelectorEl = document.getElementById("element-toolbar-selector");
const elementToolbarControlsEl = document.getElementById("element-toolbar-controls");
const elementResetButtonEl = document.getElementById("element-reset-button");

const fixedSections = [
  { key: "hero", label: "Hero timeline", description: "Eyebrow, titolo, lead, CTA, pannello" },
  { key: "track", label: "Blocco timeline", description: "Eyebrow, titolo, testo, hint" },
  { key: "framework:0", label: "Card struttura", description: "Prima card finale" },
  { key: "framework:1", label: "Card percorso", description: "Seconda card finale" },
  { key: "framework:2", label: "Card didattica", description: "Terza card finale" },
  { key: "footer", label: "Footer", description: "Riepilogo timeline e label" },
  { key: "style", label: "Stile", description: "Padding, altezza card, gap, larghezza" },
];

const elementStyleFields = [
  { prop: "width", label: "Width" },
  { prop: "max-width", label: "Max width" },
  { prop: "min-height", label: "Min height" },
  { prop: "padding", label: "Padding" },
  { prop: "gap", label: "Gap" },
  { prop: "border-radius", label: "Radius" },
  { prop: "font-size", label: "Font size" },
  {
    prop: "font-weight",
    label: "Peso",
    type: "select",
    options: [
      { value: "", label: "Auto" },
      { value: "400", label: "400" },
      { value: "500", label: "500" },
      { value: "600", label: "600" },
      { value: "700", label: "700" },
      { value: "800", label: "800" },
    ],
  },
  { prop: "line-height", label: "Line height" },
  { prop: "letter-spacing", label: "Tracking" },
  { prop: "color", label: "Text color" },
  { prop: "background", label: "Background" },
  {
    prop: "text-align",
    label: "Align",
    type: "select",
    options: [
      { value: "", label: "Auto" },
      { value: "left", label: "Left" },
      { value: "center", label: "Center" },
      { value: "right", label: "Right" },
      { value: "justify", label: "Justify" },
    ],
  },
  { prop: "box-shadow", label: "Shadow" },
];

const elementStyleProps = new Set(elementStyleFields.map((field) => field.prop));

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

function createSelect(value, onInput, options) {
  const select = document.createElement("select");
  const normalizedValue = value ?? "";
  const items = [...options];
  if (normalizedValue && !items.some((item) => item.value === normalizedValue)) {
    items.unshift({ value: normalizedValue, label: normalizedValue });
  }

  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    select.appendChild(option);
  });

  select.value = normalizedValue;
  select.addEventListener("change", (event) => onInput(event.target.value));
  return select;
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

function getSelectionLabel() {
  const selection = parseSelection(state.selection);
  if (selection.type === "card") {
    const card = getCardBySlug(selection.value);
    return card ? `Card ${card.number} · ${card.title}` : "Card timeline";
  }
  if (selection.type === "framework") {
    return `Card finale ${Number(selection.value) + 1}`;
  }
  const fixed = fixedSections.find((item) => item.key === state.selection);
  return fixed ? fixed.label : "Blocco selezionato";
}

function getBlockHint() {
  const selection = parseSelection(state.selection);
  if (selection.type === "hero") {
    return "Trascina sopra o sotto per cambiare il respiro verticale.";
  }
  if (selection.type === "track") {
    return "Trascina sopra o sotto per aprire o stringere la fascia timeline.";
  }
  if (selection.type === "card") {
    return "Trascina il lato o l'angolo arancione per allargare o alzare tutte le card della timeline.";
  }
  return "";
}

function select(selection, options = {}) {
  state.selection = selection;
  if (options.clearElementSelection ?? true) {
    state.selectedElement = null;
  }
  renderFixedSections();
  renderCardSections();
  renderInspector();
  renderElementToolbar();
  highlightSelection({ scroll: options.scroll ?? true });
}

function getCardBySlug(slug) {
  return state.data.nuclei.find((item) => item.slug === slug);
}

function renderInspector() {
  inspectorFormEl.innerHTML = "";

  const selection = parseSelection(state.selection);

  if (selection.type === "hero") {
    inspectorTitleEl.textContent = "Hero timeline";
    inspectorSubtitleEl.textContent = "Modifica i testi introduttivi, le CTA e il pannello laterale della timeline. Nella preview puoi anche stirare il blocco trascinando sopra o sotto.";

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
      fieldWrapper("Label pannello", createInput(hero.panel_label, (value) => updateHero("panel_label", value)))
    );
    inspectorFormEl.appendChild(
      fieldWrapper(
        "Elenco pannello",
        createTextarea(
          hero.panel_items.join("\n"),
          (value) => {
            hero.panel_items = value
              .split("\n")
              .map((item) => item.trim())
              .filter(Boolean);
            afterStateChange();
          },
          6
        ),
        "Una riga per ogni voce."
      )
    );
    return;
  }

  if (selection.type === "track") {
    inspectorTitleEl.textContent = "Blocco timeline";
    inspectorSubtitleEl.textContent = "Gestisci il blocco introduttivo sopra il rail orizzontale. Nella preview puoi anche allungare il padding del blocco trascinando sopra o sotto.";

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
    inspectorSubtitleEl.textContent = "Questi valori vengono salvati nella sorgente e applicati alla timeline generata. Puoi anche modificarli trascinando le maniglie arancioni direttamente nella preview.";

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
        "Accetta anche valori semplici come 22rem. Nella preview puoi stirare le card trascinando il lato destro o l'angolo in basso."
      )
    );
    return;
  }

  if (selection.type === "card") {
    const card = getCardBySlug(selection.value);
    inspectorTitleEl.textContent = card.title;
    inspectorSubtitleEl.textContent = `Card ${card.number} · ${card.slug}. La geometria della card si regola dalla preview e vale per tutto il rail.`;

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

function updateStyleFromDrag(key, value) {
  state.data.timeline_page.style[key] = value;
  markDirty();
  applyStateToPreview();
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

function getElementOverrides() {
  if (!state.data.element_overrides) {
    state.data.element_overrides = {};
  }
  return state.data.element_overrides;
}

function getSelectedElementNode(doc = state.previewDocument) {
  if (!doc || !state.selectedElement) return null;
  return doc.querySelector(state.selectedElement.selector);
}

function getElementFieldValue(element, prop) {
  const selector = state.selectedElement?.selector;
  if (!selector) return "";

  const overrideValue = getElementOverrides()[selector]?.[prop];
  if (overrideValue) {
    return overrideValue;
  }

  const computed = state.previewDocument.defaultView.getComputedStyle(element);
  if (prop === "width") {
    return pxToRem(element.getBoundingClientRect().width, state.previewDocument);
  }
  if (prop === "background") {
    return computed.backgroundColor;
  }

  const value = computed.getPropertyValue(prop);
  return value ? value.trim() : "";
}

function renderElementToolbar() {
  elementToolbarControlsEl.innerHTML = "";

  const element = getSelectedElementNode();
  if (!state.selectedElement || !element) {
    elementToolbarEl.hidden = true;
    return;
  }

  elementToolbarEl.hidden = false;
  elementToolbarTitleEl.textContent = state.selectedElement.label;
  elementToolbarSelectorEl.textContent = state.selectedElement.selector;

  elementStyleFields.forEach((field) => {
    const currentValue = getElementFieldValue(element, field.prop);
    const control =
      field.type === "select"
        ? createSelect(currentValue, (value) => updateElementOverride(field.prop, value), field.options)
        : createInput(currentValue, (value) => updateElementOverride(field.prop, value));

    elementToolbarControlsEl.appendChild(fieldWrapper(field.label, control));
  });

  elementResetButtonEl.disabled = !getElementOverrides()[state.selectedElement.selector];
}

function updateElementOverride(prop, value) {
  if (!state.selectedElement || !elementStyleProps.has(prop)) return;

  const selector = state.selectedElement.selector;
  const overrides = getElementOverrides();
  const rules = { ...(overrides[selector] || {}) };
  const normalizedValue = String(value ?? "").trim();

  if (normalizedValue) {
    rules[prop] = normalizedValue;
    overrides[selector] = rules;
  } else {
    delete rules[prop];
    if (Object.keys(rules).length) {
      overrides[selector] = rules;
    } else {
      delete overrides[selector];
    }
  }

  markDirty();
  applyStateToPreview();
}

function resetSelectedElementOverrides() {
  if (!state.selectedElement) return;
  delete getElementOverrides()[state.selectedElement.selector];
  markDirty();
  applyStateToPreview();
  renderElementToolbar();
}

function injectPreviewHelpers(doc) {
  let style = doc.getElementById("accordia-editor-overlay-style");
  if (!style) {
    style = doc.createElement("style");
    style.id = "accordia-editor-overlay-style";
    style.textContent = `
      [data-editor-target] { cursor: pointer; }
      [data-editor-selectable] { cursor: crosshair; }
      [data-editor-target].is-editor-selected,
      [data-editor-selectable].is-editor-selected {
        outline: 2px solid rgba(211, 93, 44, 0.52);
        outline-offset: 4px;
      }
      #accordia-editor-overlay-root {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 2147483647;
      }
      .accordia-editor-selection-box {
        position: fixed;
        border: 2px solid #d35d2c;
        border-radius: 1.75rem;
        box-shadow: 0 18px 40px rgba(211, 93, 44, 0.18);
      }
      .accordia-editor-selection-label {
        position: absolute;
        top: 0;
        left: 1rem;
        transform: translateY(calc(-100% - 0.7rem));
        min-width: 12rem;
        max-width: min(22rem, calc(100vw - 3rem));
        padding: 0.7rem 0.85rem;
        border-radius: 1rem;
        background: #d35d2c;
        color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
        box-shadow: 0 16px 28px rgba(211, 93, 44, 0.22);
      }
      .accordia-editor-selection-label strong {
        display: block;
        font-size: 0.82rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .accordia-editor-selection-label span {
        display: block;
        margin-top: 0.35rem;
        font-size: 0.79rem;
        line-height: 1.4;
        color: rgba(255, 255, 255, 0.88);
      }
      .accordia-editor-selection-handles {
        position: absolute;
        inset: 0;
      }
      .accordia-editor-handle {
        position: absolute;
        border: 0;
        background: #d35d2c;
        box-shadow: 0 14px 26px rgba(211, 93, 44, 0.3);
        pointer-events: auto;
        cursor: pointer;
      }
      .accordia-editor-handle::before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        border: 1px solid rgba(255, 255, 255, 0.45);
        border-radius: inherit;
      }
      .accordia-editor-handle.is-top,
      .accordia-editor-handle.is-bottom {
        left: 50%;
        width: 4.4rem;
        height: 0.9rem;
        transform: translate(-50%, -50%);
        border-radius: 999px;
        cursor: ns-resize;
      }
      .accordia-editor-handle.is-top { top: 0; }
      .accordia-editor-handle.is-bottom { top: 100%; }
      .accordia-editor-handle.is-right {
        top: 50%;
        left: 100%;
        width: 0.95rem;
        height: 4.4rem;
        transform: translate(-50%, -50%);
        border-radius: 999px;
        cursor: ew-resize;
      }
      .accordia-editor-handle.is-corner {
        top: 100%;
        left: 100%;
        width: 1.2rem;
        height: 1.2rem;
        transform: translate(-50%, -50%);
        border-radius: 999px;
        cursor: nwse-resize;
      }
      body.is-editor-dragging,
      body.is-editor-dragging * {
        user-select: none !important;
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

  doc
    .querySelectorAll(".site-header *, .timeline-editorial-page *, .site-footer *")
    .forEach((element) => {
      if (isEditableElement(element, doc)) {
        element.dataset.editorSelectable = "true";
      }
    });

  state.previewOverlay = ensurePreviewOverlay(doc);

  doc.addEventListener(
    "click",
    (event) => {
      const editable = resolveEditableElement(event.target, doc);
      if (!editable) return;

      event.preventDefault();
      state.selectedElement = describeEditableElement(editable);
      renderElementToolbar();

      const semanticTarget = editable.closest("[data-editor-target]");
      if (semanticTarget) {
        select(semanticTarget.dataset.editorTarget, { scroll: false, clearElementSelection: false });
      } else {
        highlightSelection({ scroll: false });
      }
    },
    true
  );

  doc.addEventListener("scroll", schedulePreviewOverlayRefresh, true);
  doc.defaultView.addEventListener("resize", schedulePreviewOverlayRefresh);
}

function isEditableElement(element, doc = state.previewDocument) {
  if (!element || !doc || element.nodeType !== Node.ELEMENT_NODE) return false;
  if (element.id === "accordia-editor-overlay-root" || element.closest("#accordia-editor-overlay-root")) return false;

  const blockedTags = new Set(["HTML", "BODY", "HEAD", "SCRIPT", "STYLE", "LINK", "META", "BR"]);
  if (blockedTags.has(element.tagName)) return false;

  return Boolean(element.closest(".site-header, .timeline-editorial-page, .site-footer"));
}

function resolveEditableElement(target, doc = state.previewDocument) {
  let current = target?.nodeType === Node.TEXT_NODE ? target.parentElement : target;
  while (current && current !== doc.body) {
    if (isEditableElement(current, doc)) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}

function describeEditableElement(element) {
  return {
    selector: buildStableSelector(element),
    label: buildElementLabel(element),
  };
}

function buildElementLabel(element) {
  const tag = element.tagName.toLowerCase();
  const text = element.textContent.replace(/\s+/g, " ").trim();
  if (!text) return tag;
  return `${tag} · ${text.slice(0, 42)}${text.length > 42 ? "…" : ""}`;
}

function buildStableSelector(element) {
  const root = element.closest(".site-header, .timeline-editorial-page, .site-footer");
  const segments = [];
  let current = element;

  while (current && current.nodeType === Node.ELEMENT_NODE) {
    segments.unshift(buildSelectorSegment(current));
    if (current === root) break;
    current = current.parentElement;
  }

  return segments.join(" > ");
}

function buildSelectorSegment(element) {
  if (element.id) {
    return `#${CSS.escape(element.id)}`;
  }

  let segment = element.tagName.toLowerCase();
  const classes = getUsefulClasses(element);
  if (classes.length) {
    segment += classes.map((className) => `.${CSS.escape(className)}`).join("");
  }

  const attributes = getStableAttributes(element);
  if (attributes.length) {
    segment += attributes.join("");
  }

  const parent = element.parentElement;
  if (parent) {
    const sameTypeSiblings = Array.from(parent.children).filter((child) => child.tagName === element.tagName);
    if (sameTypeSiblings.length > 1 && !classes.length && !attributes.length) {
      segment += `:nth-of-type(${sameTypeSiblings.indexOf(element) + 1})`;
    }
  }

  return segment;
}

function getUsefulClasses(element) {
  return Array.from(element.classList).filter(
    (className) =>
      !className.startsWith("is-") &&
      !className.startsWith("accordia-editor") &&
      !className.startsWith("js-")
  );
}

function getStableAttributes(element) {
  const attrs = [];
  [
    "data-nucleus-link",
    "data-scroll-key",
    "data-nav",
  ].forEach((name) => {
    if (element.hasAttribute(name)) {
      attrs.push(`[${name}="${escapeAttributeValue(element.getAttribute(name))}"]`);
    }
  });
  return attrs;
}

function escapeAttributeValue(value) {
  return String(value ?? "").replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function ensurePreviewOverlay(doc) {
  let root = doc.getElementById("accordia-editor-overlay-root");
  if (!root) {
    root = doc.createElement("div");
    root.id = "accordia-editor-overlay-root";
    root.innerHTML = `
      <div class="accordia-editor-selection-box" hidden>
        <div class="accordia-editor-selection-label"></div>
        <div class="accordia-editor-selection-handles"></div>
      </div>
    `;
    doc.body.appendChild(root);
  }

  return {
    root,
    box: root.querySelector(".accordia-editor-selection-box"),
    label: root.querySelector(".accordia-editor-selection-label"),
    handles: root.querySelector(".accordia-editor-selection-handles"),
    selectionKey: "",
    framePending: false,
  };
}

function schedulePreviewOverlayRefresh() {
  const doc = state.previewDocument;
  const overlay = state.previewOverlay;
  if (!doc || !overlay || overlay.framePending) return;

  overlay.framePending = true;
  doc.defaultView.requestAnimationFrame(() => {
    overlay.framePending = false;
    refreshSelectionOverlay();
  });
}

function refreshSelectionOverlay() {
  const doc = state.previewDocument;
  if (!doc) return;
  renderSelectionOverlay(getOverlayTarget(doc));
}

function getOverlayTarget(doc) {
  return getSelectedElementNode(doc) || getSelectionTarget(doc);
}

function getOverlayLabel() {
  return state.selectedElement ? state.selectedElement.label : getSelectionLabel();
}

function getOverlayHint() {
  return state.selectedElement
    ? "Usa la barra di stile sopra la preview per modificare questo elemento."
    : getBlockHint();
}

function renderSelectionOverlay(target) {
  const overlay = state.previewOverlay;
  if (!overlay) return;

  if (!target) {
    overlay.box.hidden = true;
    overlay.handles.innerHTML = "";
    overlay.selectionKey = "";
    return;
  }

  const rect = target.getBoundingClientRect();
  if (rect.width < 1 || rect.height < 1) {
    overlay.box.hidden = true;
    return;
  }

  overlay.box.hidden = false;
  overlay.box.style.left = `${rect.left}px`;
  overlay.box.style.top = `${rect.top}px`;
  overlay.box.style.width = `${rect.width}px`;
  overlay.box.style.height = `${rect.height}px`;
  overlay.label.innerHTML = `
    <strong>${escapeHtml(getOverlayLabel())}</strong>
    ${getOverlayHint() ? `<span>${escapeHtml(getOverlayHint())}</span>` : ""}
  `;

  const handleKey = state.selectedElement ? `element:${state.selectedElement.selector}` : state.selection;
  if (overlay.selectionKey !== handleKey) {
    rebuildSelectionHandles(handleKey);
  }
}

function rebuildSelectionHandles(handleKey) {
  const overlay = state.previewOverlay;
  const doc = state.previewDocument;
  if (!overlay || !doc) return;

  overlay.handles.innerHTML = "";
  getOverlayHandleDescriptors().forEach((descriptor) => {
    const handle = doc.createElement("button");
    handle.type = "button";
    handle.className = `accordia-editor-handle ${descriptor.className}`;
    handle.title = descriptor.title;
    handle.setAttribute("aria-label", descriptor.title);
    handle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    handle.addEventListener("pointerdown", (event) => startOverlayDrag(event, handle, descriptor));
    overlay.handles.appendChild(handle);
  });
  overlay.selectionKey = handleKey;
}

function getOverlayHandleDescriptors() {
  if (state.selectedElement) {
    return [];
  }

  const selection = parseSelection(state.selection);

  if (selection.type === "hero") {
    return [
      createPaddingHandle("hero_padding_top", "is-top", "Allunga il padding superiore", -1),
      createPaddingHandle("hero_padding_bottom", "is-bottom", "Allunga il padding inferiore", 1),
    ];
  }

  if (selection.type === "track") {
    return [
      createPaddingHandle("track_padding_top", "is-top", "Allunga il padding superiore del blocco timeline", -1),
      createPaddingHandle("track_padding_bottom", "is-bottom", "Allunga il padding inferiore del blocco timeline", 1),
    ];
  }

  if (selection.type === "card") {
    return [createCardWidthHandle(), createCardHeightHandle(), createCardCornerHandle()];
  }

  return [];
}

function createPaddingHandle(field, className, title, direction) {
  return {
    className,
    title,
    begin(event, target, doc) {
      const computed = doc.defaultView.getComputedStyle(target);
      const fallback = field.endsWith("_top")
        ? parseFloat(computed.paddingTop)
        : parseFloat(computed.paddingBottom);
      return {
        originY: event.clientY,
        startPx: cssValueToPx(state.data.timeline_page.style[field], doc, "height") || fallback,
      };
    },
    move(session, event, doc) {
      const delta = event.clientY - session.originY;
      const next = clamp(session.startPx + delta * direction, 12, 320);
      updateStyleFromDrag(field, pxToRem(next, doc));
    },
  };
}

function createCardWidthHandle() {
  return {
    className: "is-right",
    title: "Allarga o stringi le card della timeline",
    begin(event, target) {
      return {
        originX: event.clientX,
        startWidth: target.getBoundingClientRect().width,
      };
    },
    move(session, event, doc) {
      const next = clamp(session.startWidth + (event.clientX - session.originX), 220, 720);
      updateStyleFromDrag("card_auto_columns", pxToRem(next, doc));
    },
  };
}

function createCardHeightHandle() {
  return {
    className: "is-bottom",
    title: "Alza o abbassa le card della timeline",
    begin(event, target) {
      return {
        originY: event.clientY,
        startHeight: target.getBoundingClientRect().height,
      };
    },
    move(session, event, doc) {
      const next = clamp(session.startHeight + (event.clientY - session.originY), 240, 760);
      updateStyleFromDrag("card_min_height", pxToRem(next, doc));
    },
  };
}

function createCardCornerHandle() {
  return {
    className: "is-corner",
    title: "Stira card in larghezza e altezza",
    begin(event, target) {
      const rect = target.getBoundingClientRect();
      return {
        originX: event.clientX,
        originY: event.clientY,
        startWidth: rect.width,
        startHeight: rect.height,
      };
    },
    move(session, event, doc) {
      const nextWidth = clamp(session.startWidth + (event.clientX - session.originX), 220, 720);
      const nextHeight = clamp(session.startHeight + (event.clientY - session.originY), 240, 760);
      updateStyleFromDrag("card_auto_columns", pxToRem(nextWidth, doc));
      updateStyleFromDrag("card_min_height", pxToRem(nextHeight, doc));
    },
  };
}

function startOverlayDrag(event, handleEl, descriptor) {
  const doc = state.previewDocument;
  if (!doc) return;

  const target = getOverlayTarget(doc);
  if (!target) return;

  event.preventDefault();
  event.stopPropagation();

  const session = descriptor.begin(event, target, doc);
  if (!session) return;

  doc.body.classList.add("is-editor-dragging");
  handleEl.setPointerCapture(event.pointerId);

  const onMove = (moveEvent) => {
    descriptor.move(session, moveEvent, doc);
  };

  const finish = () => {
    handleEl.removeEventListener("pointermove", onMove);
    handleEl.removeEventListener("pointerup", finish);
    handleEl.removeEventListener("pointercancel", finish);
    if (handleEl.hasPointerCapture(event.pointerId)) {
      handleEl.releasePointerCapture(event.pointerId);
    }
    doc.body.classList.remove("is-editor-dragging");
    renderInspector();
    refreshSelectionOverlay();
  };

  handleEl.addEventListener("pointermove", onMove);
  handleEl.addEventListener("pointerup", finish);
  handleEl.addEventListener("pointercancel", finish);
}

function getSelectionTarget(doc) {
  return Array.from(doc.querySelectorAll("[data-editor-target]")).find(
    (element) => element.dataset.editorTarget === state.selection
  ) || null;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function extractResizableValue(value) {
  const source = String(value ?? "").trim();
  if (!source) return "";
  const minmaxMatch = source.match(/^minmax\(\s*([^,]+?)\s*,\s*([^)]+)\)$/i);
  return minmaxMatch ? minmaxMatch[1].trim() : source;
}

function cssValueToPx(value, doc, axis = "width") {
  const source = extractResizableValue(value);
  if (!source) return 0;

  const probe = doc.createElement("div");
  probe.style.position = "fixed";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.left = "-9999px";
  probe.style.top = "-9999px";

  if (axis === "height") {
    probe.style.height = source;
    probe.style.width = "1px";
  } else {
    probe.style.width = source;
    probe.style.height = "1px";
  }

  doc.body.appendChild(probe);
  const rect = probe.getBoundingClientRect();
  probe.remove();
  return axis === "height" ? rect.height : rect.width;
}

function pxToRem(px, doc) {
  const fontSize = parseFloat(doc.defaultView.getComputedStyle(doc.documentElement).fontSize) || 16;
  const remValue = px / fontSize;
  return `${trimNumber(remValue.toFixed(2))}rem`;
}

function trimNumber(value) {
  return String(value).replace(/\.?0+$/, "");
}

function buildLiveStyleText(style) {
  return `
    .timeline-editorial-hero { padding: ${style.hero_padding_top} 0 ${style.hero_padding_bottom}; }
    .timeline-editorial-track { padding: ${style.track_padding_top} 0 ${style.track_padding_bottom}; }
    .timeline-editorial-track__scroll { gap: ${style.card_gap}; grid-auto-columns: ${style.card_auto_columns}; }
    .timeline-editorial-card { min-height: ${style.card_min_height}; }
  `;
}

function buildElementOverridesStyleText(overrides) {
  return Object.entries(overrides || {})
    .map(([selector, rules]) => {
      const declarations = Object.entries(rules)
        .filter(([prop, value]) => elementStyleProps.has(prop) && String(value ?? "").trim())
        .map(([prop, value]) => `${prop}: ${String(value).trim()} !important;`)
        .join(" ");
      return declarations ? `${selector} { ${declarations} }` : "";
    })
    .filter(Boolean)
    .join("\n");
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

  let elementStyle = doc.getElementById("accordia-editor-element-live-style");
  if (!elementStyle) {
    elementStyle = doc.createElement("style");
    elementStyle.id = "accordia-editor-element-live-style";
    doc.head.appendChild(elementStyle);
  }
  elementStyle.textContent = buildElementOverridesStyleText(getElementOverrides());

  highlightSelection();
}

function highlightSelection(options = {}) {
  const doc = state.previewDocument;
  if (!doc) return;

  doc.querySelectorAll(".is-editor-selected").forEach((el) => el.classList.remove("is-editor-selected"));

  const target = getOverlayTarget(doc);
  if (target) {
    target.classList.add("is-editor-selected");
    if (options.scroll) {
      target.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
  }

  renderSelectionOverlay(target);
}

function escapeHtml(value) {
  return String(value ?? "")
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
  state.data.element_overrides ||= {};
  state.dirty = false;
  state.selectedElement = null;
  renderFixedSections();
  renderCardSections();
  renderInspector();
  renderElementToolbar();
  loadPreview();
  setStatus("Pronto");
}

function loadPreview() {
  previewFrameEl.src = `${PREVIEW_URL}?editorPreview=${Date.now()}`;
}

previewFrameEl.addEventListener("load", () => {
  state.previewDocument = previewFrameEl.contentDocument;
  state.previewOverlay = null;
  injectPreviewHelpers(state.previewDocument);
  applyStateToPreview();
  renderElementToolbar();
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

elementResetButtonEl.addEventListener("click", () => {
  resetSelectedElementOverrides();
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
