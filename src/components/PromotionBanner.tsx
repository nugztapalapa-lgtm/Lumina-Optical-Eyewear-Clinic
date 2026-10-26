import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface PromotionBannerProps {
  onApplyPromo?: (code: string) => void;
}

export const PromotionBanner: React.FC<PromotionBannerProps> = ({ onApplyPromo }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (isDismissed) return null;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('KROSTELL26');
    setCopied(true);
    if (onApplyPromo) onApplyPromo('KROSTELL26');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <aside aria-label="Promosi Musiman Krostell" className="relative bg-stone-900 text-stone-100 text-xs py-2 px-4 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto overflow-hidden text-center sm:text-left">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 hidden sm:inline" />
          <p className="truncate">
            <strong className="font-semibold text-white">Promo Spesial Krostell Optik:</strong> Potongan Rp 250.000 + Gratis Lapisan BlueGuard™ dengan kode{' '}
            <button
              onClick={handleCopyCode}
              title="Klik untuk menyalin kode promo"
              className="inline-flex items-center gap-1 font-mono font-bold text-amber-300 hover:text-amber-200 underline underline-offset-2 ml-1 cursor-pointer"
            >
              KROSTELL26
            </button>
            {copied && <span className="text-emerald-400 ml-1.5 font-medium">(Kode disalin!)</span>}
            <span className="hidden md:inline text-stone-400 ml-2">· Di Klinik & Online · Klaim Asuransi Tersedia</span>
          </p>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          aria-label="Tutup promo"
          className="text-stone-400 hover:text-stone-200 p-1 rounded transition-colors shrink-0 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
