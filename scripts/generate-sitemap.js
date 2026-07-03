/**
 * Generates sitemap index, page sitemap, product sitemap, image sitemap, and products-meta.json.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const SITE_URL = (process.env.VITE_SITE_URL || 'https://shivamindustries.in').replace(/\/$/, '');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function parseImageMap(source) {
  const map = {};
  const block = source.match(/const IMAGE_MAP = \{([\s\S]*?)\};/);
  if (!block) return map;
  [...block[1].matchAll(/(?:"([^"]+)"|'([^']+)')\s*:\s*'([^']+)'/g)].forEach((m) => {
    map[m[1] || m[2]] = m[3];
  });
  return map;
}

function parseCategories(source) {
  return [...source.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
}

function getImagePath(name, imageMap) {
  const file = imageMap[name] || `${name}.jpg`;
  return `/images/products/${file}`;
}

const productsSource = readFileSync(join(root, 'src/data/products.js'), 'utf8');
const categoriesSource = readFileSync(join(root, 'src/data/categories.js'), 'utf8');
const helperSource = readFileSync(join(root, 'src/utils/imageHelper.js'), 'utf8');
const imageMap = parseImageMap(helperSource);
const categorySlugs = parseCategories(categoriesSource);

const defsBlock = productsSource.split('const productDefinitions = [')[1]?.split('];')[0] || '';

const products = [...defsBlock.matchAll(
  /name:\s*'([^']+)',\s*\n\s*shortDescription:\s*'([^']+)'/g
)].map((match) => ({
  name: match[1],
  slug: slugify(match[1]),
  shortDescription: match[2],
  imagePath: getImagePath(match[1], imageMap),
}));

const today = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/services', priority: '0.85', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/exhibition', priority: '0.7', changefreq: 'monthly' },
  { path: '/clients', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/faq', priority: '0.75', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
];

const categoryRoutes = categorySlugs.map((slug) => ({
  path: `/products?category=${slug}`,
  priority: '0.75',
  changefreq: 'weekly',
}));

function urlEntry(loc, priority, changefreq) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const pageUrls = [...staticRoutes, ...categoryRoutes];
const pagesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pageUrls.map((r) => urlEntry(`${SITE_URL}${r.path}`, r.priority, r.changefreq)).join('\n')}
</urlset>
`;

const productsXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${products.map((p) => urlEntry(`${SITE_URL}/product/${p.slug}`, '0.7', 'weekly')).join('\n')}
</urlset>
`;

const imagesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${products
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}/product/${p.slug}</loc>
    <image:image>
      <image:loc>${SITE_URL}${p.imagePath}</image:loc>
      <image:title>${escapeXml(p.name)}</image:title>
      <image:caption>${escapeXml(p.shortDescription)}</image:caption>
    </image:image>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-products.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-images.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;

const ogMeta = products.map((p) => ({
  slug: p.slug,
  name: p.name,
  description: p.shortDescription,
  image: `${SITE_URL}${p.imagePath}`,
  url: `${SITE_URL}/product/${p.slug}`,
}));

const publicDir = join(root, 'public');
mkdirSync(join(publicDir, 'og'), { recursive: true });

writeFileSync(join(publicDir, 'sitemap.xml'), sitemapIndex, 'utf8');
writeFileSync(join(publicDir, 'sitemap-pages.xml'), pagesXml, 'utf8');
writeFileSync(join(publicDir, 'sitemap-products.xml'), productsXml, 'utf8');
writeFileSync(join(publicDir, 'sitemap-images.xml'), imagesXml, 'utf8');
writeFileSync(join(publicDir, 'products-meta.json'), JSON.stringify(ogMeta, null, 2), 'utf8');

const totalUrls = pageUrls.length + products.length;
console.log(`✓ sitemap.xml (index) — 3 sitemaps, ${totalUrls} total URLs`);
console.log(`✓ sitemap-pages.xml — ${pageUrls.length} URLs`);
console.log(`✓ sitemap-products.xml — ${products.length} products`);
console.log(`✓ sitemap-images.xml — ${products.length} product images`);
console.log(`✓ products-meta.json — ${ogMeta.length} products`);
