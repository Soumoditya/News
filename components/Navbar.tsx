"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Eye } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/politicians", label: "Netas" },
  { href: "/parties", label: "Parties" },
  { href: "/criminal-records", label: "Criminal Records" },
  { href: "/controversies", label: "Controversies" },
  { href: "/budget", label: "Budget" },
  { href: "/glossary", label: "🎓 Glossary" },
  { href: "/news", label: "News" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(5,5,5,0.95)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 36, height: 36,
              background: "linear-gradient(135deg, #FF6B2B, #E63946)",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Eye size={20} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#fff", letterSpacing: 1, lineHeight: 1 }}>
                NAGRIK<span style={{ color: "#FF6B2B" }}>NAZAR</span>
              </div>
              <div style={{ fontSize: 9, color: "#888", letterSpacing: 3, textTransform: "uppercase" }}>
                The Citizen's Eye
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="hidden-mobile">
            {links.slice(1).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  padding: "6px 14px",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#ccc",
                  textDecoration: "none",
                  borderRadius: 6,
                  transition: "all 0.2s",
                  letterSpacing: 0.3,
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#FF6B2B";
                  (e.target as HTMLElement).style.background = "rgba(255,107,43,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "#ccc";
                  (e.target as HTMLElement).style.background = "transparent";
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 8 }}
            className="show-mobile"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingBottom: "1rem",
            background: "rgba(5,5,5,0.98)",
            margin: "0 -1.5rem",
            padding: "1rem 1.5rem",
          }}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  color: "#ccc",
                  textDecoration: "none",
                  fontSize: 15,
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
