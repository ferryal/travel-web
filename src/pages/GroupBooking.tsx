import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Badge, Button, Input } from "@/components/ui";

const discountTiers = [
  { min: 10, max: 24, discount: 5, label: "10-24 passengers" },
  { min: 25, max: 49, discount: 10, label: "25-49 passengers" },
  { min: 50, max: 99, discount: 15, label: "50-99 passengers" },
  { min: 100, max: 500, discount: 20, label: "100+ passengers" },
];

const sampleFlights = [
  {
    id: "1",
    route: "LHR → DXB",
    airline: "Emirates",
    price: 450,
    seatsAvailable: 180,
  },
  {
    id: "2",
    route: "LHR → DXB",
    airline: "British Airways",
    price: 420,
    seatsAvailable: 145,
  },
  {
    id: "3",
    route: "LHR → DXB",
    airline: "Qatar Airways",
    price: 480,
    seatsAvailable: 200,
  },
];

const steps = [
  { id: 1, title: "Trip Details", icon: "solar:map-point-linear" },
  { id: 2, title: "Passengers", icon: "solar:users-group-rounded-linear" },
  { id: 3, title: "Flight Selection", icon: "solar:plane-linear" },
  { id: 4, title: "Preferences", icon: "solar:settings-linear" },
  { id: 5, title: "Payment", icon: "solar:card-linear" },
  { id: 6, title: "Confirmation", icon: "solar:check-circle-linear" },
];

