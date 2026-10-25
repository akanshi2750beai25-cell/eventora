import './AdminDashboard.css';
import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle2, XCircle, AlertTriangle, 
  RotateCcw, DollarSign, Users, Calendar, Ticket, ArrowRight,
  TrendingUp, Activity, Check
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { useAuth } from '../../context/AuthContext';
import { mockUsers } from '../../data/mockUsers';
import { formatDate, formatPrice } from '../../utils/helpers';

export default function AdminDashboard() {
  const { events, bookings, approveEvent, rejectEvent, approveRefund, resetDemoData, showToast } = useEvents();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('moderation'); // 'moderation' | 'refunds' | 'users' | 'reset'

  // Calculations
  const cancelledBookings = bookings.filter((b) => b.status === 'Cancelled' || b.refundStatus);
  const totalVolume = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  return (
    <div className="section-py admin-dashboard-page" style={{ minHeight: '85vh', background: 'var(--bg-main)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <ShieldCheck size={18} color="var(--primary-teal-light)" />
              <span className="section-eyebrow">Module 4: Admin Platform Control</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', fontWeight: 800 }}>
              Campus Administration & Moderation
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Faculty oversight: Approve event submissions, manage refund queues, and audit student accounts.
            </p>
          </div>

          {/* Reset Demo Data Button (Requirement #17) */}
          <button
            type="button"
            onClick={resetDemoData}
            className="btn btn-outline btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-gold)', borderColor: 'var(--accent-gold)' }}
          >
            <RotateCcw size={15} />
            <span>Reset Demo Data for Viva</span>
          </button>
        </div>

        {/* Admin Metric Cards */}
        <div className="grid-4" style={{ marginBottom: '28px' }}>
          <div className="card admin-metric-card">
            <span className="admin-metric-label">Active Campus Events</span>
            <strong className="admin-metric-value">{events.length}</strong>
            <span style={{ fontSize: '0.72rem', color: '#10b981' }}>100% Verified Organizers</span>
          </div>

          <div className="card admin-metric-card">
            <span className="admin-metric-label">Total Student Passes</span>
            <strong className="admin-metric-value">{bookings.length}</strong>
            <span style={{ fontSize: '0.72rem', color: 'var(--primary-teal-light)' }}>Passes Issued</span>
          </div>

          <div className="card admin-metric-card">
            <span className="admin-metric-label">Gross Platform Volume</span>
            <strong className="admin-metric-value">{formatPrice(totalVolume)}</strong>
            <span style={{ fontSize: '0.72rem', color: '#00baf2' }}>Paytm Verified</span>
          </div>

          <div className="card admin-metric-card">
            <span className="admin-metric-label">Refund Requests</span>
            <strong className="admin-metric-value">{cancelledBookings.length}</strong>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-rose)' }}>Pending / Settled</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '24px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('moderation')}
            className={`btn btn-sm ${activeTab === 'moderation' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Event Catalog Moderation ({events.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('refunds')}
            className={`btn btn-sm ${activeTab === 'refunds' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Refund Queue ({cancelledBookings.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`btn btn-sm ${activeTab === 'users' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Team & Demo Accounts ({mockUsers.length})
          </button>
        </div>

        {/* TAB 1: EVENT MODERATION */}
        {activeTab === 'moderation' && (
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Event Moderation & Verification</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {events.map((evt) => (
                <div
                  key={evt.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    background: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                      <span className="badge">{evt.category}</span>
                      <strong style={{ fontSize: '0.95rem' }}>{evt.title}</strong>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {formatDate(evt.date)} • Venue: {evt.venue} • Price: {formatPrice(evt.price)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-free" style={{ fontSize: '0.72rem' }}>
                      Verified
                    </span>
                    <button
                      type="button"
                      onClick={() => approveEvent(evt.id)}
                      className="btn btn-outline btn-sm"
                      title="Approve Listing"
                    >
                      <Check size={14} />
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: REFUND QUEUE */}
        {activeTab === 'refunds' && (
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Cancellations & Refund Status Tracking</h3>
            {cancelledBookings.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '10px' }}>Booking Ref</th>
                      <th style={{ padding: '10px' }}>Attendee</th>
                      <th style={{ padding: '10px' }}>Event</th>
                      <th style={{ padding: '10px' }}>Refund Amount</th>
                      <th style={{ padding: '10px' }}>Status</th>
                      <th style={{ padding: '10px', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cancelledBookings.map((b) => (
                      <tr key={b.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '12px 10px', fontWeight: 700, color: 'var(--primary-teal-light)' }}>
                          {b.bookingId}
                        </td>
                        <td style={{ padding: '12px 10px' }}>{b.attendeeName}</td>
                        <td style={{ padding: '12px 10px' }}>{b.eventTitle}</td>
                        <td style={{ padding: '12px 10px', fontWeight: 700 }}>{formatPrice(b.totalAmount)}</td>
                        <td style={{ padding: '12px 10px' }}>
                          <span className={`badge ${b.refundStatus === 'Refunded' ? 'badge-free' : 'badge-gold'}`}>
                            {b.refundStatus || 'Processing'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                          {b.refundStatus !== 'Refunded' ? (
                            <button
                              type="button"
                              onClick={() => approveRefund(b.id)}
                              className="btn btn-primary btn-sm"
                            >
                              Approve Refund
                            </button>
                          ) : (
                            <span style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 700 }}>Settled</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                No cancellation or refund requests currently active.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DEMO ACCOUNTS ROSTER */}
        {activeTab === 'users' && (
          <div className="card">
            <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Project Team & Demo Accounts</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
              {mockUsers.map((u) => (
                <div
                  key={u.id}
                  style={{
                    padding: '16px',
                    background: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <img src={u.avatar} alt={u.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ fontSize: '0.95rem', display: 'block' }}>{u.name}</strong>
                      <span className="badge" style={{ fontSize: '0.68rem' }}>{u.role}</span>
                    </div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{u.email}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary-teal-light)', marginTop: '4px', fontWeight: 600 }}>
                    {u.teamRole}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
