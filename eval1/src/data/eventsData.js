// Master Events Seed Data for EVENTORA Platform
const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

export const initialEvents = [
  {
    id: "evt-1",
    title: "National AI & Machine Learning Summit 2026",
    category: "Technology",
    date: "2026-09-18",
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
    id: "evt-2",
    title: "VibeWave: Inter-College Music Fest",
    category: "Music",
    date: "2026-09-22",
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
    id: "evt-3",
    title: "Campus Premier Cricket Championship",
    category: "Sports",
    date: "2026-09-12",
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
    id: "evt-4",
    title: "UI/UX & Product Design Bootcamp",
    category: "Workshops",
    date: "2026-09-25",
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
    id: "evt-5",
    title: "Campus Standup Comedy Gala",
    category: "Entertainment",
    date: "2026-09-08",
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
    id: "evt-6",
    title: "Startup Founders Pitch Arena & Shark Tank",
    category: "Business",
    date: "2026-09-28",
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
  {
    id: "evt-7",
    title: "Annual Drama & Theatre Showcase 'Awaaz'",
    category: "Cultural",
    date: "2026-09-14",
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
    id: "evt-8",
    title: "Indie Cinema Night: Student Short Films",
    category: "Movies",
    date: "2026-09-20",
    time: "06:30 PM",
    venue: "Piccadily Cine Square",
    city: "Chandigarh",
    price: 180,
    rating: 4.5,
    reviewsCount: 64,
    image: unsplash("photo-1489599849927-2ee91cede3ba"),
    description: "A red-carpet celebration of independent cinema created by student filmmakers. Screenings of 8 curated short films followed by director Q&A sessions.",
    highlights: [
      "Screening of 8 Official Film Selection Entries",
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
      { id: "tier-gen", name: "Movie Pass", price: 180, perks: "Theater seat + Popcorn combo included" }
    ],
    isTrending: false,
    isFeatured: false,
    tags: ["Cinema", "Movies", "Films", "ShortFilm", "Screening"]
  },
  {
    id: "evt-9",
    title: "Career in Data Science & Cloud Computing",
    category: "Education",
    date: "2026-09-16",
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
    id: "evt-10",
    title: "Inter-College Badminton Championship",
    category: "Sports",
    date: "2026-09-24",
    time: "09:00 AM",
    venue: "Indoor Badminton Arena, Tau Devi Lal Stadium",
    city: "Panchkula",
    price: 299,
    rating: 4.4,
    reviewsCount: 52,
    image: unsplash("photo-1626224583764-f87db24ac4ea"),
    description: "Fast-paced badminton action featuring singles and doubles tournaments across North India colleges. Cash prizes and medals for winners.",
    highlights: [
      "Yonex Wooden Synthetic Courts",
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
      { id: "tier-std", name: "Tournament Participant", price: 299, perks: "Player slot + official tournament tee" },
      { id: "tier-aud", name: "Audience Pass", price: 99, perks: "Spectator gallery access" }
    ],
    isTrending: false,
    isFeatured: false,
    tags: ["Badminton", "Sports", "Tournament", "Athletics"]
  }
];
