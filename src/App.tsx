import { useEffect, useState } from 'react';
import { BookingsDrawer } from './components/BookingsDrawer';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomeStoreView } from './components/HomeStoreView';
import { MachinerySalesView } from './components/MachinerySalesView';
import { RepairServiceView } from './components/RepairServiceView';
import { StoreLocationView } from './components/StoreLocationView';
import { ToolRentalsView } from './components/ToolRentalsView';
import { STORE_INFO } from './data/storeData';
import type {
  PageId,
  SavedDemoBooking,
  SavedPickupRequest,
  SavedRentalBooking,
} from './types/store';

const STORAGE_KEYS = {
  rentals: 'mr_power_tools_rentals_v1',
  demos: 'mr_power_tools_demos_v1',
  pickups: 'mr_power_tools_pickups_v1',
};

const VALID_PAGES: PageId[] = [
  'home-store',
  'machinery-equipment-sales',
  'tool-rentals-daily-rates',
  'repair-servicing-rewinding',
  'pichatur-store-location-contact',
];

function getInitialPage(): PageId {
  if (typeof window === 'undefined') return 'home-store';
  const param = new URLSearchParams(window.location.search).get('page') as PageId | null;
  if (param && VALID_PAGES.includes(param)) return param;
  return 'home-store';
}

function readStoredArray<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(getInitialPage);
  const [languageMode, setLanguageMode] = useState<'en-te' | 'te-primary'>('en-te');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [rentalBookings, setRentalBookings] = useState<SavedRentalBooking[]>(() =>
    readStoredArray<SavedRentalBooking>(STORAGE_KEYS.rentals),
  );
  const [demoBookings, setDemoBookings] = useState<SavedDemoBooking[]>(() =>
    readStoredArray<SavedDemoBooking>(STORAGE_KEYS.demos),
  );
  const [pickupRequests, setPickupRequests] = useState<SavedPickupRequest[]>(() =>
    readStoredArray<SavedPickupRequest>(STORAGE_KEYS.pickups),
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.rentals, JSON.stringify(rentalBookings));
    } catch {
      // ignore storage quota errors
    }
  }, [rentalBookings]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.demos, JSON.stringify(demoBookings));
    } catch {
      // ignore storage quota errors
    }
  }, [demoBookings]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.pickups, JSON.stringify(pickupRequests));
    } catch {
      // ignore storage quota errors
    }
  }, [pickupRequests]);

  const handleNavigate = (page: PageId, scrollTarget?: string) => {
    setActivePage(page);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('page', page);
      window.history.replaceState({}, '', url.toString());
      if (scrollTarget) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const targetEl = document.getElementById(scrollTarget);
            if (targetEl) {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 50);
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleSaveRentalBooking = (
    booking: Omit<SavedRentalBooking, 'id' | 'createdAt'>,
  ): SavedRentalBooking => {
    const created: SavedRentalBooking = {
      ...booking,
      id: `RNT-${String(101 + rentalBookings.length)}`,
      createdAt: new Date().toISOString(),
    };
    setRentalBookings((prev) => [created, ...prev]);
    return created;
  };

  const handleSaveDemoBooking = (
    booking: Omit<SavedDemoBooking, 'id' | 'createdAt'>,
  ): SavedDemoBooking => {
    const created: SavedDemoBooking = {
      ...booking,
      id: `DMO-${String(201 + demoBookings.length)}`,
      createdAt: new Date().toISOString(),
    };
    setDemoBookings((prev) => [created, ...prev]);
    return created;
  };

  const handleSavePickupRequest = (
    request: Omit<SavedPickupRequest, 'id' | 'createdAt'>,
  ): SavedPickupRequest => {
    const created: SavedPickupRequest = {
      ...request,
      id: `PKP-${String(301 + pickupRequests.length)}`,
      createdAt: new Date().toISOString(),
    };
    setPickupRequests((prev) => [created, ...prev]);
    return created;
  };

  const handleClearAllBookings = () => {
    setRentalBookings([]);
    setDemoBookings([]);
    setPickupRequests([]);
  };

  const totalSavedCount = rentalBookings.length + demoBookings.length + pickupRequests.length;

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        totalSavedCount={totalSavedCount}
        onOpenBookingsDrawer={() => setDrawerOpen(true)}
        languageMode={languageMode}
        onToggleLanguage={() =>
          setLanguageMode((prev) => (prev === 'en-te' ? 'te-primary' : 'en-te'))
        }
      />

      <main className="w-full pb-16 md:pb-0 flex-1 bg-surface">
        {activePage === 'home-store' && (
          <HomeStoreView onNavigate={handleNavigate} languageMode={languageMode} />
        )}
        {activePage === 'machinery-equipment-sales' && (
          <MachinerySalesView onSaveDemoBooking={handleSaveDemoBooking} />
        )}
        {activePage === 'tool-rentals-daily-rates' && (
          <ToolRentalsView onSaveRentalBooking={handleSaveRentalBooking} />
        )}
        {activePage === 'repair-servicing-rewinding' && (
          <RepairServiceView onSavePickupRequest={handleSavePickupRequest} />
        )}
        {activePage === 'pichatur-store-location-contact' && (
          <StoreLocationView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Sticky Bottom Fast Action Bar (Mobile Outdoor Use) */}
      <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest shadow-[0_-4px_12px_rgba(20,25,35,0.12)] p-2 z-40 md:hidden">
        <div className="flex items-center gap-2">
          <a
            className="flex-1 bg-primary text-on-primary py-2.5 px-3 rounded-[2px] text-center font-display text-[13px] uppercase font-bold flex items-center justify-center gap-1.5 shadow-sm"
            href={`tel:+91${STORE_INFO.phone1}`}
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>Call Now</span>
          </a>
          <a
            className="flex-1 bg-secondary text-on-secondary py-2.5 px-3 rounded-[2px] text-center font-display text-[13px] uppercase font-bold flex items-center justify-center gap-1.5 shadow-sm"
            href={`${STORE_INFO.whatsappBase}?text=Namaste%20MR%20Power%20Tools%20Pichatur`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => handleNavigate('tool-rentals-daily-rates')}
            className="bg-surface-container-high text-on-surface py-2.5 px-3 rounded-[2px] text-center font-display text-[13px] uppercase font-bold flex items-center justify-center cursor-pointer"
          >
            <span>Rentals</span>
          </button>
        </div>
      </div>

      <Footer onNavigate={handleNavigate} />

      <BookingsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        rentals={rentalBookings}
        demos={demoBookings}
        pickups={pickupRequests}
        onNavigate={handleNavigate}
        onClearAll={handleClearAllBookings}
      />
    </div>
  );
}
