import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductModal } from './components/ProductModal';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { PromosPage } from './pages/PromosPage';
import { DeliveryPage } from './pages/DeliveryPage';
import { RestaurantsPage } from './pages/RestaurantsPage';
import { AboutPage } from './pages/AboutPage';

export const App: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/promos" element={<PromosPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <CheckoutModal />
      <ProductModal />
      <Toast />
    </div>
  );
};
