// A stand-in for the bundler. Normally quick; the slow_build chaos flag
// makes it run past the job's timeout, which is its own failure class.
import { readFileSync } from 'node:fs';

const chaos = JSON.parse(readFileSync(new URL('../chaos.json', import.meta.url)));
const steps = ['resolve', 'transform', 'chunk', 'minify', 'emit'];

for (const step of steps) {
  const ms = chaos.slow_build ? 90_000 : 120;
  console.log(`[build] ${step} ...`);
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}
console.log('[build] bundle written to dist/app.js');
