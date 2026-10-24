'use client';

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Student } from '@/lib/types';

interface AttendanceViewProps {
  students: Student[];
  onSaveAttendance: () => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  students,
  onSaveAttendance,
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-24');
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'Present' | 'Absent' | 'Late'>>({
    'STU-1001': 'Present',
    'STU-1002': 'Present',
    'STU-1003': 'Absent',
    'STU-1004': 'Present',
    'STU-1005': 'Present',
    'STU-1006': 'Present',
    'STU-1007': 'Late',
    'STU-1008': 'Present',
  });

  const setStatus = (id: string, status: 'Present' | 'Absent' | 'Late') => {
    setAttendanceMap((prev) => ({ ...prev, [id]: status }));
  };

  const markAll = (status: 'Present' | 'Absent') => {
    const updated = { ...attendanceMap };
    students.forEach((s) => {
      updated[s.id] = status;
    });
    setAttendanceMap(updated);
  };

  return (
    <div className="bg-card-surface rounded-3xl p-6 border border-card-border shadow-card-soft">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-main">Daily Attendance Roster</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Mark, review and sync classroom attendance with real-time analytics
          </p>
        </div>

        <button
          onClick={onSaveAttendance}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-dark-pill text-white text-xs font-bold hover:bg-dark-hover transition-all shadow-sm"
        >
          <span>Save Attendance</span>
        </button>
      </div>

      {/* Filter / Date Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 p-4 rounded-2xl bg-white border border-card-border">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card-surface text-xs font-semibold text-text-main">
            <Calendar className="w-4 h-4 text-text-muted" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent border-none outline-none text-xs font-bold text-text-main"
            />
          </div>

          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3.5 py-1.5 rounded-full bg-card-surface text-xs font-bold text-text-main outline-none cursor-pointer"
          >
            <option value="10">Class 10</option>
            <option value="9">Class 9</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>

          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-3.5 py-1.5 rounded-full bg-card-surface text-xs font-bold text-text-main outline-none cursor-pointer"
          >
            <option value="A">Section A</option>
            <option value="B">Section B</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => markAll('Present')}
            className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-colors"
          >
            ✓ Mark All Present
          </button>
          <button
            onClick={() => markAll('Absent')}
            className="px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 transition-colors"
          >
            ✕ Mark All Absent
          </button>
        </div>
      </div>

      {/* Student Attendance List */}
      <div className="overflow-x-auto rounded-2xl border border-card-border bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-card-border bg-card-surface/50 text-text-muted font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Roll</th>
              <th className="py-3 px-4">Student</th>
              <th className="py-3 px-4">Class</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Quick Mark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border/60">
            {students.map((s) => {
              const current = attendanceMap[s.id] || 'Present';
              return (
                <tr key={s.id} className="hover:bg-card-surface/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-dark-pill">#{s.rollNo}</td>
                  <td className="py-3 px-4 font-bold text-text-main">{s.name}</td>
                  <td className="py-3 px-4 text-text-muted">Class {s.class}-{s.section}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        current === 'Present'
                          ? 'bg-accent-lime text-dark-pill'
                          : current === 'Absent'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {current}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setStatus(s.id, 'Present')}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          current === 'Present'
                            ? 'bg-dark-pill text-white shadow-xs'
                            : 'bg-card-surface text-text-muted hover:text-text-main'
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => setStatus(s.id, 'Absent')}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          current === 'Absent'
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-card-surface text-text-muted hover:text-text-main'
                        }`}
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => setStatus(s.id, 'Late')}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          current === 'Late'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-card-surface text-text-muted hover:text-text-main'
                        }`}
                      >
                        Late
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
