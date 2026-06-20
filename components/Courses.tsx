"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, ExternalLink } from "lucide-react";
import courses from "@/data/courses.json";
import FadeSection from "@/components/FadeSection";

interface Course {
  courseNumber?: string;
  name: string;
  school: string;
  link: string;
  description: string;
  type?: "Certification";
  issued?: string;
  credentialId?: string;
}

export default function Courses() {
  const list = courses as Course[];

  if (list.length === 0) return null;

  return (
    <FadeSection id="courses" className="py-20 md:py-28 bg-[#0a0a0f] relative">
      <div className="absolute top-40 right-0 w-72 h-72 rounded-full bg-[rgba(56,189,248,0.04)] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-sm text-[#00f5d4] tracking-widest mb-3">06 // COURSEWORK</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Relevant Course{" "}
            <span className="text-gradient-cyan">Log</span>
          </h2>
          <p className="mt-4 text-[#64748b] text-base max-w-xl">
            Coursework I&apos;ve completed and what I took away from each.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((course, i) => (
            <motion.a
              key={`${course.courseNumber ?? course.credentialId}-${i}`}
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              className="glass-card rounded-2xl p-6 group block"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[#00f5d4]">
                  {course.type === "Certification" ? (
                    <>
                      <Award size={15} />
                      CERTIFICATION
                    </>
                  ) : (
                    <>
                      <BookOpen size={15} />
                      {course.courseNumber}
                    </>
                  )}
                </div>
                <ExternalLink
                  size={15}
                  className="text-[#475569] group-hover:text-[#00f5d4] transition-colors"
                />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1 leading-snug">
                {course.name}
              </h3>
              <p className="text-xs text-[#64748b] mb-3">
                {course.school}
                {course.issued && ` · Issued ${course.issued}`}
              </p>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                {course.description}
              </p>
              {course.credentialId && (
                <p className="mt-3 text-[10px] font-mono text-[#475569]">
                  Credential ID: {course.credentialId}
                </p>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </FadeSection>
  );
}
