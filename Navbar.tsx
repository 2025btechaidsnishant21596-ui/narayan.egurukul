import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  GraduationCap, 
  Search, 
  BookOpen, 
  User as UserIcon, 
  LogOut, 
  ShieldAlert, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles,
  LayoutDashboard,
  FileText,
  School,
  Bot
} from 'lucide-react';
import { AuthMode } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: (mode?: AuthMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenAuth }) => {
  const { profile, logout, isAdmin } = useAuth();
  const [showCoursePicker, setShowCoursePicker] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('B.Tech CSE');

  const courses = [
    'B.Tech CSE Core',
    'B.Tech CSE (AI & ML)',
    'B.Tech CSE (AI & DS)',
    'B.Tech Cybersecurity',
    'JEE Mains & Advanced',
    'NEET UG Preparation',
    'School Olympiad / NTSE',
    'Sanfort Pre-School'
  ];

  return (
    <header className="sticky top-0 z-[1000] w-full bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-xs transition-all">
      {/* Top Announcement Bar - Clean Minimalist Dark Bar */}
      <div className="bg-zinc-900 text-zinc-100 text-xs py-1.5 px-4 flex items-center justify-between font-medium border-b border-zinc-800">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap text-zinc-300">
            <span className="inline-flex items-center gap-1 bg-zinc-800 border border-zinc-700/60 px-2 py-0.5 rounded text-[10px] font-semibold text-zinc-200 uppercase tracking-wider">
              100% Free
            </span>
            <span className="text-xs">📍 Hanumangarh, Rajasthan • Call: +91 9468974044</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {profile ? (
              <span className="text-zinc-300 font-medium hidden sm:inline text-xs">
                Welcome, {profile.displayName || 'Learner'} ({profile.authProvider === 'google.com' ? 'Google' : 'Email'})
              </span>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onOpenAuth('login')}
                  className="bg-white text-zinc-900 px-2.5 py-0.5 rounded text-xs font-semibold hover:bg-zinc-100 transition-colors"
                >
                  Student Login
                </button>
                <button 
                  onClick={() => onOpenAuth('signup')}
                  className="border border-zinc-700 hover:bg-zinc-800 text-zinc-200 px-2.5 py-0.5 rounded text-xs font-semibold transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-white shadow-xs group hover:bg-zinc-800 transition-all">
            <GraduationCap className="w-5 h-5 text-zinc-100" />
          </div>
          <div>
            <div className="text-lg font-bold text-zinc-900 tracking-tight leading-none">
              Narayan <span className="text-zinc-500 font-normal">e-Gurukul</span>
            </div>
            <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mt-1">
              Smart Learning Platform
            </div>
          </div>
        </div>

        {/* Course Picker Dropdown */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setShowCoursePicker(!showCoursePicker)}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100/80 hover:bg-zinc-100 border border-zinc-200 text-zinc-800 font-medium text-xs rounded-lg transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-zinc-600" />
            <span>{selectedCourse}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {showCoursePicker && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-zinc-200 rounded-xl shadow-lg p-1.5 z-50 animate-fadeIn">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 px-3 py-1">
                Popular Academic Tracks
              </div>
              {courses.map((course) => (
                <button
                  key={course}
                  onClick={() => {
                    setSelectedCourse(course);
                    setShowCoursePicker(false);
                    setActiveTab('study');
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    selectedCourse === course ? 'bg-zinc-900 text-white font-semibold' : 'text-zinc-700 hover:bg-zinc-100'
                  }`}
                >
                  {course}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 font-medium text-xs">
          {[
            { id: 'home', label: 'Home' },
            { id: 'study', label: 'B.Tech Materials' },
            { id: 'batches', label: 'Batches' },
            { id: 'school', label: 'My School' },
            { id: 'ai', label: 'AI Guru' },
            { id: 'dashboard', label: 'Dashboard' },
            ...(isAdmin ? [{ id: 'admin', label: 'Admin Portal' }] : [])
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Profile & Auth Section */}
        <div className="flex items-center gap-3">
          {profile ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 pl-2.5 bg-zinc-100/80 hover:bg-zinc-100 border border-zinc-200 rounded-xl transition-all"
              >
                {profile.photoURL ? (
                  <img 
                    src={profile.photoURL} 
                    alt={profile.displayName || 'User'} 
                    className="w-7 h-7 rounded-full border border-zinc-300 object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center">
                    {(profile.displayName || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold text-zinc-900 leading-tight">
                    {profile.displayName || 'Learner'}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-medium flex items-center gap-1">
                    {profile.authProvider === 'google.com' && (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    )}
                    {profile.authProvider === 'google.com' ? 'Google Auth' : 'Verified'}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-zinc-200 rounded-xl shadow-xl p-2 z-50 animate-fadeIn">
                  <div className="p-2.5 bg-zinc-50 border border-zinc-200/80 rounded-lg mb-2">
                    <div className="text-xs font-bold text-zinc-900">{profile.displayName}</div>
                    <div className="text-xs text-zinc-500 truncate">{profile.email}</div>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 bg-zinc-200/80 text-zinc-800 text-[10px] font-semibold rounded-full">
                      Provider: {profile.authProvider}
                    </div>
                  </div>

                  <button
                    onClick={() => { setActiveTab('dashboard'); setShowProfileMenu(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 rounded-lg transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-zinc-600" />
                    Student Dashboard
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => { setActiveTab('admin'); setShowProfileMenu(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 rounded-lg transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4 text-zinc-600" />
                      Admin Control Panel
                    </button>
                  )}

                  <div className="my-1 border-t border-zinc-100" />

                  <button
                    onClick={async () => {
                      await logout();
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="flex items-center gap-2 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs rounded-lg shadow-xs transition-all"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Login / Sign Up</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 bg-zinc-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <nav className="flex flex-col gap-1 font-medium text-xs">
            {[
              { id: 'home', label: 'Home' },
              { id: 'study', label: 'B.Tech Materials' },
              { id: 'batches', label: 'Batches' },
              { id: 'school', label: 'My School' },
              { id: 'ai', label: 'AI Guru' },
              { id: 'dashboard', label: 'Student Dashboard' },
              ...(isAdmin ? [{ id: 'admin', label: 'Admin Portal' }] : [])
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3.5 py-2 rounded-lg ${
                  activeTab === tab.id ? 'bg-zinc-900 text-white font-semibold' : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
