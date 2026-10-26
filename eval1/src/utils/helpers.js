/**
 * Utility helper functions for EVENTORA
 * Divided across project modules (Priyanshi & Akanshi)
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

/**
 * Group Bill Splitting Calculation with Exact Remainder Distribution
 * (Requirement #6: Signature Group Booking Feature)
 * @param {number} totalAmount - Total payable amount in rupees
 * @param {number} count - Number of attendees (e.g. 4)
 * @returns {Array<{name: string, share: number}>}
 */
export function calculateEqualSplit(totalAmount, attendees) {
  const count = attendees.length;
  if (count <= 0) return [];
  const baseShare = Math.floor(totalAmount / count);
  const remainder = totalAmount % count;

  return attendees.map((att, idx) => {
    // Add 1 rupee to first 'remainder' people so exact total is preserved
    const adjustedShare = idx < remainder ? baseShare + 1 : baseShare;
    return {
      ...att,
      share: adjustedShare
    };
  });
}

/**
 * Download or Print Consolidated Event Receipt / PDF
 * (Requirement #8: Downloadable PDF Receipts & Tickets)
 * @param {object} booking
 */
export function printPdfReceipt(booking) {
  if (!booking) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const isGroup = booking.isGroupBooking && booking.groupAttendees?.length > 0;
  const qrData = encodeURIComponent(`EVENTORA-OFFICIAL|${booking.bookingId}|${booking.eventTitle}|${booking.totalAmount}`);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}&margin=8&color=0f172a`;

  const attendeesRows = isGroup
    ? booking.groupAttendees
        .map(
          (a, i) => `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px; font-weight: 600;">Attendee ${i + 1}: ${a.name}</td>
          <td style="padding: 10px; color: #64748b;">${a.studentId || 'STU-ID'}</td>
          <td style="padding: 10px; text-align: right; font-weight: 700; color: #0f172a;">₹${a.share || Math.round(booking.totalAmount / booking.groupAttendees.length)}</td>
        </tr>`
        )
        .join('')
    : `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px; font-weight: 600;">${booking.attendeeName}</td>
        <td style="padding: 10px; color: #64748b;">${booking.studentId || 'General Attendee'}</td>
        <td style="padding: 10px; text-align: right; font-weight: 700; color: #0f172a;">${formatPrice(booking.totalAmount)}</td>
      </tr>`;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>EVENTORA-Booking-${booking.bookingId}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #0f172a; max-width: 800px; margin: 0 auto; background: #ffffff; }
          .receipt-box { border: 2px solid #0f172a; border-radius: 12px; padding: 32px; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 24px; }
          .logo { font-size: 28px; font-weight: 900; letter-spacing: -1px; }
          .badge { background: #002970; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; }
          .meta-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          th { background: #f8fafc; text-align: left; padding: 10px; font-size: 13px; color: #475569; border-bottom: 2px solid #cbd5e1; }
          .total-box { display: flex; justify-content: space-between; font-size: 20px; font-weight: 800; border-top: 2px solid #0f172a; padding-top: 14px; margin-bottom: 24px; }
          .footer-notes { font-size: 12px; color: #64748b; line-height: 1.6; border-top: 1px dashed #cbd5e1; padding-top: 16px; }
        </style>
      </head>
      <body>
        <div class="receipt-box">
          <div class="header">
            <div>
              <div class="logo">EVENTORA<span style="color:#00baf2">.</span></div>
              <div style="font-size: 12px; color: #64748b; margin-top: 4px;">OFFICIAL CAMPUS PASS RECEIPT & ENTRY TICKET</div>
            </div>
            <div style="text-align: right;">
              <span class="badge">PAYMENT CONFIRMED</span>
              <div style="font-size: 13px; font-weight: 700; margin-top: 6px;">REF: ${booking.bookingId}</div>
            </div>
          </div>

          <div class="meta-grid">
            <div>
              <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Event Title</div>
              <div style="font-size: 18px; font-weight: 800; margin-top: 2px;">${booking.eventTitle}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Date & Time</div>
              <div style="font-size: 15px; font-weight: 700; margin-top: 2px;">${formatDate(booking.date)} at ${booking.time}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Venue Location</div>
              <div style="font-size: 14px; font-weight: 600; margin-top: 2px;">${booking.venue}, ${booking.city}</div>
            </div>
            <div>
              <div style="font-size: 12px; color: #64748b; text-transform: uppercase;">Payment Gateway</div>
              <div style="font-size: 14px; font-weight: 600; margin-top: 2px;">${booking.paymentMethod || 'Paytm UPI'} (Txn: ${booking.transactionRef || 'PTM-CONFIRMED'})</div>
            </div>
          </div>

          ${isGroup ? `<div style="background: #f1f5f9; padding: 8px 12px; border-radius: 6px; font-size: 13px; font-weight: 700; margin-bottom: 14px;">Group Name: ${booking.groupName || 'College Friends Group'} (${booking.quantity} Passes Consolidated)</div>` : ''}

          <table>
            <thead>
              <tr>
                <th>Attendee Name</th>
                <th>Student / Roll ID</th>
                <th style="text-align: right;">Cost Share</th>
              </tr>
            </thead>
            <tbody>
              ${attendeesRows}
            </tbody>
          </table>

          <div class="total-box">
            <span>Total Amount Paid</span>
            <span style="color: #002970;">${formatPrice(booking.totalAmount)}</span>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; padding: 14px; background: #f8fafc; border-radius: 8px;">
            <div>
              <strong style="display: block; font-size: 14px;">Official Checkpoint QR Code</strong>
              <span style="font-size: 12px; color: #64748b;">Present this QR code or printed receipt at the college entrance</span>
            </div>
            <img src="${qrUrl}" width="100" height="100" alt="Ticket QR" style="border: 2px solid #0f172a; border-radius: 6px;" />
          </div>

          <div class="footer-notes">
            <strong>Cancellation & Refund Policy:</strong> Cancellations permitted up to 24 hours prior to the event schedule through the Eventora student dashboard. Valid college student photo ID is required for verification at the campus entrance checkpoint.
          </div>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
