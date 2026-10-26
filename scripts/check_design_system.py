"""Check the shared masthead and teaching-interface contract without a browser."""
from pathlib import Path
from html.parser import HTMLParser
import re

ROOT = Path(__file__).resolve().parents[1]

class HeaderParser(HTMLParser):
    def __init__(self):
        super().__init__(); self.inside = False; self.headers = []; self.current = None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'header' and 'site-header' in a.get('class', '').split():
            self.inside = True; self.current = {'text': '', 'links': [], 'nav': False}
        if self.inside and tag == 'a': self.current['links'].append(a)
        if self.inside and tag == 'nav': self.current['nav'] = True
    def handle_endtag(self, tag):
        if tag == 'header' and self.inside:
            self.headers.append(self.current); self.inside = False
    def handle_data(self, text):
        if self.inside: self.current['text'] += text

count = 0
for path in ROOT.rglob('*.html'):
    html = path.read_text(); parser = HeaderParser(); parser.feed(html)
    if not parser.headers: continue
    assert len(parser.headers) == 1, path
    h = parser.headers[0]
    assert h['text'].strip() == 'amedeo' and len(h['links']) == 1 and not h['nav'], path
    assert (path.parent / h['links'][0]['href']).resolve() == ROOT / 'index.html', path
    assert 'accordia-design-system.css' in html, path
    assert 'brand--wordmark' in h['links'][0].get('class', ''), path
    count += 1

for folder in ['lettura', 'ritmo']:
    for path in (ROOT / 'pratica' / folder).rglob('index.html'):
        html = path.read_text()
        if 'http-equiv="refresh"' in html.lower(): continue
        assert 'data-design-system="practice"' in html, path
        if 'argomenti' in path.parts:
            assert any(token in html for token in ['figure-lesson__progress', 'bintro-progress', 'topic-rail']), path

def luminance(hex_color):
    channels = [int(hex_color[i:i+2], 16) / 255 for i in (1, 3, 5)]
    linear = [c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4 for c in channels]
    return sum(c * w for c, w in zip(linear, [.2126, .7152, .0722]))
def ratio(a, b):
    hi, lo = sorted([luminance(a), luminance(b)], reverse=True)
    return (hi + .05) / (lo + .05)
css = (ROOT / 'css/accordia-design-system.css').read_text()
ink = re.search(r'--ui-ink:\s*(#[0-9a-f]+)', css).group(1)
muted = re.search(r'--ui-muted:\s*(#[0-9a-f]+)', css).group(1)
border = re.search(r'--ui-border:\s*(#[0-9a-f]+)', css).group(1)
for surface in ['#ffffff', '#e8e8e8', '#a6bbd2', '#b9c7a6']:
    assert ratio(ink, surface) >= 4.5, (ink, surface)
assert ratio(muted, '#ffffff') >= 4.5
for surface in ['#ffffff', '#e8e8e8']:
    assert ratio(border, surface) >= 3, (border, surface)
print(f'OK: {count} consistent headers; lesson navigation retained; shared text/control contrast tokens pass.')
