# Narayan e-Gurukul — Smart Learning Platform

**Live Site:** [narayenegurukul.com](https://narayenegurukul.com)

India's free smart learning platform for B.Tech students, JEE/NEET aspirants, and school competition students. Provides curated notes, solved PYQs, formula sheets, and Olympiad prep — all in one place, 100% free.

---

## What's Inside

| Section | Description |
| :--- | :--- |
| B.Tech Resources | Notes, PYQs & lab manuals for CSE Core, AIDS, AIML |
| JEE Preparation | Physics, Chemistry, Maths — notes, formulas & solved PYQs |
| NEET Preparation | Biology, Physics, Chemistry — NCERT-based notes & mock tests |
| School Competitions | Olympiad, NTSE, KVPY, Science Quiz prep guides |
| My School | Connected school portal — notices, timetable, calendar |

---

## Pages

```
index.html               ← Homepage (hero, all sections, contact)
about.html               ← Mission & team
batch.html               ← B.Tech academic batch cards
btech-studymaterial.html ← Full study material hub
btech-core.html          ← B.Tech Core resources
cse-aids.html            ← CSE (AI & Data Science) resources
cse-aiml.html            ← CSE (AI & ML) resources
login.html               ← User login
signup.html              ← User registration
forgot-password.html     ← Password reset
admin.html               ← Inquiry management dashboard
```

---

## File Structure

```
Narayan e-Gurukul/
│
├── index.html               ← Main landing page
├── about.html               ← About & mission
├── batch.html               ← B.Tech batches
├── btech-studymaterial.html ← Study material hub
├── btech-core.html          ← B.Tech Core
├── cse-aids.html            ← CSE AIDS
├── cse-aiml.html            ← CSE AIML
│
├── login.html               ← Login
├── signup.html              ← Signup
├── forgot-password.html     ← Password recovery
├── admin.html               ← Admin dashboard
│
├── style.css                ← Global design system
├── script.js                ← Navbar, animations, scroll
├── server.js                ← Node.js Express backend
│
├── database.db              ← SQLite primary database
├── package.json             ← Node.js manifest
├── package-lock.json        ← Dependency lock
├── SetupNode.bat            ← 1-click Windows setup
│
├── sitemap.xml              ← Google sitemap
├── robots.txt               ← Search crawler rules
│
├── 03.png                   ← Hero image asset
├── 04.jpeg / 05.jpeg        ← Additional assets
└── README.md                ← This file
```

---

## Homepage Sections (index.html)

The homepage is fully mobile responsive with these sections in order:

1. **Hero** — Headline, CTA buttons, stats (15k+ downloads, 150+ students, 100% free), animated orbit visual
2. **What We Offer** — 3 cards: B.Tech · JEE & NEET · School Competitions
3. **B.Tech Resources** — Quick-link tiles to Core, AIDS, AIML, All Resources
4. **JEE & NEET** — Side-by-side prep cards with feature grids and CTA
5. **School Competitions** — Olympiad, NTSE, KVPY, Coding contest prep
6. **My School** — Connected school portal with notices, calendar, timetable
7. **About / Mission** — Stats: 15k+ downloads · 150+ students · 100% free
8. **Contact** — Email form + location info

---

## Run Locally

```bash
# Install dependencies
npm install

# Start the backend server
npm start
```

Open: **http://localhost:3000**

Or just open `index.html` directly in a browser — no server needed for the frontend.

---

## Backend API

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/status` | GET | Server health & active DB engine |
| `/api/inquiries` | GET | All inquiry submissions |
| `/api/inquiries` | POST | Save new inquiry |
| `/api/inquiries/:id` | DELETE | Delete inquiry by ID |

**Database strategy:** SQLite (primary) → JSON file (fallback) → Browser LocalStorage (offline fallback)

---

## SEO Setup

- Full meta tags: title, description, keywords, canonical, robots
- Open Graph tags for Facebook, WhatsApp, LinkedIn sharing
- Twitter Card for rich link previews
- JSON-LD structured data (`EducationalOrganization` schema)
- `sitemap.xml` submitted to Google Search Console
- `robots.txt` blocks admin, server files, and node_modules

---

## Design System

| Token | Value | Use |
| :--- | :--- | :--- |
| Primary blue | `#2563eb` | Buttons, links, highlights |
| Dark navy | `#0f172a` | Headings, navbar |
| Light bg | `#f8fafc` | Section alternates |
| Text | `#334155` | Body copy |
| Muted | `#64748b` | Descriptions |
| Border | `#e2e8f0` | Cards, dividers |

- **Font:** Outfit (Google Fonts, weights 300–800)
- **Icons:** Remix Icon v4.1
- **Responsive breakpoints:** 860px · 768px · 480px

---

## Google Hosting (Firebase / Netlify)

To deploy on **Firebase Hosting:**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

To deploy on **Netlify:** drag and drop the project folder at [app.netlify.com](https://app.netlify.com) or connect your GitHub repo.

---

*© 2026 Narayan e-Gurukul. Crafted for students across India.*
