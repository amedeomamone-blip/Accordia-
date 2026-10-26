/* Accessible state for the existing lesson controls; no audio or timing code. */
(function () {
  'use strict';
  const update = () => {
    document.querySelectorAll('button.figure-card, button.figure-pair, button.meter-card').forEach(button => {
      const selected = button.classList.contains('is-active');
      if (button.getAttribute('aria-pressed') !== String(selected)) button.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('.figure-lesson__dot, .bintro-progress__dot').forEach(button => {
      if (button.classList.contains('is-active')) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
  };
  update();
  const observer = new MutationObserver(update);
  document.querySelectorAll('button.figure-card, button.figure-pair, button.meter-card, .figure-lesson__dot, .bintro-progress__dot').forEach(button => {
    observer.observe(button, {attributes: true, attributeFilter: ['class']});
  });
})();
