"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

export function IntroSequence() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(true);

  // Generate random values once to avoid React re-render mismatches
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      startX: 50 + (Math.random() * 10 - 5),
      startY: 50 + (Math.random() * 10 - 5),
      endX: 50 + (Math.random() * 200 - 100),
      endY: 50 + (Math.random() * 200 - 100),
      duration: 1.5 + Math.random(),
      delay: Math.random() * 0.5,
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
    // Increase appearance to 2.5 seconds as requested
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Prevent SSR hydration mismatch
  if (!mounted) return (
    <div className="fixed inset-0 z-[100000] bg-[var(--color-bg-primary)]" />
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100000] flex items-center justify-center bg-[var(--color-bg-primary)] overflow-hidden"
        >
          {/* Netflix-style cinematic zoom and glow */}
          <motion.div
            initial={{ scale: 0.8, letterSpacing: "-0.2em", opacity: 0 }}
            animate={{ scale: 1.3, letterSpacing: "0.15em", opacity: 1 }}
            transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex items-center justify-center z-10"
          >
            {/* Chromatic aberration layers */}
            <motion.h1 
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: -12, opacity: [0, 0.9, 0] }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="absolute text-5xl md:text-8xl font-black text-cyan-500 mix-blend-screen blur-[2px] tracking-tighter"
            >
              PIXLORA
            </motion.h1>
            <motion.h1 
              initial={{ x: 0, opacity: 0 }}
              animate={{ x: 12, opacity: [0, 0.9, 0] }}
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="absolute text-5xl md:text-8xl font-black text-pink-500 mix-blend-screen blur-[2px] tracking-tighter"
            >
              PIXLORA
            </motion.h1>
            
            {/* Main Text */}
            <h1 className="text-5xl md:text-8xl font-black text-white mix-blend-overlay drop-shadow-[0_0_30px_rgba(168,85,247,0.8)] tracking-tighter">
              PIXLORA
            </h1>
            
            {/* Horizontal Flare */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0, scaleY: 0 }}
              animate={{ opacity: [0, 1, 0], scaleX: [0, 5, 8], scaleY: [0, 0.5, 0] }}
              transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
              className="absolute w-[300px] h-[10px] bg-white rounded-[100%] blur-[8px]"
            />
          </motion.div>

          {/* Forward-moving starfield/particles (Hyperspace effect) */}
          {particles.map((p, i) => (
            <motion.div
              key={i}
              initial={{
                left: `${p.startX}%`,
                top: `${p.startY}%`,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                left: `${p.endX}%`,
                top: `${p.endY}%`,
                scale: [0, 4],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
              className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]"
            />
          ))}
          
          {/* Ambient Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 2.5 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-accent-purple)_0%,transparent_60%)] mix-blend-screen"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
