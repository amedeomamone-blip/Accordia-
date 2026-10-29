(function () {
    'use strict';
    var semitones = [0, 2, 4, 5, 7, 9, 11, 12];
    var names = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do'];
    var context, voices = [], generation = 0;
    var status = document.getElementById('scale-audio-status');
    function stop() {
        generation += 1;
        voices.forEach(function (osc) { try { osc.stop(); } catch (_) {} });
        voices = [];
    }
    async function play(pitches) {
        stop();
        var run = generation;
        var Audio = window.AudioContext || window.webkitAudioContext;
        if (!Audio) { status.textContent = 'Audio non disponibile: puoi comunque esplorare tutti gli schemi.'; return; }
        try {
            context = context || new Audio();
            await context.resume();
            if (run !== generation) return;
            pitches.forEach(function (pitch, i) {
                var osc = context.createOscillator(), gain = context.createGain();
                var start = context.currentTime + .05 + i * .55;
                osc.frequency.value = 261.625565 * Math.pow(2, pitch / 12);
                gain.gain.setValueAtTime(0, start);
                gain.gain.linearRampToValueAtTime(.15, start + .02);
                gain.gain.setValueAtTime(.15, start + .4);
                gain.gain.linearRampToValueAtTime(0, start + .5);
                osc.connect(gain); gain.connect(context.destination);
                osc.start(start); osc.stop(start + .52); voices.push(osc);
                osc.onended = function () {
                    osc.disconnect(); gain.disconnect();
                    if (run === generation && i === pitches.length - 1) status.textContent = 'Ascolto concluso.';
                };
            });
            status.textContent = 'Ascolto in corso.';
        } catch (_) { status.textContent = 'Audio non disponibile. Gli schemi e gli esercizi restano utilizzabili.'; }
    }
    document.querySelectorAll('[data-interval]').forEach(function (button) {
        button.addEventListener('click', function () {
            var i = Number(button.dataset.interval), distance = semitones[i + 1] - semitones[i];
            document.querySelectorAll('[data-interval]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === button)); });
            document.getElementById('interval-feedback').textContent = names[i] + '–' + names[i + 1] + ': ' + (distance === 1 ? 'un semitono (S), nessun tasto intermedio.' : 'un tono (T), due semitoni.');
            play([semitones[i], semitones[i + 1]]);
        });
    });
    document.getElementById('scale-listen').addEventListener('click', function () { play(semitones); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); });
    window.addEventListener('pagehide', stop);
}());
