'use client';

import React from 'react';
import { 
  Users, 
  GraduationCap, 
  FileCheck, 
  AlertCircle, 
  CalendarClock, 
  Bus, 
  ArrowUpRight 
} from 'lucide-react';

interface RightColumnProps {
  onCardClick?: (action: string) => void;
}

export const RightColumn: React.FC<RightColumnProps> = ({ onCardClick }) => {
  const schoolQuickActions = [
    {
      id: 'cbse-circulars',
      icon: FileCheck,
      title: 'CBSE Exam Circulars',
      desc: 'Term 1 date sheet, guidelines & syllabus...',
    },
    {
      id: 'fee-defaulters',
      icon: AlertCircle,
      title: 'Pending Fee Follow-ups',
      desc: '14 students with 2nd term fee pending...',
    },
    {
      id: 'staff-leaves',
      icon: CalendarClock,
      title: 'Teacher Leave Requests',
      desc: '3 staff leave approvals pending review...',
    },
    {
      id: 'bus-library',
      icon: Bus,
      title: 'Bus GPS & Library Desk',
      desc: '12 active bus routes & book returns...',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Top 2 Cards: Parent Portal & Teacher Hub */}
      <div className="grid grid-cols-2 gap-4">
        {/* Parent Portal Card */}
        <button 
          onClick={() => onCardClick?.('parent-portal')}
          className="bg-card-surface rounded-3xl p-5 border border-card-border shadow-card-soft flex flex-col items-center justify-center text-center group hover:bg-white transition-all cursor-pointer h-[120px]"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-text-main mb-2 shadow-xs group-hover:scale-110 transition-transform">
            <Users className="w-4 h-4 stroke-[2]" />
          </div>
          <span className="text-xs font-bold text-text-main">Parent Portal</span>
        </button>

        {/* Teacher Hub Card */}
        <button 
          onClick={() => onCardClick?.('teacher-hub')}
          className="bg-card-surface rounded-3xl p-5 border border-card-border shadow-card-soft flex flex-col items-center justify-center text-center group hover:bg-white transition-all cursor-pointer h-[120px]"
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-text-main mb-2 shadow-xs group-hover:scale-110 transition-transform">
            <GraduationCap className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-xs font-bold text-text-main">Teacher Hub</span>
        </button>
      </div>

      {/* Vertical List of School Management Quick-Link Cards */}
      <div className="flex flex-col gap-3">
        {schoolQuickActions.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onCardClick?.(item.id)}
              className="bg-card-surface rounded-3xl p-4 border border-card-border shadow-card-soft hover:shadow-md hover:border-black/15 transition-all cursor-pointer group flex items-start justify-between"
            >
              <div className="flex flex-col">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-text-main shadow-xs mb-3 group-hover:rotate-6 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-text-main group-hover:text-black transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-text-muted mt-0.5 line-clamp-1">
                  {item.desc}
                </p>
              </div>

              <div className="text-text-muted group-hover:text-text-main group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all pt-1">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
