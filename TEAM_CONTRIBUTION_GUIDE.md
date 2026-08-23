# 🏆 EVENTORA — Evaluation 1 Team Contribution & GitHub Upload Guide

This document outlines the **4-Member Team Distribution** for the **First Academic Evaluation (Evaluation 1)** of **EVENTORA (College Event Management & Smart Booking Platform)**.

All files are structured using the **folder-per-subpart pattern** where each component and page has its own folder containing both its `.jsx` and co-located `.css` file.

---

## 👥 4-Member Team Allocation Summary

| Member Name | Role / Specialization | Key Subparts & Folders | Syllabus Topics Covered |
| :--- | :--- | :--- | :--- |
| **1. Akanshi** *(Team Lead)* | **Core Architecture & Landing** | `App/`, `Navbar/`, `Footer/`, `Home/`, `NotFound/`, `ThemeContext/`, `variables.css` | React Architecture, Global Layout, Semantic HTML5, CSS Variables, Theme Toggling, 404 Routing |
| **2. Mridul** | **Search, Discovery & Filter Engine** | `Explore/`, `Categories/`, `CategoryCard/`, `SearchBar/`, `FilterPanel/`, `eventsData.js` | Controlled Components, ES6+ Array Methods (`filter`, `map`), Lifting State Up, Student Budget Filters |
| **3. Priyanshi** | **Event Details & Interactive UX** | `EventDetails/`, `Countdown/`, `Rating/`, `Toast/`, `useCountdown.js`, `EventContext/` | `useEffect`, Real-Time Live Ticker (`setInterval`), `useContext`, Toast Notification System, Custom Hooks |
| **4. Member 4** | **Booking Flow, Tickets & Auth** | `Booking/`, `Ticket/`, `DigitalTicket/`, `Wishlist/`, `Login/`, `Register/`, `Profile/`, `Contact/` | React Router Dynamic Params (`/ticket/:id`), `useLocalStorage`, Form Validation, Print Styles, Boarding Pass UI |

---

## 📂 Detailed File Breakdown by Team Member

### 👤 1. AKANSHI (Team Lead & Core Architecture)
**Assigned Subparts & Files:**
- `src/App.jsx` & `src/App.css` — Root route definitions and application viewport shell
- `src/main.jsx` & `index.html` — React 18 bootstrap, HTML5 semantic structure, and context providers
- `src/styles/variables.css` & `src/styles/animations.css` — Color tokens (Navy, Teal, Purple, Gold) and micro-interactions
- `src/context/ThemeContext.jsx` — Dark/Light mode switcher with `localStorage` persistence
- `src/components/Navbar/Navbar.jsx` & `Navbar.css` — Responsive header, sticky backdrop blur, mobile drawer, theme button
- `src/components/Footer/Footer.jsx` & `Footer.css` — 4-column semantic footer, campus links, newsletter placeholder
- `src/pages/Home/Home.jsx` & `Home.css` — Hero section, dynamic search CTA, platform stats, category strip, trending showcase, how-it-works timeline
- `src/pages/NotFound/NotFound.jsx` & `NotFound.css` — 404 error page with navigation fallback

**Syllabus Topics Evaluated:**
- HTML5 semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- CSS3 Box Model, Flexbox, Grid, CSS Variables, Dark/Light Themes
- React component composition, props, and declarative React Router v6 configuration

---

### 👤 2. MRIDUL (Search, Discovery & Filter Engine)
**Assigned Subparts & Files:**
- `src/pages/Explore/Explore.jsx` & `Explore.css` — Multi-faceted event catalog, grid/list view toggler, empty states
- `src/pages/Categories/Categories.jsx` & `Categories.css` — Category directory with live event counters
- `src/components/CategoryCard/CategoryCard.jsx` & `CategoryCard.css` — Interactive category badge with hover transform
- `src/components/SearchBar/SearchBar.jsx` & `SearchBar.css` — Smart search input with `useRef` autofocus and category dropdown
- `src/components/FilterPanel/FilterPanel.jsx` & `FilterPanel.css` — Multi-facet filter panel with **Student Budget Tiers** (Free, Under ₹200, ₹200–₹500, Above ₹500), city filter, and sorting
- `src/components/EventCard/EventCard.jsx` & `EventCard.css` — Reusable card with badges, price formatting, favorite toggle, and CTA
- `src/data/eventsData.js` & `src/data/categoriesData.js` — Seed database for Music, Tech, Sports, Workshops, Cultural events

**Syllabus Topics Evaluated:**
- JavaScript ES6+ array methods (`filter`, `map`, `sort`, `reduce`)
- Controlled components, form inputs, `useRef` for focus management
- Lifting state up between `SearchBar`, `FilterPanel`, and `Explore`

---

