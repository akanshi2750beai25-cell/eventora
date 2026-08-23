/**
 * Utility helper functions for EVENTORA
 */

/**
 * Format currency in Indian Rupees (₹)
 * @param {number} amount
 * @returns {string} e.g. "₹499" or "FREE"
 */
export function formatPrice(amount) {
  if (amount === 0 || amount === '0' || amount === 'Free') {
    return 'FREE';
  }
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

/**
 * Format date into readable string e.g. "Fri, Sep 18, 2026"
 * @param {string} dateStr - 'YYYY-MM-DD'
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return '';
  try {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  } catch {
    return dateStr;
  }
}

/**
 * Generate unique ticket booking ID
 * @returns {string} e.g. "EVT-2026-X89B"
 */
export function generateTicketId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 5; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `EVT-2026-${rand}`;
}
