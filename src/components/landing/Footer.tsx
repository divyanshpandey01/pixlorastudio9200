"use client";

import { Logo } from "../shared/Logo";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.05)] bg-[#030303] pt-20 pb-10 px-6 z-10">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-purple)] to-transparent opacity-20" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Logo size="sm" animated={false} />
            </Link>
            <p className="text-[var(--color-text-secondary)] mb-8 max-w-sm">
              The premium AI-powered platform for creators to manage, enhance, and share their visual memories.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-[var(--color-text-secondary)] hover:text-white hover:border-[var(--color-accent-purple)]/50 transition-colors"
                >
                  <span className="text-sm font-medium">{link.name[0]}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="flex flex-col gap-4 text-[var(--color-text-secondary)]">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Changelog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Roadmap</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="flex flex-col gap-4 text-[var(--color-text-secondary)]">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="flex flex-col gap-4 text-[var(--color-text-secondary)]">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">System Status</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-[rgba(255,255,255,0.05)] flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--color-text-secondary)]">
          <p>© {new Date().getFullYear()} PIXLORA STUDIO. All rights reserved.</p>
          <p>Designed with <span className="text-red-500">♥</span> for creators.</p>
        </div>
      </div>
    </footer>
  );
}
