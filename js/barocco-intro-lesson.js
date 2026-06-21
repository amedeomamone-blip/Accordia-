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

    /* ── HTL: barra scroll-aware + reveal cumulativo + date sui tile ── */
    (function htl() {
        var htlEl     = document.querySelector('.htl');
        var scroll    = document.querySelector('.htl__scroll');
        var label     = document.querySelector('.htl__year-label');
        if (!htlEl || !scroll || !label) return;

        var items     = Array.prototype.slice.call(htlEl.querySelectorAll('.htl__item'));
        var yearSpans = Array.prototype.slice.call(label.querySelectorAll('span'));

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

        function checkedIdx() {
            var checked = htlEl.querySelector('input[name="htl"]:checked');
            var idx = 0;
            items.forEach(function (item, i) { if (item.contains(checked)) idx = i; });
            return idx;
        }

        function itemW() { return items[0] ? items[0].offsetWidth : 0; }

        function barTarget() {
            var w = itemW();
            if (!w) return 0;
            return Math.max(0, (checkedIdx() + 0.5) * w - scroll.scrollLeft);
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

        /* Reveal cumulativo: il tile cliccato e tutti i precedenti restano
           accesi con immagine e testo visibili. */
        function updateReveal() {
            var idx = checkedIdx();
            items.forEach(function (item, i) {
                item.classList.toggle('is-revealed', i <= idx);
            });
        }

        /* Ogni data rivelata resta visibile sulla timeline, centrata sul
           proprio tile (non solo quella attiva). */
        function updateYears() {
            var idx = checkedIdx();
            var w   = itemW();
            label.style.left      = '0px';
            label.style.transform = 'none';
            yearSpans.forEach(function (span, i) {
                if (i <= idx && w) {
                    span.style.opacity = '1';
                    var center = (i + 0.5) * w - scroll.scrollLeft;
                    span.style.left = (center - span.offsetWidth / 2) + 'px';
                } else {
                    span.style.opacity = '0';
                }
            });
        }

        function updateAll(animate) {
            updateReveal();
            updateBar(animate);
            updateYears();
        }

        htlEl.querySelectorAll('input[name="htl"]').forEach(function (r) {
            r.addEventListener('change', function () { updateAll(true); });
        });
        scroll.addEventListener('scroll', function () { updateBar(false); updateYears(); }, { passive: true });
        window.addEventListener('resize', function () { updateBar(false); updateYears(); });
        window.addEventListener('load',   function () { updateAll(false); });
        updateAll(false);
    })();

    /* ── Screen 2: ascolti guidati — una domanda alla volta ──────── */
    (function asc2() {
        var root = document.getElementById('asc2');
        if (!root) return;

        var tabs    = Array.prototype.slice.call(root.querySelectorAll('.asc2__tab'));
        var nows    = Array.prototype.slice.call(root.querySelectorAll('.asc2__now'));
        var quizzes = Array.prototype.slice.call(root.querySelectorAll('.asc2__quiz'));
        var done    = root.querySelector('.asc2__done');
        var curEl   = root.querySelector('.asc2__quiz-cur');
        var totalEl = root.querySelector('.asc2__quiz-total');
        var barFill = root.querySelector('.asc2__bar-fill');
        var prevBtn = root.querySelector('.asc2__nav--prev');
        var nextBtn = root.querySelector('.asc2__nav--next');
        var restart = root.querySelector('.asc2__restart');

        /* domande per ogni brano + risposta memorizzata */
        var sets = quizzes.map(function (q) {
            return Array.prototype.slice.call(q.querySelectorAll('.asc2__q'));
        });
        var answers = sets.map(function (qs) { return qs.map(function () { return -1; }); });

        var track = 0;   // brano corrente
        var idx   = 0;   // indice domanda nel brano (sets[track].length = fine → schermata done)
        var advanceTimer = null;

        function total() { return sets[track].length; }
        function atDone() { return idx >= total(); }

        function render() {
            /* tab + brano attivi */
            tabs.forEach(function (t, i) {
                var on = i === track;
                t.classList.toggle('is-active', on);
                t.setAttribute('aria-selected', on ? 'true' : 'false');
            });
            nows.forEach(function (n, i) { n.hidden = i !== track; });
            quizzes.forEach(function (q, i) { q.hidden = i !== track; });

            /* domanda attiva (o stato finale) */
            sets[track].forEach(function (q, i) {
                q.classList.toggle('is-active', !atDone() && i === idx);
            });
            if (done) done.hidden = !atDone();

            /* opzioni riflesse dallo stato memorizzato (no flash per domande già viste) */
            if (!atDone()) {
                var q2    = sets[track][idx];
                var opts  = q2.querySelectorAll('.asc2__opt');
                var corr  = parseInt(q2.getAttribute('data-correct') || '-1', 10);
                var saved = answers[track][idx];
                Array.prototype.forEach.call(opts, function (o, i) {
                    o.classList.remove('is-correct', 'is-wrong', 'is-selected', 'no-flash');
                    if (saved >= 0) {
                        if (i === corr)                         o.classList.add('is-correct', 'no-flash');
                        else if (i === saved && saved !== corr) o.classList.add('is-wrong',   'no-flash');
                    }
                });
            }

            /* testata + barra */
            var shown = Math.min(idx + 1, total());
            if (curEl)   curEl.textContent   = String(shown);
            if (totalEl) totalEl.textContent = String(total());
            if (barFill) barFill.style.width = (((atDone() ? total() : idx + 1) / total()) * 100) + '%';

            /* nav */
            if (prevBtn) prevBtn.disabled = idx === 0;
            if (nextBtn) {
                nextBtn.disabled = atDone();
                nextBtn.textContent = (idx >= total() - 1) ? 'Concludi' : 'Avanti';
                /* re-inserisci la freccia (textContent l'ha rimossa) */
                if (!nextBtn.querySelector('svg')) {
                    nextBtn.insertAdjacentHTML('beforeend',
                        ' <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5 2.5L9.5 7 5 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>');
                }
            }
        }

        function goTo(i) {
            clearTimeout(advanceTimer);
            idx = Math.max(0, Math.min(i, total()));
            render();
        }

        function selectTrack(t) {
            clearTimeout(advanceTimer);
            track = t;
            idx   = 0;
            render();
        }

        /* click su un'opzione: valuta, mostra feedback e avanza */
        quizzes.forEach(function (quiz, qt) {
            quiz.addEventListener('click', function (e) {
                var opt = e.target.closest('.asc2__opt');
                if (!opt || qt !== track) return;
                var q  = opt.closest('.asc2__q');
                var qi = sets[track].indexOf(q);
                if (qi < 0 || answers[track][qi] >= 0) return; /* già risposta */

                var opts      = Array.prototype.slice.call(q.querySelectorAll('.asc2__opt'));
                var oi        = opts.indexOf(opt);
                var corr      = parseInt(q.getAttribute('data-correct') || '-1', 10);
                var isCorrect = (oi === corr);

                answers[track][qi] = oi;

                /* rimuovi stato precedente */
                opts.forEach(function (o) { o.classList.remove('is-correct', 'is-wrong', 'is-selected', 'no-flash'); });

                /* feedback: scelta sbagliata → rosso; risposta giusta → sempre verde */
                if (isCorrect) {
                    opts[oi].classList.add('is-correct');
                } else {
                    opts[oi].classList.add('is-wrong');
                    if (corr >= 0 && corr < opts.length) opts[corr].classList.add('is-correct');
                }

                clearTimeout(advanceTimer);
                advanceTimer = setTimeout(function () { goTo(qi + 1); }, 900);
            });
        });

        tabs.forEach(function (t, i) {
            t.addEventListener('click', function () { selectTrack(i); });
        });
        if (prevBtn) prevBtn.addEventListener('click', function () { goTo(idx - 1); });
        if (nextBtn) nextBtn.addEventListener('click', function () { goTo(idx + 1); });
        if (restart) restart.addEventListener('click', function () {
            answers[track] = sets[track].map(function () { return -1; });
            sets[track].forEach(function (q) {
                Array.prototype.forEach.call(q.querySelectorAll('.asc2__opt'),
                    function (o) { o.classList.remove('is-selected'); });
            });
            goTo(0);
        });

        render();
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
    var pinEl     = document.getElementById('bintro-pin');
    var dots      = document.querySelectorAll('.bintro-progress__dot');
    var label     = document.querySelector('.bintro-screen-label');

    if (!scrollEl || !screensEl) return;

    /* Altezza di una schermata: misurata dal pin (in CSS è calc(100svh - header)).
       NON usiamo window.innerHeight: su iOS cambia quando la barra di Safari si
       comprime, disallineando le schermate 2 e 3 (la 1 sta a y:0 e resta a posto).
       svh è stabile → pinEl.offsetHeight è stabile → schermate sempre allineate. */
    function screenH() {
        if (pinEl && pinEl.offsetHeight) return pinEl.offsetHeight;
        return window.innerHeight - (header ? header.offsetHeight : 0);
    }

    /* ── scrubbed vertical slide ────────────────────────────────── */
    var slideTween = gsap.to(screensEl, {
        y: function () { return -(screenH() * 2); },
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
    var slideST = slideTween.scrollTrigger;

    /* ── progress dots + stage class ───────────────────────────── */
    var LABELS = ['01 — Linea del tempo', '02 — Ascolti guidati', '03 — Concetti chiave'];

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
    /* Posizione precisa ricavata dal range reale della ScrollTrigger:
       screen 0 → start, screen 1 → metà, screen 2 → fine. */
    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            var target;
            if (slideST) {
                target = slideST.start + (i / 2) * (slideST.end - slideST.start);
            } else {
                var startY = scrollEl.getBoundingClientRect().top + window.scrollY;
                target = startY + i * screenH();
            }
            lenis.scrollTo(target, { duration: 1.2, easing: function (t) { return t < .5 ? 2*t*t : -1+(4-2*t)*t; } });
        });
    });

})();
