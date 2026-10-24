'use client';

import React, { useState, useEffect } from 'react';
import { LoginPage } from '@/components/auth/LoginPage';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppNavbar } from '@/components/layout/AppNavbar';
import { HeroHeader } from '@/components/HeroHeader';
import { MiddleCards } from '@/components/MiddleCards';
import { PillBarChart } from '@/components/PillBarChart';
import { RightColumn } from '@/components/RightColumn';
import { StudentsView } from '@/components/views/StudentsView';
import { StaffView } from '@/components/views/StaffView';
import { AttendanceView } from '@/components/views/AttendanceView';
import { FeesView } from '@/components/views/FeesView';
import { ExamsView } from '@/components/views/ExamsView';
import { TimetableView } from '@/components/views/TimetableView';
import { NoticesView } from '@/components/views/NoticesView';
import { StudentPortal } from '@/components/portals/StudentPortal';
import { ParentPortal } from '@/components/portals/ParentPortal';
import {
  RoleHeaderBanner,
  PrincipalPortal,
  VicePrincipalPortal,
  ClassTeacherPortal,
  SubjectTeacherPortal,
  AccountantPortal,
  AdmissionOfficerPortal,
  HRManagerPortal,
  LibrarianPortal,
  TransportPortal,
  HostelWardenPortal,
  ExamControllerPortal,
  NursePortal,
  SecurityPortal
} from '@/components/portals/RolePortals';
import { NewAdmissionModal } from '@/components/modals/NewAdmissionModal';
import { PrintableReceiptModal } from '@/components/modals/PrintableReceiptModal';
import { CollectPaymentModal } from '@/components/modals/CollectPaymentModal';
import { RecordExamMarksModal } from '@/components/modals/RecordExamMarksModal';
import { PublishNoticeModal } from '@/components/modals/PublishNoticeModal';
import { 
  INITIAL_STUDENTS, 
  INITIAL_STAFF, 
  INITIAL_FEES, 
  INITIAL_EXAMS, 
  INITIAL_NOTICES 
} from '@/lib/mockData';
import { Student, Staff, FeeInvoice, ExamRecord, Notice } from '@/lib/types';
import { AuthUser, DEMO_USERS, PortalRole } from '@/lib/auth';

