import './Notifications.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, CheckCircle2, Ticket, AlertCircle, Info, Calendar, 
  Trash2, Check, ArrowRight, Sparkles
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';

export default function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead, unreadNotificationCount } = useEvents();
  const [filter, setFilter] = useState('all'); // 'all' | 'unread'

  const filteredList = filter === 'unread'
    ? notifications.filter((n) => !n.read)
    : notifications;

  const getIconForType = (type) => {
    switch (type) {
      case 'booking':
        return <Ticket size={18} color="var(--primary-teal-light)" />;
      case 'refund':
        return <CheckCircle2 size={18} color="var(--accent-emerald)" />;
      case 'reminder':
        return <Calendar size={18} color="var(--accent-gold)" />;
      case 'info':
      default:
        return <Info size={18} color="var(--primary-purple-light)" />;
    }
  };

  return (
    <div className="section-py" style={{ minHeight: '80vh', background: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Bell size={18} color="var(--primary-teal-light)" />
              <span className="section-eyebrow">Campus Alerts & Activity</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.3rem)', fontWeight: 800 }}>
              Notifications Center
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Real-time booking confirmations, gate entry reminders, and refund updates.
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {unreadNotificationCount > 0 && (
              <button
                type="button"
                onClick={markAllNotificationsRead}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Check size={14} />
                <span>Mark All Read</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`btn btn-sm ${filter === 'unread' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Unread ({unreadNotificationCount})
          </button>
        </div>

        {/* Notifications List */}
        {filteredList.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredList.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`card notification-card ${!notif.read ? 'unread' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  borderLeft: !notif.read ? '4px solid var(--primary-teal-light)' : '1px solid var(--border-color)',
                  background: !notif.read ? 'rgba(6, 182, 212, 0.05)' : 'var(--bg-card)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {getIconForType(notif.type)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      {notif.title}
                    </strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {notif.date}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {notif.message}
                  </p>
                </div>

                {!notif.read && (
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--primary-teal-light)',
                      marginTop: '6px'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
            <Bell size={40} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>No Notifications</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              You're all caught up with your campus bookings and alerts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
