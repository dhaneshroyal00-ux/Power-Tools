import { useMemo, useRef, useState } from 'react';
import { RENTAL_EQUIPMENT, SALES_PRODUCTS, STORE_INFO } from '../data/storeData';
import type { PageId } from '../types/store';
import { searchStoreCatalog } from '../utils/storeLogic';

interface HeaderProps {
  activePage: PageId;
  onNavigate: (page: PageId, scrollTarget?: string) => void;
  totalSavedCount: number;
  onOpenBookingsDrawer: () => void;
  languageMode: 'en-te' | 'te-primary';
  onToggleLanguage: () => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home-store', label: 'Home & Store' },
  { id: 'machinery-equipment-sales', label: 'Machinery & Equipment Sales' },
  { id: 'tool-rentals-daily-rates', label: 'Tool Rentals & Daily Rates' },
  { id: 'repair-servicing-rewinding', label: 'Repair, Servicing & Rewinding' },
  { id: 'pichatur-store-location-contact', label: 'Pichatur Store Location & Contact' },
];

export function Header({
  activePage,
  onNavigate,
  totalSavedCount,
  onOpenBookingsDrawer,
  languageMode,
  onToggleLanguage,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchHits = useMemo(
    () => searchStoreCatalog(searchQuery, SALES_PRODUCTS, RENTAL_EQUIPMENT),
    [searchQuery],
  );

  const handleSelectHit = (targetPage: PageId) => {
    setSearchQuery('');
    setSearchFocused(false);
    onNavigate(targetPage);
  };

  return (
    <header className="relative md:sticky md:top-0 w-full z-50 bg-surface shadow-[0_4px_12px_rgba(20,25,35,0.06)]">
      {/* Top Dark Utility Bar */}
      <div className="bg-inverse-surface text-inverse-on-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-1.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[11px] font-display font-bold tracking-[0.04em]">
          <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1">
            <span className="tabular-nums">GSTIN: {STORE_INFO.gstin}</span>
            <span className="hidden sm:inline text-outline-variant">|</span>
            <span>Prop: {STORE_INFO.proprietor}</span>
            <span className="hidden md:inline text-outline-variant">|</span>
            <span className="hidden md:inline">Location: {STORE_INFO.locationShort}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1">
            <button
              type="button"
              onClick={onToggleLanguage}
              className="hover:text-tertiary-fixed transition-colors cursor-pointer whitespace-nowrap"
              title="Toggle Bilingual Emphasis"
            >
              Language: {languageMode === 'en-te' ? 'English / తెలుగు' : 'తెలుగు / English'}
            </button>
            <a
              className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-[2px] flex items-center gap-1 hover:bg-secondary transition-colors whitespace-nowrap"
              href={STORE_INFO.whatsappBase}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>WhatsApp చాట్</span>
            </a>
            <a
              className="text-tertiary-fixed hover:underline tabular-nums whitespace-nowrap"
              href={`tel:+91${STORE_INFO.phone1}`}
            >
              Call: {STORE_INFO.phone1}
            </a>
          </div>
        </div>
      </div>

      {/* Main Brand + Search + CTA Row */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('home-store')}
            className="flex items-center gap-2 text-left cursor-pointer"
          >
            <div className="bg-primary text-on-primary font-display text-[1.75rem] leading-none font-bold px-2.5 py-1 rounded-[2px] tracking-tight">
              MR
            </div>
            <div>
              <div className="font-display text-[1.25rem] md:text-[1.375rem] font-bold text-primary tracking-tight leading-none">
                {STORE_INFO.name}
              </div>
              <div className="font-display text-[11px] font-bold text-on-surface-variant tracking-wider uppercase mt-0.5">
                {STORE_INFO.tagline}
              </div>
            </div>
          </button>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={onOpenBookingsDrawer}
              aria-label="View Saved Bookings and Inquiries"
              className="relative w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              {totalSavedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-tertiary-fixed-dim text-on-tertiary-fixed text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {totalSavedCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-0 md:mx-4 relative">
          <div className="relative flex items-center">
            <label htmlFor="global-store-search" className="sr-only">
              Search Power Tillers, Sprayers, Cut-off Saws, Motor Rewinding, Rentals
            </label>
            <input
              id="global-store-search"
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchHits.length > 0) {
                  handleSelectHit(searchHits[0].targetPage);
                }
              }}
              className="w-full bg-surface-container-low text-on-surface text-sm px-3 py-2 pr-10 rounded-[2px] border-0 focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary"
              placeholder="Search Power Tillers, Sprayers, Cut-off Saws, Motor Rewinding, Rentals..."
              type="text"
            />
            {searchQuery ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className="absolute right-2.5 text-on-surface-variant hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            ) : (
              <span className="material-symbols-outlined absolute right-3 text-on-surface-variant pointer-events-none text-[20px]">
                search
              </span>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-surface-container-lowest rounded-[4px] shadow-xl border border-surface-dim z-50 max-h-80 overflow-y-auto">
              {searchHits.length > 0 ? (
                <ul className="divide-y divide-surface-container">
                  {searchHits.map((hit) => (
                    <li key={hit.id}>
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectHit(hit.targetPage);
                        }}
                        className="w-full text-left px-3 py-2.5 hover:bg-surface-container-low flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <div>
                          <div className="font-display text-sm font-bold text-on-surface">
                            {hit.title}
                          </div>
                          <div className="text-xs text-on-surface-variant">{hit.subtitle}</div>
                        </div>
                        <span className="bg-surface-container-high text-primary font-display text-[10px] font-bold px-2 py-0.5 rounded-[2px] shrink-0">
                          {hit.badge}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-3 text-xs text-on-surface-variant">
                  No direct match for "{searchQuery}". Try "Tiller", "Sprayer", "Auger", or "Rewinding".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Header CTA + Saved Bookings Drawer Trigger */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('tool-rentals-daily-rates', 'rental-booking-terminal')}
            className="bg-primary-container text-on-primary-container font-display text-[13px] font-bold px-3.5 py-2 rounded-[2px] uppercase tracking-[0.05em] hover:bg-primary transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            Book Rental / Service Repair
          </button>
          <button
            type="button"
            onClick={onOpenBookingsDrawer}
            aria-label="Open saved bookings and inquiries"
            className="relative w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-on-primary-fixed-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
            {totalSavedCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-tertiary-fixed-dim text-on-tertiary-fixed text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {totalSavedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav
        aria-label="Storefront Navigation"
        className="max-w-7xl mx-auto px-4 md:px-8 py-1.5 flex items-center gap-2 overflow-x-auto whitespace-nowrap bg-surface-container-low no-scrollbar"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`px-3 py-1.5 text-[13px] font-display font-bold tracking-[0.04em] transition-colors rounded-[2px] whitespace-nowrap shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-surface-container-high text-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
