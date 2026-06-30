/**
 * Maps product/category display names to actual filenames in /public/images/products/.
 * Source files use varied naming; this map keeps getProductImage() as the single entry point.
 */
const IMAGE_MAP = {
  Lockers: 'lockers.jpg',
  'Shoe Locker': 'locker01.jpg',
  'Sterile Garment Cupboard': 'Sterile-Garment-Cabinet.jpg',
  Cupboard: 'Cupboard01.jpg',
  'Cross Over Benches': 'cross-over-bench.jpg',
  'In Process Container': '2-In-Process-Container.jpg',
  'Intermediate Bulk Container': 'Intermediate-Bulk-Containe.jpg',
  Barrel: 'BARREL.jpg',
  'Tank Vessels Canister': 'Canister.jpg',
  'Dies & Punch Cabinet': '2-Dies-Punch-Cabinet.jpg',
  'Dies Punch Cabinet': '2-Dies-Punch-Cabinet.jpg',
  'IPQC Table': '1-IPQC-Table.jpg',
  'Dinning Tables': 'SS-Dinning-Table-1.jpg',
  'Working Table': '1-Working-Table.jpg',
  Table: '1-Working-Table.jpg',
  'Sink Units': 'sink.jpg',
  'Revolving Stool': 'Rev.-Stool-With-Height-Adjustable.jpg',
  Stool: 'Stool.jpg',
  'Chair Stools': 'Revolvig-Chair.jpg',
  'Chair & Stool': 'Revolvig-Chair.jpg',
  Rack: 'rack01.jpg',
  Trolleys: 'Closed-Type-Trolley.jpg',
  'Closed Type Trolley': 'Closed-Type-Trolley.jpg',
  'Weight Box Trolley': 'Weight-Box-Trolley.jpg',
  'Tray Trolley': 'Two-Tier-Trolley.jpg',
  'Sieves Inspection Trolley': 'Sieves-Inspection-Trolley-01.jpg',
  'Platform Trolley': 'Platfrom-Trolley01.jpg',
  'Multipurpose Trolley': 'Two-Tier-Trolley.jpg',
  'Linen Trolley': 'Soiled-Linen-Trolley.jpg',
  'Drum Trolley': 'Drum-Trolley.jpg',
  'Cage Trolley': 'Cage-Trolley.jpg',
  'Mopping Trolley': '5-Mopping-Trolley.jpg',
  Accessories: 'Tool-Box.jpg',
  Scoop: 'Close-Scoop-Close01.jpg',
  'Soap Dispenser': 'Soap-Dispenser.jpg',
  Pendent: 'Pendent.jpg',
  'Gloves Box': 'Gloves-Box-removebg-preview-1.jpg',
  'Rejection Box': 'Rejection-Box.jpg',
  'Oil Can': 'Oil-Can.jpg',
  'Teflon Hammer': 'Teflon-Hammer.jpg',
  Dustbin: 'Foot-Operated-Dustbin.jpg',
  'Tool Box': 'Tool-Box.jpg',
  Spatula: 'SS-Spatula.jpg',
  'Powder Sampler': 'Powder-Sampler.jpg',
  Mug: 'Mugs.jpg',
  'Liquid Sampler': 'Liquid-Sampler2.jpg',
  'Drain Trap': 'Drain-Trap.jpg',
  'Ampoule Tray': 'Ampoule-Tray.jpg',
  Ladder: 'Ladder.jpg',
  Conveyor: 'Packing-Conveyor.jpg',
  'HPLC Column Cabinet': 'HPLC-Column-Drawer-Unit.jpg',
  'Tank, Vessels, Canister & Barrel': 'Canister.jpg',
};

export const PLACEHOLDER_IMAGE = '/images/products/placeholder.jpg';

/**
 * Returns the public URL path for a product image.
 * @param {string} name - Product or category display name
 * @param {string} [ext='jpg'] - File extension when using default naming
 * @returns {string}
 */
export function getProductImage(name, ext = 'jpg') {
  const mapped = IMAGE_MAP[name];
  if (mapped) {
    return `/images/products/${mapped}`;
  }
  return `/images/products/${name}.${ext}`;
}

/**
 * Handles broken image loads with a one-time fallback.
 * @param {React.SyntheticEvent<HTMLImageElement>} e
 */
export function handleImageError(e) {
  e.target.onerror = null;
  e.target.src = PLACEHOLDER_IMAGE;
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
