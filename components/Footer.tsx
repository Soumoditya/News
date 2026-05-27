"use client";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "4rem 1.5rem 2rem",
      background: "#050505",
      marginTop: "4rem",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "3rem",
          marginBottom: "3rem",
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
              <div style={{
                width: 36, height: 36,
                background: "linear-gradient(135deg, #FF6B2B, #E63946)",
                borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Eye size={20} color="white" />
              </div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#fff", letterSpacing: 1 }}>
                NAGRK<span style={{ color: "#FF6B2B" }}>NAZAR</span>
              </div>
            </div>
            <p style={{ color: "#666", fontSize: 13, lineHeight: 1.7, maxWidth: 280 }}>
              India's most comprehensive political transparency platform. All data sourced from public records — Election Commission affidavits, CAG reports, ADR India, and court documents.
            </p>
            <p style={{ color: "#444", fontSize: 11, marginTop: "1rem" }}>
              ⚠️ Data is sourced from publicly available government & court records. All criminal cases mentioned are pending unless explicitly noted as convictions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: "1rem" }}>
              Explore
            </h4>
            {[
              ["/politicians", "Politician Profiles"],
              ["/parties", "Political Parties"],
              ["/criminal-records", "Criminal Records"],
              ["/controversies", "Controversies"],
              ["/budget", "Budget Tracker"],
              ["/news", "Live News"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                style={{ display: "block", color: "#555", fontSize: 13, marginBottom: 8, textDecoration: "none" }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.color = "#FF6B2B"}
                onMouseLeave={(e) => (e.target as HTMLElement).style.color = "#555"}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Data Sources */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: "1rem" }}>
              Data Sources
            </h4>
            {[
              "Election Commission of India",
              "ADR India (adrindia.org)",
              "CAG India (cag.gov.in)",
              "Enforcement Directorate",
              "CBI (cbi.gov.in)",
              "Supreme Court Records",
              "National Crime Records Bureau",
              "India Budget (indiabudget.gov.in)",
            ].map((s) => (
              <div key={s} style={{ color: "#555", fontSize: 12, marginBottom: 6 }}>• {s}</div>
            ))}
          </div>

          {/* Stats */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: "1rem" }}>
              Platform Stats
            </h4>
            {[
              ["251", "MPs with Criminal Cases (18th LS)"],
              ["₹1.6L Cr", "Fiscal Deficit FY25"],
              ["543", "Lok Sabha Constituencies Tracked"],
              ["36", "States & UTs Covered"],
              ["Real-time", "News Updates"],
            ].map(([val, label]) => (
              <div key={label} style={{ marginBottom: 12 }}>
                <div style={{ color: "#FF6B2B", fontSize: 16, fontWeight: 700, fontFamily: "'Bebas Neue', sans-serif" }}>{val}</div>
                <div style={{ color: "#555", fontSize: 11 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <p style={{ color: "#444", fontSize: 12 }}>
            © 2024 NagrikNazar. Built for Indian citizens. Data from public records.
            <span style={{ color: "#333" }}> Not affiliated with any political party.</span>
          </p>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <a
              href="https://github.com/soumoditya/News"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#444", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}
            >
              🐙
              Open Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
