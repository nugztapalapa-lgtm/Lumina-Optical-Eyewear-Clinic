import React from 'react';
import {
  CLINIC_INFO,
  CLINIC_DOCTORS,
  ACCEPTED_INSURANCES,
} from '../data/mockOpticalData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  ShieldCheck,
  Navigation,
} from 'lucide-react';

interface ClinicInfoSectionProps {
  onBookExam: () => void;
}

export const ClinicInfoSection: React.FC<ClinicInfoSectionProps> = ({ onBookExam }) => {
  // Compute today's day of week
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const todayName = daysOfWeek[new Date().getDay()];

  return (
    <section id="clinic" className="py-16 md:py-24 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-2">
          <span className="text-xs uppercase tracking-wider text-teal-800 dark:text-teal-400 font-semibold">
            Our Neighborhood Practice
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 dark:text-stone-100 tracking-tight">
            Independent Optometry & Bespoke Eyewear
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
            Located in the heart of Willow Glen for over 15 years, Lumina Optical brings 
            hospital-grade ocular diagnostics into an inviting neighborhood boutique.
          </p>
        </div>

        {/* 2-Column Split: Clinic Essentials & Doctors / Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Hours, Location & Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-stone-50 dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-5">
              <h3 className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-800 pb-3">
                Location & Direct Contact
              </h3>

              <div className="space-y-4 text-xs text-stone-700 dark:text-stone-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-teal-800 dark:text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 dark:text-stone-100 font-semibold">
                      {CLINIC_INFO.address}
                    </strong>
                    <span>{CLINIC_INFO.cityStateZip}</span>
                    <p className="text-stone-500 dark:text-stone-400 text-[11px] mt-1 flex items-center gap-1">
                      <Car className="w-3.5 h-3.5" />
                      {CLINIC_INFO.parking}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-teal-800 dark:text-teal-400 shrink-0" />
                  <div>
                    <span className="text-stone-500 dark:text-stone-400 mr-1.5">Phone:</span>
                    <a
                      href={`tel:${CLINIC_INFO.phone.replace(/[^0-9]/g, '')}`}
                      className="font-semibold text-stone-900 dark:text-stone-100 hover:text-teal-800 dark:hover:text-teal-400 underline underline-offset-2"
                    >
                      {CLINIC_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-teal-800 dark:text-teal-400 shrink-0" />
                  <div>
                    <span className="text-stone-500 dark:text-stone-400 mr-1.5">Email:</span>
                    <a
                      href={`mailto:${CLINIC_INFO.email}`}
                      className="font-medium text-stone-900 dark:text-stone-100 hover:text-teal-800 dark:hover:text-teal-400 underline underline-offset-2"
                    >
                      {CLINIC_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-medium text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg transition-colors cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span>Get Driving Directions</span>
                </a>
                <button
                  onClick={onBookExam}
                  className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-teal-900 hover:bg-teal-950 dark:bg-teal-800 dark:hover:bg-teal-700 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Book Visit
                </button>
              </div>
            </div>

            {/* Weekly Hours Table */}
            <div className="bg-stone-50 dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
                <h3 className="text-base font-serif font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-800 dark:text-teal-400" />
                  <span>Clinic & Dispensary Hours</span>
                </h3>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
                  Open Today
                </span>
              </div>

              <div className="divide-y divide-stone-200 dark:divide-stone-800 text-xs">
                {CLINIC_INFO.hours.map((item) => {
                  const isToday = item.day === todayName;

                  return (
                    <div
                      key={item.day}
                      className={`py-2 flex items-center justify-between ${
                        isToday
                          ? 'font-semibold text-teal-950 dark:text-teal-200 bg-teal-50/50 dark:bg-teal-950/40 px-2 rounded -mx-2'
                          : 'text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      <span>
                        {item.day} {isToday && <span className="text-teal-700 dark:text-teal-400 text-[10px]">(Today)</span>}
                      </span>
                      <span className="font-mono tabular-nums">{item.hours}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Doctor Bios & Technology & Interactive Map View */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Simulated Map & Exterior Look */}
            <div className="bg-stone-900 dark:bg-stone-900/90 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm border border-stone-800">
              <div className="relative z-10 space-y-3 max-w-lg">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-300">
                  Willow Glen Optical Boutique
                </span>
                <h3 className="text-2xl font-serif font-semibold text-stone-100">
                  428 Birchwood Avenue
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Conveniently situated with dedicated rear parking, wheelchair-accessible ramps, 
                  and a calm, sound-buffered examination suite for relaxed vision diagnostics.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="bg-stone-800 border border-stone-700 text-stone-300 px-2.5 py-1 rounded">
                    Free Rear Parking
                  </span>
                  <span className="bg-stone-800 border border-stone-700 text-stone-300 px-2.5 py-1 rounded">
                    ADA Accessible
                  </span>
                  <span className="bg-stone-800 border border-stone-700 text-stone-300 px-2.5 py-1 rounded">
                    In-House Edging Lab
                  </span>
                </div>
              </div>

              {/* Decorative Subtle Geometric Grid Backdrop */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }}
              />
            </div>

            {/* Doctors Spotlight */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif font-semibold text-stone-900 dark:text-stone-100">
                Meet Your Licensed Doctors of Optometry
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CLINIC_DOCTORS.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-900 dark:bg-teal-700 text-white font-serif font-bold text-sm flex items-center justify-center shrink-0">
                          {doc.avatarInitials}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100">{doc.name}</h4>
                          <span className="text-[11px] text-stone-500 dark:text-stone-400 block leading-tight">
                            {doc.title}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-teal-800 dark:text-teal-400 font-medium">
                        {doc.credentials}
                      </p>

                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                        {doc.bio}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400">
                      <span className="font-semibold text-stone-700 dark:text-stone-300">Specialties: </span>
                      {doc.specialties.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Insurance Billing Badges */}
            <div className="bg-stone-50 dark:bg-stone-900 rounded-xl p-5 border border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-stone-800 dark:text-stone-200 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-teal-800 dark:text-teal-400" />
                <span>Accepted Vision Insurance Networks & Benefit Plans</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                We confirm eligibility and apply your copays directly on-site and online. Use your annual FSA / HSA dollars before they expire.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {ACCEPTED_INSURANCES.map((ins, i) => (
                  <span
                    key={i}
                    className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-2.5 py-1 rounded text-[11px]"
                  >
                    {ins}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
