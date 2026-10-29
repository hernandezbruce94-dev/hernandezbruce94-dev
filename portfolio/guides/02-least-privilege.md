# Least privilege is an action, a resource, and a duration

**Status:** design exercise with fictional examples; no live test results claimed.

## Scenario

A fictional export worker reads approved reports from one storage scope. It must not edit reports, read a neighboring scope, or assign permissions. Start with the business operation, not an administrator role name.

## Plan the checks

| Principal | Action/resource | Expected |
|---|---|---|
| Export worker | Read approved report in assigned scope | Allow |
| Export worker | Read neighboring scope | Deny |
| Export worker | Delete assigned report | Deny |
| Export worker | Assign a role | Deny |
| Expired temporary operator | Start a new privileged operation | Deny after applicable platform/session behavior is verified |

## How to reason through it

Build the matrix before assigning roles. Inspect inherited assignments, group membership, separate management/data permissions, and alternative authorization mechanisms. Verify both the permitted operation and nearby prohibited operations. Record effective permissions and the precise session/token context; removing an assignment does not justify a universal claim of instantaneous revocation.

## Tradeoff to discuss

A built-in role is easier to maintain but may include unneeded operations. A custom role can reduce permissions while increasing review and versioning work. Scope reduction often matters as much as role selection.

## Interview question

What if the resource-level role looks narrow but the principal inherits a broader assignment? Use the effective permission model rather than the screenshot of one assignment.

## Make it your own

Choose an authorized lab, identify the exact platform/version, and write the expected results before implementation. Add sanitized evidence and a dated result only after you run the checks. Use the [decision record](../templates/architecture-decision.md) to explain alternatives.

Reference context: see [primary sources](../SOURCES.md). The scenario, test plan, and tradeoffs here are proposed educational material.
