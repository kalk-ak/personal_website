"use client";

import { motion } from "framer-motion";
import { ExternalLink, Lock, Star } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import FadeSection from "@/components/FadeSection";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string | null;
  live: string | null;
  featured: boolean;
  color: string;
  stats: string;
  private?: string;
}

const projects: Project[] = [
  {
    title: "Financial News Market Prediction Pipeline",
    subtitle: "Data Engineering · Quant ML",
    description:
      "An end-to-end pipeline that scrapes financial news at scale, fine-tunes language models for sentiment, and forecasts asset prices with models ranging from gradient-boosted trees to attention-based time series networks. Built to predict returns for 10 tech stocks, then adapted to forecast crude oil prices during the US-Iran conflict.",
    tech: ["Python", "Playwright", "Doc2Vec", "FinBERT", "CatBoost", "BiLSTM"],
    github: null,
    private: "Source private, exploring this as a startup",
    live: null,
    featured: true,
    color: "#00f5d4",
    stats: "85% scraper success rate across 2M+ articles",
  },
  {
    title: "Omarchy Display Control Center",
    subtitle: "Linux Tooling · C++ / GTK4",
    description:
      "A native C++ utility for managing display settings on Hyprland based Linux setups: brightness, night light, and screen rotation, wrapped in a clean GTK4 interface and CLI on top of hyprctl and hyprsunset.",
    tech: ["C++", "GTK4", "Hyprland", "CMake"],
    github: "https://github.com/kalk-ak/omarchy-display-control-center",
    live: null,
    featured: true,
    color: "#7c3aed",
    stats: "Native GTK4 app, CMake installable",
  },
  {
    title: "The Algorithm Forge",
    subtitle: "NLP · ML from Scratch",
    description:
      "A playground of ML and NLP built from scratch, from decision trees and PageRank to n-gram language models, alongside Argubots: LLM-based dialogue agents that debate using real Kialo argumentation data, with a full evaluation framework for comparing strategies.",
    tech: ["Python", "NLP", "LLM Agents"],
    github: "https://github.com/kalk-ak/ml-playground",
    live: null,
    featured: false,
    color: "#f97316",
    stats: "Classic ML, NLP, and LLM agents in one repo",
  },
  {
    title: "Systems Playground",
    subtitle: "Systems Programming · C/C++",
    description:
      "A collection of systems projects built from scratch: a configurable cache simulator, a full CLI chess engine with complete rule enforcement, a PPM image tool, and a head to head comparison of C versus x86 assembly performance.",
    tech: ["C++", "C", "x86 Assembly", "CMake"],
    github: "https://github.com/kalk-ak/Systems-Playground",
    live: null,
    featured: false,
    color: "#38bdf8",
    stats: "5 standalone systems projects",
  },
  {
    title: "Green Garden Hyprland Theme",
    subtitle: "Linux Desktop · Design",
    description:
      "A nature inspired desktop theme for Hyprland and Omarchy, installable with a single command and picked up by the Omarchy community theme gallery.",
    tech: ["Hyprland", "Shell", "Omarchy"],
    github: "https://github.com/kalk-ak/omarchy-green-garden-theme",
    live: null,
    featured: false,
    color: "#a3e635",
    stats: "24 GitHub stars",
  },
  {
    title: "Computational Math & Science",
    subtitle: "Applied Mathematics · Computation",
    description:
      "A working notebook library applying calculus, linear algebra, probability, and statistics to computational problems, plus physics lab analyses, the quantitative foundation underneath the ML and robotics work.",
    tech: ["Python", "Jupyter", "NumPy", "Matplotlib"],
    github: "https://github.com/kalk-ak/Computational-Math-and-Science",
    live: null,
    featured: false,
    color: "#fb7185",
    stats: "Spans calculus, linear algebra, probability, and physics",
  },
];

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <FadeSection id="projects" className="py-20 md:py-28 bg-[#0a0a0f] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[rgba(124,58,237,0.05)] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-[#00f5d4] tracking-widest mb-3">05 // PROJECTS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Things I&apos;ve{" "}
            <span className="text-gradient-full">Shipped</span>
          </h2>
          <p className="mt-4 text-[#64748b] text-base max-w-xl">
            A selection of projects across ML, robotics, and systems engineering.
          </p>
        </motion.div>

        {/* Featured projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 md:p-8 group relative overflow-hidden"
            >
              {/* Color accent top bar, draws itself in left to right as the card appears */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px origin-left"
                style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 + 0.2, ease: "easeOut" }}
              />

              {/* Featured badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Star size={12} className="text-[#f97316]" fill="currentColor" />
                  <span className="text-[10px] font-mono text-[#f97316] tracking-wider">FEATURED</span>
                </div>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded"
                  style={{ color: p.color, background: `${p.color}15`, border: `1px solid ${p.color}30` }}
                >
                  {p.subtitle}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00f5d4] transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-[#64748b] leading-relaxed mb-5">{p.description}</p>

              {/* Stats */}
              <div className="mb-5 px-3 py-2 rounded-lg bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.05)]">
                <span className="text-xs font-mono" style={{ color: p.color }}>
                  → {p.stats}
                </span>
              </div>

              {/* Tech */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono text-[#64748b] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4">
                {p.github ? (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-[#64748b] hover:text-[#e2e8f0] transition-colors"
                  >
                    <GithubIcon size={14} />
                    Code
                  </a>
                ) : (
                  p.private && (
                    <span className="flex items-center gap-2 text-xs text-[#475569] italic">
                      <Lock size={13} />
                      {p.private}
                    </span>
                  )
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-[#64748b] hover:text-[#00f5d4] transition-colors"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass-card rounded-xl p-5 group relative overflow-hidden"
            >
              <motion.div
                className="absolute top-0 left-0 right-0 h-px origin-left"
                style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 + 0.15, ease: "easeOut" }}
              />

              <span
                className="text-[10px] font-mono mb-3 inline-block"
                style={{ color: p.color }}
              >
                {p.subtitle}
              </span>

              <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-[#00f5d4] transition-colors">
                {p.title}
              </h3>

              <p className="text-xs text-[#475569] leading-relaxed mb-4 line-clamp-3">
                {p.description}
              </p>

              <div className="text-xs font-mono mb-4" style={{ color: p.color }}>
                → {p.stats}
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono text-[#64748b] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {p.github ? (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] text-[#475569] hover:text-[#e2e8f0] transition-colors"
                >
                  <GithubIcon size={12} />
                  View Code
                </a>
              ) : (
                p.private && (
                  <span className="flex items-center gap-1.5 text-[11px] text-[#475569] italic">
                    <Lock size={11} />
                    {p.private}
                  </span>
                )
              )}
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/kalk-ak"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-neon px-6 py-2.5 rounded text-sm font-mono"
          >
            <GithubIcon size={16} />
            <span>See all projects on GitHub</span>
          </a>
        </motion.div>
      </div>
    </FadeSection>
  );
}
