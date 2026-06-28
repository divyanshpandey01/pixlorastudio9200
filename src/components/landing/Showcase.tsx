"use client";

import { motion } from "framer-motion";
import { FadeIn } from "../motion/FadeIn";
import { ParallaxSection } from "../motion/ParallaxSection";
import { ShieldCheck, Zap, Activity } from "lucide-react";

export function Showcase() {
  return (
    <section id="showcase" className="py-24 px-6 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Experience the <span className="gradient-text glow-pink">Future</span>
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            A beautiful, intuitive interface designed for speed and productivity.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[var(--color-accent-purple)] opacity-20 blur-[120px] rounded-full pointer-events-none" />

          {/* Floating Badges */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 md:-left-12 top-20 z-20 glass px-4 py-2 rounded-full flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium">256-bit Encrypted</span>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-4 md:-right-12 top-40 z-20 glass px-4 py-2 rounded-full flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium">AI Powered</span>
          </motion.div>

          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute left-10 md:left-32 -bottom-6 z-20 glass px-4 py-2 rounded-full flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-[var(--color-accent-cyan)]" />
            <span className="text-sm font-medium">99.9% Uptime</span>
          </motion.div>

          {/* Main Mockup */}
          <ParallaxSection speed={0.1}>
            <div className="relative z-10 glass-strong p-2 md:p-4 rounded-[24px] md:rounded-[32px] border border-[rgba(255,255,255,0.1)] shadow-2xl">
              <div className="bg-[#0A0A0A] rounded-[18px] md:rounded-[24px] overflow-hidden border border-[rgba(255,255,255,0.05)] flex flex-col h-[400px] md:h-[600px]">
                
                {/* Mock Topbar */}
                <div className="h-14 border-b border-[rgba(255,255,255,0.05)] flex items-center px-4 md:px-6 gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="mx-auto w-1/3 max-w-[300px] h-7 bg-[rgba(255,255,255,0.05)] rounded-full" />
                  <div className="w-7 h-7 rounded-full bg-[rgba(255,255,255,0.1)] ml-auto" />
                </div>

                {/* Mock Content Area */}
                <div className="flex flex-1 overflow-hidden">
                  {/* Mock Sidebar */}
                  <div className="w-16 md:w-56 border-r border-[rgba(255,255,255,0.05)] p-4 flex flex-col gap-3 hidden sm:flex">
                    <div className="h-8 bg-[rgba(255,255,255,0.1)] rounded-md w-full" />
                    <div className="h-8 bg-[rgba(255,255,255,0.05)] rounded-md w-full" />
                    <div className="h-8 bg-[rgba(255,255,255,0.05)] rounded-md w-full" />
                    <div className="h-8 bg-[rgba(255,255,255,0.05)] rounded-md w-full mt-auto" />
                  </div>

                  {/* Mock Main Grid */}
                  <div className="flex-1 p-6 flex flex-col gap-6">
                    <div className="flex gap-4">
                      <div className="h-24 flex-1 bg-gradient-to-br from-[var(--color-accent-blue)]/20 to-[var(--color-accent-purple)]/20 rounded-xl border border-[rgba(255,255,255,0.05)]" />
                      <div className="h-24 flex-1 bg-gradient-to-br from-[var(--color-accent-purple)]/20 to-[var(--color-accent-pink)]/20 rounded-xl border border-[rgba(255,255,255,0.05)]" />
                      <div className="h-24 flex-1 bg-gradient-to-br from-[var(--color-accent-pink)]/20 to-[var(--color-accent-cyan)]/20 rounded-xl border border-[rgba(255,255,255,0.05)] hidden md:block" />
                    </div>
                    
                    <div className="flex-1 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] p-4 flex flex-col gap-4">
                      <div className="h-6 w-32 bg-[rgba(255,255,255,0.1)] rounded-md" />
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                          <div key={i} className="bg-[rgba(255,255,255,0.03)] rounded-lg w-full h-full min-h-[80px]" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </ParallaxSection>
        </div>
      </div>
    </section>
  );
}
