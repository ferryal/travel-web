import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const passengers = [
  {
    id: "1",
    name: "Sarah Wilson",
    email: "sarah.w@example.com",
    avatar:
      "https://ui-avatars.com/api/?name=Sarah+Wilson&background=e0e7ff&color=4f46e5",
    tier: "Gold",
    trips: 24,
    points: 12000,
    rating: 4.9,
  },
  {
    id: "2",
    name: "Mike Ross",
    email: "m.ross@law.com",
    avatar:
      "https://ui-avatars.com/api/?name=Mike+Ross&background=f0fdf4&color=16a34a",
    tier: "Silver",
    trips: 8,
    points: 3200,
    rating: 4.5,
  },
  {
    id: "3",
    name: "Jessica Chen",
    email: "j.chen@tech.io",
    avatar:
      "https://ui-avatars.com/api/?name=Jessica+Chen&background=fef3c7&color=d97706",
    tier: "Gold",
    trips: 15,
    points: 8500,
    rating: 4.8,
  },
  {
    id: "4",
    name: "David Kim",
    email: "d.kim@startup.co",
    avatar:
      "https://ui-avatars.com/api/?name=David+Kim&background=fce7f3&color=db2777",
    tier: "Bronze",
    trips: 3,
    points: 850,
    rating: 4.2,
  },
];

const tierColors: Record<string, string> = {
  Gold: "bg-warning-50 text-warning-500",
  Silver: "bg-slate-100 text-slate-500",
  Bronze: "bg-secondary-50 text-secondary-600",
  Platinum: "bg-primary-50 text-primary-600",
};

function formatPoints(points: number): string {
  if (points >= 1000) {
    return (points / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return points.toString();
}

export function Passengers() {
  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Passenger Database
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage user profiles and loyalty status.
        </p>
      </div>

      {/* Passenger Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {passengers.map((passenger, index) => (
          <motion.div
            key={passenger.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex flex-col items-center rounded-[24px] bg-white p-6 text-center shadow-sm transition-transform hover:-translate-y-1"
          >
            {/* Tier Badge */}
            <div
              className={`absolute right-4 top-4 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                tierColors[passenger.tier]
              }`}
            >
              {passenger.tier}
            </div>

            {/* Avatar */}
            <img
              src={passenger.avatar}
              alt={passenger.name}
              className="mb-4 h-20 w-20 rounded-full border-4 border-slate-50 shadow-sm"
            />

            {/* Info */}
            <h3 className="text-lg font-bold text-slate-900">
              {passenger.name}
            </h3>
            <p className="text-sm text-slate-400">{passenger.email}</p>

            {/* Stats */}
            <div className="mt-6 flex w-full justify-between rounded-xl bg-slate-50 px-4 py-3">
              <div className="text-center">
                <p className="text-xs font-medium text-slate-400">Trips</p>
                <p className="text-lg font-bold text-slate-900">
                  {passenger.trips}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-slate-400">Points</p>
                <p className="text-lg font-bold text-slate-900">
                  {formatPoints(passenger.points)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-slate-400">Rating</p>
                <p className="text-lg font-bold text-slate-900">
                  {passenger.rating}
                </p>
              </div>
            </div>

            {/* View Profile Button */}
            <button className="mt-4 w-full rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50">
              View Profile
            </button>
          </motion.div>
        ))}

        {/* Add Passenger Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: passengers.length * 0.1 }}
          className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 text-center transition-colors hover:bg-slate-50"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
            <Icon
              icon="solar:user-plus-linear"
              width={24}
              className="text-slate-400"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Add Passenger</h3>
          <p className="text-sm text-slate-400">
            Register a new profile manually
          </p>
        </motion.div>
      </div>
    </div>
  );
}
