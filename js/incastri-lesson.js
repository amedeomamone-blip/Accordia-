(function () {
    'use strict';
    var C = window.RitmoCore;
    if (!C) return;

    /* helper: motore per griglie di step on/off a N voci.
       rows = [{ tiles, gesture }] — a ogni battito suona le voci
       accese sulla colonna e illumina la colonna. */
    function stepMachine(opts) {
        var root    = document.getElementById(opts.rootId);
        if (!root) return;

        var rows = opts.rows.map(function (row) {
            return {
                gesture: row.gesture,
                tiles:   Array.prototype.slice.call(root.querySelectorAll(row.selector))
            };
        });
        var playBtn = document.getElementById(opts.playId);
        var presets = Array.prototype.slice.call(root.querySelectorAll('.btt-chip[data-preset]'));
        var bpms    = Array.prototype.slice.call(root.querySelectorAll('.btt-chip[data-bpm]'));
        var steps   = rows[0].tiles.length;

        function setPreset(config) {
            rows.forEach(function (row, r) {
                var on = (config && config[r]) || [];
                row.tiles.forEach(function (t, i) {
                    t.classList.toggle('is-on', on.indexOf(i) !== -1);
                });
            });
        }

        var pulse = C.makePulse(function (idx, when) {
            var i = idx % steps;
            C.softClick(when);
            rows.forEach(function (row) {
                if (row.tiles[i].classList.contains('is-on')) C.playGesture(row.gesture, when);
            });
            C.atAudioTime(when, function () {
                if (!pulse.isRunning()) return;
                rows.forEach(function (row) {
                    row.tiles.forEach(function (t, j) { t.classList.toggle('is-live', j === i); });
                });
            });
        });
        pulse.setBpm(opts.bpm || 92);

        function stop() {
            pulse.stop();
            root.classList.remove('is-playing');
            C.setPlay(playBtn, false, 'Ferma', 'Avvia');
            rows.forEach(function (row) {
                row.tiles.forEach(function (t) { t.classList.remove('is-live'); });
            });
        }
        C.register(stop);

        rows.forEach(function (row) {
            row.tiles.forEach(function (tile) {
                tile.addEventListener('click', function () { tile.classList.toggle('is-on'); });
            });
        });

        playBtn.addEventListener('click', function () {
            if (pulse.isRunning()) { stop(); return; }
            C.stopAll();
            root.classList.add('is-playing');
            C.setPlay(playBtn, true, 'Ferma', 'Avvia');
            pulse.start();
        });

        presets.forEach(function (chip) {
            chip.addEventListener('click', function () {
                setPreset(opts.presets[chip.getAttribute('data-preset')]);
            });
        });

        bpms.forEach(function (chip) {
            chip.addEventListener('click', function () {
                pulse.setBpm(parseInt(chip.getAttribute('data-bpm'), 10) || 92);
                bpms.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
            });
        });

        if (opts.initial) setPreset(opts.presets[opts.initial]);
    }

    /* ── SCREEN 1 · L'ostinato: una voce che gira ─────────────────── */
    stepMachine({
        rootId:  'inc-1',
        playId:  'inc1-play',
        rows:    [{ selector: '.btl__tile', gesture: 'mani' }],
        bpm:     96,
        initial: 'treno',
        presets: {
            treno: [[0, 2, 4, 6]],
            zoppo: [[0, 3, 6]],
            vuota: [[]]
        }
    });

    /* ── SCREEN 2 · Due voci che si incastrano ────────────────────── */
    stepMachine({
        rootId:  'inc-2',
        playId:  'inc2-play',
        rows: [
            { selector: '[data-row="a"]', gesture: 'mani'  },
            { selector: '[data-row="b"]', gesture: 'piedi' }
        ],
        bpm:     96,
        initial: 'botta',
        presets: {
            botta: [[0, 2, 4, 6], [1, 3, 5, 7]],
            onda:  [[0, 1, 4, 5], [2, 3, 6, 7]],
            vuota: [[], []]
        }
    });

    /* ── SCREEN 3 · La macchina ritmica a tre voci ────────────────── */
    stepMachine({
        rootId:  'inc-3',
        playId:  'inc3-play',
        rows: [
            { selector: '[data-row="a"]', gesture: 'mani'  },
            { selector: '[data-row="b"]', gesture: 'cosce' },
            { selector: '[data-row="c"]', gesture: 'piedi' }
        ],
        bpm:     92,
        initial: 'groove',
        presets: {
            groove: [[2, 6], [0, 1, 2, 3, 4, 5, 6, 7], [0, 4]],
            onda:   [[3, 7], [1, 2, 5, 6], [0, 4]],
            vuota:  [[], [], []]
        }
    });

    C.initScreens('incastri');
})();
