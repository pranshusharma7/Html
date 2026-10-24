'use client';

import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  School,
  Sparkles,
  Info
} from 'lucide-react';
import { AuthUser } from '@/lib/auth';
import { ChangePasswordModal } from '@/components/modals/ChangePasswordModal';

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // First-time change password modal state
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [pendingUser, setPendingUser] = useState<AuthUser | null>(null);
  const [lastPasswordAttempt, setLastPasswordAttempt] = useState('');

  // Quick 1-click test credential fill
  const handleQuickFill = (id: string) => {
    setIdentifier(id);
    setPassword(id); // For first time login, password is same as ID!
    setErrorMsg(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!identifier.trim() || !password.trim()) {
      setErrorMsg('Please enter both your ID and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: identifier.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setIsLoading(false);
        setErrorMsg(data.message || 'Invalid User ID or Password.');
        return;
      }

      setIsLoading(false);

      // If user requires first-time password change (ID == Password or isFirstLogin)
      if (data.requirePasswordChange) {
        setPendingUser(data.user);
        setLastPasswordAttempt(password.trim());
        setIsChangePasswordOpen(true);
      } else {
        // Direct successful login
        onLoginSuccess(data.user);
      }
    } catch {
      setIsLoading(false);
      setErrorMsg('Unable to connect to database server. Please check your connection.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#121418] flex items-center justify-center p-4 md:p-8 relative overflow-hidden select-none">
      {/* Background Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent-lime/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main SaaS Card */}
      <div className="w-full max-w-4xl bg-[#1A1D24] border border-white/10 rounded-[36px] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px] relative z-10">
        
        {/* Left Branding Column (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#1E222A] to-[#14171E] p-8 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative">
          <div>
            {/* School Crest */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-accent-lime flex items-center justify-center text-dark-pill shadow-lg shadow-accent-lime/20 flex-shrink-0">
                <School className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white tracking-tight leading-snug">Apex Academy</h2>
                <p className="text-[11px] text-accent-lime font-bold tracking-wider uppercase">Cloud ERP • SaaS</p>
              </div>
            </div>

            {/* SaaS Banner */}
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-accent-lime" />
                <span>Full-Stack SaaS Database Connected</span>
              </span>

              <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                Secure Academic Portal Authentication.
              </h1>

              <p className="text-xs text-white/65 leading-relaxed">
                Persistent database connected. Single sign-on for Students, Parents, Teachers, and Administration with automated first-time password security.
              </p>
            </div>

            {/* First-Time Policy Note */}
            <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-accent-lime">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>First-Time User Policy</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Initial login credentials use your <strong className="text-white">User ID as both the ID and Password</strong>. Once verified, you will be prompted to set your personal secret password.
              </p>
            </div>
          </div>

          {/* Footer Info */}
          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
            <span>Session 2026-27</span>
            <span>256-bit Encrypted DB</span>
          </div>
        </div>

        {/* Right Form Column (7 cols) */}
        <div className="md:col-span-7 bg-[#1A1D24] p-8 md:p-12 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Portal Login</h2>
              <p className="text-xs text-white/60 mt-1">Please enter your ID and password to proceed</p>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* Clean Minimalist Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* 1. Enter your ID */}
              <div>
                <label className="text-xs font-bold text-white/80 block mb-1.5">
                  Enter your ID *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Enter your ID (e.g. 101, admin, principal, parent)"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs font-mono font-medium outline-none focus:border-accent-lime focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              {/* 2. Enter your Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-white/80">Enter your Password *</label>
                  <span className="text-[10px] text-white/40 font-medium">
                    (First time? Same as ID)
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs font-medium outline-none focus:border-accent-lime focus:bg-white/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-2xl bg-accent-lime text-dark-pill font-extrabold text-xs hover:bg-[#d8e67a] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent-lime/20 cursor-pointer mt-4"
              >
                {isLoading ? (
                  <span>Checking Database...</span>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Demo Fillers (Click any to test) */}
          <div className="pt-6 mt-6 border-t border-white/10">
            <span className="text-[11px] text-white/50 block mb-2 font-medium">
              Click any demo account to test (auto-fills ID & initial password):
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '🎓 Student 101', id: '101' },
                { label: '👑 Super Admin', id: 'admin' },
                { label: '🏛️ Principal', id: 'principal' },
                { label: '👨‍👩‍👧 Parent', id: 'parent' },
                { label: '👨‍🏫 Class Teacher', id: 'classteacher' },
                { label: '💰 Accountant', id: 'accountant' },
                { label: '🚌 Transport', id: 'transport' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => handleQuickFill(pill.id)}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>{pill.label}</span>
                  <span className="font-mono text-[10px] text-accent-lime opacity-80">({pill.id})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* First-Time Password Change Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        user={pendingUser}
        currentPasswordAttempt={lastPasswordAttempt}
        onSuccess={(updatedUser) => {
          setIsChangePasswordOpen(false);
          onLoginSuccess(updatedUser);
        }}
      />
    </div>
  );
};
