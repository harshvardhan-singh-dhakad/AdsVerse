import { setGlobalOptions } from 'firebase-functions';
import * as logger from 'firebase-functions/logger';
import { onSchedule, ScheduledEvent } from 'firebase-functions/v2/scheduler';
import * as https from 'https';

setGlobalOptions({ maxInstances: 10 });

export const weeklyAuditRunner = onSchedule(
  {
    schedule: '0 2 * * 0',
    timeZone: 'Asia/Kolkata',
    secrets: ['CRON_SECRET'],
  },
  async (_event: ScheduledEvent) => {
    logger.info('Weekly audit runner triggered');
    const secret = process.env.CRON_SECRET;
    const postData = JSON.stringify({});

    return new Promise<void>((resolve, reject) => {
      const options = {
        hostname: 'adsverse.in',
        port: 443,
        path: '/api/audit/scheduled',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          'x-cron-secret': secret || '',
        },
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk: string) => { body += chunk; });
        res.on('end', () => {
          logger.info(`Weekly audit runner response: ${res.statusCode} \u2014 ${body}`);
          resolve();
        });
      });

      req.on('error', (e: Error) => {
        logger.error('Weekly audit runner HTTP error:', e);
        reject(e);
      });

      req.write(postData);
      req.end();
    });
  }
);
