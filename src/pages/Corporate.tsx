import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  Modal,
  Input,
} from "@/components/ui";

// Corporate Accounts Data
const corporateAccounts = [
  {
    id: "1",
    name: "TechCorp International",
    logo: "https://ui-avatars.com/api/?name=TC&background=4f46e5&color=fff&size=64",
    industry: "Technology",
    tier: "Platinum",
    creditLimit: 500000,
    creditUsed: 125000,
    discount: 20,
    employees: 5000,
    accountManager: "Sarah Kim",
    paymentTerms: "NET 45",
    contractEnd: "2025-12-31",
    ytdBookings: 847,
    ytdSpend: 412500,
  },
  {
    id: "2",
    name: "Global Finance Group",
    logo: "https://ui-avatars.com/api/?name=GF&background=059669&color=fff&size=64",
    industry: "Finance",
    tier: "Gold",
    creditLimit: 250000,
    creditUsed: 98000,
    discount: 15,
    employees: 2500,
    accountManager: "Michael Foster",
    paymentTerms: "NET 30",
    contractEnd: "2024-08-15",
    ytdBookings: 423,
    ytdSpend: 189750,
  },
  {
    id: "3",
    name: "Sunrise Travel Agency",
    logo: "https://ui-avatars.com/api/?name=ST&background=f97316&color=fff&size=64",
    industry: "Travel",
    tier: "Gold",
    creditLimit: 100000,
    creditUsed: 45000,
    discount: 15,
    employees: 150,
    accountManager: "Jane Cooper",
    paymentTerms: "NET 30",
    contractEnd: "2024-11-30",
    ytdBookings: 1240,
    ytdSpend: 285000,
  },
  {
    id: "4",
    name: "EventPro Solutions",
    logo: "https://ui-avatars.com/api/?name=EP&background=dc2626&color=fff&size=64",
    industry: "Events",
    tier: "Silver",
    creditLimit: 50000,
    creditUsed: 12500,
    discount: 10,
    employees: 75,
    accountManager: "Robert Chen",
    paymentTerms: "NET 15",
    contractEnd: "2024-06-30",
    ytdBookings: 156,
    ytdSpend: 67800,
  },
];

const tierColors: Record<string, "info" | "warning" | "secondary" | "default"> =
  {
    Platinum: "info",
    Gold: "warning",
    Silver: "secondary",
    Bronze: "default",
  };

// Travel Policies
const travelPolicies = [
  {
    id: "1",
    company: "TechCorp International",
    maxBudget: 2500,
    classAllowed: "Business",
    requiresApproval: 5000,
    preferredAirlines: ["Emirates", "Singapore Airlines"],
  },
  {
    id: "2",
    company: "Global Finance Group",
    maxBudget: 1500,
    classAllowed: "Economy Premium",
    requiresApproval: 2500,
    preferredAirlines: ["British Airways", "Lufthansa"],
  },
];

