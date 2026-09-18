import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createCart, addLine, total } from '../src/cart.js';

const chaos = JSON.parse(readFileSync(new URL('../chaos.json', import.meta.url)));

// Stands in for a checkout step that talks to a payment sandbox.
// When the sandbox is slow, this test loses its race and fails intermittently.
function settlePayment() {
  const budgetMs = 50;
  const observedMs = chaos.flaky_checkout_test ? Math.floor(Math.random() * 120) : 5;
  if (observedMs > budgetMs) {
    throw new Error(
      `payment sandbox did not settle within ${budgetMs}ms (took ${observedMs}ms)`
    );
  }
  return { status: 'settled', tookMs: observedMs };
}

test('checkout settles a paid cart', () => {
  const cart = addLine(createCart(), { sku: 'BOOK-1', unitPrice: 30, quantity: 1 });
  const receipt = settlePayment();
  assert.equal(receipt.status, 'settled');
  assert.equal(total(cart), 36);
});
