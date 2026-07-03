import { FiPhone, FiMail } from 'react-icons/fi';
import { company } from '../../data/company';

function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <span className="topbar__welcome">Welcome to {company.name}</span>
        <div className="topbar__contacts">
          <a href={`tel:${company.mobile1.replace(/\s/g, '')}`} className="topbar__link">
            <FiPhone aria-hidden="true" />
            <span>{company.mobile1}</span>
          </a>
          <a href={`mailto:${company.email}`} className="topbar__link topbar__link--email">
            <FiMail aria-hidden="true" />
            <span>{company.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
