import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { company } from '../../data/company';

function Logo({ className = '', showText = true, variant = 'navbar' }) {
  return (
    <Link to="/" className={`logo logo--${variant} ${className}`.trim()} aria-label={company.name}>
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className="logo__image"
        loading="eager"
      />
      {showText && <span className="logo__text">{company.name}</span>}
    </Link>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
  showText: PropTypes.bool,
  variant: PropTypes.oneOf(['navbar', 'footer']),
};

export default Logo;
