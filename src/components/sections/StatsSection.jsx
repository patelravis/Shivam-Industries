import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { stats } from '../../data/company';

function AnimatedCounter({ value, suffix, inView }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span className="stats__number">
      {count}
      {suffix}
    </span>
  );
}

function StatsSection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="stats" ref={ref}>
      <div className="container stats__grid">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="stats__item"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
            <span className="stats__label">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;
