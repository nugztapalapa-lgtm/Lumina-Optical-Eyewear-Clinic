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
    navigator.clipboard?.writeText('AUTUMN26');
    setCopied(true);
    if (onApplyPromo) onApplyPromo('AUTUMN26');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <aside aria-label="Seasonal Promotion" className="relative bg-stone-900 text-stone-100 text-xs py-2 px-4 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto overflow-hidden text-center sm:text-left">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 hidden sm:inline" />
          <p className="truncate">
            <strong className="font-semibold text-white">Autumn Vision Special:</strong> Complete prescription pairs from $139 + Free BlueGuard™ Coating with code{' '}
            <button
              onClick={handleCopyCode}
              title="Click to copy promo code"
              className="inline-flex items-center gap-1 font-mono font-bold text-amber-300 hover:text-amber-200 underline underline-offset-2 ml-1 cursor-pointer"
            >
              AUTUMN26
            </button>
            {copied && <span className="text-emerald-400 ml-1.5 font-medium">(Code copied!)</span>}
            <span className="hidden md:inline text-stone-400 ml-2">· In-Clinic & Online · Direct Insurance Accepted</span>
          </p>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss banner"
          className="text-stone-400 hover:text-stone-200 p-1 rounded transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
