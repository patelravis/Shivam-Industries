import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiUsers } from 'react-icons/fi';
import Breadcrumb from '../components/ui/Breadcrumb';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import SEO from '../components/seo/SEO';
import { company } from '../data/company';
import { exhibitions, exhibitionHighlights } from '../data/exhibitions';
import { buildBreadcrumbSchema } from '../utils/seoHelper';

function Exhibition() {
  const upcoming = exhibitions.filter((e) => e.status === 'upcoming');
  const past = exhibitions.filter((e) => e.status === 'past');

  return (
    <>
      <SEO
        title="Exhibition & Events"
        description={`Visit ${company.name} at pharma exhibitions across India — CPhI, PharmaTech Expo, Interpack. Live demos of SS 304 GMP pharma equipment, HPLC cabinets, trolleys & cleanroom furniture.`}
        keywords={[
          'pharma exhibition India',
          'CPhI India',
          'pharmaceutical trade show',
          'pharma equipment expo',
          'Shivam Industries exhibition',
          'PharmaTech Expo Ahmedabad',
        ]}
        path="/exhibition"
        jsonLd={[
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Exhibition & Events', path: '/exhibition' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'EventSeries',
            name: `${company.name} — Pharma Exhibitions & Events`,
            description: 'Pharmaceutical equipment exhibitions and trade shows across India.',
            organizer: {
              '@type': 'Organization',
              name: company.name,
            },
          },
        ]}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="page-banner">
          <div className="container">
            <Breadcrumb items={[{ label: 'Exhibition & Events' }]} />
            <h1 className="page-banner__title">Exhibition & Events</h1>
            <p className="page-banner__subtitle">
              Meet {company.name} at leading pharmaceutical trade shows across India.
              See our SS 304 GMP equipment live and speak with our engineering team.
            </p>
          </div>
        </div>

        <section className="section exhibition-highlights">
          <div className="container">
            <SectionTitle subtitle="Why Visit Us" title="At Our Exhibition Booth" />
            <div className="exhibition-highlights__grid">
              {exhibitionHighlights.map((item) => (
                <div key={item} className="exhibition-highlights__item">
                  <FiUsers aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section exhibition-section">
          <div className="container">
            <SectionTitle subtitle="Mark Your Calendar" title="Upcoming Exhibitions" align="left" />
            <div className="exhibition-grid">
              {upcoming.map((event, i) => (
                <motion.article
                  key={event.id}
                  className="exhibition-card exhibition-card--upcoming"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="exhibition-card__badge">Upcoming</span>
                  <h3 className="exhibition-card__name">{event.name}</h3>
                  <p className="exhibition-card__desc">{event.description}</p>
                  <ul className="exhibition-card__meta">
                    <li><FiCalendar aria-hidden="true" /> {event.date}</li>
                    <li><FiMapPin aria-hidden="true" /> {event.location}</li>
                    <li><strong>Venue:</strong> {event.venue}</li>
                    <li><strong>Booth:</strong> {event.booth}</li>
                  </ul>
                  <Button to="/contact" variant="primary" size="sm">
                    Schedule a Meeting
                  </Button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section exhibition-section exhibition-section--alt">
          <div className="container">
            <SectionTitle subtitle="Our Track Record" title="Past Exhibitions" align="left" />
            <div className="exhibition-grid">
              {past.map((event, i) => (
                <motion.article
                  key={event.id}
                  className="exhibition-card exhibition-card--past"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <span className="exhibition-card__badge exhibition-card__badge--past">Completed</span>
                  <h3 className="exhibition-card__name">{event.name}</h3>
                  <p className="exhibition-card__desc">{event.description}</p>
                  <ul className="exhibition-card__meta">
                    <li><FiCalendar aria-hidden="true" /> {event.date}</li>
                    <li><FiMapPin aria-hidden="true" /> {event.location}</li>
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-banner">
          <div className="container cta-banner__inner">
            <h2 className="cta-banner__title">Can&apos;t Make It to the Expo?</h2>
            <p className="cta-banner__text">
              Visit our factory in Ahmedabad or request a virtual product demo anytime.
            </p>
            <Button to="/contact" variant="dark" size="lg">Contact Us</Button>
          </div>
        </section>
      </motion.main>
    </>
  );
}

export default Exhibition;
