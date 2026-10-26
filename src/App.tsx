import React, { useState, useEffect } from 'react';
import { PromotionBanner } from './components/PromotionBanner';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { LensTechnologySection } from './components/LensTechnologySection';
import { EyeExamsSection } from './components/EyeExamsSection';
import { ClinicInfoSection } from './components/ClinicInfoSection';
import { ReviewsSection } from './components/ReviewsSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AppointmentBookingModal } from './components/AppointmentBookingModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PdMeasureToolModal } from './components/PdMeasureToolModal';
import { FrameProduct, FrameColor, CartItem } from './types/optical';
import { FEATURED_FRAMES } from './data/mockOpticalData';

export default function App() {
  // Navigation active tracker
  const [activeSection, setActiveSection] = useState('home');

  // Dark mode state - Light mode is default as requested, with dark mode toggle fully available!
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('krostell-theme');
    if (saved !== null) return saved === 'dark';
    return false; // Default to Light Mode
  });

  // Apply dark mode class to html document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('krostell-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('krostell-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Modals & Drawers state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedBookingService, setPreselectedBookingService] = useState<string>('comprehensive-exam');
  
  const [selectedProduct, setSelectedProduct] = useState<FrameProduct | null>(null);
  const [selectedProductColor, setSelectedProductColor] = useState<FrameColor | undefined>(undefined);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPdToolOpen, setIsPdToolOpen] = useState(false);

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState('KROSTELL26');

  // Shopping cart items with initial sample prescription frame for immediate realism
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartItemId: 'kros-sample-1',
      product: FEATURED_FRAMES[0],
      selectedColor: FEATURED_FRAMES[0].colors[0],
      lensType: 'single-vision',
      lensMaterial: 'polycarbonate',
      lensPrice: 0,
      selectedCoatings: [
        {
          id: 'anti-reflective-base',
          name: 'Lapisan Multi-AR Super Hidrofobik',
          description: 'Lapisan standar anti-pantul & kejernihan optik',
          price: 0,
        },
      ],
      prescription: {
        odSphere: '-1.50',
        odCylinder: '-0.50',
        odAxis: '180',
        osSphere: '-1.75',
        osCylinder: '-0.50',
        osAxis: '175',
        pupillaryDistance: 63,
        rxMethod: 'manual',
      },
      totalPrice: 1750000,
      quantity: 1,
    },
  ]);

  // Handlers
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenBooking = (serviceId: string = 'comprehensive-exam') => {
    setPreselectedBookingService(serviceId);
    setIsBookingOpen(true);
  };

  const handleSelectProduct = (product: FrameProduct, preselectedColor?: FrameColor) => {
    setSelectedProduct(product);
    setSelectedProductColor(preselectedColor || product.colors[0]);
    setIsProductModalOpen(true);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => [item, ...prev]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i))
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex flex-col font-sans selection:bg-teal-900 selection:text-white transition-colors duration-200">
      {/* 1. Slim Promotional Banner */}
      <PromotionBanner
        onApplyPromo={(code) => {
          setAppliedPromo(code);
        }}
      />

      {/* 2. Top Bar Navigation (Strict 3-zone contract with dark mode switcher) */}
      <Header
        cartItemCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenBooking={() => handleOpenBooking('comprehensive-exam')}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* 3. Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreCatalog={() => handleNavigate('collection')}
          onOpenBooking={() => handleOpenBooking('comprehensive-exam')}
          onSelectProduct={handleSelectProduct}
          onOpenPdTool={() => setIsPdToolOpen(true)}
        />

        {/* Product Catalog & Frames */}
        <ProductCatalog
          onSelectProduct={handleSelectProduct}
          onOpenPdTool={() => setIsPdToolOpen(true)}
        />

        {/* Lens Technology & Optical Science */}
        <LensTechnologySection
          onExploreFrames={() => handleNavigate('collection')}
        />

        {/* Clinical Eye Exams & Fittings */}
        <EyeExamsSection
          onBookService={(srvId) => handleOpenBooking(srvId)}
        />

        {/* Clinic Info, Location, Hours & Doctors */}
        <ClinicInfoSection
          onBookExam={() => handleOpenBooking('comprehensive-exam')}
        />

        {/* Verified Reviews & Patient Testimonials */}
        <ReviewsSection />

        {/* Vision Journal & Lens Care Tips */}
        <BlogSection />
      </main>

      {/* 4. Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking('comprehensive-exam')}
      />

      {/* 5. Modals & Interactive Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        initialColor={selectedProductColor}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
        onOpenPdTool={() => setIsPdToolOpen(true)}
      />

      <AppointmentBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={preselectedBookingService}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
        appliedPromo={appliedPromo}
        onApplyPromo={(code) => setAppliedPromo(code)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        appliedPromo={appliedPromo}
        onOrderSuccess={handleOrderSuccess}
      />

      <PdMeasureToolModal
        isOpen={isPdToolOpen}
        onClose={() => setIsPdToolOpen(false)}
      />
    </div>
  );
}
