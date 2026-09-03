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

    /* ── timbri corporei sintetici, senza asset esterni ───────── */
    var audioContext = null;
    var bodyOutput = null;
    var noiseBuffer = null;

    function getAudioContext() {
        if (!audioContext) {
            var AudioCtor = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtor) return null;
            audioContext = new AudioCtor();
        }
        if (audioContext.state === 'suspended') audioContext.resume();
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
        master.gain.value = .72;
        compressor.connect(master);
        master.connect(ac.destination);
        bodyOutput = compressor;
        return bodyOutput;
    }

    function getNoiseBuffer(ac) {
        if (noiseBuffer) return noiseBuffer;

        var frameCount = Math.floor(ac.sampleRate * .24);
        var buffer = ac.createBuffer(1, frameCount, ac.sampleRate);
        var data = buffer.getChannelData(0);
        for (var index = 0; index < frameCount; index += 1) {
            data[index] = Math.random() * 2 - 1;
        }
        noiseBuffer = buffer;
        return noiseBuffer;
    }

    function playNoiseLayer(ac, when, settings) {
        var source = ac.createBufferSource();
        var filter = ac.createBiquadFilter();
        var gain = ac.createGain();
        var start = when + (settings.offset || 0);
        var end = start + settings.duration;

        source.buffer = getNoiseBuffer(ac);
        filter.type = settings.filter;
        filter.frequency.setValueAtTime(settings.frequency, start);
        filter.Q.value = settings.q || .7;
        gain.gain.setValueAtTime(.0001, start);
        gain.gain.linearRampToValueAtTime(settings.gain, start + .004);
        gain.gain.exponentialRampToValueAtTime(.001, end);

        source.connect(filter);
        filter.connect(gain);
        gain.connect(getBodyOutput(ac));
        source.start(start);
        source.stop(end + .02);
    }

    function playToneLayer(ac, when, settings) {
        var oscillator = ac.createOscillator();
        var gain = ac.createGain();
        var end = when + settings.duration;

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(settings.from, when);
        oscillator.frequency.exponentialRampToValueAtTime(settings.to, end);
        gain.gain.setValueAtTime(settings.gain, when);
        gain.gain.exponentialRampToValueAtTime(.001, end);

        oscillator.connect(gain);
        gain.connect(getBodyOutput(ac));
        oscillator.start(when);
        oscillator.stop(end + .02);
    }

    function playBodySound(name, delay) {
        if (name === 'silenzio') return;

        var ac = getAudioContext();
        if (!ac) return;

        var when = ac.currentTime + (delay || 0);

        if (name === 'mani') {
            playNoiseLayer(ac, when, { filter: 'bandpass', frequency: 1850, q: .75, gain: .2, duration: .065 });
            playNoiseLayer(ac, when, { filter: 'highpass', frequency: 950, q: .55, gain: .12, duration: .055, offset: .016 });
            playNoiseLayer(ac, when, { filter: 'highpass', frequency: 1250, q: .55, gain: .07, duration: .04, offset: .034 });
            return;
        }

        if (name === 'cosce') {
            playNoiseLayer(ac, when, { filter: 'bandpass', frequency: 330, q: .7, gain: .28, duration: .105 });
            playToneLayer(ac, when, { from: 105, to: 58, gain: .17, duration: .13 });
            return;
        }

        if (name === 'petto') {
            playNoiseLayer(ac, when, { filter: 'lowpass', frequency: 290, q: .65, gain: .25, duration: .125 });
            playToneLayer(ac, when, { from: 78, to: 44, gain: .24, duration: .18 });
            return;
        }

        if (name === 'piedi') {
            playNoiseLayer(ac, when, { filter: 'lowpass', frequency: 190, q: .75, gain: .3, duration: .11 });
            playToneLayer(ac, when, { from: 62, to: 38, gain: .22, duration: .15 });
        }
    }

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
        getAudioContext();

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

        function renderPattern() {
            var sequence = patterns[patternIndex];
            var firstBlock = sequence.slice(0, 4);
            var secondBlock = sequence.slice(4, 8);

            mainGrid.setAttribute('aria-label', 'Prima battuta, movimenti da 1 a 4');
            previewGrid.setAttribute('aria-label', 'Seconda battuta, movimenti da 1 a 4');
            renderTiles(mainGrid, firstBlock, 0);
            renderTiles(previewGrid, secondBlock, 4);
            preview.classList.remove('is-blank');
            preview.setAttribute('aria-hidden', 'false');
        }

        function render() {
            stopPlayback();
            root.classList.remove('is-changing');
            status.textContent = '';
            syncEchoButton(false);
            renderPattern();
        }

        function playEchoSequence() {
            stopPlayback();
            getAudioContext();

            var sequence = patterns[patternIndex];
            var timer = null;
            var stopped = false;
            var beatIndex = 0;

            renderPattern();
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
                syncEchoButton(false);
                status.textContent = '';
            }

            currentPlaybackStop = stop;

            function pulse() {
                if (stopped) return;

                var sequenceIndex = beatIndex % sequence.length;
                var sounds = sequence[sequenceIndex];
                var targetGrid = sequenceIndex < 4 ? mainGrid : previewGrid;
                var targetTile = targetGrid.children[sequenceIndex % 4];

                clearHighlights();
                if (targetTile) targetTile.classList.add('is-live');
                sounds.forEach(function (sound, soundIndex) {
                    playBodySound(sound, soundIndex * .18);
                });

                beatIndex += 1;
                timer = window.setTimeout(pulse, beatLength);
            }

            pulse();
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
                renderPattern();
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
