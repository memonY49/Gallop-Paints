import React, { useState } from 'react';
import { X, Calculator, Plus, Minus, ArrowRight, Check } from 'lucide-react';
import { Product, ShadeColor } from '../types';
import { PRODUCTS, SHADES } from '../data/paintsData';

interface PaintCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, shade: ShadeColor, packSize: any, qty: number) => void;
}

export const PaintCalculatorModal: React.FC<PaintCalculatorModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [unit, setUnit] = useState<'feet' | 'meters'>('feet');
  const [roomLength, setRoomLength] = useState<number>(14);
  const [roomWidth, setRoomWidth] = useState<number>(12);
  const [roomHeight, setRoomHeight] = useState<number>(10);
  const [doorsCount, setDoorsCount] = useState<number>(1);
  const [windowsCount, setWindowsCount] = useState<number>(2);
  const [includeCeiling, setIncludeCeiling] = useState<boolean>(true);
  const [coats, setCoats] = useState<number>(2);
  const [selectedProductId, setSelectedProductId] = useState<string>(PRODUCTS[0].id);
  const [selectedShadeId, setSelectedShadeId] = useState<string>(SHADES[4].id);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  // Calculation Math
  // Wall perimeter * height
  // In feet: Area in sq ft
  const perimeter = 2 * (roomLength + roomWidth);
  let wallArea = perimeter * roomHeight;
  if (includeCeiling) {
    wallArea += roomLength * roomWidth;
  }

  // Deductions: typical door = 21 sq ft (approx 2 m²), typical window = 15 sq ft (approx 1.4 m²)
  const doorDeduction = unit === 'feet' ? doorsCount * 21 : doorsCount * 2;
  const windowDeduction = unit === 'feet' ? windowsCount * 15 : windowsCount * 1.4;
  const netArea = Math.max(10, wallArea - doorDeduction - windowDeduction);

  // Convert to sq meters for standard paint coverage if entered in feet (1 sq meter = 10.764 sq ft)
  const netAreaM2 = unit === 'feet' ? netArea / 10.764 : netArea;

  // Standard coverage rate: ~14 m² per liter per coat for Royal Silk Emulsion
  const coverageRate = 14;
  const totalLitersRequired = (netAreaM2 * coats) / coverageRate;

  // Recommended packs breakdown:
  // Drum = 14.56L, Gallon = 3.64L, Quarter = 0.91L
  const drums = Math.floor(totalLitersRequired / 14.56);
  const remainingAfterDrums = totalLitersRequired % 14.56;
  const gallons = Math.ceil(remainingAfterDrums / 3.64);

  const selectedProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const selectedShade = SHADES.find((s) => s.id === selectedShadeId) || SHADES[4];

  // Estimated Cost
  const estimatedCost =
    drums * selectedProduct.prices['14.56L (Drum)'] +
    gallons * selectedProduct.prices['3.64L (Gallon)'];

  const handleAddCalculatedToCart = () => {
    if (drums > 0) {
      onAddToCart(selectedProduct, selectedShade, '14.56L (Drum)', drums);
    }
    if (gallons > 0) {
      onAddToCart(selectedProduct, selectedShade, '3.64L (Gallon)', gallons);
    }
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      id="paint-calculator-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        id="paint-calculator-modal"
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-[#0F2027] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                Gallop Architectural Paint Estimator
              </h3>
              <p className="text-xs text-slate-300">
                Accurately estimate liters, pack quantities, and factory cost
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Calculator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs sm:text-sm">
          {/* Unit Toggle */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-slate-700">Measurement Unit</span>
            <div className="flex rounded-lg bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setUnit('feet')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  unit === 'feet' ? 'bg-white shadow text-[#0F2027]' : 'text-slate-500'
                }`}
              >
                Feet (ft)
              </button>
              <button
                type="button"
                onClick={() => setUnit('meters')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  unit === 'meters' ? 'bg-white shadow text-[#0F2027]' : 'text-slate-500'
                }`}
              >
                Meters (m)
              </button>
            </div>
          </div>

          {/* Dimension Inputs */}
          <div>
            <label className="block font-bold text-slate-900 mb-2">
              Room Dimensions ({unit})
            </label>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="block text-xs text-slate-500 mb-1">Length</span>
                <input
                  type="number"
                  min={4}
                  max={200}
                  value={roomLength}
                  onChange={(e) => setRoomLength(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>
              <div>
                <span className="block text-xs text-slate-500 mb-1">Width</span>
                <input
                  type="number"
                  min={4}
                  max={200}
                  value={roomWidth}
                  onChange={(e) => setRoomWidth(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>
              <div>
                <span className="block text-xs text-slate-500 mb-1">Height</span>
                <input
                  type="number"
                  min={6}
                  max={40}
                  value={roomHeight}
                  onChange={(e) => setRoomHeight(Number(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Openings & Additions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Doors Count */}
            <div>
              <span className="block text-xs text-slate-500 mb-1 font-medium">Doors</span>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setDoorsCount(Math.max(0, doorsCount - 1))}
                  className="p-2 hover:bg-slate-100 text-slate-600"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="flex-1 text-center font-bold">{doorsCount}</span>
                <button
                  onClick={() => setDoorsCount(doorsCount + 1)}
                  className="p-2 hover:bg-slate-100 text-slate-600"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Windows Count */}
            <div>
              <span className="block text-xs text-slate-500 mb-1 font-medium">Windows</span>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setWindowsCount(Math.max(0, windowsCount - 1))}
                  className="p-2 hover:bg-slate-100 text-slate-600"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="flex-1 text-center font-bold">{windowsCount}</span>
                <button
                  onClick={() => setWindowsCount(windowsCount + 1)}
                  className="p-2 hover:bg-slate-100 text-slate-600"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Coats */}
            <div>
              <span className="block text-xs text-slate-500 mb-1 font-medium">Number of Coats</span>
              <div className="flex rounded-lg bg-slate-100 p-1 border border-slate-200">
                <button
                  onClick={() => setCoats(1)}
                  className={`flex-1 py-1 rounded text-xs font-bold ${
                    coats === 1 ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                  }`}
                >
                  1 Coat
                </button>
                <button
                  onClick={() => setCoats(2)}
                  className={`flex-1 py-1 rounded text-xs font-bold ${
                    coats === 2 ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                  }`}
                >
                  2 Coats
                </button>
                <button
                  onClick={() => setCoats(3)}
                  className={`flex-1 py-1 rounded text-xs font-bold ${
                    coats === 3 ? 'bg-white shadow text-slate-900' : 'text-slate-500'
                  }`}
                >
                  3 Coats
                </button>
              </div>
            </div>
          </div>

          {/* Include Ceiling toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeCeiling}
              onChange={(e) => setIncludeCeiling(e.target.checked)}
              className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400"
            />
            <span className="text-xs font-medium text-slate-700">
              Include Ceiling Area in Paint Estimation
            </span>
          </label>

          {/* Product & Shade selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select Paint Formulation
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-amber-400 outline-none"
              >
                {PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.finish})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select Color Shade
              </label>
              <select
                value={selectedShadeId}
                onChange={(e) => setSelectedShadeId(e.target.value)}
                className="w-full p-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-amber-400 outline-none"
              >
                {SHADES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code} - {s.name} ({s.spectrum})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Display Card */}
          <div className="bg-gradient-to-br from-slate-900 to-[#0F2027] text-white p-4 sm:p-5 rounded-2xl shadow-lg border border-slate-800">
            <div className="flex items-center justify-between mb-3 border-b border-slate-700 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Estimation Summary
              </span>
              <span className="text-xs text-slate-300">
                Net Area: <strong>{Math.round(netArea)} {unit}²</strong> (~{Math.round(netAreaM2)} m²)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center my-4">
              <div className="bg-white/10 rounded-xl p-3">
                <span className="block text-[11px] text-slate-300">Required Paint</span>
                <span className="text-xl sm:text-2xl font-black text-amber-400">
                  {totalLitersRequired.toFixed(1)} L
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">for {coats} coats</span>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <span className="block text-[11px] text-slate-300">Recommended Cans</span>
                <div className="text-sm font-bold text-white mt-1">
                  {drums > 0 && <span>{drums} Drum(s) </span>}
                  {gallons > 0 && <span>{gallons} Gallon(s)</span>}
                </div>
                <span className="text-[10px] text-slate-400 block mt-0.5">Factory sealed</span>
              </div>
              <div className="bg-white/10 rounded-xl p-3 col-span-2 sm:col-span-1">
                <span className="block text-[11px] text-slate-300">Estimated Cost</span>
                <span className="text-lg sm:text-xl font-black text-emerald-400">
                  PKR {estimatedCost.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">M.R.P. Inc. Tax</span>
              </div>
            </div>

            <button
              onClick={handleAddCalculatedToCart}
              disabled={addedSuccess}
              className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                addedSuccess
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 hover:shadow-lg'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added {drums + gallons} Cans to Cart!</span>
                </>
              ) : (
                <>
                  <span>Add Recommended Cans to Cart</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
