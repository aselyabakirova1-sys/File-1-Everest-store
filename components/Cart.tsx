
import React from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../translations';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: string) => void;
  language: Language;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, language }) => {
  const t = translations[language];
  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          <div className="px-6 py-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag size={24} />
              {t.cart}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                <ShoppingBag size={64} strokeWidth={1} />
                <p>{t.emptyCart}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                    <img src={item.image} className="w-20 h-20 object-cover rounded-lg" alt={item.name} />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900">{item.name}</h4>
                      <p className="text-sm text-slate-500">${item.price}</p>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="px-6 py-6 bg-slate-50 border-t border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500">{t.totalAmount}</span>
                <span className="text-2xl font-black text-slate-900">${total}</span>
              </div>
              <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition-colors">
                {t.checkout}
              </button>
              <p className="text-center text-xs text-slate-400 mt-4">
                {t.visitUs}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
