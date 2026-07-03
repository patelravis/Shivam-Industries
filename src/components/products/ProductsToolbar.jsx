import PropTypes from 'prop-types';
import { FiSearch, FiX, FiSliders } from 'react-icons/fi';

function ProductsToolbar({
  search,
  onSearchChange,
  resultCount,
  activeCategoryName,
  onClearCategory,
  onToggleSidebar,
  sidebarOpen,
}) {
  return (
    <div className="products-toolbar">
      <div className="products-toolbar__search">
        <FiSearch className="products-toolbar__search-icon" aria-hidden="true" />
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="products-toolbar__input"
          aria-label="Search products"
        />
        {search && (
          <button
            type="button"
            className="products-toolbar__clear"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
      </div>

      <div className="products-toolbar__meta">
        <span className="products-toolbar__count">{resultCount} products</span>
        {activeCategoryName && (
          <button type="button" className="products-toolbar__chip" onClick={onClearCategory}>
            {activeCategoryName}
            <FiX aria-hidden="true" />
          </button>
        )}
        <button
          type="button"
          className={`products-toolbar__filter-btn ${sidebarOpen ? 'products-toolbar__filter-btn--active' : ''}`}
          onClick={onToggleSidebar}
          aria-expanded={sidebarOpen}
          aria-label="Toggle categories"
        >
          <FiSliders />
          <span>Categories</span>
        </button>
      </div>
    </div>
  );
}

ProductsToolbar.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  resultCount: PropTypes.number.isRequired,
  activeCategoryName: PropTypes.string,
  onClearCategory: PropTypes.func.isRequired,
  onToggleSidebar: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
};

export default ProductsToolbar;
