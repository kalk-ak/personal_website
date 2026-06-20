"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Cpu, Database, Network, Terminal } from "lucide-react";
import FadeSection from "@/components/FadeSection";

const stats = [
  { value: 6, suffix: "+", label: "Years Building" },
  { value: 20, suffix: "+", label: "Projects Shipped" },
  { value: 3, suffix: "+", label: "Research Areas" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

const highlights = [
  { icon: Brain, text: "Deep expertise in ML algorithms, neural architectures, and LLM fine-tuning" },
  { icon: Cpu, text: "Hands-on robotics: ROS2, SLAM, motion planning & sensor fusion" },
  { icon: Terminal, text: "Scalable backend systems, CLI tooling, and developer infrastructure" },
  { icon: Database, text: "Production databases and high-performance data pipelines" },
  { icon: Network, text: "Computer networks, distributed systems, and TCP/IP internals" },
];

const terminalScript = [
  { cmd: "whoami", output: ["ML Engineer | Roboticist | Systems Builder"] },
  {
    cmd: "cat mission.txt",
    output: ["Build things that impact human lives,", "and keep learning along the way."],
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function TerminalBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView) return;
    let cancelled = false;

    (async () => {
      for (let i = 0; i < terminalScript.length; i++) {
        const { cmd } = terminalScript[i];
        for (let c = 1; c <= cmd.length; c++) {
          if (cancelled) return;
          setTyped(cmd.slice(0, c));
          await sleep(35);
        }
        await sleep(300);
        if (cancelled) return;
        setStep((s) => s + 1);
        setTyped("");
        await sleep(350);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [inView]);

  return (
    <div
      ref={ref}
      className="mt-8 rounded-lg border border-[rgba(0,245,212,0.12)] bg-[rgba(0,0,0,0.4)] overflow-hidden"
    >
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[rgba(255,255,255,0.05)]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs font-mono text-[#475569]">kaleb@embodied-ai ~ $</span>
      </div>
      <div className="px-4 py-4 font-mono text-xs md:text-sm space-y-1.5 min-h-[7.5rem]">
        {terminalScript.map((line, i) => {
          if (i > step) return null;
          const isCurrent = i === step;
          return (
            <div key={line.cmd} className={i > 0 ? "mt-2" : undefined}>
              <div>
                <span className="text-[#00f5d4]">$ </span>
                <span className="text-[#94a3b8]">{isCurrent ? typed : line.cmd}</span>
                {isCurrent && <span className="cursor-blink text-[#00f5d4]">_</span>}
              </div>
              {!isCurrent &&
                line.output.map((o) => (
                  <div key={o} className="text-[#e2e8f0]">
                    {o}
                  </div>
                ))}
            </div>
          );
        })}
        {step >= terminalScript.length && (
          <div className="mt-2">
            <span className="text-[#00f5d4]">$ </span>
            <span className="text-[#94a3b8] cursor-blink">_</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <FadeSection id="about" className="py-20 md:py-28 bg-[#0d0d1a] relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,245,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-[#00f5d4] tracking-widest mb-3">01 // ABOUT</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white section-title-line">
            The Engineer
            <br />
            <span className="text-gradient-cyan">Behind the Machine</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <p className="text-[#94a3b8] text-base md:text-lg leading-relaxed">
              I&apos;m <span className="text-white font-semibold">Kaleb</span>{" "}
              <span aria-label="waving hand">👋🏾</span>, a Computer Science student at{" "}
              <span className="text-white font-semibold">Johns Hopkins University</span>. I&apos;m
              minoring in <span className="text-[#00f5d4]">Robotics</span>,{" "}
              <span className="text-[#00f5d4]">Computer-Integrated Surgery</span>, and{" "}
              <span className="text-[#00f5d4]">Entrepreneurship & Management</span>.
            </p>
            <p className="text-[#94a3b8] text-base leading-relaxed">
              I&apos;m also working through an accelerated combined Master&apos;s in{" "}
              <span className="text-white font-semibold">Data Science</span> and{" "}
              <span className="text-white font-semibold">Computer Science</span>, and
              I&apos;m aiming to finish the whole thing, bachelor&apos;s and master&apos;s
              together, in four years. On my Computer Science Master&apos;s I&apos;m focused
              on{" "}
              <span className="text-[#00f5d4]">Human Language Technology</span>, and on my
              Data Science Master&apos;s I&apos;m building{" "}
              <span className="text-[#00f5d4]">
                scalable, reliable machine learning, deep learning, and reinforcement learning
                systems
              </span>
              . It&apos;s a lot to juggle, but honestly, I just like{" "}
              <a
                href="https://www.tiktok.com/@thetysontheory/video/7519567810939473166"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00f5d4] underline underline-offset-2 hover:text-white transition-colors"
              >
                challenging
              </a>{" "}
              myself. Learning new things and getting better at what I do is something I
              genuinely enjoy.
            </p>
            <p className="text-[#94a3b8] text-base leading-relaxed">
              I started building at 15, running a small startup with a friend, and never
              really stopped. I like to build and create more than I consume, which is
              probably why I love{" "}
              <span className="text-[#00f5d4]">science</span> and{" "}
              <span className="text-[#00f5d4]">technology</span>.
            </p>
            <p className="text-[#94a3b8] text-base leading-relaxed">
              Lately I&apos;ve been all in on{" "}
              <span className="text-white font-semibold">Embodied AI</span>, VLAs
              especially. I think it&apos;s going to be one of the next big leaps forward,
              and I want to be one of the people who helped build it.
            </p>

            {/* Terminal-style code block: types itself out once it's on screen */}
            <TerminalBlock />
          </motion.div>

          {/* Right: stats + highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="glass-card rounded-xl p-4 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-gradient-cyan mb-1">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-[#64748b] font-medium tracking-wide">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Highlight list */}
            <div className="space-y-3">
              {highlights.map(({ icon: Icon, text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-0.5 w-7 h-7 rounded flex items-center justify-center bg-[rgba(0,245,212,0.08)] border border-[rgba(0,245,212,0.15)] shrink-0 group-hover:bg-[rgba(0,245,212,0.15)] transition-colors">
                    <Icon size={14} className="text-[#00f5d4]" />
                  </div>
                  <p className="text-sm text-[#94a3b8] leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </FadeSection>
  );
}
