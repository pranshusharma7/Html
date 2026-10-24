'use client';

import React, { useState } from 'react';
import { X, Award } from 'lucide-react';
import { Student, ExamRecord } from '@/lib/types';

interface RecordExamMarksModalProps {
  isOpen: boolean;
  students: Student[];
  onClose: () => void;
  onSubmit: (record: Omit<ExamRecord, 'id'>) => void;
}

export const RecordExamMarksModal: React.FC<RecordExamMarksModalProps> = ({
  isOpen,
  students,
  onClose,
  onSubmit,
}) => {
  const [studentId, setStudentId] = useState(students[0]?.id || 'STU-1001');
  const [examType, setExamType] = useState('Mid-Term Exam');
  const [subject, setSubject] = useState('Mathematics');
  const [maxMarks, setMaxMarks] = useState(100);
  const [marksObtained, setMarksObtained] = useState(85);
  const [remarks, setRemarks] = useState('Consistent problem-solving accuracy');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    const percentage = (marksObtained / maxMarks) * 100;
    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';

    onSubmit({
      studentId: student.id,
      studentName: student.name,
      class: `${student.class}-${student.section}`,
      examType,
      subject,
      maxMarks: Number(maxMarks),
      marksObtained: Number(marksObtained),
      grade,
      remarks,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in">
      <div className="bg-app-panel border border-card-border rounded-4xl p-7 max-w-md w-full shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-card-border mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent-lime flex items-center justify-center text-dark-pill">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-main">Record Exam Marks</h3>
              <p className="text-[11px] text-text-muted">Enter marks to compute grades</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-card-surface hover:bg-black/10 flex items-center justify-center text-text-muted hover:text-text-main"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-[11px] font-bold text-text-muted block mb-1">Select Student *</label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-card-border text-xs font-semibold text-text-main outline-none"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (Class {s.class}-{s.section}, Roll #{s.rollNo})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Exam Type</label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-white border border-card-border text-xs outline-none"
              >
                <option value="Mid-Term Exam">Mid-Term Exam</option>
                <option value="Final Term Exam">Final Term Exam</option>
                <option value="Unit Test">Unit Test</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-white border border-card-border text-xs outline-none focus:border-dark-pill"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Maximum Marks</label>
              <input
                type="number"
                required
                value={maxMarks}
                onChange={(e) => setMaxMarks(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-2xl bg-white border border-card-border text-xs outline-none focus:border-dark-pill"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-text-muted block mb-1">Marks Obtained *</label>
              <input
                type="number"
                required
                value={marksObtained}
                onChange={(e) => setMarksObtained(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-2xl bg-white border border-card-border text-xs font-bold text-text-main outline-none focus:border-dark-pill"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-text-muted block mb-1">Teacher Remarks</label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-3.5 py-2 rounded-2xl bg-white border border-card-border text-xs outline-none focus:border-dark-pill"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-card-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-card-surface text-text-main text-xs font-bold hover:bg-black/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-dark-pill text-white text-xs font-bold hover:bg-dark-hover transition-colors shadow-sm"
            >
              Save Marks & Grade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
