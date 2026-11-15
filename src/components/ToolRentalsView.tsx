import { useMemo, useState, type FormEvent } from 'react';
import {
  OFFICIAL_TARIFF_ROWS,
  RENTAL_EQUIPMENT,
  STORE_IMAGES,
  STORE_INFO,
} from '../data/storeData';
import type { RentalCategory, SavedRentalBooking } from '../types/store';
import {
  buildWhatsAppRentalUrl,
  filterRentals,
  formatCurrencyINR,
} from '../utils/storeLogic';
import { ImageWithFallback } from './ImageWithFallback';

interface ToolRentalsViewProps {
  onSaveRentalBooking: (
    booking: Omit<SavedRentalBooking, 'id' | 'createdAt' | 'whatsappUrl'> & {
      whatsappUrl: string;
    },
  ) => SavedRentalBooking;
}

const RENTAL_FILTER_TABS: { id: RentalCategory; label: string }[] = [
  { id: 'all', label: 'All Equipment (8)' },
  { id: 'agri', label: 'Agri & Farming (వ్యవసాయం)' },
  { id: 'civil', label: 'Civil & Masonry (భవన నిర్మాణం)' },
  { id: 'power', label: 'Generators & Pumps' },
];

export function ToolRentalsView({ onSaveRentalBooking }: ToolRentalsViewProps) {
  const [category, setCategory] = useState<RentalCategory>('all');
  const [selectedTool, setSelectedTool] = useState(RENTAL_EQUIPMENT[0].selectOptionValue);
  const [duration, setDuration] = useState('1 Day (24 Hours)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [village, setVillage] = useState('');
  const [pickupDate, setPickupDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<SavedRentalBooking | null>(null);

  const visibleRentals = useMemo(
    () => filterRentals(RENTAL_EQUIPMENT, category),
    [category],
  );

  const handleReserveClick = (optionValue: string) => {
    setSelectedTool(optionValue);
    setConfirmedBooking(null);
    const el = document.getElementById('rental-booking-terminal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const whatsappUrl = buildWhatsAppRentalUrl({
      tool: selectedTool,
      duration,
      name: name.trim(),
      phone: phone.trim(),
      village: village.trim(),
      date: pickupDate,
      notes: notes.trim(),
    });
    const saved = onSaveRentalBooking({
      tool: selectedTool,
      duration,
      name: name.trim(),
      phone: phone.trim(),
      village: village.trim(),
      date: pickupDate,
      notes: notes.trim(),
      whatsappUrl,
    });
    setConfirmedBooking(saved);
    setName('');
    setPhone('');
    setVillage('');
    setNotes('');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Operational Alert & Seasonal Rental Notice Ribbon */}
      <section className="w-full bg-surface-container-high py-1.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 text-on-surface">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-on-primary">
              <span className="material-symbols-outlined text-[14px]">local_shipping</span>
            </span>
            <span className="font-display text-[11px] font-bold uppercase tracking-wider text-primary">
              ఖరీఫ్ &amp; రబీ స్పెషల్ రెంటల్ సర్వీస్
            </span>
            <span className="text-on-surface-variant text-sm hidden sm:inline">
              • Daily &amp; Weekly Machinery on Flexible Terms
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-display font-bold">
            <span className="flex items-center gap-1 text-tertiary font-bold">
              <span className="material-symbols-outlined text-[16px] text-tertiary">
                check_circle
              </span>
              Zero Security Deposit with Aadhaar verification
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">schedule</span> 7:00 AM – 9:00
              PM Shop Dispatch
            </span>
          </div>
        </div>
      </section>

      {/* Dynamic Section Header */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8 space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-secondary-fixed text-on-secondary-fixed font-display text-[11px] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[15px]">agriculture</span> Pichatur,
              Nagari, Satyavedu, Puttur Hub
            </div>
            <h1 className="font-display text-3xl font-bold text-on-surface uppercase tracking-tight">
              Farm &amp; Construction Tool Rentals in Pichatur Region
            </h1>
            <p className="font-display text-xl text-primary font-bold">
              యంత్రాలు అద్దెకు ఇవ్వబడును • తక్కువ ఖర్చు, ఎక్కువ పని
            </p>
            <p className="text-lg text-on-surface-variant max-w-3xl pt-1">
              Rent heavy machinery by the day or week. Thoroughly serviced, fueled &amp; tested
              before handover. Zero paperwork hassle for local rythus, civil contractors, and
              borewell technicians.
            </p>
          </div>

          <div className="lg:col-span-4 bg-surface-container p-4 rounded-[4px] shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-[2px] bg-primary text-on-primary">
                <span className="material-symbols-outlined text-[24px]">electric_rickshaw</span>
              </div>
              <div className="space-y-1">
                <div className="font-display text-[15px] font-bold text-on-surface uppercase">
                  Village Transport Available
                </div>
                <p className="text-sm text-on-surface-variant leading-snug">
                  Pick up direct from Pichatur Bazar Street store or request village delivery via
                  local auto/rickshaw to Nagari, Satyavedu, Ramagiri &amp; Puttur rural belts.
                </p>
                <div className="pt-1 flex items-center gap-2 font-display text-[11px] font-bold text-secondary">
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span className="tabular-nums">Proprietor Direct: {STORE_INFO.phone1}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Mode Bar */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-2">
        <div className="bg-surface-container-low p-2 rounded-[4px] flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {RENTAL_FILTER_TABS.map((tab) => {
              const isActive = category === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-[2px] font-display text-[13px] font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-inverse-surface text-inverse-on-surface'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3 font-display text-[11px] font-bold text-on-surface-variant">
            <span className="inline-flex items-center gap-1 text-primary">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
              Ready For Immediate Pickup Today ({visibleRentals.length})
            </span>
          </div>
        </div>
      </section>

      {/* Main Equipment Rental Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleRentals.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-surface-container-lowest rounded-[4px] shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="bg-inverse-surface text-inverse-on-surface px-2.5 py-1.5 flex items-center justify-between text-[11px] font-display font-bold">
                <span className="uppercase tracking-wider">{item.headerTag}</span>
                <span className="bg-primary text-on-primary px-1.5 py-0.5 rounded-[2px] font-bold">
                  READY
                </span>
              </div>
              <div className="p-3 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-1">
                    <h2 className="font-display text-lg font-semibold text-on-surface">
                      {item.name}
                    </h2>
                    <span className="text-[11px] font-display font-bold text-on-surface-variant shrink-0">
                      {item.specBadge}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant mt-1">{item.description}</p>
                  <div className="mt-2 p-1.5 rounded-[2px] bg-surface-container-low flex items-center justify-between text-[11px] font-display">
                    <span className="text-on-surface-variant font-bold">{item.infoLabel}</span>
                    <span className="text-on-surface font-semibold">{item.infoValue}</span>
                  </div>
                </div>

                <div className="pt-2 space-y-1.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-tertiary-fixed text-on-tertiary-fixed p-2 rounded-[2px] text-center">
                      <span className="block text-[11px] font-display font-bold uppercase">
                        1-Day Rate
                      </span>
                      <span className="font-display text-[1.375rem] font-bold leading-tight tabular-nums">
                        {formatCurrencyINR(item.dailyRate)}
                      </span>
                      <span className="block text-[11px] font-display font-bold">
                        {item.dailySubtext}
                      </span>
                    </div>
                    <div className="bg-surface-container text-on-surface p-2 rounded-[2px] text-center">
                      <span className="block text-[11px] font-display font-bold uppercase text-on-surface-variant">
                        {item.multiDayLabel}
                      </span>
                      <span className="font-display text-[1.375rem] font-bold leading-tight text-primary tabular-nums">
                        {item.multiDayRate}
                      </span>
                      <span className="block text-[11px] font-display font-bold text-on-surface-variant">
                        {item.multiDaySubtext}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleReserveClick(item.selectOptionValue)}
                    className="w-full bg-primary-container text-on-primary-container font-display text-[13px] font-bold py-2 rounded-[2px] uppercase tracking-wider hover:bg-primary transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>{' '}
                    Reserve for Rent
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Complete Official Daily Rate Card */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="bg-surface-container-lowest rounded-[4px] shadow-sm overflow-hidden">
          <div className="p-4 bg-inverse-surface text-inverse-on-surface flex flex-wrap items-center justify-between gap-y-2">
            <div>
              <div className="font-display text-[11px] font-bold text-primary-fixed uppercase tracking-wider">
                OFFICIAL PICHATUR TARIFF CARD 2024
              </div>
              <h3 className="font-display text-lg font-semibold">
                Daily, 3-Day &amp; Weekly Commercial Rental Schedule
              </h3>
            </div>
            <div className="text-right">
              <span className="font-display text-[11px] font-bold text-surface-variant">
                Certified Store Price • No Hidden Security Fees
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container text-on-surface font-display text-[11px] font-bold uppercase tracking-wide">
                  <th className="p-2.5">Equipment Description</th>
                  <th className="p-2.5">Primary Application</th>
                  <th className="p-2.5 text-center">1-Day Rate</th>
                  <th className="p-2.5 text-center">3-Day Pack</th>
                  <th className="p-2.5 text-center">7-Day Weekly</th>
                  <th className="p-2.5 text-right">Verification Req.</th>
                </tr>
              </thead>
              <tbody className="text-sm text-on-surface">
                {OFFICIAL_TARIFF_ROWS.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={`${
                      idx % 2 === 1 ? 'bg-surface-container-low/50' : 'bg-surface-container-lowest'
                    } hover:bg-surface-container-low transition-colors`}
                  >
                    <td className="p-2.5 font-semibold">{row.equipment}</td>
                    <td className="p-2.5 text-on-surface-variant">{row.application}</td>
                    <td className="p-2.5 text-center font-bold text-primary tabular-nums">
                      {formatCurrencyINR(row.day1)}
                    </td>
                    <td className="p-2.5 text-center font-semibold tabular-nums">
                      {formatCurrencyINR(row.day3)}
                    </td>
                    <td className="p-2.5 text-center font-bold text-tertiary tabular-nums">
                      {formatCurrencyINR(row.day7)}
                    </td>
                    <td className="p-2.5 text-right font-display text-[11px] font-bold text-secondary">
                      {row.verification}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-2.5 bg-surface-container flex flex-wrap items-center justify-between gap-2 text-sm text-on-surface-variant">
            <span>
              * Machine fuels (Petrol, 2T Engine Oil, Mobil 4T) charged as per actual usage or
              customer supplies.
            </span>
            <span className="font-bold text-primary">
              All rates are for 24-hour shift cycle with 2-hour return grace period.
            </span>
          </div>
        </div>
      </section>

      {/* Step-by-Step Rental Flow */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="space-y-2 text-center max-w-2xl mx-auto mb-6">
          <div className="inline-block bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-[2px] font-display text-[11px] font-bold uppercase tracking-wider">
            సులభమైన అద్దె విధానం • 4 Simple Steps
          </div>
          <h2 className="font-display text-3xl font-bold text-on-surface uppercase">
            How Our Rental System Works
          </h2>
          <p className="text-base text-on-surface-variant">
            No bank guarantees, no lengthy paperwork. Built to support Pichatur taluk rythus during
            urgent agricultural and civil schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: '1',
              icon: 'devices_other',
              title: 'Select Tool & Days',
              desc: 'Choose required machine and required days online, over phone, WhatsApp or visit our Bazar Street storefront directly.',
              telugu: 'Step 1: ఆన్‌లైన్ లేదా ఫోన్ బుకింగ్',
            },
            {
              step: '2',
              icon: 'badge',
              title: 'Aadhaar Verification',
              desc: 'Present your Aadhaar Card or Voter ID along with phone number. No large cash deposits required for verified local residents.',
              telugu: 'Step 2: సాధారణ ఆధార్ వివరాలు',
            },
            {
              step: '3',
              icon: 'precision_manufacturing',
              title: 'Free 5-Min Test Demo',
              desc: 'Our store mechanics test-run the machine in front of you, demonstrate cold-start, oil mixing, and review field safety protocols.',
              telugu: 'Step 3: మెషిన్ టెస్టింగ్ & డెమో',
            },
            {
              step: '4',
              icon: 'published_with_changes',
              title: 'Work & Flexible Return',
              desc: 'Finish your project. Rain delays? Just phone call proprietor Muni Krishna Reddy to extend your rental with zero late penalty.',
              telugu: 'Step 4: సులభంగా తిరిగి ఇవ్వడం',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-surface-container-lowest p-4 rounded-[4px] shadow-sm relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-8 h-8 rounded-full bg-primary text-on-primary font-display text-lg flex items-center justify-center font-bold tabular-nums">
                  {item.step}
                </span>
                <span className="material-symbols-outlined text-[28px] text-secondary">
                  {item.icon}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-on-surface mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-on-surface-variant">{item.desc}</p>
              <div className="mt-2 font-display text-[11px] text-secondary uppercase font-semibold">
                {item.telugu}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive WhatsApp Direct Booking Terminal */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4" id="rental-booking-terminal">
        <div className="bg-surface-container rounded-[4px] shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 bg-inverse-surface text-inverse-on-surface p-6 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 bg-primary px-2.5 py-1 rounded-[2px] text-on-primary font-display text-[11px] font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[15px]">flash_on</span> Instant
                Dispatch Terminal
              </div>
              <h3 className="font-display text-3xl font-bold leading-tight uppercase">
                Reserve Machinery Via WhatsApp in 60 Seconds
              </h3>
              <p className="text-base text-surface-variant">
                Enter your village and tool choice. The system prepares a direct pre-filled WhatsApp
                message sent straight to store owner <strong>{STORE_INFO.proprietor}</strong> for
                instant machine holding.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-sm text-surface-variant">
                  <span className="material-symbols-outlined text-primary-fixed text-[18px]">
                    verified
                  </span>
                  <span>Checked for 100% spark plug and compression health</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-surface-variant">
                  <span className="material-symbols-outlined text-primary-fixed text-[18px]">
                    verified
                  </span>
                  <span>Pre-adjusted idling &amp; carburetor tuned for AP climate</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-surface-variant">
                  <span className="material-symbols-outlined text-primary-fixed text-[18px]">
                    verified
                  </span>
                  <span>Local driver auto-delivery available at reasonable charge</span>
                </div>
              </div>
            </div>
            <div className="pt-6 space-y-1">
              <div className="font-display text-[11px] font-bold text-tertiary-fixed uppercase">
                Direct Voice Helpline:
              </div>
              <a
                className="font-display text-xl text-inverse-on-surface hover:text-primary-fixed transition-colors font-bold block tabular-nums"
                href={`tel:+91${STORE_INFO.phone1}`}
              >
                +91 {STORE_INFO.phone1} / {STORE_INFO.phone2}
              </a>
              <span className="text-sm text-surface-variant">
                M.R. Power Tools • Bazar Street, Pichatur
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-surface-container-lowest p-6">
            {confirmedBooking && (
              <div
                className="mb-4 p-4 bg-secondary-fixed text-on-secondary-fixed rounded-[4px] space-y-2"
                role="status"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-display text-xs font-bold uppercase">
                    ✓ Rental Reservation Prepared • {confirmedBooking.id}
                  </span>
                  <button
                    type="button"
                    onClick={() => setConfirmedBooking(null)}
                    className="text-xs font-bold underline cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
                <div className="font-display text-base font-bold">
                  {confirmedBooking.tool} — {confirmedBooking.duration}
                </div>
                <div className="text-sm">
                  Reserved for <strong>{confirmedBooking.name}</strong> ({confirmedBooking.village},
                  Ph: {confirmedBooking.phone}) starting <strong>{confirmedBooking.date}</strong>.
                </div>
                <div className="pt-1 flex flex-wrap gap-2">
                  <a
                    href={confirmedBooking.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary text-on-secondary font-display text-xs font-bold uppercase px-4 py-2 rounded-[2px] inline-flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    Send Pre-Filled WhatsApp Message Now
                  </a>
                  <a
                    href={`tel:+91${STORE_INFO.phone1}`}
                    className="bg-primary text-on-primary font-display text-xs font-bold uppercase px-4 py-2 rounded-[2px] inline-flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    Call {STORE_INFO.phone1}
                  </a>
                </div>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block font-display text-[13px] font-bold text-on-surface uppercase mb-1"
                    htmlFor="rent-tool-select"
                  >
                    Select Machinery Tool *
                  </label>
                  <select
                    id="rent-tool-select"
                    value={selectedTool}
                    onChange={(e) => setSelectedTool(e.target.value)}
                    required
                    className="w-full bg-surface-container-low text-on-surface text-base px-3 py-2.5 rounded-[2px] focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
                  >
                    {RENTAL_EQUIPMENT.map((item) => (
                      <option key={item.id} value={item.selectOptionValue}>
                        {item.selectOptionLabel}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    className="block font-display text-[13px] font-bold text-on-surface uppercase mb-1"
                    htmlFor="rent-duration"
                  >
                    Rental Duration *
                  </label>
                  <select
                    id="rent-duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                    className="w-full bg-surface-container-low text-on-surface text-base px-3 py-2.5 rounded-[2px] focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
                  >
                    <option value="1 Day (24 Hours)">1 Day (24 Hours)</option>
                    <option value="2 Days">2 Days</option>
                    <option value="3 Days (Mini-Pack)">3 Days (Special Pack)</option>
                    <option value="7 Days (Full Week)">7 Days (Full Week Discount)</option>
                    <option value="10+ Days (Bulk Project)">10+ Days (Extended Project)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block font-display text-[13px] font-bold text-on-surface uppercase mb-1"
                    htmlFor="rent-name"
                  >
                    Your Name / రైతు లేదా కాంట్రాక్టర్ పేరు *
                  </label>
                  <input
                    id="rent-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Muni Sekhar Reddy / B. Rajesh"
                    required
                    type="text"
                    className="w-full bg-surface-container-low text-on-surface text-base px-3 py-2.5 rounded-[2px] focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
                  />
                </div>
                <div>
                  <label
                    className="block font-display text-[13px] font-bold text-on-surface uppercase mb-1"
                    htmlFor="rent-phone"
                  >
                    Mobile Number *
                  </label>
                  <input
                    id="rent-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    pattern="[0-9]{10}"
                    placeholder="e.g. 9700400266"
                    required
                    type="tel"
                    className="w-full bg-surface-container-low text-on-surface text-base px-3 py-2.5 rounded-[2px] focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block font-display text-[13px] font-bold text-on-surface uppercase mb-1"
                    htmlFor="rent-village"
                  >
                    Village / Town / Mandal *
                  </label>
                  <input
                    id="rent-village"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    placeholder="e.g. Pichatur, Keelapudi, Satyavedu, Nagari"
                    required
                    type="text"
                    className="w-full bg-surface-container-low text-on-surface text-base px-3 py-2.5 rounded-[2px] focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
                  />
                </div>
                <div>
                  <label
                    className="block font-display text-[13px] font-bold text-on-surface uppercase mb-1"
                    htmlFor="rent-date"
                  >
                    Pickup / Starting Date *
                  </label>
                  <input
                    id="rent-date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                    type="date"
                    className="w-full bg-surface-container-low text-on-surface text-base px-3 py-2.5 rounded-[2px] focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block font-display text-[13px] font-bold text-on-surface uppercase mb-1"
                  htmlFor="rent-notes"
                >
                  Delivery Preference &amp; Extra Requests
                </label>
                <input
                  id="rent-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Need auto delivery to farm near dam / Need 2T oil bottle included"
                  type="text"
                  className="w-full bg-surface-container-low text-on-surface text-base px-3 py-2.5 rounded-[2px] focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
                />
              </div>

              <div className="pt-1 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex-1 bg-secondary-container text-on-secondary-container font-display text-[15px] font-bold py-3 px-6 rounded-[2px] uppercase tracking-wider hover:bg-secondary transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span> Book Rental via
                  WhatsApp (వాట్సాప్ బుకింగ్)
                </button>
                <a
                  className="w-full sm:w-auto bg-surface-container-high text-on-surface font-display text-[13px] font-bold py-3 px-4 rounded-[2px] uppercase tracking-wide hover:bg-surface-variant transition-colors flex items-center justify-center gap-1.5 text-center"
                  href={`tel:+91${STORE_INFO.phone1}`}
                >
                  <span className="material-symbols-outlined text-[18px]">call</span> Direct Call
                </a>
              </div>
              <p className="font-display text-[11px] font-bold text-on-surface-variant text-center">
                * Upon submitting, your rental slip is saved and ready to send directly to our
                Pichatur WhatsApp store line.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Regional Coverage Map */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="bg-surface-container-lowest p-4 md:p-6 rounded-[4px] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-2.5">
              <div className="inline-flex items-center gap-2 text-primary font-display text-[11px] uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[16px]">pin_drop</span> Service
                Radius: 35 KM
              </div>
              <h3 className="font-display text-2xl font-semibold text-on-surface uppercase">
                Fast Rural Dispatch across Chittoor &amp; Tirupati Border Mandals
              </h3>
              <p className="text-base text-on-surface-variant">
                Whether you operate mango orchards in Satyavedu, sugarcane fields around Nagari, or
                civil roadwork in Ramagiri, M.R. Power Tools arranges quick rental machinery dispatch
                through trusted local logistics.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 font-display text-[11px]">
                <div className="p-2 rounded-[2px] bg-surface-container-low text-on-surface">
                  <strong>Pichatur Town:</strong> Instant Walk-in Store pickup
                </div>
                <div className="p-2 rounded-[2px] bg-surface-container-low text-on-surface">
                  <strong>Nagari / Puttur:</strong> 30-min Auto transport
                </div>
                <div className="p-2 rounded-[2px] bg-surface-container-low text-on-surface">
                  <strong>Satyavedu / Tada:</strong> Direct bus/auto parcel
                </div>
                <div className="p-2 rounded-[2px] bg-surface-container-low text-on-surface">
                  <strong>Vijayapuram:</strong> Rural delivery available
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="w-full h-72 rounded-[4px] shadow-inner relative overflow-hidden flex items-end p-3">
                <ImageWithFallback
                  src={STORE_IMAGES.coverageMap}
                  alt="Regional coverage map for Pichatur, Nagari, Satyavedu, and Puttur"
                  className="absolute inset-0 w-full h-full object-cover"
                  fallbackLabel="Pichatur 35 KM Service Radius"
                />
                <div className="relative z-10 bg-inverse-surface/90 text-inverse-on-surface p-3 rounded-[4px] backdrop-blur-sm max-w-md">
                  <div className="font-display text-lg font-bold text-primary-fixed">
                    M.R. POWER TOOLS STORE
                  </div>
                  <p className="text-sm text-surface-variant">
                    Main Bazar Street, Opp. Venkateswara Electricals, Pichatur, AP 517587. Open all
                    7 days for machinery rental collection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Customer Rythu / Contractor Testimonials */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-10">
        <div className="bg-surface-container-low p-4 md:p-6 rounded-[4px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-4">
            <div>
              <span className="text-tertiary font-display text-[11px] uppercase tracking-wider font-bold">
                రైతుల అభిప్రాయాలు
              </span>
              <h3 className="font-display text-lg font-bold text-on-surface uppercase">
                Trusted by 1,200+ Farmers &amp; Civil Crews
              </h3>
            </div>
            <div className="font-display text-[11px] font-bold text-on-surface-variant">
              Pichatur Mandal Rythu Community Reviews
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface-container-lowest p-4 rounded-[4px] shadow-sm flex flex-col justify-between">
              <p className="text-sm text-on-surface-variant italic mb-3">
                &quot;Took the 7HP petrol power tiller for 3 days to clear weeds in my 4-acre mango
                orchard in Keelapudi. Muni Krishna Reddy checked engine oil and test-started it.
                Machine worked non-stop. Saved ₹7,000 on manual coolie wages.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-bold font-display text-lg">
                  K
                </div>
                <div>
                  <div className="font-display text-[13px] font-bold text-on-surface">
                    K. Subramanyam Naidu
                  </div>
                  <div className="text-xs text-on-surface-variant">
                    Mango Grower, Keelapudi Village
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded-[4px] shadow-sm flex flex-col justify-between">
              <p className="text-sm text-on-surface-variant italic mb-3">
                &quot;Needed a 16kg breaker hammer immediately for a basement slab modification near
                Nagari bypass. Hired it for 2 days at ₹500/day. Chisels were sharp and powerful.
                Zero security deposit hassle since I am local.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-surface-container-high text-secondary flex items-center justify-center font-bold font-display text-lg">
                  S
                </div>
                <div>
                  <div className="font-display text-[13px] font-bold text-on-surface">
                    S. Ravi Kumar
                  </div>
                  <div className="text-xs text-on-surface-variant">Building Contractor, Nagari</div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded-[4px] shadow-sm flex flex-col justify-between">
              <p className="text-sm text-on-surface-variant italic mb-3">
                &quot;The 68cc earth auger made fencing 120 stone poles effortless. In 1 day we
                finished what usually takes 4 days of spade digging. When rain stopped work in
                afternoon, shop extended it by evening with full cooperation.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-surface-container-high text-tertiary flex items-center justify-center font-bold font-display text-lg">
                  M
                </div>
                <div>
                  <div className="font-display text-[13px] font-bold text-on-surface">
                    M. Venkat Reddy
                  </div>
                  <div className="text-xs text-on-surface-variant">Farmer, Ramagiri Mandal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