export default function SchoolERPPage() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('overview');

  // Domain State
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF);
  const [fees, setFees] = useState<FeeInvoice[]>(INITIAL_FEES);
  const [exams, setExams] = useState<ExamRecord[]>(INITIAL_EXAMS);
  const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);

  // Modals state
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isRecordMarksModalOpen, setIsRecordMarksModalOpen] = useState(false);
  const [isPublishNoticeModalOpen, setIsPublishNoticeModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<FeeInvoice | null>(null);
  const [selectedFeeForPayment, setSelectedFeeForPayment] = useState<FeeInvoice | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load saved session and sync database on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('APEX_AUTH_USER');
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      } else {
        setCurrentUser(null);
      }
    } catch {
      setCurrentUser(null);
    }
    setIsAuthLoaded(true);

    // Fetch live records from persistent database
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.students?.length) setStudents(data.students);
          if (data.staff?.length) setStaff(data.staff);
          if (data.fees?.length) setFees(data.fees);
          if (data.exams?.length) setExams(data.exams);
          if (data.notices?.length) setNotices(data.notices);
        }
      })
      .catch((err) => console.error('Database sync note:', err));
  }, []);

  const handleLoginSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    localStorage.setItem('APEX_AUTH_USER', JSON.stringify(user));
    setActiveTab('overview');
    triggerToast(`Welcome to Apex Portal, ${user.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('APEX_AUTH_USER');
    triggerToast('Logged out securely.');
  };

  const handleSwitchPortal = (role: PortalRole) => {
    const foundEntry = Object.values(DEMO_USERS).find((entry) => entry.user.role === role);
    if (foundEntry) {
      handleLoginSuccess(foundEntry.user);
    }
  };

  // 1. Add Student (Saved to database)
  const handleAddStudent = async (newStuData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...newStuData,
      id: `STU-${Date.now().toString().slice(-4)}`,
    };
    setStudents([newStudent, ...students]);

    // Create fee invoice
    const newFee: FeeInvoice = {
      id: `FEE-${newStudent.id.split('-')[1]}`,
      invoiceNo: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: newStudent.id,
      studentName: newStudent.name,
      class: `${newStudent.class}-${newStudent.section}`,
      totalAmount: 45000,
      paidAmount: 0,
      dueAmount: 45000,
      status: 'Unpaid',
      lastPaymentDate: '-',
      receiptNo: '-',
      paymentMethod: '-',
    };
    setFees([newFee, ...fees]);

    // Save to persistent database
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addStudent', payload: newStudent }),
      });
    } catch (err) {
      console.error('Error saving student to DB:', err);
    }

    triggerToast(`Student ${newStudent.name} enrolled & saved to database!`);
  };

  // 2. Delete Student
  const handleDeleteStudent = (id: string) => {
    const s = students.find((st) => st.id === id);
    if (s && confirm(`Delete student profile for: ${s.name}?`)) {
      setStudents(students.filter((st) => st.id !== id));
      setFees(fees.filter((f) => f.studentId !== id));
      triggerToast(`Student ${s.name} record deleted.`);
    }
  };

  // 3. Confirm Fee Payment & Issue Receipt
  const handleConfirmPayment = async (invoiceId: string, amount: number, method: string) => {
    const updated = fees.map((f) => {
      if (f.id === invoiceId) {
        const newPaid = f.paidAmount + amount;
        const newDue = Math.max(0, f.totalAmount - newPaid);
        const receiptNo = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        return {
          ...f,
          paidAmount: newPaid,
          dueAmount: newDue,
          status: newDue === 0 ? ('Paid' as const) : ('Partial' as const),
          receiptNo,
          lastPaymentDate: new Date().toISOString().split('T')[0],
          paymentMethod: method,
        };
      }
      return f;
    });
    setFees(updated);
    const updatedInvoice = updated.find((f) => f.id === invoiceId);
    if (updatedInvoice) {
      setSelectedReceipt(updatedInvoice);
    }

    // Save to persistent database
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'payFee', payload: { invoiceId, amount, method } }),
      });
    } catch (err) {
      console.error('Error saving payment to DB:', err);
    }

    triggerToast(`Payment of ₹${amount.toLocaleString('en-IN')} confirmed & receipt issued!`);
  };

  // 4. Record Exam Marks
  const handleSaveMarks = (record: Omit<ExamRecord, 'id'>) => {
    const newRecord: ExamRecord = {
      ...record,
      id: `EXM-${300 + exams.length + 1}`,
    };
    setExams([newRecord, ...exams]);
    triggerToast(`Marks recorded for ${record.studentName} (Grade: ${record.grade})`);
  };

  // 5. Publish Notice
  const handlePublishNotice = async (notice: Omit<Notice, 'id'>) => {
    const newNotice: Notice = {
      ...notice,
      id: `NOT-0${notices.length + 1}`,
    };
    setNotices([newNotice, ...notices]);

    // Save to persistent database
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'addNotice', payload: newNotice }),
      });
    } catch (err) {
      console.error('Error saving notice to DB:', err);
    }

    triggerToast('Notice circular published & saved to database!');
  };

  if (!isAuthLoaded) {
    return <div className="min-h-screen bg-[#121418] flex items-center justify-center text-white text-xs">Loading Apex Enterprise Suite...</div>;
  }

  // If user not authenticated, show stunning 16-Role Login Page
  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Primary student fee invoice for student/parent view
  const primaryStudentFee = fees.find((f) => f.studentId === 'STU-1001') || fees[0];

  return (
    <div className="flex min-h-screen w-full bg-[#F4F6F2] text-[#121418]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-dark-pill text-white px-5 py-3 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 border border-white/20 animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-accent-lime inline-block" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Full Height Professional Sidebar */}
      <AppSidebar
        user={currentUser}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
        onLogout={handleLogout}
      />

      {/* Main Full-Width Application Content Area */}
      <div className="flex-grow flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Navbar */}
        <AppNavbar
          user={currentUser}
          onLogout={handleLogout}
          onSwitchPortal={handleSwitchPortal}
          onOpenNotifications={() => setActiveTab('notices')}
        />

        {/* Dynamic Body Content */}
        <main className="flex-grow p-5 md:p-8 max-w-[1600px] w-full mx-auto">
          
          {/* 1. STUDENT PORTAL */}
          {currentUser.role === 'STUDENT' && (
            <StudentPortal
              user={currentUser}
              exams={exams}
              feeInvoice={primaryStudentFee}
              onOpenReceipt={(inv) => setSelectedReceipt(inv)}
            />
          )}

          {/* 2. PARENT PORTAL */}
          {currentUser.role === 'PARENT' && (
            <ParentPortal
              user={currentUser}
              feeInvoice={primaryStudentFee}
              onOpenReceipt={(inv) => setSelectedReceipt(inv)}
            />
          )}

          {/* 3. PRINCIPAL PORTAL */}
          {currentUser.role === 'PRINCIPAL' && (
            <PrincipalPortal
              user={currentUser}
              students={students}
              staff={staff}
              fees={fees}
              onTriggerToast={triggerToast}
            />
          )}

          {/* 4. VICE PRINCIPAL PORTAL */}
          {currentUser.role === 'VICE_PRINCIPAL' && (
            <VicePrincipalPortal
              user={currentUser}
              staff={staff}
              onTriggerToast={triggerToast}
            />
          )}

          {/* 5. CLASS TEACHER PORTAL */}
          {currentUser.role === 'CLASS_TEACHER' && (
            <ClassTeacherPortal
              user={currentUser}
              students={students}
              onTriggerToast={triggerToast}
            />
          )}

          {/* 6. SUBJECT TEACHER PORTAL */}
          {currentUser.role === 'SUBJECT_TEACHER' && (
            <SubjectTeacherPortal
              user={currentUser}
              onTriggerToast={triggerToast}
            />
          )}

          {/* 7. ACCOUNTANT PORTAL */}
          {currentUser.role === 'ACCOUNTANT' && (
            <AccountantPortal
              user={currentUser}
              fees={fees}
              onOpenReceipt={(inv) => setSelectedReceipt(inv)}
              onCollectPayment={(inv) => setSelectedFeeForPayment(inv)}
            />
          )}

          {/* 8. ADMISSION OFFICER PORTAL */}
          {currentUser.role === 'ADMISSION_OFFICER' && (
            <AdmissionOfficerPortal
              user={currentUser}
              onOpenNewAdmission={() => setIsAdmissionModalOpen(true)}
              onTriggerToast={triggerToast}
            />
          )}

          {/* 9. HR MANAGER PORTAL */}
          {currentUser.role === 'HR_MANAGER' && (
            <HRManagerPortal
              user={currentUser}
              staff={staff}
              onTriggerToast={triggerToast}
            />
          )}

          {/* 10. LIBRARIAN PORTAL */}
          {currentUser.role === 'LIBRARIAN' && (
            <LibrarianPortal
              user={currentUser}
              onTriggerToast={triggerToast}
            />
          )}

          {/* 11. TRANSPORT MANAGER PORTAL */}
          {currentUser.role === 'TRANSPORT_MANAGER' && (
            <TransportPortal
              user={currentUser}
              onTriggerToast={triggerToast}
            />
          )}

          {/* 12. HOSTEL WARDEN PORTAL */}
          {currentUser.role === 'HOSTEL_WARDEN' && (
            <HostelWardenPortal
              user={currentUser}
              onTriggerToast={triggerToast}
            />
          )}

          {/* 13. EXAM CONTROLLER PORTAL */}
          {currentUser.role === 'EXAM_CONTROLLER' && (
            <ExamControllerPortal
              user={currentUser}
              onTriggerToast={triggerToast}
            />
          )}

          {/* 14. NURSE PORTAL */}
          {currentUser.role === 'NURSE' && (
            <NursePortal
              user={currentUser}
              onTriggerToast={triggerToast}
            />
          )}

          {/* 15. SECURITY / GATEKEEPER PORTAL */}
          {currentUser.role === 'SECURITY' && (
            <SecurityPortal
              user={currentUser}
              onTriggerToast={triggerToast}
            />
          )}

          {/* 16. SUPER ADMIN SUITE (ALL MODULES + AUDIT) */}
          {currentUser.role === 'SUPER_ADMIN' && (
            <>
              {/* Role Header Banner for Super Admin */}
              <RoleHeaderBanner user={currentUser} />

              {/* Executive Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Hero Header */}
                  <HeroHeader
                    activeSubTab={activeTab}
                    onSubTabChange={(tab) => setActiveTab(tab)}
                    onCreateClick={() => setIsAdmissionModalOpen(true)}
                    onSettingsClick={() => alert("Apex International Academy • Affiliation: CBSE (No. 2130892) • Academic Session: 2026-2027 • 2FA Active")}
                  />

                  {/* Overview Grid: 3 Middle Stat Cards + Dual-Pill Chart + Right School Actions */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-9 flex flex-col gap-6">
                      <MiddleCards
                        onSendAbsenceAlerts={() => triggerToast("SMS & WhatsApp absence notifications queued for 72 parents!")}
                        onOpenNewAdmission={() => setIsAdmissionModalOpen(true)}
                        onOpenFeeModule={() => setActiveTab('fees')}
                      />
                      <PillBarChart />
                    </div>

                    <div className="lg:col-span-3">
                      <RightColumn
                        onCardClick={(action) => {
                          if (action === 'parent-portal') handleSwitchPortal('PARENT');
                          else if (action === 'teacher-hub') setActiveTab('staff');
                          else if (action === 'cbse-circulars') setActiveTab('notices');
                          else if (action === 'fee-defaulters') setActiveTab('fees');
                          else if (action === 'staff-leaves') setActiveTab('staff');
                          else if (action === 'bus-library') alert("12 Bus GPS trackers active • 480 Library books circulated this week.");
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Students Directory */}
              {activeTab === 'students' && (
                <StudentsView
                  students={students}
                  onAddStudent={() => setIsAdmissionModalOpen(true)}
                  onDeleteStudent={handleDeleteStudent}
                  onViewStudent={(s) => alert(`Student Profile Card:\nName: ${s.name} (${s.admissionNo})\nClass: ${s.class}-${s.section} (Roll #${s.rollNo})\nParent: ${s.guardian} • Phone: ${s.phone}\nAttendance: ${s.attendancePct}% • Fee Status: ${s.feeStatus}`)}
                />
              )}

              {/* Faculty & HR */}
              {activeTab === 'staff' && (
                <StaffView
                  staff={staff}
                  onAddFaculty={() => {
                    const name = prompt("Enter Faculty Name:");
                    const dept = prompt("Enter Department (Science / Mathematics / Languages):") || "General";
                    if (name) {
                      const newMember: Staff = {
                        id: `FAC-${200 + staff.length + 1}`,
                        empCode: `EMP-${100 + staff.length + 1}`,
                        name,
                        department: dept,
                        designation: "PGT Faculty",
                        qualification: "Post Graduate, B.Ed",
                        experience: "5+ Years",
                        phone: "+91 98111 00000",
                        email: `${name.toLowerCase().replace(/\s+/g, '.')}@apexacademy.edu`,
                        status: "Active",
                        salary: 65000,
                      };
                      setStaff([newMember, ...staff]);
                      triggerToast(`Faculty member ${name} added successfully!`);
                    }
                  }}
                />
              )}

              {/* Daily Attendance */}
              {activeTab === 'attendance' && (
                <AttendanceView
                  students={students}
                  onSaveAttendance={() => triggerToast("Class attendance saved & synced to parent portal successfully!")}
                />
              )}

              {/* Fees & Accounts */}
              {activeTab === 'fees' && (
                <FeesView
                  fees={fees}
                  onOpenReceipt={(inv) => setSelectedReceipt(inv)}
                  onCollectPayment={(inv) => setSelectedFeeForPayment(inv)}
                />
              )}

              {/* Exams & Results */}
              {activeTab === 'exams' && (
                <ExamsView
                  exams={exams}
                  onRecordMarks={() => setIsRecordMarksModalOpen(true)}
                />
              )}

              {/* Class Timetable */}
              {activeTab === 'timetable' && (
                <TimetableView />
              )}

              {/* Notices & Circulars */}
              {activeTab === 'notices' && (
                <NoticesView
                  notices={notices}
                  onAddNotice={() => setIsPublishNoticeModalOpen(true)}
                  onDeleteNotice={(id) => {
                    setNotices(notices.filter((n) => n.id !== id));
                    triggerToast("Notice removed from board.");
                  }}
                />
              )}
            </>
          )}

        </main>
      </div>

      {/* ALL MODALS */}
      <NewAdmissionModal
        isOpen={isAdmissionModalOpen}
        onClose={() => setIsAdmissionModalOpen(false)}
        onSubmit={handleAddStudent}
      />

      <PrintableReceiptModal
        invoice={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />

      <CollectPaymentModal
        invoice={selectedFeeForPayment}
        onClose={() => setSelectedFeeForPayment(null)}
        onConfirm={handleConfirmPayment}
      />

      <RecordExamMarksModal
        isOpen={isRecordMarksModalOpen}
        students={students}
        onClose={() => setIsRecordMarksModalOpen(false)}
        onSubmit={handleSaveMarks}
      />

      <PublishNoticeModal
        isOpen={isPublishNoticeModalOpen}
        onClose={() => setIsPublishNoticeModalOpen(false)}
        onSubmit={handlePublishNotice}
      />
    </div>
  );
}
