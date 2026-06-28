import { db } from "./firebase";
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  addDoc,
  serverTimestamp,
  increment
} from "firebase/firestore";

export interface UserStats {
  totalGenerated: number;
  activeQRs: number;
  storageUsed: number; // in bytes
  views30d: number;
}

export interface Activity {
  id?: string;
  userId: string;
  action: string;
  type: "ai" | "qr" | "enhance" | "album";
  createdAt: any;
}

export interface Generation {
  id?: string;
  userId: string;
  type: "qr" | "ai";
  url: string;
  metadata?: any;
  createdAt: any;
}

export interface ImageDoc {
  id?: string;
  uid: string;
  fileName: string;
  imageUrl: string;
  thumbnailUrl?: string;
  storagePath: string;
  fileSize: number;
  fileType: string;
  createdAt: any;
  updatedAt: any;
  qrGenerated: boolean;
  album: string;
  favorite: boolean;
}

const DEFAULT_STATS: UserStats = {
  totalGenerated: 0,
  activeQRs: 0,
  storageUsed: 0,
  views30d: 0
};

export const getUserStats = async (userId: string): Promise<UserStats> => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    const data = userSnap.data();
    return {
      totalGenerated: data.totalGenerated || 0,
      activeQRs: data.activeQRs || 0,
      storageUsed: data.storageUsed || 0,
      views30d: data.views30d || 0
    };
  } else {
    // Initialize default stats for a new user
    await setDoc(userRef, {
      ...DEFAULT_STATS,
      createdAt: serverTimestamp()
    }, { merge: true });
    return DEFAULT_STATS;
  }
};

export const getRecentActivities = async (userId: string, limitCount = 5): Promise<Activity[]> => {
  const q = query(
    collection(db, "activities"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Activity));
};

export const logActivity = async (userId: string, action: string, type: Activity["type"]) => {
  await addDoc(collection(db, "activities"), {
    userId,
    action,
    type,
    createdAt: serverTimestamp()
  });
};

export const saveGeneration = async (userId: string, type: "qr" | "ai", url: string, metadata?: any) => {
  // Save the generation record
  await addDoc(collection(db, "generations"), {
    userId,
    type,
    url,
    metadata,
    createdAt: serverTimestamp()
  });
  
  // Log activity
  const actionString = type === "qr" ? "Generated new QR Code" : "Generated AI Image";
  await logActivity(userId, actionString, type);
  
  // Increment user stats
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    totalGenerated: increment(1),
    ...(type === "qr" ? { activeQRs: increment(1) } : {})
  });
};

export const saveImageMetadata = async (image: Omit<ImageDoc, "createdAt" | "updatedAt">) => {
  const newImage = {
    ...image,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  
  await addDoc(collection(db, "images"), newImage);
  
  // Log activity
  await logActivity(image.uid, "Uploaded a new image", "enhance"); // using enhance as placeholder type for upload
  
  // Update storage and upload counts
  const userRef = doc(db, "users", image.uid);
  await updateDoc(userRef, {
    totalGenerated: increment(1), // Treating uploads as "generations" for the dashboard counter
    storageUsed: increment(image.fileSize)
  });
};

export const getUserImages = async (userId: string, limitCount = 20): Promise<ImageDoc[]> => {
  const q = query(
    collection(db, "images"),
    where("uid", "==", userId),
    orderBy("createdAt", "desc"),
    limit(limitCount)
  );
  
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ImageDoc));
};
