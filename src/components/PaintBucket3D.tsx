import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Leaf, Shield, RotateCcw, Palette } from 'lucide-react';
import { ShadeColor } from '../types';
import { SHADES } from '../data/paintsData';

interface PaintBucket3DProps {
  initialShade?: ShadeColor;
  onSelectShade?: (shade: ShadeColor) => void;
  className?: string;
}

export const PaintBucket3D: React.FC<PaintBucket3DProps> = ({
  initialShade = SHADES[4], // Raw Cashmere default
  onSelectShade,
  className = '',
}) => {
  const [currentShade, setCurrentShade] = useState<ShadeColor>(initialShade);
  const [rotation, setRotation] = useState({ x: 8, y: -15 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeCallout, setActiveCallout] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync if initialShade changes externally
  useEffect(() => {
    if (initialShade) setCurrentShade(initialShade);
  }, [initialShade]);

  // Subtle auto-float effect when not dragging
  useEffect(() => {
    let frameId: number;
    let time = 0;
    const animate = () => {
      if (!isDragging) {
        time += 0.02;
        setRotation((prev) => ({
          x: 6 + Math.sin(time) * 3,
          y: -12 + Math.cos(time * 0.7) * 8,
        }));
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setRotation((prev) => ({
      x: Math.max(-20, Math.min(25, prev.x - deltaY * 0.4)),
      y: prev.y + deltaX * 0.5,
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const quickSwatches = [
    SHADES[0], // Crisp Alabaster (#F8F9FA)
    SHADES[4], // Raw Cashmere (#D6CEC2)
    SHADES[8], // Mint Breeze (#A3D9C9)
    SHADES[12], // Imperial Navy (#0F2027)
    SHADES[16], // Terracotta (#C3523B)
    SHADES[13], // Royal Emerald (#1B4D3E)
  ];

  return (
    <div
      ref={containerRef}
      id="gallop-3d-paint-bucket-section"
      className={`relative w-full max-w-[540px] mx-auto select-none flex flex-col items-center justify-center p-4 ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 3D Perspective Stage */}
      <div
        className="relative w-72 h-88 sm:w-80 sm:h-96 cursor-grab active:cursor-grabbing flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        {/* Soft Radial Ambient Studio Lighting */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-35 transition-colors duration-700 pointer-events-none"
          style={{ backgroundColor: currentShade.hex }}
        />

        {/* 3D Transform Bucket Container */}
        <div
          className="relative w-64 h-80 transition-transform duration-100 ease-out preserve-3d"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Top Metallic Handle Arc */}
          <div
            className="absolute -top-14 left-1/2 -translate-x-1/2 w-64 h-32 border-4 border-slate-300 rounded-t-full pointer-events-none shadow-md z-30"
            style={{
              borderColor: '#94A3B8',
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.2)',
              transform: 'translateZ(10px) rotateX(-15deg)',
            }}
          >
            {/* Rubber Grip Handle Center */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-4.5 bg-[#0F2027] rounded-full border border-slate-400 shadow flex items-center justify-center">
              <div className="w-12 h-1 bg-amber-400/80 rounded-full" />
            </div>
          </div>

          {/* Lid & Rim (Chrome Finish) */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 w-64 h-16 rounded-[50%] z-20 shadow-lg border-2 border-slate-200"
            style={{
              background: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 30%, #94A3B8 50%, #F8FAFC 70%, #64748B 100%)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
              transform: 'translateZ(15px)',
            }}
          >
            {/* Inner Recessed Lid Surface with Active Paint Tint */}
            <div
              className="absolute inset-2.5 rounded-[50%] flex items-center justify-center shadow-inner transition-colors duration-500 overflow-hidden"
              style={{ backgroundColor: currentShade.hex }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-white/20 to-transparent pointer-events-none" />
              {/* Embossed Gallop Horse Brand Ring on Lid */}
              <div className="w-16 h-8 border border-white/40 rounded-full flex items-center justify-center">
                <span className="text-[9px] font-black tracking-widest text-white/90 drop-shadow">
                  GALLOP
                </span>
              </div>
            </div>
          </div>

          {/* Upper Chrome Rim Ring */}
          <div
            className="absolute top-10 left-1/2 -translate-x-1/2 w-[246px] h-6 rounded-[50%] z-15 bg-gradient-to-r from-slate-400 via-slate-100 to-slate-500 border-b border-slate-600/30"
          />

          {/* Bucket Cylinder Body */}
          <div
            className="absolute top-12 left-1/2 -translate-x-1/2 w-[240px] h-[260px] rounded-b-[24px] overflow-hidden shadow-2xl z-10"
            style={{
              background: 'linear-gradient(90deg, #091317 0%, #0F2027 15%, #1C333D 45%, #254452 55%, #0F2027 85%, #081115 100%)',
              boxShadow: '0 20px 35px -5px rgba(15, 32, 39, 0.4), inset 4px 0 8px rgba(255,255,255,0.15), inset -4px 0 8px rgba(0,0,0,0.4)',
            }}
          >
            {/* Gloss Specular Light Reflection Overlay */}
            <div className="absolute top-0 left-12 w-8 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-12deg] pointer-events-none" />

            {/* Premium Gold Accent Band at top */}
            <div className="w-full h-3 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-700 shadow-sm" />

            {/* Front Label Artwork */}
            <div className="p-3.5 flex flex-col items-center text-center justify-between h-[235px]">
              {/* Brand Header */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-amber-400/40">
                  {/* Galloping Horse Mini Silhouette */}
                  <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 5c-1.5 0-2.8.8-3.5 2-1-.6-2.2-.9-3.5-.9-2.8 0-5.2 1.6-6.4 4-.8 1.6-1.6 3-2.6 4.1l1.5 1.5c1.4-1.4 2.4-3.1 3.2-4.9.8-1.8 2.5-3 4.3-3 1.2 0 2.2.5 3 1.3L12 12l2.5 3.5 3-1.5L20 18l1.5-1-2.5-4.5 1-1.5c.6.3 1.3.5 2 .5 2.2 0 4-1.8 4-4s-1.8-4-4-4c-.7 0-1.4.2-2 .5V5h-1z" />
                  </svg>
                  <span className="text-[10px] tracking-widest font-black text-amber-300">
                    SINCE 1989
                  </span>
                </div>

                <h3 className="text-xl font-black text-white tracking-tight mt-1 drop-shadow">
                  GALLOP PAINTS
                </h3>
                <span className="text-[9px] font-semibold text-cyan-300 tracking-wider uppercase">
                  Royal Silk Luxury Emulsion
                </span>
              </div>

              {/* Tint Swatch & Real Color Visual Window */}
              <div className="w-full bg-slate-900/80 rounded-xl p-2.5 border border-slate-700/60 shadow-inner my-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-9 h-9 rounded-lg border-2 border-white/80 shadow-md transition-colors duration-500 relative overflow-hidden flex-shrink-0"
                      style={{ backgroundColor: currentShade.hex }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                    </div>
                    <div className="text-left">
                      <div className="text-[11px] font-bold text-white leading-tight">
                        {currentShade.name}
                      </div>
                      <div className="text-[9px] font-mono text-amber-300">
                        {currentShade.code}
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] font-medium px-2 py-0.5 rounded bg-white/10 text-slate-200 border border-white/15 whitespace-nowrap">
                    {currentShade.spectrum}
                  </span>
                </div>
              </div>

              {/* Formula & Technology Badges on Can */}
              <div className="w-full grid grid-cols-3 gap-1 text-[8px] text-slate-300 font-semibold border-t border-slate-700/60 pt-1.5">
                <div className="bg-white/5 py-1 rounded text-center">
                  <span className="block text-emerald-400 font-bold">LOW VOC</span>
                  Eco-Safe
                </div>
                <div className="bg-white/5 py-1 rounded text-center">
                  <span className="block text-amber-300 font-bold">10-YR</span>
                  Retention
                </div>
                <div className="bg-white/5 py-1 rounded text-center">
                  <span className="block text-cyan-400 font-bold">3.64 L</span>
                  Gallon Pack
                </div>
              </div>

              {/* Barcode & ISO seal snippet */}
              <div className="w-full flex items-center justify-between text-[7px] text-slate-400 px-1 pt-0.5">
                <span>ISO 9001:2015 CERTIFIED</span>
                <span className="font-mono tracking-widest text-[8px]">||||| ||| |||||||</span>
              </div>
            </div>

            {/* Bottom Metallic Seal Band */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-slate-600 via-slate-300 to-slate-700 border-t border-slate-500" />
          </div>

          {/* Cast Drop Shadow on Floor */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-60 h-10 rounded-[50%] bg-black/40 blur-md pointer-events-none"
            style={{ transform: 'translateZ(-30px)' }}
          />
        </div>

        {/* ========================================================================= */}
        {/* HOVERABLE CALLOUT BADGES ATTACHED TO THE BUCKET (Requirement 2, Page 1) */}
        {/* ========================================================================= */}

        {/* BADGE 1: Top Left - 100% Rich Color Retention & Anti-Fungal */}
        <div
          id="badge-color-retention"
          className="absolute -top-3 -left-4 sm:-left-12 z-40 transition-all duration-300 cursor-pointer"
          onMouseEnter={() => setActiveCallout(1)}
          onMouseLeave={() => setActiveCallout(null)}
        >
          <div
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl shadow-lg border-l-4 border-fuchsia-500 transition-all duration-300 ${
              activeCallout === 1
                ? 'bg-[#0F2027] text-white shadow-xl scale-105'
                : 'bg-white text-slate-900 border border-y-slate-200 border-r-slate-200 hover:shadow-xl'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-fuchsia-500/10 text-fuchsia-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h4 className="text-[11px] font-black uppercase tracking-wider leading-tight">ANTI-FUNGAL</h4>
              <p className={`text-[9px] font-bold ${activeCallout === 1 ? 'text-fuchsia-300' : 'text-slate-500'}`}>100% Rich Color Retention</p>
            </div>
          </div>
          {/* Connector Line to Bucket */}
          <div className="hidden sm:block absolute top-1/2 left-full w-8 h-[2px] bg-gradient-to-r from-fuchsia-500 to-transparent pointer-events-none" />
        </div>

        {/* BADGE 2: Center Right - Eco-Friendly, Low VOC Formulations */}
        <div
          id="badge-eco-friendly"
          className="absolute top-1/3 -right-4 sm:-right-16 z-40 transition-all duration-300 cursor-pointer"
          onMouseEnter={() => setActiveCallout(2)}
          onMouseLeave={() => setActiveCallout(null)}
        >
          <div
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl shadow-lg border-l-4 border-emerald-500 transition-all duration-300 ${
              activeCallout === 2
                ? 'bg-[#0F2027] text-white shadow-xl scale-105'
                : 'bg-white text-slate-900 border border-y-slate-200 border-r-slate-200 hover:shadow-xl'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h4 className="text-[11px] font-black uppercase tracking-wider leading-tight">ECO-FRIENDLY</h4>
              <p className={`text-[9px] font-bold ${activeCallout === 2 ? 'text-emerald-300' : 'text-slate-500'}`}>Low VOC Formulations</p>
            </div>
          </div>
          {/* Connector Line to Bucket */}
          <div className="hidden sm:block absolute top-1/2 right-full w-8 h-[2px] bg-gradient-to-l from-emerald-500 to-transparent pointer-events-none" />
        </div>

        {/* BADGE 3: Bottom Left - Weather-Shield & Ultra-Washable Tech */}
        <div
          id="badge-weather-shield"
          className="absolute bottom-4 -left-4 sm:-left-14 z-40 transition-all duration-300 cursor-pointer"
          onMouseEnter={() => setActiveCallout(3)}
          onMouseLeave={() => setActiveCallout(null)}
        >
          <div
            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl shadow-lg border-l-4 border-[#00CED1] transition-all duration-300 ${
              activeCallout === 3
                ? 'bg-[#0F2027] text-white shadow-xl scale-105'
                : 'bg-white text-slate-900 border border-y-slate-200 border-r-slate-200 hover:shadow-xl'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-[#00CED1]/10 text-[#00CED1] flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h4 className="text-[11px] font-black uppercase tracking-wider leading-tight">WEATHER-SHIELD</h4>
              <p className={`text-[9px] font-bold ${activeCallout === 3 ? 'text-[#00CED1]' : 'text-slate-500'}`}>Ultra-Washable Technology</p>
            </div>
          </div>
          {/* Connector Line to Bucket */}
          <div className="hidden sm:block absolute top-1/2 left-full w-8 h-[2px] bg-gradient-to-r from-[#00CED1] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Interactive Controls Bar Beneath 3D Bucket */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mr-1">
          <Palette className="w-3.5 h-3.5 text-amber-500" />
          <span className="hidden sm:inline">Change Can Shade:</span>
        </div>

        {/* Quick Color Swatches */}
        <div className="flex items-center gap-1.5">
          {quickSwatches.map((swatch) => {
            const isSelected = currentShade.id === swatch.id;
            return (
              <button
                key={swatch.id}
                id={`bucket-swatch-${swatch.code}`}
                onClick={() => {
                  setCurrentShade(swatch);
                  if (onSelectShade) onSelectShade(swatch);
                }}
                className={`w-6 h-6 rounded-full transition-transform border-2 relative ${
                  isSelected ? 'scale-125 border-[#0F2027] shadow-md ring-2 ring-amber-400' : 'border-white shadow-xs hover:scale-110'
                }`}
                style={{ backgroundColor: swatch.hex }}
                title={`${swatch.name} (${swatch.code})`}
                aria-label={swatch.name}
              />
            );
          })}
        </div>

        {/* Reset / Drag Prompt */}
        <button
          id="btn-reset-bucket-angle"
          onClick={() => setRotation({ x: 8, y: -15 })}
          className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-[#0F2027] font-medium ml-2 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
          title="Reset 3D angle"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden md:inline">Drag to Rotate</span>
        </button>
      </div>
    </div>
  );
};
