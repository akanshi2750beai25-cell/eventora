import './SearchBar.css';
import React, { useRef } from 'react';
import { Search, MapPin, Grid, X } from 'lucide-react';
import { categories } from '../../data/categoriesData';

export default function SearchBar({
  searchTerm = '',
  onSearchChange,
  selectedCategory = 'All',
  onCategoryChange,
  selectedCity = 'All',
  onCityChange,
  onSearchSubmit,
  autoFocus = false
}) {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit();
    }
  };

  const handleClear = () => {
    if (onSearchChange) onSearchChange('');
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <form className="search-bar-container" onSubmit={handleSubmit} role="search">
      {/* Keyword Search Input */}
      <div className="search-input-wrap">
        <Search size={20} color="var(--primary-teal-light)" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search by event, artist, venue, organizer..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          autoFocus={autoFocus}
          aria-label="Search events"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
            aria-label="Clear search input"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="search-divider"></div>

      {/* Category Dropdown */}
      <div className="search-select-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Grid size={18} color="var(--primary-purple)" />
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Select Category"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.emoji} {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="search-divider"></div>

      {/* City Dropdown */}
      <div className="search-select-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <MapPin size={18} color="var(--accent-gold)" />
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          aria-label="Select City"
        >
          <option value="All">All Cities / Venues</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="Mohali">Mohali</option>
          <option value="Panchkula">Panchkula</option>
        </select>
      </div>

      {/* Search Button */}
      <button type="submit" className="btn btn-primary btn-md" aria-label="Perform search">
        <Search size={18} />
        <span>Search</span>
      </button>
    </form>
  );
}
