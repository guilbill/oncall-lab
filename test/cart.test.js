import test from 'node:test';
import assert from 'node:assert/strict';
import { createCart, addLine, subtotal, total } from '../src/cart.js';

test('an empty cart has a zero subtotal', () => {
  assert.equal(subtotal(createCart()), 0);
});

test('subtotal multiplies by quantity', () => {
  const cart = addLine(createCart(), { sku: 'BOOK-1', unitPrice: 12.5, quantity: 2 });
  assert.equal(subtotal(cart), 25);
});

test('total applies the discount before VAT', () => {
  const cart = addLine(createCart(), { sku: 'BOOK-1', unitPrice: 100 });
  assert.equal(total(cart, { discountPercent: 10 }), 108);
});

test('addLine rejects a zero quantity', () => {
  assert.throws(() => addLine(createCart(), { sku: 'X', unitPrice: 1, quantity: 0 }), RangeError);
});
