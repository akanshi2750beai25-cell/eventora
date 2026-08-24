import './Countdown.css';
import React from 'react';
import useCountdown from '../../hooks/useCountdown';

export default function Countdown({ targetDate, targetTime, label = 'Starts In' }) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate, targetTime);

  if (isExpired) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontWeight: 700, fontSize: '0.85rem' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
        Event in Progress or Concluded
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary-teal-light)' }}>
          ⏱️ {label}
        </span>
      )}
      <div className="countdown-box-group">
        <div className="countdown-box">
          <span className="countdown-num">{String(days).padStart(2, '0')}</span>
          <span className="countdown-lbl">Days</span>
        </div>
        <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-muted)' }}>:</span>
        <div className="countdown-box">
          <span className="countdown-num">{String(hours).padStart(2, '0')}</span>
          <span className="countdown-lbl">Hours</span>
        </div>
        <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-muted)' }}>:</span>
        <div className="countdown-box">
          <span className="countdown-num">{String(minutes).padStart(2, '0')}</span>
          <span className="countdown-lbl">Mins</span>
        </div>
        <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-muted)' }}>:</span>
        <div className="countdown-box">
          <span className="countdown-num">{String(seconds).padStart(2, '0')}</span>
          <span className="countdown-lbl">Secs</span>
        </div>
      </div>
    </div>
  );
}
