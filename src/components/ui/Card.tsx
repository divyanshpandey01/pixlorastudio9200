"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";

interface CardProps {
  children: ReactNode;
  variant?: "default" | "feature" | "stat";
  tilt?: boolean;
  glow?: boolean;
  className?: string;
}

export function Card({
  children,
  variant = "default",
  tilt = true,
  glow = false,
  className = "",
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const rotateX = useMotionTemplate`${springY}deg`;
  const rotateY = useMotionTemplate`${springX}deg`;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    if (tilt) {
      const xPct = mouseXPos / width - 0.5;
      const yPct = mouseYPos / height - 0.5;
      x.set(xPct * 8); // Max 8 degrees
      y.set(-yPct * 8);
    }
    
    if (glow) {
      mouseX.set(mouseXPos);
      mouseY.set(mouseYPos);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = "relative rounded-[var(--radius-card)] overflow-hidden transition-colors duration-300";
  
  const variants = {
    default: "glass",
    feature: "glass p-8 hover:border-[rgba(255,255,255,0.15)]",
    stat: "glass p-6",
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`group ${baseStyles} ${variants[variant]} ${className}`}
    >
      {glow && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                var(--color-accent-purple),
                transparent 80%
              )
            `,
            opacity: 0.15,
            zIndex: 0
          }}
        />
      )}
      <div className="relative z-10 h-full w-full transform-gpu" style={{ transform: "translateZ(10px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
