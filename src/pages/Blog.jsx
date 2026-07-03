import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiBookOpen } from 'react-icons/fi';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';
import SEO from '../components/seo/SEO';
import { blogTopics, blogCategories } from '../data/blogTopics';
import { company } from '../data/company';
import { buildBreadcrumbSchema } from '../utils/seoHelper';

function Blog() {
  return (
    <>
      <SEO
        title="Blog — SS Tanks & Fabrication Guides"
        description={`Expert guides on stainless steel tanks, pharma equipment, GMP compliance, industrial fabrication & maintenance from ${company.name}, Ahmedabad.`}
        keywords={[
          'stainless steel blog',
          'pharma equipment guides',
          'SS fabrication articles',
          'industrial equipment blog India',
        ]}
        path="/blog"
        jsonLd={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="page-banner">
          <div className="container">
            <Breadcrumb items={[{ label: 'Blog' }]} />
            <h1 className="page-banner__title">Industry Insights & Guides</h1>
            <p className="page-banner__subtitle">
              Expert articles on stainless steel fabrication, pharma equipment, GMP standards, and industrial manufacturing.
            </p>
          </div>
        </div>

        <section className="section seo-prose">
          <div className="container seo-prose__inner">
            <p>
              Welcome to the {company.name} knowledge hub. Our engineering team shares practical insights on
              stainless steel products, SS tank manufacturing, pharmaceutical equipment selection, GMP compliance,
              and industrial fabrication best practices. Whether you are setting up a new pharma facility or
              upgrading existing equipment, these guides help you make informed decisions. Explore {blogTopics.length}{' '}
              topics below — full articles coming soon. For immediate assistance, visit our{' '}
              <Link to="/products">product catalog</Link> or <Link to="/faq">FAQ page</Link>.
            </p>
          </div>
        </section>

        <section className="section blog-section">
          <div className="container">
            <div className="blog-categories" aria-label="Blog categories">
              {blogCategories.map((cat) => (
                <span key={cat} className="blog-category-tag">{cat}</span>
              ))}
            </div>
            <div className="blog-grid">
              {blogTopics.map((topic, i) => (
                <article key={topic.slug} className="blog-card">
                  <div className="blog-card__icon" aria-hidden="true">
                    <FiBookOpen />
                  </div>
                  <span className="blog-card__category">{topic.category}</span>
                  <h2 className="blog-card__title">{topic.title}</h2>
                  <p className="blog-card__excerpt">{topic.excerpt}</p>
                  <span className="blog-card__status">Coming Soon</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-banner">
          <div className="container cta-banner__inner">
            <h2 className="cta-banner__title">Need Expert Advice Now?</h2>
            <p className="cta-banner__text">Skip the wait — speak directly with our fabrication and engineering team.</p>
            <Button to="/contact" variant="dark" size="lg">Get Expert Consultation</Button>
          </div>
        </section>
      </motion.main>
    </>
  );
}

export default Blog;
