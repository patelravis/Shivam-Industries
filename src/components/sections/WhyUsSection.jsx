import { FiShield, FiLayers, FiMaximize2, FiTruck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { whyUs } from '../../data/company';

const iconMap = {
  shield: FiShield,
  metal: FiLayers,
  ruler: FiMaximize2,
  truck: FiTruck,
};

function WhyUsSection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="section why-us" ref={ref}>
      <div className="container">
        <SectionTitle subtitle="Why Shivam" title="Why Choose Us" />
        <div className="why-us__grid">
          {whyUs.map((item, i) => {
            const Icon = iconMap[item.icon] || FiShield;
            return (
              <motion.div
                key={item.title}
                className="why-us__card"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div className="why-us__icon">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="why-us__title">{item.title}</h3>
                <p className="why-us__desc">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyUsSection;
