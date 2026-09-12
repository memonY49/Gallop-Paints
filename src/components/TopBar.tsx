import React from 'react';
import { 
  Globe, 
  MapPin, 
  Calculator, 
  Palette, 
  Search, 
  User, 
  ShoppingCart,
  PhoneCall
} from 'lucide-react';
import { Language, PageId } from '../types';

interface TopBarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (page: PageId) => void;
  onOpenCalculator: () => void;
  onOpenSearch: () => void;
  onOpenLogin: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentLanguage,
  onLanguageChange,
  onNavigate,
  onOpenCalculator,
  onOpenSearch,
  onOpenLogin,
  onOpenCart,
  cartCount,
}) => {
  return (
    <div
      id="gallop-top-utility-bar"
      className="h-10 bg-[#0F2027] text-white flex items-center justify-between px-4 sm:px-8 text-xs font-medium border-b border-slate-800 select-none z-50"
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        {/* Left Side Utilities */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 cursor-pointer font-bold">
              <span className="w-3.5 h-2.5 bg-emerald-600 rounded-[1px] inline-block border border-white/40" />
              <button
                onClick={() => onLanguageChange(currentLanguage === 'EN' ? 'UR' : 'EN')}
                className="hover:text-[#00CED1] transition-colors font-bold text-[11px] uppercase tracking-wider"
              >
                {currentLanguage === 'EN' ? 'EN / UR' : 'UR / EN'}
              </button>
            </span>
          </div>

          <span className="hidden sm:inline-block text-white/30">•</span>

          {/* Quick Utilities */}
          <div className="hidden sm:flex items-center gap-6 text-[11px] font-bold uppercase tracking-wider text-slate-300">
            <button
              onClick={() => onNavigate('contact')}
              className="opacity-75 hover:opacity-100 hover:text-[#00CED1] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{currentLanguage === 'UR' ? 'ڈیلر تلاش' : 'STORE LOCATOR'}</span>
            </button>

            <button
              onClick={onOpenCalculator}
              className="opacity-75 hover:opacity-100 hover:text-[#00CED1] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{currentLanguage === 'UR' ? 'پینٹ کیلکولیٹر' : 'PAINT CALCULATOR'}</span>
            </button>

            <button
              onClick={() => onNavigate('shades')}
              className="opacity-75 hover:opacity-100 hover:text-[#00CED1] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{currentLanguage === 'UR' ? 'شیڈ کارڈز' : 'SHADE CARDS'}</span>
            </button>
          </div>
        </div>

        {/* Right Side Icons & Cart */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs">
          {/* UAN Hotline on Desktop */}
          <span className="hidden lg:flex items-center gap-1.5 text-slate-300 text-[11px] font-mono">
            <span className="text-[#00CED1] font-bold">UAN:</span>
            <strong className="text-white">(042) 111-GALLOP</strong>
          </span>

          {/* Search */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 text-slate-300 hover:text-[#00CED1] font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">SEARCH</span>
          </button>

          {/* Login */}
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-1.5 text-slate-300 hover:text-[#00CED1] font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
          >
            <User className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">LOGIN</span>
          </button>

          {/* Cart Pill */}
          <button
            id="top-utility-cart-btn"
            onClick={onOpenCart}
            className="bg-white hover:bg-slate-100 text-[#0F2027] px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            <ShoppingCart className="w-3 h-3 text-[#0F2027]" />
            <span>CART: {cartCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
