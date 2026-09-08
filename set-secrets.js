const { execSync } = require('child_process');
const fs = require('fs');
const dotenv = require('dotenv');

const envConfig = dotenv.parse(fs.readFileSync('.env.local'));

const secrets = [
    'GEMINI_API_KEY',
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET',
    'RAZORPAY_PLAN_1_SITE',
    'RAZORPAY_PLAN_3_SITE',
    'RAZORPAY_PLAN_5_SITE',
    'RAZORPAY_PLAN_10_SITE',
    'RAZORPAY_WEBHOOK_SECRET',
    'CRON_SECRET'
];

for (const secret of secrets) {
    if (envConfig[secret]) {
        console.log(`Setting secret ${secret}...`);
        try {
            execSync(`npx firebase-tools@latest apphosting:secrets:set ${secret}`, {
                input: envConfig[secret],
                stdio: ['pipe', 'inherit', 'inherit'],
                env: { ...process.env, CI: 'true' }
            });
            console.log(`Successfully set ${secret}`);
        } catch (e) {
            console.error(`Failed to set ${secret}`);
        }
    } else {
        console.warn(`Secret ${secret} not found in .env.local`);
    }
}
