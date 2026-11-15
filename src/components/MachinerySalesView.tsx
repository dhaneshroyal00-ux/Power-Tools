import { useMemo, useState, type FormEvent } from 'react';
import { SALES_PRODUCTS, SPARE_PARTS, STORE_INFO } from '../data/storeData';
import type {
  BrandAuthority,
  FuelMode,
  ProductCategory,
  SavedDemoBooking,
  SortMode,
  StockMode,
} from '../types/store';
import {
  buildWhatsAppMessageUrl,
  filterAndSortProducts,
  formatCurrencyINR,
} from '../utils/storeLogic';
import { ImageWithFallback } from './ImageWithFallback';

interface MachinerySalesViewProps {
  onSaveDemoBooking: (booking: Omit<SavedDemoBooking, 'id' | 'createdAt'>) => SavedDemoBooking;
}

const CATEGORY_CHIPS: { id: ProductCategory; label: string }[] = [
  { id: 'all', label: 'All Equipment (9)' },
  { id: 'agri', label: 'Agri & Farming (వ్యవసాయం)' },
  { id: 'sprayers', label: 'Sprayers & Irrigation' },
  { id: 'construction', label: 'Construction & Masonry' },
  { id: 'welding', label: 'Welding & Fabrication' },
  { id: 'wood', label: 'Wood & Timber Cutting' },
  { id: 'spares', label: 'Spares & Consumables' },
];

