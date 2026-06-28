"use client";

import { motion, Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  gradientWord?: string;
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.08,
  gradientWord,
}: TextRevealProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 20, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
    },
  };

  return (
    <motion.h1
      className={`flex flex-wrap justify-center ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: "inline-block", marginRight: "0.25em" }}
          key={index}
          className={word.replace(/[.,]/g, '') === gradientWord ? "gradient-text glow-purple" : ""}
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
