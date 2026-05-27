# NagrikNazar — The Citizen's Eye 👁️

> *"Every elected leader is your employee. You have the right to know everything."*

India's most comprehensive political transparency platform — built for every Indian citizen.

## 🌐 Live Site

Deployed on Vercel (free tier) — auto-updates daily via GitHub Actions.

## 🔥 Features

| Feature | Description |
|---------|-------------|
| 👤 Politician Profiles | 12+ major politicians with criminal cases, assets, controversies, family details |
| ⚖️ Criminal Records | Pending cases tracker with party-wise comparison |
| 🏛️ Party Analysis | All major parties — scams, schemes, leadership, criminal percentage |
| 🗂️ Controversy Timeline | 12+ verified controversies with source documents |
| 💰 Budget Tracker | National + 10 State budgets with project progress |
| 📰 Live Newsroom | India politics news (GNews API integration) |

## 📊 Data Sources

All data sourced from **public records**:
- 🗳️ Election Commission of India affidavits
- 📋 ADR India (Association for Democratic Reforms)
- 🔍 CAG India reports
- 🏛️ Supreme Court judgments
- 🚔 CBI & Enforcement Directorate records
- 📊 India Budget (indiabudget.gov.in)

> **Legal Note:** All pending criminal cases are self-declared in EC affidavits. Pending cases ≠ convictions. All politicians are presumed innocent until proven guilty.

## 🚀 Deploy Your Own (Free)

### 1. Fork this repository

### 2. Deploy to Vercel (Free)
1. Go to [vercel.com](https://vercel.com) → Import GitHub repo
2. Framework: **Next.js** (auto-detected)
3. Add environment variable: `GNEWS_API_KEY` (optional, from [gnews.io](https://gnews.io))
4. Deploy!

### 3. Auto-updates via GitHub Actions
The site auto-updates daily at 6 AM IST via GitHub Actions workflow. No manual intervention needed.

Optional: Add `GNEWS_API_KEY` to GitHub Secrets for live news.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4
- **Fonts:** Bebas Neue, Playfair Display, Inter
- **Data:** Static JSON + GNews API
- **Deployment:** Vercel (free tier)
- **Auto-updates:** GitHub Actions (free)

## ⚠️ Disclaimer

- This platform aggregates publicly available government and court data
- Criminal cases shown are **pending**, not convictions
- Asset figures are self-declared in EC affidavits
- We are not affiliated with any political party
- Our only allegiance is to informed citizens

## 🤝 Contribute

Found wrong data? Open an issue with the correct source document.
Want to add more politicians/controversies? Submit a PR!

---

**Built for 1.4 billion citizens. Truth has no party.**
