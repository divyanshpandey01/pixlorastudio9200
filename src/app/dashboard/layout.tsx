"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader } from "@/components/shared/Loader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <Loader isLoading={true} />;
  }

  return (
    <div className="flex h-screen bg-[var(--color-bg-primary)] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative">
        <div className="absolute inset-0 bg-[var(--color-accent-purple)] opacity-[0.02] mix-blend-screen pointer-events-none" />
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
