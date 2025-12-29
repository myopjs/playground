const WEBHOOK_URL = process.env.DISCORD_WEBHOOK;
const APP_NAME = process.env.AWS_APP_ID || 'Playground';
const BRANCH = process.env.AWS_BRANCH || 'unknown';
const COMMIT_ID = process.env.AWS_COMMIT_ID?.slice(0, 7) || '';

async function notify() {
  if (!WEBHOOK_URL) {
    console.log('[Discord] Skipping notification (no webhook)');
    return;
  }

  const payload = {
    embeds: [{
      title: '🔨 Build Started',
      description: `Building ${APP_NAME} on branch ${BRANCH}`,
      color: 0x3498db,
      fields: [
        { name: 'App', value: APP_NAME, inline: true },
        { name: 'Branch', value: BRANCH, inline: true },
        ...(COMMIT_ID ? [{ name: 'Commit', value: COMMIT_ID, inline: true }] : []),
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
    } else {
      console.log('[Discord] Build start notification sent');
    }
  } catch (error) {
    console.error(`[Discord] Error sending notification: ${error.message}`);
  }
}

notify();
