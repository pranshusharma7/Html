'use client';

import React from 'react';
import { GraduationCap, IndianRupee, MoreVertical, Send, Users } from 'lucide-react';

interface MiddleCardsProps {
  onSendAbsenceAlerts?: () => void;
  onOpenNewAdmission?: () => void;
  onOpenFeeModule?: () => void;
}

export const MiddleCards: React.FC<MiddleCardsProps> = ({ 
  onSendAbsenceAlerts, 
  onOpenNewAdmission,
  onOpenFeeModule,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* 1. STUDENT ENROLLMENT & CAMPUS CAPACITY CARD */}
      <div className="bg-card-surface rounded-3xl p-6 border border-card-border shadow-card-soft flex flex-col justify-between hover:shadow-md transition-all">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-text-main shadow-xs">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-text-main">Student Enrollment</span>
          </div>
          <button 
            onClick={onOpenNewAdmission}
            className="text-text-muted hover:text-text-main p-1 rounded-full transition-colors"
            title="Manage Admissions"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Big Numbers & Circular Progress Badge */}
        <div className="my-5 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight text-text-main">1,240</span>
            <span className="text-sm font-medium text-text-muted">/ 1,500 Seats</span>
          </div>

          {/* 83% circular progress badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-lime/60 text-[11px] font-bold text-text-main">
            <span>83%</span>
            <span className="w-2.5 h-2.5 rounded-full border-2 border-text-main border-t-transparent inline-block animate-spin" />
          </div>
        </div>

        {/* Row of Segmented Pill Capsules: 6 filled dark, 2 dashed outline */}
        <div className="flex items-center gap-2 pt-1">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={`enrolled-${i}`}
              title="Grade Capacity Filled"
              className="h-10 flex-1 rounded-full bg-dark-pill transition-transform hover:scale-105"
            />
          ))}
          {[1, 2].map((i) => (
            <div 
              key={`empty-${i}`}
              title="Vacant Seats"
              className="h-10 flex-1 rounded-full border-2 border-dashed border-black/15"
            />
          ))}
        </div>
      </div>

      {/* 2. TERM FEE COLLECTION (LIME-YELLOW ACCENT CARD) */}
      <div 
        onClick={onOpenFeeModule}
        className="bg-accent-lime rounded-3xl p-6 shadow-card-soft flex flex-col justify-between hover:scale-[1.01] transition-all cursor-pointer"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-text-main shadow-xs font-bold text-sm">
              <IndianRupee className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-sm font-bold text-text-main">Fee Collection</span>
          </div>
          <button className="text-text-main/70 hover:text-text-main p-1 rounded-full transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Big Numbers & Circular Progress Badge */}
        <div className="my-5 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold tracking-tight text-text-main">₹48.6 L</span>
            <span className="text-sm font-medium text-text-main/60">/ ₹60.0 L</span>
          </div>

          {/* 81% circular progress badge (white capsule) */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white text-[11px] font-bold text-text-main shadow-xs">
            <span>81%</span>
            <span className="w-2.5 h-2.5 rounded-full border-2 border-text-main border-t-transparent inline-block animate-spin" />
          </div>
        </div>

        {/* Row of Segmented Pill Capsules: 5 filled dark, 3 dashed outline */}
        <div className="flex items-center gap-2 pt-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={`fee-paid-${i}`}
              title="Tuition Cleared"
              className="h-10 flex-1 rounded-full bg-dark-pill transition-transform hover:scale-105"
            />
          ))}
          {[1, 2, 3].map((i) => (
            <div 
              key={`fee-due-${i}`}
              title="Dues Pending"
              className="h-10 flex-1 rounded-full border-2 border-dashed border-dark-pill/25"
            />
          ))}
        </div>
      </div>

      {/* 3. TODAY'S ATTENDANCE & PARENT NOTIFICATION ALERT (DARK CARD) */}
      <div className="bg-dark-pill rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between text-white shadow-card-soft">
        {/* Background graduation/school artwork with soft overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-40">
          <GraduationCap className="w-44 h-44 text-white/20 -mr-10 -mt-5" />
        </div>

        {/* Header Title & Subtext */}
        <div className="relative z-10 max-w-[210px]">
          <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold mb-2">
            ● 94.2% Present Today
          </span>
          <h3 className="text-lg font-bold leading-tight tracking-tight">
            1,168 Present • 72 Absent Today
          </h3>
          <p className="text-[11px] text-white/60 mt-1">
            Automated SMS & WhatsApp dispatch ready for absent students
          </p>
        </div>

        {/* Action Button: Send Parent Alerts */}
        <div className="relative z-10 pt-4">
          <button 
            onClick={onSendAbsenceAlerts}
            className="w-full py-2.5 px-4 rounded-full bg-white text-dark-pill text-xs font-bold hover:bg-accent-lime hover:text-dark-pill transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
          >
            <span>Notify Parents (SMS/WA)</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
