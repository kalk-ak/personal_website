"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import FadeSection from "@/components/FadeSection";

const ROLES = [
  "Machine Learning Engineer",
  "Robotics Engineer",
  "Passionate about Embodied AI",
  "Systems Architect",
  "Automation Builder",
];

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      pulse: number;
      pulseSpeed: number;
    }

    const nodes: Node[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.8,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
    }));

    const MAX_DIST = 160;
    const MOUSE_DIST = 120;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        // Bounce
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > canvas.width) { n.x = canvas.width; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > canvas.height) { n.y = canvas.height; n.vy *= -1; }

        // Mouse repulsion
        const dx = n.x - mx;
        const dy = n.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_DIST && d > 0) {
          const force = (MOUSE_DIST - d) / MOUSE_DIST;
          n.vx += (dx / d) * force * 0.3;
          n.vy += (dy / d) * force * 0.3;
          // Clamp velocity
          const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
          if (speed > 2) { n.vx = (n.vx / speed) * 2; n.vy = (n.vy / speed) * 2; }
        }

        n.pulse += n.pulseSpeed;
        const glow = 0.4 + Math.sin(n.pulse) * 0.3;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (1 + Math.sin(n.pulse) * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 212, ${glow})`;
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.25;
            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y
            );
            gradient.addColorStop(0, `rgba(0, 245, 212, ${alpha})`);
            gradient.addColorStop(1, `rgba(124, 58, 237, ${alpha * 0.6})`);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      style={{ pointerEvents: "none" }}
    />
  );
}

function TypeWriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => setPaused(false), 1400);
      return () => clearTimeout(t);
    }

    const target = ROLES[roleIndex];
    const speed = deleting ? 40 : 75;

    const t = setTimeout(() => {
      if (!deleting && text.length < target.length) {
        setText(target.slice(0, text.length + 1));
      } else if (!deleting && text.length === target.length) {
        setPaused(true);
        setDeleting(true);
      } else if (deleting && text.length > 0) {
        setText(text.slice(0, -1));
      } else if (deleting && text.length === 0) {
        setDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }
    }, speed);

    return () => clearTimeout(t);
  }, [text, deleting, roleIndex, paused]);

  return (
    <div className="font-mono text-lg md:text-xl text-[#94a3b8] h-8 flex items-center gap-1">
      <span className="text-[#00f5d4]">&gt;</span>
      <span>{text}</span>
      <span className="cursor-blink text-[#00f5d4]">_</span>
    </div>
  );
}

export default function Hero() {
  return (
    <FadeSection className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f]">
      {/* Neural network background */}
      <NeuralCanvas />

      {/* Scanlines overlay */}
      <div className="scanlines" />

      {/* Radial gradient focus */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,245,212,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-20 left-8 w-16 h-16 border-l-2 border-t-2 border-[rgba(0,245,212,0.2)] rounded-tl-sm" />
      <div className="absolute top-20 right-8 w-16 h-16 border-r-2 border-t-2 border-[rgba(0,245,212,0.2)] rounded-tr-sm" />
      <div className="absolute bottom-20 left-8 w-16 h-16 border-l-2 border-b-2 border-[rgba(0,245,212,0.2)] rounded-bl-sm" />
      <div className="absolute bottom-20 right-8 w-16 h-16 border-r-2 border-b-2 border-[rgba(0,245,212,0.2)] rounded-br-sm" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full border border-[rgba(0,245,212,0.2)] bg-[rgba(0,245,212,0.04)] text-xs font-mono text-[#00f5d4]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00f5d4] animate-pulse" />
          Available for Opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          className="glitch-name font-display text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tight leading-none mb-4"
        >
          <span className="text-gradient-cyan">khal</span>
        </motion.h1>

        {/* Full name */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="font-mono text-xs md:text-sm tracking-[0.35em] uppercase text-[#64748b] mb-8"
        >
          Kaleb Aklilu
        </motion.p>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-10"
        >
          <TypeWriter />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="text-base md:text-lg text-[#64748b] max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          I build in <span className="text-[#e2e8f0]">robotics</span>,{" "}
          <span className="text-[#e2e8f0]">automation</span>, and{" "}
          <span className="text-[#e2e8f0]">backend systems</span>, things that
          make people and your business more capable.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3 rounded font-semibold text-sm tracking-wide overflow-hidden bg-[#00f5d4] text-[#0a0a0f] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,212,0.45)] hover:scale-[1.03]"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="btn-neon px-8 py-3 rounded font-semibold text-sm tracking-wide"
          >
            <span>Let&apos;s Connect</span>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { icon: GithubIcon, href: "https://github.com/kalk-ak", label: "GitHub" },
            { icon: LinkedinIcon, href: "https://linkedin.com/in/", label: "LinkedIn" },
            { icon: Mail, href: "mailto:kalebaklilu3@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[#475569] hover:text-[#00f5d4] transition-all duration-200 hover:scale-110"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#475569]"
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-[#00f5d4]" />
        </motion.div>
      </motion.div>
    </FadeSection>
  );
}
