from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
HTML_LINK_RE = re.compile(r"""(?:href|src)=["']([^"']+)["']""")
HTML_ID_RE = re.compile(r"""\bid=["']([^"']+)["']""")
HTML_NAMED_ANCHOR_RE = re.compile(r"""<a\b[^>]*\bname=["']([^"']+)["'][^>]*>""", re.IGNORECASE)
EXTERNAL_PREFIXES = ("http://", "https://", "//", "mailto:", "tel:", "data:", "javascript:")


def collect_html_files() -> list[Path]:
    return sorted(ROOT.rglob("*.html"))


def collect_fragment_targets(html_path: Path, cache: dict[Path, set[str]]) -> set[str]:
    if html_path not in cache:
        content = html_path.read_text(encoding="utf-8", errors="ignore")
        ids = set(HTML_ID_RE.findall(content))
        ids.update(HTML_NAMED_ANCHOR_RE.findall(content))
        cache[html_path] = ids
    return cache[html_path]


def main() -> int:
    html_files = collect_html_files()
    missing_files: list[tuple[Path, str, Path]] = []
    missing_fragments: list[tuple[Path, str, Path, str]] = []
    fragment_cache: dict[Path, set[str]] = {}
    root_resolved = ROOT.resolve()

    for html_path in html_files:
        content = html_path.read_text(encoding="utf-8", errors="ignore")
        for match in HTML_LINK_RE.finditer(content):
            target = match.group(1)
            if not target or target.startswith(EXTERNAL_PREFIXES):
                continue

            parsed = urlsplit(target)
            path = unquote(parsed.path)
            fragment = unquote(parsed.fragment)

            resolved = html_path.resolve() if not path else (html_path.parent / path).resolve()
            try:
                relative_resolved = resolved.relative_to(root_resolved)
            except ValueError:
                continue

            if not resolved.exists():
                missing_files.append((html_path.relative_to(ROOT), target, relative_resolved))
                continue

            if fragment and resolved.suffix.lower() == ".html":
                fragment_targets = collect_fragment_targets(resolved, fragment_cache)
                if fragment not in fragment_targets:
                    missing_fragments.append(
                        (html_path.relative_to(ROOT), target, relative_resolved, fragment)
                    )

    if missing_files or missing_fragments:
        for source, target, resolved in missing_files:
            print(f"{source} -> {target} [missing: {resolved}]")
        for source, target, resolved, fragment in missing_fragments:
            print(f"{source} -> {target} [missing fragment: {resolved}#{fragment}]")
        print(
            "\nBroken local links: "
            f"{len(missing_files) + len(missing_fragments)} "
            f"({len(missing_files)} files, {len(missing_fragments)} fragments)"
        )
        return 1

    print(f"OK: checked {len(html_files)} HTML files, no broken local links or fragments.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
