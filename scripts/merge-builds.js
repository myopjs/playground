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

// Copy hr-app to dist/hr-app
const hrAppDist = join(rootDir, 'packages/playground-hr-app/dist');
if (existsSync(hrAppDist)) {
  cpSync(hrAppDist, join(distDir, 'hr-app'), { recursive: true });
  console.log('Copied hr-app to dist/hr-app');
} else {
  console.error('HR app dist not found');
  process.exit(1);
}

// Copy index.html template to dist root
const indexHtml = readFileSync(join(__dirname, 'index-template.html'), 'utf-8');
writeFileSync(join(distDir, 'index.html'), indexHtml);
console.log('Created root index.html');

// Copy favicon files from public to dist
const publicDir = join(rootDir, 'public');
if (existsSync(publicDir)) {
  const faviconFiles = [
    'favicon.ico',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon-57x57.png',
    'favicon-60x60.png',
    'favicon-72x72.png',
    'favicon-76x76.png',
    'favicon-96x96.png',
    'favicon-114x114.png',
    'favicon-120x120.png',
    'favicon-144x144.png',
    'favicon-152x152.png',
    'favicon-180x180.png',
    'favicon-192x192.png'
  ];

  faviconFiles.forEach(file => {
    const src = join(publicDir, file);
    if (existsSync(src)) {
      cpSync(src, join(distDir, file));
    }
  });
  console.log('Copied favicon files to dist');
} else {
  console.warn('Public directory not found, skipping favicon copy');
}

console.log('Build merge complete!');
