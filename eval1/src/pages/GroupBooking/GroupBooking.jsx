import './GroupBooking.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Users, Ticket, Calendar, Clock, MapPin, ShieldCheck, 
  CheckCircle2, ArrowRight, ArrowLeft, Tag, User, Mail, Phone,
  QrCode, Copy, Check, Printer, FileText, AlertCircle, Share2, Lock
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { formatDate, formatPrice, calculateEqualSplit, printPdfReceipt } from '../../utils/helpers';
import QRCodeDisplay from '../../components/QRCodeDisplay/QRCodeDisplay';

export default function GroupBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, createBooking, showToast } = useEvents();
  const { user } = useAuth();

  const event = events.find((e) => e.id === id) || events[0];

  // Group booking flow steps:
  // 1: Select group size & tier
  // 2: Enter attendee details & bill split
  // 3: Paytm payment authorization
  // 4: Consolidated group receipt & individual boarding passes
  const [step, setStep] = useState(1);

  // Group Details
  const [groupSize, setGroupSize] = useState(4); // Default 4 friends
  const [groupName, setGroupName] = useState('Campus Friends Squad');

  // Tier selection
  const tiers = event.ticketTiers || [
    { id: 'tier-std', name: 'Student Pass', price: event.price, perks: 'Standard event access with college ID' },
    { id: 'tier-gen', name: 'General Admission', price: event.price + 100, perks: 'Entry pass + event attendee kit' },
    { id: 'tier-vip', name: 'VIP Access Pass', price: event.price + 250, perks: 'Reserved front seating + networking kit' }
  ];
  const [selectedTier, setSelectedTier] = useState(tiers[0]);

  // Primary Booker & Friend Attendees (Array of 4)
  const [attendees, setAttendees] = useState([
    { name: user?.name || 'Akanshi Sharma', email: user?.email || 'akanshi.cse@eventora.edu', studentId: '2026-CSE-042', isPrimary: true },
    { name: 'Mridul Verma', email: 'mridul.cse@eventora.edu', studentId: '2026-CSE-058', isPrimary: false },
    { name: 'Priyanshi Saxena', email: 'priyanshi.cse@eventora.edu', studentId: '2026-CSE-084', isPrimary: false },
    { name: 'Kuvum Rajput', email: 'kuvum.organizer@eventora.edu', studentId: '2026-CSE-019', isPrimary: false }
  ]);

  // Split mode: 'equal' or 'custom'
  const [splitMode, setSplitMode] = useState('equal');
  const [customShares, setCustomShares] = useState({});

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Payment states
  const [transactionRef, setTransactionRef] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Calculations
  const baseTotal = (selectedTier.price || 0) * groupSize;
  const platformFee = baseTotal > 0 ? 25 : 0; // Combined platform fee for group
  const totalAmount = Math.max(0, baseTotal + platformFee - discountAmount);

  // Dynamic attendees array updater when group size changes
  useEffect(() => {
    if (attendees.length !== groupSize) {
      const newAttendees = [...attendees];
      if (groupSize > attendees.length) {
        for (let i = attendees.length; i < groupSize; i++) {
          newAttendees.push({
            name: `Friend ${i + 1}`,
            email: `friend${i + 1}@college.edu`,
            studentId: `2026-CSE-0${i + 10}`,
            isPrimary: false
          });
        }
      } else {
        newAttendees.splice(groupSize);
      }
      setAttendees(newAttendees);
    }
  }, [groupSize]);

  // Compute calculated split shares
  const splitShares = calculateEqualSplit(totalAmount, attendees);

  // Total allocated in custom split
  const customTotal = attendees.reduce((sum, _, idx) => {
    return sum + Number(customShares[idx] || splitShares[idx]?.share || 0);
  }, 0);

  // Promo code handler
  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'STUDENT50' || code === 'GROUPSQUAD') {
      const disc = Math.min(100, baseTotal);
      setDiscountAmount(disc);
      showToast('Group discount applied: ₹100 OFF 🎉', 'success');
    } else {
      showToast('Invalid code. Try "GROUPSQUAD" or "STUDENT50"', 'error');
    }
  };

  const handleUpdateAttendee = (index, field, value) => {
    const updated = [...attendees];
    updated[index][field] = value;
    setAttendees(updated);
  };

  const handleProceedToPayment = () => {
    // Validate that all attendee names are filled
    const missing = attendees.find((a) => !a.name.trim());
    if (missing) {
      showToast('Please enter the name for all group members', 'error');
      return;
    }

    if (splitMode === 'custom' && customTotal !== totalAmount) {
      showToast(`Custom split total (₹${customTotal}) must equal total bill (₹${totalAmount})`, 'error');
      return;
    }

    setTransactionRef(`PTM${Math.floor(100000000000 + Math.random() * 900000000000)}`);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompletePayment = () => {
    setIsVerifying(true);
    showToast('Authorizing group pass payment with Paytm...', 'info');

    setTimeout(() => {
      setIsVerifying(false);

      const finalAttendees = attendees.map((att, idx) => ({
        ...att,
        share: splitMode === 'custom' ? Number(customShares[idx] || splitShares[idx]?.share) : splitShares[idx]?.share,
        individualTicketId: `EVT-GRP-${Math.floor(1000 + Math.random() * 9000)}-${idx + 1}`
      }));

      const bookingPayload = {
        eventId: event.id,
        eventTitle: event.title,
        category: event.category,
        date: event.date,
        time: event.time,
        venue: event.venue,
        city: event.city,
        attendeeName: attendees[0].name,
        attendeeEmail: attendees[0].email,
        studentId: attendees[0].studentId,
        ticketTier: selectedTier.name,
        quantity: groupSize,
        unitPrice: selectedTier.price,
        totalAmount,
        isGroupBooking: true,
        groupName,
        groupAttendees: finalAttendees,
        paymentMethod: 'Paytm UPI (Consolidated)',
        transactionRef,
        bookingRef: `GRP-${Math.floor(10000 + Math.random() * 90000)}`
      };

      const newBooking = createBooking(bookingPayload);
      setConfirmedBooking(newBooking);
      setStep(4);
      showToast('Group Booking Confirmed! Consolidated pass issued.', 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  return (
    <div className="section-py group-booking-page" style={{ minHeight: '85vh', background: 'var(--bg-main)' }}>
      <div className="container">
        {/* Step Indicator */}
        <div style={{ maxWidth: '850px', margin: '0 auto 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div className={`step-badge ${step === 1 ? 'active' : ''}`}>1. Group Size</div>
            <div className="step-line"></div>
            <div className={`step-badge ${step === 2 ? 'active' : ''}`}>2. Friends & Split</div>
            <div className="step-line"></div>
            <div className={`step-badge ${step === 3 ? 'active' : ''}`}>3. Paytm Payment</div>
            <div className="step-line"></div>
            <div className={`step-badge ${step === 4 ? 'active' : ''}`}>4. Group Receipt</div>
          </div>
        </div>

        {/* STEP 1: Select Group Size & Tier */}
        {step === 1 && (
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <span className="badge badge-purple" style={{ marginBottom: '8px' }}>
                <Users size={14} /> Signature Feature: Group Booking & Split
              </span>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 800 }}>
                Book Passes with Friends
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                {event.title} • {formatDate(event.date)} at {event.venue}
              </p>
            </div>

            <div className="card" style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>1. How many friends are attending?</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[2, 3, 4, 5, 6, 8].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGroupSize(num)}
                    className={`btn ${groupSize === num ? 'btn-primary' : 'btn-outline'}`}
                    style={{ minWidth: '80px', fontWeight: 700 }}
                  >
                    {num} Friends
                  </button>
                ))}
              </div>
              <small style={{ color: 'var(--text-muted)', display: 'block', marginTop: '10px' }}>
                Seats available: {event.availableSeats} passes. Automatic seat validation ensures group seats are held together.
              </small>
            </div>

            <div className="card" style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>2. Optional Group Name</h3>
              <input
                type="text"
                className="form-input"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g. College Friends Squad / Hostel 4 Boys"
              />
            </div>

            <div className="card" style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>3. Select Ticket Tier</h3>
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
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '0.95rem', color: isSelected ? 'var(--primary-teal-light)' : 'var(--text-primary)', display: 'block' }}>
                          {tier.name}
                        </strong>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{tier.perks}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.15rem', fontWeight: 800 }}>{formatPrice(tier.price)}</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>/ person</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to={`/event/${event.id}`} className="btn btn-outline">
                <ArrowLeft size={16} />
                <span>Back to Event</span>
              </Link>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn btn-primary btn-lg"
              >
                <span>Continue to Friends & Bill Split</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Enter Friend Names & Bill Split */}
        {step === 2 && (
          <div style={{ maxWidth: '920px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <button onClick={() => setStep(1)} className="btn btn-outline btn-sm">
                <ArrowLeft size={15} />
                <span>Back to Group Size</span>
              </button>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Group: <strong>{groupName}</strong> ({groupSize} Passes)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '30px' }}>
              {/* Left Column: Attendee Inputs */}
              <div>
                <div className="card" style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={18} color="var(--primary-teal-light)" />
                    <span>Enter Names of All {groupSize} Friends</span>
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {attendees.map((att, idx) => (
                      <div
                        key={idx}
                        style={{
                          padding: '14px',
                          background: 'var(--bg-surface)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-color)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.82rem' }}>
                          <strong style={{ color: att.isPrimary ? 'var(--primary-teal-light)' : 'var(--text-primary)' }}>
                            {idx === 0 ? 'Primary Booker (You)' : `Friend #${idx + 1}`}
                          </strong>
                          <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>
                            Share: ₹{splitShares[idx]?.share}
                          </span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px' }}>
                          <input
                            type="text"
                            className="form-input"
                            required
                            placeholder="Full Name"
                            value={att.name}
                            onChange={(e) => handleUpdateAttendee(idx, 'name', e.target.value)}
                          />
                          <input
                            type="text"
                            className="form-input"
                            placeholder="College Roll ID"
                            value={att.studentId}
                            onChange={(e) => handleUpdateAttendee(idx, 'studentId', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bill Split Mode Switcher */}
                <div className="card">
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '12px' }}>How would you like to split the bill?</h3>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <button
                      type="button"
                      onClick={() => setSplitMode('equal')}
                      className={`btn btn-sm ${splitMode === 'equal' ? 'btn-primary' : 'btn-outline'}`}
                    >
                      Equal Split (₹{Math.floor(totalAmount / groupSize)} each)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSplitMode('custom')}
                      className={`btn btn-sm ${splitMode === 'custom' ? 'btn-primary' : 'btn-outline'}`}
                    >
                      Custom Amounts
                    </button>
                  </div>

                  {splitMode === 'custom' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {attendees.map((att, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                          <span>{att.name || `Friend #${idx + 1}`}:</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>₹</span>
                            <input
                              type="number"
                              className="form-input"
                              style={{ width: '90px', padding: '4px 8px' }}
                              value={customShares[idx] ?? splitShares[idx]?.share}
                              onChange={(e) =>
                                setCustomShares({ ...customShares, [idx]: Number(e.target.value) })
                              }
                            />
                          </div>
                        </div>
                      ))}
                      <div style={{ fontSize: '0.82rem', marginTop: '8px', color: customTotal === totalAmount ? '#10b981' : '#f43f5e', fontWeight: 700 }}>
                        Total Allocated: ₹{customTotal} / Required Total: ₹{totalAmount}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Bill Breakdown */}
              <div>
                {/* Coupon Code */}
                <div className="card" style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '0.92rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Tag size={15} color="var(--accent-gold)" />
                    <span>Group Promo Voucher</span>
                  </h4>
                  <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter GROUPSQUAD"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      style={{ textTransform: 'uppercase', fontSize: '0.85rem' }}
                    />
                    <button type="submit" className="btn btn-outline btn-sm">
                      Apply
                    </button>
                  </form>
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '6px', display: 'block' }}>
                    Try: <code style={{ color: 'var(--primary-teal-light)' }}>GROUPSQUAD</code> for ₹100 OFF
                  </small>
                </div>

                {/* Total Bill Card */}
                <div className="card">
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Consolidated Bill</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{selectedTier.name} ({groupSize} passes)</span>
                      <span>{formatPrice(baseTotal)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Group Booking Fee</span>
                      <span>{formatPrice(platformFee)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 700 }}>
                        <span>Group Coupon Discount</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800 }}>
                      <span>Total Bill</span>
                      <span style={{ color: 'var(--primary-teal-light)' }}>{formatPrice(totalAmount)}</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', textAlign: 'right' }}>
                      ≈ {formatPrice(Math.round(totalAmount / groupSize))} per friend
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleProceedToPayment}
                    className="btn btn-primary btn-full btn-lg"
                    style={{ fontWeight: 700 }}
                  >
                    <span>Proceed to Paytm Checkout</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Paytm Payment Gateway */}
        {step === 3 && (
          <div className="animate-fade-in" style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <button onClick={() => setStep(2)} className="btn btn-outline btn-sm">
                <ArrowLeft size={15} />
                <span>Change Attendees / Split</span>
              </button>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Consolidated Group Pass: <strong>{groupName}</strong>
              </span>
            </div>

            <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
              {/* Paytm Header */}
              <div style={{ background: '#002970', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#ffffff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ background: '#ffffff', padding: '3px 8px', borderRadius: '4px' }}>
                    <span style={{ color: '#002970', fontWeight: 900 }}>Pay</span>
                    <span style={{ color: '#00baf2', fontWeight: 900 }}>tm</span>
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', display: 'block' }}>Payment Gateway</strong>
                    <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Eventora Campus Pass Services</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block' }}>Total Group Bill</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Paytm Body */}
              <div style={{ padding: '28px', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '28px' }}>
                {/* QR Section */}
                <div style={{ textAlign: 'center' }}>
                  <QRCodeDisplay
                    value={`upi://pay?pa=eventora.fest@paytm&pn=EventoraPasses&am=${totalAmount}&cu=INR`}
                    size={170}
                    label="Scan & Pay via Paytm / Any UPI"
                    subtext="Consolidated pass for 4 friends"
                    type="paytm"
                    amount={totalAmount}
                    showCopy={false}
                  />
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '12px' }}>
                    Paytm VPA: <code style={{ color: '#00baf2' }}>eventora.fest@paytm</code>
                  </div>
                </div>

                {/* Details & Authorize */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '1px solid var(--border-color)', paddingLeft: '24px' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>Group Breakdown</h4>
                    <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: '8px', fontSize: '0.82rem', marginBottom: '16px' }}>
                      {attendees.map((a, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>{a.name}:</span>
                          <strong>₹{splitShares[idx]?.share}</strong>
                        </div>
                      ))}
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label" style={{ fontSize: '0.8rem' }}>UPI Reference / UTR Number</label>
                      <input
                        type="text"
                        className="form-input"
                        value={transactionRef}
                        onChange={(e) => setTransactionRef(e.target.value)}
                        placeholder="PTM..."
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isVerifying}
                    onClick={handleCompletePayment}
                    className="btn btn-full btn-lg"
                    style={{ background: '#002970', color: '#00baf2', border: '1px solid #00baf2', fontWeight: 800, marginTop: '20px' }}
                  >
                    {isVerifying ? 'Authorizing with Paytm...' : 'Authorize & Issue Group Passes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Consolidated Group Receipt & Pass */}
        {step === 4 && confirmedBooking && (
          <div className="animate-scale-in" style={{ maxWidth: '880px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <CheckCircle2 size={32} />
              </div>
              <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800 }}>
                Group Passes Confirmed!
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Consolidated booking reference: <strong>{confirmedBooking.bookingId}</strong> for {groupName}.
              </p>
            </div>

            {/* Consolidated Receipt Card */}
            <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{confirmedBooking.eventTitle}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {formatDate(confirmedBooking.date)} at {confirmedBooking.venue}
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-purple">Group of {confirmedBooking.quantity}</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '4px' }}>
                    {formatPrice(confirmedBooking.totalAmount)}
                  </div>
                </div>
              </div>

              {/* Table of Friends & Individual Passes */}
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px' }}>
                Attendee Passes & Individual Bill Shares:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {confirmedBooking.groupAttendees?.map((friend, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: 'var(--bg-surface)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '0.95rem', display: 'block' }}>
                        {idx + 1}. {friend.name}
                      </strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        Roll ID: {friend.studentId} • Ticket Ref: {friend.individualTicketId}
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary-teal-light)' }}>
                        Share: ₹{friend.share}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#10b981', display: 'block' }}>Verified Pass</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions: Download PDF Receipt / View My Bookings */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => printPdfReceipt(confirmedBooking)}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}
              >
                <Printer size={16} />
                <span>Download / Print Consolidated PDF Receipt</span>
              </button>
              <Link to="/my-bookings" className="btn btn-outline">
                <Ticket size={16} />
                <span>View in My Bookings</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
