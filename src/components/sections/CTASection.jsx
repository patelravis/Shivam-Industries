import Button from '../ui/Button';
import { useInquiry } from '../../context/InquiryContext';

function CTASection() {
  const { openInquiry } = useInquiry();

  return (
    <section className="cta-banner">
      <div className="container cta-banner__inner">
        <h2 className="cta-banner__title">Need a Custom Quote?</h2>
        <p className="cta-banner__text">
          Tell us your requirements — we&apos;ll design and manufacture equipment tailored to your facility.
        </p>
        <Button variant="dark" size="lg" onClick={() => openInquiry()}>
          Send Inquiry
        </Button>
      </div>
    </section>
  );
}

export default CTASection;
