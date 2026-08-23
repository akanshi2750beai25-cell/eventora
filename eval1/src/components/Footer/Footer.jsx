import './Footer.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Send, Heart, Shield, Code, Phone, MapPin } from 'lucide-react';
import { useEvents } from '../../context/EventContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useEvents();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid college email address', 'error');
      return;
    }
    showToast('Subscribed to Eventora campus alerts! 🚀', 'success');
    setEmail('');
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Mission Column */}
          <div className="footer-brand">
            <Link to="/" className="nav-brand" style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
              <div className="nav-brand-logo-icon">
                <Sparkles size={20} />
              </div>
              <div>EVENTORA<span>.</span></div>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginTop: '14px' }}>
              Discover Events. Create Memories. The next-generation event management and smart booking platform built for campus students, clubs, and universities.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} color="var(--primary-teal-light)" />
                <span>Chandigarh • Mohali • Panchkula Campuses</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} color="var(--primary-purple)" />
                <span>support@eventora.edu</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="footer-heading">Platform</h4>
            <div className="footer-links-list">
              <Link to="/">Home Overview</Link>
              <Link to="/explore">Explore Events</Link>
              <Link to="/categories">Event Categories</Link>
              <Link to="/create-event">Create New Event</Link>
              <Link to="/my-bookings">Digital Tickets & Bookings</Link>
              <Link to="/wishlist">Saved Wishlist</Link>
            </div>
          </div>

          {/* Dashboards & Portals */}
          <div>
            <h4 className="footer-heading">Portals & Info</h4>
            <div className="footer-links-list">
              <Link to="/dashboard">Organizer Dashboard</Link>
              <Link to="/admin">Admin Moderation Panel</Link>
              <Link to="/about">About & Project Mission</Link>
              <Link to="/contact">Contact Campus Desk</Link>
              <Link to="/profile">Student Profile</Link>
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="footer-heading">Stay Connected</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Get weekly student discounts, hackathon alerts, and campus fest updates directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter college email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                aria-label="Your college email"
              />
              <button type="submit" className="btn btn-primary btn-sm" aria-label="Subscribe to newsletter">
                <Send size={15} />
              </button>
            </form>

            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <Shield size={14} color="#10b981" />
              <span>Zero spam, verified campus events only.</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} EVENTORA — <strong>Discover. Connect. Book. Celebrate.</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <Code size={15} color="var(--primary-teal-light)" />
            <span>B.E. CSE (AI & ML) Final Evaluation Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
