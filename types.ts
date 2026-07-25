import { User } from 'firebase/auth';
import { UserProfileData } from './firebase';

export type AuthMode = 'login' | 'signup' | 'forgot' | 'otp';

export interface UserState {
  user: User | null;
  profile: UserProfileData | null;
  loading: boolean;
}

export interface InquiryRecord {
  id?: string;
  type: string; // 'Admission' | 'Franchise' | 'General' | 'Newsletter'
  name: string;
  email?: string;
  phone: string;
  parentName?: string;
  classStage?: string;
  investmentRange?: string;
  message?: string;
  createdAt: string;
}

export interface BatchItem {
  id: string;
  name: string;
  category: 'btech' | 'jee' | 'neet' | 'school';
  branch?: string;
  description: string;
  icon: string;
  driveLink?: string;
  tags: string[];
}

export interface SubjectResource {
  id: string;
  code: string;
  name: string;
  semester: number;
  branch: 'core' | 'aids' | 'aiml' | 'cyber' | 'ece' | 'me';
  type: 'notes' | 'pyq' | 'lab' | 'ebook';
  available: boolean;
  driveUrl: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestions?: string[];
}
