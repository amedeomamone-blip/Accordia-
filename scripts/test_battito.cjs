// Dependency-free regression checks for the actual lesson script.
// Run with: node scripts/test_battito.cjs
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');

let now = 0, id = 0;
const jobs = new Map(), sounds = [], clicks = [];
class Element {
    constructor(cls = '') {
        this.className = cls;
        this.children = [];
        this.attrs = {};
        this.events = {};
        this.dataset = {};
        this.style = { setProperty() {}, removeProperty() {} };
        this._text = '';
        this.classList = {
            add: (...c) => { this.className = [...new Set(this.className.split(/\s+/).concat(c))].join(' '); },
            remove: (...c) => { this.className = this.className.split(/\s+/).filter(x => !c.includes(x)).join(' '); },
            contains: c => this.className.split(/\s+/).includes(c),
            toggle: (c, f) => {
                f = f ?? !this.classList.contains(c);
                this.classList[f ? 'add' : 'remove'](c);
                return f;
            }
        };
    }
    set textContent(v) { this._text = v; this.children = []; }
    get textContent() { return this._text; }
    set innerHTML(v) { this.children = []; }
    setAttribute(k, v) { this.attrs[k] = String(v); }
    getAttribute(k) { return this.attrs[k] ?? null; }
    appendChild(e) { this.children.push(e); e.parentElement = this; return e; }
    addEventListener(k, fn) { this.events[k] = fn; }
    click() { this.events.click?.({ currentTarget: this }); }
    querySelectorAll(s) {
        return this.children.flatMap(c => [
            ...(s.split('.').filter(Boolean).every(x => c.classList.contains(x)) ? [c] : []),
            ...c.querySelectorAll(s)
        ]);
    }
    querySelector(s) { return this.querySelectorAll(s)[0] ?? null; }
}

const ids = {}, root = ids['brl-echo'] = new Element('brl--echo');
for (const [name, cls] of [
    ['grid', 'brl__row--main'], ['preview-grid', 'brl__row--preview'],
    ['play', ''], ['status', '']
]) root.appendChild(ids['brl-echo-' + name] = new Element(cls));
root.appendChild(new Element('brl__preview'));
root.appendChild(new Element('brl__tempo'));
root.appendChild(new Element('brl__tempo-options'));
root.appendChild(ids['brl-metronome-toggle'] = new Element());
for (let i = 0; i < 5; i++) {
    const e = root.appendChild(new Element('brl__pattern'));
    e.setAttribute('data-pattern', i);
}
for (const ms of [1000, 714, 500]) {
    const e = root.appendChild(new Element('brl__tempo-option'));
    e.setAttribute('data-beat-length', ms);
    e.textContent = String(ms);
}

const param = () => ({ value: 0, setValueAtTime() {}, exponentialRampToValueAtTime() {} });
class AudioContext {
    constructor() { this.state = 'running'; this.destination = {}; }
    get currentTime() { return now / 1000; }
    createGain() { return { gain: param(), connect() {}, disconnect() {} }; }
    createDynamicsCompressor() {
        return { threshold: param(), knee: param(), ratio: param(), attack: param(), release: param(), connect() {} };
    }
    createBufferSource() {
        const s = {
            connect() {}, disconnect() {},
            start(when) { s.when = Math.max(when, now / 1000); s.at = now; s.name = s.buffer.name; s.stopped = false; sounds.push(s); },
            stop() { s.stopped = true; s.stopAt = now; }
        };
        return s;
    }
    createOscillator() {
        return { frequency: param(), connect() {}, stop() {}, start(when) { clicks.push({ when }); } };
    }
}
const media = { matches: false };
const win = {
    AudioContext,
    addEventListener() {},
    matchMedia: () => media,
    fetch: async () => ({ ok: true, arrayBuffer: async () => new ArrayBuffer(0) }),
    setTimeout(fn, delay = 0) { jobs.set(++id, { fn, at: now + delay }); return id; },
    clearTimeout(i) { jobs.delete(i); },
    setInterval(fn, delay) { jobs.set(++id, { fn, at: now + delay, interval: delay }); return id; },
    clearInterval(i) { jobs.delete(i); }
};
const docEvents = {};
const doc = {
    hidden: false,
    querySelector: () => null,
    getElementById: k => ids[k] ?? null,
    createElement: () => new Element(),
    addEventListener(k, fn) { (docEvents[k] ||= []).push(fn); }
};

let source = fs.readFileSync(path.join(__dirname, '../js/battito-lesson.js'), 'utf8');
// Only mock asset decoding; exercise the real audio, timers, rendering and controls.
source = source.replace('    (function setupEcho() {', `
    bodySampleBuffers = {mani:[{name:'mani'}], petto:[{name:'petto'}], cosce:[{name:'cosce'}]};
    prepareBodySamples = function() { return Promise.resolve(); };
    (function setupEcho() {`);
source = source.replace('        patternButtons.forEach(function (button) {', `
        window.__rhythmTest = {
            delay: subdivisionDelay, start: playEchoSequence, stop: stopPlayback,
            setPattern: function(i) { patternIndex = i; render(); }
        };
        patternButtons.forEach(function (button) {`);
