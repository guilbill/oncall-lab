import { applyVat, applyDiscount } from './pricing.js';

export function createCart() {
  return { lines: [] };
}

export function addLine(cart, { sku, unitPrice, quantity = 1 }) {
  if (quantity < 1) {
    throw new RangeError('quantity must be at least 1');
  }
  return { ...cart, lines: [...cart.lines, { sku, unitPrice, quantity }] };
}

export function subtotal(cart) {
  const raw = cart.lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  return Math.round(raw * 100) / 100;
}

export function total(cart, { discountPercent = 0 } = {}) {
  return applyVat(applyDiscount(subtotal(cart), discountPercent));
}
