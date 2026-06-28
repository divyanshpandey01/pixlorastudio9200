"use client";

import { useAuth } from "@/lib/auth";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { Bell, Search, Menu, Command } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "../ui/Input";

export function Topbar() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`h-20 sticky top-0 z-40 flex items-center justify-between px-6 transition-all duration-300 ${
        isScrolled 
          ? "bg-[rgba(5,5,5,0.8)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.05)]" 
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-white">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-[12px] w-64 focus-within:border-[var(--color-accent-purple)]/50 focus-within:bg-[rgba(255,255,255,0.05)] transition-all">
          <Search className="w-4 h-4 text-[var(--color-text-secondary)]" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-[var(--color-text-secondary)]"
          />
          <div className="flex items-center gap-1 text-[10px] text-[var(--color-text-secondary)] bg-[rgba(255,255,255,0.05)] px-1.5 py-0.5 rounded">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-[var(--color-text-secondary)] hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-accent-pink)] rounded-full animate-pulse" />
        </button>
        
        <Button size="sm" variant="secondary" className="hidden sm:flex">
          Upgrade Pro
        </Button>
        
        <div className="h-8 w-[1px] bg-[rgba(255,255,255,0.1)] mx-2 hidden sm:block" />
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-white">{user?.displayName || "User"}</p>
            <p className="text-xs text-[var(--color-text-secondary)]">{user?.email || "user@example.com"}</p>
          </div>
          <Avatar 
            src={user?.photoURL || undefined} 
            alt={user?.displayName || "User"} 
            size="md" 
          />
        </div>
      </div>
    </header>
  );
}
