# Draw the data boundary as carefully as the network boundary

**Status:** design exercise with fictional examples; no live test results claimed.

## Scenario

A fictional batch worker processes one project's reports. It needs a queue, a storage scope, and logs. A network restriction alone does not define which data the worker can read.

## Plan the checks

| Boundary | Design question |
|---|---|
| User → API | Who authenticates, and who authorizes each operation? |
| Worker → storage | Which exact actions and resource scopes are required? |
| Operator → control plane | Who may change identity, policy, and logging? |
| Service → monitoring | Which fields can leave the workload? |
| Primary → recovery | Which failure or compromised identity can affect both? |

## How to reason through it

List principals and trust relationships alongside traffic flows. Review inherited access and any public/anonymous paths. Build a positive test for the intended report and negative tests for neighboring scope, destructive operations, and privilege changes. Use platform-specific documentation before translating the design to policies.

## Tradeoff to discuss

Private connectivity adds routing, DNS, and operational dependencies; it is not a substitute for authorization. Managed services can reduce maintenance while adding provider-specific failure and recovery assumptions. Compare those assumptions to the business requirement.

## Interview question

Which permissions would let a worker alter its own evidence or expand its own access, and how would you separate them?

## Make it your own

Choose an authorized lab, identify the exact platform/version, and write the expected results before implementation. Add sanitized evidence and a dated result only after you run the checks. Use the [decision record](../templates/architecture-decision.md) to explain alternatives.

Reference context: see [primary sources](../SOURCES.md). The scenario, test plan, and tradeoffs here are proposed educational material.
