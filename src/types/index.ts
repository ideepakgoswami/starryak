export type OccasionType =
  | "diwali"
  | "christmas"
  | "birthday"
  | "wedding"
  | "gifting"
  | "gifts-for-her"
  | "gifts-for-him"
  | "everyday";

export type ScentFamily =
  | "Warm & Woody"
  | "Floral"
  | "Fresh & Citrus"
  | "Gourmand & Spicy"
  | "Earthy & Herbal";

export interface ScentNotes {
  family: ScentFamily;
  top: string[];
  heart: string[];
  base: string[];
  intensity: "Subtle" | "Moderate" | "Rich & Lingering";
  summary: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  weight: string;
  burnTime: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  sku: string;
}

export interface PersonalizationConfig {
  enabled: boolean;
  nameLabel: string;
  maxNameLength: number;
  messageLabel: string;
  maxMessageLength: number;
  occasionsList: string[];
  additionalPrice: number;
}

export interface PersonalizedData {
  name: string;
  message: string;
  occasion?: string;
}

export type CandleCategory = "jar" | "pillar" | "beeswax" | "cafe";

export interface CandleCategoryMeta {
  id: CandleCategory;
  name: string;
  shortName: string;
  badge: string;
  icon: string;
  tagline: string;
  description: string;
}

export interface CandleColour {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CandleCategory;
  tagline: string;
  description: string;
  longDescription: string;
  images: string[];
  basePrice: number;
  variants: ProductVariant[];
  availableColours: CandleColour[];
  availableFragrances: string[];
  scentNotes: ScentNotes;
  burnTime: string;
  waxType: string;
  vesselType: string;
  collections: string[];
  occasions: OccasionType[];
  customizable: boolean;
  personalization?: PersonalizationConfig;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  rating: number;
  reviewCount: number;
  careTips: string[];
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  tagline: string;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique hash (product + variant + colour + fragrance + personalization)
  productId: string;
  product: Product;
  variantId: string;
  variant: ProductVariant;
  selectedColour?: string;
  selectedFragrance?: string;
  quantity: number;
  personalization?: PersonalizedData;
  unitPrice: number;
  totalPrice: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  occasion?: string;
  productSlug?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: "upi" | "card" | "netbanking" | "cod";
  status: "placed" | "confirmed" | "processing" | "shipped" | "delivered";
  createdAt: string;
  notes?: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCollection: string;
  selectedOccasion: string;
  selectedScentFamily: string;
  maxPrice: number;
  sortBy: "featured" | "price-asc" | "price-desc" | "bestseller" | "rating";
}
