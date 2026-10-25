import React, { useState } from 'react';
import { ArrowRight, Calendar, CheckCircle2 } from 'lucide-react';
import { GlassesFrameSvg } from './GlassesFrameSvg';
import { FEATURED_FRAMES } from '../data/mockOpticalData';
import { FrameProduct, FrameShape } from '../types/optical';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onOpenBooking: () => void;
  onSelectProduct: (product: FrameProduct) => void;
  onOpenPdTool: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onOpenBooking,
  onSelectProduct,
  onOpenPdTool,
}) => {
  // Interactive preview frame
  const [selectedShape, setSelectedShape] = useState<FrameShape>('round');
  const activeFrame = FEATURED_FRAMES.find((f) => f.shape === selectedShape) || FEATURED_FRAMES[0];
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  const currentColor = activeFrame.colors[activeColorIndex] || activeFrame.colors[0];

  const handleShapeChange = (shape: FrameShape) => {
    setSelectedShape(shape);
    setActiveColorIndex(0);
  };

  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Grid: Left Hero Copy & Right Interactive Optical Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Welcoming Narrative & Direct CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-wider text-teal-800 dark:text-teal-400 font-semibold flex items-center gap-2">
              <span>Bespoke Eyewear</span>
              <span aria-hidden="true">·</span>
              <span>Doctor-Led Optometry</span>
              <span aria-hidden="true">·</span>
              <span>Willow Glen, CA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-stone-900 dark:text-stone-100 leading-[1.15] text-balance">
              Precision eye care, handcrafted frames tailored to your sight.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
              Welcome to Lumina Optical. We combine clinical optometry examinations with 
              artisanal prescription eyewear crafted from Japanese titanium and Italian acetate. 
              Enjoy clear vision with zero distortion, fitted by licensed optometrists.
            </p>

            {/* Direct Action Points */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-teal-900 hover:bg-teal-950 dark:bg-teal-800 dark:hover:bg-teal-700 rounded-lg shadow-sm active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Browse Prescription Frames</span>
                <ArrowRight className="w-4 h-4 text-teal-200" />
              </button>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                <span>Schedule Eye Exam</span>
              </button>
            </div>

            {/* Micro Trust Adjacency */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
                <span>VSP & EyeMed Accepted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
                <span>Doctor-Verified Rx</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0" />
                <span>2-Year Lens Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Optical Showcase Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-7 border border-stone-200 dark:border-stone-800 shadow-sm relative space-y-6 transition-colors">
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium">
                    Virtual Frame Bar
                  </span>
                  <h3 className="text-lg font-serif font-semibold text-stone-900 dark:text-stone-100">
                    {activeFrame.name}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 dark:text-stone-400">From</span>
                  <p className="text-lg font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                    ${activeFrame.basePrice}
                  </p>
                </div>
              </div>

              {/* Interactive Silhouette Selector */}
              <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg overflow-x-auto">
                {(['round', 'square', 'cat-eye', 'aviator'] as FrameShape[]).map((shape) => (
                  <button
                    key={shape}
                    onClick={() => handleShapeChange(shape)}
                    className={`flex-1 py-1.5 px-2.5 text-xs font-medium rounded-md capitalize transition-colors whitespace-nowrap cursor-pointer ${
                      selectedShape === shape
                        ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    {shape}
                  </button>
                ))}
              </div>

              {/* High-Fidelity SVG Glasses Canvas with Ambient Studio Background */}
              <div className="relative py-8 px-4 bg-gradient-to-b from-stone-50/80 to-stone-100/50 dark:from-stone-950/80 dark:to-stone-900/60 rounded-xl border border-stone-100 dark:border-stone-800 flex items-center justify-center min-h-[190px]">
                <GlassesFrameSvg
                  shape={selectedShape}
                  color={currentColor}
                  className="w-full max-w-[340px] drop-shadow-md transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Color Swatch & Optical Geometry */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-600 dark:text-stone-300 font-medium">Color: {currentColor.name}</span>
                  <div className="flex items-center gap-2">
                    {activeFrame.colors.map((color, idx) => (
                      <button
                        key={color.id}
                        onClick={() => setActiveColorIndex(idx)}
                        aria-label={`Select color ${color.name}`}
                        className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                          activeColorIndex === idx
                            ? 'border-teal-700 dark:border-teal-400 scale-110 shadow-xs'
                            : 'border-transparent hover:scale-105'
                        }`}
                        style={{
                          background: color.secondaryHex
                            ? `linear-gradient(135deg, ${color.hex} 0%, ${color.secondaryHex} 100%)`
                            : color.hex,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
                  <span>
                    Size: {activeFrame.dimensions.lensWidth}-{activeFrame.dimensions.bridgeWidth}-
                    {activeFrame.dimensions.templeLength} mm
                  </span>
                  <span>Weight: {activeFrame.weightGrams}g</span>
                  <span className="text-stone-700 dark:text-stone-300 font-medium">{activeFrame.material}</span>
                </div>
              </div>

              {/* Action buttons inside the card */}
              <div className="pt-1 grid grid-cols-2 gap-3">
                <button
                  onClick={() => onSelectProduct(activeFrame)}
                  className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-stone-800 dark:hover:bg-teal-700 rounded-lg text-center transition-colors cursor-pointer"
                >
                  Configure Lenses
                </button>
                <button
                  onClick={onOpenPdTool}
                  className="w-full py-2.5 px-3 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg text-center transition-colors cursor-pointer"
                >
                  Measure PD Guide
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Proof & Credibility Strip Below Hero */}
        <div className="mt-14 pt-8 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-800 dark:text-stone-200">
          <div>
            <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">15+</div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Years Local Clinic Care</div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 tabular-nums">4.9 ★</div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Over 620+ Verified Patients</div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Same-Day</div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Digital In-House Lens Edging</div>
          </div>
          <div>
            <div className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">100%</div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Prescription Accuracy Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
};
