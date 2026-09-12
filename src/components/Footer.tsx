import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  Send
} from 'lucide-react';
import { Logo } from './Logo';
import { PageId, ProductCategory } from '../types';

interface FooterProps {
  onNavigate: (page: PageId, category?: ProductCategory) => void;
  onOpenCalculator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCalculator }) => {
  return (
    <footer id="gallop-global-footer" className="bg-[#0A171D] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Assistance Callout Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0F2027] to-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 mb-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              Gallop Color Trends 2026
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Stay Inspired with Architectural Trends & Shade Forecasts
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Join 45,000+ architects, interior designers, and homeowners receiving bi-monthly color palettes.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you for subscribing to Gallop Paints Color Forecast 2026!');
            }}
            className="w-full lg:w-auto flex items-center gap-2 max-w-md"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="px-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-amber-400 flex-1 min-w-[220px]"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow flex-shrink-0 cursor-pointer"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="lg" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Gallop Paints And Industries has been pioneering premium architectural finishes, heavy-duty weather guards, and eco-friendly coatings since 1989. Engineered with anti-fungal barrier chemistry and 100% color retention.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  UAN Toll-Free: <strong className="text-white">(042) 111-GALLOP</strong> (111-425-567)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>info@galloppaints.com / orders@galloppaints.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Gallop Industrial Park, Plot 42-A, Sundar Industrial Estate, Lahore, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Col 2: Product Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('products', 'interior')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Interior Luxury Emulsions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'exterior')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Exterior Weather Guard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'wood-metal')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Gloss Wood & Metal Enamels
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'primers')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Surface Primers & Sealers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'industrial')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Epoxy Industrial Coatings
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tools & Visualizers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              Tools & Inspiration
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('shades')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Digital Shade Cards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shades')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Interactive Room Visualizer
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCalculator}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Architectural Paint Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Find Authorized Dealers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shades')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Technical Data Sheets (TDS)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Standards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 border-b border-slate-800 pb-2">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Our 35+ Year Legacy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Regional Sales Offices
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Eco-Safe Formulations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Franchise & Dealership Application
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Contractor & Project Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Quality Badges */}
        <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00CED1]" />
              ISO 9001:2015 Certified
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              PCSIR Approved Formulations
            </span>
            <span>•</span>
            <span className="font-bold text-white">Established 1989</span>
          </div>

          <p className="text-center sm:text-right font-medium">
            © 1989 - 2026 Gallop Paints And Industries. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bold Typography Theme Precision Footer Strip */}
      <div className="w-full bg-white border-t border-gray-200 py-3.5 px-4 sm:px-10 flex flex-col sm:flex-row items-center justify-between text-[10px] font-black tracking-wider text-gray-500 uppercase gap-3">
        <p>© 2026 GALLOP PAINTS AND INDUSTRIES. ALL RIGHTS RESERVED.</p>
        <div className="flex flex-wrap items-center gap-6">
          <span className="hover:text-[#0F2027] transition-colors cursor-pointer">PRIVACY POLICY</span>
          <span 
            onClick={() => onNavigate('shades')} 
            className="hover:text-[#0F2027] transition-colors cursor-pointer"
          >
            TECHNICAL DATA SHEETS (TDS)
          </span>
          <a 
            href="tel:042111425567" 
            className="text-[#0F2027] font-black underline hover:text-[#00CED1] transition-colors"
          >
            UAN: (042) 111-GALLOP
          </a>
        </div>
      </div>
    </footer>
  );
};
