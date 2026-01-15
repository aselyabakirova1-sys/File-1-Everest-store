
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { STORE_LOCATION } from '../constants';

interface LocationProps {
  language: Language;
}

export const Location: React.FC<LocationProps> = ({ language }) => {
  const t = translations[language];

  // Urban Mall Osh coordinates are approx 40.5186, 72.8028
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.85243689258!2d72.8023403759325!3d40.52271887142273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bdad39965d1b71%3A0xf5c9b8f2d50e8a8a!2sUrban%20Mall!5e0!3m2!1sru!2skg!4v1711100000000!5m2!1sru!2skg";

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
              <MapPin size={14} />
              {t.findUs}
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
              {language === 'kg' ? 'Бизге конокко келиңиз' : 'Ждем вас в гости'}
            </h2>
            <p className="text-slate-500 mb-8 text-lg">
              {t.locationSubtitle}
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{language === 'kg' ? 'Дарегибиз' : 'Адрес'}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{STORE_LOCATION}</p>
                </div>
              </div>

              <a 
                href="https://maps.app.goo.gl/uXvG9Z9Y9Y9Y9Y9Y9" // Generic Urban Mall link
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200"
              >
                <Navigation size={20} />
                {t.getDirections}
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 relative">
            <div className="absolute -inset-4 bg-slate-100 rounded-[2.5rem] -rotate-1 hidden lg:block"></div>
            <div className="relative aspect-video lg:aspect-square xl:aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Everest Phone Shop Location"
                className="grayscale-[0.2] contrast-[1.1]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
