"use client";
import { useState } from "react";
import { IndianRupee, MapPin, TrendingUp, CheckCircle, Clock, AlertCircle, ChevronRight } from "lucide-react";
import budgetData from "@/data/budget.json";
import { formatCrore } from "@/lib/utils";

const NATIONAL = budgetData.national;
const STATES = budgetData.states;

export default function BudgetPage() {
  const [selectedState, setSelectedState] = useState<typeof STATES[0] | null>(null);
  const [view, setView] = useState<"national" | "state">("national");

  const maxAllocation = Math.max(...NATIONAL.key_sectors.map((s) => s.allocation_cr));

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Header */}
      <div style={{
        padding: "4rem 1.5rem 3rem",
        background: "linear-gradient(180deg, rgba(255,183,3,0.06) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        maxWidth: 1400, margin: "0 auto",
      }}>
        <div style={{ fontSize: 12, letterSpacing: 4, color: "#FFB703", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Union Budget 2024-25 + State Budgets
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(3rem, 7vw, 6rem)",
          color: "#fff",
          letterSpacing: 2,
          lineHeight: 1,
          marginBottom: "1rem",
        }}>
          BUDGET<br />
          <span style={{ background: "linear-gradient(135deg, #FFB703, #FF6B2B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            TRACKER
          </span>
        </h1>
        <p style={{ color: "#888", fontSize: 15, maxWidth: 600, lineHeight: 1.7 }}>
          Every rupee of your tax money tracked. Where India's ₹47.96 lakh crore budget goes — nationally and state-wise.
        </p>

        {/* View toggle */}
        <div style={{ display: "flex", gap: 6, marginTop: "2rem" }}>
          {[
            { val: "national", label: "🇮🇳 National Budget" },
            { val: "state", label: "🗺️ State-wise Tracker" },
          ].map((v) => (
            <button
              key={v.val}
              onClick={() => setView(v.val as "national" | "state")}
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                border: `1px solid ${view === v.val ? "#FFB703" : "rgba(255,255,255,0.08)"}`,
                background: view === v.val ? "rgba(255,183,3,0.15)" : "transparent",
                color: view === v.val ? "#FFB703" : "#666",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: view === v.val ? 700 : 400,
                transition: "all 0.2s",
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {view === "national" ? (
          <>
            {/* National overview */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.25rem",
              marginBottom: "3rem",
            }}>
              {[
                { val: "₹47.96 Lakh Cr", label: "Total Budget", color: "#FFB703", sub: "FY 2024-25" },
                { val: "₹11.3 Lakh Cr", label: "Interest Payments", color: "#E63946", sub: "23.5% of budget — debt servicing" },
                { val: "4.9%", label: "Fiscal Deficit / GDP", color: "#FF6B2B", sub: "₹16.16 lakh crore deficit" },
                { val: "₹32.93 Lakh Cr", label: "Estimated GDP", color: "#4ade80", sub: "FY 2024-25" },
                { val: "₹25.97 Lakh Cr", label: "Tax Revenue", color: "#06b6d4", sub: "Direct + Indirect taxes" },
                { val: "₹1.11 Lakh Cr", label: "Capital Expenditure", color: "#8b5cf6", sub: "Infrastructure & assets" },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: "1.5rem",
                  background: `${s.color}08`,
                  border: `1px solid ${s.color}20`,
                  borderRadius: 14,
                }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: s.color, lineHeight: 1, marginBottom: "0.3rem" }}>
                    {s.val}
                  </div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: "0.2rem" }}>{s.label}</div>
                  <div style={{ color: "#555", fontSize: 11 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Sector allocation */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              marginBottom: "3rem",
            }} className="budget-main-grid">
              <div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#fff", letterSpacing: 1, marginBottom: "1.5rem" }}>
                  SECTOR-WISE ALLOCATION
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {NATIONAL.key_sectors.map((s) => (
                    <div key={s.name} style={{
                      padding: "1rem",
                      background: "rgba(255,255,255,0.02)",
                      borderRadius: 10,
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ color: "#ddd", fontSize: 14 }}>{s.icon} {s.name}</span>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ color: "#FFB703", fontWeight: 700, fontSize: 14 }}>
                            {formatCrore(s.allocation_cr)}
                          </span>
                          <span style={{ color: "#555", fontSize: 11, marginLeft: 8 }}>{s.pct}%</span>
                        </div>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, height: 6 }}>
                        <div style={{
                          width: `${(s.allocation_cr / maxAllocation) * 100}%`,
                          height: "100%",
                          background: s.name === "Interest Payments" ? "#E63946"
                            : s.name === "Defence" ? "#FF6B2B"
                            : s.name === "Education" ? "#8b5cf6"
                            : s.name === "Health & Family Welfare" ? "#ec4899"
                            : "#FFB703",
                          borderRadius: 4,
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#fff", letterSpacing: 1, marginBottom: "1.5rem" }}>
                  TOP SCHEMES
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {NATIONAL.top_schemes.map((scheme) => (
                    <div key={scheme.name} style={{
                      padding: "1.25rem",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 12,
                    }}>
                      <div style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: "0.3rem" }}>{scheme.name}</div>
                      <div style={{ display: "flex", gap: "1rem", fontSize: 12 }}>
                        <span style={{ color: "#FFB703" }}>Allocation: {formatCrore(scheme.allocation_cr)}</span>
                        <span style={{ color: "#666" }}>Beneficiaries: {scheme.beneficiaries}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Insight box */}
                <div style={{
                  marginTop: "2rem",
                  padding: "1.5rem",
                  background: "rgba(230,57,70,0.06)",
                  border: "1px solid rgba(230,57,70,0.15)",
                  borderRadius: 12,
                }}>
                  <h3 style={{ color: "#E63946", fontSize: 16, fontWeight: 700, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 8 }}>
                    <AlertCircle size={16} /> The Debt Problem
                  </h3>
                  <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7 }}>
                    India spends <strong style={{ color: "#E63946" }}>₹11.29 lakh crore (23.5%)</strong> of its entire budget on interest payments alone — more than defence, education, and health combined. This money goes to servicing the national debt of ₹169 lakh crore and creates less for public services.
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* State-wise view */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "320px 1fr",
              gap: "2rem",
            }} className="state-grid">
              {/* State selector */}
              <div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#fff", marginBottom: "1rem" }}>
                  SELECT STATE
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: 600, overflowY: "auto" }}>
                  {STATES.map((s) => (
                    <button
                      key={s.code}
                      onClick={() => setSelectedState(s)}
                      style={{
                        padding: "1rem",
                        background: selectedState?.code === s.code ? "rgba(255,183,3,0.1)" : "rgba(255,255,255,0.02)",
                        border: `1px solid ${selectedState?.code === s.code ? "rgba(255,183,3,0.3)" : "rgba(255,255,255,0.06)"}`,
                        borderRadius: 10,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.2s",
                      }}
                    >
                      <div>
                        <div style={{ color: selectedState?.code === s.code ? "#FFB703" : "#ccc", fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                        <div style={{ color: "#555", fontSize: 11 }}>{formatCrore(s.budget_cr)}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{
                          fontSize: 12,
                          color: s.completion_rate > 70 ? "#4ade80" : s.completion_rate > 55 ? "#FFB703" : "#E63946",
                          fontWeight: 700,
                        }}>{s.completion_rate}%</div>
                        <div style={{ color: "#555", fontSize: 10 }}>done</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* State detail */}
              {selectedState ? (
                <div>
                  <div style={{
                    padding: "2rem",
                    background: "rgba(255,183,3,0.05)",
                    border: "1px solid rgba(255,183,3,0.15)",
                    borderRadius: 16,
                    marginBottom: "1.5rem",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                      <div>
                        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "#FFB703", marginBottom: "0.25rem" }}>{selectedState.name}</h2>
                        <div style={{ color: "#666", fontSize: 13 }}>
                          CM: <span style={{ color: "#ccc" }}>{selectedState.responsible_cm}</span> ({selectedState.responsible_party}) •
                          {selectedState.districts} Districts • {selectedState.population_m}M Population
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "#FFB703", lineHeight: 1 }}>
                          {formatCrore(selectedState.budget_cr)}
                        </div>
                        <div style={{ color: "#555", fontSize: 12 }}>State Budget 2024-25</div>
                        <div style={{ color: "#888", fontSize: 12 }}>₹{selectedState.per_capita_budget.toLocaleString()} per person</div>
                      </div>
                    </div>
                  </div>

                  {/* Sector allocation */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                    {[
                      { label: "Education", val: selectedState.education_cr, color: "#8b5cf6", icon: "📚" },
                      { label: "Health", val: selectedState.health_cr, color: "#ec4899", icon: "🏥" },
                      { label: "Roads & Infrastructure", val: selectedState.roads_cr, color: "#06b6d4", icon: "🛣️" },
                      { label: "Agriculture", val: selectedState.agriculture_cr, color: "#4ade80", icon: "🌾" },
                    ].map((s) => (
                      <div key={s.label} style={{
                        padding: "1rem",
                        background: `${s.color}08`,
                        border: `1px solid ${s.color}20`,
                        borderRadius: 12,
                      }}>
                        <div style={{ fontSize: 20, marginBottom: "0.5rem" }}>{s.icon}</div>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: s.color, lineHeight: 1 }}>{formatCrore(s.val)}</div>
                        <div style={{ color: "#666", fontSize: 12 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Project progress */}
                  <div style={{
                    padding: "1.5rem",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 14,
                    marginBottom: "1.5rem",
                  }}>
                    <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#fff", marginBottom: "1.25rem" }}>
                      PROJECT PROGRESS
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
                      {[
                        { val: selectedState.projects_total, label: "Total Projects", color: "#888" },
                        { val: selectedState.projects_completed, label: "Completed", color: "#4ade80", icon: <CheckCircle size={14} color="#4ade80" /> },
                        { val: selectedState.projects_ongoing, label: "Ongoing", color: "#FFB703", icon: <Clock size={14} color="#FFB703" /> },
                        { val: selectedState.projects_delayed, label: "Delayed", color: "#E63946", icon: <AlertCircle size={14} color="#E63946" /> },
                      ].map((s) => (
                        <div key={s.label} style={{ textAlign: "center" }}>
                          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: s.color, lineHeight: 1 }}>{s.val}</div>
                          <div style={{ color: "#555", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 4 }}>
                            {s.icon}{s.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginBottom: "0.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666", marginBottom: "0.4rem" }}>
                        <span>Overall Completion Rate</span>
                        <span style={{ color: selectedState.completion_rate > 70 ? "#4ade80" : selectedState.completion_rate > 55 ? "#FFB703" : "#E63946", fontWeight: 700 }}>
                          {selectedState.completion_rate}%
                        </span>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, height: 10 }}>
                        <div style={{
                          width: `${selectedState.completion_rate}%`,
                          height: "100%",
                          background: selectedState.completion_rate > 70 ? "#4ade80" : selectedState.completion_rate > 55 ? "#FFB703" : "#E63946",
                          borderRadius: 6,
                          transition: "width 1s ease",
                        }} />
                      </div>
                    </div>
                  </div>

                  {/* Key projects */}
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#fff", marginBottom: "1rem" }}>
                    KEY PROJECTS
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {selectedState.key_projects.map((proj) => (
                      <div key={proj.name} style={{
                        padding: "1.25rem",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 12,
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                          <div>
                            <div style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>{proj.name}</div>
                            <div style={{ color: "#666", fontSize: 12, marginTop: 2 }}>Cost: {formatCrore(proj.cost_cr)}</div>
                          </div>
                          <span style={{
                            background: proj.status === "completed" ? "rgba(74,222,128,0.15)" : proj.status === "delayed" ? "rgba(230,57,70,0.15)" : "rgba(255,183,3,0.15)",
                            color: proj.status === "completed" ? "#4ade80" : proj.status === "delayed" ? "#E63946" : "#FFB703",
                            border: `1px solid ${proj.status === "completed" ? "rgba(74,222,128,0.3)" : proj.status === "delayed" ? "rgba(230,57,70,0.3)" : "rgba(255,183,3,0.3)"}`,
                            padding: "3px 10px",
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "capitalize",
                          }}>
                            {proj.status}
                          </span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#666", marginBottom: "0.4rem" }}>
                          <span>Progress</span>
                          <span style={{ fontWeight: 700, color: proj.progress_pct === 100 ? "#4ade80" : "#FFB703" }}>{proj.progress_pct}%</span>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, height: 6 }}>
                          <div style={{
                            width: `${proj.progress_pct}%`,
                            height: "100%",
                            background: proj.progress_pct === 100 ? "#4ade80" : proj.status === "delayed" ? "#E63946" : "#FFB703",
                            borderRadius: 4,
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 400,
                  color: "#555",
                  gap: "1rem",
                }}>
                  <MapPin size={48} color="#333" />
                  <div>Select a state to see detailed budget breakdown</div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .budget-main-grid { grid-template-columns: 1fr !important; }
          .state-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
