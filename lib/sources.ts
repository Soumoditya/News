/**
 * sources.ts — the provenance backbone of the site.
 *
 * Every meaningful fact should be traceable to an official record or a
 * reputable non-partisan body. This module provides:
 *   1. The `Sourced<T>` type — a value bundled with its source + verified date.
 *   2. Deep-link builders — resolve to the *specific* page proving a claim,
 *      not a homepage.
 *   3. `freshness()` — turns a "verified on" date into a visible fresh/aging/stale
 *      signal, so staleness is honest instead of hidden.
 */

export interface Sourced<T> {
  value: T;
  /** Direct deep link to the document/record proving this fact */
  source: string;
  /** Human-readable label, e.g. "MyNeta 2024 affidavit" or "Supreme Court judgment" */
  sourceLabel: string;
  /** ISO date (YYYY-MM-DD) this fact was last checked against its source */
  verifiedOn: string;
  /** Optional: the date the fact itself refers to (e.g. affidavit filing year) */
  asOf?: string;
}

export type Freshness = "fresh" | "aging" | "stale";

/** Days since a YYYY-MM-DD date (or null if unparseable). */
export function daysSince(dateStr?: string): number | null {
  if (!dateStr) return null;
  const then = new Date(dateStr).getTime();
  if (Number.isNaN(then)) return null;
  return Math.floor((Date.now() - then) / 86_400_000);
}

/** Classify how current a verified date is: <90d fresh, <365d aging, else stale. */
export function freshness(verifiedOn?: string): Freshness {
  const d = daysSince(verifiedOn);
  if (d === null) return "stale";
  if (d <= 90) return "fresh";
  if (d <= 365) return "aging";
  return "stale";
}

export const FRESHNESS_META: Record<Freshness, { color: string; label: string }> = {
  fresh: { color: "var(--fresh, #4ade80)", label: "Recently verified" },
  aging: { color: "var(--aging, #FFB703)", label: "Verify — may have updates" },
  stale: { color: "var(--stale, #ef4444)", label: "Likely outdated — re-verify" },
};

const enc = encodeURIComponent;

/* ---------------------------------------------------------------------------
 * Deep-link builders — point users straight at the authoritative record.
 * ------------------------------------------------------------------------- */

/** MyNeta (ADR) candidate search — the gold standard for affidavit/criminal/asset data. */
export function myNeta(name: string): string {
  return `https://myneta.info/search_myneta.php?q=${enc(name)}`;
}

/** IndiaKanoon full-text search of court judgments. */
export function indiaKanoon(query: string): string {
  return `https://indiankanoon.org/search/?formInput=${enc(query)}`;
}

/** eCourts case-status portal (no per-case deep link is public; lands on the search). */
export function eCourts(): string {
  return "https://ecourts.gov.in/ecourts_home/index.php";
}

/** Election Commission of India. */
export function eci(): string {
  return "https://eci.gov.in";
}

/** PRS Legislative Research — MP profiles, attendance, questions, bills. */
export function prs(name: string): string {
  return `https://prsindia.org/mptrack?search=${enc(name)}`;
}

/** Google News India-scoped query — live coverage for a person/topic. */
export function googleNews(query: string): string {
  return `https://news.google.com/search?q=${enc(query)}&hl=en-IN&gl=IN&ceid=IN:en`;
}

/** CAG (Comptroller & Auditor General) reports. */
export function cag(): string {
  return "https://cag.gov.in/en/audit-report";
}

/** Union Budget documents. */
export function unionBudget(): string {
  return "https://www.indiabudget.gov.in";
}

/** A curated set of reputable, non-partisan primary sources for the Methodology page. */
export const PRIMARY_SOURCES = [
  { name: "ADR / MyNeta", url: "https://myneta.info", role: "Election affidavits: criminal cases, assets, liabilities, education", type: "Non-partisan NGO" },
  { name: "PRS Legislative Research", url: "https://prsindia.org", role: "MP attendance, questions, bills, legislative track records", type: "Non-partisan research" },
  { name: "Election Commission of India", url: "https://eci.gov.in", role: "Official election data, candidate affidavits, results", type: "Constitutional body" },
  { name: "Supreme Court of India", url: "https://main.sci.gov.in", role: "Judgments, verdicts, constitutional rulings", type: "Judiciary" },
  { name: "CAG", url: "https://cag.gov.in", role: "Audit reports quantifying losses to the exchequer", type: "Constitutional auditor" },
  { name: "Union Budget", url: "https://www.indiabudget.gov.in", role: "Official allocations, expenditure, receipts", type: "Ministry of Finance" },
  { name: "IndiaKanoon", url: "https://indiankanoon.org", role: "Searchable database of court judgments", type: "Legal database" },
  { name: "eCourts", url: "https://ecourts.gov.in", role: "Live case status across Indian courts", type: "Judiciary portal" },
  { name: "RBI", url: "https://rbi.org.in", role: "Monetary, banking and economic data", type: "Central bank" },
  { name: "data.gov.in", url: "https://data.gov.in", role: "Official Open Government Data (API-accessible)", type: "Government open data" },
];
