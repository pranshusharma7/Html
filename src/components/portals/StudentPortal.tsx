'use client';

import React from 'react';
import { 
  Award, 
  CalendarCheck, 
  CreditCard, 
  Clock, 
  FileCheck, 
  Printer 
} from 'lucide-react';
import { AuthUser } from '@/lib/auth';
import { ExamRecord, FeeInvoice } from '@/lib/types';

interface StudentPortalProps {
  user: AuthUser;
  exams: ExamRecord[];
  feeInvoice?: FeeInvoice;
  onOpenReceipt: (invoice: FeeInvoice) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({
  user,
  exams,
  feeInvoice,
  onOpenReceipt,
}) => {
  // Filter student's own marks
  const studentMarks = exams.filter((e) => e.studentId === 'STU-1001' || e.studentName.includes('Aarav'));

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-card-border shadow-card-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-dark-pill shadow-md flex-shrink-0">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-accent-lime text-dark-pill text-[10px] font-extrabold">
                Active Student
              </span>
              <span className="text-xs text-text-muted font-semibold">CBSE Reg: CBSE/2026/STU-101</span>
            </div>
            <h1 className="text-2xl font-extrabold text-text-main mt-1">Welcome back, {user.name}!</h1>
            <p className="text-xs text-text-muted mt-0.5">
              Class {user.details?.class || '10'} (Section {user.details?.section || 'A'}) • Roll #{user.details?.rollNo || '101'} • Apex International Academy
            </p>
          </div>
        </div>

        {/* Quick Receipt Action */}
        {feeInvoice && (
          <button
            onClick={() => onOpenReceipt(feeInvoice)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-dark-pill text-white text-xs font-bold hover:bg-dark-hover transition-all shadow-xs cursor-pointer flex-shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Official Fee Receipt</span>
          </button>
        )}
      </div>

      {/* 4 Student KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance */}
        <div className="bg-white rounded-3xl p-5 border border-card-border shadow-card-soft flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted">Attendance Record</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-text-main">96%</div>
            <p className="text-[11px] text-text-muted mt-0.5">112 of 116 working days attended</p>
          </div>
          <div className="w-full bg-card-surface rounded-full h-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '96%' }} />
          </div>
        </div>

        {/* Current Term GPA */}
        <div className="bg-white rounded-3xl p-5 border border-card-border shadow-card-soft flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted">Academic Standing</span>
            <div className="w-8 h-8 rounded-full bg-accent-lime text-dark-pill flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-text-main">Grade A+</div>
            <p className="text-[11px] text-text-muted mt-0.5">Overall 92.4% in Term 1 Exams</p>
          </div>
          <span className="inline-block text-[10px] font-bold text-emerald-600">Top 5% in Class 10-A</span>
        </div>

        {/* Fee Clearance */}
        <div className="bg-white rounded-3xl p-5 border border-card-border shadow-card-soft flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted">Tuition Fee Status</span>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-emerald-600">Paid in Full</div>
            <p className="text-[11px] text-text-muted mt-0.5">₹45,000 cleared for Session 2026-27</p>
          </div>
          <span className="text-[10px] text-text-muted font-medium">Receipt: REC-2026-8801</span>
        </div>

        {/* Next Scheduled Period */}
        <div className="bg-white rounded-3xl p-5 border border-card-border shadow-card-soft flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-text-muted">Next Scheduled Period</span>
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-lg font-extrabold text-text-main">Mathematics</div>
            <p className="text-[11px] text-text-muted mt-0.5">Mrs. Sunita Deshmukh • Room 204</p>
          </div>
          <span className="text-[10px] font-bold text-purple-600">08:30 AM - 09:15 AM</span>
        </div>
      </div>

      {/* Main Content Area based on SubTab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Marks / Timetable */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-card-border shadow-card-soft">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-bold text-text-main">Term 1 Official Grade Sheet</h3>
              <p className="text-xs text-text-muted">CBSE Evaluation & Examination Cell</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-accent-lime text-dark-pill text-xs font-bold">
              Class 10-A
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-card-border">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-card-surface/60 border-b border-card-border text-[10px] font-bold text-text-muted uppercase">
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Exam Type</th>
                  <th className="py-3 px-4">Marks Obtained</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Teacher Evaluation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border/60">
                {studentMarks.map((m) => (
                  <tr key={m.id} className="hover:bg-card-surface/30">
                    <td className="py-3 px-4 font-bold text-text-main">{m.subject}</td>
                    <td className="py-3 px-4 text-text-muted">{m.examType}</td>
                    <td className="py-3 px-4 font-extrabold text-dark-pill">
                      {m.marksObtained} <span className="text-[10px] text-text-muted font-normal">/ {m.maxMarks}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-accent-lime text-dark-pill font-extrabold text-[10px]">
                        Grade {m.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-text-muted">{m.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Homework / Daily Notice for Student */}
        <div className="lg:col-span-4 space-y-5">
          {/* Homework & Lab Task List */}
          <div className="bg-white rounded-3xl p-6 border border-card-border shadow-card-soft">
            <h3 className="text-base font-bold text-text-main mb-4 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-dark-pill" />
              <span>Pending Assignments</span>
            </h3>

            <div className="space-y-3">
              {[
                { title: 'Physics Numerical Problem Set 4', subject: 'Physics', due: 'Tomorrow, 09:00 AM', status: 'Pending' },
                { title: 'Mathematics Polynomials Exercise 2.3', subject: 'Maths', due: '26 Oct 2026', status: 'Submitted' },
                { title: 'AI Python Model Training Exercise', subject: 'Computer', due: '28 Oct 2026', status: 'Pending' },
              ].map((hw, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-card-surface border border-card-border/60 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-text-muted uppercase">{hw.subject}</span>
                    <h5 className="text-xs font-bold text-text-main mt-0.5">{hw.title}</h5>
                    <p className="text-[10px] text-text-muted mt-1">Due: {hw.due}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    hw.status === 'Submitted' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {hw.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
