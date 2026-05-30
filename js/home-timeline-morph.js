(() => {
    const section = document.querySelector('[data-home-timeline-morph]');
    const track = document.querySelector('[data-home-timeline-track]');
    if (!section || !track) return;

    const cards = Array.from(track.querySelectorAll('.home-era-card'));
    if (!cards.length) return;

    const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
    const mix = (from, to, amount) => from + (to - from) * amount;
    const smooth = (value) => 1 - Math.pow(1 - value, 3);

    const starts = {
        wide: [
            [-228, 38, -10, 1],
            [-136, 8, -6, 2],
            [-42, -12, -2, 4],
            [54, -8, 3, 5],
            [148, 15, 7, 3],
            [238, 43, 11, 1]
        ],
        medium: [
            [-144, 40, -8, 1],
            [-84, 12, -5, 2],
            [-28, -8, -2, 4],
            [34, -4, 3, 5],
            [92, 18, 6, 3],
            [148, 44, 9, 1]
        ],
        narrow: [
            [-70, 54, -7, 1],
            [-42, 28, -4, 2],
            [-16, 4, -1, 4],
            [18, -2, 2, 5],
            [46, 26, 5, 3],
            [74, 55, 8, 1]
        ]
    };

    let positions = [];
    let ticking = false;

    function getStarts() {
        if (window.innerWidth <= 760) return starts.narrow;
        if (window.innerWidth <= 1024) return starts.medium;
        return starts.wide;
    }

    function measure() {
        const cardWidth = cards[0].getBoundingClientRect().width || 352;
        const gapValue = getComputedStyle(document.body).getPropertyValue('--home-morph-card-gap');
        const gap = parseFloat(gapValue) || 18;
        const total = cards.length * cardWidth + (cards.length - 1) * gap;
        const first = -(total / 2) + cardWidth / 2;
        const base = getStarts();
        const compact = window.innerWidth <= 760 ? 0.2 : window.innerWidth <= 1024 ? 0.45 : 1;
        const endY = window.innerWidth <= 760 ? 12 : 24;

        positions = cards.map((card, index) => {
            const start = base[index] || base[base.length - 1];
            const finalX = (first + index * (cardWidth + gap)) * compact;
            card.style.setProperty('--morph-z', start[3]);
            return { card, start, finalX, endY };
        });

        update();
    }

    function update() {
        ticking = false;
        const rect = section.getBoundingClientRect();
        const distance = Math.max(1, section.offsetHeight - window.innerHeight);
        const raw = clamp(-rect.top / distance, 0, 1);
        const progress = smooth(raw);
        section.style.setProperty('--morph-progress', progress.toFixed(4));

        positions.forEach((item, index) => {
            const local = smooth(clamp((progress - index * 0.018) / 0.9, 0, 1));
            const x = mix(item.start[0], item.finalX, local);
            const y = mix(item.start[1], item.endY, local);
            const rotate = mix(item.start[2], 0, local);
            const z = progress > 0.72 ? 10 + index : item.start[3];
            item.card.style.setProperty('--morph-x', `${x.toFixed(2)}px`);
            item.card.style.setProperty('--morph-y', `${y.toFixed(2)}px`);
            item.card.style.setProperty('--morph-rotate', `${rotate.toFixed(3)}deg`);
            item.card.style.setProperty('--morph-z', z);
        });
    }

    function scheduleUpdate() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', measure);
    requestAnimationFrame(measure);
})();
