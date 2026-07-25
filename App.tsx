import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StudyMaterials } from './components/StudyMaterials';
import { StudentDashboard } from './components/StudentDashboard';
import { AdminPortal } from './components/AdminPortal';
import { SchoolSection } from './components/SchoolSection';
import { AIGuruChat } from './components/AIGuruChat';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { AuthMode } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<AuthMode>('login');

  const handleOpenAuth = (mode: AuthMode = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-zinc-50/80 flex flex-col font-sans text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
        {/* Navigation Bar */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onOpenAuth={handleOpenAuth} 
        />

        {/* Main Page Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {activeTab === 'home' && (
            <HeroSection 
              onOpenAuth={handleOpenAuth} 
              onExploreMaterials={() => setActiveTab('study')} 
            />
          )}

          {activeTab === 'study' && <StudyMaterials />}

          {activeTab === 'batches' && (
            <div className="py-4 space-y-8">
              <StudyMaterials />
            </div>
          )}

          {activeTab === 'school' && <SchoolSection />}

          {activeTab === 'ai' && (
            <div className="py-12 space-y-8 text-center max-w-2xl mx-auto">
              <div className="p-8 bg-zinc-900 text-white rounded-2xl border border-zinc-800 shadow-sm space-y-4">
                <h2 className="text-xl font-bold tracking-tight">AI Guru — Academic Tutor</h2>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Click the floating robot icon at the bottom right corner of your screen to start chatting with AI Guru!
                </p>
                <button 
                  onClick={() => setActiveTab('study')}
                  className="px-5 py-2.5 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold text-xs rounded-lg transition-all"
                >
                  Browse B.Tech Notes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && <StudentDashboard />}

          {activeTab === 'admin' && <AdminPortal />}
        </main>

        {/* Floating AI Academic Chatbot */}
        <AIGuruChat />

        {/* Unified Authentication Modal (Google Login & Signup Merged) */}
        <AuthModal 
          isOpen={authModalOpen} 
          onClose={() => setAuthModalOpen(false)} 
          initialMode={authModalMode}
        />

        {/* Footer */}
        <Footer />
      </div>
    </AuthProvider>
  );
}
