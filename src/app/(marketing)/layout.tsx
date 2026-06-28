"use client";

import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import dynamic from "next/dynamic";

const Cursor = dynamic(() => import("@/components/shared/Cursor").then((mod) => mod.Cursor), { ssr: false });
const ParticleField = dynamic(() => import("@/components/shared/ParticleField").then((mod) => mod.ParticleField), { ssr: false });
const AuroraBackground = dynamic(() => import("@/components/shared/AuroraBackground").then((mod) => mod.AuroraBackground), { ssr: false });

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <AuroraBackground />
      <ParticleField />
      <Navbar />
      <main className="relative z-10 flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}
