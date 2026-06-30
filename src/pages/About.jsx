import { motion } from 'framer-motion';
import { FiTarget, FiHeart, FiAward, FiUsers } from 'react-icons/fi';
import Breadcrumb from '../components/ui/Breadcrumb';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import SEO from '../components/seo/SEO';
import { company } from '../data/company';
import { getProductImage, handleImageError } from '../utils/imageHelper';
import { buildBreadcrumbSchema } from '../utils/seoHelper';
import useScrollAnimation from '../hooks/useScrollAnimation';

const timeline = [
  { year: '2010', title: 'Founded', desc: 'Shivam Industries established in Ahmedabad with a focus on SS pharma furniture.' },
  { year: '2014', title: 'GMP Expansion', desc: 'Expanded manufacturing facility to meet growing GMP compliance demands.' },
  { year: '2018', title: 'Pan-India Growth', desc: 'Reached 100+ pharmaceutical clients across major Indian cities.' },
  { year: '2022', title: 'Product Innovation', desc: 'Launched advanced HPLC cabinets, IBCs, and custom cleanroom solutions.' },
  { year: '2025', title: 'Industry Leader', desc: '500+ products manufactured, serving 200+ satisfied clients nationwide.' },
];

const values = [
  { icon: FiTarget, title: 'Precision', desc: 'Every measurement, weld, and finish meets exacting standards.' },
  { icon: FiHeart, title: 'Integrity', desc: 'Transparent dealings and honest commitments to every client.' },
  { icon: FiAward, title: 'Quality', desc: 'SS 304/316 grade materials and rigorous quality control.' },
  { icon: FiUsers, title: 'Partnership', desc: 'Long-term relationships built on trust and reliable delivery.' },
];

const team = [
  { name: 'Rajesh Patel', role: 'Managing Director' },
  { name: 'Priya Shah', role: 'Production Head' },
  { name: 'Amit Kumar', role: 'Quality Assurance' },
  { name: 'Neha Desai', role: 'Sales & Client Relations' },
];

function About() {
  const { ref, inView } = useScrollAnimation();

  return (
    <>
      <SEO
        title="About Us"
        description={`Learn about ${company.name} — ${company.tagline}. 15+ years manufacturing SS 304/316 GMP-compliant pharmaceutical equipment for cleanrooms across India.`}
        keywords={[
          'about Shivam Industries',
          'pharma equipment company India',
          'SS furniture manufacturer Ahmedabad',
          'GMP equipment manufacturer',
        ]}
        path="/about"
        image={getProductImage('Working Table')}
        jsonLd={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ])}
      />
      <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="page-banner">
        <div className="container">
          <Breadcrumb items={[{ label: 'About Us' }]} />
          <h1 className="page-banner__title">About {company.name}</h1>
          <p className="page-banner__subtitle">{company.tagline}</p>
        </div>
      </div>

      <section className="section about-intro">
        <div className="container about-intro__grid">
          <div className="about-intro__text">
            <SectionTitle align="left" subtitle="Who We Are" title="Crafting Excellence in Pharma Equipment" />
            <p>{company.description}</p>
            <p>
              From lockers and garment cupboards to HPLC column cabinets and intermediate bulk containers,
              we manufacture a comprehensive range of stainless steel equipment designed for
              pharmaceutical, biotech, and healthcare facilities.
            </p>
            <Button to="/products" variant="primary">Explore Products</Button>
          </div>
          <div className="about-intro__image">
            <img
              src={getProductImage('Working Table')}
              alt="Shivam Industries manufacturing"
              loading="lazy"
              onError={handleImageError}
            />
          </div>
        </div>
      </section>

      <section className="section about-timeline" ref={ref}>
        <div className="container">
          <SectionTitle subtitle="Our Story" title="Our Journey" />
          <div className="timeline">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className="timeline__item"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
              >
                <div className="timeline__year">{item.year}</div>
                <div className="timeline__content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-values">
        <div className="container">
          <SectionTitle subtitle="What Drives Us" title="Our Values" />
          <div className="values-grid">
            {values.map((v) => (
              <div key={v.title} className="values-card">
                <v.icon className="values-card__icon" aria-hidden="true" />
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-team">
        <div className="container">
          <SectionTitle subtitle="The People" title="Our Team" />
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card">
                <div className="team-card__avatar">{member.name.charAt(0)}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <h2 className="cta-banner__title">Partner With Us</h2>
          <p className="cta-banner__text">Let&apos;s build the equipment your facility deserves.</p>
          <Button to="/contact" variant="dark" size="lg">Get In Touch</Button>
        </div>
      </section>
    </motion.main>
    </>
  );
}

export default About;
