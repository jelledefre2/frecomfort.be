# Voltline Electrical — Modern Contractor Website

## Original Problem Statement
"Create a modern contractor website."
User specialization choice: electrical contracting ("elektricial").

## Architecture
- Backend: FastAPI + MongoDB (Motor async driver). All routes prefixed with `/api`.
- Frontend: React + React Router + Tailwind + Shadcn UI primitives. Dark Swiss/high-contrast aesthetic with `#FFD60A` accent. Cabinet Grotesk (display) + IBM Plex Sans/Mono (body/overline).
- Single-page marketing site at `/` plus admin dashboard at `/admin` to manage leads.

## User Personas
1. **Homeowner** — needs panel upgrades, EV chargers, rewires; wants trust signals + quick quote.
2. **Commercial client / GC** — fit-out work, three-phase, schedule certainty.
3. **Contractor owner (admin)** — review incoming leads, update status, follow up.

## Core Requirements (static)
- Strong hero + clear value prop, license/insurance signals.
- Services showcase (residential, commercial, panel, EV, emergency, lighting).
- Project gallery with category filters.
- Process / how-we-work breakdown.
- Testimonials.
- Quote request form (saves to MongoDB).
- Admin page to list / filter / status-update / delete leads.

## Implemented (2026-06-11)
- Backend: `/api/`, `/api/health`, `/api/leads` (CRUD + filter), `/api/leads/{id}` PATCH/DELETE, `/api/stats`.
- Frontend pages: `Home` (Hero, Services bento, Process, Gallery w/ filters, Testimonials, ContactForm, Footer), `Admin` (stat tiles, status filter, status update, delete with confirm, toast feedback).
- Lead model: id (uuid), name, email, phone, service_type (enum), address?, message, status (new/contacted/scheduled/won/lost), created_at.
- Testing: iteration_1 — backend 100%, frontend 100%, no failures.

## Backlog / Next Tasks
- P0: Auth on `/admin` (currently open; only owner should access).
- P1: Email/SMS notification on new lead (e.g., Resend / Twilio).
- P1: Lead CSV export from admin.
- P1: Real service-area map and Google reviews integration.
- P2: Blog/news section for SEO.
- P2: Image lightbox in gallery + real photo set.
- P2: Multi-language (EN/ES) for service-area demographics.
- P2: Calendar/booking widget for site visits.

## Notes
- `/admin` is intentionally unauthenticated for MVP — gate it before production launch.
- All env values (MONGO_URL, DB_NAME, REACT_APP_BACKEND_URL) come from .env files only.
