import { company } from '../data/company';

/** Update this to your live domain for WhatsApp / Google OG previews */
export const SITE_URL =
  import.meta.env.VITE_SITE_URL || company.websiteUrl || 'https://www.shivamindustries.com';

export const DEFAULT_KEYWORDS = [
  'pharmaceutical equipment',
  'SS 304 pharma furniture',
  'GMP compliant equipment',
  'stainless steel cleanroom furniture',
  'pharma equipment manufacturer India',
  'HPLC column cabinet',
  'pharmaceutical trolleys',
  'intermediate bulk container',
  'Shivam Industries',
  'Ahmedabad pharma equipment',
  'SS 316 pharma equipment',
  'cleanroom lockers',
  'pharma sink units',
  'ISO certified pharma manufacturer',
].join(', ');

/**
 * Converts a public path to an absolute URL for OG / canonical tags.
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
 * @returns {string}
 */
export function buildPageTitle(title) {
  if (!title) return `${company.name} — ${company.tagline}`;
  return `${title} | ${company.name}`;
}

/**
 * @param {string[]} keywords
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
    image: toAbsoluteImageUrl(product.images[0]),
    brand: {
      '@type': 'Brand',
      name: company.name,
    },
    manufacturer: {
      '@type': 'Organization',
      name: company.name,
      url: SITE_URL,
    },
    category: product.categoryName,
    url: toAbsoluteUrl(`/product/${product.slug}`),
  };
}

/**
 * @param {object} product
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

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: SITE_URL,
    logo: toAbsoluteImageUrl(company.logo),
    description: company.description,
    email: company.email,
    telephone: company.mobile1,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address,
      addressCountry: 'IN',
    },
    sameAs: Object.values(company.social),
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: company.name,
    url: SITE_URL,
    description: company.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/products?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