export function Corporate() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const totalClients = corporateAccounts.length;
  const totalCreditExtended = corporateAccounts.reduce(
    (sum, acc) => sum + acc.creditLimit,
    0,
  );
  const totalCreditUsed = corporateAccounts.reduce(
    (sum, acc) => sum + acc.creditUsed,
    0,
  );
  const totalYtdRevenue = corporateAccounts.reduce(
    (sum, acc) => sum + acc.ytdSpend,
    0,
  );

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            B2B Corporate Portal
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage corporate accounts, contracts, and bulk bookings.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Icon icon="solar:document-text-linear" width={18} />
            Contracts
          </Button>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Icon icon="solar:buildings-2-linear" width={18} />
            Add Company
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Icon icon="solar:buildings-2-linear" width={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Corporate Clients</p>
                <p className="text-xl font-bold text-slate-900">
                  {totalClients}
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
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-50 text-success-600">
                <Icon icon="solar:dollar-linear" width={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">YTD Revenue</p>
                <p className="text-xl font-bold text-slate-900">
                  ${(totalYtdRevenue / 1000).toFixed(0)}K
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
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning-50 text-warning-500">
                <Icon icon="solar:card-linear" width={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Credit Extended</p>
                <p className="text-xl font-bold text-slate-900">
                  ${(totalCreditExtended / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger-50 text-danger-600">
                <Icon icon="solar:chart-linear" width={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Credit Utilization</p>
                <p className="text-xl font-bold text-slate-900">
                  {((totalCreditUsed / totalCreditExtended) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Corporate Accounts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {corporateAccounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card hover className="cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={account.logo}
                    alt={account.name}
                    className="h-14 w-14 rounded-xl shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {account.name}
                      </h3>
                      <Badge variant={tierColors[account.tier]}>
                        {account.tier}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400">
                      {account.industry} · {account.employees.toLocaleString()}{" "}
                      employees
                    </p>
                  </div>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50">
                  <Icon icon="solar:menu-dots-bold" width={20} />
                </button>
              </div>

              {/* Credit & Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-400">Credit Limit</p>
                  <p className="text-sm font-bold text-slate-900">
                    ${account.creditLimit.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">YTD Bookings</p>
                  <p className="text-sm font-bold text-slate-900">
                    {account.ytdBookings}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Discount Rate</p>
                  <p className="text-sm font-bold text-success-600">
                    {account.discount}% off
                  </p>
                </div>
              </div>

              {/* Credit Usage Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Credit Used</span>
                  <span className="font-medium text-slate-600">
                    ${account.creditUsed.toLocaleString()} / $
                    {account.creditLimit.toLocaleString()}
                  </span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-primary-600"
                    style={{
                      width: `${(account.creditUsed / account.creditLimit) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>AM: {account.accountManager}</span>
                <span>Contract ends: {account.contractEnd}</span>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Add Company Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={() => setIsCreateOpen(true)}
          className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50/50 p-12 text-center transition-colors hover:bg-slate-50"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
            <Icon
              icon="solar:buildings-2-linear"
              width={28}
              className="text-slate-400"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Add Corporate Client
          </h3>
          <p className="text-sm text-slate-400">Onboard a new B2B account</p>
        </motion.div>
      </div>

      {/* Travel Policies Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>Travel Policies</CardTitle>
            <Button variant="outline" size="sm">
              <Icon icon="solar:settings-linear" width={16} />
              Configure
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <th className="pb-3">Company</th>
                    <th className="pb-3">Max Budget</th>
                    <th className="pb-3">Class Allowed</th>
                    <th className="pb-3">Approval Threshold</th>
                    <th className="pb-3">Preferred Airlines</th>
                  </tr>
                </thead>
                <tbody>
                  {travelPolicies.map((policy) => (
                    <tr
                      key={policy.id}
                      className="border-b border-slate-50 last:border-0"
                    >
                      <td className="py-4 text-sm font-medium text-slate-900">
                        {policy.company}
                      </td>
                      <td className="py-4 text-sm text-slate-600">
                        ${policy.maxBudget.toLocaleString()}
                      </td>
                      <td className="py-4">
                        <Badge variant="info">{policy.classAllowed}</Badge>
                      </td>
                      <td className="py-4 text-sm text-slate-600">
                        ${policy.requiresApproval.toLocaleString()}+
                      </td>
                      <td className="py-4">
                        <div className="flex gap-1">
                          {policy.preferredAirlines.map((airline) => (
                            <span
                              key={airline}
                              className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                            >
                              {airline}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add Company Modal */}
      <Modal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        title="Add Corporate Client"
        description="Onboard a new B2B corporate account."
      >
        <div className="space-y-4">
          <Input
            label="Company Name"
            placeholder="e.g. TechCorp International"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Industry" placeholder="Technology" />
            <Input label="Employee Count" placeholder="5000" type="number" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Credit Limit ($)"
              placeholder="100000"
              type="number"
            />
            <Input label="Discount Rate (%)" placeholder="15" type="number" />
          </div>
          <Input label="Account Manager" placeholder="Sarah Kim" />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button>Add Company</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
