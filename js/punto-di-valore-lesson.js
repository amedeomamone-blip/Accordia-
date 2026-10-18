(function () {
    'use strict';
    var lesson = document.getElementById('punto-lesson');
    if (!lesson) return;
    var viewport = document.getElementById('lesson-viewport');
    var header = document.getElementById('site-header');
    var screens = Array.from(lesson.querySelectorAll('.figure-screen'));
    var dots = Array.from(lesson.querySelectorAll('.figure-lesson__dot'));
    var currentSlide = 0;
    function syncGeometry() { if (header) lesson.style.setProperty('--lesson-header-h', header.offsetHeight + 'px'); }
    syncGeometry();
    window.addEventListener('resize', syncGeometry);
    window.addEventListener('load', syncGeometry);
    if (document.fonts) document.fonts.ready.then(syncGeometry);
    function selectSlide(index) {
        currentSlide = index;
        dots.forEach(function (dot, i) {
            dot.classList.toggle('is-active', i === index);
            if (i === index) dot.setAttribute('aria-current', 'step');
            else dot.removeAttribute('aria-current');
        });
    }
    function goToSlide(index) {
        index = Math.max(0, Math.min(screens.length - 1, index));
        screens[index].scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        selectSlide(index);
    }
    dots.forEach(function (dot, index) { dot.addEventListener('click', function () { goToSlide(index); }); });
    var observer;
    function observeSlides() {
        if (!('IntersectionObserver' in window)) return;
        if (observer) observer.disconnect();
        observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) { if (entry.isIntersecting) selectSlide(screens.indexOf(entry.target)); });
        }, { root: window.matchMedia('(max-width: 600px)').matches ? null : viewport, threshold: .35 });
        screens.forEach(function (screen) { observer.observe(screen); });
    }
    observeSlides();
    window.matchMedia('(max-width: 600px)').addEventListener('change', observeSlides);
    viewport.addEventListener('keydown', function (event) {
        if (event.target !== viewport) return;
        if (event.key === 'ArrowDown' || event.key === 'PageDown') { event.preventDefault(); goToSlide(currentSlide + 1); }
        if (event.key === 'ArrowUp' || event.key === 'PageUp') { event.preventDefault(); goToSlide(currentSlide - 1); }
    });

    // Durate in movimenti, con semiminima = 1. Le frazioni usate sono binarie esatte.
    var figures = {
        whole: { glyph: '𝅝', label: 'Semibreve', value: 4 },
        half: { glyph: '𝅗𝅥', label: 'Minima', value: 2 },
        quarter: { glyph: '𝅘𝅥', label: 'Semiminima', value: 1 },
        eighth: { glyph: '𝅘𝅥𝅮', label: 'Croma', value: .5 },
        quarterRest: { glyph: '𝄽', label: 'Pausa di semiminima', value: 1 }
    };
    function note(kind, dotted) {
        return '<svg class="pv-note" viewBox="0 0 1000 1200" aria-hidden="true"><text x="150" y="' + (kind === 'quarterRest' ? '650' : '950') + '">' + figures[kind].glyph + '</text>' + (dotted ? '<circle cx="' + (kind === 'whole' ? '805' : '650') + '" cy="' + (kind === 'quarterRest' ? '650' : '950') + '" r="58" class="pv-note__dot"/>' : '') + '</svg>';
    }
    function format(value) { return ({ '.25': '¼', '.5': '½', '.75': '¾', '1.5': '1½' })[String(value).replace(/^0/, '')] || String(value); }
    function movements(value) { return format(value) + (value < 1 ? ' di movimento' : value === 1 ? ' movimento' : ' movimenti'); }
    var questions = [
        { type: 'value', figure: 'half', options: [2, 3, 4, 1] },
        { type: 'value', figure: 'quarter', options: [2, .5, 1, 1.5] },
        { type: 'value', figure: 'whole', options: [6, 4, 8, 2] },
        { type: 'value', figure: 'eighth', options: [.5, 1, .75, 1.5] },
        { type: 'addition', figure: 'half', options: [2, 1, .5, 3] },
        { type: 'addition', figure: 'quarter', options: [1, 1.5, 2, .5] },
        { type: 'measure', figure: 'quarter', meter: 2, options: [.5, 1, 1.5, 2] },
        { type: 'measure', figure: 'quarter', meter: 3, options: [1, 2, 1.5, .5] },
        { type: 'measure', figure: 'half', meter: 4, options: [2, 1, 3, .5] },
        { type: 'equivalent', figure: 'half', second: 'quarter', options: ['whole', 'half', 'quarter', 'eighth'] },
        { type: 'equivalent', figure: 'quarter', second: 'eighth', options: ['quarter', 'whole', 'eighth', 'half'] },
        { type: 'value', figure: 'quarterRest', options: [1, .5, 2, 1.5] }
    ];
    questions.forEach(function (q) {
        var base = figures[q.figure].value;
        q.correct = q.type === 'addition' ? base / 2 : q.type === 'measure' ? q.meter - base * 1.5 : q.type === 'equivalent' ? q.figure : base * 1.5;
        if (q.options.filter(function (value) { return value === q.correct; }).length !== 1) throw new Error('Risposta non univoca.');
        if (q.type === 'equivalent' && figures[q.second].value !== base / 2) throw new Error('Equivalenza non valida.');
    });
    var index = 0;
    var solved = new Set();
    var prompt = document.getElementById('pv-prompt');
    var visual = document.getElementById('pv-visual');
    var options = document.getElementById('pv-options');
    var feedback = document.getElementById('pv-feedback');
    var previous = document.getElementById('pv-prev');
    var next = document.getElementById('pv-next');
    function explanation(q) {
        var base = figures[q.figure].value;
        var result = format(base) + ' + ' + format(base / 2) + ' = ' + format(base * 1.5) + '.';
        if (q.type === 'measure') return 'Esatto: ' + format(base * 1.5) + ' + ' + format(q.correct) + ' = ' + q.meter + ' movimenti.';
        if (q.type === 'addition') return 'Esatto: la metà di ' + format(base) + ' è ' + format(base / 2) + '.';
        return 'Esatto: ' + result;
    }
    function updateScore() {
        document.getElementById('pv-score').textContent = solved.size + ' / ' + questions.length + ' risolti';
        document.getElementById('pv-progress').style.width = ((index + 1) / questions.length * 100) + '%';
    }
    function renderQuestion() {
        var q = questions[index];
        var label = figures[q.figure].label;
        prompt.textContent = q.type === 'addition' ? 'Quanto aggiunge il punto alla ' + label.toLowerCase() + '?' : q.type === 'measure' ? 'Quanti movimenti mancano per completare la battuta?' : q.type === 'equivalent' ? 'Quale figura puntata ha la stessa durata totale?' : 'Quanto dura la ' + label.toLowerCase() + ' puntata?';
        visual.innerHTML = note(q.figure, q.type !== 'equivalent');
        var visualLabel = label + ' puntata';
        if (q.type === 'measure') {
            visual.innerHTML = '<span class="pv-meter" aria-hidden="true"><b>' + q.meter + '</b><b>4</b></span>' + visual.innerHTML + '<b class="pv-operator" aria-hidden="true">+</b><span class="pv-blank" aria-hidden="true">?</span><span class="pv-barline" aria-hidden="true"></span>';
            visualLabel = 'Battuta di ' + q.meter + ' quarti: ' + visualLabel + ' più un valore da trovare';
        }
        if (q.type === 'equivalent') {
            visual.innerHTML += '<b class="pv-operator" aria-hidden="true">+</b>' + note(q.second, false);
            visualLabel = label + ' più ' + figures[q.second].label.toLowerCase();
        }
        visual.setAttribute('role', 'img');
        visual.setAttribute('aria-label', visualLabel);
        options.replaceChildren();
        q.options.forEach(function (value) {
            var button = document.createElement('button');
            button.type = 'button';
            if (q.type === 'equivalent') {
                button.innerHTML = note(value, true) + '<small>' + figures[value].label + ' puntata</small>';
                button.setAttribute('aria-label', figures[value].label + ' puntata');
            } else button.textContent = movements(value);
            if (solved.has(index)) { button.disabled = true; button.classList.toggle('is-right', value === q.correct); }
            button.addEventListener('click', function () {
                if (solved.has(index)) return;
                Array.from(options.children).forEach(function (item) { item.classList.remove('is-wrong'); });
                if (value === q.correct) {
                    solved.add(index); button.classList.add('is-right');
                    Array.from(options.children).forEach(function (item) { item.disabled = true; });
                    feedback.textContent = explanation(q) + (solved.size === questions.length ? ' Hai completato tutti i 12 esercizi.' : '');
                    updateScore();
                } else {
                    button.classList.add('is-wrong');
                    feedback.textContent = q.type === 'measure' ? 'Riprova: calcola il valore puntato, poi sottrailo al totale della battuta.' : q.type === 'addition' ? 'Riprova: il punto aggiunge soltanto la metà del valore iniziale.' : 'Riprova: somma il valore iniziale e la sua metà.';
                }
            });
            options.appendChild(button);
        });
        document.getElementById('pv-number').textContent = String(index + 1).padStart(2, '0');
        feedback.textContent = solved.has(index) ? explanation(q) : 'Scegli una risposta. Semiminima = 1 movimento.';
        previous.disabled = index === 0;
        next.textContent = index === questions.length - 1 ? 'Ricomincia ↻' : 'Prossimo →';
        updateScore();
    }
    previous.addEventListener('click', function () { if (index > 0) { index -= 1; renderQuestion(); } });
    next.addEventListener('click', function () {
        if (index === questions.length - 1) { index = 0; solved.clear(); }
        else index += 1;
        renderQuestion();
    });
    renderQuestion();
}());
