import './EventCard.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Heart, Star, Users, ArrowRight } from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { formatPrice, formatDate } from '../../utils/helpers';

export default function EventCard({ event, layout = 'grid' }) {
  const { toggleWishlist, isWishlisted } = useEvents();
  const navigate = useNavigate();
  const isFav = isWishlisted(event.id);

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
    <article className="event-card animate-fade-in" aria-label={event.title}>
      {/* Media Thumbnail */}
      <div className="event-card-media">
        <img
          src={event.image}
          alt={event.title}
          className="event-card-img"
          loading="lazy"
        />
        
        {/* Floating Badges */}
        <div className="event-card-badges">
          <span className="badge">{event.category}</span>
          {event.isTrending && (
            <span className="badge badge-trending">🔥 Trending</span>
          )}
          {event.price === 0 && (
            <span className="badge badge-free">🎉 Free</span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          className={`event-card-fav ${isFav ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={isFav ? '#ffffff' : 'transparent'} />
        </button>
      </div>

      {/* Card Content Body */}
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

        {/* Seats & Rating Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', marginTop: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-gold)' }}>
            <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{event.rating || 5.0}</span>
            <span style={{ color: 'var(--text-muted)' }}>({event.reviewsCount || 0})</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: event.availableSeats < 25 ? 'var(--accent-rose)' : 'var(--text-secondary)' }}>
            <Users size={14} />
            <span>{event.availableSeats} seats left</span>
          </div>
        </div>

        {/* Card Footer: Price & Actions */}
        <div className="event-card-footer">
          <div className="event-card-price">
            <span className="event-card-price-label">Price per person</span>
            <span className="event-card-price-val">{formatPrice(event.price)}</span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to={`/event/${event.id}`} className="btn btn-outline btn-sm">
              Details
            </Link>
            <button
              onClick={handleBookClick}
              className="btn btn-primary btn-sm"
              disabled={event.availableSeats === 0}
            >
              {event.availableSeats === 0 ? 'Sold Out' : 'Book'}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
