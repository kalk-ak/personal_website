"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface FadeSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Skip the exit fade — use for the last section, which has no room to scroll past. */
  fadeOut?: boolean;
}

/**
 * Crossfades a section in as it enters the viewport and out as it leaves,
 * tied directly to scroll position so the transition feels continuous
 * rather than a discrete on/off trigger.
 */
export default function FadeSection({
  children,
  className,
  id,
  fadeOut = true,
}: FadeSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: enter } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.4"],
  });
  const { scrollYProgress: exit } = useScroll({
    target: ref,
    offset: ["end 0.6", "end 0.05"],
  });

  const fadeIn = useTransform(enter, [0, 1], [0, 1]);
  const fadeOutValue = useTransform(exit, [0, 1], [1, 0]);
  const opacity = useTransform([fadeIn, fadeOutValue], (values) => {
    const [inVal, outVal] = values as number[];
    return fadeOut ? Math.min(inVal, outVal) : inVal;
  });

  return (
    <motion.section ref={ref} id={id} className={className} style={{ opacity }}>
      {children}
    </motion.section>
  );
}
