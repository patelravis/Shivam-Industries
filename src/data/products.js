import { getProductImage, slugify } from '../utils/imageHelper';
import { getCategoryForProduct } from './categories';

const productDefinitions = [
  {
    name: 'HPLC Column Cabinet',
    shortDescription: 'SS 304 grade cabinet with drawer storage for HPLC columns.',
    description: [
      'Material of Construction: SS 304 Grade Completely',
      'Drawer With Inside Having Storage For HPLC Column',
      'Available With PU Wheel Or Nylon Wheel as Per Requirement',
      'Finish: Matt',
      'Easy To Install & Adaptable to Existing Facility',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Finish', value: 'Matt' },
      { label: 'Wheels', value: 'PU / Nylon (Optional)' },
      { label: 'Application', value: 'HPLC Column Storage' },
    ],
    featured: true,
    tags: ['HPLC Column Cabinet'],
  },
  {
    name: 'Lockers',
    shortDescription: 'SS 304 lockers for cleanroom garment and personal storage.',
    description: [
      'Fully SS 304 construction with matt finish',
      'Multiple compartment options available',
      'Ventilated design for cleanroom use',
      'Custom sizes as per facility layout',
      'GMP compliant design',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Finish', value: 'Matt / Mirror' },
      { label: 'Compartments', value: 'Custom' },
    ],
    featured: true,
  },
  {
    name: 'Shoe Locker',
    shortDescription: 'Dedicated shoe storage locker for gowning areas.',
    description: [
      'SS 304 construction',
      'Perforated doors for ventilation',
      'Stackable modular design',
      'Easy to clean matt finish',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Finish', value: 'Matt' },
    ],
    featured: false,
  },
  {
    name: 'Sterile Garment Cupboard',
    shortDescription: 'Storage cupboard for sterile garments in controlled environments.',
    description: [
      'SS 304 fully welded construction',
      'Hinged or sliding door options',
      'Internal shelving adjustable',
      'Matt finish for cleanroom compatibility',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Doors', value: 'Hinged / Sliding' },
    ],
    featured: true,
  },
  {
    name: 'Cupboard',
    shortDescription: 'General purpose SS storage cupboard for pharma facilities.',
    description: [
      'SS 304 grade construction',
      'Lockable doors with key',
      'Adjustable internal shelves',
      'Custom dimensions available',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Shelves', value: 'Adjustable' },
    ],
    featured: false,
  },
  {
    name: 'Cross Over Benches',
    shortDescription: 'SS cross-over benches for cleanroom entry/exit zones.',
    description: [
      'SS 304 construction with rounded edges',
      'Optional pigeon hole storage',
      'Matt finish, easy to sanitize',
      'Custom length and height',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Options', value: 'With / Without Pigeon Holes' },
    ],
    featured: true,
  },
  {
    name: 'In Process Container',
    shortDescription: 'SS containers for in-process material handling.',
    description: [
      'SS 304 or SS 316L as required',
      'Sealed lid with clamp mechanism',
      'Stackable design',
      'Custom capacity available',
    ],
    specs: [
      { label: 'Material', value: 'SS 304 / SS 316L' },
      { label: 'Capacity', value: 'Custom' },
    ],
    featured: false,
  },
  {
    name: 'Intermediate Bulk Container',
    shortDescription: 'IBC for bulk intermediate storage and transfer.',
    description: [
      'SS 316L construction for product contact',
      'Conical bottom for complete discharge',
      'Top manhole with sealed cover',
      'Optional jacketing for temperature control',
    ],
    specs: [
      { label: 'Material', value: 'SS 316L' },
      { label: 'Capacity', value: '100L – 1000L' },
    ],
    featured: true,
  },
  {
    name: 'Barrel',
    shortDescription: 'SS storage barrels for pharma raw materials.',
    description: [
      'SS 304 construction',
      'Sealed lid with gasket',
      'Smooth internal finish',
      'Multiple capacity options',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Capacity', value: '25L – 200L' },
    ],
    featured: false,
  },
  {
    name: 'Tank Vessels Canister',
    shortDescription: 'Storage tanks, vessels and canisters for pharma applications.',
    description: [
      'SS 304 / SS 316L construction',
      'Welded joints with smooth finish',
      'Custom capacity and port configurations',
      'Optional pressure rating',
    ],
    specs: [
      { label: 'Material', value: 'SS 304 / SS 316L' },
      { label: 'Type', value: 'Tank / Vessel / Canister' },
    ],
    featured: false,
  },
  {
    name: 'Dies Punch Cabinet',
    shortDescription: 'Secure storage cabinet for tablet dies and punches.',
    description: [
      'SS 304 construction with lockable doors',
      'Internal drawers for organized storage',
      'Matt finish, GMP compliant',
      'Custom drawer configurations',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Drawers', value: 'Custom' },
    ],
    featured: false,
  },
  {
    name: 'IPQC Table',
    shortDescription: 'In-process quality control inspection table.',
    description: [
      'SS 304 table top with sturdy frame',
      'Optional trunking for utilities',
      'Height adjustable options',
      'Matt finish for cleanroom use',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Top', value: 'SS 304 Sheet' },
    ],
    featured: true,
  },
  {
    name: 'Dinning Tables',
    shortDescription: 'SS dining tables for canteen and break areas.',
    description: [
      'SS 304 construction',
      'Rounded corners for safety',
      'Easy to clean matt finish',
      'Custom sizes available',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Seating', value: '2 – 8 persons' },
    ],
    featured: false,
  },
  {
    name: 'Working Table',
    shortDescription: 'General purpose SS working table for production areas.',
    description: [
      'SS 304 table top and frame',
      'Optional undershelf and drawers',
      'Adjustable height on request',
      'GMP compliant design',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Options', value: 'Shelf / Drawers / Castors' },
    ],
    featured: true,
  },
  {
    name: 'Sink Units',
    shortDescription: 'SS sink units for washing and cleaning areas.',
    description: [
      'SS 304 bowl and countertop',
      'Single or double bowl options',
      'Integrated backsplash',
      'Mixer tap provision',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Bowls', value: 'Single / Double' },
    ],
    featured: false,
  },
  {
    name: 'Revolving Stool',
    shortDescription: 'Height-adjustable revolving stool for workstations.',
    description: [
      'SS 304 seat and base',
      'Pneumatic height adjustment',
      'Anti-static options available',
      'Smooth rotation mechanism',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Adjustment', value: 'Pneumatic' },
    ],
    featured: false,
  },
  {
    name: 'Stool',
    shortDescription: 'Fixed height SS stool for production areas.',
    description: [
      'SS 304 construction',
      'Non-slip foot pads',
      'Matt finish',
      'Custom height available',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Height', value: 'Custom' },
    ],
    featured: false,
  },
  {
    name: 'Chair Stools',
    shortDescription: 'Ergonomic SS chairs and stools with back support.',
    description: [
      'SS 304 frame with cushioned seat option',
      'Optional wheels for mobility',
      'Height adjustable models available',
      'Cleanroom compatible finish',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Options', value: 'With / Without Wheels' },
    ],
    featured: false,
  },
  {
    name: 'Rack',
    shortDescription: 'SS storage racks for material and equipment.',
    description: [
      'SS 304 tubular construction',
      'Adjustable shelf levels',
      'Open or enclosed design',
      'Custom dimensions',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Shelves', value: 'Adjustable' },
    ],
    featured: false,
  },
  {
    name: 'Closed Type Trolley',
    shortDescription: 'Enclosed SS trolley for secure material transport.',
    description: [
      'SS 304 fully enclosed body',
      'Lockable doors',
      'PU castor wheels',
      'Matt finish',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Wheels', value: 'PU Castors' },
    ],
    featured: false,
  },
  {
    name: 'Weight Box Trolley',
    shortDescription: 'Trolley designed for weight box and standard weight transport.',
    description: [
      'SS 304 construction',
      'Dedicated compartments for weight boxes',
      'Smooth rolling castors',
      'Anti-vibration design',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Application', value: 'Weight Box Transport' },
    ],
    featured: false,
  },
  {
    name: 'Tray Trolley',
    shortDescription: 'Multi-tier tray trolley for material handling.',
    description: [
      'SS 304 frame with tray shelves',
      'Two or three tier options',
      'PU wheels with brakes',
      'Easy to maneuver in corridors',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Tiers', value: '2 / 3' },
    ],
    featured: false,
  },
  {
    name: 'Sieves Inspection Trolley',
    shortDescription: 'Mobile trolley for sieve inspection and storage.',
    description: [
      'SS 304 construction',
      'Dedicated sieve holding slots',
      'Lockable castor wheels',
      'GMP compliant design',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Application', value: 'Sieve Inspection' },
    ],
    featured: false,
  },
  {
    name: 'Platform Trolley',
    shortDescription: 'Flat platform trolley for heavy load transport.',
    description: [
      'SS 304 platform and frame',
      'Heavy-duty PU castors',
      'Optional side rails',
      'Custom platform size',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Load Capacity', value: 'Up to 500 kg' },
    ],
    featured: true,
  },
  {
    name: 'Multipurpose Trolley',
    shortDescription: 'Versatile SS trolley for various material handling needs.',
    description: [
      'SS 304 modular design',
      'Configurable shelves and compartments',
      'PU castor wheels with brakes',
      'Matt finish',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Configuration', value: 'Custom' },
    ],
    featured: false,
  },
  {
    name: 'Linen Trolley',
    shortDescription: 'Trolley for soiled and clean linen handling.',
    description: [
      'SS 304 construction',
      'Separate compartments for soiled/clean',
      'Cover lid option',
      'Smooth rolling wheels',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Type', value: 'Soiled / Clean Linen' },
    ],
    featured: false,
  },
  {
    name: 'Drum Trolley',
    shortDescription: 'Drum handling trolley for safe drum transport.',
    description: [
      'SS 304 construction',
      'Drum clamping mechanism',
      'Heavy-duty castors',
      'Suitable for 200L drums',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Drum Size', value: '200L Standard' },
    ],
    featured: false,
  },
  {
    name: 'Cage Trolley',
    shortDescription: 'Cage-style trolley for bulk material transport.',
    description: [
      'SS 304 mesh cage construction',
      'Open top for easy loading',
      'Four swivel castors',
      'Custom cage dimensions',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Style', value: 'Open Cage' },
    ],
    featured: false,
  },
  {
    name: 'Mopping Trolley',
    shortDescription: 'SS mopping trolley for facility cleaning.',
    description: [
      'SS 304 construction',
      'Wringer bucket integrated',
      'Multiple mop holder slots',
      'Easy to clean design',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Type', value: 'Type A / Standard' },
    ],
    featured: false,
  },
  {
    name: 'Scoop',
    shortDescription: 'SS scoops for powder and granule handling.',
    description: [
      'SS 316L product contact surface',
      'Open or closed type options',
      'Smooth polished finish',
      'Multiple capacity sizes',
    ],
    specs: [
      { label: 'Material', value: 'SS 316L' },
      { label: 'Type', value: 'Open / Closed' },
    ],
    featured: false,
  },
  {
    name: 'Soap Dispenser',
    shortDescription: 'Wall-mounted SS soap dispenser for wash areas.',
    description: [
      'SS 304 construction',
      'Foot or hand operated options',
      'Easy refill design',
      'Matt finish',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Operation', value: 'Foot / Hand' },
    ],
    featured: false,
  },
  {
    name: 'Pendent',
    shortDescription: 'SS pendent for gowning and wash areas.',
    description: [
      'SS 304 construction',
      'Wall or ceiling mount',
      'Multiple hook configurations',
      'Matt finish',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Mount', value: 'Wall / Ceiling' },
    ],
    featured: false,
  },
  {
    name: 'Gloves Box',
    shortDescription: 'Dispenser box for cleanroom gloves.',
    description: [
      'SS 304 or acrylic front panel',
      'Wall mounted design',
      'Easy glove retrieval slot',
      'Multiple size options',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Mount', value: 'Wall Mounted' },
    ],
    featured: false,
  },
  {
    name: 'Rejection Box',
    shortDescription: 'SS rejection box for QC rejected products.',
    description: [
      'SS 304 lockable container',
      'Slot opening for deposits',
      'Tamper-evident design',
      'Custom labeling area',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Lock', value: 'Key Lock' },
    ],
    featured: false,
  },
  {
    name: 'Oil Can',
    shortDescription: 'SS oil dispensing can for lubrication.',
    description: [
      'SS 304 construction',
      'Spout with cap',
      'Multiple capacity options',
      'Matt finish',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Capacity', value: '500ml – 2L' },
    ],
    featured: false,
  },
  {
    name: 'Teflon Hammer',
    shortDescription: 'Teflon-headed hammer for delicate equipment work.',
    description: [
      'SS handle with Teflon head',
      'Non-sparking and non-marring',
      'GMP compliant tool',
      'Multiple head sizes',
    ],
    specs: [
      { label: 'Handle', value: 'SS 304' },
      { label: 'Head', value: 'Teflon (PTFE)' },
    ],
    featured: false,
  },
  {
    name: 'Dustbin',
    shortDescription: 'SS foot-operated dustbins for clean areas.',
    description: [
      'SS 304 construction',
      'Foot pedal operated lid',
      'Round or square options',
      'Removable inner liner',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Operation', value: 'Foot Pedal' },
    ],
    featured: false,
  },
  {
    name: 'Tool Box',
    shortDescription: 'SS tool box for maintenance and production tools.',
    description: [
      'SS 304 construction with lock',
      'Internal tray compartments',
      'Portable with handle',
      'Matt finish',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Lock', value: 'Key Lock' },
    ],
    featured: false,
  },
  {
    name: 'Spatula',
    shortDescription: 'SS spatula for powder and paste handling.',
    description: [
      'SS 316L one-piece construction',
      'Smooth polished finish',
      'Multiple blade widths',
      'Autoclavable',
    ],
    specs: [
      { label: 'Material', value: 'SS 316L' },
      { label: 'Finish', value: 'Polished' },
    ],
    featured: false,
  },
  {
    name: 'Powder Sampler',
    shortDescription: 'SS powder sampler for representative sampling.',
    description: [
      'SS 316L construction',
      'Slot or tube type options',
      'Multiple length options',
      'Easy to clean design',
    ],
    specs: [
      { label: 'Material', value: 'SS 316L' },
      { label: 'Type', value: 'Slot / Tube' },
    ],
    featured: false,
  },
  {
    name: 'Mug',
    shortDescription: 'SS mugs for sampling and laboratory use.',
    description: [
      'SS 316L construction',
      'Graduated marking option',
      'Handle for easy grip',
      'Multiple capacities',
    ],
    specs: [
      { label: 'Material', value: 'SS 316L' },
      { label: 'Capacity', value: '100ml – 500ml' },
    ],
    featured: false,
  },
  {
    name: 'Liquid Sampler',
    shortDescription: 'SS liquid sampler for container sampling.',
    description: [
      'SS 316L construction',
      'Telescopic or fixed length',
      'Sample volume control',
      'GMP compliant design',
    ],
    specs: [
      { label: 'Material', value: 'SS 316L' },
      { label: 'Type', value: 'Telescopic / Fixed' },
    ],
    featured: false,
  },
  {
    name: 'Drain Trap',
    shortDescription: 'SS drain trap for sink and floor drain applications.',
    description: [
      'SS 304 construction',
      'Removable strainer basket',
      'Water seal design',
      'Standard pipe connections',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Connection', value: 'Standard BSP' },
    ],
    featured: false,
  },
  {
    name: 'Ampoule Tray',
    shortDescription: 'SS tray for ampoule handling and inspection.',
    description: [
      'SS 304 construction',
      'Perforated or solid base options',
      'Stackable design',
      'Custom slot configurations',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Base', value: 'Perforated / Solid' },
    ],
    featured: false,
  },
  {
    name: 'Ladder',
    shortDescription: 'SS ladders for facility maintenance access.',
    description: [
      'SS 304 construction',
      'Folding or step ladder options',
      'Non-slip treads',
      'Safety rail on request',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Type', value: 'Step / Folding' },
    ],
    featured: false,
  },
  {
    name: 'Conveyor',
    shortDescription: 'SS conveyors for packing and material transfer lines.',
    description: [
      'SS 304 frame construction',
      'Slat belt or roller options',
      'Variable speed drive optional',
      'Custom length and width',
    ],
    specs: [
      { label: 'Material', value: 'SS 304' },
      { label: 'Type', value: 'Slat Belt / Roller' },
    ],
    featured: true,
  },
];

export const products = productDefinitions.map((def, index) => {
  const category = getCategoryForProduct(def.name);
  const slug = slugify(def.name);
  return {
    id: index + 1,
    slug,
    name: def.name,
    category: category?.slug || slugify(def.name),
    categoryName: category?.name || def.name,
    images: [getProductImage(def.name)],
    shortDescription: def.shortDescription,
    description: def.description,
    specs: def.specs || [],
    tags: def.tags || [def.name],
    featured: def.featured ?? false,
  };
});

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug) {
  return products.filter((p) => p.category === categorySlug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product, limit = 6) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export default products;
