import { motion } from 'framer-motion';
import { FiAward, FiShield, FiCheckCircle } from 'react-icons/fi';
import Button from '../ui/Button';
import HeroProductShowcase from './HeroProductShowcase';
import { company } from '../../data/company';

const badges = [
  {
    icon: FiAward,
    label: 'ISO Certified',
    href: company.isoCertificate,
    title: 'View ISO Certificate (PDF)',
  },
  { icon: FiShield, label: 'SS 304 Grade' },
  { icon: FiCheckCircle, label: 'GMP Compliant' },
];

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__bg">
        <div className="hero__mesh" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__content">
        <div className="hero__layout">
          <div className="hero__left">
            <motion.div
              className="hero__text"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="hero__title">
                Precision Crafted
                <span className="hero__title-accent">Pharma Equipment</span>
              </h1>
              <p className="hero__tagline">
                {company.tagline} — engineered for cleanrooms built to last.
              </p>
              <div className="hero__actions">
                <Button to="/products" variant="primary" size="lg">Explore Products</Button>
                <Button to="/contact" variant="ghost" size="lg">Contact Us</Button>
              </div>
            </motion.div>

            <div className="hero__badges">
              {badges.map(({ icon: Icon, label, href, title }, i) => {
                const className = `hero__badge${href ? ' hero__badge--link' : ''}`;
                const motionProps = {
                  key: label,
                  className,
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 0.5 + i * 0.15, duration: 0.5 },
                };

                if (href) {
                  return (
                    <motion.a
                      {...motionProps}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={title}
                      aria-label={title}
                    >
                      <Icon aria-hidden="true" />
                      <span>{label}</span>
                    </motion.a>
                  );
                }

                return (
                  <motion.div {...motionProps}>
                    <Icon aria-hidden="true" />
                    <span>{label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <HeroProductShowcase />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
