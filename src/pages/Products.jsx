import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage } from 'react-icons/fi';
import Breadcrumb from '../components/ui/Breadcrumb';
import ProductCard from '../components/ui/ProductCard';
import ProductsSidebar from '../components/products/ProductsSidebar';
import ProductsToolbar from '../components/products/ProductsToolbar';
import SEO from '../components/seo/SEO';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { getProductImage, handleImageError } from '../utils/imageHelper';
import { buildBreadcrumbSchema } from '../utils/seoHelper';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let list =
      activeCategory === 'all'
        ? products
        : products.filter((p) => p.category === activeCategory);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, search]);

  const setCategory = (slug) => {
    setSidebarOpen(false);
    if (slug === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  const activeCat = categories.find((c) => c.slug === activeCategory);
  const activeCatName = activeCat?.name;
  const seoTitle = activeCategory === 'all' ? 'All Products' : activeCatName;
  const resultsTitle =
    activeCategory === 'all'
      ? 'All Products'
      : activeCatName || 'Products';

  return (
    <>
      <SEO
        title={seoTitle}
        description={
          activeCategory === 'all'
            ? 'Browse 46+ SS 304/316 GMP-compliant pharmaceutical equipment — lockers, trolleys, HPLC cabinets, IBCs, tables, sinks & accessories. Shivam Industries, Ahmedabad.'
            : `Shop ${activeCatName} — premium stainless steel GMP pharma equipment by Shivam Industries. Custom sizes, SS 304/316 grade, pan-India delivery.`
        }
        keywords={[seoTitle, 'pharmaceutical equipment catalog', 'SS pharma products India']}
        path={activeCategory === 'all' ? '/products' : `/products?category=${activeCategory}`}
        image={
          activeCategory === 'all'
            ? getProductImage('HPLC Column Cabinet')
            : activeCat?.image
        }
        jsonLd={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          ...(activeCategory !== 'all'
            ? [{ name: activeCatName, path: `/products?category=${activeCategory}` }]
            : []),
        ])}
      />

      <motion.main
        className="page-products"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="page-banner page-banner--compact">
          <div className="container">
            <Breadcrumb items={[{ label: 'Products' }]} />
            <h1 className="page-banner__title">Our Products</h1>
            <p className="page-banner__subtitle">
              GMP-compliant SS 304/316 pharmaceutical equipment — {products.length} products across{' '}
              {categories.length} categories.
            </p>
          </div>
        </div>

        <div className="container products-page">
          <AnimatePresence>
            {sidebarOpen && (
              <motion.button
                type="button"
                className="products-sidebar-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                aria-label="Close categories"
              />
            )}
          </AnimatePresence>

          <div className={`products-page__sidebar-wrap ${sidebarOpen ? 'products-page__sidebar-wrap--open' : ''}`}>
            <ProductsSidebar activeCategory={activeCategory} onSelectCategory={setCategory} />
          </div>

          <div className="products-main">
            <div className="products-main__panel">
              <AnimatePresence mode="wait">
                {activeCat ? (
                  <motion.div
                    key={activeCat.slug}
                    className="products-category-banner"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="products-category-banner__image">
                      <img
                        src={activeCat.image}
                        alt={activeCat.name}
                        onError={handleImageError}
                      />
                    </div>
                    <div className="products-category-banner__content">
                      <span className="products-category-banner__label">Category</span>
                      <h2>{activeCat.name}</h2>
                      <p>{filteredProducts.length} products available</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="all"
                    className="products-category-banner products-category-banner--all"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="products-category-banner__icon">
                      <FiPackage aria-hidden="true" />
                    </div>
                    <div className="products-category-banner__content">
                      <span className="products-category-banner__label">Catalog</span>
                      <h2>Full Product Range</h2>
                      <p>{products.length} GMP-compliant SS equipment</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="products-main__toolbar-wrap">
                <ProductsToolbar
                  search={search}
                  onSearchChange={setSearch}
                  resultCount={filteredProducts.length}
                  activeCategoryName={activeCategory !== 'all' ? activeCatName : null}
                  onClearCategory={() => setCategory('all')}
                  onToggleSidebar={() => setSidebarOpen((v) => !v)}
                  sidebarOpen={sidebarOpen}
                />
              </div>
            </div>

            <div className="products-main__body">
              <div className="products-main__body-inner">
                <div className="products-results-head">
                  <h2 className="products-results-head__title">{resultsTitle}</h2>
                  <span className="products-results-head__count">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {filteredProducts.length > 0 ? (
                  <div className="products-grid">
                    {filteredProducts.map((product, i) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={i}
                        variant="catalog"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="products-empty">
                    <p>No products found{search ? ` for "${search}"` : ''}.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch('');
                        setCategory('all');
                      }}
                    >
                      View all products
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </>
  );
}

export default Products;
