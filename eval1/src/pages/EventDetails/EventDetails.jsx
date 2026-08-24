import './EventDetails.css';
import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, Users, Heart, Share2, 
  ShieldCheck, Star, Sparkles, ArrowRight, CheckCircle2, 
  Ticket, MessageSquare, Send 
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { formatDate, formatPrice } from '../../utils/helpers';
import Countdown from '../../components/Countdown/Countdown';
import Rating from '../../components/Rating/Rating';
import EventCard from '../../components/EventCard/EventCard';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, wishlist, toggleWishlist, reviews, addReview, showToast } = useEvents();
  const { user } = useAuth();

  // Find current event
  const event = events.find((e) => e.id === id) || events[0];
  const isFav = wishlist.includes(event.id);

  // Filter reviews for this specific event
  const eventReviews = useMemo(() => {
    return reviews.filter((r) => r.eventId === event.id);
  }, [reviews, event.id]);

  // Similar Events in same category (Evaluation 1 basic array filter)
  const similarEvents = useMemo(() => {
    return events.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 3);
  }, [events, event.category, event.id]);

  // Review Form State
  const [newRating, setNewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewerName, setReviewerName] = useState(user?.name || '');

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      showToast('Please enter your review comment', 'error');
      return;
    }

    addReview(event.id, {
      author: reviewerName || 'College Student',
      college: user?.department || 'Student Attendee',
      rating: Number(newRating),
      comment: reviewComment.trim(),
      avatar: user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
    });

    setReviewComment('');
    showToast('Thank you! Your review has been posted 🎉', 'success');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out ${event.title} on Eventora!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Event link copied to clipboard! 📋', 'success');
    }
  };

  return (
    <div className="event-details-page" style={{ paddingBottom: '80px' }}>
      {/* 1. HERO BANNER */}
      <section style={{ position: 'relative', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', padding: '40px 0 32px' }}>
        <div className="container">
          {/* Breadcrumb Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/explore">Events</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary-teal-light)' }}>{event.category}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }}>
            {/* Banner Image */}
            <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', height: '380px', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src={event.image}
                alt={event.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '8px' }}>
                <span className="badge">{event.category}</span>
                {event.isTrending && <span className="badge badge-trending">🔥 Trending</span>}
                {event.price === 0 && <span className="badge badge-free">🎉 Free Pass</span>}
              </div>
            </div>

            {/* Event Quick Info & Countdown */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)' }}>
                  <Rating value={event.rating || 5.0} readOnly size={16} />
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{event.rating || 5.0}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({event.reviewsCount || 0} reviews)</span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className={`btn btn-outline btn-sm ${isFav ? 'active' : ''}`}
                    onClick={() => toggleWishlist(event.id)}
                    aria-label="Wishlist"
                  >
                    <Heart size={16} fill={isFav ? 'var(--accent-rose)' : 'transparent'} color={isFav ? 'var(--accent-rose)' : 'inherit'} />
                    <span>{isFav ? 'Saved' : 'Save'}</span>
                  </button>
                  <button type="button" className="btn btn-outline btn-sm" onClick={handleShare} aria-label="Share">
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '16px' }}>
                {event.title}
              </h1>

              {/* Event Meta Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <Calendar size={18} color="var(--primary-teal-light)" />
                  <strong>{formatDate(event.date)}</strong>
                  <span style={{ color: 'var(--text-muted)' }}>•</span>
                  <Clock size={18} color="var(--primary-purple)" />
                  <span>{event.time}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <MapPin size={18} color="var(--accent-gold)" />
                  <span>{event.venue}, <strong>{event.city}</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                  <Users size={18} color="var(--accent-cyan)" />
                  <span><strong>{event.availableSeats}</strong> seats available out of {event.totalSeats || 150}</span>
                </div>
              </div>

              {/* Live Event Countdown */}
              <div className="card" style={{ padding: '16px 20px', background: 'var(--bg-glass-card)', marginBottom: '24px' }}>
                <Countdown targetDate={event.date} targetTime={event.time} label="Event Starts In" />
              </div>

              {/* CTA Booking Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Starting At</span>
                  <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-teal-light)' }}>{formatPrice(event.price)}</span>
                </div>

                <button
                  onClick={() => navigate(`/booking/${event.id}`)}
                  className="btn btn-primary btn-lg"
                  style={{ flex: 1 }}
                  disabled={event.availableSeats === 0}
                >
                  <Ticket size={20} />
                  <span>{event.availableSeats === 0 ? 'Sold Out' : 'Book Student Passes'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DETAILS & SCHEDULE TABS */}
      <section className="section-py">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '40px' }}>
            {/* Left Column: Description, Highlights, Agenda, Reviews */}
            <div>
              {/* About Event */}
              <div className="card" style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '14px' }}>About This Event</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '20px' }}>
                  {event.description}
                </p>

                {/* Highlights */}
                {event.highlights && (
                  <div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '12px', fontWeight: 700 }}>Event Highlights</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                      {event.highlights.map((highlight, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                          <CheckCircle2 size={16} color="#10b981" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Schedule & Agenda Timeline */}
              {event.agenda && event.agenda.length > 0 && (
                <div className="card" style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>Event Schedule & Timeline</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', borderLeft: '2px dashed var(--primary-teal)', paddingLeft: '20px', marginLeft: '10px' }}>
                    {event.agenda.map((item, idx) => (
                      <div key={idx} style={{ position: 'relative' }}>
                        {/* Timeline Bullet */}
                        <div style={{ position: 'absolute', left: '-27px', top: '4px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary-teal-light)', boxShadow: '0 0 8px var(--primary-teal-glow)' }}></div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-teal-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {item.time}
                        </span>
                        <h4 style={{ margin: '2px 0 0', fontSize: '1rem', color: 'var(--text-primary)' }}>
                          {item.title}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ratings & User Reviews Section */}
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Attendee Ratings & Reviews</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Star size={20} fill="var(--accent-gold)" color="var(--accent-gold)" />
                    <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{event.rating || 5.0}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>/ 5.0</span>
                  </div>
                </div>

                {/* Review Submission Form */}
                <form onSubmit={handleReviewSubmit} style={{ background: 'var(--bg-surface)', padding: '20px', borderRadius: 'var(--radius-md)', marginBottom: '24px', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>Leave a Review & Rating</h4>
                  
                  <div style={{ marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                      Select Rating:
                    </span>
                    <Rating value={newRating} onChange={setNewRating} size={22} showLabel />
                  </div>

                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <textarea
                      rows={3}
                      className="form-textarea"
                      placeholder="Share your feedback, expectations, or experience from previous editions..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-sm">
                    <Send size={15} />
                    <span>Submit Review</span>
                  </button>
                </form>

                {/* Reviews List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {eventReviews.length > 0 ? (
                    eventReviews.map((rev) => (
                      <div key={rev.id} style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <img src={rev.avatar} alt={rev.author} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                              <strong style={{ fontSize: '0.92rem', display: 'block' }}>{rev.author}</strong>
                              <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{rev.college}</small>
                            </div>
                          </div>
                          <Rating value={rev.rating} readOnly size={14} />
                        </div>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0 }}>
                          "{rev.comment}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Be the first to review this college event!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Organizer Info & Location Simulator */}
            <div>
              {/* Organizer Card */}
              <div className="card" style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
                  Event Organizer
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <img
                    src={event.organizer?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                    alt={event.organizer?.name}
                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ fontSize: '1.05rem' }}>{event.organizer?.name}</strong>
                      {event.organizer?.verified && <ShieldCheck size={16} color="#10b981" title="Verified Campus Organizer" />}
                    </div>
                    <small style={{ color: 'var(--primary-teal-light)', fontWeight: 600 }}>Official Campus Club</small>
                  </div>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  Contact: <a href={`mailto:${event.organizer?.contact}`} style={{ color: 'var(--primary-teal-light)' }}>{event.organizer?.contact || 'support@eventora.edu'}</a>
                </p>
              </div>

              {/* Campus Venue Map Visual Simulator */}
              <div className="card" style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '12px' }}>Venue Location</h4>
                <div style={{ position: 'relative', height: '180px', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                  <div style={{ textAlign: 'center', padding: '16px' }}>
                    <MapPin size={32} color="var(--primary-teal-light)" style={{ margin: '0 auto 8px', animation: 'float 3s infinite' }} />
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>{event.venue}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{event.city}, India</span>
                  </div>
                </div>
              </div>

              {/* Ticket Tiers Preview */}
              <div className="card">
                <h4 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>Available Ticket Tiers</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {event.ticketTiers?.map((tier) => (
                    <div key={tier.id} style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <strong>{tier.name}</strong>
                        <span style={{ fontWeight: 800, color: 'var(--primary-teal-light)' }}>{formatPrice(tier.price)}</span>
                      </div>
                      <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{tier.perks}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SIMILAR EVENTS IN SAME CATEGORY */}
      {similarEvents.length > 0 && (
        <section className="section-py" style={{ background: 'var(--bg-surface)' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
              <div>
                <span className="section-eyebrow">More in {event.category}</span>
                <h2 className="section-title">You Might Also Like</h2>
              </div>
              <Link to={`/explore?category=${encodeURIComponent(event.category)}`} className="btn btn-outline btn-sm">
                <span>View More</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid-3">
              {similarEvents.map((evt) => (
                <EventCard key={evt.id} event={evt} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
