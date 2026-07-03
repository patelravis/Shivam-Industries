import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';
import SEO from '../components/seo/SEO';

function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist. Browse Shivam Industries products, services, or contact us for assistance."
        path="/404"
        noindex
      />
      <motion.main
        className="not-found"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container not-found__inner">
          <Breadcrumb items={[{ label: '404' }]} />
          <h1 className="not-found__title">Page Not Found</h1>
          <p className="not-found__text">
            Sorry, the page you requested could not be found. It may have been moved or removed.
          </p>
          <div className="not-found__actions">
            <Button to="/" variant="primary" size="lg">Go Home</Button>
            <Button to="/products" variant="outline" size="lg">Browse Products</Button>
          </div>
          <nav className="not-found__links" aria-label="Helpful links">
            <Link to="/services">Services</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
          </nav>
        </div>
      </motion.main>
    </>
  );
}

export default NotFound;
