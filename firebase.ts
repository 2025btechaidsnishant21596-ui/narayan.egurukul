import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User,
  AuthCredential
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy,
  deleteDoc
} from 'firebase/firestore';
import firebaseConfigData from '../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfigData);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore with Database ID from configuration
export const db = getFirestore(app, firebaseConfigData.firestoreDatabaseId || undefined);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Interface for User Profile in Firestore
export interface UserProfileData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'student' | 'admin';
  authProvider: string;
  phone?: string;
  selectedCourse?: string;
  xp?: number;
  createdAt: string;
  lastLoginAt: string;
}

/**
 * Sync or create user profile document in Firestore upon login/signup
 */
export async function syncUserProfile(user: User, providerId: string = 'google.com'): Promise<UserProfileData> {
  const userRef = doc(db, 'users', user.uid);
  const now = new Date().toISOString();

  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const existingData = userSnap.data() as UserProfileData;
      const updatedData: Partial<UserProfileData> = {
        lastLoginAt: now,
        displayName: user.displayName || existingData.displayName || 'Learner',
        photoURL: user.photoURL || existingData.photoURL || null,
        email: user.email || existingData.email,
        authProvider: providerId || existingData.authProvider || 'google.com'
      };
      await setDoc(userRef, updatedData, { merge: true });
      return { ...existingData, ...updatedData };
    } else {
      const isDefaultAdmin = user.email?.toLowerCase().includes('admin') || user.email === 'hanumangarh.sanfort@gmail.com';
      const newData: UserProfileData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || (user.email ? user.email.split('@')[0] : 'Learner'),
        photoURL: user.photoURL || null,
        role: isDefaultAdmin ? 'admin' : 'student',
        authProvider: providerId,
        phone: user.phoneNumber || '',
        selectedCourse: 'B.Tech CSE',
        xp: 150,
        createdAt: now,
        lastLoginAt: now
      };
      await setDoc(userRef, newData);
      return newData;
    }
  } catch (error) {
    console.warn('Firestore user profile sync fallback:', error);
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Learner',
      photoURL: user.photoURL || null,
      role: 'student',
      authProvider: providerId,
      createdAt: now,
      lastLoginAt: now
    };
  }
}

/**
 * Sign in with Google Popup
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const profile = await syncUserProfile(result.user, 'google.com');
    return { user: result.user, profile };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
}

/**
 * Sign Up with Email and Password
 */
export async function signUpWithEmailPassword(email: string, pass: string, name: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  if (name) {
    await updateProfile(cred.user, { displayName: name });
  }
  const profile = await syncUserProfile(cred.user, 'password');
  return { user: cred.user, profile };
}

/**
 * Sign In with Email and Password
 */
export async function signInWithEmailPass(email: string, pass: string) {
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  const profile = await syncUserProfile(cred.user, 'password');
  return { user: cred.user, profile };
}

/**
 * Send Password Reset Email
 */
export async function resetUserPassword(email: string) {
  return await sendPasswordResetEmail(auth, email);
}

/**
 * Log Out
 */
export async function logoutFirebaseUser() {
  return await signOut(auth);
}
