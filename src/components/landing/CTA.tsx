"use client";

import { FadeIn } from "../motion/FadeIn";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-32 px-6 relative z-10 text-center">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-full max-w-3xl h-[400px] bg-gradient-to-r from-[var(--color-accent-blue)] via-[var(--color-accent-purple)] to-[var(--color-accent-pink)] opacity-20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Ready to transform your <span className="gradient-text glow-purple">photos?</span>
          </h2>
          <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-10">
            Join 50,000+ creators using PIXLORA STUDIO today.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <Link href="/auth/signup" data-cursor-pointer>
              <Button as="div" size="lg" magnetic rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Creating for Free
              </Button>
            </Link>
            <p className="text-sm text-[#666]">
              No credit card required · Free forever plan available
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
