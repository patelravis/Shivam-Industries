import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import { categories } from '../../data/categories';
import { useInquiry } from '../../context/InquiryContext';
import { handleImageError } from '../../utils/imageHelper';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Exhibition & Events', path: '/exhibition' },
  { label: 'Clients', path: '/#clients' },
  { label: 'Contact Us', path: '/contact' },
];

function isNavLinkActive(link, location) {
  const { pathname, hash } = location;
  const fullPath = pathname + hash;

  if (link.path === '/') return pathname === '/';
  if (link.path === '/exhibition') return pathname === '/exhibition';
  if (link.path === '/about') return pathname === '/about';
  if (link.path === '/#clients') return pathname === '/' && hash === '#clients';

  return fullPath === link.path || pathname === link.path;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { openInquiry } = useInquiry();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isSolid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header className={`navbar ${isSolid ? 'navbar--solid' : ''} ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Logo variant="navbar" showText={false} />

        <nav className="navbar__nav" aria-label="Main navigation">
          <Link
            to="/"
            className={`navbar__link ${isNavLinkActive(navLinks[0], location) ? 'navbar__link--active' : ''}`}
          >
            Home
          </Link>

          <div
            className="navbar__dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              to="/products"
              className={`navbar__link navbar__link--dropdown ${
                location.pathname === '/products' || location.pathname.startsWith('/product')
                  ? 'navbar__link--active'
                  : ''
              }`}
            >
              Our Products
              <FiChevronDown className="navbar__chevron" />
            </Link>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  className="navbar__mega"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="navbar__mega-grid">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/products?category=${cat.slug}`}
                        className="navbar__mega-item"
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          loading="lazy"
                          onError={handleImageError}
                        />
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.slice(1).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__link ${isNavLinkActive(link, location) ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__inquiry-btn"
            onClick={() => openInquiry()}
          >
            Inquiry Now
          </button>
          <button
            type="button"
            className="navbar__hamburger"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="navbar__mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="navbar__mobile"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            >
              <button
                type="button"
                className="navbar__mobile-close"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <FiX />
              </button>
              <nav className="navbar__mobile-nav">
                <Link to="/" className="navbar__mobile-link">Home</Link>
                <Link to="/products" className="navbar__mobile-link">Our Products</Link>
                {navLinks.slice(1).map((link) => (
                  <Link key={link.path} to={link.path} className="navbar__mobile-link">
                    {link.label}
                  </Link>
                ))}
                <Button variant="primary" onClick={() => { setMobileOpen(false); openInquiry(); }}>
                  Inquiry Now
                </Button>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
