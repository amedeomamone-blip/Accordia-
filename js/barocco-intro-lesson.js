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

    /* ── Timeline: pin click → scorri strip; scroll → aggiorna pin ─ */
    (function timeline() {
        var pins  = document.querySelectorAll('.tl-pin');
        var tiles = document.querySelectorAll('.tl-tile');
        var strip = document.getElementById('tl-strip');
        if (!pins.length || !strip) return;

        var lockUntil = 0;   // ignora lo scroll-sync durante uno scroll programmato

        function tileW() {
            var t = strip.querySelector('.tl-tile');
            return t ? t.offsetWidth : 0;
        }

        function setActive(idx) {
            pins.forEach(function (p) {
                p.classList.toggle('is-active', +p.dataset.idx === idx);
            });
            tiles.forEach(function (t) {
                t.classList.toggle('is-active', +t.dataset.idx === idx);
            });
        }

        pins.forEach(function (pin) {
            pin.addEventListener('click', function () {
                var idx = +pin.dataset.idx;
                var w   = tileW();
                // centra il tile nello strip, con clamp agli estremi
                var max = strip.scrollWidth - strip.clientWidth;
                var target = Math.max(0, Math.min(max, idx * w - (strip.clientWidth - w) / 2));
                lockUntil = Date.now() + 900;
                setActive(idx);
                strip.scrollTo({ left: target, behavior: 'smooth' });
            });
        });

        var scrollT;
        strip.addEventListener('scroll', function () {
            if (Date.now() < lockUntil) return;   // scroll programmato: non sovrascrivere
            clearTimeout(scrollT);
            scrollT = setTimeout(function () {
                var w = tileW();
                if (!w) return;
                // tile più vicino al centro del viewport dello strip
                var idx = Math.round((strip.scrollLeft + strip.clientWidth / 2 - w / 2) / w);
                idx = Math.max(0, Math.min(tiles.length - 1, idx));
                setActive(idx);
            }, 90);
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
