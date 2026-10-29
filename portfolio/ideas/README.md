# Four proposed projects to develop and defend

**Status:** collaboratively drafted project concepts; not implemented, independently invented, or validated. No novelty claim. These are starting points for Bruce to critique, build, and make his own.

## 1. Evidence freshness board

**Problem:** a control record may be complete but describe a system that has since changed.

**MVP:** accept a local evidence index and a separate change ledger. Flag evidence older than an owner-defined review date or preceding a relevant change. Present "review needed," not "control failed."

**Data:** control ID, scope, observation time, review date, change ID, change scope, owner, and evidence reference. Begin with manually linked scope; do not pretend string matching understands dependency impact.

**Design tradeoff:** explicit owner-entered mappings are explainable but can be incomplete. Automatically inferred mappings scale better but need confidence and review.

**Abuse/failure case:** someone extends the review date without retesting. Keep the change history and reviewer decision distinct from the original observation.

**First proof:** three synthetic records: unchanged/in-date, expired, and changed after observation. Show why each is or is not flagged. The offline checker in this portfolio covers date freshness only; it does not implement the change ledger.

## 2. Permission expiry rehearsal

**Problem:** approving temporary access is easier than proving the end of access.

**MVP:** a local planner turns one access grant into before/during/after verification cases. No automatic grants or revocations in the first version.

**Data:** principal, action, resource scope, approval, start/end, session assumptions, owner, and observed denial evidence.

**Tradeoff:** permission expiry and session/token expiry may differ. A simple countdown is understandable but can misrepresent effective access; include a platform-specific reauthentication/revocation check.

**Abuse/failure case:** a secondary role or inherited group keeps access alive. Add a neighboring-scope and alternative-path review.

**First proof:** an authorized lab grant with a precise scope; verify permitted access while active and new operation denial after the applicable expiry behavior. Record uncertainty about existing sessions rather than inventing universal revocation timing.

## 3. Recovery dependency card

**Problem:** restore plans often identify data but overlook keys, identity, DNS, and operator availability.

**MVP:** a dependency inventory with one recovery test per dependency. Keep a printable offline summary with owners and references; never store passwords or recovery secrets in the card.

**Tradeoff:** a detailed inventory is useful only if maintained. Trigger review on architecture and ownership changes rather than relying on a yearly meeting alone.

**Abuse/failure case:** the only copy of the plan requires the identity system it describes recovering. Test access to the approved recovery instructions during the simulated outage.

**First proof:** a tabletop in which primary identity is unavailable. Measure which instructions and approvals remain usable; a tabletop is not a measured technical restore.

## 4. Change-to-proof checklist

**Problem:** a change is approved, yet no one defines which security behavior must still hold afterward.

**MVP:** map one change to affected trust boundaries, expected invariants, positive/negative cases, rollback triggers, and evidence references.

**Tradeoff:** exhaustive retesting is expensive; narrow testing can miss dependencies. Require an explicit reason for the chosen scope and record what was excluded.

**Abuse/failure case:** the change author writes only cases that obviously pass. Have a reviewer add a plausible nearby failure and check coverage against the boundary diagram.

**First proof:** use a synthetic permission-scope change. Show the intended operation still works, a neighboring operation stays denied, and results are compared with the prior baseline.

## A useful interview discussion

Pick one concept. Explain the user, the failure it catches, the smallest useful version, the false positives, the data it should never collect, and what would convince you to abandon the idea. A defensible small implementation is more useful than claiming all four are finished.
