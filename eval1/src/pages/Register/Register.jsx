import './Register.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Mail, Lock, User, GraduationCap, 
  ArrowRight, CheckCircle2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';

export default function Register() {
  const { register } = useAuth();
  const { showToast } = useEvents();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    department: 'Computer Science (AI & ML)',
    college: 'University Institute of Engineering & Technology',
    role: 'student',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      showToast('Passwords do not match', 'error');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      showToast('Password is too short', 'error');
      return;
    }

    register({
      name: formData.name,
      email: formData.email,
      rollNo: formData.rollNo || `2026-CSE-${Math.floor(100 + Math.random() * 900)}`,
      department: formData.department,
      college: formData.college,
      role: formData.role
    });

    showToast('Registration successful! Welcome to Eventora 🎉', 'success');
    navigate('/explore');
  };

  return (
    <div className="section-py" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '540px' }}>
        <div className="card" style={{ padding: '36px 28px' }}>
          {/* Brand Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', margin: '0 auto 12px' }}>
              <Sparkles size={24} />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '6px' }}>
              Create an Account
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Join 15,000+ students booking events and workshops on Eventora.
            </p>
          </div>

          {error && (
            <div style={{ padding: '10px 14px', borderRadius: 'var(--radius-md)', background: 'rgba(244, 63, 94, 0.15)', color: 'var(--accent-rose)', fontSize: '0.85rem', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Akanshi Sharma"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">College Email *</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="student@college.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Roll Number</label>
                <input
                  type="text"
                  name="rollNo"
                  className="form-input"
                  placeholder="2026-CSE-042"
                  value={formData.rollNo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Department / Major</label>
                <input
                  type="text"
                  name="department"
                  className="form-input"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Account Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="student">Student Attendee</option>
                  <option value="organizer">Club Organizer</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="At least 6 chars"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Repeat password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full btn-lg">
              <span>Create My Eventora Account</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Login Link */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary-teal-light)', fontWeight: 700 }}>
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
