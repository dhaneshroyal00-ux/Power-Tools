import { SEED_REPAIR_JOBS, STORE_INFO } from '../data/storeData';
import type {
  BrandAuthority,
  FuelMode,
  PageId,
  ProductCategory,
  RentalCategory,
  RentalEquipment,
  RepairJobRecord,
  SalesProduct,
  SortMode,
  StockMode,
} from '../types/store';

export interface ProductFilterState {
  category: ProductCategory;
  fuel: FuelMode;
  brand: BrandAuthority;
  stock: StockMode;
  sort: SortMode;
}

export function formatCurrencyINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function filterAndSortProducts(
  products: SalesProduct[],
  filters: ProductFilterState,
): SalesProduct[] {
  const filtered = products.filter((item) => {
    const matchesCat = filters.category === 'all' || item.category === filters.category;
    const matchesFuel = filters.fuel === 'all' || item.fuel === filters.fuel;
    const matchesBrand = filters.brand === 'all' || item.brand === filters.brand;
    const matchesStock =
      filters.stock === 'all' ||
      filters.stock === 'in-stock' ||
      (filters.stock === 'subsidy' && item.subsidyEligible);
    return matchesCat && matchesFuel && matchesBrand && matchesStock;
  });

  if (filters.sort === 'low-to-high') {
    return [...filtered].sort((a, b) => a.price - b.price);
  }
  if (filters.sort === 'high-to-low') {
    return [...filtered].sort((a, b) => b.price - a.price);
  }
  return filtered;
}

export function filterRentals(
  rentals: RentalEquipment[],
  category: RentalCategory,
): RentalEquipment[] {
  if (category === 'all') return rentals;
  return rentals.filter((item) => item.category === category);
}

export type RepairEquipmentCategory =
  | 'angle-grinder'
  | 'marble-cutter'
  | 'demolition-hammer'
  | 'chainsaw'
  | 'power-tiller'
  | 'submersible';

export type RepairIssueType = 'brush' | 'burnt' | 'gear' | 'starting' | 'rewind';

export interface RepairEstimateResult {
  price: string;
  time: string;
  warranty: string;
}

const ESTIMATE_MATRIX: Record<RepairIssueType, RepairEstimateResult> = {
  brush: { price: '₹60 – ₹140', time: '15 – 25 Mins', warranty: 'Standard Fitting Check' },
  burnt: { price: '₹450 – ₹1,100', time: '4 – 6 Hours', warranty: '30-Day Rewind Guarantee' },
  gear: { price: '₹180 – ₹450', time: '45 Mins – 1 Hour', warranty: '15-Day Mechanical Guarantee' },
  starting: { price: '₹150 – ₹380', time: 'Same Day (2 - 3 Hrs)', warranty: 'Fuel Tuning Guarantee' },
  rewind: { price: '₹550 – ₹1,800', time: 'Same Day / 24 Hours', warranty: '30-Day Written Warranty' },
};

export function calculateRepairEstimate(
  category: RepairEquipmentCategory,
  issue: RepairIssueType,
): RepairEstimateResult {
  if (category === 'power-tiller' || category === 'submersible') {
    if (issue === 'burnt' || issue === 'rewind') {
      return {
        price: '₹1,500 – ₹3,500',
        time: '24 – 48 Hours',
        warranty: '30-Day Heavy Duty Warranty',
      };
    }
    if (issue === 'starting') {
      return {
        price: '₹350 – ₹750',
        time: 'Same Day',
        warranty: 'Carb & Injection Guarantee',
      };
    }
  }
  return ESTIMATE_MATRIX[issue];
}

