import React, { useState } from 'react';
import { CLINIC_INFO, ACCEPTED_INSURANCES } from '../data/mockOpticalData';
import { Mail, Check, Instagram, Facebook, Twitter, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
    }, 3000);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Newsletter & Community Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-stone-800 items-center">
          <div className="lg:col-span-6 space-y-2">
            <h3 className="text-xl font-serif font-semibold text-white">
              Stay ahead in ocular health & new frame releases.
            </h3>
            <p className="text-xs text-stone-400 max-w-md">
              Receive $50 off your first complete pair or annual comprehensive eye exam, plus seasonal lens care tips.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2.5 text-xs bg-stone-800 border border-stone-700 rounded-lg text-white placeholder:text-stone-500 focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                {subscribed ? 'Discount Sent!' : 'Join Lumina Club'}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-teal-400 mt-2 flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>Welcome! Check your inbox for your $50 coupon code.</span>
              </p>
            )}
          </div>
        </div>

        {/* 4-Column Navigation & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          {/* Brand Col */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-white tracking-tight">
              Lumina Optical
            </h4>
            <p className="text-stone-400 leading-relaxed">
              Doctor-led clinical optometry and bespoke handcrafted prescription eyewear in Willow Glen, California.
            </p>
            <div className="pt-1 flex items-center gap-3 text-stone-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram @LuminaOptical"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Clinical Services Links */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Clinical Services
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Comprehensive Eye Exams
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Lens Evaluations
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Optomap Retinal Scans
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Dry Eye Therapy Clinic
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pediatric Vision Care
                </button>
              </li>
            </ul>
          </div>

          {/* Eyewear & Optics Links */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Eyewear & Care
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Japanese Titanium Frames
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Italian Mazzucchelli Acetate
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lens-guide')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  High-Index & Progressive Lenses
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pupillary Distance (PD) Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Lens Cleaning & Maintenance
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Practice Info */}
          <div className="space-y-2.5 text-stone-400">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Clinic Dispensary
            </h4>
            <p className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>{CLINIC_INFO.address}, {CLINIC_INFO.cityStateZip}</span>
            </p>
            <p className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>{CLINIC_INFO.phone}</span>
            </p>
            <p className="text-[11px] text-stone-500 pt-1">
              Mon–Fri 9am–6:30pm · Sat 9:30am–4pm
            </p>
          </div>
        </div>

        {/* Quiet Copyright & Insurance Notice */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Lumina Optical & Eyewear Clinic, Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>HIPAA Compliant</span>
            <span aria-hidden="true">·</span>
            <span>VSP & EyeMed Network Provider</span>
            <span aria-hidden="true">·</span>
            <span>Licensed California Optometry Practice</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
