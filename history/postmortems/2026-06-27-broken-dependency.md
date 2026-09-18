# Postmortem: npm install 404s on main, every build blocked

- Incident: INC-1002
- Date: 2026-06-27
- Severity: sev2
- Time to resolve: 22 minutes
- Responder: @marie-ops

## What happened

A dependency was added with a typo in its name. The registry returns 404 and install exits non-zero before any test runs.

## What we did

Reverted the commit that added the dependency.

## What we learned

Nothing beyond the fix itself.

