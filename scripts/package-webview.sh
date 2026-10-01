#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
version=$(node -p "require('./package.json').version")
out="release/vox-ui-webview-${version}.zip"
mkdir -p release
rm -f "$out"
(cd dist-webview && zip -qr "../$out" .)
echo "$out"
