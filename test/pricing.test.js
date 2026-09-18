import test from 'node:test';
import assert from 'node:assert/strict';
import { applyVat, applyDiscount } from '../src/pricing.js';

test('applyVat adds 20 percent', () => {
  assert.equal(applyVat(100), 120);
});

test('applyVat rejects non-numbers', () => {
  assert.throws(() => applyVat('10'), TypeError);
});

test('applyDiscount removes the right share', () => {
  assert.equal(applyDiscount(200, 25), 150);
});

test('applyDiscount rejects out-of-range percentages', () => {
  assert.throws(() => applyDiscount(200, 120), RangeError);
});
