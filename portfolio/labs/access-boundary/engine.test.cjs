const test = require('node:test');
const assert = require('node:assert/strict');
const {evaluate, assessEvidence, scenarios, clock} = require('./engine.js');
for (const s of scenarios) test(s.name, () => assert.equal(evaluate(s).decision, s.expected));
const valid = scenarios[0];
test('expiry boundary immediately before, at, and after', () => {
  for(const [now,want] of [['2026-10-29T16:59:59Z','ALLOW'],['2026-10-29T17:00:00Z','DENY'],['2026-10-29T17:00:01Z','DENY']]) assert.equal(evaluate({...valid,now}).decision,want);
});
test('role alone does not grant access to another tenant', () => assert.equal(evaluate({...valid,user:'ben',resource:'doc-202'}).decision,'DENY'));
test('same-tenant operator cannot approve', () => assert.equal(evaluate({...valid,user:'ops',action:'approve'}).decision,'DENY'));
test('authentication must be boolean true', () => {for(const authenticated of [false,null,'true',1,undefined]) assert.equal(evaluate({...valid,authenticated}).decision,'DENY');});
test('unknown request values default deny, including prototype properties', () => {
  for(const value of ['unknown','__proto__','constructor','toString']) {
    for(const field of ['user','resource','action']) assert.equal(evaluate({...valid,[field]:value}).decision,'DENY');
  }
});
test('malformed requests fail closed without throwing', () => {for(const value of [null,undefined,[],{},42,'alice']) assert.equal(evaluate(value).decision,'DENY');});
test('invalid and timezone-free time inputs fail closed', () => {
  for(const value of ['tomorrow','2026-10-29', '2026-10-29T16:00:00','2026-13-29T16:00:00Z','2026-02-30T16:00:00Z',null,123]) {
    for(const field of ['now','expiresAt']) assert.equal(evaluate({...valid,[field]:value}).decision,'DENY');
  }
});
test('all known identity/resource/action combinations obey explicit invariants', () => {
  for(const user of ['alice','ben','cara','ops']) for(const resource of ['doc-101','doc-202']) for(const action of ['read','approve','delete']) {
    const r=evaluate({...valid,user,resource,action});
    if(action==='delete'||user==='ops'||(user==='cara') !== (resource==='doc-202')) assert.equal(r.decision,'DENY');
  }
});
test('missing evidence is inconclusive for both decisions', () => {for(const d of ['ALLOW','DENY']) assert.equal(assessEvidence(d,'missing').status,'INCONCLUSIVE');});
test('synthetic allow and deny mismatch in both directions', () => {assert.equal(assessEvidence('ALLOW','DENY').status,'MISMATCH');assert.equal(assessEvidence('DENY','ALLOW').status,'MISMATCH');});
test('both matching observations remain explicitly synthetic', () => {for(const d of ['ALLOW','DENY']) {const a=assessEvidence(d,d);assert.equal(a.status,'MATCH');assert.match(a.note,/no live enforcement/);}});
test('unknown evidence states do not silently pass', () => {assert.throws(()=>assessEvidence('ALLOW','timeout'));assert.throws(()=>assessEvidence('maybe','ALLOW'));});
test('evaluation does not mutate the input and is deterministic', () => {const input=Object.freeze({...valid,now:clock});assert.deepEqual(evaluate(input),evaluate(input));assert.equal(input.now,clock);});
