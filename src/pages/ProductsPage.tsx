import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  Palette, 
  ShoppingCart, 
  Check, 
  Eye, 
  Sparkles, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { 
  Product, 
  ProductCategory, 
  PaintFinish, 
  ApplicationSurface, 
  ShadeColor, 
  PackSize, 
  PageId 
} from '../types';
import { PRODUCTS, SHADES } from '../data/paintsData';

interface ProductsPageProps {
  initialCategory?: ProductCategory;
  onOpenProductDetail: (product: Product) => void;
  onAddToCart: (product: Product, shade: ShadeColor, packSize: PackSize, qty: number) => void;
  onTryInVisualizer: (shade: ShadeColor) => void;
  onNavigate: (page: PageId) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialCategory,
  onOpenProductDetail,
  onAddToCart,
  onTryInVisualizer,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedFinish, setSelectedFinish] = useState<string>('all');
  const [selectedSurface, setSelectedSurface] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [activeShadePickerProductId, setActiveShadePickerProductId] = useState<string | null>(null);
  const [selectedShadesPerProduct, setSelectedShadesPerProduct] = useState<{ [productId: string]: ShadeColor }>({});
  const [selectedSizePerProduct, setSelectedSizePerProduct] = useState<{ [productId: string]: PackSize }>({});
  const [addedProductNotification, setAddedProductNotification] = useState<string | null>(null);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Coatings' },
    { id: 'interior', label: 'Interior Luxury Emulsions' },
    { id: 'exterior', label: 'Exterior Weather Guard' },
    { id: 'wood-metal', label: 'Gloss Wood & Metal Enamels' },
    { id: 'primers', label: 'Surface Preparation & Primers' },
    { id: 'industrial', label: 'Industrial High-Performance' },
  ];

  const finishes: PaintFinish[] = ['Matte', 'Sheen', 'High Gloss', 'Eggshell', 'Satin'];

  const surfaces: ApplicationSurface[] = [
    'Interior Walls & Ceilings',
    'Exterior Masonry & Concrete',
    'Wood & Cabinetry',
    'Metal & Structural Steel',
    'Concrete Floors',
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      // Finish
      if (selectedFinish !== 'all' && p.finish !== selectedFinish) return false;
      // Surface
      if (selectedSurface !== 'all' && !p.surfaces.includes(selectedSurface as ApplicationSurface)) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [selectedCategory, selectedFinish, selectedSurface, searchQuery, sortBy]);

  const handleSelectProductShade = (productId: string, shade: ShadeColor) => {
    setSelectedShadesPerProduct((prev) => ({ ...prev, [productId]: shade }));
    setActiveShadePickerProductId(null);
  };

  const handleAddDirectToCart = (product: Product) => {
    const shade = selectedShadesPerProduct[product.id] || SHADES.find(s => s.id === product.availableShadeIds[0]) || SHADES[0];
    const size = selectedSizePerProduct[product.id] || '3.64L (Gallon)';
    onAddToCart(product, shade, size, 1);
    setAddedProductNotification(product.id);
    setTimeout(() => {
      setAddedProductNotification(null);
    }, 1200);
  };

  return (
    <div id="products-page-root" className="w-full bg-[#F8F9FA] pb-20">
      {/* Products Banner Header - Bold Typography Theme */}
      <div className="bg-[#0F2027] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00CED1]">
            ENGINEERED COATINGS CATALOG
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-1">
            Gallop Paints &amp; Architectural Coatings
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Explore our advanced luxury emulsions, weather-shield exterior shields, synthetic enamels, and specialized surface primers.
          </p>

          {/* Quick Category Bar Tabs */}
          <div className="flex gap-2 overflow-x-auto pt-8 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#00CED1] text-[#0F2027] shadow-md scale-102'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Filter & Catalog Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Interactive Filters Bar (Finish & Application Surface) */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search within catalog */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search by paint name or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-amber-400 bg-slate-50"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Sort & Counter */}
            <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
              <span className="text-xs text-slate-500 font-medium">
                Showing <strong>{filteredProducts.length}</strong> formulated product(s)
              </span>

              <div className="flex items-center gap-1.5 text-xs text-slate-700">
                <span className="font-semibold text-slate-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold outline-none"
                >
                  <option value="featured">Featured / Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Interactive Finish & Surface Badges */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs">
            {/* Filter by Finish */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
                <span>Finish:</span>
              </span>
              <button
                onClick={() => setSelectedFinish('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedFinish === 'all'
                    ? 'bg-[#0F2027] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Finishes
              </button>
              {finishes.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFinish(f)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedFinish === f
                      ? 'bg-[#0F2027] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Filter by Application Surface */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-700">Surface:</span>
              <button
                onClick={() => setSelectedSurface('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedSurface === 'all'
                    ? 'bg-[#0F2027] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Surfaces
              </button>
              {surfaces.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSurface(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedSurface === s
                      ? 'bg-[#0F2027] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500">
            <p className="text-base font-bold text-slate-800">No coatings matched your filter criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting finish or surface filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedFinish('all');
                setSelectedSurface('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#0F2027] text-amber-400 text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const currentChosenShade =
                selectedShadesPerProduct[product.id] ||
                SHADES.find((s) => s.id === product.availableShadeIds[0]) ||
                SHADES[0];
              const currentChosenSize = selectedSizePerProduct[product.id] || '3.64L (Gallon)';
              const currentPrice = product.prices[currentChosenSize];
              const isAdded = addedProductNotification === product.id;
              const isShadePickerOpen = activeShadePickerProductId === product.id;

              return (
                <div
                  key={product.id}
                  id={`product-card-${product.id}`}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  {/* Card Visual Header */}
                  <div className="p-6 bg-gradient-to-b from-slate-100 to-white flex flex-col items-center justify-center relative">
                    <div className="w-full flex items-center justify-between absolute top-4 left-4 right-4 px-4">
                      <span className="text-[10px] font-bold bg-[#0F2027] text-white px-2.5 py-1 rounded-md">
                        {product.finish}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        {product.vocLevel}
                      </span>
                    </div>

                    {/* Paint Bucket Graphic with Active Chosen Shade */}
                    <div
                      onClick={() => onOpenProductDetail(product)}
                      className="w-28 h-36 my-4 rounded-2xl bg-[#0F2027] shadow-xl border-2 border-slate-300 p-2.5 flex flex-col justify-between items-center cursor-pointer group-hover:scale-105 transition-transform relative overflow-hidden"
                    >
                      <div className="w-full h-2.5 bg-gradient-to-r from-slate-300 via-white to-slate-300 rounded" />
                      
                      {/* Active Swatch in Can */}
                      <div
                        className="w-14 h-14 rounded-xl shadow-md border-2 border-white/80 transition-colors duration-500 relative overflow-hidden"
                        style={{ backgroundColor: currentChosenShade.hex }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                      </div>

                      <span className="text-[9px] font-black tracking-widest text-amber-300 uppercase">
                        GALLOP PAINTS
                      </span>
                    </div>

                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      {product.categoryLabel}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3
                          onClick={() => onOpenProductDetail(product)}
                          className="text-base font-black text-slate-900 hover:text-amber-600 transition-colors cursor-pointer leading-snug"
                        >
                          {product.name}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Key features bullets */}
                      <ul className="mt-3 space-y-1 text-[11px] text-slate-500">
                        {product.features.slice(0, 2).map((feat, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Selected Shade Indicator Strip */}
                      <div className="mt-4 p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-md border border-slate-300 shadow-xs"
                            style={{ backgroundColor: currentChosenShade.hex }}
                          />
                          <div className="text-left">
                            <span className="text-[11px] font-bold text-slate-800 block leading-tight">
                              {currentChosenShade.name}
                            </span>
                            <span className="text-[9px] text-slate-400 font-mono">
                              {currentChosenShade.code}
                            </span>
                          </div>
                        </div>

                        {/* Button 1: "Select Shade" */}
                        <button
                          id={`btn-select-shade-${product.id}`}
                          onClick={() =>
                            setActiveShadePickerProductId(
                              isShadePickerOpen ? null : product.id
                            )
                          }
                          className="px-2.5 py-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <Palette className="w-3 h-3" />
                          <span>Select Shade</span>
                        </button>
                      </div>

                      {/* Expandable Shade Swatches Palette Picker */}
                      {isShadePickerOpen && (
                        <div className="mt-2 p-3 bg-white border border-amber-300 rounded-xl shadow-lg animate-in fade-in duration-200">
                          <div className="text-[10px] font-bold text-slate-600 mb-2">
                            Choose Shade for {product.name}:
                          </div>
                          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                            {product.availableShadeIds.map((sId) => {
                              const s = SHADES.find((item) => item.id === sId);
                              if (!s) return null;
                              return (
                                <button
                                  key={s.id}
                                  onClick={() => handleSelectProductShade(product.id, s)}
                                  className="w-7 h-7 rounded-lg border border-slate-300 hover:scale-110 transition-transform shadow-xs relative"
                                  style={{ backgroundColor: s.hex }}
                                  title={`${s.name} (${s.code})`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Packaging Size Selector */}
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Pack Size:</span>
                        <div className="flex gap-1">
                          {(['0.91L (Quarter)', '3.64L (Gallon)', '14.56L (Drum)'] as PackSize[]).map((size) => (
                            <button
                              key={size}
                              onClick={() =>
                                setSelectedSizePerProduct((prev) => ({
                                  ...prev,
                                  [product.id]: size,
                                }))
                              }
                              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                                currentChosenSize === size
                                  ? 'bg-[#0F2027] text-white'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {size.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400 block leading-tight">Factory Price</span>
                        <span className="text-sm font-black text-slate-900">
                          PKR {currentPrice.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Quick View Button */}
                        <button
                          onClick={() => onOpenProductDetail(product)}
                          className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="View Full Specifications"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Button 2: "Add to Cart" */}
                        <button
                          id={`btn-add-to-cart-${product.id}`}
                          onClick={() => handleAddDirectToCart(product)}
                          disabled={isAdded}
                          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-[#0F2027] hover:bg-slate-800 text-amber-400 active:scale-95'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
