'use client';

import React from 'react';
import { 
  School, 
  Home, 
  Users, 
  UserCheck, 
  CalendarCheck, 
  CreditCard, 
  Award, 
  Calendar, 
  Bell, 
  FileText, 
  MessageSquare, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  Truck,
  BookOpen,
  HeartPulse,
  DoorOpen,
  Briefcase,
  FileSpreadsheet,
  Clock
} from 'lucide-react';
import { AuthUser, ROLE_DEFINITIONS } from '@/lib/auth';

interface AppSidebarProps {
  user: AuthUser;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  onLogout: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  user,
  activeTab,
  onTabChange,
  onLogout,
}) => {
  const meta = ROLE_DEFINITIONS[user.role];

  // Navigation tailored to each of the 16 roles
  const getNavSections = () => {
    switch (user.role) {
      case 'STUDENT':
        return [
          {
            title: 'Student Academic Space',
            items: [
              { id: 'overview', label: 'My Dashboard', icon: Home },
              { id: 'attendance', label: 'My Attendance (96%)', icon: CalendarCheck },
              { id: 'grades', label: 'Report Card & Marks', icon: Award },
              { id: 'timetable', label: 'Class Timetable', icon: Calendar },
              { id: 'fees', label: 'My Fee Receipts', icon: CreditCard },
              { id: 'notices', label: 'School Notices', icon: Bell },
            ],
          },
        ];

      case 'PARENT':
        return [
          {
            title: 'Parental Tracking',
            items: [
              { id: 'overview', label: 'Ward Dashboard', icon: Home },
              { id: 'attendance', label: 'Daily Arrival & RFID', icon: CalendarCheck },
              { id: 'fees', label: 'Online Fee Payment', icon: CreditCard },
              { id: 'messages', label: 'Teacher Messaging', icon: MessageSquare },
              { id: 'leave', label: 'Apply Student Leave', icon: FileText },
              { id: 'bus', label: 'Live Bus GPS Tracker', icon: Truck },
            ],
          },
        ];

      case 'PRINCIPAL':
        return [
          {
            title: 'Executive Oversight',
            items: [
              { id: 'overview', label: 'Principal Dashboard', icon: Home },
              { id: 'approvals', label: 'Approvals Queue', icon: ShieldCheck },
              { id: 'students', label: 'Students Academic Roster', icon: Users },
              { id: 'staff', label: 'Faculty Performance', icon: UserCheck },
              { id: 'fees-summary', label: 'Fee Summary (View Only)', icon: CreditCard },
              { id: 'notices', label: 'Official Circulars', icon: Bell },
            ],
          },
        ];

      case 'VICE_PRINCIPAL':
        return [
          {
            title: 'Academic Coordination',
            items: [
              { id: 'overview', label: 'Academic Dashboard', icon: Home },
              { id: 'substitutions', label: 'Teacher Substitutions', icon: Clock },
              { id: 'timetable', label: 'School Master Timetable', icon: Calendar },
              { id: 'curriculum', label: 'Syllabus & Lesson Plans', icon: BookOpen },
              { id: 'exams', label: 'Exams & Performance', icon: Award },
            ],
          },
        ];

      case 'CLASS_TEACHER':
        return [
          {
            title: 'Class 10-A Hub',
            items: [
              { id: 'overview', label: 'Class 10-A Overview', icon: Home },
              { id: 'attendance', label: 'Daily Attendance Marker', icon: CalendarCheck },
              { id: 'students', label: 'Student Progress & Remarks', icon: Users },
              { id: 'homework', label: 'Homework & Assignments', icon: FileText },
              { id: 'fee-status', label: 'Fee Paid/Pending Status', icon: CreditCard },
            ],
          },
        ];

      case 'SUBJECT_TEACHER':
        return [
          {
            title: 'Physics Department',
            items: [
              { id: 'overview', label: 'Teaching Overview', icon: Home },
              { id: 'materials', label: 'Study Material Upload', icon: FileText },
              { id: 'assignments', label: 'Homework Submissions', icon: BookOpen },
              { id: 'timetable', label: 'My Teaching Timetable', icon: Calendar },
            ],
          },
        ];

      case 'ACCOUNTANT':
        return [
          {
            title: 'Accounts & Finance',
            items: [
              { id: 'overview', label: 'Finance Dashboard', icon: Home },
              { id: 'fees', label: 'Collect Fees & Receipts', icon: CreditCard },
              { id: 'concessions', label: 'Concession Approvals', icon: FileSpreadsheet },
              { id: 'expenses', label: 'Expenses & Payroll Ledger', icon: Briefcase },
            ],
          },
        ];

      case 'ADMISSION_OFFICER':
        return [
          {
            title: 'Admissions Desk',
            items: [
              { id: 'overview', label: 'Admissions Pipeline', icon: Home },
              { id: 'enquiries', label: 'New Enquiries Register', icon: Users },
              { id: 'documents', label: 'Document Verification', icon: FileText },
              { id: 'visitors', label: 'Visitor Log', icon: DoorOpen },
            ],
          },
        ];

      case 'HR_MANAGER':
        return [
          {
            title: 'Human Resources',
            items: [
              { id: 'overview', label: 'HR Dashboard', icon: Home },
              { id: 'staff', label: 'Staff Directory', icon: UserCheck },
              { id: 'attendance', label: 'Biometric Attendance', icon: CalendarCheck },
              { id: 'payroll', label: 'Monthly Payroll Inputs', icon: CreditCard },
            ],
          },
        ];

      case 'LIBRARIAN':
        return [
          {
            title: 'Library Hub',
            items: [
              { id: 'overview', label: 'Circulation Desk', icon: Home },
              { id: 'catalog', label: 'Book Catalog & ISBN', icon: BookOpen },
              { id: 'issues', label: 'Issued Books & Returns', icon: CalendarCheck },
              { id: 'fines', label: 'Library Fines Ledger', icon: CreditCard },
            ],
          },
        ];

      case 'TRANSPORT_MANAGER':
        return [
          {
            title: 'Transport Logistics',
            items: [
              { id: 'overview', label: 'Fleet Operations', icon: Home },
              { id: 'tracking', label: 'Live GPS Telematics', icon: Truck },
              { id: 'routes', label: 'Bus Routes & Stops', icon: Calendar },
              { id: 'drivers', label: 'Driver Directory', icon: Users },
            ],
          },
        ];

      case 'HOSTEL_WARDEN':
        return [
          {
            title: 'Hostel Administration',
            items: [
              { id: 'overview', label: 'Hostel Dashboard', icon: Home },
              { id: 'rooms', label: 'Room Allocations', icon: Users },
              { id: 'outpass', label: 'Outpass & Night Leave', icon: FileText },
              { id: 'mess', label: 'Mess Menu Schedule', icon: Calendar },
            ],
          },
        ];

      case 'EXAM_CONTROLLER':
        return [
          {
            title: 'CBSE Examination Cell',
            items: [
              { id: 'overview', label: 'Exams Dashboard', icon: Home },
              { id: 'schedules', label: 'Date Sheets & Hall Tickets', icon: Calendar },
              { id: 'results', label: 'Marks Moderation & Lock', icon: Award },
              { id: 'reports', label: 'CBSE Official Gazette', icon: FileSpreadsheet },
            ],
          },
        ];

      case 'NURSE':
        return [
          {
            title: 'Infirmary Clinic',
            items: [
              { id: 'overview', label: 'Clinic Patient Log', icon: Home },
              { id: 'records', label: 'Student Health & Allergies', icon: HeartPulse },
              { id: 'emergency', label: 'Emergency Parent Contacts', icon: MessageSquare },
            ],
          },
        ];

      case 'SECURITY':
        return [
          {
            title: 'Campus Security',
            items: [
              { id: 'overview', label: 'Gate Security Kiosk', icon: Home },
              { id: 'visitors', label: 'Visitor Pass Register', icon: DoorOpen },
              { id: 'qr', label: 'Student Exit QR Scanner', icon: ShieldCheck },
            ],
          },
        ];

      // Super Admin (Default Full Access)
      default:
        return [
          {
            title: 'Core Administration',
            items: [
              { id: 'overview', label: 'Executive Dashboard', icon: Home },
              { id: 'students', label: 'Students Directory', icon: Users },
              { id: 'staff', label: 'Faculty & HR', icon: UserCheck },
              { id: 'attendance', label: 'Daily Attendance', icon: CalendarCheck },
              { id: 'fees', label: 'Fees & Accounts', icon: CreditCard },
            ],
          },
          {
            title: 'Academics & Operations',
            items: [
              { id: 'exams', label: 'Exams & Results', icon: Award },
              { id: 'timetable', label: 'Class Timetable', icon: Calendar },
              { id: 'notices', label: 'Notices & Circulars', icon: Bell },
            ],
          },
        ];
    }
  };

  const navSections = getNavSections();

  return (
    <aside className="w-64 bg-dark-pill text-white flex flex-col justify-between h-screen sticky top-0 flex-shrink-0 z-40 border-r border-white/10 select-none">
      {/* Top School Brand & Portal Badge */}
      <div className="p-5 pb-3">
        {/* Logo & School Name */}
        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-2xl bg-accent-lime flex items-center justify-center text-dark-pill shadow-lg shadow-accent-lime/20 flex-shrink-0">
            <School className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold tracking-tight text-white leading-tight">Apex Academy</h2>
            <p className="text-[10px] text-accent-lime font-bold uppercase tracking-wider">CBSE Affiliated</p>
          </div>
        </div>

        {/* Portal Role Indicator Pill */}
        <div className="mt-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-white block truncate">
              {meta?.title.split('(')[0]}
            </span>
            <span className="text-[9px] text-accent-lime font-mono">
              ID: {user.identifier}
            </span>
          </div>
          <span className="w-2 h-2 rounded-full bg-accent-lime flex-shrink-0" />
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-grow px-3 py-2 overflow-y-auto space-y-5">
        {navSections.map((section, sIdx) => (
          <div key={sIdx}>
            <div className="text-[10px] uppercase font-extrabold text-white/40 tracking-wider px-3 mb-2">
              {section.title}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-accent-lime text-dark-pill shadow-sm font-bold'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-dark-pill stroke-[2.2]' : 'text-white/50'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-dark-pill flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom User Profile Chip & Logout */}
      <div className="p-3 border-t border-white/10 bg-[#16191E]">
        <div className="flex items-center justify-between p-2 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{user.name}</div>
              <div className="text-[10px] text-accent-lime font-medium truncate">
                {user.role === 'STUDENT' ? `Roll #${user.details?.rollNo}` : user.identifier}
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-8 h-8 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
