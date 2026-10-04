"use client";

import { ViewTransition } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  FileText,
  Lock,
  Briefcase,
  Star,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import type { Project } from "@/data/projects";

interface ProjectDetailProps {
  project: Project;
  prev?: Project;
  next?: Project;
}

export default function ProjectDetail({ project: p, prev, next }: ProjectDetailProps) {
  return (
    <article className="relative">
      {/* Accent glow keyed to the project's own color */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full blur-3xl pointer-events-none opacity-[0.07]"
        style={{ background: p.color }}
      />

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20 relative z-10">
        {/* Back out */}
        <Link
          href="/projects"
          transitionTypes={["nav-back"]}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#64748b] hover:text-[#00f5d4] transition-colors"
        >
          <ArrowLeft size={13} />
          All projects
        </Link>

        {/* Header. No entrance animation: the page transition brings it in. */}
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="text-[11px] font-mono px-2.5 py-1 rounded"
              style={{
                color: p.color,
                background: `${p.color}15`,
                border: `1px solid ${p.color}30`,
              }}
            >
              {p.subtitle}
            </span>
            {p.featured && (
              <span className="flex items-center gap-1">
                <Star size={11} className="text-[#f97316]" fill="currentColor" />
                <span className="text-[10px] font-mono text-[#f97316] tracking-wider">
                  FEATURED
                </span>
              </span>
            )}
          </div>

          <ViewTransition name={`project-title-${p.slug}`} share="project-title">
            <h1 className="w-fit text-3xl md:text-4xl font-bold text-white leading-tight">
              {p.title}
            </h1>
          </ViewTransition>

          <p className="mt-4 text-base text-[#94a3b8] leading-relaxed">{p.teaser}</p>

          {/* Headline stat */}
          <div
            className="mt-6 px-4 py-3 rounded-lg bg-[rgba(0,0,0,0.3)] border"
            style={{ borderColor: `${p.color}25` }}
          >
            <span className="text-xs font-mono" style={{ color: p.color }}>
              → {p.stats}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {p.github ? (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-neon px-5 py-2 rounded text-xs font-mono"
              >
                <span className="inline-flex items-center gap-2">
                  <GithubIcon size={14} />
                  View source
                </span>
              </a>
            ) : (
              p.private && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono text-[#475569] italic border border-[rgba(255,255,255,0.07)]">
                  <Lock size={12} />
                  {p.private}
                </span>
              )
            )}

            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-xs font-mono text-[#64748b] hover:text-[#00f5d4] transition-colors border border-[rgba(255,255,255,0.07)] hover:border-[rgba(0,245,212,0.3)]"
              >
                <ExternalLink size={13} />
                Live demo
              </a>
            )}

            {p.docs?.map((doc) => (
              <a
                key={doc.href}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium text-[#00f5d4] bg-[rgba(0,245,212,0.08)] border border-[rgba(0,245,212,0.3)] hover:bg-[rgba(0,245,212,0.15)] hover:border-[#00f5d4] transition-colors"
              >
                <FileText size={13} />
                {doc.label}
                <ExternalLink size={11} />
              </a>
            ))}
          </div>

          {/* Full stack */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-0.5 rounded text-[11px] font-mono text-[#64748b] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        <div
          className="my-12 h-px"
          style={{ background: `linear-gradient(90deg, ${p.color}40, transparent)` }}
        />

        {/* Overview */}
        <section>
          <h2 className="font-mono text-xs text-[#00f5d4] tracking-widest mb-5">
            {"// THE STORY"}
          </h2>
          <div className="space-y-4">
            {p.overview.map((para, i) => (
              <p key={i} className="text-[15px] text-[#94a3b8] leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Highlights */}
        {p.highlights.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14"
          >
            <h2 className="font-mono text-xs text-[#00f5d4] tracking-widest mb-5">
              {"// WHAT STANDS OUT"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {p.highlights.map((h, i) => (
                <motion.div
                  key={h.heading}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="glass-card rounded-xl p-5"
                >
                  <h3 className="text-sm font-semibold text-white mb-2">{h.heading}</h3>
                  <p className="text-[13px] text-[#64748b] leading-relaxed">{h.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Where it came from */}
        {p.relatedExperienceId && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14"
          >
            <Link
              href={`/#${p.relatedExperienceId}`}
              transitionTypes={["nav-back"]}
              className="glass-card rounded-xl p-5 flex items-center gap-4 group"
            >
              <Briefcase size={18} className="text-[#7c3aed] shrink-0" />
              <span className="text-sm text-[#94a3b8]">
                This came out of a role on my timeline.{" "}
                <span className="text-[#00f5d4] group-hover:underline">
                  See the experience entry
                </span>
              </span>
            </Link>
          </motion.section>
        )}

        {/* Prev / next */}
        {(prev || next) && (
          <nav className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.06)] grid sm:grid-cols-2 gap-4">
            {prev && (
              <Link
                href={`/projects/${prev.slug}`}
                transitionTypes={["nav-back"]}
                className="glass-card rounded-xl p-4 group"
              >
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#475569] mb-1.5">
                  <ArrowLeft size={11} />
                  PREVIOUS
                </span>
                <span className="block text-sm text-[#94a3b8] group-hover:text-[#00f5d4] transition-colors">
                  {prev.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`/projects/${next.slug}`}
                transitionTypes={["nav-forward"]}
                className="glass-card rounded-xl p-4 group sm:text-right"
              >
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#475569] mb-1.5 sm:justify-end">
                  NEXT
                  <ArrowRight size={11} />
                </span>
                <span className="block text-sm text-[#94a3b8] group-hover:text-[#00f5d4] transition-colors">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        )}
      </div>
    </article>
  );
}
