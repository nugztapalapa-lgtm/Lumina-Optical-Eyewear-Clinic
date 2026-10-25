export type FrameShape = 'round' | 'square' | 'cat-eye' | 'aviator' | 'geometric' | 'oval';
export type FrameMaterial = 'Japanese Titanium' | 'Italian Acetate' | 'Mixed Titanium & Acetate' | 'Ultra-Light TR90';
export type FaceShapeRecommendation = 'Round' | 'Square' | 'Oval' | 'Heart' | 'All';

export interface FrameColor {
  id: string;
  name: string;
  hex: string;
  secondaryHex?: string;
}

export interface FrameDimensions {
  lensWidth: number; // in mm, e.g. 49
  bridgeWidth: number; // in mm, e.g. 20
  templeLength: number; // in mm, e.g. 145
  lensHeight: number; // in mm, e.g. 42
  totalWidth: number; // in mm, e.g. 138
}

export interface FrameProduct {
  id: string;
  name: string;
  tagline: string;
  shape: FrameShape;
  material: FrameMaterial;
  basePrice: number;
  featured?: boolean;
  isNew?: boolean;
  colors: FrameColor[];
  dimensions: FrameDimensions;
  weightGrams: number;
  suitableFaceShapes: FaceShapeRecommendation[];
  description: string;
  details: string[];
}

export type LensType = 'single-vision' | 'progressive' | 'reading' | 'non-prescription';

export type LensIndexMaterial = 'polycarbonate' | 'high-index-167' | 'ultra-high-174';

export interface LensCoating {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface PrescriptionDetails {
  odSphere: string;
  odCylinder: string;
  odAxis: string;
  odAdd?: string;
  osSphere: string;
  osCylinder: string;
  osAxis: string;
  osAdd?: string;
  pupillaryDistance: number; // mm, default 63
  rxMethod: 'manual' | 'upload' | 'clinic-records' | 'later';
  uploadedFileName?: string;
  doctorName?: string;
}

export interface CartItem {
  cartItemId: string;
  product: FrameProduct;
  selectedColor: FrameColor;
  lensType: LensType;
  lensMaterial: LensIndexMaterial;
  lensPrice: number;
  selectedCoatings: LensCoating[];
  prescription?: PrescriptionDetails;
  totalPrice: number;
  quantity: number;
}

export type AppointmentServiceType = 
  | 'comprehensive-exam'
  | 'contact-lens-fitting'
  | 'frame-styling'
  | 'pediatric-vision'
  | 'dry-eye-assessment';

export interface AppointmentDoctor {
  id: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  avatarInitials: string;
  specialties: string[];
}

export interface AppointmentBooking {
  id: string;
  serviceType: AppointmentServiceType;
  doctor: AppointmentDoctor;
  date: string;
  timeSlot: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  insuranceProvider?: string;
  notes?: string;
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  location: string;
  rating: number;
  date: string;
  serviceType: string;
  framePurchased?: string;
  verified: boolean;
  comment: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Eye Health' | 'Eyewear Guide' | 'Lens Technology' | 'Lifestyle';
  readTime: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  content: string[];
  tips: string[];
}
