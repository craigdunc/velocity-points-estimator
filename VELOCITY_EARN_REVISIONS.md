# Velocity Earn Case Studies — Revisions

## 1. Welcome Bonus Toggle

### Concept
A checkbox on bonus-driven WTEs, labeled **"Include welcome bonus"**, defaulting to **ON**. When toggled off, points drop to the ongoing-only amount — clearly showing the member what they'd earn in Year 2+.

### Which WTEs get the toggle?

| WTE | Bonus type | Bonus amount |
|-----|-----------|-------------|
| AGL Energy | Switching bonus (one-time) | Up to 35,000 |
| Points Earning Credit Card | Welcome bonus (one-time) | 50,000–100,000 |
| QBE Car Insurance | New customer bonus (one-time) | 30,000 |
| QBE Home Insurance | New customer bonus (one-time) | 30,000 |
| Medibank Health Insurance | New member bonus (one-time) | Up to 60,000 |

WTEs like Flybuys, 7-Eleven, eStore, etc. don't have meaningful one-time bonuses — no toggle needed.

### Data structure change
Add `bonusPts` to each tier object. Existing `pts` stays as the total (with bonus). UI computes ongoing-only as `pts - bonusPts`.

```js
// Example: AGL Energy, Med tier
{ spend: 5000, pts: 40000, bonusPts: 35000 }
// Toggle ON:  shows 40,000 pts
// Toggle OFF: shows 5,000 pts (ongoing only)
```

Add a WTE-level flag to know when to render the toggle:
```js
{ id: 3, name: 'AGL Energy', hasWelcomeBonus: true, welcomeBonusLabel: 'switching bonus', ... }
```

---

## 2. Revised AGL Energy (with real switching data)

**Real earn structure (NSW, QLD, SA, VIC):**
- Switch electricity + gas: 30,000 upfront + 5,000 after 12 months = **35,000 total**
- Switch electricity only: **22,500** (including bonus)
- Switch gas only: **12,500** (including bonus)
- Ongoing earn on bills: assumed ~1 pt per $1

**Tier logic:** The tiers represent different household sizes AND which services they switch. A small apartment might only have electricity; a large family home has gas + electricity + potentially mobile/internet.

| Tier | Spend/yr | Pts (bonus ON) | bonusPts | Pts (bonus OFF) | Who this is |
|------|----------|---------------|----------|-----------------|-------------|
| Low | $2,000 | 15,000 | 12,500 | 2,500 | Apartment, gas only switch |
| Med-Low | $3,500 | 25,000 | 22,500 | 2,500 | Small home, electricity only switch |
| Med | $5,000 | 40,000 | 35,000 | 5,000 | Family home, switch electricity + gas |
| Med-High | $7,500 | 42,000 | 35,000 | 7,000 | Large home, full switch + higher usage |
| High | $10,000 | 45,000 | 35,000 | 10,000 | Big household, full switch, high usage zone |

**All 5 point values are distinct** ✓ (15k / 25k / 40k / 42k / 45k)
**Without bonus, all 5 are distinct** ✓ (2,500 / 2,500... wait)

Hmm — Low and Med-Low both show 2,500 without bonus. Let me adjust:

| Tier | Spend/yr | Pts (bonus ON) | bonusPts | Pts (bonus OFF) | Who this is |
|------|----------|---------------|----------|-----------------|-------------|
| Low | $2,000 | 15,000 | 12,500 | 2,500 | Apartment, gas only switch |
| Med-Low | $3,500 | 26,000 | 22,500 | 3,500 | Small home, electricity only switch |
| Med | $5,000 | 40,000 | 35,000 | 5,000 | Family home, switch electricity + gas |
| Med-High | $7,500 | 42,500 | 35,000 | 7,500 | Large home, full switch + higher usage |
| High | $10,000 | 45,000 | 35,000 | 10,000 | Big household, full switch, all AGL services |

**Bonus ON: 5 distinct values** ✓ (15k / 26k / 40k / 42.5k / 45k)
**Bonus OFF: 5 distinct values** ✓ (2.5k / 3.5k / 5k / 7.5k / 10k)

---

## 3. Revised QBE Car Insurance (5 distinct values)

**Real earn:** 30,000 new customer bonus. 10,000 renewal bonus. Offer through June 2026. Assume ~1 pt/$1 ongoing on premiums.

**Tier logic:** All tiers assume new customer (this is an onboarding demo). Variation comes from vehicle value, coverage level, and number of vehicles.

| Tier | Spend/yr | Pts (bonus ON) | bonusPts | Pts (bonus OFF) | Who this is |
|------|----------|---------------|----------|-----------------|-------------|
| Low | $800 | 31,000 | 30,000 | 1,000 | New customer, older/low-value car, basic comprehensive |
| Med-Low | $1,200 | 31,500 | 30,000 | 1,500 | New customer, average sedan |
| Med | $1,800 | 32,000 | 30,000 | 2,000 | New customer, newer car, full comprehensive |
| Med-High | $2,500 | 32,500 | 30,000 | 2,500 | New customer, SUV or luxury vehicle |
| High | $4,000 | 34,000 | 30,000 | 4,000 | New customer, two vehicles on one policy |

**Bonus ON: 5 distinct** ✓ (31k / 31.5k / 32k / 32.5k / 34k)
**Bonus OFF: 5 distinct** ✓ (1k / 1.5k / 2k / 2.5k / 4k)

