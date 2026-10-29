# Prove the decision, not just the failed request

**Status:** design exercise with fictional examples; no live test results claimed.

## Scenario

A fictional finance workstation may reach a reporting API over the approved application path. An unrelated workstation must not. You need evidence that the intended enforcement point made the decision—not just a timeout screenshot.

## Plan the checks

| Case | Expected observation | Interpretation |
|---|---|---|
| Approved source, destination, service | Request succeeds and correlated policy decision allows it | Supports the allowed path within the tested scope |
| Unapproved source, same destination/service | Enforcement decision denies it; request does not complete | Supports the denied path |
| Approved source, service deliberately stopped in the lab | Policy permits it but application request fails | Demonstrates why failure alone is ambiguous |
| Request fails and no decision can be correlated | Unknown | Inconclusive; investigate path and visibility |

## How to reason through it

Record source identity/address, destination, protocol/service, enforcement point, policy/version, UTC time window, correlation method, and result. Check routing, DNS, proxy behavior, rule order, and log coverage before attributing a failure. Use only authorized endpoints; this is a test design, not a scanner.

## Tradeoff to discuss

A broad allow rule can simplify connectivity but weakens isolation. An overly narrow rule can break legitimate dependencies. Document required dependencies rather than widening a rule until the error disappears.

## Interview question

How would you distinguish a policy deny from a stopped service, and what evidence would change your conclusion?

## Make it your own

Choose an authorized lab, identify the exact platform/version, and write the expected results before implementation. Add sanitized evidence and a dated result only after you run the checks. Use the [decision record](../templates/architecture-decision.md) to explain alternatives.

Reference context: see [primary sources](../SOURCES.md). The scenario, test plan, and tradeoffs here are proposed educational material.
