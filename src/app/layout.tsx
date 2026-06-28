import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { IntroSequence } from "@/components/shared/IntroSequence";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PIXLORA STUDIO | Premium AI Photo Platform",
  description: "Transform Every Memory Into Magic. AI-powered photo platform that brings your memories to life with intelligent enhancement, smart organization, and instant sharing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] cursor-none`}>
        <AuthProvider>
          <IntroSequence />
          {children}
          <Toaster theme="dark" position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
