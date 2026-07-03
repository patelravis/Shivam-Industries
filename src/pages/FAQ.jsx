import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/ui/Breadcrumb';
import FAQSection from '../components/sections/FAQSection';
import Button from '../components/ui/Button';
import SEO from '../components/seo/SEO';
import { faqs } from '../data/faqs';
import { company } from '../data/company';
import { buildFAQSchema, buildBreadcrumbSchema, buildLocalBusinessSchema } from '../utils/seoHelper';

function FAQ() {
  return (
    <>
      <SEO
        title="FAQ — SS Fabrication & Pharma Equipment"
        description={`Frequently asked questions about ${company.name} — SS 304/316 fabrication, GMP pharma equipment, storage tanks, custom sizes, delivery across India. Get answers now.`}
        keywords={[
          'SS fabrication FAQ',
          'pharma equipment questions',
          'stainless steel manufacturer FAQ',
          'GMP equipment India',
        ]}
        path="/faq"
        jsonLd={[
          buildFAQSchema(faqs),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]),
          buildLocalBusinessSchema(),
        ]}
      />
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="page-banner">
          <div className="container">
            <Breadcrumb items={[{ label: 'FAQ' }]} />
            <h1 className="page-banner__title">Frequently Asked Questions</h1>
            <p className="page-banner__subtitle">
              Answers about our stainless steel fabrication, pharma equipment, GMP compliance, and services.
            </p>
          </div>
        </div>

        <section className="section seo-prose">
          <div className="container seo-prose__inner">
            <p>
              {company.name} is a trusted stainless steel manufacturer and industrial fabricator based in Ahmedabad,
              Gujarat. With {company.yearsExperience}+ years of experience in SS 304/316 fabrication, pharmaceutical
              equipment manufacturing, and custom engineering solutions, we serve pharma, biotech, food, dairy,
              and chemical industries across India. Browse our FAQs below or{' '}
              <Link to="/contact">contact us</Link> for specific project questions.
            </p>
          </div>
        </section>

        <FAQSection faqs={faqs} title="Your Questions Answered" subtitle="FAQ" />

        <section className="cta-banner">
          <div className="container cta-banner__inner">
            <h2 className="cta-banner__title">Still Have Questions?</h2>
            <p className="cta-banner__text">Our team is ready to help with quotes, custom fabrication, and technical guidance.</p>
            <div className="cta-banner__actions">
              <Button to="/contact" variant="dark" size="lg">Contact Us</Button>
              <Button to="/inquiry" variant="outline" size="lg">Send Inquiry</Button>
            </div>
          </div>
        </section>
      </motion.main>
    </>
  );
}

export default FAQ;
