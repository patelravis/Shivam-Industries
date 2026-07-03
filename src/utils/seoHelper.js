import { company } from '../data/company';

/** Update this to your live domain for WhatsApp / Google OG previews */
export const SITE_URL =
  import.meta.env.VITE_SITE_URL || company.websiteUrl || 'https://shivamindustries.in';

export const DEFAULT_KEYWORDS = [
  'stainless steel products',
  'SS tank manufacturer',
  'SS fabrication',
  'industrial fabrication',
  'stainless steel fabrication',
  'storage tank manufacturer',
  'pharma tank',
  'pharmaceutical equipment',
  'SS 304 pharma furniture',
  'GMP compliant equipment',
  'stainless steel cleanroom furniture',
  'pharma equipment manufacturer India',
  'stainless steel manufacturer India',
  'industrial fabricator Gujarat',
  'Ahmedabad stainless steel manufacturer',
  'Shivam Industries',
  'custom fabrication',
  'industrial equipment',
  'engineering fabrication',
].join(', ');

const ORG_ID = `${SITE_URL.replace(/\/$/, '')}/#organization`;
const WEBSITE_ID = `${SITE_URL.replace(/\/$/, '')}/#website`;

/**
 * @param {string} path
 * @returns {string}
 */
export function toAbsoluteUrl(path = '/') {
  const base = SITE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

/**
 * @param {string} path
 * @returns {string}
 */
export function toAbsoluteImageUrl(imagePath) {
  if (!imagePath) return toAbsoluteUrl(company.logo);
  if (imagePath.startsWith('http')) return imagePath;
  return toAbsoluteUrl(imagePath);
}

/**
 * @param {string} title
 * @param {number} max
 * @returns {string}
 */
export function truncateText(text, max = 160) {
  if (!text || text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

/**
 * @param {string} title
 * @returns {string}
 */
export function buildPageTitle(title) {
  if (!title) return `${company.name} — ${company.tagline}`;
  const full = `${title} | ${company.name}`;
  return full.length <= 60 ? full : truncateText(full, 60);
}

/**
 * @param {string[]} keywordGroups
 * @returns {string}
 */
export function mergeKeywords(...keywordGroups) {
  const all = keywordGroups
    .flat()
    .filter(Boolean)
    .join(', ')
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);

  return [...new Set(all)].join(', ');
}

function buildPostalAddress() {
  const a = company.addressStructured;
  return {
    '@type': 'PostalAddress',
    streetAddress: a.streetAddress,
    addressLocality: a.addressLocality,
    addressRegion: a.addressRegion,
    postalCode: a.postalCode,
    addressCountry: a.addressCountry,
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: company.name,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: toAbsoluteImageUrl(company.logo),
      name: `${company.name} Logo`,
    },
    description: company.description,
    email: company.email,
    telephone: company.mobile1,
    foundingDate: String(company.foundedYear),
    address: buildPostalAddress(),
    sameAs: Object.values(company.social).filter(Boolean),
    areaServed: company.serviceAreas.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
  };
}

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ManufacturingBusiness'],
    '@id': `${SITE_URL.replace(/\/$/, '')}/#localbusiness`,
    name: company.name,
    url: SITE_URL,
    logo: toAbsoluteImageUrl(company.logo),
    image: toAbsoluteImageUrl(company.logo),
    description: company.longDescription || company.description,
    email: company.email,
    telephone: [company.mobile1, company.mobile2],
    priceRange: '₹₹',
    address: buildPostalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
    openingHoursSpecification: company.openingHoursSchema.map((hours) => {
      const [days, time] = hours.split(' ');
      const [opens, closes] = time.split('-');
      const dayMap = { Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday' };
      const dayRange = days.includes('-') ? days.split('-') : [days, days];
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: dayRange.length === 2
          ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].slice(
              ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].indexOf(dayRange[0]),
              ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].indexOf(dayRange[1]) + 1
            )
          : [dayMap[days] || 'Monday'],
        opens,
        closes,
      };
    }),
    areaServed: company.serviceAreas.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    hasMap: company.mapLink,
    sameAs: Object.values(company.social).filter(Boolean),
    parentOrganization: { '@id': ORG_ID },
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: company.name,
    url: SITE_URL,
    description: company.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/products?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * @param {object} product
 * @returns {object}
 */
export function buildProductSchema(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((img) => toAbsoluteImageUrl(img)),
    sku: product.slug,
    brand: {
      '@type': 'Brand',
      name: company.name,
    },
    manufacturer: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: company.name,
      url: SITE_URL,
    },
    category: product.categoryName,
    url: toAbsoluteUrl(`/product/${product.slug}`),
    offers: {
      '@type': 'Offer',
      url: toAbsoluteUrl(`/product/${product.slug}`),
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
      seller: { '@id': ORG_ID },
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'INR',
        description: 'Contact for custom quote',
      },
    },
  };
}

/**
 * @param {{ name: string, path: string }[]} items
 * @returns {object}
 */
export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

/**
 * @param {{ question: string, answer: string }[]} faqs
 * @returns {object}
 */
export function buildFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * @param {object} service
 * @returns {object}
 */
export function buildServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: { '@id': ORG_ID },
    areaServed: company.serviceAreas.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    url: toAbsoluteUrl(`/services#${service.slug}`),
  };
}

/**
 * @param {object[]} productList
 * @returns {object}
 */
export function buildItemListSchema(productList, listName = 'Product Catalog') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: productList.length,
    itemListElement: productList.slice(0, 50).map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: toAbsoluteUrl(`/product/${product.slug}`),
      name: product.name,
    })),
  };
}

export function buildContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${company.name}`,
    url: toAbsoluteUrl('/contact'),
    description: `Contact ${company.name} for stainless steel fabrication and pharma equipment quotes in Ahmedabad, Gujarat.`,
    mainEntity: { '@id': `${SITE_URL.replace(/\/$/, '')}/#localbusiness` },
  };
}

export function buildAboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${company.name}`,
    url: toAbsoluteUrl('/about'),
    description: company.longDescription || company.description,
    mainEntity: { '@id': ORG_ID },
  };
}

/**
 * @param {object[]} testimonials
 * @returns {object}
 */
export function buildReviewSchema(testimonials) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: company.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: String(testimonials.length),
      bestRating: '5',
    },
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(t.rating || 5),
        bestRating: '5',
      },
      reviewBody: t.text,
      publisher: { '@type': 'Organization', name: t.company },
    })),
  };
}

/**
 * @param {object} product
 * @param {{ question: string, answer: string }[]} faqs
 * @returns {object[]}
 */
export function buildProductPageSchemas(product, faqs) {
  return [
    buildProductSchema(product),
    buildBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: product.name, path: `/product/${product.slug}` },
    ]),
    buildFAQSchema(faqs),
  ];
}
