import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import ProductsSection from '../components/sections/ProductsSection';
import WhyUsSection from '../components/sections/WhyUsSection';
import CTASection from '../components/sections/CTASection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import { company, testimonials } from '../data/company';
import { getProductImage } from '../utils/imageHelper';
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
  buildLocalBusinessSchema,
  buildReviewSchema,
} from '../utils/seoHelper';

function Home() {
  return (
    <>
      <SEO
        title="SS Fabrication & Pharma Equipment"
        description={`${company.name} — Leading SS 304/316 stainless steel fabrication & GMP pharma equipment manufacturer in Ahmedabad, Gujarat. Storage tanks, cleanroom furniture & custom fabrication. Get a quote.`}
        keywords={[
          'stainless steel manufacturer India',
          'SS fabrication Gujarat',
          'pharma equipment Ahmedabad',
          'storage tank manufacturer',
          'GMP equipment India',
        ]}
        path="/"
        image={getProductImage('HPLC Column Cabinet')}
        jsonLd={[
          buildOrganizationSchema(),
          buildLocalBusinessSchema(),
          buildWebSiteSchema(),
          buildReviewSchema(testimonials),
        ]}
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

        <section className="section seo-prose">
          <div className="container seo-prose__inner">
            <h2 className="seo-prose__title">
              Stainless Steel Fabrication & Pharmaceutical Equipment Manufacturer
            </h2>
            <p>
              {company.longDescription} Based in Ahmedabad, Gujarat, we combine {company.yearsExperience}+ years
              of engineering fabrication expertise with ISO-certified quality systems to deliver equipment that
              meets the highest regulatory standards.
            </p>
            <h3 className="seo-prose__subtitle">Industries We Serve</h3>
            <p>
              Our stainless steel products and custom fabrication services support{' '}
              {company.industriesServed.join(', ')} sectors across India. From SS storage tanks and process
              vessels to cleanroom lockers, HPLC column cabinets, intermediate bulk containers, and material
              handling trolleys — every product is built for hygiene, durability, and GMP compliance.
            </p>
            <h3 className="seo-prose__subtitle">Why Choose Shivam Industries</h3>
            <p>
              As an established industrial fabricator in Gujarat, we offer SS 304 and SS 316 grade construction,
              custom engineering fabrication, competitive bulk pricing, and dedicated pan-India delivery. View
              our <Link to="/products">complete product catalog</Link>, explore our{' '}
              <Link to="/services">fabrication services</Link>, or read our{' '}
              <Link to="/faq">frequently asked questions</Link> to learn more.
            </p>
          </div>
        </section>
      </motion.main>
    </>
  );
}

export default Home;
