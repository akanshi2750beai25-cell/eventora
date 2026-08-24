import './Profile.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Mail, Phone, GraduationCap, Award, 
  Ticket, Heart, MessageSquare, Edit, ShieldCheck, 
  Sparkles, Calendar 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import { categories } from '../../data/categoriesData';
import Modal from '../../components/Modal/Modal';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { bookings, wishlist, reviews, showToast } = useEvents();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    college: user?.college || '',
    department: user?.department || '',
    phone: user?.phone || '',
    bio: user?.bio || ''
  });

  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setEditModalOpen(false);
    showToast('Profile updated successfully! 👤', 'success');
  };

  const handleToggleInterest = (categoryName) => {
    const current = user?.interests || [];
    const updated = current.includes(categoryName)
      ? current.filter((c) => c !== categoryName)
      : [...current, categoryName];

    updateProfile({ interests: updated });
    showToast(`Preferences updated: ${categoryName}`, 'info');
  };

  return (
    <div className="section-py" style={{ minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        {/* Profile Card Header */}
        <div className="card" style={{ marginBottom: '32px', background: 'var(--bg-glass-card)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                  alt={user?.name}
                  style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-teal)' }}
                />
                <div style={{ position: 'absolute', bottom: '0', right: '0', width: '24px', height: '24px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', border: '2px solid var(--bg-card)' }}>
                  <ShieldCheck size={14} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0 }}>{user?.name}</h1>
                  <span className={`badge ${user?.role === 'admin' ? 'badge-gold' : user?.role === 'organizer' ? 'badge-purple' : ''}`}>
                    {user?.role}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Mail size={14} color="var(--primary-teal-light)" />
                    {user?.email}
                  </span>
                  <span>•</span>
                  <span>Roll No: <strong>{user?.rollNo || '2026-CSE-AIML-042'}</strong></span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '8px', margin: '8px 0 0' }}>
                  {user?.bio || 'Passionate engineering undergrad attending AI hackathons and campus fests.'}
                </p>
              </div>
            </div>

            <button onClick={() => setEditModalOpen(true)} className="btn btn-outline btn-sm">
              <Edit size={15} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>

        {/* 2. STATS OVERVIEW */}
        <div className="grid-4" style={{ marginBottom: '32px' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <Ticket size={24} color="var(--primary-teal-light)" style={{ margin: '0 auto 8px' }} />
            <span style={{ fontSize: '1.8rem', fontWeight: 800, display: 'block' }}>{bookings.length}</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Events Booked</span>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <Heart size={24} color="var(--accent-rose)" style={{ margin: '0 auto 8px' }} />
            <span style={{ fontSize: '1.8rem', fontWeight: 800, display: 'block' }}>{wishlist.length}</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Wishlist Favorites</span>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <MessageSquare size={24} color="var(--primary-purple)" style={{ margin: '0 auto 8px' }} />
            <span style={{ fontSize: '1.8rem', fontWeight: 800, display: 'block' }}>{reviews.length}</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Reviews Given</span>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <Award size={24} color="var(--accent-gold)" style={{ margin: '0 auto 8px' }} />
            <span style={{ fontSize: '1.8rem', fontWeight: 800, display: 'block', color: 'var(--accent-emerald)' }}>
              ₹{totalSpent}
            </span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Spent</span>
          </div>
        </div>

        {/* 3. STUDENT INTERESTS & AI RECOMMENDATION PREFERENCES */}
        <div className="card" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Sparkles size={18} color="var(--primary-teal-light)" />
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>My Interest Tags & AI Recommendations</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Eventora's rule-based AI engine uses these categories to curate recommendations on your home feed. Click to toggle.
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const isSelected = user?.interests?.includes(cat.name);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleToggleInterest(cat.name)}
                  className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                  style={{ borderRadius: 'var(--radius-full)' }}
                >
                  <span>{cat.emoji} {cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. QUICK PORTAL SHORTCUTS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <Link to="/my-bookings" className="card hover-lift" style={{ textDecoration: 'none' }}>
            <Ticket size={22} color="var(--primary-teal-light)" style={{ marginBottom: '8px' }} />
            <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>My Bookings</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>View confirmed digital tickets</span>
          </Link>

          <Link to="/wishlist" className="card hover-lift" style={{ textDecoration: 'none' }}>
            <Heart size={22} color="var(--accent-rose)" style={{ marginBottom: '8px' }} />
            <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>Wishlist</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Saved college events</span>
          </Link>

          <Link to="/dashboard" className="card hover-lift" style={{ textDecoration: 'none' }}>
            <Award size={22} color="var(--primary-purple)" style={{ marginBottom: '8px' }} />
            <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>Organizer Portal</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Host and track event analytics</span>
          </Link>
        </div>

        {/* Edit Profile Modal */}
        <Modal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title="Edit Profile Information"
        >
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">College / Institute</label>
              <input
                type="text"
                className="form-input"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Department / Branch</label>
              <input
                type="text"
                className="form-input"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                rows={3}
                className="form-textarea"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button type="button" onClick={() => setEditModalOpen(false)} className="btn btn-outline btn-sm">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save Profile
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
