import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import Breadcrumb from '../components/ui/Breadcrumb';
import ProductCard from '../components/ui/ProductCard';
import SectionTitle from '../components/ui/SectionTitle';
import SEO from '../components/seo/SEO';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { getProductImage, handleImageError } from '../utils/imageHelper';
import { buildBreadcrumbSchema } from '../utils/seoHelper';

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const [expandedCats, setExpandedCats] = useState(() =>
    Object.fromEntries(categories.map((c) => [c.slug, true]))
  );

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const setCategory = (slug) => {
    if (slug === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: slug });
    }
  };

  const toggleCat = (slug) => {
    setExpandedCats((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const activeCatName = categories.find((c) => c.slug === activeCategory)?.name;
  const seoTitle = activeCategory === 'all' ? 'All Products' : activeCatName;
  const seoDescription =
    activeCategory === 'all'
      ? 'Browse 46+ SS 304/316 GMP-compliant pharmaceutical equipment — lockers, trolleys, HPLC cabinets, IBCs, tables, sinks & accessories. Shivam Industries, Ahmedabad.'
      : `Shop ${activeCatName} — premium stainless steel GMP pharma equipment by Shivam Industries. Custom sizes, SS 304/316 grade, pan-India delivery.`;

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={[
          seoTitle,
          'pharmaceutical equipment catalog',
          'SS pharma products India',
          'buy pharma equipment online',
        ]}
        path={activeCategory === 'all' ? '/products' : `/products?category=${activeCategory}`}
        image={
          activeCategory === 'all'
            ? getProductImage('HPLC Column Cabinet')
            : categories.find((c) => c.slug === activeCategory)?.image
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
      <div className="page-banner">
        <div className="container">
          <Breadcrumb items={[{ label: 'Products' }]} />
          <h1 className="page-banner__title">Our Products</h1>
          <p className="page-banner__subtitle">
            Explore our complete range of GMP-compliant stainless steel pharmaceutical equipment.
          </p>
        </div>
      </div>

      <div className="container products-page">
        <aside className="products-sidebar">
          <button
            type="button"
            className={`products-sidebar__cat ${activeCategory === 'all' ? 'products-sidebar__cat--active' : ''}`}
            onClick={() => setCategory('all')}
          >
            All Products
            <span className="products-sidebar__count">{products.length}</span>
          </button>

          {categories.map((cat) => (
            <div key={cat.slug} className="products-sidebar__group">
              <div className="products-sidebar__cat-row">
                <button
                  type="button"
                  className={`products-sidebar__cat ${activeCategory === cat.slug ? 'products-sidebar__cat--active' : ''}`}
                  onClick={() => setCategory(cat.slug)}
                >
                  <img
                    src={cat.image}
                    alt=""
                    loading="lazy"
                    onError={handleImageError}
                  />
                  <span>{cat.name}</span>
                </button>
                <button
                  type="button"
                  className="products-sidebar__toggle"
                  onClick={() => toggleCat(cat.slug)}
                  aria-label="Toggle subcategories"
                >
                  {expandedCats[cat.slug] ? <FiChevronDown /> : <FiChevronRight />}
                </button>
              </div>
              {expandedCats[cat.slug] && (
                <ul className="products-sidebar__subs">
                  {cat.products.map((name) => {
                    const prod = products.find((p) => p.name === name);
                    if (!prod) return null;
                    return (
                      <li key={prod.slug}>
                        <button
                          type="button"
                          className={activeCategory === cat.slug ? 'products-sidebar__sub--highlight' : ''}
                          onClick={() => setCategory(cat.slug)}
                        >
                          {name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </aside>

        <div className="products-main">
          <SectionTitle
            align="left"
            title={activeCategory === 'all' ? 'All Products' : activeCatName || 'Products'}
            subtitle={`${filteredProducts.length} items`}
          />
          <div className="products-grid">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p className="products-empty">No products found in this category.</p>
          )}
        </div>
      </div>
    </motion.main>
    </>
  );
}

export default Products;
