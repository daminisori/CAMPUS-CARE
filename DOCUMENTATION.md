# TECHNICAL APPROACH & METHODOLOGY
**Campus Care — Student Grievance Redressal & Hostel Management System**

---

## 📌 Slide Content (Copy-Paste Ready for SIH Presentation)

### 🔹 LEFT COLUMN: TECHNICAL APPROACH

* **Technologies Used:**
  * **Frontend:** React 18, Vite 6, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
  * **Backend:** Node.js, Express.js (REST API), TypeScript, Zod, Multer
  * **Database:** PostgreSQL, Prisma ORM (Embedded auto-runner + persistent storage)

* **Architecture & State Management:**
  * **Frontend:** React Context API (`ComplaintContext`) managing real-time CRUD operations (ticket submission, status transitions, staff dispatch, comment threads).
  * **Backend:** Clean 3-tier Controller-Service-Repository architecture with centralized error handling and typed Zod schema validators.

* **Data Layer & Persistence:**
  * PostgreSQL relational database with foreign key constraints across `User`, `Department`, `Branch`, `Complaint`, `TimelineEvent`, and `Comment`.
  * ACID-compliant transactions and immutable audit logging for every lifecycle event.

* **Authentication & Role-Based Access Control (RBAC):**
  * Stateless JWT Bearer Authentication with BCrypt password hashing (10 salt rounds).
  * Granular route guards & database-level query isolation:
    * **Student:** Restricted strictly to own submitted complaints (`where: { studentId }`).
    * **Staff:** Scoped exclusively to assigned department tickets (`where: { departmentId }`).
    * **Dean / Admin:** Full institutional cross-department oversight & dispatch rights.
  * Session-locked security: Prevents unauthorized profile spoofing after authentication.

* **Configuration & Reverse Proxy Networking:**
  * Vite Reverse Proxy Gateway (`vite.config.ts`) forwarding all `/api`, `/auth`, and `/complaints` traffic to backend port `5000`.
  * Zero-CORS friction, single-port sharing, and instant compatibility with local Wi-Fi IP and public tunneling.

* **Unique Identifiers & Auditing:**
  * Collision-free ticket generation (`TCK-XXX` + internal UUIDs).
  * Auto-generated timeline events tracking actors, roles, and UTC timestamps for full administrative accountability.

---

### 🔹 RIGHT COLUMN: METHODOLOGY (Workflow Pipeline)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. Authentication & Role-Based Dispatch                                     │
│    Student / Staff enters institutional credentials ➔ JWT verification ➔   │
│    Role-based routing (Student Dashboard vs. Department Triage Console)     │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 2. Complaint Submission & Validation                                        │
│    Student submits ticket with Category, Hostel Block, Room, Priority,      │
│    Urgency, and Photo Evidence ➔ Validated via server-side Zod schemas      │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 3. Automated Ledger Routing & Notification                                  │
│    Ticket is assigned unique TCK ID ➔ Stored in PostgreSQL ➔ Appears        │
│    instantly in Student Ledger and routes to the designated Department Wing │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ 4. Triage, Staff Assignment & Life-Cycle Resolution                         │
│    Department triages ticket (Pending ➔ In Review ➔ In Progress ➔ Resolved) │
│    Assigns field technician ➔ Appends immutable timeline audit event ➔      │
│    Real-time status updates communicated to the student                     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 HTML / Slide-Ready Visual Format

```html
<div style="background-color: #3b9ab8; color: white; padding: 24px; font-family: 'Segoe UI', Arial, sans-serif; border-radius: 8px; display: flex; gap: 24px;">

  <!-- LEFT SECTION: TECHNICAL APPROACH -->
  <div style="flex: 1.2;">
    <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
      <div style="border: 2px solid #5d4037; border-radius: 50%; padding: 8px 16px; background: white; color: black; font-weight: bold; text-align: center; font-size: 13px;">
        Team<br>CampusCare
      </div>
      <h2 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 1px; color: black;">
        TECHNICAL APPROACH
      </h2>
    </div>

    <ul style="font-size: 13px; line-height: 1.5; padding-left: 20px; color: black; font-weight: 500;">
      <li style="margin-bottom: 8px;">
        <strong>Technologies Used:</strong> 
        Frontend: React 18, Vite 6, TypeScript, Tailwind CSS | Backend: Node.js, Express, PostgreSQL, Prisma ORM
      </li>
      <li style="margin-bottom: 8px;">
        <strong>State Management & Architecture:</strong> 
        React Context API (ComplaintContext) for real-time CRUD actions (create, status updates, staff dispatch, comments) + Decoupled 3-Tier Controller-Service architecture.
      </li>
      <li style="margin-bottom: 8px;">
        <strong>Data Layer:</strong> 
        ACID-compliant PostgreSQL database via Prisma ORM with relational integrity across Users, Departments, Complaints, Comments, and Timeline audit trails.
      </li>
      <li style="margin-bottom: 8px;">
        <strong>Authentication & Security:</strong> 
        JWT Bearer Authentication, BCrypt hashing, strict server-side RBAC (Student, Staff, Dean/Admin), and session-locked credential protection.
      </li>
      <li style="margin-bottom: 8px;">
        <strong>Config & Reverse Proxy:</strong> 
        Unified reverse proxy in Vite (<code>vite.config.ts</code>) routing API calls directly to port 5000 — eliminating CORS issues and enabling instant LAN/Tunnel sharing.
      </li>
      <li style="margin-bottom: 8px;">
        <strong>IDs & Accountability:</strong> 
        Collision-free <code>TCK-XXX</code> ticket numbering + UUIDs with immutable timeline audit logs for transparent hostel grievance tracking.
      </li>
    </ul>
  </div>

  <!-- RIGHT SECTION: METHODOLOGY -->
  <div style="flex: 0.9; display: flex; flex-direction: column; align-items: center;">
    <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 800; color: black;">
      Methodology
    </h2>

    <!-- CHEVRON STEP 1 -->
    <div style="background-color: #2b5b84; color: white; padding: 12px 20px; border-radius: 4px; margin-bottom: 12px; width: 90%; text-align: center; font-size: 13px; font-weight: bold; clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%);">
      Student / Staff logs in &rarr; JWT Auth & Role-Based Redirect
    </div>

    <!-- CHEVRON STEP 2 -->
    <div style="background-color: #2b5b84; color: white; padding: 12px 20px; border-radius: 4px; margin-bottom: 12px; width: 90%; text-align: center; font-size: 13px; font-weight: bold; clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%);">
      Student files complaint via Category, Hostel Block & Urgency form
    </div>

    <!-- CHEVRON STEP 3 -->
    <div style="background-color: #2b5b84; color: white; padding: 12px 20px; border-radius: 4px; margin-bottom: 12px; width: 90%; text-align: center; font-size: 13px; font-weight: bold; clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%);">
      Ticket routes to Student Ledger & designated Department Triage
    </div>

    <!-- CHEVRON STEP 4 -->
    <div style="background-color: #2b5b84; color: white; padding: 12px 20px; border-radius: 4px; margin-bottom: 12px; width: 90%; text-align: center; font-size: 13px; font-weight: bold; clip-path: polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%);">
      Staff assigned &rarr; Status updated (Pending &rarr; Resolved) & Timeline logged
    </div>
  </div>

</div>
```
