#!/usr/bin/env bash
# Flip one chaos flag, commit, push. CI then fails in that specific way.
#   ./scripts/break.sh flaky_checkout_test
#   ./scripts/break.sh fix          # turn everything back off
set -euo pipefail
cd "$(dirname "$0")/.."

FLAGS=(flaky_checkout_test broken_dependency type_error slow_build)

usage() { echo "usage: $0 {${FLAGS[*]} | fix}" >&2; exit 1; }
[ $# -eq 1 ] || usage

reset_all() {
  for f in "${FLAGS[@]}"; do
    jq --arg f "$f" '.[$f] = false' chaos.json > chaos.tmp && mv chaos.tmp chaos.json
  done
  git checkout -- src/pricing.js 2>/dev/null || true
}

case "$1" in
  fix)
    reset_all
    msg="fix: turn off all chaos flags"
    ;;
  type_error)
    reset_all
    jq '.type_error = true' chaos.json > chaos.tmp && mv chaos.tmp chaos.json
    # A real type annotation slipped into a .js file - the lint stage catches it.
    sed -i 's|export function applyDiscount(amount, percent) {|export function applyDiscount(amount: number, percent) {|' src/pricing.js
    msg="feat(pricing): annotate applyDiscount arguments"
    ;;
  flaky_checkout_test|broken_dependency|slow_build)
    reset_all
    jq --arg f "$1" '.[$f] = true' chaos.json > chaos.tmp && mv chaos.tmp chaos.json
    case "$1" in
      flaky_checkout_test) msg="chore(checkout): tighten the payment settle budget" ;;
      broken_dependency)   msg="chore(deps): pull in the padding helper" ;;
      slow_build)          msg="perf(build): add a full minify pass" ;;
    esac
    ;;
  *) usage ;;
esac

git add -A
git commit -m "$msg"
git push
echo "pushed: $msg"
echo "watch: gh run watch"
