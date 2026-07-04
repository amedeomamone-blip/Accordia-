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
       Audio — timbri del corpo sintetizzati (Web Audio, zero asset)
       ════════════════════════════════════════════════════════════ */
    var AC = null;
    var noiseBuf = null;

    function audioCtx() {
        if (!AC) {
            var Ctor = window.AudioContext || window.webkitAudioContext;
            if (!Ctor) return null;
            AC = new Ctor();
        }
        if (AC.state === 'suspended') AC.resume();
        return AC;
    }

    function noise(ac) {
        if (!noiseBuf) {
            noiseBuf = ac.createBuffer(1, ac.sampleRate * 0.25, ac.sampleRate);
            var data = noiseBuf.getChannelData(0);
            for (var i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
        }
        return noiseBuf;
    }

    /* rumore filtrato: mani (clap), cosce (pat), schiocco (snap) */
    function burst(when, freq, type, vol, dur) {
        var ac = audioCtx();
        if (!ac) return;
        var src    = ac.createBufferSource();
        var filter = ac.createBiquadFilter();
        var gain   = ac.createGain();
        src.buffer            = noise(ac);
        filter.type           = type;
        filter.frequency.value = freq;
        gain.gain.setValueAtTime(vol, when);
        gain.gain.exponentialRampToValueAtTime(0.001, when + dur);
        src.connect(filter);
        filter.connect(gain);
        gain.connect(ac.destination);
        src.start(when);
        src.stop(when + dur + 0.02);
    }

    /* piedi: colpo grave con glissato verso il basso */
    function stomp(when) {
        var ac = audioCtx();
        if (!ac) return;
        var osc  = ac.createOscillator();
        var gain = ac.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, when);
        osc.frequency.exponentialRampToValueAtTime(48, when + 0.13);
        gain.gain.setValueAtTime(0.85, when);
        gain.gain.exponentialRampToValueAtTime(0.001, when + 0.19);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(when);
        osc.stop(when + 0.2);
    }

    function playGesture(g, when) {
        if (g === 'mani')      burst(when, 1800, 'bandpass', 0.6,  0.08);
        else if (g === 'cosce')    burst(when, 600,  'bandpass', 0.65, 0.1);
        else if (g === 'schiocco') burst(when, 3200, 'highpass', 0.5,  0.05);
        else if (g === 'piedi')    stomp(when);
    }

    /* click leggero per la fase di risposta */
    function softClick(when) {
        var ac = audioCtx();
        if (!ac) return;
        var osc  = ac.createOscillator();
        var gain = ac.createGain();
        osc.type            = 'triangle';
        osc.frequency.value = 660;
        gain.gain.setValueAtTime(0.16, when);
        gain.gain.exponentialRampToValueAtTime(0.001, when + 0.06);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(when);
        osc.stop(when + 0.07);
    }

    /* ── scheduler con lookahead ─────────────────────────────────── */
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

    function atAudioTime(when, fn) {
        var ac    = audioCtx();
        var delay = ac ? Math.max(0, (when - ac.currentTime) * 1000) : 0;
        window.setTimeout(fn, delay);
    }

    var engines = [];
    function stopAll() {
        engines.forEach(function (stop) { stop(); });
    }
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) stopAll();
    });

    function setPlay(btn, on, labelOn, labelOff) {
        btn.classList.toggle('is-on', on);
        btn.innerHTML = on ? '&#9632;' : '&#9654;';
        btn.setAttribute('aria-label', on ? labelOn : labelOff);
    }

    var SYMBOLS = { mani: '●', piedi: '▲', cosce: '■', schiocco: '✦', pausa: '○' };
    var NAMES   = { mani: 'Mani',   piedi: 'Piedi',  cosce: 'Cosce',  schiocco: 'Schiocco', pausa: 'Pausa' };

    /* ════════════════════════════════════════════════════════════
       SCREEN 1 — Quattro strumenti, un corpo
       Tocca un tile-gesto: suona il suo timbro e si accende.
       ════════════════════════════════════════════════════════════ */
    (function screen1() {
        var root = document.getElementById('crp-1');
        if (!root) return;

        var tiles = Array.prototype.slice.call(root.querySelectorAll('.btl__tile'));

        tiles.forEach(function (tile) {
            var flashTimer = null;
            tile.addEventListener('click', function () {
                var ac = audioCtx();
                if (!ac) return;
                playGesture(tile.getAttribute('data-g'), ac.currentTime + 0.02);
                tile.classList.add('is-live');
                root.classList.add('is-playing');
                window.clearTimeout(flashTimer);
                flashTimer = window.setTimeout(function () {
                    tile.classList.remove('is-live');
                    if (!root.querySelector('.btl__tile.is-live')) {
                        root.classList.remove('is-playing');
                    }
                }, 220);
            });
        });

        engines.push(function () {});
    })();

    /* ════════════════════════════════════════════════════════════
       SCREEN 2 — Eco: ascolta e rispondi
       8 battiti di frase (suoni + luci), poi 8 battiti di solo
       click: la classe risponde con il corpo. E si ricomincia.
       ════════════════════════════════════════════════════════════ */
    (function screen2() {
        var root = document.getElementById('crp-2');
        if (!root) return;

        var tiles   = Array.prototype.slice.call(root.querySelectorAll('.btl__tile'));
        var playBtn = document.getElementById('crp2-play');
        var newBtn  = document.getElementById('crp2-new');
        var chips   = Array.prototype.slice.call(root.querySelectorAll('.btt-chip[data-pool]'));
        var phaseEl = document.getElementById('crp2-phase');

        var POOLS = {
            '2': ['mani', 'piedi'],
            '3': ['mani', 'piedi', 'cosce'],
            '4': ['mani', 'piedi', 'cosce', 'schiocco']
        };
        var pool    = POOLS['2'];
        var pattern = [];

        function newPattern() {
            pattern = [];
            for (var i = 0; i < tiles.length; i += 1) {
                pattern.push(pool[Math.floor(Math.random() * pool.length)]);
            }
            tiles.forEach(function (t, i) {
                t.setAttribute('data-g', pattern[i]);
                t.querySelector('.crp__sym').textContent  = SYMBOLS[pattern[i]];
                t.querySelector('.crp__name').textContent = NAMES[pattern[i]];
            });
        }

        var pulse = makePulse(function (idx, when) {
            var step   = idx % tiles.length;
            var listen = Math.floor(idx / tiles.length) % 2 === 0;
            if (listen) playGesture(pattern[step], when);
            else        softClick(when);
            atAudioTime(when, function () {
                if (!pulse.isRunning()) return;
                phaseEl.textContent = listen ? 'Ascoltate…' : 'Tocca a voi!';
                phaseEl.setAttribute('data-live', listen ? '0' : '1');
                tiles.forEach(function (t, j) {
                    t.classList.toggle('is-live', listen  && j === step);
                    t.classList.toggle('is-echo', !listen && j === step);
                });
            });
        });
        pulse.setBpm(88);

        function stop() {
            pulse.stop();
            root.classList.remove('is-playing');
            setPlay(playBtn, false, 'Ferma l’eco', 'Avvia l’eco');
            phaseEl.textContent = 'Pronti?';
            phaseEl.setAttribute('data-live', '0');
            tiles.forEach(function (t) { t.classList.remove('is-live', 'is-echo'); });
        }
        engines.push(stop);

        playBtn.addEventListener('click', function () {
            if (pulse.isRunning()) { stop(); return; }
            stopAll();
            root.classList.add('is-playing');
            setPlay(playBtn, true, 'Ferma l’eco', 'Avvia l’eco');
            pulse.start();
        });

        newBtn.addEventListener('click', function () {
            stop();
            newPattern();
        });

        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                pool = POOLS[chip.getAttribute('data-pool')] || POOLS['2'];
                chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
                stop();
                newPattern();
            });
        });

        newPattern();
    })();

    /* ════════════════════════════════════════════════════════════
       SCREEN 3 — Componi la frase del corpo
       Tap sul tile → cicla mani / piedi / cosce / schiocco / pausa.
       Play: la frase gira in loop e la classe la esegue.
       ════════════════════════════════════════════════════════════ */
    (function screen3() {
        var root = document.getElementById('crp-3');
        if (!root) return;

        var tiles   = Array.prototype.slice.call(root.querySelectorAll('.btl__tile'));
        var playBtn = document.getElementById('crp3-play');
        var presets = Array.prototype.slice.call(root.querySelectorAll('.btt-chip[data-preset]'));

        var STATES  = ['mani', 'piedi', 'cosce', 'schiocco', 'pausa'];
        var PRESETS = {
            rock:   ['cosce', 'cosce', 'mani', 'pausa', 'cosce', 'cosce', 'mani', 'pausa'],
            marcia: ['piedi', 'mani', 'piedi', 'mani', 'piedi', 'mani', 'schiocco', 'pausa'],
            vuota:  ['pausa', 'pausa', 'pausa', 'pausa', 'pausa', 'pausa', 'pausa', 'pausa']
        };

        function setState(tile, g) {
            tile.setAttribute('data-g', g);
            tile.querySelector('.crp__sym').textContent  = SYMBOLS[g];
            tile.querySelector('.crp__name').textContent = NAMES[g];
        }

        var pulse = makePulse(function (idx, when) {
            var i = idx % tiles.length;
            var g = tiles[i].getAttribute('data-g');
            playGesture(g, when);
            atAudioTime(when, function () {
                if (!pulse.isRunning()) return;
                tiles.forEach(function (t, j) { t.classList.toggle('is-live', j === i); });
            });
        });
        pulse.setBpm(88);

        function stop() {
            pulse.stop();
            root.classList.remove('is-playing');
            setPlay(playBtn, false, 'Ferma la frase', 'Suona la frase');
            tiles.forEach(function (t) { t.classList.remove('is-live'); });
        }
        engines.push(stop);

        tiles.forEach(function (tile) {
            tile.addEventListener('click', function () {
                var current = tile.getAttribute('data-g');
                var next    = STATES[(STATES.indexOf(current) + 1) % STATES.length];
                setState(tile, next);
            });
        });

        playBtn.addEventListener('click', function () {
            if (pulse.isRunning()) { stop(); return; }
            stopAll();
            root.classList.add('is-playing');
            setPlay(playBtn, true, 'Ferma la frase', 'Suona la frase');
            pulse.start();
        });

        presets.forEach(function (chip) {
            chip.addEventListener('click', function () {
                var seq = PRESETS[chip.getAttribute('data-preset')] || PRESETS.vuota;
                tiles.forEach(function (tile, i) { setState(tile, seq[i]); });
            });
        });
    })();

    /* ── guard: GSAP, ScrollTrigger, Lenis must be loaded ──────── */
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
        console.warn('[corpo] GSAP / ScrollTrigger / Lenis not found. Scroll animation disabled.');
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
            stopAll();
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
