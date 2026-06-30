import { memo } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../ui/SectionTitle';
import ProductCard from '../ui/ProductCard';
import Button from '../ui/Button';
import { getFeaturedProducts } from '../../data/products';

const featured = getFeaturedProducts();

function ProductsSection() {
  return (
    <section className="section products-section">
      <div className="container">
        <SectionTitle subtitle="What We Offer" title="Our Product Range" />
        <div className="products-section__grid">
          {featured.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="products-section__cta">
          <Button to="/products" variant="outline" size="lg">View All Products</Button>
        </div>
      </div>
    </section>
  );
}

export default memo(ProductsSection);
