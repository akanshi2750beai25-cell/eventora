# EVENTORA — Project Team & Module Division
## Front End Engineering-II Academic Project Evaluation

This document outlines the clear division of code, modules, and Git commit ownership among the 4 project team members: **Akanshi Sharma**, **Mridul Verma**, **Priyanshi Saxena**, and **Kuvum Rajput**.

---

### Team Matrix & Module Ownership

| Team Member | Module & Role | Core Pages & Files Owned | Key Syllabus Concepts Demonstrated |
| :--- | :--- | :--- | :--- |
| **Akanshi** | **Module 1: Core Architecture, Auth & Navigation** | `App.jsx`<br>`Navbar/Navbar.jsx`<br>`Footer/Footer.jsx`<br>`context/AuthContext.jsx`<br>`pages/Profile/Profile.jsx`<br>`pages/Login/Login.jsx`<br>`pages/Register/Register.jsx`<br>`styles/variables.css` | React Router v6, Context API, Protected Routes, Multi-account authentication, Controlled Forms, CSS Custom Properties & Dark/Light Theme Switching |
| **Mridul** | **Module 2: Advanced Event Discovery & Catalog** | `pages/Explore/Explore.jsx`<br>`pages/EventDetails/EventDetails.jsx`<br>`pages/Categories/Categories.jsx`<br>`pages/Wishlist/Wishlist.jsx`<br>`components/EventCard/EventCard.jsx`<br>`components/CategoryCard/CategoryCard.jsx`<br>`components/SearchBar/SearchBar.jsx`<br>`components/Countdown/Countdown.jsx` | Dynamic Route Params (`useParams`), Array Filtering & Multi-criteria Search, State Lifting, `useMemo` for derived event lists, Conditional Rendering, Countdown Timers |
| **Priyanshi** | **Module 3: Smart Booking Engine & Group Bill-Split** | `pages/Booking/Booking.jsx`<br>`pages/GroupBooking/GroupBooking.jsx`<br>`pages/Ticket/Ticket.jsx`<br>`components/DigitalTicket/DigitalTicket.jsx`<br>`components/QRCodeDisplay/QRCodeDisplay.jsx`<br>`utils/helpers.js` (`calculateEqualSplit`, `printPdfReceipt`) | Complex Multi-Step Forms, State Mutation & Seat Decrement, Exact Remainder Distribution Algorithm, Paytm Gateway Simulation, Offline SVG QR Code Generator, PDF Generation |
| **Kuvum** | **Module 4: Organizer Dashboard, Admin & Alerts** | `pages/Organizer/OrganizerDashboard.jsx`<br>`pages/Admin/AdminDashboard.jsx`<br>`pages/Notifications/Notifications.jsx`<br>`pages/About/About.jsx`<br>`pages/Contact/Contact.jsx`<br>`pages/NotFound/NotFound.jsx`<br>`context/EventContext.jsx` (CRUD & Reset) | Full CRUD Operations, Modal Dialogs (`useRef`/Portals), Status Tracking (Refunds & Moderation), Tab-based Views, In-App Notification Center, 1-Click Demo Reset Engine |

---

### Step-by-Step GitHub Upload & Contribution Guide

To demonstrate clear individual Git contribution graphs for college teachers during evaluation, each member can commit their respective files:

#### 1. Akanshi's Commits (Core Architecture & Authentication)
```bash
git add src/App.jsx src/components/Navbar/ src/components/Footer/ src/context/AuthContext.jsx src/pages/Profile/ src/pages/Login/ src/pages/Register/ src/styles/
git commit -m "feat(auth): implement multi-account demo system, theme switcher and persistent auth context"
```

#### 2. Mridul's Commits (Event Discovery & Catalog)
```bash
git add src/pages/Explore/ src/pages/EventDetails/ src/pages/Categories/ src/pages/Wishlist/ src/components/EventCard/ src/components/CategoryCard/ src/components/SearchBar/ src/components/Countdown/
git commit -m "feat(discovery): implement advanced explore filters, dynamic search, live countdown and wishlist engine"
```

#### 3. Priyanshi's Commits (Smart Booking & Group Bill-Splitting)
```bash
git add src/pages/Booking/ src/pages/GroupBooking/ src/pages/Ticket/ src/components/DigitalTicket/ src/components/QRCodeDisplay/ src/utils/helpers.js
git commit -m "feat(booking): implement signature group booking, exact bill-split engine, Paytm gateway and PDF pass"
```

#### 4. Kuvum's Commits (Organizer Dashboard, Admin & Notifications)
```bash
git add src/pages/Organizer/ src/pages/Admin/ src/pages/Notifications/ src/pages/About/ src/pages/Contact/ src/pages/NotFound/ src/context/EventContext.jsx CONTRIBUTORS.md
git commit -m "feat(dashboard): add organizer event CRUD, admin moderation, refund queue, notifications and demo reset"
```

---

### Viva Demonstration Questions & Answers

1. **How does the multi-account system work?**
   - Implemented in `AuthContext.jsx` using React Context API and `localStorage`. Allows 1-click switching between Akanshi (Student), Mridul (Student), Priyanshi (Student), Kuvum (Organizer), and Dr. Rajesh (Admin) without re-entering credentials.

2. **How does the Group Booking Bill-Split algorithm work?**
   - Implemented in `helpers.js` (`calculateEqualSplit`). It calculates `baseShare = Math.floor(total / count)` and distributes `remainder = total % count` across the first attendee shares so that `sum(shares) === totalAmount` exactly down to the last rupee without floating-point errors.

3. **How is the QR Code generated without third-party dependencies?**
   - Implemented in `QRCodeDisplay.jsx`. It loads the official API QR matrix and includes an inline SVG vector fallback that renders an authentic 2D matrix offline even without an internet connection.

4. **How does the Demo Reset function work?**
   - Located in `EventContext.jsx` (`resetDemoData`). It clears demo mutations from `localStorage` and resets the application state back to default seed data in 1 click, allowing students to repeat live presentations seamlessly.
