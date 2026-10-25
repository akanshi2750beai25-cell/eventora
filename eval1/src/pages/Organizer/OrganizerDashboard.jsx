import './OrganizerDashboard.css';
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Plus, Calendar, Clock, MapPin, Users, 
  Trash2, Edit3, CheckCircle2, AlertCircle, Search, 
  TrendingUp, DollarSign, Ticket, ShieldCheck, X, Eye
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { formatDate, formatPrice } from '../../utils/helpers';
import Modal from '../../components/Modal/Modal';

export default function OrganizerDashboard() {
  const { events, bookings, addEvent, updateEvent, deleteEvent, showToast } = useEvents();
  const { user, quickLogin } = useAuth();

  // Tab: 'overview' | 'events' | 'attendees' | 'new-event'
  const [activeTab, setActiveTab] = useState('overview');

  // New Event Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [date, setDate] = useState('2026-11-25');
  const [time, setTime] = useState('10:00 AM');
  const [venue, setVenue] = useState('Campus Innovation Block');
  const [city, setCity] = useState('Chandigarh');
  const [price, setPrice] = useState(149);
  const [totalSeats, setTotalSeats] = useState(150);
  const [description, setDescription] = useState('');

  // Delete modal state
  const [deleteTargetEvent, setDeleteTargetEvent] = useState(null);

  // Search attendee list
  const [attendeeSearch, setAttendeeSearch] = useState('');

  // Organizer Stats Calculations
  const stats = useMemo(() => {
    const totalEventsCount = events.length;
    const totalBookingsCount = bookings.length;
    const totalRevenue = bookings
      .filter((b) => b.status !== 'Cancelled')
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    const totalSeatsRemaining = events.reduce((sum, e) => sum + (e.availableSeats || 0), 0);

    return {
      totalEventsCount,
      totalBookingsCount,
      totalRevenue,
      totalSeatsRemaining
    };
  }, [events, bookings]);

  // Filtered attendees list
  const filteredBookings = useMemo(() => {
    if (!attendeeSearch.trim()) return bookings;
    const query = attendeeSearch.toLowerCase();
    return bookings.filter(
      (b) =>
        b.attendeeName?.toLowerCase().includes(query) ||
        b.eventTitle?.toLowerCase().includes(query) ||
        b.bookingId?.toLowerCase().includes(query)
    );
  }, [bookings, attendeeSearch]);

  const handleCreateEventSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Please provide event title and description', 'error');
      return;
    }

    addEvent({
      title: title.trim(),
      category,
      date,
      time,
      venue: venue.trim(),
      city,
      price: Number(price),
      totalSeats: Number(totalSeats),
      description: description.trim(),
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
      highlights: ['Official University Certificate', 'Expert Sessions', 'Networking Pass'],
      organizer: {
        name: user?.name || 'Campus Cultural & Tech Society',
        verified: true,
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        contact: user?.email || 'organizer@eventora.edu'
      }
    });

    setTitle('');
    setDescription('');
    setActiveTab('events');
    showToast('New event listed in the campus catalog 🎉', 'success');
  };

  const handleConfirmDelete = () => {
    if (deleteTargetEvent) {
      deleteEvent(deleteTargetEvent.id);
      setDeleteTargetEvent(null);
    }
  };

  return (
    <div className="section-py organizer-dashboard-page" style={{ minHeight: '85vh', background: 'var(--bg-main)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Building2 size={18} color="var(--primary-teal-light)" />
              <span className="section-eyebrow">Module 4: Organizer Dashboard</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 800 }}>
              Campus Event Management
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Host new events, view registration revenue, manage attendee check-ins, and track capacity.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('new-event')}
              className="btn btn-primary btn-sm"
              style={{ fontWeight: 700 }}
            >
              <Plus size={16} />
              <span>Create New Event</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '28px', overflowX: 'auto' }}>
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`btn btn-sm ${activeTab === 'overview' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Overview & Metrics
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('events')}
            className={`btn btn-sm ${activeTab === 'events' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Manage Events ({events.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('attendees')}
            className={`btn btn-sm ${activeTab === 'attendees' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Attendee Roster ({bookings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('new-event')}
            className={`btn btn-sm ${activeTab === 'new-event' ? 'btn-primary' : 'btn-ghost'}`}
          >
            + New Event Form
          </button>
        </div>

        {/* TAB 1: OVERVIEW & STATS */}
        {activeTab === 'overview' && (
          <div>
            {/* Stat Cards Grid */}
            <div className="grid-4" style={{ marginBottom: '32px' }}>
              <div className="card stat-metric-box">
                <div className="stat-icon-wrap" style={{ background: 'rgba(99, 102, 241, 0.12)', color: 'var(--primary-teal-light)' }}>
                  <Calendar size={22} />
                </div>
                <div>
                  <span className="stat-label">Listed Campus Events</span>
                  <strong className="stat-value">{stats.totalEventsCount}</strong>
                </div>
              </div>

              <div className="card stat-metric-box">
                <div className="stat-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981' }}>
                  <Users size={22} />
                </div>
                <div>
                  <span className="stat-label">Total Student Bookings</span>
                  <strong className="stat-value">{stats.totalBookingsCount}</strong>
                </div>
              </div>

              <div className="card stat-metric-box">
                <div className="stat-icon-wrap" style={{ background: 'rgba(0, 186, 242, 0.12)', color: '#00baf2' }}>
                  <DollarSign size={22} />
                </div>
                <div>
                  <span className="stat-label">Paytm Booking Volume</span>
                  <strong className="stat-value">{formatPrice(stats.totalRevenue)}</strong>
                </div>
              </div>

              <div className="card stat-metric-box">
                <div className="stat-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.12)', color: '#f59e0b' }}>
                  <Ticket size={22} />
                </div>
                <div>
                  <span className="stat-label">Seats Remaining</span>
                  <strong className="stat-value">{stats.totalSeatsRemaining}</strong>
                </div>
              </div>
            </div>

            {/* Recent Registrations Table */}
            <div className="card">
              <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Recent Registrations & Ticket Passes</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '10px' }}>Booking ID</th>
                      <th style={{ padding: '10px' }}>Student Attendee</th>
                      <th style={{ padding: '10px' }}>Event Name</th>
                      <th style={{ padding: '10px' }}>Pass Qty</th>
                      <th style={{ padding: '10px' }}>Amount</th>
                      <th style={{ padding: '10px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 6).map((b) => (
                      <tr key={b.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px 10px', fontWeight: 700, color: 'var(--primary-teal-light)' }}>
                          {b.bookingId}
                        </td>
                        <td style={{ padding: '12px 10px' }}>
                          <strong>{b.attendeeName}</strong>
                          <small style={{ display: 'block', color: 'var(--text-muted)' }}>{b.studentId || b.attendeeEmail}</small>
                        </td>
                        <td style={{ padding: '12px 10px' }}>{b.eventTitle}</td>
                        <td style={{ padding: '12px 10px' }}>{b.quantity}x</td>
                        <td style={{ padding: '12px 10px', fontWeight: 700 }}>{formatPrice(b.totalAmount)}</td>
                        <td style={{ padding: '12px 10px' }}>
                          <span className={`badge ${b.status === 'Cancelled' ? 'btn-danger' : 'badge-free'}`} style={{ fontSize: '0.72rem' }}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE EVENTS */}
        {activeTab === 'events' && (
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '18px' }}>Active Campus Event Directory</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {events.map((evt) => (
                <div
                  key={evt.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    background: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <img src={evt.image} alt={evt.title} style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                        <span className="badge">{evt.category}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Seats: {evt.availableSeats}/{evt.totalSeats}</span>
                      </div>
                      <strong style={{ fontSize: '1rem', display: 'block' }}>{evt.title}</strong>
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                        {formatDate(evt.date)} • {evt.venue}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-teal-light)' }}>
                      {formatPrice(evt.price)}
                    </span>
                    <Link to={`/event/${evt.id}`} className="btn btn-outline btn-sm" title="View Public Page">
                      <Eye size={14} />
                      <span>View</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteTargetEvent(evt)}
                      className="btn btn-danger btn-sm"
                      title="Delete Event"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ATTENDEE ROSTER */}
        {activeTab === 'attendees' && (
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <h3 style={{ fontSize: '1.15rem' }}>Registered Campus Attendees</h3>
              <div style={{ position: 'relative', width: '260px' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '34px', fontSize: '0.85rem' }}
                  placeholder="Search by student or booking ID..."
                  value={attendeeSearch}
                  onChange={(e) => setAttendeeSearch(e.target.value)}
                />
                <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '10px' }}>Ticket Ref</th>
                    <th style={{ padding: '10px' }}>Student Name</th>
                    <th style={{ padding: '10px' }}>Roll / College ID</th>
                    <th style={{ padding: '10px' }}>Registered Event</th>
                    <th style={{ padding: '10px' }}>Pass Type</th>
                    <th style={{ padding: '10px' }}>Payment Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 700, color: 'var(--primary-teal-light)' }}>{b.bookingId}</td>
                      <td style={{ padding: '12px 10px', fontWeight: 600 }}>{b.attendeeName}</td>
                      <td style={{ padding: '12px 10px', color: 'var(--text-secondary)' }}>{b.studentId || 'N/A'}</td>
                      <td style={{ padding: '12px 10px' }}>{b.eventTitle}</td>
                      <td style={{ padding: '12px 10px' }}>{b.ticketTier || 'General'} ({b.quantity}x)</td>
                      <td style={{ padding: '12px 10px' }}>{b.paymentMethod || 'Paytm UPI'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: NEW EVENT FORM */}
        {activeTab === 'new-event' && (
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Host a New Campus Event / Workshop</h3>

            <form onSubmit={handleCreateEventSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Event Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. National Cyber Security Summit 2026"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Event Category *</label>
                  <select className="form-input" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Technology">Technology</option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Ticket Price (₹) * (0 for Free)</label>
                  <input
                    type="number"
                    min="0"
                    className="form-input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Time *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 10:00 AM"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Campus Venue *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. Main Auditorium Block C"
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Total Capacity *</label>
                  <input
                    type="number"
                    min="10"
                    className="form-input"
                    value={totalSeats}
                    onChange={(e) => setTotalSeats(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Description & Schedule *</label>
                <textarea
                  rows={4}
                  required
                  className="form-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide detailed description of the workshop, guest speakers, key takeaways, and certificate details..."
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '10px', fontWeight: 700 }}>
                <span>Publish Event to Campus Directory</span>
                <CheckCircle2 size={18} />
              </button>
            </form>
          </div>
        )}

        {/* Confirmation Modal for Event Deletion */}
        {deleteTargetEvent && (
          <Modal
            isOpen={!!deleteTargetEvent}
            onClose={() => setDeleteTargetEvent(null)}
            title="Confirm Event Deletion"
          >
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Are you sure you want to delete <strong>{deleteTargetEvent.title}</strong>? This action will remove the event listing from the catalog.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setDeleteTargetEvent(null)} className="btn btn-outline btn-sm">
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="btn btn-danger btn-sm">
                Yes, Delete Event
              </button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
