"use client";

const TICKER_ITEMS = [
  "🔴 251 out of 543 Lok Sabha MPs have declared criminal cases",
  "🟠 46% of elected representatives have pending cases",
  "⚠️ Electoral Bonds declared unconstitutional by Supreme Court — ₹16,518 Cr collected",
  "💰 Union Budget 2024-25: ₹47.96 Lakh Crore",
  "🔴 ₹11.3 Lakh Crore goes to interest payments — 23.5% of budget",
  "📊 Lalu Prasad Yadav: 59 pending criminal cases — convicted in Fodder Scam",
  "🔴 Sandeshkhali: CBI investigating TMC leader Sheikh Shahjahan for atrocities",
  "💼 Mayawati's declared assets: ₹112 Crore",
  "⚠️ Pegasus spyware: 300+ Indian phone numbers targeted including journalists, opposition",
  "🟠 Delhi Excise Scam: Kejriwal granted bail by Supreme Court",
  "📈 India GDP 2024-25: ₹329 Lakh Crore",
  "🔴 Manipur violence: 200+ killed, 60,000+ displaced since May 2023",
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
            animation: "ticker 60s linear infinite",
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
