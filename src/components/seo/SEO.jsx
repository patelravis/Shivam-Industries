import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { company } from '../../data/company';
import {
  buildPageTitle,
  mergeKeywords,
  toAbsoluteUrl,
  toAbsoluteImageUrl,
  DEFAULT_KEYWORDS,
  SITE_URL,
} from '../../utils/seoHelper';

function SEO({
  title,
  description,
  keywords = [],
  image,
  path = '/',
  type = 'website',
  noindex = false,
  jsonLd = [],
}) {
  const pageTitle = buildPageTitle(title);
  const metaDescription = description || company.description;
  const metaKeywords = mergeKeywords(DEFAULT_KEYWORDS, keywords);
  const canonicalUrl = toAbsoluteUrl(path);
  const ogImage = toAbsoluteImageUrl(image || company.logo);
  const robots = noindex ? 'noindex, nofollow' : 'index, follow';

  const schemas = Array.isArray(jsonLd) ? jsonLd : [jsonLd].filter(Boolean);

  return (
    <Helmet>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={company.name} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph — WhatsApp, Facebook, LinkedIn */}
      <meta property="og:site_name" content={company.name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:alt" content={title || company.name} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:locale" content="en_IN" />

      {type === 'product' && title && (
        <>
          <meta property="product:brand" content={company.name} />
          <meta property="product:condition" content="new" />
          <meta property="product:availability" content="in stock" />
          <meta property="product:category" content="Pharmaceutical Equipment" />
        </>
      )}

      {/* Twitter / X Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title || company.name} />

      {/* WhatsApp specific (uses OG but explicit helps some crawlers) */}
      <meta itemProp="name" content={pageTitle} />
      <meta itemProp="description" content={metaDescription} />
      <meta itemProp="image" content={ogImage} />

      {schemas.map((schema, index) => (
        <script key={`${schema['@type']}-${index}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  path: PropTypes.string,
  type: PropTypes.oneOf(['website', 'article', 'product']),
  noindex: PropTypes.bool,
  jsonLd: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

export { SITE_URL };
export default SEO;
