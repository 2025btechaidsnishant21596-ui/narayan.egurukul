import React from 'react';
import { GraduationCap, Mail, MapPin, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 text-xs border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 text-white font-extrabold text-base tracking-tight">
            <GraduationCap className="w-5 h-5 text-zinc-100" />
            <span>Narayan <span className="text-zinc-400 font-normal">e-Gurukul</span></span>
          </div>
          <p className="text-zinc-400 leading-relaxed font-normal">
            Empowering B.Tech, JEE, NEET, and school competition students across India with 100% free quality notes, solved PYQs, and AI-driven guidance.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2.5">
          <h4 className="text-white font-semibold text-xs uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-1.5 font-normal text-zinc-400">
            <li><a href="#home" className="hover:text-white transition-colors">Home Platform</a></li>
            <li><a href="#study" className="hover:text-white transition-colors">B.Tech Study Materials</a></li>
            <li><a href="#batches" className="hover:text-white transition-colors">Batches &amp; Tracks</a></li>
            <li><a href="#school" className="hover:text-white transition-colors">Sanfort Pre-School</a></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-2.5">
          <h4 className="text-white font-semibold text-xs uppercase tracking-widest">Contact &amp; Support</h4>
          <ul className="space-y-2 font-normal text-zinc-400">
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>egurukulnarayan@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>+91 94689 74044</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>Hanumangarh, Rajasthan — 335512</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-2.5">
          <h4 className="text-white font-semibold text-xs uppercase tracking-widest">Stay Updated</h4>
          <p className="text-zinc-400 font-normal">
            Subscribe for new B.Tech notes, GATE PYQs, and launch announcements.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white outline-none focus:border-zinc-700 flex-1 text-xs"
            />
            <button className="px-3 py-2 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold rounded-lg transition-colors shrink-0">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-900 py-4 text-center text-zinc-500 text-[11px] font-normal">
        <p className="flex items-center justify-center gap-1">
          © 2026 Narayan e-Gurukul. Crafted with <Heart className="w-3.5 h-3.5 text-zinc-400 fill-zinc-400 inline" /> for engineering learners across India by Nishant Saini.
        </p>
      </div>
    </footer>
  );
};
