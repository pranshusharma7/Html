import fs from 'fs';
import path from 'path';
import { AuthUser } from './auth';
import { Student, Staff, FeeInvoice, ExamRecord, Notice } from './types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_STAFF, 
  INITIAL_FEES, 
  INITIAL_EXAMS, 
  INITIAL_NOTICES 
} from './mockData';

export interface DBUser extends AuthUser {
  password: string;
  isFirstLogin: boolean;
  passwordChangedAt?: string;
}

export interface DBAuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface DBSchema {
  users: Record<string, DBUser>;
  students: Student[];
  staff: Staff[];
  fees: FeeInvoice[];
  exams: ExamRecord[];
  notices: Notice[];
  auditLogs: DBAuditLog[];
  version: string;
  lastUpdated: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'school_erp.db.json');

// Initial seed users (all 16 roles). First-time password is EQUAL to their unique ID!
const INITIAL_USERS: Record<string, DBUser> = {
  // 1. Super Admin
  admin: {
    id: 'USR-001',
    name: 'Dr. Vikramaditya Rathore',
    role: 'SUPER_ADMIN',
    identifier: 'admin',
    password: 'admin', // First time password is same as ID
    isFirstLogin: true,
    email: 'ithead@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    designation: 'Managing Director & IT Trust Head',
  },
  // 2. Principal
  principal: {
    id: 'USR-002',
    name: 'Prof. Harish Chandra Verma',
    role: 'PRINCIPAL',
    identifier: 'principal',
    password: 'principal', // First time password is same as ID
    isFirstLogin: true,
    email: 'principal@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
    designation: 'Principal & Head of School',
  },
  // 3. Vice Principal
  viceprincipal: {
    id: 'USR-003',
    name: 'Mrs. Anuradha Swaminathan',
    role: 'VICE_PRINCIPAL',
    identifier: 'viceprincipal',
    password: 'viceprincipal',
    isFirstLogin: true,
    email: 'viceprincipal@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    designation: 'Vice Principal & Academic Coordinator',
  },
  // 4. Class Teacher
  classteacher: {
    id: 'USR-004',
    name: 'Mrs. Shalini Saxena',
    role: 'CLASS_TEACHER',
    identifier: 'classteacher',
    password: 'classteacher',
    isFirstLogin: true,
    email: 'shalini.saxena@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    designation: 'Class Teacher (Grade 10-A)',
    details: { assignedClass: '10-A' },
  },
  // 5. Subject Teacher
  subjectteacher: {
    id: 'USR-005',
    name: 'Dr. Alok Nath Mukherjee',
    role: 'SUBJECT_TEACHER',
    identifier: 'subjectteacher',
    password: 'subjectteacher',
    isFirstLogin: true,
    email: 'alok.mukherjee@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    designation: 'Senior PGT Physics Faculty',
    details: { subject: 'Physics' },
  },
  // 6. Student (Roll #101)
  '101': {
    id: 'USR-101',
    name: 'Aarav Sharma',
    role: 'STUDENT',
    identifier: '101',
    password: '101', // First time password is same as ID
    isFirstLogin: true,
    email: 'aarav.sharma@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    designation: 'Student (CBSE Std. 10)',
    details: { rollNo: '101', class: '10', section: 'A' },
  },
  // 7. Parent
  parent: {
    id: 'USR-701',
    name: 'Mr. Rajesh Sharma',
    role: 'PARENT',
    identifier: 'parent',
    password: 'parent', // First time password is same as ID
    isFirstLogin: true,
    email: 'rajesh.sharma@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    designation: 'Parent / Guardian',
    details: { wardName: 'Aarav Sharma', wardRollNo: '101', class: '10', section: 'A' },
  },
  // 8. Accountant
  accountant: {
    id: 'USR-008',
    name: 'CA Rakesh Bansal',
    role: 'ACCOUNTANT',
    identifier: 'accountant',
    password: 'accountant',
    isFirstLogin: true,
    email: 'accounts@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    designation: 'Chief Accounts & Finance Manager',
  },
  // 9. Admission Officer
  admission: {
    id: 'USR-009',
    name: 'Ms. Meenakshi Joshi',
    role: 'ADMISSION_OFFICER',
    identifier: 'admission',
    password: 'admission',
    isFirstLogin: true,
    email: 'admissions@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    designation: 'Senior Admission Officer',
  },
  // 10. HR Manager
  hrmanager: {
    id: 'USR-010',
    name: 'Mr. Pradeep Narayanan',
    role: 'HR_MANAGER',
    identifier: 'hrmanager',
    password: 'hrmanager',
    isFirstLogin: true,
    email: 'hr@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
    designation: 'Head of People & Staff Payroll',
  },
  // 11. Librarian
  librarian: {
    id: 'USR-011',
    name: 'Mrs. Sudha Murthy Iyer',
    role: 'LIBRARIAN',
    identifier: 'librarian',
    password: 'librarian',
    isFirstLogin: true,
    email: 'library@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&auto=format&fit=crop&q=80',
    designation: 'Chief Librarian',
  },
  // 12. Transport Manager
  transport: {
    id: 'USR-012',
    name: 'Col. Jagjit Singh (Retd.)',
    role: 'TRANSPORT_MANAGER',
    identifier: 'transport',
    password: 'transport',
    isFirstLogin: true,
    email: 'transport@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    designation: 'Head of Fleet Logistics',
  },
  // 13. Hostel Warden
  warden: {
    id: 'USR-013',
    name: 'Mr. Baldev Raj Kulkarni',
    role: 'HOSTEL_WARDEN',
    identifier: 'warden',
    password: 'warden',
    isFirstLogin: true,
    email: 'warden@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
    designation: 'Chief Hostel Warden',
  },
  // 14. Exam Controller
  examcontroller: {
    id: 'USR-014',
    name: 'Dr. Devesh Chandra Pathak',
    role: 'EXAM_CONTROLLER',
    identifier: 'examcontroller',
    password: 'examcontroller',
    isFirstLogin: true,
    email: 'exams@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80',
    designation: 'Controller of Examinations',
  },
  // 15. Medical Nurse
  nurse: {
    id: 'USR-015',
    name: 'Sister Mary Fernandez (RN)',
    role: 'NURSE',
    identifier: 'nurse',
    password: 'nurse',
    isFirstLogin: true,
    email: 'infirmary@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80',
    designation: 'Campus Infirmary Nurse',
  },
  // 16. Security Gatekeeper
  security: {
    id: 'USR-016',
    name: 'Subedar Ram Singh',
    role: 'SECURITY',
    identifier: 'security',
    password: 'security',
    isFirstLogin: true,
    email: 'security@apexacademy.edu.in',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    designation: 'Chief Gatekeeper',
  },
};

