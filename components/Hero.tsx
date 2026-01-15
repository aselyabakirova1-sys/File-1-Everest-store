
import React from 'react';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { STORE_LOCATION } from '../constants';
import { Language } from '../types';
import { translations } from '../translations';

interface HeroProps {
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = translations[language];
  
  return (
    <div className="relative mountain-gradient overflow-hidden py-20 sm:py-32">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500 rounded-full blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Premium Tech Hub Osh
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
            {t.heroTitle} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">{t.heroSubtitle}</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-300 text-lg sm:text-xl mb-12 font-medium leading-relaxed">
            {t.heroDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#products" 
              className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-50 transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
            >
              {language === 'kg' ? 'Каталог' : 'Каталог'}
              <ArrowRight size={20} />
            </a>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
              <div className="flex items-center gap-2 glass-effect px-5 py-3 rounded-2xl">
                <MapPin size={18} className="text-blue-400" />
                <span className="text-slate-200 font-semibold">Urban Mall, Osh</span>
              </div>
              <a 
                href="tel:0755731717" 
                className="flex items-center gap-2 glass-effect px-5 py-3 rounded-2xl hover:bg-white/10 transition-all group"
              >
                <Phone size={18} className="text-blue-400 group-hover:rotate-12 transition-transform" />
                <span className="text-white font-bold">0755731717</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
