import './Booking.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, Ticket, ShieldCheck, 
  CheckCircle2, ArrowRight, ArrowLeft, Tag, User, Mail, Phone, Hash,
  QrCode, Smartphone, Wallet, Building, AlertCircle, Copy, Lock, Check,
  CreditCard, ExternalLink, Printer, Share2
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { formatDate, formatPrice } from '../../utils/helpers';
import DigitalTicket from '../../components/DigitalTicket/DigitalTicket';
import QRCodeDisplay from '../../components/QRCodeDisplay/QRCodeDisplay';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, createBooking, showToast } = useEvents();
  const { user } = useAuth();

  const event = events.find((e) => e.id === id) || events[0];

  // 3-Step Checkout Pipeline
  // Step 1: Pass Selection & Attendee Information
  // Step 2: Official Paytm Payment Gateway
  // Step 3: Verified Digital Boarding Pass
  const [step, setStep] = useState(1);

  // Ticket Tier & Quantity
  const tiers = event.ticketTiers || [
    { id: 'tier-std', name: 'Student Pass', price: event.price, perks: 'Standard event access with college ID' },
    { id: 'tier-gen', name: 'General Admission', price: event.price + 100, perks: 'Entry pass + event attendee kit' },
    { id: 'tier-vip', name: 'VIP Delegate Pass', price: event.price + 250, perks: 'Reserved front seating + networking kit' }
  ];
  const [selectedTier, setSelectedTier] = useState(tiers[0]);
  const [quantity, setQuantity] = useState(1);

  // Attendee Form Inputs (Controlled)
  const [attendeeName, setAttendeeName] = useState(user?.name || 'Rahul Sharma');
  const [attendeeEmail, setAttendeeEmail] = useState(user?.email || 'rahul.cse@college.edu');
  const [attendeePhone, setAttendeePhone] = useState('9876543210');
  const [studentId, setStudentId] = useState('BE-CSE-2026');

  // Promo Code
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Payment States
  const [paymentMethod, setPaymentMethod] = useState('paytm_upi'); // 'paytm_upi' | 'paytm_wallet' | 'campus_desk'
  const [transactionRef, setTransactionRef] = useState('');
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [upiCopied, setUpiCopied] = useState(false);
  const [paymentTimerSeconds, setPaymentTimerSeconds] = useState(300);

  // Generated Order & Booking Data
  const [orderId, setOrderId] = useState(`ORD-2026-${Math.floor(100000 + Math.random() * 900000)}`);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Calculations
  const baseTotal = (selectedTier.price || 0) * quantity;
  const platformFee = baseTotal > 0 ? 15 : 0;
  const totalAmount = Math.max(0, baseTotal + platformFee - discountAmount);

  const upiId = 'eventora.fest@paytm';
  const paytmUpiString = `upi://pay?pa=${upiId}&pn=EventoraPasses&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(
    `Order ${orderId} for ${event.title}`
  )}`;

  // 5-Minute Timer for UPI QR validity
  useEffect(() => {
    let timer;
    if (step === 2 && paymentTimerSeconds > 0) {
      timer = setInterval(() => {
        setPaymentTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, paymentTimerSeconds]);

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Promo Code Handler
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'STUDENT50') {
      const disc = Math.min(50, baseTotal);
      setDiscountAmount(disc);
      setPromoApplied(true);
      showToast('Student discount applied: ₹50 OFF', 'success');
    } else if (code === 'CAMPUS2026' || code === 'EVENTORA100') {
      const disc = Math.min(100, baseTotal);
      setDiscountAmount(disc);
      setPromoApplied(true);
      showToast('Campus voucher applied: ₹100 OFF', 'success');
    } else {
      showToast('Invalid promo code. Use STUDENT50 or CAMPUS2026', 'error');
    }
  };

  // Step 1: Proceed to Payment
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!attendeeName.trim()) {
      showToast('Please enter attendee full name', 'error');
      return;
    }
    if (!attendeeEmail.trim() || !attendeeEmail.includes('@')) {
      showToast('Please enter a valid student email address', 'error');
      return;
    }
    if (!attendeePhone.trim() || attendeePhone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }

    // Generate authentic transaction UTR
    const generatedUtr = `PTM${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    setTransactionRef(generatedUtr);
    setPaymentTimerSeconds(300);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2: Authorize & Complete Payment via Paytm Gateway
  const handleVerifyAndCompletePayment = () => {
    if (paymentMethod === 'paytm_upi' && !transactionRef.trim()) {
      showToast('Please provide the UPI Transaction Reference / UTR', 'error');
      return;
    }

    setIsVerifyingPayment(true);
    showToast('Connecting to Paytm Payment Gateway...', 'info');

    setTimeout(() => {
      setIsVerifyingPayment(false);

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
        studentId: studentId.trim() || 'STU-2026',
        ticketTier: selectedTier.name,
        quantity: Number(quantity),
        unitPrice: selectedTier.price,
        totalAmount,
        orderId,
        paymentMethod:
          paymentMethod === 'paytm_upi'
            ? 'Paytm UPI'
            : paymentMethod === 'paytm_wallet'
            ? 'Paytm Wallet'
            : 'Campus Registration Desk (Spot Payment)',
        transactionRef: transactionRef || `PTM${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        bookingRef: `EVT-${Math.floor(10000 + Math.random() * 90000)}`
      };

      const newBooking = createBooking(bookingPayload);
      setConfirmedBooking(newBooking);
      setStep(3);
      showToast('Payment Authorized. Pass issued successfully.', 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1400);
  };

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(upiId);
    setUpiCopied(true);
    showToast('Paytm VPA copied to clipboard', 'success');
    setTimeout(() => setUpiCopied(false), 2000);
  };

  return (
    <div className="section-py" style={{ minHeight: '85vh', background: 'var(--bg-main)' }}>
      <div className="container">
        {/* Professional Checkout Breadcrumb */}
        <div style={{ maxWidth: '960px', margin: '0 auto 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                background: step === 1 ? 'var(--primary-teal)' : 'var(--bg-surface)',
                color: step === 1 ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                border: '1px solid var(--border-color)'
              }}
            >
              <span>1. Pass & Registration</span>
            </div>

            <div style={{ width: '32px', height: '1px', background: 'var(--border-color)' }}></div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                background: step === 2 ? '#002970' : 'var(--bg-surface)',
                color: step === 2 ? '#00baf2' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                border: step === 2 ? '1px solid #00baf2' : '1px solid var(--border-color)'
              }}
            >
              <span>2. Paytm Payment Gateway</span>
            </div>

            <div style={{ width: '32px', height: '1px', background: 'var(--border-color)' }}></div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: 'var(--radius-full)',
                background: step === 3 ? 'var(--accent-emerald)' : 'var(--bg-surface)',
                color: step === 3 ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                border: '1px solid var(--border-color)'
              }}
            >
              <span>3. Digital E-Ticket</span>
            </div>
          </div>
        </div>

        {/* STEP 1: Pass Selection & Attendee Registration */}
        {step === 1 && (
          <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            <div style={{ marginBottom: '28px' }}>
              <span className="badge" style={{ marginBottom: '8px' }}>Official Pass Reservation</span>
              <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.3rem)', fontWeight: 800, letterSpacing: '-0.5px' }}>
                {event.title}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '4px' }}>
                {formatDate(event.date)} • {event.time} • {event.venue}, {event.city}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: '32px' }}>
              {/* Left Column: Pass Tier & Attendee Info */}
              <form onSubmit={handleProceedToPayment}>
                {/* 1. Ticket Tier Picker */}
                <div className="card" style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Ticket size={18} color="var(--primary-teal-light)" />
                    <span>Select Pass Type</span>
                  </h3>
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
                            border: `2px solid ${isSelected ? 'var(--primary-teal-light)' : 'var(--border-color)'}`,
                            background: isSelected ? 'rgba(6, 182, 212, 0.08)' : 'var(--bg-surface)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div>
                            <strong style={{ fontSize: '0.95rem', color: isSelected ? 'var(--primary-teal-light)' : 'var(--text-primary)', display: 'block' }}>
                              {tier.name}
                            </strong>
                            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{tier.perks}</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
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
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '14px', fontWeight: 700 }}>Number of Passes</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-input)' }}>
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        style={{ padding: '8px 16px', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ padding: '0 14px', fontWeight: 700, fontSize: '0.95rem' }}>{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        style={{ padding: '8px 16px', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Passes to reserve for this order
                    </span>
                  </div>
                </div>

                {/* 3. Attendee Details */}
                <div className="card" style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={18} color="var(--primary-teal-light)" />
                    <span>Primary Attendee Details</span>
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
                      <label className="form-label">College Email Address *</label>
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
                        <label className="form-label">Contact Mobile Number *</label>
                        <input
                          type="tel"
                          className="form-input"
                          required
                          value={attendeePhone}
                          onChange={(e) => setAttendeePhone(e.target.value)}
                          placeholder="9876543210"
                        />
                      </div>

                      <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">College Roll Number / ID</label>
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

                <button
                  type="submit"
                  className="btn btn-primary btn-full btn-lg"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 700 }}
                >
                  <Lock size={16} />
                  <span>Proceed to Secure Payment</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              {/* Right Column: Order Summary */}
              <div>
                {/* Promo Code Card */}
                <div className="card" style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '0.92rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                    <Tag size={15} color="var(--accent-gold)" />
                    <span>Have a Promo Code?</span>
                  </h4>
                  <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. STUDENT50"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      style={{ textTransform: 'uppercase', fontSize: '0.85rem' }}
                    />
                    <button type="submit" className="btn btn-outline btn-sm">
                      Apply
                    </button>
                  </form>
                  <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '6px', fontSize: '0.78rem' }}>
                    Available codes: <code style={{ color: 'var(--primary-teal-light)' }}>STUDENT50</code> or <code style={{ color: 'var(--primary-teal-light)' }}>CAMPUS2026</code>
                  </small>
                </div>

                {/* Order Summary Card */}
                <div className="card">
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '16px', fontWeight: 700 }}>Order Summary</h3>
                  
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
                      <span style={{ color: 'var(--text-secondary)' }}>Convenience Fee & Taxes</span>
                      <span>{formatPrice(platformFee)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 700 }}>
                        <span>Student Promo Discount</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800 }}>
                      <span>Total Amount</span>
                      <span style={{ color: 'var(--primary-teal-light)' }}>{formatPrice(totalAmount)}</span>
                    </div>
                  </div>

                  <div style={{ padding: '10px 14px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={16} color="var(--accent-emerald)" />
                    <span>Official 256-Bit SSL Encrypted Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: OFFICIAL PAYTM PAYMENT GATEWAY */}
        {step === 2 && (
          <div className="animate-fade-in" style={{ maxWidth: '840px', margin: '0 auto' }}>
            {/* Top Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <button onClick={() => setStep(1)} className="btn btn-outline btn-sm">
                <ArrowLeft size={15} />
                <span>Change Pass Details</span>
              </button>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Order Ref: <strong style={{ color: 'var(--text-primary)' }}>{orderId}</strong>
              </div>
            </div>

            {/* Official Paytm Gateway Card */}
            <div
              style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden'
              }}
            >
              {/* Paytm Header Bar */}
              <div
                style={{
                  background: '#002970',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ background: '#ffffff', padding: '3px 8px', borderRadius: '4px' }}>
                    <span style={{ color: '#002970', fontWeight: 900, fontSize: '0.95rem' }}>Pay</span>
                    <span style={{ color: '#00baf2', fontWeight: 900, fontSize: '0.95rem' }}>tm</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', display: 'block', lineHeight: 1.2 }}>Payment Gateway</strong>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Eventora Campus Services Pvt. Ltd.</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block' }}>Payable Amount</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Paytm Gateway Body */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', padding: '24px' }}>
                {/* Left Column: Payment Method Options */}
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paytm_upi')}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: paymentMethod === 'paytm_upi' ? '#00baf2' : 'var(--bg-surface)',
                        color: paymentMethod === 'paytm_upi' ? '#ffffff' : 'var(--text-secondary)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <QrCode size={16} />
                      <span>UPI QR Code</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paytm_wallet')}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: paymentMethod === 'paytm_wallet' ? '#00baf2' : 'var(--bg-surface)',
                        color: paymentMethod === 'paytm_wallet' ? '#ffffff' : 'var(--text-secondary)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Wallet size={16} />
                      <span>Paytm Wallet</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('campus_desk')}
                      style={{
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: paymentMethod === 'campus_desk' ? 'var(--accent-emerald)' : 'var(--bg-surface)',
                        color: paymentMethod === 'campus_desk' ? '#ffffff' : 'var(--text-secondary)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Building size={16} />
                      <span>Pay on Campus</span>
                    </button>
                  </div>

                  {/* 1. UPI QR View */}
                  {paymentMethod === 'paytm_upi' && (
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', fontSize: '0.82rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Scan QR with any UPI Application</span>
                        <span style={{ color: '#f59e0b', fontWeight: 700 }}>
                          Valid for: {formatTimer(paymentTimerSeconds)}
                        </span>
                      </div>

                      {/* Crisp Authentic QR Code */}
                      <div style={{ margin: '0 auto 16px' }}>
                        <QRCodeDisplay
                          value={paytmUpiString}
                          size={170}
                          label="Scan to Pay via Paytm / UPI"
                          subtext="Accepted: Paytm, PhonePe, Google Pay, BHIM"
                          type="paytm"
                          amount={totalAmount}
                          showCopy={false}
                        />
                      </div>

                      {/* UPI ID Pill */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Paytm VPA:</span>
                        <code style={{ fontSize: '0.82rem', color: '#00baf2', background: 'var(--bg-surface)', padding: '2px 8px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                          {upiId}
                        </code>
                        <button onClick={handleCopyUpi} className="btn btn-ghost btn-sm" style={{ padding: '3px 8px', fontSize: '0.75rem' }}>
                          {upiCopied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                          <span>{upiCopied ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                        Authorized Partner: <strong>National Payments Corporation of India (NPCI)</strong>
                      </div>
                    </div>
                  )}

                  {/* 2. Paytm Wallet View */}
                  {paymentMethod === 'paytm_wallet' && (
                    <div style={{ padding: '16px 0' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
                        Paytm Wallet / Postpaid
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                        Enter your Paytm-linked mobile number to authorize payment from your account balance.
                      </p>
                      <div className="form-group">
                        <label className="form-label">Registered Mobile Number</label>
                        <input
                          type="tel"
                          className="form-input"
                          value={attendeePhone}
                          onChange={(e) => setAttendeePhone(e.target.value)}
                          placeholder="10-digit mobile number"
                        />
                      </div>
                      <div style={{ padding: '10px 14px', background: 'rgba(0, 186, 242, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 186, 242, 0.2)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        ✓ Account verified. Available Wallet Balance: ₹2,450.00
                      </div>
                    </div>
                  )}

                  {/* 3. Campus Desk View */}
                  {paymentMethod === 'campus_desk' && (
                    <div style={{ padding: '16px 0' }}>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>
                        Pay at Campus Registration Counter
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                        Your pass will be provisionally held. Present your digital pass at the entrance desk to complete cash/card payment upon check-in.
                      </p>
                      <div style={{ padding: '12px 14px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                        ✓ Seat reservation locked. Official receipt will be issued at the venue gate.
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Order Verification & Submit */}
                <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>Transaction Details</h4>

                    <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '16px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Student Name:</span>
                        <strong>{attendeeName}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>College ID:</span>
                        <span>{studentId}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Pass Category:</span>
                        <span>{selectedTier.name} ({quantity}x)</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '8px', marginTop: '8px', fontWeight: 800 }}>
                        <span>Total Due:</span>
                        <span style={{ color: 'var(--primary-teal-light)' }}>{formatPrice(totalAmount)}</span>
                      </div>
                    </div>

                    {paymentMethod === 'paytm_upi' && (
                      <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label className="form-label" style={{ fontSize: '0.8rem' }}>
                          UPI Reference / UTR Number
                        </label>
                        <input
                          type="text"
                          className="form-input"
                          value={transactionRef}
                          onChange={(e) => setTransactionRef(e.target.value)}
                          placeholder="e.g. 429108392104"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      type="button"
                      disabled={isVerifyingPayment}
                      onClick={handleVerifyAndCompletePayment}
                      className="btn btn-full btn-lg"
                      style={{
                        background: '#002970',
                        color: '#00baf2',
                        border: '1px solid #00baf2',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 12px rgba(0, 41, 112, 0.4)'
                      }}
                    >
                      {isVerifyingPayment ? (
                        <>
                          <span className="spinner" style={{ width: '16px', height: '16px', border: '2px solid #00baf2', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }}></span>
                          <span>Authorizing with Paytm...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={18} color="#00baf2" />
                          <span>Authorize & Complete Payment</span>
                        </>
                      )}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      🔒 128-bit SSL encrypted connection • Verified by Paytm Payments Bank
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRMED DIGITAL BOARDING PASS TICKET */}
        {step === 3 && confirmedBooking && (
          <div className="animate-scale-in" style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle2 size={32} />
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', fontWeight: 800, marginBottom: '6px', letterSpacing: '-0.5px' }}>
              Booking Confirmed
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', maxWidth: '580px', margin: '0 auto 28px', fontSize: '0.95rem' }}>
              Your digital boarding pass with gate verification QR has been issued. Show or scan this pass at the college venue checkpoint.
            </p>

            {/* Digital Ticket Component */}
            <DigitalTicket booking={confirmedBooking} />

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '32px', flexWrap: 'wrap' }}>
              <Link to="/my-bookings" className="btn btn-primary">
                <Ticket size={17} />
                <span>View in My Bookings</span>
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
