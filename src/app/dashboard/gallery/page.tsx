"use client";

import { useAuth } from "@/lib/auth";
import { useUpload } from "@/hooks/useUpload";
import { UploadZone } from "@/components/upload/UploadZone";
import { useEffect, useState } from "react";
import { getUserImages, ImageDoc } from "@/lib/db";
import { FadeIn } from "@/components/motion/FadeIn";
import Image from "next/image";

export default function GalleryPage() {
  const { user } = useAuth();
  const [images, setImages] = useState<ImageDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchImages = async () => {
    if (!user) return;
    try {
      const userImages = await getUserImages(user.uid);
      setImages(userImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [user]);

  const uploadState = useUpload(() => {
    // Refresh the gallery when upload succeeds
    fetchImages();
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12 pb-12">
      
      {/* Header & Upload Section */}
      <section>
        <FadeIn direction="up">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Your Gallery</h1>
            <p className="text-[var(--color-text-secondary)]">
              Upload, manage, and share your high-resolution images.
            </p>
          </div>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.1}>
          <UploadZone uploadState={uploadState} />
        </FadeIn>
      </section>

      {/* Masonry Grid */}
      <section>
        <FadeIn direction="up" delay={0.2}>
          <h2 className="text-xl font-semibold text-white mb-6">Recent Uploads</h2>
          
          {isLoading ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div 
                  key={i} 
                  className="bg-[rgba(255,255,255,0.05)] rounded-2xl animate-pulse" 
                  style={{ height: `${Math.random() * 200 + 150}px` }} 
                />
              ))}
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-20 bg-[rgba(255,255,255,0.02)] rounded-3xl border border-[rgba(255,255,255,0.05)]">
              <div className="w-16 h-16 mx-auto bg-[rgba(255,255,255,0.05)] rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[var(--color-text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-1">No images yet</h3>
              <p className="text-[var(--color-text-secondary)] text-sm">
                Upload your first image above to get started.
              </p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {images.map((image) => (
                <div key={image.id} className="relative group break-inside-avoid rounded-2xl overflow-hidden bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={image.imageUrl} 
                    alt={image.fileName} 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-white text-sm font-medium truncate">{image.fileName}</p>
                    <p className="text-[var(--color-text-secondary)] text-xs">
                      {(image.fileSize / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </FadeIn>
      </section>

    </div>
  );
}
