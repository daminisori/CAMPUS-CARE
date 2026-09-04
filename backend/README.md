# Campus Care — REST API Backend

Node.js, Express, TypeScript, and PostgreSQL backend for the **Campus Care** student grievance and maintenance dispatch system.

---

## Architecture Overview

```
React Frontend (Vite, Tailwind, Locked UI)
      │
      │  HTTP Requests + JWT Bearer Auth
      ▼
Express REST API (backend/)
  ├── Helmet Security & CORS Handling
  ├── Rate Limiting & Morgan Logging
  ├── JWT Auth & Role-Based Access Control (RBAC: student, staff, admin)
  ├── Zod Request Validation & Centralized Error Handling
  ├── Static Local Upload Storage (/uploads)
  └── Controllers & Service Layer
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL Database (localhost:5432)
  ├── Users, Departments, Branches
  ├── Complaints (Ticket Number, Category, Status, Urgency, Photos)
  ├── Complaint Timeline Events & Discussion Comments
  └── Notifications & Dashboard Aggregates
```

---

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env`:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/campus_care?schema=public"
JWT_SECRET="campus-care-super-secret-jwt-key-2026-production-ready"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:5173"
```

### 3. Start Database & Apply Schema

```bash
# Start embedded PostgreSQL server (or use your existing PostgreSQL instance on port 5432)
npm run db:start

# Push schema to database
npm run db:push

# Seed database with demo users, departments, branches, complaints, and timeline events
npm run db:seed
```

### 4. Run the API Server

```bash
# Development mode with hot-reload
npm run dev

# Or build & start production bundle
npm run build
npm start
```

The API will be live at `http://localhost:5000`.

### 5. Run Automated Tests

```bash
npm run test:api
```

---

## Seed Accounts

All accounts use the default password: `password123`

| Role | Email | Name | Context |
|------|-------|------|---------|
| **Student** | `aarav.mehta@campus.edu` | Aarav Mehta | CSE Dept, Block C |
| **Student** | `damini.sori@campus.edu` | Damini Sori | CSE Dept, Block C |
| **Staff** | `rajesh.maint@campus.edu` | Rajesh Sharma | Campus Maintenance & Electricals |
| **Staff** | `vikram.net@campus.edu` | Vikram Verma | IT & Campus Network Cell |
| **Admin** | `dean.studentaffairs@campus.edu` | Dr. Sunita Rao | Academic & Student Affairs Office |

---

## API Endpoints Reference

### Authentication
- `POST /auth/login` — Sign in and obtain JWT token
- `GET /users/me` — Get authenticated user profile (`Authorization: Bearer <token>`)

### Complaints
- `GET /complaints` — List complaints (RBAC: students see own, staff see department, admin sees all; supports query filters `?status=`, `?department=`, `?category=`)
- `GET /complaints/:id` — Get full complaint details with timeline & comments
- `POST /complaints` — Submit new complaint ticket
- `PATCH /complaints/:id` — Update complaint status, assign staff, or post comments

### Metadata & Dashboard
- `GET /departments` — List official campus departments
- `GET /branches` — List academic branches
- `GET /dashboard/stats` — Aggregated complaint statistics from PostgreSQL
- `GET /notifications` — System notifications & alerts

### File Uploads
- `POST /uploads` — Upload photos/attachments (`multipart/form-data`, field: `file`)
