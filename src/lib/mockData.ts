import { Student, Staff, FeeInvoice, ExamRecord, Notice, TimetablePeriod } from './types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "STU-1001",
    admissionNo: "ADM-2024-001",
    rollNo: "101",
    name: "Aarav Sharma",
    class: "10",
    section: "A",
    gender: "Male",
    dob: "2010-05-14",
    guardian: "Rajesh Sharma",
    phone: "+91 98765 01234",
    email: "aarav.sharma@apexacademy.edu",
    status: "Active",
    attendancePct: 96,
    feeStatus: "Paid"
  },
  {
    id: "STU-1002",
    admissionNo: "ADM-2024-002",
    rollNo: "102",
    name: "Ananya Patel",
    class: "10",
    section: "A",
    gender: "Female",
    dob: "2010-08-22",
    guardian: "Vikram Patel",
    phone: "+91 98765 01235",
    email: "ananya.patel@apexacademy.edu",
    status: "Active",
    attendancePct: 92,
    feeStatus: "Partial"
  },
  {
    id: "STU-1003",
    admissionNo: "ADM-2024-003",
    rollNo: "103",
    name: "Rohan Verma",
    class: "10",
    section: "B",
    gender: "Male",
    dob: "2010-02-11",
    guardian: "Manoj Verma",
    phone: "+91 98765 01236",
    email: "rohan.v@apexacademy.edu",
    status: "Active",
    attendancePct: 78,
    feeStatus: "Unpaid"
  },
  {
    id: "STU-1004",
    admissionNo: "ADM-2024-004",
    rollNo: "104",
    name: "Isha Malhotra",
    class: "9",
    section: "A",
    gender: "Female",
    dob: "2011-11-30",
    guardian: "Sunil Malhotra",
    phone: "+91 98765 01237",
    email: "isha.m@apexacademy.edu",
    status: "Active",
    attendancePct: 98,
    feeStatus: "Paid"
  },
  {
    id: "STU-1005",
    admissionNo: "ADM-2024-005",
    rollNo: "105",
    name: "Kabir Singh",
    class: "9",
    section: "B",
    gender: "Male",
    dob: "2011-03-19",
    guardian: "Harpreet Singh",
    phone: "+91 98765 01238",
    email: "kabir.s@apexacademy.edu",
    status: "Active",
    attendancePct: 86,
    feeStatus: "Partial"
  },
  {
    id: "STU-1006",
    admissionNo: "ADM-2024-006",
    rollNo: "106",
    name: "Diya Sengupta",
    class: "12",
    section: "A",
    gender: "Female",
    dob: "2008-09-04",
    guardian: "Anirban Sengupta",
    phone: "+91 98765 01239",
    email: "diya.s@apexacademy.edu",
    status: "Active",
    attendancePct: 97,
    feeStatus: "Paid"
  },
  {
    id: "STU-1007",
    admissionNo: "ADM-2024-007",
    rollNo: "107",
    name: "Aditya Nair",
    class: "12",
    section: "B",
    gender: "Male",
    dob: "2008-01-27",
    guardian: "K. R. Nair",
    phone: "+91 98765 01240",
    email: "aditya.n@apexacademy.edu",
    status: "Active",
    attendancePct: 89,
    feeStatus: "Paid"
  },
  {
    id: "STU-1008",
    admissionNo: "ADM-2024-008",
    rollNo: "108",
    name: "Meera Joshi",
    class: "11",
    section: "A",
    gender: "Female",
    dob: "2009-07-16",
    guardian: "Alok Joshi",
    phone: "+91 98765 01241",
    email: "meera.j@apexacademy.edu",
    status: "Active",
    attendancePct: 91,
    feeStatus: "Partial"
  }
];

