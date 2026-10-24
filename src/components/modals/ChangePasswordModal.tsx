'use client';

import React, { useState } from 'react';
import { 
  KeyRound, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { AuthUser } from '@/lib/auth';

interface ChangePasswordModalProps {
  isOpen: boolean;
  user: AuthUser | null;
  currentPasswordAttempt: string;
  onSuccess: (updatedUser: AuthUser) => void;
  onClose?: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  user,
  currentPasswordAttempt,
  onSuccess,
}) => {
  const [currentPassword, setCurrentPassword] = useState(currentPasswordAttempt || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !user) return null;

  // Simple password strength calculator
  const calculateStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-white/20' };
    if (pass.length < 5) return { score: 1, label: 'Too Weak', color: 'bg-rose-500' };
    if (pass.length < 8) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    if (/[0-9]/.test(pass) && /[a-zA-Z]/.test(pass)) {
      return { score: 3, label: 'Strong', color: 'bg-emerald-500' };
    }
    return { score: 2, label: 'Good', color: 'bg-emerald-400' };
  };

  const strength = calculateStrength(newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (newPassword.length < 4) {
      setErrorMsg('New password must be at least 4 characters long.');
      return;
    }

    if (newPassword === user.identifier) {
      setErrorMsg('New password cannot be identical to your User ID.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('New password and confirm password do not match.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: user.identifier,
          currentPassword: currentPassword || currentPasswordAttempt,
          newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setIsSubmitting(false);
        setErrorMsg(data.message || 'Failed to update password.');
        return;
      }

      setIsSubmitting(false);
      onSuccess(data.user);
    } catch {
      setIsSubmitting(false);
      setErrorMsg('Network error. Could not connect to database.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#1A1D24] border border-white/15 rounded-[32px] shadow-2xl p-6 md:p-8 text-white relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-accent-lime/20 rounded-full blur-[90px] pointer-events-none" />

        {/* Header Icon & Title */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-accent-lime text-dark-pill flex items-center justify-center shadow-lg shadow-accent-lime/20 flex-shrink-0">
            <KeyRound className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 text-[10px] uppercase font-extrabold text-accent-lime tracking-wider">
              <Sparkles className="w-3 h-3" /> First-Time Login Setup
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-tight leading-tight">
              Change Your Password
            </h2>
          </div>
        </div>

        {/* Context Note */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70 mb-5 leading-relaxed">
          First-time login detected for <strong className="text-white">{user.name}</strong> (ID: <span className="font-mono text-accent-lime">{user.identifier}</span>). Please set a secure personal password to save to your database account.
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Temporary Password */}
          <div>
            <label className="text-xs font-bold text-white/80 block mb-1.5">
              Current Temporary Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Temporary password (same as your ID)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs font-mono outline-none focus:border-accent-lime transition-all"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-white/80">New Password *</label>
              {newPassword && (
                <span className="text-[10px] font-bold text-white/60">
                  Strength: <strong className="text-accent-lime">{strength.label}</strong>
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showNewPassword ? 'text' : 'password'}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new secret password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs outline-none focus:border-accent-lime transition-all"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Strength Meter Bar */}
            {newPassword && (
              <div className="mt-2 grid grid-cols-3 gap-1">
                <div className={`h-1 rounded-full ${strength.score >= 1 ? strength.color : 'bg-white/10'}`} />
                <div className={`h-1 rounded-full ${strength.score >= 2 ? strength.color : 'bg-white/10'}`} />
                <div className={`h-1 rounded-full ${strength.score >= 3 ? strength.color : 'bg-white/10'}`} />
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="text-xs font-bold text-white/80 block mb-1.5">
              Confirm New Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your new password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-xs outline-none focus:border-accent-lime transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-center gap-2 text-[11px] text-white/50 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-lime flex-shrink-0" />
            <span>This new password will be permanently saved to the database.</span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-5 rounded-2xl bg-accent-lime text-dark-pill font-extrabold text-xs hover:bg-[#d8e67a] active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent-lime/20 cursor-pointer mt-3"
          >
            {isSubmitting ? (
              <span>Saving to Database...</span>
            ) : (
              <>
                <span>Save New Password & Enter Portal</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
