import React from 'react';
import { 
  Award, 
  ShieldCheck, 
  Sparkles, 
  FlaskConical, 
  Factory, 
  CheckCircle2, 
  ArrowRight,
  Leaf,
  Calendar
} from 'lucide-react';
import { MILESTONES, COMPANY_STATS } from '../data/paintsData';
import { PageId } from '../types';

interface AboutUsPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ onNavigate }) => {
  return (
    <div id="about-us-page-root" className="w-full bg-[#F8F9FA] pb-24">
      {/* ========================================================================= */}
      {/* PAGE 4: ABOUT US */}
      {/* Section Heading: "Our Legacy & Innovation" */}
      {/* ========================================================================= */}
      <div className="bg-[#0F2027] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-bold uppercase tracking-widest bg-amber-400/20 text-amber-400 px-3 py-1 rounded-full border border-amber-400/30">
              Corporate Heritage & R&D
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Our Legacy & Innovation
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            From visionary beginnings in 1989 to nationwide architectural prominence—crafting paints that defend buildings against extreme weather while celebrating living color.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* ========================================================================= */}
        {/* PROMINENT CALLOUT: Established in 1989 (Over 35+ years of manufacturing excellence) */}
        {/* ========================================================================= */}
        <div
          id="prominent-legacy-callout"
          className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 text-slate-950 p-6 sm:p-10 rounded-3xl shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-amber-300"
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Historic Milestone</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Established in 1989 (Over 35+ Years of Manufacturing Excellence)
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-900 max-w-2xl">
              More than three decades of continuous research, localized chemical engineering, and trusted partnerships with Pakistan's leading architects, contractors, and proud homeowners.
            </p>
          </div>

          <div className="flex-shrink-0 bg-slate-950 text-white px-6 py-5 rounded-2xl text-center shadow-lg">
            <span className="block text-3xl sm:text-4xl font-black text-amber-400 leading-none">
              35+
            </span>
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-300 block mt-1">
              Years of Trust
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* KEY STATISTICS COUNTER GRID: 35+ Years, 1000+ Dealers, 500+ Color Shades */}
        {/* ========================================================================= */}
        <div id="stats-counter-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {COMPANY_STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-amber-400 transition-all text-center group"
            >
              <div className="text-3xl sm:text-4xl font-black text-[#0F2027] group-hover:text-amber-600 transition-colors">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-slate-800 mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Narrative Showcase: Journey & Innovation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              The Gallop Journey
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Pioneering Sustainable Formulations & Advanced Resin Science
            </h3>

            <p>
              In 1989, Gallop Paints began operations with a singular founding conviction: that architectural coatings in Pakistan deserved the same world-class resin stability and color fidelity found in European industrial capitals, calibrated precisely for local temperature variations and monsoons.
            </p>

            <p>
              Over the last 35+ years, Gallop Paints transformed from a local specialty manufacturer into one of the country's most respected paint producers. Operating out of our modern polymer complex in Sundar Industrial Estate and Sheikhupura Road, our facilities feature automated computerized color dispensing, advanced bead-milling pigment dispersion, and strict ISO-certified clean batches.
            </p>

            <p>
              Today, we spearhead the green chemical transition across the subcontinent. By substituting harmful VOC solvents with water-dispersible cross-linking polymers and non-toxic mineral pigments, Gallop Paints ensures healthier indoor living spaces while delivering unmatched 15-year outdoor weather endurance.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('products')}
                className="px-5 py-2.5 rounded-xl bg-[#0F2027] hover:bg-slate-800 text-amber-400 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Connect with Factory Team
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0F2027] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-500/20 rounded-full blur-2xl" />
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <FlaskConical className="w-6 h-6" />
              </div>

              <h4 className="text-lg font-black text-white">
                R&D Laboratory Testing Standards
              </h4>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Accelerated QUV Solar Aging:</strong> Simulating 10+ years of extreme UV exposure within 500 hours.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Anti-Fungal Culture Inoculation:</strong> Guaranteed mold and black mildew resistance in humid climates.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>20,000+ Washability Cycles:</strong> Scrub resistance exceeding ASTM D2486 architectural benchmarks.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong>Zero-Heavy-Metal Certifications:</strong> 100% lead-free, mercury-free, and child-safe.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Chronicle of Growth
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              35+ Years of Technological Milestones
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MILESTONES.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl font-black text-amber-600 font-mono">
                      {m.year}
                    </span>
                    <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                      Milestone #{idx + 1}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {m.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Certifications Strip */}
        <div className="bg-gradient-to-r from-slate-900 to-[#0F2027] text-white p-8 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold flex-shrink-0">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-black text-white">
                ISO 9001:2015 & PCSIR Certified Formulations
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Compliant with Pakistan Standards and Quality Control Authority (PSQCA) specifications.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('contact')}
            className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow transition-all cursor-pointer flex-shrink-0"
          >
            Visit Head Office
          </button>
        </div>
      </div>
    </div>
  );
};
