(function () {
    'use strict';

    var lesson = document.getElementById('measure-lesson');
    var header = document.getElementById('site-header');
    var viewport = document.getElementById('lesson-viewport');
    var screens = Array.prototype.slice.call(document.querySelectorAll('.figure-screen'));
    var dots = Array.prototype.slice.call(document.querySelectorAll('.figure-lesson__dot'));

    var NOTE_GLYPHS = {
        whole: '&#x1D15D;',
        half: '&#x1D15E;',
        quarter: '&#x1D15F;',
        eighth: '&#x1D160;'
    };

    var FIGURES = {
        8: { figure: 'whole', units: 8, beats: '4 mov.' },
        4: { figure: 'half', units: 4, beats: '2 mov.' },
        2: { figure: 'quarter', units: 2, beats: '1 mov.' },
        1: { figure: 'eighth', units: 1, beats: '½ mov.' }
    };

    function drawNotation(root) {
        Array.prototype.slice.call((root || document).querySelectorAll('.notation-glyph')).forEach(function (glyph) {
            var figure = glyph.getAttribute('data-figure') || 'quarter';
            glyph.innerHTML = '<span class="bravura-char" aria-hidden="true">' + (NOTE_GLYPHS[figure] || NOTE_GLYPHS.quarter) + '</span>';
        });
    }

    function syncGeometry() {
        if (!lesson || !header) return;
        lesson.style.setProperty('--lesson-header-h', header.offsetHeight + 'px');
        document.querySelectorAll('.measure-strip, .measure-examples').forEach(function (row) {
            var glyph = row.querySelector('[data-figure="quarter"]');
            if (!glyph) return;
            var char = glyph.querySelector('.bravura-char');
            if (!char) return;
            var fontSize = parseFloat(getComputedStyle(char).fontSize);
            var box = glyph.getBoundingClientRect();
            var rowBox = row.getBoundingClientRect();
            row.style.setProperty('--staff-gap', (fontSize / 4) + 'px');
            row.style.setProperty('--staff-top', (box.top - rowBox.top + box.height / 2 + fontSize * .37) + 'px');
        });
    }

    syncGeometry();
    drawNotation(document);
    document.querySelectorAll('.measure-clef').forEach(function (clef) {
        clef.innerHTML = '<svg viewBox="0 -5 3 8" aria-hidden="true"><text x="0" y="0" font-family="Bravura" font-size="4" fill="currentColor">&#xE050;</text></svg>';
    });
    document.fonts.ready.then(syncGeometry);
    window.addEventListener('resize', syncGeometry);
    window.addEventListener('load', syncGeometry);

    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            var target = screens[Number(dot.getAttribute('data-target'))];
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    if ('IntersectionObserver' in window && viewport) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var index = screens.indexOf(entry.target);
                dots.forEach(function (dot, dotIndex) {
                    dot.classList.toggle('is-active', dotIndex === index);
                });
            });
        }, { root: viewport, threshold: 0.62 });
        screens.forEach(function (screen) { observer.observe(screen); });
    }

    var meterCards = Array.prototype.slice.call(document.querySelectorAll('.meter-card'));
    var meterCallout = document.getElementById('meter-callout');
    meterCards.forEach(function (card) {
        card.addEventListener('click', function () {
            meterCards.forEach(function (item) { item.classList.toggle('is-active', item === card); });
            if (meterCallout) meterCallout.innerHTML = '<strong>' + card.getAttribute('data-meter') + '.</strong> ' + card.getAttribute('data-explain');
        });
    });

    Array.prototype.slice.call(document.querySelectorAll('.measure-strip__bar')).forEach(function (bar) {
        bar.addEventListener('click', function () {
            bar.classList.remove('is-active');
            window.requestAnimationFrame(function () { bar.classList.add('is-active'); });
        });
    });

    /* Unità di lavoro: una croma = 1. Quindi 2/4 = 4, 3/4 = 6, 4/4 = 8. */
    var rawQuestions = [
        [2, [2], [2]], [2, [1, 1], [2]], [2, [2, 1], [1]], [2, [1], [1, 2]], [2, [2], [1, 1]],
        [2, [1], [1, 1, 1]], [2, [], [2, 2]], [2, [], [4]], [2, [1, 1], [1, 1]], [2, [2], [2]],
        [3, [4], [2]], [3, [2, 2], [2]], [3, [4, 1], [1]], [3, [2, 1, 1], [2]], [3, [2], [4]],
        [3, [1, 1], [4]], [3, [4], [1, 1]], [3, [2], [2, 2]], [3, [1], [1, 4]], [3, [], [4, 2]],
        [4, [4], [4]], [4, [4, 2], [2]], [4, [2, 2, 2], [2]], [4, [4, 1, 1], [2]], [4, [2, 2], [4]],
        [4, [1, 1, 2], [4]], [4, [4], [2, 2]], [4, [2], [4, 2]], [4, [1, 1], [4, 2]], [4, [], [8]]
    ];

    var questions = rawQuestions.map(function (entry, index) {
        var meter = entry[0];
        var knownUnits = entry[1];
        var missingUnits = entry[2];
        var target = meter * 2;
        var total = knownUnits.concat(missingUnits).reduce(function (sum, units) { return sum + units; }, 0);
        if (total !== target) throw new Error('Esercizio non valido: ' + (index + 1));
        return {
            meter: meter,
            known: knownUnits.map(function (units) { return FIGURES[units]; }),
            blankCount: missingUnits.length,
            missingTotal: missingUnits.reduce(function (sum, units) { return sum + units; }, 0)
        };
    });

    var known = document.getElementById('quiz-known');
    var blanks = document.getElementById('quiz-blanks');
    var meter = document.getElementById('quiz-meter');
    var feedback = document.getElementById('quiz-feedback');
    var number = document.getElementById('quiz-number');
    var progress = document.getElementById('quiz-progress');
    var previous = document.getElementById('quiz-prev');
    var next = document.getElementById('quiz-next');
    var options = Array.prototype.slice.call(document.querySelectorAll('#quiz-options button'));
    var questionIndex = 0;
    var selectedAnswers = [];
    var solved = false;
    var attemptWrong = false;

    function renderBlanks(revealValues) {
        var question = questions[questionIndex];
        if (!question || !blanks) return;
        var content = [];
        for (var i = 0; i < question.blankCount; i += 1) {
            var answer = selectedAnswers[i];
            var classes = 'figure-quiz__blank';
            if (answer) classes += ' has-choice';
            if (answer && revealValues) classes += ' is-filled';
            if (answer && attemptWrong) classes += ' is-wrong';
            var inside = answer
                ? '<i class="notation-glyph" data-figure="' + answer.figure + '" aria-hidden="true"></i>' + (revealValues ? '<strong>' + answer.beats + '</strong>' : '')
                : '?';
            content.push('<button class="' + classes + '" type="button" data-blank-index="' + i + '"' + (solved ? ' disabled' : '') + '>' + inside + '</button>');
        }
        blanks.innerHTML = content.join('<b class="figure-quiz__operator" aria-hidden="true">+</b>');
        blanks.classList.toggle('is-dense', question.blankCount > 2);
        drawNotation(blanks);
    }

    function updateOptions(question) {
        options.forEach(function (option) {
            var units = Number(option.getAttribute('data-units'));
            var available = units <= question.missingTotal && (units !== 8 || question.meter === 4);
            option.classList.toggle('is-available', available);
            option.classList.remove('is-right', 'is-wrong', 'is-selected');
            option.disabled = !available;
        });
    }

    function renderQuestion() {
        var question = questions[questionIndex];
        if (!question || !known || !blanks) return;
        selectedAnswers = [];
        solved = false;
        attemptWrong = false;
        known.innerHTML = question.known.map(function (item) {
            return '<span><i class="notation-glyph" data-figure="' + item.figure + '" aria-hidden="true"></i></span>';
        }).join('<b class="figure-quiz__operator" aria-hidden="true">+</b>');
        if (question.known.length) known.innerHTML += '<b class="figure-quiz__operator" aria-hidden="true">+</b>';
        known.classList.toggle('is-dense', question.known.length > 4);
        meter.innerHTML = '<b>' + question.meter + '</b><b>4</b>';
        drawNotation(known);
        renderBlanks(false);
        if (feedback) feedback.textContent = 'Osserva il tempo e completa la battuta.';
        if (number) number.textContent = String(questionIndex + 1).padStart(2, '0');
        if (progress) progress.style.width = ((questionIndex + 1) / questions.length * 100) + '%';
        if (previous) previous.disabled = questionIndex === 0;
        if (next) next.innerHTML = questionIndex === questions.length - 1 ? 'Ricomincia <span aria-hidden="true">↻</span>' : 'Prossimo <span aria-hidden="true">→</span>';
        updateOptions(question);
    }

    if (blanks) {
        blanks.addEventListener('click', function (event) {
            var target = event.target.closest('.figure-quiz__blank');
            if (!target || solved) return;
            var index = Number(target.getAttribute('data-blank-index'));
            if (!selectedAnswers[index]) return;
            selectedAnswers.splice(index, 1);
            attemptWrong = false;
            renderBlanks(false);
            if (feedback) feedback.textContent = 'Scelta cancellata: completa i riquadri rimasti.';
        });
    }

    options.forEach(function (option) {
        option.addEventListener('click', function () {
            var question = questions[questionIndex];
            if (!question || solved || option.disabled) return;
            if (selectedAnswers.length >= question.blankCount) return;
            var answer = FIGURES[Number(option.getAttribute('data-units'))];
            selectedAnswers.push(answer);
            attemptWrong = false;

            if (selectedAnswers.length < question.blankCount) {
                renderBlanks(false);
                if (feedback) feedback.textContent = 'Continua: restano ' + (question.blankCount - selectedAnswers.length) + ' riquadri.';
                return;
            }

            var selectedTotal = selectedAnswers.reduce(function (sum, item) { return sum + item.units; }, 0);
            if (selectedTotal === question.missingTotal) {
                solved = true;
                renderBlanks(true);
                options.forEach(function (item) {
                    var used = selectedAnswers.some(function (answerItem) { return answerItem.figure === item.getAttribute('data-figure'); });
                    item.classList.toggle('is-right', used);
                    item.disabled = true;
                });
                if (feedback) feedback.textContent = 'Esatto: la battuta è completa.';
            } else {
                attemptWrong = true;
                renderBlanks(false);
                if (feedback) feedback.textContent = 'La somma non completa la battuta: tocca un riquadro per correggere.';
            }
        });
    });

    if (previous) previous.addEventListener('click', function () { if (questionIndex > 0) { questionIndex -= 1; renderQuestion(); } });
    if (next) next.addEventListener('click', function () { questionIndex = questionIndex === questions.length - 1 ? 0 : questionIndex + 1; renderQuestion(); });

    renderQuestion();
}());
