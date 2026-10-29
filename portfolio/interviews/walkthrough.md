# Interview walkthrough: explain the engineering

This is a discussion aid, not a script for claiming work you did not do.

## Five-minute portfolio tour

1. **Problem, 30 seconds:** Explain the fictional document-processing service, its users, data, and business constraints.
2. **Boundaries, 60 seconds:** Draw user/API, queue/worker, storage, administration, monitoring, and recovery.
3. **Tradeoff, 60 seconds:** Defend one decision using the ADR. Explain a reasonable alternative and why it might win under different constraints.
4. **Proof, 90 seconds:** Open the verification matrix. Walk through an allowed case, a denied case, and an inconclusive observation.
5. **Artifact, 30 seconds:** Run the offline evidence checker against its valid and invalid synthetic fixtures.
6. **Limits, 30 seconds:** Name what was locally tested, what remains design-only, and the next authorized validation.

## Questions worth practicing

| Question | What a strong answer should contain |
|---|---|
| Why isn't authentication enough? | Resource/action authorization, ownership, and checks at each operation |
| What does a private endpoint fail to solve? | Identity, data scope, administrative authority, and remaining paths |
| How do you choose test coverage? | Requirements, boundaries, adjacent failures, constraints, and exclusions |
| How would you prove a deny? | Correlated enforcement evidence and a working comparison case |
| What if the logs stop? | Visibility limits, buffering bounds, alerts, and approved degraded behavior |
| What makes a restore acceptable? | Business workflow, dependencies, recovery objectives, actual measurements |
| Why not use an administrator role? | Necessary actions, inherited access, scope, duration, and operational cost |
| When would you reject your own design? | A changed constraint or evidence that invalidates an assumption |
| Can this checker prove the control works? | No; it checks index structure and dates, not artifact truth or effectiveness |
| What would you build next? | One bounded vertical slice with a prewritten acceptance plan |

## Truthful ways to describe the work

- "This is an architecture study I can explain and adapt; it has not been deployed."
- "The material was drafted collaboratively with AI assistance. Here is what I reviewed, changed, and can defend."
- "The offline checker was locally tested against synthetic inputs; that does not validate these cloud designs."
- After personally completing a lab: "I implemented this scoped case on [date/platform], observed [result], and kept this sanitized evidence."

Do not convert a proposed design into a production story or describe these concepts as independently invented. Replace placeholders with your real contributions and real observations as you do the work.

## Next practice session

Choose one scenario. Explain it without reading. Have a reviewer change one assumption, such as multi-tenancy or identity-provider outage. Update the architecture and test plan rather than defending the original diagram at all costs.
