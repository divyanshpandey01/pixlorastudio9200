"use client";

import { motion } from "framer-motion";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  className?: string;
}

export function Toggle({ checked, onChange, label, description, className = "" }: ToggleProps) {
  return (
    <label className={`flex items-center justify-between cursor-pointer ${className}`}>
      {(label || description) && (
        <div className="flex flex-col mr-4">
          {label && <span className="font-medium text-white">{label}</span>}
          {description && <span className="text-sm text-[var(--color-text-secondary)]">{description}</span>}
        </div>
      )}
      <div 
        className="relative w-12 h-6 rounded-full transition-colors duration-300"
        style={{
          backgroundColor: checked ? "var(--color-accent-purple)" : "rgba(255,255,255,0.1)"
        }}
        onClick={() => onChange(!checked)}
      >
        <motion.div
          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </div>
    </label>
  );
}
