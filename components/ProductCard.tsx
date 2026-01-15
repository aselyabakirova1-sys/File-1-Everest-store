
import React from 'react';
import { Product, Language } from '../types';
import { Plus } from 'lucide-react';
import { translations } from '../translations';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  language: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, language }) => {
  const t = translations[language];

  const getLocalizedCategory = (cat: string) => {
    switch (cat) {
      case 'Flagship': return t.flagship;
      case 'Mid-range': return t.midrange;
      case 'Budget': return t.budget;
      default: return cat;
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="aspect-square overflow-hidden bg-slate-100 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-slate-900 uppercase tracking-widest border border-slate-200">
            {getLocalizedCategory(product.category)}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
            <p className="text-sm text-slate-500">{product.brand}</p>
          </div>
          <span className="text-lg font-black text-slate-900">${product.price}</span>
        </div>
        
        <div className="space-y-1 mb-4">
          <p className="text-xs text-slate-400 line-clamp-1">{product.specs.processor}</p>
          <p className="text-xs text-slate-400 line-clamp-1">{product.specs.camera}</p>
        </div>

        <button 
          onClick={() => onAddToCart(product)}
          className="w-full bg-slate-900 hover:bg-blue-600 text-white py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium text-sm"
        >
          <Plus size={18} />
          {t.addToCart}
        </button>
      </div>
    </div>
  );
};
