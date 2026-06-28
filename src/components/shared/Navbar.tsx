"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "./Logo";
import { Button } from "../ui/Button";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Navbar() {
  const { scrollDirection, scrollY } = useScrollDirection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const hidden = scrollDirection === "down" && scrollY > 100 && !isMobileMenuOpen;
  const isScrolled = scrollY > 50;

  if (!mounted) return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: hidden ? -150 : 0, 
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div 
          className={`flex items-center justify-between w-full max-w-6xl px-6 py-3 rounded-full transition-all duration-500 border
            ${isScrolled 
              ? "bg-[rgba(5,5,5,0.7)] backdrop-blur-2xl border-[rgba(255,255,255,0.1)] shadow-[0_8px_30px_rgb(0,0,0,0.12)]" 
              : "bg-[rgba(5,5,5,0.3)] backdrop-blur-md border-[rgba(255,255,255,0.05)]"
            }`}
        >
          <Link href="/" className="shrink-0 flex items-center" data-cursor-pointer>
            <Logo size="sm" animated={false} />
          </Link>

          {!isMobile && (
            <div className="flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-white transition-colors relative group"
                  data-cursor-pointer
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-purple)] rounded-full transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            {!isMobile && (
              <Link href="/auth/login" data-cursor-pointer>
                <Button as="div" variant="ghost" size="sm" className="hidden md:flex">Sign In</Button>
              </Link>
            )}
            <Link href="/dashboard" data-cursor-pointer>
              <Button as="div" size="sm" magnetic={!isMobile}>Get Started</Button>
            </Link>
            
            {isMobile && (
              <button 
                className="p-2 text-white" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-[var(--color-bg-primary)] pt-24 px-6"
        >
          <div className="flex flex-col gap-6 text-xl">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white font-medium border-b border-[var(--color-border-glass)] pb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className="text-[var(--color-text-secondary)] font-medium mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
}
