import { useState } from 'react';
import PropTypes from 'prop-types';
import { FiChevronDown } from 'react-icons/fi';

function FAQSection({ faqs, title = 'Frequently Asked Questions', subtitle = 'Common Questions' }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section faq-section" aria-labelledby="faq-heading">
      <div className="container">
        <div className="section-title section-title--center">
          <span className="section-title__subtitle">{subtitle}</span>
          <h2 id="faq-heading" className="section-title__heading">{title}</h2>
          <div className="section-title__line" />
        </div>
        <div className="faq-list" role="list">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <article key={faq.question} className="faq-item" role="listitem">
                <h3 className="faq-item__heading">
                  <button
                    id={buttonId}
                    type="button"
                    className={`faq-item__trigger ${isOpen ? 'faq-item__trigger--open' : ''}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                  >
                    {faq.question}
                    <FiChevronDown aria-hidden="true" className="faq-item__icon" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`faq-item__panel ${isOpen ? 'faq-item__panel--open' : ''}`}
                  hidden={!isOpen}
                >
                  <p>{faq.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

FAQSection.propTypes = {
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default FAQSection;
