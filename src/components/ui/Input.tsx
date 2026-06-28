"use client";

import { motion } from "framer-motion";
import { InputHTMLAttributes, ReactNode, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export function Input({ label, error, icon, className = "", ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    props.onChange?.(e);
  };

  const id = props.id || props.name || label;

  return (
    <div className={`relative flex flex-col gap-1 w-full ${className}`}>
      <div className="relative">
        <motion.div
          initial={false}
          animate={{
            borderColor: error 
              ? "rgba(239,68,68,0.5)" 
              : isFocused 
                ? "var(--color-accent-purple)" 
                : "var(--color-border-glass)",
            boxShadow: error
              ? "0 0 10px rgba(239,68,68,0.2)"
              : isFocused
                ? "0 0 15px rgba(168,85,247,0.3)"
                : "none"
          }}
          className="absolute inset-0 rounded-[var(--radius-input)] pointer-events-none transition-colors duration-300"
        />
        
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] z-10">
            {icon}
          </div>
        )}
        
        <input
          id={id}
          className={`
            w-full bg-[var(--color-bg-glass)] text-[var(--color-text-primary)]
            rounded-[var(--radius-input)] px-4 py-3 outline-none
            transition-all duration-300 backdrop-blur-md placeholder:text-transparent
            ${icon ? "pl-12" : ""}
            ${error ? "text-red-100" : ""}
          `}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        
        {label && (
          <motion.label
            htmlFor={id}
            initial={false}
            animate={{
              top: isFocused || hasValue || props.placeholder ? "8px" : "50%",
              left: icon ? "48px" : "16px",
              y: isFocused || hasValue || props.placeholder ? "0" : "-50%",
              scale: isFocused || hasValue || props.placeholder ? 0.75 : 1,
              color: error ? "rgb(248 113 113)" : isFocused ? "var(--color-accent-purple)" : "var(--color-text-secondary)",
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute origin-left pointer-events-none"
            style={{ top: "50%", left: icon ? "48px" : "16px" }}
          >
            {label}
          </motion.label>
        )}
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 pl-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
