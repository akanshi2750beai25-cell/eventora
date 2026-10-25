import './Home.css';
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Flame, Trophy, Users, 
  Calendar, ShieldCheck, Ticket, Search, CheckCircle2, 
  Star, Compass, Gift, Layers, UserCheck, Clock, MapPin,
  Award, QrCode, Zap, ChevronDown, ChevronUp, Bell, Heart,
  Smartphone, BookOpen, Music, Code2, Activity, Check,
  ExternalLink, Building2, CheckCircle, GraduationCap
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { categories } from '../../data/categoriesData';
import EventCard from '../../components/EventCard/EventCard';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Countdown from '../../components/Countdown/Countdown';
import { formatDate, formatPrice } from '../../utils/helpers';

export default function Home() {
  const { events } = useEvents();
  const navigate = useNavigate();

  // Search Bar States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');

  // Interactive Filter Tabs for Events section
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'tech' | 'cultural' | 'sports' | 'free'

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Featured Spotlight Event
  const spotlightEvent = useMemo(() => {
    return events.find((e) => e.isFeatured) || events[0];
  }, [events]);

  const handleSearchSubmit = () => {
    let url = `/explore?`;
    if (searchTerm) url += `q=${encodeURIComponent(searchTerm)}&`;
    if (selectedCategory !== 'All') url += `category=${encodeURIComponent(selectedCategory)}&`;
    if (selectedCity !== 'All') url += `city=${encodeURIComponent(selectedCity)}&`;
    navigate(url);
  };

  // Filtered Events for Tab Switcher
  const filteredTabEvents = useMemo(() => {
    switch (activeTab) {
      case 'tech':
        return events.filter((e) => e.category === 'Technology' || e.category === 'Workshop').slice(0, 4);
      case 'cultural':
        return events.filter((e) => e.category === 'Music' || e.category === 'Cultural' || e.category === 'Drama').slice(0, 4);
      case 'sports':
        return events.filter((e) => e.category === 'Sports' || e.category === 'Gaming').slice(0, 4);
      case 'free':
        return events.filter((e) => e.price === 0).slice(0, 4);
      case 'all':
      default:
        return events.filter((e) => e.isTrending || e.isFeatured).slice(0, 4);
    }
  }, [events, activeTab]);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const faqs = [
    {
      q: "How does entry verification work at the college venue gate?",
      a: "Upon completing your booking, an official digital boarding pass is generated with a unique, high-contrast QR code. You can present this QR code directly on your mobile device or print a paper pass. Gate staff verify your attendance in real time using the Eventora scanner."
    },
    {
      q: "Which payment options are supported via Paytm Payment Gateway?",
      a: "Eventora integrates with Paytm Payment Gateway to support all major digital payment channels, including Paytm UPI QR scanner, Paytm Wallet, Google Pay, PhonePe, BHIM, and debit/credit cards with zero additional convenience charges for students."
    },
    {
      q: "Is a valid student ID card required to enter?",
      a: "Yes. For passes booked under student tiers and discounted categories, attendees must carry their valid college student ID card or proof of enrollment matching the name provided during reservation."
    },
    {
      q: "Can I manage or cancel my reservations?",
      a: "Yes. All booked passes are securely stored under your 'My Bookings' dashboard. You can review pass details, download e-tickets, share with teammates, or initiate booking cancellations before the event begins."
    }
  ];

  return (
    <div className="home-page-container">
      {/* 1. TOP ANNOUNCEMENT BANNER */}
      <div className="top-platform-announcement">
        <div className="container announcement-inner">
          <div className="announcement-left">
            <span className="announcement-tag">Official Platform</span>
            <span className="announcement-text">
              Verified campus pass ticketing & event discovery for college universities across North India
            </span>
          </div>
          <Link to="/explore" className="announcement-link">
            <span>Browse All Events</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* 2. MODERN HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-left-content">
              <div className="hero-eyebrow-pill">
                <GraduationCap size={15} color="var(--primary-teal-light)" />
                <span>CAMPUS EVENT TICKETING & DISCOVERY</span>
              </div>

              <h1 className="hero-main-title">
                Discover Campus Events. <br />
                <span className="hero-gradient-text">Book Passes Instantly.</span>
              </h1>

              <p className="hero-lead-text">
                Explore hackathons, cultural festivals, tech workshops, sports tournaments, and conferences. Instant Paytm UPI checkout with authorized digital QR boarding passes.
              </p>

              {/* Quick Category Chips (Clean SVG Icons, No Emojis) */}
              <div className="hero-quick-chips">
                <span className="quick-label">Popular Searches:</span>
                <button
                  type="button"
                  onClick={() => { setSelectedCategory('Technology'); navigate('/explore?category=Technology'); }}
                  className="quick-chip-btn"
                >
                  <Code2 size={13} />
                  <span>Hackathons & AI</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedCategory('Music'); navigate('/explore?category=Music'); }}
                  className="quick-chip-btn"
                >
                  <Music size={13} />
                  <span>Music & Concerts</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedCategory('Sports'); navigate('/explore?category=Sports'); }}
                  className="quick-chip-btn"
                >
                  <Trophy size={13} />
                  <span>Sports Cups</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/explore?budget=free')}
                  className="quick-chip-btn chip-free"
                >
                  <Ticket size={13} />
                  <span>Free Student Passes</span>
                </button>
              </div>

              {/* Integrated Search Bar */}
              <div className="hero-search-wrapper">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedCity={selectedCity}
                  onCityChange={setSelectedCity}
                  onSearchSubmit={handleSearchSubmit}
                />
              </div>

              {/* Trust Metrics */}
              <div className="hero-trust-metrics">
                <div className="trust-metric-item">
                  <strong>30+</strong>
                  <span>Institutes & Chapters</span>
                </div>
                <div className="trust-divider"></div>
                <div className="trust-metric-item">
                  <strong>15,000+</strong>
                  <span>Student Registrations</span>
                </div>
                <div className="trust-divider"></div>
                <div className="trust-metric-item">
                  <strong>100%</strong>
                  <span>Verified Organizers</span>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Fest Spotlight */}
            {spotlightEvent && (
              <div className="hero-right-spotlight">
                <div className="spotlight-card-glass">
                  <div className="spotlight-badge-row">
                    <span className="badge badge-trending">
                      <Flame size={13} /> FEATURED EVENT
                    </span>
                    <span className="spotlight-viewer-count">
                      <Activity size={13} color="#10b981" /> 84% Passes Booked
                    </span>
                  </div>

                  <div className="spotlight-img-wrap">
                    <img src={spotlightEvent.image} alt={spotlightEvent.title} />
                    <div className="spotlight-category-tag">{spotlightEvent.category}</div>
                    <div className="spotlight-price-pill">
                      {spotlightEvent.price === 0 ? 'FREE ADMISSION' : formatPrice(spotlightEvent.price)}
                    </div>
                  </div>

                  <div className="spotlight-card-info">
                    <h3 className="spotlight-title">{spotlightEvent.title}</h3>
                    
                    <div className="spotlight-meta-list">
                      <div className="spotlight-meta-item">
                        <Calendar size={14} color="var(--primary-teal-light)" />
                        <span>{formatDate(spotlightEvent.date)} • {spotlightEvent.time}</span>
                      </div>
                      <div className="spotlight-meta-item">
                        <MapPin size={14} color="var(--accent-gold)" />
                        <span>{spotlightEvent.venue}, {spotlightEvent.city}</span>
                      </div>
                    </div>

                    <div className="spotlight-countdown-box">
                      <span className="countdown-label">REGISTRATION CLOSES IN:</span>
                      <Countdown targetDate={spotlightEvent.date} />
                    </div>

                    <div className="spotlight-action-row">
                      <Link
                        to={`/booking/${spotlightEvent.id}`}
                        className="btn btn-primary btn-full"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700 }}
                      >
                        <Ticket size={16} />
                        <span>Reserve Pass via Paytm</span>
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. UNIVERSITY PARTNERS STRIP */}
      <section className="partners-strip-section">
        <div className="container">
          <div className="partners-strip-inner">
            <span className="partners-label">TRUSTED BY STUDENT CHAPTERS & CLUBS ACROSS</span>
            <div className="partners-list">
              <span className="partner-name">IIT Ropar</span>
              <span className="partner-dot">•</span>
              <span className="partner-name">PEC Chandigarh</span>
              <span className="partner-dot">•</span>
              <span className="partner-name">Panjab University</span>
              <span className="partner-dot">•</span>
              <span className="partner-name">Thapar Institute</span>
              <span className="partner-dot">•</span>
              <span className="partner-name">Chitkara University</span>
              <span className="partner-dot">•</span>
              <span className="partner-name">Chandigarh University</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "HAPPENING ON CAMPUS" FILTERABLE EVENT SECTION */}
      <section className="section-py" style={{ background: 'var(--bg-main)' }}>
        <div className="container">
          <div className="section-header-flex">
            <div>
              <span className="section-eyebrow">
                <Sparkles size={14} /> UPCOMING DISCOVERY
              </span>
              <h2 className="section-title">Campus Events & Passes</h2>
              <p className="section-subtitle">
                Select a category to view live events, workshops, competitions, and concert passes.
              </p>
            </div>

            {/* Clean, Professional Filter Tabs */}
            <div className="campus-tabs-pill-bar">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`campus-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              >
                All Events
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('tech')}
                className={`campus-tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
              >
                Technical & Coding
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('cultural')}
                className={`campus-tab-btn ${activeTab === 'cultural' ? 'active' : ''}`}
              >
                Cultural & Music
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sports')}
                className={`campus-tab-btn ${activeTab === 'sports' ? 'active' : ''}`}
              >
                Sports & Tournaments
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('free')}
                className={`campus-tab-btn ${activeTab === 'free' ? 'active' : ''}`}
              >
                Free Admission
              </button>
            </div>
          </div>

          <div className="grid-4">
            {filteredTabEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/explore" className="btn btn-outline btn-lg" style={{ fontWeight: 600 }}>
              <span>Browse Complete Event Directory</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. EVENT CATEGORIES SHOWCASE */}
      <section className="section-py" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-eyebrow">
              <Layers size={14} /> CURATED CATALOG
            </span>
            <h2 className="section-title">Explore by Event Category</h2>
            <p className="section-subtitle">
              Browse conferences, summits, cultural festivals, esports arenas, and entrepreneurship bootcamps.
            </p>
          </div>

          <div className="grid-category">
            {categories.map((cat) => {
              const count = events.filter((e) => e.category.toLowerCase() === cat.name.toLowerCase()).length;
              return <CategoryCard key={cat.id} category={cat} eventCount={count} />;
            })}
          </div>
        </div>
      </section>

      {/* 6. CAMPUS CLUBS & SOCIETIES SPOTLIGHT */}
      <section className="section-py" style={{ background: 'var(--bg-main)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-eyebrow">
              <Users size={14} /> AUTHORIZED ORGANIZERS
            </span>
            <h2 className="section-title">Campus Societies & Student Chapters</h2>
            <p className="section-subtitle">
              Official university student bodies managing major inter-college fests and technical summits.
            </p>
          </div>

          <div className="grid-4">
            <div className="society-card">
              <div className="society-avatar" style={{ background: 'rgba(66, 133, 244, 0.12)', color: '#4285f4' }}>
                <Code2 size={24} />
              </div>
              <h4>GDG On Campus</h4>
              <p>Google Developer Student Chapter hosting Hackathons, Android, and Cloud Bootcamps.</p>
              <div className="society-stat">4 Upcoming Events</div>
            </div>

            <div className="society-card">
              <div className="society-avatar" style={{ background: 'rgba(99, 102, 241, 0.12)', color: 'var(--primary-teal-light)' }}>
                <Zap size={24} />
              </div>
              <h4>IEEE Student Branch</h4>
              <p>Organizers of national robotics symposiums, research paper tracks, and seminars.</p>
              <div className="society-stat">6 Upcoming Events</div>
            </div>

            <div className="society-card">
              <div className="society-avatar" style={{ background: 'rgba(236, 72, 153, 0.12)', color: 'var(--accent-pink)' }}>
                <Music size={24} />
              </div>
              <h4>Sonic Beats Society</h4>
              <p>University cultural society hosting battle of the bands, acoustic jams, and concerts.</p>
              <div className="society-stat">3 Upcoming Events</div>
            </div>

            <div className="society-card">
              <div className="society-avatar" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
                <Trophy size={24} />
              </div>
              <h4>Inter-College Sports Council</h4>
              <p>Managing annual cricket championships, football leagues, and badminton cups.</p>
              <div className="society-stat">5 Upcoming Events</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PLATFORM RELIABILITY & STANDARDS */}
      <section className="section-py" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-eyebrow">
              <ShieldCheck size={14} /> PLATFORM STANDARDS
            </span>
            <h2 className="section-title">Built for Students & Campus Organizers</h2>
            <p className="section-subtitle">
              Engineered with security, speed, and real-time gate validation for high-volume campus events.
            </p>
          </div>

          <div className="grid-4">
            <div className="card perk-card">
              <div className="perk-icon-wrap" style={{ background: '#002970', color: '#00baf2' }}>
                <Smartphone size={24} />
              </div>
              <h3>Paytm Gateway Integration</h3>
              <p>Scan and pay instantly using Paytm QR, Google Pay, PhonePe, or Cards. No extra convenience charges.</p>
            </div>

            <div className="card perk-card">
              <div className="perk-icon-wrap" style={{ background: 'rgba(99, 102, 241, 0.12)', color: 'var(--primary-teal-light)' }}>
                <QrCode size={24} />
              </div>
              <h3>Digital QR Boarding Pass</h3>
              <p>Immediate digital boarding pass issuance with scannable gate entry QR code, stored safely in your account.</p>
            </div>

            <div className="card perk-card">
              <div className="perk-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
                <ShieldCheck size={24} />
              </div>
              <h3>Student ID Verification</h3>
              <p>Roll number validation prevents unauthorized ticket scalping and ensures genuine student access.</p>
            </div>

            <div className="card perk-card">
              <div className="perk-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' }}>
                <Award size={24} />
              </div>
              <h3>Participation E-Certificates</h3>
              <p>Download verified digital attendance and participation certificates directly after attending events.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. STUDENT REVIEWS */}
      <section className="section-py" style={{ background: 'var(--bg-main)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-eyebrow">
              <Star size={14} color="#fbbf24" /> ATTENDEE EXPERIENCES
            </span>
            <h2 className="section-title">Verified Student Reviews</h2>
            <p className="section-subtitle">
              Read feedback from students attending campus conferences, hackathons, and cultural fests.
            </p>
          </div>

          <div className="grid-3">
            <div className="card testimonial-card">
              <div className="testimonial-rating">
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
              </div>
              <p className="testimonial-text">
                "Reserving our team's hackathon pass via Paytm took less than a minute. The QR boarding pass scanned effortlessly at the auditorium gate."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">KS</div>
                <div>
                  <strong>Kavya Sharma</strong>
                  <span>B.Tech CSE • PEC Chandigarh</span>
                </div>
              </div>
            </div>

            <div className="card testimonial-card">
              <div className="testimonial-rating">
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
              </div>
              <p className="testimonial-text">
                "The platform makes it very easy to find free student entry workshops and concerts. Having the pass stored on my phone makes check-in smooth."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: 'var(--primary-teal)' }}>AR</div>
                <div>
                  <strong>Aman Rawat</strong>
                  <span>ECE, 3rd Year • Chitkara University</span>
                </div>
              </div>
            </div>

            <div className="card testimonial-card">
              <div className="testimonial-rating">
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
                <Star size={15} fill="#fbbf24" color="#fbbf24" />
              </div>
              <p className="testimonial-text">
                "Applying the STUDENT50 coupon gave an instant discount, and my booking confirmation and gate QR code were issued without delay."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ background: '#6366f1' }}>MG</div>
                <div>
                  <strong>Mehak Gupta</strong>
                  <span>MBA • Panjab University</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="section-py" style={{ background: 'var(--bg-surface)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="section-title-wrap">
            <span className="section-eyebrow">
              <Compass size={14} /> QUESTIONS & HELP
            </span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Answers regarding pass reservation, payment gateways, and venue entry policies.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="faq-item card" onClick={() => toggleFaq(index)}>
                  <div className="faq-header">
                    <span className="faq-question">{faq.q}</span>
                    <button type="button" className="faq-toggle-btn">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                  {isOpen && (
                    <div className="faq-answer animate-fade-in">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER & FEST ALERTS */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-card-gradient">
            <div className="cta-content">
              <span className="badge" style={{ marginBottom: '12px' }}>
                <Bell size={13} /> CAMPUS NOTIFICATIONS
              </span>
              <h2>Stay Updated with Campus Fests</h2>
              <p>
                Receive alerts regarding upcoming hackathon registrations, early-bird concert passes, and guest speaker announcements directly to your student email.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you! You will receive campus fest notifications.');
                }}
                className="cta-form"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your college email (e.g., student@college.edu)"
                  className="cta-input"
                />
                <button type="submit" className="btn btn-primary btn-lg" style={{ fontWeight: 700 }}>
                  <span>Subscribe</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
