import Modal from './Modal';
import InquiryForm from './InquiryForm';
import { useInquiry } from '../../context/InquiryContext';

function InquiryModal() {
  const { isOpen, prefillProduct, closeInquiry } = useInquiry();

  return (
    <Modal isOpen={isOpen} onClose={closeInquiry} title="Send Inquiry">
      <InquiryForm prefillProduct={prefillProduct} compact />
    </Modal>
  );
}

export default InquiryModal;
