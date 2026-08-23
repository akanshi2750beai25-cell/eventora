import './NotFound.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Search, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="section-py" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '580px', textAlign: 'center' }}>
        <div className="card" style={{ padding: '64px 32px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--badge-bg)', color: 'var(--primary-teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem' }}>
            <Compass size={40} />
          </div>

          <span style={{ fontSize: '4rem', fontWeight: 900, fontFamily: 'var(--font-heading)', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block', lineHeight: 1 }}>
            404
          </span>

          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '12px', marginBottom: '12px' }}>
            Event or Page Not Found
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '32px', lineHeight: 1.6 }}>
            Oops! The page you're searching for might have concluded, changed venue, or been moved.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary btn-md">
              <Home size={16} />
              <span>Back to Home</span>
            </Link>
            <Link to="/explore" className="btn btn-outline btn-md">
              <Search size={16} />
              <span>Explore Events</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
