/* ================================================================
   Ritmo — core condiviso delle lezioni LIM (Accenti, Durate,
   Incastri, Creazione). Audio Web Audio senza asset, scheduler
   con lookahead, boilerplate scroll pinnato GSAP/Lenis.
   Espone window.RitmoCore.
   ================================================================ */
(function () {
    'use strict';

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

    /* click metronomo: accent = più acuto e forte */
    function click(when, accent) {
        var ac = audioCtx();
        if (!ac) return;
        var osc  = ac.createOscillator();
        var gain = ac.createGain();
        osc.type            = 'triangle';
        osc.frequency.value = accent ? 1318 : 880;
        gain.gain.setValueAtTime(accent ? 0.62 : 0.3, when);
        gain.gain.exponentialRampToValueAtTime(0.001, when + 0.09);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(when);
        osc.stop(when + 0.1);
    }

    function softClick(when) {
        var ac = audioCtx();
        if (!ac) return;
        var osc  = ac.createOscillator();
        var gain = ac.createGain();
        osc.type            = 'triangle';
        osc.frequency.value = 660;
        gain.gain.setValueAtTime(0.15, when);
        gain.gain.exponentialRampToValueAtTime(0.001, when + 0.06);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(when);
        osc.stop(when + 0.07);
    }

    function burst(when, freq, type, vol, dur) {
        var ac = audioCtx();
        if (!ac) return;
        var src    = ac.createBufferSource();
        var filter = ac.createBiquadFilter();
        var gain   = ac.createGain();
        src.buffer             = noise(ac);
        filter.type            = type;
        filter.frequency.value = freq;
        gain.gain.setValueAtTime(vol, when);
        gain.gain.exponentialRampToValueAtTime(0.001, when + dur);
        src.connect(filter);
        filter.connect(gain);
        gain.connect(ac.destination);
        src.start(when);
        src.stop(when + dur + 0.02);
    }

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
        if (g === 'mani')          burst(when, 1800, 'bandpass', 0.6,  0.08);
        else if (g === 'cosce')    burst(when, 600,  'bandpass', 0.65, 0.1);
        else if (g === 'schiocco') burst(when, 3200, 'highpass', 0.5,  0.05);
        else if (g === 'piedi')    stomp(when);
    }

    /* nota tenuta (per le durate): parte a `when`, dura `seconds` */
    function tone(when, seconds) {
        var ac = audioCtx();
        if (!ac) return;
        var osc  = ac.createOscillator();
        var gain = ac.createGain();
        osc.type            = 'sine';
        osc.frequency.value = 523.25;   /* Do5 */
        gain.gain.setValueAtTime(0.0001, when);
        gain.gain.linearRampToValueAtTime(0.42, when + 0.02);
        gain.gain.setValueAtTime(0.42, when + Math.max(0.05, seconds - 0.09));
        gain.gain.exponentialRampToValueAtTime(0.001, when + seconds);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(when);
        osc.stop(when + seconds + 0.02);
    }

    /* scheduler con lookahead: il battito non deriva mai */
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
                onBeat(beatIdx, nextTime, bpm);
                beatIdx += 1;
                nextTime += 60 / bpm;
            }
        }

        return {
            isRunning: function () { return running; },
            setBpm:    function (value) { bpm = value; },
            getBpm:    function () { return bpm; },
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

    /* registro engines: cambiando schermata si ferma tutto */
    var engines = [];
    function register(stop) { engines.push(stop); }
    function stopAll() { engines.forEach(function (stop) { stop(); }); }
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) stopAll();
    });

    function setPlay(btn, on, labelOn, labelOff) {
        btn.classList.toggle('is-on', on);
        btn.innerHTML = on ? '&#9632;' : '&#9654;';
        btn.setAttribute('aria-label', on ? labelOn : labelOff);
    }

    var SYM   = { mani: '●', piedi: '▲', cosce: '■', schiocco: '✦', pausa: '○' };
    var NAMES = { mani: 'Mani', piedi: 'Piedi', cosce: 'Cosce', schiocco: 'Schiocco', pausa: 'Pausa' };

    /* ── boilerplate: header sync + scroll pinnato a 3 schermate ── */
    function initScreens(tag) {
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

        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
            console.warn('[' + tag + '] GSAP / ScrollTrigger / Lenis not found. Scroll animation disabled.');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        var lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);

        var scrollEl  = document.querySelector('.bintro-scroll');
        var screensEl = document.querySelector('.bintro-screens');
        var pinEl     = document.getElementById('bintro-pin');
        var dots      = document.querySelectorAll('.bintro-progress__dot');

        if (!scrollEl || !screensEl) return;

        function screenH() {
            if (pinEl && pinEl.offsetHeight) return pinEl.offsetHeight;
            return window.innerHeight - (header ? header.offsetHeight : 0);
        }

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
    }

    window.RitmoCore = {
        audioCtx:    audioCtx,
        click:       click,
        softClick:   softClick,
        playGesture: playGesture,
        tone:        tone,
        makePulse:   makePulse,
        atAudioTime: atAudioTime,
        register:    register,
        stopAll:     stopAll,
        setPlay:     setPlay,
        SYM:         SYM,
        NAMES:       NAMES,
        initScreens: initScreens
    };
})();
