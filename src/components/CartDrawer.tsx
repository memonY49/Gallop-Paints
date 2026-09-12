import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, quantity: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onNavigateToProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToProducts,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Lahore',
    notes: '',
  });

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const deliveryFee = subtotal > 15000 || subtotal === 0 ? 0 : 500;
  const grandTotal = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingDetails.fullName || !shippingDetails.phone || !shippingDetails.address) {
      alert('Please fill in your name, contact phone, and delivery address.');
      return;
    }

    // Trigger confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // fallback
    }

    setCheckoutComplete(true);
  };

  const handleFinishCheckout = () => {
    onClearCart();
    setCheckoutComplete(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#0F2027] text-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">Your Paint Order Cart</h3>
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-2 py-0.5 rounded-full">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto">
          {checkoutComplete ? (
            /* Order Placed Success View */
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-[#0F2027]">Order Dispatched to Factory!</h4>
              <p className="text-xs text-slate-600 mt-2 max-w-xs">
                Thank you, <strong>{shippingDetails.fullName}</strong>. Your Gallop Paints order has been routed to your regional distribution depot in <strong>{shippingDetails.city}</strong>.
              </p>
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-left w-full text-xs space-y-1">
                <p><span className="text-slate-500">Order ID:</span> <strong className="font-mono text-slate-900">GP-{Math.floor(100000 + Math.random() * 900000)}</strong></p>
                <p><span className="text-slate-500">Delivery To:</span> {shippingDetails.address}</p>
                <p><span className="text-slate-500">Estimated Total:</span> PKR {grandTotal.toLocaleString()}</p>
                <p><span className="text-slate-500">Payment:</span> Cash on Delivery / Dealer Verification</p>
              </div>
              <button
                onClick={handleFinishCheckout}
                className="mt-6 w-full py-3 bg-[#0F2027] text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Back to Gallop Paints
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">Delivery & Customer Info</h4>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-amber-600 font-semibold hover:underline"
                >
                  Edit Cart Items
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yasir Nawaz"
                  value={shippingDetails.fullName}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300-1234567"
                  value={shippingDetails.phone}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination City *
                </label>
                <select
                  value={shippingDetails.city}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                >
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Quetta">Quetta</option>
                  <option value="Sialkot">Sialkot</option>
                  <option value="Gujranwala">Gujranwala</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery Site Address *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="House / Commercial site address, street, landmark"
                  value={shippingDetails.address}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Special Notes / Contractor Code (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Call before delivery, ask for site engineer"
                  value={shippingDetails.notes}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Truck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  Factory Direct Delivery: Dispatched directly from authorized Gallop Paints depots with computerized batch seal.
                </span>
              </div>

              <button
                type="submit"
                id="btn-confirm-order-submit"
                className="w-full py-3 bg-[#0F2027] hover:bg-slate-800 text-amber-400 font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Confirm & Place Factory Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : items.length === 0 ? (
            /* Empty Cart */
            <div className="py-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800">Your Cart is Empty</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Explore our interior emulsions, exterior weather-guards, or select custom shades from our digital cards.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNavigateToProducts();
                }}
                className="mt-5 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Browse Gallop Products
              </button>
            </div>
          ) : (
            /* Items List */
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.cartId}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-3 transition-all"
                >
                  {/* Shade Swatch preview */}
                  <div
                    className="w-12 h-12 rounded-lg border border-slate-300 shadow-xs flex-shrink-0 flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: item.selectedShade.hex }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-slate-900 truncate">
                      {item.product.name}
                    </h5>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded font-medium">
                        {item.packSize}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Shade: <strong>{item.selectedShade.name}</strong> ({item.selectedShade.code})
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-1">
                      PKR {(item.unitPrice * item.quantity).toLocaleString()}
                      <span className="text-[10px] text-slate-500 font-normal ml-1">
                        (@ PKR {item.unitPrice.toLocaleString()})
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Delete */}
                  <div className="flex flex-col items-end gap-1.5">
                    <button
                      onClick={() => onRemoveItem(item.cartId)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center border border-slate-300 rounded-md bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                        className="px-1.5 py-0.5 text-slate-600 hover:bg-slate-100 rounded-l"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                        className="px-1.5 py-0.5 text-slate-600 hover:bg-slate-100 rounded-r"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Summary & Action */}
        {!checkoutComplete && items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50">
            <div className="space-y-1.5 text-xs text-slate-600 mb-3">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-semibold text-slate-900">PKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Direct Depot Logistics</span>
                <span className="font-semibold text-emerald-600">
                  {deliveryFee === 0 ? 'FREE' : `PKR ${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-base text-[#0F2027]">PKR {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {!isCheckingOut && (
              <button
                id="btn-proceed-to-checkout"
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 hover:from-amber-400 hover:to-amber-200 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Delivery Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="mt-2.5 flex items-center justify-center gap-2 text-[10px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Genuine Factory Sealed • Gallop Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
