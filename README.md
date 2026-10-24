# 🎓 Apex International Academy - Enterprise School ERP (Full-Stack SaaS)

An enterprise-grade, full-stack multi-portal School ERP (Enterprise Resource Planning) platform built with Next.js 14 App Router, TypeScript, Tailwind CSS, Prisma, and a persistent database backend.

---

## 🚀 Key Features

### 1. 🔐 Clean Authentication & First-Time Security Setup
- **Minimalist 2-Field Login**:
  - `Enter your ID` (Roll No., Staff ID, or Admin Username)
  - `Enter your Password`
- **First-Time Login Rule**: Default initial password is identical to the User ID.
- **Forced Password Change Modal**:
  - Automatically prompts on first login (`isFirstLogin: true`).
  - Interactive password strength calculator (Weak / Medium / Strong).
  - Persists new personal password directly to the database.

---

## 👥 16 Enterprise RBAC (Role-Based Access Control) Portals

Each role is equipped with dedicated permissions, responsibilities, and strict security limits:

| # | Role & Designation | Unique Login ID | Access Scope & Kaam | Security Limits (Restrictions) |
|---|---|---|---|---|
| **1** | **Super Admin** | `admin` | Multi-branch control, all modules, school settings, backup, user management | Sensitive actions require audit log & 2FA |
| **2** | **Principal / Head Master** | `principal` | Overall school monitoring, approvals queue (Admissions, Leaves, TC), circulars | **Fee vouchers edit/delete locked** (view-only), DB locked |
| **3** | **Vice Principal / Academic Coord.** | `viceprincipal` | Master timetable, exam schedules, syllabus tracking, teacher substitution matrix | **Payroll, fees and accounts hidden** |
| **4** | **Class Teacher** (Class 10-A) | `classteacher` | Class 10-A attendance, student progress, remarks, parent contact, homework | Other classes locked; **Fees status only (amounts hidden)** |
| **5** | **Subject Teacher** (Physics) | `subjectteacher` | Assigned subjects, marks entry, study material PDF upload, assignments | General student profile, fees and other subjects locked |
| **6** | **Student Portal** (Std. 10-A) | `101` | Own data only: timetable, attendance (96%), homework submit, CBSE marksheet | Read-only; cannot view other students' records |
| **7** | **Parent / Guardian** | `parent` | Ward tracker, RFID campus arrival, live bus GPS, teacher messaging, leave app | Strictly ward data; internal staff data locked |
| **8** | **Accountant / Fee Manager** | `accountant` | Fee structures, fee collection, verified receipts, expenses, payroll | No academic marks/remarks; Concessions require Principal approval |
| **9** | **Admission Officer / Receptionist** | `admission` | Enquiries register, admission applications, document verification, visitor register | Detailed fees and staff info hidden; Principal confirms admission |
| **10** | **HR Manager** | `hrmanager` | Staff profiles, biometric attendance, leave approvals, recruitment, payroll | Academic grading and student fees locked |
| **11** | **Librarian** | `librarian` | 18,450 books catalog, ISBN scanner, issue/return tracker, fine collection | General school fees and attendance locked |
| **12** | **Transport Manager** | `transport` | 12 bus fleet roster, routes, live GPS speed/location telematics, driver roster | Student marks and school tuition fees locked |
| **13** | **Hostel Warden** | `warden` | Room allocations, resident list, mess food menu, student outpass & night leave | Academic data and general school fees locked |
| **14** | **Exam Controller** | `examcontroller` | Exam schedules, hall tickets, marks moderation & results lock, official gazette | Payroll and fees locked; Moderation requires audit log |
| **15** | **Medical / School Nurse** | `nurse` | Infirmary patient visits, student allergies, BMI records, emergency parent contact | Strictly confidential health data; zero financial/grading access |
| **16** | **Security / Gatekeeper** | `security` | Campus entry-exit log, visitor gate passes, student early departure QR verification | Zero academic or financial data access |

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Modern Design Tokens (Sage `#AAB5AB`, Surface `#F4F6F2`, Pill `#121418`, Accent Lime `#EBF98F`)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Database Engine**: Persistent JSON / SQLite relational disk engine (`data/school_erp.db.json`)
- **ORM Schema**: Prisma ORM (`prisma/schema.prisma`)

---

## 💻 Getting Started Locally

```bash
# 1. Install dependencies
npm install

# 2. Run Next.js production build
npm run build

# 3. Start production server
npm run start -- -p 3005
```

Navigate to [http://localhost:3005](http://localhost:3005) in your web browser.

---

## 📜 License

MIT © Apex International Academy / Edvion. All rights reserved.
