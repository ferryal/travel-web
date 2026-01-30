import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
} from "@/components/ui";

// Income Statement Data
const incomeData = {
  revenue: {
    ticketSales: 485000,
    serviceFees: 45000,
    ancillaryServices: 35500,
    corporateContracts: 95000,
  },
  expenses: {
    operationalCosts: 120000,
    marketing: 35000,
    salaries: 85000,
    technology: 25000,
    other: 15000,
  },
};

const totalRevenue = Object.values(incomeData.revenue).reduce(
  (a, b) => a + b,
  0,
);
const totalExpenses = Object.values(incomeData.expenses).reduce(
  (a, b) => a + b,
  0,
);
const netProfit = totalRevenue - totalExpenses;

// Cash Flow Data
const cashFlow = [
  { date: "Jan 28", inflow: 45000, outflow: 28000, balance: 125000 },
  { date: "Jan 29", inflow: 52000, outflow: 35000, balance: 142000 },
  { date: "Jan 30", inflow: 38000, outflow: 42000, balance: 138000 },
  { date: "Jan 31", inflow: 61000, outflow: 31000, balance: 168000 },
];

// Accounts Receivable
const receivables = [
  {
    company: "TechCorp Inc.",
    invoice: "INV-2024-0145",
    amount: 24500,
    dueDate: "2024-02-15",
    status: "current",
  },
  {
    company: "Global Travel Agency",
    invoice: "INV-2024-0132",
    amount: 18750,
    dueDate: "2024-02-05",
    status: "current",
  },
  {
    company: "Sunset Holidays",
    invoice: "INV-2024-0098",
    amount: 12300,
    dueDate: "2024-01-28",
    status: "overdue",
  },
  {
    company: "Corporate Travels Ltd",
    invoice: "INV-2024-0087",
    amount: 35000,
    dueDate: "2024-01-20",
    status: "overdue",
  },
];

// Accounts Payable
const payables = [
  {
    vendor: "Airline Partner A",
    invoice: "VND-8845",
    amount: 85000,
    dueDate: "2024-02-10",
    category: "Operations",
  },
  {
    vendor: "Cloud Services Inc",
    invoice: "VND-8821",
    amount: 4500,
    dueDate: "2024-02-01",
    category: "Technology",
  },
  {
    vendor: "Marketing Agency",
    invoice: "VND-8798",
    amount: 12000,
    dueDate: "2024-02-05",
    category: "Marketing",
  },
];

// Tax Summary
const taxSummary = {
  collected: 45200,
  payable: 38500,
  credits: 6700,
  nextDue: "2024-03-31",
};

// Journal Entries
const journalEntries = [
  {
    id: "JE-2024-0089",
    date: "2024-01-30",
    description: "Ticket sales revenue",
    debit: "Cash",
    credit: "Revenue",
    amount: 52000,
  },
  {
    id: "JE-2024-0088",
    date: "2024-01-30",
    description: "Marketing expense",
    debit: "Marketing Expense",
    credit: "Cash",
    amount: 5000,
  },
  {
    id: "JE-2024-0087",
    date: "2024-01-29",
    description: "Salary payment",
    debit: "Salary Expense",
    credit: "Cash",
    amount: 28000,
  },
];

export function Accounting() {
  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Accounting & Finance
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Financial statements, cash flow, and bookkeeping.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Icon icon="solar:printer-linear" width={18} />
            Print Reports
          </Button>
          <Button>
            <Icon icon="solar:add-circle-linear" width={18} />
            Journal Entry
          </Button>
        </div>
      </div>

      {/* Income Statement Summary */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-success-50 border border-success-100">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success-500 text-white">
                <Icon icon="solar:arrow-up-linear" width={24} />
              </div>
              <div>
                <p className="text-sm text-success-600">Total Revenue</p>
                <p className="text-2xl font-bold text-success-700">
                  ${(totalRevenue / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-danger-50 border border-danger-100">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-danger-500 text-white">
                <Icon icon="solar:arrow-down-linear" width={24} />
              </div>
              <div>
                <p className="text-sm text-danger-600">Total Expenses</p>
                <p className="text-2xl font-bold text-danger-700">
                  ${(totalExpenses / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-primary-50 border border-primary-100">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white">
                <Icon icon="solar:wallet-money-linear" width={24} />
              </div>
              <div>
                <p className="text-sm text-primary-600">Net Profit</p>
                <p className="text-2xl font-bold text-primary-700">
                  ${(netProfit / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Income Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Income Statement</CardTitle>
              <span className="text-xs text-slate-400">This Month</span>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Revenue
                  </p>
                  {Object.entries(incomeData.revenue).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-1.5"
                    >
                      <span className="text-sm text-slate-600 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-sm font-medium text-success-600">
                        +${value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Expenses
                  </p>
                  {Object.entries(incomeData.expenses).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-1.5"
                    >
                      <span className="text-sm text-slate-600 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-sm font-medium text-danger-600">
                        -${value.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cash Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow</CardTitle>
              <span className="text-xs text-slate-400">Last 4 Days</span>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cashFlow.map((day) => (
                  <div key={day.date} className="rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-900">
                        {day.date}
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        ${day.balance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <span className="text-xs text-success-600">
                        ↑ ${day.inflow.toLocaleString()}
                      </span>
                      <span className="text-xs text-danger-600">
                        ↓ ${day.outflow.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Accounts Receivable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Accounts Receivable</CardTitle>
              <Badge variant="warning">4 Outstanding</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {receivables.map((item) => (
                  <div
                    key={item.invoice}
                    className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {item.company}
                      </p>
                      <p className="text-xs text-slate-400">
                        {item.invoice} · Due {item.dueDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">
                        ${item.amount.toLocaleString()}
                      </p>
                      <Badge
                        variant={
                          item.status === "overdue" ? "danger" : "success"
                        }
                        size="sm"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Accounts Payable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Accounts Payable</CardTitle>
              <Badge variant="info">3 Pending</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {payables.map((item) => (
                  <div
                    key={item.invoice}
                    className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {item.vendor}
                      </p>
                      <p className="text-xs text-slate-400">
                        {item.invoice} · {item.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-danger-600">
                        -${item.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-400">
                        Due {item.dueDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tax Summary & Journal Entries */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Tax Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Tax Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Tax Collected</span>
                  <span className="text-sm font-bold text-slate-900">
                    ${taxSummary.collected.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Tax Payable</span>
                  <span className="text-sm font-bold text-danger-600">
                    -${taxSummary.payable.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Tax Credits</span>
                  <span className="text-sm font-bold text-success-600">
                    +${taxSummary.credits.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-400">Next Filing Due</p>
                  <p className="text-lg font-bold text-slate-900">
                    {taxSummary.nextDue}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Journal Entries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Journal Entries</CardTitle>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                      <th className="pb-3">ID</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Description</th>
                      <th className="pb-3">Debit</th>
                      <th className="pb-3">Credit</th>
                      <th className="pb-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {journalEntries.map((entry) => (
                      <tr
                        key={entry.id}
                        className="border-b border-slate-50 last:border-0"
                      >
                        <td className="py-3 text-xs font-mono text-slate-500">
                          {entry.id}
                        </td>
                        <td className="py-3 text-sm text-slate-600">
                          {entry.date}
                        </td>
                        <td className="py-3 text-sm text-slate-900">
                          {entry.description}
                        </td>
                        <td className="py-3 text-sm text-slate-600">
                          {entry.debit}
                        </td>
                        <td className="py-3 text-sm text-slate-600">
                          {entry.credit}
                        </td>
                        <td className="py-3 text-right text-sm font-bold text-slate-900">
                          ${entry.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
