(function () {
    'use strict';
    var C = window.RitmoCore;
    if (!C) return;

    /* ════════════════════════════════════════════════════════════
       Pentagramma in SVG — 5 linee + figura, dentro il tile.
       Le linee attraversano tutta la larghezza: tile adiacenti
       formano un rigo continuo.
       ════════════════════════════════════════════════════════════ */
    var STAFF_LINES = [30, 40, 50, 60, 70].map(function (y) {
        return '<line x1="0" y1="' + y + '" x2="100" y2="' + y + '"/>';
    }).join('');

    var GLYPHS = {
        semibreve:  '<ellipse class="rl-note--stroke" cx="50" cy="50" rx="10.5" ry="6.8"/>',
        minima:     '<ellipse class="rl-note--stroke" cx="46" cy="50" rx="8" ry="5.8" transform="rotate(-20 46 50)"/>' +
                    '<rect class="rl-note" x="53" y="17" width="2.6" height="33"/>',
        semiminima: '<ellipse class="rl-note" cx="46" cy="50" rx="8" ry="5.8" transform="rotate(-20 46 50)"/>' +
                    '<rect class="rl-note" x="53" y="17" width="2.6" height="33"/>',
        crome:      '<ellipse class="rl-note" cx="30" cy="52" rx="6.8" ry="5" transform="rotate(-20 30 52)"/>' +
                    '<ellipse class="rl-note" cx="62" cy="52" rx="6.8" ry="5" transform="rotate(-20 62 52)"/>' +
                    '<rect class="rl-note" x="36" y="20" width="2.4" height="31"/>' +
                    '<rect class="rl-note" x="68" y="20" width="2.4" height="31"/>' +
                    '<rect class="rl-note" x="36" y="18" width="34.4" height="6"/>',
        pausa:      '<path class="rl-rest" d="M44 28 L56 40 L44 52 L56 62 Q44 58 46 72" fill="none"/>'
    };

    function staffSVG(fig) {
        return '<svg class="rl-staff" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' +
               STAFF_LINES + (GLYPHS[fig] || '') + '</svg>';
    }

    /* durata in battiti di ogni figura */
    var BEATS = { semibreve: 4, minima: 2, semiminima: 1, crome: 0.5 };
    var NAMES = { semibreve: 'semibreve', minima: 'minima', semiminima: 'semiminima', crome: 'due crome' };

    /* suona la figura a partire da `when` (bpm dato) */
    function playFig(fig, when, bpm) {
        var beat = 60 / bpm;
        if (fig === 'crome') {
            C.tone(when, beat * 0.42);
            C.tone(when + beat * 0.5, beat * 0.42);
        } else if (fig !== 'pausa') {
            C.tone(when, beat * BEATS[fig] * 0.92);
        }
    }

    /* ════════════════════════════════════════════════════════════
       SCREEN 1 — Le figure: tocca e ascolta sopra 4 battiti
       ════════════════════════════════════════════════════════════ */
    (function screen1() {
        var root = document.getElementById('dur-1');
        if (!root) return;

        var tiles = Array.prototype.slice.call(root.querySelectorAll('.btl__tile'));
        var busy  = false;

        tiles.forEach(function (tile) {
            var fig = tile.getAttribute('data-val');
            tile.insertAdjacentHTML('afterbegin', staffSVG(fig));

            tile.addEventListener('click', function () {
                if (busy) return;
                var ac = C.audioCtx();
                if (!ac) return;
                busy = true;
                var bpm  = 80;
                var beat = 60 / bpm;
                var t0   = ac.currentTime + 0.08;
                /* 4 click di battito, la figura vive sopra di loro */
                for (var b = 0; b < 4; b += 1) C.click(t0 + b * beat, b === 0);
                playFig(fig, t0, bpm);
                tile.classList.add('is-live');
                root.classList.add('is-playing');
                C.atAudioTime(t0 + 4 * beat, function () {
                    tile.classList.remove('is-live');
                    root.classList.remove('is-playing');
                    busy = false;
                });
            });
        });

        C.register(function () {});
    })();

    /* ════════════════════════════════════════════════════════════
       SCREEN 2 — Quanto dura? Nota misteriosa, la classe conta.
       ════════════════════════════════════════════════════════════ */
    (function screen2() {
        var root = document.getElementById('dur-2');
        if (!root) return;

        var playBtn = document.getElementById('dur2-play');
        var newBtn  = document.getElementById('dur2-new');
        var optsBox = document.getElementById('dur2-opts');
        var opts    = Array.prototype.slice.call(root.querySelectorAll('.rl-opt'));
        var phaseEl = document.getElementById('dur2-phase');
        var scoreEl = document.getElementById('dur2-score');

        opts.forEach(function (opt) {
            opt.querySelector('.rl-opt__staff').innerHTML = staffSVG(opt.getAttribute('data-val'));
        });

        var FIGS     = ['semibreve', 'minima', 'semiminima', 'crome'];
        var fig      = FIGS[Math.floor(Math.random() * FIGS.length)];
        var round    = 1;
        var score    = 0;
        var answered = false;
        var heard    = false;
        var busy     = false;

        function renderScore() {
            scoreEl.textContent = 'Giro ' + round + ' · Punti classe ' + score;
        }
        function say(msg, live) {
            phaseEl.textContent = msg;
            phaseEl.setAttribute('data-live', live ? '1' : '0');
        }

        function playRound() {
            var ac = C.audioCtx();
            if (!ac || busy) return;
            busy  = true;
            heard = true;
            var bpm  = 80;
            var beat = 60 / bpm;
            var t0   = ac.currentTime + 0.08;
            /* 4 click di preparazione + 4 click con la nota sopra */
            for (var b = 0; b < 8; b += 1) C.click(t0 + b * beat, b % 4 === 0);
            playFig(fig, t0 + 4 * beat, bpm);
            C.setPlay(playBtn, true, 'In ascolto…', 'Ascolta la nota');
            say('Contate…', false);
            C.atAudioTime(t0 + 8 * beat, function () {
                busy = false;
                C.setPlay(playBtn, false, 'In ascolto…', 'Ascolta la nota');
                say('Quanto è durata?', true);
            });
        }

        function stop() {
            C.setPlay(playBtn, false, 'In ascolto…', 'Ascolta la nota');
        }
        C.register(stop);

        function newRound() {
            var next = fig;
            while (next === fig) next = FIGS[Math.floor(Math.random() * FIGS.length)];
            fig      = next;
            answered = false;
            heard    = false;
            round   += 1;
            opts.forEach(function (o) { o.classList.remove('is-correct', 'is-wrong'); });
            optsBox.classList.remove('is-locked');
            say('Pronti?', false);
            renderScore();
        }

        playBtn.addEventListener('click', playRound);
        newBtn.addEventListener('click', newRound);

        opts.forEach(function (opt) {
            opt.addEventListener('click', function () {
                if (answered) return;
                if (!heard) { say('Prima ascolta la nota!', false); return; }
                answered   = true;
                var chosen = opt.getAttribute('data-val');
                optsBox.classList.add('is-locked');
                if (chosen === fig) {
                    opt.classList.add('is-correct');
                    score += 1;
                    say('Esatto: era una ' + NAMES[fig] + '!', true);
                } else {
                    opt.classList.add('is-wrong');
                    opts.forEach(function (o) {
                        if (o.getAttribute('data-val') === fig) o.classList.add('is-correct');
                    });
                    say('Era una ' + NAMES[fig] + ': riascoltate contando.', false);
                }
                renderScore();
            });
        });

        renderScore();
    })();

    /* ════════════════════════════════════════════════════════════
       SCREEN 3 — Scrivi la battuta: 4 tempi sul pentagramma
       ════════════════════════════════════════════════════════════ */
    (function screen3() {
        var root = document.getElementById('dur-3');
        if (!root) return;

        var tiles   = Array.prototype.slice.call(root.querySelectorAll('.btl__tile'));
        var playBtn = document.getElementById('dur3-play');
        var presets = Array.prototype.slice.call(root.querySelectorAll('.btt-chip[data-preset]'));

        var STATES  = ['semiminima', 'crome', 'pausa'];
        var PRESETS = {
            marcia:  ['semiminima', 'semiminima', 'semiminima', 'semiminima'],
            galoppo: ['semiminima', 'crome', 'semiminima', 'crome'],
            vuota:   ['pausa', 'pausa', 'pausa', 'pausa']
        };

        function setFig(tile, fig) {
            tile.setAttribute('data-fig', fig);
            var old = tile.querySelector('.rl-staff');
            if (old) old.remove();
            tile.insertAdjacentHTML('afterbegin', staffSVG(fig));
        }

        var pulse = C.makePulse(function (idx, when, bpm) {
            var i   = idx % tiles.length;
            var fig = tiles[i].getAttribute('data-fig');
            C.click(when, i === 0);
            playFig(fig, when, bpm);
            C.atAudioTime(when, function () {
                if (!pulse.isRunning()) return;
                tiles.forEach(function (t, j) { t.classList.toggle('is-live', j === i); });
            });
        });
        pulse.setBpm(80);

        function stop() {
            pulse.stop();
            root.classList.remove('is-playing');
            C.setPlay(playBtn, false, 'Ferma la battuta', 'Suona la battuta');
            tiles.forEach(function (t) { t.classList.remove('is-live'); });
        }
        C.register(stop);

        tiles.forEach(function (tile) {
            setFig(tile, tile.getAttribute('data-fig'));
            tile.addEventListener('click', function () {
                var current = tile.getAttribute('data-fig');
                setFig(tile, STATES[(STATES.indexOf(current) + 1) % STATES.length]);
            });
        });

        playBtn.addEventListener('click', function () {
            if (pulse.isRunning()) { stop(); return; }
            C.stopAll();
            root.classList.add('is-playing');
            C.setPlay(playBtn, true, 'Ferma la battuta', 'Suona la battuta');
            pulse.start();
        });

        presets.forEach(function (chip) {
            chip.addEventListener('click', function () {
                var seq = PRESETS[chip.getAttribute('data-preset')] || PRESETS.vuota;
                tiles.forEach(function (tile, i) { setFig(tile, seq[i]); });
            });
        });
    })();

    C.initScreens('durate');
})();
