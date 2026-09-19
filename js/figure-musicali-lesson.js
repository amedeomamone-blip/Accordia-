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

    function buildNoteTree() {
        var root = document.getElementById('note-tree');
        if (!root) return;
        var levels = [
            { name: 'Semibreve', fraction: '1', figure: 'whole', count: 1, size: 46 },
            { name: 'Minima', fraction: '1/2', figure: 'half', count: 2, size: 38 },
            { name: 'Semiminima', fraction: '1/4', figure: 'quarter', count: 4, size: 31 },
            { name: 'Croma', fraction: '1/8', figure: 'eighth', count: 8, size: 25 },
            { name: 'Semicroma', fraction: '1/16', figure: 'sixteenth', count: 16, size: 19 },
            { name: 'Biscroma', fraction: '1/32', figure: 'thirtysecond', count: 32, size: 14 },
            { name: 'Semibiscroma', fraction: '1/64', figure: 'sixtyfourth', count: 64, size: 10 }
        ];
        var startX = 260;
        var treeWidth = 920;
        var levelY = [25, 70, 113, 154, 193, 230, 266];
        var branches = [];
        var nodes = [];
        var labels = [];

        levels.forEach(function (level, levelIndex) {
            var y = levelY[levelIndex];
            labels.push('<text class="note-tree__name" x="0" y="' + (y - 3) + '">' + level.name + '</text>');
            labels.push('<text class="note-tree__value" x="118" y="' + (y + 10) + '">' + level.count + ' × ' + level.fraction + '</text>');
            for (var i = 0; i < level.count; i += 1) {
                var x = startX + ((i + .5) * treeWidth / level.count);
                nodes.push('<text class="note-tree__glyph note-tree__glyph--' + levelIndex + '" x="' + x.toFixed(2) + '" y="' + y + '" font-size="' + level.size + '">' + NOTE_GLYPHS[level.figure] + '</text>');
                if (levelIndex > 0) {
                    var parentCount = levels[levelIndex - 1].count;
                    var parentIndex = Math.floor(i / 2);
                    var parentX = startX + ((parentIndex + .5) * treeWidth / parentCount);
                    branches.push('<line x1="' + parentX.toFixed(2) + '" y1="' + (levelY[levelIndex - 1] + 8) + '" x2="' + x.toFixed(2) + '" y2="' + (y - 11) + '"></line>');
                }
            }
        });

        root.innerHTML = '<svg viewBox="0 0 1200 284" aria-hidden="true" preserveAspectRatio="xMidYMid meet"><g class="note-tree__branches">' + branches.join('') + '</g><g class="note-tree__labels">' + labels.join('') + '</g><g class="note-tree__nodes">' + nodes.join('') + '</g></svg>';
    }

    buildNoteTree();

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
        if (current.length >= 10) return;
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
        var combinations = [];
        findCombinations(64, 0, [], combinations);
        combinations = combinations.filter(function (combination) {
            return combination.length >= 4 && combination.length <= 10;
        });
        combinations.sort(function (a, b) {
            if (a.length !== b.length) return a.length - b.length;
            return b.join('-').localeCompare(a.join('-'));
        });

        return selectAcross(combinations, 48).map(function (combination, questionNumber) {
            var blankCount = Math.min(2 + (questionNumber % 3), combination.length - 2);
            var alternating = [];
            var offset = questionNumber % combination.length;
            var i;
            for (i = 0; i < combination.length; i += 2) alternating.push((offset + i) % combination.length);
            for (i = 1; i < combination.length; i += 2) alternating.push((offset + i) % combination.length);

            var missingIndexes = [];
            alternating.forEach(function (index) {
                if (missingIndexes.length >= blankCount || missingIndexes.indexOf(index) !== -1) return;
                missingIndexes.push(index);
            });

            var knownItems = [];
            var missingUnits = [];
            combination.forEach(function (units, index) {
                if (missingIndexes.indexOf(index) !== -1) missingUnits.push(units);
                else knownItems.push(quizFigureByUnits[units]);
            });

            return {
                blankCount: blankCount,
                known: knownItems,
                missingTotalUnits: missingUnits.reduce(function (total, units) { return total + units; }, 0)
            };
        });
    }

    var questions = buildQuestionBank();
    var questionIndex = 0;
    var selectedAnswers = [];
    var solved = false;
    var attemptWrong = false;
    var known = document.getElementById('quiz-known');
    var blanks = document.getElementById('quiz-blanks');
    var feedback = document.getElementById('quiz-feedback');
    var number = document.getElementById('quiz-number');
    var progress = document.getElementById('quiz-progress');
    var previous = document.getElementById('quiz-prev');
    var next = document.getElementById('quiz-next');
    var options = Array.prototype.slice.call(document.querySelectorAll('#quiz-options button'));

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
                ? '<i class="notation-glyph" data-figure="' + answer.figure + '" aria-hidden="true"></i>' + (revealValues ? '<strong>' + answer.fraction + '</strong>' : '')
                : '?';
            var label = answer
                ? (revealValues ? 'Risultato ' + (i + 1) + ': valore ' + answer.fraction : 'Riquadro ' + (i + 1) + ': valore ' + answer.fraction + '. Tocca per cancellare')
                : 'Riquadro ' + (i + 1) + ' vuoto';
            content.push('<button class="' + classes + '" type="button" data-blank-index="' + i + '" aria-label="' + label + '"' + (solved ? ' disabled' : '') + '>' + inside + '</button>');
        }
        blanks.innerHTML = content.join('<b class="figure-quiz__operator" aria-hidden="true">+</b>');
        blanks.classList.toggle('is-dense', question.blankCount > 3);
        drawNotation(blanks);
    }

    function renderQuestion() {
        var question = questions[questionIndex];
        if (!question || !known || !blanks) return;
        selectedAnswers = [];
        solved = false;
        attemptWrong = false;
        known.innerHTML = question.known.map(function (item) {
            return '<span aria-label="valore ' + item.fraction + '"><i class="notation-glyph" data-figure="' + item.figure + '" aria-hidden="true"></i></span>';
        }).join('<b class="figure-quiz__operator" aria-hidden="true">+</b>');
        known.setAttribute('aria-label', 'Valori noti: ' + question.known.map(function (item) { return item.fraction; }).join(' più '));
        known.classList.toggle('is-dense', question.known.length > 5);
        drawNotation(known);
        renderBlanks(false);
        feedback.textContent = 'Completa tutti i riquadri: conta anche quante figure servono';
        if (number) number.textContent = String(questionIndex + 1).padStart(2, '0');
        if (progress) progress.style.width = ((questionIndex + 1) / questions.length * 100) + '%';
        if (previous) previous.disabled = questionIndex === 0;
        if (next) next.innerHTML = questionIndex === questions.length - 1 ? 'Ricomincia <span aria-hidden="true">↻</span>' : 'Prossimo <span aria-hidden="true">→</span>';
        options.forEach(function (option) {
            option.classList.remove('is-right', 'is-wrong', 'is-selected');
            option.disabled = false;
        });
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
            feedback.textContent = 'Scelta cancellata: completa i riquadri rimasti';
        });
    }

    options.forEach(function (option) {
        option.addEventListener('click', function () {
            var question = questions[questionIndex];
            if (!question || solved) return;
            if (selectedAnswers.length >= question.blankCount) {
                feedback.textContent = 'I riquadri sono pieni: toccane uno per cambiare scelta';
                return;
            }

            var units = Math.round(Number(option.getAttribute('data-value')) * 64);
            selectedAnswers.push(quizFigureByUnits[units]);
            attemptWrong = false;

            if (selectedAnswers.length < question.blankCount) {
                renderBlanks(false);
                feedback.textContent = 'Continua: restano ' + (question.blankCount - selectedAnswers.length) + ' riquadri';
                return;
            }

            var selectedTotal = selectedAnswers.reduce(function (total, answer) { return total + answer.units; }, 0);
            if (selectedTotal === question.missingTotalUnits) {
                solved = true;
                renderBlanks(true);
                options.forEach(function (item) {
                    var wasUsed = selectedAnswers.some(function (answer) { return answer.figure === item.getAttribute('data-figure'); });
                    item.classList.toggle('is-right', wasUsed);
                });
                feedback.textContent = 'Esatto: ' + selectedAnswers.map(function (answer) { return answer.fraction; }).join(' + ') + ' completa l’intero';
                options.forEach(function (item) { item.disabled = true; });
            } else {
                attemptWrong = true;
                renderBlanks(false);
                feedback.textContent = 'La somma non completa 1: tocca un riquadro per correggerlo';
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
