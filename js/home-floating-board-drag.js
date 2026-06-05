(function () {
    const board = document.getElementById('baroccoBoard');
    if (!board) return;

    const canvas = board.querySelector('.home-era-board__canvas');
    const nodes = Array.from(board.querySelectorAll('.home-era-board__node'));
    if (!canvas || nodes.length === 0) return;

    const storageKey = 'accordia-barocco-board-node-positions-v1';
    let savedPositions = {};

    try {
        savedPositions = JSON.parse(window.localStorage.getItem(storageKey) || '{}');
    } catch (error) {
        savedPositions = {};
    }

    nodes.forEach(function (node) {
        const key = getNodeKey(node);
        if (savedPositions[key]) {
            node.style.setProperty('--x', savedPositions[key].x);
            node.style.setProperty('--y', savedPositions[key].y);
        }
        node.setAttribute('draggable', 'false');
    });

    function getNodeKey(node) {
        const number = node.querySelector('.home-era-board__node-number');
        return number ? number.textContent.trim() : String(nodes.indexOf(node));
    }

    function getPosition(node) {
        const x = parseFloat(node.style.getPropertyValue('--x')) || 50;
        const y = parseFloat(node.style.getPropertyValue('--y')) || 50;
        return { x, y };
    }

    function savePositions() {
        const next = {};
        nodes.forEach(function (node) {
            next[getNodeKey(node)] = getPosition(node);
        });
        try {
            window.localStorage.setItem(storageKey, JSON.stringify(next));
        } catch (error) {
            // Dragging still works even when localStorage is unavailable.
        }
    }

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function getCandidateRect(node, xPercent, yPercent) {
        const canvasRect = canvas.getBoundingClientRect();
        const nodeRect = node.getBoundingClientRect();
        const centerX = canvasRect.left + (canvasRect.width * xPercent / 100);
        const centerY = canvasRect.top + (canvasRect.height * yPercent / 100);

        return {
            left: centerX - nodeRect.width / 2,
            right: centerX + nodeRect.width / 2,
            top: centerY - nodeRect.height / 2,
            bottom: centerY + nodeRect.height / 2
        };
    }

    function rectsOverlap(a, b, gap) {
        return !(
            a.right + gap <= b.left ||
            a.left >= b.right + gap ||
            a.bottom + gap <= b.top ||
            a.top >= b.bottom + gap
        );
    }

    function isInsideCanvas(rect, inset) {
        const canvasRect = canvas.getBoundingClientRect();
        return (
            rect.left >= canvasRect.left + inset &&
            rect.top >= canvasRect.top + inset &&
            rect.right <= canvasRect.right - inset &&
            rect.bottom <= canvasRect.bottom - inset
        );
    }

    function canMoveTo(activeNode, xPercent, yPercent) {
        const candidateRect = getCandidateRect(activeNode, xPercent, yPercent);
        const gap = 14;
        const inset = 12;

        if (!isInsideCanvas(candidateRect, inset)) return false;

        return nodes.every(function (node) {
            if (node === activeNode) return true;
            const pos = getPosition(node);
            const otherRect = getCandidateRect(node, pos.x, pos.y);
            return !rectsOverlap(candidateRect, otherRect, gap);
        });
    }

    function pointerToPercent(event) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100),
            y: clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100)
        };
    }

    nodes.forEach(function (node) {
        let dragging = false;
        let pointerId = null;
        let lastValid = getPosition(node);
        let moved = false;
        let startClientX = 0;
        let startClientY = 0;

        node.addEventListener('pointerdown', function (event) {
            if (!board.classList.contains('is-open')) return;

            dragging = true;
            moved = false;
            pointerId = event.pointerId;
            lastValid = getPosition(node);
            startClientX = event.clientX;
            startClientY = event.clientY;
            node.classList.add('is-dragging');
            node.setPointerCapture(pointerId);
            event.preventDefault();
        });

        node.addEventListener('pointermove', function (event) {
            if (!dragging || event.pointerId !== pointerId) return;

            const distance = Math.hypot(event.clientX - startClientX, event.clientY - startClientY);
            if (distance > 4) moved = true;

            const next = pointerToPercent(event);
            if (canMoveTo(node, next.x, next.y)) {
                lastValid = next;
                node.classList.remove('is-blocked');
                node.style.setProperty('--x', next.x.toFixed(2));
                node.style.setProperty('--y', next.y.toFixed(2));
            } else {
                node.classList.add('is-blocked');
            }
        });

        function finishDrag(event) {
            if (!dragging || event.pointerId !== pointerId) return;

            dragging = false;
            node.classList.remove('is-dragging', 'is-blocked');
            node.style.setProperty('--x', lastValid.x.toFixed(2));
            node.style.setProperty('--y', lastValid.y.toFixed(2));
            savePositions();

            try {
                node.releasePointerCapture(pointerId);
            } catch (error) {
                // Browser may have already released the pointer.
            }

            window.setTimeout(function () {
                moved = false;
            }, 0);
        }

        node.addEventListener('pointerup', finishDrag);
        node.addEventListener('pointercancel', finishDrag);

        node.addEventListener('click', function (event) {
            if (moved) {
                event.preventDefault();
                event.stopPropagation();
            }
        });
    });
})();
