"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  magnetic?: boolean;
  as?: "button" | "div";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  magnetic = false,
  as = "button",
  className = "",
  ...props
}: ButtonProps) {
  const buttonRef = useRef<any>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    if (!magnetic || !buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setPosition({ x: x * 0.2, y: y * 0.2 });
  };

  const handleMouseLeave = () => {
    if (magnetic) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-[var(--radius-button)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent-purple)] focus:ring-offset-[var(--color-bg-primary)] overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-[var(--color-accent-blue)] via-[var(--color-accent-purple)] to-[var(--color-accent-pink)] text-white glow-purple border border-transparent",
    secondary: "glass text-white hover:bg-[rgba(255,255,255,0.08)]",
    ghost: "text-[var(--color-text-secondary)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] bg-transparent",
    danger: "bg-[rgba(239,68,68,0.1)] text-red-400 border border-[rgba(239,68,68,0.2)] hover:bg-[rgba(239,68,68,0.2)] hover:text-red-300",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const Component = as === "div" ? motion.div : motion.button;

  return (
    <Component
      ref={buttonRef}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${isLoading ? "opacity-80 cursor-not-allowed" : ""}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {/* Ripple/Glow effect overlay for primary buttons could go here */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading && <Loader2 className="animate-spin w-4 h-4" />}
        {!isLoading && leftIcon && <span className="flex items-center">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="flex items-center">{rightIcon}</span>}
      </span>
      {variant === "primary" && (
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] hover:animate-[shimmer_2s_infinite]" />
      )}
    </Component>
  );
}
