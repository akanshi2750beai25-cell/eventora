# EVENTORA — College Event Management & Smart Booking Platform
> **“Discover Events. Create Memories.”**  
> *Academic Project for B.E. CSE (AI & ML)*

EVENTORA is a full-featured college event management and booking platform built with **React 18, Vite, CSS3, and JavaScript ES6+**.

---

## 📁 Repository Structure for Academic Evaluations

The project is organized into two distinct evaluation phases:

```
EVENTORA/
├── eval1/                           # 📘 EVALUATION 1 (Foundations & Core Discovery)
│   ├── src/
│   │   ├── components/              # Co-located folders (e.g., Navbar/Navbar.jsx & Navbar.css)
│   │   ├── pages/                   # Co-located folders (e.g., Home/Home.jsx & Home.css)
│   │   ├── context/                 # Central state (Auth, Event, Theme)
│   │   ├── hooks/                   # Custom Hooks (useCountdown, useLocalStorage)
│   │   └── data/                    # Realistic seed JSON data
│   └── README.md                    # Eval 1 documentation & syllabus mapping
│
├── eval2/                           # 🚀 EVALUATION 2 (Advanced Organizer & Admin Suite)
│   ├── src/                         # Full platform + SeatGrid, SplitPayment, Dashboard, Admin, AI
│   └── README.md                    # Eval 2 advanced features & transition guide
│
├── TEAM_CONTRIBUTION_GUIDE.md        # 👥 4-Member Git upload & viva responsibility breakdown
└── README.md                        # Master project overview
```

---

## 👥 4-Member Evaluation 1 Responsibility Matrix

| Member | Assigned Subparts & Folders | Viva & Evaluation Topics |
| :--- | :--- | :--- |
| **1. Akanshi** *(Lead)* | `App/`, `Navbar/`, `Footer/`, `Home/`, `NotFound/`, `ThemeContext/` | App Setup, Semantic HTML5, CSS Variables, 404 Routing |
| **2. Mridul** | `Explore/`, `Categories/`, `CategoryCard/`, `SearchBar/`, `FilterPanel/`, `eventsData.js` | Controlled Inputs, ES6+ Array Methods (`filter`, `map`), Student Budget Filters |
| **3. Priyanshi** | `EventDetails/`, `Countdown/`, `Rating/`, `Toast/`, `useCountdown.js`, `EventContext/` | `useEffect` Timers (`setInterval`), Context API, Star Rating Picker, Custom Hooks |
| **4. Member 4** | `Booking/`, `Ticket/`, `DigitalTicket/`, `MyBookings/`, `Wishlist/`, `Login/`, `Register/`, `Profile/` | Dynamic Route Params, `localStorage` Sync, Form Validation, Print Styles |

👉 *For complete step-by-step Git upload commands for each member, see [TEAM_CONTRIBUTION_GUIDE.md](./TEAM_CONTRIBUTION_GUIDE.md).*

---

## ⚡ How to Run

### Run Evaluation 1:
```bash
npm run dev:eval1
# Open http://localhost:5174
```

### Run Evaluation 2:
```bash
npm run dev:eval2
# Open http://localhost:5175
```