export const INITIAL_STAFF: Staff[] = [
  {
    id: "FAC-201",
    empCode: "EMP-101",
    name: "Dr. Alok Nath Mukherjee",
    department: "Science & Physics",
    designation: "Head of Science Dept.",
    qualification: "Ph.D. in Physics, B.Ed",
    experience: "14 Years",
    phone: "+91 98111 22334",
    email: "alok.mukherjee@apexacademy.edu",
    status: "Active",
    salary: 85000
  },
  {
    id: "FAC-202",
    empCode: "EMP-102",
    name: "Mrs. Sunita Deshmukh",
    department: "Mathematics",
    designation: "Senior PGT Teacher",
    qualification: "M.Sc. Maths, B.Ed",
    experience: "9 Years",
    phone: "+91 98111 22335",
    email: "sunita.d@apexacademy.edu",
    status: "Active",
    salary: 72000
  },
  {
    id: "FAC-203",
    empCode: "EMP-103",
    name: "Mr. David Reynolds",
    department: "Languages",
    designation: "Head of English Dept.",
    qualification: "M.A. English, CELTA",
    experience: "11 Years",
    phone: "+91 98111 22336",
    email: "david.r@apexacademy.edu",
    status: "Active",
    salary: 78000
  },
  {
    id: "FAC-204",
    empCode: "EMP-104",
    name: "Ms. Priyanka Kapoor",
    department: "Computer Science & AI",
    designation: "AI & Robotics Coordinator",
    qualification: "M.Tech CSE, MCA",
    experience: "7 Years",
    phone: "+91 98111 22337",
    email: "priyanka.k@apexacademy.edu",
    status: "Active",
    salary: 68000
  },
  {
    id: "FAC-205",
    empCode: "EMP-105",
    name: "Mr. Harish Chandra",
    department: "Social Sciences",
    designation: "PGT History & Civics",
    qualification: "M.A. History, B.Ed",
    experience: "12 Years",
    phone: "+91 98111 22338",
    email: "harish.c@apexacademy.edu",
    status: "Active",
    salary: 74000
  }
];

export const INITIAL_FEES: FeeInvoice[] = [
  {
    id: "FEE-801",
    invoiceNo: "INV-2026-8801",
    studentId: "STU-1001",
    studentName: "Aarav Sharma",
    class: "10-A",
    totalAmount: 45000,
    paidAmount: 45000,
    dueAmount: 0,
    status: "Paid",
    lastPaymentDate: "2026-09-10",
    receiptNo: "REC-2026-8801",
    paymentMethod: "UPI"
  },
  {
    id: "FEE-802",
    invoiceNo: "INV-2026-8802",
    studentId: "STU-1002",
    studentName: "Ananya Patel",
    class: "10-A",
    totalAmount: 45000,
    paidAmount: 30000,
    dueAmount: 15000,
    status: "Partial",
    lastPaymentDate: "2026-08-15",
    receiptNo: "REC-2026-8802",
    paymentMethod: "Net Banking"
  },
  {
    id: "FEE-803",
    invoiceNo: "INV-2026-8803",
    studentId: "STU-1003",
    studentName: "Rohan Verma",
    class: "10-B",
    totalAmount: 45000,
    paidAmount: 0,
    dueAmount: 45000,
    status: "Unpaid",
    lastPaymentDate: "-",
    receiptNo: "-",
    paymentMethod: "-"
  },
  {
    id: "FEE-804",
    invoiceNo: "INV-2026-8804",
    studentId: "STU-1004",
    studentName: "Isha Malhotra",
    class: "9-A",
    totalAmount: 42000,
    paidAmount: 42000,
    dueAmount: 0,
    status: "Paid",
    lastPaymentDate: "2026-09-02",
    receiptNo: "REC-2026-8804",
    paymentMethod: "Card"
  },
  {
    id: "FEE-805",
    invoiceNo: "INV-2026-8805",
    studentId: "STU-1005",
    studentName: "Kabir Singh",
    class: "9-B",
    totalAmount: 42000,
    paidAmount: 20000,
    dueAmount: 22000,
    status: "Partial",
    lastPaymentDate: "2026-07-28",
    receiptNo: "REC-2026-8805",
    paymentMethod: "Cash"
  },
  {
    id: "FEE-806",
    invoiceNo: "INV-2026-8806",
    studentId: "STU-1006",
    studentName: "Diya Sengupta",
    class: "12-A",
    totalAmount: 52000,
    paidAmount: 52000,
    dueAmount: 0,
    status: "Paid",
    lastPaymentDate: "2026-09-12",
    receiptNo: "REC-2026-8806",
    paymentMethod: "UPI"
  }
];

