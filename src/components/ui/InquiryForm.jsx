import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import Button from './Button';
import { products } from '../../data/products';
import { company } from '../../data/company';

const INQUIRY_EMAIL = company.inquiryEmail || company.email;
const FORMSUBMIT_ACTION = `https://formsubmit.co/${encodeURIComponent(INQUIRY_EMAIL)}`;

function InquiryForm({ prefillProduct = '', onSuccess, compact = false }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    product: prefillProduct,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (prefillProduct) {
      setForm((prev) => ({ ...prev, product: prefillProduct }));
    }
  }, [prefillProduct]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('inquiry') === 'sent') {
      setSubmitted(true);
      onSuccess?.();
    }
  }, [onSuccess]);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) next.email = 'Valid email required';
    if (!form.phone.trim()) next.phone = 'Phone is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    if (!validate()) {
      e.preventDefault();
    }
  };

  const returnUrl = `${window.location.origin}${window.location.pathname}?inquiry=sent`;

  if (submitted) {
    return (
      <motion.div
        className="inquiry-success"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <div className="inquiry-success__icon">
          <FiCheck />
        </div>
        <h3>Thank you!</h3>
        <p>
          Your inquiry has been sent to{' '}
          <a href={`mailto:${INQUIRY_EMAIL}`}>{INQUIRY_EMAIL}</a>.
          We&apos;ll get back to you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      className={`inquiry-form ${compact ? 'inquiry-form--compact' : ''}`}
      action={FORMSUBMIT_ACTION}
      method="POST"
      onSubmit={handleSubmit}
      noValidate
    >
      <input type="hidden" name="_subject" value="[Shivam Industries] Product Inquiry" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value={returnUrl} />

      <div className="inquiry-form__field">
        <label htmlFor="inq-name">Full Name *</label>
        <input
          id="inq-name"
          name="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={errors.name ? 'inquiry-form__input--error' : ''}
        />
        {errors.name && <span className="inquiry-form__error">{errors.name}</span>}
      </div>

      <div className="inquiry-form__row">
        <div className="inquiry-form__field">
          <label htmlFor="inq-email">Email *</label>
          <input
            id="inq-email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={errors.email ? 'inquiry-form__input--error' : ''}
          />
          {errors.email && <span className="inquiry-form__error">{errors.email}</span>}
        </div>
        <div className="inquiry-form__field">
          <label htmlFor="inq-phone">Phone *</label>
          <input
            id="inq-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={errors.phone ? 'inquiry-form__input--error' : ''}
          />
          {errors.phone && <span className="inquiry-form__error">{errors.phone}</span>}
        </div>
      </div>

      <div className="inquiry-form__field">
        <label htmlFor="inq-product">Product Name</label>
        {!compact ? (
          <select
            id="inq-product"
            name="product"
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
          >
            <option value="">Select a product (optional)</option>
            {products.map((p) => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>
        ) : (
          <input
            id="inq-product"
            name="product"
            type="text"
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
            readOnly={!!prefillProduct}
          />
        )}
      </div>

      <div className="inquiry-form__field">
        <label htmlFor="inq-message">Message</label>
        <textarea
          id="inq-message"
          name="message"
          rows={compact ? 3 : 5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Describe your requirements..."
        />
      </div>

      <Button type="submit" variant="primary" size="lg">
        Submit Inquiry
      </Button>
    </form>
  );
}

InquiryForm.propTypes = {
  prefillProduct: PropTypes.string,
  onSuccess: PropTypes.func,
  compact: PropTypes.bool,
};

export default InquiryForm;
