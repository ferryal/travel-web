import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePricingStore } from "@/stores/usePricingStore";
import { Modal, Input, Select, Button } from "@/components/ui";
import type { PricingRule } from "@/types";

const airlines = [
  { value: "", label: "All Airlines" },
  { value: "Garuda Indonesia", label: "Garuda Indonesia" },
  { value: "Citilink", label: "Citilink" },
  { value: "Lion Air", label: "Lion Air" },
  { value: "AirAsia", label: "AirAsia" },
  { value: "Batik Air", label: "Batik Air" },
];

const airports = [
  { value: "", label: "Any" },
  { value: "CGK", label: "CGK - Jakarta" },
  { value: "DPS", label: "DPS - Bali" },
  { value: "SUB", label: "SUB - Surabaya" },
  { value: "SIN", label: "SIN - Singapore" },
  { value: "KUL", label: "KUL - Kuala Lumpur" },
  { value: "HKG", label: "HKG - Hong Kong" },
];

const markupTypes = [
  { value: "PERCENTAGE", label: "Percentage (%)" },
  { value: "FIXED", label: "Fixed Amount (IDR)" },
];

interface RuleFormData {
  name: string;
  airline: string;
  origin: string;
  destination: string;
  markupType: "PERCENTAGE" | "FIXED";
  markupValue: number;
  isActive: boolean;
}

const defaultFormData: RuleFormData = {
  name: "",
  airline: "",
  origin: "",
  destination: "",
  markupType: "PERCENTAGE",
  markupValue: 0,
  isActive: true,
};

