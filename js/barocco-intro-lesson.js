(function () {
    'use strict';

    /* ── header-height sync ──────────────────────────────────────── */
    var stage  = document.querySelector('.bintro-stage');
    var header = document.getElementById('site-header');

    function syncH() {
        if (header && stage) {
            stage.style.setProperty('--bintro-header-h', header.offsetHeight + 'px');
        }
    }
    syncH();
    window.addEventListener('resize', syncH);
    window.addEventListener('load',   syncH);

    /* ── HTL: barra + anno JS-driven, sincronizzati con lo scroll ── */
    (function htl() {
        var htlEl  = document.querySelector('.htl');
        var scroll = document.querySelector('.htl__scroll');
        var label  = document.querySelector('.htl__year-label');
        if (!htlEl || !scroll) return;

        var items = htlEl.querySelectorAll('.htl__item');

        function checkedIdx() {
            var checked = htlEl.querySelector('input[name="htl"]:checked');
            var idx = 0;
            items.forEach(function (item, i) { if (item.contains(checked)) idx = i; });
            return idx;
        }

        /*  Aggiorna BARRA e LABEL usando la stessa formula:
            larghezza visibile = centro_tile − scrollLeft.
            Chiamato ad ogni scroll e ad ogni cambio radio → mai fuori sincronia. */
        function updateAll() {
            var idx   = checkedIdx();
            var itemW = items[0] ? items[0].offsetWidth : 0;
            if (!itemW) return;

            var center = (idx + 0.5) * itemW - scroll.scrollLeft;

            /* barra nera: larghezza = posizione visibile del centro tile (≥ 0) */
            htlEl.style.setProperty('--bar-w', Math.max(0, center) + 'px');

            /* label anno: centrato sul punto, clampato dentro lo strip visibile */
            if (label) {
                var halfSelf = label.offsetWidth / 2 || 20;
                var clamped  = Math.max(halfSelf, Math.min(center, scroll.clientWidth - halfSelf));
                label.style.left      = clamped + 'px';
                label.style.transform = 'none';
            }
        }

        /* scorre lo strip per centrare il tile; scroll events → updateAll */
        function scrollToSelected() {
            var idx   = checkedIdx();
            var itemW = items[0] ? items[0].offsetWidth : 0;
            if (!itemW) return;
            var max    = scroll.scrollWidth - scroll.clientWidth;
            var target = Math.max(0, Math.min(max, idx * itemW - (scroll.clientWidth - itemW) / 2));
            scroll.scrollTo({ left: target, behavior: 'smooth' });
        }

        htlEl.querySelectorAll('input[name="htl"]').forEach(function (radio) {
            radio.addEventListener('change', function () {
                updateAll();          /* aggiorna subito (scrollLeft attuale) */
                scrollToSelected();   /* avvia lo scroll — updateAll ricalcola frame per frame */
            });
        });

        scroll.addEventListener('scroll', updateAll, { passive: true });
        window.addEventListener('resize', updateAll);
        window.addEventListener('load',   updateAll);
        updateAll();
    })();

    /* ── guard: GSAP, ScrollTrigger, Lenis must be loaded ──────── */
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
        console.warn('[bintro] GSAP / ScrollTrigger / Lenis not found. Scroll animation disabled.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* ── Lenis smooth scroll → GSAP ticker ─────────────────────── */
    var lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    /* ── elements ───────────────────────────────────────────────── */
    var scrollEl  = document.querySelector('.bintro-scroll');
    var screensEl = document.querySelector('.bintro-screens');
    var dots      = document.querySelectorAll('.bintro-progress__dot');
    var label     = document.querySelector('.bintro-screen-label');

    if (!scrollEl || !screensEl) return;

    /* ── scrubbed vertical slide ────────────────────────────────── */
    gsap.to(screensEl, {
        y: function () { return -((window.innerHeight - (header ? header.offsetHeight : 0)) * 2); },
        ease: 'none',
        scrollTrigger: {
            trigger:            scrollEl,
            start:              'top top',
            end:                'bottom bottom',
            scrub:              1,
            invalidateOnRefresh: true,
            onUpdate:           onScrollUpdate,
        }
    });

    /* ── progress dots + stage class ───────────────────────────── */
    var LABELS = ['01 — Linea del tempo', '02 — Il Contesto', '03 — La Musica'];

    function onScrollUpdate(self) {
        var p   = self.progress;                          // 0 → 1
        var idx = Math.min(2, Math.floor(p * 3 + 0.05)); // 0, 1, 2

        dots.forEach(function (dot, i) {
            dot.classList.toggle('is-active', i === idx);
        });

        if (stage) stage.dataset.activeScreen = String(idx + 1);
        if (label) label.textContent = LABELS[idx] || '';
    }

    /* ── dot click → scroll to that screen ─────────────────────── */
    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            var svh       = window.innerHeight;
            var startY    = scrollEl.getBoundingClientRect().top + window.scrollY;
            lenis.scrollTo(startY + i * svh, { duration: 1.2, easing: function (t) { return t < .5 ? 2*t*t : -1+(4-2*t)*t; } });
        });
    });

})();