vm.runInNewContext(source, { document: doc, window: win, performance: { now: () => now }, console: { warn() {} } });

function advance(to, late = 0) {
    for (let count = 0; count < 100000; count++) {
        const pair = [...jobs].sort((a, b) => a[1].at - b[1].at)[0];
        if (!pair || pair[1].at > to) { now = to; return; }
        const [key, job] = pair;
        jobs.delete(key);
        now = Math.min(to, Math.max(now, job.at) + late);
        if (job.interval) jobs.set(key, { ...job, at: now + job.interval });
        job.fn();
    }
    throw Error('Timer loop runaway');
}

(async () => {
    const api = win.__rhythmTest;
    assert(api, 'Test hook was not inserted');
    for (const ms of [1000, 714, 500]) {
        assert.equal(api.delay(0, 1, ms), 0);
        assert.equal(api.delay(0, 2, ms), 0);
        assert.equal(api.delay(1, 2, ms), ms / 2000);
    }
    root.querySelectorAll('.brl__tempo-option')[2].click();
    api.setPattern(4);
    api.start();
    await Promise.resolve();

    const icons = ids['brl-echo-grid'].children[0].querySelectorAll('.brl__gesture-icon');
    assert(icons[0].classList.contains('is-struck'));
    assert(!icons[1].classList.contains('is-struck'));
    advance(250);
    assert(!icons[0].classList.contains('is-struck'));
    assert(icons[1].classList.contains('is-struck'));
    advance(3999);
    assert.equal(root.getAttribute('data-active-block'), '2');
    const pattern = [
        ['cosce', 'petto'], ['mani'], ['cosce', 'petto'], ['mani', 'mani'],
        ['mani', 'petto'], ['cosce', 'mani'], ['petto', 'mani'], ['cosce', 'petto']
    ];
    const expected = pattern.flatMap((beat, b) => beat.map((name, i) => ({ name, when: b * .5 + i * .25 })));
    assert.deepEqual(sounds.map(s => ({ name: s.name, when: s.when })), expected);
    advance(4000);
    assert.equal(root.getAttribute('data-active-block'), '1');
    assert.equal(sounds.at(-2).when, 4);
    assert.equal(sounds.at(-1).when, 4.25);
    advance(4050);
    api.stop();
    assert.equal(sounds.at(-1).stopped, true, 'Stop must cancel the scheduled second eighth');
    const stoppedCount = sounds.length;
    advance(5000);
    assert.equal(sounds.length, stoppedCount);

    const metro = ids['brl-metronome-toggle'];
    metro.click();
    const clicksBefore = clicks.length;
    api.start();
    await Promise.resolve();
    api.stop();
    advance(now + 1100);
    assert(clicks.length > clicksBefore);
    assert.equal(metro.getAttribute('aria-pressed'), 'true');
    metro.click();

    // Rendering delays must not accumulate into a faster/slower rhythm.
    sounds.length = 0;
    api.setPattern(0);
    const epoch = now;
    api.start();
    await Promise.resolve();
    advance(epoch + 20000, 10);
    sounds.forEach((s, i) => {
        assert(Math.abs(s.when - (epoch / 1000 + i * .5)) <= .021);
        assert(Math.abs(s.at - (epoch + i * 500)) <= 20, 'Timer drift must stay bounded');
    });
    api.stop();

    // A delayed callback must not collapse two eighths or overlap the next beat.
    sounds.length = 0;
    api.setPattern(4);
    const stalledEpoch = now;
    api.start();
    await Promise.resolve();
    advance(stalledEpoch + 500);
    now = stalledEpoch + 1300; // Simulate 300 ms main-thread stall on beat three.
    advance(now);
    const delayedPair = sounds.slice(-2);
    assert.equal(delayedPair[0].at, stalledEpoch + 1300);
    assert(Math.abs(delayedPair[1].when - delayedPair[0].when - .25) < .00001);
    advance(stalledEpoch + 1799);
    assert.equal(sounds.at(-1), delayedPair[1]);
    advance(stalledEpoch + 1800);
    assert(sounds.at(-1).when >= delayedPair[1].when + .25 - .00001);
    api.stop();

    // Buttons expose selection without incomplete ARIA tab semantics.
    root.querySelectorAll('.brl__pattern')[2].click();
    assert.equal(root.querySelectorAll('.brl__pattern')[2].getAttribute('aria-pressed'), 'true');
    assert.equal(root.querySelectorAll('.brl__pattern')[1].getAttribute('aria-pressed'), 'false');
    media.matches = true;
    api.start();
    await Promise.resolve();
    metro.click();
    doc.hidden = true;
    docEvents.visibilitychange.forEach(fn => fn());
    assert.equal(metro.getAttribute('aria-pressed'), 'false');
    assert.equal(ids['brl-echo-play'].getAttribute('aria-pressed'), 'false');
    console.log('PASS: eighths, visual subdivisions, alternating 4+4 loop, cancellation, independent metronome, bounded drift, selection and hidden-page stop.');
})().catch(error => { console.error(error); process.exitCode = 1; });
