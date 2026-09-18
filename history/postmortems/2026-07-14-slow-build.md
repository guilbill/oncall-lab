# Postmortem: Build stage hits the 2 minute timeout

- Incident: INC-1005
- Date: 2026-07-14
- Severity: sev2
- Time to resolve: 40 minutes
- Responder: @marie-ops

## What happened

A full minify pass was enabled on every build. It takes roughly 7 minutes, well past the step timeout, so the job is cancelled rather than failed.

## What we did

Limited the minify pass to release builds.

## What we learned

Nothing beyond the fix itself.

