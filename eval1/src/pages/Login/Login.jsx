import './Login.css';
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles, Mail, Lock, Eye, EyeOff, 
  ArrowRight, ShieldCheck, UserCheck, Shield, Users
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter your email and password', 'error');
      return;
    }

    login(email, password);
    showToast(`Welcome back, ${email.split('@')[0]}!`, 'success');
    navigate(from, { replace: true });
  };

  const handleSelectTeamMember = (targetUser) => {
    login(targetUser.email, 'password123', targetUser.role);
    showToast(`Logged in as ${targetUser.name} (${targetUser.role.toUpperCase()})`, 'success');
    if (targetUser.role === 'organizer') {
      navigate('/organizer/dashboard');
    } else if (targetUser.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="section-py" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
      <div className="container" style={{ maxWidth: '480px' }}>
        <div className="card" style={{ padding: '36px 28px' }}>
          {/* Brand Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', margin: '0 auto 12px' }}>
              <Sparkles size={24} />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '6px' }}>
              Welcome to EVENTORA
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Sign in to manage your campus passes, group bookings, and digital tickets.
            </p>
          </div>

          {/* Quick Team Account Switcher */}
          <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-teal-light)' }}>
                Demo Accounts (Team Members)
              </span>
              <Users size={14} color="var(--primary-teal-light)" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
              {mockUsers.slice(0, 4).map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleSelectTeamMember(u)}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', padding: '6px 8px', justifyContent: 'flex-start', textAlign: 'left' }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {u.name.split(' ')[0]} ({u.role})
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleSelectTeamMember(mockUsers[4])}
              className="btn btn-ghost btn-sm btn-full"
              style={{ fontSize: '0.72rem', marginTop: '6px', color: 'var(--accent-gold)' }}
            >
              Faculty Admin: {mockUsers[4].name}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">College Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  className="form-input"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@college.edu"
                  style={{ paddingLeft: '38px' }}
                />
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ paddingLeft: '38px', paddingRight: '38px' }}
                />
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg" style={{ marginTop: '8px', fontWeight: 700 }}>
              <span>Sign In to Account</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            New to EVENTORA? <Link to="/register" style={{ color: 'var(--primary-teal-light)', fontWeight: 700 }}>Create Student Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
