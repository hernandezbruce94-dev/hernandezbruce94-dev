# Design the failure path before it becomes the normal path

**Status:** design exercise with fictional examples; no live test results claimed.

## Scenario

A fictional approval service depends on an identity provider, queue, and audit sink. The architecture diagram looks healthy because every arrow points at a working service. Review the same diagram with one dependency unavailable.

## Plan the checks

| Failure | Proposed response | Required review |
|---|---|---|
| Identity provider unavailable | Reject new unauthenticated access; use approved recovery access only | Session behavior and emergency authority |
| Audit sink unavailable | Buffer within an explicit bound or stop sensitive work | Data loss, storage exhaustion, alerting |
| Worker retries indefinitely | Bound retries; isolate poison jobs | Queue growth and manual recovery |
| Policy distribution fails | Keep known state only if its validity is established; alert | Drift and stale-policy risk |
| Recovery operator unavailable | Document alternate approved owner | Separation of duties and access readiness |

## How to reason through it

For each dependency, document failure detection, allowed degraded behavior, data loss boundary, recovery owner, and exit criteria. Distinguish a deliberate degraded mode from a quiet fail-open path. Exercise only in authorized disposable systems, with clear stop conditions and restoration steps.

## Tradeoff to discuss

Failing closed can preserve a boundary while stopping critical work. Failing open can preserve availability while losing the required protection. The decision depends on the operation and business impact; record who accepts the residual risk.

## Interview question

Which dependency failure would invalidate your security claim even though the application still responds with HTTP 200?

## Make it your own

Choose an authorized lab, identify the exact platform/version, and write the expected results before implementation. Add sanitized evidence and a dated result only after you run the checks. Use the [decision record](../templates/architecture-decision.md) to explain alternatives.

Reference context: see [primary sources](../SOURCES.md). The scenario, test plan, and tradeoffs here are proposed educational material.
