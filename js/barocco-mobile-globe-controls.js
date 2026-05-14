(() => {
  const rootSelector = '#immersive-barocco-context-root';
  const switchSelector = '.vivaldi-globe-switch';
  const switchButtonSelector = '.vivaldi-globe-switch__button';
  const hotspotSelector = '.vivaldi-globe-hotspot';
  const detailPanelSelector = '#vivaldi-globe-detail-panel';

  const replacements = new Map([
    ['Corte', {
      title: 'Mecenatismo',
      copy: 'Nobili e corti sostengono musicisti, compositori e maestri di cappella.'
    }],
    ['Cattedrale', {
      title: 'Corti e cattedrali',
      copy: 'Palazzi nobiliari e luoghi sacri diventano centri della vita musicale.'
    }],
    ['Teatro pubblico', {
      title: 'Teatri pubblici',
      copy: 'Accanto ai teatri di corte nascono spazi aperti a un pubblico più ampio.'
    }],
    ['Melodramma', {
      title: 'Melodramma',
      copy: 'Grande forma vocale e teatrale tipica del Barocco.'
    }],
    ['Concerto', {
      title: 'Concerto grosso',
      copy: 'Dialogo musicale tra un piccolo gruppo di solisti e l’intera orchestra.'
    }],
    ['Contrasto', {
      title: 'Concerto solista',
      copy: 'Un singolo strumento protagonista si confronta con l’orchestra.'
    }]
  ]);

  const orchestraKeyword = {
    title: 'Orchestra da camera',
    copy: 'Le formazioni strumentali diventano più numerose e strutturate.'
  };

  const getRoot = () => document.querySelector(rootSelector);
  const getStrong = (node) => node?.querySelector('strong');
  const getLabel = (node) => getStrong(node)?.textContent?.trim() || '';

  function hideSwitches(root) {
    root.querySelectorAll(switchSelector).forEach((node) => {
      node.style.setProperty('display', 'none', 'important');
      node.setAttribute('aria-hidden', 'true');
    });

    root.querySelectorAll(switchButtonSelector).forEach((node) => {
      node.style.setProperty('display', 'none', 'important');
      node.setAttribute('aria-hidden', 'true');
      node.setAttribute('tabindex', '-1');
    });
  }

  function selectMusicalContext(root) {
    const musicalButton = [...root.querySelectorAll(switchButtonSelector)]
      .find((button) => button.textContent.includes('Contesto musicale'));

    if (!musicalButton) return;
    if (musicalButton.getAttribute('aria-pressed') !== 'true') musicalButton.click();
  }

  function updateDetailPanel(root, keyword) {
    const panel = root.querySelector(detailPanelSelector);
    if (!panel) return;

    const title = panel.querySelector('h3, h4, strong');
    if (title) title.textContent = keyword.title;

    const paragraphs = panel.querySelectorAll('p');
    const body = paragraphs.length ? paragraphs[paragraphs.length - 1] : null;
    if (body) body.textContent = keyword.copy;
  }

  function bindKeyword(root, hotspot, keyword) {
    if (hotspot.dataset.accordiaKeywordBound === keyword.title) return;
    hotspot.dataset.accordiaKeywordBound = keyword.title;
    hotspot.addEventListener('click', () => {
      window.setTimeout(() => updateDetailPanel(root, keyword), 120);
    });
  }

  function renameHotspots(root) {
    let renamed = 0;

    root.querySelectorAll(hotspotSelector).forEach((hotspot) => {
      if (hotspot.dataset.accordiaExtraKeyword === 'orchestra-da-camera') return;

      const originalLabel = hotspot.dataset.accordiaOriginalLabel || getLabel(hotspot);
      if (!hotspot.dataset.accordiaOriginalLabel) hotspot.dataset.accordiaOriginalLabel = originalLabel;

      const replacement = replacements.get(originalLabel);
      if (!replacement) return;

      const strong = getStrong(hotspot);
      if (strong) strong.textContent = replacement.title;
      hotspot.setAttribute('aria-label', replacement.title);
      bindKeyword(root, hotspot, replacement);
      renamed += 1;
    });

    return renamed;
  }

  function ensureOrchestraHotspot(root) {
    if (root.querySelector('[data-accordia-extra-keyword="orchestra-da-camera"]')) return;

    const template = root.querySelector(hotspotSelector);
    const layer = template?.parentElement;
    if (!template || !layer) return;

    const source = [...root.querySelectorAll(hotspotSelector)]
      .find((hotspot) => getLabel(hotspot) === 'Concerto grosso') || template;

    const extra = template.cloneNode(true);
    extra.dataset.accordiaExtraKeyword = 'orchestra-da-camera';
    extra.classList.remove('is-hidden', 'is-back', 'is-keyword-active');
    extra.style.left = `calc(${source.style.left || '50%'} - 92px)`;
    extra.style.top = `calc(${source.style.top || '50%'} - 62px)`;
    extra.style.opacity = source.style.opacity || '1';
    extra.style.transform = source.style.transform || 'translate(-50%, -50%) scale(1)';
    extra.style.zIndex = '98';
    extra.setAttribute('aria-label', orchestraKeyword.title);
    extra.setAttribute('aria-pressed', 'false');

    const strong = getStrong(extra);
    if (strong) strong.textContent = orchestraKeyword.title;

    bindKeyword(root, extra, orchestraKeyword);
    layer.append(extra);
  }

  function apply() {
    const root = getRoot();
    if (!root) return;

    selectMusicalContext(root);
    hideSwitches(root);

    if (renameHotspots(root)) ensureOrchestraHotspot(root);
  }

  function start() {
    const root = getRoot();
    if (!root) return false;

    apply();

    const observer = new MutationObserver(() => apply());
    observer.observe(root, { childList: true, subtree: true, attributes: true });

    let attempts = 0;
    const timer = window.setInterval(() => {
      apply();
      attempts += 1;
      if (attempts >= 32) window.clearInterval(timer);
    }, 250);

    return true;
  }

  if (!start()) {
    const bodyObserver = new MutationObserver(() => {
      if (start()) bodyObserver.disconnect();
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });
  }
})();
