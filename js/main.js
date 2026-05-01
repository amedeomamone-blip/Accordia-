document.addEventListener('DOMContentLoaded', () => {
    const LAST_NUCLEUS_KEY = 'accordia:last-nucleus';
    const TRACK_KEY_PREFIX = 'accordia:track:';

    const currentSection = document.body.dataset.nav;
    if (currentSection) {
        document.querySelectorAll('[data-nav-link]').forEach((link) => {
            if (link.dataset.navLink === currentSection) {
                link.classList.add('is-active');
            }
        });
    }

    const currentNucleus = document.body.dataset.currentNucleus;
    if (currentNucleus) {
        sessionStorage.setItem(LAST_NUCLEUS_KEY, currentNucleus);
    }

    const dropdowns = [...document.querySelectorAll('.site-nav__dropdown')];
    const setDropdownState = (dropdown, isOpen) => {
        dropdown.classList.toggle('is-open', isOpen);
        const trigger = dropdown.querySelector('.site-nav__trigger');
        if (trigger) {
            trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }
    };

    const closeAllDropdowns = (except = null) => {
        dropdowns.forEach((dropdown) => {
            if (dropdown !== except) {
                setDropdownState(dropdown, false);
            }
        });
    };

    dropdowns.forEach((dropdown) => {
        const trigger = dropdown.querySelector('.site-nav__trigger');
        if (!trigger) return;

        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const shouldOpen = !dropdown.classList.contains('is-open');
            closeAllDropdowns(dropdown);
            setDropdownState(dropdown, shouldOpen);
        });

        dropdown.addEventListener('mouseenter', () => setDropdownState(dropdown, true));
        dropdown.addEventListener('mouseleave', () => setDropdownState(dropdown, false));
        dropdown.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setDropdownState(dropdown, false);
                trigger.blur();
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.site-nav__dropdown')) {
            closeAllDropdowns();
        }
    });

    document.querySelectorAll('[data-nucleus-link]').forEach((link) => {
        link.addEventListener('click', () => {
            const slug = link.dataset.nucleusLink;
            if (slug) {
                sessionStorage.setItem(LAST_NUCLEUS_KEY, slug);
            }
        });
    });

    document.querySelectorAll('[data-scroll-track]').forEach((track) => {
        const scrollKey = track.dataset.scrollKey;
        const storageKey = scrollKey ? `${TRACK_KEY_PREFIX}${scrollKey}` : '';

        const restoreTrackPosition = () => {
            const lastSlug = sessionStorage.getItem(LAST_NUCLEUS_KEY);
            let restored = false;

            if (storageKey) {
                const storedPosition = sessionStorage.getItem(storageKey);
                if (storedPosition) {
                    try {
                        const parsed = JSON.parse(storedPosition);
                        track.scrollLeft = Number(parsed.left) || 0;
                        restored = true;
                    } catch (error) {
                        // Ignore malformed session data and keep the default position.
                    }
                    sessionStorage.removeItem(storageKey);
                }
            }

            if (!restored && lastSlug) {
                const target = [...track.querySelectorAll('[data-nucleus-link]')].find(
                    (entry) => entry.dataset.nucleusLink === lastSlug
                );
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            }
        };

        requestAnimationFrame(() => requestAnimationFrame(restoreTrackPosition));

        track.querySelectorAll('[data-timeline-link]').forEach((link) => {
            link.addEventListener('click', () => {
                const slug = link.dataset.nucleusLink || '';
                if (storageKey) {
                    sessionStorage.setItem(storageKey, JSON.stringify({ left: track.scrollLeft, slug }));
                }
            });
        });
    });

    const scrollTrackToCenter = (track, item, behavior = 'smooth') => {
        if (!track || !item) return;
        const targetLeft = item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2;
        const maxLeft = Math.max(0, track.scrollWidth - track.clientWidth);
        const nextLeft = Math.max(0, Math.min(targetLeft, maxLeft));

        if (typeof track.scrollTo === 'function') {
            track.scrollTo({ left: nextLeft, behavior });
            return;
        }

        track.scrollLeft = nextLeft;
    };

    document.querySelectorAll('[data-topic-rail-track]').forEach((track) => {
        const activeLink = track.querySelector('.is-active');
        if (!activeLink) return;

        const centerActiveLink = (behavior = 'auto') => scrollTrackToCenter(track, activeLink, behavior);
        requestAnimationFrame(() => requestAnimationFrame(() => centerActiveLink('auto')));

        let resizeFrame = 0;
        window.addEventListener('resize', () => {
            if (resizeFrame) cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(() => centerActiveLink('auto'));
        });
    });

    document.querySelectorAll('[data-lesson-flow]').forEach((track) => {
        const cards = [...track.querySelectorAll('[data-phase-card]')];
        if (!cards.length) return;

        let activeCard = cards.find((card) => card.classList.contains('active')) || cards[0];
        let scrollFrame = 0;
        let resizeFrame = 0;

        const setActiveCard = (card, options = {}) => {
            if (!card) return;
            const { center = false, behavior = 'smooth' } = options;
            activeCard = card;

            cards.forEach((item) => {
                const isActive = item === card;
                item.classList.toggle('active', isActive);
                item.setAttribute('aria-current', isActive ? 'step' : 'false');
            });

            if (center) {
                scrollTrackToCenter(track, card, behavior);
            }
        };

        const findNearestCard = () => {
            const trackCenter = track.scrollLeft + track.clientWidth / 2;
            let closestCard = cards[0];
            let closestDistance = Infinity;

            cards.forEach((card) => {
                const cardCenter = card.offsetLeft + card.offsetWidth / 2;
                const distance = Math.abs(cardCenter - trackCenter);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestCard = card;
                }
            });

            return closestCard;
        };

        const syncActiveFromScroll = () => {
            scrollFrame = 0;
            setActiveCard(findNearestCard(), { center: false });
        };

        track.addEventListener(
            'scroll',
            () => {
                if (scrollFrame) cancelAnimationFrame(scrollFrame);
                scrollFrame = requestAnimationFrame(syncActiveFromScroll);
            },
            { passive: true }
        );

        cards.forEach((card) => {
            card.addEventListener('click', () => setActiveCard(card, { center: true, behavior: 'smooth' }));
            card.addEventListener('focus', () => setActiveCard(card, { center: true, behavior: 'smooth' }));
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveCard(card, { center: true, behavior: 'smooth' });
                }
            });
        });

        requestAnimationFrame(() => requestAnimationFrame(() => setActiveCard(activeCard, { center: true, behavior: 'auto' })));

        window.addEventListener('resize', () => {
            if (resizeFrame) cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(() => setActiveCard(activeCard || findNearestCard(), { center: true, behavior: 'auto' }));
        });
    });

    const desktopMiniTimelineMedia = window.matchMedia('(min-width: 901px)');
    const miniTimelines = [...document.querySelectorAll('.nucleus-mini-timeline')];

    const syncMiniTimelines = () => {
        const shouldCondense = desktopMiniTimelineMedia.matches;
        miniTimelines.forEach((timeline) => {
            timeline.classList.toggle('is-condensed', shouldCondense);
        });
    };

    if (miniTimelines.length) {
        bindMediaChange(desktopMiniTimelineMedia, syncMiniTimelines);
        syncMiniTimelines();
    }

    const topicMapInteractiveMedia = window.matchMedia('(min-width: 901px)');
    const topicMapAnimatedMedia = window.matchMedia('(min-width: 901px)');
    const topicMapAnyHoverMedia = window.matchMedia('(any-hover: hover)');
    const topicMapAnyFinePointerMedia = window.matchMedia('(any-pointer: fine)');
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const topicMapControllers = [];
    window.Accordia = window.Accordia || {};

    function bindMediaChange(query, handler) {
        if (typeof query.addEventListener === 'function') {
            query.addEventListener('change', handler);
            return;
        }
        if (typeof query.addListener === 'function') {
            query.addListener(handler);
        }
    }

    const initTopicMaps = (root = document) => {
        root.querySelectorAll('[data-topic-map]').forEach((map) => {
        if (map.dataset.topicMapReady === 'true') return;
        map.dataset.topicMapReady = 'true';
        const canvas = map.querySelector('.nucleus-topic-map__canvas');
        const nodeElements = [...map.querySelectorAll('[data-topic-node]')];
        const lineElements = [...map.querySelectorAll('[data-topic-line]')];

        if (!canvas || nodeElements.length < 2) return;

        const isLessonFloatingMap = map.classList.contains('lesson-floating-map');
        const motionFactor = isLessonFloatingMap ? 0.55 : 1;

        const state = {
            enabled: false,
            layoutMode: 'inactive',
            frameId: 0,
            lastFrameAt: 0,
            canvasWidth: 0,
            canvasHeight: 0,
            mapWidth: 0,
            mapHeight: 0,
            canvasOffsetX: 0,
            canvasOffsetY: 0,
            hasMeasured: false,
            resizeFrame: 0,
            activeDragCount: 0,
        };

        const pointerEventsSupported = typeof window.PointerEvent === 'function';
        const touchCapableEnvironment = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;

        const nodes = nodeElements.map((element) => ({
            element,
            number: element.dataset.topicNumber || '',
            anchorXPct: parseFloat(element.style.getPropertyValue('--node-x')) || 50,
            anchorYPct: parseFloat(element.style.getPropertyValue('--node-y')) || 50,
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            radius: 0,
            hovered: false,
            dragging: false,
            dragPreventClick: false,
            pointerId: null,
            pressClientX: 0,
            pressClientY: 0,
            dragTargetX: 0,
            dragTargetY: 0,
            dragOffsetX: 0,
            dragOffsetY: 0,
            vx: 0,
            vy: 0,
            driftX: (4 + Math.random() * 4) * motionFactor,
            driftY: (3 + Math.random() * 4) * motionFactor,
            speedX: (0.000055 + Math.random() * 0.000035) * motionFactor,
            speedY: (0.00005 + Math.random() * 0.00003) * motionFactor,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
        }));

        const nodeLookup = new Map(nodes.map((node) => [node.number, node]));
        const lines = lineElements.map((element) => ({
            element,
            from: element.dataset.topicFrom || '',
            to: element.dataset.topicTo || '',
            initialX1: element.getAttribute('x1') || '0',
            initialY1: element.getAttribute('y1') || '0',
            initialX2: element.getAttribute('x2') || '0',
            initialY2: element.getAttribute('y2') || '0',
        }));

        const getPointerPosition = (event) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            };
        };

        const getNodeScale = (node) => {
            if (node.dragging) return isLessonFloatingMap ? 1.04 : 1.11;
            if (node.hovered) return isLessonFloatingMap ? 1.015 : 1.08;
            return 1;
        };

        const getNodeHalfSize = (node) => {
            const scale = getNodeScale(node);
            return {
                halfWidth: (node.width * scale) / 2 + 28,
                halfHeight: (node.height * scale) / 2 + 24,
            };
        };

        const syncNodeAnchor = (node) => {
            node.anchorX = node.x;
            node.anchorY = node.y;
            if (state.canvasWidth > 0) {
                node.anchorXPct = (node.anchorX / state.canvasWidth) * 100;
            }
            if (state.canvasHeight > 0) {
                node.anchorYPct = (node.anchorY / state.canvasHeight) * 100;
            }
        };

        const renderNode = (node) => {
            const scale = getNodeScale(node);
            node.element.style.left = `${node.x}px`;
            node.element.style.top = `${node.y}px`;
            node.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
            node.element.style.zIndex = node.dragging ? '6' : (node.hovered ? '4' : '1');
            node.element.classList.toggle('is-dragging', node.dragging);
        };

        const clampNode = (node) => {
            const { halfWidth, halfHeight } = getNodeHalfSize(node);
            const minX = halfWidth;
            const maxX = Math.max(halfWidth, state.canvasWidth - halfWidth);
            const minY = halfHeight;
            const maxY = Math.max(halfHeight, state.canvasHeight - halfHeight);

            if (node.x < minX) {
                node.x = minX;
                if (!node.dragging && node.vx < 0) node.vx *= -0.42;
            } else if (node.x > maxX) {
                node.x = maxX;
                if (!node.dragging && node.vx > 0) node.vx *= -0.42;
            }

            if (node.y < minY) {
                node.y = minY;
                if (!node.dragging && node.vy < 0) node.vy *= -0.42;
            } else if (node.y > maxY) {
                node.y = maxY;
                if (!node.dragging && node.vy > 0) node.vy *= -0.42;
            }
        };

        const resolveCollision = (first, second, frameFactor) => {
            const dx = second.x - first.x;
            const dy = second.y - first.y;
            const absDx = Math.abs(dx) || 0.01;
            const absDy = Math.abs(dy) || 0.01;
            const firstSize = getNodeHalfSize(first);
            const secondSize = getNodeHalfSize(second);
            const overlapX = firstSize.halfWidth + secondSize.halfWidth - absDx;
            const overlapY = firstSize.halfHeight + secondSize.halfHeight - absDy;

            if (overlapX <= 0 || overlapY <= 0) return;

            const useX = overlapX < overlapY;
            const directionX = dx >= 0 ? 1 : -1;
            const directionY = dy >= 0 ? 1 : -1;
            const separation = (useX ? overlapX : overlapY) + 1;

            let firstShare = 0.5;
            let secondShare = 0.5;

            if (first.dragging && !second.dragging) {
                firstShare = 0.08;
                secondShare = 0.92;
            } else if (!first.dragging && second.dragging) {
                firstShare = 0.92;
                secondShare = 0.08;
            }

            if (useX) {
                first.x -= directionX * separation * firstShare;
                second.x += directionX * separation * secondShare;
            } else {
                first.y -= directionY * separation * firstShare;
                second.y += directionY * separation * secondShare;
            }

            clampNode(first);
            clampNode(second);

            const impact = Math.min(6, separation * 0.18) * frameFactor;
            if (useX) {
                if (!first.dragging) first.vx -= directionX * impact;
                if (!second.dragging) second.vx += directionX * impact;
                if (first.dragging && !second.dragging) {
                    second.vx += directionX * Math.max(impact, Math.abs(first.vx) * 0.85);
                }
                if (!first.dragging && second.dragging) {
                    first.vx -= directionX * Math.max(impact, Math.abs(second.vx) * 0.85);
                }
            } else {
                if (!first.dragging) first.vy -= directionY * impact;
                if (!second.dragging) second.vy += directionY * impact;
                if (first.dragging && !second.dragging) {
                    second.vy += directionY * Math.max(impact, Math.abs(first.vy) * 0.85);
                }
                if (!first.dragging && second.dragging) {
                    first.vy -= directionY * Math.max(impact, Math.abs(second.vy) * 0.85);
                }
            }
        };

        const updateLines = () => {
            if (!state.mapWidth || !state.mapHeight) return;

            lines.forEach((line) => {
                const fromNode = nodeLookup.get(line.from);
                const toNode = nodeLookup.get(line.to);
                if (!fromNode || !toNode) return;

                const x1 = ((fromNode.x + state.canvasOffsetX) / state.mapWidth) * 100;
                const y1 = ((fromNode.y + state.canvasOffsetY) / state.mapHeight) * 100;
                const x2 = ((toNode.x + state.canvasOffsetX) / state.mapWidth) * 100;
                const y2 = ((toNode.y + state.canvasOffsetY) / state.mapHeight) * 100;

                line.element.setAttribute('x1', x1.toFixed(3));
                line.element.setAttribute('y1', y1.toFixed(3));
                line.element.setAttribute('x2', x2.toFixed(3));
                line.element.setAttribute('y2', y2.toFixed(3));
            });
        };

        const renderLayout = () => {
            nodes.forEach(renderNode);
            updateLines();
        };

        const settleNodes = ({ iterations = 10, frameFactor = 1, syncAnchorsAfter = false } = {}) => {
            for (let iteration = 0; iteration < iterations; iteration += 1) {
                for (let index = 0; index < nodes.length; index += 1) {
                    for (let compareIndex = index + 1; compareIndex < nodes.length; compareIndex += 1) {
                        resolveCollision(nodes[index], nodes[compareIndex], frameFactor);
                    }
                }

                nodes.forEach(clampNode);
            }

            if (syncAnchorsAfter) {
                nodes.forEach((node) => {
                    if (!node.dragging) {
                        syncNodeAnchor(node);
                    }
                });
            }
        };

        const measure = (preservePositions = true) => {
            const previousWidth = state.canvasWidth || 1;
            const previousHeight = state.canvasHeight || 1;
            const canvasRect = canvas.getBoundingClientRect();
            const mapRect = map.getBoundingClientRect();

            state.canvasWidth = canvas.clientWidth;
            state.canvasHeight = canvas.clientHeight;
            state.mapWidth = map.clientWidth;
            state.mapHeight = map.clientHeight;
            state.canvasOffsetX = canvasRect.left - mapRect.left;
            state.canvasOffsetY = canvasRect.top - mapRect.top;

            nodes.forEach((node) => {
                node.width = node.element.offsetWidth;
                node.height = node.element.offsetHeight;
                node.radius = Math.hypot(node.width, node.height) * 0.31;
                node.anchorX = state.canvasWidth * (node.anchorXPct / 100);
                node.anchorY = state.canvasHeight * (node.anchorYPct / 100);

                if (!state.hasMeasured || !preservePositions) {
                    node.x = node.anchorX;
                    node.y = node.anchorY;
                } else {
                    node.x = (node.x / previousWidth) * state.canvasWidth;
                    node.y = (node.y / previousHeight) * state.canvasHeight;
                    node.anchorX = state.canvasWidth * (node.anchorXPct / 100);
                    node.anchorY = state.canvasHeight * (node.anchorYPct / 100);
                }

                clampNode(node);
            });

            state.hasMeasured = true;
            settleNodes({
                iterations: preservePositions ? (isLessonFloatingMap ? 20 : 14) : (isLessonFloatingMap ? 34 : 28),
                frameFactor: 1,
                syncAnchorsAfter: !preservePositions,
            });
            renderLayout();
        };

        const animate = (timestamp) => {
            if (!state.enabled) return;

            if (!state.lastFrameAt) {
                state.lastFrameAt = timestamp;
            }

            const frameFactor = Math.min((timestamp - state.lastFrameAt) / 16.67, 1.8);
            state.lastFrameAt = timestamp;

            nodes.forEach((node) => {
                if (node.dragging) {
                    const targetX = node.dragTargetX;
                    const targetY = node.dragTargetY;
                    const previousX = node.x;
                    const previousY = node.y;

                    node.x += (targetX - node.x) * 0.42;
                    node.y += (targetY - node.y) * 0.42;
                    node.vx = node.x - previousX;
                    node.vy = node.y - previousY;
                    clampNode(node);
                    return;
                }

                const targetX = node.anchorX + Math.sin(timestamp * node.speedX + node.phaseX) * node.driftX;
                const targetY = node.anchorY + Math.cos(timestamp * node.speedY + node.phaseY) * node.driftY;
                const spring = node.hovered ? 0.012 : 0.009;
                const damping = node.hovered ? 0.82 : 0.86;

                node.vx += (targetX - node.x) * spring * frameFactor;
                node.vy += (targetY - node.y) * spring * frameFactor;
                node.vx *= Math.pow(damping, frameFactor);
                node.vy *= Math.pow(damping, frameFactor);
                node.x += node.vx * frameFactor;
                node.y += node.vy * frameFactor;
                clampNode(node);
            });

            settleNodes({ iterations: 8, frameFactor });
            renderLayout();
            state.frameId = requestAnimationFrame(animate);
        };

        const scheduleMeasure = () => {
            if (state.layoutMode === 'inactive') return;
            cancelAnimationFrame(state.resizeFrame);
            state.resizeFrame = requestAnimationFrame(() => measure(true));
        };

        const setHoverState = (node, hovered) => {
            node.hovered = hovered;
            node.element.classList.toggle('is-floating-hover', hovered);

            if (state.layoutMode === 'static') {
                settleNodes({ iterations: isLessonFloatingMap ? 16 : 12, frameFactor: 1 });
                renderLayout();
            }
        };

        nodes.forEach((node) => {
            const beginDrag = (clientX, clientY, pointerId = null) => {
                if (state.layoutMode === 'inactive') return false;

                const pointer = getPointerPosition({ clientX, clientY });
                node.pointerId = pointerId;
                node.pressClientX = clientX;
                node.pressClientY = clientY;
                node.dragTargetX = node.x;
                node.dragTargetY = node.y;
                node.dragOffsetX = pointer.x - node.x;
                node.dragOffsetY = pointer.y - node.y;
                node.dragPreventClick = false;
                return true;
            };

            const moveDrag = (clientX, clientY, { shouldPreventDefault = false } = {}) => {
                if (node.pointerId == null) return;

                const pointer = getPointerPosition({ clientX, clientY });
                const movedDistance = Math.hypot(clientX - node.pressClientX, clientY - node.pressClientY);

                if (!node.dragging && movedDistance > 5) {
                    node.dragging = true;
                    node.dragPreventClick = true;
                    state.activeDragCount += 1;
                    map.classList.add('is-dragging');
                    setHoverState(node, true);
                }

                if (!node.dragging) return;

                node.dragTargetX = pointer.x - node.dragOffsetX;
                node.dragTargetY = pointer.y - node.dragOffsetY;

                if (state.layoutMode === 'static') {
                    const previousX = node.x;
                    const previousY = node.y;

                    node.x += (node.dragTargetX - node.x) * 0.72;
                    node.y += (node.dragTargetY - node.y) * 0.72;
                    node.vx = node.x - previousX;
                    node.vy = node.y - previousY;
                    clampNode(node);
                    settleNodes({ iterations: isLessonFloatingMap ? 18 : 14, frameFactor: 1 });
                    renderLayout();
                }

                return shouldPreventDefault;
            };

            const finishDrag = (pointerId = null) => {
                if (pointerId != null && node.pointerId !== pointerId) return;

                if (node.dragging) {
                    syncNodeAnchor(node);
                    node.dragging = false;
                    state.activeDragCount = Math.max(0, state.activeDragCount - 1);
                    if (state.activeDragCount === 0) {
                        map.classList.remove('is-dragging');
                    }
                }

                node.pointerId = null;
                node.pressClientX = 0;
                node.pressClientY = 0;

                if (state.layoutMode === 'static') {
                    settleNodes({ iterations: isLessonFloatingMap ? 24 : 18, frameFactor: 1, syncAnchorsAfter: true });
                    renderLayout();
                    return;
                }

                renderNode(node);
            };

            node.element.addEventListener('click', (event) => {
                if (node.dragPreventClick) {
                    event.preventDefault();
                    node.dragPreventClick = false;
                }
            });

            if (pointerEventsSupported) {
                node.element.addEventListener('pointerdown', (event) => {
                    if (event.button !== 0) return;
                    if (!beginDrag(event.clientX, event.clientY, event.pointerId)) return;
                    node.element.setPointerCapture(event.pointerId);
                });

                node.element.addEventListener('pointermove', (event) => {
                    if (node.pointerId !== event.pointerId) return;
                    if (moveDrag(event.clientX, event.clientY, { shouldPreventDefault: true })) {
                        event.preventDefault();
                    }
                });

                const releasePointer = (event) => {
                    if (node.pointerId !== event.pointerId) return;
                    if (node.element.hasPointerCapture(event.pointerId)) {
                        node.element.releasePointerCapture(event.pointerId);
                    }
                    finishDrag(event.pointerId);
                };

                node.element.addEventListener('pointerup', releasePointer);
                node.element.addEventListener('pointercancel', releasePointer);
                node.element.addEventListener('pointerenter', () => setHoverState(node, true));
                node.element.addEventListener('pointerleave', () => {
                    if (!node.dragging) {
                        setHoverState(node, false);
                    }
                });
            } else {
                node.element.addEventListener('mousedown', (event) => {
                    if (event.button !== 0) return;
                    beginDrag(event.clientX, event.clientY, 'mouse');
                });

                window.addEventListener('mousemove', (event) => {
                    if (node.pointerId !== 'mouse') return;
                    if (moveDrag(event.clientX, event.clientY, { shouldPreventDefault: true })) {
                        event.preventDefault();
                    }
                });

                window.addEventListener('mouseup', () => {
                    if (node.pointerId !== 'mouse') return;
                    finishDrag('mouse');
                });

                node.element.addEventListener('mouseenter', () => setHoverState(node, true));
                node.element.addEventListener('mouseleave', () => {
                    if (!node.dragging) {
                        setHoverState(node, false);
                    }
                });
            }

            node.element.addEventListener('focus', () => setHoverState(node, true));
            node.element.addEventListener('blur', () => setHoverState(node, false));
        });

        if (typeof ResizeObserver === 'function') {
            const observer = new ResizeObserver(() => scheduleMeasure());
            observer.observe(map);
            observer.observe(canvas);
        } else {
            window.addEventListener('resize', scheduleMeasure);
        }

        const resetFloatingLayout = () => {
            state.enabled = false;
            state.layoutMode = 'inactive';
            state.lastFrameAt = 0;
            cancelAnimationFrame(state.frameId);
            cancelAnimationFrame(state.resizeFrame);
            map.classList.remove('is-particle-map');
            map.classList.remove('is-dragging');
            map.classList.add('is-compat-grid');
            state.activeDragCount = 0;

            nodes.forEach((node) => {
                node.hovered = false;
                node.dragging = false;
                node.pointerId = null;
                node.dragPreventClick = false;
                node.vx = 0;
                node.vy = 0;
                node.element.style.left = '';
                node.element.style.top = '';
                node.element.style.transform = '';
                node.element.style.zIndex = '';
                node.element.classList.remove('is-dragging');
                node.element.classList.remove('is-floating-hover');
            });

            lines.forEach((line) => {
                line.element.setAttribute('x1', line.initialX1);
                line.element.setAttribute('y1', line.initialY1);
                line.element.setAttribute('x2', line.initialX2);
                line.element.setAttribute('y2', line.initialY2);
            });
        };

        const controller = {
            sync() {
                const previousMode = state.layoutMode;
                const touchOnlyEnvironment = touchCapableEnvironment
                    && !topicMapAnyHoverMedia.matches
                    && !topicMapAnyFinePointerMedia.matches;
                const supportsInteractiveMap = topicMapInteractiveMedia.matches && !touchOnlyEnvironment;
                const shouldAnimate = supportsInteractiveMap && topicMapAnimatedMedia.matches && !reducedMotionMedia.matches;

                if (shouldAnimate) {
                    if (previousMode !== 'animated') {
                        state.enabled = true;
                        state.layoutMode = 'animated';
                        state.lastFrameAt = 0;
                        cancelAnimationFrame(state.frameId);
                        map.classList.add('is-particle-map');
                        map.classList.remove('is-compat-grid');
                        measure(previousMode !== 'inactive');
                        state.frameId = requestAnimationFrame(animate);
                    }
                    return;
                }

                if (supportsInteractiveMap) {
                    if (previousMode !== 'static') {
                        state.enabled = false;
                        state.layoutMode = 'static';
                        state.lastFrameAt = 0;
                        cancelAnimationFrame(state.frameId);
                        map.classList.add('is-particle-map');
                        map.classList.remove('is-compat-grid');
                        map.classList.remove('is-dragging');
                        state.activeDragCount = 0;
                        measure(previousMode !== 'inactive');
                    }
                    return;
                }

                if (previousMode !== 'inactive') {
                    resetFloatingLayout();
                }
            },
        };

        topicMapControllers.push(controller);
        controller.sync();
        });
    };

    window.Accordia.initTopicMaps = initTopicMaps;
    initTopicMaps(document);

    const syncTopicMaps = () => {
        topicMapControllers.forEach((controller) => controller.sync());
    };

    bindMediaChange(topicMapInteractiveMedia, syncTopicMaps);
    bindMediaChange(topicMapAnimatedMedia, syncTopicMaps);
    bindMediaChange(topicMapAnyHoverMedia, syncTopicMaps);
    bindMediaChange(topicMapAnyFinePointerMedia, syncTopicMaps);
    bindMediaChange(reducedMotionMedia, syncTopicMaps);

    document.querySelectorAll('[data-method-explorer]').forEach((explorer) => {
        const steps = [...explorer.querySelectorAll('[data-method-step]')];
        const detail = explorer.querySelector('[data-method-detail]');
        if (!steps.length || !detail) return;

        const detailKicker = detail.querySelector('[data-method-detail-kicker]');
        const detailTitle = detail.querySelector('[data-method-detail-title]');
        const detailSummary = detail.querySelector('[data-method-detail-summary]');
        const detailDescription = detail.querySelector('[data-method-detail-description]');
        const detailNote = detail.querySelector('[data-method-detail-note]');
        const detailBadge = detail.querySelector('[data-method-detail-badge]');

        const activateStep = (step) => {
            steps.forEach((item) => {
                const isActive = item === step;
                item.classList.toggle('is-active', isActive);
                item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });

            detail.dataset.phase = step.dataset.phase || '';
            if (detailKicker) detailKicker.textContent = `Passaggio ${step.dataset.order || ''}`;
            if (detailTitle) detailTitle.textContent = step.dataset.name || '';
            if (detailSummary) detailSummary.textContent = step.dataset.summary || '';
            if (detailDescription) detailDescription.textContent = step.dataset.description || '';
            if (detailNote) detailNote.textContent = step.dataset.note || '';

            if (detailBadge) {
                const badge = step.dataset.badge || '';
                detailBadge.textContent = badge;
                detailBadge.hidden = badge === '';
            }
        };

        steps.forEach((step) => {
            ['mouseenter', 'focus', 'click'].forEach((eventName) => {
                step.addEventListener(eventName, () => activateStep(step));
            });
        });

        const defaultStep = steps.find((step) => step.classList.contains('is-active')) || steps[0];
        activateStep(defaultStep);
    });

    document.querySelectorAll('[data-reveal-explorer]').forEach((explorer) => {
        const items = [...explorer.querySelectorAll('[data-reveal-item]')];
        const detail = explorer.querySelector('[data-reveal-detail]');
        if (!items.length || !detail) return;

        const detailOrder = detail.querySelector('[data-reveal-detail-order]');
        const detailKicker = detail.querySelector('[data-reveal-detail-kicker]');
        const detailTitle = detail.querySelector('[data-reveal-detail-title]');
        const detailSummary = detail.querySelector('[data-reveal-detail-summary]');
        const detailNote = detail.querySelector('[data-reveal-detail-note]');
        const detailLink = detail.querySelector('[data-reveal-detail-link]');

        const activateItem = (item) => {
            items.forEach((entry) => {
                entry.classList.toggle('is-active', entry === item);
                entry.setAttribute('aria-pressed', entry === item ? 'true' : 'false');
            });

            if (detailOrder) detailOrder.textContent = item.dataset.order || '';
            if (detailKicker) detailKicker.textContent = item.dataset.kicker || '';
            if (detailTitle) detailTitle.textContent = item.dataset.title || '';
            if (detailSummary) detailSummary.textContent = item.dataset.summary || '';
            if (detailNote) detailNote.textContent = item.dataset.note || '';

            if (detailLink) {
                const href = item.dataset.link || '';
                const label = item.dataset.linkLabel || '';
                detailLink.textContent = label;
                detailLink.hidden = href === '' || label === '';
                if (href) detailLink.setAttribute('href', href);
            }
        };

        items.forEach((item) => {
            ['mouseenter', 'focus', 'click'].forEach((eventName) => {
                item.addEventListener(eventName, () => activateItem(item));
            });
        });

        const defaultItem = items.find((item) => item.classList.contains('is-active')) || items[0];
        activateItem(defaultItem);
    });

    document.querySelectorAll('[data-media-carousel]').forEach((carousel) => {
        const viewport = carousel.querySelector('[data-media-carousel-viewport]');
        const slides = [...carousel.querySelectorAll('[data-media-slide]')];
        const prevButton = carousel.querySelector('[data-media-prev]');
        const nextButton = carousel.querySelector('[data-media-next]');
        const dots = [...carousel.querySelectorAll('[data-media-dot]')];
        const controls = carousel.querySelector('.lesson-media-carousel__controls');

        if (!viewport || !slides.length) return;

        if (controls && slides.length <= 1) {
            controls.hidden = true;
        }

        const getActiveIndex = () => {
            let activeIndex = 0;
            let minDistance = Number.POSITIVE_INFINITY;

            slides.forEach((slide, index) => {
                const distance = Math.abs(slide.offsetLeft - viewport.scrollLeft);
                if (distance < minDistance) {
                    minDistance = distance;
                    activeIndex = index;
                }
            });

            return activeIndex;
        };

        const goToSlide = (index, behavior = 'smooth') => {
            const target = slides[index];
            if (!target) return;
            viewport.scrollTo({ left: target.offsetLeft, behavior });
        };

        const syncCarousel = () => {
            const activeIndex = getActiveIndex();

            dots.forEach((dot, index) => {
                const isActive = index === activeIndex;
                dot.classList.toggle('is-active', isActive);
                dot.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });

            if (prevButton) prevButton.disabled = activeIndex === 0;
            if (nextButton) nextButton.disabled = activeIndex === slides.length - 1;
        };

        let syncFrame = 0;
        const scheduleSync = () => {
            cancelAnimationFrame(syncFrame);
            syncFrame = requestAnimationFrame(syncCarousel);
        };

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                goToSlide(Math.max(0, getActiveIndex() - 1));
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                goToSlide(Math.min(slides.length - 1, getActiveIndex() + 1));
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });

        viewport.addEventListener('scroll', scheduleSync, { passive: true });
        viewport.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                goToSlide(Math.max(0, getActiveIndex() - 1));
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                goToSlide(Math.min(slides.length - 1, getActiveIndex() + 1));
            }
        });

        syncCarousel();
    });
});
