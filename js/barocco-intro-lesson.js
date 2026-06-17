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

    /* ── HTL: anno segue la barra + auto-scroll al tile selezionato ── */
    (function htl() {
        var htlEl  = document.querySelector('.htl');
        var scroll = document.querySelector('.htl__scroll');
        var label  = document.querySelector('.htl__year-label');
        if (!htlEl || !scroll) return;

        var items = htlEl.querySelectorAll('.htl__item');
        var lockScroll = false;

        /* posiziona il label anno al centro del tile selezionato,
           restando sempre dentro l'area visibile dello scroll */
        function updateLabel() {
            if (!label) return;
            var checked = htlEl.querySelector('input[name="htl"]:checked');
            if (!checked) return;
            var idx = 0;
            items.forEach(function (item, i) {
                if (item.contains(checked)) idx = i;
            });
            var itemW   = items[0] ? items[0].offsetWidth : 0;
            if (!itemW) return;
            /* posizione del centro del tile rispetto all'area visibile */
            var rawLeft  = (idx + 0.5) * itemW - scroll.scrollLeft;
            var halfSelf = label.offsetWidth / 2 || 20;
            var clamped  = Math.max(halfSelf, Math.min(rawLeft, scroll.clientWidth - halfSelf));
            label.style.left      = clamped + 'px';
            label.style.transform = 'none';
        }

        /* scorre lo strip per centrare il tile selezionato */
        function scrollToSelected() {
            var checked = htlEl.querySelector('input[name="htl"]:checked');
            if (!checked) return;
            var idx = 0;
            items.forEach(function (item, i) {
                if (item.contains(checked)) idx = i;
            });
            var itemW  = items[0] ? items[0].offsetWidth : 0;
            if (!itemW) return;
            var max    = scroll.scrollWidth - scroll.clientWidth;
            var target = Math.max(0, Math.min(max, idx * itemW - (scroll.clientWidth - itemW) / 2));
            lockScroll = true;
            scroll.scrollTo({ left: target, behavior: 'smooth' });
            setTimeout(function () { lockScroll = false; }, 600);
        }

        /* radio change: aggiorna etichetta + centra tile */
        htlEl.querySelectorAll('input[name="htl"]').forEach(function (radio) {
            radio.addEventListener('change', function () {
                scrollToSelected();
                /* aggiorna subito la label, poi di nuovo a fine scroll */
                updateLabel();
                setTimeout(updateLabel, 620);
            });
        });

        /* scroll manuale: aggiorna solo l'etichetta */
        scroll.addEventListener('scroll', function () {
            updateLabel();
        }, { passive: true });

        window.addEventListener('resize', function () { updateLabel(); });
        window.addEventListener('load',   function () { updateLabel(); });
        updateLabel();
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
