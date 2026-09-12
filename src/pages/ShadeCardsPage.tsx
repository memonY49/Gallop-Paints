import React, { useState } from 'react';
import { 
  Palette, 
  Sparkles, 
  Download, 
  FileText, 
  Check, 
  Copy, 
  Eye, 
  Filter, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { ShadeColor } from '../types';
import { SHADES } from '../data/paintsData';
import { RoomVisualizer } from '../components/RoomVisualizer';

interface ShadeCardsPageProps {
  initialShade?: ShadeColor;
  onSelectShadeForCart?: (shade: ShadeColor) => void;
}

export const ShadeCardsPage: React.FC<ShadeCardsPageProps> = ({
  initialShade = SHADES[4],
  onSelectShadeForCart,
}) => {
  const [selectedSpectrum, setSelectedSpectrum] = useState<string>('All');
  const [activeVisualizerShade, setActiveVisualizerShade] = useState<ShadeColor>(initialShade);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);

  const spectrums = ['All', 'Whites', 'Neutrals', 'Pastels', 'Deep Jewels', 'Earth Tones'];

  const filteredShades = selectedSpectrum === 'All'
    ? SHADES
    : SHADES.filter((s) => s.spectrum === selectedSpectrum);

  const handleCopyCode = (shade: ShadeColor) => {
    navigator.clipboard.writeText(`${shade.name} (${shade.code}) - ${shade.hex}`);
    setCopiedCode(shade.code);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  const handleTryInVisualizer = (shade: ShadeColor) => {
    setActiveVisualizerShade(shade);
    const element = document.getElementById('gallop-room-visualizer-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleDownloadDoc = (docName: string, fileName: string) => {
    setDownloadingDoc(docName);
    // Simulate generation and download of technical document
    setTimeout(() => {
      const element = document.createElement('a');
      const file = new Blob([
        `GALLOP PAINTS AND INDUSTRIES - TECHNICAL DATA SHEET (TDS)\n\n` +
        `Document: ${docName}\n` +
        `File: ${fileName}\n` +
        `Date: ${new Date().toLocaleDateString()}\n` +
        `Specifications:\n` +
        `- Solids by Volume: 42% +/- 2%\n` +
        `- Specific Gravity: 1.34 - 1.38 kg/L\n` +
        `- VOC Content: < 10 g/L (Low VOC Formulation)\n` +
        `- Recommended WFT: 100 - 120 microns\n` +
        `- Scrub Resistance: > 20,000 cycles (ASTM D2486)\n` +
        `- Flash Point: Non-flammable water-based emulsion\n\n` +
        `Gallop Quality Assurance Dept, Plot 42-A, Sundar Industrial Estate, Lahore.\n` +
        `UAN: (042) 111-GALLOP`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = fileName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setDownloadingDoc(null);
    }, 800);
  };

  return (
    <div id="shade-cards-page-root" className="w-full bg-[#F8F9FA] pb-24">
      {/* ========================================================================= */}
      {/* PAGE 3: SHADE CARDS & VISUALIZER */}
      {/* Section Heading: "Digital Shade Cards & Visualizer" */}
      {/* ========================================================================= */}
      <div className="bg-[#0F2027] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-widest bg-amber-400/20 text-amber-400 px-3 py-1 rounded-full border border-amber-400/30">
              Interactive Color Studio
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Digital Shade Cards & Visualizer
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Engineered across five distinct architectural spectrums. Experience photorealistic digital rendering, test shades on customizable living rooms, and download technical data sheets.
          </p>

          {/* Spectrums Filter Bar */}
          <div className="flex gap-2 overflow-x-auto pt-8 scrollbar-none">
            {spectrums.map((spec) => (
              <button
                key={spec}
                id={`spectrum-btn-${spec}`}
                onClick={() => setSelectedSpectrum(spec)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedSpectrum === spec
                    ? 'bg-amber-400 text-slate-950 shadow-md scale-102'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Interactive Room Visualizer Section */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Live Simulator
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Virtual Room Visualizer
              </h2>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">
              Simulating in Natural Daylight & Warm Glow
            </span>
          </div>

          {/* Embedded Room Visualizer */}
          <RoomVisualizer
            initialShade={activeVisualizerShade}
            onSelectShadeForCart={onSelectShadeForCart}
          />
        </div>

        {/* Digital Shade Cards Gallery */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                Spectrums Collection
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                {selectedSpectrum === 'All' ? 'All Architectural Color Spectrums' : `${selectedSpectrum} Spectrum`}
              </h3>
              <p className="text-xs text-slate-500">
                Hover card states revealing Color Code, Shade Name, and a "Try in Visualizer" button.
              </p>
            </div>
            <div className="text-xs text-slate-500 font-semibold bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
              Showing {filteredShades.length} calibrated shades
            </div>
          </div>

          {/* Hover Card States Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredShades.map((shade) => {
              const isCopied = copiedCode === shade.code;
              const isCurrentlyVisualized = activeVisualizerShade.id === shade.id;

              return (
                <div
                  key={shade.id}
                  id={`shade-card-${shade.code}`}
                  className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-2xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Color Swatch Block with Specular Sheen */}
                  <div
                    className="relative w-full aspect-[4/3] transition-transform duration-500 overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: shade.hex }}
                  >
                    {/* Ambient light gradient reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/25 pointer-events-none" />

                    {/* Hover Overlay with Action Buttons */}
                    <div className="absolute inset-0 bg-[#0F2027]/75 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 gap-2.5 text-center">
                      <span className="text-xs font-mono font-bold text-amber-300">
                        {shade.code}
                      </span>
                      <h4 className="text-sm font-extrabold text-white">
                        {shade.name}
                      </h4>

                      {/* Button: "Try in Visualizer" */}
                      <button
                        id={`btn-try-visualizer-${shade.code}`}
                        onClick={() => handleTryInVisualizer(shade)}
                        className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Try in Visualizer</span>
                      </button>

                      {/* Copy Hex or RGB Code */}
                      <button
                        onClick={() => handleCopyCode(shade)}
                        className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Shade Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Corner Spectrum Badge */}
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/40 text-white backdrop-blur-xs">
                      {shade.spectrum}
                    </span>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="p-4 bg-white flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-amber-600">
                          {shade.code}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {shade.recommendedFinish} Finish
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-slate-900 mt-0.5 group-hover:text-amber-600 transition-colors">
                        {shade.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {shade.description}
                      </p>
                    </div>

                    {/* Bottom direct preview trigger */}
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] text-slate-400">
                        {shade.hex}
                      </span>
                      <button
                        onClick={() => handleTryInVisualizer(shade)}
                        className="text-xs font-bold text-[#0F2027] group-hover:text-amber-600 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Preview Wall</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DIRECT DOWNLOADS FOR TECHNICAL DATA SHEETS (TDS) & PDF COLOR BROCHURES */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                Architectural Resources
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                Technical Data Sheets (TDS) & Color Brochures
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Official laboratory certifications, coverage formulas, and printable high-gamut shade catalogs.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-700">2026 Edition Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Download 1: Gallop Master Color Brochure */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-amber-400 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Gallop Master Color Brochure 2026
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Complete 500+ shade visual reference with designer room pairings and harmonic palettes.
                </p>
                <div className="mt-2 text-[10px] text-slate-400 font-medium">
                  PDF Format • 14.8 MB • High Resolution
                </div>
              </div>

              <button
                id="btn-download-master-brochure"
                onClick={() =>
                  handleDownloadDoc('Gallop Master Color Brochure 2026', 'Gallop-Master-Color-Brochure-2026.pdf')
                }
                disabled={downloadingDoc === 'Gallop Master Color Brochure 2026'}
                className="mt-4 w-full py-2.5 px-3 rounded-xl bg-[#0F2027] hover:bg-slate-800 text-amber-400 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {downloadingDoc === 'Gallop Master Color Brochure 2026'
                    ? 'Preparing PDF...'
                    : 'Download PDF Brochure'}
                </span>
              </button>
            </div>

            {/* Download 2: Royal Silk Luxury Emulsion TDS */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-amber-400 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Royal Silk Luxury Emulsion TDS
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Chemical formulation sheets, scrub cycles test data, anti-fungal barrier and VOC tests.
                </p>
                <div className="mt-2 text-[10px] text-slate-400 font-medium">
                  TDS Document • 2.4 MB • ASTM Certified
                </div>
              </div>

              <button
                id="btn-download-royal-silk-tds"
                onClick={() =>
                  handleDownloadDoc('Royal Silk Luxury Emulsion TDS', 'TDS-Gallop-Royal-Silk-Emulsion.pdf')
                }
                disabled={downloadingDoc === 'Royal Silk Luxury Emulsion TDS'}
                className="mt-4 w-full py-2.5 px-3 rounded-xl bg-[#0F2027] hover:bg-slate-800 text-amber-400 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {downloadingDoc === 'Royal Silk Luxury Emulsion TDS'
                    ? 'Preparing TDS...'
                    : 'Download TDS Sheet'}
                </span>
              </button>
            </div>

            {/* Download 3: Weather-Shield Extreme Exterior TDS */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-amber-400 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  Weather-Shield Extreme Exterior TDS
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Elastomeric crack-bridging tensile ratings, accelerated solar QUV chamber test reports.
                </p>
                <div className="mt-2 text-[10px] text-slate-400 font-medium">
                  TDS Document • 3.1 MB • 15-Yr Standard
                </div>
              </div>

              <button
                id="btn-download-weather-shield-tds"
                onClick={() =>
                  handleDownloadDoc(
                    'Weather-Shield Extreme Exterior TDS',
                    'TDS-Gallop-Weather-Shield-Extreme.pdf'
                  )
                }
                disabled={downloadingDoc === 'Weather-Shield Extreme Exterior TDS'}
                className="mt-4 w-full py-2.5 px-3 rounded-xl bg-[#0F2027] hover:bg-slate-800 text-amber-400 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>
                  {downloadingDoc === 'Weather-Shield Extreme Exterior TDS'
                    ? 'Preparing TDS...'
                    : 'Download TDS Sheet'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
