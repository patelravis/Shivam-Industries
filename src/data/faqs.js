import { company } from './company';

export const faqs = [
  {
    question: 'What products does Shivam Industries manufacture?',
    answer: `${company.name} manufactures a wide range of SS 304/316 GMP-compliant pharmaceutical equipment including lockers, cupboards, HPLC column cabinets, trolleys, intermediate bulk containers, tanks, vessels, tables, sinks, and cleanroom accessories.`,
    category: 'General',
  },
  {
    question: 'Where is Shivam Industries located?',
    answer: `Our manufacturing facility is located at ${company.address}. We serve clients across Ahmedabad, Gujarat, and pan-India.`,
    category: 'General',
  },
  {
    question: 'What stainless steel grades do you use?',
    answer: 'We primarily use SS 304 and SS 316 grade stainless steel depending on application requirements. SS 304 is ideal for general pharma use; SS 316 offers superior corrosion resistance for harsh chemical environments.',
    category: 'Materials',
  },
  {
    question: 'Are your products GMP compliant?',
    answer: 'Yes. All Shivam Industries equipment is designed and manufactured to meet GMP (Good Manufacturing Practice) standards with smooth finishes, hygienic construction, and documentation support for regulatory audits.',
    category: 'Quality',
  },
  {
    question: 'Do you offer custom fabrication?',
    answer: 'Yes. We provide custom stainless steel fabrication including tailored dimensions, configurations, and specialty features for storage tanks, furniture, and industrial equipment based on your facility requirements.',
    category: 'Services',
  },
  {
    question: 'What industries do you serve?',
    answer: 'We serve pharmaceutical, biotechnology, healthcare, food & beverage, dairy, chemical, cosmetics, and research laboratory industries across India.',
    category: 'Industries',
  },
  {
    question: 'How can I request a quote?',
    answer: `Submit an inquiry via our website at /inquiry, call ${company.mobile1}, or email ${company.email}. Our team responds within one business day with pricing and delivery details.`,
    category: 'General',
  },
  {
    question: 'Do you deliver across India?',
    answer: 'Yes. Shivam Industries offers pan-India delivery with secure packaging and logistics support to major cities including Mumbai, Delhi, Hyderabad, Bangalore, Chennai, and all Gujarat locations.',
    category: 'Delivery',
  },
  {
    question: 'What is your manufacturing capacity?',
    answer: 'Our Ahmedabad facility has produced 500+ products for 200+ satisfied clients over 15+ years, with capacity for bulk orders, custom projects, and repeat production runs.',
    category: 'Company',
  },
  {
    question: 'Are you ISO certified?',
    answer: 'Yes. Shivam Industries maintains ISO certification for quality management systems. View our ISO certificate on the homepage or contact us for compliance documentation.',
    category: 'Quality',
  },
  {
    question: 'What is the difference between SS 304 and SS 316?',
    answer: 'SS 304 is cost-effective and suitable for most pharmaceutical applications. SS 316 contains molybdenum for enhanced corrosion resistance, making it ideal for chemical processing, saline environments, and aggressive cleaning agents.',
    category: 'Materials',
  },
  {
    question: 'Do you manufacture storage tanks?',
    answer: 'Yes. We fabricate stainless steel storage tanks, vessels, canisters, and barrels for pharmaceutical, chemical, food, and dairy applications with custom capacity and fittings.',
    category: 'Products',
  },
  {
    question: 'Can you help with cleanroom furniture?',
    answer: 'Absolutely. Our product range includes cleanroom lockers, garment cupboards, cross-over benches, tables, trolleys, and accessories designed for controlled environments.',
    category: 'Products',
  },
  {
    question: 'What finishing options are available?',
    answer: 'We offer matt finish, mirror polish, and electro-polished surfaces depending on product type and GMP requirements. All finishes are designed for easy cleaning and hygiene maintenance.',
    category: 'Manufacturing',
  },
  {
    question: 'Do you provide installation support?',
    answer: 'Yes. We offer on-site installation guidance and support for complex equipment. Contact our team to discuss installation requirements for your project.',
    category: 'Services',
  },
  {
    question: 'What is the typical lead time for orders?',
    answer: 'Lead time varies by product and quantity. Standard items typically ship within 2–4 weeks; custom fabrication projects may require 4–8 weeks. We provide confirmed timelines with every quote.',
    category: 'Delivery',
  },
  {
    question: 'Do you supply HPLC column cabinets?',
    answer: 'Yes. Our HPLC column cabinets are purpose-built for analytical laboratories with secure storage, organization, and SS construction for pharma R&D and QC departments.',
    category: 'Products',
  },
  {
    question: 'What payment terms do you offer?',
    answer: 'Payment terms are discussed per order. We typically require an advance for custom fabrication with balance on delivery. Contact our sales team for detailed commercial terms.',
    category: 'General',
  },
  {
    question: 'Can I visit your manufacturing facility?',
    answer: `Yes. We welcome facility visits by appointment at our Ahmedabad plant. Call ${company.mobile1} or email ${company.email} to schedule a visit during working hours (${company.workingHours}).`,
    category: 'Company',
  },
  {
    question: 'Do you export products internationally?',
    answer: 'Currently our primary market is India with pan-India delivery. For international inquiries, contact us directly to discuss export feasibility and requirements.',
    category: 'Delivery',
  },
  {
    question: 'What quality control measures do you follow?',
    answer: 'Every product undergoes dimensional inspection, material verification, weld quality checks, and surface finish inspection. We maintain ISO-certified quality management processes throughout manufacturing.',
    category: 'Quality',
  },
  {
    question: 'Do you manufacture intermediate bulk containers (IBCs)?',
    answer: 'Yes. Our IBCs are designed for bulk powder and material handling in pharmaceutical and chemical production with SS construction and GMP-compliant design.',
    category: 'Products',
  },
  {
    question: 'What warranty do you provide?',
    answer: 'We stand behind our craftsmanship with a manufacturing warranty against defects. Specific warranty terms are provided with each order confirmation.',
    category: 'Quality',
  },
  {
    question: 'How do I choose the right SS grade for my application?',
    answer: 'Our engineering team helps you select SS 304 or SS 316 based on your process chemicals, cleaning agents, environment, and regulatory requirements. Contact us for a free consultation.',
    category: 'Materials',
  },
  {
    question: 'Do you offer bulk order discounts?',
    answer: 'Yes. We provide competitive pricing for bulk orders and long-term supply contracts. Share your quantity requirements for a customized quotation.',
    category: 'General',
  },
  {
    question: 'What documentation do you provide with products?',
    answer: 'We provide material certificates, GMP compliance documentation, inspection reports, and product specifications as required for your quality and regulatory needs.',
    category: 'Quality',
  },
  {
    question: 'Are your products suitable for food and dairy industries?',
    answer: 'Yes. Our SS 304/316 equipment meets hygiene standards for food processing, dairy, and beverage industries with food-grade stainless steel construction.',
    category: 'Industries',
  },
  {
    question: 'How do I maintain stainless steel pharma equipment?',
    answer: 'Use approved cleaning agents compatible with SS 304/316, avoid chloride-based cleaners on SS 316, wipe dry after cleaning, and inspect welds and surfaces during scheduled maintenance.',
    category: 'Maintenance',
  },
  {
    question: 'What makes Shivam Industries different from other fabricators?',
    answer: '15+ years of pharma-focused experience, ISO certification, GMP expertise, custom fabrication capability, SS 304/316 specialization, and dedicated pan-India support set us apart from general fabricators.',
    category: 'Company',
  },
  {
    question: 'Do you attend pharmaceutical exhibitions?',
    answer: 'Yes. Shivam Industries participates in pharmaceutical and industrial exhibitions across India. Visit our Exhibition page for upcoming and past events.',
    category: 'Company',
  },
];

export function getFaqsByCategory() {
  const grouped = {};
  faqs.forEach((faq) => {
    if (!grouped[faq.category]) grouped[faq.category] = [];
    grouped[faq.category].push(faq);
  });
  return grouped;
}
