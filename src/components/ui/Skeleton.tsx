"use client";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: "sm" | "md" | "lg" | "full" | "none";
}

export function Skeleton({ className = "", width, height, rounded = "md" }: SkeletonProps) {
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-[var(--radius-card)]",
    full: "rounded-full",
  };

  return (
    <div
      className={`relative overflow-hidden bg-[rgba(255,255,255,0.05)] ${roundedClasses[rounded]} ${className}`}
      style={{ width, height }}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent" />
    </div>
  );
}
