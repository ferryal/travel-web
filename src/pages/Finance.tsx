import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const transactions = [
  {
    id: "1",
    type: "income",
    description: "Ticket Purchase #921",
    date: "Nov 14, 2023",
    time: "10:00 AM",
    amount: 450.0,
  },
  {
    id: "2",
    type: "expense",
    description: "Refund Processed",
    date: "Nov 13, 2023",
    time: "04:30 PM",
    amount: 120.0,
  },
  {
    id: "3",
    type: "income",
    description: "Ticket Purchase #918",
    date: "Nov 12, 2023",
    time: "09:15 AM",
    amount: 820.0,
  },
  {
    id: "4",
    type: "income",
    description: "Business Class Upgrade",
    date: "Nov 11, 2023",
    time: "02:45 PM",
    amount: 350.0,
  },
];

export function Finance() {
  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Finance & Wallet
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track earnings and transaction history.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Cards Section */}
        <div className="lg:col-span-1">
          {/* Credit Card Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden rounded-[24px] bg-slate-900 p-6 text-white shadow-2xl shadow-slate-300"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary-500 opacity-50 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-purple-500 opacity-50 blur-3xl" />

            <div className="relative z-10 flex h-48 flex-col justify-between">
              <div className="flex items-start justify-between">
                <Icon
                  icon="solar:sim-card-linear"
                  width={32}
                  className="opacity-80"
                />
                <Icon
                  icon="solar:wifi-router-minimalistic-bold"
                  width={24}
                  className="opacity-50"
                />
              </div>
              <div>
                <p className="font-mono text-xl tracking-widest opacity-90">
                  **** **** **** 4291
                </p>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase text-slate-400">
                    Card Holder
                  </p>
                  <p className="text-sm font-bold">Jane Cooper</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-slate-400">
                    Expires
                  </p>
                  <p className="text-sm font-bold">12/25</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Monthly Limit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 rounded-[24px] bg-white p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">
                Monthly Limit
              </span>
              <span className="text-xs font-medium text-slate-400">
                $12,400 / $20,000
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "62%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-full rounded-full bg-primary-600"
              />
            </div>
          </motion.div>
        </div>

        {/* Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="rounded-[24px] bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-bold text-slate-900">
              Recent Transactions
            </h3>

            <div className="flex flex-col gap-4">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ${
                        transaction.type === "income"
                          ? "text-success-600"
                          : "text-danger-500"
                      }`}
                    >
                      <Icon
                        icon={
                          transaction.type === "income"
                            ? "solar:arrow-left-down-linear"
                            : "solar:arrow-right-up-linear"
                        }
                        width={24}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-slate-400">
                        {transaction.date} at {transaction.time}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      transaction.type === "income"
                        ? "text-success-600"
                        : "text-slate-900"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
