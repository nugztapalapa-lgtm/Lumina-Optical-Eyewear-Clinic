import React, { useState } from 'react';
import { CartItem } from '../types/optical';
import { ACCEPTED_INSURANCES, formatRupiah } from '../data/mockOpticalData';
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
  const [fullName, setFullName] = useState('Budi Pratama');
  const [email, setEmail] = useState('budi.pratama@example.com');
  const [phone, setPhone] = useState('0812-3456-7890');
  const [address, setAddress] = useState('Jl. Senopati No. 88, Kebayoran Baru');
  const [city, setCity] = useState('Jakarta Selatan');
  const [state, setState] = useState('DKI Jakarta');
  const [zip, setZip] = useState('12190');

  // Insurance Reimbursement
  const [claimInsurance, setClaimInsurance] = useState(true);
  const [insurancePlan, setInsurancePlan] = useState('BPJS Kesehatan');
  const [memberId, setMemberId] = useState('BPJS-9821408');

  // Payment Form
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('382');

  // Order Result
  const [orderId, setOrderId] = useState('');

  // Math
  const rawSubtotal = items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  const discountAmount = appliedPromo.toUpperCase() === 'KROSTELL26' ? 250000 : 0;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `KROS-${Math.floor(100000 + Math.random() * 900000)}`;
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
              Pembayaran Aman Krostell Optik
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
              1. Pengiriman & Alamat
            </div>
            <div
              className={`py-2 px-3 text-center border-b-2 ${
                step === 'insurance'
                  ? 'border-teal-800 dark:border-teal-400 text-teal-900 dark:text-teal-300 font-bold bg-white dark:bg-stone-900'
                  : 'border-transparent'
              }`}
            >
              2. Asuransi & Reimbursement
            </div>
            <div
              className={`py-2 px-3 text-center border-b-2 ${
                step === 'payment'
                  ? 'border-teal-800 dark:border-teal-400 text-teal-900 dark:text-teal-300 font-bold bg-white dark:bg-stone-900'
                  : 'border-transparent'
              }`}
            >
              3. Pembayaran & Selesai
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {step === 'shipping' && (
            <div className="space-y-5 text-xs">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
                <h3 className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  Pilih Metode Pengiriman & Penerimaan
                </h3>
                <span className="text-stone-500 dark:text-stone-400">Gratis ongkos kirim ke seluruh Indonesia</span>
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
                    <span>Pengiriman Gratis ke Rumah</span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                    Dikirim dalam 3–5 hari kerja setelah verifikasi resep dokter spesialis mata
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
                    <span>Ambil di Butik Senopati & Fitting Gratis</span>
                  </div>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                    Siap dalam 1–2 hari di Jl. Senopati No. 88 lengkap dengan fitting ahli refraksionis optisi
                  </p>
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 pt-2">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100">Data Kontak & Penerima</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">Nomor WhatsApp / Telepon *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">Alamat Email *</label>
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
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100">Alamat Pengiriman</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-3">
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Alamat Jalan & Nomor Rumah</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Kota / Kabupaten</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Provinsi</label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Kode Pos</label>
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
                  Lanjut ke Klaim Asuransi →
                </button>
              </div>
            </div>
          )}

          {step === 'insurance' && (
            <div className="space-y-5 text-xs">
              <div className="space-y-1">
                <h3 className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  Klaim Asuransi Kesehatan & Reimbursement Perusahaan
                </h3>
                <p className="text-stone-600 dark:text-stone-400">
                  Kacamata resep memenuhi syarat penggantian biaya kesehatan dan tunjangan kacamata optik. Kami menerbitkan kuitansi berstempel resmi dengan rincian diagnosis dan spesifikasi lensa lengkap.
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
                  <span>Terbitkan Kuitansi & Formulir Resmi Klaim Reimbursement Asuransi</span>
                </label>

                {claimInsurance && (
                  <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
                    <div>
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Penyedia / Rekanan Asuransi</label>
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
                      <label className="block text-stone-600 dark:text-stone-400 mb-1">Nomor Polis / Kartu Peserta (Opsional)</label>
                      <input
                        type="text"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        placeholder="contoh: BPJS-9821408 atau MED-5501"
                        className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg focus:border-teal-700 focus:outline-none"
                      />
                    </div>

                    <p className="text-[11px] text-teal-900 dark:text-teal-400 font-medium">
                      ✓ Bagian administrasi medis Krostell Optik akan menyertakan kuitansi resmi berstempel dan rincian lensa standar untuk kemudahan pengajuan klaim ke instansi atau perusahaan asuransi Anda.
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
                  ← Kembali ke Pengiriman
                </button>
                <button
                  type="button"
                  onClick={() => setStep('payment')}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-stone-800 dark:hover:bg-teal-700 rounded-lg cursor-pointer"
                >
                  Lanjut ke Pembayaran →
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePlaceOrder} className="space-y-5 text-xs">
              <div className="space-y-1">
                <h3 className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-sm">
                  Metode Pembayaran
                </h3>
                <p className="text-stone-600 dark:text-stone-400">
                  Semua transaksi dilindungi dengan enkripsi SSL 256-bit standar industri perbankan.
                </p>
              </div>

              {/* Order total recap strip */}
              <div className="p-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl space-y-1 text-stone-600 dark:text-stone-400">
                <div className="flex justify-between">
                  <span>Kacamata Resep ({items.length} pasang)</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">{formatRupiah(rawSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                    <span>Potongan Diskon (KROSTELL26)</span>
                    <span className="font-semibold tabular-nums">-{formatRupiah(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pengiriman</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">Gratis</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 dark:text-stone-100 text-sm pt-1 border-t border-stone-200 dark:border-stone-800">
                  <span>Total Pembayaran Hari Ini</span>
                  <span className="tabular-nums">{formatRupiah(grandTotal)}</span>
                </div>
              </div>

              {/* Card inputs */}
              <div className="space-y-3 p-4 border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-stone-800 dark:text-stone-200">
                    <CreditCard className="w-4 h-4 text-teal-800 dark:text-teal-400" />
                    <span>Kartu Kredit / Debit / Virtual Account</span>
                  </div>
                  <span className="text-[10px] text-stone-400 dark:text-stone-500 font-mono">Terenkripsi</span>
                </div>

                <div>
                  <label className="block text-stone-600 dark:text-stone-400 mb-1">Nomor Kartu / Virtual Account</label>
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
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">Masa Berlaku (BB/TT)</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2 border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-lg font-mono focus:border-teal-700 focus:outline-none text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 dark:text-stone-400 mb-1">Kode Keamanan CVV</label>
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
                  ← Kembali
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-teal-900 hover:bg-teal-950 dark:bg-teal-700 dark:hover:bg-teal-600 rounded-lg cursor-pointer shadow-xs"
                >
                  Otorisasi Pembayaran ({formatRupiah(grandTotal)})
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
                  KONFIRMASI PESANAN #{orderId}
                </span>
                <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Terima kasih! Pesanan Anda sedang diproses.
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md mx-auto">
                  Kuitansi dan konfirmasi pemotongan lensa berpresisi tinggi telah dikirimkan ke{' '}
                  <strong className="text-stone-800 dark:text-stone-200">{email}</strong>.
                </p>
              </div>

              {/* Order Receipt Details */}
              <div className="max-w-md mx-auto bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl p-5 text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Nomor Pesanan:</span>
                  <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">{orderId}</span>
                </div>

                <div className="space-y-1.5 border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400 block font-medium">Item yang Dipesan:</span>
                  {items.map((i) => (
                    <div key={i.cartItemId} className="flex justify-between text-stone-800 dark:text-stone-200">
                      <span>
                        {i.quantity}x {i.product.name} ({i.selectedColor.name})
                      </span>
                      <span className="font-semibold tabular-nums">
                        {formatRupiah(i.totalPrice * i.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <span className="text-stone-500 dark:text-stone-400">Metode Penerimaan:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {deliveryMethod === 'ship' ? `Dikirim ke ${address}, ${city}` : 'Ambil di Butik Krostell Optik Senopati'}
                  </span>
                </div>

                <div className="flex justify-between text-stone-900 dark:text-stone-100 font-bold">
                  <span>Total yang Dibayar:</span>
                  <span className="tabular-nums">{formatRupiah(grandTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-stone-900 dark:text-stone-200 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 rounded-lg cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                  <span>Cetak Kuitansi / Faktur Klaim</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-stone-800 dark:hover:bg-teal-700 rounded-lg cursor-pointer"
                >
                  Kembali ke Toko
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
