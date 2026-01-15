
import React, { useState, useRef } from 'react';
import { User, Sparkles, Quote, CheckCircle, Camera } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface AboutUsProps { language: Language; }

export const AboutUs: React.FC<AboutUsProps> = ({ language }) => {
  const t = translations[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Local state for the owner's image. 
  // Initialized with a professional portrait of a young Asian male in a classic suit.
  const [ownerImage, setOwnerImage] = useState("https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=1000&auto=format&fit=crop");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOwnerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Decorative background elements */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-100 rounded-full blur-3xl opacity-60"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Image side */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 bg-slate-900/5 rounded-[3.5rem] -rotate-2"></div>
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-[12px] border-white group">
                <img 
                  src={ownerImage} 
                  alt={`${t.founderName} - ${t.founderRole}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                
                {/* Image Overlay Action */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={triggerFileInput}
                    className="bg-white/90 backdrop-blur-md text-slate-900 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-2xl hover:bg-white transition-all transform hover:scale-105 active:scale-95"
                  >
                    <Camera size={20} />
                    {language === 'kg' ? 'Сүрөттү алмаштыруу' : 'Сменить фото'}
                  </button>
                </div>

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange}
                />
                
                {/* Formal Badge */}
                <div className="absolute top-8 left-8 flex items-center gap-2 bg-slate-900/90 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/10 text-white text-xs font-bold uppercase tracking-[0.2em]">
                  <CheckCircle size={14} className="text-blue-400" />
                  Executive Founder
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent text-white">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="h-px w-10 bg-blue-500"></span>
                    <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">{t.founderRole}</span>
                  </div>
                  <h4 className="text-4xl font-black mb-1 tracking-tight">{t.founderName}</h4>
                </div>
              </div>
              
              {/* Floating Success Stat */}
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2.5rem] shadow-2xl flex items-center gap-5 border border-slate-50 hidden sm:flex">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                  <Sparkles size={28} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Founder & CEO</p>
                  <p className="text-slate-900 font-extrabold text-xl">Everest Global</p>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="space-y-10 order-1 lg:order-2">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-slate-200">
                  <User size={12} className="text-blue-600" />
                  {t.meetFounder}
                </div>
                <h2 className="text-5xl sm:text-6xl font-black text-slate-900 leading-[1.1] mb-8 tracking-tighter">
                  {language === 'kg' 
                    ? 'Биздин максат — сиздин ыңгайлуулук' 
                    : 'Ваш комфорт — наш главный приоритет'}
                </h2>
                
                <div className="relative pl-12 border-l-4 border-blue-600/20">
                  <Quote className="absolute -top-4 -left-6 text-blue-600/10 w-24 h-24 -z-10" />
                  <p className="text-2xl text-slate-700 leading-relaxed font-semibold italic">
                    "{t.aboutText}"
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="text-blue-600 font-black text-sm mb-2 tracking-widest uppercase">Location</div>
                  <h5 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">Urban Mall</h5>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">The heart of Osh City</p>
                </div>
                <div className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="text-blue-600 font-black text-sm mb-2 tracking-widest uppercase">Philosophy</div>
                  <h5 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">Elite Tech</h5>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tight">Curated Selection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
