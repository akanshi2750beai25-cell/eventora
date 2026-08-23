import './Home.css';
import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Flame, Trophy, Users, 
  Calendar, ShieldCheck, Ticket, Search, CheckCircle2, 
  Star, Compass, Gift, Layers, UserCheck 
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { categories } from '../../data/categoriesData';
import EventCard from '../../components/EventCard/EventCard';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function Home() {
  const { events } = useEvents();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');

  const handleSearchSubmit = () => {
    let url = `/explore?`;
    if (searchTerm) url += `q=${encodeURIComponent(searchTerm)}&`;
    if (selectedCategory !== 'All') url += `category=${encodeURIComponent(selectedCategory)}&`;
    if (selectedCity !== 'All') url += `city=${encodeURIComponent(selectedCity)}&`;
    navigate(url);
  };

  // Filtered lists for Home sections
  const featuredEvents = useMemo(() => {
    return events.filter((e) => e.isFeatured).slice(0, 4);
  }, [events]);

  const trendingEvents = useMemo(() => {
    return events.filter((e) => e.isTrending).slice(0, 4);
  }, [events]);

  const freeEvents = useMemo(() => {
    return events.filter((e) => e.price === 0).slice(0, 4);
  }, [events]);

  return (
    <div className="home-page-container">
      {/* 1. HERO SECTION */}
      <section className="hero-section" style={{ padding: '60px 0 40px', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 40px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: 'var(--radius-full)', background: 'var(--badge-bg)', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
              <Sparkles size={16} color="var(--primary-teal-light)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-teal-light)', letterSpacing: '0.5px' }}>
                COLLEGE EVENT MANAGEMENT & BOOKING
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-1px' }}>
              Discover Events. <br />
              <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Create Memories.
              </span>
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto 32px', lineHeight: 1.6 }}>
              Find hackathons, live music fests, sports tournaments, comedy shows, and workshops across college campuses. Book student passes effortlessly.
            </p>

            {/* Quick Hero Search Bar */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              onSearchSubmit={handleSearchSubmit}
            />

            {/* Quick Tag Chips */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Popular Searches:</span>
              <button onClick={() => { setSelectedCategory('Technology'); navigate('/explore?category=Technology'); }} className="badge" style={{ cursor: 'pointer', background: 'var(--bg-card)' }}>💻 AI Summit</button>
              <button onClick={() => { setSelectedCategory('Music'); navigate('/explore?category=Music'); }} className="badge badge-purple" style={{ cursor: 'pointer' }}>🎵 Music Fest</button>
              <button onClick={() => { setSelectedCategory('Sports'); navigate('/explore?category=Sports'); }} className="badge" style={{ cursor: 'pointer', background: 'var(--bg-card)' }}>⚽ Cricket Cup</button>
              <button onClick={() => { navigate('/explore?budget=free'); }} className="badge badge-free" style={{ cursor: 'pointer' }}>🎉 Free Student Entry</button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTICS COUNTER SECTION */}
      <section style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)', padding: '36px 0' }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            <div className="animate-fade-in">
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-teal-light)', display: 'block' }}>
                120+
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Campus Events Listed</span>
            </div>
            <div className="animate-fade-in">
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-purple)', display: 'block' }}>
                15,000+
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Student Attendees</span>
            </div>
            <div className="animate-fade-in">
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-gold)', display: 'block' }}>
                45+
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Clubs & University Partners</span>
            </div>
            <div className="animate-fade-in">
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-emerald)', display: 'block' }}>
                4.9 ★
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Student Satisfaction Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRENDING EVENTS SECTION */}
      <section className="section-py">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="section-eyebrow">
                <Flame size={16} color="#fb923c" /> In High Demand
              </span>
              <h2 className="section-title">Trending Across Campus</h2>
              <p className="section-subtitle">The hottest events students are booking this week.</p>
            </div>
            <Link to="/explore?sort=trending" className="btn btn-outline btn-sm">
              <span>View All Trending</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-4">
            {trendingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. CATEGORIES SHOWCASE GRID */}
      <section className="section-py" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-eyebrow">
              <Layers size={16} /> Curated Catalog
            </span>
            <h2 className="section-title">Browse By Event Category</h2>
            <p className="section-subtitle">Find exactly what matches your passion, from technical summits to cultural nights.</p>
          </div>

          <div className="grid-category">
            {categories.map((cat) => {
              const count = events.filter((e) => e.category.toLowerCase() === cat.name.toLowerCase()).length;
              return <CategoryCard key={cat.id} category={cat} eventCount={count} />;
            })}
          </div>
        </div>
      </section>

      {/* 5. HOW EVENTORA WORKS SECTION */}
      <section className="section-py">
        <div className="container">
          <div className="section-title-wrap">
            <span className="section-eyebrow">
              <Compass size={16} /> Simple 4-Step Process
            </span>
            <h2 className="section-title">How Eventora Works</h2>
            <p className="section-subtitle">From discovery to venue entry in 4 simple steps.</p>
          </div>

          <div className="grid-4" style={{ position: 'relative' }}>
            {/* Step 1 */}
            <div className="card" style={{ textAlign: 'center', padding: '32px 20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--badge-bg)', color: 'var(--primary-teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, margin: '0 auto 16px' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Search & Filter</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Filter events by category, budget tier, and college campus.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card" style={{ textAlign: 'center', padding: '32px 20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--badge-purple-bg)', color: 'var(--primary-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, margin: '0 auto 16px' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Select Pass Tier</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Choose Student Pass, General, or VIP access with live price calculation.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card" style={{ textAlign: 'center', padding: '32px 20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--badge-gold-bg)', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, margin: '0 auto 16px' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Enter Student Info</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Provide your attendee details and apply student discount codes.
              </p>
            </div>

            {/* Step 4 */}
            <div className="card" style={{ textAlign: 'center', padding: '32px 20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800, margin: '0 auto 16px' }}>
                4
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Get Digital Pass</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Receive an instant printable digital boarding pass ticket.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STUDENT BUDGET PICKS (Free & Under ₹200) */}
      <section className="section-py" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="section-eyebrow" style={{ color: '#10b981' }}>
                <Gift size={16} color="#10b981" /> Student Friendly
              </span>
              <h2 className="section-title">Free & Low Budget Events</h2>
              <p className="section-subtitle">Experience high-quality college workshops and fests with ₹0 or minimal fees.</p>
            </div>
            <Link to="/explore?budget=free" className="btn btn-outline btn-sm">
              <span>View All Budget Deals</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid-4">
            {freeEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
