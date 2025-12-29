import { execSync } from 'child_process';

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;
const APP_NAME = process.env.AWS_APP_ID || 'Playground';
const BRANCH = process.env.AWS_BRANCH || 'unknown';

async function notify(status, message) {
  if (!WEBHOOK_URL) {
    console.log(`[Discord] Skipping notification (no webhook): ${status} - ${message}`);
    return;
  }

  const emoji = { started: '🔨', success: '✅', failed: '❌' }[status];
  const color = { started: 0x3498db, success: 0x2ecc71, failed: 0xe74c3c }[status];

  const payload = {
    embeds: [{
      title: `${emoji} Build ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      description: message,
      color,
      fields: [
        { name: 'App', value: APP_NAME, inline: true },
        { name: 'Branch', value: BRANCH, inline: true },
      ],
      timestamp: new Date().toISOString(),
    }]
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`[Discord] Failed to send notification: ${response.status}`);
    }
  } catch (error) {
    console.error(`[Discord] Error sending notification: ${error.message}`);
  }
}

async function run() {
  const startTime = Date.now();

  await notify('started', `Building ${APP_NAME} on branch ${BRANCH}`);

  try {
    execSync('npm run build:local', { stdio: 'inherit' });

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    await notify('success', `Build completed in ${duration}s`);

  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    await notify('failed', `Build failed after ${duration}s`);
    process.exit(1);
  }
}

run();
