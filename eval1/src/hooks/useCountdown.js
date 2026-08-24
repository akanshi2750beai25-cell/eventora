import { useState, useEffect } from 'react';

/**
 * Custom hook to calculate real-time countdown to target event date/time
 * Demonstrates useEffect, setInterval, and date math
 * @param {string} targetDate - Date string in format 'YYYY-MM-DD'
 * @param {string} targetTime - Optional time string e.g. '09:30 AM'
 */
export function useCountdown(targetDate, targetTime = "00:00") {
  const calculateTimeLeft = () => {
    try {
      // Parse target date
      const dateStr = targetDate ? `${targetDate} ${targetTime}` : new Date().toISOString();
      const difference = +new Date(dateStr) - +new Date();

      if (difference <= 0 || isNaN(difference)) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false
      };
    } catch {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, targetTime]);

  return timeLeft;
}

export default useCountdown;
