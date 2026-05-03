#!/bin/zsh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LOG_DIR="$ROOT_DIR/.studio-logs"
STUDIO_URL="http://127.0.0.1:5173/timeline"
STATIC_URL="http://127.0.0.1:8000/timeline/index.html"
VSCODE_BIN="/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code"

mkdir -p "$LOG_DIR"

ensure_studio_deps() {
  if [ ! -d "$ROOT_DIR/studio/node_modules" ]; then
    (cd "$ROOT_DIR/studio" && npm install)
  fi
}

ensure_server() {
  local port="$1"
  local command="$2"
  local log_file="$3"

  if lsof -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1; then
    return 0
  fi

  nohup zsh -lc "cd '$ROOT_DIR' && $command" >"$log_file" 2>&1 &
}

run_detached() {
  nohup zsh -lc "$1" >/dev/null 2>&1 &
}

ensure_static_preview() {
  if curl -sf "$STATIC_URL" >/dev/null 2>&1; then
    return 0
  fi

  local pid=""
  pid="$(lsof -nP -iTCP:8000 -sTCP:LISTEN -t 2>/dev/null | head -n 1 || true)"
  if [ -n "$pid" ]; then
    local command=""
    command="$(ps -p "$pid" -o command= 2>/dev/null || true)"
    if [[ "$command" == *"http.server 8000"* ]]; then
      kill "$pid" >/dev/null 2>&1 || true
      sleep 0.5
    fi
  fi

  ensure_server 8000 "make serve" "$LOG_DIR/static.log"
}

ensure_studio_deps
ensure_static_preview
ensure_server 5173 "cd studio && npm run dev -- --host 127.0.0.1" "$LOG_DIR/studio.log"

for _ in {1..40}; do
  if curl -sf "$STUDIO_URL" >/dev/null 2>&1; then
    break
  fi
  sleep 0.5
done

run_detached "open -a 'Visual Studio Code' '$ROOT_DIR'"
run_detached "'$VSCODE_BIN' -r -g '$ROOT_DIR/studio/src/pages/TimelinePage.jsx:1'"
sleep 1
run_detached "open 'vscode://command/simpleBrowser.show?%5B%22http%3A%2F%2F127.0.0.1%3A5173%2Ftimeline%22%5D'"
sleep 0.5
run_detached "open 'vscode://command/piny.open'"

if curl -sf "$STATIC_URL" >/dev/null 2>&1; then
  run_detached "open '$STATIC_URL'"
fi
