"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, ExternalLink, FileText } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import FadeSection from "@/components/FadeSection";

interface DocLink {
  label: string;
  href: string;
}

interface ExperienceEntry {
  role: string;
  company: string;
  link: string;
  location: string;
  period: string;
  type: string;
  description: ReactNode;
  tech: string[];
  current: boolean;
  repoLink?: string;
  docs?: DocLink[];
}

const experiences: ExperienceEntry[] = [
  {
    role: "Machine Learning Engineer",
    company: "Lockheed Martin",
    link: "https://www.lockheedmartin.com/",
    location: "Orlando, Florida, United States",
    period: "May 2026 to Present",
    type: "Internship",
    description:
      "Using control theory, reinforcement learning, and game theory to solve guidance and navigation problems for autonomous systems.",
    tech: [],
    current: true,
  },
  {
    role: "Data Engineer & Machine Learning Engineer",
    company: "Under Anthony J. Kearsley",
    link: "https://www.siam.org/publications/siam-news/authors/anthony-j-kearsley/?_page=1&keywords=&_limit=10&authorPersonKey=f253e6d3-b213-4185-9265-b0df853bd108",
    location: "Baltimore, Maryland, United States",
    period: "Jan 2026 to June 2026",
    type: "Academic Capstone",
    description:
      "Built an automated scraper (85% success rate) that gathered over 2 million financial news articles from Google News and BigQuery's Global News Knowledge Graph, stripping ads and boilerplate from the raw HTML. Embedded the articles with Doc2Vec and filtered them with a similarity function to keep only the relevant ones. Fine-tuned a 250 million parameter FinBERT model and a few others, replacing their final layers to predict from the news text data. Benchmarked models from decision trees to attention-based time series networks forecasting returns for 10 tech stocks, then adapted the scraper, with rotating proxies, fingerprint-randomized profiles, and automated CAPTCHA solving, to forecast crude oil prices during the US-Iran conflict. Struggled to beat a random baseline or the S&P 500, but learned a lot.",
    tech: ["Web Scraping", "Playwright", "GoLogin", "Doc2Vec", "FinBERT", "CatBoost", "BiLSTM", "Time Series Models", "Transformers"],
    docs: [
      { label: "Stock Prediction Report", href: "https://github.com/kalk-ak/personal_website/blob/master/DataMining_Report.pdf" },
      { label: "Oil Price Analysis", href: "https://github.com/kalk-ak/personal_website/blob/master/Oil_analysis.pdf" },
    ],
    current: false,
  },
  {
    role: "Software Developer, Particle Physics DAQ Systems",
    company: "Under Petar Maksimovic",
    link: "https://physics-astronomy.jhu.edu/directory/petar-maksimovic/",
    repoLink: "https://github.com/kalk-ak/SpinQuest-TDC-FW/tree/master/DAQ-Simulator",
    location: "Baltimore, Maryland, United States",
    period: "Nov 2025 to Present",
    type: "Research",
    description: (
      <>
        Building a high-throughput data acquisition system for the{" "}
        <a
          href="https://spinquest.fnal.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00f5d4] underline underline-offset-2 hover:text-white transition-colors"
        >
          SpinQuest
        </a>{" "}
        particle physics experiment. Built a multi-threaded server from the ground up that
        ingests TCP, UDP, and UNIX
        socket streams from FPGA boards during accelerator spills, plus a load-testing FPGA
        simulator with lock-free SO_REUSEPORT load balancing across worker threads.
      </>
    ),
    tech: ["C++", "CMake", "Multithreading", "TCP/UDP Sockets", "Pandas"],
    current: true,
  },
  {
    role: "Course Assistant, Physics 2",
    company: "Johns Hopkins Whiting School of Engineering",
    link: "https://engineering.jhu.edu/",
    location: "Baltimore, Maryland, United States",
    period: "Jan 2026 to Present",
    type: "Part-time",
    description:
      "Lead discussion and review sessions to help students understand electromagnetism and modern physics. Hold office hours for one on one support, exam review sessions, and homework prep.",
    tech: ["University Teaching", "Analytic Problem Solving"],
    current: true,
  },
  {
    role: "Freelance Automation Developer",
    company: "Kellogg Square Parking Ramp",
    link: "https://www.kelloggsquareparkingramp.com/",
    repoLink: "https://github.com/kalk-ak/Catch-Parking-Violators",
    location: "Minneapolis, Minnesota, United States",
    period: "Oct 2025 to Nov 2025",
    type: "Freelance Contract",
    description:
      "Built an automated tool from scratch that catches users abusing a flaw in the system, sharing one account across multiple cars parked at once. Optimized it with an advanced greedy algorithm, a sorted two pointer scan, so it scales to millions of transactions in a reasonable amount of time. It also flags plate to account mismatches and writes a violation report so management can see who's abusing the system.",
    tech: ["Python", "Pandas", "Algorithm Optimization"],
    current: false,
  },
  {
    role: "Mathematics Tutor",
    company: "Teach For America Ignite",
    link: "https://www.teachforamerica.org/",
    location: "Remote",
    period: "Sep 2024 to May 2026",
    type: "Part-time",
    description:
      "Provided virtual, small group tutoring in mathematics, breaking down difficult math and physics concepts into manageable steps and adapting my teaching style to fit each student's needs.",
    tech: ["Mathematics Tutoring", "Physics Tutoring"],
    current: false,
  },
];

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <FadeSection id="experience" className="py-20 md:py-28 bg-[#0d0d1a] relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[rgba(0,245,212,0.15)] to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-[#00f5d4] tracking-widest mb-3">04 // EXPERIENCE</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Where I&apos;ve{" "}
            <span className="text-gradient-cyan">Built Things</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Faint base line, always visible for structure */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)] md:-translate-x-1/2" />
          {/* Lit line that draws itself in as you scroll through the section */}
          <motion.div
            className="absolute left-4 md:left-1/2 top-0 w-px h-full origin-top bg-gradient-to-b from-[#00f5d4] via-[#7c3aed] to-transparent md:-translate-x-1/2"
            style={{ scaleY: lineProgress }}
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 md:-translate-x-1/2 z-10">
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${
                        exp.current
                          ? "bg-[#00f5d4] border-[#00f5d4] shadow-[0_0_12px_rgba(0,245,212,0.6)]"
                          : "bg-[#0d0d1a] border-[rgba(0,245,212,0.4)]"
                      }`}
                    />
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-12 md:ml-0 w-full md:w-[calc(50%-32px)] ${
                      isLeft ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <div className="glass-card rounded-2xl p-6 group">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {exp.current && (
                              <span className="inline-block px-2 py-0.5 text-[10px] font-mono rounded bg-[rgba(0,245,212,0.1)] text-[#00f5d4] border border-[rgba(0,245,212,0.2)]">
                                CURRENT
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-[#475569] uppercase tracking-wider">
                              {exp.type}
                            </span>
                          </div>
                          <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-[#00f5d4] transition-colors">
                            {exp.role}
                          </h3>
                          <a
                            href={exp.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm text-[#7c3aed] hover:text-[#a78bfa] transition-colors mt-0.5"
                          >
                            {exp.company}
                            <ExternalLink size={11} />
                          </a>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-[#475569] font-mono">
                        <span>{exp.period}</span>
                        <span className="text-[rgba(0,245,212,0.2)]">|</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          {exp.location}
                        </span>
                      </div>

                      <p className="text-sm text-[#64748b] leading-relaxed mb-5">
                        {exp.description}
                      </p>

                      {/* Tech stack */}
                      {exp.tech.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {exp.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-0.5 rounded text-[11px] font-mono text-[#64748b] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {exp.repoLink && (
                        <a
                          href={exp.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 flex items-center gap-1.5 text-xs font-mono text-[#64748b] hover:text-[#00f5d4] transition-colors"
                        >
                          <GithubIcon size={13} />
                          View Repo
                        </a>
                      )}

                      {exp.docs && exp.docs.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-3">
                          {exp.docs.map((doc) => (
                            <a
                              key={doc.href}
                              href={doc.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium text-[#00f5d4] bg-[rgba(0,245,212,0.08)] border border-[rgba(0,245,212,0.3)] hover:bg-[rgba(0,245,212,0.15)] hover:border-[#00f5d4] transition-colors"
                            >
                              <FileText size={13} />
                              {doc.label}
                              <ExternalLink size={11} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </FadeSection>
  );
}
