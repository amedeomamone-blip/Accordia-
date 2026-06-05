(function () {
    const card = document.getElementById('baroccoCard');
    const grid = document.querySelector('[data-lesson-grid="barocco"]');
    if (!card || !grid) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactQuery = window.matchMedia('(max-width: 760px)');

    // Dataset separated from rendering so the same preview pattern can be reused on other nuclei.
    const tiles = [
        { id: 'intro', label: 'Introduzione al Barocco', type: 'single', group: 'intro', variant: 'feature', priority: 1 },
        { id: 'instruments', label: 'Gli strumenti del Barocco', type: 'single', group: 'instruments', variant: 'wide', priority: 2 },
        { id: 'monteverdi-name', label: 'Claudio Monteverdi', type: 'paired-primary', group: 'monteverdi', variant: 'wide', priority: 3 },
        { id: 'monteverdi-topic', label: 'Il Melodramma', type: 'paired-secondary', group: 'monteverdi', variant: 'compact', priority: 4 },
        { id: 'bach-name', label: 'Johann Sebastian Bach', type: 'paired-primary', group: 'bach', variant: 'wide', priority: 5 },
        { id: 'bach-topic', label: 'La Fuga', type: 'paired-secondary', group: 'bach', variant: 'compact', priority: 6 },
        { id: 'vivaldi-name', label: 'Antonio Vivaldi', type: 'paired-primary', group: 'vivaldi', variant: 'wide', priority: 7 },
        { id: 'vivaldi-topic', label: 'Il Concerto', type: 'paired-secondary', group: 'vivaldi', variant: 'compact', priority: 8 },
        { id: 'haendel-name', label: 'Georg Friedrich Haendel', type: 'paired-primary', group: 'haendel', variant: 'wide', priority: 9 },
        { id: 'haendel-topic', label: 'L’Oratorio', type: 'paired-secondary', group: 'haendel', variant: 'compact', priority: 10 }
    ];

    // Layout slots are normalized so each preview can adapt to the actual card size.
    const layouts = {
        regular: [
            {
                intro: { x: 0.0, y: 0.0, z: 4 },
                instruments: { x: 0.52, y: 0.0, z: 3 },
                'monteverdi-name': { x: 0.0, y: 0.35, z: 2 },
                'monteverdi-topic': { x: 0.4, y: 0.38, z: 3 },
                'bach-name': { x: 0.56, y: 0.31, z: 2 },
                'bach-topic': { x: 0.89, y: 0.34, z: 3 },
                'vivaldi-name': { x: 0.04, y: 0.72, z: 2 },
                'vivaldi-topic': { x: 0.43, y: 0.74, z: 3 },
                'haendel-name': { x: 0.57, y: 0.69, z: 2 },
                'haendel-topic': { x: 0.9, y: 0.72, z: 3 }
            },
            {
                intro: { x: -0.22, y: 0.04, opacity: 0, scale: 0.94, z: 1 },
                instruments: { x: 0.02, y: 0.08, z: 3 },
                'monteverdi-name': { x: 0.4, y: 0.0, z: 4 },
                'monteverdi-topic': { x: 0.82, y: 0.02, z: 3 },
                'bach-name': { x: 0.06, y: 0.41, z: 2 },
                'bach-topic': { x: 0.44, y: 0.44, z: 3 },
                'vivaldi-name': { x: 0.58, y: 0.36, z: 2 },
                'vivaldi-topic': { x: 0.9, y: 0.4, z: 3 },
                'haendel-name': { x: 0.18, y: 0.74, z: 2 },
                'haendel-topic': { x: 0.62, y: 0.73, z: 3 }
            },
            {
                intro: { x: 0.54, y: 0.69, z: 2 },
                instruments: { x: 1.08, y: -0.06, opacity: 0, scale: 0.94, z: 1 },
                'monteverdi-name': { x: 0.02, y: 0.04, z: 3 },
                'monteverdi-topic': { x: 0.4, y: 0.08, z: 3 },
                'bach-name': { x: 0.58, y: 0.0, z: 4 },
                'bach-topic': { x: 0.88, y: 0.02, z: 3 },
                'vivaldi-name': { x: 0.0, y: 0.38, z: 2 },
                'vivaldi-topic': { x: 0.4, y: 0.44, z: 3 },
                'haendel-name': { x: 0.54, y: 0.39, z: 2 },
                'haendel-topic': { x: 0.88, y: 0.44, z: 3 }
            },
            {
                intro: { x: 0.0, y: 0.04, z: 4 },
                instruments: { x: 0.18, y: 0.7, z: 2 },
                'monteverdi-name': { x: 0.52, y: 0.04, z: 3 },
                'monteverdi-topic': { x: 0.88, y: 0.08, z: 3 },
                'bach-name': { x: 0.0, y: 0.38, z: 2 },
                'bach-topic': { x: 0.4, y: 0.41, z: 3 },
                'vivaldi-name': { x: 0.56, y: 0.36, z: 2 },
                'vivaldi-topic': { x: 0.9, y: 0.39, z: 3 },
                'haendel-name': { x: 1.1, y: 0.73, opacity: 0, scale: 0.94, z: 1 },
                'haendel-topic': { x: 0.54, y: 0.71, z: 3 }
            }
        ],
        compact: [
            {
                intro: { x: 0.0, y: 0.0, z: 4 },
                instruments: { x: 0.48, y: 0.02, z: 3 },
                'monteverdi-name': { x: 0.0, y: 0.36, z: 3 },
                'monteverdi-topic': { x: 0.42, y: 0.39, z: 3 },
                'bach-name': { x: 0.62, y: 0.36, z: 2 },
                'bach-topic': { x: 0.88, y: 0.39, z: 3 },
                'vivaldi-name': { x: 0.0, y: 0.73, z: 2 },
                'vivaldi-topic': { x: 0.42, y: 0.75, z: 3 },
                'haendel-name': { x: 1.08, y: 0.68, opacity: 0, scale: 0.94, z: 1 },
                'haendel-topic': { x: 1.16, y: 0.08, opacity: 0, scale: 0.94, z: 1 }
            },
            {
                intro: { x: -0.2, y: 0.06, opacity: 0, scale: 0.94, z: 1 },
                instruments: { x: 0.0, y: 0.02, z: 4 },
                'monteverdi-name': { x: 0.48, y: 0.0, z: 3 },
                'monteverdi-topic': { x: 0.88, y: 0.04, z: 3 },
                'bach-name': { x: 0.0, y: 0.39, z: 2 },
                'bach-topic': { x: 0.42, y: 0.42, z: 3 },
                'vivaldi-name': { x: 0.56, y: 0.39, z: 2 },
                'vivaldi-topic': { x: 0.88, y: 0.43, z: 3 },
                'haendel-name': { x: 0.18, y: 0.74, z: 2 },
                'haendel-topic': { x: 0.62, y: 0.76, z: 3 }
            },
            {
                intro: { x: 0.52, y: 0.73, z: 2 },
                instruments: { x: 1.08, y: -0.04, opacity: 0, scale: 0.94, z: 1 },
                'monteverdi-name': { x: 0.0, y: 0.04, z: 3 },
                'monteverdi-topic': { x: 0.42, y: 0.08, z: 3 },
                'bach-name': { x: 0.58, y: 0.02, z: 4 },
                'bach-topic': { x: 0.88, y: 0.05, z: 3 },
                'vivaldi-name': { x: 0.0, y: 0.4, z: 2 },
                'vivaldi-topic': { x: 0.42, y: 0.43, z: 3 },
                'haendel-name': { x: 0.58, y: 0.41, z: 2 },
                'haendel-topic': { x: 0.88, y: 0.45, z: 3 }
            },
            {
                intro: { x: 0.0, y: 0.04, z: 4 },
                instruments: { x: 0.16, y: 0.73, z: 2 },
                'monteverdi-name': { x: 0.58, y: 0.03, z: 3 },
                'monteverdi-topic': { x: 0.88, y: 0.08, z: 3 },
                'bach-name': { x: 0.0, y: 0.4, z: 2 },
                'bach-topic': { x: 0.42, y: 0.43, z: 3 },
                'vivaldi-name': { x: 0.58, y: 0.39, z: 2 },
                'vivaldi-topic': { x: 0.88, y: 0.43, z: 3 },
                'haendel-name': { x: 1.08, y: 0.74, opacity: 0, scale: 0.94, z: 1 },
                'haendel-topic': { x: 0.56, y: 0.75, z: 3 }
            }
        ]
    };

    const bricks = new Map();
    let currentLayoutIndex = 0;
    let cycleTimer = 0;
    let resizeFrame = 0;
    let isVisible = false;
    let isPaused = false;

    tiles
        .slice()
        .sort(function (a, b) { return a.priority - b.priority; })
        .forEach(function (tile) {
            const brick = document.createElement('div');
            brick.className = 'home-era-card__lesson-brick home-era-card__lesson-brick--' + tile.variant;
            brick.dataset.lessonId = tile.id;
            brick.dataset.group = tile.group;
            brick.dataset.type = tile.type;
            brick.style.setProperty('--lesson-opacity', '0');
            brick.innerHTML = '<span class="home-era-card__lesson-brick-label">' + tile.label + '</span>';
            grid.appendChild(brick);
            bricks.set(tile.id, brick);
        });

    function getActiveLayouts() {
        return compactQuery.matches ? layouts.compact : layouts.regular;
    }

    function clearCycleTimer() {
        if (!cycleTimer) return;
        window.clearTimeout(cycleTimer);
        cycleTimer = 0;
    }

    function setPaused(nextPaused) {
        isPaused = nextPaused;
        card.classList.toggle('is-preview-paused', nextPaused);
        if (nextPaused) {
            clearCycleTimer();
        } else {
            scheduleNext();
        }
    }

    function applyLayout(layoutIndex, options) {
        const settings = options || {};
        const activeLayouts = getActiveLayouts();
        const safeIndex = ((layoutIndex % activeLayouts.length) + activeLayouts.length) % activeLayouts.length;
        const layout = activeLayouts[safeIndex];
        const gridRect = grid.getBoundingClientRect();

        bricks.forEach(function (brick, brickId) {
            const slot = layout[brickId] || { x: 1.12, y: 0.12, opacity: 0, scale: 0.94, z: 1 };
            const brickRect = brick.getBoundingClientRect();
            const availableX = Math.max(0, gridRect.width - brickRect.width);
            const availableY = Math.max(0, gridRect.height - brickRect.height);
            const nextX = availableX * slot.x;
            const nextY = availableY * slot.y;

            if (settings.immediate) brick.classList.add('is-static');

            brick.style.setProperty('--lesson-x', nextX.toFixed(2) + 'px');
            brick.style.setProperty('--lesson-y', nextY.toFixed(2) + 'px');
            brick.style.setProperty('--lesson-scale', String(slot.scale || 1));
            brick.style.setProperty('--lesson-opacity', String(slot.opacity === undefined ? 1 : slot.opacity));
            brick.style.zIndex = String(slot.z || 1);
        });

        if (settings.immediate) {
            window.requestAnimationFrame(function () {
                bricks.forEach(function (brick) {
                    brick.classList.remove('is-static');
                });
            });
        }
    }

    function scheduleNext() {
        clearCycleTimer();
        if (!isVisible || isPaused || reducedMotionQuery.matches) return;

        cycleTimer = window.setTimeout(function () {
            currentLayoutIndex = (currentLayoutIndex + 1) % getActiveLayouts().length;
            applyLayout(currentLayoutIndex);
            scheduleNext();
        }, 2450);
    }

    function syncLayout(immediate) {
        currentLayoutIndex = currentLayoutIndex % getActiveLayouts().length;
        applyLayout(currentLayoutIndex, { immediate: immediate });
        scheduleNext();
    }

    function requestLayoutSync(immediate) {
        if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(function () {
            resizeFrame = 0;
            syncLayout(immediate);
        });
    }

    // Keep the loop lightweight: the preview animates only while the card is actually visible.
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.target !== card) return;
                isVisible = entry.isIntersecting && entry.intersectionRatio > 0.3;
                if (isVisible) {
                    requestLayoutSync(true);
                } else {
                    clearCycleTimer();
                }
            });
        }, { threshold: [0, 0.3, 0.55] });

        observer.observe(card);
    } else {
        isVisible = true;
        requestLayoutSync(true);
    }

    card.addEventListener('mouseenter', function () {
        setPaused(true);
    });

    card.addEventListener('mouseleave', function () {
        setPaused(false);
    });

    card.addEventListener('focusin', function () {
        setPaused(true);
    });

    card.addEventListener('focusout', function (event) {
        if (event.relatedTarget && card.contains(event.relatedTarget)) return;
        setPaused(false);
    });

    window.addEventListener('resize', function () {
        requestLayoutSync(true);
    });

    if (typeof ResizeObserver === 'function') {
        const resizeObserver = new ResizeObserver(function () {
            requestLayoutSync(true);
        });
        resizeObserver.observe(grid);
    }

    function handleMotionChange() {
        currentLayoutIndex = 0;
        requestLayoutSync(true);
    }

    if (typeof reducedMotionQuery.addEventListener === 'function') {
        reducedMotionQuery.addEventListener('change', handleMotionChange);
    } else if (typeof reducedMotionQuery.addListener === 'function') {
        reducedMotionQuery.addListener(handleMotionChange);
    }

    if (typeof compactQuery.addEventListener === 'function') {
        compactQuery.addEventListener('change', handleMotionChange);
    } else if (typeof compactQuery.addListener === 'function') {
        compactQuery.addListener(handleMotionChange);
    }

    // Apply the first composition immediately so the preview never flashes as a stack.
    requestLayoutSync(true);
})();
