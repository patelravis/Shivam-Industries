import { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Badge from './Badge';
import { handleImageError } from '../../utils/imageHelper';

function ProductCard({ product, index = 0 }) {
  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/product/${product.slug}`} className="product-card__link">
        <div className="product-card__image-wrap">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="product-card__image"
            onError={handleImageError}
          />
          <div className="product-card__overlay" />
        </div>
        <div className="product-card__body">
          <Badge variant="gold">{product.categoryName}</Badge>
          <h3 className="product-card__name">{product.name}</h3>
          <p className="product-card__desc">{product.shortDescription}</p>
          <span className="product-card__cta">
            View Details <FiArrowRight />
          </span>
        </div>
        <div className="product-card__accent" />
      </Link>
    </motion.article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    categoryName: PropTypes.string,
    shortDescription: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};

export default memo(ProductCard);
