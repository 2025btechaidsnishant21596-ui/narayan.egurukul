import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Trophy, 
  Flame, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Brain, 
  PlayCircle, 
  Download, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { profile } = useAuth();

  return (
    <div className="space-y-8 py-4">
      {/* Profile Welcome Header - Clean Minimalist Dark Card */}
      <div className="p-6 sm:p-8 bg-zinc-900 border border-zinc-800 text-white rounded-2xl relative overflow-hidden shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {profile?.photoURL ? (
              <img 
                src={profile.photoURL} 
                alt={profile.displayName || 'Learner'} 
                className="w-14 h-14 rounded-xl border border-zinc-700 object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-zinc-800 border border-zinc-700 text-white font-bold text-xl flex items-center justify-center">
                {(profile?.displayName || 'S').charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Welcome back, {profile?.displayName || 'Student'}!
                </h1>
                <span className="px-2.5 py-0.5 bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                  {profile?.authProvider === 'google.com' ? 'Google Auth' : 'Member'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                {profile?.email || 'student@narayane-gurukul.in'} • Track your CGPA, course progress, &amp; study goals.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3.5 py-2 bg-zinc-800/80 border border-zinc-700/80 rounded-xl text-center">
              <div className="flex items-center gap-1 text-zinc-100 font-bold text-base">
                <Flame className="w-4 h-4 text-zinc-300" />
                <span>5-Day</span>
              </div>
              <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                Study Streak
              </div>
            </div>

            <div className="px-3.5 py-2 bg-zinc-800/80 border border-zinc-700/80 rounded-xl text-center">
              <div className="flex items-center gap-1 text-zinc-100 font-bold text-base">
                <Trophy className="w-4 h-4 text-zinc-300" />
                <span>{profile?.xp || 150} XP</span>
              </div>
              <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                Learner Rank
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 sm:p-5 bg-white border border-zinc-200 rounded-xl shadow-xs space-y-1">
          <div className="text-zinc-400 text-[10px] font-semibold uppercase tracking-wider">
            Enrolled Courses
          </div>
          <div className="text-2xl font-bold text-zinc-900">4 Active</div>
          <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +1 this month
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white border border-zinc-200 rounded-xl shadow-xs space-y-1">
          <div className="text-zinc-400 text-[10px] font-semibold uppercase tracking-wider">
            Study Hours
          </div>
          <div className="text-2xl font-bold text-zinc-900">38.5 hrs</div>
          <div className="text-[11px] text-zinc-600 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> 8 hrs this week
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white border border-zinc-200 rounded-xl shadow-xs space-y-1">
          <div className="text-zinc-400 text-[10px] font-semibold uppercase tracking-wider">
            Tests Completed
          </div>
          <div className="text-2xl font-bold text-zinc-900">12 Tests</div>
          <div className="text-[11px] text-zinc-600 font-medium">
            Avg Score: 88%
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white border border-zinc-200 rounded-xl shadow-xs space-y-1">
          <div className="text-zinc-400 text-[10px] font-semibold uppercase tracking-wider">
            PDFs Saved
          </div>
          <div className="text-2xl font-bold text-zinc-900">24 Files</div>
          <div className="text-[11px] text-emerald-700 font-medium">
            Offline Available
          </div>
        </div>
      </div>

      {/* Active Courses & Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-zinc-900">In-Progress Courses</h2>
          <span className="text-xs font-semibold text-zinc-600 cursor-pointer hover:text-zinc-900 hover:underline">
            View All
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 bg-white border border-zinc-200 rounded-xl shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-zinc-100 text-zinc-800 border border-zinc-200 text-[10px] font-semibold rounded-full uppercase">
                B.Tech CSE Core
              </span>
              <span className="text-xs text-zinc-500 font-medium">Semester 1</span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900">Engineering Mathematics &amp; Physics</h3>
            
            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-zinc-600">
                <span>Course Completion</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-zinc-900 h-full rounded-full w-[65%]" />
              </div>
            </div>

            <button className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-1.5">
              <PlayCircle className="w-4 h-4" />
              <span>Resume Lecture</span>
            </button>
          </div>

          <div className="p-5 bg-white border border-zinc-200 rounded-xl shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-zinc-100 text-zinc-800 border border-zinc-200 text-[10px] font-semibold rounded-full uppercase">
                CSE AIDS Track
              </span>
              <span className="text-xs text-zinc-500 font-medium">Semester 2</span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900">Data Structures &amp; Python Notebooks</h3>
            
            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-zinc-600">
                <span>Course Completion</span>
                <span>40%</span>
              </div>
              <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-zinc-900 h-full rounded-full w-[40%]" />
              </div>
            </div>

            <button className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-1.5">
              <PlayCircle className="w-4 h-4" />
              <span>Resume Practice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
