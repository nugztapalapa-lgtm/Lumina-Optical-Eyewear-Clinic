import React, { useState } from 'react';
import { CartItem } from '../types/optical';
import { ACCEPTED_INSURANCES } from '../data/mockOpticalData';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Printer,
  CreditCard,
  Truck,
  Building,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedPromo: string;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedPromo,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  // Checkout Steps
  const [step, setStep] = useState<'shipping' | 'insurance' | 'payment' | 'completed'>('shipping');

  // Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState<'ship' | 'pickup'>('ship');

  // Customer Form
  const [fullName, setFullName] = useState('Jane Foster');
  const [email, setEmail] = useState('jane.foster@example.com');
  const [phone, setPhone] = useState('(408) 555-0144');
  const [address, setAddress] = useState('1420 Lincoln Ave');
  const [city, setCity] = useState('San Jose');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('95125');

  // Insurance Reimbursement
  const [claimInsurance, setClaimInsurance] = useState(true);
  const [insurancePlan, setInsurancePlan] = useState('VSP (Vision Service Plan)');
  const [memberId, setMemberId] = useState('VSP-9821408');

  // Payment Form
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('382');

  // Order Result
  const [orderId, setOrderId] = useState('');

  // Math
  const rawSubtotal = items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  const discountAmount = appliedPromo.toUpperCase() === 'AUTUMN26' ? 25 : 0;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setStep('completed');
    onOrderSuccess();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-xs overflow-y-auto"
    >
      <div className="bg-white dark:bg-stone-900 w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[92vh] flex flex-col text-stone-900 dark:text-stone-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-teal-800 dark:text-teal-400" />
            <h2 id="checkout-modal-title" className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100">
              Secure Optical Checkout
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Bar (if not completed) */}
        {step !== 'completed' && (
          <div className="grid grid-cols-3 border-b border-stone-200 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-950 text-[11px] font-medium text-stone-600 dark:text-stone-400">
            <div
              className={`py-2 px-3 text-center border-b-2 ${
                step === 'shipping'
                  ? 'border-teal-800 dark:border-teal-400 text-teal-900 dark:text-teal-300 font-bold bg-white dark:bg-stone-900'
                  : 'border-transparent'
              }`}
            >
              1. Delivery & Address
            </div>
            <div
              className={`py-2 px-3 text-center border-b-2 ${
                step === 'insurance'
                  ? 'border-teal-800 dark:border-teal-400 text-teal-900 dark:text-teal-300 font-bold bg-white dark:bg-stone-900'
                  : 'border-transparent'
              }`}
            >
              2. Vision Benefits & FSA
            </div>
            <div
              className={`py-2 px-3 text-center border-b-2 ${
                step === 'payment'
                  ? 'border-teal-800 dark:border-teal-400 text-teal-900 dark:text-teal-300 font-bold bg-white dark:bg-stone-900'
                  : 'border-transparent'
              }`}
            >
              3. Payment & Submit
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {step === 'shipping' && (
            <div className="space-y-5 text-xs">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
                <h3 className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  Select Delivery Preference
                </h3>
                <span className="text-stone-500 dark:text-stone-400">Free standard shipping on all prescription orders</span>
              </div>

              {/* Delivery method toggles */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('ship')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    deliveryMethod === 'ship'
                      ? 'border-teal-800 dark:border-teal-400 bg-teal-50/40 dark:bg-teal-950/40 text-stone-900 dark:text-stone-100 ring-1 ring-teal-700 dark:ring-teal-400'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold text-stone-900 dark:text-stone-100">
                    <Truck className="w-4 h-4 text-teal-800 dark:text-teal-400" />
                    <span>Free Home Delivery</span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                    Delivered in 4–6 business days after doctor verification
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                    deliveryMethod === 'pickup'
                      ? 'border-teal-800 dark:border-teal-400 bg-teal-50/40 dark:bg-teal-950/40 text-stone-900 dark:text-stone-100 ring-1 ring-teal-700 dark:ring-teal-400'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2 font-semibold text-stone-900 dark:text-stone-100">
                    <Building className="w-4 h-4 text-teal-800 dark:text-teal-400" />
                    <span>Clinic Pickup & Custom Fitting</span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                    Ready in 2–3 days at 428 Birchwood Ave with free optician fitting
                  </p>
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 pt-2">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100">Contact & Recipient Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Address (if shipping) */}
              {deliveryMethod === 'ship' && (
                <div className="space-y-3 pt-2">
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100">Shipping Street Address</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-3">
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Street Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">City</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">State</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep('insurance')}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-stone-800 dark:hover:bg-teal-700 rounded-lg cursor-pointer"
                >
                  Continue to Insurance & FSA →
                </button>
              </div>
            </div>
          )}

          {step === 'insurance' && (
            <div className="space-y-5 text-xs">
              <div className="space-y-1">
                <h3 className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  Vision Insurance Reimbursement & FSA / HSA
                </h3>
                <p className="text-stone-600 dark:text-stone-400">
                  Prescription glasses qualify for tax-free FSA and HSA spending. We generate a standardized CMS itemized invoice with optical CPT diagnosis codes.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 space-y-3">
                <label className="flex items-center gap-2 font-medium text-stone-900 dark:text-stone-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={claimInsurance}
                    onChange={(e) => setClaimInsurance(e.target.checked)}
                    className="rounded text-teal-800 focus:ring-teal-700"
                  />
                  <span>Generate Itemized Insurance & FSA/HSA Reimbursement Claim Invoice</span>
                </label>

                {claimInsurance && (
                  <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Vision Insurance Network</label>
                      <select
                        value={insurancePlan}
                        onChange={(e) => setInsurancePlan(e.target.value)}
                        className="w-full p-2 border border-stone-200 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:border-teal-700 focus:outline-none cursor-pointer"
                      >
                        {ACCEPTED_INSURANCES.map((ins) => (
                          <option key={ins} value={ins}>
                            {ins}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Member ID or Policy # (Optional)</label>
                      <input
                        type="text"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        placeholder="e.g. VSP-9821408"
                        className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                      />
                    </div>

                    <p className="text-[11px] text-teal-900 dark:text-teal-400 font-medium">
                      ✓ Our clinical billing department will cross-reference your out-of-network or in-network optical benefit allowance and mail/email your signed claim form.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="px-4 py-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer"
                >
                  ← Back to Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-stone-800 dark:hover:bg-teal-700 rounded-lg cursor-pointer"
                >
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePlaceOrder} className="space-y-5 text-xs">
              <div className="space-y-1">
                <h3 className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  Payment Method
                </h3>
                <p className="text-stone-600 dark:text-stone-400">
                  All transactions are encrypted with 256-bit SSL. FSA / HSA debit cards accepted.
                </p>
              </div>

              {/* Order total recap strip */}
              <div className="p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl space-y-1 text-stone-600 dark:text-stone-400">
                <div className="flex justify-between">
                  <span>Prescription Eyewear ({items.length} pairs)</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">${rawSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                    <span>Discount (AUTUMN26)</span>
                    <span className="font-semibold tabular-nums">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">Free</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 dark:text-stone-100 text-sm pt-1 border-t border-stone-200 dark:border-stone-800">
                  <span>Total Due Today</span>
                  <span className="tabular-nums">${grandTotal}</span>
                </div>
              </div>

              {/* Card inputs */}
              <div className="space-y-3 p-4 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-stone-800 dark:text-stone-200">
                    <CreditCard className="w-4 h-4 text-teal-800 dark:text-teal-400" />
                    <span>Credit / Debit / FSA / HSA Card</span>
                  </div>
                  <span className="text-[10px] text-stone-400 dark:text-stone-500 font-mono">Encrypted</span>
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg font-mono focus:border-teal-700 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg font-mono focus:border-teal-700 focus:outline-none text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">CVC Code</label>
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg font-mono focus:border-teal-700 focus:outline-none text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('insurance')}
                  className="px-4 py-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-teal-900 hover:bg-teal-950 dark:bg-teal-700 dark:hover:bg-teal-600 rounded-lg cursor-pointer shadow-xs"
                >
                  Authorize Payment (${grandTotal})
                </button>
              </div>
            </form>
          )}

          {step === 'completed' && (
            <div className="text-center py-6 space-y-6">
              <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-950/60 rounded-full border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-2xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-teal-800 dark:text-teal-400">
                  ORDER CONFIRMATION #{orderId}
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Thank you! Your order is being edged.
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md mx-auto">
                  A receipt and prescription verification update have been sent to{' '}
                  <strong className="text-stone-800 dark:text-stone-200">{email}</strong>.
                </p>
              </div>

              {/* Order Receipt Details */}
              <div className="max-w-md mx-auto bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl p-5 text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Order Number:</span>
                  <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">{orderId}</span>
                </div>

                <div className="space-y-1.5 border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400 block font-medium">Items Ordered:</span>
                  {items.map((i) => (
                    <div key={i.cartItemId} className="flex justify-between text-stone-800 dark:text-stone-200">
                      <span>
                        {i.quantity}x {i.product.name} ({i.selectedColor.name})
                      </span>
                      <span className="font-semibold tabular-nums">
                        ${i.totalPrice * i.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Delivery Preference:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {deliveryMethod === 'ship' ? `Ship to ${address}, ${city}` : 'Clinic Pickup at Willow Glen'}
                  </span>
                </div>

                <div className="flex justify-between text-stone-900 dark:text-stone-100 font-bold">
                  <span>Paid Total:</span>
                  <span className="tabular-nums">${grandTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-900 dark:text-stone-200 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 rounded-lg cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                  <span>Print Receipt / Claim Invoice</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-stone-800 dark:hover:bg-teal-700 rounded-lg cursor-pointer"
                >
                  Back to Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
