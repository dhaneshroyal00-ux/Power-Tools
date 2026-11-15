import { STORE_INFO } from '../data/storeData';
import type {
  PageId,
  SavedDemoBooking,
  SavedPickupRequest,
  SavedRentalBooking,
} from '../types/store';

interface BookingsDrawerProps {
  open: boolean;
  onClose: () => void;
  rentals: SavedRentalBooking[];
  demos: SavedDemoBooking[];
  pickups: SavedPickupRequest[];
  onNavigate: (page: PageId, scrollTarget?: string) => void;
  onClearAll: () => void;
}

export function BookingsDrawer({
  open,
  onClose,
  rentals,
  demos,
  pickups,
  onNavigate,
  onClearAll,
}: BookingsDrawerProps) {
  if (!open) return null;

  const totalCount = rentals.length + demos.length + pickups.length;

  return (
    <div
      className="fixed inset-0 z-50 bg-inverse-surface/65 backdrop-blur-sm flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookings-drawer-title"
    >
      <div className="bg-surface-container-lowest w-full max-w-md h-full flex flex-col shadow-2xl">
        <div className="bg-inverse-surface text-inverse-on-surface px-5 py-4 flex items-center justify-between">
          <div>
            <div className="font-display text-[11px] font-bold uppercase tracking-wider text-tertiary-fixed">
              M.R. POWER TOOLS • PICHATUR
            </div>
            <h2 id="bookings-drawer-title" className="font-display text-lg font-bold">
              Your Saved Inquiries &amp; Bookings ({totalCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close bookings panel"
            className="text-inverse-on-surface hover:text-primary-fixed cursor-pointer p-1"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {totalCount === 0 ? (
            <div className="bg-surface-container-low p-6 rounded-[4px] text-center space-y-3">
              <span className="material-symbols-outlined text-[40px] text-primary">
                assignment
              </span>
              <div className="font-display text-base font-bold text-on-surface">
                No Active Bookings Saved Yet
              </div>
              <p className="text-sm text-on-surface-variant">
                Reserve a machine for rent, schedule a store demo, or request farm pickup and your
                slips will appear here for easy reference.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('tool-rentals-daily-rates', 'rental-booking-terminal');
                  }}
                  className="bg-primary text-on-primary font-display text-xs font-bold uppercase py-2.5 px-4 rounded-[2px] cursor-pointer"
                >
                  Reserve Rental Equipment
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate('repair-servicing-rewinding', 'pickup-request-section');
                  }}
                  className="bg-secondary text-on-secondary font-display text-xs font-bold uppercase py-2.5 px-4 rounded-[2px] cursor-pointer"
                >
                  Request Workshop Pickup
                </button>
              </div>
            </div>
          ) : (
            <>
              {rentals.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-primary">
                    Rental Reservations ({rentals.length})
                  </h3>
                  {rentals.map((r) => (
                    <div key={r.id} className="bg-surface-container-low p-3 rounded-[4px] space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold text-on-surface">
                          {r.tool}
                        </span>
                        <span className="bg-tertiary-fixed text-on-tertiary-fixed font-display text-[11px] font-bold px-2 py-0.5 rounded-[2px]">
                          {r.id}
                        </span>
                      </div>
                      <div className="text-xs text-on-surface-variant">
                        {r.name} • {r.village} • {r.duration} (From {r.date})
                      </div>
                      <a
                        href={r.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-secondary text-on-secondary font-display text-[11px] font-bold uppercase px-2.5 py-1 rounded-[2px]"
                      >
                        <span className="material-symbols-outlined text-[14px]">chat</span>
                        Send on WhatsApp
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {demos.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-secondary">
                    Store Demo Slots ({demos.length})
                  </h3>
                  {demos.map((d) => (
                    <div key={d.id} className="bg-surface-container-low p-3 rounded-[4px] space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold text-on-surface">
                          {d.machineName}
                        </span>
                        <span className="bg-secondary-fixed text-on-secondary-fixed font-display text-[11px] font-bold px-2 py-0.5 rounded-[2px]">
                          {d.id}
                        </span>
                      </div>
                      <div className="text-xs text-on-surface-variant">
                        {d.customerName} ({d.phone}) • {d.village}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {pickups.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-tertiary">
                    Workshop Pickup Requests ({pickups.length})
                  </h3>
                  {pickups.map((p) => (
                    <div key={p.id} className="bg-surface-container-low p-3 rounded-[4px] space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display text-sm font-bold text-on-surface">
                          {p.machineType}
                        </span>
                        <span className="bg-primary-fixed text-on-primary-fixed font-display text-[11px] font-bold px-2 py-0.5 rounded-[2px]">
                          {p.id}
                        </span>
                      </div>
                      <div className="text-xs text-on-surface-variant">
                        {p.name} ({p.phone}) • {p.village}
                      </div>
                      {p.issue && (
                        <div className="text-xs text-on-surface italic">"{p.issue}"</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-4 bg-surface-container flex items-center justify-between gap-2">
          <a
            href={`tel:+91${STORE_INFO.phone1}`}
            className="flex-1 bg-primary text-on-primary font-display text-xs font-bold uppercase py-2.5 px-3 rounded-[2px] text-center flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            Call {STORE_INFO.phone1}
          </a>
          {totalCount > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="bg-surface-container-highest text-on-surface font-display text-xs font-bold uppercase py-2.5 px-3 rounded-[2px] cursor-pointer hover:bg-surface-dim"
            >
              Clear History
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
