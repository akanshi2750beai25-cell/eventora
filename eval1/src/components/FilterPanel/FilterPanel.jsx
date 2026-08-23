import './FilterPanel.css';
import React from 'react';
import { Filter, RotateCcw, DollarSign, Calendar, MapPin, Layers } from 'lucide-react';
import { categories } from '../../data/categoriesData';

export default function FilterPanel({
  selectedCategory,
  onCategoryChange,
  selectedCity,
  onCityChange,
  selectedBudget,
  onBudgetChange,
  selectedDateFilter,
  onDateFilterChange,
  onlyAvailable,
  onOnlyAvailableChange,
  onResetFilters
}) {
  const budgetOptions = [
    { id: 'all', label: 'All Budgets' },
    { id: 'free', label: 'Free (₹0)' },
    { id: 'under200', label: 'Under ₹200' },
    { id: '200to500', label: '₹200 – ₹500' },
    { id: 'above500', label: 'Above ₹500' }
  ];

  const dateOptions = [
    { id: 'all', label: 'Any Date' },
    { id: 'weekend', label: 'This Weekend' },
    { id: 'next7days', label: 'Next 7 Days' },
    { id: 'thisMonth', label: 'This Month' }
  ];

  return (
    <aside className="card" style={{ padding: '20px', height: 'fit-content' }} aria-label="Event Filters">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1.05rem' }}>
          <Filter size={18} color="var(--primary-teal-light)" />
          <span>Filters</span>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="btn btn-ghost btn-sm"
          style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}
          title="Reset all filters"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>

      {/* Student Budget Filter */}
      <div className="form-group">
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <DollarSign size={15} color="var(--primary-teal-light)" />
          <span>Student Budget</span>
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {budgetOptions.map((opt) => (
            <label
              key={opt.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.88rem',
                cursor: 'pointer',
                color: selectedBudget === opt.id ? 'var(--primary-teal-light)' : 'var(--text-secondary)',
                fontWeight: selectedBudget === opt.id ? 700 : 400
              }}
            >
              <input
                type="radio"
                name="budgetRadio"
                checked={selectedBudget === opt.id}
                onChange={() => onBudgetChange(opt.id)}
                style={{ accentColor: 'var(--primary-teal)' }}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '16px 0' }} />

      {/* Category Filter */}
      <div className="form-group">
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Layers size={15} color="var(--primary-purple)" />
          <span>Category</span>
        </label>
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.emoji} {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* City / Venue Filter */}
      <div className="form-group">
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MapPin size={15} color="var(--accent-gold)" />
          <span>City / Venue</span>
        </label>
        <select
          className="form-select"
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
        >
          <option value="All">All Cities</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="Mohali">Mohali</option>
          <option value="Panchkula">Panchkula</option>
        </select>
      </div>

      {/* Date Filter */}
      <div className="form-group">
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={15} color="var(--accent-cyan)" />
          <span>Event Timing</span>
        </label>
        <select
          className="form-select"
          value={selectedDateFilter}
          onChange={(e) => onDateFilterChange(e.target.value)}
        >
          {dateOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Availability Toggle */}
      <div style={{ marginTop: '12px' }}>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.88rem',
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
        >
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => onOnlyAvailableChange(e.target.checked)}
            style={{ width: '16px', height: '16px', accentColor: 'var(--primary-teal)' }}
          />
          <span>Show Available Seats Only</span>
        </label>
      </div>
    </aside>
  );
}
