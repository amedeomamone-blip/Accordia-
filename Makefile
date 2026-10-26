.PHONY: build check-links check-design verify serve

build:
	python3 scripts/render_nuclei.py

check-links:
	python3 scripts/check_links.py

check-design:
	python3 scripts/check_design_system.py

verify: build check-links check-design

serve:
	python3 -m http.server 8000
