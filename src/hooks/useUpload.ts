import { useState, useCallback, useRef } from "react";
import { uploadImage, UploadError } from "@/services/uploadService";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";
import { UploadTask } from "firebase/storage";

export interface UseUploadResult {
  file: File | null;
  previewUrl: string | null;
  isUploading: boolean;
  progress: number;
  error: string | null;
  handleFileSelect: (file: File) => void;
  startUpload: () => Promise<void>;
  cancelUpload: () => void;
  clearSelection: () => void;
}

export const useUpload = (onSuccess?: () => void): UseUploadResult => {
  const { user } = useAuth();
  
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const uploadTaskRef = useRef<UploadTask | null>(null);

  const handleFileSelect = useCallback((selectedFile: File) => {
    setError(null);
    setProgress(0);
    
    // Quick validation before setting state
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Invalid file type. Only JPG, PNG, and WEBP are allowed.");
      return;
    }

    const maxSize = 20 * 1024 * 1024; // 20 MB
    if (selectedFile.size > maxSize) {
      toast.error("File is too large. Maximum size is 20MB.");
      return;
    }

    setFile(selectedFile);
    
    // Create preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    
    // Clean up previous preview URL to avoid memory leaks
    return () => URL.revokeObjectURL(objectUrl);
  }, []);

  const clearSelection = useCallback(() => {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setError(null);
    setProgress(0);
    setIsUploading(false);
  }, [previewUrl]);

  const cancelUpload = useCallback(() => {
    if (uploadTaskRef.current && isUploading) {
      uploadTaskRef.current.cancel();
      uploadTaskRef.current = null;
      setIsUploading(false);
      setProgress(0);
      toast.info("Upload canceled");
    } else {
      clearSelection();
    }
  }, [isUploading, clearSelection]);

  const startUpload = useCallback(async () => {
    if (!file || !user) {
      toast.error("Please select a file and ensure you are logged in.");
      return;
    }

    setIsUploading(true);
    setError(null);
    setProgress(0);

    try {
      const { task, promise } = uploadImage(file, user.uid, (p) => {
        setProgress(p);
      });
      
      uploadTaskRef.current = task;
      
      await promise;
      
      toast.success("Image uploaded successfully!");
      clearSelection();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      // Only set error state if it wasn't a manual cancellation
      if (err.code !== "storage/canceled") {
        const errorMessage = err instanceof UploadError ? err.message : "An unexpected error occurred.";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } finally {
      setIsUploading(false);
      uploadTaskRef.current = null;
    }
  }, [file, user, clearSelection, onSuccess]);

  return {
    file,
    previewUrl,
    isUploading,
    progress,
    error,
    handleFileSelect,
    startUpload,
    cancelUpload,
    clearSelection,
  };
};
