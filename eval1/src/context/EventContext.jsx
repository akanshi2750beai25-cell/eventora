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

  // 2. Bookings State (Digital Tickets & Group Bookings)
  const [bookings, setBookings] = useState(() => {
    try {
      const saved = localStorage.getItem('eventora_bookings');
      if (saved) return JSON.parse(saved);

      // Default sample bookings
      return [
        {
          id: 'bk-101',
          bookingId: 'EVT-2026-N89B',
          eventId: 'evt-1',
          eventTitle: 'National AI & Machine Learning Summit 2026',
          category: 'Technology',
          date: '2026-11-18',
          time: '09:30 AM',
          venue: 'Main Auditorium, Campus Block A',
          city: 'Chandigarh',
          attendeeName: 'Akanshi Sharma',
          attendeeEmail: 'akanshi.cse@eventora.edu',
          studentId: '2026-CSE-AIML-042',
          ticketTier: 'Student Pass',
          quantity: 2,
          unitPrice: 199,
          totalAmount: 398,
          paymentMethod: 'Paytm UPI',
          transactionRef: 'PTM892104829104',
          status: 'Confirmed',
          bookedAt: '2026-10-18T10:30:00.000Z',
          isGroupBooking: false
        },
        {
          id: 'bk-102',
          bookingId: 'EVT-2026-GRP4',
          eventId: 'evt-2',
          eventTitle: 'Pulse 2026 — Annual College Rock & Fusion Fest',
          category: 'Music',
          date: '2026-11-22',
          time: '06:00 PM',
          venue: 'Campus Open Air Amphitheatre',
          city: 'Chandigarh',
          attendeeName: 'Akanshi Sharma',
          attendeeEmail: 'akanshi.cse@eventora.edu',
          studentId: '2026-CSE-AIML-042',
          ticketTier: 'General Entry',
          quantity: 4,
          unitPrice: 249,
          totalAmount: 996,
          paymentMethod: 'Paytm UPI',
          transactionRef: 'PTM481903829184',
          status: 'Confirmed',
          bookedAt: '2026-10-19T14:15:00.000Z',
          isGroupBooking: true,
          groupName: 'Hostel 4 Squad',
          groupAttendees: [
            { name: 'Akanshi Sharma', studentId: '2026-CSE-042', share: 249 },
            { name: 'Mridul Verma', studentId: '2026-CSE-058', share: 249 },
            { name: 'Priyanshi Saxena', studentId: '2026-CSE-084', share: 249 },
            { name: 'Kuvum Rajput', studentId: '2026-CSE-019', share: 249 }
          ]
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

  // 4. Notifications State (Requirement #11)
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('eventora_notifications');
      if (saved) return JSON.parse(saved);

      return [
        {
          id: 'notif-1',
          title: 'Booking Confirmed: Group Pass',
          message: 'Your 4-person group pass for Pulse 2026 Rock Fest has been confirmed via Paytm.',
          date: '2 hours ago',
          type: 'booking',
          read: false
        },
        {
          id: 'notif-2',
          title: 'New Hackathon Opened: HackArena 2026',
          message: 'Computer Science Society opened 100 free registrations for the 36-hour hackathon.',
          date: '5 hours ago',
          type: 'event',
          read: false
        },
        {
          id: 'notif-3',
          title: 'Event Reminder: AI Summit',
          message: 'National AI & Machine Learning Summit begins this weekend at Main Auditorium.',
          date: '1 day ago',
          type: 'reminder',
          read: true
        },
        {
          id: 'notif-4',
          title: 'Campus Entry Note',
          message: 'Please keep your college student photo ID ready along with your digital QR boarding pass.',
          date: '2 days ago',
          type: 'info',
          read: true
        }
      ];
    } catch {
      return [];
    }
  });

  // 5. Reviews State
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('eventora_reviews');
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // 6. Toast Notifications
  const [toast, setToast] = useState(null);

  // Sync state changes to localStorage
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
      localStorage.setItem('eventora_notifications', JSON.stringify(notifications));
    } catch (e) {
      console.warn('Notifications storage error:', e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('eventora_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.warn('Reviews storage error:', e);
    }
  }, [reviews]);

  // Toast Trigger
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Wishlist Functions
  const toggleWishlist = (eventId) => {
    setWishlist((prev) => {
      const exists = prev.includes(eventId);
      if (exists) {
        showToast('Removed from saved wishlist', 'info');
        return prev.filter((id) => id !== eventId);
      } else {
        showToast('Added to saved wishlist ❤️', 'success');
        return [...prev, eventId];
      }
    });
  };

  const isWishlisted = (eventId) => wishlist.includes(eventId);

  // Event CRUD Operations (Organizer / Admin)
  const addEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: `evt-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
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

  const updateEvent = (id, updatedData) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updatedData } : e))
    );
    showToast('Event updated successfully!', 'success');
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('Event deleted successfully', 'info');
  };

  const approveEvent = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isApproved: true } : e))
    );
    showToast('Event approved for campus catalog', 'success');
  };

  const rejectEvent = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, isApproved: false } : e))
    );
    showToast('Event listing rejected', 'info');
  };

  // Booking Operations
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

    // Add notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Booking Confirmed',
      message: `Pass for ${bookingPayload.eventTitle} confirmed (${bookingPayload.quantity} ticket/s).`,
      date: 'Just now',
      type: 'booking',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);

    setBookings((prev) => [newBooking, ...prev]);
    showToast('Pass confirmed! Digital ticket issued.', 'success');
    return newBooking;
  };

  // Cancellation & Refund Flow (Requirement #7)
  const cancelBooking = (bookingId, reason = 'Student requested cancellation') => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId || b.bookingId === bookingId) {
          return {
            ...b,
            status: 'Cancelled',
            refundStatus: 'Processing',
            refundAmount: b.totalAmount,
            cancellationReason: reason,
            cancelledAt: new Date().toISOString()
          };
        }
        return b;
      })
    );

    // Add refund notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Refund Processing',
      message: `Cancellation initiated for booking #${bookingId}. Refund status updated.`,
      date: 'Just now',
      type: 'refund',
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('Booking cancelled. Demo refund initiated.', 'info');
  };

  // Admin / Organizer: Approve Refund
  const approveRefund = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, refundStatus: 'Refunded' } : b))
    );
    showToast('Refund approved and settled to attendee account.', 'success');
  };

  // Notification Operations
  const markNotificationRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

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

  // Demo Reset Button (Requirement #17: 1-click button so user can repeat live presentation)
  const resetDemoData = () => {
    try {
      localStorage.removeItem('eventora_events');
      localStorage.removeItem('eventora_bookings');
      localStorage.removeItem('eventora_wishlist');
      localStorage.removeItem('eventora_notifications');
      localStorage.removeItem('eventora_reviews');
      setEvents(initialEvents);
      setWishlist(['evt-1', 'evt-2']);
      setBookings([
        {
          id: 'bk-101',
          bookingId: 'EVT-2026-N89B',
          eventId: 'evt-1',
          eventTitle: 'National AI & Machine Learning Summit 2026',
          category: 'Technology',
          date: '2026-11-18',
          time: '09:30 AM',
          venue: 'Main Auditorium, Campus Block A',
          city: 'Chandigarh',
          attendeeName: 'Akanshi Sharma',
          attendeeEmail: 'akanshi.cse@eventora.edu',
          studentId: '2026-CSE-AIML-042',
          ticketTier: 'Student Pass',
          quantity: 2,
          unitPrice: 199,
          totalAmount: 398,
          paymentMethod: 'Paytm UPI',
          transactionRef: 'PTM892104829104',
          status: 'Confirmed',
          bookedAt: '2026-10-18T10:30:00.000Z',
          isGroupBooking: false
        }
      ]);
      showToast('Demo data reset to fresh state! Ready for presentation.', 'info');
    } catch (e) {
      console.warn('Reset error:', e);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        bookings,
        wishlist,
        notifications,
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
        approveRefund,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationCount,
        addReview,
        resetDemoData
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
