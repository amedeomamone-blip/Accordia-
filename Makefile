.PHONY: build check-links serve studio-install studio-dev studio-build

build:
	python3 scripts/render_nuclei.py

check-links:
	python3 scripts/check_links.py

serve:
	python3 -m http.server 8000

studio-install:
	cd studio && npm install

studio-dev:
	cd studio && npm run dev

studio-build:
	cd studio && npm run build
