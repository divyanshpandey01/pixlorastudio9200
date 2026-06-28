"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAV } from "@/lib/constants";
import { Logo } from "../shared/Logo";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import * as Icons from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <aside className="w-64 border-r border-[rgba(255,255,255,0.05)] bg-[rgba(5,5,5,0.8)] backdrop-blur-3xl hidden md:flex flex-col">
      <div className="h-20 flex items-center px-6 border-b border-[rgba(255,255,255,0.05)]">
        <Link href="/">
          <Logo size="sm" animated={false} />
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        {DASHBOARD_NAV.map((item) => {
          const isActive = pathname === item.href;
          const Icon = (Icons as any)[item.icon];
          
          return (
            <Link key={item.label} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-[12px] transition-colors group ${
                  isActive 
                    ? "text-white font-medium" 
                    : "text-[var(--color-text-secondary)] hover:text-white hover:bg-[rgba(255,255,255,0.03)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[rgba(255,255,255,0.08)] to-transparent rounded-[12px] border border-[rgba(255,255,255,0.1)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--color-accent-purple)] rounded-r-full shadow-[0_0_10px_var(--color-accent-purple)]" />
                )}
                
                <div className={`relative z-10 ${isActive ? "text-[var(--color-accent-purple)]" : ""}`}>
                  {Icon && <Icon className="w-5 h-5" />}
                </div>
                <span className="relative z-10">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-[rgba(255,255,255,0.05)]">
        <button 
          onClick={signOut}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-[12px] text-[var(--color-text-secondary)] hover:text-white hover:bg-[rgba(255,255,255,0.03)] transition-colors group"
        >
          <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
