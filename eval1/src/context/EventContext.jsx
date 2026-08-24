import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialEvents } from '../data/eventsData';
import { initialReviews } from '../data/reviewsData';
import { generateTicketId } from '../utils/helpers';

const EventContext = createContext();

export function EventProvider({ children }) {
  // 1. Events State with LocalStorage
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('eventora_events');
      return saved ? JSON.parse(saved) : initialEvents;
    } catch {
      return initialEvents;
    }
  });

  // 2. Bookings State (Digital Tickets)
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('eventora_bookings');
      if (saved) return JSON.parse(saved);

      // Default sample booking so viva evaluators immediately see a live ticket
      return [
        {
          id: 'bk-101',
          bookingId: 'EVT-2026-N89B',
          eventId: 'evt-1',
          eventTitle: 'National AI & Machine Learning Summit 2026',
          category: 'Technology',
          date: '2026-09-18',
          time: '09:30 AM',
          venue: 'Main Auditorium, Campus Block A',
          city: 'Chandigarh',
          attendeeName: 'Akanshi Sharma',
          attendeeEmail: 'akanshi.cse@eventora.edu',
          ticketTier: 'Student Pass',
          quantity: 2,
          selectedSeats: ['A4', 'A5'],
          unitPrice: 199,
          totalAmount: 398,
          paymentMethod: 'UPI (Google Pay)',
          status: 'Confirmed',
          bookedAt: '2026-08-20T10:30:00.000Z',
          qrCodeData: 'EVT-2026-N89B|A4,A5|Akanshi'
        }
      ];
    } catch {
      return [];
    }
  });

  // 3. Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('eventora_wishlist');
      return saved ? JSON.parse(saved) : ['evt-1', 'evt-2'];
    } catch {
      return ['evt-1', 'evt-2'];
    }
  });

  // 4. Reviews State
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('eventora_reviews');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // 5. Toast Notifications
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('eventora_events', JSON.stringify(events));
    } catch (e) {
      console.warn('Events storage error:', e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('eventora_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.warn('Bookings storage error:', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('eventora_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Wishlist storage error:', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('eventora_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.warn('Reviews storage error:', e);
    }
  }, [reviews]);

  // Trigger Toast Notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Toggle Wishlist Item
  const toggleWishlist = (eventId) => {
    if (wishlist.includes(eventId)) {
      setWishlist((prev) => prev.filter((id) => id !== eventId));
      showToast('Removed from your Wishlist', 'info');
    } else {
      setWishlist((prev) => [...prev, eventId]);
      showToast('Added to your Wishlist ❤️', 'success');
    }
  };

  const isWishlisted = (eventId) => wishlist.includes(eventId);

  // Create Event (Organizer)
  const addEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: `evt-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      availableSeats: Number(eventData.totalSeats) || 100,
      totalSeats: Number(eventData.totalSeats) || 100,
      price: Number(eventData.price) || 0,
      isFeatured: false,
      isTrending: true,
      ticketTiers: eventData.ticketTiers || [
        { id: 'tier-std', name: 'Standard Pass', price: Number(eventData.price) || 0, perks: 'Standard event access' }
      ]
    };
    setEvents((prev) => [newEvent, ...prev]);
    showToast('Event created successfully!', 'success');
    return newEvent;
  };

  // Update Event
  const updateEvent = (id, updatedData) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updatedData } : e))
    );
    showToast('Event updated successfully!', 'success');
  };

  // Delete Event
  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('Event deleted successfully', 'info');
  };

  // Admin Event Approval
  const approveEvent = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isApproved: true } : e))
    );
    showToast('Event approved for public listing', 'success');
  };

  const rejectEvent = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isApproved: false } : e))
    );
    showToast('Event rejected', 'info');
  };

  // Create Booking
  const createBooking = (bookingPayload) => {
    const newBooking = {
      ...bookingPayload,
      id: `bk-${Date.now()}`,
      bookingId: generateTicketId(),
      status: 'Confirmed',
      bookedAt: new Date().toISOString()
    };

    // Decrement available seats in event
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === bookingPayload.eventId) {
          const qty = Number(bookingPayload.quantity) || 1;
          return {
            ...e,
            availableSeats: Math.max(0, (e.availableSeats || 50) - qty)
          };
        }
        return e;
      })
    );

    setBookings((prev) => [newBooking, ...prev]);
    showToast('🎉 Booking Confirmed! Digital ticket generated.', 'success');
    return newBooking;
  };

  // Cancel Booking
  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' } : b))
    );
    showToast('Booking cancelled. Demo refund processed.', 'info');
  };

  // Add Review
  const addReview = (eventId, reviewData) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      eventId,
      ...reviewData,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews((prev) => [newReview, ...prev]);

    // Recalculate event average rating
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          const currentCount = e.reviewsCount || 0;
          const currentRating = e.rating || 5;
          const newRating = Number(
            ((currentRating * currentCount + Number(reviewData.rating)) / (currentCount + 1)).toFixed(1)
          );
          return {
            ...e,
            rating: newRating,
            reviewsCount: currentCount + 1
          };
        }
        return e;
      })
    );

    showToast('Review submitted! Thank you.', 'success');
  };

  return (
    <EventContext.Provider
      value={{
        events,
        bookings,
        wishlist,
        reviews,
        toast,
        showToast,
        toggleWishlist,
        isWishlisted,
        addEvent,
        updateEvent,
        deleteEvent,
        approveEvent,
        rejectEvent,
        createBooking,
        cancelBooking,
        addReview
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}
