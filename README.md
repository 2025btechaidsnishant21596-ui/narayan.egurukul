# 🎓 Narayan e-Gurukul - Academic Portal & School Management System

Welcome to the premium **Narayan e-Gurukul** web ecosystem. This portal has been modernized and expanded to serve B.Tech engineering students with curated academic resources, and local administrators with a high-end school admissions database and inquiry management center.

---

## 🚀 1-Click Launch (Recommended for Windows)

To check requirements, install Node.js automatically, set up database dependencies, and start the live server in seconds, simply:
1. Open your project folder.
2. Double-click the custom script: **`SetupNode.bat`**.
3. Follow the simple on-screen instructions!

---

## ✨ Features Breakdown

### 1. 📂 Core Portals & Pages
* **[index.html](index.html):** Modern, premium landing hub built with `Outfit` font, sleek card layouts, interactive scroll animations, announcement banner, B.Tech exclusive section, "Why Narayan e-Gurukul?" advantage grid, and dynamic contact forms.
* **[about.html](about.html):** Detail-rich mission and values page with custom CSS grid layouts, stats counters (10k+ Downloads, 1k+ Notes), and 3-column core values blocks.
* **[batch.html](batch.html):** Curated B.Tech specializations cards (Core, CSE AIDS, CSE AIML) with subject feature lists and resource CTAs linking to Study Material.
* **[btech-studymaterial.html](btech-studymaterial.html):** Sleek B.Tech Study Materials "Coming Soon" notification board with poster image and back navigation.
* **[myschool.html](myschool.html):** Branded **"My School Page"** (Sanfort Pre-School, Hanumangarh) with academic programs, facilities showcase, leadership profiles, gallery grid, branch details, and a **dual tabbed Admission/Franchise inquiry form** connected to the backend database.

### 2. 🔐 Authentication Pages
* **[login.html](login.html):** Centered premium login card with email/password fields, "Remember Me" checkbox, Google sign-in option, and links to Sign Up and Forgot Password pages.
* **[signup.html](signup.html):** User registration form with full name, email, and password fields plus Google sign-up option.
* **[forgot-password.html](forgot-password.html):** Clean password reset card with email input and direct return path to Login.

### 3. 📊 Admin Inquiry Dashboard ([admin.html](admin.html))
A secure, responsive manager interface equipped with:
* **Live Server Status Indicator:** Real-time colored dot showing backend online/offline state and active database engine.
* **KPI Metrics:** Visual stat cards counting Total inquiries, Admissions, and Franchise sign-ups.
* **Smart Filter & Search:** Real-time text search, inquiry type filter (Admission/Franchise), and storage source filter (Server DB vs. Browser Cache).
* **Database Row Purge:** Instant delete operations against SQLite server or browser LocalStorage.
* **Visual DB Badges:** Color-coded source badges identifying exactly where each record is stored.

### 4. 📡 Fail-Safe Dual Database Engine
* **REST API Server ([server.js](server.js)):** Built on Express.js with a smart, fail-safe database strategy:
  * **Primary — SQLite Database (`database.db`):** Fast SQL storage for all inquiry submissions.
  * **Secondary — JSON File Database (`database.json`):** Zero-dependency automatic fallback if SQLite fails.
  * **Tertiary — Browser LocalStorage:** If the backend server is offline, forms in `myschool.html` auto-save to the browser cache — **no data is ever lost!**

---

## 📁 Project Folder Structure

```
Narayan e-Gurukul/
│
├── index.html               ← Homepage (Hub Page)
├── about.html               ← About Us & Mission
├── batch.html               ← B.Tech Academic Batches
├── btech-studymaterial.html ← Study Material (Coming Soon)
├── myschool.html            ← Sanfort Pre-School Branch Page
│
├── login.html               ← User Login
├── signup.html              ← User Registration
├── forgot-password.html     ← Password Recovery
│
├── admin.html               ← Inquiry Management Dashboard
│
├── style.css                ← Central Design System (all pages)
├── script.js                ← Global DOM Scripts (navbar, reveal animations)
├── server.js                ← Node.js Express Backend Server
│
├── database.db              ← SQLite Primary Database
├── database.json            ← JSON Fallback Database
│
├── 02.png                   ← Site Image Asset
├── 03.png                   ← Site Image Asset
├── 04.jpeg                  ← Announcement Banner Image
│
├── package.json             ← Node.js Project Manifest
├── package-lock.json        ← Dependency Lock File
├── SetupNode.bat            ← 1-Click Windows Setup Script
└── README.md                ← This File
```

---

## 🔗 Page Connection Map

```
index.html (Hub)
  ├── → about.html
  ├── → batch.html → btech-studymaterial.html
  ├── → myschool.html
  ├── → btech-studymaterial.html
  └── → #contact (anchor scroll)

login.html
  ├── → signup.html
  └── → forgot-password.html
         └── → login.html

myschool.html
  └── → POST /api/inquiries (Backend)

admin.html
  ├── → GET  /api/status
  ├── → GET  /api/inquiries
  └── → DELETE /api/inquiries/:id
```

---

## 🛠️ Manual Installation & Launch

```bash
# 1. Install all backend dependencies
npm install

# 2. Run the server on http://localhost:3000
npm start
```

Open your browser and navigate to: **http://localhost:3000**

---

## 📡 Backend REST API Schema

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/status` | `GET` | Returns active DB engine (SQLite / JSON) and server health |
| `/api/inquiries` | `GET` | Fetches all inquiries sorted by newest first |
| `/api/inquiries` | `POST` | Saves a new Admission or Franchise inquiry to the database |
| `/api/inquiries/:id` | `DELETE` | Permanently deletes an inquiry record by ID |

---

## 📐 Design System (`style.css`)

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--primary` | `#0f172a` | Headings, dark elements |
| `--accent` | `#2563eb` | Buttons, links, highlights |
| `--bg` | `#ffffff` | Page background |
| `--bg-alt` | `#f8fafc` | Section alternates, inputs |
| `--text-main` | `#334155` | Body text |
| `--text-muted` | `#64748b` | Descriptions, subtexts |
| `--border` | `#e2e8f0` | Card borders |
| `--shadow-xl` | Layered | Premium card elevations |
| `--radius-xl` | `1.5rem` | Rounded cards |
| `--transition` | `0.3s cubic-bezier` | Smooth hover animations |

* **Typography:** Google Fonts — `Outfit` (weights 300–800)
* **Icons:** Remix Icon v4.1 (CDN)
* **Animations:** Scroll-triggered `.reveal` class via `IntersectionObserver`
* **Responsive Breakpoints:** `1024px`, `768px`, `480px`

---

## 🌐 Live URL Map (Local Server)

| Page | URL |
| :--- | :--- |
| Homepage | http://localhost:3000/index.html |
| About Us | http://localhost:3000/about.html |
| Our Batches | http://localhost:3000/batch.html |
| Study Material | http://localhost:3000/btech-studymaterial.html |
| My School Page | http://localhost:3000/myschool.html |
| Login | http://localhost:3000/login.html |
| Sign Up | http://localhost:3000/signup.html |
| Forgot Password | http://localhost:3000/forgot-password.html |
| Admin Dashboard | http://localhost:3000/admin.html |
| API Status | http://localhost:3000/api/status |

---

*© 2026 Narayan e-Gurukul. Crafted with excellence for engineering students.*
