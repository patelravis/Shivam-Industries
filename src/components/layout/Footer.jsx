import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import { FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { company } from '../../data/company';
import { categories } from '../../data/categories';
import Logo from '../ui/Logo';

function Footer() {
  const mainCategories = categories.slice(0, 8);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col">
          <Logo variant="footer" showText={false} />
          <p className="footer__desc">{company.description}</p>
          <div className="footer__social">
            <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href={company.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Quick Links</h3>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/exhibition">Exhibition</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/inquiry">Inquiry</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Our Products</h3>
          <ul className="footer__links">
            {mainCategories.map((cat) => (
              <li key={cat.slug}>
                <Link to={`/products?category=${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__heading">Contact Details</h3>
          <ul className="footer__contact">
            <li>
              <FiMapPin aria-hidden="true" />
              <span>{company.address}</span>
            </li>
            <li>
              <FiPhone aria-hidden="true" />
              <span>
                <a href={`tel:${company.mobile1.replace(/\s/g, '')}`}>{company.mobile1}</a>
                {' / '}
                <a href={`tel:${company.mobile2.replace(/\s/g, '')}`}>{company.mobile2}</a>
              </span>
            </li>
            <li>
              <FiMail aria-hidden="true" />
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <FiClock aria-hidden="true" />
              <span>{company.workingHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} {company.name}. All Rights Reserved.</p>
          {company.gst && <p>GST: {company.gst}</p>}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
