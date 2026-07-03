import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiCheck } from 'react-icons/fi';
import Breadcrumb from '../components/ui/Breadcrumb';
import Button from '../components/ui/Button';
import SEO from '../components/seo/SEO';
import { company } from '../data/company';
import { products } from '../data/products';
import { buildBreadcrumbSchema, buildLocalBusinessSchema, buildContactPageSchema } from '../utils/seoHelper';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) next.email = 'Valid email required';
    if (!form.phone.trim()) next.phone = 'Required';
    if (!form.message.trim()) next.message = 'Required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Contact — Ahmedabad, Gujarat"
        description={`Contact ${company.name} for SS fabrication & pharma equipment quotes. Call ${company.mobile1}. Factory: Ahmedabad, Gujarat 382433. Mon–Sat 9AM–6PM. Request a quote today.`}
        keywords={[
          'contact Shivam Industries',
          'SS fabrication quote Ahmedabad',
          'pharma equipment supplier Gujarat',
          'stainless steel manufacturer contact',
        ]}
        path="/contact"
        jsonLd={[
          buildContactPageSchema(),
          buildLocalBusinessSchema(),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact Us', path: '/contact' },
          ]),
        ]}
      />
      <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="page-banner">
        <div className="container">
          <Breadcrumb items={[{ label: 'Contact Us' }]} />
          <h1 className="page-banner__title">Contact Us</h1>
          <p className="page-banner__subtitle">We&apos;d love to hear from you. Reach out for quotes, support, or partnerships.</p>
        </div>
      </div>

      <section className="section contact-page">
        <div className="container contact-page__grid">
          <div className="contact-info">
            <div className="contact-card">
              <FiMapPin aria-hidden="true" />
              <h3>Address</h3>
              <p itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">{company.addressStructured.streetAddress}</span>,
                {' '}<span itemProp="addressLocality">{company.addressStructured.addressLocality}</span>,
                {' '}<span itemProp="addressRegion">{company.addressStructured.addressRegion}</span>
                {' '}<span itemProp="postalCode">{company.addressStructured.postalCode}</span>,
                {' '}<span itemProp="addressCountry">{company.addressStructured.addressCountry}</span>
              </p>
              <a href={company.mapLink} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
            </div>
            <div className="contact-card">
              <FiPhone aria-hidden="true" />
              <h3>Phone</h3>
              <p>
                <a href={`tel:${company.mobile1.replace(/\s/g, '')}`}>{company.mobile1}</a>
                <br />
                <a href={`tel:${company.mobile2.replace(/\s/g, '')}`}>{company.mobile2}</a>
              </p>
            </div>
            <div className="contact-card">
              <FiMail aria-hidden="true" />
              <h3>Email</h3>
              <p><a href={`mailto:${company.email}`}>{company.email}</a></p>
            </div>
            <div className="contact-card">
              <FiClock aria-hidden="true" />
              <h3>Working Hours</h3>
              <p>{company.workingHours}</p>
            </div>
          </div>

          <div className="contact-form-wrap">
            {submitted ? (
              <motion.div
                className="inquiry-success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="inquiry-success__icon"><FiCheck /></div>
                <h3>Message Sent!</h3>
                <p>Thank you for contacting us. We&apos;ll respond shortly.</p>
              </motion.div>
            ) : (
              <form className="inquiry-form" onSubmit={handleSubmit} noValidate>
                <h2>Send a Message</h2>
                <div className="inquiry-form__field">
                  <label htmlFor="contact-name">Full Name *</label>
                  <input
                    id="contact-name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={errors.name ? 'inquiry-form__input--error' : ''}
                  />
                  {errors.name && <span className="inquiry-form__error">{errors.name}</span>}
                </div>
                <div className="inquiry-form__row">
                  <div className="inquiry-form__field">
                    <label htmlFor="contact-email">Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={errors.email ? 'inquiry-form__input--error' : ''}
                    />
                    {errors.email && <span className="inquiry-form__error">{errors.email}</span>}
                  </div>
                  <div className="inquiry-form__field">
                    <label htmlFor="contact-phone">Phone *</label>
                    <input
                      id="contact-phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={errors.phone ? 'inquiry-form__input--error' : ''}
                    />
                    {errors.phone && <span className="inquiry-form__error">{errors.phone}</span>}
                  </div>
                </div>
                <div className="inquiry-form__field">
                  <label htmlFor="contact-product">Product Interest</label>
                  <select
                    id="contact-product"
                    value={form.product}
                    onChange={(e) => setForm({ ...form, product: e.target.value })}
                  >
                    <option value="">Select a product</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <div className="inquiry-form__field">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={errors.message ? 'inquiry-form__input--error' : ''}
                  />
                  {errors.message && <span className="inquiry-form__error">{errors.message}</span>}
                </div>
                <Button type="submit" variant="primary" size="lg">Send Message</Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="contact-map">
        <iframe
          title="Shivam Industries Location"
          src={company.mapEmbedUrl}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </motion.main>
    </>
  );
}

export default Contact;
