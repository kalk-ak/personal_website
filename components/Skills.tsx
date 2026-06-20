"use client";

import { motion } from "framer-motion";
import FadeSection from "@/components/FadeSection";

const categories = [
  {
    title: "AI & Machine Learning",
    color: "#00f5d4",
    skills: [
      "PyTorch", "TensorFlow", "scikit-learn", "Hugging Face",
      "Computer Vision", "NLP", "Reinforcement Learning",
      "LLM Fine-tuning", "OpenCV", "ONNX", "MLflow",
    ],
  },
  {
    title: "Robotics & Embodied AI",
    color: "#7c3aed",
    badge: "Currently Learning",
    skills: [
      "ROS2", "Control Systems", "Isaac Sim",
      "Kinematics", "Perception",
    ],
  },
  {
    title: "Languages & Frameworks",
    color: "#38bdf8",
    skills: [
      "Python", "C++", "CUDA", "SQL", "Bash / Shell", "Java",
      "x86 Assembly", "VHDL (learning)", "TypeScript", "Rust (learning)",
    ],
  },
  {
    title: "Systems & Software",
    color: "#f97316",
    skills: [
      "Scalable Architecture", "Microservices", "Docker",
      "Git / CI-CD", "Linux", "Parallel Computing", "Performance Engineering",
    ],
  },
  {
    title: "Databases",
    color: "#a3e635",
    skills: [
      "PostgreSQL", "SQLite", "NoSQL", "Vector DBs",
      "Data Pipelines", "Polars", "Apache Arrow", "PyArrow", "Kafka",
    ],
  },
  {
    title: "Networks & Infrastructure",
    color: "#fb7185",
    skills: [
      "TCP/IP", "Distributed Systems", "Network Programming",
      "WebSockets", "Message Queues", "Kubernetes", "AWS / GCP",
    ],
  },
];

export default function Skills() {
  return (
    <FadeSection id="skills" className="py-20 md:py-28 bg-[#0a0a0f] relative">
      {/* Glow orbs */}
      <div className="absolute top-40 left-0 w-72 h-72 rounded-full bg-[rgba(0,245,212,0.04)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 right-0 w-72 h-72 rounded-full bg-[rgba(124,58,237,0.05)] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-[#00f5d4] tracking-widest mb-3">02 // SKILLS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Technical{" "}
            <span className="text-gradient-purple">Arsenal</span>
          </h2>
          <p className="mt-4 text-[#64748b] text-base max-w-xl">
            A full stack of capabilities, from low level robotics firmware to production ML systems.
          </p>
        </motion.div>

        {/* Categories grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 group relative overflow-hidden"
            >
              {/* One-time light sweep across the card as it powers on */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(115deg, transparent 30%, ${cat.color}1a 50%, transparent 70%)`,
                }}
                initial={{ x: "-120%" }}
                whileInView={{ x: "120%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.08 + 0.15, ease: "easeOut" }}
              />

              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  className="w-2 h-8 rounded-full origin-bottom"
                  style={{ background: cat.color }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                />
                <h3
                  className="font-semibold text-sm tracking-wide"
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>
                {cat.badge && (
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                    style={{ color: cat.color, borderColor: `${cat.color}40`, background: `${cat.color}10` }}
                  >
                    {cat.badge}
                  </span>
                )}
              </div>

              {/* Skill chips */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + j * 0.03, duration: 0.3 }}
                    className="skill-chip inline-block px-3 py-1 rounded-full text-xs font-medium text-[#94a3b8] bg-[rgba(255,255,255,0.03)] cursor-default select-none"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Currently learning banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex items-center gap-4 px-6 py-4 rounded-xl border border-[rgba(0,245,212,0.12)] bg-[rgba(0,245,212,0.03)]"
        >
          <div className="w-2 h-2 rounded-full bg-[#00f5d4] animate-pulse shrink-0" />
          <p className="text-sm text-[#64748b]">
            <span className="text-[#00f5d4] font-mono mr-2">Currently exploring:</span>
            World Models · Diffusion Policies · Foundation Models for Robotics
          </p>
        </motion.div>
      </div>
    </FadeSection>
  );
}
