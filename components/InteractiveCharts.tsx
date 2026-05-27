"use client";
import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, LineChart, Line, Area, AreaChart
} from "recharts";
import { getPartyColor } from "@/lib/utils";

// ─── Criminal Cases by Party Chart ───────────────────────────────────────────
const criminalByPartyData = [
  { party: "BJP", cases: 87, total: 240, pct: 36 },
  { party: "INC", cases: 31, total: 99, pct: 31 },
  { party: "SP", cases: 22, total: 37, pct: 59 },
  { party: "TMC", cases: 19, total: 29, pct: 66 },
  { party: "TDP", cases: 8, total: 16, pct: 50 },
  { party: "JDU", cases: 5, total: 12, pct: 42 },
  { party: "RJD", cases: 8, total: 4, pct: 100 },
  { party: "DMK", cases: 11, total: 22, pct: 50 },
  { party: "AAP", cases: 8, total: 22, pct: 36 },
  { party: "BSP", cases: 2, total: 10, pct: 20 },
];

// ─── Budget Allocation Data ───────────────────────────────────────────────────
const budgetData = [
  { name: "Interest Payments", value: 11300000, color: "#E63946", pct: 23.5, note: "Paying back govt debt" },
  { name: "Defence", value: 6200000, color: "#FF6B2B", pct: 13.0, note: "Army, Navy, Air Force" },
  { name: "Subsidies", value: 4200000, color: "#FFB703", pct: 8.8, note: "Food, fuel, fertiliser" },
  { name: "Central Sector Schemes", value: 3800000, color: "#4ade80", pct: 7.9, note: "PM schemes" },
  { name: "Roads & Highways", value: 2800000, color: "#06b6d4", pct: 5.8, note: "NH, expressways" },
  { name: "Rural Development", value: 1970000, color: "#8b5cf6", pct: 4.1, note: "MGNREGS, PMAY-G" },
  { name: "Education", value: 1200000, color: "#ec4899", pct: 2.5, note: "Schools, universities" },
  { name: "Health", value: 900000, color: "#f97316", pct: 1.9, note: "AIIMS, PMJAY" },
  { name: "Others", value: 14626000, color: "#555", pct: 30.5, note: "All other ministries" },
];

// ─── Assets of Top Politicians ────────────────────────────────────────────────
const topAssetData = [
  { name: "Kamal Nath", assets: 381, party: "INC" },
  { name: "Jyotiraditya Scindia", assets: 374, party: "BJP" },
  { name: "Mayawati", assets: 112, party: "BSP" },
  { name: "Naveen Patnaik", assets: 64, party: "BJD" },
  { name: "KCR", assets: 58, party: "BRS" },
  { name: "Ajit Pawar", assets: 83, party: "NCP" },
  { name: "Supriya Sule", assets: 40, party: "NCP (SP)" },
  { name: "Chandrababu Naidu", assets: 31, party: "TDP" },
];

// ─── Criminal Cases Timeline ──────────────────────────────────────────────────
const criminalCasesOverTime = [
  { year: "14th LS\n(2004)", pct: 24, count: 128 },
  { year: "15th LS\n(2009)", pct: 30, count: 162 },
  { year: "16th LS\n(2014)", pct: 34, count: 185 },
  { year: "17th LS\n(2019)", pct: 43, count: 233 },
  { year: "18th LS\n(2024)", pct: 46, count: 251 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; name: string; payload: Record<string, unknown> }>;
  label?: string;
}

const CustomBarTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = criminalByPartyData.find(d => d.party === label);
    return (
      <div style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 10,
        padding: "12px 16px",
        fontSize: 12,
      }}>
        <div style={{ color: "#fff", fontWeight: 700, marginBottom: 6 }}>{label}</div>
        <div style={{ color: "#E63946" }}>MPs with cases: <strong>{payload[0]?.value}</strong></div>
        {data && <div style={{ color: "#888" }}>Out of {data.total} MPs ({data.pct}%)</div>}
      </div>
    );
  }
  return null;
};

const CustomBudgetTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0]?.payload as typeof budgetData[0];
    return (
      <div style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 10,
        padding: "12px 16px",
        fontSize: 12,
      }}>
        <div style={{ color: "#fff", fontWeight: 700, marginBottom: 4 }}>{item?.name}</div>
        <div style={{ color: item?.color || "#fff" }}>{item?.pct}% of total budget</div>
        <div style={{ color: "#888", marginTop: 4 }}>{item?.note}</div>
      </div>
    );
  }
  return null;
};

const CustomAssetTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 10,
        padding: "12px 16px",
        fontSize: 12,
      }}>
        <div style={{ color: "#fff", fontWeight: 700, marginBottom: 4 }}>{label}</div>
        <div style={{ color: "#FFB703" }}>₹{payload[0]?.value} Crore declared</div>
        <div style={{ color: "#555", fontSize: 11, marginTop: 4 }}>Source: EC Affidavit</div>
      </div>
    );
  }
  return null;
};

const CHART_TABS = ["Criminal Cases", "Budget Breakdown", "Politician Assets", "Cases Over Time"];

