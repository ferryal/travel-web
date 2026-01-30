// Flight types
export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  date: string;
  price: number;
  class: "Economy" | "Business" | "First";
  status:
    | "Scheduled"
    | "Delayed"
    | "Cancelled"
    | "Boarding"
    | "In Flight"
    | "Landed";
  seatsAvailable: number;
  totalSeats: number;
}

// Booking types
export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  trips: number;
  points: number;
  rating: number;
}

export interface Booking {
  id: string;
  pnr: string;
  passenger: Passenger;
  flight: Flight;
  date: string;
  amount: number;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
  paymentMethod:
    | "Credit Card"
    | "E-Wallet"
    | "Virtual Account"
    | "Bank Transfer";
}

// Finance types
export interface Transaction {
  id: string;
  type: "income" | "expense" | "refund";
  description: string;
  amount: number;
  date: string;
  time: string;
  reference?: string;
}

// Stats types
export interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  ticketsSold: number;
  activeFlights: number;
  newPassengers: number;
}

export interface RouteStats {
  rank: number;
  origin: string;
  destination: string;
  flights: number;
  occupancy: number;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
}
