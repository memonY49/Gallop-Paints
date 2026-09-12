import React from 'react';
import { 
  Palette, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  Calculator, 
  ShieldCheck, 
  Leaf, 
  Shield, 
  ChevronRight,
  Eye,
  ShoppingCart
} from 'lucide-react';
import { Product, ShadeColor, PageId } from '../types';
import { SHADES, PRODUCTS, COMPANY_STATS } from '../data/paintsData';
import { PaintBucket3D } from '../components/PaintBucket3D';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenCalculator: () => void;
  onOpenProductDetail: (product: Product) => void;
  onSelectShadeForVisualizer: (shade: ShadeColor) => void;
  onAddToCart: (product: Product, shade: ShadeColor, packSize: any, quantity: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenCalculator,
  onOpenProductDetail,
  onSelectShadeForVisualizer,
  onAddToCart,
}) => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="w-full bg-[#F8F9FA] text-[#0F2027]">
      {/* ========================================================================= */}
      {/* HERO SECTION - BOLD TYPOGRAPHY THEME */}
      {/* ========================================================================= */}
      <section
        id="home-hero-section"
        className="relative bg-white border-b border-gray-200 overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24"
      >
        {/* Soft atmospheric radial gradient in background */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00CED1]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header indicator and established badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-900 text-[10px] font-black rounded uppercase tracking-wider">
              EST. 1989 • 35 YEARS OF EXCELLENCE
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00CED1]">
              GALLOP PAINTS &amp; INDUSTRIES
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Bold Typography Headline, Narrative & Primary CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Ultra Bold Typography Main Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight uppercase italic text-[#0F2027]">
                COLOUR <br />
                <span className="text-[#00CED1] not-italic">YOUR</span> LEGACY.
              </h1>

              {/* Sub-narrative */}
              <p className="text-gray-600 max-w-xl text-sm sm:text-base leading-relaxed font-normal">
                Transforming architectural spaces with premium, eco-friendly formulations engineered for extreme durability, anti-fungal barrier protection, and vibrant longevity.
              </p>

              {/* Primary Call to Action Buttons matching Bold Typography specifications */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  id="hero-cta-explore-shades"
                  onClick={() => onNavigate('shades')}
                  className="px-8 py-4 bg-[#0F2027] text-white font-black text-xs sm:text-sm rounded-xl shadow-xl shadow-blue-900/20 hover:bg-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 group active:scale-95"
                >
                  <Palette className="w-4 h-4 text-[#00CED1] group-hover:rotate-12 transition-transform" />
                  <span>EXPLORE SHADE CARDS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-cta-find-dealer"
                  onClick={() => onNavigate('products')}
                  className="px-8 py-4 border-2 border-[#0F2027] text-[#0F2027] font-black text-xs sm:text-sm rounded-xl hover:bg-[#0F2027] hover:text-white uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 active:scale-95"
                >
                  <span>VIEW PRODUCTS</span>
                </button>
              </div>

              {/* Quick Paint Estimator Shortcut */}
              <div className="pt-2">
                <button
                  onClick={onOpenCalculator}
                  className="text-xs text-slate-600 hover:text-[#00CED1] font-bold flex items-center gap-2 transition-colors cursor-pointer group uppercase tracking-wider"
                >
                  <Calculator className="w-4 h-4 text-[#00CED1] group-hover:scale-110 transition-transform" />
                  <span>Planning a renovation? Launch the Quick Paint Calculator</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                </button>
              </div>
            </div>

            {/* Right Column: Hero Visual - Interactive 3D Paint Bucket with Attached Hover Badges */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <PaintBucket3D
                initialShade={SHADES[4]}
                onSelectShade={(shade) => {
                  onSelectShadeForVisualizer(shade);
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* QUICK STATS COUNTER STRIP (Bold Typography & Numerals) */}
      {/* ========================================================================= */}
      <section id="stats-counter-strip" className="bg-[#F8F9FA] py-10 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {COMPANY_STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs text-center hover:border-[#00CED1] transition-colors"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F2027] leading-none">
                  {stat.value}
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-slate-800 mt-2">
                  {stat.label}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#00CED1] mt-1">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURED SIGNATURE PRODUCTS GRID */}
      {/* ========================================================================= */}
      <section id="featured-products-section" className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00CED1]">
                ARCHITECTURAL FORMULATIONS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0F2027] mt-1">
                Engineered for Pakistan's Climate
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
                Formulated with German resin standards, micro-emulsion durability, and anti-fungal barrier protection.
              </p>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#0F2027] hover:text-[#00CED1] transition-colors cursor-pointer"
            >
              <span>EXPLORE ALL PRODUCTS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                id={`featured-card-${product.id}`}
                className="bg-[#F8F9FA] rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#00CED1] transition-all flex flex-col justify-between group"
              >
                {/* Visual Card Header & Tint */}
                <div
                  className="p-6 bg-white flex flex-col items-center justify-center relative cursor-pointer border-b border-gray-100"
                  onClick={() => onOpenProductDetail(product)}
                >
                  <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-wider bg-[#0F2027] text-white px-2 py-0.5 rounded">
                    {product.finish}
                  </span>
                  {product.popular && (
                    <span className="absolute top-3 right-3 text-[9px] font-black uppercase tracking-wider bg-yellow-100 text-yellow-900 px-2 py-0.5 rounded">
                      BEST SELLER
                    </span>
                  )}

                  {/* Product Miniature Can Illustration */}
                  <div className="w-24 h-28 my-3 rounded-xl bg-[#0F2027] shadow-md border-2 border-gray-300 p-2 flex flex-col justify-between items-center group-hover:scale-105 transition-transform">
                    <div className="w-full h-2 bg-gradient-to-r from-gray-300 via-white to-gray-300 rounded" />
                    <div
                      className="w-12 h-12 rounded-lg shadow-sm border border-white/60"
                      style={{ backgroundColor: product.defaultShadeHex }}
                    />
                    <span className="text-[8px] font-mono tracking-widest text-[#00CED1] font-bold">
                      GALLOP
                    </span>
                  </div>

                  <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">
                    {product.categoryLabel}
                  </span>
                </div>

                {/* Info & Spec */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3
                      onClick={() => onOpenProductDetail(product)}
                      className="text-sm font-black uppercase tracking-tight text-[#0F2027] group-hover:text-[#00CED1] transition-colors cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-gray-100">
                      <span className="text-gray-500 font-medium">Coverage:</span>
                      <strong className="text-gray-900 text-[11px] font-bold">{product.coverage}</strong>
                    </div>
                  </div>

                  {/* Price and Add to Cart Direct CTAs */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-gray-400 block leading-tight font-bold uppercase">Gallon (3.64L)</span>
                      <span className="text-xs font-black text-[#0F2027]">
                        PKR {product.prices['3.64L (Gallon)'].toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenProductDetail(product)}
                        className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                        title="Quick View Specs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          const defaultShade = SHADES[0];
                          onAddToCart(product, defaultShade, '3.64L (Gallon)', 1);
                        }}
                        className="px-3.5 py-2 rounded-xl bg-[#0F2027] hover:bg-black text-white font-black text-xs transition-colors flex items-center gap-1 shadow-xs cursor-pointer uppercase tracking-wider"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-[#00CED1]" />
                        <span>ADD</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TRENDING SHADES STRIP (Clean Swatches & Bold Typography) */}
      {/* ========================================================================= */}
      <section id="trending-shades-strip" className="bg-[#F8F9FA] py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00CED1]">
                CURATED COLOR HARMONIES
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0F2027] mt-0.5">
                Trending Tones of the Season
              </h3>
              <p className="text-xs text-gray-500">
                Click any shade to inspect details or preview directly on room walls.
              </p>
            </div>
            <button
              onClick={() => onNavigate('shades')}
              className="px-5 py-2.5 rounded-xl bg-[#0F2027] text-white text-xs font-black uppercase tracking-wider hover:bg-black transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>VIEW ALL 500+ SHADES</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00CED1]" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {SHADES.slice(0, 6).map((shade) => (
              <div
                key={shade.id}
                onClick={() => onSelectShadeForVisualizer(shade)}
                className="p-3 bg-white rounded-2xl border border-gray-200 hover:border-[#00CED1] hover:shadow-md transition-all cursor-pointer group"
              >
                <div
                  className="w-full aspect-square rounded-xl shadow-xs border border-gray-200 relative overflow-hidden group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: shade.hex }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/15 to-transparent" />
                </div>
                <div className="mt-2.5 text-left">
                  <h4 className="text-xs font-black uppercase tracking-tight text-[#0F2027] group-hover:text-[#00CED1] truncate">
                    {shade.name}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-mono font-bold">
                    {shade.code} • {shade.spectrum}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TECHNOLOGY PILLARS - BOLD TYPOGRAPHY & CLEAN ACCENTS */}
      {/* ========================================================================= */}
      <section id="why-gallop-tech" className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00CED1]">
              THE GALLOP ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#0F2027] mt-1">
              Engineered with Chemical Resilience
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Every liter leaving our automated polymer plants is batch-tested for adhesion, UV resistance, and environmental safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8F9FA] p-6 rounded-2xl border-l-4 border-fuchsia-500 border-y border-r border-gray-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 text-fuchsia-600 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-[#0F2027]">
                100% Rich Color Retention
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Formulated with ultra-fine mineral pigments that resist oxidation and harsh solar radiation, keeping walls vibrant and pristine for over 15 years.
              </p>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-2xl border-l-4 border-emerald-500 border-y border-r border-gray-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-[#0F2027]">
                Eco-Friendly Low VOC Chemistry
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Zero added lead, mercury, or harmful solvents. Creates clean, breathable indoor air quality safe for family homes, schools, and hospitals.
              </p>
            </div>

            <div className="bg-[#F8F9FA] p-6 rounded-2xl border-l-4 border-[#00CED1] border-y border-r border-gray-200 shadow-xs hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#00CED1]/10 text-[#00CED1] flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-[#0F2027]">
                Weather-Shield &amp; Ultra-Washable
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Cross-linking elastomeric polymers span micro-cracks while repelling heavy monsoon moisture, dirt, and stubborn grease stains effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DEALER NETWORK BANNER (Bold Dark Contrast) */}
      {/* ========================================================================= */}
      <section className="bg-[#0F2027] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] font-black text-[#00CED1] uppercase tracking-[0.2em]">
              NATIONWIDE AVAILABILITY
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              Over 1,000+ Authorized Dealer Outlets Across Pakistan
            </h3>
            <p className="text-xs text-gray-300 max-w-xl">
              Equipped with in-store Gallop Computerized Color Dispensing tinting machines for instant 3-minute custom shade creation.
            </p>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 rounded-xl bg-[#00CED1] hover:bg-[#00b5b8] text-[#0F2027] font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-[#0F2027]" />
            <span>LOCATE NEAREST DEALER</span>
          </button>
        </div>
      </section>
    </div>
  );
};
