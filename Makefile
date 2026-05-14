.PHONY: build check-links verify serve

build:
	python3 scripts/render_nuclei.py

check-links:
	python3 scripts/check_links.py

verify: build check-links

serve:
	python3 -m http.server 8000
