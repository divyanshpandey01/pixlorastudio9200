"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AuroraBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Very subtle parallax effect based on screen center
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[var(--color-bg-primary)]">
      <motion.div
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", damping: 50, stiffness: 50 }}
        className="absolute inset-0 w-full h-full"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-15 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-accent-indigo) 0%, transparent 70%)" }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen opacity-20 blur-[100px]"
          style={{ background: "radial-gradient(circle, var(--color-accent-purple) 0%, transparent 70%)" }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            y: [0, -80, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
          className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[40vw] rounded-full mix-blend-screen opacity-15 blur-[130px]"
          style={{ background: "radial-gradient(circle, var(--color-accent-pink) 0%, transparent 70%)" }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/40" /> {/* Darken overlay */}
      <div className="absolute inset-0 noise-overlay mix-blend-overlay opacity-30" />
    </div>
  );
}
