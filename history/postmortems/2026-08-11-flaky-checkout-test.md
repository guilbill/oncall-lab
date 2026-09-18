# Postmortem: Checkout test now fails through the retry

- Incident: INC-1009
- Date: 2026-08-11
- Severity: sev2
- Time to resolve: 145 minutes
- Responder: @marie-ops

## What happened

The same 50ms race from INC-1001 and INC-1004. Sandbox latency rose enough that both the first attempt and the retry lose.

## What we did

Replaced the wall-clock budget with a deterministic fake clock in the test.

## What we learned

A flaky test that goes green on retry is not fixed. Track the underlying race, not the retry rate.

This was a relapse of INC-1004.
