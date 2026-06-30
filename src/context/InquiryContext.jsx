import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const InquiryContext = createContext(null);

export function InquiryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillProduct, setPrefillProduct] = useState('');

  const openInquiry = useCallback((productName = '') => {
    setPrefillProduct(productName);
    setIsOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setIsOpen(false);
    setPrefillProduct('');
  }, []);

  return (
    <InquiryContext.Provider
      value={{ isOpen, prefillProduct, openInquiry, closeInquiry }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

InquiryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within InquiryProvider');
  }
  return context;
}

export default InquiryContext;
