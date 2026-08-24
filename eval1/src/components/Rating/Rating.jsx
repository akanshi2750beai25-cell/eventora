import './Rating.css';
import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function Rating({
  value = 5,
  onChange = null,
  max = 5,
  size = 18,
  showLabel = false,
  readOnly = false
}) {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (starIndex) => {
    if (!readOnly && onChange) {
      onChange(starIndex);
    }
  };

  const labels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <div className="stars-display">
        {Array.from({ length: max }, (_, index) => {
          const starIndex = index + 1;
          const isFilled = hoverValue ? starIndex <= hoverValue : starIndex <= value;

          return (
            <span
              key={starIndex}
              className={!readOnly ? 'star-interactive' : ''}
              onMouseEnter={() => !readOnly && setHoverValue(starIndex)}
              onMouseLeave={() => !readOnly && setHoverValue(0)}
              onClick={() => handleClick(starIndex)}
              role={!readOnly ? 'button' : 'img'}
              aria-label={`${starIndex} star`}
            >
              <Star
                size={size}
                fill={isFilled ? 'var(--accent-gold)' : 'transparent'}
                color={isFilled ? 'var(--accent-gold)' : 'var(--text-muted)'}
                strokeWidth={2}
              />
            </span>
          );
        })}
      </div>
      {showLabel && (
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {hoverValue ? labels[hoverValue] : labels[Math.round(value)] || `${value.toFixed(1)} / 5`}
        </span>
      )}
    </div>
  );
}