export const INITIAL_EXAMS: ExamRecord[] = [
  {
    id: "EXM-301",
    studentId: "STU-1001",
    studentName: "Aarav Sharma",
    class: "10-A",
    examType: "Mid-Term Exam",
    subject: "Mathematics",
    maxMarks: 100,
    marksObtained: 94,
    grade: "A+",
    remarks: "Exceptional analytical mastery"
  },
  {
    id: "EXM-302",
    studentId: "STU-1001",
    studentName: "Aarav Sharma",
    class: "10-A",
    examType: "Mid-Term Exam",
    subject: "Physics",
    maxMarks: 100,
    marksObtained: 88,
    grade: "A",
    remarks: "Strong concept clarity"
  },
  {
    id: "EXM-303",
    studentId: "STU-1002",
    studentName: "Ananya Patel",
    class: "10-A",
    examType: "Mid-Term Exam",
    subject: "Mathematics",
    maxMarks: 100,
    marksObtained: 95,
    grade: "A+",
    remarks: "Consistent accuracy & problem solving"
  },
  {
    id: "EXM-304",
    studentId: "STU-1006",
    studentName: "Diya Sengupta",
    class: "12-A",
    examType: "Mid-Term Exam",
    subject: "Computer Science & AI",
    maxMarks: 100,
    marksObtained: 98,
    grade: "A+",
    remarks: "Outstanding algorithms & python code"
  },
  {
    id: "EXM-305",
    studentId: "STU-1007",
    studentName: "Aditya Nair",
    class: "12-B",
    examType: "Mid-Term Exam",
    subject: "Physics",
    maxMarks: 100,
    marksObtained: 79,
    grade: "B",
    remarks: "Good conceptual grasp, focus on numericals"
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: "NOT-01",
    title: "Annual Science & Robotics Exhibition 2026",
    category: "Academic",
    priority: "High",
    content: "All students from grades 8 to 12 are invited to register innovative STEM & Robotics projects by Friday.",
    date: "28 Oct 2026",
    author: "Science Dept."
  },
  {
    id: "NOT-02",
    title: "CBSE Pre-Board Preparatory Schedule",
    category: "Exam",
    priority: "Urgent",
    content: "Pre-board exam schedules for grades 10 & 12 are published on the portal. Admit cards available at school reception.",
    date: "20 Oct 2026",
    author: "Examination Cell"
  },
  {
    id: "NOT-03",
    title: "Parent-Teacher Interactive Forum (PTM)",
    category: "Event",
    priority: "Normal",
    content: "Scheduled from 9:00 AM to 1:30 PM to discuss individual student progress reports and first-term evaluations.",
    date: "05 Nov 2026",
    author: "Principal Office"
  }
];

export const INITIAL_TIMETABLE: TimetablePeriod[] = [
  { period: "Period 1", time: "08:30 - 09:15", mon: "Mathematics (Mrs. Sunita)", tue: "Physics (Dr. Alok)", wed: "English (Mr. Reynolds)", thu: "Computer (Ms. Priyanka)", fri: "Social Studies", sat: "Sports / PE" },
  { period: "Period 2", time: "09:15 - 10:00", mon: "Physics (Dr. Alok)", tue: "Chemistry", wed: "Mathematics (Mrs. Sunita)", thu: "Physics (Dr. Alok)", fri: "English (Mr. Reynolds)", sat: "Library / Reading" },
  { period: "Period 3", time: "10:00 - 10:45", mon: "English (Mr. Reynolds)", tue: "Computer (Ms. Priyanka)", wed: "Chemistry", thu: "Mathematics (Mrs. Sunita)", fri: "Physics (Dr. Alok)", sat: "Art & Craft" },
  { period: "Break", time: "10:45 - 11:15", mon: "☕ Recess", tue: "☕ Recess", wed: "☕ Recess", thu: "☕ Recess", fri: "☕ Recess", sat: "☕ Recess" },
  { period: "Period 4", time: "11:15 - 12:00", mon: "Social Studies", tue: "English (Mr. Reynolds)", wed: "Computer (Ms. Priyanka)", thu: "Chemistry", fri: "Mathematics", sat: "Club Activities" },
  { period: "Period 5", time: "12:00 - 12:45", mon: "Computer Lab", tue: "Biology Lab", wed: "Social Studies", thu: "Sports", fri: "Computer Lab", sat: "House Assemblies" }
];

// Attendance & Operations trend data matching the custom dual-pill bar chart design
export const CHART_PILL_DATA = [
  { date: "Mon 20", topHeight: 52, bottomHeight: 48, total: 0.9, hasData: true, whiteDotPos: "top", tooltip: null },
  { date: "Tue 21", topHeight: 42, bottomHeight: 38, total: 0.65, hasData: true, whiteDotPos: "bottom", tooltip: null },
  { date: "Wed 22", topHeight: 65, bottomHeight: 30, total: 0.8, hasData: true, whiteDotPos: "bottom", tooltip: null },
  { date: "Thu 23 (Holiday)", topHeight: 0, bottomHeight: 0, total: 0, hasData: false, whiteDotPos: "placeholder", tooltip: null },
  { date: "Fri 24", topHeight: 60, bottomHeight: 45, total: 0.94, hasData: true, whiteDotPos: "middle", tooltip: { top: "94%", bottom: "88%" } },
  { date: "Sun (Weekend)", topHeight: 0, bottomHeight: 0, total: 0, hasData: false, whiteDotPos: "placeholder", tooltip: null },
  { date: "Mon 27", topHeight: 35, bottomHeight: 45, total: 0.76, hasData: true, whiteDotPos: "middle", tooltip: null },
  { date: "Tue 28", topHeight: 40, bottomHeight: 40, total: 0.82, hasData: true, whiteDotPos: "top", tooltip: null }
];
