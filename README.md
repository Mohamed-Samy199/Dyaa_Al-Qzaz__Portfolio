# Dyaa Al-Qzaz — Portfolio Site & Admin Dashboard

A single React application that serves two things: the public **motion designer portfolio site** for Dyaa Al-Qzaz, and a protected **admin dashboard** (at `/dashboard`) that lets him manage every piece of content on the site — no code changes required.

## ✨ Features

### Public site
- Animated **Hero** section (GSAP entrance animations, mouse parallax, particle canvas effect, showreel video modal)
- **About** section with a bio, kinetic background text, and a mini skills grid
- **Creative Services / Skills** section — expandable category strips (Motion Graphics, Visual Storytelling, Video Editing, Thumbnail Design, Voice Over) each opening a full-screen work gallery
- **Latest Projects** carousel (Swiper, coverflow effect) with a video lightbox
- **AI Generative Film Reels** — a cinematic "tape archive" list of AI-generated reels
- **Client Reviews** — an infinite GSAP marquee of testimonial screenshots
- Fully driven by live data from the backend API — nothing is hardcoded

### Admin dashboard (`/dashboard`)
- JWT-based login (single admin account)
- A management page per section (Hero, About, Skills, Videos, Reels, Reviews) with full create/edit/delete
- Drag-and-drop reordering for list-based sections
- File uploads (images, videos, PDFs) with live preview, going straight to Cloudinary
- Account settings page to change the admin password
- Overview page showing at a glance which sections have content published

## 🧱 Tech Stack

- React + Vite
- Tailwind CSS (`@material-tailwind/react`) with a custom theme (`mainColor`, `lightColor`, `mainGold`)
- TanStack Query (React Query) for all data fetching, caching, and mutations
- Formik + Yup for forms and validation
- Axios for HTTP requests
- GSAP + ScrollTrigger for animations
- Swiper for the projects carousel
- @dnd-kit for drag-and-drop reordering
- lucide-react for icons
- react-router-dom for routing

## 📁 Project Structure (high level)

```
src/
├── api/                # axios client + one file per resource (hero, about, skills, videos, reels, reviews, auth, uploads)
├── hooks/               # React Query hooks per resource (queries + mutations)
├── components/
│   ├── ui/               # shared dashboard UI kit (Card, TextInput, FileInput, Toggle, Button, SortableList, ...)
│   ├── auth/              # login form
│   ├── layout/             # dashboard shell (Sidebar, Topbar, DashboardLayout)
│   ├── home/                # public site sections (Hero, AboutMe, CreativeServices, MyProjects, AiFilmReel, ClientReviews)
│   ├── skills/               # skill category form (dashboard)
│   ├── videos/                # project form (dashboard)
│   └── reviews/                # review form (dashboard)
├── pages/
│   ├── auth/                    # LoginPage
│   └── dashboard/                 # one management page per section + Overview + Account Settings
├── routes/                          # route definitions + ProtectedRoute
├── store/                            # auth token storage helper
├── constants/                         # shared option lists (icons, etc.)
└── App.jsx
```

## ⚙️ Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file:
   ```
   VITE_API_URL=http://localhost:4000/api
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

## 🔐 Authentication

The dashboard is protected by JWT auth against the backend's single admin account (created via the backend's seed script — there is no public sign-up). The token is stored in `localStorage` and attached automatically to every API request; an expired or invalid token redirects back to `/login`.

## 🖇️ Backend

This app is the frontend counterpart to the [Dyaa Al-Qzaz Portfolio Backend API](#) — see that repo's README for API endpoints and setup.