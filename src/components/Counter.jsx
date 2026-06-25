import React, { useEffect, useState, useRef } from 'react';
import { useInView, motion } from 'framer-motion';

export default function Counter({ value, suffix = '', duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [done, setDone]   = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const hasDecimal = String(value).includes('.');
  const numericValue = parseFloat(String(value).replace(/[^0-9.]/g, '')) || 0;

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentRaw = eased * numericValue;
      const current = hasDecimal ? parseFloat(currentRaw.toFixed(2)) : Math.round(currentRaw);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(numericValue);
        setDone(true);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, numericValue, duration, hasDecimal]);

  // Format nicely (add commas for large numbers, support decimals)
  const displayValue = (hasDecimal ? count.toFixed(2) : count.toLocaleString('en-IN')) + suffix;

  return (
    <motion.span
      ref={ref}
      animate={done ? { scale: [1, 1.06, 1] } : {}}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      className="font-mono inline-block"
    >
      {isInView ? displayValue : '0' + suffix}
    </motion.span>
  );
}
