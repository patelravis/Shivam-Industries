import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiGrid } from 'react-icons/fi';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import { handleImageError } from '../../utils/imageHelper';

function ProductsSidebar({ activeCategory, onSelectCategory }) {
  const [expandedCats, setExpandedCats] = useState({});

  useEffect(() => {
    if (activeCategory !== 'all') {
      setExpandedCats({ [activeCategory]: true });
    }
  }, [activeCategory]);

  const toggleCat = (slug, e) => {
    e.stopPropagation();
    setExpandedCats((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const getCategoryCount = (slug) =>
    products.filter((p) => p.category === slug).length;

  return (
    <aside className="products-sidebar">
      <div className="products-sidebar__header">
        <FiGrid aria-hidden="true" />
        <span>Categories</span>
      </div>

      <button
        type="button"
        className={`products-sidebar__all ${activeCategory === 'all' ? 'products-sidebar__all--active' : ''}`}
        onClick={() => onSelectCategory('all')}
      >
        <span className="products-sidebar__all-label">All Products</span>
        <span className="products-sidebar__badge">{products.length}</span>
      </button>

      <nav className="products-sidebar__nav" aria-label="Product categories">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          const isExpanded = !!expandedCats[cat.slug];
          const count = getCategoryCount(cat.slug);

          return (
            <div
              key={cat.slug}
              className={`products-sidebar__group ${isActive ? 'products-sidebar__group--active' : ''}`}
            >
              <div className="products-sidebar__row">
                <button
                  type="button"
                  className={`products-sidebar__cat ${isActive ? 'products-sidebar__cat--active' : ''}`}
                  onClick={() => onSelectCategory(cat.slug)}
                >
                  <span className="products-sidebar__thumb">
                    <img
                      src={cat.image}
                      alt=""
                      loading="lazy"
                      onError={handleImageError}
                    />
                  </span>
                  <span className="products-sidebar__cat-name">{cat.name}</span>
                  <span className="products-sidebar__badge">{count}</span>
                </button>
                {cat.products.length > 1 && (
                  <button
                    type="button"
                    className={`products-sidebar__toggle ${isExpanded ? 'products-sidebar__toggle--open' : ''}`}
                    onClick={(e) => toggleCat(cat.slug, e)}
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${cat.name} subcategories`}
                  >
                    <FiChevronDown />
                  </button>
                )}
              </div>

              <AnimatePresence initial={false}>
                {isExpanded && cat.products.length > 0 && (
                  <motion.ul
                    className="products-sidebar__subs"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  >
                    {cat.products.map((name) => {
                      const prod = products.find((p) => p.name === name);
                      if (!prod) return null;
                      return (
                        <li key={prod.slug}>
                          <Link
                            to={`/product/${prod.slug}`}
                            className="products-sidebar__sub-link"
                          >
                            {name}
                          </Link>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

ProductsSidebar.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default ProductsSidebar;
