# EVENTORA — Project Team & Module Division
## Front End Engineering-II Academic Project Evaluation

This document outlines the clear division of code, modules, and Git commit ownership among the 4 project team members: **Akanshi Sharma**, **Mridul Verma**, **Priyanshi Saxena**, and **Kuvum Rajput**.

---

### Team Matrix & Module Ownership

| Team Member | Module & Role | Core Pages & Files Owned | Key Syllabus Concepts Demonstrated |
| :--- | :--- | :--- | :--- |
| **Akanshi** | **Module 1: Core Architecture, Auth & Navigation** | `eval1/src/App.jsx`<br>`eval1/src/components/Navbar/`<br>`eval1/src/components/Footer/`<br>`eval1/src/context/AuthContext.jsx`<br>`eval1/src/pages/Profile/`<br>`eval1/src/pages/Login/`<br>`eval1/src/pages/Register/`<br>`eval1/src/styles/variables.css` | React Router v6, Context API, Protected Routes, Multi-account authentication, Controlled Forms, CSS Custom Properties & Dark/Light Theme Switching |
| **Mridul** | **Module 2: Advanced Event Discovery & Catalog** | `eval1/src/pages/Explore/`<br>`eval1/src/pages/EventDetails/`<br>`eval1/src/pages/Categories/`<br>`eval1/src/pages/Wishlist/`<br>`eval1/src/components/EventCard/`<br>`eval1/src/components/CategoryCard/`<br>`eval1/src/components/SearchBar/`<br>`eval1/src/components/Countdown/` | Dynamic Route Params (`useParams`), Array Filtering & Multi-criteria Search, State Lifting, `useMemo` for derived event lists, Conditional Rendering, Countdown Timers |
| **Priyanshi** | **Module 3: Smart Booking Engine & Group Bill-Split** | `eval1/src/pages/Booking/`<br>`eval1/src/pages/GroupBooking/`<br>`eval1/src/pages/Ticket/`<br>`eval1/src/components/DigitalTicket/`<br>`eval1/src/components/QRCodeDisplay/`<br>`eval1/src/utils/helpers.js` (`calculateEqualSplit`, `printPdfReceipt`) | Complex Multi-Step Forms, State Mutation & Seat Decrement, Exact Remainder Distribution Algorithm, Paytm Gateway Simulation, Offline SVG QR Code Generator, PDF Generation |
| **Kuvum** | **Module 4: Organizer Dashboard, Admin & Alerts** | `eval1/src/pages/Organizer/`<br>`eval1/src/pages/Admin/`<br>`eval1/src/pages/Notifications/`<br>`eval1/src/pages/About/`<br>`eval1/src/pages/Contact/`<br>`eval1/src/pages/NotFound/`<br>`eval1/src/context/EventContext.jsx` (CRUD & Reset) | Full CRUD Operations, Modal Dialogs (`useRef`/Portals), Status Tracking (Refunds & Moderation), Tab-based Views, In-App Notification Center, 1-Click Demo Reset Engine |

---

### Step-by-Step GitHub Upload & Contribution Guide

To demonstrate clear individual Git contribution graphs for college teachers during evaluation, each member can commit their respective files:

#### 1. Akanshi's Commits (Core Architecture & Authentication)
```bash
git add eval1/src/App.jsx eval1/src/components/Navbar/ eval1/src/components/Footer/ eval1/src/context/AuthContext.jsx eval1/src/pages/Profile/ eval1/src/pages/Login/ eval1/src/pages/Register/ eval1/src/styles/
git commit -m "feat(auth): implement multi-account demo system, theme switcher and persistent auth context"
```

#### 2. Mridul's Commits (Event Discovery & Catalog)
```bash
git add eval1/src/pages/Explore/ eval1/src/pages/EventDetails/ eval1/src/pages/Categories/ eval1/src/pages/Wishlist/ eval1/src/components/EventCard/ eval1/src/components/CategoryCard/ eval1/src/components/SearchBar/ eval1/src/components/Countdown/
git commit -m "feat(discovery): implement advanced explore filters, dynamic search, live countdown and wishlist engine"
```

#### 3. Priyanshi's Commits (Smart Booking & Group Bill-Splitting)
```bash
git add eval1/src/pages/Booking/ eval1/src/pages/GroupBooking/ eval1/src/pages/Ticket/ eval1/src/components/DigitalTicket/ eval1/src/components/QRCodeDisplay/ eval1/src/utils/helpers.js
git commit -m "feat(booking): implement signature group booking, exact bill-split engine, Paytm gateway and PDF pass"
```

#### 4. Kuvum's Commits (Organizer Dashboard, Admin & Notifications)
```bash
git add eval1/src/pages/Organizer/ eval1/src/pages/Admin/ eval1/src/pages/Notifications/ eval1/src/pages/About/ eval1/src/pages/Contact/ eval1/src/pages/NotFound/ eval1/src/context/EventContext.jsx CONTRIBUTORS.md
git commit -m "feat(dashboard): add organizer event CRUD, admin moderation, refund queue, notifications and demo reset"
```
