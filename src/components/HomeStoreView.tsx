import { HOME_SPOTLIGHT_ITEMS, STORE_IMAGES, STORE_INFO } from '../data/storeData';
import type { PageId } from '../types/store';
import { ImageWithFallback } from './ImageWithFallback';

interface HomeStoreViewProps {
  onNavigate: (page: PageId, scrollTarget?: string) => void;
  languageMode: 'en-te' | 'te-primary';
}

const HOME_RENTAL_ROWS = [
  {
    icon: 'agriculture',
    iconColor: 'text-secondary',
    name: 'Power Weeder / Tiller (7 HP Petrol)',
    useCase: 'Mango orchard tilling, inter-row de-weeding',
    rate: '₹1,100 / day',
    deposit: '₹1,500 (Waived for local Rythus)',
    cta: 'Book Tiller',
    toolValue: 'Power Weeder / Tiller (7HP Petrol)',
    striped: false,
  },
  {
    icon: 'hardware',
    iconColor: 'text-primary',
    name: '16Kg Concrete Demolition Hammer',
    useCase: 'Slab breaking, foundation chiseling, well chipping',
    rate: '₹600 / day',
    deposit: '₹1,000 + Aadhaar Copy',
    cta: 'Book Breaker',
    toolValue: 'Demolition Hammer 16kg',
    striped: true,
  },
  {
    icon: 'construction',
    iconColor: 'text-tertiary',
    name: 'Earth Auger Machine (68cc + 8" Bit)',
    useCase: 'Solar fencing pole erection, sapling digging',
    rate: '₹700 / day',
    deposit: '₹1,000 (Waived with Rythu Passbook)',
    cta: 'Book Auger',
    toolValue: 'Earth Auger with Operator Bits (68CC)',
    striped: false,
  },
  {
    icon: 'yard',
    iconColor: 'text-secondary',
    name: '58cc Heavy Petrol Chainsaw',
    useCase: 'Tree felling, neem/mango logs cutting, pruning',
    rate: '₹500 / day',
    deposit: '₹800 + Aadhaar Copy',
    cta: 'Book Chainsaw',
    toolValue: 'Power Weeder / Tiller (7HP Petrol)',
    striped: true,
  },
  {
    icon: 'science',
    iconColor: 'text-on-surface',
    name: '16L Battery Knapsack Sprayer',
    useCase: 'Paddy pesticide spray, horticulture weed spray',
    rate: '₹250 / day',
    deposit: '₹300 (Fully charged battery provided)',
    cta: 'Book Sprayer',
    toolValue: 'Knapsack Power Sprayer (High Pressure)',
    striped: false,
  },
  {
    icon: 'content_cut',
    iconColor: 'text-primary',
    name: '355mm Metal Cut-Off Chop Saw',
    useCase: 'Field fabrication, roofing shed steel sizing',
    rate: '₹400 / day',
    deposit: '₹500 + New Blade Fee as consumed',
    cta: 'Book Saw',
    toolValue: '14-Inch Concrete & Road Groove Cutter',
    striped: true,
  },
];

