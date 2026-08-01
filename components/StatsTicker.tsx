"use client";
import stats from "@/data/stats.json";

/**
 * Live-facts ticker. Every item is sourced (data/stats.json) and links to the
 * record behind it — no more unsourced hardcoded numbers.
 */
export default function StatsTicker() {
  const doubled = [...stats, ...stats];

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
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to right, #050505, transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to left, #050505, transparent)", zIndex: 2, pointerEvents: "none" }} />

      {/* Left label */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        display: "flex", alignItems: "center", padding: "0 1rem",
        zIndex: 3, background: "#E63946",
        fontSize: 11, fontWeight: 700, color: "#fff",
        letterSpacing: 2, textTransform: "uppercase", whiteSpace: "nowrap",
      }}>
        Sourced
      </div>

      <div style={{ paddingLeft: 80 }}>
        <div
          className="ticker-track"
          style={{ display: "flex", gap: "3rem", whiteSpace: "nowrap", width: "max-content", animation: "ticker 90s linear infinite" }}
        >
          {doubled.map((item, i) => (
            <a
              key={i}
              href={item.source}
              target="_blank"
              rel="noopener noreferrer"
              title={`Source: ${item.sourceLabel} · verified ${item.verifiedOn}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                color: "#bbb", fontSize: 13, flexShrink: 0, textDecoration: "none",
              }}
            >
              <span>{item.text}</span>
              <span style={{
                fontSize: 10, color: "#4ade80", fontWeight: 600,
                border: "1px solid rgba(74,222,128,0.3)", borderRadius: 4,
                padding: "1px 6px", whiteSpace: "nowrap",
              }}>
                {item.sourceLabel} ↗
              </span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
