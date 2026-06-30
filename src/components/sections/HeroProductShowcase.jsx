import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import useMouseParallax from '../../hooks/useMouseParallax';
import { getProductImage, handleImageError } from '../../utils/imageHelper';
import { getProductBySlug } from '../../data/products';

const featuredSlug = 'hplc-column-cabinet';
const featured = getProductBySlug(featuredSlug);

function HeroProductShowcase() {
  const containerRef = useRef(null);
  const {
    rotateX,
    rotateY,
    translateX,
    translateY,
    glowX,
    glowY,
    prefersReducedMotion,
  } = useMouseParallax(containerRef, { tilt: 16, move: 22 });

  if (!featured) return null;

  const cardStyle = prefersReducedMotion
    ? {}
    : {
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        transformPerspective: 1200,
      };

  const glowStyle = prefersReducedMotion
    ? {}
    : { x: glowX, y: glowY };

  return (
    <div className="hero-showcase" ref={containerRef}>
      <motion.div
        className="hero-showcase__glow hero-showcase__glow--gold"
        style={glowStyle}
        aria-hidden="true"
      />
      <motion.div
        className="hero-showcase__glow hero-showcase__glow--blue"
        style={glowStyle}
        aria-hidden="true"
      />

      <motion.div
        className="hero-showcase__ring hero-showcase__ring--outer"
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <motion.div
        className="hero-showcase__ring hero-showcase__ring--inner"
        animate={{ rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />

      <motion.div
        className="hero-showcase__card"
        style={cardStyle}
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to={`/product/${featured.slug}`} className="hero-showcase__link">
          <span className="hero-showcase__label">Featured Product</span>

          <div className="hero-showcase__image-wrap">
            <img
              src={getProductImage(featured.name)}
              alt={featured.name}
              className="hero-showcase__image"
              loading="eager"
              onError={handleImageError}
            />
            <div className="hero-showcase__shine" aria-hidden="true" />
          </div>

          <div className="hero-showcase__info">
            <h3 className="hero-showcase__name">{featured.name}</h3>
            <p className="hero-showcase__desc">{featured.shortDescription}</p>
            <span className="hero-showcase__cta">
              View Details <FiArrowUpRight aria-hidden="true" />
            </span>
          </div>
        </Link>
      </motion.div>

      <p className="hero-showcase__hint">
        {prefersReducedMotion ? 'Tap to explore' : 'Move mouse to explore'}
      </p>
    </div>
  );
}

export default HeroProductShowcase;
