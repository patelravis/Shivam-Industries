/**
 * Generates sitemap.xml and products-meta.json for OG / SEO.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const SITE_URL = process.env.VITE_SITE_URL || 'https://www.shivamindustries.com';

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

function getImagePath(name, imageMap) {
  const file = imageMap[name] || `${name}.jpg`;
  return `/images/products/${file}`;
}

const productsSource = readFileSync(join(root, 'src/data/products.js'), 'utf8');
const helperSource = readFileSync(join(root, 'src/utils/imageHelper.js'), 'utf8');
const imageMap = parseImageMap(helperSource);

const defsBlock = productsSource.split('const productDefinitions = [')[1]?.split('];')[0] || '';

const products = [...defsBlock.matchAll(
  /name:\s*'([^']+)',\s*\n\s*shortDescription:\s*'([^']+)'/g
)].map((match) => ({
  name: match[1],
  slug: slugify(match[1]),
  shortDescription: match[2],
  imagePath: getImagePath(match[1], imageMap),
}));

const staticRoutes = ['/', '/products', '/about', '/exhibition', '/clients', '/contact', '/inquiry'];

const urls = [
  ...staticRoutes.map((path) => ({ loc: `${SITE_URL}${path}`, priority: path === '/' ? '1.0' : '0.8' })),
  ...products.map((p) => ({ loc: `${SITE_URL}/product/${p.slug}`, priority: '0.7' })),
];

const today = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
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

writeFileSync(join(publicDir, 'sitemap.xml'), xml, 'utf8');
writeFileSync(join(publicDir, 'products-meta.json'), JSON.stringify(ogMeta, null, 2), 'utf8');
console.log(`✓ sitemap.xml — ${urls.length} URLs`);
console.log(`✓ products-meta.json — ${ogMeta.length} products`);
