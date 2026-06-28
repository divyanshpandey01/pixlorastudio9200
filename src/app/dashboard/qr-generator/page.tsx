"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { QrCode, Download, Link2, Sparkles, Image as ImageIcon, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { QRCodeSVG } from "qrcode.react";
import { useAuth } from "@/lib/auth";
import { saveGeneration } from "@/lib/db";
import { useRef } from "react";

export default function QRGeneratorPage() {
  const { user } = useAuth();
  const [url, setUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState<"standard" | "ai">("standard");
  const qrRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!url || !user) return;
    setIsGenerating(true);
    setGenerated(false);
    
    try {
      // Simulate slight delay for UX if standard, longer for AI mock
      await new Promise(resolve => setTimeout(resolve, activeTab === "ai" ? 2000 : 800));
      
      // Save generation to Firestore
      await saveGeneration(user.uid, "qr", url, { style: activeTab });
      
      setGenerated(true);
    } catch (error) {
      console.error("Failed to generate QR:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQR = (format: "png" | "svg") => {
    if (!qrRef.current) return;
    const svgNode = qrRef.current.querySelector("svg");
    if (!svgNode) return;

    const svgData = new XMLSerializer().serializeToString(svgNode);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    
    // Create blob for SVG
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const DOMURL = window.URL || window.webkitURL || window;
    const svgUrl = DOMURL.createObjectURL(svgBlob);

    if (format === "svg") {
      const downloadLink = document.createElement("a");
      downloadLink.href = svgUrl;
      downloadLink.download = "pixlora-qr.svg";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      return;
    }

    // For PNG
    img.onload = () => {
      // High res canvas
      canvas.width = img.width * 4;
      canvas.height = img.height * 4;
      ctx?.scale(4, 4);
      
      if (ctx) {
        // Draw white background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }
      
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "pixlora-qr.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      DOMURL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <FadeIn direction="up">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">QR Code Generator</h1>
          <p className="text-[var(--color-text-secondary)]">
            Create beautiful, trackable QR codes in seconds.
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <FadeIn delay={0.1} direction="up">
            <Card>
              <div className="flex items-center gap-1 p-1 bg-[rgba(255,255,255,0.05)] rounded-xl mb-8 w-fit">
                <button
                  onClick={() => setActiveTab("standard")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "standard" 
                      ? "bg-[rgba(255,255,255,0.1)] text-white shadow-sm" 
                      : "text-[var(--color-text-secondary)] hover:text-white"
                  }`}
                >
                  Standard QR
                </button>
                <button
                  onClick={() => setActiveTab("ai")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === "ai" 
                      ? "bg-[rgba(255,255,255,0.1)] text-white shadow-sm border border-[var(--color-accent-purple)]/30" 
                      : "text-[var(--color-text-secondary)] hover:text-white"
                  }`}
                >
                  <Sparkles className={`w-4 h-4 ${activeTab === "ai" ? "text-[var(--color-accent-purple)]" : ""}`} />
                  AI Artistic QR
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Destination URL</h3>
                  <Input 
                    placeholder="https://example.com" 
                    icon={<Link2 className="w-5 h-5" />}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>

                {activeTab === "ai" && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-medium text-white">AI Prompt</h3>
                    <div className="relative">
                      <textarea 
                        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-[16px] p-4 text-white placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-accent-purple)] focus:ring-1 focus:ring-[var(--color-accent-purple)] transition-all resize-none h-32"
                        placeholder="e.g. Cyberpunk city landscape with neon lights, highly detailed, 8k..."
                      />
                      <Button size="sm" variant="ghost" className="absolute bottom-3 right-3 text-[var(--color-accent-purple)]">
                        <Sparkles className="w-4 h-4 mr-2" /> Enhance Prompt
                      </Button>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">Styles</h4>
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {["Cyberpunk", "Anime", "Watercolor", "3D Render", "Minimalist"].map((style, i) => (
                          <div 
                            key={style}
                            className={`px-4 py-2 rounded-full border cursor-pointer whitespace-nowrap transition-all ${
                              i === 0 
                                ? "bg-[var(--color-accent-purple)]/20 border-[var(--color-accent-purple)] text-white" 
                                : "border-[rgba(255,255,255,0.1)] text-[var(--color-text-secondary)] hover:border-[rgba(255,255,255,0.3)] hover:text-white"
                            }`}
                          >
                            {style}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <Button 
                  size="lg" 
                  className="w-full" 
                  onClick={handleGenerate}
                  isLoading={isGenerating}
                  disabled={!url || isGenerating}
                >
                  Generate QR Code
                </Button>
              </div>
            </Card>
          </FadeIn>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
          <FadeIn delay={0.2} direction="up" className="sticky top-28">
            <Card glow className="overflow-hidden flex flex-col items-center">
              <h3 className="text-lg font-medium text-white w-full text-left mb-6">Preview</h3>
              
              <div className="w-full aspect-square bg-[rgba(255,255,255,0.03)] rounded-[20px] border border-[rgba(255,255,255,0.05)] flex items-center justify-center p-8 relative overflow-hidden mb-6">
                <AnimatePresence mode="wait">
                  {!generated && !isGenerating && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center flex flex-col items-center text-[var(--color-text-secondary)]"
                    >
                      <QrCode className="w-16 h-16 mb-4 opacity-50" />
                      <p className="text-sm">Enter a URL to generate</p>
                    </motion.div>
                  )}
                  
                  {isGenerating && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center"
                    >
                      <div className="w-20 h-20 relative">
                        <div className="absolute inset-0 border-t-2 border-[var(--color-accent-purple)] rounded-full animate-spin" />
                        <div className="absolute inset-2 border-r-2 border-[var(--color-accent-pink)] rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
                        <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-[var(--color-accent-purple)] animate-pulse" />
                      </div>
                      <p className="mt-4 text-sm text-[var(--color-accent-purple)] font-medium animate-pulse">
                        Generating Magic...
                      </p>
                    </motion.div>
                  )}
                  
                  {generated && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative w-full h-full"
                    >
                      {activeTab === "ai" ? (
                        <div className="w-full h-full rounded-xl bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] p-2 relative group overflow-hidden">
                          {/* Stylized background for "AI" QR */}
                          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay pointer-events-none" />
                          <div className="absolute inset-0 border-[20px] border-black/40 mix-blend-overlay pointer-events-none" />
                          <div className="absolute inset-1/4 bg-white/80 mix-blend-overlay blur-sm pointer-events-none" />
                          
                          <div ref={qrRef} className="w-full h-full relative z-10 flex items-center justify-center p-2">
                             <QRCodeSVG 
                               value={url} 
                               size={256} 
                               level="H"
                               fgColor="#000000"
                               bgColor="transparent"
                               className="w-full h-full mix-blend-multiply opacity-90 drop-shadow-2xl"
                             />
                          </div>
                          
                          {/* Scanning animation line */}
                          <motion.div 
                            animate={{ y: ["0%", "100%", "0%"] }}
                            transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                            className="absolute left-0 right-0 top-0 h-1 bg-[var(--color-accent-cyan)] shadow-[0_0_15px_var(--color-accent-cyan)] z-20 pointer-events-none"
                          />
                        </div>
                      ) : (
                        <div ref={qrRef} className="w-full h-full bg-white rounded-xl p-6 flex items-center justify-center shadow-lg">
                           <QRCodeSVG 
                             value={url} 
                             size={256}
                             level="M"
                             fgColor="#000000"
                             bgColor="#ffffff"
                             className="w-full h-full"
                           />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex gap-3 w-full">
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  disabled={!generated}
                  leftIcon={<Download className="w-4 h-4" />}
                  onClick={() => downloadQR("png")}
                >
                  PNG
                </Button>
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  disabled={!generated}
                  leftIcon={<ImageIcon className="w-4 h-4" />}
                  onClick={() => downloadQR("svg")}
                >
                  SVG
                </Button>
              </div>
            </Card>

            <FadeIn delay={0.4} direction="up">
               <div className="mt-6 p-4 rounded-xl border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Dynamic QR Code
                  </h4>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    This QR code is dynamic. You can change the destination URL later without reprinting the code.
                  </p>
               </div>
            </FadeIn>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
