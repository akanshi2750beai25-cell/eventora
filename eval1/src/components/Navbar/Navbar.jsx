import './Navbar.css';
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Sparkles, Heart, Ticket, User, 
  Menu, X, LogOut, ChevronDown, BookOpen 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { wishlist, bookings } = useEvents();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="navbar-header">
        <div className="container navbar-container">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand" onClick={() => setMobileMenuOpen(false)}>
            <div className="nav-brand-logo-icon">
              <Sparkles size={20} />
            </div>
            <div>
              EVENTORA<span style={{ color: 'var(--primary-teal-light)' }}>.</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-links-desktop" aria-label="Main Navigation">
            <NavLink to="/" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/explore" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
              Explore Events
            </NavLink>
            <NavLink to="/categories" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
              Categories
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
              Contact
            </NavLink>
          </nav>

          {/* Right Actions: Wishlist, Bookings, User Menu */}
          <div className="nav-actions">
            {/* Wishlist Link with Badge */}
            <Link
              to="/wishlist"
              className="nav-icon-btn"
              aria-label="View Wishlist"
              title="Saved Events Wishlist"
            >
              <Heart size={18} color={wishlist.length > 0 ? 'var(--accent-rose)' : 'inherit'} />
              {wishlist.length > 0 && <span className="nav-badge-count">{wishlist.length}</span>}
            </Link>

            {/* My Bookings Link with Badge */}
            <Link
              to="/my-bookings"
              className="nav-icon-btn"
              aria-label="View Bookings"
              title="My Event Bookings"
            >
              <Ticket size={18} color="var(--primary-teal-light)" />
              {bookings.length > 0 && <span className="nav-badge-count">{bookings.length}</span>}
            </Link>

            {/* User Auth Dropdown */}
            {isAuthenticated && user ? (
              <div className="user-menu-wrap">
                <button
                  type="button"
                  className="user-avatar-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  aria-expanded={userDropdownOpen}
                  aria-label="User profile menu"
                >
                  <div className="user-avatar-circle">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} color="var(--text-muted)" />
                </button>

                {userDropdownOpen && (
                  <div className="user-menu-dropdown animate-scale-in">
                    <div className="user-menu-header">
                      <div className="user-menu-name">{user.name}</div>
                      <div className="user-menu-email">{user.email}</div>
                      <div className="user-menu-role">
                        <span className="badge">
                          Student Attendee
                        </span>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      className="user-menu-item"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <User size={16} />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/my-bookings"
                      className="user-menu-item"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Ticket size={16} />
                      <span>My Bookings ({bookings.length})</span>
                    </Link>

                    <Link
                      to="/wishlist"
                      className="user-menu-item"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Heart size={16} />
                      <span>My Wishlist ({wishlist.length})</span>
                    </Link>

                    <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '6px 0' }} />

                    <button type="button" className="user-menu-item logout" onClick={handleLogout}>
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to="/login" className="btn btn-outline btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="nav-icon-btn hamb"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              style={{ display: 'none' }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="mobile-drawer">
            <NavLink
              to="/"
              className="nav-link-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/explore"
              className="nav-link-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore Events
            </NavLink>
            <NavLink
              to="/categories"
              className="nav-link-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </NavLink>
            <NavLink
              to="/my-bookings"
              className="nav-link-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Bookings
            </NavLink>
            <NavLink
              to="/wishlist"
              className="nav-link-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              Wishlist
            </NavLink>
            <NavLink
              to="/about"
              className="nav-link-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              About & Team
            </NavLink>
            <NavLink
              to="/contact"
              className="nav-link-item"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
          </div>
        )}
      </header>
  );
}
