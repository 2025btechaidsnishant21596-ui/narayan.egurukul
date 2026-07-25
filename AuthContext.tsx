import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { 
  auth, 
  signInWithGoogle, 
  signInWithEmailPass, 
  signUpWithEmailPassword, 
  logoutFirebaseUser, 
  resetUserPassword, 
  syncUserProfile, 
  UserProfileData 
} from '../firebase';

interface AuthContextType {
  user: User | null;
  profile: UserProfileData | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  setDemoUser: (role: 'student' | 'admin') => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const userProf = await syncUserProfile(firebaseUser, firebaseUser.providerData[0]?.providerId || 'google.com');
          setProfile(userProf);
        } catch (e) {
          console.error('Profile sync error:', e);
          setProfile({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || 'Learner',
            photoURL: firebaseUser.photoURL || null,
            role: 'student',
            authProvider: firebaseUser.providerData[0]?.providerId || 'google.com',
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString()
          });
        }
      } else {
        // If not authenticated via Firebase, check if demo session exists in sessionStorage
        const demoRole = sessionStorage.getItem('demoRole') as 'student' | 'admin' | null;
        if (demoRole) {
          setUser(null);
          setProfile({
            uid: 'demo-' + demoRole,
            email: demoRole === 'admin' ? 'admin@narayane-gurukul.in' : 'student@narayane-gurukul.in',
            displayName: demoRole === 'admin' ? 'Staff Administrator' : 'Demo Student',
            photoURL: null,
            role: demoRole,
            authProvider: 'demo',
            createdAt: new Date().toISOString(),
            lastLoginAt: new Date().toISOString()
          });
        } else {
          setUser(null);
          setProfile(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    sessionStorage.removeItem('demoRole');
    const { user, profile } = await signInWithGoogle();
    setUser(user);
    setProfile(profile);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    sessionStorage.removeItem('demoRole');
    const { user, profile } = await signInWithEmailPass(email, pass);
    setUser(user);
    setProfile(profile);
  };

  const registerWithEmail = async (email: string, pass: string, name: string) => {
    sessionStorage.removeItem('demoRole');
    const { user, profile } = await signUpWithEmailPassword(email, pass, name);
    setUser(user);
    setProfile(profile);
  };

  const forgotPassword = async (email: string) => {
    await resetUserPassword(email);
  };

  const logout = async () => {
    sessionStorage.removeItem('demoRole');
    await logoutFirebaseUser();
    setUser(null);
    setProfile(null);
  };

  const setDemoUser = (role: 'student' | 'admin') => {
    sessionStorage.setItem('demoRole', role);
    setUser(null);
    setProfile({
      uid: 'demo-' + role,
      email: role === 'admin' ? 'admin@narayane-gurukul.in' : 'student@narayane-gurukul.in',
      displayName: role === 'admin' ? 'Staff Administrator' : 'Demo Student',
      photoURL: null,
      role: role,
      authProvider: 'demo',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    });
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        forgotPassword,
        logout,
        setDemoUser,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
