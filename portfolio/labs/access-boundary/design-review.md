# Design review: make the boundary explainable

## Context and data flow

A fictional document-processing service needs reviewer access without granting every operator access to every document. This lab implements only a deterministic model of that decision. It has no real data-plane component.

```text
User-editable form → in-memory model → decision + trace
                           ↓
Synthetic observation → evidence comparison → local JSON download
```

The form is an untrusted input boundary. The fictional principal/document registry is a fixed model input, not a live directory. A downloaded record crosses a sharing boundary only when the user chooses to share it. A real API would have to obtain trusted attributes and enforce its decision independently of this UI.

## ADR-001: deterministic model before a cloud deployment

**Decision:** keep identities, relationships and policy in a small local engine. Use the same engine in the browser and Node tests. Default deny; preserve a decision trace. Model evidence separately.

**Alternative:** deploy a real identity provider, API, storage and policy engine. That supports meaningful integration tests but introduces costs, credentials and operational dependencies beyond this artifact's scope.

**Benefit:** an interviewer can reproduce the exact synthetic case without an account and inspect the code. **Cost:** this cannot establish provider policy behavior, real enforcement, clock trust, performance, or availability. Shared browser/test code alone does not prove correctness; tests include fixed expected cases, boundary timestamps, invalid inputs, and cross-product invariants.

**Review trigger:** before using the code for real authorization, stop and design a server-enforced system with trusted attributes and an appropriate threat model. Do not turn this educational model into a production dependency by renaming the folder.

## Threat-to-verification register

| Threat / error | Local safeguard | Observable check | Remaining limit |
|---|---|---|---|
| Reviewer reaches another tenant | Tenant boundary precedes allow evaluation | Cross-tenant read/approve deny | Real tenant identity not authenticated here |
| Operator inherits document rights by assumption | Ownership/assignment allow rules | Ops read/approve deny | Real administrative bypasses not modeled |
| Expired grant remains usable | UTC validation and exclusive expiry | Before/at/after boundary tests | Existing sessions, caches and revocation absent |
| New action silently inherits permission | Known action list + default deny | Unknown actions and delete denied | No provider wildcard semantics |
| Prototype property mistaken for identity | Own-property registry lookup | `constructor`, `__proto__`, `toString` denied | Not a general schema-validation framework |
| Missing observation becomes a pass | Independent INCONCLUSIVE assessment | Both modeled decisions + missing evidence | Synthetic MATCH still not control evidence |
| JSON labels treated as certification | Export says educational simulation | Inspect exported scope fields | Local exports are editable and unsigned |

## Next authorized vertical slice

Build an isolated server API with two synthetic accounts and document objects. Repeat the allowed and denied matrix against actual requests; correlate each request with an enforcement decision. Add session expiry/revocation, concurrent assignment changes, missing policy data, and logging failure. Record exact observed behavior and exclusions. That work has **not** been performed by this lab.
