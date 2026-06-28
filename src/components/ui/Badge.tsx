"use client";

import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-[rgba(255,255,255,0.1)] text-white border-[rgba(255,255,255,0.2)]",
    success: "bg-[rgba(16,185,129,0.1)] text-emerald-400 border-[rgba(16,185,129,0.2)]",
    warning: "bg-[rgba(245,158,11,0.1)] text-amber-400 border-[rgba(245,158,11,0.2)]",
    danger: "bg-[rgba(239,68,68,0.1)] text-red-400 border-[rgba(239,68,68,0.2)]",
    info: "bg-[rgba(99,102,241,0.1)] text-indigo-400 border-[rgba(99,102,241,0.2)]",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-md ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
