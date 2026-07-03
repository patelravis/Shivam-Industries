import { company } from '../data/company';

const CATEGORY_APPLICATIONS = {
  lockers: ['Cleanroom garment storage', 'Personnel changing areas', 'GMP-compliant facilities'],
  cupboard: ['Sterile garment storage', 'Cleanroom material handling', 'Pharma production zones'],
  'cross-over-benches': ['Cleanroom entry/exit', 'Gowning areas', 'Personnel decontamination zones'],
  'in-process-container': ['Material transfer in production', 'Batch processing', 'API handling'],
  'intermediate-bulk-container': ['Bulk powder handling', 'Material storage & transfer', 'Formulation units'],
  'tank-vessels-canister-barrel': ['Liquid storage', 'Chemical handling', 'Process vessels'],
  'dies-punch-cabinet': ['Tablet compression areas', 'Tool storage', 'Tool room management'],
  table: ['Production workstations', 'QC/IPQA inspection', 'Material preparation'],
  trolley: ['Material movement', 'Cleanroom logistics', 'Production floor transport'],
  'hplc-column-cabinet': ['HPLC column storage', 'Analytical labs', 'R&D departments'],
  'material-handling': ['Warehouse operations', 'Material lifting', 'Production logistics'],
  sink: ['Hand washing stations', 'Cleanroom hygiene', 'Production area sanitation'],
  'chair-stool': ['Cleanroom seating', 'Production break areas', 'Laboratory seating'],
  accessories: ['Facility accessories', 'Maintenance support', 'Production accessories'],
};

const CATEGORY_INDUSTRIES = {
  default: ['Pharmaceutical', 'Biotechnology', 'Healthcare', 'Food Processing', 'Chemical'],
};

/**
 * @param {object} product
 * @returns {string}
 */
export function buildProductMetaTitle(product) {
  const base = `${product.name} — SS Pharma Equipment`;
  const withBrand = `${base} | ${company.name}`;
  if (withBrand.length <= 60) return base;
  const short = `${product.name} | SS Equipment`;
  if (`${short} | ${company.name}`.length <= 60) return short;
  return product.name;
}

/**
 * @param {object} product
 * @returns {string}
 */
export function buildProductMetaDescription(product) {
  const location = 'Ahmedabad, Gujarat';
  const base = `${product.shortDescription} SS 304/316 GMP-compliant ${product.name} by ${company.name}, ${location}. Custom sizes available.`;
  const cta = ' Request a quote today.';
  const full = base + cta;
  if (full.length <= 160) return full;
  const trimmed = `${product.shortDescription} Buy ${product.name} from ${company.name}, ${location}. GMP compliant. Request a quote.`;
  return trimmed.length <= 160 ? trimmed : trimmed.slice(0, 157) + '…';
}

/**
 * @param {object} product
 * @returns {string[]}
 */
export function getProductApplications(product) {
  return CATEGORY_APPLICATIONS[product.category] || [
    `${product.categoryName} applications in pharma facilities`,
    'GMP-compliant production areas',
    'Cleanroom and controlled environments',
  ];
}

/**
 * @param {object} product
 * @returns {string[]}
 */
export function getProductIndustries(product) {
  return CATEGORY_INDUSTRIES[product.category] || CATEGORY_INDUSTRIES.default;
}

/**
 * @param {object} product
 * @returns {string[]}
 */
export function getProductAdvantages(product) {
  return [
    `Manufactured from premium SS 304/316 grade stainless steel for ${product.name.toLowerCase()} applications`,
    'GMP-compliant design with smooth, hygienic finishes',
    'Custom dimensions and configurations available on request',
    'Rigorous quality control and ISO-certified manufacturing',
    'Pan-India delivery with installation support',
    'Competitive pricing with dedicated after-sales service',
  ];
}

/**
 * @param {object} product
 * @returns {string}
 */
export function getProductLongDescription(product) {
  return `${company.name} manufactures the ${product.name} as part of our comprehensive range of stainless steel pharmaceutical equipment. ${product.shortDescription} Built from SS 304 or SS 316 grade stainless steel, this ${product.categoryName.toLowerCase()} product is engineered for GMP-compliant cleanroom and production environments across India.

Our ${product.name} is designed for pharmaceutical, biotechnology, healthcare, food processing, and chemical industries where hygiene, durability, and regulatory compliance are critical. Each unit undergoes strict quality inspection before dispatch from our Ahmedabad manufacturing facility.

Whether you need standard sizes or custom fabrication, our engineering team works closely with your facility requirements. We offer technical consultation, GMP documentation support, and reliable pan-India delivery. Contact ${company.name} today for a tailored quote on ${product.name} and related ${product.categoryName.toLowerCase()} equipment.`;
}

/**
 * @param {object} product
 * @returns {{ question: string, answer: string }[]}
 */
export function getProductFaqs(product) {
  return [
    {
      question: `What material is the ${product.name} made from?`,
      answer: `The ${product.name} is manufactured from SS 304 or SS 316 grade stainless steel, selected based on your application requirements. Both grades offer excellent corrosion resistance and meet GMP hygiene standards.`,
    },
    {
      question: `Is the ${product.name} GMP compliant?`,
      answer: `Yes. ${company.name} designs and manufactures the ${product.name} to meet GMP compliance requirements for pharmaceutical and cleanroom environments, with smooth finishes and hygienic construction.`,
    },
    {
      question: `Can I get custom sizes for ${product.name}?`,
      answer: `Absolutely. We offer custom fabrication for ${product.name} including tailored dimensions, configurations, and optional features. Share your facility layout and requirements for a detailed quote.`,
    },
    {
      question: `What industries use ${product.name}?`,
      answer: `The ${product.name} is widely used in pharmaceutical, biotechnology, healthcare, food processing, dairy, and chemical industries where stainless steel equipment and GMP standards are essential.`,
    },
    {
      question: `How do I request a quote for ${product.name}?`,
      answer: `Submit an inquiry through our website contact form, call ${company.mobile1}, or email ${company.email}. Our team responds within one business day with pricing and delivery timelines.`,
    },
  ];
}
