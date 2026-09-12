import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Hammer, 
  Layers, 
  Factory,
  ArrowRight,
  MapPin,
  Calculator,
  Search,
  ShoppingCart
} from 'lucide-react';
import { PageId, ProductCategory, Language } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, category?: ProductCategory) => void;
  onOpenCalculator: () => void;
  currentLanguage?: Language;
  cartCount?: number;
  onOpenCart?: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenCalculator,
  currentLanguage = 'EN',
  cartCount = 0,
  onOpenCart,
  onOpenSearch,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProductsMegaOpen, setIsProductsMegaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string; urLabel: string; hasMega?: boolean }[] = [
    { id: 'home', label: 'Home', urLabel: 'ہوم' },
    { id: 'products', label: 'Products', urLabel: 'پروڈکٹس', hasMega: true },
    { id: 'shades', label: 'Shade Cards', urLabel: 'شیڈ کارڈز' },
    { id: 'about', label: 'About Us', urLabel: 'ہمارے بارے میں' },
    { id: 'contact', label: 'Contact', urLabel: 'رابطہ' },
  ];

  const productCategories: {
    id: ProductCategory;
    title: string;
    description: string;
    icon: React.ReactNode;
    tag: string;
  }[] = [
    {
      id: 'interior',
      title: 'Interior Luxury Emulsions',
      description: 'Royal Silk, Velvet Matte & ultra-washable plastic finishes.',
      icon: <Sparkles className="w-5 h-5 text-[#00CED1]" />,
      tag: 'Ultra Washable',
    },
    {
      id: 'exterior',
      title: 'Exterior Weather Guard',
      description: 'Weather-Shield extreme elastomeric rain & UV defense.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      tag: '15-Yr Guarantee',
    },
    {
      id: 'wood-metal',
      title: 'Gloss Wood & Metal Enamels',
      description: 'Mirror-finish alkyds & high-solids rust inhibitors.',
      icon: <Hammer className="w-5 h-5 text-amber-500" />,
      tag: 'High Gloss',
    },
    {
      id: 'primers',
      title: 'Surface Preparation & Primers',
      description: 'Wall sealers, damp-stop liquid membranes & basecoats.',
      icon: <Layers className="w-5 h-5 text-purple-500" />,
      tag: 'Anti-Alkali',
    },
    {
      id: 'industrial',
      title: 'Industrial High-Performance',
      description: 'Heavy duty epoxy floor coatings & protective resins.',
      icon: <Factory className="w-5 h-5 text-rose-500" />,
      tag: 'Heavy Duty',
    },
  ];

  return (
    <header
      id="gallop-main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-md border-b border-gray-200'
          : 'bg-white border-b border-gray-200 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Top-Left Branding: Gallop Paints */}
          <div
            id="brand-logo-container"
            onClick={() => onNavigate('home')}
            className="cursor-pointer transition-opacity hover:opacity-95 flex items-center gap-3"
          >
            <Logo variant="light" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-bold uppercase tracking-wide text-[#0F2027]">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;

              if (link.hasMega) {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => setIsProductsMegaOpen(true)}
                    onMouseLeave={() => setIsProductsMegaOpen(false)}
                  >
                    <button
                      id="nav-link-products-mega"
                      onClick={() => onNavigate('products')}
                      className={`flex items-center gap-1 transition-colors cursor-pointer pb-1 ${
                        isActive
                          ? 'text-[#00CED1] border-b-2 border-[#00CED1]'
                          : 'hover:text-[#00CED1]'
                      }`}
                    >
                      <span>{currentLanguage === 'UR' ? link.urLabel : link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isProductsMegaOpen ? 'rotate-180 text-[#00CED1]' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Mega-Menu Dropdown */}
                    {isProductsMegaOpen && (
                      <div
                        id="products-mega-menu-dropdown"
                        className="absolute top-full -left-20 w-[680px] bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200 text-slate-800"
                      >
                        <div className="col-span-2 flex items-center justify-between pb-3 border-b border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black uppercase tracking-wider text-[#00CED1]">
                              COATINGS CATALOG
                            </span>
                            <span className="text-xs text-slate-400">• Engineered for Extreme Durability</span>
                          </div>
                          <button
                            onClick={() => {
                              setIsProductsMegaOpen(false);
                              onNavigate('products');
                            }}
                            className="text-xs font-bold text-[#0F2027] hover:text-[#00CED1] flex items-center gap-1 cursor-pointer"
                          >
                            View All Products <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {productCategories.map((cat) => (
                          <div
                            key={cat.id}
                            id={`mega-cat-${cat.id}`}
                            onClick={() => {
                              setIsProductsMegaOpen(false);
                              onNavigate('products', cat.id);
                            }}
                            className="p-3 rounded-xl border border-gray-100 hover:border-[#00CED1] hover:bg-slate-50 transition-all cursor-pointer group flex items-start gap-3"
                          >
                            <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-[#00CED1]/10 transition-colors flex-shrink-0">
                              {cat.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <h4 className="text-xs font-black text-slate-900 group-hover:text-[#00CED1] transition-colors truncate">
                                  {cat.title}
                                </h4>
                                <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                  {cat.tag}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {cat.description}
                              </p>
                            </div>
                          </div>
                        ))}

                        <div className="col-span-2 pt-3 border-t border-gray-100 flex items-center justify-between bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                            <Calculator className="w-4 h-4 text-[#00CED1]" />
                            <span>Unsure how many liters you require?</span>
                          </div>
                          <button
                            onClick={() => {
                              setIsProductsMegaOpen(false);
                              onOpenCalculator();
                            }}
                            className="text-xs font-black text-white bg-[#0F2027] hover:bg-black px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer uppercase tracking-wider"
                          >
                            Estimate Required Liters
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => onNavigate(link.id)}
                  className={`transition-colors cursor-pointer pb-1 ${
                    isActive
                      ? 'text-[#00CED1] border-b-2 border-[#00CED1]'
                      : 'hover:text-[#00CED1]'
                  }`}
                >
                  {currentLanguage === 'UR' ? link.urLabel : link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: FIND A DEALER CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="header-btn-store-finder"
              onClick={() => onNavigate('contact')}
              className="bg-[#0F2027] text-white px-6 py-2.5 rounded-full text-xs font-black hover:bg-black uppercase tracking-wider shadow-sm transition-transform active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <MapPin className="w-3.5 h-3.5 text-[#00CED1]" />
              <span>FIND A DEALER</span>
            </button>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="p-2 text-slate-700 hover:text-[#00CED1]"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            {onOpenCart && (
              <button
                onClick={onOpenCart}
                className="p-2 text-slate-700 hover:text-[#00CED1] relative"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-600 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:text-[#00CED1] rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl">
          <nav className="flex flex-col space-y-2 text-sm font-bold uppercase tracking-wider text-[#0F2027]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate(link.id);
                }}
                className={`text-left py-2 px-3 rounded-lg transition-colors ${
                  currentPage === link.id
                    ? 'text-[#00CED1] bg-slate-50 font-black'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                {currentLanguage === 'UR' ? link.urLabel : link.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="w-full py-2.5 bg-slate-100 text-[#0F2027] font-bold text-xs rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <Calculator className="w-4 h-4 text-[#00CED1]" />
              <span>Paint Calculator</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('contact');
              }}
              className="w-full py-3 bg-[#0F2027] text-white font-black text-xs rounded-full flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <MapPin className="w-4 h-4 text-[#00CED1]" />
              <span>Find a Dealer</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
