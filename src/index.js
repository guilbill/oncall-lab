import { createCart, addLine, total } from './cart.js';

const cart = addLine(createCart(), { sku: 'BOOK-1', unitPrice: 12.5, quantity: 2 });
console.log('total:', total(cart, { discountPercent: 10 }));
