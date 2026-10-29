# Design study: a document-processing service

**Status:** fictional architecture exercise; not deployed. Numbers below are design assumptions, not measured performance.

## Problem and assumptions

A 40-person organization needs to upload internal documents, extract text, and let reviewers approve the results. Documents may contain sensitive business information. Uploaders must see only their own submissions; designated reviewers may see assigned submissions. The service has no public document-sharing feature.

Illustrative recovery objectives: lose no more than four hours of accepted work and restore the minimum service within eight hours. The business owner must approve or change these objectives before implementation. File types, size limits, retention, geography, and identity provider are unresolved requirements.

## Data flow and trust boundaries

1. User → identity provider → authenticated web/API session.
2. API checks action and document ownership before issuing a short-lived, narrowly scoped upload capability.
3. Upload enters quarantine storage. An asynchronous worker validates and processes the document.
4. Approved output moves to a separate result store; the API authorizes every result read.
5. Selected events flow to monitoring. Backup and recovery operations use separate administrative authority.

Treat the browser, uploaded content, worker, administrative plane, and monitoring sink as separate trust zones. Authentication alone does not establish document authorization. A parser's output remains untrusted until checked for its next use.

## Threats turned into requirements

| Threat | Requirement | Verification idea |
|---|---|---|
| User changes a document ID to another user's ID | Enforce ownership/assignment on each read and state change | Use two fictional accounts; cross-account requests denied; authorized requests succeed |
| Worker processes hostile or oversized content | Restrict types/resources, isolate processing, bound retries | Feed approved synthetic malformed inputs in a disposable lab; check rejection and worker health |
| Worker identity reads unrelated documents | Restrict data access to required queue/storage operations | Read intended object succeeds; neighboring scope and delete fail |
| A secret leaks through diagnostics | Minimize and redact event fields | Inspect synthetic failure events for tokens, content, and connection secrets |
| An administrator deletes source and backup | Separate operational and recovery authority | Review permissions and test recovery with primary access unavailable |
| Queue replays the same job | Make state transitions idempotent | Re-deliver one synthetic job; verify one accepted result and traceable retry |

These are a starting threat set, not a complete assessment. Add tenant isolation if the service becomes multi-tenant; reassess boundaries when features change.

## Decisions worth defending

**Asynchronous processing over a long-running API request.** It separates request latency from parsing work and allows bounded retries. It adds queue state, duplicate delivery concerns, and monitoring requirements. Accept only when operational ownership is clear.

**Separate quarantine and result storage.** Reviewers should not accidentally consume raw uploads as approved output. More storage paths mean more access policies and lifecycle rules to verify.

**Workload identity over an embedded static credential where supported.** Reduces the need to distribute a long-lived application secret. It does not remove authorization, token handling, or identity lifecycle risks.

**Central authorization in the API with checks on every operation.** Easier to review than scattered ownership logic. Storage capabilities still need expiration, audience/scope limits, and careful handling.

## Acceptance package

Collect the approved data-flow description; [decision records](../templates/architecture-decision.md); owner-approved retention and recovery targets; positive and negative authorization cases; queue/retry evidence; sanitized monitoring records; restore results; and unresolved exceptions with owners and review dates.

A failed request with no correlated decision evidence is inconclusive. A successful restore of files with a broken identity dependency does not meet service acceptance.

## Alternatives and next work

For a small low-volume service, manual review with simpler storage may be preferable to automation. Compare staffing, latency, data sensitivity, and support burden before choosing complexity. Next: run a requirements workshop, choose the platform, and implement one authorized vertical slice with synthetic data.

**Interview prompt:** Draw the boundaries in two minutes. Explain one rejected alternative, one residual risk, and the first negative test you would run.

Framework context: [OWASP threat modeling](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html). The architecture and acceptance choices above are proposed design judgments.
