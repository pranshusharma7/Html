export type PortalRole =
  | 'SUPER_ADMIN'
  | 'PRINCIPAL'
  | 'VICE_PRINCIPAL'
  | 'CLASS_TEACHER'
  | 'SUBJECT_TEACHER'
  | 'STUDENT'
  | 'PARENT'
  | 'ACCOUNTANT'
  | 'ADMISSION_OFFICER'
  | 'HR_MANAGER'
  | 'LIBRARIAN'
  | 'TRANSPORT_MANAGER'
  | 'HOSTEL_WARDEN'
  | 'EXAM_CONTROLLER'
  | 'NURSE'
  | 'SECURITY';

export interface RoleMetadata {
  title: string;
  category: 'LEADERSHIP' | 'ACADEMIC' | 'STUDENT_PARENT' | 'ADMINISTRATION' | 'OPERATIONS';
  kaam: string;
  access: string;
  limit: string;
  badgeColor: string;
}

export interface AuthUser {
  id: string;
  name: string;
  role: PortalRole;
  identifier: string; // Roll No or Staff ID or Admin Username
  email: string;
  avatar: string;
  designation: string;
  department?: string;
  details?: {
    rollNo?: string;
    class?: string;
    section?: string;
    wardName?: string;
    wardRollNo?: string;
    subject?: string;
    assignedClass?: string;
    roomNo?: string;
    busRoute?: string;
    shift?: string;
  };
}

