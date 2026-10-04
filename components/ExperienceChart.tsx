"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import CompanyLogo from "@/components/CompanyLogo";

/** The axis never shows anything earlier than this, whatever the data says. */
const AXIS_START = "2025-01";

/** The current month never changes mid-session, so there is nothing to watch. */
const noSubscribe = () => () => {};

export interface ChartRole {
  role: string;
  company: string;
  start: string;
  end: string | null;
  current: boolean;
  logo?: string;
}

/** "2026-08" -> months since year 0, so spans are easy to compare. */
function toMonths(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
}

function monthsNow() {
  const d = new Date();
  return d.getFullYear() * 12 + d.getMonth();
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function label(months: number) {
  return `${MONTH_LABELS[months % 12]} ${Math.floor(months / 12)}`;
}

/**
 * Roles laid out on a shared time axis. The point of it is the overlap: the
 * list below reads as one thing after another, and this shows how much of it
 * was running at the same time.
 */
export default function ExperienceChart({
  roles,
  buildMonth,
}: {
  roles: ChartRole[];
  buildMonth: number;
}) {
  // The server snapshot is the month this was prerendered in, so hydration
  // matches; the client snapshot is the visitor's actual month. That is what
  // keeps the chart current as time passes, with no rebuild.
  const now = useSyncExternalStore(noSubscribe, monthsNow, () => buildMonth);

  const spans = roles.map((r) => ({
    ...r,
    from: toMonths(r.start),
    to: r.end ? toMonths(r.end) : now,
  }));

  const min = Math.min(...spans.map((s) => s.from));
  const max = Math.max(now, ...spans.map((s) => s.to));
  const from = toMonths(AXIS_START);
  // A month of breathing room on the right so nothing touches the border.
  const total = max + 1 - from;

  const pct = (m: number) => ((m - from) / total) * 100;

  // Sorted earliest first, so the eye travels left to right and down.
  const ordered = [...spans].sort((a, b) => a.from - b.from || a.to - b.to);

  // A gridline on each January in range.
  const years: number[] = [];
  for (let m = from; m <= max + 1; m++) {
    if (m % 12 === 0) years.push(m);
  }

  // How many ran at once, which is the number the chart exists to show.
  let peak = 0;
  for (let m = Math.max(min, from); m <= max; m++) {
    const n = spans.filter((s) => s.from <= m && m <= s.to).length;
    if (n > peak) peak = n;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-2xl p-5 md:p-6 mb-14"
    >
      <div className="flex items-baseline justify-between gap-4 mb-5">
        <p className="font-mono text-[11px] text-[#00f5d4] tracking-widest">
          {"// ROLES OVER TIME"}
        </p>
        <p className="font-mono text-[11px] text-[#475569]">
          up to <span className="text-[#e2e8f0]">{peak}</span> at once
        </p>
      </div>

      <div className="relative">
        {/* Year gridlines */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {years.map((m) => (
            <div
              key={m}
              className="absolute top-0 bottom-5 w-px bg-[rgba(255,255,255,0.06)]"
              style={{ left: `${pct(m)}%` }}
            />
          ))}
          {/* Now */}
          <div
            className="absolute top-0 bottom-5 w-px bg-[rgba(0,245,212,0.35)]"
            style={{ left: `${pct(now)}%` }}
          />
        </div>

        <div className="relative space-y-1.5">
          {ordered.map((s, i) => {
            // A role that predates the axis is drawn from the edge, with a
            // square left end so it reads as "continues before this".
            const clipped = s.from < from;
            const left = pct(Math.max(s.from, from));
            const width = Math.max(pct(s.to) - left, 1.5);
            return (
              <div key={`${s.role}-${s.company}`} className="group relative h-7">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.06, ease: "easeOut" }}
                  style={{ left: `${left}%`, width: `${width}%`, transformOrigin: "left" }}
                  className={`absolute top-1 h-5 flex items-center ${
                    clipped ? "rounded-r-full" : "rounded-full"
                  } ${
                    s.current
                      ? "bg-[rgba(0,245,212,0.22)] border border-[rgba(0,245,212,0.5)]"
                      : "bg-[rgba(124,58,237,0.18)] border border-[rgba(124,58,237,0.4)]"
                  }`}
                >
                  <span className="pl-2 pr-2 text-[10px] font-mono truncate text-[#cbd5e1]">
                    {clipped && <span className="text-[#64748b]">&lsaquo; </span>}
                    {s.company.replace(/^Under\s+/i, "")}
                  </span>
                </motion.div>

                {/* Readable detail on hover, since the bars are too small for it */}
                <div className="pointer-events-none absolute -top-9 z-20 hidden group-hover:block whitespace-nowrap rounded-lg border border-[rgba(0,245,212,0.25)] bg-[#0d0d1a] px-3 py-1.5 shadow-lg"
                  style={{ left: `${left}%` }}
                >
                  <span className="flex items-center gap-2">
                    <CompanyLogo src={s.logo} company={s.company} size={16} />
                    <span className="text-[11px] text-white">{s.role}</span>
                    <span className="text-[10px] font-mono text-[#64748b]">
                      {label(s.from)} to {s.end ? label(s.to) : "now"}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Year axis */}
        <div className="relative h-4 mt-1">
          {years.map((m) => (
            <span
              key={m}
              className="absolute top-0 text-[10px] font-mono text-[#475569] -translate-x-1/2"
              style={{ left: `${pct(m)}%` }}
            >
              {Math.floor(m / 12)}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
