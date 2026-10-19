(function () {
    'use strict';
    const score = window.MarchScore;
    const $ = (id) => document.getElementById(id);
    const grid = $('march-grid');
    if (!grid || !score) return;
    const play = $('march-play'), reset = $('march-reset'), finale = $('march-finale');
    const tempo = $('march-tempo'), bpmInput = $('march-bpm'), offsetInput = $('march-offset');
    const status = $('march-status'), count = $('march-count'), bar = $('march-bar');
    const guide = $('march-guide'), fileInput = $('march-audio'), removeAudio = $('march-remove-audio');
    const fileStatus = $('march-file-status');
    const patternButtons = [...document.querySelectorAll('[data-pattern]')];
    const barMarkers = [...document.querySelectorAll('.march-bars span')];
    const narrow = window.matchMedia('(max-width: 700px)');
    const names = ['Legnetti', 'Tamburello', 'Triangolo'];
    const drawings = [
        '<rect x="13" y="7" width="10" height="51" rx="4" fill="#b68754" stroke="#65482e" stroke-width="2" transform="rotate(-28 18 32)"/><rect x="38" y="7" width="10" height="51" rx="4" fill="#d4ac77" stroke="#65482e" stroke-width="2" transform="rotate(28 43 32)"/>',
        '<ellipse cx="32" cy="35" rx="25" ry="23" fill="#b97856" stroke="#704633" stroke-width="2"/><ellipse cx="32" cy="29" rx="25" ry="22" fill="#f7dfad" stroke="#704633" stroke-width="2"/><path d="M13 38v8m38-8v8M28 49v7" stroke="#704633" stroke-width="6"/><path d="M13 38v8m38-8v8M28 49v7" stroke="#dedbd3" stroke-width="3"/><path d="M20 16q12-7 24 1" fill="none" stroke="#fff9e9" stroke-width="3"/>',
        '<path d="M33 9 8 53h39M54 50 33 9" fill="none" stroke="#665f4d" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M33 9 8 53h39M54 50 33 9" fill="none" stroke="#d5d9d8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="m33 9 0-7" stroke="#665f4d" stroke-width="2"/><path d="m37 37 22-9" stroke="#665f4d" stroke-width="4" stroke-linecap="round"/><path d="m37 37 22-9" stroke="#e1e4e2" stroke-width="2" stroke-linecap="round"/>'
    ];
    let pattern = 'base', bpm = 84, playing = false, starting = false, loading = false;
    let ctx, master, noise, audioBuffer, musicSource;
    let anchor = 0, pausedAt = null, nextBeat = -4, finaleAt = Infinity;
    let timer = 0, animation = 0, lastIndex = null, pageKey = '', loadVersion = 0;
    const voices = new Set();

    function secondsPerBeat() { return 60 / bpm; }
    function elapsed() { return ctx.currentTime - anchor; }
    function controls() {
        play.textContent = playing ? 'Ⅱ Pausa' : pausedAt !== null ? '▶ Riprendi' : '▶ Inizia';
        play.disabled = starting || loading;
        reset.disabled = starting || (!playing && pausedAt === null && finaleAt === Infinity);
        finale.disabled = !playing || finaleAt !== Infinity;
        patternButtons.forEach(b => { b.disabled = playing || starting; });
        tempo.disabled = bpmInput.disabled = offsetInput.disabled = fileInput.disabled = playing || starting || loading;
        removeAudio.disabled = !audioBuffer || playing || starting || loading;
    }
    function render(index = 0, phase = 0, illuminate = false) {
        const ending = index >= finaleAt;
        const columns = narrow.matches || ending ? 4 : 8;
        const step = Math.max(0, index) % 16;
        const first = ending ? finaleAt : Math.floor(step / columns) * columns;
        const key = `${pattern}:${first}:${columns}:${ending}`;
        if (key !== pageKey) {
            pageKey = key;
            grid.style.setProperty('--columns', columns);
            grid.replaceChildren();
            const beats = document.createElement('div');
            beats.className = 'march-beats';
            beats.setAttribute('aria-hidden', 'true');
            beats.append(document.createElement('span'));
            for (let c = 0; c < columns; c++) {
                const beat = document.createElement('span');
                beat.className = 'march-beat' + (c === 4 ? ' is-bar-start' : '');
                beat.textContent = String(c % 4 + 1);
                beats.append(beat);
            }
            grid.append(beats);
            names.forEach((name, rowIndex) => {
                const row = document.createElement('div');
                row.className = 'march-row';
                row.dataset.instrument = score.instruments[rowIndex];
                row.setAttribute('role', 'group');
                row.setAttribute('aria-label', name);
                const label = document.createElement('button');
                label.type = 'button';
                label.className = 'march-instrument';
                label.setAttribute('aria-label', `Ascolta il suono: ${name}`);
                label.innerHTML = `<svg viewBox="0 0 64 64" aria-hidden="true">${drawings[rowIndex]}</svg><span>${name}</span>`;
                label.addEventListener('click', async () => {
                    try { await unlockAudio(); sound(rowIndex, ctx.currentTime + .01); }
                    catch (_) { status.textContent = 'Il suono non è disponibile in questo browser.'; }
                });
                row.append(label);
                for (let c = 0; c < columns; c++) {
                    const beat = first + c;
                    const isHit = score.hit(pattern, rowIndex, beat, ending ? finaleAt : Infinity);
                    const tile = document.createElement('div');
                    tile.className = `march-tile${isHit ? ' is-hit' : ''}${c === 4 ? ' is-bar-start' : ''}`;
                    tile.setAttribute('aria-label', `Battuta ${ending ? 'finale' : Math.floor(beat / 4) + 1}, pulsazione ${c % 4 + 1}: ${isHit ? 'un colpo' : 'aspetta'}`);
                    const symbol = document.createElement('span');
                    symbol.className = 'march-symbol';
                    symbol.setAttribute('aria-hidden', 'true');
                    symbol.textContent = isHit ? '●' : '–';
                    tile.append(symbol);
                    row.append(tile);
                }
                grid.append(row);
            });
        }
        const activeColumn = ending ? index - finaleAt : step - first;
        // Keep a single clear cue for most of the pulse; no flashing subdivisions.
        const light = illuminate && index >= 0 && phase < .82;
        grid.querySelectorAll('.march-row').forEach(row => {
            row.querySelectorAll('.march-tile').forEach((tile, i) => tile.classList.toggle('is-now', light && i === activeColumn));
        });
        grid.querySelectorAll('.march-beat').forEach((beat, i) => beat.classList.toggle('is-now', illuminate && index >= 0 && i === activeColumn));
        bar.textContent = ending ? 'Finale · tutti insieme' : columns === 4 ? `Battuta ${Math.floor(first / 4) + 1} di 4` : `Battute ${first / 4 + 1}–${first / 4 + 2} di 4`;
        barMarkers.forEach((marker, i) => marker.classList.toggle('is-current', !ending && i === Math.floor(step / 4)));
    }
    async function unlockAudio() {
        if (!ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) throw new Error('Audio non supportato');
            ctx = new AudioContext();
            master = ctx.createGain();
            master.gain.value = .55;
            master.connect(ctx.destination);
            noise = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * .3), ctx.sampleRate);
            const data = noise.getChannelData(0);
            for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
            ctx.addEventListener('statechange', () => {
                if (playing && ctx.state !== 'running') pause('In pausa. Premi Riprendi per continuare.');
            });
        }
        if (ctx.state !== 'running') await ctx.resume();
    }
    function tone(frequency, time, duration, volume, type = 'sine') {
        const osc = ctx.createOscillator(), gain = ctx.createGain();
        osc.type = type; osc.frequency.value = frequency;
        gain.gain.setValueAtTime(.0001, time);
        gain.gain.exponentialRampToValueAtTime(volume, time + .002);
        gain.gain.exponentialRampToValueAtTime(.0001, time + duration);
        osc.connect(gain); gain.connect(master);
        voices.add(osc);
        osc.onended = () => { voices.delete(osc); osc.disconnect(); gain.disconnect(); };
        osc.start(time); osc.stop(time + duration + .01);
    }
    function sound(row, time) {
        if (row === 0) {
            tone(1800, time, .065, .6); tone(2600, time, .035, .24);
        } else if (row === 1) {
            tone(170, time, .12, .45);
            const src = ctx.createBufferSource(), filter = ctx.createBiquadFilter(), gain = ctx.createGain();
            src.buffer = noise; filter.type = 'highpass'; filter.frequency.value = 2600;
            gain.gain.setValueAtTime(.4, time); gain.gain.exponentialRampToValueAtTime(.0001, time + .18);
            src.connect(filter); filter.connect(gain); gain.connect(master);
            voices.add(src);
            src.onended = () => { voices.delete(src); src.disconnect(); filter.disconnect(); gain.disconnect(); };
            src.start(time); src.stop(time + .2);
        } else {
            [1720, 2477, 3463].forEach((f, i) => tone(f, time, 1.4 - i * .2, .16 / (i + 1)));
        }
    }
    function silence() {
        clearInterval(timer); cancelAnimationFrame(animation);
        voices.forEach(v => { try { v.stop(); } catch (_) { /* already ended */ } });
        voices.clear();
        if (musicSource) { try { musicSource.stop(); } catch (_) { /* already ended */ } musicSource = null; }
    }
    function schedule() {
        if (!playing) return;
        const duration = secondsPerBeat();
        // A delayed tab must never release a burst of missed notes.
        const current = elapsed();
        if (anchor + nextBeat * duration < ctx.currentTime - .06) nextBeat = Math.ceil(current / duration);
        while (anchor + nextBeat * duration < ctx.currentTime + .09) {
            if (nextBeat >= finaleAt + 4) break;
            const time = anchor + nextBeat * duration;
            if (audioBuffer && nextBeat >= 0 && nextBeat * duration >= audioBuffer.duration - Number(offsetInput.value)) break;
            if (nextBeat < 0) tone(nextBeat === -4 ? 1000 : 700, time, .04, .2);
            else if (guide.checked) names.forEach((_, row) => {
                if (score.hit(pattern, row, nextBeat, finaleAt)) sound(row, time);
            });
            nextBeat++;
        }
    }
    function frame() {
        if (!playing) return;
        const time = elapsed(), pos = score.position(time, bpm);
        if (pos.index >= finaleAt + 4) { complete('Bravi! Un ultimo colpo insieme, poi silenzio.'); return; }
        if (audioBuffer && time >= audioBuffer.duration - Number(offsetInput.value)) { complete('Brano terminato. Bravi!'); return; }
        if (pos.index !== lastIndex) {
            lastIndex = pos.index;
            count.textContent = pos.index < 0 ? `Pronti: ${Math.max(1, pos.index + 5)}` : `Conta: ${pos.pulse + 1}`;
            if (pos.index === 0) status.textContent = audioBuffer ? 'Suoniamo con il brano. Segui il quadrato luminoso!' : 'Suoniamo! La sequenza si ripete: segui la tua riga.';
            if (pos.index === finaleAt) status.textContent = 'Tutti sull’1. Poi tre pulsazioni in silenzio.';
        }
        render(pos.index, pos.phase, true);
        animation = requestAnimationFrame(frame);
    }
    function pause(message = 'In pausa. Riprendi quando siete pronti.') {
        if (!playing) return;
        pausedAt = elapsed(); playing = false; silence();
        const pos = score.position(pausedAt, bpm);
        render(pos.index, pos.phase, false); count.textContent = 'Pausa';
        status.textContent = message; controls();
    }
    function resetPlayback(message = 'Quattro pulsazioni per prepararsi. Poi si suona insieme.') {
        playing = false; silence(); pausedAt = null; finaleAt = Infinity; pageKey = ''; lastIndex = null;
        count.textContent = 'Pronti?'; render(); status.textContent = message;
        finale.textContent = 'Finale tutti insieme'; controls();
    }
    function complete(message) { resetPlayback(message); count.textContent = 'Bravi!'; }
    async function start() {
        if (starting || loading) return;
        if (playing) { pause(); return; }
        const offset = Number(offsetInput.value);
        if (!Number.isFinite(offset) || offset < 0 || (audioBuffer && offset >= audioBuffer.duration)) {
            status.textContent = 'Scegli un punto di partenza compreso nella durata del brano.'; return;
        }
        starting = true; controls();
        try {
            await unlockAudio();
            const from = pausedAt === null ? -4 * secondsPerBeat() : pausedAt;
            anchor = ctx.currentTime + .12 - from;
            nextBeat = Math.max(-4, Math.ceil(from / secondsPerBeat() - 1e-8));
            if (audioBuffer) {
                musicSource = ctx.createBufferSource(); musicSource.buffer = audioBuffer;
                musicSource.connect(ctx.destination);
                musicSource.onended = () => { /* The common clock controls score completion. */ };
                musicSource.start(Math.max(anchor, ctx.currentTime + .12), offset + Math.max(0, from));
            }
            playing = true; lastIndex = null;
            status.textContent = from < 0 ? 'Ascolta il conteggio: 1, 2, 3, 4. Poi entra!' : 'Riprendiamo insieme.';
            schedule(); timer = setInterval(schedule, 25); frame();
        } catch (_) {
            playing = false; silence(); status.textContent = 'Non riesco ad avviare l’audio. Riprova con Inizia.';
        } finally { starting = false; controls(); }
    }
    play.addEventListener('click', start);
    reset.addEventListener('click', () => resetPlayback());
    finale.addEventListener('click', () => {
        const position = score.position(elapsed(), bpm);
        // Never choose a beat already scheduled inside the audio look-ahead.
        finaleAt = Math.max(0, score.nextBar(Math.max(position.index, nextBeat - 1)));
        finale.textContent = 'Finale alla prossima battuta';
        status.textContent = 'Preparati: alla prossima battuta suoniamo tutti sull’1.'; controls();
    });
    patternButtons.forEach(button => button.addEventListener('click', () => {
        pattern = button.dataset.pattern;
        patternButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
        resetPlayback(pattern === 'base' ? 'A · Legnetti su 1 e 3, tamburello su 2 e 4.' : 'B · I legnetti aggiungono un colpo sul 4.');
    }));
    function setTempo(value) {
        const number = Number(value);
        if (!Number.isFinite(number) || number < 40 || number > 180) {
            bpmInput.value = String(bpm); status.textContent = 'Scegli una velocità tra 40 e 180 pulsazioni al minuto.'; return;
        }
        bpm = Math.round(number); bpmInput.value = String(bpm);
        tempo.value = [60, 84, 120].includes(bpm) ? String(bpm) : 'custom';
        resetPlayback(`Velocità: ${bpm} pulsazioni al minuto.`);
    }
    tempo.addEventListener('change', () => {
        if (tempo.value === 'custom') { document.querySelector('.march-teacher').open = true; bpmInput.focus(); }
        else setTempo(tempo.value);
    });
    bpmInput.addEventListener('change', () => setTempo(bpmInput.value));
    offsetInput.addEventListener('change', () => resetPlayback('Punto di partenza aggiornato. Premi Inizia per provare.'));
    guide.addEventListener('change', () => {
        if (!guide.checked) { voices.forEach(v => { try { v.stop(); } catch (_) {} }); voices.clear(); }
    });
    fileInput.addEventListener('change', async () => {
        const file = fileInput.files[0];
        if (!file) return;
        resetPlayback(); const version = ++loadVersion; loading = true; controls();
        fileStatus.textContent = 'Caricamento del brano…';
        audioBuffer = null;
        try {
            if (file.size > 80 * 1024 * 1024) throw new Error('File troppo grande');
            await unlockAudio();
            const decoded = await ctx.decodeAudioData(await file.arrayBuffer());
            if (version !== loadVersion) return;
            audioBuffer = decoded; offsetInput.value = '0';
            fileStatus.textContent = `${file.name} · ${Math.floor(decoded.duration / 60)}:${String(Math.floor(decoded.duration % 60)).padStart(2, '0')}`;
            status.textContent = 'Brano pronto. Imposta velocità e prima pulsazione, poi premi Inizia.';
        } catch (_) {
            fileInput.value = ''; fileStatus.textContent = 'File non leggibile. Prova un MP3 o WAV più piccolo di 80 MB.';
        } finally { if (version === loadVersion) { loading = false; controls(); } }
    });
    removeAudio.addEventListener('click', () => {
        loadVersion++; audioBuffer = null; fileInput.value = ''; offsetInput.value = '0';
        fileStatus.textContent = 'Nessun brano caricato · prova con percussioni.'; resetPlayback();
    });
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && playing) pause('In pausa: la pagina non era visibile. Premi Riprendi.');
    });
    window.addEventListener('pagehide', () => { if (playing) pause(); else silence(); });
    const resize = () => { pageKey = ''; const pos = score.position(playing ? elapsed() : pausedAt || 0, bpm); render(pos.index, pos.phase, playing); };
    if (narrow.addEventListener) narrow.addEventListener('change', resize);
    else narrow.addListener(resize);
    render(); controls();
}());
