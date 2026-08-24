import './DigitalTicket.css';
import React from 'react';
import { 
  Calendar, Clock, MapPin, QrCode, Printer, 
  Share2, ShieldCheck, CheckCircle2, Ticket as TicketIcon 
} from 'lucide-react';
import { formatDate, formatPrice } from '../../utils/helpers';
import { useEvents } from '../../context/EventContext';

export default function DigitalTicket({ booking }) {
  const { showToast } = useEvents();

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Eventora Ticket: ${booking.eventTitle}`,
        text: `Here is my confirmed ticket for ${booking.eventTitle} (ID: ${booking.bookingId})!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Ticket link copied to clipboard! 📋', 'success');
    }
  };

  return (
    <div className="printable-ticket">
      <div className="digital-ticket-container animate-scale-in">
        {/* Ticket Notches */}
        <div className="ticket-notch-left"></div>
        <div className="ticket-notch-right"></div>

        {/* Ticket Header Banner */}
        <div className="ticket-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a' }}>
              <TicketIcon size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>EVENTORA</h2>
              <span style={{ fontSize: '0.72rem', letterSpacing: '1px', opacity: 0.9, textTransform: 'uppercase' }}>
                Official Digital Pass
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.2)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.82rem', fontWeight: 700 }}>
            <ShieldCheck size={16} />
            <span>CONFIRMED #{booking.bookingId}</span>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="ticket-body">
          {/* Main Info */}
          <div>
            <span className="badge" style={{ marginBottom: '8px' }}>{booking.category || 'Event'}</span>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.3 }}>
              {booking.eventTitle}
            </h1>

            {/* Meta Grid */}
            <div className="ticket-info-grid">
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Date</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                  <Calendar size={15} color="var(--primary-teal-light)" />
                  <span>{formatDate(booking.date)}</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Time</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                  <Clock size={15} color="var(--primary-purple)" />
                  <span>{booking.time}</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Venue</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                  <MapPin size={15} color="var(--accent-gold)" />
                  <span>{booking.venue || 'Campus Hall'}, {booking.city}</span>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Attendee</span>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {booking.attendeeName}
                </div>
                <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{booking.attendeeEmail}</small>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Tier & Seats</span>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {booking.ticketTier || 'General'} ({booking.quantity} Qty)
                </div>
                <small style={{ color: 'var(--primary-teal-light)', fontWeight: 700 }}>
                  Seats: {booking.selectedSeats?.length ? booking.selectedSeats.join(', ') : 'Free Seating'}
                </small>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>Total Paid</span>
                <div style={{ fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '1.2rem', marginTop: '2px' }}>
                  {formatPrice(booking.totalAmount)}
                </div>
                <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{booking.paymentMethod || 'Online Paid'}</small>
              </div>
            </div>
          </div>

          {/* QR Code Visual Box */}
          <div className="ticket-qr-section">
            <div className="ticket-qr-code">
              {/* QR Pattern visual */}
              <QrCode size={76} strokeWidth={2.2} />
              <span style={{ letterSpacing: '0.5px' }}>{booking.bookingId}</span>
            </div>
            <small style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '8px', fontWeight: 600 }}>
              Scan at Venue Entrance
            </small>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="no-print" style={{ padding: '16px 32px', background: 'var(--bg-surface)', borderTop: '1px dashed var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <CheckCircle2 size={16} color="#10b981" />
            <span>Valid student identity proof required at gate</span>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleShare} className="btn btn-outline btn-sm">
              <Share2 size={15} />
              <span>Share Pass</span>
            </button>
            <button onClick={handlePrint} className="btn btn-primary btn-sm">
              <Printer size={15} />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
