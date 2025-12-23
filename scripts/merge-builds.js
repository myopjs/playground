import { cpSync, mkdirSync, existsSync, rmSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

const distDir = join(rootDir, 'dist');

// Clean and create dist directory
if (existsSync(distDir)) {
  rmSync(distDir, { recursive: true });
}
mkdirSync(distDir, { recursive: true });

// Copy stocks app to dist/stocks
const stocksDist = join(rootDir, 'packages/playground-stocks-app/dist');
if (existsSync(stocksDist)) {
  cpSync(stocksDist, join(distDir, 'stocks'), { recursive: true });
  console.log('Copied stocks app to dist/stocks');
} else {
  console.error('Stocks app dist not found');
  process.exit(1);
}

// Copy profiles app to dist/profiles
const profilesDist = join(rootDir, 'packages/playground-profiles-app/dist');
if (existsSync(profilesDist)) {
  cpSync(profilesDist, join(distDir, 'profiles'), { recursive: true });
  console.log('Copied profiles app to dist/profiles');
} else {
  console.error('Profiles app dist not found');
  process.exit(1);
}

// Copy index.html template to dist root
const indexHtml = readFileSync(join(__dirname, 'index-template.html'), 'utf-8');
writeFileSync(join(distDir, 'index.html'), indexHtml);
console.log('Created root index.html');

console.log('Build merge complete!');
