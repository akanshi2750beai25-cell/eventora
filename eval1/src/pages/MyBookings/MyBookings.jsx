import './MyBookings.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Ticket, Calendar, Clock, MapPin, QrCode, 
  Trash2, AlertTriangle, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { formatDate, formatPrice } from '../../utils/helpers';
import Modal from '../../components/Modal/Modal';

export default function MyBookings() {
  const { bookings, cancelBooking } = useEvents();
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' | 'past'
  const [cancelModalBooking, setCancelModalBooking] = useState(null);

  const now = new Date();

  // Partition bookings into upcoming vs past
  const upcomingBookings = bookings.filter((b) => {
    const bDate = new Date(b.date);
    return bDate >= now && b.status !== 'Cancelled';
  });

  const pastBookings = bookings.filter((b) => {
    const bDate = new Date(b.date);
    return bDate < now || b.status === 'Cancelled';
  });

  const currentList = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  const handleConfirmCancel = () => {
    if (cancelModalBooking) {
      cancelBooking(cancelModalBooking.id);
      setCancelModalBooking(null);
    }
  };

  return (
    <div className="section-py" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Ticket size={18} color="var(--primary-teal-light)" />
              <span className="section-eyebrow">Student Pass Management</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800 }}>
              My Event Bookings
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Manage your confirmed tickets, view boarding passes, and download entry QR codes.
            </p>
          </div>

          {/* Tab Switcher */}
          <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`btn btn-sm ${activeTab === 'upcoming' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Upcoming ({upcomingBookings.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`btn btn-sm ${activeTab === 'past' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Past / Cancelled ({pastBookings.length})
            </button>
          </div>
        </div>

        {/* Bookings List */}
        {currentList.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {currentList.map((booking) => {
              const isCancelled = booking.status === 'Cancelled';

              return (
                <div
                  key={booking.id}
                  className="card hover-lift"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '24px',
                    alignItems: 'center',
                    borderLeft: `4px solid ${isCancelled ? 'var(--accent-rose)' : 'var(--primary-teal)'}`
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <span className="badge">{booking.category || 'Event'}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                        ID: {booking.bookingId}
                      </span>
                      <span
                        className={`badge ${isCancelled ? 'btn-danger' : 'badge-free'}`}
                        style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
                      {booking.eventTitle}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.88rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={15} color="var(--primary-teal-light)" />
                        <span>{formatDate(booking.date)}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={15} color="var(--primary-purple)" />
                        <span>{booking.time}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={15} color="var(--accent-gold)" />
                        <span>{booking.venue}, {booking.city}</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Seats: <strong style={{ color: 'var(--primary-teal-light)' }}>{booking.selectedSeats?.join(', ') || 'General Admission'}</strong> ({booking.quantity}x tickets) • Total Paid: <strong style={{ color: 'var(--text-primary)' }}>{formatPrice(booking.totalAmount)}</strong>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px' }}>
                    <Link
                      to={`/ticket/${booking.bookingId || booking.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      <QrCode size={15} />
                      <span>View Pass / QR</span>
                    </Link>

                    {!isCancelled && (
                      <button
                        onClick={() => setCancelModalBooking(booking)}
                        className="btn btn-danger btn-sm"
                      >
                        <Trash2 size={14} />
                        <span>Cancel Booking</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '64px 24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--text-muted)' }}>
              <Ticket size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>
              No {activeTab === 'upcoming' ? 'Upcoming' : 'Past'} Bookings Found
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 24px' }}>
              You don't have any event tickets reserved yet. Explore upcoming campus festivals and lock in your seats!
            </p>
            <Link to="/explore" className="btn btn-primary btn-md">
              <span>Explore Events Directory</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Cancellation Modal Dialog */}
        <Modal
          isOpen={!!cancelModalBooking}
          onClose={() => setCancelModalBooking(null)}
          title="Confirm Ticket Cancellation"
        >
          {cancelModalBooking && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: 'var(--accent-rose)' }}>
                <AlertTriangle size={24} />
                <strong style={{ fontSize: '1.05rem' }}>Are you sure you want to cancel this booking?</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                You are cancelling your reservation for <strong>{cancelModalBooking.eventTitle}</strong> (Booking #{cancelModalBooking.bookingId}). A simulated refund of {formatPrice(cancelModalBooking.totalAmount)} will be initiated to your original payment method.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={() => setCancelModalBooking(null)} className="btn btn-outline btn-sm">
                  Keep My Ticket
                </button>
                <button onClick={handleConfirmCancel} className="btn btn-danger btn-sm">
                  Yes, Cancel Booking
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
