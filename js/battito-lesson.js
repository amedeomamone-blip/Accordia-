(function () {
    'use strict';

    var stage  = document.querySelector('.bintro-stage');
    var header = document.getElementById('site-header');

    function syncHeaderHeight() {
        if (header && stage) {
            stage.style.setProperty('--bintro-header-h', header.offsetHeight + 'px');
        }
    }

    syncHeaderHeight();
    window.addEventListener('resize', syncHeaderHeight);
    window.addEventListener('load', syncHeaderHeight);

    /* ── suoni sintetici, senza asset esterni ─────────────────── */
    var audioContext = null;

    function getAudioContext() {
        if (!audioContext) {
            var AudioCtor = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtor) return null;
            audioContext = new AudioCtor();
        }
        if (audioContext.state === 'suspended') audioContext.resume();
        return audioContext;
    }

    function playBodySound(name, delay) {
        if (name === 'silenzio') return;

        var ac = getAudioContext();
        if (!ac) return;

        var settings = {
            cosce: { frequency: 210, type: 'sine',     gain: .34, duration: .13 },
            mani:  { frequency: 980, type: 'triangle', gain: .28, duration: .08 },
            petto: { frequency: 135, type: 'sine',     gain: .42, duration: .17 },
            piedi: { frequency: 82,  type: 'square',   gain: .3,  duration: .12 }
        }[name];

        if (!settings) return;

        var when = ac.currentTime + (delay || 0);
        var oscillator = ac.createOscillator();
        var gain = ac.createGain();

        oscillator.type = settings.type;
        oscillator.frequency.setValueAtTime(settings.frequency, when);
        gain.gain.setValueAtTime(settings.gain, when);
        gain.gain.exponentialRampToValueAtTime(.001, when + settings.duration);

        oscillator.connect(gain);
        gain.connect(ac.destination);
        oscillator.start(when);
        oscillator.stop(when + settings.duration + .02);
    }

    var gestureImages = {
        mani:  '../../../../assets/lesson/body-percussion/mani.png',
        petto: '../../../../assets/lesson/body-percussion/petto.png',
        cosce: '../../../../assets/lesson/body-percussion/cosce.png'
    };

    var gestureNames = {
        mani: 'Mani',
        petto: 'Petto',
        cosce: 'Cosce'
    };

    function renderGestureSet(target, sounds) {
        target.textContent = '';

        if (!sounds.length) {
            target.textContent = '+';
            return;
        }

        var visual = document.createElement('span');
        visual.className = 'brl__gesture-set' + (sounds.length > 1 ? ' brl__gesture-set--multiple' : '');

        sounds.forEach(function (sound) {
            var source = gestureImages[sound];
            if (!source) return;

            var image = document.createElement('img');
            image.className = 'brl__gesture-icon brl__gesture-icon--' + sound;
            image.src = source;
            image.alt = '';
            image.setAttribute('aria-hidden', 'true');
            visual.appendChild(image);
        });

        target.appendChild(visual);
    }

    function spokenGestureList(sounds) {
        return sounds.map(function (sound) {
            return gestureNames[sound] || sound;
        }).join(', ');
    }

    /* ── riproduzione condivisa ───────────────────────────────── */
    var currentPlaybackStop = null;

    function stopPlayback() {
        if (currentPlaybackStop) currentPlaybackStop();
        currentPlaybackStop = null;
    }

    function playSequence(tiles, sequence, button, status, doneText) {
        stopPlayback();
        getAudioContext();

        var timers = [];
        var stopped = false;
        var beatLength = 700;

        button.disabled = true;
        status.textContent = 'Ascolta';

        function stop() {
            if (stopped) return;
            stopped = true;
            timers.forEach(window.clearTimeout);
            tiles.forEach(function (tile) { tile.classList.remove('is-live'); });
            button.disabled = false;
        }

        currentPlaybackStop = stop;

        sequence.forEach(function (sounds, index) {
            timers.push(window.setTimeout(function () {
                if (stopped) return;
                tiles.forEach(function (tile, tileIndex) {
                    tile.classList.toggle('is-live', tileIndex === index);
                });
                sounds.forEach(function (sound, soundIndex) {
                    playBodySound(sound, soundIndex * .2);
                });
            }, index * beatLength));
        });

        timers.push(window.setTimeout(function () {
            stop();
            status.textContent = doneText;
            currentPlaybackStop = null;
        }, sequence.length * beatLength));
    }

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) stopPlayback();
    });

    /* ── schermata 1: gioco dell'eco ──────────────────────────── */
    (function setupEcho() {
        var root = document.getElementById('brl-echo');
        if (!root) return;

        var patterns = [
            [
                ['cosce'], ['cosce'], ['cosce'], ['cosce'],
                ['cosce'], ['cosce'], ['cosce'], ['cosce']
            ],
            [
                ['mani'], ['mani'], ['mani'], ['mani'],
                ['mani'], ['mani'], ['mani'], ['mani']
            ],
            [
                ['cosce'], ['mani'], ['cosce'], ['mani'],
                ['cosce'], ['mani'], ['cosce'], ['mani'],
                ['cosce'], ['mani'], ['cosce'], ['mani']
            ],
            [
                ['cosce'], ['petto'], ['cosce'], ['mani'],
                ['cosce'], ['petto'], ['cosce'], ['mani'],
                ['cosce'], ['petto'], ['cosce'], ['mani']
            ],
            [
                ['cosce', 'petto'], ['mani'], ['cosce', 'petto'], ['mani', 'mani'],
                ['cosce', 'petto'], ['mani'], ['cosce', 'petto'], ['mani', 'mani'],
                ['cosce', 'petto'], ['mani'], ['cosce', 'petto'], ['mani', 'mani']
            ]
        ];
        var patternIndex = 0;
        var patternButtons = Array.prototype.slice.call(root.querySelectorAll('.brl__pattern'));
        var mainGrid = document.getElementById('brl-echo-grid');
        var previewGrid = document.getElementById('brl-echo-preview-grid');
        var preview = root.querySelector('.brl__preview');
        var playButton = document.getElementById('brl-echo-play');
        var status = document.getElementById('brl-echo-status');

        function renderTiles(target, soundsList, startIndex) {
            target.innerHTML = '';

            soundsList.forEach(function (sounds, index) {
                var tile = document.createElement('div');
                var label = document.createElement('span');
                var beat = document.createElement('span');
                tile.className = 'brl__tile';
                tile.setAttribute('aria-label', 'Movimento ' + ((startIndex + index) % 4 + 1) + ': ' + spokenGestureList(sounds));
                beat.className = 'brl__beat';
                beat.textContent = String((startIndex + index) % 4 + 1);
                label.className = 'brl__tile-label';
                renderGestureSet(label, sounds);
                tile.appendChild(beat);
                tile.appendChild(label);
                target.appendChild(tile);
            });
        }

        function renderChunk(chunkIndex) {
            var sequence = patterns[patternIndex];
            var currentStart = chunkIndex * 4;
            var nextStart = currentStart + 4;
            var currentSounds = sequence.slice(currentStart, currentStart + 4);
            var nextSounds = sequence.slice(nextStart, nextStart + 4);

            root.setAttribute('data-chunk', String(chunkIndex + 1));
            mainGrid.setAttribute('aria-label', 'Frase in esecuzione, movimenti da ' + (currentStart + 1) + ' a ' + (currentStart + currentSounds.length));
            previewGrid.setAttribute('aria-label', nextSounds.length ? 'Anteprima dei movimenti da ' + (nextStart + 1) + ' a ' + (nextStart + nextSounds.length) : 'Nessuna frase successiva');

            renderTiles(mainGrid, currentSounds, currentStart);
            renderTiles(previewGrid, nextSounds, nextStart);
            preview.classList.toggle('is-blank', nextSounds.length === 0);
            preview.setAttribute('aria-hidden', nextSounds.length ? 'false' : 'true');
        }

        function render() {
            stopPlayback();
            root.classList.remove('is-changing');
            status.textContent = '';
            renderChunk(0);
        }

        function playEchoSequence() {
            stopPlayback();
            getAudioContext();

            var sequence = patterns[patternIndex];
            var beatLength = 700;
            var chunkCount = Math.ceil(sequence.length / 4);
            var timers = [];
            var stopped = false;

            renderChunk(0);
            playButton.disabled = true;
            status.textContent = 'Ascolta';

            function stop() {
                if (stopped) return;
                stopped = true;
                timers.forEach(window.clearTimeout);
                root.classList.remove('is-changing');
                Array.prototype.slice.call(mainGrid.querySelectorAll('.brl__tile')).forEach(function (tile) {
                    tile.classList.remove('is-live');
                });
                playButton.disabled = false;
            }

            currentPlaybackStop = stop;

            for (var chunkIndex = 1; chunkIndex < chunkCount; chunkIndex += 1) {
                (function (nextChunk) {
                    var swapTime = nextChunk * 4 * beatLength;

                    timers.push(window.setTimeout(function () {
                        if (!stopped) root.classList.add('is-changing');
                    }, swapTime - 340));

                    timers.push(window.setTimeout(function () {
                        if (!stopped) renderChunk(nextChunk);
                    }, swapTime - 180));

                    timers.push(window.setTimeout(function () {
                        if (!stopped) root.classList.remove('is-changing');
                    }, swapTime - 170));
                })(chunkIndex);
            }

            sequence.forEach(function (sounds, index) {
                timers.push(window.setTimeout(function () {
                    if (stopped) return;

                    Array.prototype.slice.call(mainGrid.querySelectorAll('.brl__tile')).forEach(function (tile, tileIndex) {
                        tile.classList.toggle('is-live', tileIndex === index % 4);
                    });

                    sounds.forEach(function (sound, soundIndex) {
                        playBodySound(sound, soundIndex * .2);
                    });
                }, index * beatLength));
            });

            timers.push(window.setTimeout(function () {
                stop();
                status.textContent = 'Ora rispondi';
                currentPlaybackStop = null;
            }, sequence.length * beatLength));
        }

        patternButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                patternIndex = parseInt(button.getAttribute('data-pattern'), 10) || 0;
                patternButtons.forEach(function (item) {
                    var active = item === button;
                    item.classList.toggle('is-active', active);
                    item.setAttribute('aria-selected', active ? 'true' : 'false');
                });
                render();
            });
        });

        playButton.addEventListener('click', function () {
            playEchoSequence();
        });

        render();
    })();

    /* ── schermata 2: compositore ─────────────────────────────── */
    (function setupComposer() {
        var root = document.getElementById('brl-composer');
        if (!root) return;

        var slots = Array.prototype.slice.call(root.querySelectorAll('.brl__tile'));
        var soundButtons = Array.prototype.slice.call(root.querySelectorAll('.brl__sound'));
        var clearButton = document.getElementById('brl-compose-clear');
        var playButton = document.getElementById('brl-compose-play');
        var status = document.getElementById('brl-compose-status');
        var composition = [[], [], [], []];
        var selectedSlot = 0;

        function render() {
            slots.forEach(function (slot, index) {
                var sounds = composition[index];
                var label = slot.querySelector('.brl__tile-label');
                var empty = sounds.length === 0;

                slot.classList.toggle('is-selected', index === selectedSlot);
                slot.classList.toggle('is-empty', empty);
                slot.setAttribute('aria-label', 'Movimento ' + (index + 1) + ': ' + (empty ? 'vuoto' : spokenGestureList(sounds)));
                renderGestureSet(label, sounds);
            });
        }

        slots.forEach(function (slot, index) {
            slot.addEventListener('click', function () {
                stopPlayback();
                selectedSlot = index;
                status.textContent = '';
                render();
            });
        });

        soundButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                stopPlayback();
                var sound = button.getAttribute('data-sound');

                if (composition[selectedSlot].length < 2) composition[selectedSlot].push(sound);

                if (composition[selectedSlot].length && selectedSlot < slots.length - 1) selectedSlot += 1;
                status.textContent = '';
                render();
            });
        });

        clearButton.addEventListener('click', function () {
            stopPlayback();
            composition = [[], [], [], []];
            selectedSlot = 0;
            status.textContent = '';
            render();
        });

        playButton.addEventListener('click', function () {
            if (composition.some(function (slot) { return slot.length === 0; })) {
                status.textContent = 'Completa le quattro caselle';
                return;
            }

            playSequence(slots, composition, playButton, status, 'Ripeti quattro volte');
        });

        render();
    })();

    /* ── scorrimento tra le due schermate ─────────────────────── */
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
        console.warn('[battito] GSAP / ScrollTrigger / Lenis non disponibili.');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    var lenis = new Lenis({ lerp: .08, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    var scrollElement = document.querySelector('.bintro-scroll');
    var screensElement = document.querySelector('.bintro-screens');
    var pinElement = document.getElementById('bintro-pin');
    var dots = document.querySelectorAll('.bintro-progress__dot');
    var screenCount = dots.length;
    var currentScreen = 0;

    if (!scrollElement || !screensElement || !screenCount) return;

    function screenHeight() {
        if (pinElement && pinElement.offsetHeight) return pinElement.offsetHeight;
        return window.innerHeight - (header ? header.offsetHeight : 0);
    }

    var slideTween = gsap.to(screensElement, {
        y: function () { return -(screenHeight() * (screenCount - 1)); },
        ease: 'none',
        scrollTrigger: {
            trigger: scrollElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: function (self) {
                var index = Math.min(screenCount - 1, Math.floor(self.progress * screenCount + .05));

                dots.forEach(function (dot, dotIndex) {
                    dot.classList.toggle('is-active', dotIndex === index);
                });

                if (index !== currentScreen) {
                    currentScreen = index;
                    stopPlayback();
                }

                if (stage) stage.dataset.activeScreen = String(index + 1);
            }
        }
    });
    var slideTrigger = slideTween.scrollTrigger;

    dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            var ratio = screenCount > 1 ? index / (screenCount - 1) : 0;
            var target = slideTrigger.start + ratio * (slideTrigger.end - slideTrigger.start);
            lenis.scrollTo(target, {
                duration: 1.2,
                easing: function (time) {
                    return time < .5 ? 2 * time * time : -1 + (4 - 2 * time) * time;
                }
            });
        });
    });

})();
