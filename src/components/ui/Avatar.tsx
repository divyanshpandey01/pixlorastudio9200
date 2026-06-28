"use client";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Avatar({ src, alt = "Avatar", fallback, size = "md", className = "" }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  return (
    <div className={`relative rounded-full overflow-hidden shrink-0 inline-flex items-center justify-center p-[2px] bg-gradient-to-tr from-[var(--color-accent-blue)] to-[var(--color-accent-pink)] ${sizes[size]} ${className}`}>
      <div className="w-full h-full rounded-full overflow-hidden bg-[var(--color-bg-primary)] flex items-center justify-center">
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span className="font-semibold text-white tracking-wider">
            {fallback || alt.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
    </div>
  );
}
