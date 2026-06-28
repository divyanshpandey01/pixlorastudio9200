"use client";

import { FadeIn } from "../motion/FadeIn";
import { PRICING_TIERS } from "@/lib/constants";
import { Button } from "../ui/Button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Simple, transparent <span className="gradient-text glow-blue">pricing</span>
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Start free. Upgrade when you need to.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {PRICING_TIERS.map((tier, index) => (
            <FadeIn key={tier.name} delay={0.1 * index} className={tier.isPopular ? "md:-mt-8 md:mb-8" : ""}>
              <motion.div 
                whileHover={{ y: -8 }}
                className={`relative glass p-8 rounded-[24px] h-full flex flex-col ${
                  tier.isPopular 
                    ? "border-[var(--color-accent-purple)]/50 shadow-[0_0_40px_rgba(168,85,247,0.15)] bg-[rgba(255,255,255,0.05)]" 
                    : ""
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-purple)] text-white text-sm font-semibold tracking-wide shadow-lg">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-semibold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-[var(--color-text-secondary)]">/month</span>
                </div>
                <p className="text-[var(--color-text-secondary)] text-sm mb-8 h-10">
                  {tier.description}
                </p>
                
                <Link href="/auth/signup" className="w-full mb-8" data-cursor-pointer>
                  <Button 
                    variant={tier.isPopular ? "primary" : "secondary"} 
                    className="w-full"
                  >
                    {tier.ctaText}
                  </Button>
                </Link>
                
                <ul className="flex flex-col gap-4 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="shrink-0 w-5 h-5 rounded-full bg-[rgba(16,185,129,0.1)] flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-sm text-[var(--color-text-secondary)]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
