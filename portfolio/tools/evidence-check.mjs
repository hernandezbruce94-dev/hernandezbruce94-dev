#!/usr/bin/env node
// Offline structure/date checks only. No network, artifact reads, or credentials.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function isoTime(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)) return null;
  const ms = Date.parse(value);
  if (!Number.isFinite(ms) || new Date(ms).toISOString().replace('.000Z', 'Z') !== value) return null;
  return ms;
}

export function validate(index, now) {
  if (!Number.isFinite(now)) throw new Error('Invalid check time');
  const errors = [];
  if (!index || typeof index !== 'object' || Array.isArray(index)) return ['Root must be an object'];
  if (index.schema_version !== 1) errors.push('schema_version must be 1');
  if (!Array.isArray(index.records) || index.records.length === 0) return [...errors, 'records must be a non-empty array'];
  const ids = new Set();
  index.records.forEach((r, n) => {
    const p = 'record[' + n + ']';
    if (!r || typeof r !== 'object' || Array.isArray(r)) { errors.push(p + ': must be an object'); return; }
    for (const key of ['id','control','scope','owner','expected','observed','evidence_ref'])
      if (typeof r[key] !== 'string' || !r[key].trim()) errors.push(p + ': missing ' + key);
    if (typeof r.id === 'string' && r.id.trim()) {
      const id = r.id.trim();
      if (ids.has(id)) errors.push(p + ': duplicate id ' + id);
      ids.add(id);
    }
    if (!['pass','fail','inconclusive'].includes(r.result)) errors.push(p + ': result must be pass, fail, or inconclusive');
    if (!['synthetic','lab','production'].includes(r.evidence_kind)) errors.push(p + ': invalid evidence_kind');
    const tested = isoTime(r.tested_at), review = isoTime(r.review_due);
    if (tested === null) errors.push(p + ': tested_at must be a real UTC timestamp YYYY-MM-DDTHH:mm:ssZ');
    if (review === null) errors.push(p + ': review_due must be a real UTC timestamp YYYY-MM-DDTHH:mm:ssZ');
    if (tested !== null && tested > now) errors.push(p + ': observation is in the future');
    if (review !== null && review < now) errors.push(p + ': review overdue');
    if (review !== null && tested !== null && review < tested) errors.push(p + ': review predates observation');
  });
  return errors;
}

export function main(args) {
  if (args.length !== 1 && !(args.length === 3 && args[1] === '--now')) {
    console.error('Usage: node evidence-check.mjs <index.json> [--now YYYY-MM-DDTHH:mm:ssZ]');
    return 2;
  }
  const now = args.length === 3 ? isoTime(args[2]) : Date.now();
  if (now === null) { console.error('Invalid --now timestamp'); return 2; }
  let data;
  try { data = JSON.parse(readFileSync(args[0], 'utf8').replace(/^\uFEFF/, '')); }
  catch (e) { console.error('Input error: ' + e.message); return 2; }
  const errors = validate(data, now);
  if (errors.length) { console.error(errors.join('\n')); return 1; }
  console.log('Index checks passed. Artifact contents and control effectiveness are NOT verified.');
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) process.exitCode = main(process.argv.slice(2));
