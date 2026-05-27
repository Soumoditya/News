"use client";

const TICKER_ITEMS = [
  "🔴 251 out of 543 Lok Sabha MPs declared criminal cases in EC affidavits — ADR India 2024",
  "🟠 46% of elected MPs in 18th Lok Sabha have pending criminal cases — up from 24% in 2004",
  "⚠️ SC struck down Electoral Bonds Feb 2024 — ₹8,200 Cr went to BJP alone from opaque bonds",
  "💰 Union Budget 2024-25: ₹47.96 Lakh Crore total — ₹11.3 Lakh Crore is just interest payments",
  "🔴 Lalu Prasad Yadav: 59 pending cases — convicted in 4 Fodder Scam judgments, served jail time",
  "🏛️ WB Teacher Scam: SC cancelled 25,753 illegal appointments — ₹50 Cr cash seized from Partha Chatterjee's associate",
  "💼 Mayawati declared ₹112 Crore assets — NEET-PG cancelled 2024 after paper leak",
  "⚠️ Revanth Reddy (Telangana CM): 32 pending criminal cases including cash-for-vote scandal",
  "🟠 Delhi Excise Scam: Kejriwal arrested March 2024, SC bail Sept 2024. AAP lost Delhi Feb 2025 badly.",
  "📈 India GDP 2024-25: ₹329 Lakh Crore — 5th largest economy; but 800M still receive free ration",
  "🔴 Manipur ethnic violence: 200+ killed, 60,000+ displaced since May 2023 — internet shutdowns continue",
  "🏛️ SC Oct 2024: Executive cannot demolish homes as punishment — Yogi's Bulldozer Baba image challenged",
  "⚖️ Hemant Soren: arrested by ED Jan 2024, released June 2024, re-elected CM Nov 2024",
  "🟠 Rahul Gandhi — 4 pending criminal cases including criminal defamation (suspended sentence)",
  "💰 Siddaramaiah (Karnataka CM): Governor sanctioned prosecution in MUDA land scam Aug 2024",
  "🔴 India ranked 159/180 in Press Freedom Index 2024 — Reporters Without Borders",
  "📊 NEET-UG 2024 paper leak: 67 students scored perfect 720/720 — CBI arrested multiple accused",
  "⚡ Jyotiraditya Scindia declared ₹374 Crore assets — India's wealthiest active politicians",
  "🔴 Kamal Nath (INC): accused of role in 1984 anti-Sikh riots — never charged in 40 years",
  "💸 Himanta Biswa Sarma: assets jumped from ₹6 Cr to ₹185 Cr in 5 years on minister salary",
  "🟠 KCR's BRS govt: SIT found systematic phone tapping of politicians, journalists and judges",
  "🏛️ Chandrababu Naidu: arrested Sept 2023, 53 days in jail, returned as AP CM June 2024",
  "📊 Naveen Patnaik: 24-year CM of Odisha — lost to BJP in 2024 due to 'remote control' criticism",
  "🔴 Priyanka Gandhi: husband Robert Vadra faces ED probe, ₹200 Cr+ assets attached",
  "⚖️ K. Kavitha (KCR's daughter): arrested by ED March 2024 in Delhi liquor scam, released Sept 2024",
  "💼 64 politicians profiled on NagrikNazar — from PM Modi to Chandrashekhar Azad",
];

export default function StatsTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div style={{
      background: "rgba(230,57,70,0.08)",
      borderTop: "1px solid rgba(230,57,70,0.15)",
      borderBottom: "1px solid rgba(230,57,70,0.15)",
      overflow: "hidden",
      padding: "12px 0",
      position: "relative",
    }}>
      {/* Gradient masks */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 120,
        background: "linear-gradient(to right, #050505, transparent)",
        zIndex: 2,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: 120,
        background: "linear-gradient(to left, #050505, transparent)",
        zIndex: 2,
        pointerEvents: "none",
      }} />

      {/* Left label */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        padding: "0 1rem",
        zIndex: 3,
        background: "#E63946",
        fontSize: 11,
        fontWeight: 700,
        color: "#fff",
        letterSpacing: 2,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}>
        LIVE
      </div>

      <div style={{ paddingLeft: 80 }}>
        <div
          className="ticker-track"
          style={{
            display: "flex",
            gap: "4rem",
            whiteSpace: "nowrap",
            width: "max-content",
            animation: "ticker 80s linear infinite",
          }}
        >
          {doubled.map((item, i) => (
            <span key={i} style={{ color: "#bbb", fontSize: 13, flexShrink: 0, paddingRight: "2rem" }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
