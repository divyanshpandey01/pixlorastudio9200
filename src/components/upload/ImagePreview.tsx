import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface ImagePreviewProps {
  src: string;
  alt: string;
  onRemove?: () => void;
}

export function ImagePreview({ src, alt, onRemove }: ImagePreviewProps) {
  return (
    <div className="relative w-full aspect-square md:aspect-auto md:h-64 rounded-2xl overflow-hidden group border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.5)] shadow-2xl">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
      />
      
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {onRemove && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onRemove}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/80 transition-colors z-10 opacity-0 group-hover:opacity-100"
          aria-label="Remove image"
        >
          <X className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}