export const ROLE_DEFINITIONS: Record<PortalRole, RoleMetadata> = {
  SUPER_ADMIN: {
    title: 'Super Admin (Owner / Trust / IT Head)',
    category: 'LEADERSHIP',
    kaam: 'Poore system ko control karna, multi-branch manage karna, roles aur permissions banana.',
    access: 'Sab kuch (all modules, all branches), school settings, academic year setup, backup/restore, audit logs, user create/delete.',
    limit: 'Koi limit nahi. Sensitive actions (data delete, role change) ke liye audit log aur 2FA active hai.',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
  PRINCIPAL: {
    title: 'Principal / Head Master',
    category: 'LEADERSHIP',
    kaam: 'School ki overall monitoring, approvals, policy decisions.',
    access: 'Poore school ka dashboard aur reports (attendance, results, fees summary, staff performance), leave approvals, notices/circulars, admission approval, TC/certificate approval.',
    limit: 'System settings, role/permission change aur database-level kaam nahi. Fee entries edit nahi kar sakta (sirf view aur reports).',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  VICE_PRINCIPAL: {
    title: 'Vice Principal / Academic Coordinator',
    category: 'LEADERSHIP',
    kaam: 'Timetable, exam schedule, syllabus tracking, teachers ko coordinate karna.',
    access: 'Timetable, exam module, lesson plans, class-wise performance, teacher substitutions.',
    limit: 'Payroll, fees aur accounts nahi dekh sakta. Staff salary hidden rahegi.',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  },
  CLASS_TEACHER: {
    title: 'Class Teacher (Class 10-A)',
    category: 'ACADEMIC',
    kaam: 'Apni class ka daily attendance, student progress, parents se communication.',
    access: 'Sirf apni class ke students ka data: attendance, marks, remarks, parent contact, homework, report card comments.',
    limit: 'Dusri class ka data nahi. Fee details sirf "paid/pending" status (amount breakup nahi). Marks lock hone ke baad edit nahi.',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  },
  SUBJECT_TEACHER: {
    title: 'Subject Teacher (Physics & Science)',
    category: 'ACADEMIC',
    kaam: 'Apne subject ki classes lena, homework dena, marks enter karna.',
    access: 'Sirf assigned classes aur subject: marks entry, assignments, study material upload, period attendance, timetable (apna).',
    limit: 'Class teacher wale poore student profile, fees, ya dusre subjects ke marks nahi.',
    badgeColor: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  },
  STUDENT: {
    title: 'Student Portal',
    category: 'STUDENT_PARENT',
    kaam: 'Apni padhai aur activities follow karna.',
    access: 'Sirf apna data: timetable, attendance, homework submit, marks/report card, study material, notices, library history, fee status, events.',
    limit: 'Kisi dusre student ka data nahi. Kuch bhi edit nahi kar sakta (sirf homework submit aur limited profile update).',
    badgeColor: 'bg-accent-lime/20 text-accent-lime border-accent-lime/40',
  },
  PARENT: {
    title: 'Parent / Guardian Portal',
    category: 'STUDENT_PARENT',
    kaam: 'Bachche ki progress track karna, fees bharna, school se baat karna.',
    access: 'Sirf apne bachche ka data: attendance, marks, homework, fee dues + online payment, transport tracking, notices, teacher messaging, leave application.',
    limit: 'Dusre bachchon ka data nahi, internal staff data nahi. Sirf allowed teachers se message kar sakta hai.',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  },
  ACCOUNTANT: {
    title: 'Accountant / Fee Manager',
    category: 'ADMINISTRATION',
    kaam: 'Fees collect karna, receipts banana, expenses aur payroll handle karna.',
    access: 'Fee structure, collection, receipts, concessions (approval ke saath), dues reports, expenses, salary processing, financial reports.',
    limit: 'Student ke marks aur academic remarks nahi. Fee waiver/concession Principal approval ke bina nahi. Deleted receipts ka audit trail.',
    badgeColor: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30',
  },
  ADMISSION_OFFICER: {
    title: 'Admission Officer / Receptionist',
    category: 'ADMINISTRATION',
    kaam: 'Enquiries, admissions, visitor entry, certificate requests.',
    access: 'Enquiry form, admission application, document upload, visitor log, basic student contact info, appointment scheduling.',
    limit: 'Marks, fees ka detailed data aur staff info nahi. Final admission confirm karne ke liye Principal approval chahiye.',
    badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  },
  HR_MANAGER: {
    title: 'HR Manager',
    category: 'ADMINISTRATION',
    kaam: 'Staff hiring, attendance, leave aur payroll coordination.',
    access: 'Staff profiles, documents, attendance, leave balance, recruitment, payroll input.',
    limit: 'Student academic data aur fee collection nahi.',
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  },
  LIBRARIAN: {
    title: 'Librarian',
    category: 'OPERATIONS',
    kaam: 'Books ka catalog, issue/return, fine.',
    access: 'Book catalog, member (student/staff) basic info, issue/return, fine collection record, library reports.',
    limit: 'Marks, fees (sirf library fine ke alawa), attendance edit nahi.',
    badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  },
  TRANSPORT_MANAGER: {
    title: 'Transport Manager',
    category: 'OPERATIONS',
    kaam: 'Routes, buses, drivers aur student allocation.',
    access: 'Route/vehicle/driver management, student pickup list, transport fee status, GPS tracking, maintenance logs.',
    limit: 'Student marks aur other fees nahi. Sirf transport se related student info (name, class, address, parent contact).',
    badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  HOSTEL_WARDEN: {
    title: 'Hostel Warden',
    category: 'OPERATIONS',
    kaam: 'Hostel rooms, mess aur hostel attendance.',
    access: 'Room allocation, hostel students list, mess menu, leave/outpass approval, hostel fee status.',
    limit: 'Academic data aur school fee details nahi.',
    badgeColor: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  },
  EXAM_CONTROLLER: {
    title: 'Exam Controller',
    category: 'ACADEMIC',
    kaam: 'Exams schedule karna, results process aur publish karna.',
    access: 'Exam setup, hall tickets, marks verification, grade calculation, result publish, report cards.',
    limit: 'Fee aur payroll nahi. Publish ke baad marks change karne ke liye written reason aur audit log zaroori.',
    badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  },
  NURSE: {
    title: 'Medical / School Nurse',
    category: 'OPERATIONS',
    kaam: 'Student health records aur emergency handling.',
    access: 'Health records, allergies, medical visits, emergency contacts.',
    limit: 'Sirf health data. Ye data sirf nurse, Principal aur emergency mein class teacher ko dikhna chahiye.',
    badgeColor: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
  SECURITY: {
    title: 'Security / Gatekeeper',
    category: 'OPERATIONS',
    kaam: 'Entry-exit aur visitor tracking.',
    access: 'Visitor log, gate pass verify, student early-leave approvals (QR scan).',
    limit: 'Koi academic ya financial data nahi.',
    badgeColor: 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
  },
};

export const DEMO_USERS: Record<string, { user: AuthUser; password: string }> = {
  // 1. Super Admin
  admin: {
    user: {
      id: 'USR-001',
      name: 'Dr. Vikramaditya Rathore',
      role: 'SUPER_ADMIN',
      identifier: 'admin',
      email: 'ithead@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      designation: 'Managing Director & IT Trust Head',
    },
    password: 'admin123',
  },

  // 2. Principal
  principal: {
    user: {
      id: 'USR-002',
      name: 'Prof. Harish Chandra Verma',
      role: 'PRINCIPAL',
      identifier: 'principal',
      email: 'principal@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      designation: 'Principal & Head of School',
    },
    password: 'prin123',
  },

  // 3. Vice Principal
  viceprincipal: {
    user: {
      id: 'USR-003',
      name: 'Mrs. Anuradha Swaminathan',
      role: 'VICE_PRINCIPAL',
      identifier: 'viceprincipal',
      email: 'viceprincipal@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      designation: 'Vice Principal & Academic Coordinator',
    },
    password: 'vp123',
  },

  // 4. Class Teacher
  classteacher: {
    user: {
      id: 'USR-004',
      name: 'Mrs. Shalini Saxena',
      role: 'CLASS_TEACHER',
      identifier: 'classteacher',
      email: 'shalini.saxena@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      designation: 'Class Teacher (Grade 10-A)',
      details: {
        assignedClass: '10-A',
      },
    },
    password: 'ct123',
  },

  // 5. Subject Teacher
  subjectteacher: {
    user: {
      id: 'USR-005',
      name: 'Dr. Alok Nath Mukherjee',
      role: 'SUBJECT_TEACHER',
      identifier: 'subjectteacher',
      email: 'alok.mukherjee@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      designation: 'Senior PGT Physics Faculty',
      details: {
        subject: 'Physics',
      },
    },
    password: 'st123',
  },

  // 6. Student
  '101': {
    user: {
      id: 'USR-101',
      name: 'Aarav Sharma',
      role: 'STUDENT',
      identifier: '101',
      email: 'aarav.sharma@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      designation: 'Student (CBSE Std. 10)',
      details: {
        rollNo: '101',
        class: '10',
        section: 'A',
      },
    },
    password: 'student123',
  },

  // 7. Parent
  parent: {
    user: {
      id: 'USR-701',
      name: 'Mr. Rajesh Sharma',
      role: 'PARENT',
      identifier: 'parent',
      email: 'rajesh.sharma@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      designation: 'Parent / Guardian',
      details: {
        wardName: 'Aarav Sharma',
        wardRollNo: '101',
        class: '10',
        section: 'A',
      },
    },
    password: 'parent123',
  },

  // 8. Accountant
  accountant: {
    user: {
      id: 'USR-008',
      name: 'CA Rakesh Bansal',
      role: 'ACCOUNTANT',
      identifier: 'accountant',
      email: 'accounts@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      designation: 'Chief Accounts & Finance Manager',
    },
    password: 'acc123',
  },

  // 9. Admission Officer
  admission: {
    user: {
      id: 'USR-009',
      name: 'Ms. Meenakshi Joshi',
      role: 'ADMISSION_OFFICER',
      identifier: 'admission',
      email: 'admissions@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
      designation: 'Senior Admission & Public Liaison Officer',
    },
    password: 'adm123',
  },

  // 10. HR Manager
  hrmanager: {
    user: {
      id: 'USR-010',
      name: 'Mr. Pradeep Narayanan',
      role: 'HR_MANAGER',
      identifier: 'hrmanager',
      email: 'hr@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
      designation: 'Head of People & Staff Payroll',
    },
    password: 'hr123',
  },

  // 11. Librarian
  librarian: {
    user: {
      id: 'USR-011',
      name: 'Mrs. Sudha Murthy Iyer',
      role: 'LIBRARIAN',
      identifier: 'librarian',
      email: 'library@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80',
      designation: 'Chief Librarian & Resource Center Head',
    },
    password: 'lib123',
  },

  // 12. Transport Manager
  transport: {
    user: {
      id: 'USR-012',
      name: 'Col. Jagjit Singh (Retd.)',
      role: 'TRANSPORT_MANAGER',
      identifier: 'transport',
      email: 'transport@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      designation: 'Head of Fleet & Student Transit Logistics',
    },
    password: 'trans123',
  },

  // 13. Hostel Warden
  warden: {
    user: {
      id: 'USR-013',
      name: 'Mr. Baldev Raj Kulkarni',
      role: 'HOSTEL_WARDEN',
      identifier: 'warden',
      email: 'warden@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      designation: 'Chief Hostel Warden (Boys & Girls Blocks)',
    },
    password: 'hostel123',
  },

  // 14. Exam Controller
  examcontroller: {
    user: {
      id: 'USR-014',
      name: 'Dr. Devesh Chandra Pathak',
      role: 'EXAM_CONTROLLER',
      identifier: 'examcontroller',
      email: 'exams@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80',
      designation: 'Controller of CBSE Examinations & Results',
    },
    password: 'exam123',
  },

  // 15. Medical / Nurse
  nurse: {
    user: {
      id: 'USR-015',
      name: 'Sister Mary Fernandez (RN)',
      role: 'NURSE',
      identifier: 'nurse',
      email: 'infirmary@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80',
      designation: 'Campus Infirmary & Emergency Nurse',
    },
    password: 'med123',
  },

  // 16. Security / Gatekeeper
  security: {
    user: {
      id: 'USR-016',
      name: 'Subedar Ram Singh',
      role: 'SECURITY',
      identifier: 'security',
      email: 'security@apexacademy.edu.in',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      designation: 'Chief Gatekeeper & Campus Security Officer',
    },
    password: 'gate123',
  },
};