export function MachinerySalesView({ onSaveDemoBooking }: MachinerySalesViewProps) {
  const [category, setCategory] = useState<ProductCategory>('all');
  const [fuel, setFuel] = useState<FuelMode>('all');
  const [brand, setBrand] = useState<BrandAuthority>('all');
  const [stock, setStock] = useState<StockMode>('all');
  const [sort, setSort] = useState<SortMode>('popular');

  const [demoModalMachine, setDemoModalMachine] = useState<string | null>(null);
  const [demoName, setDemoName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoVillage, setDemoVillage] = useState('');
  const [confirmedDemo, setConfirmedDemo] = useState<SavedDemoBooking | null>(null);

  const filteredProducts = useMemo(() => {
    if (category === 'spares') return [];
    return filterAndSortProducts(SALES_PRODUCTS, {
      category,
      fuel,
      brand,
      stock,
      sort,
    });
  }, [category, fuel, brand, stock, sort]);

  const handleReset = () => {
    setCategory('all');
    setFuel('all');
    setBrand('all');
    setStock('all');
    setSort('popular');
  };

  const handleCategoryClick = (catId: ProductCategory) => {
    setCategory(catId);
    if (catId === 'spares') {
      const el = document.getElementById('spares-counter');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openDemoModal = (machineTitle: string, price: number) => {
    setDemoModalMachine(`${machineTitle} (${formatCurrencyINR(price)})`);
    setConfirmedDemo(null);
  };

  const handleDemoSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!demoModalMachine) return;
    const saved = onSaveDemoBooking({
      machineName: demoModalMachine,
      customerName: demoName.trim(),
      phone: demoPhone.trim(),
      village: demoVillage.trim(),
    });
    setConfirmedDemo(saved);
    setDemoName('');
    setDemoPhone('');
    setDemoVillage('');
  };

  const badgeClassMap = {
    primary: 'bg-primary text-on-primary',
    secondary: 'bg-secondary text-on-secondary',
    tertiary: 'bg-tertiary text-on-tertiary',
    inverse: 'bg-inverse-surface text-inverse-on-surface',
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Utility Banner */}
      <section className="w-full bg-inverse-surface text-inverse-on-surface py-1.5 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-primary text-on-primary font-display text-[11px] font-bold px-2 py-0.5 rounded-[2px] tracking-wide uppercase">
              AUTHORISED AGRI-HUB
            </span>
            <span className="text-sm text-surface-variant">
              బజార్ వీధి, పిచ్చాటూరు • Genuine OEM Guarantee • Direct Factory Supply
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-display font-bold">
            <span className="flex items-center gap-1 text-tertiary-fixed">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              RBK Subsidy Verified Quotations
            </span>
            <span className="text-surface-dim hidden sm:inline">|</span>
            <a
              href={`tel:+91${STORE_INFO.phone1}`}
              className="flex items-center gap-1 text-secondary-fixed hover:underline tabular-nums"
            >
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              Demo Desk: {STORE_INFO.phone1}
            </a>
          </div>
        </div>
      </section>

      {/* Sales Catalog Hero & Context Strip */}
      <section className="w-full bg-surface-container-low px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-8 space-y-1.5">
            <div className="inline-flex items-center gap-2 bg-surface-container-high px-2.5 py-1 rounded-[2px]">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-display text-[11px] font-bold text-primary uppercase">
                CURRENT SEASON STOCK • ఖరీఫ్ &amp; రబీ వ్యవసాయ యంత్రాలు
              </span>
            </div>
            <h1 className="font-display text-3xl font-bold text-on-surface uppercase tracking-tight">
              Heavy Agricultural Machinery &amp; Industrial Power Tools
            </h1>
            <p className="text-base text-on-surface-variant max-w-3xl">
              Complete store catalog for{' '}
              <strong className="text-on-surface font-semibold">M.R. Power Tools, Pichatur</strong>.
              Backed by local warranty, live on-bench field demonstration, unboxing service, and
              instant spare parts availability.
            </p>
          </div>

          <div className="lg:col-span-4 bg-surface-container-lowest p-4 rounded-[4px] shadow-sm flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-display text-[11px] font-bold uppercase text-on-surface-variant">
                Store Manager On Duty
              </span>
              <span className="bg-surface-container text-secondary font-display text-[11px] font-bold px-2 py-0.5 rounded-[2px]">
                COUNTER 01
              </span>
            </div>
            <div className="font-display text-lg font-bold text-on-surface">
              {STORE_INFO.proprietor}
            </div>
            <div className="text-sm text-on-surface-variant">
              Proprietor &amp; Agricultural Tool Consultant
            </div>
            <div className="pt-1 flex items-center gap-2">
              <a
                className="flex-1 bg-primary text-on-primary font-display text-[13px] font-bold py-1.5 px-3 rounded-[2px] text-center uppercase tracking-wide hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-1 tabular-nums"
                href={`tel:+91${STORE_INFO.phone1}`}
              >
                <span className="material-symbols-outlined text-[16px]">call</span>{' '}
                {STORE_INFO.phone1}
              </a>
              <a
                className="bg-surface-container-high text-on-surface font-display text-[13px] font-bold py-1.5 px-3 rounded-[2px] hover:bg-surface-dim transition-colors flex items-center justify-center gap-1"
                href={buildWhatsAppMessageUrl(
                  'Hello M.R. Power Tools, I want to enquire about machinery pricing',
                )}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">chat</span> Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Navigation Toolbar */}
      <section className="relative z-20 w-full bg-surface-container-lowest shadow-sm px-4 md:px-8 py-2.5">
        <div className="max-w-7xl mx-auto space-y-2">
          <div className="flex items-center gap-1.5 overflow-x-auto lg:overflow-visible lg:flex-wrap pb-1 no-scrollbar">
            {CATEGORY_CHIPS.map((chip) => {
              const isActive = category === chip.id;
              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => handleCategoryClick(chip.id)}
                  className={`font-display text-xs font-bold px-3 py-1.5 rounded-[2px] whitespace-nowrap uppercase transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 text-sm pt-1">
            <div>
              <label
                htmlFor="fuelFilter"
                className="font-display text-[11px] font-bold text-on-surface-variant block uppercase mb-1"
              >
                Fuel / Power
              </label>
              <select
                id="fuelFilter"
                value={fuel}
                onChange={(e) => setFuel(e.target.value as FuelMode)}
                className="w-full bg-surface-container-low text-on-surface text-sm px-2.5 py-1.5 rounded-[2px] focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary"
              >
                <option value="all">All Power Modes</option>
                <option value="petrol">Petrol (4-Stroke / 2-Stroke)</option>
                <option value="battery">12V / Lithium Battery</option>
                <option value="electric">220V Electric AC</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="brandFilter"
                className="font-display text-[11px] font-bold text-on-surface-variant block uppercase mb-1"
              >
                Brand Authority
              </label>
              <select
                id="brandFilter"
                value={brand}
                onChange={(e) => setBrand(e.target.value as BrandAuthority)}
                className="w-full bg-surface-container-low text-on-surface text-sm px-2.5 py-1.5 rounded-[2px] focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary"
              >
                <option value="all">All Major Brands</option>
                <option value="vst">VST Shakti / KisanKraft</option>
                <option value="husqvarna">Husqvarna / Stihl</option>
                <option value="bosch">Bosch / Dongcheng</option>
                <option value="honda">Honda Compatible</option>
                <option value="xtra">Xtra Power / KPT</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="stockFilter"
                className="font-display text-[11px] font-bold text-on-surface-variant block uppercase mb-1"
              >
                Stock Availability
              </label>
              <select
                id="stockFilter"
                value={stock}
                onChange={(e) => setStock(e.target.value as StockMode)}
                className="w-full bg-surface-container-low text-on-surface text-sm px-2.5 py-1.5 rounded-[2px] focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary"
              >
                <option value="all">All Store Inventory</option>
                <option value="in-stock">Ready at Pichatur Shop</option>
                <option value="subsidy">Eligible for RBK Subsidy</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="sortFilter"
                className="font-display text-[11px] font-bold text-on-surface-variant block uppercase mb-1"
              >
                Price Sorting
              </label>
              <select
                id="sortFilter"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortMode)}
                className="w-full bg-surface-container-low text-on-surface text-sm px-2.5 py-1.5 rounded-[2px] focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary"
              >
                <option value="popular">Popular in Chittoor Belt</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex items-end">
              <button
                type="button"
                onClick={handleReset}
                className="w-full bg-surface-container text-on-surface font-display text-[13px] font-bold py-1.5 px-3 rounded-[2px] hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span> Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Equipment Catalog Grid */}
      <section className="w-full px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-surface-container-low p-2.5 rounded-[2px]">
            <div className="flex items-center gap-2">
              <span className="font-display text-[13px] font-bold text-primary uppercase">
                SHOWING STORE INVENTORY:
              </span>
              <span className="font-display text-lg text-on-surface font-bold tabular-nums">
                {category === 'spares'
                  ? '6 Genuine Spares & Consumables'
                  : `${filteredProducts.length} Heavy Implements & Tools`}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-on-surface-variant">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
              <span>Prices inclusive of GST. On-spot billing &amp; serial registration provided.</span>
            </div>
          </div>

          {category !== 'spares' && filteredProducts.length === 0 ? (
            <div className="bg-surface-container-lowest p-8 rounded-[4px] shadow-sm text-center space-y-3">
              <span className="material-symbols-outlined text-[40px] text-primary">search_off</span>
              <div className="font-display text-lg font-bold text-on-surface">
                No machinery matched those exact filters
              </div>
              <p className="text-sm text-on-surface-variant">
                Reset filters to view all 9 implements in stock at our Pichatur store.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="bg-primary text-on-primary font-display text-xs font-bold uppercase px-4 py-2 rounded-[2px] cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : category !== 'spares' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="flex flex-col bg-surface-container-lowest rounded-[4px] shadow-sm overflow-hidden"
                >
                  <div className="p-2 bg-surface-container-high flex items-center justify-between gap-2">
                    <span
                      className={`font-display text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-[2px] ${
                        badgeClassMap[product.badgeColor]
                      }`}
                    >
                      {product.badgeLabel}
                    </span>
                    <span
                      className={`font-display text-[11px] font-bold flex items-center gap-1 ${
                        product.rightBadgeType === 'subsidy'
                          ? 'text-tertiary'
                          : 'text-on-surface-variant'
                      }`}
                    >
                      {product.rightBadgeType === 'subsidy' && (
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                      )}
                      {product.rightBadge}
                    </span>
                  </div>

                  <div className="relative w-full h-56 bg-surface-container-low overflow-hidden">
                    <ImageWithFallback
                      src={product.imageUrl}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover"
                      fallbackLabel={product.title}
                    />
                    <div className="absolute bottom-2 left-2 bg-inverse-surface text-inverse-on-surface px-2 py-0.5 rounded-[2px] font-display text-[11px] font-bold">
                      {product.powerTag}
                    </div>
                    <div className="absolute top-2 right-2 bg-surface-container-lowest text-on-surface font-display text-[11px] font-bold px-2 py-0.5 rounded-[2px] shadow">
                      {product.stockCountLabel}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="font-display text-[11px] text-secondary uppercase font-semibold">
                        {product.brandLabel}
                      </div>
                      <h2 className="font-display text-lg text-on-surface font-bold">
                        {product.title}
                      </h2>
                      <p className="text-sm text-on-surface-variant mt-1">{product.description}</p>
                      <div className="grid grid-cols-2 gap-1.5 mt-3 font-display text-[11px] font-bold text-on-surface">
                        {product.specs.map((spec) => (
                          <div
                            key={spec.text}
                            className="bg-surface-container-low p-1.5 rounded-[2px] flex items-center gap-1.5"
                          >
                            <span className="material-symbols-outlined text-secondary text-[16px]">
                              {spec.icon}
                            </span>
                            <span className="truncate">{spec.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="font-display text-[1.375rem] font-bold text-primary tabular-nums">
                            {formatCurrencyINR(product.price)}
                          </span>
                          <span className="text-sm line-through text-outline ml-1.5 tabular-nums">
                            {formatCurrencyINR(product.mrp)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-display text-[11px] font-bold text-on-surface-variant block">
                            {product.rentalRateLabel}
                          </span>
                          <span className="font-display text-[13px] text-secondary font-bold tabular-nums">
                            {product.rentalRateValue}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 pt-1">
                        <a
                          className="bg-primary text-on-primary font-display text-[13px] font-bold py-2 px-2 rounded-[2px] text-center uppercase tracking-wide hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-1"
                          href={buildWhatsAppMessageUrl(product.whatsappText)}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span className="material-symbols-outlined text-[16px]">chat</span> WhatsApp
                        </a>
                        <button
                          type="button"
                          onClick={() => openDemoModal(product.title, product.price)}
                          className="bg-surface-container-high text-on-surface font-display text-[13px] font-bold py-2 px-2 rounded-[2px] text-center uppercase hover:bg-surface-dim transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">storefront</span>{' '}
                          Store Demo
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Farmer Subsidy & Finance Guidance Box */}
      <section className="w-full bg-surface-container px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 bg-surface-container-lowest p-4 rounded-[4px] shadow-sm space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-tertiary text-on-tertiary font-display text-[11px] font-bold px-2.5 py-0.5 rounded-[2px] uppercase">
                RYTHU BHAROSA HELP DESK
              </span>
              <span className="font-display text-[11px] text-primary uppercase font-bold">
                రైతు భరోసా కేంద్రం (RBK) సబ్సిడీ
              </span>
            </div>
            <h3 className="font-display text-[1.375rem] text-on-surface font-bold">
              40% to 50% Agricultural Department Subsidy Documentation
            </h3>
            <p className="text-base text-on-surface-variant">
              Farmers purchasing Power Tillers, Brush Cutters, Battery Sprayers, or Engine Pumps
              under government mechanization schemes can obtain immediate official stamped documents
              from our Pichatur store:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-surface-container-low p-2.5 rounded-[2px] space-y-1">
                <div className="font-display text-[13px] text-primary font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">description</span>
                  GST Proforma Quotation
                </div>
                <p className="text-sm text-on-surface-variant">
                  Issued in farmer&apos;s Aadhaar &amp; 1-B Pattadar passbook name for RBK
                  Agriculture Assistant approval.
                </p>
              </div>
              <div className="bg-surface-container-low p-2.5 rounded-[2px] space-y-1">
                <div className="font-display text-[13px] text-primary font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  OEM Engine Number Certificate
                </div>
                <p className="text-sm text-on-surface-variant">
                  Complete chassis &amp; machine serial matching certificates mandatory for bank loan
                  disbursement.
                </p>
              </div>
              <div className="bg-surface-container-low p-2.5 rounded-[2px] space-y-1">
                <div className="font-display text-[13px] text-primary font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">handshake</span>
                  Rythu Passbook Delivery
                </div>
                <p className="text-sm text-on-surface-variant">
                  Zero-interest seasonal installment assistance for verified local farmers from
                  Pichatur taluk villages.
                </p>
              </div>
              <div className="bg-surface-container-low p-2.5 rounded-[2px] space-y-1">
                <div className="font-display text-[13px] text-primary font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">home_repair_service</span>
                  Free 1st Season Maintenance
                </div>
                <p className="text-sm text-on-surface-variant">
                  Free engine oil change, carburetor tuning, and filter cleaning at our Bazar Street
                  workshop.
                </p>
              </div>
            </div>
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <a
                className="bg-secondary text-on-secondary font-display text-[13px] font-bold py-2 px-4 rounded-[2px] hover:bg-secondary-container transition-colors flex items-center gap-1.5"
                href={buildWhatsAppMessageUrl(
                  'Hello Muni Krishna Reddy garu, please send RBK Subsidy Quotation Details',
                )}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px]">assignment</span> Request
                Subsidy Quotation Letter
              </a>
              <span className="text-sm text-on-surface-variant">
                Call Direct: <strong className="tabular-nums">{STORE_INFO.phone1}</strong>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 bg-inverse-surface text-inverse-on-surface p-4 rounded-[4px] flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <span className="inline-block bg-primary text-on-primary font-display text-[11px] font-bold px-2 py-0.5 rounded-[2px] uppercase">
                STOREFRONT GUARANTEE
              </span>
              <h3 className="font-display text-lg text-primary-fixed font-bold">
                Live Testing Before Handover
              </h3>
              <p className="text-sm text-surface-variant">
                Every machine is fueled up, tested in front of you, RPM dialed, and safety levers
                explained before you load it on your auto or tractor.
              </p>
              <div className="space-y-2 pt-1 text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                    check_circle
                  </span>
                  <span>100% Copper Armature rewinding support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                    check_circle
                  </span>
                  <span>Spare blades &amp; carburetor kits in stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">
                    check_circle
                  </span>
                  <span>Local doorstep breakdown response</span>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest/10 p-2.5 rounded-[2px]">
              <div className="font-display text-[11px] uppercase text-tertiary-fixed font-semibold">
                Store Location
              </div>
              <div className="font-display text-lg text-inverse-on-surface mt-0.5 font-bold">
                Bazar Street, Pichatur
              </div>
              <div className="text-sm text-surface-variant">
                Opp. Old Bus Stand Junction, Near Venkateswara Electricals
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Genuine Spares & Consumables Fast-Counter */}
      <section className="w-full px-4 md:px-8 py-6" id="spares-counter">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="font-display text-[11px] uppercase text-primary font-bold">
                GENUINE SPARES COUNTER (విడిభాగాలు)
              </div>
              <h3 className="font-display text-3xl font-bold text-on-surface tracking-tight">
                Original Blades, Chains, Oils &amp; Consumables
              </h3>
            </div>
            <a
              className="bg-surface-container-high text-on-surface font-display text-[13px] font-bold px-3.5 py-2 rounded-[2px] hover:bg-surface-dim transition-colors flex items-center gap-1.5"
              href={buildWhatsAppMessageUrl('I need spare parts quote')}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[18px] text-primary">search</span>{' '}
              Enquire Other Spares
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {SPARE_PARTS.map((spare) => (
              <div
                key={spare.id}
                className="bg-surface-container-lowest p-2.5 rounded-[4px] shadow-sm flex flex-col justify-between space-y-2"
              >
                <div className="w-full h-24 bg-surface-container-low rounded-[2px] overflow-hidden">
                  <ImageWithFallback
                    src={spare.imageUrl}
                    alt={spare.imageAlt}
                    className="w-full h-full object-cover"
                    fallbackLabel={spare.tag}
                  />
                </div>
                <div>
                  <div className="font-display text-[11px] font-bold text-on-surface-variant">
                    {spare.tag}
                  </div>
                  <div className="font-display text-lg text-on-surface font-bold tabular-nums">
                    {formatCurrencyINR(spare.price)}{' '}
                    {spare.unit && (
                      <span className="text-sm font-normal text-on-surface-variant">
                        {spare.unit}
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-on-surface-variant">{spare.description}</div>
                </div>
                <a
                  className="bg-surface-container text-on-surface font-display text-[11px] font-bold py-1.5 rounded-[2px] text-center hover:bg-primary hover:text-on-primary transition-colors"
                  href={buildWhatsAppMessageUrl(spare.whatsappText)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Add Order
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Demo Modal */}
      {demoModalMachine && (
        <div
          className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
        >
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-[4px] shadow-xl overflow-hidden">
            <div className="bg-primary text-on-primary p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">storefront</span>
                <span id="demo-modal-title" className="font-display text-[13px] uppercase font-bold">
                  Book Store Demo • M.R. Power Tools
                </span>
              </div>
              <button
                type="button"
                aria-label="Close demo booking modal"
                onClick={() => setDemoModalMachine(null)}
                className="text-on-primary hover:opacity-80 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {confirmedDemo ? (
              <div className="p-6 space-y-4">
                <div className="bg-secondary-fixed text-on-secondary-fixed p-4 rounded-[4px] space-y-1">
                  <div className="font-display text-xs font-bold uppercase">
                    Demo Slot Registered • {confirmedDemo.id}
                  </div>
                  <div className="font-display text-lg font-bold">{confirmedDemo.machineName}</div>
                  <p className="text-sm">
                    Proprietor {STORE_INFO.proprietor} will contact {confirmedDemo.customerName} (
                    {confirmedDemo.phone}) to schedule live testing at Bazar Street, Pichatur.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <a
                    href={buildWhatsAppMessageUrl(
                      `Store Demo Slot ${confirmedDemo.id}: ${confirmedDemo.machineName} for ${confirmedDemo.customerName} (${confirmedDemo.village}, Ph: ${confirmedDemo.phone})`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary text-on-secondary font-display text-xs font-bold uppercase px-4 py-2 rounded-[2px]"
                  >
                    Share Slot on WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setDemoModalMachine(null)}
                    className="bg-primary text-on-primary font-display text-xs font-bold uppercase px-4 py-2 rounded-[2px] cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form className="p-4 space-y-3" onSubmit={handleDemoSubmit}>
                <div>
                  <label
                    htmlFor="modalMachineName"
                    className="font-display text-[11px] font-bold text-on-surface uppercase block mb-1"
                  >
                    Selected Equipment
                  </label>
                  <input
                    id="modalMachineName"
                    className="w-full bg-surface-container-low text-primary font-display text-lg px-3 py-2 rounded-[2px] focus:outline-none font-bold"
                    value={demoModalMachine}
                    readOnly
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label
                      htmlFor="demo-customer-name"
                      className="font-display text-[11px] font-bold text-on-surface uppercase block mb-1"
                    >
                      Farmer / Mason Name *
                    </label>
                    <input
                      id="demo-customer-name"
                      value={demoName}
                      onChange={(e) => setDemoName(e.target.value)}
                      className="w-full bg-surface-container-low text-on-surface text-sm px-3 py-2 rounded-[2px] border-0 focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary"
                      placeholder="మీ పేరు"
                      required
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="demo-customer-phone"
                      className="font-display text-[11px] font-bold text-on-surface uppercase block mb-1"
                    >
                      Mobile Number (ఫోన్) *
                    </label>
                    <input
                      id="demo-customer-phone"
                      value={demoPhone}
                      onChange={(e) => setDemoPhone(e.target.value)}
                      className="w-full bg-surface-container-low text-on-surface text-sm px-3 py-2 rounded-[2px] border-0 focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary"
                      pattern="[0-9]{10}"
                      placeholder="98XXXXXXXX"
                      required
                      type="tel"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="demo-customer-village"
                    className="font-display text-[11px] font-bold text-on-surface uppercase block mb-1"
                  >
                    Village / Mandal (గ్రామం / మండలం) *
                  </label>
                  <input
                    id="demo-customer-village"
                    value={demoVillage}
                    onChange={(e) => setDemoVillage(e.target.value)}
                    className="w-full bg-surface-container-low text-on-surface text-sm px-3 py-2 rounded-[2px] border-0 focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-secondary"
                    placeholder="e.g. Pichatur, Nagari, Satyavedu"
                    required
                    type="text"
                  />
                </div>
                <div className="bg-surface-container-high p-2 rounded-[2px] text-sm text-on-surface-variant flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    schedule
                  </span>
                  <span>Open Mon-Sun 7:00 AM - 9:00 PM for live unboxing and trial.</span>
                </div>
                <div className="pt-1 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setDemoModalMachine(null)}
                    className="bg-surface-container text-on-surface font-display text-[13px] font-bold px-4 py-2 rounded-[2px] hover:bg-surface-container-high cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-on-primary font-display text-[13px] font-bold px-5 py-2 rounded-[2px] uppercase tracking-wide hover:bg-on-primary-fixed-variant cursor-pointer"
                  >
                    Confirm Demo Slot
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
