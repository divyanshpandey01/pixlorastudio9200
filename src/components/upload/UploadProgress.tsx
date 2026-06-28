import { motion } from "framer-motion";

interface UploadProgressProps {
  progress: number;
}

export function UploadProgress({ progress }: UploadProgressProps) {
  const roundedProgress = Math.round(progress);
  
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-white font-medium">Uploading...</span>
        <span className="text-[var(--color-accent-purple)] font-mono">{roundedProgress}%</span>
      </div>
      
      <div className="h-2 w-full bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-purple)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.2 }}
        />
      </div>
      
      <p className="text-xs text-[var(--color-text-secondary)] text-right mt-1">
        Please do not close this tab
      </p>
    </div>
  );
}
