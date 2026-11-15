import { useMemo, useState, type FormEvent } from 'react';
import { REPAIR_SERVICE_ROWS, STORE_IMAGES, STORE_INFO } from '../data/storeData';
import type { RepairJobRecord, SavedPickupRequest } from '../types/store';
import {
  buildWhatsAppMessageUrl,
  calculateRepairEstimate,
  lookupRepairJob,
  type RepairEquipmentCategory,
  type RepairIssueType,
} from '../utils/storeLogic';
import { ImageWithFallback } from './ImageWithFallback';

interface RepairServiceViewProps {
  onSavePickupRequest: (
    request: Omit<SavedPickupRequest, 'id' | 'createdAt'>,
  ) => SavedPickupRequest;
}

export function RepairServiceView({ onSavePickupRequest }: RepairServiceViewProps) {
  const [calcCategory, setCalcCategory] = useState<RepairEquipmentCategory>('angle-grinder');
  const [calcIssue, setCalcIssue] = useState<RepairIssueType>('brush');

  const [trackInput, setTrackInput] = useState('');
  const [trackedJob, setTrackedJob] = useState<RepairJobRecord | null>(null);

  const [pickupName, setPickupName] = useState('');
  const [pickupPhone, setPickupPhone] = useState('');
  const [pickupVillage, setPickupVillage] = useState('');
  const [pickupMachine, setPickupMachine] = useState('Power Tiller (VST / Greaves)');
  const [pickupIssue, setPickupIssue] = useState('');
  const [confirmedPickup, setConfirmedPickup] = useState<SavedPickupRequest | null>(null);

  const estimate = useMemo(
    () => calculateRepairEstimate(calcCategory, calcIssue),
    [calcCategory, calcIssue],
  );

  const handleTrackSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = lookupRepairJob(trackInput);
    setTrackedJob(result);
  };

  const handlePickupSubmit = (e: FormEvent) => {
    e.preventDefault();
    const saved = onSavePickupRequest({
      name: pickupName.trim(),
      phone: pickupPhone.trim(),
      village: pickupVillage.trim(),
      machineType: pickupMachine,
      issue: pickupIssue.trim(),
    });
    setConfirmedPickup(saved);
    setPickupName('');
    setPickupPhone('');
    setPickupVillage('');
    setPickupIssue('');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Workshop Alert */}
      <div className="w-full bg-inverse-surface text-inverse-on-surface px-4 md:px-8 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] font-display font-bold">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 bg-primary px-2 py-0.5 rounded-[2px] text-on-primary font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-surface-bright" />
              Emergency Field Service
            </span>
            <span className="text-tertiary-fixed font-semibold">
              రైతులకు అత్యవసర సేవలు (Agricultural Urgent Breakdown)
            </span>
            <span className="text-outline-variant hidden md:inline">•</span>
            <span className="text-surface-variant">
              Pichatur, Satyavedu, Nagari &amp; Puttur Taluks
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-surface-variant">
              Workshop Intake: <strong className="text-surface-bright">7:00 AM - 9:00 PM</strong>
            </span>
            <a
              className="text-tertiary-fixed font-bold hover:underline flex items-center gap-1 tabular-nums"
              href={`tel:+91${STORE_INFO.phone1}`}
            >
              <span className="material-symbols-outlined text-sm">call</span> {STORE_INFO.phone1}
            </a>
          </div>
        </div>
      </div>

      {/* Workshop Hero Banner */}
      <section className="w-full bg-surface-container-low px-4 md:px-8 py-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="bg-primary text-on-primary px-2.5 py-1 text-[11px] font-display font-bold uppercase tracking-wide rounded-[2px]">
                AUTHORIZED SERVICE WORKSHOP
              </span>
              <span className="bg-surface-container-highest text-on-surface px-2.5 py-1 text-[11px] font-display rounded-[2px] font-bold">
                వర్క్‌షాప్ &amp; రీవైండింగ్ సెంటర్
              </span>
              <span className="bg-secondary text-on-secondary px-2.5 py-1 text-[11px] font-display font-bold rounded-[2px]">
                GST Verified • {STORE_INFO.proprietor}
              </span>
            </div>

            <div>
              <h1
                className="font-display text-3xl md:text-[3.25rem] font-bold text-on-surface tracking-tight leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Same-Day Tool Servicing &amp;{' '}
                <span className="text-primary underline decoration-primary-container decoration-4 underline-offset-8">
                  Pure Copper Rewinding
                </span>
                .
              </h1>
              <p className="text-lg text-on-surface-variant mt-4 max-w-2xl leading-relaxed">
                Don&apos;t let a burnt coil, sheared gear, or choked carburetor stall your irrigation
                and harvest. We deliver field-tested engine overhauls, high-temperature varnish
                motor rewinds, and 15-minute express tool checkups directly on Pichatur Bazar
                Street.
              </p>
            </div>

            {/* Hotline Card */}
            <div className="bg-surface-container-lowest p-4 rounded-[4px] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-[2px] bg-primary text-on-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[28px]">hardware</span>
                </div>
                <div>
                  <div className="text-[11px] font-display font-bold text-on-surface-variant uppercase tracking-wide">
                    Direct Mechanic &amp; Workshop Lead
                  </div>
                  <div className="font-display text-lg text-on-surface font-bold">
                    Prop. {STORE_INFO.proprietor}
                  </div>
                  <div className="text-[11px] font-display text-primary font-semibold tabular-nums">
                    +91 {STORE_INFO.phone1} / +91 {STORE_INFO.phone2}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  className="flex-1 sm:flex-initial bg-primary text-on-primary px-4 py-2.5 rounded-[2px] font-display text-[13px] font-bold uppercase tracking-wider text-center hover:bg-on-primary-fixed-variant transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  href={`tel:+91${STORE_INFO.phone1}`}
                >
                  <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                  Call Now
                </a>
                <a
                  className="flex-1 sm:flex-initial bg-[#25D366] text-surface-container-lowest px-4 py-2.5 rounded-[2px] font-display text-[13px] uppercase tracking-wider text-center hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 shadow-sm font-bold"
                  href={STORE_INFO.whatsappBase}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-surface-container p-3 rounded-[2px]">
                <div className="font-display text-2xl text-primary font-bold tabular-nums">100%</div>
                <div className="font-display text-[11px] font-bold text-on-surface-variant leading-tight">
                  Pure EC Copper Wire
                </div>
              </div>
              <div className="bg-surface-container p-3 rounded-[2px]">
                <div className="font-display text-2xl text-secondary font-bold tabular-nums">
                  30-Day
                </div>
                <div className="font-display text-[11px] font-bold text-on-surface-variant leading-tight">
                  Rewind Warranty
                </div>
              </div>
              <div className="bg-surface-container p-3 rounded-[2px]">
                <div className="font-display text-2xl text-tertiary font-bold tabular-nums">
                  15 Mins
                </div>
                <div className="font-display text-[11px] font-bold text-on-surface-variant leading-tight">
                  Express Triage
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative bg-surface-container-lowest p-2 rounded-[4px] shadow-md overflow-hidden">
              <div className="h-80 rounded-[2px] overflow-hidden">
                <ImageWithFallback
                  src={STORE_IMAGES.workshopRewinding}
                  alt="Technician rewinding a copper armature stator at M.R. Power Tools workshop"
                  className="w-full h-full object-cover"
                  fallbackLabel="PICHATUR MOTOR REWINDING BENCH"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-inverse-surface/90 backdrop-blur-sm p-3 rounded-[2px] text-inverse-on-surface flex items-center justify-between gap-2">
                <div>
                  <div className="font-display text-[11px] font-bold text-tertiary-fixed uppercase">
                    Live Pichatur Service Bench
                  </div>
                  <div className="font-display text-lg font-bold">
                    Bazar Street Operational Hub
                  </div>
                </div>
                <span className="bg-primary text-on-primary px-2 py-1 rounded-[2px] text-[11px] font-display uppercase font-bold shrink-0">
                  OPEN NOW
                </span>
              </div>
            </div>

            <div className="bg-surface-container p-3 rounded-[4px]">
              <div className="font-display text-[11px] text-on-surface-variant uppercase tracking-wider mb-2 font-bold flex items-center justify-between">
                <span>Specialized OEM Brands Repaired:</span>
                <span className="text-secondary font-bold">Genuine Spares Fitted</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-display text-[11px] text-on-surface">
                {[
                  'BOSCH',
                  'MAKITA',
                  'DEWALT',
                  'DONGCHENG',
                  'XTRA POWER',
                  'KIRLOSKAR',
                  'STIHL / HUSQVARNA',
                ].map((brand) => (
                  <span
                    key={brand}
                    className="bg-surface-container-lowest px-2 py-1 rounded-[2px] font-bold"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Triage & Transparent Cost Calculator */}
      <section className="w-full bg-surface px-4 md:px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary rounded-full" />
                <span className="font-display text-[13px] text-primary uppercase tracking-widest font-bold">
                  REPAIR TRIAGE &amp; TRANSPARENT TARIFF GUIDE
                </span>
              </div>
              <h2 className="font-display text-3xl text-on-surface font-bold tracking-tight mt-1">
                Standard Workshop Job Estimates &amp; Wait Times
              </h2>
              <p className="text-base text-on-surface-variant mt-1">
                No hidden mechanic markups. All genuine OEM spares come with stamped cash receipts
                for agricultural accounting.
              </p>
            </div>
            <div className="flex items-center gap-1 bg-surface-container p-1 rounded-[2px]">
              <span className="text-[11px] font-display px-3 py-1 bg-surface-container-lowest text-primary font-bold rounded-[2px] shadow-sm">
                All Pichatur Walk-ins
              </span>
              <span className="text-[11px] font-display font-bold px-3 py-1 text-on-surface-variant">
                Agricultural Subsidies Accepted
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Tariff Table */}
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-[4px] shadow-sm overflow-hidden">
              <div className="bg-surface-container-highest px-4 py-2.5 flex items-center justify-between">
                <span className="font-display text-[13px] font-bold text-on-surface uppercase tracking-wider">
                  Service Task &amp; Component
                </span>
                <div className="flex items-center gap-6">
                  <span className="font-display text-[13px] font-bold text-on-surface uppercase tracking-wider hidden sm:inline">
                    Turnaround Time
                  </span>
                  <span className="font-display text-[13px] font-bold text-on-surface uppercase tracking-wider">
                    Estimated Cost
                  </span>
                </div>
              </div>

              <div className="divide-y divide-surface-container">
                {REPAIR_SERVICE_ROWS.map((row) => (
                  <div
                    key={row.id}
                    className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container-low transition-colors ${
                      row.striped ? 'bg-surface-container-low/40' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`material-symbols-outlined ${row.iconColor} mt-0.5`}>
                        {row.icon}
                      </span>
                      <div>
                        <div className="font-display text-lg font-bold text-on-surface">
                          {row.title}
                        </div>
                        <div className="text-sm text-on-surface-variant">{row.description}</div>
                        <div
                          className={`font-display text-[11px] ${row.teluguColor} font-semibold mt-1`}
                        >
                          {row.teluguLabel}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end sm:gap-6 w-full sm:w-auto shrink-0">
                      <span className="bg-surface-container px-2.5 py-1 rounded-[2px] text-[11px] font-display font-bold text-on-surface whitespace-nowrap">
                        {row.turnaround}
                      </span>
                      <span className="font-display text-lg text-primary font-bold tabular-nums whitespace-nowrap">
                        {row.costRange}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-surface-container px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-on-surface-variant">
                <span>
                  * Prices vary based on motor HP &amp; OEM component pricing. Taxes extra where
                  applicable.
                </span>
                <span className="font-bold text-primary">
                  No inspection fee if service is authorized.
                </span>
              </div>
            </div>

            {/* Right Interactive Cost Calculator */}
            <div className="lg:col-span-4 bg-inverse-surface text-inverse-on-surface p-6 rounded-[4px] shadow-md flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[11px] text-tertiary-fixed uppercase font-bold tracking-wider">
                    Fast Estimator
                  </span>
                  <span className="material-symbols-outlined text-primary-fixed">calculate</span>
                </div>
                <h3 className="font-display text-lg font-bold text-surface-bright">
                  Instant Repair Estimator
                </h3>
                <p className="text-sm text-surface-variant">
                  Select equipment issue to preview expected cost and immediate shop turnaround in
                  Pichatur:
                </p>
                <div className="space-y-2.5 pt-1">
                  <div>
                    <label
                      htmlFor="calc-category"
                      className="font-display text-[11px] font-bold text-surface-variant block mb-1"
                    >
                      Equipment Category
                    </label>
                    <select
                      id="calc-category"
                      value={calcCategory}
                      onChange={(e) => setCalcCategory(e.target.value as RepairEquipmentCategory)}
                      className="w-full bg-surface-container-low text-on-surface text-sm p-2 rounded-[2px] focus:outline-none"
                    >
                      <option value="angle-grinder">Angle Grinder (4&quot; / 5&quot;)</option>
                      <option value="marble-cutter">Marble / Concrete Cutter (110mm)</option>
                      <option value="demolition-hammer">Demolition Hammer (11E / 16kg)</option>
                      <option value="chainsaw">Chainsaw (58cc 2-Stroke)</option>
                      <option value="power-tiller">Power Tiller Engine (7HP - 9HP)</option>
                      <option value="submersible">Submersible Agricultural Pump</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="calc-issue"
                      className="font-display text-[11px] font-bold text-surface-variant block mb-1"
                    >
                      Primary Problem Observed
                    </label>
                    <select
                      id="calc-issue"
                      value={calcIssue}
                      onChange={(e) => setCalcIssue(e.target.value as RepairIssueType)}
                      className="w-full bg-surface-container-low text-on-surface text-sm p-2 rounded-[2px] focus:outline-none"
                    >
                      <option value="brush">Sparks Flying / Intermittent Power (Brushes)</option>
                      <option value="burnt">Smoke / Burning Smell / Burnt Armature</option>
                      <option value="gear">Gears Jammed / Grinding Noise</option>
                      <option value="starting">Won&apos;t Start / Choked Fuel / Flooded</option>
                      <option value="rewind">Complete Motor Rewind Needed</option>
                    </select>
                  </div>
                </div>

                <div className="bg-surface-container-highest/20 p-4 rounded-[2px] mt-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-display font-bold text-surface-variant uppercase">
                      Estimated Service Range:
                    </span>
                    <span
                      className="font-display text-xl font-bold text-primary-fixed tabular-nums"
                      data-testid="repair-estimate-price"
                    >
                      {estimate.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-surface-bright">
                    <span>Estimated Time:</span>
                    <span
                      className="font-bold text-tertiary-fixed tabular-nums"
                      data-testid="repair-estimate-time"
                    >
                      {estimate.time}
                    </span>
                  </div>
                  <div className="text-[11px] font-display text-surface-variant">
                    Warranty:{' '}
                    <span className="text-surface-bright font-bold">{estimate.warranty}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4">
                <a
                  className="w-full bg-primary text-on-primary py-2.5 rounded-[2px] font-display text-[13px] uppercase tracking-wider font-bold flex items-center justify-center gap-2 hover:bg-on-primary-fixed-variant transition-colors"
                  href={`tel:+91${STORE_INFO.phone1}`}
                >
                  <span className="material-symbols-outlined text-[18px]">engineering</span>
                  Bring Machine to Store
                </a>
                <p className="font-display text-[11px] font-bold text-center text-surface-variant mt-2">
                  Walk-ins welcome without prior booking
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Workshop Capabilities (4 Pillars) */}
      <section className="w-full bg-surface-container-low px-4 md:px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-secondary rounded-full" />
              <span className="font-display text-[13px] text-secondary uppercase tracking-widest font-bold">
                CORE CAPABILITIES
              </span>
            </div>
            <h2 className="font-display text-3xl text-on-surface font-bold tracking-tight mt-1">
              4 High-Precision Repair Specialties
            </h2>
            <p className="text-base text-on-surface-variant mt-1 max-w-3xl">
              Equipped with lathe balancing machines, precision coil winders, high-temp baking
              ovens, and OEM engine testing stations at our Pichatur shop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: 'electric_meter',
                tone: 'primary',
                badge: 'Armature & Stator',
                title: 'Motor Copper Rewinding',
                desc: 'For submersible pumps, marble cutters, power drills, and angle grinders. Wound with 99.9% pure electrolyte copper wire, baked with heat-resistant resin varnish.',
                bullets: [
                  'Class-H Enamel Insulation',
                  'Dynamic Lathe Commutator Polishing',
                  'Full 30-Day Free Rewind Guarantee',
                ],
                footerLabel: 'Capacity:',
                footerValue: '0.5 HP to 25 HP',
              },
              {
                icon: 'agriculture',
                tone: 'secondary',
                badge: 'Agri & Engine Repair',
                title: '2-Stroke & 4-Stroke Overhaul',
                desc: 'Specialized diagnostics for power tillers, brush cutters, agricultural battery/petrol sprayers, chainsaw engines, and portable farm generator units.',
                bullets: [
                  'Piston Ring & Crankshaft Trueing',
                  'Valve Lapping & Timing Adjustment',
                  'Ultrasonic Carburetor Descaling',
                ],
                footerLabel: 'Brands:',
                footerValue: 'Honda, Greaves, VST, Husqvarna',
              },
              {
                icon: 'water_drop',
                tone: 'tertiary',
                badge: 'Hydraulic & Pressure',
                title: 'Sprayers & Pressure Washers',
                desc: 'Borewell pump repair, HTP high pressure sprayers for mango orchards and paddy fields, high-flow car washer piston pumps, and compressor valves.',
                bullets: [
                  'Ceramic Piston & Oil Seal Fitting',
                  'Non-Return Valve Pressure Reseating',
                  'Heavy Duty Hose Crimping Support',
                ],
                footerLabel: 'Testing:',
                footerValue: 'Up to 60 Bar Hydro-Tested',
              },
              {
                icon: 'build',
                tone: 'primary',
                badge: 'Civil & Handheld',
                title: 'Power Tool Mechanical Overhaul',
                desc: 'Breaker hammers, core cutting drills, wood routers, rotary hammers, circular saws, and chop saws. Gear meshing, bearing replacements, and chuck alignments.',
                bullets: [
                  'NSK & SKF High-Speed Bearings',
                  'Bevel Gear & Pinion Replacement',
                  'SDS Chuck Mechanism Rebuilding',
                ],
                footerLabel: 'Turnaround:',
                footerValue: '30 Mins Express Available',
              },
            ].map((cap) => {
              const colorClasses =
                cap.tone === 'primary'
                  ? {
                      box: 'bg-primary/10 text-primary',
                      badge: 'bg-primary/15 text-primary',
                      check: 'text-primary',
                    }
                  : cap.tone === 'secondary'
                    ? {
                        box: 'bg-secondary/10 text-secondary',
                        badge: 'bg-secondary/15 text-secondary',
                        check: 'text-secondary',
                      }
                    : {
                        box: 'bg-tertiary/10 text-tertiary',
                        badge: 'bg-tertiary/15 text-tertiary',
                        check: 'text-tertiary',
                      };

              return (
                <div
                  key={cap.title}
                  className="bg-surface-container-lowest p-4 rounded-[4px] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-[2px] ${colorClasses.box} flex items-center justify-center mb-3`}
                    >
                      <span className="material-symbols-outlined text-[28px]">{cap.icon}</span>
                    </div>
                    <span
                      className={`text-[11px] font-display ${colorClasses.badge} px-2 py-0.5 rounded-[2px] font-bold uppercase`}
                    >
                      {cap.badge}
                    </span>
                    <h3 className="font-display text-lg font-bold text-on-surface mt-2">
                      {cap.title}
                    </h3>
                    <p className="text-sm text-on-surface-variant mt-2">{cap.desc}</p>
                    <ul className="mt-3 space-y-1 text-[11px] font-display font-bold text-on-surface">
                      {cap.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-1.5">
                          <span
                            className={`material-symbols-outlined ${colorClasses.check} text-[16px]`}
                          >
                            check_circle
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 pt-2.5 bg-surface-container-low -mx-4 -mb-4 p-3 rounded-b-[4px] flex items-center justify-between">
                    <span className="font-display text-[11px] font-bold text-on-surface-variant">
                      {cap.footerLabel}
                    </span>
                    <span className="font-display text-[11px] font-bold text-on-surface">
                      {cap.footerValue}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Guarantee & Inside Workshop Showcase */}
      <section className="w-full bg-surface px-4 md:px-8 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 grid grid-cols-2 gap-3">
            <div className="space-y-3">
              <div className="w-full h-56 rounded-[4px] shadow-sm overflow-hidden">
                <ImageWithFallback
                  src={STORE_IMAGES.workshopShelves}
                  alt="M.R. Power Tools workshop shelves stocked with organized genuine spare parts"
                  className="w-full h-full object-cover"
                  fallbackLabel="1,200+ GENUINE SPARES"
                />
              </div>
              <div className="bg-surface-container p-3 rounded-[4px]">
                <div className="font-display text-lg text-primary font-bold tabular-nums">
                  1,200+
                </div>
                <div className="text-sm text-on-surface-variant">
                  Original Spare Parts Stocked on Store Shelves in Pichatur
                </div>
              </div>
            </div>
            <div className="space-y-3 -mt-4">
              <div className="bg-inverse-surface p-3 rounded-[4px] text-inverse-on-surface">
                <div className="font-display text-lg text-tertiary-fixed font-bold">
                  0% Counterfeit
                </div>
                <div className="text-sm text-surface-variant">
                  We reject brittle low-grade carbon brushes that destroy expensive commutators
                </div>
              </div>
              <div className="w-full h-64 rounded-[4px] shadow-sm overflow-hidden">
                <ImageWithFallback
                  src={STORE_IMAGES.workshopTesting}
                  alt="Mechanic testing rewound power tiller starter motor on workbench"
                  className="w-full h-full object-cover"
                  fallbackLabel="WORKBENCH VOLTMETER TESTING"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="inline-block bg-secondary text-on-secondary px-2.5 py-1 text-[11px] font-display uppercase rounded-[2px] font-bold">
                M.R. WORKSHOP QUALITY CODE
              </span>
              <h2 className="font-display text-3xl text-on-surface font-bold tracking-tight mt-2">
                Why Pichatur Farmers &amp; Contractors Trust Our Service Bench
              </h2>
              <p className="text-base text-on-surface-variant mt-2 leading-relaxed">
                In our rural belt, a machine breakdown during planting or irrigation causes real
                financial loss. Proprietor {STORE_INFO.proprietor} enforces rigorous bench-testing
                before any machine is handed back.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 bg-surface-container-low p-3 rounded-[4px]">
                <div className="w-8 h-8 rounded-[2px] bg-primary text-on-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-on-surface">
                    Copper Purity Guaranteed (EC Grade)
                  </div>
                  <div className="text-sm text-on-surface-variant">
                    We use only electrolytic copper wire with high-temperature grade baking
                    resin—never cheap copper-clad aluminium (CCA) wires that burn out in peak
                    summer heat.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-surface-container-low p-3 rounded-[4px]">
                <div className="w-8 h-8 rounded-[2px] bg-secondary text-on-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">security</span>
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-on-surface">
                    30-Day Written Rewinding Warranty
                  </div>
                  <div className="text-sm text-on-surface-variant">
                    Every rewound motor or armature comes with our workshop warranty seal. If it
                    burns out under regular load within 30 days, we rewind it free of charge.
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 bg-surface-container-low p-3 rounded-[4px]">
                <div className="w-8 h-8 rounded-[2px] bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">speed</span>
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-on-surface">
                    Live Load &amp; Pressure Testing Before Delivery
                  </div>
                  <div className="text-sm text-on-surface-variant">
                    Sprayers are hydro-tested with pressure gauges; chainsaws and tillers are fired
                    up and tuned on our outdoor test slab in front of you.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                className="bg-secondary text-on-secondary px-4 py-2.5 rounded-[2px] font-display text-[13px] uppercase tracking-wide hover:bg-secondary-container transition-colors flex items-center gap-2 shadow-sm font-bold"
                href={buildWhatsAppMessageUrl(
                  'Hello M.R. Power Tools, sending machine photo for repair quote',
                )}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                Send Machine Photos on WhatsApp
              </a>
              <span className="text-sm text-on-surface-variant">
                Send video of machine sound for immediate diagnosis
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Status Checker & Field Pickup Request Module */}
      <section
        className="w-full bg-surface-container-high px-4 md:px-8 py-10"
        id="pickup-request-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface-container-lowest rounded-[8px] shadow-md p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left: Live Job Sheet Tracker */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4 lg:pr-4">
                <div>
                  <span className="font-display text-[11px] bg-primary/10 text-primary px-2.5 py-1 rounded-[2px] font-bold uppercase tracking-wider">
                    JOB SHEET TRACKER
                  </span>
                  <h3 className="font-display text-3xl font-bold text-on-surface mt-2 tracking-tight">
                    Check Workshop Job Status
                  </h3>
                  <p className="text-base text-on-surface-variant mt-1">
                    Enter your registered mobile phone number or Pichatur workshop slip number (e.g.
                    MR-1048 or MR-482) to see current progress.
                  </p>

                  <form className="mt-4 space-y-2.5" onSubmit={handleTrackSubmit}>
                    <div>
                      <label
                        htmlFor="track-input"
                        className="font-display text-[11px] text-on-surface font-bold block mb-1"
                      >
                        Job Sheet / Phone Number
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="track-input"
                          value={trackInput}
                          onChange={(e) => setTrackInput(e.target.value)}
                          className="flex-1 bg-surface-container-low text-on-surface text-sm px-3 py-2 rounded-[2px] focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary"
                          placeholder="e.g. 9700400266 or MR-1048"
                          required
                          type="text"
                        />
                        <button
                          type="submit"
                          className="bg-primary text-on-primary px-4 py-2 rounded-[2px] font-display text-[13px] uppercase tracking-wider font-bold hover:bg-on-primary-fixed-variant transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">search</span>
                          Track
                        </button>
                      </div>
                    </div>
                  </form>

                  {trackedJob && (
                    <div
                      className="mt-4 p-4 bg-surface-container rounded-[4px]"
                      data-testid="tracker-result-card"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-[11px] font-bold text-primary">
                          {trackedJob.jobId}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-[2px] text-[11px] font-display uppercase font-bold ${
                            trackedJob.statusTone === 'success'
                              ? 'bg-[#25D366] text-surface-container-lowest'
                              : 'bg-primary text-on-primary'
                          }`}
                        >
                          {trackedJob.status}
                        </span>
                      </div>
                      <div className="font-display text-lg font-bold text-on-surface mt-1">
                        {trackedJob.itemName}
                      </div>
                      <div className="text-sm text-on-surface-variant mt-1">
                        {trackedJob.mechanic}
                      </div>
                      <div className="w-full bg-surface-container-highest h-2 rounded-[2px] mt-3 overflow-hidden">
                        <div
                          className="bg-primary h-full transition-all duration-500"
                          style={{ width: `${trackedJob.progressPercent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] font-display font-bold text-on-surface-variant mt-1">
                        <span>Intake: {trackedJob.intakeTime}</span>
                        <span className="text-primary font-bold">{trackedJob.readyEstimate}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-surface-container-low p-3 rounded-[4px] flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[24px]">
                    storefront
                  </span>
                  <div className="text-sm text-on-surface">
                    <strong>Physical Counter Location:</strong> Bazar Street, Pichatur (Opp. Sri
                    Venkateswara Hardware). Open all 7 days for intake.
                  </div>
                </div>
              </div>

              {/* Right: Request Field Pickup */}
              <div className="lg:col-span-7 bg-surface-container-low p-6 rounded-[4px]">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-display text-[11px] bg-secondary text-on-secondary px-2.5 py-1 rounded-[2px] font-bold uppercase tracking-wider">
                      DOORSTEP / FARM PICKUP
                    </span>
                    <h3 className="font-display text-[1.375rem] font-bold text-on-surface mt-2">
                      Request Agricultural Field Pickup or On-Site Repair
                    </h3>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-[32px] hidden sm:inline">
                    local_shipping
                  </span>
                </div>
                <p className="text-sm text-on-surface-variant mb-4">
                  Heavy power tiller, tractor implement, or stuck borewell pump? Request our
                  workshop pickup van anywhere in Pichatur, Nagari, Satyavedu, or Puttur mandal.
                </p>

                <form className="grid grid-cols-1 sm:grid-cols-2 gap-3" onSubmit={handlePickupSubmit}>
                  <div>
                    <label
                      htmlFor="pickup-name"
                      className="font-display text-[11px] text-on-surface font-bold block mb-1"
                    >
                      Your Full Name (పేరు) *
                    </label>
                    <input
                      id="pickup-name"
                      value={pickupName}
                      onChange={(e) => setPickupName(e.target.value)}
                      className="w-full bg-surface-container-lowest text-on-surface text-sm px-3 py-2 rounded-[2px] focus:outline-none focus:ring-1 focus:ring-secondary"
                      placeholder="e.g. S. Venkat Reddy"
                      required
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pickup-phone"
                      className="font-display text-[11px] text-on-surface font-bold block mb-1"
                    >
                      Phone Number (ఫోన్ నెంబర్) *
                    </label>
                    <input
                      id="pickup-phone"
                      value={pickupPhone}
                      onChange={(e) => setPickupPhone(e.target.value)}
                      className="w-full bg-surface-container-lowest text-on-surface text-sm px-3 py-2 rounded-[2px] focus:outline-none focus:ring-1 focus:ring-secondary"
                      placeholder="e.g. 98490XXXXX"
                      required
                      type="tel"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pickup-village"
                      className="font-display text-[11px] text-on-surface font-bold block mb-1"
                    >
                      Village / Mandal Location *
                    </label>
                    <input
                      id="pickup-village"
                      value={pickupVillage}
                      onChange={(e) => setPickupVillage(e.target.value)}
                      className="w-full bg-surface-container-lowest text-on-surface text-sm px-3 py-2 rounded-[2px] focus:outline-none focus:ring-1 focus:ring-secondary"
                      placeholder="e.g. Pichatur Rural / Appambattu / Satyavedu Rd"
                      required
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="pickup-machine"
                      className="font-display text-[11px] text-on-surface font-bold block mb-1"
                    >
                      Machine Type
                    </label>
                    <select
                      id="pickup-machine"
                      value={pickupMachine}
                      onChange={(e) => setPickupMachine(e.target.value)}
                      className="w-full bg-surface-container-lowest text-on-surface text-sm px-3 py-2 rounded-[2px] focus:outline-none focus:ring-1 focus:ring-secondary"
                    >
                      <option>Power Tiller (VST / Greaves)</option>
                      <option>Borewell Submersible Pump / Motor</option>
                      <option>HTP Orchard Power Sprayer</option>
                      <option>58cc Heavy Duty Chainsaw</option>
                      <option>Demolition Hammer / Core Cutter</option>
                      <option>Multiple Power Tools (Contractor Batch)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pickup-issue"
                      className="font-display text-[11px] text-on-surface font-bold block mb-1"
                    >
                      Describe Issue (సమస్య వివరణ)
                    </label>
                    <textarea
                      id="pickup-issue"
                      value={pickupIssue}
                      onChange={(e) => setPickupIssue(e.target.value)}
                      className="w-full bg-surface-container-lowest text-on-surface text-sm px-3 py-2 rounded-[2px] focus:outline-none focus:ring-1 focus:ring-secondary"
                      placeholder="e.g. Motor tripping MCB, tiller starting rope stuck, low water pressure from pump..."
                      rows={2}
                    />
                  </div>
                  <div className="sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-2 pt-2">
                    <span className="text-[11px] font-display font-bold text-on-surface-variant">
                      Pickup fee: ₹50 - ₹150 depending on km distance from Pichatur center.
                    </span>
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-secondary text-on-secondary px-6 py-2.5 rounded-[2px] font-display text-[13px] uppercase tracking-wider font-bold hover:bg-secondary-container transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      Confirm Pickup Request
                    </button>
                  </div>
                </form>

                {confirmedPickup && (
                  <div
                    className="mt-3 p-3 bg-secondary text-on-secondary rounded-[2px] text-sm text-center font-bold"
                    role="status"
                  >
                    ✓ Pickup Request {confirmedPickup.id} Received for {confirmedPickup.village}!{' '}
                    {STORE_INFO.proprietor}&apos;s workshop desk will call {confirmedPickup.phone}{' '}
                    within 15 minutes.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Field Location & Direct Contact Callout */}
      <section className="w-full bg-surface px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto bg-inverse-surface text-inverse-on-surface p-4 md:p-6 rounded-[8px] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">location_on</span>
            </div>
            <div>
              <div className="font-display text-lg font-bold text-surface-bright">
                Need urgent guidance right now while working in the field?
              </div>
              <div className="text-sm text-surface-variant mt-0.5">
                Visit M.R. Power Tools, Main Road, Bazar Street, Pichatur, AP 517587. Open 7 days a
                week from 7 AM to 9 PM.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
            <a
              className="bg-primary text-on-primary px-4 py-2 rounded-[2px] font-display text-[13px] uppercase font-bold hover:bg-on-primary-fixed-variant transition-colors text-center flex-1 md:flex-initial tabular-nums"
              href={`tel:+91${STORE_INFO.phone1}`}
            >
              Call: {STORE_INFO.phone1}
            </a>
            <a
              className="bg-secondary text-on-secondary px-4 py-2 rounded-[2px] font-display text-[13px] uppercase font-bold hover:bg-secondary-container transition-colors text-center flex-1 md:flex-initial"
              href={buildWhatsAppMessageUrl(
                'Hello M.R. Power Tools, I need urgent machine servicing in Pichatur',
              )}
              rel="noopener noreferrer"
              target="_blank"
            >
              WhatsApp Help
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
