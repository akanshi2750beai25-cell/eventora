import './FilterPanel.css';
import React, { useMemo } from 'react';
import { Filter, RotateCcw, DollarSign, Calendar, MapPin, Layers } from 'lucide-react';
import { categories } from '../../data/categoriesData';
import { useEvents } from '../../context/EventContext';
import { getEventCategoryCounts, getTopCities } from '../../utils/helpers';

const BUDGET_OPTIONS = [
  { id: 'all',      label: 'All Budgets',   emoji: '💳' },
  { id: 'free',     label: 'Free (₹0)',     emoji: '🎉' },
  { id: 'under200', label: 'Under ₹200',    emoji: '💰' },
  { id: '200to500', label: '₹200 – ₹500',  emoji: '🪙' },
  { id: 'above500', label: 'Above ₹500',   emoji: '💎' },
];

const DATE_OPTIONS = [
  { id: 'all',       label: 'Any Date' },
  { id: 'next7days', label: 'Next 7 Days' },
  { id: 'weekend',   label: 'This Weekend' },
  { id: 'thisMonth', label: 'This Month' },
];

/**
 * FilterPanel — Mridul Bhardwaj (Eval 1)
 * Multi-facet filter sidebar with:
 *  - Student Budget Tiers (radio buttons)
 *  - Category filter (pills with live event counts)
 *  - City / Venue filter (dynamic select from events data)
 *  - Event Timing filter (dropdown)
 *  - Available Seats toggle
 */
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
  onResetFilters,
}) {
  const { events } = useEvents();

  // Derive live category counts from events data
  const categoryCounts = useMemo(() => getEventCategoryCounts(events), [events]);

  // Derive dynamic city list from events data
  const cityOptions = useMemo(() => getTopCities(events), [events]);

  // Count active filters for badge
  const activeCount =
    (selectedCategory !== 'All'   ? 1 : 0) +
    (selectedCity !== 'All'       ? 1 : 0) +
    (selectedBudget !== 'all'     ? 1 : 0) +
    (selectedDateFilter !== 'all' ? 1 : 0) +
    (onlyAvailable                ? 1 : 0);

  return (
    <aside className="filter-panel" aria-label="Event Filters">

      {/* ── Panel Header ── */}
      <div className="filter-panel-header">
        <div className="filter-panel-title">
          <Filter size={18} color="var(--primary-teal-light)" />
          <span>Filters</span>
          {activeCount > 0 && (
            <span className="filter-active-badge" aria-label={`${activeCount} active filters`}>
              {activeCount}
            </span>
          )}
        </div>
        <button
          type="button"
          className="filter-panel-reset"
          onClick={onResetFilters}
          title="Reset all filters"
          aria-label="Reset all filters"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>

      {/* ── 1. Student Budget Filter (Radio) ── */}
      <div className="form-group">
        <div className="filter-section-label">
          <DollarSign size={14} color="var(--primary-teal-light)" />
          <span>Student Budget</span>
        </div>
        <div className="filter-radio-group" role="radiogroup" aria-label="Budget filter">
          {BUDGET_OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className={`filter-radio-option ${selectedBudget === opt.id ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="budgetRadio"
                checked={selectedBudget === opt.id}
                onChange={() => onBudgetChange(opt.id)}
                aria-label={opt.label}
              />
              <span>{opt.emoji}</span>
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="filter-divider" />

      {/* ── 2. Category Filter (Pill Buttons with live counts) ── */}
      <div className="form-group">
        <div className="filter-section-label">
          <Layers size={14} color="var(--primary-purple)" />
          <span>Category</span>
        </div>
        <div className="filter-category-pills" role="listbox" aria-label="Category filter">
          {/* All option */}
          <button
            type="button"
            className={`filter-category-pill ${selectedCategory === 'All' ? 'selected' : ''}`}
            onClick={() => onCategoryChange('All')}
            aria-selected={selectedCategory === 'All'}
            role="option"
          >
            <span className="filter-category-pill-left">
              <span>🗂</span>
              <span>All Categories</span>
            </span>
            <span className="filter-category-count">{events.length}</span>
          </button>

          {/* Each category */}
          {categories.map((cat) => {
            const count = categoryCounts[cat.name] || 0;
            return (
              <button
                key={cat.id}
                type="button"
                className={`filter-category-pill ${selectedCategory === cat.name ? 'selected' : ''}`}
                onClick={() => onCategoryChange(cat.name)}
                aria-selected={selectedCategory === cat.name}
                role="option"
              >
                <span className="filter-category-pill-left">
                  <span>{cat.emoji}</span>
                  <span>{cat.name}</span>
                </span>
                <span className="filter-category-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <hr className="filter-divider" />

      {/* ── 3. City / Venue Filter ── */}
      <div className="form-group">
        <div className="filter-section-label">
          <MapPin size={14} color="var(--accent-gold)" />
          <span>City / Venue</span>
        </div>
        <select
          className="filter-select"
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          aria-label="Filter by city"
        >
          <option value="All">All Cities / Venues</option>
          {cityOptions.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <hr className="filter-divider" />

      {/* ── 4. Date / Timing Filter ── */}
      <div className="form-group">
        <div className="filter-section-label">
          <Calendar size={14} color="var(--accent-cyan)" />
          <span>Event Timing</span>
        </div>
        <select
          className="filter-select"
          value={selectedDateFilter}
          onChange={(e) => onDateFilterChange(e.target.value)}
          aria-label="Filter by timing"
        >
          {DATE_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
      </div>

      <hr className="filter-divider" />

      {/* ── 5. Available Seats Toggle ── */}
      <div
        className="filter-toggle-row"
        onClick={() => onOnlyAvailableChange(!onlyAvailable)}
        role="switch"
        aria-checked={onlyAvailable}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOnlyAvailableChange(!onlyAvailable)}
      >
        <span className="filter-toggle-label">
          Show available seats only
          <br />
          <small style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.75rem' }}>
            Hides sold-out events
          </small>
        </span>
        <span className="toggle-switch">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => onOnlyAvailableChange(e.target.checked)}
            aria-label="Only show events with available seats"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="toggle-slider" />
        </span>
      </div>

    </aside>
  );
}
