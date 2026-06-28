"use client";

import { motion, useScroll } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] bg-[rgba(255,255,255,0.05)]">
      <motion.div
        className="h-full bg-gradient-to-r from-[var(--color-accent-blue)] via-[var(--color-accent-purple)] to-[var(--color-accent-pink)] origin-left glow-purple"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}
