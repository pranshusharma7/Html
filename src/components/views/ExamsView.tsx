'use client';

import React, { useState } from 'react';
import { Search, Plus, Award } from 'lucide-react';
import { ExamRecord } from '@/lib/types';

interface ExamsViewProps {
  exams: ExamRecord[];
  onRecordMarks: () => void;
}

export const ExamsView: React.FC<ExamsViewProps> = ({ exams, onRecordMarks }) => {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');

  const filtered = exams.filter((e) => {
    const matchesSearch =
      e.studentName.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = selectedSubject === 'ALL' || e.subject.includes(selectedSubject);
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="bg-card-surface rounded-3xl p-6 border border-card-border shadow-card-soft">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-text-main">Examinations & Grade Reports</h2>
          <p className="text-xs text-text-muted mt-0.5">
            Record term marks, calculate subject grades and generate CBSE report cards
          </p>
        </div>

        <button
          onClick={onRecordMarks}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-pill text-white text-xs font-bold hover:bg-dark-hover transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Record Marks</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student name or subject..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-card-border text-xs text-text-main outline-none focus:border-dark-pill transition-colors shadow-xs"
          />
        </div>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-4 py-2 rounded-full bg-white border border-card-border text-xs font-semibold text-text-main outline-none cursor-pointer shadow-xs"
        >
          <option value="ALL">All Subjects</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Computer">Computer Science & AI</option>
        </select>
      </div>

      {/* Marks Table */}
      <div className="overflow-x-auto rounded-2xl border border-card-border bg-white shadow-xs">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-card-border bg-card-surface/50 text-text-muted font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4">Exam ID</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Class</th>
              <th className="py-3 px-4">Exam Type</th>
              <th className="py-3 px-4">Subject</th>
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4">Grade</th>
              <th className="py-3 px-4">Teacher Remarks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border/60">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-card-surface/40 transition-colors">
                <td className="py-3 px-4 font-bold text-dark-pill">{item.id}</td>
                <td className="py-3 px-4 font-bold text-text-main">{item.studentName}</td>
                <td className="py-3 px-4 text-text-muted">Class {item.class}</td>
                <td className="py-3 px-4 font-medium">{item.examType}</td>
                <td className="py-3 px-4 font-semibold text-text-main">{item.subject}</td>
                <td className="py-3 px-4">
                  <span className="font-bold text-text-main">{item.marksObtained}</span>
                  <span className="text-text-muted text-[10px]"> / {item.maxMarks}</span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.grade === 'A+'
                        ? 'bg-accent-lime text-dark-pill'
                        : item.grade === 'A'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    <Award className="w-3 h-3" />
                    <span>Grade {item.grade}</span>
                  </span>
                </td>
                <td className="py-3 px-4 text-text-muted">{item.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
