// src/onboardingConfig.ts

// Import images so bundler rewrites URLs at build time
import redEnergyIllustration from './assets/images/red-energy-illustration.png';
import everydayRewardsIllustration from './assets/images/everyday-rewards-illustration.png';
import everydayRewardsPointsIllustration from './assets/images/everyday-rewards-points.png';
import noFeeCardIllustration from './assets/images/no-fee-card-illustration.png';
import noFeeCardAmexIllustration from './assets/images/no-fee-card-amex.png';
import noFeeCardTipsIllustration from './assets/images/no-fee-card-tips.png';
import bpRewardsIllustration from './assets/images/bp-rewards-illustration.png';
import bpRewardsCardIllustration from './assets/images/bp-rewards-card.png';
import wellbeingIllustration from './assets/images/wellbeing-illustration.png';
import qantasPayIllustration from './assets/images/qantas-pay-illustration.png';
import bingeIllustration from './assets/images/binge-illustration.png';

export type StepType =
  | { kind: 'info', title: string, body: string, imageSrc?: string }
  | { kind: 'externalLink', title: string, body: string, url: string, label: string, imageSrc?: string }
  | { kind: 'survey', title: string, question: string, options: string[], externalLinkIf?: { match: string, url: string, label: string } }
  | { kind: 'pickMany', title: string, choices: string[] }
  | { kind: 'pickOne', title: string, choices: string[] };

