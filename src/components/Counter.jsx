import React, { useEffect, useState, useRef } from 'react';
import { useInView, motion } from 'framer-motion';

export default function Counter({ value, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [done, setDone]   = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Extract numeric part (e.g. "1000" from "1000+", "500" from "500Cr+")
  const numericValue = parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0;

  // Smooth easeOut count-up via requestAnimationFrame
  useEffect(() => {
    if (!isInView) return;

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericValue);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(numericValue);
        setDone(true);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, numericValue, duration]);

  // Format nicely (add commas for large numbers)
  const displayValue = count.toLocaleString('en-IN') + suffix;

  return (
    <motion.span
      ref={ref}
      // Gentle pulse when count-up finishes
      animate={done ? { scale: [1, 1.06, 1] } : {}}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      className="font-mono inline-block"
    >
      {isInView ? displayValue : '0' + suffix}
    </motion.span>
  );
}
