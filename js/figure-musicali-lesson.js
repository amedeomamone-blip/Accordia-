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

    function noteSvg(name) {
        var figure = FIGURES[name] || FIGURES.quarter;
        var head = '<ellipse cx="27" cy="72" rx="15" ry="9" transform="rotate(-17 27 72)" ' + (figure.open ? 'fill="white" stroke="currentColor" stroke-width="4"' : 'fill="currentColor"') + '/>';
        var stem = figure.stem ? '<path d="M40 69V13" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>' : '';
        var flags = '';
        for (var i = 0; i < figure.flags; i += 1) {
            var y = 13 + i * 11;
            flags += '<path d="M40 ' + y + ' C57 ' + (y + 5) + ' 60 ' + (y + 18) + ' 47 ' + (y + 27) + '" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>';
        }
        return '<svg viewBox="0 0 72 96" aria-hidden="true" focusable="false">' + head + stem + flags + '</svg>';
    }

    function restSvg(name) {
        if (name === 'whole') return '<svg viewBox="0 0 72 96" aria-hidden="true"><path d="M13 39H59" stroke="currentColor" stroke-width="3"/><rect x="24" y="40" width="24" height="10" rx="1" fill="currentColor"/></svg>';
        if (name === 'half') return '<svg viewBox="0 0 72 96" aria-hidden="true"><path d="M13 57H59" stroke="currentColor" stroke-width="3"/><rect x="24" y="46" width="24" height="10" rx="1" fill="currentColor"/></svg>';
        if (name === 'quarter') return '<svg viewBox="0 0 72 96" aria-hidden="true"><path d="M38 9C28 20 44 28 35 38C29 45 23 50 31 59L40 69C32 65 24 69 27 84C17 72 19 61 29 57C19 46 29 37 33 31C38 24 24 19 38 9Z" fill="currentColor"/></svg>';
        var count = { eighth: 1, sixteenth: 2, thirtysecond: 3, sixtyfourth: 4 }[name] || 1;
        var marks = '';
        for (var i = 0; i < count; i += 1) {
            var y = 19 + i * 14;
            marks += '<circle cx="25" cy="' + y + '" r="5.5" fill="currentColor"/><path d="M29 ' + (y + 2) + ' C45 ' + (y + 4) + ' 47 ' + (y + 13) + ' 37 ' + (y + 21) + '" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>';
        }
        return '<svg viewBox="0 0 72 96" aria-hidden="true"><path d="M39 18L25 84" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>' + marks + '</svg>';
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

    var questions = [
        { known: [{ figure: 'half', value: 2 }], answer: 2 },
        { known: [{ figure: 'quarter', value: 1 }, { figure: 'quarter', value: 1 }, { figure: 'quarter', value: 1 }], answer: 1 },
        { known: [{ figure: 'half', value: 2 }, { figure: 'quarter', value: 1 }, { figure: 'eighth', value: .5 }], answer: .5 }
    ];
    var questionIndex = 0;
    var known = document.getElementById('quiz-known');
    var blank = document.getElementById('quiz-blank');
    var feedback = document.getElementById('quiz-feedback');
    var next = document.getElementById('quiz-next');
    var options = Array.prototype.slice.call(document.querySelectorAll('#quiz-options button'));

    function renderQuestion() {
        var question = questions[questionIndex];
        if (!question || !known || !blank) return;
        known.innerHTML = question.known.map(function (item) {
            return '<span aria-label="' + item.value + ' tempi"><i class="notation-glyph" data-figure="' + item.figure + '" aria-hidden="true"></i></span>';
        }).join('');
        drawNotation(known);
        blank.textContent = '?';
        blank.classList.remove('is-filled');
        feedback.textContent = 'Osserva le durate e scegli';
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
                feedback.textContent = 'Esatto: la battuta ora vale 4 tempi';
                options.forEach(function (item) { item.disabled = true; });
            } else {
                option.classList.add('is-wrong');
                feedback.textContent = 'Non ancora: prova a sommare di nuovo';
            }
        });
    });

    if (next) {
        next.addEventListener('click', function () {
            questionIndex = (questionIndex + 1) % questions.length;
            renderQuestion();
        });
    }

    renderQuestion();
})();
