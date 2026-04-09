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

## Setup

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Set in `.env`:
- `MONGO_URI`
- `JWT_SECRET`
- `GEMINI_API_KEY`

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

- Auth: `/api/auth/*`
- Dashboard: `/api/dashboard`
- Feed: `/api/posts/*`
- Tasks: `/api/tasks/*`
- Placements: `/api/placements/*`
- Events: `/api/events/*`
- AI: `/api/ai/generate`
- Users (admin): `/api/users`
