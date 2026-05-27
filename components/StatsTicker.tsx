"use client";

const TICKER_ITEMS = [
  "🔴 251 out of 543 Lok Sabha MPs have declared criminal cases in EC affidavits — Source: ADR India 2024",
  "🟠 46% of elected MPs in 18th Lok Sabha have pending criminal cases",
  "⚠️ SC struck down Electoral Bonds Feb 2024 — ₹16,518 Cr raised by parties via opaque bonds",
  "💰 Union Budget 2024-25: ₹47.96 Lakh Crore total expenditure",
  "🔴 ₹11.3 Lakh Crore (23.5% of budget) goes to interest payments on govt debt",
  "📊 Lalu Prasad Yadav: 59 pending cases — convicted in 4 Fodder Scam judgments",
  "🔴 WB Teacher Scam: SC cancelled 25,753 illegal appointments — ₹50 Cr cash seized",
  "💼 Mayawati self-declared assets: ₹112 Crore in 2022 EC affidavit",
  "⚠️ Pegasus spyware: 300+ Indian numbers targeted — journalists, opposition, activists",
  "🟠 Delhi Excise Scam: Kejriwal arrested March 2024, SC bail. AAP lost Delhi Feb 2025.",
  "📈 India GDP 2024-25: ₹329 Lakh Crore — 5th largest economy globally",
  "🔴 Manipur ethnic violence: 200+ killed, 60,000+ displaced since May 2023 — still ongoing",
  "🏛️ SC Bulldozer Justice ruling Oct 2024 — executive cannot demolish homes as punishment",
  "⚖️ Hemant Soren (Jharkhand CM) arrested by ED Jan 2024 — released June 2024, re-elected Nov 2024",
  "🟠 Rahul Gandhi is LoP in 18th Lok Sabha — first Congress LoP since 2014",
  "💰 23 states have debt-to-GSDP ratio above 30% — financial stress mounting",
  "🔴 India ranked 159/180 in Press Freedom Index 2024 — Reporters Without Borders",
  "📊 Priyanka Gandhi Vadra won Wayanad bypoll Nov 2024 — first-time MP",
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
