import { STORE_INFO } from '../data/storeData';
import type { PageId } from '../types/store';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full bg-inverse-surface text-inverse-on-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="font-display text-lg font-semibold text-primary-fixed">
              {STORE_INFO.name}
            </div>
            <div className="font-display text-[11px] font-bold text-tertiary-fixed uppercase tracking-wider">
              పిచ్చాటూరు - తిరుపతి జిల్లా
            </div>
            <p className="text-sm text-surface-variant leading-relaxed">
              Main Road, Bazar Street, Pichatur, Andhra Pradesh 517587.
              <br />
              Proprietor: {STORE_INFO.proprietor}
              <br />
              Phone: +91 {STORE_INFO.phone1} / {STORE_INFO.phone2}
              <br />
              GSTIN: {STORE_INFO.gstin}
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-display text-[15px] font-bold uppercase tracking-wide text-primary-fixed">
              Working Hours &amp; Regions
            </div>
            <p className="text-sm text-surface-variant">
              {STORE_INFO.hours}
              <br />
              (All 7 days operational for active farm seasons)
            </p>
            <div className="font-display text-xs text-inverse-on-surface mt-2 font-semibold">
              Service Coverage Belts:
            </div>
            <p className="text-sm text-surface-variant">
              Pichatur, Nagari, Satyavedu, Puttur, Karvetinagar, Vijayapuram, and adjoining rural
              agricultural sectors.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-display text-[15px] font-bold uppercase tracking-wide text-primary-fixed">
              Trust &amp; Service Guarantees
            </div>
            <ul className="space-y-1.5 text-sm text-surface-variant">
              <li>✔ 100% Genuine OEM Spares &amp; Lubricants</li>
              <li>✔ Same-Day Field Pump &amp; Motor Rewinding</li>
              <li>✔ Zero-Deposit Rentals for Verified Local Rythus</li>
              <li>✔ On-Site Breakdown Support across Pichatur Taluk</li>
              <li>✔ Certified Agricultural Subsidy Invoices (GST)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-display text-[15px] font-bold uppercase tracking-wide text-primary-fixed">
              Direct Links &amp; Bookings
            </div>
            <div className="flex flex-col items-start gap-1.5 text-sm">
              <button
                type="button"
                onClick={() => onNavigate('machinery-equipment-sales')}
                className="text-surface-variant hover:text-surface-container-lowest transition-colors text-left cursor-pointer"
              >
                Agricultural &amp; Power Tool Sales
              </button>
              <button
                type="button"
                onClick={() => onNavigate('tool-rentals-daily-rates')}
                className="text-surface-variant hover:text-surface-container-lowest transition-colors text-left cursor-pointer"
              >
                Machinery Rental Price Chart
              </button>
              <button
                type="button"
                onClick={() => onNavigate('repair-servicing-rewinding')}
                className="text-surface-variant hover:text-surface-container-lowest transition-colors text-left cursor-pointer"
              >
                Motor Rewinding &amp; Repair Center
              </button>
              <button
                type="button"
                onClick={() => onNavigate('pichatur-store-location-contact')}
                className="text-surface-variant hover:text-surface-container-lowest transition-colors text-left cursor-pointer"
              >
                Store Route Map &amp; Direct Phone
              </button>
            </div>
            <div className="pt-1">
              <a
                className="inline-block bg-secondary text-on-secondary px-3.5 py-1.5 rounded-[2px] font-display text-[13px] font-bold hover:bg-secondary-container transition-colors"
                href={STORE_INFO.whatsappBase}
                rel="noopener noreferrer"
                target="_blank"
              >
                Instant WhatsApp Order (వాట్సాప్ బుకింగ్)
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 flex flex-col md:flex-row items-center justify-between text-sm text-surface-variant gap-2 border-t border-outline-variant/20">
          <p>
            © 2024 M.R. Power Tools • Pichatur. All Rights Reserved. Empowering local farmers &amp;
            contractors.
          </p>
          <p className="font-display text-[11px] font-bold uppercase tracking-wider text-outline-variant">
            High Utility Hardware • Heavy Duty Agricultural &amp; Civil Machinery
          </p>
        </div>
      </div>
    </footer>
  );
}