export function HomeStoreView({ onNavigate, languageMode }: HomeStoreViewProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Announcement Banner */}
      <section className="w-full bg-primary text-on-primary py-2.5 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 text-[11px] font-display font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim shrink-0" />
            <span className="text-tertiary-fixed font-bold">
              {languageMode === 'te-primary'
                ? 'ఖరీఫ్ & రబీ వ్యవసాయ యంత్రాల సహాయం:'
                : 'Kharif & Rabi Season Farm Support:'}
            </span>
            <span className="text-on-primary">
              Field-ready Tillers, 16L Sprayers &amp; Earth Augers Available for Immediate Handover
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary-fixed">తెలుగు &amp; English Service Desk</span>
            <span className="text-primary-fixed font-bold" aria-hidden="true">
              ●
            </span>
            <span>Daily 7:00 AM – 9:00 PM</span>
          </div>
        </div>
      </section>

      {/* Hero Power Section */}
      <section className="w-full bg-surface-container-lowest py-10 px-4 md:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Impact Messaging */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-surface-container-high text-primary px-3 py-1 rounded-[2px] text-[11px] font-display font-bold uppercase tracking-wide">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>
                  Pichatur&apos;s #1 Agri-Machinery &amp; Power Tools Store • Sales • Service • Rental
                </span>
              </div>

              <h1
                className="font-display text-[2.25rem] md:text-[3.25rem] font-bold tracking-[-0.03em] text-on-surface leading-[1.1]"
                style={{ textWrap: 'balance' }}
              >
                HEAVY MACHINERY, FARM TOOLS &amp;{' '}
                <span className="text-primary underline decoration-primary-container decoration-4 underline-offset-4">
                  INSTANT REPAIR
                </span>{' '}
                FOR RYTHUS &amp; BUILDERS
              </h1>

              {languageMode === 'te-primary' && (
                <p className="font-display text-lg font-bold text-primary">
                  రైతులకు మరియు కాంట్రాక్టర్లకు నమ్మకమైన వ్యవసాయ యంత్రాలు, అద్దె పరికరాలు &amp; మోటార్ రీవైండింగ్
                </p>
              )}

              <p className="text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Complete inventory of 7HP Petrol &amp; Diesel Power Tillers, High-Pressure Knapsack
                Sprayers, Heavy Earth Augers, Brush Cutters, Chainsaws, Demolition Hammers,
                Submersible Pumps, and Same-Day Motor Rewinding in Bazar Street, Pichatur.
              </p>

              {/* Core Callout Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="bg-surface-container-low p-2.5 rounded-[2px] shadow-sm">
                  <div className="font-display text-[11px] font-bold text-secondary uppercase">
                    GST Subsidy Bills
                  </div>
                  <div className="font-display text-[13px] text-on-surface font-bold tabular-nums">
                    {STORE_INFO.gstin}
                  </div>
                </div>
                <div className="bg-surface-container-low p-2.5 rounded-[2px] shadow-sm">
                  <div className="font-display text-[11px] font-bold text-primary uppercase">
                    Field Demonstration
                  </div>
                  <div className="font-display text-[13px] text-on-surface font-bold">
                    15-Min Live Test
                  </div>
                </div>
                <div className="bg-surface-container-low p-2.5 rounded-[2px] shadow-sm">
                  <div className="font-display text-[11px] font-bold text-tertiary uppercase">
                    Motor Rewinding
                  </div>
                  <div className="font-display text-[13px] text-on-surface font-bold">
                    Same-Day Pick Up
                  </div>
                </div>
                <div className="bg-surface-container-low p-2.5 rounded-[2px] shadow-sm">
                  <div className="font-display text-[11px] font-bold text-on-surface-variant uppercase">
                    Rental Availability
                  </div>
                  <div className="font-display text-[13px] text-on-surface font-bold tabular-nums">
                    From ₹300 / Day
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection('machinery-sales')}
                  className="bg-primary text-on-primary font-display text-[15px] font-bold px-6 py-3 rounded-[2px] shadow-md hover:bg-primary-container transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">agriculture</span>
                  <span>Browse Machinery For Sale</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('rental-rates')}
                  className="bg-secondary text-on-secondary font-display text-[15px] font-bold px-5 py-3 rounded-[2px] shadow-md hover:bg-secondary-container transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                  <span>Check Tool Rental Rates</span>
                </button>
                <a
                  className="bg-surface-container-highest text-on-surface font-display text-[15px] font-bold px-4 py-3 rounded-[2px] shadow-sm hover:bg-surface-container-high transition-all flex items-center gap-2"
                  href={`${STORE_INFO.whatsappBase}?text=Namaste%20Muni%20Krishna%20Reddy%20garu,%20I%20need%20equipment%20details%20from%20MR%20Power%20Tools.`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-secondary text-[20px]">chat</span>
                  <span>WhatsApp Dispatch</span>
                </a>
                <a
                  className="bg-primary-container text-on-primary-container font-display text-[15px] font-bold px-4 py-3 rounded-[2px] shadow-sm hover:bg-primary transition-all flex items-center gap-2"
                  href={`tel:+91${STORE_INFO.phone1}`}
                >
                  <span className="material-symbols-outlined text-[20px]">call</span>
                  <span>Call Muni Krishna Reddy</span>
                </a>
              </div>
            </div>

            {/* Right: Authentic Store Showcase */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative bg-surface-container rounded-[4px] shadow-lg overflow-hidden h-64">
                <ImageWithFallback
                  src={STORE_IMAGES.storefront}
                  alt="M.R. Power Tools physical storefront on Bazar Street in Pichatur, Andhra Pradesh"
                  className="w-full h-full object-cover"
                  fallbackLabel="M.R. POWER TOOLS STOREFRONT • PICHATUR"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/25 to-transparent flex flex-col justify-end p-4 text-on-primary">
                  <span className="bg-primary text-on-primary text-[11px] font-display font-bold px-2 py-0.5 rounded-[2px] w-max mb-1">
                    PHYSICAL STOREFRONT • బజార్ స్ట్రీట్, పిచ్చాటూరు
                  </span>
                  <p className="font-display text-lg font-bold text-on-primary">
                    M.R. POWER TOOLS &amp; HARDWARE
                  </p>
                  <p className="text-sm text-surface-variant">
                    Prop: {STORE_INFO.proprietor} | {STORE_INFO.locationShort}
                  </p>
                </div>
              </div>

              <div className="relative bg-surface-container rounded-[4px] shadow-lg overflow-hidden h-56">
                <ImageWithFallback
                  src={STORE_IMAGES.warehouseInterior}
                  alt="Well-stocked Indian rural agro tools and power machinery shop interior"
                  className="w-full h-full object-cover"
                  fallbackLabel="450+ ACTIVE TOOLS & SPARES"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/25 to-transparent flex flex-col justify-end p-4 text-on-primary">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="bg-secondary text-on-secondary text-[11px] font-display font-bold px-2 py-0.5 rounded-[2px] w-max mb-1 inline-block">
                        WELL-STOCKED WAREHOUSE &amp; WORKSHOP
                      </span>
                      <p className="font-display text-lg font-bold text-on-primary">
                        Over 450+ Active Tools &amp; Spares
                      </p>
                    </div>
                    <span className="bg-tertiary-fixed text-on-tertiary-fixed font-display text-[11px] font-bold px-2 py-1 rounded-[2px] shrink-0">
                      TEST &amp; CARRY
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metric Strip */}
      <section className="w-full bg-surface-container-high py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-surface-container-lowest p-3 rounded-[2px] shadow-sm">
            <div className="font-display text-3xl text-primary font-bold tabular-nums">1,800+</div>
            <div className="font-display text-[11px] font-bold text-on-surface uppercase">
              Rythus &amp; Masons Served
            </div>
            <div className="text-sm text-on-surface-variant">
              Pichatur, Nagari, Puttur &amp; Satyavedu
            </div>
          </div>
          <div className="bg-surface-container-lowest p-3 rounded-[2px] shadow-sm">
            <div className="font-display text-3xl text-secondary font-bold tabular-nums">
              45+ Models
            </div>
            <div className="font-display text-[11px] font-bold text-on-surface uppercase">
              In-Stock Machinery
            </div>
            <div className="text-sm text-on-surface-variant">
              Tillers, Augers, Breakers, Cutters
            </div>
          </div>
          <div className="bg-surface-container-lowest p-3 rounded-[2px] shadow-sm">
            <div className="font-display text-3xl text-tertiary font-bold">Same Day</div>
            <div className="font-display text-[11px] font-bold text-on-surface uppercase">
              Pump &amp; Motor Rewinding
            </div>
            <div className="text-sm text-on-surface-variant">
              100% Copper Grade Wire Guarantees
            </div>
          </div>
          <div className="bg-surface-container-lowest p-3 rounded-[2px] shadow-sm">
            <div className="font-display text-3xl text-primary font-bold tabular-nums">
              ₹0 Deposit
            </div>
            <div className="font-display text-[11px] font-bold text-on-surface uppercase">
              Verified Local Farmer Scheme
            </div>
            <div className="text-sm text-on-surface-variant">
              Instant Aadhaar/Pattadar Passbook Access
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars of M.R. Power Tools */}
      <section className="w-full py-10 px-4 md:px-8 bg-surface">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="font-display text-[11px] text-secondary uppercase tracking-widest font-bold">
                HOW WE SUPPORT OUR LOCAL TALUK
              </span>
              <h2 className="font-display text-3xl text-on-surface font-bold tracking-tight">
                The 4 Pillars of M.R. Power Tools Pichatur
              </h2>
              <p className="text-base text-on-surface-variant">
                Everything an agricultural landholder, civil engineer, or local tradesman needs in
                one dedicated hub.
              </p>
            </div>
            <div className="bg-surface-container-low px-4 py-2 rounded-[2px] font-display text-[11px] font-bold text-on-surface-variant">
              Reliable Supply Chain • Genuine Brand Partnerships
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface-container-lowest p-4 rounded-[4px] shadow-md flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-[2px] bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]">storefront</span>
                </div>
                <div className="font-display text-[11px] text-primary uppercase font-bold">
                  Pillar 1 • అమ్మకాలు
                </div>
                <h3 className="font-display text-lg font-bold text-on-surface">
                  Agri Machinery Sales
                </h3>
                <p className="text-sm text-on-surface-variant">
                  High-performance 7HP mini power tillers, 2-stroke/4-stroke brush cutters, knapsack
                  sprayers, and post hole augers. Complete GST invoices provided for Andhra Pradesh
                  agricultural subsidy filing.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('machinery-equipment-sales')}
                className="mt-4 bg-surface-container-low p-2 rounded-[2px] font-display text-[11px] font-bold text-on-surface text-left hover:bg-surface-container cursor-pointer"
              >
                ✔ Free Initial Engine Oil &amp; Fuel Primer Run →
              </button>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded-[4px] shadow-md flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-[2px] bg-secondary-fixed flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[28px]">handyman</span>
                </div>
                <div className="font-display text-[11px] text-secondary uppercase font-bold">
                  Pillar 2 • రోజువారీ అద్దె
                </div>
                <h3 className="font-display text-lg font-bold text-on-surface">
                  Daily Tool Rentals
                </h3>
                <p className="text-sm text-on-surface-variant">
                  No need to buy expensive machinery for short-term tasks. Rent Demolition Hammers,
                  Heavy Cut-off Saws, Core Cutters, Chainsaws, and Earth Augers at transparent daily
                  slab charges with tested spares.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('tool-rentals-daily-rates')}
                className="mt-4 bg-surface-container-low p-2 rounded-[2px] font-display text-[11px] font-bold text-on-surface text-left hover:bg-surface-container cursor-pointer"
              >
                ✔ Rates start from ₹300/Day with flexible 24-hr cycle →
              </button>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded-[4px] shadow-md flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-[2px] bg-tertiary-fixed flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[28px]">build_circle</span>
                </div>
                <div className="font-display text-[11px] text-tertiary uppercase font-bold">
                  Pillar 3 • రిపేర్ &amp; రీవైండింగ్
                </div>
                <h3 className="font-display text-lg font-bold text-on-surface">
                  Precision Repair Bay
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Dedicated mechanic bay with Muni Krishna Reddy&apos;s personal oversight:
                  Submersible borewell pump rewinding, generator armatures, carburetor cleaning,
                  valve adjustments, and starter assembly re-stringing.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('repair-servicing-rewinding')}
                className="mt-4 bg-surface-container-low p-2 rounded-[2px] font-display text-[11px] font-bold text-on-surface text-left hover:bg-surface-container cursor-pointer"
              >
                ✔ In-shop load testing before tool handover →
              </button>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded-[4px] shadow-md flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-[2px] bg-surface-container-high flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[28px]">inventory_2</span>
                </div>
                <div className="font-display text-[11px] text-on-surface uppercase font-bold">
                  Pillar 4 • అసలైన విడిభాగాలు
                </div>
                <h3 className="font-display text-lg font-bold text-on-surface">
                  100% Genuine Spares
                </h3>
                <p className="text-sm text-on-surface-variant">
                  No counterfeit spares. We stock verified Champion spark plugs, Walbro carburetors,
                  diamond cutting wheels, heavy-duty drill chucks, carbon brushes, high-tensile
                  chainsaw chains, and brass spray nozzles.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('machinery-equipment-sales', 'spares-counter')}
                className="mt-4 bg-surface-container-low p-2 rounded-[2px] font-display text-[11px] font-bold text-on-surface text-left hover:bg-surface-container cursor-pointer"
              >
                ✔ Direct wholesale pricing for regional technicians →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Equipment Categories & In-Stock Spotlight */}
      <section className="w-full py-10 px-4 md:px-8 bg-surface-container-low" id="machinery-sales">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="font-display text-[11px] text-primary uppercase tracking-widest font-bold">
                DIRECT FROM SHOP FLOOR
              </span>
              <h2 className="font-display text-3xl text-on-surface font-bold tracking-tight">
                Agricultural &amp; Industrial Equipment Spotlight
              </h2>
              <p className="text-base text-on-surface-variant">
                Pre-tuned, tested, and ready to work in Chittoor and Tirupati red soil conditions.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onNavigate('machinery-equipment-sales')}
                className="bg-surface-container-lowest px-3.5 py-2 rounded-[2px] font-display text-xs font-bold text-secondary hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                ⚡ View Full 9-Machine Catalog →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOME_SPOTLIGHT_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-lowest rounded-[4px] shadow-md overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 bg-surface-container">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      className="w-full h-full object-cover"
                      fallbackLabel={item.title}
                    />
                    <div className="absolute top-3 left-3 bg-inverse-surface text-inverse-on-surface text-[11px] font-display px-2 py-0.5 rounded-[2px] font-bold">
                      {item.specBadge}
                    </div>
                    <div className="absolute top-3 right-3 bg-surface-container-lowest text-primary text-[11px] font-display px-2 py-0.5 rounded-[2px] font-bold shadow-sm">
                      {item.stockBadge}
                    </div>
                  </div>
                  <div className="p-4 space-y-1.5">
                    <div className="text-[11px] font-display text-secondary uppercase font-bold">
                      {item.categoryLabel}
                    </div>
                    <h3 className="font-display text-lg font-bold text-on-surface">{item.title}</h3>
                    <p className="text-sm text-on-surface-variant">{item.description}</p>
                    <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] font-display font-bold text-on-surface">
                      {item.chips.map((chip) => (
                        <span key={chip} className="bg-surface-container px-2 py-1 rounded-[2px]">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <div className="bg-surface-container-low p-2.5 rounded-[2px] mb-2 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-display font-bold text-on-surface-variant block">
                        Store Offer Price
                      </span>
                      <span className="font-display text-lg font-bold text-primary tabular-nums">
                        {item.offerPrice}
                      </span>
                      <span className="text-[11px] font-display text-on-surface-variant line-through ml-1.5 tabular-nums">
                        {item.mrp}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-display font-bold text-on-surface-variant block">
                        Rental Rate
                      </span>
                      <span className="font-display text-[15px] font-bold text-secondary tabular-nums">
                        {item.rentalRate}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      className="bg-surface-container-high text-on-surface text-center py-2 rounded-[2px] font-display text-[13px] font-bold hover:bg-surface-variant transition-colors"
                      href={`${STORE_INFO.whatsappBase}?text=${item.whatsappQuery}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      WhatsApp Specs
                    </a>
                    <a
                      className="bg-primary text-on-primary text-center py-2 rounded-[2px] font-display text-[13px] font-bold hover:bg-primary-container transition-colors"
                      href={`tel:+91${STORE_INFO.phone1}`}
                    >
                      Call For Booking
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Rate Card Preview */}
      <section className="w-full py-10 px-4 md:px-8 bg-surface" id="rental-rates">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="font-display text-[11px] text-tertiary uppercase tracking-widest font-bold">
                TRANSPARENT DAILY TARIFFS
              </span>
              <h2 className="font-display text-3xl text-on-surface font-bold tracking-tight">
                Machine Rental Price Chart (అద్దె వివరాలు)
              </h2>
              <p className="text-base text-on-surface-variant">
                Simple 24-hour rental blocks. Local farmers require only verified phone &amp; village
                reference.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('tool-rentals-daily-rates')}
              className="bg-secondary text-on-secondary px-4 py-2 rounded-[2px] font-display text-xs font-bold hover:bg-secondary-container transition-colors cursor-pointer"
            >
              24-Hour Rental Window • View All 8 Rentals →
            </button>
          </div>

          <div className="overflow-x-auto bg-surface-container-lowest rounded-[4px] shadow-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-high text-on-surface font-display text-[13px] font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Equipment &amp; Specification</th>
                  <th className="py-3.5 px-4">Ideal Use Case</th>
                  <th className="py-3.5 px-4">Daily Charge (₹)</th>
                  <th className="py-3.5 px-4">Refundable Deposit</th>
                  <th className="py-3.5 px-4 text-right">Quick Dispatch</th>
                </tr>
              </thead>
              <tbody className="text-sm text-on-surface">
                {HOME_RENTAL_ROWS.map((row) => (
                  <tr
                    key={row.name}
                    className={`${
                      row.striped ? 'bg-surface-container-low hover:bg-surface-container' : 'bg-surface-container-lowest hover:bg-surface-container-low'
                    } transition-colors`}
                  >
                    <td className="py-3.5 px-4 font-bold">
                      <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined ${row.iconColor} text-[20px]`}>
                          {row.icon}
                        </span>
                        <span>{row.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-on-surface-variant">{row.useCase}</td>
                    <td className="py-3.5 px-4 font-display text-base font-bold text-primary tabular-nums">
                      {row.rate}
                    </td>
                    <td className="py-3.5 px-4 text-on-surface-variant">{row.deposit}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          onNavigate('tool-rentals-daily-rates', 'rental-booking-terminal')
                        }
                        className="inline-block bg-secondary text-on-secondary px-3 py-1.5 rounded-[2px] font-display text-[11px] font-bold uppercase hover:bg-secondary-container transition-colors whitespace-nowrap cursor-pointer"
                      >
                        {row.cta}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Repair & Precision Rewinding Workshop Feature */}
      <section className="w-full py-10 px-4 md:px-8 bg-surface-container-high" id="service-bay">
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface-container-lowest rounded-[8px] shadow-lg p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block bg-primary text-on-primary font-display text-[11px] px-2.5 py-1 rounded-[2px] uppercase tracking-wider font-bold">
                  AUTHORIZED WORKSHOP &amp; MOTOR BAY (వర్క్‌షాప్ సర్వీస్)
                </span>
                <h2 className="font-display text-3xl text-on-surface font-bold tracking-tight">
                  Got a Jammed Motor or Broken Starter? We Fix It Same Day.
                </h2>
                <p className="text-base text-on-surface-variant">
                  Don&apos;t wait for days sending machines to Tirupati or Chennai. M.R. Power Tools
                  maintains an active mechanical servicing desk right in Bazar Street, Pichatur with
                  ready stock of armatures, coils, and engine parts.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-surface-container-low p-3 rounded-[2px] flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      electric_meter
                    </span>
                    <div>
                      <div className="font-display text-[13px] text-on-surface font-bold">
                        Submersible Pump Rewinding
                      </div>
                      <div className="text-sm text-on-surface-variant">
                        3HP - 15HP agricultural borewell motors with 100% EC grade copper wire.
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded-[2px] flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[22px]">
                      tune
                    </span>
                    <div>
                      <div className="font-display text-[13px] text-on-surface font-bold">
                        Carburetor Tuning &amp; Ultrasonic Clean
                      </div>
                      <div className="text-sm text-on-surface-variant">
                        Eliminates fuel leakage, starting jerk, and smoking in tillers &amp; brush
                        cutters.
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded-[2px] flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-tertiary text-[22px]">
                      power
                    </span>
                    <div>
                      <div className="font-display text-[13px] text-on-surface font-bold">
                        Power Tool Armature Overhaul
                      </div>
                      <div className="text-sm text-on-surface-variant">
                        Breaker hammers, grinders &amp; drill switches replaced in 45 minutes flat.
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded-[2px] flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      auto_fix_high
                    </span>
                    <div>
                      <div className="font-display text-[13px] text-on-surface font-bold">
                        Chainsaw Chain Sharp &amp; Riveting
                      </div>
                      <div className="text-sm text-on-surface-variant">
                        Machine sharpening with balanced pitch for smooth, fast wood logging.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    className="bg-primary text-on-primary font-display text-[13px] font-bold px-5 py-2.5 rounded-[2px] shadow-sm hover:bg-primary-container transition-colors flex items-center gap-1.5"
                    href={`tel:+91${STORE_INFO.phone1}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">build</span>
                    <span>Call Repair Bay Desk: {STORE_INFO.phone1}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => onNavigate('repair-servicing-rewinding')}
                    className="bg-surface-container-high text-on-surface font-display text-[13px] font-bold px-4 py-2.5 rounded-[2px] hover:bg-surface-variant transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Open Repair Estimator &amp; Tracker →</span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-surface-container-high p-4 rounded-[8px] space-y-4">
                  <div className="font-display text-[15px] text-on-surface font-bold uppercase tracking-wide flex items-center justify-between">
                    <span>Workshop Service Queue</span>
                    <span className="text-tertiary-container text-[11px] bg-tertiary-fixed px-2 py-0.5 rounded-[2px]">
                      LIVE TODAY
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-surface-container-lowest p-2.5 rounded-[2px] shadow-sm flex items-center justify-between text-sm">
                      <div>
                        <span className="font-bold text-on-surface block">
                          7HP Power Tiller Carburetor
                        </span>
                        <span className="text-on-surface-variant text-xs">Farmer: Ravi (Nagari)</span>
                      </div>
                      <span className="bg-primary-fixed text-on-primary-fixed text-[11px] font-display font-bold px-2 py-0.5 rounded-[2px]">
                        TESTED &amp; READY
                      </span>
                    </div>
                    <div className="bg-surface-container-lowest p-2.5 rounded-[2px] shadow-sm flex items-center justify-between text-sm">
                      <div>
                        <span className="font-bold text-on-surface block">
                          5HP Openwell Pump Rewinding
                        </span>
                        <span className="text-on-surface-variant text-xs">
                          Farmer: Govindappa (Pichatur)
                        </span>
                      </div>
                      <span className="bg-secondary-fixed text-on-secondary-fixed text-[11px] font-display font-bold px-2 py-0.5 rounded-[2px]">
                        WINDING IN PROGRESS
                      </span>
                    </div>
                    <div className="bg-surface-container-lowest p-2.5 rounded-[2px] shadow-sm flex items-center justify-between text-sm">
                      <div>
                        <span className="font-bold text-on-surface block">
                          16Kg Bosch Demolition Hammer
                        </span>
                        <span className="text-on-surface-variant text-xs">
                          Mason: Venkatesh (Satyavedu)
                        </span>
                      </div>
                      <span className="bg-surface-container-high text-on-surface text-[11px] font-display font-bold px-2 py-0.5 rounded-[2px]">
                        CARBON BRUSH CHANGED
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-surface-container rounded-[2px] text-xs font-display text-on-surface">
                    <span className="font-bold text-primary">Emergency Breakdown Assistance:</span> If
                    your power tiller or sprayer stalls during active field operations, call{' '}
                    {STORE_INFO.proprietor} for urgent spare part dispatch.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Pichatur Farmers Trust Muni Krishna Reddy */}
      <section className="w-full py-10 px-4 md:px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 bg-surface-container-lowest p-4 rounded-[8px] shadow-md space-y-3">
              <div className="h-64 bg-surface-container rounded-[4px] overflow-hidden relative">
                <ImageWithFallback
                  src={STORE_IMAGES.proprietorPortrait}
                  alt="Proprietor Muni Krishna Reddy at M.R. Power Tools store counter in Pichatur"
                  className="w-full h-full object-cover"
                  fallbackLabel="MUNI KRISHNA REDDY • PROPRIETOR"
                />
                <div className="absolute bottom-2 left-2 bg-inverse-surface/85 text-inverse-on-surface text-[11px] font-display font-bold px-2.5 py-1 rounded-[2px]">
                  MUNI KRISHNA REDDY • PROPRIETOR
                </div>
              </div>
              <div className="pt-1 space-y-1">
                <div className="font-display text-lg font-bold text-on-surface">
                  Muni Krishna Reddy (ముని కృష్ణారెడ్డి)
                </div>
                <div className="font-display text-[11px] text-primary uppercase font-bold">
                  14+ Years Ground Machinery Experience • Pichatur Local
                </div>
                <p className="text-sm text-on-surface-variant pt-1">
                  &quot;We don&apos;t push equipment just to sell. We test the engine in front of
                  you, fill fresh oil, teach your labor hands how to operate the choke and
                  accelerator safely, and ensure spare parts are always available on our
                  racks.&quot;
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="font-display text-[11px] text-primary uppercase tracking-widest font-bold">
                GENUINE RELATIONSHIPS • స్థానిక నమ్మకం
              </span>
              <h2 className="font-display text-3xl text-on-surface font-bold tracking-tight">
                Why Farmers &amp; Contractors in 30+ Villages Rely on M.R. Power Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      price_check
                    </span>
                    <span className="font-display text-lg text-on-surface font-bold">
                      Zero Price Gouging
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    Standard MRP with transparent discounts. Whether you buy during peak sowing
                    season or off-season, our pricing is fair and strictly printed.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      school
                    </span>
                    <span className="font-display text-lg text-on-surface font-bold">
                      15-Min Free Training
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    Every customer or tractor driver receives step-by-step guidance on 2-stroke oil
                    mixing ratio (40ml per 1L petrol), air filter cleaning, and safe shutdown.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary text-[20px]">
                      receipt_long
                    </span>
                    <span className="font-display text-lg text-on-surface font-bold">
                      Subsidies &amp; GST Invoicing
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    Proper tax invoices provided immediately with active GSTIN ({STORE_INFO.gstin})
                    for bank loans and Andhra Pradesh Rythu Bharosa subsidies.
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      share_location
                    </span>
                    <span className="font-display text-lg text-on-surface font-bold">
                      Rapid Field Assistance
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant">
                    Machine stuck in a field in Nagari or Satyavedu? Call our desk and we will send
                    replacements or dispatch a mechanic via local bus or two-wheeler.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Physical Store Location & Direct Contact */}
      <section className="w-full py-10 px-4 md:px-8 bg-surface-container-low" id="pichatur-store">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="font-display text-[11px] text-secondary uppercase tracking-widest font-bold">
              VISIT OUR PHYSICAL STORE
            </span>
            <h2 className="font-display text-3xl text-on-surface font-bold tracking-tight">
              Main Road, Bazar Street, Pichatur
            </h2>
            <p className="text-base text-on-surface-variant">
              Located right at the commercial heart of Pichatur, easily accessible for tractors and
              pick-up autos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-[8px] shadow-md p-4 flex flex-col justify-between">
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[13px] text-on-surface font-bold uppercase">
                    Store Route &amp; Surroundings
                  </span>
                  <span className="font-display text-[11px] text-primary font-bold">
                    Near Tirupati - Chennai Highway Branch
                  </span>
                </div>
                <div className="w-full h-72 rounded-[4px] shadow-inner overflow-hidden">
                  <ImageWithFallback
                    src={STORE_IMAGES.pichaturMap}
                    alt="Map showing Bazar Street, Pichatur, Andhra Pradesh 517587"
                    className="w-full h-full object-cover"
                    fallbackLabel="Bazar Street, Pichatur, AP 517587"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-sm text-on-surface-variant">
                <div>
                  <span className="font-bold text-on-surface block">From Nagari:</span> 18 km along
                  Nagari - Pichatur Road (25 mins)
                </div>
                <div>
                  <span className="font-bold text-on-surface block">From Satyavedu:</span> 22 km
                  along Satyavedu - Pichatur Highway (30 mins)
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-inverse-surface text-inverse-on-surface rounded-[8px] shadow-md p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="font-display text-[11px] text-tertiary-fixed uppercase font-bold tracking-wider">
                  OFFICIAL STORE INFORMATION
                </div>
                <h3 className="font-display text-2xl text-on-primary font-bold">
                  {STORE_INFO.name}
                </h3>
                <p className="text-sm text-surface-variant">
                  Main Road, Bazar Street, Pichatur,
                  <br />
                  Tirupati District, Andhra Pradesh – 517587.
                  <br />
                  Proprietor: <strong className="text-on-primary">{STORE_INFO.proprietor}</strong>
                </p>
                <div className="pt-2 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">
                      call
                    </span>
                    <span>
                      Mobile 1:{' '}
                      <a
                        className="text-on-primary font-bold hover:underline tabular-nums"
                        href={`tel:+91${STORE_INFO.phone1}`}
                      >
                        {STORE_INFO.phone1}
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">
                      call
                    </span>
                    <span>
                      Mobile 2:{' '}
                      <a
                        className="text-on-primary font-bold hover:underline tabular-nums"
                        href={`tel:+91${STORE_INFO.phone2}`}
                      >
                        {STORE_INFO.phone2}
                      </a>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
                      schedule
                    </span>
                    <span>Working: 7:00 AM – 9:00 PM (Monday to Sunday)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-fixed text-[20px]">
                      verified
                    </span>
                    <span className="tabular-nums">GST: {STORE_INFO.gstin}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <a
                  className="w-full bg-secondary text-on-secondary py-3 rounded-[2px] font-display text-[13px] font-bold text-center block hover:bg-secondary-container transition-colors"
                  href={`${STORE_INFO.whatsappBase}?text=Namaste%20Muni%20Krishna%20Reddy%20garu,%20please%20send%20live%20location%20and%20store%20directions`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Request Live Location on WhatsApp
                </a>
                <a
                  className="w-full bg-primary text-on-primary py-3 rounded-[2px] font-display text-[13px] font-bold text-center block hover:bg-primary-container transition-colors"
                  href={`tel:+91${STORE_INFO.phone1}`}
                >
                  Call Proprietor Directly
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
