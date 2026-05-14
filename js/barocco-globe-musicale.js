(() => {
  const rootSelector = '#immersive-barocco-context-root';
  const desiredKeywords = [
    {
      title: 'Mecenatismo',
      description: 'Nobili e corti sostengono musicisti, compositori e maestri di cappella.'
    },
    {
      title: 'Corti e cattedrali',
      description: 'Palazzi nobiliari e luoghi sacri diventano centri della vita musicale.'
    },
    {
      title: 'Teatri pubblici',
      description: 'Accanto ai teatri di corte nascono spazi aperti a un pubblico più ampio.'
    },
    {
      title: 'Melodramma',
      description: 'Grande forma vocale e teatrale tipica del Barocco.'
    },
    {
      title: 'Concerto grosso',
      description: 'Dialogo musicale tra un piccolo gruppo di solisti e l’intera orchestra.'
    },
    {
      title: 'Concerto solista',
      description: 'Un singolo strumento protagonista si confronta con l’orchestra.'
    },
    {
      title: 'Orchestra da camera',
      description: 'Le formazioni strumentali diventano più numerose e strutturate.'
    }
  ];

  const labelMap = new Map([
    ['Corte', desiredKeywords[0]],
    ['Cattedrale', desiredKeywords[1]],
    ['Teatro pubblico', desiredKeywords[2]],
    ['Melodramma', desiredKeywords[3]],
    ['Concerto', desiredKeywords[4]],
    ['Contrasto', desiredKeywords[5]]
  ]);

  const getRoot = () => document.querySelector(rootSelector);
  const getLabel = (button) => button?.querySelector('strong')?.textContent?.trim() || '';

  function updateDetailPanel(root, keyword) {
    const panel = root.querySelector('#vivaldi-globe-detail-panel');
    if (!panel) return;

    panel.textContent = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'vivaldi-globe-detail-panel__patched';

    const kicker = document.createElement('p');
    kicker.className = 'vivaldi-globe-detail-panel__patched-kicker';
    kicker.textContent = 'Parola chiave';

    const title = document.createElement('h3');
    title.className = 'vivaldi-globe-detail-panel__patched-title';
    title.textContent = keyword.title;

    const copy = document.createElement('p');
    copy.className = 'vivaldi-globe-detail-panel__patched-copy';
    copy.textContent = keyword.description;

    wrapper.append(kicker, title, copy);
    panel.append(wrapper);
  }

  function bindKeyword(root, button, keyword) {
    if (!button || button.dataset.accordiaKeywordBound === keyword.title) return;
    button.dataset.accordiaKeywordBound = keyword.title;
    button.addEventListener('click', () => {
      window.setTimeout(() => updateDetailPanel(root, keyword), 120);
    });
  }

  function forceMusicalContext(root) {
    const switchButtons = [...root.querySelectorAll('.vivaldi-globe-switch__button')];
    const musicalButton = switchButtons.find((button) => button.textContent.includes('Contesto musicale'));
    if (musicalButton && musicalButton.getAttribute('aria-pressed') !== 'true') {
      musicalButton.click();
      return true;
    }
    return false;
  }

  function patchExistingKeywords(root) {
    let changed = 0;
    const keywordButtons = [...root.querySelectorAll('.vivaldi-globe-hotspot, .vivaldi-globe-keyword')];

    keywordButtons.forEach((button) => {
      const label = getLabel(button);
      const keyword = labelMap.get(label);
      if (!keyword) return;

      const strong = button.querySelector('strong');
      if (strong) strong.textContent = keyword.title;
      button.setAttribute('aria-label', keyword.title);
      bindKeyword(root, button, keyword);
      changed += 1;
    });

    return changed > 0;
  }

  function ensureOrchestraChip(root) {
    const existing = root.querySelector('[data-accordia-orchestra-chip="true"]');
    if (existing) return;

    const template = root.querySelector('.vivaldi-globe-keyword');
    const container = template?.parentElement;
    if (!template || !container) return;

    const chip = template.cloneNode(true);
    chip.dataset.accordiaOrchestraChip = 'true';
    chip.classList.remove('is-active');
    const strong = chip.querySelector('strong');
    if (strong) strong.textContent = desiredKeywords[6].title;
    chip.setAttribute('aria-label', desiredKeywords[6].title);
    chip.setAttribute('aria-pressed', 'false');
    bindKeyword(root, chip, desiredKeywords[6]);
    container.append(chip);
  }

  function ensureOrchestraHotspot(root) {
    const existing = root.querySelector('[data-accordia-orchestra-hotspot="true"]');
    if (existing) return;

    const template = root.querySelector('.vivaldi-globe-hotspot');
    const layer = template?.parentElement;
    if (!template || !layer) return;

    const source = [...root.querySelectorAll('.vivaldi-globe-hotspot')]
      .find((button) => getLabel(button) === 'Concerto grosso') || template;

    const hotspot = template.cloneNode(true);
    hotspot.dataset.accordiaOrchestraHotspot = 'true';
    hotspot.classList.remove('is-keyword-active', 'is-hidden', 'is-back');
    hotspot.style.left = `calc(${source.style.left || '50%'} - 94px)`;
    hotspot.style.top = `calc(${source.style.top || '50%'} - 64px)`;
    hotspot.style.opacity = source.style.opacity || '1';
    hotspot.style.transform = source.style.transform || 'translate(-50%, -50%) scale(1)';
    hotspot.style.zIndex = '96';
    const strong = hotspot.querySelector('strong');
    if (strong) strong.textContent = desiredKeywords[6].title;
    hotspot.setAttribute('aria-label', desiredKeywords[6].title);
    hotspot.setAttribute('aria-pressed', 'false');
    bindKeyword(root, hotspot, desiredKeywords[6]);
    layer.append(hotspot);
  }

  function applyPatch() {
    const root = getRoot();
    if (!root) return;

    forceMusicalContext(root);
    const patched = patchExistingKeywords(root);
    if (patched) {
      ensureOrchestraChip(root);
      ensureOrchestraHotspot(root);
    }
  }

  function start() {
    const root = getRoot();
    if (!root) return false;

    applyPatch();

    const observer = new MutationObserver(() => applyPatch());
    observer.observe(root, { childList: true, subtree: true, attributes: true });

    let attempts = 0;
    const timer = window.setInterval(() => {
      applyPatch();
      attempts += 1;
      if (attempts >= 24) window.clearInterval(timer);
    }, 250);

    return true;
  }

  if (!start()) {
    const observer = new MutationObserver(() => {
      if (start()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
