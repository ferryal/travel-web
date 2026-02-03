import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { usePricingStore } from "@/stores/usePricingStore";
import { Modal, Input, Select, Button } from "@/components/ui";
import type { FlightWithMarkup } from "@/types";

// Mock flight data (simulating API data)
const flightsFromAPI = [
  {
    id: "1",
    origin: "CGK",
    destination: "DPS",
    airline: "Garuda Indonesia",
    flightNumber: "GA-401",
    departureTime: "08:45",
    arrivalTime: "11:30",
    date: "2026-02-15",
    price: 1500000,
    class: "Economy" as const,
    status: "Scheduled" as const,
    seatsAvailable: 45,
    totalSeats: 180,
  },
  {
    id: "2",
    origin: "CGK",
    destination: "SIN",
    airline: "Singapore Airlines",
    flightNumber: "SQ-951",
    departureTime: "10:30",
    arrivalTime: "13:15",
    date: "2026-02-15",
    price: 2800000,
    class: "Economy" as const,
    status: "Boarding" as const,
    seatsAvailable: 23,
    totalSeats: 220,
  },
  {
    id: "3",
    origin: "SUB",
    destination: "CGK",
    airline: "Citilink",
    flightNumber: "QG-802",
    departureTime: "14:15",
    arrivalTime: "15:45",
    date: "2026-02-15",
    price: 850000,
    class: "Economy" as const,
    status: "Scheduled" as const,
    seatsAvailable: 67,
    totalSeats: 180,
  },
  {
    id: "4",
    origin: "DPS",
    destination: "HKG",
    airline: "Garuda Indonesia",
    flightNumber: "GA-875",
    departureTime: "16:00",
    arrivalTime: "21:30",
    date: "2026-02-15",
    price: 4200000,
    class: "Business" as const,
    status: "Delayed" as const,
    seatsAvailable: 12,
    totalSeats: 42,
  },
];

const statusColors: Record<string, string> = {
  Scheduled: "bg-success-50 text-success-600",
  Boarding: "bg-primary-50 text-primary-600",
  Delayed: "bg-warning-50 text-warning-500",
  Cancelled: "bg-danger-50 text-danger-600",
};

const airlines = [
  { value: "", label: "All Airlines" },
  { value: "Garuda Indonesia", label: "Garuda Indonesia" },
  { value: "Citilink", label: "Citilink" },
  { value: "Lion Air", label: "Lion Air" },
  { value: "Singapore Airlines", label: "Singapore Airlines" },
];

const airports = [
  { value: "", label: "Any" },
  { value: "CGK", label: "CGK - Jakarta" },
  { value: "DPS", label: "DPS - Bali" },
  { value: "SUB", label: "SUB - Surabaya" },
  { value: "SIN", label: "SIN - Singapore" },
  { value: "HKG", label: "HKG - Hong Kong" },
];

const markupTypes = [
  { value: "PERCENTAGE", label: "Percentage (%)" },
  { value: "FIXED", label: "Fixed Amount (IDR)" },
];

interface QuickMarkupFormData {
  name: string;
  airline: string;
  origin: string;
  destination: string;
  markupType: "PERCENTAGE" | "FIXED";
  markupValue: number;
  isActive: boolean;
}