### 👤 3. PRIYANSHI (Event Details & Interactive UX)
**Assigned Subparts & Files:**
- `src/pages/EventDetails/EventDetails.jsx` & `EventDetails.css` — Dynamic route page (`/event/:id`), hero banner, schedule agenda, venue details, organizer card
- `src/components/Countdown/Countdown.jsx` & `Countdown.css` — 4-digit live countdown display (Days, Hours, Minutes, Seconds)
- `src/hooks/useCountdown.js` — Custom React hook utilizing `useEffect` and `setInterval` to calculate remaining time
- `src/components/Rating/Rating.jsx` & `Rating.css` — Interactive star rating component with review submission
- `src/data/reviewsData.js` — Seed reviews and testimonial feedback data
- `src/components/Toast/Toast.jsx` & `Toast.css` — Floating action notification toast
- `src/components/Modal/Modal.jsx` & `Modal.css` — Accessible dialog overlay with backdrop blur
- `src/context/EventContext.jsx` — Central state management for bookings, wishlist items, toast alerts, and custom reviews

**Syllabus Topics Evaluated:**
- `useEffect` lifecycle handling with timer cleanups (`clearInterval`)
- React Custom Hooks (`useCountdown`)
- Global state management using React Context API (`EventContext`)
- Star rating calculation and dynamic average scoring

---

### 👤 4. MEMBER 4 (Booking Flow, Tickets & User Auth)
**Assigned Subparts & Files:**
- `src/pages/Booking/Booking.jsx` & `Booking.css` — Streamlined student pass booking flow: Tier selection, Attendee details form validation, Student discount computation (`STUDENT50`, `CAMPUS2026`)
- `src/pages/Ticket/Ticket.jsx` & `Ticket.css` — Standalone ticket view page with Print/Save action
- `src/components/DigitalTicket/DigitalTicket.jsx` & `DigitalTicket.css` — Boarding pass style ticket with QR code visual, reference ID, and print styling (`@media print`)
- `src/pages/MyBookings/MyBookings.jsx` & `MyBookings.css` — User booking history with direct ticket retrieval
- `src/pages/Wishlist/Wishlist.jsx` & `Wishlist.css` — Bookmarked events list with 1-click booking
- `src/pages/Login/Login.jsx` & `Login.css` — Controlled login form with 1-click viva demo credentials
- `src/pages/Register/Register.jsx` & `Register.css` — Student registration form with controlled inputs & validation
- `src/pages/Profile/Profile.jsx` & `Profile.css` — User profile statistics and activity badges
- `src/pages/About/About.jsx` & `About.css` — Eventora mission, tech stack overview, and team credits
- `src/pages/Contact/Contact.jsx` & `Contact.css` — Controlled contact form with validation and FAQ accordion
- `src/context/AuthContext.jsx` & `src/data/mockUsers.js` — User authentication provider and mock student credentials
- `src/hooks/useLocalStorage.js` — Persistent browser storage hook

**Syllabus Topics Evaluated:**
- React Router dynamic routing with parameters (`useParams`)
- Controlled forms with input validation (`onSubmit`, `onChange`)
- Browser storage (`localStorage`) synchronization
- CSS Print Media Queries (`@media print`) for digital ticket generation

---

## 🚀 Step-by-Step GitHub Upload Workflow

### Option A: 1 Repository with Feature Branches (Recommended for Team Evaluation)
The team lead (**Akanshi**) creates the GitHub repository, and each member pushes their assigned branch:

```bash
# 1. AKANSHI: Initialize & Push Base Setup
cd "eval1"
git init
git add .
git commit -m "feat(core): initial setup, navigation, landing page & routing by Akanshi"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/eventora-eval1.git
git push -u origin main

# 2. MRIDUL: Push Search & Filters Feature Branch
git checkout -b feature/search-and-filters
git add src/pages/Explore/ src/pages/Categories/ src/components/FilterPanel/ src/components/SearchBar/ src/components/CategoryCard/ src/components/EventCard/ src/data/
git commit -m "feat(discovery): explore catalog, search bar & filter panel by Mridul"
git push -u origin feature/search-and-filters

# 3. PRIYANSHI: Push Event Details & Countdown Feature Branch
git checkout -b feature/event-details-ux
git add src/pages/EventDetails/ src/components/Countdown/ src/components/Rating/ src/components/Toast/ src/components/Modal/ src/hooks/useCountdown.js src/context/EventContext.jsx
git commit -m "feat(details): event details, live countdown timer & reviews by Priyanshi"
git push -u origin feature/event-details-ux

# 4. MEMBER 4: Push Booking, Tickets & Auth Feature Branch
git checkout -b feature/booking-and-auth
git add src/pages/Booking/ src/pages/Ticket/ src/pages/MyBookings/ src/pages/Wishlist/ src/pages/Login/ src/pages/Register/ src/pages/Profile/ src/pages/About/ src/pages/Contact/ src/components/DigitalTicket/ src/hooks/useLocalStorage.js src/context/AuthContext.jsx
git commit -m "feat(booking): booking flow, digital boarding pass & authentication by Member 4"
git push -u origin feature/booking-and-auth
```

---

## 🏃 How to Run the Evaluation 1 Project

```bash
# Navigate to eval1 directory
cd eval1

# Install dependencies (if needed)
npm install

# Start local development server
npm run dev
# Server will start on http://localhost:5174
```
