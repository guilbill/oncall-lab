// A stand-in for the project's type checker. It walks src/ and fails on
// patterns a real checker would catch, so CI has a fast-failing lint stage.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const SRC = new URL('../src/', import.meta.url).pathname;
const problems = [];

for (const file of readdirSync(SRC)) {
  if (!file.endsWith('.js')) continue;
  const body = readFileSync(join(SRC, file), 'utf8');
  body.split('\n').forEach((line, i) => {
    if (/\bvar\s/.test(line)) {
      problems.push(`src/${file}:${i + 1}  no-var: use let or const`);
    }
    if (/[^!=<>]==[^=]/.test(line)) {
      problems.push(`src/${file}:${i + 1}  eqeqeq: expected === but found ==`);
    }
    if (/:\s*number\b/.test(line)) {
      problems.push(`src/${file}:${i + 1}  parse error: type annotations are not valid in a .js file`);
    }
  });
}

if (problems.length) {
  console.error('lint failed:\n' + problems.join('\n'));
  process.exit(1);
}
console.log(`lint passed (${readdirSync(SRC).length} files)`);
