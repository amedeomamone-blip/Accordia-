.PHONY: build check-links serve editor

build:
	python3 scripts/render_nuclei.py

check-links:
	python3 scripts/check_links.py

serve:
	python3 -m http.server 8000

editor:
	python3 scripts/run_editor.py
