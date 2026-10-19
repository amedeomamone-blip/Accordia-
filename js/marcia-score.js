/* Accompagnamento didattico originale: quattro pulsazioni semplici (4/4).
   Ogni casella è una semiminima (1/4). */
(function (root) {
    'use strict';
    const instruments = ['legnetti', 'tamburello', 'triangolo'];
    const patterns = {
        base: [
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
        ],
        variante: [
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
        ]
    };
    // The same absolute audio clock drives sound scheduling and the visual cursor.
    function position(seconds, bpm) {
        const beat = seconds * bpm / 60;
        const index = Math.floor(beat + 1e-8);
        return { index, phase: Math.max(0, beat - index),
            step: ((index % 16) + 16) % 16, pulse: ((index % 4) + 4) % 4 };
    }
    function hit(pattern, row, beat, finaleAt = Infinity) {
        if (beat < 0) return false;
        if (beat >= finaleAt) return beat === finaleAt;
        return Boolean(patterns[pattern][row][beat % 16]);
    }
    function nextBar(beat) { return (Math.floor(beat / 4) + 1) * 4; }
    const api = { instruments, patterns, position, hit, nextBar };
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    root.MarchScore = api;
}(typeof globalThis !== 'undefined' ? globalThis : this));
