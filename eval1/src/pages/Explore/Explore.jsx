import './Explore.css';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search, SlidersHorizontal, Grid, List,
  RotateCcw, Sparkles, X, ChevronDown, TrendingUp,
  Zap, Star, Tag, MapPin
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import EventCard from '../../components/EventCard/EventCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import SearchBar from '../../components/SearchBar/SearchBar';

// Quick category stats pills data
const QUICK_FILTERS = [
  { label: '🔥 Trending', key: 'trending' },
  { label: '🎉 Free', key: 'free' },
  { label: '📅 This Week', key: 'next7days' },
  { label: '⭐ Top Rated', key: 'rating' },
  { label: '💰 Budget-Friendly', key: 'under200' },
];

// Skeleton loader for loading state
function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img" />
      <div className="skeleton-body">
        <div className="skeleton skeleton-line skeleton-line-short" />
        <div className="skeleton skeleton-line skeleton-line-long" />
        <div className="skeleton skeleton-line skeleton-line-medium" />
        <div className="skeleton skeleton-line skeleton-line-short" style={{ marginTop: '8px' }} />
      </div>
    </div>
  );
}

// List-view row for an event
function EventListRow({ event }) {
  const { toggleWishlist, isWishlisted } = useEvents();
  const isFav = isWishlisted(event.id);

  return (
    <article className="event-list-row" aria-label={event.title}>
      <img src={event.image} alt={event.title} className="event-list-img" loading="lazy" />

      <div className="event-list-body">
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <span className="badge">{event.category}</span>
          {event.isTrending && <span className="badge badge-trending">🔥 Trending</span>}
          {event.price === 0 && <span className="badge badge-free">Free</span>}
        </div>
        <div className="event-list-title">{event.title}</div>
        <div className="event-list-meta">
          <span className="event-list-meta-item">
            <MapPin size={13} />
            {event.venue}, {event.city}
          </span>
          <span className="event-list-meta-item">
            <Star size={13} color="var(--accent-gold)" fill="var(--accent-gold)" />
            {event.rating || 5.0} ({event.reviewsCount || 0})
          </span>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {event.description}
        </p>
      </div>

      <div className="event-list-actions">
        <span style={{ fontWeight: 800, fontSize: '1.05rem', color: event.price === 0 ? 'var(--primary-teal-light)' : 'var(--text-primary)' }}>
          {event.price === 0 ? 'FREE' : `₹${event.price}`}
        </span>
        <button
          type="button"
          onClick={() => toggleWishlist(event.id)}
          style={{
            background: 'none',
            border: `1px solid ${isFav ? 'var(--accent-rose)' : 'var(--border-color)'}`,
            color: isFav ? 'var(--accent-rose)' : 'var(--text-muted)',
            padding: '6px 10px',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontSize: '0.78rem',
            fontWeight: 600,
          }}
          aria-label={isFav ? 'Remove from wishlist' : 'Save'}
        >
          {isFav ? '♥ Saved' : '♡ Save'}
        </button>
        <a href={`/booking/${event.id}`}
          className="btn btn-primary btn-sm"
          style={{ textDecoration: 'none', textAlign: 'center', fontSize: '0.82rem' }}
        >
          Book Now
        </a>
      </div>
    </article>
  );
}

