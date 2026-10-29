# Offline evidence-index checker

**Status:** small working demonstration; synthetic fixtures only. See the dated [test record](TEST-RESULTS.txt).

This checks whether an evidence index has required fields, consistent UTC dates, an allowed result/status vocabulary, unique IDs, and a review date that has not passed. It does **not** read the referenced artifacts, scan systems, validate observed claims, authenticate evidence, or determine control effectiveness. A record describing a failed control can have a structurally valid index.

## Run for free

Requires an existing Node.js runtime supporting ECMAScript modules and the built-in test runner. No packages to install.

From this directory:

```text
node --test evidence-check.test.mjs
node evidence-check.mjs fixtures/valid.json --now 2026-10-29T12:00:00Z
node evidence-check.mjs fixtures/invalid.json --now 2026-10-29T12:00:00Z
```

The fixed date makes the demonstration reproducible. Omit --now to check against the actual current clock; a once-valid fixture will eventually become overdue.

Exit codes: **0** index checks pass; **1** findings; **2** input/usage problem. Invalid fixture should report a missing owner and date findings. All fixture results are invented examples labeled synthetic.

## Schema version 1

Root: schema_version (1), records (nonempty array).

Each record requires nonblank id, control, scope, owner, expected, observed, evidence_ref; tested_at and review_due as real UTC timestamps in YYYY-MM-DDTHH:mm:ssZ; result as pass/fail/inconclusive; evidence_kind as synthetic/lab/production. Unique IDs are compared after trimming whitespace. Unknown extra fields are ignored.

The tool checks review_due is not before tested_at and is not earlier than the check time. It rejects observations dated after that time. It cannot detect a misleading owner, altered clock, false result, inaccessible artifact, or a significant change that occurred after observation.

## Design tradeoffs

JSON avoids a CSV parser dependency and supports explicit schema versioning. It is less convenient for spreadsheet users. Strict UTC timestamps reduce ambiguous date handling but require conversion before input. Owner-entered review dates remain policy decisions; the tool does not invent a universal freshness period.

A next version could compare observations with a change ledger. That feature is a [proposed concept](../ideas/README.md), not implemented here.
