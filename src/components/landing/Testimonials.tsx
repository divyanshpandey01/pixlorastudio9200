"use client";

import { motion } from "framer-motion";
import { FadeIn } from "../motion/FadeIn";
import { TESTIMONIALS } from "@/lib/constants";
import { Star } from "lucide-react";
import { Avatar } from "../ui/Avatar";

export function Testimonials() {
  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <FadeIn className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Loved by creators <span className="gradient-text glow-pink">worldwide</span>
        </h2>
      </FadeIn>

      <div className="relative w-full flex overflow-hidden">
        {/* Gradient Fades for edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--color-bg-primary)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--color-bg-primary)] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex gap-6 px-6 whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {/* Duplicate array for seamless infinite scroll */}
          {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, index) => (
            <div 
              key={index} 
              className="glass p-8 rounded-[24px] w-[380px] shrink-0 whitespace-normal flex flex-col hover:border-[rgba(255,255,255,0.15)] transition-colors"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed flex-1 mb-8 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <Avatar fallback={testimonial.initials} size="md" />
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
