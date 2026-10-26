import React, { useState } from 'react';
import './QRCodeDisplay.css';
import { ShieldCheck, CheckCircle2, Copy } from 'lucide-react';

export default function QRCodeDisplay({
  value = 'EVENTORA-PASS-2026',
  size = 180,
  label = 'Scan to Verify Pass',
  subtext = 'Official Eventora QR Pass',
  type = 'ticket', // 'paytm' | 'ticket'
  amount = null,
  showCopy = true
}) {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  // High-resolution API QR Code URL
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    value
  )}&margin=8&color=0f172a&bgcolor=ffffff`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`qr-display-card ${type === 'paytm' ? 'qr-paytm-theme' : 'qr-ticket-theme'}`}>
      {/* Brand Header */}
      {type === 'paytm' ? (
        <div className="qr-paytm-header">
          <div className="paytm-badge-pill">
            <span className="paytm-pill-pay">Pay</span>
            <span className="paytm-pill-tm">tm</span>
            <span className="paytm-pill-text">UPI Accepted</span>
          </div>
          {amount !== null && (
            <div className="qr-paytm-amount">
              ₹{Number(amount).toLocaleString('en-IN')}
            </div>
          )}
        </div>
      ) : (
        <div className="qr-ticket-header">
          <ShieldCheck size={16} className="qr-shield-icon" />
          <span>VERIFIED CAMPUS PASS</span>
        </div>
      )}

      {/* QR Code Container */}
      <div className="qr-code-box" style={{ width: size + 24, height: size + 24 }}>
        {!imageError ? (
          <img
            src={qrApiUrl}
            alt={`QR Code for ${value}`}
            className="qr-image"
            style={{ width: size, height: size }}
            onError={() => setImageError(true)}
          />
        ) : (
          /* SVG QR Code Fallback (Works completely offline) */
          <svg
            className="qr-svg-fallback"
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100" height="100" fill="#ffffff" rx="4" />
            
            {/* Top-Left Finder */}
            <rect x="8" y="8" width="26" height="26" fill="#0f172a" rx="4" />
            <rect x="12" y="12" width="18" height="18" fill="#ffffff" rx="2" />
            <rect x="16" y="16" width="10" height="10" fill="#0f172a" rx="1" />

            {/* Top-Right Finder */}
            <rect x="66" y="8" width="26" height="26" fill="#0f172a" rx="4" />
            <rect x="70" y="12" width="18" height="18" fill="#ffffff" rx="2" />
            <rect x="74" y="16" width="10" height="10" fill="#0f172a" rx="1" />

            {/* Bottom-Left Finder */}
            <rect x="8" y="66" width="26" height="26" fill="#0f172a" rx="4" />
            <rect x="12" y="70" width="18" height="18" fill="#ffffff" rx="2" />
            <rect x="16" y="74" width="10" height="10" fill="#0f172a" rx="1" />

            {/* Alignment and Timing Patterns */}
            <rect x="38" y="12" width="4" height="4" fill="#0f172a" />
            <rect x="46" y="12" width="4" height="4" fill="#0f172a" />
            <rect x="54" y="12" width="4" height="4" fill="#0f172a" />
            <rect x="12" y="38" width="4" height="4" fill="#0f172a" />
            <rect x="12" y="46" width="4" height="4" fill="#0f172a" />
            <rect x="12" y="54" width="4" height="4" fill="#0f172a" />

            {/* Simulated Data Matrix blocks */}
            <rect x="40" y="40" width="8" height="8" fill="#0f172a" />
            <rect x="52" y="40" width="8" height="8" fill="#0f172a" />
            <rect x="40" y="52" width="8" height="8" fill="#0f172a" />
            <rect x="52" y="52" width="8" height="8" fill="#0f172a" />
            <rect x="68" y="40" width="6" height="6" fill="#0f172a" />
            <rect x="78" y="46" width="6" height="6" fill="#0f172a" />
            <rect x="68" y="56" width="6" height="6" fill="#0f172a" />
            <rect x="40" y="68" width="6" height="6" fill="#0f172a" />
            <rect x="52" y="78" width="6" height="6" fill="#0f172a" />
            <rect x="46" y="86" width="6" height="6" fill="#0f172a" />
            <rect x="70" y="70" width="10" height="10" fill="#0f172a" rx="2" />
            <rect x="72" y="72" width="6" height="6" fill="#ffffff" />
            <rect x="74" y="74" width="2" height="2" fill="#0f172a" />

            {/* Central Badge */}
            {type === 'paytm' ? (
              <circle cx="50" cy="50" r="10" fill="#00b9f5" />
            ) : (
              <circle cx="50" cy="50" r="10" fill="#6366f1" />
            )}
            <circle cx="50" cy="50" r="6" fill="#ffffff" />
          </svg>
        )}

        {/* Center overlay seal */}
        <div className="qr-center-seal">
          {type === 'paytm' ? (
            <span className="paytm-mini-badge">PTM</span>
          ) : (
            <span className="eventora-mini-badge">EVT</span>
          )}
        </div>
      </div>

      {/* Label & Instructions */}
      <div className="qr-footer">
        <strong className="qr-label-text">{label}</strong>
        {subtext && <p className="qr-subtext">{subtext}</p>}

        {showCopy && (
          <div className="qr-value-pill" onClick={handleCopy} title="Click to copy code">
            <span className="qr-code-string">{value}</span>
            {copied ? (
              <CheckCircle2 size={13} className="copy-success-icon" />
            ) : (
              <Copy size={13} className="copy-icon" />
            )}
            <span className="copy-hint">{copied ? 'Copied!' : 'Copy'}</span>
          </div>
        )}
      </div>
    </div>
  );
}
