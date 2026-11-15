import test from 'node:test';
import assert from 'node:assert/strict';
import { RENTAL_EQUIPMENT, SALES_PRODUCTS } from '../data/storeData';
import {
  buildWhatsAppRentalUrl,
  calculateRepairEstimate,
  filterAndSortProducts,
  filterRentals,
  formatCurrencyINR,
  lookupRepairJob,
  searchStoreCatalog,
} from './storeLogic';

test('formatCurrencyINR formats Indian rupees cleanly', () => {
  assert.equal(formatCurrencyINR(38500), '₹38,500');
  assert.equal(formatCurrencyINR(800), '₹800');
});

test('filterAndSortProducts filters by category, fuel, subsidy, and sorts by price', () => {
  const all = filterAndSortProducts(SALES_PRODUCTS, {
    category: 'all',
    fuel: 'all',
    brand: 'all',
    stock: 'all',
    sort: 'popular',
  });
  assert.equal(all.length, 9);

  const subsidyOnly = filterAndSortProducts(SALES_PRODUCTS, {
    category: 'all',
    fuel: 'all',
    brand: 'all',
    stock: 'subsidy',
    sort: 'low-to-high',
  });
  assert.equal(subsidyOnly.length, 4);
  assert.ok(subsidyOnly[0].price <= subsidyOnly[1].price);
  assert.ok(subsidyOnly.every((item) => item.subsidyEligible));

  const agriPetrol = filterAndSortProducts(SALES_PRODUCTS, {
    category: 'agri',
    fuel: 'petrol',
    brand: 'all',
    stock: 'all',
    sort: 'high-to-low',
  });
  assert.equal(agriPetrol.length, 3);
  assert.equal(agriPetrol[0].id, 'prod-tiller');
});

test('filterRentals filters rental machinery by category', () => {
  assert.equal(filterRentals(RENTAL_EQUIPMENT, 'all').length, 8);
  assert.equal(filterRentals(RENTAL_EQUIPMENT, 'agri').length, 4);
  assert.equal(filterRentals(RENTAL_EQUIPMENT, 'civil').length, 2);
  assert.equal(filterRentals(RENTAL_EQUIPMENT, 'power').length, 2);
});

test('calculateRepairEstimate scales heavy machinery estimates properly', () => {
  const grinderBrush = calculateRepairEstimate('angle-grinder', 'brush');
  assert.equal(grinderBrush.price, '₹60 – ₹140');
  assert.equal(grinderBrush.time, '15 – 25 Mins');

  const tillerRewind = calculateRepairEstimate('power-tiller', 'rewind');
  assert.equal(tillerRewind.price, '₹1,500 – ₹3,500');
  assert.equal(tillerRewind.time, '24 – 48 Hours');

  const pumpStarting = calculateRepairEstimate('submersible', 'starting');
  assert.equal(pumpStarting.price, '₹350 – ₹750');
});

test('lookupRepairJob handles seed slip IDs, phone numbers, and dynamic slips', () => {
  assert.equal(lookupRepairJob('   '), null);

  const seed1048 = lookupRepairJob('MR-1048');
  assert.equal(seed1048?.status, 'READY FOR PICKUP');
  assert.equal(seed1048?.progressPercent, 100);

  const phoneLookup = lookupRepairJob('9700400266');
  assert.equal(phoneLookup?.jobId, 'JOB #MR-1048');

  const dynamicLookup = lookupRepairJob('9988776655');
  assert.equal(dynamicLookup?.jobId, 'JOB #MR-6655');
  assert.equal(dynamicLookup?.progressPercent, 70);
});

test('searchStoreCatalog returns relevant hits across sales, rentals, and workshop', () => {
  const tillerHits = searchStoreCatalog('Tiller', SALES_PRODUCTS, RENTAL_EQUIPMENT);
  assert.ok(tillerHits.some((h) => h.targetPage === 'machinery-equipment-sales'));
  assert.ok(tillerHits.some((h) => h.targetPage === 'tool-rentals-daily-rates'));

  const rewindHits = searchStoreCatalog('Rewinding', SALES_PRODUCTS, RENTAL_EQUIPMENT);
  assert.ok(rewindHits.some((h) => h.targetPage === 'repair-servicing-rewinding'));
});

test('buildWhatsAppRentalUrl encodes customer inquiry cleanly', () => {
  const url = buildWhatsAppRentalUrl({
    tool: 'Power Weeder / Tiller (7HP Petrol)',
    duration: '3 Days (Mini-Pack)',
    name: 'K. Subramanyam',
    phone: '9700400266',
    village: 'Keelapudi',
    date: '2026-11-16',
    notes: 'Need 2T oil',
  });
  assert.ok(url.startsWith('https://wa.me/919700400266?text='));
  assert.ok(url.includes('Keelapudi'));
  assert.ok(url.includes('9700400266'));
});
