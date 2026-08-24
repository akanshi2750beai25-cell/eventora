import './Wishlist.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import EventCard from '../../components/EventCard/EventCard';

export default function Wishlist() {
  const { wishlist, events, toggleWishlist } = useEvents();

  // Find event objects corresponding to wishlisted IDs
  const wishlistedEvents = events.filter((e) => wishlist.includes(e.id));

  return (
    <div className="section-py" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Heart size={18} color="var(--accent-rose)" fill="var(--accent-rose)" />
              <span className="section-eyebrow" style={{ color: 'var(--accent-rose)' }}>
                Saved Favorites
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800 }}>
              Your Event Wishlist
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Events you've saved to keep track of ticket drops and dates.
            </p>
          </div>

          {wishlistedEvents.length > 0 && (
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {wishlistedEvents.length} {wishlistedEvents.length === 1 ? 'Event Saved' : 'Events Saved'}
            </span>
          )}
        </div>

        {/* Wishlist Grid */}
        {wishlistedEvents.length > 0 ? (
          <div className="grid-3">
            {wishlistedEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '64px 24px', maxWidth: '640px', margin: '0 auto' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Heart size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Your Wishlist is Empty</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              You haven't added any events to your favorites yet. Browse through campus concerts, tech symposiums, and sports tournaments to save them here.
            </p>
            <Link to="/explore" className="btn btn-primary btn-md">
              <span>Explore Events</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
