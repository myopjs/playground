import { cpSync, mkdirSync, existsSync, rmSync } from 'fs';
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

// Create a simple index.html at root that redirects or shows links
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Playground Apps</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .container {
      text-align: center;
    }
    h1 {
      color: #333;
    }
    .links {
      display: flex;
      gap: 2rem;
      margin-top: 2rem;
    }
    a {
      padding: 1rem 2rem;
      background: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-size: 1.1rem;
    }
    a:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Playground Apps</h1>
    <div class="links">
      <a href="/stocks/">Stocks App</a>
      <a href="/profiles/">Profiles App</a>
    </div>
  </div>
</body>
</html>`;

import { writeFileSync } from 'fs';
writeFileSync(join(distDir, 'index.html'), indexHtml);
console.log('Created root index.html');

console.log('Build merge complete!');
