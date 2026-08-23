import './EventCard.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Heart, Star, Users, ArrowRight, Tag } from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { formatPrice, formatDate, truncateText } from '../../utils/helpers';

/**
 * EventCard — Mridul Bhardwaj (Eval 1)
 * Reusable card with badges, price formatting, 
 * favourite toggle, seats urgency indicator, and CTA.
 *
 * Props:
 *  event  {object}  — Event data object
 *  layout {string}  — 'grid' (default) | 'compact'
 */
export default function EventCard({ event, layout = 'grid' }) {
  const { toggleWishlist, isWishlisted } = useEvents();
  const navigate = useNavigate();
  const isFav    = isWishlisted(event.id);
  const isSoldOut = event.availableSeats === 0;
  const isLowSeats = !isSoldOut && event.availableSeats < 20;

  // Local hover state to highlight card
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(event.id);
  };

  const handleBookClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/booking/${event.id}`);
  };

  return (
    <article
      className="event-card animate-fade-in"
      aria-label={event.title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Media Thumbnail ── */}
      <div className="event-card-media">
        <img
          src={event.image}
          alt={event.title}
          className="event-card-img"
          loading="lazy"
        />

        {/* Sold-Out overlay */}
        {isSoldOut && (
          <div className="event-card-sold-out">
            <span>Sold Out</span>
          </div>
        )}

        {/* Floating Badges (top-left) */}
        <div className="event-card-badges">
          <span className="badge">{event.category}</span>
          {event.isTrending && (
            <span className="badge badge-trending">🔥 Trending</span>
          )}
          {event.price === 0 && (
            <span className="badge badge-free">🎉 Free</span>
          )}
        </div>

        {/* Favourite Heart Button (top-right) */}
        <button
          type="button"
          className={`event-card-fav ${isFav ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isFav ? '#ffffff' : 'transparent'} />
        </button>

        {/* Low Seats Warning (bottom of image) */}
        {isLowSeats && (
          <div className="event-card-seats-bar">
            <span className="seats-low">⚡ Only {event.availableSeats} seats left!</span>
          </div>
        )}
      </div>

      {/* ── Card Body ── */}
      <div className="event-card-body">

        {/* Date & Time Chips */}
        <div className="event-card-meta">
          <div className="event-card-meta-item">
            <Calendar size={14} color="var(--primary-teal-light)" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="event-card-meta-item">
            <Clock size={14} color="var(--primary-purple)" />
            <span>{event.time}</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/event/${event.id}`} style={{ textDecoration: 'none' }}>
          <h3 className="event-card-title">{event.title}</h3>
        </Link>

        {/* Location & Venue */}
        <div className="event-card-location">
          <MapPin size={14} color="var(--text-muted)" />
          <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {event.venue}, {event.city}
          </span>
        </div>

        {/* Rating & Seats Row */}
        <div className="event-card-stats">
          <div className="event-card-rating">
            <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
            <span>{event.rating || 5.0}</span>
            <small>({event.reviewsCount || 0})</small>
          </div>
          <div className={`event-card-seats ${isLowSeats ? 'low-seats' : 'normal-seats'}`}>
            <Users size={13} />
            <span>{isSoldOut ? 'Sold Out' : `${event.availableSeats} seats`}</span>
          </div>
        </div>

        {/* Tags (up to 3) */}
        {event.tags && event.tags.length > 0 && (
          <div className="event-card-tags">
            {event.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="event-card-tag">#{tag}</span>
            ))}
          </div>
        )}

        {/* Footer: Price + CTA Buttons */}
        <div className="event-card-footer">
          <div className="event-card-price">
            <span className="event-card-price-label">Per Person</span>
            <span className={`event-card-price-val ${event.price === 0 ? 'free' : ''}`}>
              {formatPrice(event.price)}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to={`/event/${event.id}`} className="btn btn-outline btn-sm">
              Details
            </Link>
            <button
              onClick={handleBookClick}
              className="btn btn-primary btn-sm"
              disabled={isSoldOut}
              aria-disabled={isSoldOut}
              title={isSoldOut ? 'This event is sold out' : `Book ${event.title}`}
            >
              {isSoldOut ? 'Sold Out' : 'Book'}
              {!isSoldOut && <ArrowRight size={14} />}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
