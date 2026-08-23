import './Explore.css';
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, SlidersHorizontal, Grid, List, 
  RotateCcw, Sparkles, Filter, X 
} from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import EventCard from '../../components/EventCard/EventCard';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import SearchBar from '../../components/SearchBar/SearchBar';

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
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedCity('All');
    setSelectedBudget('all');
    setSelectedDateFilter('all');
    setOnlyAvailable(false);
    setSortBy('trending');
    setSearchParams({}, { replace: true });
  };

  // High-performance filter & sort using useMemo
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // 1. Keyword search (Name, Category, City, Organizer, Tags, Description)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = event.title?.toLowerCase().includes(query);
        const matchesCategory = event.category?.toLowerCase().includes(query);
        const matchesCity = event.city?.toLowerCase().includes(query);
        const matchesVenue = event.venue?.toLowerCase().includes(query);
        const matchesOrg = event.organizer?.name?.toLowerCase().includes(query);
        const matchesDesc = event.description?.toLowerCase().includes(query);
        const matchesTags = event.tags?.some((t) => t.toLowerCase().includes(query));

        if (!matchesTitle && !matchesCategory && !matchesCity && !matchesVenue && !matchesOrg && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== 'All' && event.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // 3. City filter
      if (selectedCity !== 'All' && event.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // 4. Student Budget filter
      if (selectedBudget === 'free' && event.price !== 0) return false;
      if (selectedBudget === 'under200' && (event.price > 200 || event.price === 0)) return false;
      if (selectedBudget === '200to500' && (event.price < 200 || event.price > 500)) return false;
      if (selectedBudget === 'above500' && event.price <= 500) return false;

      // 5. Availability filter
      if (onlyAvailable && event.availableSeats <= 0) return false;

      // 6. Date timing filter
      if (selectedDateFilter === 'next7days') {
        const eventDate = new Date(event.date);
        const today = new Date();
        const diffDays = (eventDate - today) / (1000 * 60 * 60 * 24);
        if (diffDays < 0 || diffDays > 7) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
      // Default: Trending (isTrending first, then reviewsCount)
      if (a.isTrending && !b.isTrending) return -1;
      if (!a.isTrending && b.isTrending) return 1;
      return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    });
  }, [events, searchTerm, selectedCategory, selectedCity, selectedBudget, onlyAvailable, selectedDateFilter, sortBy]);

  const activeFilterCount = (selectedCategory !== 'All' ? 1 : 0) +
    (selectedCity !== 'All' ? 1 : 0) +
    (selectedBudget !== 'all' ? 1 : 0) +
    (onlyAvailable ? 1 : 0) +
    (searchTerm ? 1 : 0);

  return (
    <div className="section-py" style={{ minHeight: '80vh' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={18} color="var(--primary-teal-light)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary-teal-light)' }}>
              Live Event Directory
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800 }}>
            Explore All Campus Events
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Discover upcoming hackathons, fests, sports tournaments, comedy shows, and workshops.
          </p>
        </div>

        {/* Top Search Bar */}
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

        {/* Main Content Layout: Filters Sidebar + Events Grid */}
        <div className="explore-layout" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
          {/* Filter Sidebar */}
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

          {/* Results Area */}
          <div>
            {/* Results Toolbar: Count, Active Chips, Sorting, View Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '14px', background: 'var(--bg-surface)', padding: '14px 20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                  Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'}
                </span>
                {activeFilterCount > 0 && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                    ({activeFilterCount} active filters)
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Sort Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Sort By:</span>
                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                    aria-label="Sort events"
                  >
                    <option value="trending">🔥 Trending First</option>
                    <option value="date">📅 Date (Earliest)</option>
                    <option value="rating">⭐ Highest Rated</option>
                    <option value="priceLow">💰 Price: Low to High</option>
                    <option value="priceHigh">💎 Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            {activeFilterCount > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {searchTerm && (
                  <span className="badge" style={{ padding: '6px 12px', background: 'var(--bg-card)' }}>
                    Search: "{searchTerm}"
                    <X size={12} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setSearchTerm('')} />
                  </span>
                )}
                {selectedCategory !== 'All' && (
                  <span className="badge badge-purple" style={{ padding: '6px 12px' }}>
                    Category: {selectedCategory}
                    <X size={12} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setSelectedCategory('All')} />
                  </span>
                )}
                {selectedCity !== 'All' && (
                  <span className="badge badge-gold" style={{ padding: '6px 12px' }}>
                    City: {selectedCity}
                    <X size={12} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setSelectedCity('All')} />
                  </span>
                )}
                {selectedBudget !== 'all' && (
                  <span className="badge" style={{ padding: '6px 12px' }}>
                    Budget: {selectedBudget}
                    <X size={12} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setSelectedBudget('all')} />
                  </span>
                )}
                {onlyAvailable && (
                  <span className="badge badge-free" style={{ padding: '6px 12px' }}>
                    Available Only
                    <X size={12} style={{ cursor: 'pointer', marginLeft: '4px' }} onClick={() => setOnlyAvailable(false)} />
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  style={{ background: 'none', border: 'none', color: 'var(--primary-teal-light)', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Events Grid or Empty State */}
            {filteredEvents.length > 0 ? (
              <div className="grid-3">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '64px 24px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--text-muted)' }}>
                  <Search size={28} />
                </div>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>No Matching Events Found</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 24px' }}>
                  We couldn't find any events matching your current filters. Try changing your search keywords or resetting filters.
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
