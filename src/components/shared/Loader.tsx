"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  isLoading: boolean;
}

export function Loader({ isLoading }: LoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--color-bg-primary)]"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter gradient-text glow-purple">
              PIXLORA
            </h1>
          </motion.div>

          <div className="w-48 h-1 rounded-full bg-[rgba(255,255,255,0.1)] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-accent-blue)] via-[var(--color-accent-purple)] to-[var(--color-accent-pink)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-sm text-[var(--color-text-secondary)] font-medium tracking-widest uppercase"
          >
            Loading experience...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
