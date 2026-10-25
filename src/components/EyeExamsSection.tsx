import React from 'react';
import { CLINIC_SERVICES } from '../data/mockOpticalData';
import { Calendar, Clock, ShieldCheck } from 'lucide-react';

interface EyeExamsSectionProps {
  onBookService: (serviceId: string) => void;
}

export const EyeExamsSection: React.FC<EyeExamsSectionProps> = ({ onBookService }) => {
  return (
    <section id="exams" className="py-16 md:py-24 bg-stone-50 dark:bg-stone-900/40 border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 dark:border-stone-800 pb-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-teal-800 dark:text-teal-400 font-semibold">
              Clinical Optometry
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 dark:text-stone-100 tracking-tight">
              Comprehensive Eye Care & Frame Fittings
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-xl">
              An eye exam is more than just reading letters off a chart. We screen for early signs of glaucoma, 
              macular degeneration, diabetic retinopathy, and subtle ocular surface imbalances.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
            <ShieldCheck className="w-4 h-4 text-teal-800 dark:text-teal-400" />
            <span>Direct insurance claims billed for VSP, EyeMed & Medicare</span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLINIC_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-stone-900 rounded-xl p-6 border border-stone-200 dark:border-stone-800 shadow-2xs flex flex-col justify-between space-y-5 hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.duration}</span>
                  </div>
                  <span className="font-bold text-stone-900 dark:text-stone-100 text-sm tabular-nums">
                    {service.price === 0 ? 'Complimentary' : `$${service.price}`}
                  </span>
                </div>

                <h3 className="font-serif font-semibold text-lg text-stone-900 dark:text-stone-100">
                  {service.title}
                </h3>

                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <span className="text-[11px] text-teal-800 dark:text-teal-400 font-medium">
                  {service.coveredByInsurance ? 'Insurance Eligible' : 'In-Clinic Service'}
                </span>

                <button
                  onClick={() => onBookService(service.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-stone-900 dark:text-stone-100 bg-stone-100 dark:bg-stone-800 hover:bg-stone-900 hover:text-white dark:hover:bg-teal-800 rounded-lg transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Visit</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Exam Protocol Detail */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-base">
              1. Digital Wavefront Refraction
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              We capture over 1,500 data points across your cornea to identify higher-order aberrations, guaranteeing 20/20 clarity without night halos.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-base">
              2. Optomap Ultra-Widefield Scan
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              View up to 82% of your retina in a single 0.25-second digital capture—frequently eliminating the need for uncomfortable dilating eye drops.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-serif font-semibold text-stone-900 dark:text-stone-100 text-base">
              3. Custom Anatomical Frame Fit
            </h4>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Our master opticians sculpt the temple curve, adjust nose pads, and balance bridge distribution so your glasses never slip down your nose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
