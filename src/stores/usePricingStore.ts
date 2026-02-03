import { create } from "zustand";
import type { PricingRule, Flight, FlightWithMarkup } from "@/types";

interface PricingStore {
  rules: PricingRule[];
  addRule: (rule: Omit<PricingRule, "id" | "createdAt" | "updatedAt">) => void;
  updateRule: (id: string, updates: Partial<PricingRule>) => void;
  deleteRule: (id: string) => void;
  toggleRule: (id: string) => void;
  calculateMarkup: (flight: Flight) => FlightWithMarkup;
  getApplicableRule: (flight: Flight) => PricingRule | undefined;
}

// Mock pricing rules
const initialRules: PricingRule[] = [
  {
    id: "1",
    name: "Garuda Premium Markup",
    airline: "Garuda Indonesia",
    markupType: "PERCENTAGE",
    markupValue: 5,
    isActive: true,
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "International Routes Fixed",
    origin: "CGK",
    destination: "SIN",
    markupType: "FIXED",
    markupValue: 150000,
    isActive: true,
    createdAt: "2026-01-20T10:00:00Z",
    updatedAt: "2026-01-20T10:00:00Z",
  },
  {
    id: "3",
    name: "Economy Class Discount",
    airline: "Citilink",
    markupType: "PERCENTAGE",
    markupValue: 3,
    isActive: false,
    createdAt: "2026-01-25T10:00:00Z",
    updatedAt: "2026-01-25T10:00:00Z",
  },
  {
    id: "4",
    name: "Peak Season Markup",
    markupType: "PERCENTAGE",
    markupValue: 15,
    isActive: true,
    createdAt: "2026-01-26T10:00:00Z",
    updatedAt: "2026-01-26T10:00:00Z",
  },
  {
    id: "5",
    name: "Weekend Premium",
    markupType: "PERCENTAGE",
    markupValue: 8,
    isActive: true,
    createdAt: "2026-01-27T10:00:00Z",
    updatedAt: "2026-01-27T10:00:00Z",
  },
  {
    id: "6",
    name: "Bali Routes Premium",
    origin: "DPS",
    markupType: "PERCENTAGE",
    markupValue: 7,
    isActive: true,
    createdAt: "2026-01-28T10:00:00Z",
    updatedAt: "2026-01-28T10:00:00Z",
  },
  {
    id: "7",
    name: "Low-Cost Carrier Fee",
    airline: "Lion Air",
    markupType: "FIXED",
    markupValue: 50000,
    isActive: true,
    createdAt: "2026-01-29T10:00:00Z",
    updatedAt: "2026-01-29T10:00:00Z",
  },
  {
    id: "8",
    name: "Hong Kong Route Premium",
    destination: "HKG",
    markupType: "PERCENTAGE",
    markupValue: 12,
    isActive: true,
    createdAt: "2026-01-30T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
  },
  {
    id: "9",
    name: "Early Bird Discount",
    markupType: "PERCENTAGE",
    markupValue: -3,
    isActive: false,
    createdAt: "2026-01-31T10:00:00Z",
    updatedAt: "2026-01-31T10:00:00Z",
  },
  {
    id: "10",
    name: "Group Booking Discount",
    markupType: "PERCENTAGE",
    markupValue: -5,
    isActive: false,
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-02-01T10:00:00Z",
  },
];

export const usePricingStore = create<PricingStore>((set, get) => ({
  rules: initialRules,

  addRule: (ruleData) => {
    const now = new Date().toISOString();
    const newRule: PricingRule = {
      ...ruleData,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    set((state) => ({ rules: [...state.rules, newRule] }));
  },

  updateRule: (id, updates) => {
    set((state) => ({
      rules: state.rules.map((rule) =>
        rule.id === id
          ? { ...rule, ...updates, updatedAt: new Date().toISOString() }
          : rule,
      ),
    }));
  },

  deleteRule: (id) => {
    set((state) => ({
      rules: state.rules.filter((rule) => rule.id !== id),
    }));
  },

  toggleRule: (id) => {
    set((state) => ({
      rules: state.rules.map((rule) =>
        rule.id === id
          ? {
              ...rule,
              isActive: !rule.isActive,
              updatedAt: new Date().toISOString(),
            }
          : rule,
      ),
    }));
  },

  getApplicableRule: (flight) => {
    const { rules } = get();
    const activeRules = rules.filter((rule) => rule.isActive);

    // Find most specific matching rule (more specific = higher priority)
    // Priority: airline + origin + destination > airline > origin + destination > generic
    const matches = activeRules.filter((rule) => {
      const airlineMatch = !rule.airline || rule.airline === flight.airline;
      const originMatch = !rule.origin || rule.origin === flight.origin;
      const destMatch =
        !rule.destination || rule.destination === flight.destination;
      return airlineMatch && originMatch && destMatch;
    });

    if (matches.length === 0) return undefined;

    // Sort by specificity (count of non-null fields)
    return matches.sort((a, b) => {
      const scoreA =
        (a.airline ? 1 : 0) + (a.origin ? 1 : 0) + (a.destination ? 1 : 0);
      const scoreB =
        (b.airline ? 1 : 0) + (b.origin ? 1 : 0) + (b.destination ? 1 : 0);
      return scoreB - scoreA;
    })[0];
  },

  calculateMarkup: (flight) => {
    const rule = get().getApplicableRule(flight);
    const basePrice = flight.price;

    let markupAmount = 0;
    if (rule) {
      if (rule.markupType === "PERCENTAGE") {
        markupAmount = Math.round(basePrice * (rule.markupValue / 100));
      } else {
        markupAmount = rule.markupValue;
      }
    }

    return {
      ...flight,
      basePrice,
      markupAmount,
      finalPrice: basePrice + markupAmount,
      appliedRule: rule,
    };
  },
}));
