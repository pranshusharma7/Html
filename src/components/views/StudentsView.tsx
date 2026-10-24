'use client';

import React, { useState } from 'react';
import { Search, Plus, Eye, Trash2 } from 'lucide-react';
import { Student } from '@/lib/types';

interface StudentsViewProps {
  students: Student[];
  onAddStudent: () => void;
  onDeleteStudent: (id: string) => void;
  onViewStudent: (student: Student) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  onAddStudent,
  onDeleteStudent,
  onViewStudent,
}) => {
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.includes(search) ||
      s.admissionNo.toLowerCase().includes(search.toLowerCase());
    const matchesClass = selectedClass === 'ALL' || s.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="bg-card-surface rounded-3xl p-6 border border-card-border shadow-card-soft">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-main">Student Directory</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Manage student enrollment, roll records, contact details and status
          </p>
        </div>

        <button
          onClick={onAddStudent}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-pill text-white text-xs font-bold hover:bg-dark-hover transition-all shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Admission</span>
        </button>
      </div>

      {/* Toolbar / Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name, roll number, or admission ID..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-card-border text-xs text-text-main outline-none focus:border-dark-pill transition-colors shadow-xs"
          />
        </div>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-4 py-2 rounded-full bg-white border border-card-border text-xs font-semibold text-text-main outline-none cursor-pointer shadow-xs"
        >
          <option value="ALL">All Classes</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
          <option value="11">Class 11</option>
          <option value="12">Class 12</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-card-border bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-card-border bg-card-surface/50 text-text-muted font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Roll</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Class & Sec</th>
              <th className="py-3 px-4">Guardian</th>
              <th className="py-3 px-4">Attendance</th>
              <th className="py-3 px-4">Fee Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border/60">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-card-surface/40 transition-colors">
                <td className="py-3 px-4 font-bold text-dark-pill">#{s.rollNo}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-dark-pill text-white font-bold flex items-center justify-center text-[10px]">
                      {s.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold text-text-main">{s.name}</div>
                      <div className="text-[10px] text-text-muted">{s.admissionNo}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 font-medium">Class {s.class} ({s.section})</td>
                <td className="py-3 px-4 text-text-muted">{s.guardian}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent-lime/60 text-dark-pill font-bold text-[10px]">
                    {s.attendancePct}%
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      s.feeStatus === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : s.feeStatus === 'Partial'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {s.feeStatus}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onViewStudent(s)}
                      className="w-7 h-7 rounded-full bg-card-surface hover:bg-black/10 flex items-center justify-center text-text-main transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteStudent(s.id)}
                      className="w-7 h-7 rounded-full bg-rose-50 hover:bg-rose-100 flex items-center justify-center text-rose-600 transition-colors"
                      title="Delete Student"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
