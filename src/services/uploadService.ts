import { ref, uploadBytesResumable, getDownloadURL, UploadTask } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { saveImageMetadata, ImageDoc } from "@/lib/db";

export interface UploadProgressCallback {
  (progress: number, bytesTransferred: number, totalBytes: number): void;
}

export interface UploadResult {
  url: string;
  docId?: string;
}

export class UploadError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = "UploadError";
  }
}

export const uploadImage = (
  file: File,
  uid: string,
  onProgress?: UploadProgressCallback
): {
  task: UploadTask;
  promise: Promise<UploadResult>;
} => {
  // Validate file
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
  if (!validTypes.includes(file.type)) {
    throw new UploadError("Invalid file type. Only JPG, PNG, and WEBP are allowed.");
  }

  const maxSize = 20 * 1024 * 1024; // 20 MB
  if (file.size > maxSize) {
    throw new UploadError("File is too large. Maximum size is 20MB.");
  }

  // Create unique filename and path
  const timestamp = Date.now();
  const safeFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const storagePath = `users/${uid}/images/${timestamp}-${safeFileName}`;
  const storageRef = ref(storage, storagePath);

  // Start upload
  const uploadTask = uploadBytesResumable(storageRef, file);

  const promise = new Promise<UploadResult>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (onProgress) {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(progress, snapshot.bytesTransferred, snapshot.totalBytes);
        }
      },
      (error) => {
        // Handle specific Firebase Storage errors
        let errorMessage = "Failed to upload image.";
        if (error.code === "storage/unauthorized") {
          errorMessage = "Permission denied. Please ensure you are logged in.";
        } else if (error.code === "storage/canceled") {
          errorMessage = "Upload canceled.";
        }
        reject(new UploadError(errorMessage, error.code));
      },
      async () => {
        try {
          // Upload completed successfully, get download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          // Save metadata to Firestore
          const imageDoc: Omit<ImageDoc, "createdAt" | "updatedAt"> = {
            uid,
            fileName: file.name,
            imageUrl: downloadURL,
            storagePath,
            fileSize: file.size,
            fileType: file.type,
            qrGenerated: false,
            album: "Default",
            favorite: false,
          };
          
          await saveImageMetadata(imageDoc);
          
          resolve({ url: downloadURL });
        } catch (dbError) {
          console.error("Error saving metadata:", dbError);
          reject(new UploadError("Image uploaded, but failed to save metadata."));
        }
      }
    );
  });

  return { task: uploadTask, promise };
};
