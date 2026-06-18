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

    /* ── HTL: barra scroll-aware + anno centrato sulla punta ───── */
    (function htl() {
        var htlEl     = document.querySelector('.htl');
        var scroll    = document.querySelector('.htl__scroll');
        var label     = document.querySelector('.htl__year-label');
        if (!htlEl || !scroll || !label) return;

        var items     = htlEl.querySelectorAll('.htl__item');
        var yearSpans = Array.prototype.slice.call(label.querySelectorAll('span'));

        function checkedIdx() {
            var checked = htlEl.querySelector('input[name="htl"]:checked');
            var idx = 0;
            items.forEach(function (item, i) { if (item.contains(checked)) idx = i; });
            return idx;
        }

        function barTarget() {
            var itemW = items[0] ? items[0].offsetWidth : 0;
            if (!itemW) return 0;
            return Math.max(0, (checkedIdx() + 0.5) * itemW - scroll.scrollLeft);
        }

        /* Barra: animata su change, istantanea su scroll/resize */
        function updateBar(animate) {
            var w = barTarget();
            if (animate && typeof gsap !== 'undefined') {
                gsap.to(htlEl, { '--bar-vis-w': w + 'px', duration: 0.5, ease: 'power3.out' });
            } else {
                htlEl.style.setProperty('--bar-vis-w', w + 'px');
            }
        }

        /* Anno: solo la span attiva è visibile — JS override sufficiente */
        function updateYearSpan() {
            var idx = checkedIdx();
            yearSpans.forEach(function (span, i) {
                span.style.opacity = i === idx ? '1' : '0';
            });
        }

        /* Anno centrato sulla punta della barra */
        function updateLabel() {
            var itemW = items[0] ? items[0].offsetWidth : 0;
            if (!itemW) return;
            var activeSpan = yearSpans[checkedIdx()];
            var halfSelf   = activeSpan ? activeSpan.offsetWidth / 2 : 20;
            var barTip     = (checkedIdx() + 0.5) * itemW - scroll.scrollLeft;
            var leftEdge   = barTip - halfSelf;
            var maxLeft    = scroll.clientWidth - (activeSpan ? activeSpan.offsetWidth : 40);
            var clamped    = Math.max(0, Math.min(leftEdge, maxLeft));
            label.style.left      = clamped + 'px';
            label.style.transform = 'none';
        }

        items.forEach(function (item) {
            if (!item.dataset.timelineImage) return;
            /* Resolve to absolute URL — relative paths in CSS custom properties
               are resolved against the stylesheet, not the document. */
            var abs = new URL(item.dataset.timelineImage, document.baseURI).href;
            item.style.setProperty('--htl-tile-image', 'url("' + abs.replace(/"/g, '\\"') + '")');
            if (item.dataset.timelineImagePosition) {
                item.style.setProperty('--htl-tile-image-position', item.dataset.timelineImagePosition);
            }
        });

        htlEl.querySelectorAll('input[name="htl"]').forEach(function (r) {
            r.addEventListener('change', function () {
                updateYearSpan();
                updateBar(true);
                updateLabel();
            });
        });
        scroll.addEventListener('scroll', function () { updateBar(false); updateLabel(); }, { passive: true });
        window.addEventListener('resize', function () { updateBar(false); updateLabel(); });
        window.addEventListener('load',   function () { updateYearSpan(); updateBar(false); updateLabel(); });
        updateYearSpan();
        updateBar(false);
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
