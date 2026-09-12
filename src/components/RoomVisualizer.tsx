import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Lightbulb, 
  RotateCcw, 
  Download, 
  Palette, 
  Layers, 
  Check, 
  Maximize2,
  Sparkles
} from 'lucide-react';
import { ShadeColor } from '../types';
import { SHADES } from '../data/paintsData';

interface RoomVisualizerProps {
  initialShade?: ShadeColor;
  onSelectShadeForCart?: (shade: ShadeColor) => void;
  className?: string;
}

type RoomType = 'living' | 'bedroom' | 'exterior';
type LightMode = 'daylight' | 'warm' | 'evening';
type WallTarget = 'mainWall' | 'accentWall' | 'ceilingTrim';

export const RoomVisualizer: React.FC<RoomVisualizerProps> = ({
  initialShade = SHADES[4], // Raw Cashmere
  onSelectShadeForCart,
  className = '',
}) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType>('living');
  const [lightMode, setLightMode] = useState<LightMode>('daylight');
  const [activeTarget, setActiveTarget] = useState<WallTarget>('mainWall');
  const [showComparison, setShowComparison] = useState<boolean>(false);
  const [splitPosition, setSplitPosition] = useState<number>(50);

  // Custom shades applied to each surface
  const [roomColors, setRoomColors] = useState<{
    mainWall: ShadeColor;
    accentWall: ShadeColor;
    ceilingTrim: ShadeColor;
  }>({
    mainWall: initialShade,
    accentWall: SHADES[12], // Imperial Navy
    ceilingTrim: SHADES[0], // Crisp Alabaster
  });

  const handleApplyShade = (shade: ShadeColor) => {
    setRoomColors((prev) => ({
      ...prev,
      [activeTarget]: shade,
    }));
  };

  const lightingFilters = {
    daylight: 'brightness(1.02) contrast(1.02)',
    warm: 'brightness(0.98) sepia(0.2) saturate(1.15)',
    evening: 'brightness(0.85) contrast(1.1) hue-rotate(-10deg)',
  };

  return (
    <div
      id="gallop-room-visualizer-container"
      className={`bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-slate-800 ${className}`}
    >
      {/* Visualizer Top Bar Controls */}
      <div className="p-4 sm:p-5 bg-[#0A171D] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Room Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedRoom('living')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedRoom === 'living'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Modern Lounge
          </button>
          <button
            onClick={() => setSelectedRoom('bedroom')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedRoom === 'bedroom'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Master Bedroom
          </button>
          <button
            onClick={() => setSelectedRoom('exterior')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedRoom === 'exterior'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Façade Exterior
          </button>
        </div>

        {/* Lighting Simulation Toggles */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">Lighting:</span>
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setLightMode('daylight')}
              title="Natural Daylight"
              className={`p-1.5 rounded-lg text-xs transition-all ${
                lightMode === 'daylight' ? 'bg-white text-slate-900 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLightMode('warm')}
              title="Warm Ambient Glow"
              className={`p-1.5 rounded-lg text-xs transition-all ${
                lightMode === 'warm' ? 'bg-amber-400 text-slate-900 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setLightMode('evening')}
              title="Evening Twilight"
              className={`p-1.5 rounded-lg text-xs transition-all ${
                lightMode === 'evening' ? 'bg-indigo-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Before / After Toggle */}
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              showComparison
                ? 'bg-amber-400 text-slate-950 border-amber-300'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            {showComparison ? 'Exit Before/After' : 'Compare Before/After'}
          </button>
        </div>
      </div>

      {/* Main Visualizer Interactive Canvas Display */}
      <div className="relative w-full aspect-[16/9] max-h-[500px] overflow-hidden bg-[#0F2027]">
        {/* Active Scene SVG Architecture */}
        <div
          className="w-full h-full relative transition-all duration-700"
          style={{ filter: lightingFilters[lightMode] }}
        >
          {selectedRoom === 'living' && (
            /* Modern Living Room SVG Architecture */
            <svg
              viewBox="0 0 1000 600"
              className="w-full h-full object-cover select-none"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="floorWood" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8A6B53" />
                  <stop offset="100%" stopColor="#4A3423" />
                </linearGradient>
                <linearGradient id="ambientShadow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>

              {/* Ceiling & Upper Moldings */}
              <polygon
                points="0,0 1000,0 860,110 140,110"
                fill={showComparison ? '#E2E8F0' : roomColors.ceilingTrim.hex}
                className="transition-colors duration-500 cursor-pointer"
                onClick={() => setActiveTarget('ceilingTrim')}
              />

              {/* Left Accent Wall (Recessed architectural wall) */}
              <polygon
                points="0,0 140,110 140,480 0,600"
                fill={showComparison ? '#CBD5E1' : roomColors.accentWall.hex}
                className="transition-colors duration-500 cursor-pointer"
                onClick={() => setActiveTarget('accentWall')}
              />

              {/* Main Center Feature Wall */}
              <polygon
                points="140,110 860,110 860,480 140,480"
                fill={showComparison ? '#F1F5F9' : roomColors.mainWall.hex}
                className="transition-colors duration-500 cursor-pointer"
                onClick={() => setActiveTarget('mainWall')}
              />

              {/* Right Wall with Floor-to-Ceiling Sunlight Window */}
              <polygon
                points="860,110 1000,0 1000,600 860,480"
                fill={showComparison ? '#CBD5E1' : roomColors.accentWall.hex}
                className="transition-colors duration-500 cursor-pointer"
                onClick={() => setActiveTarget('accentWall')}
              />

              {/* Window Frame & Scenic Foliage View */}
              <polygon points="880,120 985,30 985,460 880,420" fill="#E0F2FE" opacity="0.9" />
              {/* Window grid */}
              <line x1="932" y1="75" x2="932" y2="440" stroke="#0F2027" strokeWidth="4" />
              <line x1="880" y1="270" x2="985" y2="245" stroke="#0F2027" strokeWidth="4" />

              {/* Hardwood Floor */}
              <polygon points="0,600 140,480 860,480 1000,600" fill="url(#floorWood)" />
              {/* Baseboard trim */}
              <polygon points="140,474 860,474 860,480 140,480" fill={roomColors.ceilingTrim.hex} />

              {/* Ambient Wall Shadows */}
              <polygon points="140,110 860,110 860,180 140,180" fill="url(#ambientShadow)" opacity="0.4" />

              {/* Designer Artwork on Main Wall */}
              <g transform="translate(420, 160)">
                <rect width="160" height="180" rx="4" fill="#0F2027" />
                <rect x="6" y="6" width="148" height="168" rx="2" fill="#F8FAFC" />
                <circle cx="80" cy="80" r="45" fill="#EAB308" opacity="0.8" />
                <path d="M 30,120 Q 80,40 130,120" stroke="#0F2027" strokeWidth="5" fill="none" />
              </g>

              {/* Modern Minimalist Sofa in Foreground */}
              <g transform="translate(260, 360)">
                {/* Sofa base */}
                <rect x="0" y="50" width="480" height="90" rx="16" fill="#1E293B" />
                {/* Back cushions */}
                <rect x="20" y="0" width="210" height="70" rx="12" fill="#334155" />
                <rect x="250" y="0" width="210" height="70" rx="12" fill="#334155" />
                {/* Accent pillows */}
                <rect x="40" y="10" width="60" height="60" rx="8" fill="#F59E0B" transform="rotate(8 70 40)" />
                <rect x="380" y="10" width="60" height="60" rx="8" fill="#06B6D4" transform="rotate(-8 410 40)" />
                {/* Sofa wooden legs */}
                <rect x="40" y="138" width="14" height="24" rx="2" fill="#78350F" />
                <rect x="426" y="138" width="14" height="24" rx="2" fill="#78350F" />
              </g>

              {/* Designer Potted Fiddle Leaf Fig Plant */}
              <g transform="translate(180, 310)">
                <polygon points="20,130 50,130 45,170 25,170" fill="#94A3B8" />
                {/* Leaves */}
                <ellipse cx="35" cy="90" rx="22" ry="35" fill="#15803D" />
                <ellipse cx="20" cy="65" rx="25" ry="30" fill="#16A34A" />
                <ellipse cx="50" cy="50" rx="22" ry="35" fill="#22C55E" />
                <ellipse cx="35" cy="30" rx="20" ry="25" fill="#4ADE80" />
              </g>
            </svg>
          )}

          {selectedRoom === 'bedroom' && (
            /* Master Bedroom SVG Scene */
            <svg
              viewBox="0 0 1000 600"
              className="w-full h-full object-cover select-none"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Ceiling */}
              <polygon
                points="0,0 1000,0 840,100 160,100"
                fill={showComparison ? '#F8FAFC' : roomColors.ceilingTrim.hex}
                onClick={() => setActiveTarget('ceilingTrim')}
              />
              {/* Left Wall */}
              <polygon
                points="0,0 160,100 160,500 0,600"
                fill={showComparison ? '#CBD5E1' : roomColors.accentWall.hex}
                onClick={() => setActiveTarget('accentWall')}
              />
              {/* Main Bed Wall */}
              <polygon
                points="160,100 840,100 840,500 160,500"
                fill={showComparison ? '#F1F5F9' : roomColors.mainWall.hex}
                onClick={() => setActiveTarget('mainWall')}
              />
              {/* Right Wall */}
              <polygon
                points="840,100 1000,0 1000,600 840,500"
                fill={showComparison ? '#CBD5E1' : roomColors.accentWall.hex}
                onClick={() => setActiveTarget('accentWall')}
              />
              {/* Bedroom Floor Rug */}
              <polygon points="0,600 160,500 840,500 1000,600" fill="#334155" />
              <ellipse cx="500" cy="530" rx="280" ry="60" fill="#E2E8F0" opacity="0.6" />

              {/* Modern Bed Frame & Linens */}
              <g transform="translate(300, 260)">
                {/* Headboard */}
                <rect x="0" y="0" width="400" height="150" rx="14" fill="#0F2027" />
                {/* Pillows */}
                <rect x="40" y="70" width="140" height="70" rx="10" fill="#FFFFFF" />
                <rect x="220" y="70" width="140" height="70" rx="10" fill="#FFFFFF" />
                {/* Mattress and duvet */}
                <rect x="20" y="130" width="360" height="130" rx="16" fill="#F8FAFC" />
                {/* Duvet Throw Blanket */}
                <rect x="20" y="190" width="360" height="70" rx="12" fill={roomColors.accentWall.hex} />
              </g>

              {/* Nightstands with glowing lamps */}
              <g transform="translate(180, 360)">
                <rect width="80" height="90" rx="6" fill="#1E293B" />
                <polygon points="30,0 50,0 60,-30 20,-30" fill="#FEF08A" />
              </g>
              <g transform="translate(740, 360)">
                <rect width="80" height="90" rx="6" fill="#1E293B" />
                <polygon points="30,0 50,0 60,-30 20,-30" fill="#FEF08A" />
              </g>
            </svg>
          )}

          {selectedRoom === 'exterior' && (
            /* Exterior Contemporary Façade Scene */
            <svg
              viewBox="0 0 1000 600"
              className="w-full h-full object-cover select-none"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Sky */}
              <rect width="1000" height="280" fill="#BAE6FD" />
              {/* Ground lawn & driveway */}
              <rect y="440" width="1000" height="160" fill="#475569" />
              <polygon points="0,480 340,440 340,600 0,600" fill="#166534" />

              {/* Main Exterior Stucco Villa Wall */}
              <rect
                x="260"
                y="140"
                width="480"
                height="310"
                fill={showComparison ? '#E2E8F0' : roomColors.mainWall.hex}
                className="transition-colors duration-500 cursor-pointer"
                onClick={() => setActiveTarget('mainWall')}
              />

              {/* Accent Cantilever Architectural Block */}
              <polygon
                points="160,200 420,200 420,380 160,380"
                fill={showComparison ? '#64748B' : roomColors.accentWall.hex}
                className="transition-colors duration-500 cursor-pointer"
                onClick={() => setActiveTarget('accentWall')}
              />

              {/* Roof Parapet & Fascia Trim */}
              <rect
                x="140"
                y="120"
                width="620"
                height="22"
                fill={showComparison ? '#334155' : roomColors.ceilingTrim.hex}
                className="cursor-pointer"
                onClick={() => setActiveTarget('ceilingTrim')}
              />

              {/* Glass Balcony & Windows */}
              <rect x="460" y="170" width="240" height="120" fill="#7DD3FC" opacity="0.85" rx="4" />
              <rect x="200" y="240" width="180" height="100" fill="#38BDF8" opacity="0.75" rx="4" />
              {/* Main Entrance Teak Door */}
              <rect x="460" y="320" width="80" height="130" fill="#78350F" />
              {/* Warm Porch Light */}
              <circle cx="500" cy="300" r="14" fill="#FBBF24" opacity="0.9" />
            </svg>
          )}
        </div>

        {/* Visualizer Floating Surface Indicators */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 bg-[#0F2027]/90 backdrop-blur-md p-2.5 rounded-2xl border border-slate-700 shadow-xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Active Paint Surface:
          </span>
          <button
            onClick={() => setActiveTarget('mainWall')}
            className={`flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-left ${
              activeTarget === 'mainWall'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>Main Feature Wall</span>
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-xs"
              style={{ backgroundColor: roomColors.mainWall.hex }}
            />
          </button>
          <button
            onClick={() => setActiveTarget('accentWall')}
            className={`flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-left ${
              activeTarget === 'accentWall'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>Accent Boundary</span>
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-xs"
              style={{ backgroundColor: roomColors.accentWall.hex }}
            />
          </button>
          <button
            onClick={() => setActiveTarget('ceilingTrim')}
            className={`flex items-center justify-between gap-3 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all text-left ${
              activeTarget === 'ceilingTrim'
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>Ceiling & Trim Moldings</span>
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-xs"
              style={{ backgroundColor: roomColors.ceilingTrim.hex }}
            />
          </button>
        </div>

        {/* Live Active Shade Pill Badge */}
        <div className="absolute bottom-4 left-4 z-10 bg-[#0F2027]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700 flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-lg border border-white/80 shadow-xs"
            style={{ backgroundColor: roomColors[activeTarget].hex }}
          />
          <div className="text-left">
            <div className="text-xs font-bold text-white">
              {roomColors[activeTarget].name}
            </div>
            <div className="text-[10px] text-amber-400 font-mono">
              {roomColors[activeTarget].code} • {roomColors[activeTarget].spectrum}
            </div>
          </div>
        </div>
      </div>

      {/* Shade Palette Selector Dock */}
      <div className="p-4 sm:p-5 bg-[#0B1519] border-t border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Select Shade for {activeTarget === 'mainWall' ? 'Main Wall' : activeTarget === 'accentWall' ? 'Accent Wall' : 'Ceiling & Trim'}
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">
            Click any swatch to paint instantly
          </span>
        </div>

        {/* Swatch Strip */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {SHADES.map((shade) => {
            const isApplied = roomColors[activeTarget].id === shade.id;
            return (
              <button
                key={shade.id}
                onClick={() => handleApplyShade(shade)}
                className={`group flex-shrink-0 flex flex-col items-center p-2 rounded-xl border transition-all text-left ${
                  isApplied
                    ? 'bg-slate-800 border-amber-400 shadow-md ring-2 ring-amber-400/40'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-lg shadow-inner border border-white/20 mb-1.5 relative overflow-hidden group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: shade.hex }}
                >
                  {isApplied && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-bold text-white max-w-[70px] truncate text-center">
                  {shade.name}
                </span>
                <span className="text-[9px] text-slate-400 font-mono">
                  {shade.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
