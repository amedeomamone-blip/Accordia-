(() => {
  const media = window.matchMedia('(max-width: 1180px)');
  const rootSelector = '#immersive-barocco-context-root';
  const buttonSelector = '.vivaldi-globe-switch__button';
  const switchSelector = '.vivaldi-globe-switch';

  const setHiddenState = () => {
    const shouldHide = media.matches;
    const root = document.querySelector(rootSelector);
    if (!root) return;

    root.querySelectorAll(buttonSelector).forEach((button) => {
      if (shouldHide) {
        button.style.setProperty('display', 'none', 'important');
        button.setAttribute('aria-hidden', 'true');
        button.setAttribute('tabindex', '-1');
      } else {
        button.style.removeProperty('display');
        button.removeAttribute('aria-hidden');
        button.removeAttribute('tabindex');
      }
    });

    root.querySelectorAll(switchSelector).forEach((switchGroup) => {
      if (shouldHide) {
        switchGroup.style.setProperty('display', 'none', 'important');
        switchGroup.setAttribute('aria-hidden', 'true');
      } else {
        switchGroup.style.removeProperty('display');
        switchGroup.removeAttribute('aria-hidden');
      }
    });
  };

  const observeRoot = () => {
    const root = document.querySelector(rootSelector);
    if (!root) return false;

    const observer = new MutationObserver(() => setHiddenState());
    observer.observe(root, { childList: true, subtree: true });
    setHiddenState();
    return true;
  };

  if (!observeRoot()) {
    const bodyObserver = new MutationObserver(() => {
      if (observeRoot()) bodyObserver.disconnect();
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });
  }

  if (typeof media.addEventListener === 'function') {
    media.addEventListener('change', setHiddenState);
  } else if (typeof media.addListener === 'function') {
    media.addListener(setHiddenState);
  }

  window.addEventListener('resize', setHiddenState, { passive: true });
  window.addEventListener('orientationchange', setHiddenState, { passive: true });
})();