**Note:** These are tightly clustered with the bonus on — that's realistic. The bonus dominates. Toggling OFF makes the insurance value proposition much clearer ("oh, without the bonus, this is only worth ~2k pts"). That's actually a useful insight for the onboarding.

---

## 4. Revised QBE Home Insurance (5 distinct values)

| Tier | Spend/yr | Pts (bonus ON) | bonusPts | Pts (bonus OFF) | Who this is |
|------|----------|---------------|----------|-----------------|-------------|
| Low | $1,000 | 31,000 | 30,000 | 1,000 | Contents only (renter), basic cover |
| Med-Low | $1,500 | 31,500 | 30,000 | 1,500 | Apartment, home + contents |
| Med | $2,500 | 32,500 | 30,000 | 2,500 | Family home, standard cover |
| Med-High | $3,500 | 33,500 | 30,000 | 3,500 | Large home, comprehensive + extras |
| High | $5,000 | 35,000 | 30,000 | 5,000 | High-value property, max coverage |

**Bonus ON: 5 distinct** ✓ (31k / 31.5k / 32.5k / 33.5k / 35k)
**Bonus OFF: 5 distinct** ✓ (1k / 1.5k / 2.5k / 3.5k / 5k)

---

## 5. Revised Medibank Health Insurance (5 distinct values)

Already had 5 distinct values, but adding bonus data:

The bonus structure is tiered: up to 60,000 pts for comprehensive family, less for simpler covers.

| Tier | Spend/yr | Pts (bonus ON) | bonusPts | Pts (bonus OFF) | Who this is |
|------|----------|---------------|----------|-----------------|-------------|
| Low | $1,500 | 5,000 | 0 | 5,000 | Basic extras only, no new member bonus eligible |
| Med-Low | $2,500 | 15,000 | 10,000 | 5,000 | Hospital basic, partial new member bonus |
| Med | $4,000 | 30,000 | 25,000 | 5,000 | Hospital + extras, new customer (couples) |
| Med-High | $5,500 | 45,000 | 40,000 | 5,000 | Comprehensive family, new customer |
| High | $7,000 | 60,000 | 52,000 | 8,000 | Top hospital + extras, family, max bonus |

Wait — the "bonus OFF" values are too flat (5k/5k/5k/5k/8k). That's because ongoing health insurance earn per-dollar is quite low.

Let me recalibrate assuming ongoing earn ≈ 0.5–1 pt per $1 on premiums:

| Tier | Spend/yr | Pts (bonus ON) | bonusPts | Pts (bonus OFF) | Who this is |
|------|----------|---------------|----------|-----------------|-------------|
| Low | $1,500 | 5,000 | 3,500 | 1,500 | Basic extras only, small bonus |
| Med-Low | $2,500 | 15,000 | 12,500 | 2,500 | Hospital basic, new member bonus |
| Med | $4,000 | 30,000 | 26,000 | 4,000 | Hospital + extras, new customer |
| Med-High | $5,500 | 45,000 | 39,500 | 5,500 | Comprehensive family, new customer |
| High | $7,000 | 60,000 | 53,000 | 7,000 | Top hospital + extras, family, max bonus |

**Bonus ON: 5 distinct** ✓ (5k / 15k / 30k / 45k / 60k)
**Bonus OFF: 5 distinct** ✓ (1.5k / 2.5k / 4k / 5.5k / 7k)

---

## 6. Revised Points Earning Credit Card

| Tier | Spend/yr | Pts (bonus ON) | bonusPts | Pts (bonus OFF) | Who this is |
|------|----------|---------------|----------|-----------------|-------------|
| Low | $10,000 | 50,000 | 40,000 | 10,000 | Modest use, got card mainly for bonus |
| Med-Low | $20,000 | 75,000 | 55,000 | 20,000 | Regular household spend |
| Med | $35,000 | 100,000 | 65,000 | 35,000 | All household bills + everyday on card |
| Med-High | $50,000 | 125,000 | 75,000 | 50,000 | High spender + supplementary card |
| High | $80,000 | 175,000 | 95,000 | 80,000 | Business-level spend, multi-card |

**Bonus ON: 5 distinct** ✓ (50k / 75k / 100k / 125k / 175k)
**Bonus OFF: 5 distinct** ✓ (10k / 20k / 35k / 50k / 80k)

---

## Updated Summary Table (replacing original for these 6 WTEs)

All other WTEs (Flybuys, 7-Eleven, eStore, Virgin Wines, VM Velocity Flyer, Flights, Hotels, Accor, Hotel Transfers, Car Rentals, VA Holidays, Luxury Escapes) remain unchanged from the original VELOCITY_EARN_CASES.md — they have no welcome/switching bonus to toggle.

| # | WTE | hasBonus | Low | Med-Low | Med | Med-High | High |
|---|-----|----------|-----|---------|-----|----------|------|
| 3 | AGL Energy | ✓ switch | $2k→15k | $3.5k→26k | $5k→40k | $7.5k→42.5k | $10k→45k |
| 7 | Premium Credit Card | ✓ welcome | $10k→50k | $20k→75k | $35k→100k | $50k→125k | $80k→175k |
| 8 | QBE Car Insurance | ✓ new customer | $800→31k | $1.2k→31.5k | $1.8k→32k | $2.5k→32.5k | $4k→34k |
| 9 | QBE Home Insurance | ✓ new customer | $1k→31k | $1.5k→31.5k | $2.5k→32.5k | $3.5k→33.5k | $5k→35k |
| 10 | Medibank | ✓ new member | $1.5k→5k | $2.5k→15k | $4k→30k | $5.5k→45k | $7k→60k |
