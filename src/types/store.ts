export type PageId =
  | 'home-store'
  | 'machinery-equipment-sales'
  | 'tool-rentals-daily-rates'
  | 'repair-servicing-rewinding'
  | 'pichatur-store-location-contact';

export type ProductCategory =
  | 'all'
  | 'agri'
  | 'sprayers'
  | 'construction'
  | 'welding'
  | 'wood'
  | 'spares';

export type FuelMode = 'all' | 'petrol' | 'battery' | 'electric';
export type BrandAuthority = 'all' | 'vst' | 'husqvarna' | 'bosch' | 'honda' | 'xtra';
export type StockMode = 'all' | 'in-stock' | 'subsidy';
export type SortMode = 'popular' | 'low-to-high' | 'high-to-low';

export interface SalesProduct {
  id: string;
  badgeLabel: string;
  badgeColor: 'primary' | 'secondary' | 'tertiary' | 'inverse';
  rightBadge: string;
  rightBadgeType: 'subsidy' | 'text';
  powerTag: string;
  stockCountLabel: string;
  brandLabel: string;
  title: string;
  description: string;
  specs: { icon: string; text: string }[];
  price: number;
  mrp: number;
  rentalRateLabel: string;
  rentalRateValue: string;
  whatsappText: string;
  category: Exclude<ProductCategory, 'all'>;
  fuel: Exclude<FuelMode, 'all'>;
  brand: Exclude<BrandAuthority, 'all'>;
  subsidyEligible: boolean;
  imageUrl: string;
  imageAlt: string;
}

export interface SparePart {
  id: string;
  tag: string;
  price: number;
  unit?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  whatsappText: string;
}

export type RentalCategory = 'all' | 'agri' | 'civil' | 'power';

export interface RentalEquipment {
  id: string;
  category: Exclude<RentalCategory, 'all'>;
  headerTag: string;
  name: string;
  specBadge: string;
  description: string;
  infoLabel: string;
  infoValue: string;
  dailyRate: number;
  dailySubtext: string;
  multiDayLabel: string;
  multiDayRate: string;
  multiDaySubtext: string;
  selectOptionValue: string;
  selectOptionLabel: string;
}

export interface TariffRow {
  id: string;
  equipment: string;
  application: string;
  day1: number;
  day3: number;
  day7: number;
  verification: string;
}

export interface RepairServiceRow {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  teluguLabel: string;
  teluguColor: string;
  turnaround: string;
  costRange: string;
  striped?: boolean;
}

export interface RepairJobRecord {
  jobId: string;
  status: string;
  statusTone: 'success' | 'primary' | 'secondary';
  itemName: string;
  mechanic: string;
  progressPercent: number;
  intakeTime: string;
  readyEstimate: string;
}

export interface SavedRentalBooking {
  id: string;
  tool: string;
  duration: string;
  name: string;
  phone: string;
  village: string;
  date: string;
  notes: string;
  createdAt: string;
  whatsappUrl: string;
}

export interface SavedDemoBooking {
  id: string;
  machineName: string;
  customerName: string;
  phone: string;
  village: string;
  createdAt: string;
}

export interface SavedPickupRequest {
  id: string;
  name: string;
  phone: string;
  village: string;
  machineType: string;
  issue: string;
  createdAt: string;
}
