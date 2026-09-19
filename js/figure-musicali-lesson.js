(function () {
    'use strict';

    var lesson = document.getElementById('figure-lesson');
    var header = document.getElementById('site-header');
    var viewport = document.getElementById('lesson-viewport');
    var screens = Array.prototype.slice.call(document.querySelectorAll('.figure-screen'));
    var dots = Array.prototype.slice.call(document.querySelectorAll('.figure-lesson__dot'));

    var FIGURES = {
        whole: { open: true, stem: false, flags: 0 },
        half: { open: true, stem: true, flags: 0 },
        quarter: { open: false, stem: true, flags: 0 },
        eighth: { open: false, stem: true, flags: 1 },
        sixteenth: { open: false, stem: true, flags: 2 },
        thirtysecond: { open: false, stem: true, flags: 3 },
        sixtyfourth: { open: false, stem: true, flags: 4 }
    };

    var NOTE_GLYPHS = {
        whole: '&#x1D15D;', half: '&#x1D15E;', quarter: '&#x1D15F;',
        eighth: '&#x1D160;', sixteenth: '&#x1D161;', thirtysecond: '&#x1D162;', sixtyfourth: '&#x1D163;'
    };
    var REST_GLYPHS = {
        whole: '&#x1D13B;', half: '&#x1D13C;', quarter: '&#x1D13D;',
        eighth: '&#x1D13E;', sixteenth: '&#x1D13F;', thirtysecond: '&#x1D140;', sixtyfourth: '&#x1D141;'
    };

    function noteSvg(name) {
        return '<span class="bravura-char" aria-hidden="true">' + (NOTE_GLYPHS[name] || NOTE_GLYPHS.quarter) + '</span>';
    }

    function restSvg(name) {
        return '<span class="bravura-char" aria-hidden="true">' + (REST_GLYPHS[name] || REST_GLYPHS.quarter) + '</span>';
    }

    function drawNotation(root) {
        Array.prototype.slice.call((root || document).querySelectorAll('.notation-glyph')).forEach(function (glyph) {
            var figure = glyph.getAttribute('data-figure');
            var rest = glyph.getAttribute('data-rest');
            glyph.innerHTML = rest ? restSvg(rest) : noteSvg(figure);
        });
    }

    drawNotation(document);

    function syncHeight() {
        if (lesson && header) lesson.style.setProperty('--lesson-header-h', header.offsetHeight + 'px');
    }
    syncHeight();
    window.addEventListener('resize', syncHeight);
    window.addEventListener('load', syncHeight);

    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            var index = Number(dot.getAttribute('data-target')) || 0;
            if (screens[index]) screens[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    if ('IntersectionObserver' in window && viewport) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var index = screens.indexOf(entry.target);
                dots.forEach(function (dot, dotIndex) { dot.classList.toggle('is-active', dotIndex === index); });
            });
        }, { root: viewport, threshold: .62 });
        screens.forEach(function (screen) { observer.observe(screen); });
    }

    var cards = Array.prototype.slice.call(document.querySelectorAll('.figure-card'));
    var callout = document.getElementById('figure-callout');
    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            cards.forEach(function (item) { item.classList.remove('is-active'); });
            card.classList.add('is-active');
            if (callout) {
                callout.innerHTML = '<strong>' + card.getAttribute('data-name') + '.</strong> ' + card.getAttribute('data-explain').replace(/^La [^:]+:?\s*/i, '');
            }
        });
    });

    var pairs = Array.prototype.slice.call(document.querySelectorAll('.figure-pair'));
    pairs.forEach(function (pair) {
        pair.addEventListener('click', function () {
            var wasActive = pair.classList.contains('is-active');
            pairs.forEach(function (item) { item.classList.remove('is-active'); });
            if (!wasActive) pair.classList.add('is-active');
        });
    });

    var quizFigures = [
        { figure: 'half', value: .5, units: 32, fraction: '1/2' },
        { figure: 'quarter', value: .25, units: 16, fraction: '1/4' },
        { figure: 'eighth', value: .125, units: 8, fraction: '1/8' },
        { figure: 'sixteenth', value: .0625, units: 4, fraction: '1/16' },
        { figure: 'thirtysecond', value: .03125, units: 2, fraction: '1/32' },
        { figure: 'sixtyfourth', value: .015625, units: 1, fraction: '1/64' }
    ];
    var quizFigureByUnits = {};
    quizFigures.forEach(function (item) { quizFigureByUnits[item.units] = item; });

    function findCombinations(target, startIndex, current, results) {
        if (target === 0) {
            results.push(current.slice());
            return;
        }
        if (current.length >= 8) return;
        for (var i = startIndex; i < quizFigures.length; i += 1) {
            var units = quizFigures[i].units;
            if (units > target) continue;
            current.push(units);
            findCombinations(target - units, i, current, results);
            current.pop();
        }
    }

    function selectAcross(pool, count) {
        if (pool.length <= count) return pool.slice();
        var selected = [];
        for (var i = 0; i < count; i += 1) {
            var index = Math.round(i * (pool.length - 1) / (count - 1));
            selected.push(pool[index]);
        }
        return selected;
    }

    function buildQuestionBank() {
        var groups = quizFigures.map(function (answer) {
            var combinations = [];
            findCombinations(64 - answer.units, 0, [], combinations);
            combinations.sort(function (a, b) {
                if (a.length !== b.length) return a.length - b.length;
                return b.join('-').localeCompare(a.join('-'));
            });
            return selectAcross(combinations, 8).map(function (combination) {
                return {
                    known: combination.map(function (units) { return quizFigureByUnits[units]; }),
                    answer: answer.value,
                    answerFigure: answer.figure
                };
            });
        });
        var bank = [];
        for (var round = 0; round < 8; round += 1) {
            var groupOrder = round % 2 ? [5, 3, 1, 4, 2, 0] : [0, 2, 4, 1, 3, 5];
            groupOrder.forEach(function (groupIndex) { bank.push(groups[groupIndex][round]); });
        }
        return bank;
    }

    var questions = buildQuestionBank();
    var questionIndex = 0;
    var known = document.getElementById('quiz-known');
    var blank = document.getElementById('quiz-blank');
    var feedback = document.getElementById('quiz-feedback');
    var number = document.getElementById('quiz-number');
    var progress = document.getElementById('quiz-progress');
    var previous = document.getElementById('quiz-prev');
    var next = document.getElementById('quiz-next');
    var options = Array.prototype.slice.call(document.querySelectorAll('#quiz-options button'));

    function renderQuestion() {
        var question = questions[questionIndex];
        if (!question || !known || !blank) return;
        known.innerHTML = question.known.map(function (item) {
            return '<span aria-label="valore ' + item.fraction + '"><i class="notation-glyph" data-figure="' + item.figure + '" aria-hidden="true"></i></span>';
        }).join('<b class="figure-quiz__operator" aria-hidden="true">+</b>');
        known.setAttribute('aria-label', 'Valori noti: ' + question.known.map(function (item) { return item.fraction; }).join(' più '));
        known.classList.toggle('is-dense', question.known.length > 6);
        drawNotation(known);
        blank.textContent = '?';
        blank.classList.remove('is-filled');
        feedback.textContent = 'Somma le figure e trova ciò che manca';
        if (number) number.textContent = String(questionIndex + 1).padStart(2, '0');
        if (progress) progress.style.width = ((questionIndex + 1) / questions.length * 100) + '%';
        if (previous) previous.disabled = questionIndex === 0;
        if (next) next.innerHTML = questionIndex === questions.length - 1 ? 'Ricomincia <span aria-hidden="true">↻</span>' : 'Prossimo <span aria-hidden="true">→</span>';
        options.forEach(function (option) {
            option.classList.remove('is-right', 'is-wrong');
            option.disabled = false;
        });
    }

    options.forEach(function (option) {
        option.addEventListener('click', function () {
            var question = questions[questionIndex];
            var value = Number(option.getAttribute('data-value'));
            options.forEach(function (item) { item.classList.remove('is-wrong'); });
            if (value === question.answer) {
                option.classList.add('is-right');
                blank.innerHTML = '<i class="notation-glyph" data-figure="' + option.getAttribute('data-figure') + '" aria-hidden="true"></i>';
                drawNotation(blank);
                blank.classList.add('is-filled');
                feedback.textContent = 'Esatto: la somma ricostruisce l’intero';
                options.forEach(function (item) { item.disabled = true; });
            } else {
                option.classList.add('is-wrong');
                feedback.textContent = 'Quasi: osserva le frazioni e somma di nuovo';
            }
        });
    });

    if (previous) {
        previous.addEventListener('click', function () {
            if (questionIndex === 0) return;
            questionIndex -= 1;
            renderQuestion();
        });
    }

    if (next) {
        next.addEventListener('click', function () {
            questionIndex = (questionIndex + 1) % questions.length;
            renderQuestion();
        });
    }

    renderQuestion();
})();
