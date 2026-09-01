#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

pattern='BEGIN (RSA |OPENSSH |EC |DSA )?PRIVATE KEY|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-|sk_live_[A-Za-z0-9]+|sk_test_[A-Za-z0-9]+|AIza[0-9A-Za-z_-]{20,}|-----BEGIN CERTIFICATE-----'

matches="$(git grep -I -l -E "$pattern" -- ':!package-lock.json' ':!SECURITY.md' ':!scripts/security-check.sh' || true)"

if [[ -n "$matches" ]]; then
  echo "Potential credential patterns found in tracked files:"
  echo "$matches"
  echo "File names only are printed. Rotate any real credential immediately."
  exit 1
fi

echo "No credential patterns found in tracked source."
