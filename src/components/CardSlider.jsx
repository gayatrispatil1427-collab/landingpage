import React from 'react';

export default function CardSlider({
  items,
  renderItem,
  duration = 30 // Duration in seconds for a full loop iteration
}) {
  if (!items || items.length === 0) return null;

  // Duplicate items array to make the infinite scrolling marquee visually seamless:
  // [Set 1, Set 2]
  const duplicatedItems = [...items, ...items];

  return (
    <div className="ticker-container py-4">
      <div 
        className="ticker-track" 
        style={{ '--ticker-duration': `${duration}s` }}
      >
        {duplicatedItems.map((item, idx) => (
          <div 
            key={idx} 
            className="ticker-card-wrapper"
          >
            {renderItem(item, idx % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
