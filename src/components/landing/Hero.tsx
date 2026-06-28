"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { TextReveal } from "../motion/TextReveal";
import { FadeIn } from "../motion/FadeIn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background glow specific to hero */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[var(--color-accent-blue)] opacity-10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        <FadeIn delay={0.2}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--color-accent-purple)]/30 mb-8 cursor-pointer"
          >
            <span className="flex h-2 w-2 rounded-full bg-[var(--color-accent-purple)] animate-pulse" />
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-white to-[#a8a8a8]">
              Powered by Next-Gen AI
            </span>
          </motion.div>
        </FadeIn>

        <TextReveal
          text="Transform Every Memory Into Magic"
          gradientWord="Magic"
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
        />

        <FadeIn delay={1} direction="up">
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            AI-powered photo platform that brings your memories to life with intelligent enhancement, smart organization, and instant sharing.
          </p>
        </FadeIn>

        <FadeIn delay={1.2} direction="up" className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/dashboard/qr-generator">
            <Button as="div" size="lg" magnetic rightIcon={<ArrowRight className="w-5 h-5" />}>
              Generate QR
            </Button>
          </Link>
          <Link href="#features">
            <Button as="div" variant="secondary" size="lg" magnetic>
              Explore Features
            </Button>
          </Link>
        </FadeIn>

        <FadeIn delay={1.5} className="mt-16 text-sm text-[#888] tracking-widest uppercase">
          ✦ Trusted by 50,000+ creators ✦
        </FadeIn>
      </div>
    </section>
  );
}
