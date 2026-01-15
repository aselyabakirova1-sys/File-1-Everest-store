
import React from 'react';
import { ShoppingCart, Search, Menu, Mountain, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
  onSearch: (query: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onCartClick, 
  cartCount, 
  onSearch, 
  language, 
  onLanguageChange 
}) => {
  const t = translations[language];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
              <Mountain size={24} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">EVEREST</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-slate-400 transition-all text-sm"
                onChange={(e) => onSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
              <button 
                onClick={() => onLanguageChange('kg')}
                className={`px-2 py-1 text-[10px] font-bold rounded-full transition-all ${language === 'kg' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
              >
                KG
              </button>
              <button 
                onClick={() => onLanguageChange('ru')}
                className={`px-2 py-1 text-[10px] font-bold rounded-full transition-all ${language === 'ru' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
              >
                RU
              </button>
            </div>

            <button 
              onClick={onCartClick}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
