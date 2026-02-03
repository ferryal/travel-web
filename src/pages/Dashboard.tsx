import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";

const topRoutes = [
  {
    rank: 1,
    origin: "LHR",
    destination: "JFK",
    flights: "1,240",
    occupancy: "89%",
  },
  {
    rank: 2,
    origin: "DXB",
    destination: "SIN",
    flights: "980",
    occupancy: "76%",
  },
  {
    rank: 3,
    origin: "PAR",
    destination: "BER",
    flights: "850",
    occupancy: "65%",
  },
];

const chartData = [40, 65, 50, 85, 95, 60, 75];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function Dashboard() {
  const intl = useIntl();

  const stats = [
    {
      id: "revenue",
      label: intl.formatMessage({ id: "dashboard.totalRevenue" }),
      value: "Rp 1.992.000.000",
      change: "+14%",
      icon: "solar:wallet-linear",
      dark: true,
    },
    {
      id: "tickets",
      label: intl.formatMessage({ id: "dashboard.ticketsSold" }),
      value: "4.302",
      icon: "solar:ticket-sale-linear",
      iconBg: "bg-primary-50",
      iconColor: "text-primary-600",
    },
    {
      id: "flights",
      label: intl.formatMessage({ id: "dashboard.activeFlights" }),
      value: "128",
      icon: "solar:plane-linear",
      iconBg: "bg-secondary-50",
      iconColor: "text-secondary-600",
    },
    {
      id: "passengers",
      label: intl.formatMessage({ id: "dashboard.newPassengers" }),
      value: "892",
      icon: "solar:users-group-rounded-linear",
      iconBg: "bg-pink-50",
      iconColor: "text-pink-600",
    },
  ];

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          <FormattedMessage id="dashboard.title" />
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          <FormattedMessage id="dashboard.welcome" />
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-[24px] p-6 ${
              stat.dark
                ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                : "bg-white shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  stat.dark ? "bg-white/10" : stat.iconBg
                }`}
              >
                <Icon
                  icon={stat.icon}
                  width={20}
                  className={stat.dark ? "" : stat.iconColor}
                />
              </div>
              {stat.change && (
                <span className="text-xs font-semibold text-success-500">
                  {stat.change}
                </span>
              )}
            </div>
            <div className="mt-4">
              <p
                className={`text-sm ${stat.dark ? "text-slate-400" : "text-slate-400"}`}
              >
                {stat.label}
              </p>
              <h3
                className={`text-2xl font-bold ${stat.dark ? "" : "text-slate-900"}`}
              >
                {stat.value}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Chart Area */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-[24px] bg-white p-6 shadow-sm lg:col-span-2"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              <FormattedMessage id="dashboard.revenueAnalytics" />
            </h3>
            <select className="rounded-lg border-none bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 outline-none">
              <option>
                {intl.formatMessage({ id: "dashboard.thisWeek" })}
              </option>
              <option>
                {intl.formatMessage({ id: "dashboard.thisMonth" })}
              </option>
            </select>
          </div>

          {/* Mock Chart */}
          <div className="flex h-64 items-end justify-between gap-2 px-2">
            {chartData.map((height, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className={`w-full rounded-t-xl transition-all ${
                  index === 4
                    ? "bg-primary-600 shadow-lg shadow-primary-200"
                    : "bg-primary-50 hover:bg-primary-100"
                }`}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs font-medium text-slate-400">
            {days.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </motion.div>

        {/* Top Routes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-[24px] bg-white p-6 shadow-sm"
        >
          <h3 className="mb-5 text-lg font-bold text-slate-900">
            <FormattedMessage id="dashboard.topRoutes" />
          </h3>
          <div className="flex flex-col gap-4">
            {topRoutes.map((route) => (
              <div
                key={route.rank}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      route.rank === 1
                        ? "bg-primary-50 text-primary-600"
                        : "border border-slate-100 bg-white text-slate-500"
                    }`}
                  >
                    {route.rank}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {route.origin} <span className="text-slate-300">→</span>{" "}
                      {route.destination}
                    </p>
                    <p className="text-xs text-slate-400">
                      {route.flights}{" "}
                      <FormattedMessage id="dashboard.flights" />
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-success-600">
                  {route.occupancy}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full rounded-xl border border-slate-100 py-3 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50">
            <FormattedMessage id="dashboard.viewReport" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
