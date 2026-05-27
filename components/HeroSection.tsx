"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown, Eye, AlertCircle } from "lucide-react";

const HERO_STATS = [
  { value: "251", label: "MPs with Criminal Cases" },
  { value: "46%", label: "of Lok Sabha has Pending Cases" },
  { value: "₹47.96L Cr", label: "Union Budget 2024-25" },
  { value: "₹16,518 Cr", label: "Electoral Bonds — Total" },
];

export default function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentStat((s) => (s + 1) % HERO_STATS.length);
    }, 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      padding: "6rem 1.5rem 4rem",
      textAlign: "center",
    }}>
      {/* Background gradient blobs */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "5%",
        width: "50vw",
        height: "50vw",
        maxWidth: 700,
        maxHeight: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,107,43,0.08) 0%, transparent 70%)",
        filter: "blur(60px)",
        animation: "float 8s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "10%",
        right: "5%",
        width: "40vw",
        height: "40vw",
        maxWidth: 600,
        maxHeight: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(230,57,70,0.06) 0%, transparent 70%)",
        filter: "blur(60px)",
        animation: "float 10s ease-in-out infinite reverse",
        pointerEvents: "none",
      }} />

      {/* Live badge */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(230,57,70,0.1)",
        border: "1px solid rgba(230,57,70,0.3)",
        borderRadius: 100,
        padding: "6px 16px",
        marginBottom: "2rem",
        fontSize: 12,
        color: "#E63946",
        fontWeight: 600,
        letterSpacing: 2,
        textTransform: "uppercase",
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "#E63946",
          animation: "pulse 2s ease-in-out infinite",
          display: "inline-block",
        }} />
        Live Data • Updated Continuously
      </div>

      {/* Main headline */}
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(4rem, 12vw, 10rem)",
          lineHeight: 0.95,
          letterSpacing: 2,
          marginBottom: "1.5rem",
          color: "#fff",
        }}>
          <span style={{ display: "block" }}>NAGRK</span>
          <span style={{
            display: "block",
            background: "linear-gradient(135deg, #FF6B2B 0%, #E63946 50%, #FFB703 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>NAZAR</span>
        </h1>

        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
          color: "#888",
          maxWidth: 700,
          margin: "0 auto 1rem",
          lineHeight: 1.6,
          fontStyle: "italic",
        }}>
          "Every elected leader is your employee. You have the right to know everything."
        </p>

        <p style={{ color: "#555", fontSize: 14, marginBottom: "3rem", letterSpacing: 0.5 }}>
          Criminal records • Assets • Controversies • Budget tracker • Government project progress
        </p>
      </div>

      {/* Rotating stat */}
      <div style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "3rem",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        <div style={{
          padding: "1.5rem 2.5rem",
          background: "rgba(255,107,43,0.08)",
          border: "1px solid rgba(255,107,43,0.2)",
          borderRadius: 16,
          minWidth: 220,
          transition: "all 0.5s ease",
        }}>
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 48,
            color: "#FF6B2B",
            lineHeight: 1,
            transition: "all 0.5s",
          }}>
            {HERO_STATS[currentStat].value}
          </div>
          <div style={{ color: "#888", fontSize: 13, marginTop: "0.25rem" }}>
            {HERO_STATS[currentStat].label}
          </div>
        </div>

        {/* Alert box */}
        <div style={{
          padding: "1.5rem",
          background: "rgba(230,57,70,0.06)",
          border: "1px solid rgba(230,57,70,0.15)",
          borderRadius: 16,
          maxWidth: 320,
          textAlign: "left",
          display: "flex",
          gap: "0.75rem",
          alignItems: "flex-start",
        }}>
          <AlertCircle size={20} color="#E63946" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ color: "#E63946", fontWeight: 700, fontSize: 13, marginBottom: "0.25rem" }}>
              Did you know?
            </div>
            <div style={{ color: "#777", fontSize: 12, lineHeight: 1.6 }}>
              46% of elected MPs in the 18th Lok Sabha have declared pending criminal cases in their own affidavits submitted to the Election Commission.
            </div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "4rem" }}>
        <Link href="/politicians" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "linear-gradient(135deg, #FF6B2B, #E63946)",
          color: "#fff",
          padding: "16px 36px",
          borderRadius: 10,
          textDecoration: "none",
          fontWeight: 700,
          fontSize: 15,
          boxShadow: "0 10px 30px rgba(255,107,43,0.3)",
          transition: "all 0.3s",
          letterSpacing: 0.3,
        }}>
          <Eye size={18} />
          Start Watching
        </Link>
        <Link href="/budget" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff",
          padding: "16px 36px",
          borderRadius: 10,
          textDecoration: "none",
          fontWeight: 600,
          fontSize: 15,
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.03)",
        }}>
          Track Budget
        </Link>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        color: "#444",
        fontSize: 11,
        letterSpacing: 2,
        textTransform: "uppercase",
        animation: "float 3s ease-in-out infinite",
      }}>
        <span>Scroll</span>
        <ArrowDown size={16} />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(-50%); }
          50% { transform: translateY(-10px) translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
