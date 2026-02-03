import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";

const bookings = [
  {
    id: "1",
    passenger: {
      name: "John Doe",
      pnr: "XJ9-220",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
    },
    flight: "GA-401",
    date: "Feb 24, 2026",
    amount: 7200000,
    statusKey: "bookings.confirmed",
    statusColor: "bg-success-50 text-success-600",
  },
  {
    id: "2",
    passenger: {
      name: "Alice Smith",
      pnr: "B22-109",
      avatar: "https://ui-avatars.com/api/?name=Alice+Smith&background=random",
    },
    flight: "SQ-634",
    date: "Feb 25, 2026",
    amount: 19200000,
    statusKey: "bookings.pending",
    statusColor: "bg-secondary-50 text-secondary-600",
  },
  {
    id: "3",
    passenger: {
      name: "Robert Fox",
      pnr: "A99-551",
      avatar: "https://ui-avatars.com/api/?name=Robert+Fox&background=random",
    },
    flight: "GA-875",
    date: "Feb 26, 2026",
    amount: 13120000,
    statusKey: "bookings.cancelled",
    statusColor: "bg-danger-50 text-danger-600",
  },
  {
    id: "4",
    passenger: {
      name: "Emily Chen",
      pnr: "C45-789",
      avatar: "https://ui-avatars.com/api/?name=Emily+Chen&background=random",
    },
    flight: "QG-802",
    date: "Feb 27, 2026",
    amount: 8960000,
    statusKey: "bookings.confirmed",
    statusColor: "bg-success-50 text-success-600",
  },
];

export function Bookings() {
  const intl = useIntl();

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            <FormattedMessage id="bookings.title" />
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            <FormattedMessage id="bookings.subtitle" />
          </p>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[24px] bg-white shadow-sm"
      >
        {/* Table Header */}
        <div className="hidden grid-cols-12 gap-4 border-b border-slate-100 bg-slate-50/50 p-5 text-xs font-semibold uppercase tracking-wider text-slate-400 md:grid">
          <div className="col-span-4">
            <FormattedMessage id="bookings.passenger" />
          </div>
          <div className="col-span-2">
            <FormattedMessage id="bookings.flight" />
          </div>
          <div className="col-span-2">
            <FormattedMessage id="bookings.date" />
          </div>
          <div className="col-span-2">
            <FormattedMessage id="bookings.payment" />
          </div>
          <div className="col-span-2 text-right">
            <FormattedMessage id="bookings.status" />
          </div>
        </div>

        {/* Table Rows */}
        {bookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`grid grid-cols-1 items-center gap-4 p-5 transition-colors hover:bg-slate-50/50 md:grid-cols-12 ${
              index < bookings.length - 1 ? "border-b border-slate-50" : ""
            }`}
          >
            {/* Passenger */}
            <div className="col-span-4 flex items-center gap-3">
              <img
                src={booking.passenger.avatar}
                alt={booking.passenger.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {booking.passenger.name}
                </p>
                <p className="text-xs text-slate-400">
                  PNR: {booking.passenger.pnr}
                </p>
              </div>
            </div>

            {/* Flight */}
            <div className="col-span-2 text-sm font-semibold text-slate-700">
              {booking.flight}
            </div>

            {/* Date */}
            <div className="col-span-2 text-sm text-slate-500">
              {booking.date}
            </div>

            {/* Payment */}
            <div className="col-span-2 text-sm font-bold text-slate-900">
              Rp {booking.amount.toLocaleString("id-ID")}
            </div>

            {/* Status */}
            <div className="col-span-2 text-right">
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${booking.statusColor}`}
              >
                {intl.formatMessage({ id: booking.statusKey })}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
