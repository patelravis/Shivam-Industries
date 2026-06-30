import SectionTitle from '../ui/SectionTitle';
import { testimonials, clients } from '../../data/company';

function TestimonialsSection() {
  return (
    <section className="section testimonials" id="clients">
      <div className="container">
        <SectionTitle subtitle="Trusted By" title="Our Clients & Testimonials" />
      </div>

      <div className="marquee marquee--clients">
        <div className="marquee__track">
          {[...clients, ...clients].map((name, i) => (
            <span key={`${name}-${i}`} className="marquee__item marquee__item--client">
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="marquee marquee--testimonials">
        <div className="marquee__track marquee__track--reverse">
          {[...testimonials, ...testimonials].map((t, i) => (
            <blockquote key={`${t.name}-${i}`} className="testimonial-card">
              <p>&ldquo;{t.text}&rdquo;</p>
              <footer>
                <strong>{t.name}</strong>
                <span>{t.company}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
