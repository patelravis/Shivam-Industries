import { getProductImage, slugify } from '../utils/imageHelper';

const categoryTree = [
  {
    name: 'Lockers',
    slug: 'lockers',
    image: getProductImage('Lockers'),
    products: ['Lockers', 'Shoe Locker'],
  },
  {
    name: 'Cupboard',
    slug: 'cupboard',
    image: getProductImage('Cupboard'),
    products: ['Sterile Garment Cupboard', 'Cupboard'],
  },
  {
    name: 'Cross Over Benches',
    slug: 'cross-over-benches',
    image: getProductImage('Cross Over Benches'),
    products: ['Cross Over Benches'],
  },
  {
    name: 'In Process Container',
    slug: 'in-process-container',
    image: getProductImage('In Process Container'),
    products: ['In Process Container'],
  },
  {
    name: 'Intermediate Bulk Container',
    slug: 'intermediate-bulk-container',
    image: getProductImage('Intermediate Bulk Container'),
    products: ['Intermediate Bulk Container'],
  },
  {
    name: 'Tank, Vessels, Canister & Barrel',
    slug: 'tank-vessels-canister-barrel',
    image: getProductImage('Tank, Vessels, Canister & Barrel'),
    products: ['Barrel', 'Tank Vessels Canister'],
  },
  {
    name: 'Dies & Punch Cabinet',
    slug: 'dies-punch-cabinet',
    image: getProductImage('Dies & Punch Cabinet'),
    products: ['Dies Punch Cabinet'],
  },
  {
    name: 'Table',
    slug: 'table',
    image: getProductImage('Table'),
    products: ['IPQC Table', 'Dinning Tables', 'Working Table'],
  },
  {
    name: 'Sink Units',
    slug: 'sink-units',
    image: getProductImage('Sink Units'),
    products: ['Sink Units'],
  },
  {
    name: 'Chair & Stool',
    slug: 'chair-stool',
    image: getProductImage('Chair & Stool'),
    products: ['Revolving Stool', 'Stool', 'Chair Stools'],
  },
  {
    name: 'Rack',
    slug: 'rack',
    image: getProductImage('Rack'),
    products: ['Rack'],
  },
  {
    name: 'Trolleys',
    slug: 'trolleys',
    image: getProductImage('Trolleys'),
    products: [
      'Closed Type Trolley',
      'Weight Box Trolley',
      'Tray Trolley',
      'Sieves Inspection Trolley',
      'Platform Trolley',
      'Multipurpose Trolley',
      'Linen Trolley',
      'Drum Trolley',
      'Cage Trolley',
      'Mopping Trolley',
    ],
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    image: getProductImage('Accessories'),
    products: [
      'Scoop',
      'Soap Dispenser',
      'Pendent',
      'Gloves Box',
      'Rejection Box',
      'Oil Can',
      'Teflon Hammer',
      'Dustbin',
      'Tool Box',
      'Spatula',
      'Powder Sampler',
      'Mug',
      'Liquid Sampler',
      'Drain Trap',
      'Ampoule Tray',
    ],
  },
  {
    name: 'Ladder',
    slug: 'ladder',
    image: getProductImage('Ladder'),
    products: ['Ladder'],
  },
  {
    name: 'Conveyor',
    slug: 'conveyor',
    image: getProductImage('Conveyor'),
    products: ['Conveyor'],
  },
  {
    name: 'HPLC Column Cabinet',
    slug: 'hplc-column-cabinet',
    image: getProductImage('HPLC Column Cabinet'),
    products: ['HPLC Column Cabinet'],
  },
];

export const categories = categoryTree.map((cat) => ({
  ...cat,
  slug: cat.slug || slugify(cat.name),
}));

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryForProduct(productName) {
  return categories.find((c) => c.products.includes(productName));
}

export default categories;