const defaultQuickMarkupData: QuickMarkupFormData = {
  name: "",
  airline: "",
  origin: "",
  destination: "",
  markupType: "PERCENTAGE",
  markupValue: 5,
  isActive: true,
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function Flights() {
  const { calculateMarkup, addRule } = usePricingStore();
  const [isMarkupModalOpen, setIsMarkupModalOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<FlightWithMarkup | null>(
    null,
  );
  const [quickMarkupData, setQuickMarkupData] = useState<QuickMarkupFormData>(
    defaultQuickMarkupData,
  );

  // Apply markup calculations to all flights
  const flightsWithMarkup: FlightWithMarkup[] = flightsFromAPI.map((flight) =>
    calculateMarkup(flight),
  );

  const handleOpenMarkupModal = (flight: FlightWithMarkup) => {
    setSelectedFlight(flight);
    setQuickMarkupData({
      ...defaultQuickMarkupData,
      name: `${flight.airline} - ${flight.origin} to ${flight.destination}`,
      airline: flight.airline,
      origin: flight.origin,
      destination: flight.destination,
    });
    setIsMarkupModalOpen(true);
  };

  const handleSubmitQuickMarkup = (e: React.FormEvent) => {
    e.preventDefault();
    addRule({
      name: quickMarkupData.name,
      airline: quickMarkupData.airline || undefined,
      origin: quickMarkupData.origin || undefined,
      destination: quickMarkupData.destination || undefined,
      markupType: quickMarkupData.markupType,
      markupValue: quickMarkupData.markupValue,
      isActive: quickMarkupData.isActive,
    });
    setIsMarkupModalOpen(false);
    setQuickMarkupData(defaultQuickMarkupData);
    setSelectedFlight(null);
  };

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Flight Inventory
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage schedules, pricing, and seat availability. Prices include
            applied markup.
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
        <div className="col-span-3">Route & Airline</div>
        <div className="col-span-2">Schedule</div>
        <div className="col-span-3">Pricing</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Flight Cards */}
      {flightsWithMarkup.map((flight, index) => (
        <motion.div
          key={flight.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative mb-4 grid grid-cols-1 items-center gap-6 rounded-[24px] bg-white p-5 shadow-[0px_2px_15px_-3px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0px_10px_40px_-3px_rgba(0,0,0,0.05)] md:grid-cols-12 md:p-6"
        >
          {/* Route & Airline */}
          <div className="col-span-1 md:col-span-3">
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
            <p className="text-sm font-bold text-slate-900">
              {flight.departureTime} - {flight.arrivalTime}
            </p>
            <p className="text-xs text-slate-500">{flight.date}</p>
          </div>

          {/* Pricing - Enhanced with markup display */}
          <div className="col-span-1 md:col-span-3">
            <div className="flex flex-col gap-1">
              {flight.markupAmount > 0 ? (
                <>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-slate-900">
                      {formatCurrency(flight.finalPrice)}
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-[10px] font-bold text-success-600">
                      <Icon icon="solar:arrow-up-linear" width={10} />
                      {flight.appliedRule?.markupType === "PERCENTAGE"
                        ? `+${flight.appliedRule.markupValue}%`
                        : `+${formatCurrency(flight.markupAmount)}`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-through">
                    Base: {formatCurrency(flight.basePrice)}
                  </p>
                  {flight.appliedRule && (
                    <p className="text-[10px] text-primary-500">
                      Rule: {flight.appliedRule.name}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-slate-900">
                    {formatCurrency(flight.finalPrice)}
                  </p>
                  <p className="text-xs text-slate-400">{flight.class} Class</p>
                  <p className="text-[10px] text-warning-500">
                    No markup applied
                  </p>
                </>
              )}
            </div>
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
            <p className="mt-1 text-xs text-slate-400">
              {flight.seatsAvailable}/{flight.totalSeats} seats
            </p>
          </div>

          {/* Actions */}
          <div className="col-span-1 flex justify-end gap-2 md:col-span-2">
            <button
              onClick={() => handleOpenMarkupModal(flight)}
              className="flex h-9 items-center gap-1.5 rounded-xl bg-primary-50 px-3 text-xs font-semibold text-primary-600 transition-colors hover:bg-primary-100"
              title="Edit Markup"
            >
              <Icon icon="solar:tag-price-linear" width={16} />
              Markup
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
              <Icon icon="solar:pen-linear" width={18} />
            </button>
          </div>
        </motion.div>
      ))}

      {/* Quick Markup Modal */}
      <Modal
        open={isMarkupModalOpen}
        onOpenChange={setIsMarkupModalOpen}
        title="Quick Markup Setup"
        description={
          selectedFlight
            ? `Add a pricing rule for ${selectedFlight.airline} - ${selectedFlight.origin} to ${selectedFlight.destination}`
            : "Set up markup pricing for this flight route"
        }
        className="max-w-lg"
      >
        <form onSubmit={handleSubmitQuickMarkup} className="space-y-5">
          {selectedFlight && (
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600">
                  <Icon
                    icon="solar:plane-linear"
                    width={20}
                    className="-rotate-45"
                  />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    {selectedFlight.origin} → {selectedFlight.destination}
                  </p>
                  <p className="text-sm text-slate-500">
                    Current base price:{" "}
                    {formatCurrency(selectedFlight.basePrice)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <Input
            label="Rule Name"
            value={quickMarkupData.name}
            onChange={(e) =>
              setQuickMarkupData({ ...quickMarkupData, name: e.target.value })
            }
            required
          />

          <Select
            label="Apply to Airline"
            value={quickMarkupData.airline}
            onValueChange={(value) =>
              setQuickMarkupData({ ...quickMarkupData, airline: value })
            }
            options={airlines}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Origin"
              value={quickMarkupData.origin}
              onValueChange={(value) =>
                setQuickMarkupData({ ...quickMarkupData, origin: value })
              }
              options={airports}
            />
            <Select
              label="Destination"
              value={quickMarkupData.destination}
              onValueChange={(value) =>
                setQuickMarkupData({ ...quickMarkupData, destination: value })
              }
              options={airports}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Markup Type"
              value={quickMarkupData.markupType}
              onValueChange={(value) =>
                setQuickMarkupData({
                  ...quickMarkupData,
                  markupType: value as "PERCENTAGE" | "FIXED",
                })
              }
              options={markupTypes}
            />
            <Input
              label={
                quickMarkupData.markupType === "PERCENTAGE"
                  ? "Markup (%)"
                  : "Markup (IDR)"
              }
              type="number"
              value={quickMarkupData.markupValue.toString()}
              onChange={(e) =>
                setQuickMarkupData({
                  ...quickMarkupData,
                  markupValue: parseFloat(e.target.value) || 0,
                })
              }
              required
            />
          </div>

          {selectedFlight && quickMarkupData.markupValue > 0 && (
            <div className="rounded-xl border border-success-200 bg-success-50 p-4">
              <p className="text-sm font-medium text-success-700">
                Preview Final Price:{" "}
                <span className="font-bold">
                  {formatCurrency(
                    quickMarkupData.markupType === "PERCENTAGE"
                      ? selectedFlight.basePrice *
                          (1 + quickMarkupData.markupValue / 100)
                      : selectedFlight.basePrice + quickMarkupData.markupValue,
                  )}
                </span>
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsMarkupModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Icon icon="solar:tag-price-linear" width={16} />
              Create Rule
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
