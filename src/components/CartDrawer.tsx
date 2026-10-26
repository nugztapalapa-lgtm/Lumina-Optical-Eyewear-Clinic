import React, { useState } from 'react';
import { CartItem } from '../types/optical';
import { GlassesFrameSvg } from './GlassesFrameSvg';
import { formatRupiah } from '../data/mockOpticalData';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
}) => {
  const [promoInput, setPromoInput] = useState(appliedPromo);
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  const discountAmount = appliedPromo.toUpperCase() === 'KROSTELL26' ? 250000 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoInput.trim().toUpperCase();
    if (clean === 'KROSTELL26') {
      onApplyPromo('KROSTELL26');
      setPromoError('');
    } else {
      setPromoError('Kupon tidak valid. Coba KROSTELL26 untuk potongan Rp 250.000.');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/50 dark:bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-stone-900 shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
            <h2 id="cart-drawer-title" className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100">
              Tas Belanja ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-3 text-stone-500 dark:text-stone-400 text-xs">
                <p className="text-sm font-medium text-stone-700 dark:text-stone-300">Tas belanja Anda masih kosong.</p>
                <p>Jelajahi koleksi kacamata buatan tangan kami dan sesuaikan lensa resep Anda.</p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-stone-800 dark:hover:bg-teal-700 rounded-lg cursor-pointer"
                >
                  Jelajahi Koleksi
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/60 space-y-3 text-xs"
                  >
                    {/* Top Row: Mini preview and details */}
                    <div className="flex gap-3">
                      <div className="w-20 h-16 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 p-1 flex items-center justify-center shrink-0">
                        <GlassesFrameSvg
                          shape={item.product.shape}
                          color={item.selectedColor}
                          className="w-full"
                          showLensReflection={false}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif font-semibold text-sm text-stone-900 dark:text-stone-100 truncate">
                            {item.product.name}
                          </h4>
                          <span className="font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                            {formatRupiah(item.totalPrice * item.quantity)}
                          </span>
                        </div>

                        <p className="text-stone-500 dark:text-stone-400 text-[11px]">
                          Warna: {item.selectedColor.name}
                        </p>
                        <p className="text-stone-700 dark:text-stone-300 font-medium text-[11px] capitalize">
                          Lensa: {item.lensType.replace('-', ' ')}
                        </p>
                      </div>
                    </div>

                    {/* Prescription Details (if applicable) */}
                    {item.prescription && (
                      <div className="p-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-[11px] text-stone-600 dark:text-stone-400 space-y-1">
                        <div className="font-semibold text-stone-800 dark:text-stone-200 flex justify-between">
                          <span>Spesifikasi Resep Dokter</span>
                          <span className="font-mono">PD: {item.prescription.pupillaryDistance}mm</span>
                        </div>
                        {item.prescription.rxMethod === 'manual' ? (
                          <div className="font-mono grid grid-cols-2 gap-1 text-[10px]">
                            <span>OD: SPH {item.prescription.odSphere} CYL {item.prescription.odCylinder} AXIS {item.prescription.odAxis}</span>
                            <span>OS: SPH {item.prescription.osSphere} CYL {item.prescription.osCylinder} AXIS {item.prescription.osAxis}</span>
                          </div>
                        ) : item.prescription.rxMethod === 'upload' ? (
                          <span className="text-teal-800 dark:text-teal-400 font-medium">Foto Terlampir: {item.prescription.uploadedFileName || 'Dokumen Resep'}</span>
                        ) : (
                          <span className="text-teal-800 dark:text-teal-400 font-medium">Menggunakan Rekam Medis Krostell Optik</span>
                        )}
                      </div>
                    )}

                    {/* Quantity controls and delete */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-800 overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 font-mono text-xs font-semibold tabular-nums text-stone-900 dark:text-stone-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-stone-400 hover:text-red-700 dark:hover:text-red-400 p-1 transition-colors cursor-pointer"
                        title="Hapus item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with promo and checkout action */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 space-y-4 text-xs">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromoCode} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Kode promo (contoh: KROSTELL26)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-xs uppercase text-stone-900 dark:text-stone-100 focus:border-teal-700 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 font-semibold text-stone-800 dark:text-stone-200 bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 rounded-lg cursor-pointer"
                  >
                    Gunakan
                  </button>
                </div>
                {appliedPromo && (
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                    Kode promo {appliedPromo} aktif (-{formatRupiah(discountAmount)})
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-600 dark:text-red-400 font-medium">{promoError}</p>
                )}
              </form>

              {/* Price summary */}
              <div className="space-y-1.5 pt-2 border-t border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">{formatRupiah(rawSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                    <span>Potongan Diskon (KROSTELL26)</span>
                    <span className="font-semibold tabular-nums">-{formatRupiah(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Pengiriman Standar Seluruh Indonesia</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">Gratis</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-stone-900 dark:text-stone-100 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <span>Estimasi Total</span>
                  <span className="tabular-nums">{formatRupiah(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-teal-900 dark:hover:bg-teal-700 rounded-lg transition-all cursor-pointer shadow-xs active:scale-[0.99]"
              >
                <span>Lanjut ke Pembayaran Aman</span>
                <ArrowRight className="w-4 h-4 text-teal-300" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-800 dark:text-teal-400" />
                <span>Enkripsi SSL 256-Bit · Termasuk Kwitansi Resmi Reimbursement Asuransi</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
