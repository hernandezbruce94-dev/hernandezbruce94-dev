# Installation success is one checkpoint

**Status:** design exercise with fictional examples; no live test results claimed.

## Scenario

A fictional service needs a vendor update. The deployment console says completed, but the running instance, reboot state, and business workflow have not been checked. Separate installation evidence from vulnerability and service acceptance.

## Plan the checks

| Layer | Verification |
|---|---|
| Applicability | Asset/product/version and vendor advisory match |
| Deployment | Approved package, intended target, installation result |
| Runtime | Active version and restart requirements checked |
| Exposure | Relevant configuration/endpoint reassessed |
| Service | Representative workflow and dependencies operate |
| Recovery | Rollback or forward-fix plan is viable and owned |

## How to reason through it

Define pilot assets and acceptance criteria before rollout. Record before/after observations and the tool's assessment scope. A disappearing scanner finding is useful corroboration only when the scanner actually assessed the relevant asset and condition. A compensating control should have an owner and expiry rather than becoming an undocumented permanent delay.

## Tradeoff to discuss

Urgent remediation reduces exposure but can disrupt critical services. Stage representative validation proportional to risk; keep an explicit exception and residual-risk decision when immediate rollout is infeasible.

## Interview question

What would you do if installation succeeds but the service runs the old binary? Discuss restart, inventory accuracy, and verification before declaring closure.

## Make it your own

Choose an authorized lab, identify the exact platform/version, and write the expected results before implementation. Add sanitized evidence and a dated result only after you run the checks. Use the [decision record](../templates/architecture-decision.md) to explain alternatives.

Reference context: see [primary sources](../SOURCES.md). The scenario, test plan, and tradeoffs here are proposed educational material.
