"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
}

export function Logo({ size = "md", animated = true, className = "" }: LogoProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
    xl: "text-7xl",
  };

  const Content = (
    <div className={`flex flex-col items-center ${className}`}>
      <span className={`${sizes[size]} font-bold tracking-tighter gradient-text`}>
        PIXLORA
      </span>
      {size !== "sm" && (
        <span className="text-[0.35em] text-[var(--color-text-secondary)] tracking-[0.2em] uppercase font-medium mt-[-0.2em]">
          Studio
        </span>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className="absolute inset-0 blur-xl opacity-50 glow-purple pointer-events-none" />
        {Content}
      </motion.div>
    );
  }

  return Content;
}
