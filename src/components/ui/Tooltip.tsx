"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState } from "react";

interface TooltipProps {
  content: string | ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({ content, children, position = "top", className = "" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const slideOffsets = {
    top: { y: 10, x: "-50%" },
    bottom: { y: -10, x: "-50%" },
    left: { x: 10, y: "-50%" },
    right: { x: -10, y: "-50%" },
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, ...slideOffsets[position] }}
            animate={{ opacity: 1, x: position === "top" || position === "bottom" ? "-50%" : 0, y: position === "left" || position === "right" ? "-50%" : 0 }}
            exit={{ opacity: 0, ...slideOffsets[position] }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute z-50 px-3 py-1.5 text-sm font-medium text-white glass rounded-lg whitespace-nowrap pointer-events-none ${positions[position]} ${className}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
