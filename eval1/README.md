# 🎓 EVENTORA — Evaluation 1 (Foundations & Core Student Event Platform)
> **“Discover Events. Create Memories.”**  
> *Academic Evaluation 1: B.E. CSE (AI & ML) Project Submission*

This directory (`eval1/`) contains the standalone codebase for **Evaluation 1**, scoped to foundational event discovery, multi-filtering, live event countdown, attendee reviews, and streamlined student pass booking.

---

## 🎨 Evaluation 1 Design & Scope Philosophy
- **Simplified Visual Styling**: Clean, structured dark slate interface without heavy glassmorphism or neon glow overlays to represent an authentic Phase 1 academic submission.
- **Fixed Dark Mode**: Streamlined theme without complex toggles.
- **Student-Centric Navigation**: Focused exclusively on attendees (*Home, Explore, Categories, Wishlist, My Bookings, Profile, About, Contact*).
- **Streamlined Booking**: Direct 2-step student pass booking with instant digital boarding pass generation.

---

## 📑 Syllabus Topics Implemented

- **HTML5 & Semantic Structure**: Semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), accessible forms, labels, and alt attributes.
- **CSS3 Layouts & Co-located Modules**: Co-located JSX + CSS structure per page/component, CSS Box Model, Flexbox, CSS Grid, media queries, and clean design variables.
- **JavaScript ES6+**: Arrow functions, destructuring, spread/rest syntax, modules, array methods (`filter`, `map`, `reduce`, `find`, `sort`), JSON mock data.
- **React 18 & Hooks**:
  - `useState` for search, multi-filters, form state, and review inputs.
  - `useEffect` for real-time live event countdown timer (`setInterval`).
  - `useRef` for autofocusing search inputs.
  - `useMemo` for high-performance filter calculations.
  - Custom Hooks: `useLocalStorage.js` (browser storage sync) & `useCountdown.js` (live ticker).
- **React Router v6**: Dynamic routes (`/event/:id`, `/booking/:id`, `/ticket/:id`), route parameters (`useParams`), and 404 error handling.

---

## 📂 Evaluation 1 Directory Structure (Folder-Per-Subpart Pattern)

```
eval1/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx & index.css
    ├── App.jsx & App.css
    ├── context/
    │   ├── AuthContext.jsx
    │   ├── EventContext.jsx
    │   └── ThemeContext.jsx
    ├── hooks/
    │   ├── useLocalStorage.js
    │   └── useCountdown.js
    ├── data/
    │   ├── eventsData.js
    │   ├── categoriesData.js
    │   ├── reviewsData.js
    │   └── mockUsers.js
    ├── utils/
    │   └── helpers.js
    ├── styles/
    │   ├── variables.css
    │   ├── animations.css
    │   └── components.css
    ├── components/
    │   ├── Navbar/ (Navbar.jsx, Navbar.css)
    │   ├── Footer/ (Footer.jsx, Footer.css)
    │   ├── EventCard/ (EventCard.jsx, EventCard.css)
    │   ├── CategoryCard/ (CategoryCard.jsx, CategoryCard.css)
    │   ├── SearchBar/ (SearchBar.jsx, SearchBar.css)
    │   ├── FilterPanel/ (FilterPanel.jsx, FilterPanel.css)
    │   ├── Countdown/ (Countdown.jsx, Countdown.css)
    │   ├── Rating/ (Rating.jsx, Rating.css)
    │   ├── Toast/ (Toast.jsx, Toast.css)
    │   ├── Modal/ (Modal.jsx, Modal.css)
    │   └── DigitalTicket/ (DigitalTicket.jsx, DigitalTicket.css)
    └── pages/
        ├── Home/ (Home.jsx, Home.css)
        ├── Explore/ (Explore.jsx, Explore.css)
        ├── Categories/ (Categories.jsx, Categories.css)
        ├── EventDetails/ (EventDetails.jsx, EventDetails.css)
        ├── Booking/ (Booking.jsx, Booking.css)
        ├── Ticket/ (Ticket.jsx, Ticket.css)
        ├── MyBookings/ (MyBookings.jsx, MyBookings.css)
        ├── Wishlist/ (Wishlist.jsx, Wishlist.css)
        ├── Login/ (Login.jsx, Login.css)
        ├── Register/ (Register.jsx, Register.css)
        ├── Profile/ (Profile.jsx, Profile.css)
        ├── About/ (About.jsx, About.css)
        ├── Contact/ (Contact.jsx, Contact.css)
        └── NotFound/ (NotFound.jsx, NotFound.css)
```

---

## 👥 4-Member Team Distribution for Evaluation 1

| Team Member | Role | Files & Components Responsible For |
| :--- | :--- | :--- |
| **Akanshi** *(Lead)* | Core Architecture, Shell & Landing Page | `App.jsx`, `main.jsx`, `ThemeContext.jsx`, `variables.css`, `Navbar/`, `Footer/`, `Home/`, `NotFound/` |
| **Mridul** | Search Engine & Discovery Catalog | `Explore/`, `Categories/`, `CategoryCard/`, `SearchBar/`, `FilterPanel/`, `EventCard/`, `eventsData.js`, `categoriesData.js` |
| **Priyanshi** | Event Details, Countdown & Reviews UX | `EventDetails/`, `Countdown/`, `Rating/`, `Toast/`, `Modal/`, `useCountdown.js`, `EventContext.jsx`, `reviewsData.js` |
| **Member 4** | Booking Flow, Tickets & User Auth | `Booking/`, `Ticket/`, `DigitalTicket/`, `MyBookings/`, `Wishlist/`, `Login/`, `Register/`, `Profile/`, `About/`, `Contact/`, `AuthContext.jsx`, `useLocalStorage.js` |

---

## ⚡ Quick Start

```bash
# 1. From the project root:
npm run dev:eval1

# 2. Or from inside eval1:
cd eval1
npm run dev

# 3. Open in browser:
# http://localhost:5174
```
