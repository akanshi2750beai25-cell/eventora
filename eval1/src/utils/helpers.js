/**
 * =====================================================
 * helpers.js — Mridul Bhardwaj (Eval 1)
 * Utility functions for EVENTORA Search & Discovery
 * =====================================================
 */

/* ─────────────────────────────────────────────────────
   1.  formatPrice
   Format an amount in Indian Rupees (₹)
   @param {number} amount
   @returns {string}  e.g. "₹499" | "FREE"
──────────────────────────────────────────────────────── */
export function formatPrice(amount) {
  if (amount === 0 || amount === '0' || amount === 'Free') {
    return 'FREE';
  }
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

/* ─────────────────────────────────────────────────────
   2.  formatDate
   Format ISO date string → "Fri, Sep 18, 2026"
   @param {string} dateStr  — 'YYYY-MM-DD'
   @returns {string}
──────────────────────────────────────────────────────── */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  } catch {
    return dateStr;
  }
}

/* ─────────────────────────────────────────────────────
   3.  generateTicketId
   Generate a unique ticket booking reference ID
   @returns {string}  e.g. "EVT-2026-X89B3"
──────────────────────────────────────────────────────── */
export function generateTicketId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 5; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `EVT-2026-${rand}`;
}

/* ─────────────────────────────────────────────────────
   4.  truncateText
   Truncate text to a max character length with ellipsis
   @param {string} text
   @param {number} maxLength  (default 100)
   @returns {string}
──────────────────────────────────────────────────────── */
export function truncateText(text, maxLength = 100) {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/* ─────────────────────────────────────────────────────
   5.  getBudgetLabel
   Convert a budget filter key to a human-readable label
   @param {string} budgetKey
   @returns {string}
──────────────────────────────────────────────────────── */
export function getBudgetLabel(budgetKey) {
  const labels = {
    all:      'All Budgets',
    free:     'Free (₹0)',
    under200: 'Under ₹200',
    '200to500': '₹200 – ₹500',
    above500: 'Above ₹500',
  };
  return labels[budgetKey] || budgetKey;
}

/* ─────────────────────────────────────────────────────
   6.  getDaysUntil
   Calculate number of days between today and a future date
   @param {string} dateStr — 'YYYY-MM-DD'
   @returns {number}  negative if past, 0 if today
──────────────────────────────────────────────────────── */
export function getDaysUntil(dateStr) {
  if (!dateStr) return null;
  const event = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  event.setHours(0, 0, 0, 0);
  return Math.round((event - today) / (1000 * 60 * 60 * 24));
}

/* ─────────────────────────────────────────────────────
   7.  getUrgencyLabel
   Return a seat-urgency label based on seats remaining
   @param {number} seats
   @returns {{ label: string, variant: 'critical'|'low'|'normal' }}
──────────────────────────────────────────────────────── */
export function getUrgencyLabel(seats) {
  if (seats === 0) return { label: 'Sold Out', variant: 'critical' };
  if (seats <= 10)  return { label: `Only ${seats} left!`, variant: 'critical' };
  if (seats <= 30)  return { label: `${seats} seats left`, variant: 'low' };
  return { label: `${seats} seats`, variant: 'normal' };
}

/* ─────────────────────────────────────────────────────
   8.  sortEvents
   Sort an array of events by a given key
   @param {Array}  events
   @param {string} sortBy — 'trending'|'date'|'rating'|'priceLow'|'priceHigh'
   @returns {Array}
──────────────────────────────────────────────────────── */
export function sortEvents(events, sortBy = 'trending') {
  const copy = [...events];
  switch (sortBy) {
    case 'priceLow':
      return copy.sort((a, b) => a.price - b.price);
    case 'priceHigh':
      return copy.sort((a, b) => b.price - a.price);
    case 'rating':
      return copy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'date':
      return copy.sort((a, b) => new Date(a.date) - new Date(b.date));
    case 'trending':
    default:
      return copy.sort((a, b) => {
        if (a.isTrending && !b.isTrending) return -1;
        if (!a.isTrending && b.isTrending) return 1;
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      });
  }
}

/* ─────────────────────────────────────────────────────
   9.  filterEventsByBudget
   Filter events array by student budget tier
   @param {Array}  events
   @param {string} budget — 'all'|'free'|'under200'|'200to500'|'above500'
   @returns {Array}
──────────────────────────────────────────────────────── */
export function filterEventsByBudget(events, budget) {
  if (!budget || budget === 'all') return events;
  return events.filter((event) => {
    if (budget === 'free')     return event.price === 0;
    if (budget === 'under200') return event.price > 0 && event.price <= 200;
    if (budget === '200to500') return event.price > 200 && event.price <= 500;
    if (budget === 'above500') return event.price > 500;
    return true;
  });
}

/* ─────────────────────────────────────────────────────
   10. searchEvents
   Full-text keyword search across multiple event fields
   @param {Array}  events
   @param {string} query
   @returns {Array}
──────────────────────────────────────────────────────── */
export function searchEvents(events, query) {
  if (!query || !query.trim()) return events;
  const q = query.toLowerCase().trim();
  return events.filter((event) => {
    return (
      event.title?.toLowerCase().includes(q) ||
      event.category?.toLowerCase().includes(q) ||
      event.city?.toLowerCase().includes(q) ||
      event.venue?.toLowerCase().includes(q) ||
      event.description?.toLowerCase().includes(q) ||
      event.organizer?.name?.toLowerCase().includes(q) ||
      event.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  });
}

/* ─────────────────────────────────────────────────────
   11. getEventCategoryCounts
   Build a { categoryName: count } map from an events array
   @param {Array} events
   @returns {Object}
──────────────────────────────────────────────────────── */
export function getEventCategoryCounts(events) {
  return events.reduce((acc, event) => {
    const cat = event.category || 'Other';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
}

/* ─────────────────────────────────────────────────────
   12. getTopCities
   Return an array of unique city names from events
   @param {Array} events
   @returns {string[]}
──────────────────────────────────────────────────────── */
export function getTopCities(events) {
  const cities = events.map((e) => e.city).filter(Boolean);
  return [...new Set(cities)].sort();
}

/* ─────────────────────────────────────────────────────
   13. formatRelativeDate
   Return a human-friendly relative date string
   @param {string} dateStr
   @returns {string}  e.g. "Tomorrow", "In 5 days", "Yesterday"
──────────────────────────────────────────────────────── */
export function formatRelativeDate(dateStr) {
  const days = getDaysUntil(dateStr);
  if (days === null) return '';
  if (days === 0)  return 'Today';
  if (days === 1)  return 'Tomorrow';
  if (days === -1) return 'Yesterday';
  if (days > 1 && days <= 30) return `In ${days} days`;
  if (days < -1)  return `${Math.abs(days)} days ago`;
  return formatDate(dateStr);
}

/* ─────────────────────────────────────────────────────
   14. calculateDiscount
   Calculate discounted price for student promo codes
   @param {number} price
   @param {string} code
   @returns {{ discountedPrice: number, savings: number, valid: boolean }}
──────────────────────────────────────────────────────── */
const PROMO_CODES = {
  STUDENT50:  0.50,
  CAMPUS2026: 0.20,
  FEST10:     0.10,
};

export function calculateDiscount(price, code) {
  if (!code || !price || price === 0) {
    return { discountedPrice: price, savings: 0, valid: false };
  }
  const rate = PROMO_CODES[code.toUpperCase()];
  if (!rate) {
    return { discountedPrice: price, savings: 0, valid: false };
  }
  const savings         = Math.round(price * rate);
  const discountedPrice = price - savings;
  return { discountedPrice, savings, valid: true };
}

/* ─────────────────────────────────────────────────────
   15. groupEventsByDate
   Group an events array into { dateStr: [event, ...] }
   @param {Array} events
   @returns {Object}
──────────────────────────────────────────────────────── */
export function groupEventsByDate(events) {
  return events.reduce((groups, event) => {
    const key = event.date || 'Unknown';
    if (!groups[key]) groups[key] = [];
    groups[key].push(event);
    return groups;
  }, {});
}