export default function Explore() {
  const { events } = useEvents();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States initialized from URL or defaults
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'All');
  const [selectedBudget, setSelectedBudget] = useState(searchParams.get('budget') || 'all');
  const [selectedDateFilter, setSelectedDateFilter] = useState('all');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'trending');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isLoading, setIsLoading] = useState(true);
  const [activeQuickFilter, setActiveQuickFilter] = useState(null);
  const [filterPanelOpen, setFilterPanelOpen] = useState(true);

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Update query params when key filters change
  useEffect(() => {
    const params = {};
    if (searchTerm) params.q = searchTerm;
    if (selectedCategory !== 'All') params.category = selectedCategory;
    if (selectedCity !== 'All') params.city = selectedCity;
    if (selectedBudget !== 'all') params.budget = selectedBudget;
    if (sortBy !== 'trending') params.sort = sortBy;
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedCategory, selectedCity, selectedBudget, sortBy, setSearchParams]);

  // Reset all filters handler
  const handleResetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedCity('All');
    setSelectedBudget('all');
    setSelectedDateFilter('all');
    setOnlyAvailable(false);
    setSortBy('trending');
    setActiveQuickFilter(null);
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  // Apply quick filter pill
  const handleQuickFilter = useCallback((key) => {
    handleResetFilters();
    setActiveQuickFilter(key);
    if (key === 'free') { setSelectedBudget('free'); }
    else if (key === 'next7days') { setSelectedDateFilter('next7days'); }
    else if (key === 'rating') { setSortBy('rating'); }
    else if (key === 'under200') { setSelectedBudget('under200'); }
    else if (key === 'trending') { setSortBy('trending'); }
  }, [handleResetFilters]);

  // High-performance filter & sort using useMemo
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 1. Keyword search (Name, Category, City, Organizer, Tags, Description)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle    = event.title?.toLowerCase().includes(query);
        const matchesCategory = event.category?.toLowerCase().includes(query);
        const matchesCity     = event.city?.toLowerCase().includes(query);
        const matchesVenue    = event.venue?.toLowerCase().includes(query);
        const matchesOrg      = event.organizer?.name?.toLowerCase().includes(query);
        const matchesDesc     = event.description?.toLowerCase().includes(query);
        const matchesTags     = event.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCategory && !matchesCity && !matchesVenue && !matchesOrg && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'All' && event.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;

      // 3. City filter
      if (selectedCity !== 'All' && event.city.toLowerCase() !== selectedCity.toLowerCase()) return false;

      // 4. Student Budget filter
      if (selectedBudget === 'free'     && event.price !== 0)                              return false;
      if (selectedBudget === 'under200' && (event.price > 200 || event.price === 0))        return false;
      if (selectedBudget === '200to500' && (event.price < 200 || event.price > 500))        return false;
      if (selectedBudget === 'above500' && event.price <= 500)                              return false;

      // 5. Availability filter
      if (onlyAvailable && event.availableSeats <= 0) return false;

      // 6. Date timing filter
      if (selectedDateFilter === 'next7days') {
        const eventDate = new Date(event.date);
        const today     = new Date();
        const diffDays  = (eventDate - today) / (1000 * 60 * 60 * 24);
        if (diffDays < 0 || diffDays > 7) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceLow')  return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'rating')    return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'date')      return new Date(a.date) - new Date(b.date);
      // Default: Trending (isTrending first, then reviewsCount)
      if (a.isTrending && !b.isTrending) return -1;
      if (!a.isTrending && b.isTrending) return 1;
      return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    });
  }, [events, searchTerm, selectedCategory, selectedCity, selectedBudget, onlyAvailable, selectedDateFilter, sortBy]);

  // Computed stats for summary pills
  const freeCount     = useMemo(() => events.filter((e) => e.price === 0).length, [events]);
  const trendingCount = useMemo(() => events.filter((e) => e.isTrending).length, [events]);

  const activeFilterCount =
    (selectedCategory !== 'All'  ? 1 : 0) +
    (selectedCity !== 'All'      ? 1 : 0) +
    (selectedBudget !== 'all'    ? 1 : 0) +
    (onlyAvailable               ? 1 : 0) +
    (searchTerm                  ? 1 : 0) +
    (selectedDateFilter !== 'all'? 1 : 0);

  return (
    <div className="section-py" style={{ minHeight: '80vh' }}>
      <div className="container">

        {/* ── Page Header ── */}
        <div className="explore-header">
          <div className="explore-header-eyebrow">
            <Sparkles size={18} color="var(--primary-teal-light)" />
            <span>Live Event Directory</span>
          </div>
          <h1>Explore All Campus Events</h1>
          <p>
            Discover upcoming hackathons, fests, sports tournaments, comedy shows, and workshops —
            filtered specifically for college students. <strong>{events.length}+ events</strong> across Chandigarh, Mohali & Panchkula.
          </p>
        </div>

        {/* ── Quick Filter Pills ── */}
        <div className="explore-stats-bar" role="group" aria-label="Quick Filters">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '4px' }}>Quick:</span>
          {QUICK_FILTERS.map((qf) => (
            <button
              key={qf.key}
              type="button"
              className={`explore-stat-pill ${activeQuickFilter === qf.key ? 'active' : ''}`}
              onClick={() => handleQuickFilter(qf.key)}
              aria-pressed={activeQuickFilter === qf.key}
            >
              {qf.label}
            </button>
          ))}
          <span className="explore-stat-pill" style={{ cursor: 'default', color: 'var(--text-muted)' }}>
            <Zap size={13} color="var(--accent-gold)" /> {trendingCount} Trending
          </span>
          <span className="explore-stat-pill" style={{ cursor: 'default', color: 'var(--text-muted)' }}>
            <Tag size={13} color="var(--primary-teal-light)" /> {freeCount} Free Events
          </span>
        </div>

        {/* ── Top Search Bar ── */}
        <div style={{ marginBottom: '32px' }}>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
          />
        </div>

        {/* ── Main Content: Filter Sidebar + Events Grid ── */}
        <div className="explore-layout">

          {/* Filter Sidebar */}
          <div>
            <FilterPanel
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedCity={selectedCity}
              onCityChange={setSelectedCity}
              selectedBudget={selectedBudget}
              onBudgetChange={setSelectedBudget}
              selectedDateFilter={selectedDateFilter}
              onDateFilterChange={setSelectedDateFilter}
              onlyAvailable={onlyAvailable}
              onOnlyAvailableChange={setOnlyAvailable}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Results Area */}
          <div>
            {/* Results Toolbar */}
            <div className="explore-toolbar">
              <div className="explore-toolbar-left">
                <span className="explore-count">
                  {isLoading ? 'Loading...' : `${filteredEvents.length} ${filteredEvents.length === 1 ? 'Event' : 'Events'}`}
                </span>
                {activeFilterCount > 0 && (
                  <span className="explore-count-sub">({activeFilterCount} active {activeFilterCount === 1 ? 'filter' : 'filters'})</span>
                )}
              </div>

              <div className="explore-toolbar-right">
                {/* Sort Selector */}
                <div className="explore-sort">
                  <span>Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort events"
                  >
                    <option value="trending">🔥 Trending</option>
                    <option value="date">📅 Date (Earliest)</option>
                    <option value="rating">⭐ Highest Rated</option>
                    <option value="priceLow">💰 Price: Low → High</option>
                    <option value="priceHigh">💎 Price: High → Low</option>
                  </select>
                </div>

                {/* View Toggle */}
                <div className="view-toggle" aria-label="View mode">
                  <button
                    type="button"
                    className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                    title="Grid View"
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    type="button"
                    className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                    title="List View"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Chips Bar */}
            {activeFilterCount > 0 && (
              <div className="active-filters-bar" role="list" aria-label="Active filters">
                {searchTerm && (
                  <span className="filter-chip" role="listitem">
                    🔍 "{searchTerm}"
                    <button className="filter-chip-close" onClick={() => setSearchTerm('')} aria-label="Remove search filter"><X size={11} /></button>
                  </span>
                )}
                {selectedCategory !== 'All' && (
                  <span className="filter-chip" role="listitem" style={{ color: 'var(--primary-purple)' }}>
                    🗂 {selectedCategory}
                    <button className="filter-chip-close" onClick={() => setSelectedCategory('All')} aria-label="Remove category filter"><X size={11} /></button>
                  </span>
                )}
                {selectedCity !== 'All' && (
                  <span className="filter-chip" role="listitem" style={{ color: 'var(--accent-gold)' }}>
                    📍 {selectedCity}
                    <button className="filter-chip-close" onClick={() => setSelectedCity('All')} aria-label="Remove city filter"><X size={11} /></button>
                  </span>
                )}
                {selectedBudget !== 'all' && (
                  <span className="filter-chip" role="listitem" style={{ color: 'var(--primary-teal-light)' }}>
                    💰 {selectedBudget === 'free' ? 'Free' : selectedBudget === 'under200' ? 'Under ₹200' : selectedBudget === '200to500' ? '₹200–₹500' : 'Above ₹500'}
                    <button className="filter-chip-close" onClick={() => setSelectedBudget('all')} aria-label="Remove budget filter"><X size={11} /></button>
                  </span>
                )}
                {selectedDateFilter !== 'all' && (
                  <span className="filter-chip" role="listitem">
                    📅 {selectedDateFilter === 'next7days' ? 'Next 7 Days' : selectedDateFilter === 'weekend' ? 'This Weekend' : 'This Month'}
                    <button className="filter-chip-close" onClick={() => setSelectedDateFilter('all')} aria-label="Remove date filter"><X size={11} /></button>
                  </span>
                )}
                {onlyAvailable && (
                  <span className="filter-chip" role="listitem" style={{ color: 'var(--accent-rose)' }}>
                    ✅ Available Only
                    <button className="filter-chip-close" onClick={() => setOnlyAvailable(false)} aria-label="Remove availability filter"><X size={11} /></button>
                  </span>
                )}
                <button className="clear-all-btn" onClick={handleResetFilters}>Clear All</button>
              </div>
            )}

            {/* ── Skeleton Loading State ── */}
            {isLoading && (
              <div className="events-grid">
                {[1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)}
              </div>
            )}

            {/* ── Events Grid or List ── */}
            {!isLoading && filteredEvents.length > 0 && (
              viewMode === 'grid' ? (
                <div className="events-grid">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="events-list">
                  {filteredEvents.map((event) => (
                    <EventListRow key={event.id} event={event} />
                  ))}
                </div>
              )
            )}

            {/* ── Empty State ── */}
            {!isLoading && filteredEvents.length === 0 && (
              <div className="card explore-empty">
                <div className="explore-empty-icon">
                  <Search size={30} />
                </div>
                <h3>No Matching Events Found</h3>
                <p>
                  We couldn't find any events matching your current filters.
                  Try changing your search keywords, adjusting the budget range, or reset all filters to see all events.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary btn-md">
                  <RotateCcw size={16} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
