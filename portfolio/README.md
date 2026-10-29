# Security Engineering & Architecture Portfolio
## Configured? Prove It.

Practical design studies, verification plans, and reusable artifacts curated for Bruce L. Hernandez's GitHub.

**Start here:** [Architecture case study](case-studies/document-processing-service.md) · [Runnable offline tool](tools/README.md) · [Interview walkthrough](interviews/walkthrough.md)

## Try an interactive lab

**[Access Boundary Lab](labs/access-boundary/README.md)** — an offline browser demo with explainable authorization decisions, eight challenge scenarios, a regression matrix, synthetic evidence export, a threat model, and interview challenge cards. Change tenant, identity, action or expiry and explain the result. Download the folder to run it; GitHub's file view does not execute the HTML. No cloud or paid tools required. This is a locally tested educational model, not a deployed control.

## Evidence and authorship

This collection was collaboratively drafted with AI assistance on October 29, 2026. The scenarios and proposed project concepts are educational designs, not claims of Bruce's prior employment, independent invention, customer work, or production deployments. They are offered for review, adaptation, and discussion.

| Status | What it means here |
|---|---|
| Design study | Fictional scenario with explicit assumptions and tradeoffs; not deployed |
| Proposed concept | Candidate project direction; not a novelty or ownership claim |
| Locally tested | The exact offline tool checks listed in the test record ran locally |
| Deployment evidence | Not provided for these designs; add it only after an authorized implementation |

## Explore by engineering question

| Question | Resource | Artifact |
|---|---|---|
| How would you secure a new service? | [Document-processing architecture](case-studies/document-processing-service.md) | Trust boundaries, threats, decisions |
| How do you prove a firewall made a decision? | [Decision verification](guides/01-network-decisions.md) | Allow/deny/inconclusive cases |
| How narrow is narrow enough for access? | [Least privilege](guides/02-least-privilege.md) | Authorization matrix |
| What makes a restore useful? | [Recovery acceptance](guides/03-recovery-acceptance.md) | Recovery test plan |
| How do you test the whole detection path? | [Detection pipeline](guides/04-detection-pipeline.md) | Event-to-triage checks |
| When is a patch complete? | [Patch validation](guides/05-patch-validation.md) | Deployment and service checks |
| Where should cloud boundaries sit? | [Cloud workload design](guides/06-cloud-boundaries.md) | Identity/data boundary decisions |
| What belongs in an evidence package? | [Control evidence](guides/07-control-evidence.md) | Scope and evidence review |
| Can a system fail safely and recover? | [Failure-mode review](guides/08-failure-modes.md) | Failure/response matrix |

## Build from an idea

Four [proposed project concepts](ideas/README.md): evidence freshness, permission expiry, recovery dependency checks, and change-linked verification. Each includes a small MVP, tradeoff, abuse case, and next proof.

## Reuse the artifacts

- [Architecture decision record](templates/architecture-decision.md)
- [Threat register CSV](templates/threat-register.csv)
- [Verification matrix CSV](templates/verification-matrix.csv)
- [Evidence review checklist](templates/evidence-review.md)
- [Offline evidence-index checker](tools/README.md), synthetic fixtures, and tests
- [Interview questions and honest walkthrough](interviews/walkthrough.md)
- [Primary references and review dates](SOURCES.md)

No cloud subscription, account creation, credentials, scanning, or external service is required for the offline tool. Architecture exercises require no live changes.

## Relationship to the books

This portfolio is separate from the [Security Controls in Practice companion repository](https://github.com/hernandezbruce94-dev/security-controls-in-practice). It is not an assertion that these new studies or concepts appear in either book.

## Reuse

These public examples are available to read and discuss. No new license is granted by this portfolio. Linked references and the book companion retain their own terms.
