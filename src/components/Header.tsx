import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenBooking: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenBooking,
  activeSection,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'collection', label: 'Koleksi Bingkai' },
    { id: 'lens-guide', label: 'Teknologi Lensa' },
    { id: 'exams', label: 'Pemeriksaan Mata' },
    { id: 'clinic', label: 'Klinik & Lokasi' },
    { id: 'journal', label: 'Jurnal Mata' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="flex items-center gap-2.5 text-xl sm:text-2xl font-serif tracking-tight text-stone-900 dark:text-stone-100 whitespace-nowrap shrink-0 hover:text-teal-900 dark:hover:text-teal-400 transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-teal-900 dark:bg-teal-700 text-stone-100 flex items-center justify-center font-serif text-base font-semibold shadow-xs">
              K
            </span>
            <span>Krostell Optik</span>
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative cursor-pointer ${
                  activeSection === link.id
                    ? 'text-stone-900 dark:text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-800 dark:after:bg-teal-400'
                    : 'hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action button + theme toggle + Cart trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              aria-label={isDarkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
              title={isDarkMode ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              {isDarkMode ? (
                <Sun className="w-4.5 h-4.5 text-amber-300" />
              ) : (
                <Moon className="w-4.5 h-4.5 text-stone-600" />
              )}
            </button>

            {/* Bag Button */}
            <button
              onClick={onOpenCart}
              aria-label={`Keranjang belanja dengan ${cartItemCount} item`}
              className="relative p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-teal-800 dark:bg-teal-600 text-white text-[11px] font-semibold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 rounded-lg hover:bg-teal-900 dark:hover:bg-teal-700 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-xs cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-300" />
              <span>Pesan Jadwal Periksa</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg cursor-pointer"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left py-2 px-3 text-sm font-medium rounded-md text-stone-700 dark:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-white cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 dark:bg-teal-800 rounded-lg hover:bg-teal-900 dark:hover:bg-teal-700 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-teal-300" />
              <span>Pesan Jadwal Periksa & Fitting</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
