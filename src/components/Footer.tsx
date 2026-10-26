import React, { useState } from 'react';
import { CLINIC_INFO } from '../data/mockOpticalData';
import { Check, Instagram, Facebook, Twitter, Phone, MapPin } from 'lucide-react';

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
              Kesehatan mata prima & rilisan koleksi bingkai presisi.
            </h3>
            <p className="text-xs text-stone-400 max-w-md">
              Dapatkan potongan Rp 250.000 untuk pembelian kacamata lengkap pertama atau jadwal pemeriksaan mata rutin, plus panduan berkala perawatan lensa.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Masukkan alamat email Anda"
                className="flex-1 px-4 py-2.5 text-xs bg-stone-800 border border-stone-700 rounded-lg text-white placeholder:text-stone-500 focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                {subscribed ? 'Voucher Terkirim!' : 'Gabung Krostell Club'}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-teal-400 mt-2 flex items-center gap-1 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>Selamat datang! Periksa kotak masuk email Anda untuk kode potongan Rp 250.000.</span>
              </p>
            )}
          </div>
        </div>

        {/* 4-Column Navigation & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          {/* Brand Col */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-white tracking-tight">
              Krostell Optik
            </h4>
            <p className="text-stone-400 leading-relaxed">
              Pusat layanan optometri klinis dipimpin dokter spesialis mata dan kacamata resep presisi buatan tangan di Senopati, Jakarta Selatan.
            </p>
            <div className="pt-1 flex items-center gap-3 text-stone-400">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram @KrostellOptik"
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
              Layanan Klinis
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pemeriksaan Mata Komprehensif
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Evaluasi & Fitting Lensa Kontak
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pemindaian Retina Digital Optomap
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Klinik Terapi Sindrom Mata Kering
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Perawatan Penglihatan Anak & Remaja
                </button>
              </li>
            </ul>
          </div>

          {/* Eyewear & Optics Links */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Koleksi & Edukasi Lensa
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bingkai Titanium Asli Jepang
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Asetat Mazzucchelli Italia
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lens-guide')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Lensa High-Index & Progresif Digital
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Panduan Jarak Pupil (PD)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Perawatan & Pembersihan Lensa
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Practice Info */}
          <div className="space-y-2.5 text-stone-400">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Butik & Klinik Optik
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
              Sen–Jum 09.00–18.30 WIB · Sab 09.30–16.00 WIB
            </p>
          </div>
        </div>

        {/* Quiet Copyright & Insurance Notice */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Krostell Optik & Eyewear Clinic, PT. Hak cipta dilindungi undang-undang.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span>Rekanan Asuransi: BPJS, AdMedika, Mandiri Inhealth, Prudential & Allianz</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>Praktik Optometri Berizin Resmi Kemenkes RI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
