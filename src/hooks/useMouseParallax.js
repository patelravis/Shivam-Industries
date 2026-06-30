import { useRef, useEffect } from 'react';
import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

const springConfig = { stiffness: 140, damping: 22, mass: 0.6 };

/**
 * Smooth 3D tilt + parallax based on pointer position within a container.
 * @param {React.RefObject<HTMLElement>} ref
 * @param {{ tilt?: number, move?: number }} options
 */
export function useMouseParallax(ref, options = {}) {
  const { tilt = 14, move = 18 } = options;
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return undefined;

    const onMove = (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      pointerX.set(x * 2);
      pointerY.set(y * 2);
    };

    const onLeave = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    element.addEventListener('mousemove', onMove);
    element.addEventListener('mouseleave', onLeave);

    return () => {
      element.removeEventListener('mousemove', onMove);
      element.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, pointerX, pointerY, prefersReducedMotion]);

  const rotateX = useSpring(
    useTransform(pointerY, [-1, 1], [tilt, -tilt]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-1, 1], [-tilt, tilt]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(pointerX, [-1, 1], [-move, move]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(pointerY, [-1, 1], [-move, move]),
    springConfig
  );
  const glowX = useSpring(
    useTransform(pointerX, [-1, 1], [-move * 1.4, move * 1.4]),
    springConfig
  );
  const glowY = useSpring(
    useTransform(pointerY, [-1, 1], [-move * 1.4, move * 1.4]),
    springConfig
  );

  return {
    rotateX,
    rotateY,
    translateX,
    translateY,
    glowX,
    glowY,
    prefersReducedMotion,
  };
}

export default useMouseParallax;
