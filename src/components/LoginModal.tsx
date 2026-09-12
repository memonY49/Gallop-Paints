import React, { useState } from 'react';
import { X, User, Lock, Building, CheckCircle2, ShieldCheck, Mail } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'customer' | 'dealer'>('customer');
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    dealershipName: '',
    city: 'Lahore',
    ntnNumber: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    onClose();
  };

  return (
    <div
      id="login-account-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        id="login-account-modal"
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#0F2027] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">
                {isLoggedIn ? 'Gallop Portal Account' : 'Gallop Member Portal'}
              </h3>
              <p className="text-[11px] text-slate-300">
                Authorized dealer access & homeowner shade history
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoggedIn ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Welcome back, {formData.name || 'Valued Member'}!
            </h4>
            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 text-left space-y-1">
              <p><span className="text-slate-400">Account Type:</span> <strong>{tab === 'dealer' ? 'Authorized Gallop Dealer / Contractor' : 'Retail Homeowner'}</strong></p>
              <p><span className="text-slate-400">Status:</span> <span className="text-emerald-600 font-bold">Active & Verified</span></p>
              <p><span className="text-slate-400">Tier Discount:</span> <strong>{tab === 'dealer' ? '18% Trade Rate' : 'Standard Factory Direct'}</strong></p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="p-6">
            {/* Account Type Tabs */}
            <div className="flex rounded-xl bg-slate-100 p-1 mb-5 border border-slate-200">
              <button
                type="button"
                onClick={() => setTab('customer')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  tab === 'customer'
                    ? 'bg-white shadow-xs text-[#0F2027]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Homeowner / Client</span>
              </button>
              <button
                type="button"
                onClick={() => setTab('dealer')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  tab === 'dealer'
                    ? 'bg-white shadow-xs text-[#0F2027]'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Dealer / Contractor</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              {isRegistering && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yasir Nawaz"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              )}

              {isRegistering && tab === 'dealer' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Store / Dealership Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Paint Studio & Hardware"
                    value={formData.dealershipName}
                    onChange={(e) => setFormData({ ...formData, dealershipName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="e.g. partner@galloppaints.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-amber-500" />
                  <span className="text-slate-600">Remember credentials</span>
                </label>
                <a href="#forgot" className="text-amber-600 hover:underline">
                  Forgot?
                </a>
              </div>

              <button
                type="submit"
                id="btn-submit-login"
                className="w-full py-2.5 mt-2 bg-[#0F2027] hover:bg-slate-800 text-amber-400 font-bold rounded-xl shadow transition-colors cursor-pointer"
              >
                {isRegistering
                  ? `Register as ${tab === 'dealer' ? 'Dealer Partner' : 'Client'}`
                  : `Sign In to ${tab === 'dealer' ? 'Dealer Portal' : 'Account'}`}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-xs text-slate-600 hover:text-slate-900 font-medium"
              >
                {isRegistering ? (
                  <>Already have an account? <span className="text-amber-600 font-bold">Sign In</span></>
                ) : (
                  <>Don't have an account? <span className="text-amber-600 font-bold">Register Now</span></>
                )}
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit SSL Encrypted Gallop Commercial Network</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
