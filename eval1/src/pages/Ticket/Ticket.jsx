import './Ticket.css';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Ticket as TicketIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import DigitalTicket from '../../components/DigitalTicket/DigitalTicket';

export default function Ticket() {
  const { id } = useParams();
  const { bookings } = useEvents();

  // Find booking by ID or reference code
  const booking = bookings.find((b) => b.id === id || b.bookingId === id) || bookings[0];

  return (
    <div className="section-py" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Navigation Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '780px', margin: '0 auto 24px' }}>
          <Link to="/my-bookings" className="btn btn-outline btn-sm no-print">
            <ArrowLeft size={15} />
            <span>Back to My Bookings</span>
          </Link>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Digital Ticket Pass
          </span>
        </div>

        {booking ? (
          <DigitalTicket booking={booking} />
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '60px 24px', maxWidth: '600px', margin: '0 auto' }}>
            <TicketIcon size={48} color="var(--text-muted)" style={{ margin: '0 auto 16px' }} />
            <h3>Ticket Not Found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              We couldn't locate a booking with reference "{id}".
            </p>
            <Link to="/my-bookings" className="btn btn-primary btn-sm">
              <span>View All Bookings</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
