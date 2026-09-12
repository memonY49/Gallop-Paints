import React, { useState, useEffect } from 'react';
import { 
  PageId, 
  ProductCategory, 
  CartItem, 
  Product, 
  ShadeColor, 
  PackSize 
} from './types';
import { PRODUCTS, SHADES } from './data/paintsData';

// Layout & Global Components
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { LoginModal } from './components/LoginModal';
import { PaintCalculatorModal } from './components/PaintCalculatorModal';
import { ProductDetailModal } from './components/ProductDetailModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ShadeCardsPage } from './pages/ShadeCardsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';

export default function App() {
  // Navigation & Page routing state
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<ProductCategory | undefined>(undefined);
  const [language, setLanguage] = useState<'EN' | 'UR'>('EN');

  // Modals & Panels state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // Active Shade passed to Room Visualizer
  const [visualizerTargetShade, setVisualizerTargetShade] = useState<ShadeColor>(SHADES[4]); // Raw Cashmere

  // Shopping Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      cartId: 'cart-sample-1',
      product: PRODUCTS[0], // Royal Silk Luxury Emulsion
      selectedShade: SHADES[4], // Raw Cashmere
      packSize: '3.64L (Gallon)',
      quantity: 2,
      unitPrice: PRODUCTS[0].prices['3.64L (Gallon)'],
    },
  ]);

  // Handle Navigation
  const handleNavigate = (page: PageId, category?: ProductCategory) => {
    setCurrentPage(page);
    setActiveCategoryFilter(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Add / Update
  const handleAddToCart = (
    product: Product,
    shade: ShadeColor,
    packSize: PackSize,
    qty: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedShade.id === shade.id &&
          item.packSize === packSize
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      } else {
        const newItem: CartItem = {
          cartId: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          product,
          selectedShade: shade,
          packSize,
          quantity: qty,
          unitPrice: product.prices[packSize],
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Visualizer trigger
  const handleTryInVisualizer = (shade: ShadeColor) => {
    setVisualizerTargetShade(shade);
    handleNavigate('shades');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900 selection:bg-amber-400 selection:text-slate-950 font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. GLOBAL NAVIGATION & TOP BAR (Inspired by Reference UI) */}
      {/* ========================================================================= */}
      
      {/* Top Announcement & Utility Bar */}
      <TopBar
        language={language}
        onLanguageChange={setLanguage}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Main Sticky Header Layout */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* ========================================================================= */}
      {/* MAIN CONTENT ROUTING & PAGE VIEWS */}
      {/* ========================================================================= */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onOpenProductDetail={(prod) => setDetailProduct(prod)}
            onSelectShadeForVisualizer={handleTryInVisualizer}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            initialCategory={activeCategoryFilter}
            onOpenProductDetail={(prod) => setDetailProduct(prod)}
            onAddToCart={handleAddToCart}
            onTryInVisualizer={handleTryInVisualizer}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'shades' && (
          <ShadeCardsPage
            initialShade={visualizerTargetShade}
            onSelectShadeForCart={(shade) => {
              handleAddToCart(PRODUCTS[0], shade, '3.64L (Gallon)', 1);
            }}
          />
        )}

        {currentPage === 'about' && (
          <AboutUsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactUsPage />
        )}
      </main>

      {/* ========================================================================= */}
      {/* GLOBAL FOOTER */}
      {/* ========================================================================= */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
      />

      {/* ========================================================================= */}
      {/* INTERACTIVE MODALS & DRAWERS */}
      {/* ========================================================================= */}
      
      {/* Cart Slide-Out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onNavigateToProducts={() => {
          setIsCartOpen(false);
          handleNavigate('products');
        }}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => {
          setDetailProduct(product);
          setIsSearchOpen(false);
        }}
        onSelectShade={(shade) => {
          handleTryInVisualizer(shade);
          setIsSearchOpen(false);
        }}
        onNavigatePage={(page) => {
          handleNavigate(page);
          setIsSearchOpen(false);
        }}
      />

      {/* Login / Dealer Authentication Portal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      {/* Paint Calculator Modal */}
      <PaintCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onAddRecommendedToCart={(product, shade, packSize, qty) => {
          handleAddToCart(product, shade, packSize, qty);
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={detailProduct}
        onClose={() => setDetailProduct(null)}
        onAddToCart={handleAddToCart}
        onTryInVisualizer={handleTryInVisualizer}
      />
    </div>
  );
}
