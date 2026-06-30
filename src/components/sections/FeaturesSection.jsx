import { FiCheckCircle, FiSettings, FiUsers, FiGlobe } from 'react-icons/fi';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const features = [
  { icon: FiCheckCircle, title: 'Quality Assured', desc: 'Rigorous QC at every stage of manufacturing.' },
  { icon: FiSettings, title: 'Custom Engineering', desc: 'Bespoke designs for unique facility layouts.' },
  { icon: FiUsers, title: 'Expert Team', desc: 'Decades of combined pharma equipment experience.' },
  { icon: FiGlobe, title: 'Nationwide Reach', desc: 'Serving pharmaceutical companies across India.' },
];

function FeaturesSection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section features" ref={ref}>
      <div className="container">
        <SectionTitle subtitle="Excellence" title="Built for Pharmaceutical Excellence" />
        <div className="features__grid">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="features__item"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <f.icon className="features__icon" aria-hidden="true" />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