// For each WTE id, list exactly 4 steps.
export const WTEOnboarding: Record<number, StepType[]> = {
  1: [
    {
      kind: 'externalLink',
      title: 'Red Energy for gas and electricity',
      body: 'Brighten up your travel plans with regular boosts of Velocity Points, just by paying your regular household electricity and gas bills on time.',
      url: 'https://www.qantas.com/au/en/frequent-flyer/partners/red-energy.html',
      label: 'Learn More',
      imageSrc: redEnergyIllustration
    },
    { kind: 'info', title: 'Switch to Red Energy', body: 'Up to 15,000 bonus Velocity Points when you switch your electricity and gas, and have paid your first bill in full.' },
    { kind: 'info', title: 'Make the most of your plan', body: 'Once you’ve made the switch, you will earn 2 Velocity Points per $1 spent on your on-time bills. You can also earn 1,500 Velocity Points per referral.' },
    {
      kind: 'survey',
      title: 'Would you like to check AGL Energy plans now?',
      question: 'Choose one:',
      options: ['Yes, show me', 'Maybe later', 'No'],
      externalLinkIf: { match: 'Yes, show me', url: 'https://www.redenergy.com.au/qantas', label: 'Go to Red Energy' }
    }
  ],
  2: [
    {
      kind: 'survey',
      title: 'Let’s set up Everyday Rewards',
      question: 'Are you already an Everyday Rewards member?',
      options: ['Yes', 'No'],
      externalLinkIf: {
        match: 'No',
        url: 'https://www.everyday.com.au/register_multi.html',
        label: 'Join Everyday Rewards'
      }
    },
    {
      kind: 'survey',
      title: 'Earn Velocity Points with Everyday Rewards',
      question: 'Have you set Velocity Points as your rewards choice?',
      options: ['Yes', 'No'],
      externalLinkIf: {
        match: 'No',
        url: 'https://auth.everyday.com.au/u/login',
        label: 'Choose Velocity Points'
      }
    },
    {
      kind: 'externalLink',
      title: 'Earn 6x more points by boosting Everyday Rewards',
      body: 'Did you know that members who regularly boost, shop and scan earn 6x more Everyday Rewards points? Download the Everyday Rewards app and hit Boost before you shop.',
      url: 'https://rewards.app.link/51NaeDjgWrb',
      label: 'Get the app',
      imageSrc: everydayRewardsIllustration
    },
    {
      kind: 'info',
      title: 'Happy shopping!',
      body: 'You’re all set. Everyday Rewards will convert to Velocity Points after you collect 2,000 EDR points.',
      imageSrc: everydayRewardsPointsIllustration
    }
  ],
  3: [
    {
      kind: 'survey',
      title: 'Bank of Queensland Specialist',
      question: 'Are you a doctor, dentist, vet or accountant?',
      options: ['Yes', 'No'],
      externalLinkIf: { match: 'Yes', url: 'https://cardsandbanking.qantas.com/partners/boq-specialist', label: 'Learn more about BOQ Specialist' }
    },
    {
      kind: 'externalLink',
      title: 'Choose the right no-annual-fee card for you',
      body: 'Pick your card and keep it simple. The Velocity Card Selector can help',
      url: 'https://cardsandbanking.qantas.com/compare-credit-cards/american-express?sortBy=default&maxAnnualFee=0&cardProviders=boq-specialist',
      label: 'Compare Velocity Points earning credit cards',
      imageSrc: noFeeCardIllustration
    },
    {
      kind: 'externalLink',
      title: 'American Express Discovery Card',
      body: 'Earn 2 Velocity Points per $1 spent on eligible Virgin Australia flights and up to 1.5 Velocity Points per $1 spent on everyday purchases^',
      url: 'https://www.qantas.com/au/en/frequent-flyer/member-offers/qantas-american-express-discovery-card.html',
      label: 'Learn more',
      imageSrc: noFeeCardAmexIllustration
    },
    {
      kind: 'externalLink',
      title: 'Tips on how to never miss a point',
      body: 'Make it possible with your Velocity Points earning credit card.',
      url: 'https://www.qantas.com/au/en/frequent-flyer/categories/cards-and-banking/maximise-qantas-points-tips.html',
      label: 'See the tips',
      imageSrc: noFeeCardTipsIllustration
    }
  ],
  4: [
    {
      kind: 'externalLink',
      title: 'Fuel up and earn every time',
      body: 'Scan your card when you fill up at 7-Eleven to earn Velocity Points automatically.',
      url: 'https://www.qantas.com/au/en/frequent-flyer/partners/bp.html',
      label: 'Find out more',
      imageSrc: bpRewardsIllustration
    },
    {
      kind: 'survey',
      title: 'Join BP Rewards',
      question: 'Are you already a member of BP Rewards?',
      options: ['Yes', 'No'],
      externalLinkIf: { match: 'No', url: 'https://www.qantas.com/au/en/frequent-flyer/partners/bp/join-bp-rewards.html', label: 'Join BP Rewards' }
    },
    {
      kind: 'info',
      title: 'Tap your Velocity card at 7-Eleven',
      body: 'Scan your digital Velocity Frequent Flyer card at the counter to be rewarded with points. You can use the Virgin Australia app, or add your Velocity card to your Google Pay or Apple Wallet.',
      imageSrc: bpRewardsCardIllustration
    },
    {
      kind: 'info',
      title: 'Get earning at BP',
      body: 'Earn Velocity Points per litre on fuel and per $1 spent on eligible in-store items at 7-Eleven. Points will show in your Velocity account within seven days.'
    }
  ],
  5: [
    {
      kind: 'info',
      title: 'Get points for staying active',
      body: 'Download the Velocity app to track your points and manage your account.',
      imageSrc: wellbeingIllustration
    },
    { kind: 'pickMany', title: 'Which activities do you already track?', choices: ['Steps', 'Sleep', 'Cycling', 'Meditation', 'None'] },
    {
      kind: 'survey',
      title: 'Do you already use the Velocity app?',
      question: 'Choose one:',
      options: ['Yes', 'No', 'I’ve used it before']
    },
    {
      kind: 'info',
      title: 'Bonus points for new users',
      body: 'Earn up to 1,000 points in your first 28 days. Challenges and daily goals keep you moving!'
    }
  ],
  6: [
    {
      kind: 'info',
      title: 'Pay and earn, even overseas',
      body: 'Velocity Flyer Card earns 1.5 points per $1 spent overseas and 1 point per $4 in Australia.',
      imageSrc: qantasPayIllustration
    },
    {
      kind: 'survey',
      title: 'Have you set up your Velocity account yet?',
      question: 'Let us know:',
      options: ['Yes', 'No', 'Not sure']
    },
    { kind: 'pickOne', title: 'How would you prefer to use your Velocity card?', choices: ['Tap & go in-store', 'Online shopping', 'Travel spending', 'Not sure yet'] },
    { kind: 'pickMany', title: 'Which of these benefits appeal to you?', choices: ['No foreign transaction fees', 'Multi-currency wallet', 'Earn Velocity Points', 'Track spending'] },
  ],
  7: [
    { kind: 'pickOne', title: 'Are you currently subscribed to BINGE?', choices: ['Yes', 'No', 'Used to be'] },
    {
      kind: 'info',
      title: 'Watch and earn',
      body: 'Earn bonus points on eligible entertainment and streaming subscriptions.',
      imageSrc: bingeIllustration
    },
    { kind: 'pickMany', title: 'What are your top binge genres?', choices: ['Drama', 'Comedy', 'Docos', 'Reality', 'Kids shows'] },
    { kind: 'survey', title: 'Would you switch for points?', question: 'Be honest:', options: ['Yes, definitely', 'Maybe', 'Probably not'] },
  ],
};
