import { useInView } from 'react-intersection-observer';
import { useReducedMotion } from 'framer-motion';

export function useScrollAnimation(options = {}) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
    ...options,
  });

  return {
    ref,
    inView: prefersReducedMotion ? true : inView,
    prefersReducedMotion,
  };
}

export default useScrollAnimation;
