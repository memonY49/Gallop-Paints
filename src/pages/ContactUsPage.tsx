import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Navigation, 
  Compass, 
  Printer,
  ExternalLink
} from 'lucide-react';
import { REGIONAL_OFFICES, DEALERS } from '../data/paintsData';
import { DealerLocation } from '../types';

export const ContactUsPage: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    region: 'Punjab',
    city: 'Lahore',
    subject: 'Retail & Home Paint Inquiry',
    comment: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Accordion State for Regional Offices
  const [expandedOfficeId, setExpandedOfficeId] = useState<string>('ro-central');

  // Interactive Dealer Map State
  const [selectedMapCity, setSelectedMapCity] = useState<string>('All');
  const [selectedDealer, setSelectedDealer] = useState<DealerLocation>(DEALERS[0]);
  const [directionsPrompt, setDirectionsPrompt] = useState<string | null>(null);

  const regionCities: { [region: string]: string[] } = {
    'Punjab': ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Sialkot'],
    'Sindh': ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana'],
    'Islamabad Capital Territory': ['Islamabad'],
    'Khyber Pakhtunkhwa (KPK)': ['Peshawar', 'Mardan', 'Abbottabad'],
    'Balochistan': ['Quetta', 'Gwadar'],
  };

  const handleRegionChange = (newRegion: string) => {
    setFormData((prev) => ({
      ...prev,
      region: newRegion,
      city: regionCities[newRegion] ? regionCities[newRegion][0] : 'Lahore',
    }));
  };

  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 900);
  };

  const headOffice = REGIONAL_OFFICES.find((o) => o.isHeadOffice) || REGIONAL_OFFICES[0];
  const regionalHubs = REGIONAL_OFFICES.filter((o) => !o.isHeadOffice);

  const filteredDealers = selectedMapCity === 'All'
    ? DEALERS
    : DEALERS.filter((d) => d.city.toLowerCase() === selectedMapCity.toLowerCase());

  const handleGetDirections = (dealer: DealerLocation) => {
    setSelectedDealer(dealer);
    setDirectionsPrompt(`Routing directions from your current location to ${dealer.name} (${dealer.address}, ${dealer.city})`);
    setTimeout(() => {
      setDirectionsPrompt(null);
    }, 4000);
  };

  return (
    <div id="contact-us-page-root" className="w-full bg-[#F8F9FA] pb-24">
      {/* ========================================================================= */}
      {/* PAGE 5: CONTACT US (STRUCTURED AS PER REFERENCE UI) */}
      {/* Section Heading: "Contact Us & Regional Offices" */}
      {/* ========================================================================= */}
      <div className="bg-[#0F2027] text-white py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-widest bg-amber-400/20 text-amber-400 px-3 py-1 rounded-full border border-amber-400/30">
              Direct Factory & Regional Network
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Contact Us & Regional Offices
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Get in touch with our technical color consultants, schedule an on-site architectural evaluation, or connect with your nearest regional sales division.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* ========================================================================= */}
        {/* SPLIT LAYOUT */}
        {/* Left Column: Interactive Form | Right Column: Office Directories & Map */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: INTERACTIVE FORM */}
          {/* Fields: Full Name*, Email Address*, Phone Number*, Region/State (Dropdown), */}
          {/* City (Dropdown), Subject, and Comment/Message*. Primary CTA Button: "Send Message". */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                Inquiry & Consultation
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                Send Us a Direct Message
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Our sales engineers respond within 2 business hours.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="py-10 text-center flex flex-col items-center bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <h4 className="text-lg font-black text-slate-900">
                  Message Dispatched Successfully!
                </h4>
                <p className="text-xs text-slate-600 mt-2 max-w-md">
                  Thank you, <strong>{formData.fullName}</strong>. Your inquiry has been routed to the <strong>{formData.region} Regional Office</strong> in <strong>{formData.city}</strong>. Reference ID: <span className="font-mono font-bold text-slate-900">INQ-{(Date.now() % 1000000)}</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      region: 'Punjab',
                      city: 'Lahore',
                      subject: 'Retail & Home Paint Inquiry',
                      comment: '',
                    });
                  }}
                  className="mt-6 px-6 py-2.5 bg-[#0F2027] hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitContactForm} className="space-y-4 text-xs">
                {/* Full Name* */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yasir Nawaz"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* Email Address* & Phone Number* */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. yasir@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Region/State (Dropdown) & City (Dropdown) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Region / State *
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => handleRegionChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 bg-white"
                    >
                      {Object.keys(regionCities).map((reg) => (
                        <option key={reg} value={reg}>
                          {reg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      City *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 bg-white"
                    >
                      {(regionCities[formData.region] || ['Lahore']).map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 bg-white"
                  >
                    <option value="Retail & Home Paint Inquiry">Retail & Home Paint Inquiry</option>
                    <option value="Commercial Project / Architectural Tender">Commercial Project / Architectural Tender</option>
                    <option value="Dealer Franchise Application">Dealer Franchise Application</option>
                    <option value="Painter & Contractor Discount Program">Painter & Contractor Discount Program</option>
                    <option value="Technical Lab & TDS Inquiry">Technical Lab & TDS Inquiry</option>
                  </select>
                </div>

                {/* Comment/Message* */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Comment / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project, wall square-footage, specific shades, or dealer questions..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* Primary CTA Button: "Send Message" */}
                <button
                  type="submit"
                  id="btn-send-contact-message"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: OFFICE DIRECTORIES & LOCATION CARDS */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 space-y-6">
            {/* 1. Head Office & Factory Card */}
            <div
              id="head-office-card"
              className="bg-[#0F2027] text-white p-6 sm:p-7 rounded-3xl shadow-xl border border-slate-800 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-bl-full pointer-events-none" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-400 text-slate-950 px-2.5 py-1 rounded-md">
                  Corporate Headquarters & Factory
                </span>
                <span className="text-xs font-mono text-slate-400">HQ / PLANT-01</span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white">
                {headOffice.name}
              </h3>

              <div className="mt-4 space-y-2.5 text-xs text-slate-300">
                {/* Full physical address */}
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span>{headOffice.address}</span>
                </div>

                {/* UAN Phone Number */}
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>
                    UAN Toll-Free: <strong className="text-amber-300 text-sm">{headOffice.phone}</strong>
                  </span>
                </div>

                {/* Fax */}
                <div className="flex items-center gap-2.5">
                  <Printer className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Fax: +92 (42) 3591-2345 / 3591-2346</span>
                </div>

                {/* Direct Email */}
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Direct Email: <a href="mailto:info@galloppaints.com" className="text-white underline hover:text-amber-400">info@galloppaints.com</a></span>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-2.5 pt-1 text-slate-400 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{headOffice.hours}</span>
                </div>
              </div>
            </div>

            {/* 2. Regional Sales Offices Grid (Collapsible accordion cards) */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                  Regional Distribution Hubs
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-0.5">
                  Regional Sales Offices
                </h4>
              </div>

              <div className="space-y-3">
                {regionalHubs.map((office) => {
                  const isExpanded = expandedOfficeId === office.id;
                  return (
                    <div
                      key={office.id}
                      className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-slate-50/70"
                    >
                      <button
                        onClick={() => setExpandedOfficeId(isExpanded ? '' : office.id)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <div>
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {office.region}
                          </span>
                          <h5 className="text-xs sm:text-sm font-bold text-slate-900 mt-1">
                            {office.name} ({office.city})
                          </h5>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 pt-1 border-t border-slate-200/80 bg-white text-xs space-y-2 animate-in fade-in duration-150">
                          <p className="flex items-start gap-2 text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <span>{office.address}</span>
                          </p>
                          <p className="flex items-center gap-2 text-slate-800 font-semibold">
                            <Phone className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                            <span>{office.phone}</span>
                          </p>
                          <p className="flex items-center gap-2 text-slate-600">
                            <Mail className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                            <span>{office.email}</span>
                          </p>
                          <p className="text-[11px] text-slate-400">
                            In-Charge: <strong>{office.manager}</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE DEALER & DISTRIBUTOR MAP */}
        {/* Embedded map widget showing nearby authorized dealer locations with */}
        {/* "Get Directions" buttons. */}
        {/* ========================================================================= */}
        <div id="dealer-distributor-map-section" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                Dealer Network Locator
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                Authorized Gallop Paint Studios & Distributors
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Equipped with Gallop computerized automatic tinting dispensers for instant shade fulfillment.
              </p>
            </div>

            {/* City filter pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {['All', 'Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Peshawar', 'Quetta'].map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedMapCity(city)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedMapCity === city
                      ? 'bg-[#0F2027] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Directions Feedback Toast */}
          {directionsPrompt && (
            <div className="mb-4 p-3 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
              <Navigation className="w-4 h-4 text-emerald-600 flex-shrink-0 animate-spin" />
              <span>{directionsPrompt}</span>
            </div>
          )}

          {/* Map & Dealer Cards Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Interactive Vector Map Canvas */}
            <div className="lg:col-span-7 bg-[#0A171D] rounded-2xl overflow-hidden relative min-h-[360px] flex items-center justify-center border border-slate-800">
              {/* Stylized Regional Vector Map */}
              <svg viewBox="0 0 600 450" className="w-full h-full object-cover opacity-80">
                <defs>
                  <radialGradient id="mapPulse" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#EAB308" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Country Outline / Grid Lines */}
                <path
                  d="M 120,400 L 160,340 L 180,310 L 220,300 L 260,260 L 320,240 L 380,210 L 420,160 L 460,110 L 440,70 L 380,60 L 340,90 L 300,120 L 240,160 L 180,220 L 120,280 Z"
                  fill="#13232C"
                  stroke="#1E3A47"
                  strokeWidth="2"
                />

                {/* Arterial Highway Network */}
                <line x1="220" y1="380" x2="330" y2="240" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="330" y1="240" x2="410" y2="150" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="330" y1="240" x2="300" y2="230" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

                {/* Dealer Pins on Map */}
                {filteredDealers.map((dealer, idx) => {
                  const isSelected = selectedDealer.id === dealer.id;
                  // Map coordinates simulation for Pakistan cities
                  const coords: { [key: string]: { x: number; y: number } } = {
                    'dl-1': { x: 340, y: 240 }, // Lahore
                    'dl-2': { x: 355, y: 248 }, // Lahore DHA
                    'dl-3': { x: 190, y: 375 }, // Karachi
                    'dl-4': { x: 410, y: 150 }, // Islamabad
                    'dl-5': { x: 310, y: 235 }, // Faisalabad
                    'dl-6': { x: 380, y: 125 }, // Peshawar
                    'dl-7': { x: 170, y: 270 }, // Quetta
                    'dl-8': { x: 360, y: 215 }, // Sialkot
                  };
                  const pos = coords[dealer.id] || { x: 300, y: 200 };

                  return (
                    <g
                      key={dealer.id}
                      transform={`translate(${pos.x}, ${pos.y})`}
                      className="cursor-pointer group"
                      onClick={() => setSelectedDealer(dealer)}
                    >
                      {/* Pulse Circle */}
                      <circle cx="0" cy="0" r="14" fill="url(#mapPulse)" className="animate-ping opacity-75" />
                      
                      {/* Pin Head */}
                      <circle
                        cx="0"
                        cy="0"
                        r={isSelected ? 8 : 6}
                        fill={isSelected ? '#F59E0B' : '#06B6D4'}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        className="transition-all"
                      />
                      
                      {/* City Name Label */}
                      <text
                        x="12"
                        y="4"
                        fill="#FFFFFF"
                        fontSize="10"
                        fontWeight="bold"
                        className="drop-shadow"
                      >
                        {dealer.city}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Map Floating Legend */}
              <div className="absolute bottom-3 left-3 bg-[#0F2027]/90 backdrop-blur-xs p-2.5 rounded-xl border border-slate-700 text-[10px] text-slate-300 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span>Selected Gallop Studio</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span>Authorized Dealer Outlet</span>
                </div>
              </div>
            </div>

            {/* Dealer Detail & Quick Direction Action Cards List */}
            <div className="lg:col-span-5 max-h-[380px] overflow-y-auto space-y-3 pr-1">
              {filteredDealers.map((dealer) => {
                const isSelected = selectedDealer.id === dealer.id;
                return (
                  <div
                    key={dealer.id}
                    className={`p-4 rounded-2xl border transition-all text-xs ${
                      isSelected
                        ? 'bg-amber-50/70 border-amber-400 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                          {dealer.city} • {dealer.region}
                        </span>
                        <h5 className="font-bold text-slate-900 text-sm mt-0.5">
                          {dealer.name}
                        </h5>
                      </div>
                      <span className="text-[10px] font-bold bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                        {dealer.distanceKm} km away
                      </span>
                    </div>

                    <p className="text-slate-600 mt-2 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{dealer.address}</span>
                    </p>

                    <p className="text-slate-800 font-semibold mt-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>{dealer.phone}</span>
                    </p>

                    <div className="mt-2.5 flex items-center gap-2 text-[10px]">
                      {dealer.hasTintingMachine && (
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                          ✓ Auto Tinting Machine
                        </span>
                      )}
                      {dealer.hasExpressDelivery && (
                        <span className="bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded font-semibold">
                          ✓ Express Site Delivery
                        </span>
                      )}
                    </div>

                    {/* "Get Directions" Button */}
                    <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedDealer(dealer)}
                        className="text-xs font-bold text-slate-700 hover:text-amber-700"
                      >
                        View on Map
                      </button>
                      <button
                        id={`btn-get-directions-${dealer.id}`}
                        onClick={() => handleGetDirections(dealer)}
                        className="px-3 py-1.5 bg-[#0F2027] hover:bg-slate-800 text-amber-400 font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Get Directions</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
