import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  Users, 
  Trophy, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Code, 
  Flame,
  Brain,
  Video
} from 'lucide-react';

interface HeroSectionProps {
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onExploreMaterials: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAuth, onExploreMaterials }) => {
  return (
    <div className="space-y-12 py-4">
      {/* Hero Banner Section - Clean Minimalist Dark Card */}
      <section className="relative overflow-hidden bg-zinc-900 text-white rounded-2xl p-8 lg:p-12 border border-zinc-800 shadow-xs">
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700/80 text-[11px] font-medium tracking-wide text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-zinc-100" />
              <span>India's #1 Free Smart Learning Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
              India's Free Smart <br />
              <span className="text-zinc-400 font-normal">
                Learning Platform
              </span>
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
              Narayan e-Gurukul brings hand-written B.Tech notes, 10+ year solved PYQs, live interactive classes, and AI Guru doubt solving — 100% free forever for every student across India.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onExploreMaterials}
                className="px-5 py-3 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 group"
              >
                <span>Explore Free Materials</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenAuth('signup')}
                className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700/80 border border-zinc-700 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-2.5"
              >
                {/* Google Icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Sign Up with Google</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-medium text-zinc-400">
              <span className="flex items-center gap-1.5 bg-zinc-800/60 border border-zinc-700/60 px-3 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No Login Needed for PDF
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-800/60 border border-zinc-700/60 px-3 py-1 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" /> Firebase Secured
              </span>
            </div>
          </div>

          {/* Right Visual Stats Column */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
            <div className="p-5 bg-zinc-800/60 border border-zinc-700/60 rounded-xl text-center hover:bg-zinc-800 transition-all">
              <Download className="w-6 h-6 text-zinc-300 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">15,000+</div>
              <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider mt-1">
                Downloads
              </div>
            </div>

            <div className="p-5 bg-zinc-800/60 border border-zinc-700/60 rounded-xl text-center hover:bg-zinc-800 transition-all">
              <Users className="w-6 h-6 text-zinc-300 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">150,000+</div>
              <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider mt-1">
                Students
              </div>
            </div>

            <div className="p-5 bg-zinc-800/60 border border-zinc-700/60 rounded-xl text-center hover:bg-zinc-800 transition-all">
              <Trophy className="w-6 h-6 text-zinc-300 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider mt-1">
                Free Forever
              </div>
            </div>

            <div className="p-5 bg-zinc-800/60 border border-zinc-700/60 rounded-xl text-center hover:bg-zinc-800 transition-all">
              <Flame className="w-6 h-6 text-zinc-300 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">60+</div>
              <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider mt-1">
                Test Series
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Tracks Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full border border-zinc-200">
            Specialized Learning Tracks
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            Featured B.Tech &amp; Competition Batches
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
            Curated engineering repositories, solved previous year question papers, and lab experiment manuals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-xs hover:border-zinc-400 transition-all space-y-4 group">
            <div className="w-10 h-10 bg-zinc-100 text-zinc-900 rounded-xl flex items-center justify-center font-bold text-lg">
              <Code className="w-5 h-5 text-zinc-800" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-zinc-100 text-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-200">
                Free Download
              </span>
              <h3 className="text-base font-bold text-zinc-900 mt-2">B.Tech CSE Core</h3>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Foundational notes for 1st Year Engineering, Mathematics, Physics, Programming in C, and Electrical Basics.
              </p>
            </div>
            <button
              onClick={onExploreMaterials}
              className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs rounded-lg transition-all"
            >
              Open B.Tech Core Notes
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-xs hover:border-zinc-400 transition-all space-y-4 group">
            <div className="w-10 h-10 bg-zinc-100 text-zinc-900 rounded-xl flex items-center justify-center font-bold text-lg">
              <Database className="w-5 h-5 text-zinc-800" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-zinc-100 text-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-200">
                Specialized
              </span>
              <h3 className="text-base font-bold text-zinc-900 mt-2">CSE (AIDS)</h3>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Artificial Intelligence &amp; Data Science syllabus, Python code notebooks, Statistics, DBMS &amp; DSA guides.
              </p>
            </div>
            <button
              onClick={onExploreMaterials}
              className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs rounded-lg transition-all"
            >
              Open CSE AIDS Materials
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-xs hover:border-zinc-400 transition-all space-y-4 group">
            <div className="w-10 h-10 bg-zinc-100 text-zinc-900 rounded-xl flex items-center justify-center font-bold text-lg">
              <Cpu className="w-5 h-5 text-zinc-800" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-zinc-100 text-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-200">
                AI &amp; ML Track
              </span>
              <h3 className="text-base font-bold text-zinc-900 mt-2">CSE (AIML)</h3>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Machine Learning fundamentals, Neural Networks, Python for AI, Algorithms, &amp; 10-year solved question banks.
              </p>
            </div>
            <button
              onClick={onExploreMaterials}
              className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs rounded-lg transition-all"
            >
              Open CSE AIML Materials
            </button>
          </div>
        </div>
      </section>

      {/* AI Guru Banner */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 bg-zinc-800 border border-zinc-700/80 rounded-xl flex items-center justify-center text-zinc-100 shrink-0">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Have an academic doubt? Ask AI Guru!</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Real-time AI tutor trained on engineering syllabus, JEE PYQs, &amp; exam solutions.
            </p>
          </div>
        </div>
        <button
          onClick={onExploreMaterials}
          className="px-5 py-2.5 bg-white text-zinc-900 font-semibold text-xs rounded-lg hover:bg-zinc-100 transition-all shrink-0"
        >
          Chat with AI Guru Now
        </button>
      </section>
    </div>
  );
};
