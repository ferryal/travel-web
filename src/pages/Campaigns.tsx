import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Button, Badge, Card, Modal, Input } from "@/components/ui";

const campaigns = [
  {
    id: "1",
    name: "Summer Travel Fest",
    description: "Big summer discounts on all routes",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    budget: 50000,
    spent: 32450,
    vouchers: ["FLY50", "SUMMER25"],
    impressions: 125000,
    conversions: 3420,
    status: "active",
  },
  {
    id: "2",
    name: "New Year Flash Sale",
    description: "Limited time offers for new year trips",
    startDate: "2024-01-01",
    endDate: "2024-01-15",
    budget: 25000,
    spent: 25000,
    vouchers: ["NY2024", "FLASH20"],
    impressions: 89000,
    conversions: 2100,
    status: "completed",
  },
  {
    id: "3",
    name: "Business Class Promo",
    description: "Upgrade to business class at economy prices",
    startDate: "2024-04-01",
    endDate: "2024-04-30",
    budget: 30000,
    spent: 0,
    vouchers: ["BIZ50"],
    impressions: 0,
    conversions: 0,
    status: "scheduled",
  },
];

const statusColors: Record<string, "success" | "info" | "warning" | "default"> =
  {
    active: "success",
    completed: "default",
    scheduled: "info",
    paused: "warning",
  };

export function Campaigns() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Campaign Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Plan and track marketing campaigns and their performance.
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Icon icon="solar:add-circle-linear" width={18} />
          Create Campaign
        </Button>
      </div>

      {/* Stats Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-50 text-success-600">
              <Icon icon="solar:play-circle-linear" width={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Active Campaigns</p>
              <p className="text-xl font-bold text-slate-900">3</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Icon icon="solar:eye-linear" width={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Impressions</p>
              <p className="text-xl font-bold text-slate-900">214K</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600">
              <Icon icon="solar:graph-up-linear" width={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Conversion Rate</p>
              <p className="text-xl font-bold text-slate-900">2.8%</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger-50 text-danger-600">
              <Icon icon="solar:dollar-linear" width={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Spend</p>
              <p className="text-xl font-bold text-slate-900">$57.4K</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="h-full">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      {campaign.name}
                    </h3>
                    <Badge variant={statusColors[campaign.status]}>
                      {campaign.status.charAt(0).toUpperCase() +
                        campaign.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {campaign.description}
                  </p>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600">
                  <Icon icon="solar:menu-dots-bold" width={20} />
                </button>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                <Icon icon="solar:calendar-linear" width={14} />
                <span>
                  {campaign.startDate} - {campaign.endDate}
                </span>
              </div>

              {/* Budget Progress */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Budget</span>
                  <span className="font-medium text-slate-900">
                    ${campaign.spent.toLocaleString()} / $
                    {campaign.budget.toLocaleString()}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-primary-600"
                    style={{
                      width: `${(campaign.spent / campaign.budget) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-400">Impressions</p>
                  <p className="text-lg font-bold text-slate-900">
                    {campaign.impressions.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Conversions</p>
                  <p className="text-lg font-bold text-slate-900">
                    {campaign.conversions.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Vouchers */}
              <div className="mt-4 flex flex-wrap gap-2">
                {campaign.vouchers.map((code) => (
                  <span
                    key={code}
                    className="rounded-lg bg-slate-50 px-2 py-1 font-mono text-xs text-slate-600"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Add Campaign Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: campaigns.length * 0.1 }}
          onClick={() => setIsCreateOpen(true)}
          className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center transition-colors hover:bg-slate-50"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
            <Icon
              icon="solar:add-circle-linear"
              width={28}
              className="text-slate-400"
            />
          </div>
          <h3 className="text-lg font-bold text-slate-900">New Campaign</h3>
          <p className="text-sm text-slate-400">
            Create a new marketing campaign
          </p>
        </motion.div>
      </div>

      {/* Create Campaign Modal */}
      <Modal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        title="Create New Campaign"
        description="Set up a new marketing campaign."
      >
        <div className="space-y-4">
          <Input label="Campaign Name" placeholder="e.g. Summer Travel Fest" />
          <Input label="Description" placeholder="Brief description..." />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" />
            <Input label="End Date" type="date" />
          </div>
          <Input label="Budget ($)" placeholder="10000" type="number" />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button>Create Campaign</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
