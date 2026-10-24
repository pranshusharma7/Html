'use client';

import React from 'react';
import { Settings, Plus, Sparkles, GraduationCap } from 'lucide-react';

interface HeroHeaderProps {
  activeSubTab: string;
  onSubTabChange: (tab: string) => void;
  onCreateClick: () => void;
  onSettingsClick: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  activeSubTab,
  onSubTabChange,
  onCreateClick,
  onSettingsClick,
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'students', label: 'Students Directory' },
    { id: 'staff', label: 'Faculty & HR' },
    { id: 'attendance', label: 'Daily Attendance' },
    { id: 'fees', label: 'Fees & Accounts' },
    { id: 'exams', label: 'Exams & Results' },
    { id: 'timetable', label: 'Class Timetable' },
    { id: 'notices', label: 'Notices & Circulars' },
  ];

  return (
    <div className="flex flex-col gap-6 mb-7">
      {/* Top Row: School ERP Headline & Action CTAs */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Large Bold Display Typography with Inline Chips matching reference */}
        <div>
          <h1 className="text-4xl md:text-[45px] font-extrabold tracking-tight text-text-main leading-[1.18]">
            <span className="inline-flex items-center gap-2">
              Managing
              {/* Inline circular graduation chip */}
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-black/15 bg-white text-dark-pill shadow-xs align-middle">
                <GraduationCap className="w-4 h-4 stroke-[2.2]" />
              </span>
              Your School
            </span>
            <br />
            <span className="inline-flex items-center gap-2">
              and
              {/* Inline lime sparkle chip */}
              <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-accent-lime text-dark-pill font-bold shadow-xs align-middle">
                <Sparkles className="w-3.5 h-3.5 fill-dark-pill text-dark-pill" />
              </span>
              Academic Operations
            </span>
          </h1>
        </div>

        {/* Top Right Action Buttons: Academic Settings & + New Admission */}
        <div className="flex items-center gap-3 self-start md:self-auto pt-2">
          {/* Round White Settings Button */}
          <button
            onClick={onSettingsClick}
            className="w-10 h-10 rounded-full bg-white border border-card-border shadow-card-soft flex items-center justify-center text-text-main hover:bg-black/5 hover:rotate-45 transition-all"
            title="School Profile & Academic Year 2026-27"
          >
            <Settings className="w-4 h-4 text-text-main" />
          </button>

          {/* Dark Pill Primary Button: + New Admission */}
          <button
            onClick={onCreateClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-dark-pill text-white text-xs font-bold hover:bg-dark-hover transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+ New Admission</span>
          </button>
        </div>
      </div>

      {/* Bottom Sub-Navigation: Pill Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSubTabChange(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-dark-pill text-white shadow-sm'
                  : 'bg-white text-text-main hover:bg-black/5 border border-card-border/80'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
