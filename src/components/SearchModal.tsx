import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Tag, Palette, MapPin } from 'lucide-react';
import { PRODUCTS, SHADES, DEALERS } from '../data/paintsData';
import { Product, ShadeColor, DealerLocation, PageId } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectShade: (shade: ShadeColor) => void;
  onNavigate: (page: PageId) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectShade,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return { products: [], shades: [], dealers: [] };
    const q = query.toLowerCase();

    const matchedProducts = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.finish.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    const matchedShades = SHADES.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.spectrum.toLowerCase().includes(q)
    );

    const matchedDealers = DEALERS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.address.toLowerCase().includes(q)
    );

    return { products: matchedProducts, shades: matchedShades, dealers: matchedDealers };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      id="search-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-200"
    >
      <div
        id="search-modal-container"
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search paint name, shade code (e.g. GP-104), finish, dealer city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent outline-none font-medium text-slate-900 placeholder:text-slate-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold px-1.5"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        {!query && (
          <div className="p-4 bg-white border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                'Royal Silk',
                'Weather-Shield',
                'Velvet Matte',
                'Imperial Navy',
                'Terracotta',
                'Wall Sealer',
                'Lahore Dealers',
                'Epoxy',
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setQuery(chip)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-xs font-semibold transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {query &&
            searchResults.products.length === 0 &&
            searchResults.shades.length === 0 &&
            searchResults.dealers.length === 0 && (
              <div className="py-8 text-center text-slate-500 text-xs">
                No matching results found for <strong className="text-slate-800">"{query}"</strong>.
                Try searching for "Interior", "Weather", "Mint", or "Lahore".
              </div>
            )}

          {/* Products Results */}
          {searchResults.products.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Tag className="w-3.5 h-3.5 text-amber-500" />
                <span>Paints & Coatings ({searchResults.products.length})</span>
              </div>
              <div className="space-y-2">
                {searchResults.products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onClose();
                      onSelectProduct(product);
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        {product.categoryLabel} • {product.finish} Finish • From PKR{' '}
                        {product.prices['3.64L (Gallon)'].toLocaleString()}/Gallon
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 transition-transform group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shade Cards Results */}
          {searchResults.shades.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <Palette className="w-3.5 h-3.5 text-emerald-500" />
                <span>Digital Shade Cards ({searchResults.shades.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {searchResults.shades.map((shade) => (
                  <div
                    key={shade.id}
                    onClick={() => {
                      onClose();
                      onSelectShade(shade);
                    }}
                    className="p-2 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className="w-8 h-8 rounded-lg shadow-xs border border-slate-300 flex-shrink-0"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                        {shade.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {shade.code} • {shade.spectrum}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dealers Results */}
          {searchResults.dealers.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                <span>Authorized Dealers ({searchResults.dealers.length})</span>
              </div>
              <div className="space-y-1.5">
                {searchResults.dealers.map((dealer) => (
                  <div
                    key={dealer.id}
                    onClick={() => {
                      onClose();
                      onNavigate('contact');
                    }}
                    className="p-2 rounded-xl hover:bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-cyan-600">
                        {dealer.name} ({dealer.city})
                      </div>
                      <div className="text-[11px] text-slate-500">{dealer.address}</div>
                    </div>
                    <span className="text-[10px] font-semibold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded">
                      View on Map
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
