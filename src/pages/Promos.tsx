import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { FormattedMessage, useIntl } from "react-intl";
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
    code: "LEBARAN50",
    name: "Diskon Lebaran",
    description: "Diskon 50% untuk pemesanan pertama",
    type: "percentage",
    value: 50,
    minSpend: 1600000,
    maxDiscount: 1200000,
    used: 234,
    quota: 500,
    expiry: "2026-04-10",
    status: "active",
  },
  {
    id: "2",
    code: "LIBURAN400K",
    name: "Promo Liburan",
    description: "Potongan Rp 400.000 untuk penerbangan domestik",
    type: "fixed",
    value: 400000,
    minSpend: 2400000,
    maxDiscount: null,
    used: 89,
    quota: 200,
    expiry: "2026-06-30",
    status: "active",
  },
  {
    id: "3",
    code: "NATARU10",
    name: "Spesial Natal Tahun Baru",
    description: "Diskon 10% penerbangan internasional",
    type: "percentage",
    value: 10,
    minSpend: 4800000,
    maxDiscount: 1600000,
    used: 500,
    quota: 500,
    expiry: "2026-01-15",
    status: "expired",
  },
  {
    id: "4",
    code: "WEEKEND20",
    name: "Weekend Getaway",
    description: "Diskon 20% keberangkatan akhir pekan",
    type: "percentage",
    value: 20,
    minSpend: 3200000,
    maxDiscount: 800000,
    used: 45,
    quota: 100,
    expiry: "2026-12-31",
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
  const intl = useIntl();

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            <FormattedMessage id="promos.title" />
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            <FormattedMessage id="promos.subtitle" />
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Icon icon="solar:export-linear" width={18} />
            <FormattedMessage id="common.export" />
          </Button>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Icon icon="solar:add-circle-linear" width={18} />
            <FormattedMessage id="promos.createVoucher" />
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
              <p className="text-xs text-slate-400">
                <FormattedMessage id="promos.activeVouchers" />
              </p>
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
              <p className="text-xs text-slate-400">
                <FormattedMessage id="promos.redemptions" />
              </p>
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
              <p className="text-xs text-slate-400">
                <FormattedMessage id="promos.totalDiscount" />
              </p>
              <p className="text-xl font-bold text-slate-900">Rp 393.280.000</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning-50 text-warning-500">
              <Icon icon="solar:clock-circle-linear" width={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">
                <FormattedMessage id="promos.expiringSoon" />
              </p>
              <p className="text-xl font-bold text-slate-900">3</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Voucher Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            <FormattedMessage id="promos.allVouchers" />
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Icon
                icon="solar:magnifer-linear"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                width={16}
              />
              <input
                type="text"
                placeholder={intl.formatMessage({
                  id: "promos.searchPlaceholder",
                })}
                className="h-9 w-48 rounded-lg bg-slate-50 pl-9 pr-3 text-sm outline-none"
              />
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="pb-3">
                  <FormattedMessage id="promos.code" />
                </th>
                <th className="pb-3">
                  <FormattedMessage id="promos.discount" />
                </th>
                <th className="pb-3">
                  <FormattedMessage id="promos.usage" />
                </th>
                <th className="pb-3">
                  <FormattedMessage id="promos.minSpend" />
                </th>
                <th className="pb-3">
                  <FormattedMessage id="promos.expiry" />
                </th>
                <th className="pb-3">
                  <FormattedMessage id="common.status" />
                </th>
                <th className="pb-3 text-right">
                  <FormattedMessage id="common.actions" />
                </th>
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
                        : `Rp ${voucher.value.toLocaleString("id-ID")}`}
                    </span>
                    {voucher.maxDiscount && (
                      <p className="text-xs text-slate-400">
                        Max Rp {voucher.maxDiscount.toLocaleString("id-ID")}
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
                    Rp {voucher.minSpend.toLocaleString("id-ID")}
                  </td>
                  <td className="py-4 text-sm text-slate-600">
                    {voucher.expiry}
                  </td>
                  <td className="py-4">
                    <Badge variant={statusColors[voucher.status]} dot>
                      {intl.formatMessage({
                        id: `promos.status.${voucher.status}`,
                      })}
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
        title={intl.formatMessage({ id: "promos.createVoucherTitle" })}
        description={intl.formatMessage({ id: "promos.createVoucherDesc" })}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={intl.formatMessage({ id: "promos.voucherCode" })}
              placeholder="e.g. SUMMER25"
            />
            <Input
              label={intl.formatMessage({ id: "promos.name" })}
              placeholder="Summer Sale"
            />
          </div>
          <Input
            label={intl.formatMessage({ id: "promos.description" })}
            placeholder={intl.formatMessage({ id: "promos.descPlaceholder" })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={intl.formatMessage({ id: "promos.discountValue" })}
              placeholder="25"
              type="number"
            />
            <Input
              label={intl.formatMessage({ id: "promos.minSpendLabel" })}
              placeholder="1.000.000"
              type="number"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={intl.formatMessage({ id: "promos.usageQuota" })}
              placeholder="500"
              type="number"
            />
            <Input
              label={intl.formatMessage({ id: "promos.expiryDate" })}
              type="date"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              <FormattedMessage id="common.cancel" />
            </Button>
            <Button>
              <FormattedMessage id="promos.createVoucher" />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
