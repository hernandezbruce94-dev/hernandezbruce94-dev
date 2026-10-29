/* Educational deterministic model. No network, identity provider, or real enforcement. */
(function (root) {
  'use strict';
  const clock = '2026-10-29T16:00:00Z';
  const users = Object.freeze({
    alice: {tenant: 'north', role: 'uploader'},
    ben: {tenant: 'north', role: 'reviewer'},
    cara: {tenant: 'south', role: 'reviewer'},
    ops: {tenant: 'north', role: 'operator'}
  });
  const docs = Object.freeze({
    'doc-101': {tenant: 'north', owner: 'alice', reviewer: 'ben'},
    'doc-202': {tenant: 'south', owner: 'cara', reviewer: 'cara'}
  });
  const actions = ['read', 'approve', 'delete'];
  function evaluate(input) {
    const trace = [];
    const result = (decision, reason) => ({kind: 'simulation', decision, reason, trace});
    if (!input || typeof input !== 'object' || Array.isArray(input)) return result('DENY', 'Malformed request');
    const {user, resource, action, now = clock, expiresAt = '2026-10-29T17:00:00Z'} = input;
    const iso = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;
    const validTime = value => typeof value === 'string' && iso.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === (value.includes('.') ? value : value.replace('Z', '.000Z'));
    if (!validTime(now) || !validTime(expiresAt)) return result('DENY', 'Invalid UTC clock or expiry');
    // Require exact known identifiers. Prototype properties are not principals or documents.
    if (!Object.hasOwn(users, user) || !Object.hasOwn(docs, resource) || !actions.includes(action)) return result('DENY', 'Unknown identity, resource or action');
    const principal = users[user], doc = docs[resource];
    trace.push({check: 'Known request', passed: true});
    if (input.authenticated !== true) { trace.push({check: 'Authenticated', passed: false}); return result('DENY', 'Authentication absent'); }
    trace.push({check: 'Authenticated', passed: true});
    if (Date.parse(now) >= Date.parse(expiresAt)) {trace.push({check: 'Grant unexpired', passed: false}); return result('DENY', 'Grant expired (expiry is exclusive)');}
    trace.push({check: 'Grant unexpired', passed: true});
    if (principal.tenant !== doc.tenant) {trace.push({check: 'Tenant matches', passed: false});return result('DENY', 'Cross-tenant request');}
    trace.push({check: 'Tenant matches', passed: true});
    if (action === 'delete') {trace.push({check: 'No deletion in this workflow', passed: false});return result('DENY', 'Deletion explicitly forbidden');}
    const allowed = (action === 'read' && (doc.owner === user || doc.reviewer === user)) || (action === 'approve' && principal.role === 'reviewer' && doc.reviewer === user);
    trace.push({check: 'Ownership / assignment and action', passed: allowed});
    return result(allowed ? 'ALLOW' : 'DENY', allowed ? 'Required relationship and action match' : 'No applicable allow rule (default deny)');
  }
  function assessEvidence(decision, observed) {
    if (!['ALLOW', 'DENY'].includes(decision)) throw new Error('Unknown modeled decision');
    if (observed === 'missing') return {status: 'INCONCLUSIVE', note: 'No correlated observation. The modeled decision does not prove enforcement.'};
    if (!['ALLOW', 'DENY'].includes(observed)) throw new Error('Unknown observation');
    return observed === decision ? {status: 'MATCH', note: 'Synthetic observation matches the model; no live enforcement was tested.'} : {status: 'MISMATCH', note: 'Synthetic observation conflicts with the model. Investigate before acceptance.'};
  }
  const scenarios = [
    {id:'owner-read', name:'Owner reads own file', user:'alice',resource:'doc-101',action:'read',authenticated:true,expected:'ALLOW'},
    {id:'assigned-review',name:'Assigned reviewer approves',user:'ben',resource:'doc-101',action:'approve',authenticated:true,expected:'ALLOW'},
    {id:'tenant-boundary',name:'Reviewer crosses tenant',user:'cara',resource:'doc-101',action:'read',authenticated:true,expected:'DENY'},
    {id:'role-boundary',name:'Operator reads document',user:'ops',resource:'doc-101',action:'read',authenticated:true,expected:'DENY'},
    {id:'action-boundary',name:'Owner approves own file',user:'alice',resource:'doc-101',action:'approve',authenticated:true,expected:'DENY'},
    {id:'delete-boundary',name:'Reviewer deletes file',user:'ben',resource:'doc-101',action:'delete',authenticated:true,expected:'DENY'},
    {id:'expiry-boundary',name:'Grant expires exactly now',user:'ben',resource:'doc-101',action:'approve',authenticated:true,expiresAt:clock,expected:'DENY'},
    {id:'anonymous',name:'No authentication',user:'alice',resource:'doc-101',action:'read',authenticated:false,expected:'DENY'}
  ];
  const api = {evaluate, assessEvidence, scenarios, clock};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.BoundaryLab = api;
})(typeof globalThis === 'undefined' ? this : globalThis);
