(function () {
    'use strict';
    var lesson = document.getElementById('notes-lesson');
    var header = document.getElementById('site-header');
    var viewport = document.getElementById('lesson-viewport');
    var screens = Array.from(lesson.querySelectorAll('.figure-screen'));
    var dots = Array.from(lesson.querySelectorAll('.figure-lesson__dot'));
    var mobile = window.matchMedia('(max-width: 600px)');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var observer;
    function syncHeight() {
        lesson.style.setProperty('--lesson-header-h', header.offsetHeight + 'px');
    }
    // Same staff measurement as figure-musicali-lesson.js, using an unshifted
    // semibreve as the reference; apply pitch offsets only after measurement.
    function alignStaves() {
        lesson.querySelectorAll('.notes-family').forEach(function (row) {
            var glyphs = Array.from(row.querySelectorAll('.notation-glyph'));
            glyphs.forEach(function (glyph) { glyph.style.setProperty('--pitch-step', 0); });
            var glyph = glyphs[0];
            var fontSize = parseFloat(getComputedStyle(glyph.querySelector('.bravura-char')).fontSize);
            var box = glyph.getBoundingClientRect();
            var rowBox = row.getBoundingClientRect();
            row.style.setProperty('--staff-gap', (fontSize / 4) + 'px');
            row.style.setProperty('--staff-top', (box.top - rowBox.top + box.height / 2 + fontSize * .37) + 'px');
            glyphs.forEach(function (item) { item.style.setProperty('--pitch-step', item.dataset.step || 0); });
        });
    }
    document.fonts.ready.then(alignStaves);
    window.addEventListener('resize', alignStaves);
    window.addEventListener('load', alignStaves);
    function activate(index) {
        dots.forEach(function (dot, i) {
            dot.classList.toggle('is-active', i === index);
            if (i === index) dot.setAttribute('aria-current', 'step');
            else dot.removeAttribute('aria-current');
        });
    }
    dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            screens[index].scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth', block: 'start' });
            activate(index);
        });
    });
    function observeScreens() {
        if (!('IntersectionObserver' in window)) return;
        if (observer) observer.disconnect();
        observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) activate(screens.indexOf(entry.target));
            });
        }, { root: mobile.matches ? null : viewport, rootMargin: '-25% 0px -25% 0px', threshold: 0 });
        screens.forEach(function (screen) { observer.observe(screen); });
    }
    syncHeight();
    observeScreens();
    window.addEventListener('resize', syncHeight);
    window.addEventListener('load', syncHeight);
    mobile.addEventListener('change', observeScreens);
    if ('ResizeObserver' in window) new ResizeObserver(syncHeight).observe(header);
}());
