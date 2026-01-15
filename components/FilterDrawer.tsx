
import React from 'react';
import { X, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { PRODUCTS } from '../constants';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minScreen: number | null;
  setMinScreen: (val: number | null) => void;
  minCamera: number | null;
  setMinCamera: (val: number | null) => void;
  onClear: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  language,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  minScreen,
  setMinScreen,
  minCamera,
  setMinCamera,
  onClear
}) => {
  const t = translations[language];
  const allBrands = Array.from(new Set(PRODUCTS.map(p => p.brand)));

  if (!isOpen) return null;

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-xs sm:max-w-md bg-white shadow-2xl flex flex-col">
          <div className="px-6 py-6 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">{t.advancedFilters}</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10">
            {/* Brands */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">{t.brands}</h3>
              <div className="grid grid-cols-2 gap-3">
                {allBrands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                      selectedBrands.includes(brand)
                      ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {brand}
                    {selectedBrands.includes(brand) && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">{t.priceRange}</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">{t.minPrice}</label>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">{t.maxPrice}</label>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Screen Size */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">{t.screenSize}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setMinScreen(null)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${minScreen === null ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-500'}`}
                >
                  {t.anySize}
                </button>
                <button
                  onClick={() => setMinScreen(6.5)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${minScreen === 6.5 ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-500'}`}
                >
                  {t.largeScreen}
                </button>
              </div>
            </div>

            {/* Camera Quality */}
            <div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">{t.cameraQuality}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setMinCamera(null)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${minCamera === null ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-500'}`}
                >
                  {t.anySize}
                </button>
                <button
                  onClick={() => setMinCamera(100)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${minCamera === 100 ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-500'}`}
                >
                  {t.highResCamera}
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 py-6 bg-slate-50 border-t border-slate-200 flex gap-4">
            <button
              onClick={onClear}
              className="flex-1 bg-white border border-slate-200 text-slate-900 py-3 rounded-2xl font-bold hover:bg-slate-100 transition-colors"
            >
              {t.clearFilters}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-slate-900 text-white py-3 rounded-2xl font-bold hover:bg-blue-600 transition-colors"
            >
              {t.applyFilters}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
