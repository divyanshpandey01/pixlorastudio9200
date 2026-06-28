import { motion } from "framer-motion";
import { UploadCloud, FileImage, X } from "lucide-react";
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { UseUploadResult } from "@/hooks/useUpload";
import { ImagePreview } from "./ImagePreview";
import { UploadProgress } from "./UploadProgress";
import { Button } from "@/components/ui/Button";

interface UploadZoneProps {
  uploadState: UseUploadResult;
}

export function UploadZone({ uploadState }: UploadZoneProps) {
  const { 
    file, 
    previewUrl, 
    isUploading, 
    progress, 
    handleFileSelect, 
    startUpload, 
    cancelUpload, 
    clearSelection 
  } = uploadState;
  
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUploading) setIsDragActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (isUploading) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
    // Reset input value so the same file can be selected again if removed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (file && previewUrl) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-[24px] p-6 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 max-w-sm">
            <ImagePreview 
              src={previewUrl} 
              alt={file.name} 
              onRemove={isUploading ? undefined : clearSelection} 
            />
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-semibold text-white mb-2 truncate w-full">{file.name}</h3>
            <p className="text-[var(--color-text-secondary)] text-sm mb-6">
              {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type.split('/')[1].toUpperCase()}
            </p>
            
            {isUploading ? (
              <div className="w-full max-w-xs space-y-4">
                <UploadProgress progress={progress} />
                <Button 
                  variant="secondary" 
                  className="w-full" 
                  onClick={cancelUpload}
                >
                  Cancel Upload
                </Button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="w-full md:w-auto"
                  onClick={startUpload}
                >
                  Upload Image
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Replace
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Hidden input for replace functionality */}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
          accept="image/jpeg, image/png, image/webp, image/jpg"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`w-full relative rounded-[24px] border-2 border-dashed transition-all duration-300 cursor-pointer overflow-hidden group
        ${isDragActive 
          ? "border-[var(--color-accent-purple)] bg-[var(--color-accent-purple)]/5" 
          : "border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.2)]"
        }
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-blue)]/5 to-[var(--color-accent-purple)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="min-h-[300px] flex flex-col items-center justify-center p-8 text-center relative z-10">
        <motion.div 
          animate={{ y: isDragActive ? -10 : 0, scale: isDragActive ? 1.1 : 1 }}
          className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-colors duration-300
            ${isDragActive ? "bg-[var(--color-accent-purple)]/20" : "bg-[rgba(255,255,255,0.05)]"}
          `}
        >
          {isDragActive ? (
            <UploadCloud className="w-10 h-10 text-[var(--color-accent-purple)]" />
          ) : (
            <FileImage className="w-10 h-10 text-[var(--color-text-secondary)] group-hover:text-white transition-colors" />
          )}
        </motion.div>
        
        <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300
          ${isDragActive ? "text-[var(--color-accent-purple)]" : "text-white"}
        `}>
          {isDragActive ? "Drop your image here" : "Drag & drop to upload"}
        </h3>
        
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-md">
          Support for high-resolution JPG, PNG, and WEBP files. Maximum file size is 20MB.
        </p>
        
        <Button variant="secondary" className="pointer-events-none">
          Browse Files
        </Button>
      </div>

      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileInput}
        className="hidden"
        accept="image/jpeg, image/png, image/webp, image/jpg"
      />
    </motion.div>
  );
}
