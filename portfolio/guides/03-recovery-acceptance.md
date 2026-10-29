# A restore finishes when the service is usable

**Status:** design exercise with fictional examples; no live test results claimed.

## Scenario

A fictional case-management service has a nightly backup. The business needs a four-hour recovery point, so the schedule alone already raises a requirements gap. Agree recovery objectives before celebrating a successful backup job.

## Plan the checks

| Check | Capture |
|---|---|
| Restore point | Actual selected timestamp and accepted-data gap |
| Elapsed recovery | Start/end boundaries and interruptions |
| Identity | Authorized users can authenticate; unauthorized users remain denied |
| Dependencies | Keys, DNS, configuration, integrations, and required infrastructure |
| Integrity | Counts, representative records, hashes where appropriate |
| Business acceptance | Owner can complete a representative workflow |

## How to reason through it

Restore synthetic or approved data into an isolated destination. Do not overwrite the working service as an exercise. Reconcile writes that occurred after the restore point; test with normal production administrative access unavailable in the scenario. Record actual measurements without adjusting the clock to meet the target.

## Tradeoff to discuss

More frequent backups may reduce potential data loss but increase cost, load, and recovery-chain complexity. An immutable copy helps one threat path; it does not prove the application can use it or that restore credentials are available.

## Interview question

If the files restore but the encryption key or identity service does not, what did the test establish—and what remains unproven?

## Make it your own

Choose an authorized lab, identify the exact platform/version, and write the expected results before implementation. Add sanitized evidence and a dated result only after you run the checks. Use the [decision record](../templates/architecture-decision.md) to explain alternatives.

Reference context: see [primary sources](../SOURCES.md). The scenario, test plan, and tradeoffs here are proposed educational material.
