"use client";

import { FadeIn } from "../motion/FadeIn";
import { TiltCard } from "../motion/TiltCard";
import { FEATURES } from "@/lib/constants";
import * as Icons from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you <span className="gradient-text glow-purple">need</span>
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Powerful tools designed for modern creators to manage, enhance, and share.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = (Icons as any)[feature.icon];
            const isLast = index === FEATURES.length - 1;
            
            return (
              <FadeIn 
                key={feature.title} 
                delay={0.1 * index}
                className={isLast ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""}
              >
                <TiltCard className="h-full">
                  <div className="h-full glass p-8 rounded-[20px] transition-all duration-300 hover:border-[rgba(255,255,255,0.15)] group relative overflow-hidden">
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-purple)]/0 to-[var(--color-accent-pink)]/0 group-hover:from-[var(--color-accent-purple)]/10 group-hover:to-[var(--color-accent-pink)]/10 transition-colors duration-500" />
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-6 bg-gradient-to-br from-white/5 to-white/0 border-[rgba(255,255,255,0.1)] group-hover:border-[var(--color-accent-purple)]/50 transition-colors">
                        {Icon && <Icon className="w-6 h-6 text-white group-hover:text-[var(--color-accent-purple)] transition-colors" />}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
