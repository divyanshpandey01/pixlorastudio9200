"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth";
import { ImageIcon, QrCode, Wand2, FolderHeart, Activity as ActivityIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { TiltCard } from "@/components/motion/TiltCard";

import { useEffect, useState } from "react";
import { getUserStats, getRecentActivities, UserStats, Activity } from "@/lib/db";
import { formatFileSize } from "@/lib/utils";
import { timeAgo } from "@/lib/utils";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadDashboardData = async () => {
      try {
        const [userStats, recentActivity] = await Promise.all([
          getUserStats(user.uid),
          getRecentActivities(user.uid)
        ]);
        setStats(userStats);
        setActivities(recentActivity);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  const displayStats = [
    { label: "Total Generated", value: stats?.totalGenerated || 0, change: "+0%", icon: ImageIcon, color: "text-blue-400" },
    { label: "Active QRs", value: stats?.activeQRs || 0, change: "+0%", icon: QrCode, color: "text-purple-400" },
    { label: "Storage Used", value: formatFileSize(stats?.storageUsed || 0), change: "0%", icon: FolderHeart, color: "text-pink-400" },
    { label: "Views (30d)", value: stats?.views30d || 0, change: "+0%", icon: ActivityIcon, color: "text-emerald-400" },
  ];

  // Keep mock generations for now since we don't have real images yet
  const recentGenerations = [1, 2, 3, 4, 5, 6];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-12">
      <FadeIn direction="up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user?.displayName?.split(' ')[0] || 'Creator'} ✨
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              Here's what's happening with your workspace today.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/qr-generator">
              <Button size="sm" magnetic>Create QR</Button>
            </Link>
            <Button size="sm" variant="secondary" rightIcon={<Wand2 className="w-4 h-4" />}>
              AI Enhance
            </Button>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <FadeIn key={i} delay={0.1 * i} direction="up">
              <Card variant="stat" tilt={true} className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-[rgba(255,255,255,0.05)] ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-[var(--color-text-secondary)]'}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-[var(--color-text-secondary)] text-sm mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white">
                  {isLoading ? <div className="h-8 w-16 bg-[rgba(255,255,255,0.1)] rounded animate-pulse" /> : stat.value}
                </h3>
              </Card>
            </FadeIn>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <FadeIn delay={0.4} direction="up" className="lg:col-span-2">
          <Card glow className="h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Recent Generations</h3>
              <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                View All
              </Button>
            </div>
            
            {/* Mock Gallery Grid */}
            <div className="grid grid-cols-3 gap-4 flex-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] cursor-pointer">
                  {/* Mock Image Content */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-[var(--color-accent-blue)]/20 to-[var(--color-accent-purple)]/20 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100 ${i % 2 === 0 ? 'opacity-50' : 'opacity-80'}`} />
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <Button size="sm" variant="secondary" className="scale-90">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={0.5} direction="up">
          <Card className="h-[400px] flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-6">Activity Feed</h3>
            <div className="flex flex-col gap-6 flex-1 overflow-y-auto pr-2 scrollbar-hide">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] shrink-0 animate-pulse" />
                     <div className="space-y-2 flex-1">
                        <div className="h-4 w-3/4 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
                        <div className="h-3 w-1/2 bg-[rgba(255,255,255,0.05)] rounded animate-pulse" />
                     </div>
                  </div>
                ))
              ) : activities.length === 0 ? (
                <div className="text-center text-[var(--color-text-secondary)] mt-8">
                  No recent activity. Start generating!
                </div>
              ) : activities.map((activity, i) => (
                <div key={activity.id || i} className="flex gap-4 relative">
                  {i !== activities.length - 1 && (
                    <div className="absolute top-8 left-4 bottom-[-16px] w-[1px] bg-[rgba(255,255,255,0.1)]" />
                  )}
                  <div className="relative z-10 w-8 h-8 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-accent-purple)]" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium mb-1">{activity.action}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{timeAgo(activity.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
      </div>
      
      <FadeIn delay={0.6} direction="up">
        <TiltCard tiltAmount={2}>
          <div className="w-full rounded-[24px] overflow-hidden relative glass border border-[var(--color-accent-blue)]/20 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-blue)]/10 to-[var(--color-accent-purple)]/10 pointer-events-none" />
            
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2 justify-center md:justify-start">
                <Wand2 className="w-6 h-6 text-[var(--color-accent-pink)]" />
                Try the new Magic Eraser
              </h3>
              <p className="text-[var(--color-text-secondary)]">
                Remove unwanted objects from your photos perfectly in seconds with our new AI model.
              </p>
            </div>
            
            <Button size="lg" className="relative z-10 whitespace-nowrap">
              Try it now
            </Button>
          </div>
        </TiltCard>
      </FadeIn>
    </div>
  );
}
