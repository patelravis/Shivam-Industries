import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiDownload, FiCheck, FiArrowLeft } from 'react-icons/fi';
import Breadcrumb from '../components/ui/Breadcrumb';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import InquiryForm from '../components/ui/InquiryForm';
import FAQSection from '../components/sections/FAQSection';
import SEO from '../components/seo/SEO';
import { getProductBySlug, getRelatedProducts } from '../data/products';
import { company } from '../data/company';
import { useInquiry } from '../context/InquiryContext';
import { handleImageError } from '../utils/imageHelper';
import { buildProductPageSchemas, toAbsoluteUrl } from '../utils/seoHelper';
import {
  buildProductMetaTitle,
  buildProductMetaDescription,
  getProductApplications,
  getProductAdvantages,
  getProductIndustries,
  getProductLongDescription,
  getProductFaqs,
} from '../utils/productSeoContent';

function ProductDetail() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const [activeImage, setActiveImage] = useState(0);
  const { openInquiry } = useInquiry();

  if (!product) {
    return (
      <main className="not-found">
        <div className="container not-found__inner">
          <h1>Product Not Found</h1>
          <p>The product you are looking for does not exist.</p>
          <Button to="/products" variant="primary">Browse Products</Button>
        </div>
      </main>
    );
  }

  const related = getRelatedProducts(product);
  const shareUrl = toAbsoluteUrl(`/product/${product.slug}`);
  const shareText = encodeURIComponent(`${product.name} - ${company.name}`);
  const productFaqs = getProductFaqs(product);
  const applications = getProductApplications(product);
  const advantages = getProductAdvantages(product);
  const industries = getProductIndustries(product);
  const longDescription = getProductLongDescription(product);

  return (
    <>
      <SEO
        title={buildProductMetaTitle(product)}
        description={buildProductMetaDescription(product)}
        keywords={[
          product.name,
          product.categoryName,
          'SS 304 pharma equipment',
          'stainless steel fabrication',
          'GMP compliant',
          `${product.name} manufacturer India`,
        ]}
        image={product.images[0]}
        path={`/product/${product.slug}`}
        type="product"
        jsonLd={buildProductPageSchemas(product, productFaqs)}
      />

      <motion.main
        className="page-product-detail"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="page-banner page-banner--compact">
          <div className="container">
            <Breadcrumb
              items={[
                { label: 'Products', to: '/products' },
                { label: product.categoryName, to: `/products?category=${product.category}` },
                { label: product.name },
              ]}
            />
            <Link to="/products" className="product-detail__back">
              <FiArrowLeft aria-hidden="true" /> Back to Products
            </Link>
          </div>
        </div>

        <div className="container product-detail">
          <div className="product-detail__gallery-card">
            <div className="product-detail__main-image">
              <img
                src={product.images[activeImage]}
                alt={`${product.name} — SS 304 GMP-compliant ${product.categoryName} by ${company.name}`}
                title={product.name}
                width={800}
                height={800}
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
                    aria-label={`View ${product.name} image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      loading="lazy"
                      width={76}
                      height={76}
                      onError={handleImageError}
                    />
                  </button>
                ))}
              </div>
            )}
            <div className="product-detail__trust-badges">
              <span><FiCheck aria-hidden="true" /> SS 304 Grade</span>
              <span><FiCheck aria-hidden="true" /> GMP Compliant</span>
            </div>
          </div>

          <div className="product-detail__info-card">
            <Badge variant="gold">{product.categoryName}</Badge>
            <h1 className="product-detail__title">{product.name}</h1>
            <p className="product-detail__short">{product.shortDescription}</p>

            <div className="product-detail__section product-detail__section--prose">
              <h2 className="product-detail__section-title">Product Overview</h2>
              {longDescription.split('\n\n').map((para) => (
                <p key={para.slice(0, 40)} className="product-detail__para">{para}</p>
              ))}
            </div>

            <div className="product-detail__section">
              <h2 className="product-detail__section-title">Key Features</h2>
              <ul className="product-detail__bullets">
                {product.description.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="product-detail__section">
              <h2 className="product-detail__section-title">Applications</h2>
              <ul className="product-detail__bullets product-detail__bullets--single">
                {applications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="product-detail__section">
              <h2 className="product-detail__section-title">Advantages</h2>
              <ul className="product-detail__bullets product-detail__bullets--single">
                {advantages.slice(0, 4).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="product-detail__section">
              <h2 className="product-detail__section-title">Industries Served</h2>
              <div className="product-detail__industries">
                {industries.map((ind) => (
                  <span key={ind} className="product-detail__industry-tag">{ind}</span>
                ))}
              </div>
            </div>

            {product.specs.length > 0 && (
              <div className="product-detail__section">
                <h2 className="product-detail__section-title">Specifications</h2>
                <div className="product-detail__specs-wrap">
                  <table className="product-detail__specs">
                    <caption className="sr-only">{product.name} specifications</caption>
                    <tbody>
                      {product.specs.map((spec, i) => (
                        <tr key={spec.label} className={i % 2 === 0 ? 'product-detail__specs--alt' : ''}>
                          <th scope="row">{spec.label}</th>
                          <td>{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="product-detail__actions">
              <Button variant="primary" size="lg" onClick={() => openInquiry(product.name)}>
                Send Inquiry
              </Button>
              <Button variant="outline" size="lg" aria-label={`Download ${product.name} brochure`}>
                <FiDownload aria-hidden="true" /> Download Brochure
              </Button>
            </div>

            <div className="product-detail__internal-links">
              <h3 className="product-detail__internal-links-title">Related Links</h3>
              <Link to={`/products?category=${product.category}`}>All {product.categoryName}</Link>
              <Link to="/services">Our Fabrication Services</Link>
              <Link to="/faq">FAQ</Link>
              <Link to="/contact">Contact Us</Link>
            </div>

            <div className="product-detail__share">
              <span>Share this product:</span>
              <div className="product-detail__share-links">
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
          </div>

          <aside className="product-detail__sidebar">
            <div className="quick-inquiry">
              <div className="quick-inquiry__header">
                <h3>Quick Inquiry</h3>
                <p>Get a quote for {product.name}</p>
              </div>
              <InquiryForm prefillProduct={product.name} compact />
            </div>
          </aside>
        </div>

        <FAQSection
          faqs={productFaqs}
          title={`${product.name} — FAQ`}
          subtitle="Product FAQ"
        />

        {related.length > 0 && (
          <section className="related-products">
            <div className="container">
              <div className="related-products__head">
                <h2 className="related-products__title">Related Products</h2>
                <Link to={`/products?category=${product.category}`} className="related-products__link">
                  View all in {product.categoryName}
                </Link>
              </div>
              <div className="related-products__grid">
                {related.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} variant="catalog" />
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
