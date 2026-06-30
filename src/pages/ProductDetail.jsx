import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiDownload } from 'react-icons/fi';
import Breadcrumb from '../components/ui/Breadcrumb';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import InquiryForm from '../components/ui/InquiryForm';
import SEO from '../components/seo/SEO';
import { getProductBySlug, getRelatedProducts } from '../data/products';
import { company } from '../data/company';
import { useInquiry } from '../context/InquiryContext';
import { handleImageError } from '../utils/imageHelper';
import { buildProductSchema, buildBreadcrumbSchema, toAbsoluteUrl } from '../utils/seoHelper';

function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const [activeImage, setActiveImage] = useState(0);
  const { openInquiry } = useInquiry();

  if (!product) return <Navigate to="/products" replace />;

  const related = getRelatedProducts(product);
  const shareUrl = toAbsoluteUrl(`/product/${product.slug}`);
  const shareText = encodeURIComponent(`${product.name} - ${company.name}`);
  const productKeywords = [
    product.name,
    product.categoryName,
    'SS 304 pharma equipment',
    'GMP compliant',
    `${product.name} manufacturer India`,
  ];

  return (
    <>
      <SEO
        title={product.name}
        description={`${product.shortDescription} Buy ${product.name} from ${company.name} — SS 304/316 GMP-compliant pharma equipment. Custom sizes, pan-India delivery.`}
        keywords={productKeywords}
        image={product.images[0]}
        path={`/product/${product.slug}`}
        type="product"
        jsonLd={[
          buildProductSchema(product),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            { name: product.name, path: `/product/${product.slug}` },
          ]),
        ]}
      />
      <motion.main
      className="page-product-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="page-banner page-banner--sm">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Products', to: '/products' },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <div className="container product-detail">
        <div className="product-detail__gallery">
          <div className="product-detail__main-image">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              onError={handleImageError}
            />
          </div>
          {product.images.length > 1 && (
            <div className="product-detail__thumbs">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  className={`product-detail__thumb ${i === activeImage ? 'product-detail__thumb--active' : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt="" loading="lazy" onError={handleImageError} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-detail__info">
          <Badge variant="gold">{product.categoryName}</Badge>
          <h1 className="product-detail__title">{product.name}</h1>
          <p className="product-detail__short">{product.shortDescription}</p>

          <ul className="product-detail__bullets">
            {product.description.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {product.specs.length > 0 && (
            <table className="product-detail__specs">
              <tbody>
                {product.specs.map((spec, i) => (
                  <tr key={spec.label} className={i % 2 === 0 ? 'product-detail__specs--alt' : ''}>
                    <th>{spec.label}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="product-detail__actions">
            <Button variant="primary" size="lg" onClick={() => openInquiry(product.name)}>
              Send Inquiry
            </Button>
            <Button variant="outline" size="lg">
              <FiDownload /> Download Brochure
            </Button>
          </div>

          <div className="product-detail__share">
            <span>Share:</span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href={`mailto:?subject=${shareText}&body=${encodeURIComponent(shareUrl)}`}
              aria-label="Share via Email"
            >
              <FiMail />
            </a>
          </div>
        </div>

        <aside className="product-detail__sidebar">
          <div className="quick-inquiry">
            <h3>Quick Inquiry</h3>
            <InquiryForm prefillProduct={product.name} compact />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section related-products">
          <div className="container">
            <h2 className="related-products__title">Related Products</h2>
            <div className="related-products__scroll">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.main>
    </>
  );
}

export default ProductDetail;