export function GroupBooking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [passengerCount, setPassengerCount] = useState(25);
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);

  const getCurrentDiscount = () => {
    const tier = discountTiers.find(
      (t) => passengerCount >= t.min && passengerCount <= t.max,
    );
    return tier?.discount || 0;
  };

  const discount = getCurrentDiscount();
  const basePrice = selectedFlight
    ? sampleFlights.find((f) => f.id === selectedFlight)?.price || 450
    : 450;
  const discountedPrice = basePrice * (1 - discount / 100);
  const totalPrice = discountedPrice * passengerCount;

  const nextStep = () => currentStep < 6 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Group Booking Wizard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Book flights for large groups with volume discounts.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                  currentStep >= step.id
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-200"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                <Icon icon={step.icon} width={20} />
              </div>
              <span
                className={`mt-2 text-xs font-medium ${currentStep >= step.id ? "text-slate-900" : "text-slate-400"}`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 w-12 lg:w-20 ${currentStep > step.id ? "bg-primary-600" : "bg-slate-200"}`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {/* Step 1: Trip Details */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <h2 className="mb-6 text-lg font-bold text-slate-900">
                    Trip Details
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Origin"
                        placeholder="London (LHR)"
                        icon={<Icon icon="solar:map-point-linear" width={16} />}
                      />
                      <Input
                        label="Destination"
                        placeholder="Dubai (DXB)"
                        icon={<Icon icon="solar:map-point-linear" width={16} />}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Departure Date" type="date" />
                      <Input label="Return Date" type="date" />
                    </div>
                    <Input
                      label="Trip Purpose"
                      placeholder="e.g. Corporate Conference, Team Retreat"
                    />
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 2: Passengers */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <h2 className="mb-6 text-lg font-bold text-slate-900">
                    Passenger Count
                  </h2>
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Number of Passengers
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="500"
                      value={passengerCount}
                      onChange={(e) =>
                        setPassengerCount(Number(e.target.value))
                      }
                      className="w-full accent-primary-600"
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-slate-400">10</span>
                      <span className="text-2xl font-bold text-primary-600">
                        {passengerCount}
                      </span>
                      <span className="text-sm text-slate-400">500</span>
                    </div>
                  </div>

                  {/* Discount Tiers */}
                  <div className="mb-6">
                    <p className="mb-3 text-sm font-medium text-slate-700">
                      Volume Discount Tiers
                    </p>
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                      {discountTiers.map((tier) => (
                        <div
                          key={tier.label}
                          className={`rounded-xl p-3 text-center transition-all ${
                            passengerCount >= tier.min &&
                            passengerCount <= tier.max
                              ? "bg-success-50 ring-2 ring-success-500"
                              : "bg-slate-50"
                          }`}
                        >
                          <p className="text-lg font-bold text-success-600">
                            {tier.discount}% OFF
                          </p>
                          <p className="text-xs text-slate-500">{tier.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Passenger Upload */}
                  <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                    <Icon
                      icon="solar:upload-linear"
                      width={32}
                      className="mx-auto mb-2 text-slate-400"
                    />
                    <p className="text-sm font-medium text-slate-900">
                      Upload Passenger List
                    </p>
                    <p className="text-xs text-slate-400">
                      CSV or Excel file with names, emails, and passport details
                    </p>
                    <Button variant="outline" size="sm" className="mt-3">
                      Choose File
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 3: Flight Selection */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <h2 className="mb-6 text-lg font-bold text-slate-900">
                    Select Flight
                  </h2>
                  <div className="space-y-3">
                    {sampleFlights.map((flight) => (
                      <div
                        key={flight.id}
                        onClick={() => setSelectedFlight(flight.id)}
                        className={`cursor-pointer rounded-xl p-4 transition-all ${
                          selectedFlight === flight.id
                            ? "bg-primary-50 ring-2 ring-primary-500"
                            : "bg-slate-50 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                              <Icon
                                icon="solar:plane-linear"
                                width={24}
                                className="text-primary-600"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">
                                {flight.route}
                              </p>
                              <p className="text-xs text-slate-400">
                                {flight.airline}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-slate-900">
                              ${flight.price}
                            </p>
                            <p className="text-xs text-slate-400">
                              {flight.seatsAvailable} seats available
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 4: Preferences */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <h2 className="mb-6 text-lg font-bold text-slate-900">
                    Group Preferences
                  </h2>
                  <div className="space-y-4">
                    <div className="rounded-xl bg-slate-50 p-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Seat Together
                          </p>
                          <p className="text-xs text-slate-400">
                            Reserve adjacent seats for the group
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          className="h-5 w-5 accent-primary-600"
                          defaultChecked
                        />
                      </label>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Special Meals
                          </p>
                          <p className="text-xs text-slate-400">
                            Request dietary accommodations
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          className="h-5 w-5 accent-primary-600"
                        />
                      </label>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Priority Boarding
                          </p>
                          <p className="text-xs text-slate-400">
                            Group will board first
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          className="h-5 w-5 accent-primary-600"
                          defaultChecked
                        />
                      </label>
                    </div>
                    <Input
                      label="Special Requests"
                      placeholder="Any additional requirements..."
                    />
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 5: Payment */}
            {currentStep === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card>
                  <h2 className="mb-6 text-lg font-bold text-slate-900">
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    {[
                      {
                        id: "invoice",
                        label: "Invoice / PO",
                        desc: "Pay within NET 30 terms",
                        icon: "solar:document-text-linear",
                      },
                      {
                        id: "credit",
                        label: "Corporate Credit",
                        desc: "Use existing credit line",
                        icon: "solar:card-linear",
                      },
                      {
                        id: "transfer",
                        label: "Bank Transfer",
                        desc: "Wire transfer payment",
                        icon: "solar:bank-linear",
                      },
                    ].map((method) => (
                      <div
                        key={method.id}
                        className="flex cursor-pointer items-center gap-4 rounded-xl bg-slate-50 p-4 transition-colors hover:bg-slate-100"
                      >
                        <input
                          type="radio"
                          name="payment"
                          className="h-5 w-5 accent-primary-600"
                        />
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                          <Icon
                            icon={method.icon}
                            width={20}
                            className="text-slate-600"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {method.label}
                          </p>
                          <p className="text-xs text-slate-400">
                            {method.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Input
                      label="Purchase Order Number (Optional)"
                      placeholder="PO-2024-0001"
                    />
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Step 6: Confirmation */}
            {currentStep === 6 && (
              <motion.div
                key="step6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Card className="text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success-50">
                      <Icon
                        icon="solar:check-circle-bold"
                        width={48}
                        className="text-success-500"
                      />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Booking Confirmed!
                  </h2>
                  <p className="mt-2 text-slate-500">
                    Your group booking has been submitted for processing.
                  </p>
                  <div className="mt-6 rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-400">Booking Reference</p>
                    <p className="text-2xl font-bold text-primary-600">
                      GRP-2024-0847
                    </p>
                  </div>
                  <p className="mt-4 text-sm text-slate-400">
                    Confirmation email sent to your corporate account. Our team
                    will contact you within 24 hours.
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <Icon icon="solar:arrow-left-linear" width={18} />
              Previous
            </Button>
            {currentStep < 6 ? (
              <Button onClick={nextStep}>
                Next
                <Icon icon="solar:arrow-right-linear" width={18} />
              </Button>
            ) : (
              <Button>
                <Icon icon="solar:arrow-right-linear" width={18} />
                New Booking
              </Button>
            )}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              Booking Summary
            </h3>

            <div className="space-y-3 border-b border-slate-100 pb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Passengers</span>
                <span className="font-medium text-slate-900">
                  {passengerCount}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Base Price</span>
                <span className="font-medium text-slate-900">
                  ${basePrice}/person
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Volume Discount</span>
                <span className="font-medium text-success-600">
                  -{discount}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Discounted Price</span>
                <span className="font-medium text-slate-900">
                  ${discountedPrice.toFixed(2)}/person
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold text-slate-900">Total</span>
              <span className="text-2xl font-bold text-primary-600">
                ${totalPrice.toLocaleString()}
              </span>
            </div>

            <div className="mt-4">
              <Badge variant="success" className="w-full justify-center py-2">
                You save $
                {(basePrice * passengerCount - totalPrice).toLocaleString()}!
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
