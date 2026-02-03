import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

const monthlyRevenue = [
  { month: "Jan", value: 1360000000 },
  { month: "Feb", value: 1472000000 },
  { month: "Mar", value: 1248000000 },
  { month: "Apr", value: 1680000000 },
  { month: "May", value: 1888000000 },
  { month: "Jun", value: 1992000000 },
];

const routePerformance = [
  { route: "CGK → DPS", bookings: 1240, revenue: 8928000000, growth: 12 },
  { route: "CGK → SIN", bookings: 980, revenue: 7056000000, growth: 8 },
  { route: "SUB → CGK", bookings: 850, revenue: 3400000000, growth: -3 },
  { route: "DPS → KUL", bookings: 720, revenue: 8640000000, growth: 15 },
  { route: "CGK → HKG", bookings: 650, revenue: 5200000000, growth: 5 },
];

const paymentMethods = [
  { method: "Credit Card", percentage: 45, color: "bg-primary-600" },
  { method: "E-Wallet", percentage: 28, color: "bg-secondary-500" },
  { method: "Virtual Account", percentage: 18, color: "bg-success-500" },
  { method: "Bank Transfer", percentage: 9, color: "bg-warning-500" },
];

const conversionFunnel = [
  { stage: "Searches", count: 45000, percentage: 100 },
  { stage: "Flight Views", count: 28500, percentage: 63 },
  { stage: "Booking Started", count: 12400, percentage: 28 },
  { stage: "Payment Completed", count: 8200, percentage: 18 },
];

export function Analytics() {
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Analytics & Reporting
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Business intelligence and performance insights.
          </p>
        </div>
        <div className="flex gap-3">
          <select className="h-11 rounded-xl bg-white px-4 text-sm font-medium text-slate-600 shadow-soft ring-1 ring-slate-100">
            <option>Last 6 months</option>
            <option>Last 12 months</option>
            <option>This year</option>
          </select>
          <button className="flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-medium text-slate-600 shadow-soft ring-1 ring-slate-100 hover:bg-slate-50">
            <Icon icon="solar:export-linear" width={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-slate-900 text-white">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Icon icon="solar:dollar-linear" width={20} />
              </div>
              <span className="text-xs font-semibold text-success-400">
                +18.2%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-400">Total Revenue</p>
              <h3 className="text-2xl font-bold">Rp 9,64M</h3>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <Icon icon="solar:ticket-linear" width={20} />
              </div>
              <span className="text-xs font-semibold text-success-500">
                +12.5%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-400">Total Bookings</p>
              <h3 className="text-2xl font-bold text-slate-900">8,200</h3>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-50 text-secondary-600">
                <Icon icon="solar:graph-up-linear" width={20} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-400">Conversion Rate</p>
              <h3 className="text-2xl font-bold text-slate-900">18.2%</h3>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success-50 text-success-600">
                <Icon icon="solar:user-check-linear" width={20} />
              </div>
              <span className="text-xs font-semibold text-danger-500">
                -2.3%
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-400">Avg Order Value</p>
              <h3 className="text-2xl font-bold text-slate-900">
                Rp 1.175.680
              </h3>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-64 items-end justify-between gap-4">
                {monthlyRevenue.map((month, index) => (
                  <div
                    key={month.month}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: `${(month.value / maxRevenue) * 100}%`,
                      }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className={`w-full rounded-t-lg ${
                        index === monthlyRevenue.length - 1
                          ? "bg-primary-600 shadow-lg shadow-primary-200"
                          : "bg-primary-100"
                      }`}
                    />
                    <span className="text-xs font-medium text-slate-400">
                      {month.month}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.method}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">{method.method}</span>
                      <span className="font-bold text-slate-900">
                        {method.percentage}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${method.percentage}%` }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className={`h-full rounded-full ${method.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Route Performance & Funnel */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Route Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Top Routes Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routePerformance.map((route, index) => (
                  <div
                    key={route.route}
                    className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-600">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {route.route}
                        </p>
                        <p className="text-xs text-slate-400">
                          {route.bookings} bookings
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">
                        Rp {(route.revenue / 1000000000).toFixed(1)}M
                      </p>
                      <p
                        className={`text-xs font-medium ${
                          route.growth >= 0
                            ? "text-success-600"
                            : "text-danger-600"
                        }`}
                      >
                        {route.growth >= 0 ? "+" : ""}
                        {route.growth}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {conversionFunnel.map((stage, index) => (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">{stage.stage}</span>
                      <span className="font-medium text-slate-900">
                        {stage.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 h-8 overflow-hidden rounded-lg bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stage.percentage}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                        className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-2"
                      >
                        <span className="text-xs font-bold text-white">
                          {stage.percentage}%
                        </span>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
