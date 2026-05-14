(() => {
  const rootSelector = '#immersive-barocco-context-root';
  const activeSwitchSelector = '.vivaldi-globe-switch__button.is-active .vivaldi-globe-switch__label';
  const hotspotSelector = '.vivaldi-globe-hotspot';
  const chipSelector = '.vivaldi-globe-keyword';
  const panelSelector = '#vivaldi-globe-detail-panel';

  const musicalContextLabel = 'Contesto musicale';

  const keywordData = [
    {
      id: 'mecenatismo',
      title: 'Mecenatismo',
      description: 'Nobili e corti sostengono musicisti, compositori e maestri di cappella.',
      sourceTitle: 'Corte'
    },
    {
      id: 'corti-cattedrali',
      title: 'Corti e cattedrali',
      description: 'Palazzi nobiliari e luoghi sacri diventano centri della vita musicale.',
      sourceTitle: 'Cattedrale'
    },
    {
      id: 'teatri-pubblici',
      title: 'Teatri pubblici',
      description: 'Accanto ai teatri di corte nascono spazi aperti a un pubblico più ampio.',
      sourceTitle: 'Teatro pubblico'
    },
    {
      id: 'melodramma',
      title: 'Melodramma',
      description: 'Grande forma vocale e teatrale tipica del Barocco.',
      sourceTitle: 'Melodramma'
    },
    {
      id: 'concerto-grosso',
      title: 'Concerto grosso',
      description: 'Dialogo musicale tra un piccolo gruppo di solisti e l’intera orchestra.',
      sourceTitle: 'Concerto'
    },
    {
      id: 'concerto-solista',
      title: 'Concerto solista',
      description: 'Un singolo strumento protagonista si confronta con l’orchestra.',
      sourceTitle: 'Contrasto'
    },
    {
      id: 'orchestra-da-camera',
      title: 'Orchestra da camera',
      description: 'Le formazioni strumentali diventano più numerose e strutturate.',
      sourceTitle: null
    }
  ];

  const keywordBySource = new Map(keywordData.filter((item) => item.sourceTitle).map((item) => [item.sourceTitle, item]));
  const keywordById = new Map(keywordData.map((item) => [item.id, item]));
  const keywordByTitle = new Map(keywordData.map((item) => [item.title, item]));

  let currentSelectionId = null;
  let mutationLock = false;

  const getRoot = () => document.querySelector(rootSelector);

  const isMusicalContextActive = (root) => {
    const activeLabel = root?.querySelector(activeSwitchSelector);
    return activeLabel?.textContent?.trim() === musicalContextLabel;
  };

  const setStrongText = (button, text) => {
    const strong = button?.querySelector('strong');
    if (strong && strong.textContent?.trim() !== text) strong.textContent = text;
    if (button) button.setAttribute('aria-label', text);
  };

  const getButtonTitle = (button) => button?.querySelector('strong')?.textContent?.trim() || '';

  const renderDetailPanel = (root, item) => {
    const panel = root?.querySelector(panelSelector);
    if (!panel || !item) return;

    const safeTitle = item.title.replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
    const safeDescription = item.description.replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));

    panel.dataset.accordiaKeywordPatch = item.id;
    panel.innerHTML = `
      <div class="vivaldi-globe-detail-panel__patched" data-accordia-keyword-panel="${item.id}">
        <p class="vivaldi-globe-detail-panel__patched-kicker">Parola chiave</p>
        <h3 class="vivaldi-globe-detail-panel__patched-title">${safeTitle}</h3>
        <p class="vivaldi-globe-detail-panel__patched-copy">${safeDescription}</p>
      </div>
    `;
  };

  const selectPatchedKeyword = (root, item, originalButton) => {
    currentSelectionId = item.id;
    if (originalButton) {
      window.setTimeout(() => renderDetailPanel(root, item), 0);
      window.setTimeout(() => renderDetailPanel(root, item), 80);
    } else {
      renderDetailPanel(root, item);
    }
    syncSelectedState(root);
  };

  const bindPatchedSelection = (root, button, item, originalButton = true) => {
    if (!button || button.dataset.accordiaKeywordBound === item.id) return;
    button.dataset.accordiaKeywordBound = item.id;
    button.addEventListener('click', () => selectPatchedKeyword(root, item, originalButton));
  };

  const syncSelectedState = (root) => {
    root.querySelectorAll('[data-accordia-keyword-id]').forEach((button) => {
      const isActive = button.dataset.accordiaKeywordId === currentSelectionId;
      button.classList.toggle('is-active', isActive);
      button.classList.toggle('is-keyword-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  };

  const patchOriginalButtons = (root) => {
    const hotspots = Array.from(root.querySelectorAll(hotspotSelector)).filter((button) => !button.dataset.accordiaExtraKeyword);
    const chips = Array.from(root.querySelectorAll(chipSelector)).filter((button) => !button.dataset.accordiaExtraKeyword);

    [...hotspots, ...chips].forEach((button) => {
      const title = getButtonTitle(button);
      const originalTitle = button.dataset.accordiaOriginalTitle || title;
      if (!button.dataset.accordiaOriginalTitle) button.dataset.accordiaOriginalTitle = originalTitle;
      const item = keywordBySource.get(originalTitle);
      if (!item) return;
      button.dataset.accordiaKeywordId = item.id;
      setStrongText(button, item.title);
      bindPatchedSelection(root, button, item, true);
    });
  };

  const ensureExtraChip = (root) => {
    const container = root.querySelector(chipSelector)?.parentElement;
    const template = root.querySelector(chipSelector);
    const item = keywordById.get('orchestra-da-camera');
    if (!container || !template || !item) return;

    let chip = container.querySelector('[data-accordia-extra-keyword="orchestra-da-camera"]');
    if (!chip) {
      chip = template.cloneNode(true);
      chip.dataset.accordiaExtraKeyword = 'orchestra-da-camera';
      chip.dataset.accordiaKeywordId = item.id;
      chip.classList.remove('is-active');
      chip.setAttribute('type', 'button');
      chip.setAttribute('aria-controls', 'vivaldi-globe-detail-panel');
      container.appendChild(chip);
    }

    setStrongText(chip, item.title);
    bindPatchedSelection(root, chip, item, false);
  };

  const ensureExtraHotspot = (root) => {
    const template = root.querySelector(hotspotSelector);
    const stage = template?.parentElement;
    const item = keywordById.get('orchestra-da-camera');
    if (!template || !stage || !item) return;

    let hotspot = stage.querySelector('[data-accordia-extra-keyword="orchestra-da-camera"]');
    if (!hotspot) {
      hotspot = template.cloneNode(true);
      hotspot.dataset.accordiaExtraKeyword = 'orchestra-da-camera';
      hotspot.dataset.accordiaKeywordId = item.id;
      hotspot.classList.remove('is-keyword-active', 'is-hidden', 'is-back');
      hotspot.setAttribute('type', 'button');
      hotspot.setAttribute('aria-controls', 'vivaldi-globe-detail-panel');
      stage.appendChild(hotspot);
    }

    const source = Array.from(root.querySelectorAll(hotspotSelector)).find((button) => button.dataset.accordiaKeywordId === 'concerto-grosso') || template;
    const sourceLeft = parseFloat(source.style.left || '0');
    const sourceTop = parseFloat(source.style.top || '0');
    hotspot.style.left = `${sourceLeft + 94}px`;
    hotspot.style.top = `${sourceTop - 58}px`;
    hotspot.style.opacity = source.style.opacity || '0.92';
    hotspot.style.transform = source.style.transform || 'translate(-50%, -50%) scale(1)';
    hotspot.style.zIndex = '82';
    setStrongText(hotspot, item.title);
    bindPatchedSelection(root, hotspot, item, false);
  };

  const resetPatchWhenHistorical = (root) => {
    root.querySelectorAll('[data-accordia-extra-keyword]').forEach((node) => node.remove());
    root.querySelectorAll('[data-accordia-original-title]').forEach((button) => {
      const title = button.dataset.accordiaOriginalTitle;
      if (title) setStrongText(button, title);
      button.removeAttribute('data-accordia-keyword-id');
      button.classList.remove('is-active', 'is-keyword-active');
    });
    currentSelectionId = null;
  };

  const applyPatch = () => {
    if (mutationLock) return;
    const root = getRoot();
    if (!root) return;

    mutationLock = true;
    try {
      if (!isMusicalContextActive(root)) {
        resetPatchWhenHistorical(root);
        return;
      }

      patchOriginalButtons(root);
      ensureExtraChip(root);
      ensureExtraHotspot(root);
      syncSelectedState(root);

      if (currentSelectionId) {
        const item = keywordById.get(currentSelectionId) || keywordByTitle.get(currentSelectionId);
        if (item) renderDetailPanel(root, item);
      }
    } finally {
      mutationLock = false;
    }
  };

  const start = () => {
    const root = getRoot();
    if (!root) return false;

    applyPatch();

    const observer = new MutationObserver(() => applyPatch());
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style', 'aria-pressed']
    });

    window.addEventListener('resize', applyPatch, { passive: true });
    window.addEventListener('orientationchange', applyPatch, { passive: true });
    return true;
  };

  if (!start()) {
    const bodyObserver = new MutationObserver(() => {
      if (start()) bodyObserver.disconnect();
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });
  }
})();
