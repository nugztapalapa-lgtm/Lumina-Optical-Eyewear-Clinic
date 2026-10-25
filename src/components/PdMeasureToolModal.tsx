import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface PdMeasureToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePd?: (pd: number) => void;
}

export const PdMeasureToolModal: React.FC<PdMeasureToolModalProps> = ({
  isOpen,
  onClose,
  onSavePd,
}) => {
  if (!isOpen) return null;

  const [testPd, setTestPd] = useState(63);

  const handleApply = () => {
    if (onSavePd) onSavePd(testPd);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pd-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 dark:bg-black/75 backdrop-blur-xs overflow-y-auto"
    >
      <div className="bg-white dark:bg-stone-900 w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-auto max-h-[90vh] flex flex-col text-stone-900 dark:text-stone-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-teal-800 dark:text-teal-400" />
            <h2 id="pd-modal-title" className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100">
              How to Measure Your Pupillary Distance (PD)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200/60 dark:hover:bg-stone-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 text-xs text-stone-700 dark:text-stone-300 flex-1">
          <div className="p-4 bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl space-y-1">
            <p className="font-semibold text-teal-900 dark:text-teal-200">What is Pupillary Distance?</p>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              Your PD is the distance in millimeters between the centers of your two pupils. 
              It guarantees that the optical center of each lens aligns perfectly with your visual axis, eliminating strain and distortion.
            </p>
          </div>

          {/* 3 Step Guide */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
              3-Step Mirror & Ruler Method:
            </h3>

            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-stone-900 dark:bg-teal-800 text-white font-bold flex items-center justify-center text-[11px] shrink-0">
                  1
                </span>
                <div>
                  <strong className="block text-stone-900 dark:text-stone-100">Stand 8 inches in front of a mirror</strong>
                  <span className="text-stone-600 dark:text-stone-400">
                    Hold a standard millimeter ruler flat against your browbone.
                  </span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-stone-900 dark:bg-teal-800 text-white font-bold flex items-center justify-center text-[11px] shrink-0">
                  2
                </span>
                <div>
                  <strong className="block text-stone-900 dark:text-stone-100">Align 0mm with your right pupil center</strong>
                  <span className="text-stone-600 dark:text-stone-400">
                    Close your left eye, look straight ahead into the mirror, and slide the 0mm mark over your right pupil center.
                  </span>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="w-6 h-6 rounded-full bg-stone-900 dark:bg-teal-800 text-white font-bold flex items-center justify-center text-[11px] shrink-0">
                  3
                </span>
                <div>
                  <strong className="block text-stone-900 dark:text-stone-100">Read the millimeter mark on your left pupil</strong>
                  <span className="text-stone-600 dark:text-stone-400">
                    Open your left eye and close your right. Note the number directly over your left pupil. That is your PD!
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive PD Calibrator */}
          <div className="p-4 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl space-y-3">
            <label className="block font-semibold text-stone-900 dark:text-stone-100">
              Select or test your measurement:
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="54"
                max="74"
                value={testPd}
                onChange={(e) => setTestPd(Number(e.target.value))}
                className="flex-1 accent-teal-800 dark:accent-teal-500 cursor-pointer"
              />
              <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-base w-16 text-right tabular-nums">
                {testPd} mm
              </span>
            </div>

            {/* Typical ranges */}
            <div className="grid grid-cols-3 gap-2 text-[11px] text-stone-500 dark:text-stone-400 pt-1 text-center">
              <div className="bg-white dark:bg-stone-900 p-2 rounded border border-stone-200 dark:border-stone-800">
                <span className="block text-stone-400">Women Average</span>
                <strong className="text-stone-800 dark:text-stone-200">62 mm</strong>
              </div>
              <div className="bg-white dark:bg-stone-900 p-2 rounded border border-stone-200 dark:border-stone-800">
                <span className="block text-stone-400">Men Average</span>
                <strong className="text-stone-800 dark:text-stone-200">64 mm</strong>
              </div>
              <div className="bg-white dark:bg-stone-900 p-2 rounded border border-stone-200 dark:border-stone-800">
                <span className="block text-stone-400">Adult Range</span>
                <strong className="text-stone-800 dark:text-stone-200">58–68 mm</strong>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 dark:text-stone-400 italic">
            *Need an exact measurement? Visit Lumina Optical clinic in Willow Glen anytime for a free 60-second digital pupillometer scan.
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 text-xs font-medium cursor-pointer"
          >
            Close Guide
          </button>
          <button
            onClick={handleApply}
            className="px-5 py-2 text-xs font-semibold text-white bg-teal-900 dark:bg-teal-700 hover:bg-teal-950 dark:hover:bg-teal-600 rounded-lg cursor-pointer"
          >
            Use {testPd} mm for My Lenses
          </button>
        </div>
      </div>
    </div>
  );
};
