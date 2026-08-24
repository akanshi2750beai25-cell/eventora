import './Booking.css';
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, Ticket, ShieldCheck, 
  CheckCircle2, ArrowRight, ArrowLeft, Tag, User, Mail, Phone, Hash 
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { formatDate, formatPrice } from '../../utils/helpers';
import DigitalTicket from '../../components/DigitalTicket/DigitalTicket';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, createBooking, showToast } = useEvents();
  const { user } = useAuth();

  const event = events.find((e) => e.id === id) || events[0];

  // Booking Flow Steps: 1: Details & Tier -> 2: Confirmation & Digital Ticket
  const [step, setStep] = useState(1);

  // Ticket Tier & Quantity
  const tiers = event.ticketTiers || [
    { id: 'tier-std', name: 'Student Pass', price: event.price, perks: 'General entry with college ID' },
    { id: 'tier-gen', name: 'General Pass', price: event.price + 100, perks: 'Entry + event badge kit' },
    { id: 'tier-vip', name: 'VIP Access', price: event.price + 250, perks: 'Front row + merchandise pass' }
  ];
  const [selectedTier, setSelectedTier] = useState(tiers[0]);
  const [quantity, setQuantity] = useState(1);

  // Student Attendee Form Inputs (Controlled Components)
  const [attendeeName, setAttendeeName] = useState(user?.name || '');
  const [attendeeEmail, setAttendeeEmail] = useState(user?.email || '');
  const [attendeePhone, setAttendeePhone] = useState('9876543210');
  const [studentId, setStudentId] = useState('BE-CSE-2026');

  // Promo Code Support
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Confirmed Booking Object
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Calculations
  const baseTotal = (selectedTier.price || 0) * quantity;
  const platformFee = baseTotal > 0 ? 15 : 0;
  const totalAmount = Math.max(0, baseTotal + platformFee - discountAmount);

  // Promo Coupon Handler
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'STUDENT50') {
      const disc = Math.min(50, baseTotal);
      setDiscountAmount(disc);
      setPromoApplied(true);
      showToast('Student Coupon applied: ₹50 OFF! 🎉', 'success');
    } else if (code === 'CAMPUS2026' || code === 'EVENTORA100') {
      const disc = Math.min(100, baseTotal);
      setDiscountAmount(disc);
      setPromoApplied(true);
      showToast('Campus Coupon applied: ₹100 OFF! 🚀', 'success');
    } else {
      showToast('Invalid coupon. Try "STUDENT50" or "CAMPUS2026"', 'error');
    }
  };

  // Submit Booking Form Handler
  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!attendeeName.trim() || !attendeeEmail.trim()) {
      showToast('Please fill all required attendee fields', 'error');
      return;
    }

    const bookingPayload = {
      eventId: event.id,
      eventTitle: event.title,
      category: event.category,
      date: event.date,
      time: event.time,
      venue: event.venue,
      city: event.city,
      attendeeName: attendeeName.trim(),
      attendeeEmail: attendeeEmail.trim(),
      attendeePhone: attendeePhone.trim(),
      studentId: studentId.trim(),
      ticketTier: selectedTier.name,
      quantity: Number(quantity),
      unitPrice: selectedTier.price,
      totalAmount,
      bookingRef: `EVT1-${Math.floor(10000 + Math.random() * 90000)}`
    };

    const newBooking = createBooking(bookingPayload);
    setConfirmedBooking(newBooking);
    setStep(2);
    showToast('Booking successful! Digital ticket generated 🎉', 'success');
  };

  return (
    <div className="section-py" style={{ minHeight: '85vh' }}>
      <div className="container">
        {step === 1 && (
          <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="section-eyebrow">
                <Ticket size={16} /> Evaluation 1 Ticket Booking
              </span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 800 }}>
                Book Your Pass for {event.title}
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                {formatDate(event.date)} • {event.time} • {event.venue}, {event.city}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '32px' }}>
              {/* Left Column: Tiers & Attendee Form */}
              <form onSubmit={handleBookingSubmit}>
                {/* 1. Ticket Tier Picker */}
                <div className="card" style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '14px' }}>1. Select Ticket Tier</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {tiers.map((tier) => {
                      const isSelected = selectedTier.id === tier.id;
                      return (
                        <div
                          key={tier.id}
                          onClick={() => setSelectedTier(tier)}
                          style={{
                            padding: '14px 18px',
                            borderRadius: 'var(--radius-md)',
                            border: `2px solid ${isSelected ? 'var(--primary-teal)' : 'var(--border-color)'}`,
                            background: isSelected ? 'var(--badge-bg)' : 'var(--bg-surface)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all var(--transition-fast)'
                          }}
                        >
                          <div>
                            <strong style={{ fontSize: '0.98rem', color: isSelected ? 'var(--primary-teal-light)' : 'var(--text-primary)', display: 'block' }}>
                              {tier.name}
                            </strong>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{tier.perks}</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-teal-light)' }}>
                              {formatPrice(tier.price)}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>/ pass</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Quantity Selector */}
                <div className="card" style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '14px' }}>2. Quantity</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-input)' }}>
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        style={{ padding: '8px 16px', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ padding: '0 14px', fontWeight: 800, fontSize: '1rem' }}>{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        style={{ padding: '8px 16px', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Passes to reserve for this booking
                    </span>
                  </div>
                </div>

                {/* 3. Student Attendee Information */}
                <div className="card" style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '14px' }}>3. Student Attendee Details</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        required
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                      />
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Student College Email *</label>
                      <input
                        type="email"
                        className="form-input"
                        required
                        value={attendeeEmail}
                        onChange={(e) => setAttendeeEmail(e.target.value)}
                        placeholder="student@college.edu"
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          className="form-input"
                          value={attendeePhone}
                          onChange={(e) => setAttendeePhone(e.target.value)}
                          placeholder="9876543210"
                        />
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">College ID / Roll No</label>
                        <input
                          type="text"
                          className="form-input"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          placeholder="BE-CSE-2026"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-full btn-lg">
                  <span>Confirm Demo Booking & Get Ticket</span>
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* Right Column: Order Summary & Coupon */}
              <div>
                {/* Promo Code Card */}
                <div className="card" style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={16} color="var(--accent-gold)" />
                    <span>Student Discount Coupon</span>
                  </h4>
                  <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter STUDENT50"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      style={{ textTransform: 'uppercase' }}
                    />
                    <button type="submit" className="btn btn-outline btn-sm">
                      Apply
                    </button>
                  </form>
                  <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
                    Try: <code style={{ color: 'var(--primary-teal-light)' }}>STUDENT50</code> or <code style={{ color: 'var(--primary-teal-light)' }}>CAMPUS2026</code>
                  </small>
                </div>

                {/* Order Total Review Card */}
                <div className="card">
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Booking Summary</h3>
                  
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                    <img src={event.image} alt={event.title} style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ fontSize: '0.92rem', display: 'block', lineHeight: 1.3 }}>{event.title}</strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{event.category}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{selectedTier.name} ({quantity}x)</span>
                      <span>{formatPrice(baseTotal)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Campus Service Fee</span>
                      <span>{formatPrice(platformFee)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 700 }}>
                        <span>Student Coupon</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800 }}>
                      <span>Total</span>
                      <span style={{ color: 'var(--primary-teal-light)' }}>{formatPrice(totalAmount)}</span>
                    </div>
                  </div>

                  <div style={{ padding: '8px 12px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    ℹ️ Academic project demo booking. No real charges.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Confirmation & Digital Boarding Pass Ticket */}
        {step === 2 && confirmedBooking && (
          <div className="animate-scale-in" style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <CheckCircle2 size={32} />
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '6px' }}>
              Pass Booked Successfully! 🎉
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>
              Your digital boarding pass has been issued. Show or print this pass at the college campus entrance.
            </p>

            {/* Digital Ticket Component */}
            <DigitalTicket booking={confirmedBooking} />

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '32px', flexWrap: 'wrap' }}>
              <Link to="/my-bookings" className="btn btn-primary">
                <Ticket size={18} />
                <span>View My Bookings</span>
              </Link>
              <Link to="/explore" className="btn btn-outline">
                <span>Explore More Events</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
