# CampusFlow AI

Production-style Campus Collaboration + Placement + Productivity platform (MERN + Gemini).

## Project Structure

```text
hackathon-2026/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
└── PROJECT_TASKS.md
```

## Tech Stack

- Frontend: React + Vite + Tailwind + React Router + Axios
- Backend: Node.js + Express + MongoDB (Mongoose)
- AI: Google Gemini API (`POST /api/ai/generate`)

## MongoDB models (Mongoose)

Collections and schemas live in `backend/models/`:

| Model | File | Purpose |
|-------|------|--------|
| **User** | `User.js` | Auth profile: name, email, password hash, role (`student` / `admin` / `recruiter`), bio, skills |
| **Post** | `Post.js` | Collaboration feed: author, content, category (`Placement`, `Projects`, `Learning`, `Clubs`), likes, **embedded comments** (user ref + text) |
| **Task** | `Task.js` | Personal tasks: owner, title, description, completed |
| **Placement** | `Placement.js` | Job listings: title, company, description, postedBy; **embedded applications** (applicant + resume URL) |
| **Event** | `Event.js` | Events/clubs: title, description, date, createdBy, attendees |
| **RegisterOtp** | `RegisterOtp.js` | Short-lived email verification codes for signup (TTL index on `expiresAt`) |

### Registration email (OTP)

- `POST /api/auth/register-otp` — body `{ "email": "..." }` sends a 6-digit code (**Nodemailer**). If SMTP env vars are not set, the code is **logged on the server** for local development.
- `POST /api/auth/register` — body must include `{ "name", "email", "password", "role", "otp" }`.

See `backend/.env.example` for `SMTP_*` and `EMAIL_FROM`.

**Gmail troubleshooting**

- Use **no spaces around `=`** in `.env` (e.g. `SMTP_HOST=smtp.gmail.com`, not `SMTP_HOST = ...`).
- Avoid wrapping values in **quotes**; if you use quotes, the server strips them, but plain values are safest.
- Use a Google **App Password**, not your normal Gmail password (account must have **2-Step Verification** on).
- `EMAIL_FROM` should be the **same Gmail address** as `SMTP_USER`.

### Post images

- `POST /api/posts` accepts **multipart** form field `image` (optional) plus `content` and `category`. Static files are served from `/uploads/…`.

## Setup

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Set in `.env`:
- `MONGO_URI` (local standalone DBs often need no extra flags; the app sets `retryWrites: false` in code for hosts that do not support retryable writes)
- `JWT_SECRET`
- `GEMINI_API_KEY`
- Optional: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM` (for registration OTP emails)

Backend runs on `http://localhost:5000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

Optional env:
- `VITE_API_URL=http://localhost:5000/api`

## Phase 1 Features Implemented

- JWT auth + role-based access (`student`, `admin`, `recruiter`)
- Protected routes and app layout
- Dashboard with events, tasks, placements, AI suggestions
- Collaboration feed: create, like, comment, delete
- Task management: create, update, complete, delete
- Placement module: list/create/apply (resume URL in MVP)
- Events module: create (admin), join (users), list
- AI assistant panel using backend Gemini endpoint

## API Routes

- Auth: `/api/auth/*` (includes `register-otp`, `register`, `login`, `me`)
- Dashboard: `/api/dashboard`
- Feed: `/api/posts/*`
- Tasks: `/api/tasks/*`
- Placements: `/api/placements/*`
- Events: `/api/events/*`
- AI: `/api/ai/generate`
- Users (admin): `/api/users`