export default function InteractiveCharts() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 20,
      padding: "2rem",
      marginTop: "3rem",
    }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ fontSize: 12, letterSpacing: 3, color: "#FF6B2B", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Interactive Data
        </div>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
          color: "#fff",
          letterSpacing: 1,
          marginBottom: "0.5rem",
        }}>
          CHARTS & VISUALISATIONS
        </h2>
        <p style={{ color: "#666", fontSize: 13 }}>Click a chart to explore • Hover for details • Data from EC affidavits & official records</p>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {CHART_TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: `1px solid ${activeTab === i ? "#FF6B2B" : "rgba(255,255,255,0.08)"}`,
              background: activeTab === i ? "rgba(255,107,43,0.15)" : "transparent",
              color: activeTab === i ? "#FF6B2B" : "#666",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: activeTab === i ? 700 : 400,
              transition: "all 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chart 1: Criminal Cases by Party */}
      {activeTab === 0 && (
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: "0.25rem" }}>MPs with Pending Criminal Cases</h3>
            <p style={{ color: "#666", fontSize: 12 }}>Number of elected MPs who declared pending criminal cases in their EC affidavits (18th Lok Sabha, 2024)</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={criminalByPartyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="party" tick={{ fill: "#666", fontSize: 12 }} axisLine={{ stroke: "#333" }} />
              <YAxis tick={{ fill: "#666", fontSize: 12 }} axisLine={{ stroke: "#333" }} />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="cases" radius={[4, 4, 0, 0]}>
                {criminalByPartyData.map((entry) => (
                  <Cell key={entry.party} fill={getPartyColor(entry.party)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            background: "rgba(230,57,70,0.06)",
            border: "1px solid rgba(230,57,70,0.15)",
            borderRadius: 8,
            fontSize: 12,
            color: "#888",
          }}>
            💡 <strong style={{ color: "#ccc" }}>What does this mean?</strong> These are self-declared pending criminal cases. Having a pending case does NOT mean the person is guilty — the court hasn't decided yet. Source: ADR India analysis of 2024 EC affidavits.
          </div>
        </div>
      )}

      {/* Chart 2: Budget Breakdown */}
      {activeTab === 1 && (
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: "0.25rem" }}>Union Budget 2024-25 Allocation</h3>
            <p style={{ color: "#666", fontSize: 12 }}>Total: ₹47.96 Lakh Crore — where does India's money go? (Hover for details)</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "center" }} className="chart-grid">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {budgetData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomBudgetTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {budgetData.slice(0, 7).map((item) => (
                <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: item.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#ccc", fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                  </div>
                  <div style={{ color: item.color, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{item.pct}%</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            background: "rgba(255,107,43,0.06)",
            border: "1px solid rgba(255,107,43,0.15)",
            borderRadius: 8,
            fontSize: 12,
            color: "#888",
          }}>
            💡 <strong style={{ color: "#ccc" }}>Key insight:</strong> ₹11.3 lakh crore (23.5%) goes to just interest payments on government debt — more than defence + education + health combined. India's debt is growing.
          </div>
        </div>
      )}

      {/* Chart 3: Politician Assets */}
      {activeTab === 2 && (
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: "0.25rem" }}>Top Politicians by Declared Assets (₹ Crore)</h3>
            <p style={{ color: "#666", fontSize: 12 }}>Self-declared in Election Commission affidavits. Does NOT include undisclosed wealth.</p>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={topAssetData} layout="vertical" margin={{ top: 0, right: 30, left: 70, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#666", fontSize: 11 }} unit=" Cr" />
              <YAxis type="category" dataKey="name" tick={{ fill: "#ccc", fontSize: 12 }} width={90} />
              <Tooltip content={<CustomAssetTooltip />} />
              <Bar dataKey="assets" radius={[0, 4, 4, 0]}>
                {topAssetData.map((entry) => (
                  <Cell key={entry.name} fill={getPartyColor(entry.party)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            background: "rgba(255,183,3,0.06)",
            border: "1px solid rgba(255,183,3,0.15)",
            borderRadius: 8,
            fontSize: 12,
            color: "#888",
          }}>
            💡 <strong style={{ color: "#ccc" }}>Remember:</strong> These are DECLARED assets only. Actual wealth may be far higher — benami (proxy) assets, undisclosed holdings, and cash are not counted. Source: myneta.info EC affidavits.
          </div>
        </div>
      )}

      {/* Chart 4: Criminal Cases Over Time */}
      {activeTab === 3 && (
        <div>
          <div style={{ marginBottom: "1rem" }}>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: "0.25rem" }}>% of MPs with Criminal Cases — Trend (2004–2024)</h3>
            <p style={{ color: "#666", fontSize: 12 }}>Parliament is getting MORE criminal — percentage has doubled in 20 years</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={criminalCasesOverTime} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="criminalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E63946" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#E63946" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="year" tick={{ fill: "#666", fontSize: 11 }} />
              <YAxis tick={{ fill: "#666", fontSize: 12 }} unit="%" domain={[0, 55]} />
              <Tooltip
                formatter={(value) => [`${value}%`, "MPs with cases"]}
                labelFormatter={(label) => `Lok Sabha: ${label}`}
                contentStyle={{ background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#E63946" }}
              />
              <Area
                type="monotone"
                dataKey="pct"
                stroke="#E63946"
                strokeWidth={2}
                fill="url(#criminalGrad)"
                dot={{ fill: "#E63946", r: 5 }}
                activeDot={{ r: 8, fill: "#E63946" }}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{
            marginTop: "1rem",
            padding: "0.75rem 1rem",
            background: "rgba(230,57,70,0.06)",
            border: "1px solid rgba(230,57,70,0.15)",
            borderRadius: 8,
            fontSize: 12,
            color: "#888",
          }}>
            💡 <strong style={{ color: "#ccc" }}>Alarming trend:</strong> In 2004, 24% of MPs had criminal cases. By 2024, it's 46% — nearly doubled in 20 years. Parties field candidates with cases because they win. Source: ADR India Election Watch reports.
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .chart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
