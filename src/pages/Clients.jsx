import { motion } from 'framer-motion';
import { FiAward, FiStar } from 'react-icons/fi';
import Breadcrumb from '../components/ui/Breadcrumb';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import SEO from '../components/seo/SEO';
import { company, clients, testimonials, stats } from '../data/company';
import { buildBreadcrumbSchema } from '../utils/seoHelper';

function Clients() {
  return (
    <>
      <SEO
        title="Our Clients"
        description={`${company.name} is trusted by 200+ pharmaceutical companies across India. See our client list and testimonials for SS 304 GMP-compliant pharma equipment.`}
        keywords={[
          'Shivam Industries clients',
          'pharma equipment clients India',
          'pharmaceutical company testimonials',
          'GMP equipment trusted brands',
        ]}
        path="/clients"
        jsonLd={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Our Clients', path: '/clients' },
        ])}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="page-banner">
          <div className="container">
            <Breadcrumb items={[{ label: 'Our Clients' }]} />
            <h1 className="page-banner__title">Our Clients</h1>
            <p className="page-banner__subtitle">
              Trusted by leading pharmaceutical, biotech, and healthcare companies across India
              for premium SS 304/316 GMP-compliant equipment.
            </p>
          </div>
        </div>

        <section className="section clients-stats">
          <div className="container clients-stats__grid">
            {stats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="clients-stats__item">
                <span className="clients-stats__value">
                  {stat.value}{stat.suffix}
                </span>
                <span className="clients-stats__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section clients-list">
          <div className="container">
            <SectionTitle subtitle="Trusted By" title="Pharmaceutical Companies We Serve" />
            <div className="clients-grid">
              {clients.map((name, i) => (
                <motion.div
                  key={name}
                  className="clients-grid__card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <FiAward className="clients-grid__icon" aria-hidden="true" />
                  <span>{name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section clients-testimonials">
          <div className="container">
            <SectionTitle subtitle="What They Say" title="Client Testimonials" />
            <div className="clients-testimonials__grid">
              {testimonials.map((t, i) => (
                <motion.blockquote
                  key={t.name}
                  className="clients-testimonial"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="clients-testimonial__stars" aria-label="5 star rating">
                    {[...Array(5)].map((_, j) => (
                      <FiStar key={j} aria-hidden="true" />
                    ))}
                  </div>
                  <p>&ldquo;{t.text}&rdquo;</p>
                  <footer>
                    <strong>{t.name}</strong>
                    <span>{t.company}</span>
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-banner">
          <div className="container cta-banner__inner">
            <h2 className="cta-banner__title">Join Our Growing Client Family</h2>
            <p className="cta-banner__text">
              Partner with {company.name} for precision-built pharmaceutical equipment.
            </p>
            <Button to="/contact" variant="dark" size="lg">Get In Touch</Button>
          </div>
        </section>
      </motion.main>
    </>
  );
}

export default Clients;
