import { motion } from 'framer-motion';
import Breadcrumb from '../components/ui/Breadcrumb';
import InquiryForm from '../components/ui/InquiryForm';
import SEO from '../components/seo/SEO';
import { company } from '../data/company';
import { buildBreadcrumbSchema } from '../utils/seoHelper';

function Inquiry() {
  return (
    <>
      <SEO
        title="Product Inquiry"
        description={`Send a product inquiry to ${company.name}. Request quotes for SS 304/316 GMP pharma equipment — lockers, trolleys, HPLC cabinets, IBCs & custom fabrication.`}
        keywords={[
          'pharma equipment inquiry',
          'request quote pharma furniture',
          'SS equipment price inquiry',
        ]}
        path="/inquiry"
        jsonLd={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Inquiry', path: '/inquiry' },
        ])}
      />
      <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="page-banner">
        <div className="container">
          <Breadcrumb items={[{ label: 'Inquiry' }]} />
          <h1 className="page-banner__title">Product Inquiry</h1>
          <p className="page-banner__subtitle">
            Share your requirements and our team will prepare a custom quote for {company.name}.
          </p>
        </div>
      </div>

      <section className="section inquiry-page">
        <div className="container inquiry-page__inner">
          <InquiryForm />
        </div>
      </section>
    </motion.main>
    </>
  );
}

export default Inquiry;
