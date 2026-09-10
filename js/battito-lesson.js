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
    var bodySamplePromise = null;
    var activeBodySources = [];
    var bodySampleFiles = {
        mani:  ['../../../../assets/audio/body-percussion/mani-1.wav'],
        petto: ['../../../../assets/audio/body-percussion/petto-1.wav'],
        cosce: ['../../../../assets/audio/body-percussion/cosce-1.wav']
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

    function stopBodySounds() {
        activeBodySources.slice().forEach(function (source) {
            try { source.stop(); } catch (error) { /* Already ended. */ }
        });
        activeBodySources = [];
    }

    function playBodySound(name, delay, when) {
        if (name === 'silenzio') return;

        var ac = getAudioContext();
        if (!ac) return;

        var samples = bodySampleBuffers[name];
        if (!samples || !samples.length) return;

        var source = ac.createBufferSource();
        var gain = ac.createGain();
        source.buffer = samples[0];
        gain.gain.value = name === 'mani' ? .86 : 1;
        source.connect(gain);
        gain.connect(getBodyOutput(ac));
        activeBodySources.push(source);
        source.onended = function () {
            activeBodySources = activeBodySources.filter(function (item) { return item !== source; });
            source.disconnect();
            gain.disconnect();
        };
        source.start((when === undefined ? ac.currentTime : when) + (delay || 0));
    }

    function subdivisionDelay(soundIndex, soundCount, beatDuration) {
        if (soundCount < 2) return 0;
        return soundIndex * beatDuration / soundCount / 1000;
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
        mani:  '../../../../assets/lesson/body-percussion/mani-3d.png',
        petto: '../../../../assets/lesson/body-percussion/petto-coral-3d.png',
        cosce: '../../../../assets/lesson/body-percussion/cosce-3d.png'
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
        }).join(', poi ');
    }

    /* ── riproduzione condivisa ───────────────────────────────── */
    var currentPlaybackStop = null;

    function stopPlayback() {
        if (currentPlaybackStop) currentPlaybackStop();
        currentPlaybackStop = null;
        stopBodySounds();
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
                        playBodySound(sound, subdivisionDelay(soundIndex, sounds.length, beatLength));
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
        var tempoStrip = root.querySelector('.brl__tempo');
        var tempoOptions = root.querySelector('.brl__tempo-options');
        var metronomeVisualTimer = null;
        var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        var visibleBlock = null;

        function animateBlocks() {
            if (reducedMotion.matches) return;
            [mainGrid, previewGrid].forEach(function (grid) {
                grid.classList.remove('is-arriving');
                void grid.offsetWidth;
                grid.classList.add('is-arriving');
            });
        }

        function syncEchoButton(running) {
            echoRunning = running;
            playButton.classList.toggle('is-playing', running);
            playButton.setAttribute('aria-pressed', running ? 'true' : 'false');
            playButton.textContent = running ? 'Stop' : 'Ascolta';
            root.classList.toggle('is-playing', running);
        }

        function syncMetronomeButton(running) {
            if (!metronomeButton) return;
            metronomeButton.classList.toggle('is-active', running);
            metronomeButton.setAttribute('aria-pressed', running ? 'true' : 'false');
            metronomeButton.textContent = running ? 'Ferma' : 'Avvia';
            if (tempoStrip) tempoStrip.classList.toggle('is-running', running);
        }

        function metronomePulse() {
            playMetronomeClick(metronomeBeat % 4 === 0);
            metronomeBeat += 1;
            if (tempoStrip) {
                tempoStrip.classList.add('is-ticking');
                window.clearTimeout(metronomeVisualTimer);
                metronomeVisualTimer = window.setTimeout(function () {
                    tempoStrip.classList.remove('is-ticking');
                }, 200);
            }
        }

        function stopMetronome() {
            if (metronomeTimer !== null) window.clearInterval(metronomeTimer);
            metronomeTimer = null;
            metronomeBeat = 0;
            window.clearTimeout(metronomeVisualTimer);
            if (tempoStrip) tempoStrip.classList.remove('is-ticking');
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
                var gestureName = document.createElement('strong');
                var progress = document.createElement('span');
                tile.className = 'brl__tile';
                tile.setAttribute('aria-label', 'Movimento ' + ((startIndex + index) % 4 + 1) + ': ' + spokenGestureList(sounds));
                beat.className = 'brl__beat';
                beat.textContent = ('0' + ((startIndex + index) % 4 + 1)).slice(-2);
                label.className = 'brl__tile-label';
                renderGestureSet(label, sounds);
                tile.appendChild(beat);
                tile.appendChild(label);

                if (target === mainGrid) {
                    progress.className = 'brl__beat-progress';
                    progress.setAttribute('aria-hidden', 'true');
                    tile.appendChild(progress);
                    gestureName.className = 'brl__gesture-name';
                    gestureName.textContent = sounds.map(function (sound) {
                        return gestureNames[sound] || sound;
                    }).join(' → ');
                    tile.appendChild(gestureName);
                }

                target.appendChild(tile);
            });
        }

        function renderPattern(activeBlock, animate) {
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
            visibleBlock = activeBlock;
            if (animate) animateBlocks();
        }

        function render() {
            stopPlayback();
            root.classList.remove('is-changing');
            status.textContent = '';
            syncEchoButton(false);
            renderPattern(0);
            animateBlocks();
        }

        function playEchoSequence() {
            stopPlayback();
            var ac = getAudioContext();

            var sequence = patterns[patternIndex];
            var timer = null;
            var stopped = false;
            var beatIndex = 0;
            var nextBeatAt = 0;
            var nextAudioAt = 0;
            var gestureTimers = [];

            renderPattern(0);
            status.textContent = '';
            syncEchoButton(true);

            function clearHighlights() {
                Array.prototype.slice.call(root.querySelectorAll('.brl__tile.is-live')).forEach(function (tile) {
                    tile.classList.remove('is-live');
                });
                Array.prototype.slice.call(root.querySelectorAll('.brl__gesture-icon.is-struck')).forEach(function (icon) {
                    icon.classList.remove('is-struck');
                });
            }

            function stop() {
                if (stopped) return;
                stopped = true;
                if (timer !== null) window.clearTimeout(timer);
                gestureTimers.forEach(window.clearTimeout);
                stopBodySounds();
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
                var now = performance.now();

                // Absolute deadlines prevent animation/render cost accumulating as drift.
                // After a long stall restart cleanly; never cram missed beats together.
                if (now > nextBeatAt + beatLength * .1) {
                    nextBeatAt = now;
                    nextAudioAt = ac ? ac.currentTime : 0;
                }
                if (sequenceIndex % 4 === 0 && visibleBlock !== blockIndex) renderPattern(blockIndex, true);
                targetTile = mainGrid.children[sequenceIndex % 4];

                clearHighlights();
                gestureTimers.forEach(window.clearTimeout);
                gestureTimers = [];
                if (targetTile) {
                    targetTile.style.setProperty('--beat-duration', beatLength + 'ms');
                    targetTile.classList.add('is-live');
                }
                var icons = targetTile ? targetTile.querySelectorAll('.brl__gesture-icon') : [];
                // Capture after rendering: past Web Audio timestamps play immediately.
                // Both eighths share this actual epoch, including after a block swap.
                var audioWhen = ac ? Math.max(nextAudioAt, ac.currentTime) : nextAudioAt;
                sounds.forEach(function (sound, soundIndex) {
                    var delay = subdivisionDelay(soundIndex, sounds.length, beatLength);
                    playBodySound(sound, delay, audioWhen);
                    function strike() {
                        if (stopped) return;
                        Array.prototype.forEach.call(icons, function (icon, index) {
                            icon.classList.toggle('is-struck', index === soundIndex);
                        });
                    }
                    if (soundIndex === 0) strike();
                    else gestureTimers.push(window.setTimeout(strike, Math.max(0, (audioWhen + delay - (ac ? ac.currentTime : audioWhen)) * 1000)));
                });

                beatIndex += 1;
                nextBeatAt += beatLength;
                nextAudioAt += beatLength / 1000;
                timer = window.setTimeout(pulse, Math.max(0, nextBeatAt - performance.now()));
            }

            prepareBodySamples(ac).then(function () {
                if (!stopped) {
                    nextBeatAt = performance.now();
                    nextAudioAt = ac ? ac.currentTime : 0;
                    pulse();
                }
            });
        }

        patternButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                patternIndex = parseInt(button.getAttribute('data-pattern'), 10) || 0;
                patternButtons.forEach(function (item) {
                    var active = item === button;
                    item.classList.toggle('is-active', active);
                    item.setAttribute('aria-pressed', active ? 'true' : 'false');
                });
                render();
            });
        });

        tempoButtons.forEach(function (button, tempoIndex) {
            button.addEventListener('click', function () {
                var echoWasRunning = echoRunning;
                stopPlayback();
                var metronomeWasRunning = metronomeTimer !== null;
                beatLength = parseInt(button.getAttribute('data-beat-length'), 10) || 714;
                if (tempoOptions) tempoOptions.style.setProperty('--tempo-index', tempoIndex);

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

})();
