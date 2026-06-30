import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import useScrollAnimation from '../../hooks/useScrollAnimation';

function SectionTitle({ title, subtitle, align = 'center', light = false }) {
  const { ref, inView } = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      className={`section-title section-title--${align} ${light ? 'section-title--light' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {subtitle && <span className="section-title__subtitle">{subtitle}</span>}
      <h2 className="section-title__heading">{title}</h2>
      <div className="section-title__line" />
    </motion.div>
  );
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  align: PropTypes.oneOf(['left', 'center']),
  light: PropTypes.bool,
};

export default SectionTitle;
