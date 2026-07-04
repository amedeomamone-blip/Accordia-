(function () {
    'use strict';
    var C = window.RitmoCore;
    if (!C) return;

    var STATES = ['mani', 'piedi', 'cosce', 'schiocco', 'pausa'];

    function setGesture(tile, g) {
        tile.setAttribute('data-g', g);
        tile.querySelector('.crp__sym').textContent  = C.SYM[g];
        tile.querySelector('.crp__name').textContent = C.NAMES[g];
    }

    function makeCycler(tile) {
        tile.addEventListener('click', function () {
            var current = tile.getAttribute('data-g');
            setGesture(tile, STATES[(STATES.indexOf(current) + 1) % STATES.length]);
        });
    }

    /* ════════════════════════════════════════════════════════════
       SCREEN 1 — Domanda e risposta: due frasi che si parlano
       ════════════════════════════════════════════════════════════ */
    (function screen1() {
        var root = document.getElementById('cre-1');
        if (!root) return;

        var rowA    = Array.prototype.slice.call(root.querySelectorAll('[data-row="a"]'));
        var rowB    = Array.prototype.slice.call(root.querySelectorAll('[data-row="b"]'));
        var playBtn = document.getElementById('cre1-play');
        var phaseEl = document.getElementById('cre1-phase');
        var presets = Array.prototype.slice.call(root.querySelectorAll('.btt-chip[data-preset]'));

        var PRESETS = {
            esempio: {
                a: ['mani', 'mani', 'pausa', 'mani', 'cosce', 'cosce', 'pausa', 'pausa'],
                b: ['mani', 'mani', 'pausa', 'mani', 'piedi', 'piedi', 'schiocco', 'pausa']
            },
            vuota: {
                a: ['pausa', 'pausa', 'pausa', 'pausa', 'pausa', 'pausa', 'pausa', 'pausa'],
                b: ['pausa', 'pausa', 'pausa', 'pausa', 'pausa', 'pausa', 'pausa', 'pausa']
            }
        };

        function apply(p) {
            rowA.forEach(function (t, i) { setGesture(t, p.a[i]); });
            rowB.forEach(function (t, i) { setGesture(t, p.b[i]); });
        }

        var pulse = C.makePulse(function (idx, when) {
            var step     = idx % 16;
            var isAnswer = step >= 8;
            var i        = step % 8;
            var tile     = isAnswer ? rowB[i] : rowA[i];
            C.playGesture(tile.getAttribute('data-g'), when);
            C.atAudioTime(when, function () {
                if (!pulse.isRunning()) return;
                phaseEl.textContent = isAnswer ? 'Risposta…' : 'Domanda?';
                phaseEl.setAttribute('data-live', isAnswer ? '1' : '0');
                rowA.forEach(function (t, j) { t.classList.toggle('is-live', !isAnswer && j === i); });
                rowB.forEach(function (t, j) { t.classList.toggle('is-live', isAnswer  && j === i); });
            });
        });
        pulse.setBpm(92);

        function stop() {
            pulse.stop();
            root.classList.remove('is-playing');
            C.setPlay(playBtn, false, 'Ferma la frase', 'Suona la frase');
            phaseEl.textContent = 'Pronti?';
            phaseEl.setAttribute('data-live', '0');
            rowA.concat(rowB).forEach(function (t) { t.classList.remove('is-live'); });
        }
        C.register(stop);

        rowA.concat(rowB).forEach(makeCycler);

        playBtn.addEventListener('click', function () {
            if (pulse.isRunning()) { stop(); return; }
            C.stopAll();
            root.classList.add('is-playing');
            C.setPlay(playBtn, true, 'Ferma la frase', 'Suona la frase');
            pulse.start();
        });

        presets.forEach(function (chip) {
            chip.addEventListener('click', function () {
                apply(PRESETS[chip.getAttribute('data-preset')] || PRESETS.vuota);
            });
        });

        apply(PRESETS.esempio);
    })();

    /* ════════════════════════════════════════════════════════════
       SCREEN 2 — Il rondò della classe: A · solo · A · solo · A
       ════════════════════════════════════════════════════════════ */
    (function screen2() {
        var root = document.getElementById('cre-2');
        if (!root) return;

        var tiles   = Array.prototype.slice.call(root.querySelectorAll('.btl__tile'));
        var playBtn = document.getElementById('cre2-play');
        var phaseEl = document.getElementById('cre2-phase');

        /* ritornello A fisso, ben riconoscibile */
        var THEME = ['mani', 'mani', 'cosce', 'pausa', 'mani', 'mani', 'cosce', 'schiocco'];
        tiles.forEach(function (t, i) { setGesture(t, THEME[i]); });

        var soloCount = 0;

        var pulse = C.makePulse(function (idx, when) {
            var phase  = Math.floor(idx / 8);
            var isSolo = phase % 2 === 1;
            var i      = idx % 8;
            if (isSolo) {
                C.softClick(when);
            } else {
                C.playGesture(THEME[i], when);
            }
            C.atAudioTime(when, function () {
                if (!pulse.isRunning()) return;
                if (i === 0) {
                    if (isSolo) {
                        soloCount += 1;
                        phaseEl.textContent = 'Solo ' + soloCount + ': improvvisa!';
                        phaseEl.setAttribute('data-live', '1');
                    } else {
                        phaseEl.textContent = 'Tutti: ritornello A';
                        phaseEl.setAttribute('data-live', '0');
                    }
                }
                tiles.forEach(function (t, j) {
                    t.classList.toggle('is-live', !isSolo && j === i);
                    t.classList.toggle('is-echo', isSolo  && j === i);
                });
            });
        });
        pulse.setBpm(92);

        function stop() {
            pulse.stop();
            soloCount = 0;
            root.classList.remove('is-playing');
            C.setPlay(playBtn, false, 'Ferma il rondò', 'Avvia il rondò');
            phaseEl.textContent = 'Pronti?';
            phaseEl.setAttribute('data-live', '0');
            tiles.forEach(function (t) { t.classList.remove('is-live', 'is-echo'); });
        }
        C.register(stop);

        playBtn.addEventListener('click', function () {
            if (pulse.isRunning()) { stop(); return; }
            C.stopAll();
            root.classList.add('is-playing');
            C.setPlay(playBtn, true, 'Ferma il rondò', 'Avvia il rondò');
            pulse.start();
        });
    })();

    /* ════════════════════════════════════════════════════════════
       SCREEN 3 — Dal gesto al segno: la frase si scrive da sola
       sul pentagramma (più il suono è grave, più la nota è bassa)
       ════════════════════════════════════════════════════════════ */
    (function screen3() {
        var root = document.getElementById('cre-3');
        if (!root) return;

        var tiles    = Array.prototype.slice.call(root.querySelectorAll('.btl__track .btl__tile'));
        var playBtn  = document.getElementById('cre3-play');
        var presets  = Array.prototype.slice.call(root.querySelectorAll('.btt-chip[data-preset]'));
        var scoreRow = root.querySelector('.rl-score__row');

        var STAFF_LINES = [30, 40, 50, 60, 70].map(function (y) {
            return '<line x1="0" y1="' + y + '" x2="100" y2="' + y + '"/>';
        }).join('');

        /* mappa percussiva: più grave = più in basso sul rigo */
        var NOTE_Y = { schiocco: 30, mani: 40, cosce: 55, piedi: 70 };

        function cellSVG(g) {
            var inner = '';
            if (g === 'pausa') {
                inner = '<path class="rl-rest" d="M44 28 L56 40 L44 52 L56 62 Q44 58 46 72" fill="none"/>';
            } else {
                var y    = NOTE_Y[g] || 50;
                var top  = Math.max(8, y - 34);
                inner = '<ellipse class="rl-note" cx="46" cy="' + y + '" rx="8" ry="5.8" transform="rotate(-20 46 ' + y + ')"/>' +
                        '<rect class="rl-note" x="53" y="' + top + '" width="2.6" height="' + (y - top) + '"/>';
            }
            return '<svg class="rl-staff" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' +
                   STAFF_LINES + inner + '</svg>';
        }

        function renderScore() {
            scoreRow.innerHTML = tiles.map(function (t) {
                return '<span class="rl-score__cell">' + cellSVG(t.getAttribute('data-g')) + '</span>';
            }).join('');
        }
        function scoreCells() {
            return Array.prototype.slice.call(scoreRow.querySelectorAll('.rl-score__cell'));
        }

        var PRESETS = {
            esempio: ['mani', 'mani', 'cosce', 'pausa', 'piedi', 'piedi', 'schiocco', 'pausa'],
            vuota:   ['pausa', 'pausa', 'pausa', 'pausa', 'pausa', 'pausa', 'pausa', 'pausa']
        };

        function apply(seq) {
            tiles.forEach(function (t, i) { setGesture(t, seq[i]); });
            renderScore();
        }

        var pulse = C.makePulse(function (idx, when) {
            var i = idx % tiles.length;
            C.playGesture(tiles[i].getAttribute('data-g'), when);
            C.atAudioTime(when, function () {
                if (!pulse.isRunning()) return;
                tiles.forEach(function (t, j) { t.classList.toggle('is-live', j === i); });
                scoreCells().forEach(function (cel, j) { cel.classList.toggle('is-live', j === i); });
            });
        });
        pulse.setBpm(88);

        function stop() {
            pulse.stop();
            root.classList.remove('is-playing');
            C.setPlay(playBtn, false, 'Ferma', 'Suona e leggi');
            tiles.forEach(function (t) { t.classList.remove('is-live'); });
            scoreCells().forEach(function (cel) { cel.classList.remove('is-live'); });
        }
        C.register(stop);

        tiles.forEach(function (tile) {
            tile.addEventListener('click', function () {
                var current = tile.getAttribute('data-g');
                setGesture(tile, STATES[(STATES.indexOf(current) + 1) % STATES.length]);
                renderScore();
            });
        });

        playBtn.addEventListener('click', function () {
            if (pulse.isRunning()) { stop(); return; }
            C.stopAll();
            root.classList.add('is-playing');
            C.setPlay(playBtn, true, 'Ferma', 'Suona e leggi');
            pulse.start();
        });

        presets.forEach(function (chip) {
            chip.addEventListener('click', function () {
                apply(PRESETS[chip.getAttribute('data-preset')] || PRESETS.vuota);
            });
        });

        apply(PRESETS.esempio);
    })();

    C.initScreens('creazione');
})();
