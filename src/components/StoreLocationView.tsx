import { useState, type FormEvent } from 'react';
import { STORE_IMAGES, STORE_INFO, VILLAGE_DISTANCES } from '../data/storeData';
import type { PageId } from '../types/store';
import { buildWhatsAppMessageUrl } from '../utils/storeLogic';
import { ImageWithFallback } from './ImageWithFallback';

interface StoreLocationViewProps {
  onNavigate: (page: PageId, scrollTarget?: string) => void;
}

export function StoreLocationView({ onNavigate }: StoreLocationViewProps) {
  const [selectedVillage, setSelectedVillage] = useState(VILLAGE_DISTANCES[0].village);
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackTopic, setCallbackTopic] = useState('Machinery Purchase / Subsidy Bill');
  const [callbackSent, setCallbackSent] = useState(false);

  const selectedBelt =
    VILLAGE_DISTANCES.find((v) => v.village === selectedVillage) || VILLAGE_DISTANCES[0];

  const handleCallbackSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCallbackSent(true);
    setCallbackName('');
    setCallbackPhone('');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Store Contact Ribbon */}
      <section className="w-full bg-inverse-surface text-inverse-on-surface py-2 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px] font-display font-bold">
          <div className="flex items-center gap-2">
            <span className="bg-primary text-on-primary px-2 py-0.5 rounded-[2px] uppercase">
              PICHATUR PHYSICAL STOREFRONT
            </span>
            <span className="text-surface-variant">
              పిచ్చాటూరు బజార్ స్ట్రీట్ • Open Monday to Sunday, 7:00 AM – 9:00 PM
            </span>
          </div>
          <div className="text-tertiary-fixed tabular-nums">GSTIN: {STORE_INFO.gstin}</div>
        </div>
      </section>

      {/* Hero Store Contact Section */}
      <section className="w-full bg-surface-container-low px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="inline-block bg-secondary-fixed text-on-secondary-fixed font-display text-[11px] font-bold uppercase px-2.5 py-1 rounded-[2px]">
              TIRUPATI DISTRICT • ANDHRA PRADESH 517587
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface uppercase tracking-tight">
              Visit M.R. Power Tools on Main Road, Bazar Street, Pichatur
            </h1>
            <p className="text-base text-on-surface-variant max-w-2xl">
              Easily accessible for tractors, pickup autos, and two-wheelers from Nagari,
              Satyavedu, Puttur, Karvetinagar, and Vijayapuram. Come inspect machines live before
              renting or purchasing.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={`tel:+91${STORE_INFO.phone1}`}
                className="bg-primary text-on-primary font-display text-sm font-bold uppercase px-5 py-2.5 rounded-[2px] flex items-center gap-1.5 tabular-nums"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Call {STORE_INFO.phone1}
              </a>
              <a
                href={`tel:+91${STORE_INFO.phone2}`}
                className="bg-surface-container-highest text-on-surface font-display text-sm font-bold uppercase px-5 py-2.5 rounded-[2px] flex items-center gap-1.5 tabular-nums"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                Alt: {STORE_INFO.phone2}
              </a>
              <a
                href={buildWhatsAppMessageUrl(
                  'Namaste Muni Krishna Reddy garu, please share live Google Maps pin for M.R. Power Tools Pichatur.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-on-secondary font-display text-sm font-bold uppercase px-5 py-2.5 rounded-[2px] flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">pin_drop</span>
                Request WhatsApp Pin
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-surface-container-lowest p-3 rounded-[4px] shadow-md">
            <div className="h-56 rounded-[2px] overflow-hidden relative">
              <ImageWithFallback
                src={STORE_IMAGES.storefront}
                alt="M.R. Power Tools physical storefront in Bazar Street Pichatur"
                className="w-full h-full object-cover"
                fallbackLabel="M.R. POWER TOOLS • BAZAR STREET"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-inverse-surface/90 text-inverse-on-surface px-3 py-2 rounded-[2px]">
                <div className="font-display text-xs font-bold text-primary-fixed">
                  OPP. VENKATESWARA ELECTRICALS
                </div>
                <div className="text-xs text-surface-variant">
                  Main Road, Bazar Street, Pichatur, AP 517587
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map + Village Transport Estimator */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-surface-container-lowest p-5 rounded-[4px] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-on-surface uppercase">
              Store Route Map &amp; Surroundings
            </h2>
            <span className="font-display text-xs font-bold text-primary">
              Near Old Bus Stand Junction
            </span>
          </div>
          <div className="h-72 rounded-[4px] overflow-hidden shadow-inner">
            <ImageWithFallback
              src={STORE_IMAGES.pichaturMap}
              alt="Route map to M.R. Power Tools Bazar Street Pichatur"
              className="w-full h-full object-cover"
              fallbackLabel="Bazar Street, Pichatur, AP 517587"
            />
          </div>

          {/* Interactive Village Distance Checker */}
          <div className="bg-surface-container-low p-4 rounded-[4px] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label
                htmlFor="village-distance-select"
                className="font-display text-xs font-bold uppercase text-on-surface"
              >
                Check Auto / Pickup Distance from Your Village:
              </label>
              <select
                id="village-distance-select"
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="bg-surface-container-lowest text-on-surface text-sm px-3 py-1.5 rounded-[2px] focus:outline-none focus:ring-1 focus:ring-secondary"
              >
                {VILLAGE_DISTANCES.map((v) => (
                  <option key={v.village} value={v.village}>
                    {v.village}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-surface-container-lowest p-2.5 rounded-[2px]">
                <div className="font-display text-[11px] font-bold text-on-surface-variant uppercase">
                  Distance
                </div>
                <div className="font-display text-lg font-bold text-primary tabular-nums">
                  {selectedBelt.km}
                </div>
              </div>
              <div className="bg-surface-container-lowest p-2.5 rounded-[2px]">
                <div className="font-display text-[11px] font-bold text-on-surface-variant uppercase">
                  Travel Time
                </div>
                <div className="font-display text-lg font-bold text-secondary tabular-nums">
                  {selectedBelt.travelTime}
                </div>
              </div>
              <div className="bg-surface-container-lowest p-2.5 rounded-[2px]">
                <div className="font-display text-[11px] font-bold text-on-surface-variant uppercase">
                  Logistics
                </div>
                <div className="font-display text-xs font-bold text-on-surface mt-1">
                  {selectedBelt.dispatchMode}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Callback & Proprietor Info */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-inverse-surface text-inverse-on-surface p-6 rounded-[4px] space-y-3">
            <div className="font-display text-xs font-bold uppercase text-tertiary-fixed">
              STORE PROPRIETOR &amp; BILLING DESK
            </div>
            <h3 className="font-display text-2xl font-bold">
              {STORE_INFO.proprietor} ({STORE_INFO.proprietorTelugu})
            </h3>
            <p className="text-sm text-surface-variant">
              {STORE_INFO.addressFull}
              <br />
              {STORE_INFO.hours}
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onNavigate('machinery-equipment-sales')}
                className="bg-primary text-on-primary font-display text-xs font-bold uppercase px-3.5 py-2 rounded-[2px] cursor-pointer"
              >
                Browse Sales Catalog
              </button>
              <button
                type="button"
                onClick={() => onNavigate('tool-rentals-daily-rates')}
                className="bg-secondary text-on-secondary font-display text-xs font-bold uppercase px-3.5 py-2 rounded-[2px] cursor-pointer"
              >
                Check Rental Rates
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-[4px] shadow-sm space-y-3">
            <h3 className="font-display text-lg font-bold text-on-surface uppercase">
              Request Quick Phone Call Back
            </h3>
            <p className="text-sm text-on-surface-variant">
              Leave your phone number and topic — we will call you back within 15 minutes during
              store hours.
            </p>
            <form onSubmit={handleCallbackSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="cb-name"
                  className="font-display text-xs font-bold uppercase block mb-1"
                >
                  Your Name *
                </label>
                <input
                  id="cb-name"
                  type="text"
                  required
                  value={callbackName}
                  onChange={(e) => setCallbackName(e.target.value)}
                  placeholder="e.g. R. Srinivasulu"
                  className="w-full bg-surface-container-low px-3 py-2 rounded-[2px] text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
              <div>
                <label
                  htmlFor="cb-phone"
                  className="font-display text-xs font-bold uppercase block mb-1"
                >
                  Mobile Number *
                </label>
                <input
                  id="cb-phone"
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full bg-surface-container-low px-3 py-2 rounded-[2px] text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
              <div>
                <label
                  htmlFor="cb-topic"
                  className="font-display text-xs font-bold uppercase block mb-1"
                >
                  Inquiry Topic
                </label>
                <select
                  id="cb-topic"
                  value={callbackTopic}
                  onChange={(e) => setCallbackTopic(e.target.value)}
                  className="w-full bg-surface-container-low px-3 py-2 rounded-[2px] text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                >
                  <option>Machinery Purchase / Subsidy Bill</option>
                  <option>Daily Tool Rental Availability</option>
                  <option>Motor Rewinding / Engine Repair</option>
                  <option>Spare Parts Price Check</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-on-primary font-display text-xs font-bold uppercase py-2.5 rounded-[2px] hover:bg-on-primary-fixed-variant transition-colors cursor-pointer"
              >
                Request Callback from Pichatur Desk
              </button>
            </form>
            {callbackSent && (
              <div
                className="p-3 bg-secondary-fixed text-on-secondary-fixed rounded-[2px] text-xs font-bold"
                role="status"
              >
                ✓ Callback logged for {callbackTopic}. {STORE_INFO.proprietor} will reach out
                shortly.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
