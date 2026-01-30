import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const flights = [
  {
    id: "1",
    origin: "LHR",
    destination: "DXB",
    airline: "British Airways",
    flightNumber: "BA-109",
    time: "08:45 AM",
    date: "14 Nov 2023",
    price: 450,
    class: "Economy",
    status: "Scheduled",
  },
  {
    id: "2",
    origin: "JFK",
    destination: "LAX",
    airline: "American Airlines",
    flightNumber: "AA-201",
    time: "10:30 AM",
    date: "15 Nov 2023",
    price: 320,
    class: "Economy",
    status: "Boarding",
  },
  {
    id: "3",
    origin: "SIN",
    destination: "HKG",
    airline: "Singapore Airlines",
    flightNumber: "SQ-890",
    time: "02:15 PM",
    date: "15 Nov 2023",
    price: 680,
    class: "Business",
    status: "Delayed",
  },
];

const statusColors: Record<string, string> = {
  Scheduled: "bg-success-50 text-success-600",
  Boarding: "bg-primary-50 text-primary-600",
  Delayed: "bg-warning-50 text-warning-500",
  Cancelled: "bg-danger-50 text-danger-600",
};

export function Flights() {
  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Flight Inventory
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage schedules, pricing, and seat availability.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:bg-slate-50">
            <Icon icon="solar:filter-linear" width={18} />
            Filters
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5 hover:bg-slate-800">
            <Icon icon="solar:add-circle-linear" width={18} />
            Add New Flight
          </button>
        </div>
      </div>

      {/* Header Row */}
      <div className="mb-4 hidden grid-cols-12 gap-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400 md:grid">
        <div className="col-span-4">Route & Airline</div>
        <div className="col-span-2">Schedule</div>
        <div className="col-span-2">Price & Class</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Flight Cards */}
      {flights.map((flight, index) => (
        <motion.div
          key={flight.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative mb-4 grid grid-cols-1 items-center gap-6 rounded-[24px] bg-white p-5 shadow-[0px_2px_15px_-3px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0px_10px_40px_-3px_rgba(0,0,0,0.05)] md:grid-cols-12 md:p-6"
        >
          {/* Route & Airline */}
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-600">
                <Icon
                  icon="solar:plane-linear"
                  width={24}
                  className="-rotate-45"
                />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-slate-900">
                    {flight.origin}
                  </h3>
                  <div className="flex w-16 items-center justify-center">
                    <div className="h-[1px] w-full bg-slate-200" />
                    <Icon
                      icon="solar:plane-linear"
                      className="absolute rotate-90 text-slate-300"
                      width={16}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {flight.destination}
                  </h3>
                </div>
                <p className="text-xs font-medium text-slate-400">
                  {flight.airline} • {flight.flightNumber}
                </p>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="col-span-1 md:col-span-2">
            <p className="text-sm font-bold text-slate-900">{flight.time}</p>
            <p className="text-xs text-slate-500">{flight.date}</p>
          </div>

          {/* Price & Class */}
          <div className="col-span-1 md:col-span-2">
            <p className="text-lg font-bold text-slate-900">${flight.price}</p>
            <p className="text-xs text-slate-500">{flight.class}</p>
          </div>

          {/* Status */}
          <div className="col-span-1 md:col-span-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                statusColors[flight.status]
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {flight.status}
            </span>
          </div>

          {/* Actions */}
          <div className="col-span-1 flex justify-end gap-2 md:col-span-2">
            <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors hover:bg-primary-50 hover:text-primary-600">
              <Icon icon="solar:pen-linear" width={18} />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
