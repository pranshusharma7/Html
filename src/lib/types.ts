export type UserRole =
  | 'SUPER_ADMIN'
  | 'PRINCIPAL'
  | 'TEACHER'
  | 'STUDENT'
  | 'PARENT'
  | 'ACCOUNTANT'
  | 'LIBRARIAN'
  | 'TRANSPORT_MANAGER'
  | 'RECEPTIONIST';

export interface Student {
  id: string;
  admissionNo: string;
  rollNo: string;
  name: string;
  class: string;
  section: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  guardian: string;
  phone: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Transferred';
  avatar?: string;
  attendancePct: number;
  feeStatus: 'Paid' | 'Partial' | 'Unpaid';
}

export interface Staff {
  id: string;
  empCode: string;
  name: string;
  department: string;
  designation: string;
  qualification: string;
  experience: string;
  phone: string;
  email: string;
  status: 'Active' | 'On Leave';
  salary: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
}

export interface FeeInvoice {
  id: string;
  invoiceNo: string;
  studentId: string;
  studentName: string;
  class: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  status: 'Paid' | 'Partial' | 'Unpaid';
  lastPaymentDate: string;
  receiptNo: string;
  paymentMethod: string;
}

export interface ExamRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  examType: string;
  subject: string;
  maxMarks: number;
  marksObtained: number;
  grade: string;
  remarks: string;
}

export interface Notice {
  id: string;
  title: string;
  category: 'Academic' | 'Exam' | 'Event' | 'Holiday' | 'Urgent';
  priority: 'Urgent' | 'High' | 'Normal';
  content: string;
  date: string;
  author: string;
}

export interface TimetablePeriod {
  period: string;
  time: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
}
