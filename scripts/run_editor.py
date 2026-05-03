from __future__ import annotations

import json
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

import render_nuclei


ROOT = Path(__file__).resolve().parents[1]
HOST = "127.0.0.1"
PORT = 8001


class AccordiaEditorHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/__editor_api/config":
            payload = render_nuclei.get_editor_payload()
            self._send_json(payload)
            return
        super().do_GET()

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path != "/__editor_api/save":
            self.send_error(HTTPStatus.NOT_FOUND, "Endpoint non trovato")
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
            raw_payload = self.rfile.read(length)
            payload = json.loads(raw_payload.decode("utf-8"))

            timeline_page = payload["timeline_page"]
            nuclei = payload["nuclei"]
            element_overrides = payload.get("element_overrides", {})

            render_nuclei.save_timeline_page_data(timeline_page)
            render_nuclei.save_nuclei_overrides(nuclei)
            render_nuclei.save_element_overrides(element_overrides)
            render_nuclei.main()

            self._send_json({"ok": True})
        except Exception as exc:  # pragma: no cover - local tool endpoint
            self._send_json({"ok": False, "error": str(exc)}, status=HTTPStatus.BAD_REQUEST)

    def _send_json(self, payload: dict, status: int = HTTPStatus.OK) -> None:
        encoded = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)


def main() -> None:
    server = ThreadingHTTPServer((HOST, PORT), AccordiaEditorHandler)
    print(f"Accordia editor disponibile su http://{HOST}:{PORT}/editor/")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nChiusura editor.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
