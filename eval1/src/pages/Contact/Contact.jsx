import './Contact.css';
import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, HelpCircle, 
  ChevronDown, ChevronUp, CheckCircle2, Sparkles 
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';

export default function Contact() {
  const { showToast } = useEvents();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'Booking & Tickets',
    message: ''
  });

  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'How does Group Booking and Split Payment work?',
      a: 'When booking tickets, check the "Enable Group Split" option. You can enter your friends\' names and emails, and Eventora automatically divides the total booking amount evenly among members.'
    },
    {
      q: 'How do I access my Digital Ticket for venue entry?',
      a: 'After booking, an official digital boarding pass is generated with a unique reference code (e.g. EVT-2026-X89B) and QR visual. You can view, print, or save this pass anytime under "My Bookings".'
    },
    {
      q: 'Can college clubs and societies host their own events?',
      a: 'Yes! Navigate to "Create Event" to submit your fest, workshop, or sports meet details. You can configure custom ticket tiers, seat capacity, and track registrations in the Organizer Dashboard.'
    },
    {
      q: 'Is there any fee for free student events?',
      a: 'No! Events priced at ₹0 have ₹0 platform fees. Students can reserve free passes with valid campus identification.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    showToast('Your message has been sent to Campus Support! 📨', 'success');
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: 'Booking & Tickets',
      message: ''
    });
  };

  return (
    <div className="section-py" style={{ minHeight: '80vh' }}>
      <div className="container" style={{ maxWidth: '980px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Mail size={18} color="var(--primary-teal-light)" />
            <span className="section-eyebrow">Campus Support & Inquiries</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
            Contact Campus Help Desk
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Have questions about event registrations, organizer approvals, or split payments? We're here to assist.
          </p>
        </div>

        {/* 2-Column Layout: Form + Contact Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '36px', marginBottom: '48px' }}>
          {/* Contact Form */}
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Akanshi Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">College Email *</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="student@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Inquiry regarding AI Summit"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option>Booking & Tickets</option>
                    <option>Organizer Hosting</option>
                    <option>Split Payment Issue</option>
                    <option>General Campus Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label">Message *</label>
                <textarea
                  rows={4}
                  className="form-textarea"
                  placeholder="How can we help you? Describe your query in detail..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Details Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card" style={{ background: 'var(--bg-glass-card)' }}>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>Campus Desk Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MapPin size={18} color="var(--primary-teal-light)" style={{ marginTop: '2px' }} />
                  <div>
                    <strong>Student Welfare Center</strong>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                      Block C, University Campus, Chandigarh - 160014
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Mail size={18} color="var(--primary-purple)" />
                  <div>
                    <strong>support@eventora.edu</strong>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                      24-hour response time
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Phone size={18} color="var(--accent-gold)" />
                  <div>
                    <strong>+91 172 253 4000</strong>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                      Mon - Fri (09:00 AM - 05:00 PM)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card" style={{ border: '1px dashed var(--primary-teal)', textAlign: 'center', padding: '20px' }}>
              <Sparkles size={24} color="var(--primary-teal-light)" style={{ margin: '0 auto 8px' }} />
              <strong style={{ display: 'block', fontSize: '0.95rem' }}>Campus Club Partnership</strong>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 12px' }}>
                Want to integrate Eventora for your departmental fest?
              </p>
              <span className="badge badge-purple">Partnership Desk: club@eventora.edu</span>
            </div>
          </div>
        </div>

        {/* 3. FAQ ACCORDION SECTION */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <HelpCircle size={22} color="var(--primary-teal-light)" />
            <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Frequently Asked Questions</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    background: 'var(--bg-surface)'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--primary-teal-light)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 20px 16px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
