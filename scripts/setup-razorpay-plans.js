const Razorpay = require('razorpay');
const fs = require('fs');

const razorpay = new Razorpay({
  key_id: 'rzp_test_TKmw2FXlZDc79a',
  key_secret: 'kGkVBjPwLJo0v9ZjBubyz9GB',
});

const plans = [
  {
    id: '1_site',
    data: {
      period: 'monthly',
      interval: 1,
      item: {
        name: 'AdsVerse SEO - 1 Website',
        amount: 29900,
        currency: 'INR',
        description: 'Monthly subscription for 1 tracked website'
      }
    }
  },
  {
    id: '3_site',
    data: {
      period: 'monthly',
      interval: 1,
      item: {
        name: 'AdsVerse SEO - 3 Websites',
        amount: 44900,
        currency: 'INR',
        description: 'Monthly subscription for 3 tracked websites'
      }
    }
  },
  {
    id: '5_site',
    data: {
      period: 'monthly',
      interval: 1,
      item: {
        name: 'AdsVerse SEO - 5 Websites',
        amount: 59900,
        currency: 'INR',
        description: 'Monthly subscription for 5 tracked websites'
      }
    }
  },
  {
    id: '10_site',
    data: {
      period: 'monthly',
      interval: 1,
      item: {
        name: 'AdsVerse SEO - 10 Websites',
        amount: 99900,
        currency: 'INR',
        description: 'Monthly subscription for 10 tracked websites'
      }
    }
  }
];

async function setup() {
  try {
    let envAdditions = `\n# Razorpay Plan IDs\n`;
    for (const plan of plans) {
      console.log(`Creating plan for ${plan.id}...`);
      const response = await razorpay.plans.create(plan.data);
      console.log(`Created: ${response.id}`);
      envAdditions += `RAZORPAY_PLAN_${plan.id.toUpperCase()}=${response.id}\n`;
    }
    
    fs.appendFileSync('.env.local', envAdditions);
    console.log('Successfully created plans and updated .env.local');
  } catch (error) {
    console.error('Error creating plans:', error);
  }
}

setup();
