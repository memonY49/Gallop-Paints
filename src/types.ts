export type Language = 'EN' | 'UR';

export type PageId = 'home' | 'products' | 'shades' | 'about' | 'contact' | 'locator';

export type ProductCategory = 
  | 'interior'
  | 'exterior'
  | 'wood-metal'
  | 'primers'
  | 'industrial';

export type PaintFinish = 'Matte' | 'Sheen' | 'High Gloss' | 'Eggshell' | 'Satin';

export type ApplicationSurface = 
  | 'Interior Walls & Ceilings'
  | 'Exterior Masonry & Concrete'
  | 'Wood & Cabinetry'
  | 'Metal & Structural Steel'
  | 'Concrete Floors';

export type PackSize = '0.91L (Quarter)' | '3.64L (Gallon)' | '14.56L (Drum)';

export interface ShadeColor {
  id: string;
  code: string;
  name: string;
  hex: string;
  spectrum: 'Neutrals' | 'Pastels' | 'Deep Jewels' | 'Whites' | 'Earth Tones';
  description: string;
  recommendedFinish: PaintFinish;
  rgb: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categoryLabel: string;
  finish: PaintFinish;
  surfaces: ApplicationSurface[];
  description: string;
  features: string[];
  vocLevel: string;
  coverage: string; // e.g. "14-16 m²/L per coat"
  dryingTime: string; // e.g. "2-3 hours"
  washability: 'Ultra Washable' | 'Washable' | 'Standard' | 'Heavy Duty Industrial';
  warranty: string;
  prices: {
    [key in PackSize]: number;
  };
  basePrice: number; // For gallon
  rating: number;
  reviewsCount: number;
  popular?: boolean;
  featured?: boolean;
  defaultShadeHex: string;
  availableShadeIds: string[];
}

export interface CartItem {
  cartId: string;
  product: Product;
  selectedShade: ShadeColor;
  packSize: PackSize;
  quantity: number;
  unitPrice: number;
}

export interface RegionalOffice {
  id: string;
  region: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  manager: string;
  email: string;
  hours: string;
  isHeadOffice?: boolean;
}

export interface DealerLocation {
  id: string;
  name: string;
  city: string;
  region: string;
  address: string;
  phone: string;
  distanceKm: number;
  hasTintingMachine: boolean;
  hasExpressDelivery: boolean;
  lat: number;
  lng: number;
}

export interface RoomScene {
  id: string;
  name: string;
  type: 'living-room' | 'bedroom' | 'exterior' | 'dining';
  walls: {
    mainWall: string;
    accentWall: string;
    trimCeiling: string;
  };
}
