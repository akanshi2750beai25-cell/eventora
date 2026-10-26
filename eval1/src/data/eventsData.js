// Master Events Seed Data for EVENTORA Platform
// 22 events across 10 categories — realistic college demo data
const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

export const initialEvents = [
  // ── TECHNOLOGY ──────────────────────────────────────────────────────────────
  {
    id: "evt-1",
    title: "National AI & Machine Learning Summit 2026",
    category: "Technology",
    date: "2026-11-18",
    time: "09:30 AM",
    venue: "Main Auditorium, Campus Block A",
    city: "Chandigarh",
    price: 199,
    rating: 4.9,
    reviewsCount: 142,
    image: unsplash("photo-1485827404703-89b55fcc595e"),
    description: "Join industry AI pioneers, research scholars, and student developers for a deep dive into Large Language Models, Computer Vision, and Generative AI applications in healthcare and robotics.",
    highlights: [
      "Keynote by Top AI Research Scientists",
      "Hands-on Generative AI Live Coding",
      "Certificate of Participation & Swag Kit",
      "Direct Networking with Tech Recruiters"
    ],
    agenda: [
      { time: "09:30 AM", title: "Registrations & Welcome Keynote" },
      { time: "11:00 AM", title: "The Next Decade of Agentic AI & LLMs" },
      { time: "01:00 PM", title: "Networking Lunch & Poster Sessions" },
      { time: "02:30 PM", title: "Hands-on Workshop: Building AI Agents" },
      { time: "04:30 PM", title: "Panel Discussion & Student Awards" }
    ],
    organizer: {
      name: "AI & ML Student Chapter",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      contact: "aiml-chapter@eventora.edu"
    },
    totalSeats: 350,
    availableSeats: 64,
    ticketTiers: [
      { id: "tier-std", name: "Student Pass", price: 199, perks: "Access to all keynotes, e-certificate & lunch" },
      { id: "tier-vip", name: "VIP Delegate", price: 499, perks: "Front row seating, AI workshop access & swag kit" }
    ],
    isTrending: true,
    isFeatured: true,
    tags: ["AI", "Machine Learning", "Tech", "Coding", "Robotics"]
  },
  {
    id: "evt-11",
    title: "HackArena 2026 — 36-Hour National Hackathon",
    category: "Technology",
    date: "2026-11-08",
    time: "10:00 AM",
    venue: "Engineering Block Innovation Hub",
    city: "Chandigarh",
    price: 0,
    rating: 4.8,
    reviewsCount: 210,
    image: unsplash("photo-1504384308090-c894fdcc538d"),
    description: "India's biggest inter-college hackathon returns for its 5th edition! 36 hours of non-stop coding, mentoring sessions, midnight snacks, and prizes worth ₹3,00,000.",
    highlights: [
      "₹3 Lakhs Prize Pool Across 6 Tracks",
      "Mentors from Google, Amazon & Startups",
      "Free Food, Beverages & Energy Drinks",
      "Cloud Credits & Dev Tool Licenses"
    ],
    agenda: [
      { time: "10:00 AM", title: "Problem Statement Reveal & Team Check-in" },
      { time: "12:00 PM", title: "Hacking Begins!" },
      { time: "09:00 PM", title: "Mentor Office Hours & Tech Talks" },
      { time: "10:00 AM+1", title: "Final Submissions Deadline" },
      { time: "12:00 PM+1", title: "Demos & Prize Ceremony" }
    ],
    organizer: {
      name: "Computer Science Society",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      contact: "css@eventora.edu"
    },
    totalSeats: 500,
    availableSeats: 120,
    ticketTiers: [
      { id: "tier-free", name: "Hacker Pass (Free)", price: 0, perks: "Team slot + meals + free swag bag" }
    ],
    isTrending: true,
    isFeatured: true,
    tags: ["Hackathon", "Coding", "Tech", "Free", "Prize"]
  },
  {
    id: "evt-12",
    title: "Web Dev Masterclass: React & Next.js 15",
    category: "Technology",
    date: "2026-11-02",
    time: "11:00 AM",
    venue: "Computer Lab Block C, Room 205",
    city: "Mohali",
    price: 299,
    rating: 4.9,
    reviewsCount: 78,
    image: unsplash("photo-1461749280684-dccba630e2f6"),
    description: "A full-day intensive React & Next.js 15 hands-on workshop. Learn server components, app router, Tailwind CSS integration, API routes, and deploying to Vercel — build a full project by day end.",
    highlights: [
      "Build a Full-Stack App from Scratch",
      "React 19 + Next.js 15 Concepts",
      "GitHub Deployment & Vercel Hosting",
      "Completion Certificate + LinkedIn Badge"
    ],
    agenda: [
      { time: "11:00 AM", title: "React Fundamentals & JSX Deep Dive" },
      { time: "01:00 PM", title: "Next.js App Router & Server Components" },
      { time: "03:00 PM", title: "API Integration & State Management" },
      { time: "05:00 PM", title: "Deployment & Project Showcase" }
    ],
    organizer: {
      name: "Full Stack Dev Club",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      contact: "devclub@eventora.edu"
    },
    totalSeats: 80,
    availableSeats: 22,
    ticketTiers: [
      { id: "tier-std", name: "Workshop Seat", price: 299, perks: "Full day workshop + digital resources + certificate" }
    ],
    isTrending: true,
    isFeatured: false,
    tags: ["React", "NextJS", "WebDev", "Workshop", "Coding"]
  },

  // ── MUSIC ────────────────────────────────────────────────────────────────────
  {
    id: "evt-2",
    title: "VibeWave: Inter-College Music Fest",
    category: "Music",
    date: "2026-11-22",
    time: "06:00 PM",
    venue: "Grand Amphitheatre, Elante Grounds",
    city: "Chandigarh",
    price: 499,
    rating: 4.8,
    reviewsCount: 218,
    image: unsplash("photo-1501386761578-eac5c94b800a"),
    description: "The biggest college music festival of the year! Featuring top student bands, indie pop acts, DJ night, light show, food trucks, and unforgettable musical vibes.",
    highlights: [
      "5 Live Bands & Celebrity DJ Set",
      "Food Carnival with 20+ Stalls",
      "LED Stage & Laser Light Spectacle",
      "Free Glowbands for All Attendees"
    ],
    agenda: [
      { time: "06:00 PM", title: "Gates Open & Battle of Campus Bands" },
      { time: "07:30 PM", title: "Acoustic Indie Rock Showcase" },
      { time: "09:00 PM", title: "Headliner Performance" },
      { time: "10:15 PM", title: "EDM Neon Night & DJ Finale" }
    ],
    organizer: {
      name: "Campus Music Society",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      contact: "music@eventora.edu"
    },
    totalSeats: 800,
    availableSeats: 112,
    ticketTiers: [
      { id: "tier-gen", name: "General Access", price: 499, perks: "Entry to festival grounds and concerts" },
      { id: "tier-vip", name: "VIP Pit Pass", price: 899, perks: "Front stage pit access, 1 free beverage & fast entry" }
    ],
    isTrending: true,
    isFeatured: true,
    tags: ["Music", "Concert", "Fest", "DJ", "Bands"]
  },
  {
    id: "evt-13",
    title: "Unplugged Acoustic Open Mic Night",
    category: "Music",
    date: "2026-10-30",
    time: "07:00 PM",
    venue: "The Brew House Lounge, Sector 26",
    city: "Chandigarh",
    price: 149,
    rating: 4.7,
    reviewsCount: 55,
    image: unsplash("photo-1516280440614-37939bbacd81"),
    description: "An intimate evening of original acoustic performances by talented college students. Bring your guitar, ukulele, or just your voice — or just come and enjoy the chill vibes with chai & snacks.",
    highlights: [
      "Open Mic Slots for Any Instrument",
      "Live Audience Voting for Best Act",
      "Chai, Coffee & Snacks Included",
      "Prize for Audience & Judge Favourite"
    ],
    agenda: [
      { time: "07:00 PM", title: "Open Mic Warm-up Rounds" },
      { time: "08:15 PM", title: "Featured Artists Set" },
      { time: "09:15 PM", title: "Audience Choice Finals & Prize Award" }
    ],
    organizer: {
      name: "Campus Music Society",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      contact: "music@eventora.edu"
    },
    totalSeats: 120,
    availableSeats: 44,
    ticketTiers: [
      { id: "tier-std", name: "Audience Pass", price: 149, perks: "Entry + chai/coffee + snacks" },
      { id: "tier-performer", name: "Performer Slot", price: 49, perks: "10-min open mic slot + entry" }
    ],
    isTrending: false,
    isFeatured: false,
    tags: ["OpenMic", "Acoustic", "Music", "Chill", "Live"]
  },

  // ── SPORTS ───────────────────────────────────────────────────────────────────
  {
    id: "evt-3",
    title: "Campus Premier Cricket Championship",
    category: "Sports",
    date: "2026-11-12",
    time: "03:30 PM",
    venue: "Sports Complex Stadium",
    city: "Mohali",
    price: 0,
    rating: 4.7,
    reviewsCount: 89,
    image: unsplash("photo-1531415074968-036ba1b575da"),
    description: "Cheer for your department in the high-stakes T20 Championship Final. Live commentary, cheer teams, food kiosks, and post-match trophy ceremony.",
    highlights: [
      "Free Entry for All College Students",
      "Live Stadium Commentary & Giant Screen",
      "Exciting Half-time Spectator Contests",
      "Celebrity Guest Trophy Presentation"
    ],
    agenda: [
      { time: "03:30 PM", title: "Toss & Opening Ceremony" },
      { time: "04:00 PM", title: "1st Innings Kickoff" },
      { time: "05:45 PM", title: "Innings Break & Audience Quiz" },
      { time: "06:15 PM", title: "2nd Innings & Final Chase" },
      { time: "08:00 PM", title: "Prize Distribution & Celebration" }
    ],
    organizer: {
      name: "Department Sports Board",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      contact: "sports@eventora.edu"
    },
    totalSeats: 600,
    availableSeats: 230,
    ticketTiers: [
      { id: "tier-free", name: "Free Student Entry", price: 0, perks: "Free stadium gallery seating with student ID" }
    ],
    isTrending: false,
    isFeatured: true,
    tags: ["Cricket", "Sports", "Tournament", "Free", "Campus"]
  },
  {
    id: "evt-10",
    title: "Inter-College Badminton Championship",
    category: "Sports",
    date: "2026-11-24",
    time: "09:00 AM",
    venue: "Indoor Badminton Arena, Tau Devi Lal Stadium",
    city: "Panchkula",
    price: 299,
    rating: 4.4,
    reviewsCount: 52,
    image: unsplash("photo-1626224583764-f87db24ac4ea"),
    description: "Fast-paced badminton action featuring singles and doubles tournaments across North India colleges. Cash prizes and medals for winners.",
    highlights: [
      "Yonex Synthetic Courts",
      "Certified National Referees",
      "Cash Prizes up to ₹50,000",
      "Hydration and Energy Drinks Provided"
    ],
    agenda: [
      { time: "09:00 AM", title: "Round of 32 Matches" },
      { time: "01:00 PM", title: "Quarter-Finals & Semi-Finals" },
      { time: "04:30 PM", title: "Championship Finals & Medals" }
    ],
    organizer: {
      name: "North Zone Sports Club",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      contact: "badminton@eventora.edu"
    },
    totalSeats: 120,
    availableSeats: 28,
    ticketTiers: [
      { id: "tier-std", name: "Tournament Participant", price: 299, perks: "Player slot + official tee" },
      { id: "tier-aud", name: "Audience Pass", price: 99, perks: "Spectator gallery access" }
    ],
    isTrending: false,
    isFeatured: false,
    tags: ["Badminton", "Sports", "Tournament", "Athletics"]
  },
  {
    id: "evt-14",
    title: "E-Sports LAN Party — BGMI & Valorant",
    category: "Sports",
    date: "2026-11-05",
    time: "12:00 PM",
    venue: "Gaming Zone, Student Activity Centre",
    city: "Chandigarh",
    price: 199,
    rating: 4.6,
    reviewsCount: 134,
    image: unsplash("photo-1542751371-adc38448a05e"),
    description: "Compete in BGMI Squads & Valorant 5v5 tournaments at one of the biggest college LAN parties of the season. Gaming PCs, high-speed WiFi, energy drinks and ₹1,20,000 in prizes!",
    highlights: [
      "₹1.2 Lakhs Total Prize Pool",
      "High-end Gaming Rigs Provided",
      "BGMI, Valorant & FIFA Tournaments",
      "Energy Drinks & Gaming Snacks All Day"
    ],
    agenda: [
      { time: "12:00 PM", title: "Team Check-in & Practice Lobby" },
      { time: "02:00 PM", title: "Group Stage Matches Begin" },
      { time: "06:00 PM", title: "Semi-Finals across all titles" },
      { time: "08:00 PM", title: "Grand Finals & Prize Distribution" }
    ],
    organizer: {
      name: "Campus Gaming Guild",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      contact: "gaming@eventora.edu"
    },
    totalSeats: 200,
    availableSeats: 67,
    ticketTiers: [
      { id: "tier-player", name: "Player Entry", price: 199, perks: "Tournament slot + energy drinks" },
      { id: "tier-spectator", name: "Spectator Pass", price: 49, perks: "Watch all matches live" }
    ],
    isTrending: true,
    isFeatured: false,
    tags: ["Gaming", "BGMI", "Valorant", "eSports", "LAN"]
  },

  // ── CULTURAL ─────────────────────────────────────────────────────────────────
  {
    id: "evt-7",
    title: "Annual Drama & Theatre Showcase 'Awaaz'",
    category: "Cultural",
    date: "2026-11-14",
    time: "05:00 PM",
    venue: "Open Air Theatre, Sector 14",
    city: "Chandigarh",
    price: 0,
    rating: 4.8,
    reviewsCount: 110,
    image: unsplash("photo-1514306191717-452ec28c7814"),
    description: "An evening of powerful street plays (Nukkad Natak), stage dramas, classical musical ensembles, and spoken-word poetry highlighting social themes.",
    highlights: [
      "Award-winning Nukkad Natak Performances",
      "Live Acoustic Folk Musical Backing",
      "Free Entry with College Registration",
      "Cultural Art Installation Exhibit"
    ],
    agenda: [
      { time: "05:00 PM", title: "Opening Street Play Showcase" },
      { time: "06:15 PM", title: "Original Stage Drama: Parwaaz" },
      { time: "07:45 PM", title: "Spoken Word Poetry & Classical Music" }
    ],
    organizer: {
      name: "Campus Dramatics Society",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      contact: "drama@eventora.edu"
    },
    totalSeats: 400,
    availableSeats: 160,
    ticketTiers: [
      { id: "tier-free", name: "Free Cultural Pass", price: 0, perks: "Open seating in amphitheatre" }
    ],
    isTrending: false,
    isFeatured: true,
    tags: ["Drama", "Theatre", "Cultural", "Free", "Poetry"]
  },
  {
    id: "evt-15",
    title: "Rangmanch: Annual Cultural Fest",
    category: "Cultural",
    date: "2026-12-01",
    time: "04:00 PM",
    venue: "Main Campus Grounds",
    city: "Chandigarh",
    price: 349,
    rating: 4.9,
    reviewsCount: 189,
    image: unsplash("photo-1470229722913-7c0e2dbbafd3"),
    description: "Three days of non-stop celebration of art, culture, dance, music, and fashion. Rangmanch brings together 50+ colleges for the grandest annual cultural fest in North India.",
    highlights: [
      "50+ Participating Colleges",
      "Classical & Western Dance Competitions",
      "Fashion Show & Costume Design Contest",
      "Food Bazaar & Art Market"
    ],
    agenda: [
      { time: "04:00 PM", title: "Inauguration Ceremony & Flash Mob" },
      { time: "05:30 PM", title: "Battle of Bands Competition" },
      { time: "07:30 PM", title: "Group Dance Finale" },
      { time: "09:00 PM", title: "Celebrity Cultural Performance" }
    ],
    organizer: {
      name: "Cultural Affairs Committee",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      contact: "cultural@eventora.edu"
    },
    totalSeats: 2000,
    availableSeats: 380,
    ticketTiers: [
      { id: "tier-std", name: "Day Pass", price: 349, perks: "Full day access to all events + food coupons" },
      { id: "tier-vip", name: "3-Day VIP Pass", price: 799, perks: "All 3 days + VIP seating + backstage meet" }
    ],
    isTrending: true,
    isFeatured: true,
    tags: ["Cultural", "Dance", "Fest", "Music", "Fashion"]
  },

  // ── WORKSHOPS ─────────────────────────────────────────────────────────────────
  {
    id: "evt-4",
    title: "UI/UX & Product Design Bootcamp",
    category: "Workshops",
    date: "2026-11-25",
    time: "10:00 AM",
    venue: "Design Lab 304, Tech Wing",
    city: "Chandigarh",
    price: 149,
    rating: 4.9,
    reviewsCount: 95,
    image: unsplash("photo-1531482615713-2afd69097998"),
    description: "Master modern Figma prototyping, design systems, micro-interactions, and AI-assisted design workflows with senior design leads from top startups.",
    highlights: [
      "Build a Portfolio-Ready Mobile App Design",
      "Figma Pro License 6-Month Voucher",
      "Individual Design Critique & Feedback",
      "Verified Certificate of Completion"
    ],
    agenda: [
      { time: "10:00 AM", title: "Principles of Modern UI/UX Architecture" },
      { time: "11:30 AM", title: "Advanced Figma Component Systems" },
      { time: "01:30 PM", title: "Design Sprint Challenge" },
      { time: "03:30 PM", title: "Portfolio Review & Career Q&A" }
    ],
    organizer: {
      name: "Creators & Designers Club",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      contact: "design@eventora.edu"
    },
    totalSeats: 60,
    availableSeats: 14,
    ticketTiers: [
      { id: "tier-std", name: "Workshop Seat", price: 149, perks: "Full day access + design kit assets" }
    ],
    isTrending: true,
    isFeatured: false,
    tags: ["UI/UX", "Design", "Figma", "Workshop", "Hands-on"]
  },
  {
    id: "evt-16",
    title: "Photography & Reels Creation Workshop",
    category: "Workshops",
    date: "2026-11-09",
    time: "10:00 AM",
    venue: "Media Lab, Communication Block",
    city: "Chandigarh",
    price: 199,
    rating: 4.7,
    reviewsCount: 62,
    image: unsplash("photo-1452780212441-32cf648cb519"),
    description: "Learn professional photography composition, portrait lighting, golden-hour shoots, and short-form video editing for Instagram Reels & YouTube Shorts using your phone camera.",
    highlights: [
      "Shoot on DSLR & Smartphone Both",
      "Lighting Setup & Colour Grading",
      "Capcut & Adobe Premiere Mobile",
      "Print Portfolio Included"
    ],
    agenda: [
      { time: "10:00 AM", title: "Photography Theory & Composition Rules" },
      { time: "12:00 PM", title: "Outdoor Portrait Shoot Session" },
      { time: "02:00 PM", title: "Reels Script & Editing Workshop" },
      { time: "04:00 PM", title: "Gallery Walk & Feedback" }
    ],
    organizer: {
      name: "Media & Photography Club",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      contact: "photo@eventora.edu"
    },
    totalSeats: 40,
    availableSeats: 18,
    ticketTiers: [
      { id: "tier-std", name: "Workshop Pass", price: 199, perks: "Full day + print portfolio + certificate" }
    ],
    isTrending: false,
    isFeatured: false,
    tags: ["Photography", "Reels", "Workshop", "Creative", "Instagram"]
  },

  // ── ENTERTAINMENT / COMEDY ───────────────────────────────────────────────────
  {
    id: "evt-5",
    title: "Campus Standup Comedy Gala",
    category: "Entertainment",
    date: "2026-11-08",
    time: "07:00 PM",
    venue: "Tagore Memorial Hall",
    city: "Chandigarh",
    price: 249,
    rating: 4.6,
    reviewsCount: 167,
    image: unsplash("photo-1585699324551-f6c309eedeca"),
    description: "Get ready for non-stop laughter as Chandigarh's top standup comedians and college open-mic champions deliver hilarious sets about college life, engineering, and dating.",
    highlights: [
      "3 Celebrity Comedians + Open Mic Finalists",
      "Uncensored 2.5 Hours Comedy Special",
      "Audience Crowd Work & Roast Rounds",
      "Beverages and Snacks Available"
    ],
    agenda: [
      { time: "07:00 PM", title: "Opening Act: College Open Mic Winners" },
      { time: "07:45 PM", title: "Feature Comedian Standup" },
      { time: "08:30 PM", title: "Headlining Comedy Special" }
    ],
    organizer: {
      name: "Laugh Factory Campus",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      contact: "comedy@eventora.edu"
    },
    totalSeats: 250,
    availableSeats: 38,
    ticketTiers: [
      { id: "tier-gen", name: "Standard Seat", price: 249, perks: "Seating in rows D-K" },
      { id: "tier-vip", name: "Front Row VIP", price: 399, perks: "Rows A-C (Roast Zone!) + 1 Drink" }
    ],
    isTrending: true,
    isFeatured: true,
    tags: ["Comedy", "Standup", "Entertainment", "Laughs"]
  },
  {
    id: "evt-17",
    title: "Movie Marathon Night: Marvel Edition",
    category: "Entertainment",
    date: "2026-10-31",
    time: "09:00 PM",
    venue: "Open Air Screening, Rooftop Garden",
    city: "Chandigarh",
    price: 149,
    rating: 4.5,
    reviewsCount: 88,
    image: unsplash("photo-1489599849927-2ee91cede3ba"),
    description: "Watch 3 back-to-back Marvel blockbusters under the stars on a giant inflatable screen. Bring your blankets, pillows and enjoy the ultimate outdoor cinema night with popcorn and hot chocolate.",
    highlights: [
      "Giant Inflatable Outdoor Screen (20ft)",
      "Popcorn, Nachos & Hot Drinks Included",
      "Movie Trivia Quiz with Prizes",
      "Halloween Costume Contest"
    ],
    agenda: [
      { time: "09:00 PM", title: "Trivia Quiz & Costume Contest" },
      { time: "09:30 PM", title: "Movie 1 Screening" },
      { time: "11:30 PM", title: "Snack Break & Trivia Round 2" },
      { time: "12:00 AM", title: "Movie 2 — Midnight Screening" }
    ],
    organizer: {
      name: "Film & Cinema Club",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
      contact: "cinema@eventora.edu"
    },
    totalSeats: 200,
    availableSeats: 78,
    ticketTiers: [
      { id: "tier-std", name: "Movie Night Pass", price: 149, perks: "Entry + popcorn + hot drink" }
    ],
    isTrending: false,
    isFeatured: false,
    tags: ["Movies", "Marvel", "Outdoor", "Cinema", "Night"]
  },

  // ── BUSINESS ─────────────────────────────────────────────────────────────────
  {
    id: "evt-6",
    title: "Startup Founders Pitch Arena & Shark Tank",
    category: "Business",
    date: "2026-11-28",
    time: "11:00 AM",
    venue: "Innovation & Incubation Centre",
    city: "Mohali",
    price: 99,
    rating: 4.7,
    reviewsCount: 76,
    image: unsplash("photo-1556761175-b413da4baf72"),
    description: "Witness 12 shortlisted student startups pitch their business models to angel investors and venture capitalists for ₹5,00,000 in seed funding and mentorship.",
    highlights: [
      "₹5 Lakhs Total Seed Grant Pool",
      "Venture Capitalists & Angel Mentors Panel",
      "Live Audience Investment Voting",
      "Networking Hi-Tea with Founders"
    ],
    agenda: [
      { time: "11:00 AM", title: "Keynote: From College Project to Scalable SaaS" },
      { time: "12:00 PM", title: "Pitch Round 1 (6 Startups)" },
      { time: "02:00 PM", title: "Pitch Round 2 (6 Startups)" },
      { time: "04:00 PM", title: "Investor Q&A & Funding Announcements" }
    ],
    organizer: {
      name: "E-Cell (Entrepreneurship Cell)",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      contact: "ecell@eventora.edu"
    },
    totalSeats: 180,
    availableSeats: 55,
    ticketTiers: [
      { id: "tier-std", name: "Attendee Pass", price: 99, perks: "Audience access, voting pass & Hi-Tea" }
    ],
    isTrending: false,
    isFeatured: false,
    tags: ["Startup", "Pitch", "Business", "Funding", "E-Cell"]
  },

  // ── EDUCATION ─────────────────────────────────────────────────────────────────
  {
    id: "evt-9",
    title: "Career in Data Science & Cloud Computing",
    category: "Education",
    date: "2026-11-16",
    time: "02:00 PM",
    venue: "Seminar Hall 1, Academic Block",
    city: "Panchkula",
    price: 0,
    rating: 4.8,
    reviewsCount: 88,
    image: unsplash("photo-1524178232363-1fb2b075b655"),
    description: "Learn career roadmaps, interview preparation strategies, resume tips, and industry certifications for high-paying roles in Data Engineering, MLOps, and AWS Cloud.",
    highlights: [
      "Roadmaps for FAANG & MNC Tech Interviews",
      "Free Cloud Certification Voucher Guide",
      "1-on-1 Resume Review Clinic",
      "Recorded Session for Revision"
    ],
    agenda: [
      { time: "02:00 PM", title: "State of Cloud & Data Careers in 2026" },
      { time: "03:15 PM", title: "Cracking System Design & ML Coding" },
      { time: "04:30 PM", title: "Resume Teardowns & Open Q&A" }
    ],
    organizer: {
      name: "Training & Placement Cell",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
      contact: "tnp@eventora.edu"
    },
    totalSeats: 200,
    availableSeats: 32,
    ticketTiers: [
      { id: "tier-free", name: "Free Student Registration", price: 0, perks: "Access to seminar & digital resources" }
    ],
    isTrending: true,
    isFeatured: false,
    tags: ["DataScience", "Cloud", "Career", "Free", "Education"]
  },
  {
    id: "evt-18",
    title: "GATE & UPSC Exam Strategy Masterclass",
    category: "Education",
    date: "2026-11-30",
    time: "10:00 AM",
    venue: "Lecture Hall Complex, Block B",
    city: "Chandigarh",
    price: 0,
    rating: 4.7,
    reviewsCount: 102,
    image: unsplash("photo-1434030216411-0b793f4b4173"),
    description: "A one-day intensive strategy session for GATE CSE, EE, and ME students, plus UPSC aspirants. Toppers and coaching experts share time management, topic prioritisation, and mock-test strategies.",
    highlights: [
      "GATE CSE + EE + ME Tracks Available",
      "Subject-wise Weightage & PYQ Analysis",
      "Free Study Material PDF Pack",
      "Doubt Clearing Session Included"
    ],
    agenda: [
      { time: "10:00 AM", title: "GATE 2027 Paper Pattern & Changes" },
      { time: "11:30 AM", title: "Subject-wise Strategy by Rank Holders" },
      { time: "01:30 PM", title: "Mock Test Discussion & Live Doubt Solving" }
    ],
    organizer: {
      name: "Academic Excellence Cell",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
      contact: "academic@eventora.edu"
    },
    totalSeats: 300,
    availableSeats: 150,
    ticketTiers: [
      { id: "tier-free", name: "Free Registration", price: 0, perks: "Full day access + PDF study material" }
    ],
    isTrending: false,
    isFeatured: false,
    tags: ["GATE", "UPSC", "Education", "Free", "Exam"]
  },

  // ── FOOD & LIFESTYLE ──────────────────────────────────────────────────────────
  {
    id: "evt-19",
    title: "Campus Food Carnival & Street Food Fest",
    category: "Lifestyle",
    date: "2026-11-21",
    time: "04:00 PM",
    venue: "Central Lawn, Campus",
    city: "Chandigarh",
    price: 0,
    rating: 4.6,
    reviewsCount: 145,
    image: unsplash("photo-1555939594-58d7cb561ad1"),
    description: "A fun-filled outdoor food carnival featuring 40+ student-run food stalls with cuisines from all over India. Live music, cooking competitions, and a food photography contest!",
    highlights: [
      "40+ Food Stalls by Student Clubs",
      "Inter-College Cooking Competition",
      "Food Photography Contest (₹5k prize)",
      "Free Entry for All Visitors"
    ],
    agenda: [
      { time: "04:00 PM", title: "Carnival Opens & Stall Launches" },
      { time: "05:00 PM", title: "Cooking Competition Begins" },
      { time: "07:00 PM", title: "Photography Contest Judging" },
      { time: "08:00 PM", title: "Award Ceremony & Live Performances" }
    ],
    organizer: {
      name: "Student Union Welfare Wing",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      contact: "welfare@eventora.edu"
    },
    totalSeats: 5000,
    availableSeats: 3200,
    ticketTiers: [
      { id: "tier-free", name: "Free Entry", price: 0, perks: "Open to all — no ticket needed!" }
    ],
    isTrending: true,
    isFeatured: true,
    tags: ["Food", "Carnival", "Street Food", "Free", "Fun"]
  },

  // ── FASHION ──────────────────────────────────────────────────────────────────
  {
    id: "evt-20",
    title: "StyleX: Inter-College Fashion Show",
    category: "Cultural",
    date: "2026-11-29",
    time: "06:30 PM",
    venue: "The Lalit Grand Ballroom",
    city: "Chandigarh",
    price: 399,
    rating: 4.8,
    reviewsCount: 112,
    image: unsplash("photo-1509631179647-0177331693ae"),
    description: "StyleX is the most glamorous college fashion show in the region — featuring over 80 student models across 5 themed rounds, styled by student designers from fashion design colleges.",
    highlights: [
      "80+ Student Models from 20 Colleges",
      "5 Themed Rounds including Couture & Street",
      "Celebrity Judge Panel",
      "After-Party Access Included in VIP Ticket"
    ],
    agenda: [
      { time: "06:30 PM", title: "Red Carpet Arrival & Press Calls" },
      { time: "07:00 PM", title: "Round 1: Avant-Garde Couture Walk" },
      { time: "08:00 PM", title: "Round 2: Streetwear & Athleisure" },
      { time: "09:00 PM", title: "Grand Finale & Best Designer Award" }
    ],
    organizer: {
      name: "Fashion & Style Club",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      contact: "fashion@eventora.edu"
    },
    totalSeats: 400,
    availableSeats: 95,
    ticketTiers: [
      { id: "tier-gen", name: "General Seating", price: 399, perks: "Show entry + welcome drink" },
      { id: "tier-vip", name: "VIP Lounge + After-Party", price: 799, perks: "Front row seating + after-party entry" }
    ],
    isTrending: true,
    isFeatured: false,
    tags: ["Fashion", "Cultural", "Style", "Models", "Glamour"]
  },

  // ── MOVIES ───────────────────────────────────────────────────────────────────
  {
    id: "evt-8",
    title: "Indie Cinema Night: Student Short Films",
    category: "Movies",
    date: "2026-11-20",
    time: "06:30 PM",
    venue: "Piccadily Cine Square",
    city: "Chandigarh",
    price: 180,
    rating: 4.5,
    reviewsCount: 64,
    image: unsplash("photo-1440404653325-ab127d49abc1"),
    description: "A red-carpet celebration of independent cinema created by student filmmakers. Screenings of 8 curated short films followed by director Q&A sessions.",
    highlights: [
      "Screening of 8 Official Film Selections",
      "Complimentary Popcorn & Drink Combo",
      "Director & Cinematographer Q&A",
      "Audience Choice Best Film Award"
    ],
    agenda: [
      { time: "06:30 PM", title: "Red Carpet & Film Screening Part 1" },
      { time: "07:45 PM", title: "Intermission & Popcorn Break" },
      { time: "08:15 PM", title: "Screening Part 2 & Director Q&A" }
    ],
    organizer: {
      name: "Film & Cinema Club",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
      contact: "cinema@eventora.edu"
    },
    totalSeats: 150,
    availableSeats: 42,
    ticketTiers: [
      { id: "tier-gen", name: "Movie Pass", price: 180, perks: "Theater seat + Popcorn combo" }
    ],
    isTrending: false,
    isFeatured: false,
    tags: ["Cinema", "Movies", "Films", "ShortFilm", "Screening"]
  },

  // ── DANCE ─────────────────────────────────────────────────────────────────────
  {
    id: "evt-21",
    title: "Step Up: Annual Dance Championship",
    category: "Cultural",
    date: "2026-12-05",
    time: "05:00 PM",
    venue: "Chandigarh Club Auditorium",
    city: "Chandigarh",
    price: 249,
    rating: 4.9,
    reviewsCount: 176,
    image: unsplash("photo-1547153760-18fc86324498"),
    description: "The most competitive inter-college dance championship of the year. Crews of 4-10 members compete in Hip-Hop, Contemporary, Classical Fusion and Freestyle categories for the ₹2 lakh title.",
    highlights: [
      "₹2 Lakhs Prize Across Dance Categories",
      "Professional Dance Judges Panel",
      "Live DJ for Freestyle Rounds",
      "Audience Wildcard Entry Available"
    ],
    agenda: [
      { time: "05:00 PM", title: "Solo & Duet Category Performances" },
      { time: "06:30 PM", title: "Group Category — Hip-Hop & Contemporary" },
      { time: "08:00 PM", title: "Grand Finale & Championship Reveal" }
    ],
    organizer: {
      name: "Dance & Performing Arts Society",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      contact: "dance@eventora.edu"
    },
    totalSeats: 500,
    availableSeats: 140,
    ticketTiers: [
      { id: "tier-std", name: "Audience Pass", price: 249, perks: "Full show entry + voting access" },
      { id: "tier-competitor", name: "Competitor Team Pass", price: 799, perks: "Team of 8 + backstage access" }
    ],
    isTrending: true,
    isFeatured: true,
    tags: ["Dance", "Competition", "Cultural", "Championship", "HipHop"]
  },

  // ── WELLNESS ──────────────────────────────────────────────────────────────────
  {
    id: "evt-22",
    title: "Mental Wellness & Mindfulness Retreat",
    category: "Workshops",
    date: "2026-11-07",
    time: "08:00 AM",
    venue: "Yoga Garden, Health & Wellness Centre",
    city: "Panchkula",
    price: 0,
    rating: 4.8,
    reviewsCount: 93,
    image: unsplash("photo-1506126613408-eca07ce68773"),
    description: "A free full-morning retreat for students to disconnect from academic stress. Guided meditation, breathwork sessions, journaling exercises, and a panel talk on student mental health & burnout.",
    highlights: [
      "Guided Meditation & Yoga Session",
      "Burnout & Stress Management Talk",
      "Free Healthy Breakfast Included",
      "Journaling Kit & Resources Provided"
    ],
    agenda: [
      { time: "08:00 AM", title: "Sunrise Yoga & Breathwork" },
      { time: "09:30 AM", title: "Panel: Beating Academic Burnout" },
      { time: "11:00 AM", title: "Mindful Journaling Workshop" },
      { time: "12:00 PM", title: "Closing Circle & Healthy Brunch" }
    ],
    organizer: {
      name: "Student Wellness Initiative",
      verified: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      contact: "wellness@eventora.edu"
    },
    totalSeats: 100,
    availableSeats: 45,
    ticketTiers: [
      { id: "tier-free", name: "Free Registration", price: 0, perks: "Full retreat + healthy breakfast + kit" }
    ],
    isTrending: false,
    isFeatured: false,
    tags: ["Wellness", "Mental Health", "Yoga", "Free", "Mindfulness"]
  }
];
