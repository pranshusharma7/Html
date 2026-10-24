'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { AuthUser, ROLE_DEFINITIONS } from '@/lib/auth';
import { Student, Staff, FeeInvoice } from '@/lib/types';

// Helper for Role Header Banner
export const RoleHeaderBanner: React.FC<{ user: AuthUser }> = ({ user }) => {
  const meta = ROLE_DEFINITIONS[user.role];
  return (
    <div className="bg-dark-pill text-white p-6 md:p-8 rounded-[32px] shadow-lg mb-8 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="px-3 py-1 rounded-full bg-accent-lime text-dark-pill text-[11px] font-extrabold uppercase tracking-wider">
              {user.role.replace(/_/g, ' ')}
            </span>
            <span className="text-white/60 text-xs font-semibold">Active Unique ID: <strong className="text-white font-mono">{user.identifier}</strong></span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">{user.name}</h1>
          <p className="text-white/70 text-xs font-medium mt-1">{user.designation} • Apex International Academy</p>
        </div>

        {/* Security / Kaam & Limit Pill */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl max-w-md text-xs space-y-1">
          <div className="text-accent-lime font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Role Scope & Security Limits:</span>
          </div>
          <p className="text-white/80 text-[11px] leading-relaxed"><strong className="text-white">Kaam:</strong> {meta?.kaam}</p>
          <p className="text-white/60 text-[10px] leading-relaxed"><strong className="text-rose-300">Limit:</strong> {meta?.limit}</p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. PRINCIPAL PORTAL
// ============================================================================
export const PrincipalPortal: React.FC<{
  user: AuthUser;
  students?: Student[];
  staff: Staff[];
  fees: FeeInvoice[];
  onTriggerToast: (msg: string) => void;
}> = ({ user, staff, fees, onTriggerToast }) => {
  const [pendingApprovals, setPendingApprovals] = useState([
    { id: 'APP-101', type: 'New Admission', title: 'Aarav Malhotra (Class 11-Science)', date: 'Today, 10:30 AM', status: 'Pending' },
    { id: 'APP-102', type: 'Staff Casual Leave', title: 'Mr. Rajesh Verma (Mathematics - 2 Days)', date: 'Today, 09:15 AM', status: 'Pending' },
    { id: 'APP-103', type: 'TC Issuance', title: 'Priya Sen (Class 8 Transfer to Delhi)', date: 'Yesterday', status: 'Pending' },
    { id: 'APP-104', type: 'Fee Concession Request', title: 'Kunal Joshi (EWS Quota 40% Waiver)', date: 'Yesterday', status: 'Pending' },
  ]);

  const handleApprove = (id: string, title: string) => {
    setPendingApprovals(pendingApprovals.filter(a => a.id !== id));
    onTriggerToast(`Approved: ${title}`);
  };

  const handleReject = (id: string, title: string) => {
    setPendingApprovals(pendingApprovals.filter(a => a.id !== id));
    onTriggerToast(`Rejected: ${title}`);
  };

  const totalFeeCollected = fees.reduce((acc, f) => acc + f.paidAmount, 0);

  return (
    <div className="space-y-6">
      <RoleHeaderBanner user={user} />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Total Enrolled</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">2,450</div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> 94.6% School Attendance Today
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Teaching Faculty</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">{staff.length} Present</div>
          <span className="text-[11px] text-text-muted mt-1 block">3 On Approved Leave</span>
        </div>

        <div className="bg-accent-lime p-5 rounded-3xl text-dark-pill shadow-xs">
          <span className="text-[11px] font-bold text-dark-pill/70 uppercase tracking-wider">Fee Collection Summary</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">₹{totalFeeCollected.toLocaleString('en-IN')}</div>
          <span className="text-[11px] font-bold text-dark-pill/80 mt-1 block">Read-Only View • Zero Edit Permissions</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Pending Approvals</span>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">{pendingApprovals.length} Requests</div>
          <span className="text-[11px] text-text-muted mt-1 block">Admissions, Leaves & TCs</span>
        </div>
      </div>

      {/* Main Approval Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white p-6 rounded-[32px] border border-card-border shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-extrabold text-dark-pill">Principal Approval Queue</h2>
              <p className="text-xs text-text-muted">Admissions, Staff Leaves, and Transfer Certificates pending your signature</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold">
              {pendingApprovals.length} Actions Required
            </span>
          </div>

          {pendingApprovals.length === 0 ? (
            <div className="p-8 text-center bg-card-surface rounded-2xl text-xs text-text-muted font-medium">
              All approval requests have been processed! No pending items.
            </div>
          ) : (
            <div className="space-y-3">
              {pendingApprovals.map((req) => (
                <div key={req.id} className="p-4 rounded-2xl bg-card-surface border border-card-border flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-dark-pill text-white tracking-wider">
                      {req.type}
                    </span>
                    <h3 className="text-sm font-bold text-dark-pill mt-1.5">{req.title}</h3>
                    <p className="text-[11px] text-text-muted flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3 h-3" /> Submitted: {req.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReject(req.id, req.title)}
                      className="px-3 py-1.5 rounded-xl border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(req.id, req.title)}
                      className="px-4 py-1.5 rounded-xl bg-dark-pill hover:bg-black text-white text-xs font-bold transition-all shadow-xs"
                    >
                      Approve & Sign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Policy & School Audit Widget */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card-surface p-6 rounded-[32px] border border-card-border">
            <h3 className="text-sm font-extrabold text-dark-pill mb-3">Principal Security Limits</h3>
            <div className="space-y-2 text-xs text-text-muted">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Full school academic monitoring & circular issuance.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Admission, TC & Fee Concession final authorization.</span>
              </div>
              <div className="flex items-start gap-2 text-rose-600 font-medium">
                <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Strict Limit: Cannot edit or delete accounting fee vouchers.</span>
              </div>
              <div className="flex items-start gap-2 text-rose-600 font-medium">
                <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Strict Limit: Database & root system credentials locked.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. VICE PRINCIPAL / ACADEMIC COORDINATOR PORTAL
// ============================================================================
export const VicePrincipalPortal: React.FC<{
  user: AuthUser;
  staff?: Staff[];
  onTriggerToast: (msg: string) => void;
}> = ({ user, onTriggerToast }) => {
  const [substitutions, setSubstitutions] = useState([
    { period: 'Period 2 (09:40 AM)', absentTeacher: 'Dr. Alok Nath (Physics - 10A)', substitute: 'Assigning...', status: 'Pending' },
    { period: 'Period 5 (12:15 PM)', absentTeacher: 'Mrs. S. Gupta (Chemistry - 12B)', substitute: 'Mr. R. Verma (Science Lab)', status: 'Assigned' },
  ]);

  return (
    <div className="space-y-6">
      <RoleHeaderBanner user={user} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Syllabus Completion</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">78.4%</div>
          <span className="text-[11px] text-emerald-600 font-semibold">On Track for CBSE Pre-Boards</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Teacher Substitutions</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">1 Required Today</div>
          <span className="text-[11px] text-text-muted">Period 2 unallocated</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Lesson Plans Reviewed</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">42 / 48</div>
          <span className="text-[11px] text-text-muted">6 pending feedback</span>
        </div>
        <div className="bg-[#121418] p-5 rounded-3xl text-white shadow-xs">
          <span className="text-[11px] font-bold text-accent-lime uppercase tracking-wider">Security Access Limit</span>
          <div className="text-sm font-bold text-white mt-1">Financial Data Hidden</div>
          <span className="text-[11px] text-white/60">Staff salaries & fee accounts restricted</span>
        </div>
      </div>

      {/* Teacher Substitution Allocation Matrix */}
      <div className="bg-white p-6 rounded-[32px] border border-card-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-dark-pill">Daily Teacher Substitution Matrix</h2>
            <p className="text-xs text-text-muted">Allocate proxy teachers for absent faculty to prevent free periods</p>
          </div>
          <button 
            onClick={() => {
              setSubstitutions(substitutions.map(s => ({ ...s, substitute: 'Mr. Arvind Joshi (Math)', status: 'Assigned' })));
              onTriggerToast("Substitutions automatically assigned based on free slots!");
            }}
            className="px-4 py-2 rounded-xl bg-accent-lime text-dark-pill font-bold text-xs hover:bg-[#d8e67a] transition-all cursor-pointer"
          >
            Auto-Allocate Proxies
          </button>
        </div>

        <div className="space-y-3">
          {substitutions.map((sub, i) => (
            <div key={i} className="p-4 rounded-2xl bg-card-surface border border-card-border flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-dark-pill">{sub.period}</span>
                <div className="text-xs text-text-muted mt-0.5">Absent: <strong className="text-rose-600">{sub.absentTeacher}</strong></div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${sub.status === 'Assigned' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                  Proxy: {sub.substitute}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. CLASS TEACHER PORTAL (CLASS 10-A)
// ============================================================================
export const ClassTeacherPortal: React.FC<{
  user: AuthUser;
  students: Student[];
  onTriggerToast: (msg: string) => void;
}> = ({ user, students, onTriggerToast }) => {
  const classStudents = students.filter(s => s.class === '10');

  return (
    <div className="space-y-6">
      <RoleHeaderBanner user={user} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Assigned Roster</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">{classStudents.length} Students (Class 10-A)</div>
          <span className="text-[11px] text-text-muted">Strict access: Other classes locked</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Today&apos;s Class Attendance</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">96.8% Marked</div>
          <span className="text-[11px] text-text-muted">Synced with parent notifications</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Fee Overview Scope</span>
          <div className="text-sm font-bold text-dark-pill mt-1">Status Only (Paid / Pending)</div>
          <span className="text-[11px] text-rose-500 font-semibold">Detailed fee amounts hidden by RBAC policy</span>
        </div>
      </div>

      {/* Class 10-A Student Table */}
      <div className="bg-white p-6 rounded-[32px] border border-card-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-dark-pill">Class 10-A Student Progress & Parent Contact</h2>
          <button 
            onClick={() => onTriggerToast("Parent broadcast sent to all Class 10-A guardians via WhatsApp & SMS")}
            className="px-4 py-2 rounded-xl bg-dark-pill text-white text-xs font-bold hover:bg-black transition-all"
          >
            Broadcast to Parents
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-card-border text-text-muted font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Roll #</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3">Attendance</th>
                <th className="py-3 px-3">Guardian</th>
                <th className="py-3 px-3">Fee Status (Amount Hidden)</th>
                <th className="py-3 px-3 text-right">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {classStudents.map((s) => (
                <tr key={s.id} className="hover:bg-card-surface/50">
                  <td className="py-3 px-3 font-mono font-bold text-dark-pill">{s.rollNo}</td>
                  <td className="py-3 px-3 font-bold text-dark-pill">{s.name}</td>
                  <td className="py-3 px-3 text-emerald-600 font-semibold">{s.attendancePct}%</td>
                  <td className="py-3 px-3">{s.guardian} ({s.phone})</td>
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${s.feeStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                      {s.feeStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button 
                      onClick={() => onTriggerToast(`Remarks saved for ${s.name}: Excellent academic participation`)}
                      className="text-xs text-dark-pill hover:underline font-bold"
                    >
                      Add Remark
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 5. SUBJECT TEACHER PORTAL (PHYSICS)
// ============================================================================
export const SubjectTeacherPortal: React.FC<{
  user: AuthUser;
  onTriggerToast: (msg: string) => void;
}> = ({ user, onTriggerToast }) => {
  return (
    <div className="space-y-6">
      <RoleHeaderBanner user={user} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Subject Scope</span>
          <div className="text-xl font-extrabold text-dark-pill mt-1">Physics & Mechanics</div>
          <span className="text-[11px] text-text-muted">Assigned Classes: 10-A, 11-B, 12-A</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Next Period</span>
          <div className="text-xl font-extrabold text-emerald-600 mt-1">Period 3 (10:30 AM)</div>
          <span className="text-[11px] text-text-muted">Class 12-A Physics Lab 2</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Homework Assignments</span>
          <div className="text-xl font-extrabold text-dark-pill mt-1">3 Active Uploads</div>
          <span className="text-[11px] text-text-muted">Optics & Wave Theory Chapters</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-card-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-dark-pill">Upload Study Material & Homework</h2>
          <button 
            onClick={() => onTriggerToast("Physics Chapter 8 'Electromagnetism' PDF published to Students Portal!")}
            className="px-4 py-2 rounded-xl bg-accent-lime text-dark-pill font-bold text-xs hover:bg-[#d8e67a]"
          >
            + Upload New Assignment PDF
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-card-surface border border-card-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-dark-pill text-xs">Class 10-A: Laws of Motion Numerical Worksheet</span>
            <span className="text-emerald-600 font-bold text-[11px]">Due: Tomorrow</span>
          </div>
          <p className="text-xs text-text-muted">Published yesterday • 38/40 submissions received.</p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 8. ACCOUNTANT / FEE MANAGER PORTAL
// ============================================================================
export const AccountantPortal: React.FC<{
  user: AuthUser;
  fees: FeeInvoice[];
  onOpenReceipt: (inv: FeeInvoice) => void;
  onCollectPayment: (inv: FeeInvoice) => void;
}> = ({ user, fees, onOpenReceipt, onCollectPayment }) => {
  const totalCollected = fees.reduce((acc, f) => acc + f.paidAmount, 0);
  const totalDue = fees.reduce((acc, f) => acc + f.dueAmount, 0);

  return (
    <div className="space-y-6">
      <RoleHeaderBanner user={user} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-accent-lime p-5 rounded-3xl text-dark-pill shadow-xs">
          <span className="text-[11px] font-bold text-dark-pill/70 uppercase tracking-wider">Total Fee Collected</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">₹{totalCollected.toLocaleString('en-IN')}</div>
          <span className="text-[11px] font-bold text-dark-pill/80">Current Academic Term</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Outstanding Dues</span>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">₹{totalDue.toLocaleString('en-IN')}</div>
          <span className="text-[11px] text-text-muted">14 Defaulters flagged</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Staff Payroll Queue</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">₹34.8 Lakhs</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Processed for October</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Audit Log Status</span>
          <div className="text-sm font-bold text-dark-pill mt-1">Full Ledger Tracking</div>
          <span className="text-[11px] text-text-muted">Fee concessions require Principal approval</span>
        </div>
      </div>

      {/* Fee Invoices & Collection Ledger */}
      <div className="bg-white p-6 rounded-[32px] border border-card-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-dark-pill">Fee Collection & Verified Receipts</h2>
            <p className="text-xs text-text-muted">Collect fees and generate verified printable CBSE invoices</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-card-border text-text-muted font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Invoice No</th>
                <th className="py-3 px-3">Student</th>
                <th className="py-3 px-3">Class</th>
                <th className="py-3 px-3">Total Fee</th>
                <th className="py-3 px-3">Paid</th>
                <th className="py-3 px-3">Dues</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Accounting Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {fees.map((inv) => (
                <tr key={inv.id} className="hover:bg-card-surface/50">
                  <td className="py-3 px-3 font-mono font-bold text-dark-pill">{inv.invoiceNo}</td>
                  <td className="py-3 px-3 font-bold text-dark-pill">{inv.studentName}</td>
                  <td className="py-3 px-3">{inv.class}</td>
                  <td className="py-3 px-3 font-semibold">₹{inv.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 text-emerald-600 font-bold">₹{inv.paidAmount.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 text-rose-600 font-bold">₹{inv.dueAmount.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    {inv.status !== 'Paid' && (
                      <button 
                        onClick={() => onCollectPayment(inv)}
                        className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700"
                      >
                        Collect Fee
                      </button>
                    )}
                    <button 
                      onClick={() => onOpenReceipt(inv)}
                      className="px-3 py-1 rounded-lg bg-dark-pill text-white font-bold text-[11px] hover:bg-black"
                    >
                      Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 9. ADMISSION OFFICER / RECEPTIONIST PORTAL
// ============================================================================
export const AdmissionOfficerPortal: React.FC<{
  user: AuthUser;
  onOpenNewAdmission: () => void;
  onTriggerToast: (msg: string) => void;
}> = ({ user, onOpenNewAdmission, onTriggerToast }) => {
  const [enquiries] = useState([
    { id: 'ENQ-01', parent: 'Dr. Sameer Kapoor', child: 'Rohan Kapoor', classApplied: 'Class 6', phone: '+91 98200 12345', status: 'Documents Pending' },
    { id: 'ENQ-02', parent: 'Mrs. Sunita Rao', child: 'Aditi Rao', classApplied: 'Class 11 Science', phone: '+91 98111 67890', status: 'Submitted to Principal' },
    { id: 'ENQ-03', parent: 'Mr. Arvind Saxena', child: 'Dev Saxena', classApplied: 'Class 1', phone: '+91 98999 54321', status: 'Enquiry Open' },
  ]);

  return (
    <div className="space-y-6">
      <RoleHeaderBanner user={user} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">New Enquiries This Week</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">28 Candidates</div>
          <span className="text-[11px] text-emerald-600 font-semibold">+12% vs last session</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Principal Approval Pending</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">6 Applications</div>
          <span className="text-[11px] text-text-muted">Awaiting final signoff</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Visitor Gate Registrations</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">14 Today</div>
          <span className="text-[11px] text-text-muted">Parent visits & campus tours</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-card-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-dark-pill">Admission Pipeline & Document Checklist</h2>
            <p className="text-xs text-text-muted">Submit verified dossiers for Principal confirmation</p>
          </div>
          <button 
            onClick={onOpenNewAdmission}
            className="px-4 py-2 rounded-xl bg-accent-lime text-dark-pill font-bold text-xs hover:bg-[#d8e67a]"
          >
            + Register New Admission
          </button>
        </div>

        <div className="space-y-3">
          {enquiries.map((enq) => (
            <div key={enq.id} className="p-4 rounded-2xl bg-card-surface border border-card-border flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-dark-pill">{enq.id}</span>
                <h3 className="text-sm font-bold text-dark-pill mt-0.5">{enq.child} ({enq.classApplied})</h3>
                <p className="text-xs text-text-muted">Parent: {enq.parent} • Phone: {enq.phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700">
                  {enq.status}
                </span>
                <button 
                  onClick={() => onTriggerToast(`Dossier for ${enq.child} forwarded to Principal for authorization!`)}
                  className="px-3 py-1.5 rounded-xl bg-dark-pill text-white text-xs font-bold hover:bg-black"
                >
                  Forward to Principal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 10. HR MANAGER PORTAL
// ============================================================================
export const HRManagerPortal: React.FC<{
  user: AuthUser;
  staff: Staff[];
  onTriggerToast: (msg: string) => void;
}> = ({ user, staff, onTriggerToast }) => {
  return (
    <div className="space-y-6">
      <RoleHeaderBanner user={user} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Total Staff</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">{staff.length} Active</div>
          <span className="text-[11px] text-text-muted">Teaching & Non-Teaching</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Biometric Attendance</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">98.2% Checked In</div>
          <span className="text-[11px] text-text-muted">Staff RFID Gate Sync</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Leave Applications</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">3 Under Review</div>
          <span className="text-[11px] text-text-muted">Casual & Medical Leave</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Security Limit</span>
          <div className="text-sm font-bold text-dark-pill mt-1">Student Marks Hidden</div>
          <span className="text-[11px] text-text-muted">Staff payroll & records only</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-card-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-dark-pill">Staff Directory & Payroll Allocations</h2>
          <button 
            onClick={() => onTriggerToast("Staff biometric attendance report exported to HR payroll software!")}
            className="px-4 py-2 rounded-xl bg-dark-pill text-white text-xs font-bold hover:bg-black"
          >
            Export Payroll Sheet
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-card-border text-text-muted font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Emp Code</th>
                <th className="py-3 px-3">Staff Name</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Designation</th>
                <th className="py-3 px-3">Monthly Salary</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border">
              {staff.map((st) => (
                <tr key={st.id} className="hover:bg-card-surface/50">
                  <td className="py-3 px-3 font-mono font-bold text-dark-pill">{st.empCode}</td>
                  <td className="py-3 px-3 font-bold text-dark-pill">{st.name}</td>
                  <td className="py-3 px-3">{st.department}</td>
                  <td className="py-3 px-3">{st.designation}</td>
                  <td className="py-3 px-3 font-semibold text-emerald-700">₹{st.salary.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                      {st.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 11. LIBRARIAN PORTAL
// ============================================================================
export const LibrarianPortal: React.FC<{
  user: AuthUser;
  onTriggerToast: (msg: string) => void;
}> = ({ user, onTriggerToast }) => {
  const [issuedBooks] = useState([
    { id: 'BK-101', title: 'Concepts of Physics (Vol 1) - H.C. Verma', borrower: 'Aarav Sharma (Roll #101)', dueDate: '28 Oct 2026', fine: '₹0' },
    { id: 'BK-102', title: 'Brief Answers to Big Questions - S. Hawking', borrower: 'Dr. Alok Nath (Staff)', dueDate: '15 Nov 2026', fine: '₹0' },
    { id: 'BK-103', title: 'CBSE Mathematics Exemplar Class 10', borrower: 'Priya Sen (Roll #104)', dueDate: '20 Oct 2026', fine: '₹20 (Overdue)' },
  ]);

  return (
    <div className="space-y-6">
      <RoleHeaderBanner user={user} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Total Catalog Titles</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">18,450 Books</div>
          <span className="text-[11px] text-text-muted">450 New acquisitions added</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Currently Issued</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">480 Books</div>
          <span className="text-[11px] text-text-muted">380 Students • 100 Staff</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Overdue Dues</span>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">12 Books</div>
          <span className="text-[11px] text-text-muted">Library fines applicable</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Security Limit</span>
          <div className="text-sm font-bold text-dark-pill mt-1">Fine Records Only</div>
          <span className="text-[11px] text-text-muted">School academic fees inaccessible</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-card-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-dark-pill">Library Circulation & Issue Tracker</h2>
          <button 
            onClick={() => onTriggerToast("Barcode scanner initialized for Book Issue / Return!")}
            className="px-4 py-2 rounded-xl bg-accent-lime text-dark-pill font-bold text-xs hover:bg-[#d8e67a]"
          >
            + Scan ISBN / Issue Book
          </button>
        </div>

        <div className="space-y-3">
          {issuedBooks.map((b) => (
            <div key={b.id} className="p-4 rounded-2xl bg-card-surface border border-card-border flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-dark-pill">{b.id}</span>
                <h3 className="text-sm font-bold text-dark-pill mt-0.5">{b.title}</h3>
                <p className="text-xs text-text-muted">Borrower: <strong>{b.borrower}</strong> • Due: {b.dueDate}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-rose-600">{b.fine}</span>
                <button 
                  onClick={() => onTriggerToast(`Book ${b.title} returned and restocked in Library Shelf!`)}
                  className="px-3 py-1.5 rounded-xl bg-dark-pill text-white text-xs font-bold hover:bg-black"
                >
                  Return Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 12. TRANSPORT MANAGER PORTAL
// ============================================================================
export const TransportPortal: React.FC<{
  user: AuthUser;
  onTriggerToast: (msg: string) => void;
}> = ({ user, onTriggerToast }) => {
  const [buses] = useState([
    { route: 'Route #4 (South City)', busNo: 'DL-01-AB-4040', driver: 'Manoj Kumar (+91 98111 22334)', students: 48, speed: '38 km/h', location: 'Near Civil Lines Crossing', status: 'On Schedule' },
    { route: 'Route #7 (North Ring)', busNo: 'DL-01-AB-7070', driver: 'Surinder Singh (+91 98222 33445)', students: 42, speed: '42 km/h', location: 'Arrived at School Gate', status: 'Arrived' },
    { route: 'Route #11 (East Express)', busNo: 'DL-01-AB-1111', driver: 'Rajinder Pal (+91 98333 44556)', students: 50, speed: '35 km/h', location: 'Crossing Flyover Sector 14', status: 'On Schedule' },
  ]);

  return (
    <div className="space-y-6">
      <RoleHeaderBanner user={user} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Active Bus Fleet</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">12 Vehicles</div>
          <span className="text-[11px] text-emerald-600 font-semibold">100% GPS Live Tracking</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Students in Transit</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">540 Commuters</div>
          <span className="text-[11px] text-text-muted">Across 18 bus stops</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Fleet Maintenance</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">Fitness Valid</div>
          <span className="text-[11px] text-text-muted">Speed governors & CCTV active</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">RBAC Security Limit</span>
          <div className="text-sm font-bold text-dark-pill mt-1">Transport Dues Only</div>
          <span className="text-[11px] text-text-muted">Academic marks and tuition fees hidden</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-card-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-dark-pill">Live GPS Fleet Tracking & Driver Roster</h2>
            <p className="text-xs text-text-muted">Real-time telematics with live bus locations transmitted to parent app</p>
          </div>
          <button 
            onClick={() => onTriggerToast("Fleet broadcast SMS sent to parents of Route #4 and #11")}
            className="px-4 py-2 rounded-xl bg-accent-lime text-dark-pill font-bold text-xs hover:bg-[#d8e67a]"
          >
            Broadcast Route Alert
          </button>
        </div>

        <div className="space-y-3">
          {buses.map((bus, i) => (
            <div key={i} className="p-4 rounded-2xl bg-card-surface border border-card-border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-dark-pill">{bus.route}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-dark-pill text-white">{bus.busNo}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">{bus.status}</span>
                </div>
                <p className="text-xs text-text-muted mt-1">Driver: {bus.driver} • {bus.students} Students onboard</p>
                <div className="text-xs font-semibold text-emerald-700 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>GPS Telemetry: {bus.location} (Speed: {bus.speed})</span>
                </div>
              </div>

              <button 
                onClick={() => onTriggerToast(`Live GPS satellite feed opened for ${bus.busNo}`)}
                className="px-4 py-2 rounded-xl bg-dark-pill text-white text-xs font-bold hover:bg-black self-start md:self-auto"
              >
                Track Live Map
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 13. HOSTEL WARDEN PORTAL
// ============================================================================
export const HostelWardenPortal: React.FC<{
  user: AuthUser;
  onTriggerToast: (msg: string) => void;
}> = ({ user, onTriggerToast }) => {
  const [outpasses, setOutpasses] = useState([
    { student: 'Kabir Singhania (Class 11 - Room 204)', reason: 'Family Medical Emergency (Jaipur)', duration: '2 Days', parentVerified: 'Yes (Called)', status: 'Pending' },
    { student: 'Naveen Reddy (Class 12 - Room 310)', reason: 'Weekend Coaching Exam', duration: 'Tomorrow 9am - 5pm', parentVerified: 'Yes (SMS)', status: 'Pending' },
  ]);

  return (
    <div className="space-y-6">
      <RoleHeaderBanner user={user} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Hostel Occupancy</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">210 Residents</div>
          <span className="text-[11px] text-text-muted">Boys Block A & Girls Block B</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Pending Outpasses</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{outpasses.length} Requests</div>
          <span className="text-[11px] text-text-muted">Parent confirmation verified</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Today&apos;s Mess Menu</span>
          <div className="text-sm font-bold text-dark-pill mt-1">Dinner: Paneer Butter Masala, Roti, Dal, Kheer</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Nutritionist approved</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Security Limit</span>
          <div className="text-sm font-bold text-dark-pill mt-1">Hostel Data Only</div>
          <span className="text-[11px] text-text-muted">Academic marks & school fee details hidden</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-card-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-dark-pill">Hostel Outpass & Weekend Leave Approvals</h2>
          <button 
            onClick={() => onTriggerToast("Night Roll Call completed! All 208 hostellers accounted in rooms.")}
            className="px-4 py-2 rounded-xl bg-accent-lime text-dark-pill font-bold text-xs hover:bg-[#d8e67a]"
          >
            Mark Night Roll Call (10 PM)
          </button>
        </div>

        <div className="space-y-3">
          {outpasses.map((o, i) => (
            <div key={i} className="p-4 rounded-2xl bg-card-surface border border-card-border flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-dark-pill">{o.student}</h3>
                <p className="text-xs text-text-muted">Reason: {o.reason} • Duration: {o.duration}</p>
                <span className="text-[11px] text-emerald-600 font-bold">Parent Consent: {o.parentVerified}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setOutpasses(outpasses.filter((_, idx) => idx !== i));
                    onTriggerToast(`Outpass approved for ${o.student}! Digital gate pass sent to Security Gate.`);
                  }}
                  className="px-4 py-2 rounded-xl bg-dark-pill text-white text-xs font-bold hover:bg-black"
                >
                  Approve & Issue Gate Pass
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 14. EXAM CONTROLLER PORTAL
// ============================================================================
export const ExamControllerPortal: React.FC<{
  user: AuthUser;
  onTriggerToast: (msg: string) => void;
}> = ({ user, onTriggerToast }) => {
  return (
    <div className="space-y-6">
      <RoleHeaderBanner user={user} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Exam Status</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">Term 1 Final</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Results Processed 100%</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Hall Tickets Generated</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">2,450 Issued</div>
          <span className="text-[11px] text-text-muted">QR Code verified</span>
        </div>
        <div className="bg-accent-lime p-5 rounded-3xl text-dark-pill shadow-xs">
          <span className="text-[11px] font-bold text-dark-pill/70 uppercase tracking-wider">Results Publication</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">Published & Locked</div>
          <span className="text-[11px] font-bold text-dark-pill/80">Audit log mandatory for changes</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Security Limit</span>
          <div className="text-sm font-bold text-dark-pill mt-1">No Payroll or Fees</div>
          <span className="text-[11px] text-text-muted">Strict exam results moderation scope</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-card-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-dark-pill">CBSE Board Exam Moderation & Results Lock</h2>
            <p className="text-xs text-text-muted">Published marks are locked. Any moderation requires audit log entry and Principal counter-signature.</p>
          </div>
          <button 
            onClick={() => onTriggerToast("Official CBSE Marksheets PDF exported for batch 2026-27!")}
            className="px-4 py-2 rounded-xl bg-dark-pill text-white text-xs font-bold hover:bg-black"
          >
            Export Batch Marksheets
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-card-surface border border-card-border flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-dark-pill">Class 10 CBSE Pre-Board Examination Results</h3>
            <p className="text-xs text-text-muted mt-0.5">Average Score: 84.6% • Topper: Aarav Sharma (96.4%)</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            Locked & Digitally Signed
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 15. MEDICAL / SCHOOL NURSE PORTAL
// ============================================================================
export const NursePortal: React.FC<{
  user: AuthUser;
  onTriggerToast: (msg: string) => void;
}> = ({ user, onTriggerToast }) => {
  const [clinicVisits] = useState([
    { time: '09:15 AM', student: 'Rohan Sen (Class 4-B)', issue: 'Mild headache & fever (99.8°F)', treatment: 'Paracetamol syrup + 30 min bed rest', status: 'Sent back to class' },
    { time: '11:40 AM', student: 'Simran Kaur (Class 9-A)', issue: 'Sprained left ankle during basketball', treatment: 'Cold compress, crepe bandage, parent notified', status: 'Resting in infirmary' },
  ]);

  return (
    <div className="space-y-6">
      <RoleHeaderBanner user={user} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Infirmary Visits Today</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">6 Patients</div>
          <span className="text-[11px] text-emerald-600 font-semibold">1 Resting in bed</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Critical Allergies Logged</span>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">18 Students</div>
          <span className="text-[11px] text-text-muted">Peanut, dust, penicillin alerts</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Annual Health Checkup</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">92% Screened</div>
          <span className="text-[11px] text-text-muted">Vision, dental, BMI records</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">HIPAA / RBAC Limit</span>
          <div className="text-sm font-bold text-dark-pill mt-1">Health Records Only</div>
          <span className="text-[11px] text-text-muted">Confidential medical records protected</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-card-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-dark-pill">Infirmary Daily Clinic Patient Log</h2>
          <button 
            onClick={() => onTriggerToast("New patient check-in recorded & parent notified via SMS")}
            className="px-4 py-2 rounded-xl bg-accent-lime text-dark-pill font-bold text-xs hover:bg-[#d8e67a]"
          >
            + New Clinic Check-in
          </button>
        </div>

        <div className="space-y-3">
          {clinicVisits.map((v, i) => (
            <div key={i} className="p-4 rounded-2xl bg-card-surface border border-card-border flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-dark-pill">{v.time}</span>
                <h3 className="text-sm font-bold text-dark-pill mt-0.5">{v.student}</h3>
                <p className="text-xs text-text-muted">Complaint: {v.issue}</p>
                <p className="text-xs text-emerald-700 font-medium">Rx: {v.treatment}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-dark-pill text-white">
                {v.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 16. SECURITY / GATEKEEPER PORTAL
// ============================================================================
export const SecurityPortal: React.FC<{
  user: AuthUser;
  onTriggerToast: (msg: string) => void;
}> = ({ user, onTriggerToast }) => {
  const [visitorPasses, setVisitorPasses] = useState([
    { passNo: 'GATE-091', visitor: 'Sunil Mathur', purpose: 'Parent Meeting with Principal', timeIn: '10:45 AM', idProof: 'Aadhaar Verified', status: 'Inside Campus' },
    { passNo: 'GATE-092', visitor: 'BlueDart Courier Agent', purpose: 'Admin Parcel Delivery', timeIn: '11:15 AM', idProof: 'Company ID', status: 'Inside Campus' },
  ]);

  return (
    <div className="space-y-6">
      <RoleHeaderBanner user={user} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Visitors Inside Campus</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{visitorPasses.length} Visitors</div>
          <span className="text-[11px] text-text-muted">Checked in at Gate #1</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Early Student Departure</span>
          <div className="text-2xl font-extrabold text-dark-pill mt-1">2 QR Scans</div>
          <span className="text-[11px] text-emerald-600 font-semibold">Principal Approved Passes</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">Gate Status</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">Gates 1, 2, 3 Secure</div>
          <span className="text-[11px] text-text-muted">CCTV 24/7 active</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-card-border shadow-xs">
          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">RBAC Security Limit</span>
          <div className="text-sm font-bold text-dark-pill mt-1">Zero Academic Access</div>
          <span className="text-[11px] text-text-muted">Visitor & gate security only</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-card-border shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-dark-pill">Gate Pass Registry & QR Exit Scanner</h2>
            <p className="text-xs text-text-muted">Verify digital outpasses and scan student departure QR codes</p>
          </div>
          <button 
            onClick={() => onTriggerToast("Visitor Gate Pass #GATE-093 printed & visitor badge issued!")}
            className="px-4 py-2 rounded-xl bg-accent-lime text-dark-pill font-bold text-xs hover:bg-[#d8e67a]"
          >
            + Issue Visitor Entry Pass
          </button>
        </div>

        <div className="space-y-3">
          {visitorPasses.map((p, i) => (
            <div key={i} className="p-4 rounded-2xl bg-card-surface border border-card-border flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-dark-pill">{p.passNo}</span>
                <h3 className="text-sm font-bold text-dark-pill mt-0.5">{p.visitor}</h3>
                <p className="text-xs text-text-muted">Purpose: {p.purpose} • In: {p.timeIn} ({p.idProof})</p>
              </div>
              <button 
                onClick={() => {
                  setVisitorPasses(visitorPasses.filter((_, idx) => idx !== i));
                  onTriggerToast(`Visitor ${p.visitor} checkout recorded. Exit approved at Gate 1.`);
                }}
                className="px-4 py-1.5 rounded-xl bg-dark-pill text-white text-xs font-bold hover:bg-black"
              >
                Mark Out & Exit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
