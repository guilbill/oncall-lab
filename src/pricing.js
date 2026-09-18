const VAT_RATE = 0.2;

export function applyVat(amountExVat) {
  if (typeof amountExVat !== 'number' || Number.isNaN(amountExVat)) {
    throw new TypeError('applyVat expects a number');
  }
  return Math.round(amountExVat * (1 + VAT_RATE) * 100) / 100;
}

export function applyDiscount(amount: number, percent) {
  if (percent < 0 || percent > 100) {
    throw new RangeError('discount must be between 0 and 100');
  }
  return Math.round(amount * (1 - percent / 100) * 100) / 100;
}
