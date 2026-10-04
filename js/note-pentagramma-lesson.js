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
