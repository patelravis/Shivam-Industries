import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import Breadcrumb from '../components/ui/Breadcrumb';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import SEO from '../components/seo/SEO';
import { services } from '../data/services';
import { company } from '../data/company';
import {
  buildBreadcrumbSchema,
  buildLocalBusinessSchema,
  buildServiceSchema,
} from '../utils/seoHelper';

function Services() {
  const serviceSchemas = services.map(buildServiceSchema);

  return (
    <>
      <SEO
        title="SS Fabrication & Engineering Services"
        description={`${company.name} offers stainless steel fabrication, storage tank manufacturing, pharma equipment, custom engineering & cleanroom solutions in Ahmedabad, Gujarat.`}
        keywords={[
          'SS fabrication services',
          'storage tank manufacturer',
          'industrial fabrication Gujarat',
          'pharma equipment manufacturing',
          'custom steel fabrication',
        ]}
        path="/services"
        jsonLd={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ]),
          buildLocalBusinessSchema(),
          ...serviceSchemas,
        ]}
      />
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="page-banner">
          <div className="container">
            <Breadcrumb items={[{ label: 'Services' }]} />
            <h1 className="page-banner__title">Our Services</h1>
            <p className="page-banner__subtitle">
              Stainless steel fabrication, tank manufacturing, and GMP pharma equipment engineering from Ahmedabad.
            </p>
          </div>
        </div>

        <section className="section seo-prose">
          <div className="container seo-prose__inner">
            <p>
              {company.name} provides end-to-end stainless steel fabrication and engineering services for
              pharmaceutical, chemical, food, dairy, and industrial clients across India. From custom SS 304/316
              storage tanks and process vessels to complete cleanroom furniture packages, our Ahmedabad manufacturing
              facility delivers GMP-compliant solutions with ISO-certified quality control. Explore our core services
              below or browse our <Link to="/products">product catalog</Link> for standard equipment.
            </p>
          </div>
        </section>

        {services.map((service, i) => (
          <section
            key={service.slug}
            id={service.slug}
            className={`section service-block ${i % 2 === 1 ? 'service-block--alt' : ''}`}
          >
            <div className="container">
              <SectionTitle align="left" subtitle={`Service ${i + 1}`} title={service.name} />
              <p className="service-block__desc">{service.description}</p>

              <div className="service-block__grid">
                <div className="service-block__col">
                  <h3 className="service-block__heading">Key Benefits</h3>
                  <ul className="service-block__list">
                    {service.benefits.map((b) => (
                      <li key={b}><FiCheck aria-hidden="true" /> {b}</li>
                    ))}
                  </ul>
                </div>
                <div className="service-block__col">
                  <h3 className="service-block__heading">Our Process</h3>
                  <ol className="service-block__steps">
                    {service.process.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
                <div className="service-block__col">
                  <h3 className="service-block__heading">Industries Served</h3>
                  <div className="service-block__tags">
                    {service.industries.map((ind) => (
                      <span key={ind} className="service-block__tag">{ind}</span>
                    ))}
                  </div>
                  <Button to="/inquiry" variant="primary" size="md" className="service-block__cta">
                    Request Quote
                  </Button>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="cta-banner">
          <div className="container cta-banner__inner">
            <h2 className="cta-banner__title">Ready to Start Your Project?</h2>
            <p className="cta-banner__text">Share your requirements for a custom fabrication quote.</p>
            <div className="cta-banner__actions">
              <Button to="/contact" variant="dark" size="lg">Contact Us</Button>
              <Button to="/faq" variant="outline" size="lg">View FAQ</Button>
            </div>
          </div>
        </section>
      </motion.main>
    </>
  );
}

export default Services;
