import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showSubtitle = true,
}) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-lg font-black tracking-tighter leading-none',
    md: 'text-2xl font-black tracking-tighter leading-none',
    lg: 'text-3xl sm:text-4xl font-black tracking-tighter leading-none',
  };

  const subSizes = {
    sm: 'text-[8px] tracking-[0.18em]',
    md: 'text-[10px] tracking-[0.2em]',
    lg: 'text-xs tracking-[0.22em]',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon: Dark square badge with cyan swirl and galloping horse silhouette */}
      <div
        className={`${iconSizes[size]} bg-[#0F2027] rounded-xl flex items-center justify-center p-1.5 shadow-md flex-shrink-0 border border-slate-700/60`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoCyanSwirl" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00CED1" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
            <linearGradient id="logoGoldSwirl" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
            <linearGradient id="logoMagentaSwirl" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
          </defs>

          {/* Dynamic Turquoise Swirl */}
          <path
            d="M 16,56 C 14,32 30,16 52,14 C 74,12 88,26 86,46 C 84,66 66,84 46,84 C 36,84 26,78 20,70 C 26,72 34,72 42,70 C 62,64 74,50 72,36 C 70,22 56,22 44,26 C 30,30 20,42 16,56 Z"
            fill="url(#logoCyanSwirl)"
            opacity="0.9"
          />

          {/* Dynamic Magenta Splash */}
          <path
            d="M 28,78 C 36,86 52,88 64,84 C 78,80 88,68 88,52 C 88,38 78,34 72,38 C 66,42 70,54 64,64 C 58,74 44,76 34,74 C 28,72 26,76 28,78 Z"
            fill="url(#logoMagentaSwirl)"
            opacity="0.85"
          />

          {/* Dynamic Gold Arc */}
          <path
            d="M 38,18 C 50,14 68,16 78,26 C 86,34 88,46 84,54 C 82,50 82,42 76,36 C 70,30 56,26 44,28 C 40,24 38,20 38,18 Z"
            fill="url(#logoGoldSwirl)"
          />

          {/* Galloping Horse Silhouette in Crisp Pure White */}
          <path
            d="M 24,54 
               C 26,50 28,48 31,48 
               C 33,48 34,44 36,41 
               C 38,38 40,32 44,28 
               C 45,26 47,26 49,27 
               C 50,26 50,24 52,24 
               C 53,24 55,27 54,29 
               C 58,30 63,33 66,38 
               C 68,41 71,43 75,44 
               C 79,45 82,44 80,48 
               C 77,50 72,50 68,48 
               C 65,49 61,54 59,57 
               C 62,60 67,65 72,67 
               C 76,69 75,72 71,71 
               C 66,70 60,65 57,61 
               C 54,63 48,64 42,63 
               C 38,62 33,65 28,70 
               C 25,73 24,71 26,67 
               C 28,63 32,59 34,58 
               C 31,58 27,59 23,61 
               C 21,62 20,59 22,57 
               C 23,55 23,54 24,54 Z"
            fill="#FFFFFF"
          />

          {/* Horse Mane in Electric Cyan */}
          <path
            d="M 44,30 C 42,34 38,38 34,42 C 37,39 41,35 44,30 Z"
            fill="#00CED1"
          />
        </svg>
      </div>

      {/* Brand Bold Typography */}
      <div className="flex flex-col text-left">
        <span
          className={`${titleSizes[size]} font-black ${
            isDark ? 'text-white' : 'text-[#0F2027]'
          }`}
        >
          GALLOP PAINTS
        </span>
        {showSubtitle && (
          <span
            className={`${subSizes[size]} font-bold text-[#00CED1] uppercase mt-0.5`}
          >
            AND INDUSTRIES
          </span>
        )}
      </div>
    </div>
  );
};
