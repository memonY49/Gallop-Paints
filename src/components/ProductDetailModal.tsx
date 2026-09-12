import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShoppingCart, 
  ShieldCheck, 
  Droplet, 
  Sparkles, 
  Clock, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { Product, PackSize, ShadeColor } from '../types';
import { SHADES } from '../data/paintsData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, shade: ShadeColor, packSize: PackSize, qty: number) => void;
  onTryInVisualizer: (shade: ShadeColor) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onTryInVisualizer,
}) => {
  const [selectedSize, setSelectedSize] = useState<PackSize>('3.64L (Gallon)');
  const [selectedShadeId, setSelectedShadeId] = useState<string>(
    product?.availableShadeIds[0] || SHADES[0].id
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  if (!product) return null;

  const currentShade = SHADES.find((s) => s.id === selectedShadeId) || SHADES[0];
  const unitPrice = product.prices[selectedSize];
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(product, currentShade, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const packSizes: PackSize[] = [
    '0.91L (Quarter)',
    '3.64L (Gallon)',
    '14.56L (Drum)',
  ];

  return (
    <div
      id="product-detail-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        id="product-detail-modal"
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Left Column: Visual Can & Shade Swatch Showcase */}
        <div className="w-full md:w-5/12 bg-[#0F2027] p-6 text-white flex flex-col justify-between items-center text-center relative overflow-hidden">
          {/* Ambient Glow */}
          <div
            className="absolute -top-12 -left-12 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: currentShade.hex }}
          />

          <div className="w-full flex items-center justify-between z-10">
            <span className="text-[10px] font-mono tracking-wider uppercase bg-white/10 px-2.5 py-1 rounded-full text-amber-300">
              {product.categoryLabel}
            </span>
            <span className="text-xs font-bold text-slate-300">
              {product.warranty}
            </span>
          </div>

          {/* Product Can & Swatch Render */}
          <div className="my-6 flex flex-col items-center z-10">
            <div
              className="w-32 h-40 rounded-2xl shadow-2xl border-4 border-slate-700/80 p-3 flex flex-col justify-between items-center relative overflow-hidden transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, #1A2E35 0%, #0F2027 100%)`,
              }}
            >
              {/* Metallic Lid */}
              <div className="w-full h-3 bg-gradient-to-r from-slate-400 via-white to-slate-400 rounded-t" />
              
              {/* Color Tint Window */}
              <div
                className="w-16 h-16 rounded-xl shadow-md border-2 border-white/60 transition-colors duration-500 relative overflow-hidden"
                style={{ backgroundColor: currentShade.hex }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-black/25 to-transparent" />
              </div>

              <div className="text-[9px] font-black tracking-widest text-amber-300 uppercase">
                GALLOP PAINTS
              </div>
            </div>

            <div className="mt-3">
              <h4 className="text-sm font-bold text-white">{currentShade.name}</h4>
              <p className="text-xs text-amber-400 font-mono">{currentShade.code} • {currentShade.spectrum}</p>
            </div>
          </div>

          {/* Try in visualizer shortcut */}
          <button
            onClick={() => {
              onClose();
              onTryInVisualizer(currentShade);
            }}
            className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/20 transition-colors flex items-center justify-center gap-2 cursor-pointer z-10"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Preview in Room Visualizer</span>
          </button>
        </div>

        {/* Right Column: Spec details, Pack Size, Quantity & Add to Cart */}
        <div className="w-full md:w-7/12 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                  {product.finish} Finish
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-tight mt-0.5">
                  {product.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              {product.description}
            </p>

            {/* Spec Badges Grid */}
            <div className="grid grid-cols-2 gap-2 my-4 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Drying Time</span>
                  <strong className="text-slate-800 text-[11px]">{product.dryingTime}</strong>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Coverage</span>
                  <strong className="text-slate-800 text-[11px]">{product.coverage}</strong>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <Droplet className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">VOC Content</span>
                  <strong className="text-slate-800 text-[11px]">{product.vocLevel}</strong>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Washability</span>
                  <strong className="text-slate-800 text-[11px]">{product.washability}</strong>
                </div>
              </div>
            </div>

            {/* Select Shade Palette */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Select Shade Color: <span className="text-amber-600 font-semibold">{currentShade.name}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.availableShadeIds.map((sId) => {
                  const s = SHADES.find((item) => item.id === sId);
                  if (!s) return null;
                  const isSelected = selectedShadeId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedShadeId(s.id)}
                      className={`w-7 h-7 rounded-lg border-2 relative transition-all ${
                        isSelected
                          ? 'border-[#0F2027] scale-110 shadow-md ring-2 ring-amber-400'
                          : 'border-slate-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: s.hex }}
                      title={`${s.name} (${s.code})`}
                    >
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-slate-900 absolute inset-0 m-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pack Size Selector */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Select Packaging Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {packSizes.map((size) => {
                  const isSelected = selectedSize === size;
                  const price = product.prices[size];
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-2 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-[#0F2027] text-white border-[#0F2027] shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-[11px] font-bold leading-tight">{size}</div>
                      <div className={`text-xs font-black mt-1 ${isSelected ? 'text-amber-300' : 'text-slate-900'}`}>
                        PKR {price.toLocaleString()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quantity & Add to Cart Action */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-lg hover:bg-white text-slate-700 font-bold flex items-center justify-center text-sm"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-black text-slate-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-lg hover:bg-white text-slate-700 font-bold flex items-center justify-center text-sm"
              >
                +
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAdd}
              disabled={added}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow cursor-pointer ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#0F2027] hover:bg-slate-800 text-amber-400'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart • PKR {totalPrice.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
