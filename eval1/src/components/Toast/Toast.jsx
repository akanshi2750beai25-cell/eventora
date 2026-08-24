import './Toast.css';
import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={20} color="#10b981" />;
      case 'error':
        return <AlertCircle size={20} color="#f43f5e" />;
      default:
        return <Info size={20} color="#06b6d4" />;
    }
  };

  return (
    <div className="toast-notification animate-scale-in" role="alert">
      {getIcon()}
      <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{toast.message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', marginLeft: 'auto' }}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
