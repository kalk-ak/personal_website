"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import FadeSection from "@/components/FadeSection";
import ProjectCard from "@/components/ProjectCard";
import { projects, HOMEPAGE_COUNT } from "@/data/projects";

/**
 * Condensed projects section. The homepage only previews the strongest few and
 * routes everything else to /projects and the per-project pages, so the long
 * writeups aren't competing with the rest of the page for attention.
 */
export default function Projects() {
  const preview = projects.slice(0, HOMEPAGE_COUNT);
  const remaining = projects.length - preview.length;

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
          className="mb-12"
        >
          <p className="font-mono text-sm text-[#00f5d4] tracking-widest mb-3">05 // PROJECTS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Things I&apos;ve{" "}
            <span className="text-gradient-full">Shipped</span>
          </h2>
          <p className="mt-4 text-[#64748b] text-base max-w-xl">
            A few of my favorites. Each one has its own page with the full story.
          </p>
        </motion.div>

        {/* Preview grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {preview.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        {/* Routes out */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/projects" className="btn-neon px-6 py-2.5 rounded text-sm font-mono">
            <span className="inline-flex items-center gap-2">
              {remaining > 0 ? `All ${projects.length} projects` : "All projects"}
              <ArrowRight size={15} />
            </span>
          </Link>
          <a
            href="https://github.com/kalk-ak"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded text-sm font-mono text-[#64748b] hover:text-[#e2e8f0] transition-colors"
          >
            <GithubIcon size={15} />
            <span>GitHub</span>
          </a>
        </motion.div>
      </div>
    </FadeSection>
  );
}
