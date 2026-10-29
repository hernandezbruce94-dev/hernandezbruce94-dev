# Six interview challenge cards

Use these to explain the design, not to memorize invented experience.

| Challenge | Demonstrate | Defend the tradeoff |
|---|---|---|
| Authenticated reviewer, wrong tenant | Cara reads doc-101 → DENY | Which source establishes tenant identity in a real API? |
| Administrator means all access? | Ops reads doc-101 → DENY | How do emergency access and normal operations differ? |
| Expiry boundary | Ben approves at exact expiry → DENY | Whose clock is authoritative? What about cached sessions? |
| Same role, different relationship | Alice approve → DENY; Ben approve → ALLOW | Why is a role-only check insufficient for this workflow? |
| Green decision, missing evidence | ALLOW + missing → INCONCLUSIVE | A modeled decision is not proof that enforcement occurred. |
| New segregation-of-duties requirement | Cara can approve doc-202 today | Add `reviewer !== owner`, a counterexample and tests; explain which existing behavior changes. |

## A truthful opening

“I built this educational authorization model collaboratively with AI assistance. I can walk through its rules and tests. It runs locally with fictional data; it has not been deployed as a real control. Here is the distinction between the modeled decision, a synthetic observation, and the integration evidence I would collect next.”

## A useful extension proposal

Add an explicit separate-person approval switch with tests for both policies. Keep the current baseline reproducible and version the changed model. Describe the business reason before changing the rule. Do not claim the extension already exists.
