"use client";

import { motion } from "framer-motion";

interface GradientBlobProps {
  color1?: string;
  color2?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  delay?: number;
}

export function GradientBlob({
  color1 = "var(--color-accent-blue)",
  color2 = "var(--color-accent-purple)",
  className = "",
  size = "lg",
  delay = 0,
}: GradientBlobProps) {
  const sizes = {
    sm: "w-32 h-32 blur-[40px]",
    md: "w-64 h-64 blur-[60px]",
    lg: "w-96 h-96 blur-[100px]",
    xl: "w-[600px] h-[600px] blur-[120px]",
  };

  return (
    <motion.div
      className={`absolute rounded-full opacity-20 pointer-events-none mix-blend-screen ${sizes[size]} ${className}`}
      style={{
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 50%, transparent 100%)`,
      }}
      animate={{
        scale: [1, 1.2, 0.9, 1.1, 1],
        x: [0, 20, -20, 10, 0],
        y: [0, -20, 20, -10, 0],
        opacity: [0.15, 0.25, 0.15],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}
