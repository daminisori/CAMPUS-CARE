# Campus Care — Full Stack Grievance Redressal System

Campus Care is an end-to-end student grievance redressal and campus dispatch system featuring a retro ticket ledger frontend and a Node.js + TypeScript + PostgreSQL REST API backend.

---

## Project Structure

```
.
├── backend/                      # Node.js + Express + Prisma + PostgreSQL Backend
│   ├── src/
│   │   ├── config/               # Environment and DB singleton
│   │   ├── controllers/          # Request handlers
│   │   ├── middleware/           # Auth, RBAC, Validation, Error Handler
│   │   ├── routes/               # API route definitions
│   │   ├── services/             # Core business logic & database queries
│   │   ├── validators/           # Zod schemas
│   │   ├── app.ts                # Express application setup
│   │   └── server.ts             # Server entrypoint
│   ├── prisma/
│   │   ├── schema.prisma         # Prisma schema & PostgreSQL relations
│   │   └── seed.ts               # Database seeder
│   ├── test/
│   │   └── api.test.ts           # Automated test suite
│   ├── .env.example              # Backend environment template
│   └── package.json
│
├── src/                          # Locked React Frontend
│   ├── components/               # Retro ticket UI components
│   ├── context/                  # ComplaintContext connected to REST API
│   ├── pages/                    # Dashboards, Login, Submit, Details
│   └── services/                 # Centralized api.ts client
│
├── .env                          # Frontend environment (VITE_API_BASE_URL)
├── package.json
└── README.md
```

---

## Running the Application

### 1. Start the Backend

In one terminal:

```bash
cd backend
npm install
npm run db:start   # Boots embedded PostgreSQL server on port 5432
npm run db:push    # Applies schema to database
npm run db:seed    # Populates initial accounts and complaints
npm run dev        # Starts API server on http://localhost:5000
```

To run the automated API and RBAC test suite:
```bash
npm run test:api
```

### 2. Start the Frontend

In a second terminal:

```bash
npm install
npm run dev
```

Open `http://localhost:5173/` in your browser.

---

## Demo Accounts

Password for all accounts: `password123`

- **Student**: `aarav.mehta@campus.edu`
- **Student**: `damini.sori@campus.edu`
- **Staff (Maintenance)**: `rajesh.maint@campus.edu`
- **Staff (IT / Network)**: `vikram.net@campus.edu`
- **Dean / Admin**: `dean.studentaffairs@campus.edu`
