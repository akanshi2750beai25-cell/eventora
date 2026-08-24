import './Login.css';
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles, Mail, Lock, Eye, EyeOff, 
  ArrowRight, ShieldCheck, UserCheck, Shield 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import { mockUsers } from '../../data/mockUsers';

export default function Login() {
  const { login, quickLogin } = useAuth();
  const { showToast } = useEvents();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('akanshi.cse@eventora.edu');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter your email and password', 'error');
      return;
    }

    login(email, password, role);
    showToast(`Welcome back, ${email.split('@')[0]}! 👋`, 'success');
    navigate(from, { replace: true });
  };

  const handleQuickDemo = (userRole) => {
    quickLogin(userRole);
    showToast(`Logged in as Demo ${userRole.toUpperCase()}! ⚡`, 'success');
    navigate(userRole === 'organizer' ? '/dashboard' : userRole === 'admin' ? '/admin' : from, { replace: true });
  };

  return (
    <div className="section-py" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="card" style={{ padding: '36px 28px' }}>
          {/* Brand Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', margin: '0 auto 12px' }}>
              <Sparkles size={24} />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '6px' }}>
              Welcome to EVENTORA
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Sign in to manage your campus event passes and bookings.
            </p>
          </div>

          {/* 1-Click Viva Demo Logins */}
          <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--primary-teal-light)', display: 'block', marginBottom: '8px', textAlign: 'center' }}>
              ⚡ 1-Click Viva Evaluation Demo Logins
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              <button
                type="button"
                onClick={() => handleQuickDemo('student')}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '6px 4px' }}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('organizer')}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '6px 4px' }}
              >
                Organizer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem', padding: '6px 4px' }}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">College Email</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-input"
                  placeholder="name@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label">Select Account Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student Attendee</option>
                <option value="organizer">Club / Fest Organizer</option>
                <option value="admin">Faculty Administrator</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg">
              <span>Sign In to Eventora</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Register Link */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary-teal-light)', fontWeight: 700 }}>
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
