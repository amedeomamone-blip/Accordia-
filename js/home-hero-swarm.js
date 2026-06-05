(function () {
    const heroFrame = document.querySelector('.home-hero__frame');
    const canvas = document.getElementById('homeHeroSwarm');
    if (!heroFrame || !canvas) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactQuery = window.matchMedia('(max-width: 760px)');
    const goldenAngle = 2.399963229728653;
    const tau = Math.PI * 2;

    let heroRect = heroFrame.getBoundingClientRect();
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let particles = [];
    let rafId = 0;
    let resizeRaf = 0;
    let isVisible = true;
    let isRunning = false;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function lerp(start, end, amount) {
        return start + (end - start) * amount;
    }

    function getParticleCount() {
        if (compactQuery.matches) {
            return reducedMotionQuery.matches ? 70 : 140;
        }

        return reducedMotionQuery.matches ? 110 : 220;
    }

    function buildParticles() {
        const count = getParticleCount();
        particles = [];

        for (let index = 0; index < count; index += 1) {
            particles.push({
                index: index,
                progress: (index + 0.5) / count,
                phase: Math.random() * tau,
                sizeJitter: Math.random() * 1.15,
                drift: 0.3 + Math.random() * 0.7,
                screenX: width * 0.5,
                screenY: height * 0.5,
                alpha: 0
            });
        }
    }

    function resizeCanvas() {
        heroRect = heroFrame.getBoundingClientRect();
        width = Math.max(1, Math.round(heroRect.width));
        height = Math.max(1, Math.round(heroRect.height));
        pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

        canvas.width = Math.round(width * pixelRatio);
        canvas.height = Math.round(height * pixelRatio);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';

        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        buildParticles();
    }

    function scheduleResize() {
        if (resizeRaf) window.cancelAnimationFrame(resizeRaf);
        resizeRaf = window.requestAnimationFrame(function () {
            resizeRaf = 0;
            resizeCanvas();
            renderFrame(performance.now(), true);
        });
    }

    function drawParticle(screenX, screenY, radius, hue, lightness, alpha) {
        context.beginPath();
        context.fillStyle = 'hsla(' + hue.toFixed(2) + ', 64%, ' + lightness.toFixed(2) + '%, ' + alpha.toFixed(4) + ')';
        context.arc(screenX, screenY, radius, 0, tau);
        context.fill();

        context.beginPath();
        context.fillStyle = 'hsla(' + hue.toFixed(2) + ', 80%, ' + Math.min(92, lightness + 18).toFixed(2) + '%, ' + (alpha * 0.42).toFixed(4) + ')';
        context.arc(screenX, screenY, radius * 0.42, 0, tau);
        context.fill();
    }

    // Translate the original three/fiber swarm into a lightweight 2D projection for the static hero.
    function renderFrame(now, immediate) {
        const time = reducedMotionQuery.matches ? 12.5 : now * 0.00032;
        const centerX = width * 0.52;
        const centerY = height * 0.46;
        const screenFactor = Math.min(width, height) * (compactQuery.matches ? 0.0024 : 0.0031);
        const verticalStretch = compactQuery.matches ? 0.86 : 1;
        const fold = 1.12;
        const pulse = 0.54;
        const glow = 0.52;

        context.clearRect(0, 0, width, height);

        particles.forEach(function (particle) {
            const progress = particle.progress;
            const angle = particle.index * goldenAngle;
            const band = progress * tau;
            const cycle = band * 3 + time * 0.37;

            const z0 = 1 - 2 * progress;
            const sphereRadius = Math.sqrt(Math.max(0, 1 - z0 * z0));
            const x0 = Math.cos(angle + time * 0.11) * sphereRadius;
            const y0 = Math.sin(angle + time * 0.11) * sphereRadius;

            const x1 = x0 + 0.34 * Math.sin(cycle + x0 * fold * 2) * fold;
            const y1 = y0 + 0.34 * Math.cos(cycle * 1.61803398875 + y0 * fold * 2) * fold;
            const z1 = z0 + 0.24 * Math.sin(angle * 0.013 + time + z0 * fold * 4) * fold;
            const w1 = Math.sin(band * 5 + time * 0.9 + x0 * y0 * 3) * 0.75;

            const rotateA = time * 0.43 + progress * Math.PI;
            const rotateB = time * 0.29 + angle * 0.021;
            const cosA = Math.cos(rotateA);
            const sinA = Math.sin(rotateA);
            const cosB = Math.cos(rotateB);
            const sinB = Math.sin(rotateB);

            const x2 = x1 * cosA - w1 * sinA;
            const w2 = x1 * sinA + w1 * cosA;
            const y2 = y1 * cosB - z1 * sinB;
            const z2 = y1 * sinB + z1 * cosB;

            const wave = 1 + pulse * 0.18 * Math.sin(time * 2 + progress * 18.84955592153876 + Math.sin(angle * 0.017));
            const lens = 1 / (2.25 - w2 * 0.62 + 0.0001);
            const arm = 1 + 0.22 * Math.sin(angle * 0.034 + time * 1.7) * Math.cos(band * 8 - time);

            const spaceX = x2 * 120 * wave * lens * arm;
            const spaceY = y2 * 120 * wave * lens * arm * verticalStretch;
            const spaceZ = z2 * 120 * wave * lens + Math.sin(band * 12 + time) * fold * 2;

            const targetX = centerX + spaceX * screenFactor;
            const targetY = centerY + spaceY * screenFactor * 0.92;
            const targetAlpha = clamp(0.04 + lens * 0.11 + (spaceZ + 120) / 1400, 0.035, 0.22);

            if (immediate || reducedMotionQuery.matches) {
                particle.screenX = targetX;
                particle.screenY = targetY;
                particle.alpha = targetAlpha;
            } else {
                particle.screenX = lerp(particle.screenX, targetX, 0.14 * particle.drift);
                particle.screenY = lerp(particle.screenY, targetY, 0.14 * particle.drift);
                particle.alpha = lerp(particle.alpha, targetAlpha, 0.12);
            }

            const hue = 6 + (((progress + 0.16 * Math.sin(time * 0.25 + w2 * 2) + 0.07 * Math.sin(angle * 0.01)) % 1 + 1) % 1) * 34;
            const lightness = 32 + glow * 20 + 10 * Math.sin(w2 * 4 + time + particle.phase);
            const radius = clamp(0.7 + lens * 1.5 + particle.sizeJitter * 0.55, 0.65, compactQuery.matches ? 2.6 : 3.1);

            drawParticle(particle.screenX, particle.screenY, radius, hue, lightness, particle.alpha);
        });
    }

    function stopLoop() {
        isRunning = false;
        if (rafId) {
            window.cancelAnimationFrame(rafId);
            rafId = 0;
        }
    }

    function tick(now) {
        if (!isRunning) return;
        renderFrame(now, false);
        rafId = window.requestAnimationFrame(tick);
    }

    function startLoop() {
        if (!isVisible) return;

        if (reducedMotionQuery.matches) {
            stopLoop();
            renderFrame(performance.now(), true);
            return;
        }

        if (isRunning) return;
        isRunning = true;
        rafId = window.requestAnimationFrame(tick);
    }

    function syncVisibility(nextVisible) {
        isVisible = nextVisible;
        if (isVisible) {
            startLoop();
        } else {
            stopLoop();
        }
    }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.target !== heroFrame) return;
                syncVisibility(entry.isIntersecting && entry.intersectionRatio > 0.12);
            });
        }, { threshold: [0, 0.12, 0.3] });

        observer.observe(heroFrame);
    }

    document.addEventListener('visibilitychange', function () {
        syncVisibility(document.visibilityState === 'visible');
    });

    window.addEventListener('resize', scheduleResize);

    function handleMediaChange() {
        stopLoop();
        resizeCanvas();
        startLoop();
    }

    if (typeof reducedMotionQuery.addEventListener === 'function') {
        reducedMotionQuery.addEventListener('change', handleMediaChange);
    } else if (typeof reducedMotionQuery.addListener === 'function') {
        reducedMotionQuery.addListener(handleMediaChange);
    }

    if (typeof compactQuery.addEventListener === 'function') {
        compactQuery.addEventListener('change', handleMediaChange);
    } else if (typeof compactQuery.addListener === 'function') {
        compactQuery.addListener(handleMediaChange);
    }

    resizeCanvas();
    renderFrame(performance.now(), true);
    startLoop();
})();
