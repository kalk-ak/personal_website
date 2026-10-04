"use client";

import { ViewTransition } from "react";
import Link from "next/link";
import { ArrowUpRight, Lock, Star } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

/**
 * Compact project card. The whole card is one link into the detail page, so it
 * deliberately carries no external anchors. Repo and report links live on
 * /projects/[slug] instead, where they can't swallow the card's own click.
 *
 * It has no entrance animation of its own: on the homepage the surrounding
 * FadeSection already fades it in, and the title has to be visible the moment
 * the page mounts for the morph into the detail heading to land.
 */
export default function ProjectCard({ project: p }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      transitionTypes={["nav-forward"]}
      className="glass-card rounded-2xl p-6 group relative overflow-hidden flex flex-col h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f5d4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]"
    >
      {/* Color accent top bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
      />

      <div className="flex items-start justify-between gap-3 mb-4">
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded"
          style={{
            color: p.color,
            background: `${p.color}15`,
            border: `1px solid ${p.color}30`,
          }}
        >
          {p.subtitle}
        </span>
        {p.featured && (
          <span className="flex items-center gap-1 shrink-0">
            <Star size={11} className="text-[#f97316]" fill="currentColor" />
            <span className="text-[10px] font-mono text-[#f97316] tracking-wider">
              FEATURED
            </span>
          </span>
        )}
      </div>

      <ViewTransition name={`project-title-${p.slug}`} share="project-title">
        <h3 className="w-fit text-base font-semibold text-white mb-2 group-hover:text-[#00f5d4] transition-colors">
          {p.title}
        </h3>
      </ViewTransition>

      <p className="text-sm text-[#64748b] leading-relaxed mb-4 line-clamp-3">
        {p.teaser}
      </p>

      {/* Push the footer to the bottom so cards in a row line up */}
      <div className="mt-auto">
        <div className="text-xs font-mono mb-4" style={{ color: p.color }}>
          → {p.stats}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 rounded text-[11px] font-mono text-[#64748b] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]"
            >
              {t}
            </span>
          ))}
          {p.tech.length > 4 && (
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono text-[#475569]">
              +{p.tech.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-mono text-[#00f5d4] opacity-80 group-hover:opacity-100 transition-opacity">
            Read more
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
          {!p.github && p.private && (
            <span className="flex items-center gap-1 text-[10px] text-[#475569] italic">
              <Lock size={10} />
              Private source
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
