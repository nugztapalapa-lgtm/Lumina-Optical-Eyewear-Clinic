import React, { useState } from 'react';
import { LENS_OPTIONS, LENS_MATERIALS, AVAILABLE_COATINGS } from '../data/mockOpticalData';
import { ShieldCheck, Eye, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface LensTechnologySectionProps {
  onExploreFrames: () => void;
}

export const LensTechnologySection: React.FC<LensTechnologySectionProps> = ({ onExploreFrames }) => {
  const [activeCategory, setActiveCategory] = useState<'lenses' | 'materials' | 'coatings'>('lenses');

  return (
    <section id="lens-guide" className="py-16 md:py-24 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <span className="text-xs uppercase tracking-wider text-teal-800 dark:text-teal-400 font-semibold">
            Laboratory Precision
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 dark:text-stone-100 tracking-tight">
            Advanced Lens Technology & Wavefront Optics
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            The frame is the sculpture, but the lens is the vision engine. We manufacture your lenses 
            using high-definition digital surfacing that minimizes peripheral prismatic distortion.
          </p>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex border-b border-stone-200 dark:border-stone-800 gap-8 text-sm font-medium">
          <button
            onClick={() => setActiveCategory('lenses')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeCategory === 'lenses'
                ? 'border-teal-800 dark:border-teal-400 text-teal-950 dark:text-teal-300 font-semibold'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            Prescription Vision Profiles
          </button>
          <button
            onClick={() => setActiveCategory('materials')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeCategory === 'materials'
                ? 'border-teal-800 dark:border-teal-400 text-teal-950 dark:text-teal-300 font-semibold'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            Lens Index & Thickness Math
          </button>
          <button
            onClick={() => setActiveCategory('coatings')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${
              activeCategory === 'coatings'
                ? 'border-teal-800 dark:border-teal-400 text-teal-950 dark:text-teal-300 font-semibold'
                : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            Protective Nanocoatings
          </button>
        </div>

        {/* Tab 1: Vision Types */}
        {activeCategory === 'lenses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LENS_OPTIONS.map((opt) => (
              <div
                key={opt.id}
                className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-teal-800 dark:text-teal-400 uppercase tracking-wide">
                      {opt.price === 0 ? 'Base Inclusion' : `+$${opt.price}`}
                    </span>
                    <Eye className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                  </div>
                  <h3 className="font-serif font-semibold text-lg text-stone-900 dark:text-stone-100">{opt.name}</h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">{opt.subtitle}</p>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pt-1">{opt.description}</p>
                </div>

                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400">
                  <span className="font-semibold text-stone-700 dark:text-stone-300">Recommended for: </span>
                  {opt.idealFor}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Lens Index / Materials */}
        {activeCategory === 'materials' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LENS_MATERIALS.map((mat) => (
              <div
                key={mat.id}
                className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-teal-800 dark:text-teal-400">
                      {mat.price === 0 ? 'Standard ($0)' : `+$${mat.price}`}
                    </span>
                    <Layers className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                  </div>
                  <h3 className="font-serif font-semibold text-base text-stone-900 dark:text-stone-100">{mat.name}</h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">{mat.description}</p>
                </div>

                <div className="pt-3 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400">
                  <span className="font-semibold text-stone-700 dark:text-stone-300">Prescription Range: </span>
                  {mat.recommendedFor}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Nanocoatings */}
        {activeCategory === 'coatings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AVAILABLE_COATINGS.map((coating) => (
              <div
                key={coating.id}
                className="p-6 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-teal-800 dark:text-teal-400">
                      {coating.price === 0 ? 'Standard Free' : `+$${coating.price}`}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                  </div>
                  <h3 className="font-serif font-semibold text-base text-stone-900 dark:text-stone-100">
                    {coating.name}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">{coating.description}</p>
                </div>

                <div className="pt-2 text-[11px] text-teal-800 dark:text-teal-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span>Applied in Class-100 Cleanroom</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Clinical Quality Guarantee Strip */}
        <div className="p-6 bg-stone-100 dark:bg-stone-900 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-stone-200 dark:border-stone-800">
          <div className="space-y-1">
            <h4 className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-base">
              Need a personalized lens recommendation from our doctors?
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 max-w-xl">
              Bring your prescription or book an appointment. Our optometrists will measure your pantoscopic tilt, vertex distance, and exact visual axes.
            </p>
          </div>

          <button
            onClick={onExploreFrames}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 hover:bg-stone-800 dark:hover:bg-teal-700 rounded-lg cursor-pointer whitespace-nowrap"
          >
            <span>Choose Your Frame</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
