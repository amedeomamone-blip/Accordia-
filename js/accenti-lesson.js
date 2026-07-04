(function () {
    'use strict';
    var C = window.RitmoCore;
    if (!C) return;

    /* ════════════════════════════════════════════════════════════
       SCREEN 1 — Forte e debole: il metro mostra i suoi accenti
       ════════════════════════════════════════════════════════════ */
    (function screen1() {
        var root = document.getElementById('acc-1');
        if (!root) return;

        var tiles   = Array.prototype.slice.call(root.querySelectorAll('.btl__tile'));
        var playBtn = document.getElementById('acc1-play');
        var chips   = Array.prototype.slice.call(root.querySelectorAll('.btt-chip[data-meter]'));
        var meter   = 2;

        function paint() {
            tiles.forEach(function (t, i) {
                t.classList.toggle('is-on', i % meter === 0);
            });
        }

        var pulse = C.makePulse(function (idx, when) {
            var i = idx % tiles.length;
            C.click(when, i % meter === 0);
            C.atAudioTime(when, function () {
                if (!pulse.isRunning()) return;
                tiles.forEach(function (t, j) { t.classList.toggle('is-live', j === i); });
            });
        });
        pulse.setBpm(88);

        function stop() {
            pulse.stop();
            root.classList.remove('is-playing');
            C.setPlay(playBtn, false, 'Ferma il battito', 'Avvia il battito');
            tiles.forEach(function (t) { t.classList.remove('is-live'); });
        }
        C.register(stop);

        playBtn.addEventListener('click', function () {
            if (pulse.isRunning()) { stop(); return; }
            C.stopAll();
            root.classList.add('is-playing');
            C.setPlay(playBtn, true, 'Ferma il battito', 'Avvia il battito');
            pulse.start();
        });

        chips.forEach(function (chip) {
            chip.addEventListener('click', function () {
                meter = parseInt(chip.getAttribute('data-meter'), 10) || 2;
                chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
                paint();
            });
        });

        paint();
    })();

    /* ════════════════════════════════════════════════════════════
       SCREEN 2 — Che metro senti? Solo orecchie: gioco a punti.
       ════════════════════════════════════════════════════════════ */
    (function screen2() {
        var root = document.getElementById('acc-2');
        if (!root) return;

        var playBtn = document.getElementById('acc2-play');
        var newBtn  = document.getElementById('acc2-new');
        var optsBox = document.getElementById('acc2-opts');
        var opts    = Array.prototype.slice.call(root.querySelectorAll('.rl-opt'));
        var phaseEl = document.getElementById('acc2-phase');
        var scoreEl = document.getElementById('acc2-score');

        var METERS   = [2, 3, 4];
        var meter    = METERS[Math.floor(Math.random() * METERS.length)];
        var round    = 1;
        var score    = 0;
        var answered = false;
        var heard    = false;
        var TOTAL    = 16;   /* battiti per giro */

        function renderScore() {
            scoreEl.textContent = 'Giro ' + round + ' · Punti classe ' + score;
        }
        function say(msg, live) {
            phaseEl.textContent = msg;
            phaseEl.setAttribute('data-live', live ? '1' : '0');
        }

        var pulse = C.makePulse(function (idx, when) {
            C.click(when, idx % meter === 0);
            if (idx >= TOTAL - 1) {
                C.atAudioTime(when + 0.3, function () {
                    if (pulse.isRunning()) { stop(); say('Che metro avete sentito?', true); }
                });
                pulse.stop();
            }
        });
        pulse.setBpm(96);

        function stop() {
            pulse.stop();
            C.setPlay(playBtn, false, 'Ferma il giro', 'Ascolta il giro');
        }
        C.register(stop);

        function newRound() {
            stop();
            var next = meter;
            while (next === meter) next = METERS[Math.floor(Math.random() * METERS.length)];
            meter    = next;
            answered = false;
            heard    = false;
            round   += 1;
            opts.forEach(function (o) { o.classList.remove('is-correct', 'is-wrong'); });
            optsBox.classList.remove('is-locked');
            say('Pronti?', false);
            renderScore();
        }

        playBtn.addEventListener('click', function () {
            if (pulse.isRunning()) { stop(); say('Pronti?', false); return; }
            C.stopAll();
            heard = true;
            C.setPlay(playBtn, true, 'Ferma il giro', 'Ascolta il giro');
            say('Contate…', false);
            pulse.start();
        });

        newBtn.addEventListener('click', newRound);

        opts.forEach(function (opt) {
            opt.addEventListener('click', function () {
                if (answered) return;
                if (!heard) { say('Prima ascolta il giro!', false); return; }
                answered   = true;
                var chosen = parseInt(opt.getAttribute('data-meter'), 10);
                optsBox.classList.add('is-locked');
                if (chosen === meter) {
                    opt.classList.add('is-correct');
                    score += 1;
                    say('Esatto: accento ogni ' + meter + ' battiti!', true);
                } else {
                    opt.classList.add('is-wrong');
                    opts.forEach(function (o) {
                        if (parseInt(o.getAttribute('data-meter'), 10) === meter) o.classList.add('is-correct');
                    });
                    say('Era ogni ' + meter + ' battiti: riascoltate e contate.', false);
                }
                renderScore();
            });
        });

        renderScore();
    })();

    /* ════════════════════════════════════════════════════════════
       SCREEN 3 — Sposta l'accento: tocca i tile, nasce la sincope
       ════════════════════════════════════════════════════════════ */
    (function screen3() {
        var root = document.getElementById('acc-3');
        if (!root) return;

        var tiles   = Array.prototype.slice.call(root.querySelectorAll('.btl__tile'));
        var playBtn = document.getElementById('acc3-play');
        var presets = Array.prototype.slice.call(root.querySelectorAll('.btt-chip[data-preset]'));

        var PRESETS = {
            marcia:   [0, 4],
            tresillo: [0, 3, 6],
            levare:   [1, 3, 5, 7]
        };

        function setAccents(list) {
            tiles.forEach(function (t, i) {
                t.classList.toggle('is-on', list.indexOf(i) !== -1);
            });
        }

        var pulse = C.makePulse(function (idx, when) {
            var i      = idx % tiles.length;
            var accent = tiles[i].classList.contains('is-on');
            C.click(when, accent);
            C.atAudioTime(when, function () {
                if (!pulse.isRunning()) return;
                tiles.forEach(function (t, j) { t.classList.toggle('is-live', j === i); });
            });
        });
        pulse.setBpm(96);

        function stop() {
            pulse.stop();
            root.classList.remove('is-playing');
            C.setPlay(playBtn, false, 'Ferma il battito', 'Avvia il battito');
            tiles.forEach(function (t) { t.classList.remove('is-live'); });
        }
        C.register(stop);

        tiles.forEach(function (tile) {
            tile.addEventListener('click', function () {
                tile.classList.toggle('is-on');
            });
        });

        playBtn.addEventListener('click', function () {
            if (pulse.isRunning()) { stop(); return; }
            C.stopAll();
            root.classList.add('is-playing');
            C.setPlay(playBtn, true, 'Ferma il battito', 'Avvia il battito');
            pulse.start();
        });

        presets.forEach(function (chip) {
            chip.addEventListener('click', function () {
                setAccents(PRESETS[chip.getAttribute('data-preset')] || []);
            });
        });

        setAccents(PRESETS.marcia);
    })();

    C.initScreens('accenti');
})();
