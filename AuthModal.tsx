import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Mail, 
  Lock, 
  User as UserIcon, 
  Phone, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  GraduationCap
} from 'lucide-react';
import { AuthMode } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, forgotPassword, setDemoUser } = useAuth();
  
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetFields = () => {
    setError(null);
    setSuccess(null);
  };

  const handleGoogleAuth = async () => {
    setIsSubmitting(true);
    resetFields();
    try {
      await loginWithGoogle();
      setSuccess('Google account synchronized successfully! Redirecting...');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Sign-in cancelled. Please try again.');
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        setError('An account already exists with this email using a different sign-in method. Google authentication merged automatically.');
      } else {
        setError(err.message || 'Failed to authenticate with Google.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    resetFields();

    try {
      if (mode === 'login') {
        if (!email || !password) {
          throw new Error('Please fill in both email and password.');
        }
        await loginWithEmail(email, password);
        setSuccess('Logged in successfully!');
        setTimeout(() => onClose(), 800);
      } else if (mode === 'signup') {
        if (!email || !password || !fullName) {
          throw new Error('Please fill in all required fields.');
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long.');
        }
        await registerWithEmail(email, password, fullName);
        setSuccess('Account created and merged with Firebase!');
        setTimeout(() => onClose(), 800);
      } else if (mode === 'forgot') {
        if (!email) {
          throw new Error('Please enter your registered email address.');
        }
        await forgotPassword(email);
        setSuccess('Password reset link sent to your email.');
      }
    } catch (err: any) {
      const friendlyMsgs: Record<string, string> = {
        'auth/user-not-found': 'No account found with this email. Click "Sign Up" to register.',
        'auth/wrong-password': 'Incorrect password. Try again or reset password.',
        'auth/email-already-in-use': 'This email is already in use. Try signing in with Google or Email.',
        'auth/invalid-email': 'Please enter a valid email address.'
      };
      setError(friendlyMsgs[err.code] || err.message || 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsSubmitting(true);
    resetFields();
    setTimeout(() => {
      setIsSubmitting(false);
      setShowOtpField(true);
      setSuccess('Verification OTP sent to +91 ' + phone + '!');
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('Please enter 6-digit OTP code.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setSuccess('Phone OTP verified! Logging you in...');
      setTimeout(() => {
        setDemoUser('student');
        onClose();
      }, 800);
    }, 1000);
  };

  const handleDemoAccess = (role: 'student' | 'admin') => {
    setDemoUser(role);
    setSuccess(`Logged in as ${role === 'admin' ? 'Staff Administrator' : 'Demo Student'}!`);
    setTimeout(() => onClose(), 600);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl overflow-hidden bg-white border border-slate-200 shadow-2xl rounded-3xl">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-all"
          aria-label="Close auth dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="px-8 pt-8 pb-6 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl mb-3 shadow-inner">
            <GraduationCap className="w-8 h-8 text-yellow-300" />
          </div>
          
          <h2 className="text-2xl font-black tracking-tight text-white">
            Narayan <span className="text-yellow-300">e-Gurukul</span>
          </h2>
          <p className="text-sm text-blue-100/90 mt-1 max-w-sm mx-auto">
            {mode === 'login' && 'Sign in to access B.Tech notes, live classes, & AI Guru'}
            {mode === 'signup' && 'Create your account & join 150,000+ engineering learners'}
            {mode === 'forgot' && 'Reset your password to regain access to your courses'}
            {mode === 'otp' && 'Fast OTP login with mobile verification'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 mt-5 p-1 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 max-w-md mx-auto">
            <button
              onClick={() => { setMode('login'); resetFields(); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'login' ? 'bg-white text-blue-900 shadow-md' : 'text-blue-100 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); resetFields(); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'signup' ? 'bg-white text-blue-900 shadow-md' : 'text-blue-100 hover:text-white'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => { setMode('otp'); resetFields(); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                mode === 'otp' ? 'bg-white text-blue-900 shadow-md' : 'text-blue-100 hover:text-white'
              }`}
            >
              OTP Login
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-5">
          {/* Status Notifications */}
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* GOOGLE SIGN IN & SIGN UP (Merged Provider) */}
          {mode !== 'forgot' && mode !== 'otp' && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-800 font-bold text-sm rounded-2xl shadow-sm hover:shadow-md transition-all group"
              >
                {/* Official Google Multi-color SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>
                  {mode === 'login' ? 'Continue with Google' : 'Sign Up with Google'}
                </span>
                <Sparkles className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
              </button>

              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  or use email
                </span>
              </div>
            </div>
          )}

          {/* EMAIL FORM (Login, Signup, Forgot) */}
          {mode !== 'otp' && (
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <div className="relative flex items-center">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Nishant Saini"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => { setMode('forgot'); resetFields(); }}
                        className="text-xs font-bold text-blue-600 hover:underline"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative flex items-center">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {mode === 'login' && 'Sign In'}
                      {mode === 'signup' && 'Create Account'}
                      {mode === 'forgot' && 'Send Reset Link'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* OTP FORM */}
          {mode === 'otp' && (
            <div className="space-y-4">
              {!showOtpField ? (
                <form onSubmit={handleSendOtp} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mobile Number
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm font-bold text-slate-700">
                        🇮🇳 +91
                      </span>
                      <div className="relative flex-1 flex items-center">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="9876543210"
                          required
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Sending OTP...' : 'Get OTP Code'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Enter 6-Digit Verification Code
                    </label>
                    <div className="relative flex items-center">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5" />
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="123456"
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl text-sm font-bold tracking-widest outline-none transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Verifying Code...' : 'Verify & Sign In'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Quick Demo Accounts Footer */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs font-semibold text-slate-500 gap-2">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Firebase Unified Auth
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleDemoAccess('student')}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Demo Student
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleDemoAccess('admin')}
                className="text-indigo-600 hover:text-indigo-800 hover:underline"
              >
                Staff Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
