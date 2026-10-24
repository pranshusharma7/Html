'use client';

import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { INITIAL_TIMETABLE } from '@/lib/mockData';

export const TimetableView: React.FC = () => {
  return (
    <div className="bg-card-surface rounded-3xl p-6 border border-card-border shadow-card-soft">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-main">Master Class Timetable</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Weekly academic schedule and period allocation for Class 10 (Section A)
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-card-border text-xs font-bold text-text-main shadow-xs">
          <Calendar className="w-4 h-4 text-text-muted" />
          <span>Active Session: 2026-2027</span>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="overflow-x-auto rounded-2xl border border-card-border bg-white shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-card-border bg-card-surface/50 text-text-muted font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Period & Timing</th>
              <th className="py-3 px-4">Monday</th>
              <th className="py-3 px-4">Tuesday</th>
              <th className="py-3 px-4">Wednesday</th>
              <th className="py-3 px-4">Thursday</th>
              <th className="py-3 px-4">Friday</th>
              <th className="py-3 px-4">Saturday</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border/60">
            {INITIAL_TIMETABLE.map((row, idx) => {
              const isBreak = row.period === 'Break';
              return (
                <tr 
                  key={idx} 
                  className={`transition-colors ${isBreak ? 'bg-amber-50/50 font-bold' : 'hover:bg-card-surface/30'}`}
                >
                  <td className="py-3 px-4 font-bold text-dark-pill whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-text-muted" />
                      <span>{row.period}</span>
                    </div>
                    <div className="text-[10px] text-text-muted font-normal">{row.time}</div>
                  </td>
                  <td className="py-3 px-4 text-text-main">{row.mon}</td>
                  <td className="py-3 px-4 text-text-main">{row.tue}</td>
                  <td className="py-3 px-4 text-text-main">{row.wed}</td>
                  <td className="py-3 px-4 text-text-main">{row.thu}</td>
                  <td className="py-3 px-4 text-text-main">{row.fri}</td>
                  <td className="py-3 px-4 text-text-main">{row.sat}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
