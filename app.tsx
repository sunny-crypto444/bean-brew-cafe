import { useEffect, useState } from 'react';
import { AppProvider } from '@/context/AppContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { CategoryId } from '@/lib/types';

import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import MenuSection from '@/components/MenuSection';
import SpecialOffer from '@/components/SpecialOffer';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import Reservation from '@/components/Reservation';
import LocationHours from '@/components/LocationHours';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import AuthModal from '@/components/AuthModal';
import ScrollToTop from '@/components/ScrollToTop';
import Toasts from '@/components/Toasts';

function CafeSite() {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={revealRef} className="min-h-screen bg-app text-[var(--text)]">
      {loading && <Loader />}

      <Navbar />

      <main>
        <Hero />
        <Categories active={activeCategory} onSelect={setActiveCategory} />
        <MenuSection active={activeCategory} setActive={setActiveCategory} />
        <SpecialOffer />
        <About />
        <Gallery />
        <Reviews />
        <Reservation />
        <LocationHours />
        <Contact />
      </main>

      <Footer />

      {/* Overlays */}
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <AuthModal />
      <ScrollToTop />
      <Toasts />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <CafeSite />
    </AppProvider>
  );
}
