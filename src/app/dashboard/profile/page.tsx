"use client";

import { useAuth } from "@/lib/auth";

export default function ProfilePage() {
  const { user } = useAuth();
  
  return (
    <div className="max-w-2xl mx-auto pt-10">
      <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-blue)] flex items-center justify-center text-3xl font-bold text-white">
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">{user?.displayName || "Creator"}</h1>
            <p className="text-[var(--color-text-secondary)]">{user?.email}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-[rgba(0,0,0,0.2)] rounded-lg border border-[rgba(255,255,255,0.02)]">
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">Account ID</h3>
            <p className="text-white font-mono text-sm">{user?.uid}</p>
          </div>
          <div className="p-4 bg-[rgba(0,0,0,0.2)] rounded-lg border border-[rgba(255,255,255,0.02)]">
            <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">Plan</h3>
            <div className="flex items-center justify-between">
              <p className="text-white font-medium">Free Tier</p>
              <button className="text-sm text-[var(--color-accent-purple)] hover:text-white transition-colors">Upgrade to Pro</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