export function PricingRules() {
  const { rules, addRule, updateRule, deleteRule, toggleRule } =
    usePricingStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<PricingRule | null>(null);
  const [formData, setFormData] = useState<RuleFormData>(defaultFormData);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const activeRules = rules.filter((r) => r.isActive).length;
  const avgMarkup =
    rules.length > 0
      ? (
          rules.reduce(
            (sum, r) =>
              sum + (r.markupType === "PERCENTAGE" ? r.markupValue : 0),
            0,
          ) / rules.filter((r) => r.markupType === "PERCENTAGE").length || 0
        ).toFixed(1)
      : "0";

  const handleOpenModal = (rule?: PricingRule) => {
    if (rule) {
      setEditingRule(rule);
      setFormData({
        name: rule.name,
        airline: rule.airline || "",
        origin: rule.origin || "",
        destination: rule.destination || "",
        markupType: rule.markupType,
        markupValue: rule.markupValue,
        isActive: rule.isActive,
      });
    } else {
      setEditingRule(null);
      setFormData(defaultFormData);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ruleData = {
      name: formData.name,
      airline: formData.airline || undefined,
      origin: formData.origin || undefined,
      destination: formData.destination || undefined,
      markupType: formData.markupType,
      markupValue: formData.markupValue,
      isActive: formData.isActive,
    };

    if (editingRule) {
      updateRule(editingRule.id, ruleData);
    } else {
      addRule(ruleData);
    }

    setIsModalOpen(false);
    setFormData(defaultFormData);
    setEditingRule(null);
  };

  const handleDelete = (id: string) => {
    deleteRule(id);
    setDeleteConfirmId(null);
  };

  const formatMarkupValue = (rule: PricingRule) => {
    if (rule.markupType === "PERCENTAGE") {
      return `${rule.markupValue}%`;
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(rule.markupValue);
  };

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Pricing Rules
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure markup pricing for flight routes and airlines.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:-translate-y-0.5 hover:bg-slate-800"
        >
          <Icon icon="solar:add-circle-linear" width={18} />
          Add New Rule
        </button>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[24px] bg-white p-6 shadow-[0px_2px_15px_-3px_rgba(0,0,0,0.03)]"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
              <Icon icon="solar:tag-price-linear" width={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Rules</p>
              <p className="text-2xl font-bold text-slate-900">
                {rules.length}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-[24px] bg-white p-6 shadow-[0px_2px_15px_-3px_rgba(0,0,0,0.03)]"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success-50 text-success-600">
              <Icon icon="solar:check-circle-linear" width={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Active Rules</p>
              <p className="text-2xl font-bold text-slate-900">{activeRules}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-[24px] bg-white p-6 shadow-[0px_2px_15px_-3px_rgba(0,0,0,0.03)]"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning-50 text-warning-500">
              <Icon icon="solar:chart-linear" width={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Avg. Markup</p>
              <p className="text-2xl font-bold text-slate-900">{avgMarkup}%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rules Table Header */}
      <div className="mb-4 hidden grid-cols-12 gap-4 px-6 text-xs font-semibold uppercase tracking-wider text-slate-400 lg:grid">
        <div className="col-span-3">Rule Name</div>
        <div className="col-span-2">Airline</div>
        <div className="col-span-2">Route</div>
        <div className="col-span-2">Markup</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* Rules List */}
      <AnimatePresence mode="popLayout">
        {rules.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-[24px] bg-white p-12 text-center shadow-[0px_2px_15px_-3px_rgba(0,0,0,0.03)]"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50">
              <Icon
                icon="solar:tag-price-linear"
                width={32}
                className="text-slate-300"
              />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              No pricing rules yet
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Create your first pricing rule to start adding markup to flights.
            </p>
            <button
              onClick={() => handleOpenModal()}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              <Icon icon="solar:add-circle-linear" width={18} />
              Add Rule
            </button>
          </motion.div>
        ) : (
          rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.05 }}
              className={`group relative mb-4 grid grid-cols-1 items-center gap-4 rounded-[24px] bg-white p-5 shadow-[0px_2px_15px_-3px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0px_10px_40px_-3px_rgba(0,0,0,0.05)] lg:grid-cols-12 lg:gap-4 lg:p-6 ${
                !rule.isActive ? "opacity-60" : ""
              }`}
            >
              {/* Rule Name */}
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      rule.markupType === "PERCENTAGE"
                        ? "bg-primary-50 text-primary-600"
                        : "bg-success-50 text-success-600"
                    }`}
                  >
                    <Icon
                      icon={
                        rule.markupType === "PERCENTAGE"
                          ? "solar:percent-circle-linear"
                          : "solar:dollar-linear"
                      }
                      width={20}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{rule.name}</p>
                    <p className="text-xs text-slate-400">
                      {rule.markupType === "PERCENTAGE"
                        ? "Percentage"
                        : "Fixed Amount"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Airline */}
              <div className="lg:col-span-2">
                <p className="text-xs font-medium uppercase text-slate-400 lg:hidden">
                  Airline
                </p>
                <p className="text-sm font-medium text-slate-700">
                  {rule.airline || "All Airlines"}
                </p>
              </div>

              {/* Route */}
              <div className="lg:col-span-2">
                <p className="text-xs font-medium uppercase text-slate-400 lg:hidden">
                  Route
                </p>
                <p className="text-sm font-medium text-slate-700">
                  {rule.origin || rule.destination
                    ? `${rule.origin || "Any"} → ${rule.destination || "Any"}`
                    : "All Routes"}
                </p>
              </div>

              {/* Markup */}
              <div className="lg:col-span-2">
                <p className="text-xs font-medium uppercase text-slate-400 lg:hidden">
                  Markup
                </p>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold ${
                    rule.markupType === "PERCENTAGE"
                      ? "bg-primary-50 text-primary-600"
                      : "bg-success-50 text-success-600"
                  }`}
                >
                  {formatMarkupValue(rule)}
                </span>
              </div>

              {/* Status */}
              <div className="lg:col-span-1">
                <p className="text-xs font-medium uppercase text-slate-400 lg:hidden">
                  Status
                </p>
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    rule.isActive ? "bg-success-500" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 translate-y-0.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      rule.isActive ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 lg:col-span-2">
                <button
                  onClick={() => handleOpenModal(rule)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors hover:bg-primary-50 hover:text-primary-600"
                >
                  <Icon icon="solar:pen-linear" width={18} />
                </button>
                {deleteConfirmId === rule.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(rule.id)}
                      className="flex h-9 items-center gap-1 rounded-xl bg-danger-50 px-3 text-xs font-semibold text-danger-600 transition-colors hover:bg-danger-100"
                    >
                      <Icon icon="solar:check-circle-linear" width={16} />
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors hover:bg-slate-100"
                    >
                      <Icon icon="solar:close-circle-linear" width={18} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(rule.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors hover:bg-danger-50 hover:text-danger-600"
                  >
                    <Icon icon="solar:trash-bin-trash-linear" width={18} />
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </AnimatePresence>

      {/* Add/Edit Modal */}
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingRule ? "Edit Pricing Rule" : "Create Pricing Rule"}
        description={
          editingRule
            ? "Modify the pricing rule settings."
            : "Set up a new markup rule for flights."
        }
        className="max-w-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Rule Name"
            placeholder="e.g., Garuda Premium Markup"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Select
            label="Airline (Optional)"
            value={formData.airline}
            onValueChange={(value) =>
              setFormData({ ...formData, airline: value })
            }
            options={airlines}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Origin (Optional)"
              value={formData.origin}
              onValueChange={(value) =>
                setFormData({ ...formData, origin: value })
              }
              options={airports}
            />
            <Select
              label="Destination (Optional)"
              value={formData.destination}
              onValueChange={(value) =>
                setFormData({ ...formData, destination: value })
              }
              options={airports}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Markup Type"
              value={formData.markupType}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  markupType: value as "PERCENTAGE" | "FIXED",
                })
              }
              options={markupTypes}
            />
            <Input
              label={
                formData.markupType === "PERCENTAGE"
                  ? "Markup (%)"
                  : "Markup (IDR)"
              }
              type="number"
              placeholder={
                formData.markupType === "PERCENTAGE" ? "5" : "150000"
              }
              value={formData.markupValue.toString()}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  markupValue: parseFloat(e.target.value) || 0,
                })
              }
              required
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, isActive: !formData.isActive })
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                formData.isActive ? "bg-success-500" : "bg-slate-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 translate-y-0.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  formData.isActive ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className="text-sm font-medium text-slate-700">
              {formData.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingRule ? "Update Rule" : "Create Rule"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
