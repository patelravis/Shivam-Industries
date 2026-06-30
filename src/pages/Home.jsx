import { motion } from 'framer-motion';
import SEO from '../components/seo/SEO';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import ProductsSection from '../components/sections/ProductsSection';
import WhyUsSection from '../components/sections/WhyUsSection';
import CTASection from '../components/sections/CTASection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import { company } from '../data/company';
import { getProductImage } from '../utils/imageHelper';
import { buildOrganizationSchema, buildWebSiteSchema } from '../utils/seoHelper';

function Home() {
  return (
    <>
      <SEO
        title=""
        description={`${company.name} — Leading manufacturer of SS 304/316 GMP-compliant pharmaceutical equipment in India. Lockers, HPLC cabinets, trolleys, IBCs, cleanroom furniture & more. ISO certified.`}
        keywords={[
          'pharma equipment manufacturer',
          'stainless steel pharmaceutical furniture',
          'GMP equipment India',
          'cleanroom equipment Ahmedabad',
          'SS 304 pharma furniture',
        ]}
        path="/"
        image={getProductImage('HPLC Column Cabinet')}
        jsonLd={[buildOrganizationSchema(), buildWebSiteSchema()]}
      />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <ProductsSection />
        <WhyUsSection />
        <CTASection />
        <TestimonialsSection />
      </motion.main>
    </>
  );
}

export default Home;
