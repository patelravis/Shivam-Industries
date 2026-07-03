import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage } from 'react-icons/fi';
import Breadcrumb from '../components/ui/Breadcrumb';
import ProductCard from '../components/ui/ProductCard';
import ProductsSidebar from '../components/products/ProductsSidebar';
import ProductsToolbar from '../components/products/ProductsToolbar';
import SEO from '../components/seo/SEO';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { company } from '../data/company';
import { getProductImage, handleImageError } from '../utils/imageHelper';
import { buildBreadcrumbSchema, buildItemListSchema } from '../utils/seoHelper';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const urlSearch = searchParams.get('search') || '';
  const [search, setSearch] = useState(urlSearch);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const updateSearchParams = (category, searchTerm) => {
    const params = {};
    if (category && category !== 'all') params.category = category;
    if (searchTerm.trim()) params.search = searchTerm.trim();
    setSearchParams(params);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    updateSearchParams(activeCategory, value);
  };

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
    updateSearchParams(slug === 'all' ? null : slug, search);
  };

  const activeCat = categories.find((c) => c.slug === activeCategory);
  const activeCatName = activeCat?.name;
  const seoTitle = activeCategory === 'all' ? 'SS Pharma Equipment Catalog' : `${activeCatName} — SS Products`;
  const seoPath =
    activeCategory === 'all' && !urlSearch
      ? '/products'
      : `/products?${new URLSearchParams({
          ...(activeCategory !== 'all' ? { category: activeCategory } : {}),
          ...(urlSearch ? { search: urlSearch } : {}),
        }).toString()}`;

  return (
    <>
      <SEO
        title={seoTitle}
        description={
          activeCategory === 'all'
            ? 'Browse 46+ SS 304/316 GMP pharma equipment — lockers, trolleys, HPLC cabinets, storage tanks & cleanroom furniture. Shivam Industries, Ahmedabad. Request a quote.'
            : `Shop ${activeCatName} — premium SS 304/316 GMP equipment by Shivam Industries, Ahmedabad, Gujarat. Custom sizes, pan-India delivery. Get a quote today.`
        }
        keywords={[seoTitle, 'stainless steel products India', 'SS fabrication Gujarat', 'pharma equipment catalog']}
        path={seoPath}
        image={
          activeCategory === 'all'
            ? getProductImage('HPLC Column Cabinet')
            : activeCat?.image
        }
        jsonLd={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            ...(activeCategory !== 'all'
              ? [{ name: activeCatName, path: `/products?category=${activeCategory}` }]
              : []),
          ]),
          buildItemListSchema(filteredProducts, seoTitle),
        ]}
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
                  onSearchChange={handleSearchChange}
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
                  <p className="products-results-head__count" aria-live="polite">
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                    {urlSearch ? ` for "${urlSearch}"` : ''}
                  </p>
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

        <section className="section seo-prose seo-prose--compact">
          <div className="container seo-prose__inner">
            <h2 className="seo-prose__title">Stainless Steel Pharma Equipment Manufacturer</h2>
            <p>
              {company.name} is a leading stainless steel fabrication and pharmaceutical equipment manufacturer
              based in Ahmedabad, Gujarat. Our catalog includes SS 304 and SS 316 GMP-compliant products for
              pharmaceutical, biotech, food, dairy, and chemical industries — from storage tanks and process vessels
              to cleanroom lockers, HPLC cabinets, trolleys, and accessories. Every product is engineered for hygiene,
              durability, and regulatory compliance.
            </p>
            <p>
              Need custom fabrication or bulk orders? Explore our{' '}
              <Link to="/services">engineering services</Link>, read our{' '}
              <Link to="/faq">frequently asked questions</Link>, or{' '}
              <Link to="/contact">contact our team</Link> for a tailored quote with pan-India delivery.
            </p>
          </div>
        </section>
      </motion.main>
    </>
  );
}

export default Products;
