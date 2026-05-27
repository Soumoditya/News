import { NextRequest, NextResponse } from "next/server";

// Using GNews API (free tier: 100 requests/day)
// Sign up at https://gnews.io to get free API key
const GNEWS_API_KEY = process.env.GNEWS_API_KEY || "";

const FALLBACK_ARTICLES = [
  {
    title: "India's 18th Lok Sabha: 251 MPs Have Criminal Cases, ADR Reports",
    description: "Association for Democratic Reforms finds nearly half of all elected MPs declared pending criminal cases in their self-sworn affidavits submitted to EC.",
    url: "https://adrindia.org",
    urlToImage: null,
    source: { name: "ADR India" },
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    category: "Election Watch",
  },
  {
    title: "SC Electoral Bond Verdict: ₹8,000 Crore Donations Linked to Regulatory Favours",
    description: "Post-electoral bond disclosure analysis reveals pattern of large donations by companies that received government licences or ED/CBI relief.",
    url: "https://www.sci.gov.in",
    urlToImage: null,
    source: { name: "Supreme Court" },
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    category: "Corruption Watch",
  },
  {
    title: "Union Budget 2024-25: Education Gets 2.5%, Interest Payments Get 23.5%",
    description: "India allocates more to servicing debt (₹11.28 lakh crore) than education and health combined, raising questions about fiscal priorities.",
    url: "https://indiabudget.gov.in",
    urlToImage: null,
    source: { name: "Ministry of Finance" },
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    category: "Economy & Budget",
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "india politics government";

  if (!GNEWS_API_KEY) {
    return NextResponse.json({ articles: FALLBACK_ARTICLES });
  }

  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=in&max=20&apikey=${GNEWS_API_KEY}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return NextResponse.json({ articles: FALLBACK_ARTICLES });
    }

    const data = await res.json();
    const articles = (data.articles || []).map((a: any) => ({
      title: a.title,
      description: a.description,
      url: a.url,
      urlToImage: a.image,
      source: { name: a.source?.name || "Unknown" },
      publishedAt: a.publishedAt,
    }));

    return NextResponse.json({ articles: articles.length > 0 ? articles : FALLBACK_ARTICLES });
  } catch (error) {
    return NextResponse.json({ articles: FALLBACK_ARTICLES });
  }
}
