# Evidence should answer a bounded question

**Status:** design exercise with fictional examples; no live test results claimed.

## Scenario

An assessor receives a screenshot showing a control enabled. It lacks resource identity, time, effective scope, and an observed result. Make the question explicit: which requirement, on which system, under which conditions?

## Plan the checks

| Field | Why it matters |
|---|---|
| Claim and scope | Prevents generalizing one sample to the whole estate |
| Expected and observed | Separates intention from result |
| Method and preconditions | Makes a repeat meaningful |
| Timestamp and system/version | Shows when and where evidence applied |
| Evidence reference | Lets another reviewer locate the artifact |
| Owner and reviewer | Assigns follow-up without claiming independence |
| Limitations | Keeps an incomplete test honest |

## How to reason through it

Combine relevant configuration, observation, and review. Use the [verification matrix](../templates/verification-matrix.csv) for planning; leave observed fields blank until a test runs. Preserve original evidence under appropriate access controls. A hash can detect differences against a trusted recorded value; it cannot establish that the original observation was truthful or complete.

## Tradeoff to discuss

Collecting everything creates privacy, storage, and review problems. Collect enough to answer the question, with clear retention and access rules. An evidence index is navigation; it is not a security certification.

## Interview question

What conclusion can a reviewer draw from a complete record if the linked artifact is missing or the tested scope is wrong?

## Make it your own

Choose an authorized lab, identify the exact platform/version, and write the expected results before implementation. Add sanitized evidence and a dated result only after you run the checks. Use the [decision record](../templates/architecture-decision.md) to explain alternatives.

Reference context: see [primary sources](../SOURCES.md). The scenario, test plan, and tradeoffs here are proposed educational material.
