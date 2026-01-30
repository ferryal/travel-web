import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  Modal,
  Input,
} from "@/components/ui";

const vouchers = [
  {
    id: "1",
    code: "FLY50",
    name: "First Flight Discount",
    description: "Get 50% off on your first booking",
    type: "percentage",
    value: 50,
    minSpend: 100,
    maxDiscount: 75,
    used: 234,
    quota: 500,
    expiry: "2024-03-31",
    status: "active",
  },
  {
    id: "2",
    code: "SUMMER25",
    name: "Summer Sale",
    description: "$25 off on all domestic flights",
    type: "fixed",
    value: 25,
    minSpend: 150,
    maxDiscount: null,
    used: 89,
    quota: 200,
    expiry: "2024-06-30",
    status: "active",
  },
  {
    id: "3",
    code: "HOLIDAY10",
    name: "Holiday Special",
    description: "10% off on international flights",
    type: "percentage",
    value: 10,
    minSpend: 300,
    maxDiscount: 100,
    used: 500,
    quota: 500,
    expiry: "2024-01-15",
    status: "expired",
  },
  {
    id: "4",
    code: "WEEKEND20",
    name: "Weekend Getaway",
    description: "20% off weekend departures",
    type: "percentage",
    value: 20,
    minSpend: 200,
    maxDiscount: 50,
    used: 45,
    quota: 100,
    expiry: "2024-12-31",
    status: "active",
  },
];

const statusColors: Record<string, "success" | "danger" | "warning"> = {
  active: "success",
  expired: "danger",
  paused: "warning",
};

export function Promos() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Promo & Voucher Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create and manage promotional vouchers and discount codes.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Icon icon="solar:export-linear" width={18} />
            Export
          </Button>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Icon icon="solar:add-circle-linear" width={18} />
            Create Voucher
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Icon icon="solar:ticket-sale-linear" width={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Active Vouchers</p>
              <p className="text-xl font-bold text-slate-900">12</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-50 text-success-600">
              <Icon icon="solar:check-circle-linear" width={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Redemptions</p>
              <p className="text-xl font-bold text-slate-900">1,847</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600">
              <Icon icon="solar:dollar-linear" width={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Discount Given</p>
              <p className="text-xl font-bold text-slate-900">$24,580</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning-50 text-warning-500">
              <Icon icon="solar:clock-circle-linear" width={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Expiring Soon</p>
              <p className="text-xl font-bold text-slate-900">3</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Voucher Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Vouchers</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Icon
                icon="solar:magnifer-linear"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                width={16}
              />
              <input
                type="text"
                placeholder="Search vouchers..."
                className="h-9 w-48 rounded-lg bg-slate-50 pl-9 pr-3 text-sm outline-none"
              />
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="pb-3">Code</th>
                <th className="pb-3">Discount</th>
                <th className="pb-3">Usage</th>
                <th className="pb-3">Min Spend</th>
                <th className="pb-3">Expiry</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((voucher, index) => (
                <motion.tr
                  key={voucher.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-50 last:border-0"
                >
                  <td className="py-4">
                    <div>
                      <p className="font-mono text-sm font-bold text-slate-900">
                        {voucher.code}
                      </p>
                      <p className="text-xs text-slate-400">{voucher.name}</p>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="text-sm font-bold text-slate-900">
                      {voucher.type === "percentage"
                        ? `${voucher.value}%`
                        : `$${voucher.value}`}
                    </span>
                    {voucher.maxDiscount && (
                      <p className="text-xs text-slate-400">
                        Max ${voucher.maxDiscount}
                      </p>
                    )}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-primary-600"
                          style={{
                            width: `${(voucher.used / voucher.quota) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">
                        {voucher.used}/{voucher.quota}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-slate-600">
                    ${voucher.minSpend}
                  </td>
                  <td className="py-4 text-sm text-slate-600">
                    {voucher.expiry}
                  </td>
                  <td className="py-4">
                    <Badge variant={statusColors[voucher.status]} dot>
                      {voucher.status.charAt(0).toUpperCase() +
                        voucher.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600">
                        <Icon icon="solar:pen-linear" width={16} />
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-danger-50 hover:text-danger-600">
                        <Icon icon="solar:trash-bin-trash-linear" width={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Voucher Modal */}
      <Modal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        title="Create New Voucher"
        description="Set up a new promotional voucher code."
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Voucher Code" placeholder="e.g. SUMMER25" />
            <Input label="Name" placeholder="Summer Sale" />
          </div>
          <Input label="Description" placeholder="Brief description..." />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Discount Value" placeholder="25" type="number" />
            <Input label="Min Spend ($)" placeholder="100" type="number" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Usage Quota" placeholder="500" type="number" />
            <Input label="Expiry Date" type="date" />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button>Create Voucher</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
