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

    /* ════════════════════════════════════════════════════════════
       Audio — Web Audio API: click di metronomo senza asset esterni.
       LIM friendly: parte al primo gesto (play), nessun download.
       ════════════════════════════════════════════════════════════ */
    var AC = null;

    function audioCtx() {
        if (!AC) {
            var Ctor = window.AudioContext || window.webkitAudioContext;
            if (!Ctor) return null;
            AC = new Ctor();
        }
        if (AC.state === 'suspended') AC.resume();
        return AC;
    }

    function click(when, accent) {
        var ac = audioCtx();
        if (!ac) return;
        var osc  = ac.createOscillator();
        var gain = ac.createGain();
        osc.type            = 'triangle';
        osc.frequency.value = accent ? 1318 : 880;
        gain.gain.setValueAtTime(accent ? 0.6 : 0.34, when);
        gain.gain.exponentialRampToValueAtTime(0.001, when + 0.09);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(when);
        osc.stop(when + 0.1);
    }

    /* ── scheduler con lookahead: il battito non deriva mai ──────── */
    function makePulse(onBeat) {
        var timer     = null;
        var nextTime  = 0;
        var beatIdx   = 0;
        var bpm       = 92;
        var running   = false;
        var LOOKAHEAD = 0.12;
        var INTERVAL  = 25;

        function tick() {
            var ac = audioCtx();
            if (!ac) return;
            while (running && nextTime < ac.currentTime + LOOKAHEAD) {
                onBeat(beatIdx, nextTime);
                beatIdx += 1;
                nextTime += 60 / bpm;
            }
        }

        return {
            isRunning: function () { return running; },
            setBpm:    function (value) { bpm = value; },
            start: function () {
                var ac = audioCtx();
                if (!ac || running) return;
                running  = true;
                beatIdx  = 0;
                nextTime = ac.currentTime + 0.15;
                tick();
                timer = window.setInterval(tick, INTERVAL);
            },
            stop: function () {
                running = false;
                if (timer) { window.clearInterval(timer); timer = null; }
            }
        };
    }

    /* visual allineata al click audio */
    function atAudioTime(when, fn) {
        var ac    = audioCtx();
        var delay = ac ? Math.max(0, (when - ac.currentTime) * 1000) : 0;
        window.setTimeout(fn, delay);
    }

    /* registro engines: cambiando schermata si ferma tutto */
    var engines = [];
    function stopAll() {
        engines.forEach(function (stop) { stop(); });
    }
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) stopAll();
    });

    /* helper comuni */
    function setPlay(btn, on, labelOn, labelOff) {
        btn.classList.toggle('is-on', on);
        btn.innerHTML = on ? '&#9632;' : '&#9654;';
        btn.setAttribute('aria-label', on ? labelOn : labelOff);
    }

    /* ════════════════════════════════════════════════════════════
       SCREEN 1 — Dentro o fuori dal battito?
       I tile si accendono in sequenza col click del metronomo.
       Tocca il tile acceso → verde (a segno), sbagliato → rosso.
       ════════════════════════════════════════════════════════════ */
    (function screen1() {
        var root = document.getElementById('btl-1');
        if (!root) return;

        var tiles   = Array.prototype.slice.call(root.querySelectorAll('.btl__tile'));
        var playBtn = document.getElementById('btl1-play');
        var chips   = Array.prototype.slice.call(root.querySelectorAll('.btt-chip[data-bpm]'));
        var scoreEl = document.getElementById('btl1-score');

        var hits = 0;
        var miss = 0;
        var live = -1;

        var pulse = makePulse(function (idx, when) {
            click(when, false);
            atAudioTime(when, function () {
                if (!pulse.isRunning()) return;
                live = idx % tiles.length;
                tiles.forEach(function (t, i) {
                    t.classList.remove('is-hit', 'is-miss');
                    t.classList.toggle('is-live', i === live);
                });
            });
        });
        pulse.setBpm(92);

        function renderScore() {
            scoreEl.innerHTML = 'A segno <b>' + hits + '</b> &middot; Fuori <b>' + miss + '</b>';
        }

        function stop() {
            pulse.stop();
            live = -1;
            root.classList.remove('is-playing');
            setPlay(playBtn, false, 'Ferma il battito', 'Avvia il battito');
            tiles.forEach(function (t) { t.classList.remove('is-live', 'is-hit', 'is-miss'); });
        }
        engines.push(stop);

        playBtn.addEventListener('click', function () {
            if (pulse.isRunning()) { stop(); return; }
            stopAll();
            hits = 0;
            miss = 0;
            renderScore();
            root.classList.add('is-playing');
            setPlay(playBtn, true, 'Ferma il battito', 'Avvia il battito');
            pulse.start();
        });

        tiles.forEach(function (tile, i) {
            tile.addEventListener('click', function () {
                if (!pulse.isRunning()) return;   /* si gioca solo col battito in corso */
                tile.classList.remove('is-hit', 'is-miss');
                if (i === live) {
                    tile.classList.add('is-hit');
                    hits += 1;
                } else {
                    tile.classList.add('is-miss');
                    miss += 1;
                }
                renderScore();
            });
        });

        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                pulse.setBpm(parseInt(chip.getAttribute('data-bpm'), 10) || 92);
                chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
            });
        });

        renderScore();
    })();

    /* ════════════════════════════════════════════════════════════
       SCREEN 2 — Tieni il battito
       Tre livelli di aiuto: i tile "spenti" non danno né luce né
       click, ma il battito continua: la classe lo tiene dentro.
       ════════════════════════════════════════════════════════════ */
    (function screen2() {
        var root = document.getElementById('btl-2');
        if (!root) return;

        var tiles   = Array.prototype.slice.call(root.querySelectorAll('.btl__tile'));
        var playBtn = document.getElementById('btl2-play');
        var chips   = Array.prototype.slice.call(root.querySelectorAll('.btt-chip[data-level]'));

        var LEVELS = {
            tutti:  [],
            meno:   [1, 3],
            quasi:  [1, 2, 3]
        };
        var ghosts = LEVELS.tutti;

        function paintGhosts() {
            tiles.forEach(function (t, i) {
                t.classList.toggle('is-ghost', ghosts.indexOf(i) !== -1);
            });
        }

        var pulse = makePulse(function (idx, when) {
            var i     = idx % tiles.length;
            var ghost = ghosts.indexOf(i) !== -1;
            if (!ghost) click(when, i % 4 === 0);
            atAudioTime(when, function () {
                if (!pulse.isRunning()) return;
                tiles.forEach(function (t, j) {
                    t.classList.toggle('is-live', j === i && !ghost);
                });
            });
        });
        pulse.setBpm(92);

        function stop() {
            pulse.stop();
            root.classList.remove('is-playing');
            setPlay(playBtn, false, 'Ferma il battito', 'Avvia il battito');
            tiles.forEach(function (t) { t.classList.remove('is-live'); });
        }
        engines.push(stop);

        playBtn.addEventListener('click', function () {
            if (pulse.isRunning()) { stop(); return; }
            stopAll();
            root.classList.add('is-playing');
            setPlay(playBtn, true, 'Ferma il battito', 'Avvia il battito');
            pulse.start();
        });

        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                ghosts = LEVELS[chip.getAttribute('data-level')] || [];
                chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
                paintGhosts();
            });
        });
    })();

    /* ════════════════════════════════════════════════════════════
       SCREEN 3 — La classe come metronomo (sfida a fasi)
       Guida completa → meno aiuti → da soli → il battito ritorna.
       Alla fine: "siamo rimasti insieme?"
       ════════════════════════════════════════════════════════════ */
    (function screen3() {
        var root = document.getElementById('btl-3');
        if (!root) return;

        var tiles    = Array.prototype.slice.call(root.querySelectorAll('.btl__tile'));
        var playBtn  = document.getElementById('btl3-play');
        var phaseEl  = document.getElementById('btl3-phase');
        var note     = document.getElementById('btl3-note');   /* può non esserci */
        var verdict  = document.getElementById('btl3-verdict');
        var answers  = Array.prototype.slice.call(root.querySelectorAll('.btt-chip[data-verdict]'));
        var feedback = document.getElementById('btl3-feedback');

        var PHASES = [
            { label: 'La LIM vi guida',                ghosts: [] },
            { label: 'Meno aiuti',                     ghosts: [1, 3] },
            { label: 'Da soli!',                       ghosts: [0, 1, 2, 3] },
            { label: 'Il battito ritorna: ci siete?',  ghosts: [] }
        ];
        var FEEDBACK = {
            si:    'Grande: siete un metronomo umano. Provate ad alzare il tempo.',
            quasi: 'Quasi: qualcuno ha accelerato. Riprovate contando 1-2-3-4 a voce.',
            no:    'Il battito si è perso: riprovate più lenti e con la voce che conta.'
        };

        function paintGhosts(ghosts) {
            tiles.forEach(function (t, i) {
                t.classList.toggle('is-ghost', ghosts.indexOf(i) !== -1);
            });
        }

        function showVerdict() {
            if (note) note.hidden = true;
            verdict.hidden = false;
            feedback.textContent = '';
            answers.forEach(function (a) { a.classList.remove('is-active'); });
        }

        var REPEATS  = 2;   /* ogni fase ripete la battuta due volte */
        var phaseLen = 0;   /* impostato a runtime: tiles.length * REPEATS */

        var pulse = makePulse(function (idx, when) {
            phaseLen = tiles.length * REPEATS;
            var phaseIdx = Math.floor(idx / phaseLen);
            if (phaseIdx >= PHASES.length) {
                atAudioTime(when, function () { stop(); showVerdict(); });
                pulse.stop();
                return;
            }
            var phase = PHASES[phaseIdx];
            var i     = idx % tiles.length;
            var ghost = phase.ghosts.indexOf(i) !== -1;
            if (!ghost) click(when, i % 4 === 0);
            atAudioTime(when, function () {
                if (!pulse.isRunning()) return;
                if (idx % phaseLen === 0) {
                    paintGhosts(phase.ghosts);
                    phaseEl.textContent = phase.label;
                    phaseEl.setAttribute('data-live', '1');
                }
                tiles.forEach(function (t, j) {
                    t.classList.toggle('is-live', j === i && !ghost);
                });
            });
        });
        pulse.setBpm(92);

        function stop() {
            pulse.stop();
            root.classList.remove('is-playing');
            setPlay(playBtn, false, 'Ferma la sfida', 'Avvia la sfida');
            phaseEl.setAttribute('data-live', '0');
            tiles.forEach(function (t) { t.classList.remove('is-live'); });
        }
        engines.push(stop);

        playBtn.addEventListener('click', function () {
            if (pulse.isRunning()) {
                stop();
                phaseEl.textContent = 'Pronti?';
                return;
            }
            stopAll();
            if (note) note.hidden = false;
            verdict.hidden = true;
            paintGhosts([]);
            root.classList.add('is-playing');
            setPlay(playBtn, true, 'Ferma la sfida', 'Avvia la sfida');
            pulse.start();
        });

        answers.forEach(function (chip) {
            chip.addEventListener('click', function () {
                answers.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
                feedback.textContent = FEEDBACK[chip.getAttribute('data-verdict')] || '';
            });
        });
    })();

    /* ── guard: GSAP, ScrollTrigger, Lenis must be loaded ──────── */
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
        console.warn('[battito] GSAP / ScrollTrigger / Lenis not found. Scroll animation disabled.');
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

    if (!scrollEl || !screensEl) return;

    function screenH() {
        if (pinEl && pinEl.offsetHeight) return pinEl.offsetHeight;
        return window.innerHeight - (header ? header.offsetHeight : 0);
    }

    /* ── scrubbed vertical slide ────────────────────────────────── */
    var currentScreen = 0;

    var slideTween = gsap.to(screensEl, {
        y: function () { return -(screenH() * 2); },
        ease: 'none',
        scrollTrigger: {
            trigger:             scrollEl,
            start:               'top top',
            end:                 'bottom bottom',
            scrub:               1,
            invalidateOnRefresh: true,
            onUpdate:            onScrollUpdate,
        }
    });
    var slideST = slideTween.scrollTrigger;

    function onScrollUpdate(self) {
        var p   = self.progress;
        var idx = Math.min(2, Math.floor(p * 3 + 0.05));

        dots.forEach(function (dot, i) {
            dot.classList.toggle('is-active', i === idx);
        });

        if (idx !== currentScreen) {
            currentScreen = idx;
            stopAll();   /* cambiando schermata si ferma ogni battito */
        }
        if (stage) stage.dataset.activeScreen = String(idx + 1);
    }

    /* ── dot click → scroll to that screen ─────────────────────── */
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
