# NagrikNazar — The Citizen's Eye 👁️

> *"Every elected leader is your employee. You have the right to know everything."*

India's most comprehensive political transparency platform — built for every Indian citizen.

## 🌐 Live Site

**[news-spxd.vercel.app](https://news-spxd.vercel.app)** — Auto-deploys on every push via GitHub Actions.

---

## 🔥 Features

| Feature | Description |
|---------|-------------|
| 👤 Politician Profiles | 12+ major politicians with criminal cases, assets, controversies, family details |
| ⚖️ Criminal Records | Pending cases tracker with party-wise comparison |
| 🏛️ Party Analysis | All major parties — scams, schemes, leadership, criminal percentage |
| 🗂️ Controversy Timeline | 12+ verified controversies with source documents |
| 💰 Budget Tracker | National + 10 State budgets with project progress |
| 📰 Live Newsroom | India politics news (GNews API integration) |

---

## ⚡ One-Time Setup (Required for Auto-Deploy)

Vercel auto-deployment is broken by default because GitHub push webhooks from external commits don't always trigger Vercel. This project uses **GitHub Actions + Vercel CLI** to guarantee every push deploys.

### Step 1 — Add your Vercel Token to GitHub Secrets

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click **Create Token** → name it `github-actions` → copy the token value
3. Go to your GitHub repo → **Settings → Secrets and variables → Actions**
4. Click **New repository secret**:
   - Name: `VERCEL_TOKEN`
   - Value: *paste your token*
5. Click **Add secret**

That's it! Every push to `main` will now auto-deploy. ✅

### Step 2 (Optional) — Add GNews API Key for Live News

1. Register free at [gnews.io](https://gnews.io) → get your API key
2. Add to GitHub Secrets: `GNEWS_API_KEY` = *your key*
3. News will now refresh daily at 6 AM IST automatically

---

## 📊 Data Sources

All data sourced from **public records only**:
- 🗳️ Election Commission of India (EC affidavits)
- 📋 ADR India (Association for Democratic Reforms)
- 🔍 CAG India audit reports
- 🏛️ Supreme Court of India judgments
- 🚔 CBI & Enforcement Directorate records
- 📊 Union Budget (indiabudget.gov.in)

> **Legal Note:** All pending criminal cases are self-declared in EC affidavits. Pending cases ≠ convictions. All politicians are presumed innocent until proven guilty.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4
- **Fonts:** Bebas Neue, Playfair Display, Inter
- **Data:** Static JSON + GNews API
- **Deployment:** Vercel (free tier) via GitHub Actions
- **Auto-updates:** GitHub Actions cron (daily 6 AM IST)

---

## ⚠️ Disclaimer

- This platform aggregates publicly available government and court data
- Criminal cases shown are **pending**, not convictions
- Asset figures are self-declared in EC affidavits
- We are not affiliated with any political party
- Our only allegiance is to 1.4 billion informed citizens

---

**Built for India. Truth has no party.**
