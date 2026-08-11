"use client";
import { ExternalLink } from "lucide-react";
import { freshness, FRESHNESS_META, daysSince, type Freshness } from "@/lib/sources";

interface Props {
  /** Deep link to the record proving the fact */
  source: string;
  /** Label for the source, e.g. "MyNeta 2024 affidavit" */
  sourceLabel: string;
  /** ISO date the fact was last verified */
  verifiedOn?: string;
  /** Compact single-line variant for dense rows */
  compact?: boolean;
}

function relLabel(verifiedOn?: string): string {
  const d = daysSince(verifiedOn);
  if (d === null) return "unverified";
  if (d <= 1) return "verified today";
  if (d < 30) return `verified ${d}d ago`;
  if (d < 365) return `verified ${Math.floor(d / 30)}mo ago`;
  return `verified ${Math.floor(d / 365)}y ago`;
}

/**
 * Renders provenance for a single fact: a deep-link to the source + a
 * freshness dot + a "verified" recency label. This is what makes every
 * claim on the site checkable and honest about staleness.
 */
export default function SourceTag({ source, sourceLabel, verifiedOn, compact }: Props) {
  const f: Freshness = freshness(verifiedOn);
  const meta = FRESHNESS_META[f];

  return (
    <a
      href={source}
      target="_blank"
      rel="noopener noreferrer"
      title={`${meta.label} · ${sourceLabel}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: compact ? 5 : 6,
        padding: compact ? "2px 8px" : "4px 10px",
        borderRadius: "var(--r-sm, 6px)",
        background: "var(--surface-2, rgba(255,255,255,0.04))",
        border: "1px solid var(--border, rgba(255,255,255,0.08))",
        color: "var(--text-dim, #a1a1aa)",
        fontSize: compact ? 10 : 11,
        fontWeight: 500,
        textDecoration: "none",
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        maxWidth: "100%",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: meta.color,
          flexShrink: 0,
          boxShadow: `0 0 6px ${meta.color}`,
        }}
      />
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
        {sourceLabel}
      </span>
      {!compact && (
        <span style={{ color: "var(--text-faint, #48484f)", fontSize: 10 }}>
          · {relLabel(verifiedOn)}
        </span>
      )}
      <ExternalLink size={compact ? 9 : 10} style={{ flexShrink: 0, opacity: 0.7 }} />
    </a>
  );
}
