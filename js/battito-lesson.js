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

    /* ── campioni reali di body percussion (CC0) ──────────────── */
    var audioContext = null;
    var bodyOutput = null;
    var bodySampleData = {};
    var bodySampleBuffers = {};
    var bodySampleCursor = { mani: 0, petto: 0, cosce: 0 };
    var bodySamplePromise = null;
    var bodySampleFiles = {
        mani: [
            '../../../../assets/audio/body-percussion/mani-1.wav',
            '../../../../assets/audio/body-percussion/mani-2.wav'
        ],
        petto: [
            '../../../../assets/audio/body-percussion/petto-1.wav',
            '../../../../assets/audio/body-percussion/petto-2.wav'
        ],
        cosce: [
            '../../../../assets/audio/body-percussion/cosce-1.wav',
            '../../../../assets/audio/body-percussion/cosce-2.wav'
        ]
    };

    function getAudioContext() {
        if (!audioContext) {
            var AudioCtor = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtor) return null;
            audioContext = new AudioCtor();
        }
        if (audioContext.state === 'suspended') audioContext.resume().catch(function () {});
        return audioContext;
    }

    function getBodyOutput(ac) {
        if (bodyOutput) return bodyOutput;

        var compressor = ac.createDynamicsCompressor();
        var master = ac.createGain();
        compressor.threshold.value = -22;
        compressor.knee.value = 18;
        compressor.ratio.value = 5;
        compressor.attack.value = .003;
        compressor.release.value = .14;
        master.gain.value = .82;
        compressor.connect(master);
        master.connect(ac.destination);
        bodyOutput = compressor;
        return bodyOutput;
    }

    function preloadBodySampleData() {
        if (bodySamplePromise) return bodySamplePromise;

        bodySamplePromise = Promise.all(Object.keys(bodySampleFiles).map(function (name) {
            return Promise.all(bodySampleFiles[name].map(function (source) {
                return window.fetch(source).then(function (response) {
                    if (!response.ok) throw new Error('Campione non disponibile: ' + source);
                    return response.arrayBuffer();
                });
            })).then(function (buffers) {
                bodySampleData[name] = buffers;
            });
        })).catch(function (error) {
            console.warn('[battito] Impossibile caricare i campioni corporei.', error);
        });

        return bodySamplePromise;
    }

    function decodeBodySample(ac, data) {
        return new Promise(function (resolve, reject) {
            ac.decodeAudioData(data.slice(0), resolve, reject);
        });
    }

    function prepareBodySamples(ac) {
        if (!ac) return Promise.resolve();
        if (bodySampleBuffers.mani) return Promise.resolve();

        return preloadBodySampleData().then(function () {
            return Promise.all(Object.keys(bodySampleFiles).map(function (name) {
                var samples = bodySampleData[name] || [];
                return Promise.all(samples.map(function (data) {
                    return decodeBodySample(ac, data);
                })).then(function (buffers) {
                    bodySampleBuffers[name] = buffers;
                });
            }));
        }).catch(function (error) {
            console.warn('[battito] Impossibile preparare i campioni corporei.', error);
        });
    }

    function playBodySound(name, delay) {
        if (name === 'silenzio') return;

        var ac = getAudioContext();
        if (!ac) return;

        var samples = bodySampleBuffers[name];
        if (!samples || !samples.length) return;

        var sampleIndex = bodySampleCursor[name] % samples.length;
        var source = ac.createBufferSource();
        var gain = ac.createGain();
        source.buffer = samples[sampleIndex];
        bodySampleCursor[name] += 1;
        gain.gain.value = name === 'mani' ? .86 : 1;
        source.connect(gain);
        gain.connect(getBodyOutput(ac));
        source.start(ac.currentTime + (delay || 0));
    }

    preloadBodySampleData();

    function playMetronomeClick(accent) {
        var ac = getAudioContext();
        if (!ac) return;

        var when = ac.currentTime;
        var oscillator = ac.createOscillator();
        var gain = ac.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(accent ? 1320 : 980, when);
        gain.gain.setValueAtTime(accent ? .075 : .045, when);
        gain.gain.exponentialRampToValueAtTime(.001, when + .035);

        oscillator.connect(gain);
        gain.connect(ac.destination);
        oscillator.start(when);
        oscillator.stop(when + .045);
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

    function playSequence(tiles, sequence, button, status, doneText, beatDuration) {
        stopPlayback();
        var ac = getAudioContext();

        var timers = [];
        var stopped = false;
        var beatLength = beatDuration || 714;

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

        prepareBodySamples(ac).then(function () {
            if (stopped) return;

            sequence.forEach(function (sounds, index) {
                timers.push(window.setTimeout(function () {
                    if (stopped) return;
                    tiles.forEach(function (tile, tileIndex) {
                        tile.classList.toggle('is-live', tileIndex === index);
                    });
                    sounds.forEach(function (sound, soundIndex) {
                        playBodySound(sound, soundIndex * beatLength / sounds.length / 1000);
                    });
                }, index * beatLength));
            });

            timers.push(window.setTimeout(function () {
                stop();
                status.textContent = doneText;
                currentPlaybackStop = null;
            }, sequence.length * beatLength));
        });
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
                ['mani'], ['mani'], ['mani'], ['mani']
            ],
            [
                ['cosce'], ['petto'], ['cosce'], ['mani'],
                ['petto'], ['cosce'], ['mani'], ['mani']
            ],
            [
                ['cosce'], ['mani'], ['cosce', 'petto'], ['mani'],
                ['petto'], ['cosce', 'mani'], ['petto'], ['mani', 'mani']
            ],
            [
                ['cosce', 'petto'], ['mani'], ['petto'], ['cosce', 'mani'],
                ['mani', 'mani'], ['cosce'], ['petto', 'mani'], ['cosce']
            ],
            [
                ['cosce', 'petto'], ['mani'], ['cosce', 'petto'], ['mani', 'mani'],
                ['mani', 'petto'], ['cosce', 'mani'], ['petto', 'mani'], ['cosce', 'petto']
            ]
        ];
        var patternIndex = 0;
        var patternButtons = Array.prototype.slice.call(root.querySelectorAll('.brl__pattern'));
        var mainGrid = document.getElementById('brl-echo-grid');
        var previewGrid = document.getElementById('brl-echo-preview-grid');
        var preview = root.querySelector('.brl__preview');
        var playButton = document.getElementById('brl-echo-play');
        var status = document.getElementById('brl-echo-status');
        var tempoButtons = Array.prototype.slice.call(root.querySelectorAll('.brl__tempo-option'));
        var metronomeButton = document.getElementById('brl-metronome-toggle');
        var beatLength = 714;
        var metronomeTimer = null;
        var metronomeBeat = 0;
        var echoRunning = false;

        function syncEchoButton(running) {
            echoRunning = running;
            playButton.classList.toggle('is-playing', running);
            playButton.setAttribute('aria-pressed', running ? 'true' : 'false');
            playButton.textContent = running ? 'Stop' : 'Ascolta';
        }

        function syncMetronomeButton(running) {
            if (!metronomeButton) return;
            metronomeButton.classList.toggle('is-active', running);
            metronomeButton.setAttribute('aria-pressed', running ? 'true' : 'false');
            metronomeButton.textContent = running ? 'Ferma' : 'Avvia';
        }

        function metronomePulse() {
            playMetronomeClick(metronomeBeat % 4 === 0);
            metronomeBeat += 1;
        }

        function stopMetronome() {
            if (metronomeTimer !== null) window.clearInterval(metronomeTimer);
            metronomeTimer = null;
            metronomeBeat = 0;
            syncMetronomeButton(false);
        }

        function startMetronome() {
            stopMetronome();
            getAudioContext();
            metronomePulse();
            metronomeTimer = window.setInterval(metronomePulse, beatLength);
            syncMetronomeButton(true);
        }

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

        function renderPattern(activeBlock) {
            var sequence = patterns[patternIndex];
            var firstBlock = sequence.slice(0, 4);
            var secondBlock = sequence.slice(4, 8);
            var mainBlock = activeBlock === 1 ? secondBlock : firstBlock;
            var previewBlock = activeBlock === 1 ? firstBlock : secondBlock;
            var mainLabel = activeBlock === 1 ? 'Seconda battuta in esecuzione' : 'Prima battuta in esecuzione';
            var previewLabel = activeBlock === 1 ? 'Anteprima della prima battuta' : 'Anteprima della seconda battuta';

            root.setAttribute('data-active-block', String(activeBlock + 1));
            mainGrid.setAttribute('aria-label', mainLabel + ', movimenti da 1 a 4');
            previewGrid.setAttribute('aria-label', previewLabel + ', movimenti da 1 a 4');
            renderTiles(mainGrid, mainBlock, 0);
            renderTiles(previewGrid, previewBlock, 0);
            preview.classList.remove('is-blank');
            preview.setAttribute('aria-hidden', 'false');
        }

        function render() {
            stopPlayback();
            root.classList.remove('is-changing');
            status.textContent = '';
            syncEchoButton(false);
            renderPattern(0);
        }

        function playEchoSequence() {
            stopPlayback();
            var ac = getAudioContext();

            var sequence = patterns[patternIndex];
            var timer = null;
            var stopped = false;
            var beatIndex = 0;

            renderPattern(0);
            status.textContent = '';
            syncEchoButton(true);

            function clearHighlights() {
                Array.prototype.slice.call(root.querySelectorAll('.brl__tile.is-live')).forEach(function (tile) {
                    tile.classList.remove('is-live');
                });
            }

            function stop() {
                if (stopped) return;
                stopped = true;
                if (timer !== null) window.clearTimeout(timer);
                root.classList.remove('is-changing');
                clearHighlights();
                renderPattern(0);
                syncEchoButton(false);
                status.textContent = '';
            }

            currentPlaybackStop = stop;

            function pulse() {
                if (stopped) return;

                var sequenceIndex = beatIndex % sequence.length;
                var blockIndex = sequenceIndex < 4 ? 0 : 1;
                var sounds = sequence[sequenceIndex];
                var targetTile;

                if (sequenceIndex % 4 === 0) renderPattern(blockIndex);
                targetTile = mainGrid.children[sequenceIndex % 4];

                clearHighlights();
                if (targetTile) targetTile.classList.add('is-live');
                sounds.forEach(function (sound, soundIndex) {
                    playBodySound(sound, soundIndex * beatLength / sounds.length / 1000);
                });

                beatIndex += 1;
                timer = window.setTimeout(pulse, beatLength);
            }

            prepareBodySamples(ac).then(function () {
                if (!stopped) pulse();
            });
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

        tempoButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var echoWasRunning = echoRunning;
                stopPlayback();
                var metronomeWasRunning = metronomeTimer !== null;
                beatLength = parseInt(button.getAttribute('data-beat-length'), 10) || 714;

                tempoButtons.forEach(function (item) {
                    var active = item === button;
                    item.classList.toggle('is-active', active);
                    item.setAttribute('aria-pressed', active ? 'true' : 'false');
                });

                status.textContent = button.textContent + ' · ' + Math.round(60000 / beatLength) + ' BPM';
                renderPattern(0);
                if (metronomeWasRunning) startMetronome();
                if (echoWasRunning) playEchoSequence();
            });
        });

        if (metronomeButton) {
            metronomeButton.addEventListener('click', function () {
                if (metronomeTimer !== null) {
                    stopMetronome();
                    return;
                }

                startMetronome();
            });
        }

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) stopMetronome();
        });

        playButton.addEventListener('click', function () {
            if (echoRunning) {
                stopPlayback();
                return;
            }
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
