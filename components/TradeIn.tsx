
import React from 'react';
import { RefreshCw, ArrowRight, Smartphone, CheckCircle2, BadgeDollarSign } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface TradeInProps {
  language: Language;
}

export const TradeIn: React.FC<TradeInProps> = ({ language }) => {
  const t = translations[language];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[3rem] p-8 sm:p-16 relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>

          <div className="relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-500/20">
                <RefreshCw size={14} className="animate-spin-slow" />
                Trade-In
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-6">
                {t.tradeInSubtitle}
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                {language === 'kg' 
                  ? "Эски телефонуңузду текке кетирбеңиз. Everest Trade-In менен аны жаңы смартфонго баштапкы төлөм катары колдонуңуз." 
                  : "Не дайте вашему старому телефону пылиться. С Everest Trade-In используйте его как часть оплаты за новый современный смартфон."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connector Lines (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-px bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 -translate-y-12"></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-blue-600/20 group-hover:border-blue-500/30">
                  <Smartphone className="text-blue-400" size={32} />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{t.tradeInStep1}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {language === 'kg' ? "Каалаган абалындагы смартфондорду кабыл алабыз." : "Принимаем смартфоны в любом состоянии."}
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-blue-600/20 group-hover:border-blue-500/30">
                  <CheckCircle2 className="text-blue-400" size={32} />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{t.tradeInStep2}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {language === 'kg' ? "5 мүнөт ичинде эксперттик баалоо." : "Экспертная оценка в течение 5 минут."}
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-blue-600/20 group-hover:border-blue-500/30">
                  <BadgeDollarSign className="text-blue-400" size={32} />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{t.tradeInStep3}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {language === 'kg' ? "Ошол замат арзандатуу же акчалай төлөм." : "Мгновенная скидка или выплата наличными."}
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-900/40 group">
                {t.tradeInCTA}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};