// Ensures the database directory and file exist
function ensureDB(): DBSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData: DBSchema = {
      users: INITIAL_USERS,
      students: INITIAL_STUDENTS,
      staff: INITIAL_STAFF,
      fees: INITIAL_FEES,
      exams: INITIAL_EXAMS,
      notices: INITIAL_NOTICES,
      auditLogs: [
        {
          id: 'LOG-001',
          userId: 'USR-001',
          userName: 'Dr. Vikramaditya Rathore',
          action: 'SYSTEM_INIT',
          details: 'Apex Academy SaaS Enterprise Database Initialized',
          timestamp: new Date().toISOString(),
        },
      ],
      version: '2.5.0',
      lastUpdated: new Date().toISOString(),
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }

  try {
    const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (err) {
    console.error('Error reading database file, re-initializing...', err);
    const initialData: DBSchema = {
      users: INITIAL_USERS,
      students: INITIAL_STUDENTS,
      staff: INITIAL_STAFF,
      fees: INITIAL_FEES,
      exams: INITIAL_EXAMS,
      notices: INITIAL_NOTICES,
      auditLogs: [],
      version: '2.5.0',
      lastUpdated: new Date().toISOString(),
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
}

// Save database to disk
function saveDB(data: DBSchema): void {
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Database Operations
export const db = {
  // Read full DB
  get: (): DBSchema => {
    return ensureDB();
  },

  // Find user by ID or Roll No
  findUserByIdentifier: (identifier: string): DBUser | null => {
    const data = ensureDB();
    const clean = identifier.trim().toLowerCase();
    
    // Exact key match
    if (data.users[clean]) return data.users[clean];

    // Search by rollNo or identifier case-insensitive
    const match = Object.values(data.users).find(
      (u) =>
        u.identifier.toLowerCase() === clean ||
        u.details?.rollNo?.toLowerCase() === clean ||
        u.email.toLowerCase() === clean
    );

    return match || null;
  },

  // Update user password and mark first login as false
  updatePassword: (identifier: string, newPassword: string): DBUser | null => {
    const data = ensureDB();
    const clean = identifier.trim().toLowerCase();
    const user = data.users[clean] || Object.values(data.users).find((u) => u.identifier.toLowerCase() === clean);

    if (!user) return null;

    user.password = newPassword;
    user.isFirstLogin = false;
    user.passwordChangedAt = new Date().toISOString();

    // Log the event
    data.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      action: 'PASSWORD_CHANGED',
      details: `User ${user.name} (${user.identifier}) successfully updated account password. First-time login completed.`,
      timestamp: new Date().toISOString(),
    });

    saveDB(data);
    return user;
  },

  // Get all students
  getStudents: (): Student[] => {
    const data = ensureDB();
    return data.students;
  },

  // Add a student
  addStudent: (student: Student): Student => {
    const data = ensureDB();
    data.students.unshift(student);

    // Also auto-create a student user login in database!
    const stuRoll = student.rollNo;
    data.users[stuRoll] = {
      id: student.id,
      name: student.name,
      role: 'STUDENT',
      identifier: stuRoll,
      password: stuRoll, // Default initial password is roll number!
      isFirstLogin: true,
      email: `${student.name.toLowerCase().replace(/\s+/g, '.')}@apexacademy.edu.in`,
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      designation: `Student (Class ${student.class}-${student.section})`,
      details: { rollNo: stuRoll, class: student.class, section: student.section },
    };

    saveDB(data);
    return student;
  },

  // Get fees
  getFees: (): FeeInvoice[] => {
    const data = ensureDB();
    return data.fees;
  },

  // Record fee payment
  payFee: (invoiceId: string, amount: number, method: string): FeeInvoice | null => {
    const data = ensureDB();
    const inv = data.fees.find((f) => f.id === invoiceId);
    if (!inv) return null;

    inv.paidAmount += amount;
    inv.dueAmount = Math.max(0, inv.totalAmount - inv.paidAmount);
    inv.status = inv.dueAmount === 0 ? 'Paid' : 'Partial';
    inv.lastPaymentDate = new Date().toISOString().split('T')[0];
    inv.paymentMethod = method;
    inv.receiptNo = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    data.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      userId: 'SYSTEM',
      userName: 'Fee Cashier',
      action: 'FEE_PAYMENT',
      details: `Collected ₹${amount} for invoice ${inv.invoiceNo} (${inv.studentName}) via ${method}`,
      timestamp: new Date().toISOString(),
    });

    saveDB(data);
    return inv;
  },

  // Add notice
  addNotice: (notice: Notice): Notice => {
    const data = ensureDB();
    data.notices.unshift(notice);
    saveDB(data);
    return notice;
  },
};