export function lookupRepairJob(query: string): RepairJobRecord | null {
  const trimmed = query.trim();
  if (!trimmed) return null;

  const normalized = trimmed.toUpperCase();
  if (normalized.includes('1048') || normalized.endsWith('66')) {
    return SEED_REPAIR_JOBS['MR-1048'];
  }
  if (normalized.includes('482')) {
    return SEED_REPAIR_JOBS['MR-482'];
  }

  const suffix = normalized.startsWith('MR-') ? normalized : `MR-${normalized.slice(-4)}`;
  return {
    jobId: `JOB #${suffix}`,
    status: 'VARNISH BAKING & REWINDING',
    statusTone: 'primary',
    itemName: 'Bosch GWS Angle Grinder Armature Copper Rewind',
    mechanic: 'Mechanic: Bench 2 (M.R. Power Tools Workshop)',
    progressPercent: 70,
    intakeTime: '09:15 AM',
    readyEstimate: 'Ready for Pickup by: 04:30 PM Today',
  };
}

export interface SearchHit {
  id: string;
  title: string;
  subtitle: string;
  targetPage: PageId;
  badge: string;
}

export function searchStoreCatalog(
  query: string,
  products: SalesProduct[],
  rentals: RentalEquipment[],
): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const hits: SearchHit[] = [];

  for (const p of products) {
    if (
      p.title.toLowerCase().includes(q) ||
      p.badgeLabel.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.brandLabel.toLowerCase().includes(q)
    ) {
      hits.push({
        id: `hit-sale-${p.id}`,
        title: p.title,
        subtitle: `Buy ${formatCurrencyINR(p.price)} • ${p.powerTag}`,
        targetPage: 'machinery-equipment-sales',
        badge: 'SALES',
      });
    }
  }

  for (const r of rentals) {
    if (
      r.name.toLowerCase().includes(q) ||
      r.headerTag.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q)
    ) {
      hits.push({
        id: `hit-rent-${r.id}`,
        title: `${r.name} (Rental)`,
        subtitle: `${formatCurrencyINR(r.dailyRate)}/Day • ${r.specBadge}`,
        targetPage: 'tool-rentals-daily-rates',
        badge: 'RENTAL',
      });
    }
  }

  if (
    'rewinding'.includes(q) ||
    'motor'.includes(q) ||
    'repair'.includes(q) ||
    'service'.includes(q) ||
    'carbon'.includes(q) ||
    'carburetor'.includes(q) ||
    'pump'.includes(q)
  ) {
    hits.push({
      id: 'hit-repair-workshop',
      title: 'Motor Rewinding & Same-Day Repair Bench',
      subtitle: '100% EC Copper Rewinding • Carbon Brushes • Carburetor Flush',
      targetPage: 'repair-servicing-rewinding',
      badge: 'REPAIR',
    });
  }

  if ('pichatur'.includes(q) || 'location'.includes(q) || 'address'.includes(q) || 'contact'.includes(q)) {
    hits.push({
      id: 'hit-location',
      title: 'Pichatur Store Location & Direct Contact',
      subtitle: STORE_INFO.addressFull,
      targetPage: 'pichatur-store-location-contact',
      badge: 'STORE',
    });
  }

  return hits.slice(0, 8);
}

export function buildWhatsAppRentalUrl(params: {
  tool: string;
  duration: string;
  name: string;
  phone: string;
  village: string;
  date: string;
  notes?: string;
}): string {
  const notesText = params.notes?.trim() || 'None';
  const rawMessage =
    `*M.R. POWER TOOLS - PICHATUR RENTAL INQUIRY*\n\n` +
    `*Customer Name:* ${params.name}\n` +
    `*Phone:* ${params.phone}\n` +
    `*Village/Location:* ${params.village}\n` +
    `*Required Machine:* ${params.tool}\n` +
    `*Rental Duration:* ${params.duration}\n` +
    `*Required From Date:* ${params.date}\n` +
    `*Extra Requests:* ${notesText}\n\n` +
    `_Please confirm availability and dispatch from Pichatur store._`;

  return `${STORE_INFO.whatsappBase}?text=${encodeURIComponent(rawMessage)}`;
}

export function buildWhatsAppMessageUrl(message: string): string {
  return `${STORE_INFO.whatsappBase}?text=${encodeURIComponent(message)}`;
}
