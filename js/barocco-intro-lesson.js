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

    /* ── Gantt timeline: click su barra → aggiorna pannello ─────── */
    (function gantt() {
        var bars   = document.querySelectorAll('.gantt-bar');
        var detail = document.getElementById('gantt-detail');
        if (!bars.length || !detail) return;

        var elCat   = detail.querySelector('[data-detail-cat]');
        var elYear  = detail.querySelector('[data-detail-year]');
        var elSub   = detail.querySelector('[data-detail-sub]');
        var elTitle = detail.querySelector('[data-detail-title]');
        var elBody  = detail.querySelector('[data-detail-body]');

        function select(bar) {
            bars.forEach(function (b) { b.classList.remove('is-active'); });
            bar.classList.add('is-active');
            if (elCat)   elCat.textContent   = bar.dataset.cat   || '';
            if (elYear)  elYear.textContent  = bar.dataset.year  || '';
            if (elSub)   elSub.textContent   = bar.dataset.sub   || '';
            if (elTitle) elTitle.textContent = bar.dataset.title || '';
            if (elBody)  elBody.textContent  = bar.dataset.body  || '';
        }

        bars.forEach(function (bar) {
            bar.addEventListener('click', function () { select(bar); });
        });
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
