"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsIndex() {
  return (
    <div className="relative">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[rgba(124,58,237,0.06)] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-28 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#64748b] hover:text-[#00f5d4] transition-colors"
          >
            <ArrowLeft size={13} />
            Back home
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-8 mb-14"
        >
          <p className="font-mono text-sm text-[#00f5d4] tracking-widest mb-3">
            {"// PROJECTS"}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Everything I&apos;ve{" "}
            <span className="text-gradient-full">Built</span>
          </h1>
          <p className="mt-4 text-[#64748b] text-base max-w-2xl leading-relaxed">
            Machine learning, systems programming, and Linux tooling. Every project
            here has its own page with how it was built and what came out of it,
            including the ones where the honest answer was that it did not work.
          </p>
        </motion.header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 text-center"
        >
          <a
            href="https://github.com/kalk-ak"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon inline-block px-6 py-2.5 rounded text-sm font-mono"
          >
            <span className="inline-flex items-center gap-2">
              <GithubIcon size={16} />
              See the rest on GitHub
            </span>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
