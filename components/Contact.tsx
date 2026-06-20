"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import FadeSection from "@/components/FadeSection";

const socials = [
  {
    icon: GithubIcon,
    label: "GitHub",
    handle: "@kalk-ak",
    href: "https://github.com/kalk-ak",
    color: "#e2e8f0",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    handle: "Kaleb Aklilu",
    href: "https://linkedin.com/in/",
    color: "#38bdf8",
  },
  {
    icon: Mail,
    label: "Email",
    handle: "kalebaklilu3@gmail.com",
    href: "mailto:kalebaklilu3@gmail.com",
    color: "#00f5d4",
  },
];

export default function Contact() {
  return (
    <FadeSection id="contact" fadeOut={false} className="py-20 md:py-28 bg-[#0d0d1a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[rgba(0,245,212,0.03)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,245,212,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-[#00f5d4] tracking-widest mb-3">07 // CONTACT</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let&apos;s Build{" "}
            <span className="text-gradient-cyan">Something</span>
          </h2>
          <p className="text-[#64748b] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Whether it&apos;s a new role, a collaboration, or just a conversation
            about the future of Embodied AI, I&apos;m always open.
          </p>
        </motion.div>

        {/* Main contact card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card rounded-2xl p-8 md:p-12 mb-8 relative overflow-hidden"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f5d4] to-transparent" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <MessageSquare size={16} className="text-[#00f5d4]" />
                <span className="text-sm font-mono text-[#00f5d4] tracking-wider">OPEN TO OPPORTUNITIES</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Available for{" "}
                <span className="text-gradient-cyan">Hire</span>
              </h3>
              <p className="text-[#64748b] text-sm max-w-md">
                Seeking roles in ML Engineering, Robotics, or Embodied AI. Open to
                full-time positions, research collaborations, and contract work.
              </p>
            </div>

            <a
              href="mailto:kalebaklilu3@gmail.com"
              className="cta-pulse shrink-0 group flex items-center gap-3 px-8 py-4 rounded-xl bg-[#00f5d4] text-[#0a0a0f] font-bold text-sm tracking-wide transition-all duration-300 hover:bg-white hover:shadow-[0_0_40px_rgba(0,245,212,0.4)] hover:scale-105"
            >
              Say Hello
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>

        {/* Social links */}
        <div className="grid sm:grid-cols-3 gap-4">
          {socials.map(({ icon: Icon, label, handle, href, color }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-xl p-5 flex items-center gap-4 group"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <div className="text-xs text-[#475569] font-mono mb-0.5">{label}</div>
                <div
                  className="text-sm font-medium group-hover:opacity-80 transition-opacity"
                  style={{ color }}
                >
                  {handle}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </FadeSection>
  );
}
