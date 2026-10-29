# Test from event generation to an owned decision

**Status:** design exercise with fictional examples; no live test results claimed.

## Scenario

A fictional team wants to detect unusual administrative changes. A query returning a row proves query behavior on that data; it does not by itself prove alert routing or analyst response.

## Plan the checks

| Stage | Expected proof |
|---|---|
| Generate | Known synthetic action with UTC timestamp and ID |
| Collect | Source event present with required fields |
| Normalize | Identity, action, resource, and time preserved |
| Evaluate | Intended rule matches; a benign comparison does not |
| Route | Alert reaches the designated queue |
| Triage | Owner understands severity, context, and next action |

## How to reason through it

Define an approved harmless test event and a benign comparison. Trace a stable identifier, not a rough visual time match. Record delays at each stage; distinguish event time, ingestion time, and alert time. Test missing fields, a duplicate, delayed arrival, and a collector outage in a disposable setup before claiming coverage. Minimize logged sensitive fields.

## Tradeoff to discuss

A very broad rule catches more activity but creates review burden. A narrow rule can miss variants. Keep the test event useful without making the production rule depend on a special marker an attacker would never generate.

## Interview question

How would you demonstrate a detection gap caused by missing telemetry rather than a query bug?

## Make it your own

Choose an authorized lab, identify the exact platform/version, and write the expected results before implementation. Add sanitized evidence and a dated result only after you run the checks. Use the [decision record](../templates/architecture-decision.md) to explain alternatives.

Reference context: see [primary sources](../SOURCES.md). The scenario, test plan, and tradeoffs here are proposed educational material.
